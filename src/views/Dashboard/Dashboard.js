/*
Copyright (c) 2018-2019 Qualcomm Technologies, Inc.
All rights reserved.
Redistribution and use in source and binary forms, with or without modification, are permitted (subject to the limitations in the 
disclaimer below) provided that the following conditions are met:
    * Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
    * Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer 
      in the documentation and/or other materials provided with the distribution.
    * Neither the name of Qualcomm Technologies, Inc. nor the names of its contributors may be used to endorse or promote 
      products derived from this software without specific prior written permission.
    * The origin of this software must not be misrepresented; you must not claim that you wrote the original software. If you use 
      this software in a product, an acknowledgment is required by displaying the trademark/log as per the details provided 
      here: https://www.qualcomm.com/documents/dirbs-logo-and-brand-guidelines
    * Altered source versions must be plainly marked as such, and must not be misrepresented as being the original software.
    * This notice may not be removed or altered from any source distribution.
NO EXPRESS OR IMPLIED LICENSES TO ANY PARTY'S PATENT RIGHTS ARE GRANTED BY THIS LICENSE. THIS SOFTWARE IS PROVIDED 
BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT 
LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO 
EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, 
EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; 
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN 
CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS 
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

import React, {Component} from 'react';
import {translate, I18n} from 'react-i18next';
import DashboardInstructions from '../../locales/en/instructions'
import DashboardInstructionsSpanish from '../../locales/es/instructions'
import DashboardInstructionsIndonesian from '../../locales/id/instructions'
import i18n from './../../i18n'
import { Link } from "react-router-dom";
import {Card, CardHeader, CardBody, Row, Col, ModalHeader, ModalBody,ModalFooter} from 'reactstrap';
import {errors, getAuthHeader, getStatusClass, getUserRole, instance, getLangTag} from "../../utilities/helpers";
import moment from 'moment'
import {AUTHORITY, EXPORTER} from "../../utilities/constants";
import RenderModal from '../../components/Form/RenderModal'
class Dashboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      latestRequests: [],
      latestRegistationRequests: [],
      latestDeregistrationRequests: [],
      searchFilter: null,
      pendingRegistrationRequests: null,
      pendingDeRegistrationRequests: null,
      inReviewRegistrationRequests: null,
      inReviewDeRegistrationRequests: null,
      awaitingdocs: null,
      informationRequested: null,
      pending: null,
      inReview: null,
      userRole: '',
      showInstructionModal: false
    }
    this.updateTokenHOC = this.updateTokenHOC.bind(this)
    this.getDashboardData = this.getDashboardData.bind(this)
    this.infoClickHandler = this.infoClickHandler.bind(this)
  }

  componentDidMount() {
    this.updateTokenHOC(this.getDashboardData)
  }

  sortbyDate = (arr) => {
    let sortedArr = arr.sort((date1,date2)=>{
      if(date1.created_at < date2.created_at){return 1}
      if(date1.created_at > date2.created_at){return -1}
      return 0
    })
    return sortedArr
  }
  getDashboardData(config) {
    let userRole = getUserRole(this.props.resources)
    this.setState({
      userRole
    })
    let userType = ''
    if (userRole === AUTHORITY) {
      userType = 'reviewer'
    } else if (userRole === EXPORTER) {
      userType = 'exporter'
    } else if (userRole === 'individual_importer') {
      userType = 'individual'
    } else {
      userType = 'importer'
    }
    let userID = ((this.props.userDetails || {}).sub || '')
    instance.get(`/dashboard/report?user_id=${userID}&user_type=${userType}`, config)
      .then(response => {
        if (userType === 'reviewer') {
          const latest = []
          latest.push(
            response.data.registration.latest_pending_requests,
            response.data['de-registration'].latest_pending_requests
          )
          const mergedLatestRequests = [].concat.apply([], latest)
          this.sortbyDate(mergedLatestRequests)
          this.setState({
            latestRequests: mergedLatestRequests,
            pendingRegistrationRequests: response.data.registration.pending_review_count,
            pendingDeRegistrationRequests: response.data['de-registration'].pending_review_count,
            inReviewRegistrationRequests: response.data.registration.in_review_count,
            inReviewDeRegistrationRequests: response.data['de-registration'].in_review_count,
          })
        } else if(userType ==='importer' || userType ==='individual') {
          this.setState({
            latestRequests: response.data.registration.latest_request,
            pending: response.data.registration.pending_review,
            inReview: response.data.registration.in_review,
            awaitingdocs: response.data.registration.awaiting_document,
            informationRequested: response.data.registration.information_requested,

          })
        } else {
          this.setState({
            latestRequests: response.data['de-registration'].latest_request,
            pending: response.data['de-registration'].pending_review,
            inReview: response.data['de-registration'].in_review,
            awaitingdocs: response.data['de-registration'].awaiting_document,
            informationRequested: response.data['de-registration'].information_requested,

          })
        }
      })
      .catch(error => {
        errors(this, error);
      })
  }

  updateTokenHOC(callingFunc, request) {
    let config = null;
    if (this.props.kc.isTokenExpired(0)) {
      this.props.kc.updateToken(0)
        .success(() => {
          localStorage.setItem('token', this.props.kc.token)
          config = {
            headers: getAuthHeader(this.props.kc.token)
          }
          callingFunc(config, request);
        })
        .error(() => this.props.kc.logout());
    } else {
      config = {
        headers: getAuthHeader()
      }
      callingFunc(config, request);
    }
  }

  getRequestStatus(request) {
    let processing_status = request.processing_status_label
    let report_status = request.report_status_label
    let isAuthority = this.state.userRole === AUTHORITY;
    if (isAuthority) {
      if (processing_status === 'Failed' || report_status === 'Failed') {
        return 'Failed'
      } else if (processing_status === 'Processing' || report_status === 'Processing') {
        return 'In Process'
      } else if (processing_status === 'New Request' && report_status === 'New Request') {
        return 'In Complete'
      } else {
        return request.status_label;
      }
    } else {
      if (processing_status === 'New Request' &&
        report_status === 'New Request' &&
        (request.status_label === 'Pending Review' ||
          request.status_label === 'Information Requested')) {
        return 'In Complete'
      } else {
        return request.status_label;
      }
    }
  }
  rowClickHandler(request){
    this.props.history.push({
      pathname: '/search-requests',
      state: {
        filter: 'single request',
        data : request
      }
    })
  }

  infoClickHandler() {
    this.setState({
      showInstructionModal : true
    })
  }
  render() {
    const userRole = getUserRole(this.props.resources)
    const lastestRequests = this.state.latestRequests.map((request, index) => {
      let request_status = this.getRequestStatus(request)
      return <tr key={index} onClick={()=>this.rowClickHandler(request)}>
        <td data-label="#" scope="row"><b>{index + 1}</b></td>
        <td data-label="Request ID">{request.id}</td>
        <td data-label="Request type">{request.imeis!==undefined ? i18n.t('registration') : i18n.t('deregistration')}</td>
        <td data-label="Device count">{request.device_count}</td>
        <td data-label="Date created">{moment(request.created_at).format('HH:mm DD/MM/YYYY')}</td>
        <td data-label="Request status">
          <span className={getStatusClass(request_status)} data-for="status"
                data-tip={request_status === 'In Complete' ? true : null}>{i18n.t(request_status)}</span>
        </td>
      </tr>
    })
    const ReviewerStats = (
      <Row>
        <Col sm={6} xl={3}>
          <ul className="dashbx pendbx">
            <li>
              <div className="iconbx">
                <svg className="icon-registration" fill="#3f51b5">
                  <use xlinkHref="./img/svg-symbol.svg#regRequest"></use>
                </svg>
              </div>
              <h4><span>{i18n.t('dashboardLabel.pending')} </span>{i18n.t('dashboardLabel.registration')}</h4>
            </li>
            <hr />
            <li>
              <h3>{this.state.pendingRegistrationRequests} <small>{i18n.t('dashboardLabel.requests')}</small></h3>
              <div>
                <Link to={{
                  pathname: '/search-requests',
                  state: {filter: 'pending registrations'}
                }}>{i18n.t('view')}</Link>
              </div>
            </li>
          </ul>
        </Col>
        <Col sm={6} xl={3}>
          <ul className="dashbx pendbx">
            <li>
              <div className="iconbx">
                <svg className="icon-registration" fill="#3f51b5">
                  <use xlinkHref="./img/svg-symbol.svg#deRegRequest"></use>
                </svg>
              </div>
              <h4><span>{i18n.t('dashboardLabel.pending')} </span>{i18n.t('dashboardLabel.deregistration')}</h4>
            </li>
            <hr />
            <li>
              <h3>{this.state.pendingDeRegistrationRequests} <small>{i18n.t('dashboardLabel.requests')}</small></h3>
              <div>
                <div>
                  <Link to={{
                    pathname: '/search-requests',
                    state: {filter: 'pending de-registrations'}
                  }}>{i18n.t('view')}</Link>
                </div>
              </div>
            </li>
          </ul>
        </Col>
        <Col sm={6} xl={3}>
          <ul className="dashbx inrevibx">
            <li>
              <div className="iconbx">
                <svg className="icon-registration" fill="#6c757d">
                  <use xlinkHref="./img/svg-symbol.svg#inrevReg"></use>
                </svg>
              </div>
              <h4><span>{i18n.t('dashboardLabel.inreview')} </span>{i18n.t('dashboardLabel.registration')}</h4>
            </li>
            <hr />
            <li>
              <h3>{this.state.inReviewRegistrationRequests} <small>{i18n.t('dashboardLabel.requests')}</small></h3>
              <div>
                <div>
                  <Link to={{
                    pathname: '/search-requests',
                    state: {filter: 'in review registrations'}
                  }}>{i18n.t('view')}</Link>
                </div>
              </div>
            </li>
          </ul>
        </Col>
        <Col sm={6} xl={3}>
          <ul className="dashbx inrevibx">
            <li>
              <div className="iconbx">
                <svg className="icon-registration" fill="#6c757d">
                  <use xlinkHref="./img/svg-symbol.svg#inrevDeReg"></use>
                </svg>
              </div>
              <h4><span>{i18n.t('dashboardLabel.inreview')} </span>{i18n.t('dashboardLabel.deregistration')}</h4>
            </li>
            <hr />
            <li>
              <h3>{this.state.inReviewDeRegistrationRequests} <small>{i18n.t('dashboardLabel.requests')}</small></h3>
              <div>
                <div>
                  <Link to={{
                    pathname: '/search-requests',
                    state: {filter: 'in review de-registrations'}
                  }}>{i18n.t('view')}</Link>
                </div>
              </div>
            </li>
          </ul>
        </Col>
      </Row>
    )
    const UserStats = (
      <Row>
        <Col sm={6} xl={3}>
          <ul className="dashbx pendbx">
            <li>
              <div className="iconbx">
                <svg className="icon-registration" fill="#3f51b5">
                  {(userRole === EXPORTER) ? <use xlinkHref="./img/svg-symbol.svg#deRegRequest"></use> : <use xlinkHref="./img/svg-symbol.svg#regRequest"></use>}
                </svg>
              </div>
              <h4><span>{i18n.t('dashboardLabel.pending')}</span>{i18n.t('dashboardLabel.reviews')}</h4>
            </li>
            <hr />
            <li>
              <h3>{this.state.pending} <small>{i18n.t('dashboardLabel.requests')}</small></h3>
              <div>
                <Link to={{
                  pathname: '/search-requests',
                  state: {filter: userRole===EXPORTER?'pending de-registrations':'pending registrations'}
                }}>{i18n.t('view')}</Link>
              </div>
            </li>
          </ul>
        </Col>
        <Col sm={6} xl={3}>
          <ul className="dashbx awaitbx">
            <li>
              <div className="iconbx">
                <svg className="icon-registration" fill="#ffc107">
                  <use xlinkHref="./img/svg-symbol.svg#awaitingDoc"></use>
                </svg>
              </div>
              <h4><span>{i18n.t('dashboardLabel.awaiting')} </span>{i18n.t('dashboardLabel.documents')}</h4>
            </li>
            <hr />
            <li>
              <h3>{this.state.awaitingdocs} <small>{i18n.t('dashboardLabel.requests')}</small></h3>
              <div>
                <div>
                  <Link to={{
                    pathname: '/search-requests',
                    state: {filter: userRole===EXPORTER?'awaiting de-registrations':'awaiting registrations'}
                  }}>{i18n.t('view')}</Link>
                </div>
              </div>
            </li>
          </ul>
        </Col>
        <Col sm={6} xl={3}>
          <ul className="dashbx inrevibx">
            <li>
              <div className="iconbx">
                <svg className="icon-registration" fill="#6c757d">
                  {(userRole === EXPORTER) ? <use xlinkHref="./img/svg-symbol.svg#inrevDeReg"></use> : <use xlinkHref="./img/svg-symbol.svg#inrevReg"></use>}
                </svg>
              </div>
              <h4><span>{i18n.t('dashboardLabel.inreview')} </span>{i18n.t('dashboardLabel.requests')}</h4>
            </li>
            <hr />
            <li>
              <h3>{this.state.inReview} <small>{i18n.t('dashboardLabel.requests')}</small></h3>
              <div>
                <div>
                  <Link to={{
                    pathname: '/search-requests',
                    state: {filter: userRole===EXPORTER?'in review de-registrations':'in review registrations'}
                  }}>{i18n.t('view')}</Link>
                </div>
              </div>
            </li>
          </ul>
        </Col>
        <Col sm={6} xl={3}>
          <ul className="dashbx infobx">
            <li>
              <div className="iconbx">
                <svg className="icon-registration" fill="#ffc107">
                  <use xlinkHref="./img/svg-symbol.svg#infoReq"></use>
                </svg>
              </div>
              <h4><span>{i18n.t('dashboardLabel.information')} </span>{i18n.t('dashboardLabel.requested')}</h4>
            </li>
            <hr />
            <li>
              <h3>{this.state.informationRequested} <small>{i18n.t('dashboardLabel.requests')}</small></h3>
              <div>
                <div>
                  <Link to={{
                    pathname: '/search-requests',
                    state: {
                      filter: userRole === EXPORTER ? 'information requested de-registrations' :
                        'information requested registrations'
                    }
                  }}>{i18n.t('view')}</Link>
                </div>
              </div>
            </li>
          </ul>
        </Col>
      </Row>
    )
    return (
      <I18n ns="translations">
        {
          (t, {i18n}) => (
            <div className="animated fadeIn position-relative">
              <div className="help help-page">
                <button onClick={()=>this.infoClickHandler()}>
                  <svg className="icon-registration">
                    <use xlinkHref="./img/svg-symbol.svg#helpi"></use>
                  </svg>
                </button>
              </div>
              <article className="dashstats">
                {(userRole===AUTHORITY && ReviewerStats) || UserStats}
              </article>
              <Card>
                <CardHeader>
                  <b>{i18n.t('dashboard.tableTitle')}</b>
                </CardHeader>
                <CardBody>
                  <table className="table table-bordered table-hover table-mobile-primary table-dashboard">
                    <thead className="thead-light">
                    <tr>
                      <th>#</th>
                      <th>{i18n.t('requestId')}</th>
                      <th>{i18n.t('requestType')}</th>
                      <th>{i18n.t('deviceCount')}</th>
                      <th>{i18n.t('dateCreated')}</th>
                      <th>{i18n.t('requestStatus')} </th>
                    </tr>
                    </thead>
                    <tbody>
                    {((lastestRequests.length > 0) && lastestRequests) ||
                    <tr>
                      <td colSpan={6}>{i18n.t('noRequestFound')}</td>
                    </tr>
                    }
                    </tbody>
                  </table>
                </CardBody>
              </Card>
              <RenderModal show={this.state.showInstructionModal} className="modal-lg modal-dirbs">
                <ModalHeader><b>{i18n.t('instructions')}</b></ModalHeader>
                <ModalBody>
                  {getLangTag(this.props.lng) === 'en' && DashboardInstructions(getUserRole(this.props.resources))}
                  {getLangTag(this.props.lng) === 'es' && DashboardInstructionsSpanish(getUserRole(this.props.resources))}
                  {getLangTag(this.props.lng) === 'id' && DashboardInstructionsIndonesian(getUserRole(this.props.resources))}
                </ModalBody>
                <ModalFooter>
                  <button className="btn btn-secondary" onClick={()=>this.setState({showInstructionModal:false})}>{i18n.t('close')}</button>
                </ModalFooter>
              </RenderModal>
            </div>
          )
        }
      </I18n>
    )
  }
}

export default translate('translations')(Dashboard);

