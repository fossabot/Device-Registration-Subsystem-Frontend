/*
SPDX-License-Identifier: BSD-4-Clause-Clear
Copyright (c) 2018-2019 Qualcomm Technologies, Inc.
All rights reserved.
Redistribution and use in source and binary forms, with or without
modification, are permitted (subject to the limitations in the disclaimer
below) provided that the following conditions are met:

   - Redistributions of source code must retain the above copyright notice,
   this list of conditions and the following disclaimer.
   - Redistributions in binary form must reproduce the above copyright
   notice, this list of conditions and the following disclaimer in the
   documentation and/or other materials provided with the distribution.
   - All advertising materials mentioning features or use of this software,
   or any deployment of this software, or documentation accompanying any
   distribution of this software, must display the trademark/logo as per the
   details provided here:
   https://www.qualcomm.com/documents/dirbs-logo-and-brand-guidelines
   - Neither the name of Qualcomm Technologies, Inc. nor the names of its
   contributors may be used to endorse or promote products derived from this
   software without specific prior written permission.


SPDX-License-Identifier: ZLIB-ACKNOWLEDGEMENT
Copyright (c) 2018-2019 Qualcomm Technologies, Inc.
This software is provided 'as-is', without any express or implied warranty.
In no event will the authors be held liable for any damages arising from
the use of this software.
Permission is granted to anyone to use this software for any purpose,
including commercial applications, and to alter it and redistribute it
freely, subject to the following restrictions:

   - The origin of this software must not be misrepresented; you must not
   claim that you wrote the original software. If you use this software in a
   product, an acknowledgment is required by displaying the trademark/logo as
   per the details provided here:
   https://www.qualcomm.com/documents/dirbs-logo-and-brand-guidelines
   - Altered source versions must be plainly marked as such, and must not
   be misrepresented as being the original software.
   - This notice may not be removed or altered from any source distribution.

NO EXPRESS OR IMPLIED LICENSES TO ANY PARTY'S PATENT RIGHTS ARE GRANTED BY
THIS LICENSE. THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND
CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT
NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A
PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER
OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS;
OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR
OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF
ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

import React, { Component } from 'react';
import {translate} from 'react-i18next';
import i18n from './../../i18n';
import {Row, Col, Button, Form, Label, Input, FormGroup, Card, CardHeader, CardBody} from 'reactstrap';
import { Link } from "react-router-dom";
import { withFormik, Field } from 'formik';
import moment from 'moment'
// Date Picker
import "react-dates/initialize";
import RenderDateRangePicker from "../../components/Form/RenderDateRangePicker";
import renderInput from "../../components/Form/RenderInput";
import MultiSelect from "../../components/Form/MultiSelect";
import "react-dates/lib/css/_datepicker.css";
import {
  instance,
  errors,
  getAuthHeader,
  getStatusClass,
  getUserInfo,
  getUserRole,
  SweetAlert,
  languageCheck
} from "../../utilities/helpers";
import {
  PAGE_LIMIT,
  STATUS_TYPES,
  DEVICE_TYPES,
  TECHNOLOGIES,
  AUTHORITY,
  EXPORTER,
  BULK_IMPORTER,
  INDIVIDUAL_IMPORTER,
  ITEMS_PER_PAGE
} from '../../utilities/constants';
import TableLoader from './../../components/Loaders/TableLoader';
import Pagination from "react-js-pagination";
import RenderSelect from "../../components/Form/RenderSelect";
import DataTableInfo from '../../components/DataTable/DataTableInfo';
import ReactTooltip from 'react-tooltip'
import SearchFilters from "./SearchFilters";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal)

class SearchForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      technologies: [],
      techSelect: false,
      requestRelatedCheck: true
    };
    this.createdDate = React.createRef();
    this.lastUpdated = React.createRef();
    this.idRef = React.createRef();
    this.handleTypeChange = this.handleTypeChange.bind(this);
    this.handleResetForm = this.handleResetForm.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }
  handleReset(filter){
    switch(filter.name){
      case 'brand':
        this.props.setFieldValue('brand','')
        this.props.delSearchQuery(this.props.currSearchQuery,filter)
        break;
      case 'status':
        this.props.setFieldValue('status','')
        this.props.delSearchQuery(this.props.currSearchQuery,filter)
        break;
      case 'id':
        this.props.setFieldValue('id','')
        this.props.delSearchQuery(this.props.currSearchQuery,filter)
        break;
      case 'model_name':
        this.props.setFieldValue('model_name','')
        this.props.delSearchQuery(this.props.currSearchQuery,filter)
        break;
      case 'model_num':
        this.props.setFieldValue('model_num','')
        this.props.delSearchQuery(this.props.currSearchQuery,filter)
        break;
      case 'operating_system':
        this.props.setFieldValue('operating_system','')
        this.props.delSearchQuery(this.props.currSearchQuery,filter)
        break;
      case 'technologies':
        let technologies = this.props.values.technologies
        let filteredTechnologies = technologies.filter((technology)=>{
          return technology.value !== filter.value
        })
        this.props.setFieldValue('technologies',filteredTechnologies)
        this.props.delSearchQuery(this.props.currSearchQuery,filter)
        break;
      case 'request_type':
        this.props.setFieldValue('request_type','1')
        this.props.delSearchQuery(this.props.currSearchQuery,filter)
        break;
      case 'imeis':
        let imeis = this.props.values.imeis
        let filterImeis = imeis.filter((imei)=>{
          return imei.value !== filter.value
        })
        this.props.setFieldValue('imeis',filterImeis)
        this.props.delSearchQuery(this.props.currSearchQuery,filter)
        break;
      case 'device_count':
        this.props.setFieldValue('device_count','')
        this.props.delSearchQuery(this.props.currSearchQuery,filter)
        break;
      case 'device_type':
        this.props.setFieldValue('device_type','')
        this.props.delSearchQuery(this.props.currSearchQuery,filter)
        break;
      case 'imei_per_device':
        this.props.setFieldValue('imei_per_device','')
        this.props.delSearchQuery(this.props.currSearchQuery,filter)
        break;
      case 'm_location':
        this.props.setFieldValue('m_location','')
        this.props.delSearchQuery(this.props.currSearchQuery,filter)
        break;
      case 'created_at':
        this.createdDate.resetDate()
        this.props.setFieldValue('created_at','')
        this.props.delSearchQuery(this.props.currSearchQuery,filter)
        break;
      case 'updated_at':
        this.lastUpdated.resetDate()
        this.props.setFieldValue('updated_at','')
        this.props.delSearchQuery(this.props.currSearchQuery,filter)
        break;
      default:
        break;
    }
  }
  handleTypeChange(event) {
    this.props.setFieldValue(event.target.name, event.target.value);
    if(event.target.value === 1) {
      this.setState({ requestRelatedCheck: true });
    } else {
      this.setState({ requestRelatedCheck: false });
    }
  }
  handleResetForm(){
    this.createdDate.resetDate()
    this.lastUpdated.resetDate()
    this.props.resetForm()
    this.props.delSearchQuery(this.props.currSearchQuery,'all')
  }
  componentDidMount() {
    let technologies = []
    for (let i = 0; i < TECHNOLOGIES.length; i ++) {
      if(typeof technologies[i] === 'undefined') {
        technologies[i] = {}
      }
      technologies[i].label = TECHNOLOGIES[i].description;
      technologies[i].value = TECHNOLOGIES[i].description;
    }
    this.setState({ technologies: technologies, techSelect: true})
  }

  render() {
    const {
      values,
      showFilters,
      toggle,
      touched,
      errors,
      isSubmitting,
      handleSubmit,
      setFieldValue,
      setFieldTouched,
      group,
      dirty,
      currSearchQuery,
      searchQuery,
      toggleRedirected,
      redirectedFromPage
    } = this.props;
    return (
      <Form onSubmit={handleSubmit}>
        {(currSearchQuery.length > 0 && (Object.keys(searchQuery).length>0 || group===AUTHORITY)) &&
        <div>
          <div className='selected-filters-header'>
            <Button color="link" onClick={() => {
              toggleRedirected()
              this.handleResetForm();
            }}
                    disabled={redirectedFromPage||!dirty||isSubmitting}>{i18n.t('clearAll')}</Button>
          </div>
          <SearchFilters group={group} filters={currSearchQuery} handleReset={this.handleReset} />
          <hr />
        </div>
        }
        <Row className="justify-content-end">
          <Col xs={12} sm={6} md={4} xl={3}>
            <Field ref={instance=>{this.idRef = instance}} name="id" component={renderInput} type="text"
                   label={i18n.t('requestId')} placeholder={i18n.t('requestId')} />
          </Col>
          <Col xs={12} sm={6} md={4} xl={3}>
            <FormGroup>
              <Label>{i18n.t('requestStatus')}</Label>
              <div className="selectbox">
                <Field component="select" name="status" className="form-control">
                  <option value="">{i18n.t('selectRequestStatus')}</option>
                  {STATUS_TYPES.map((status) => {
                    if((group === AUTHORITY)) {
                      if(status.description === 'New Request' || status.description === 'Awaiting Documents'  ||
                        status.description === 'Closed' || status.description === 'Failed' ||
                        status.description === 'Processed' || status.description === 'Processing') {
                        // Ignore the above Statuses
                        return null;
                      } else {
                        return (
                          <option value={status.description} key={status.id}>{i18n.t(status.description)}</option>
                        )
                      }
                    } else if(status.description === 'Failed' || status.description === 'Processed' ||
                      status.description === 'Processing') {
                      // Ignore the above Statuses
                      return null;
                    } else {
                      return (
                        <option value={status.description} key={status.id}>{i18n.t(status.description)}</option>
                      )
                    }
                  })}
                </Field>
              </div>
            </FormGroup>
          </Col>
          {(group === AUTHORITY) &&
          <Col xs={12} sm={6} md={4} xl={3}>
            <FormGroup>
              <Label>{i18n.t('requestType')}</Label>
              <div className="selectbox">
                <select value={values.request_type} onChange={this.handleTypeChange}
                        name="request_type" className="form-control">
                  <option value="1">{i18n.t('registration')}</option>
                  <option value="2">{i18n.t('deregistration')}</option>
                </select>
              </div>
            </FormGroup>
          </Col>
          }
          <Col xs={12} sm={(group === AUTHORITY) ? 6 : 12}
               md={(group === AUTHORITY) ? 12 : 4}
               xl={(group === AUTHORITY) ? 3 : 6}>
            <FormGroup>
              <MultiSelect
                value={values.imeis}
                onChange={setFieldValue}
                onBlur={setFieldTouched}
                error={errors.imeis}
                touched={touched.imeis}
                fieldName="imeis"
                label={i18n.t('deviceImeis')}
                placeholder={i18n.t('deviceImeis.placeholder')}
              />
            </FormGroup>
          </Col>
        </Row>
        <div className={toggle ? 'collapse show': 'collapse'}>
          <Row>
            <Col xs={12} sm={6} md={4} xl={3}>
              <FormGroup>
                <Label>{i18n.t('createdDate')}</Label>
                <RenderDateRangePicker
                  name="created_at"
                  ref={instance => { this.createdDate = instance; }}
                  value={values.created_at}
                  onChange={setFieldValue}
                  onBlur={setFieldTouched}
                />
              </FormGroup>
            </Col>
            <Col xs={12} sm={6} md={4} xl={3}>
              <FormGroup>
                <Label>{i18n.t('lastUpdated')}</Label>
                <RenderDateRangePicker
                  name="updated_at"
                  ref={instance => { this.lastUpdated = instance; }}
                  value={values.updated_at}
                  onChange={setFieldValue}
                  onBlur={setFieldTouched}
                />
              </FormGroup>
            </Col>
            <Col xs={12} sm={6} md={4} xl={3}>
              <Field name="brand" component={renderInput} type="text" label={i18n.t('brand')}
                     placeholder={i18n.t('brand')} />
            </Col>
            <Col xs={12} sm={6} md={4} xl={3}>
              <Field name="model_name" component={renderInput} type="text" label={i18n.t('model')}
                     placeholder={i18n.t('model')} />
            </Col>
            <Col xs={12} sm={6} md={4} xl={3}>
              <Field name="model_num" component={renderInput} type="text" label={i18n.t('modelnumber')}
                     placeholder={i18n.t('modelnumber')} />
            </Col>
            <Col xs={12} sm={6} md={4} xl={3}>
              <FormGroup>
                <Label>{i18n.t('deviceType')}</Label>
                <div className="selectbox">
                  <Field component="select" name="device_type" className="form-control">
                    <option value="">{i18n.t('selectDeviceType')}</option>
                    {DEVICE_TYPES.map((type) => (
                      <option value={type.description} key={type.id}>{i18n.t(type.description)}</option>
                    ))}
                  </Field>
                </div>
              </FormGroup>
            </Col>
            <Col xs={12} sm={6} md={4} xl={3}>
              <Field name="operating_system" component={renderInput} type="text"
                     label={i18n.t('operatingSystem')} placeholder={i18n.t('operatingSystem')} />
            </Col>
            <Col xs={12} sm={6} md={4} xl={3}>
              <FormGroup>
                {this.state.techSelect &&
                <RenderSelect
                  value={values.technologies}
                  onChange={setFieldValue}
                  options={this.state.technologies}
                  onBlur={setFieldTouched}
                  error={errors.technologies}
                  touched={touched.technologies}
                  fieldName="technologies"
                  label={i18n.t('technologies')}
                  placeholder={i18n.t('selectTechnologies')}
                  stayOpen={true}
                  multi={true}
                />
                }
              </FormGroup>
            </Col>
            <Col xs={12} sm={6} md={4} xl={3}>
              <Field name="device_count" component={renderInput} type="number" label={i18n.t('deviceCount')}
                     placeholder={i18n.t('deviceCount')} />
            </Col>
            {(group !== EXPORTER && this.state.requestRelatedCheck) &&
            <React.Fragment>
              <Col xs={12} sm={6} md={4} xl={3}>
                <Field name="imei_per_device" component={renderInput} type="number" label={i18n.t('numberOfImeis')}
                       placeholder={i18n.t('numberOfImeis')}/>
              </Col>
              <Col xs={12} sm={6} md={4} xl={3}>
                <FormGroup>
                  <Label>{i18n.t('manufacturingLocation')}</Label>
                  <div className="selectbox">
                    <Field component="select" name="m_location" className="form-control">
                      <option value="">{i18n.t('selectManufacturingLocation')}</option>
                      <option value="local">{i18n.t('manufacturingLocation.local')}</option>
                      <option value="overseas">{i18n.t('manufacturingLocation.overseas')}</option>
                    </Field>
                  </div>
                </FormGroup>
              </Col>
            </React.Fragment>
            }
          </Row>
        </div>
        <Row className="justify-content-end">
          <Col xs={12} sm={6} md={4} xl={3}>
            <FormGroup>
              <Button color="default" block onClick={showFilters}>{toggle ? `${i18n.t('hideFilters')}`:
                `${i18n.t('showFilters')}`}</Button>
            </FormGroup>
          </Col>
          <Col xs={12} sm={12} md={4} xl={3}>
            <FormGroup>
              <Button color="primary" type="submit" block  disabled={isSubmitting}>{i18n.t('searchRequests')}</Button>
            </FormGroup>
          </Col>
        </Row>
      </Form>
    );
  }
}

const MyEnhancedForm = withFormik({
  mapPropsToValues: (props) => ({
    "id": props.redirectedFromPage ? props.id: "",
    "status": props.redirectedFromPage ? props.status: "",
    "created_at": "",
    "updated_at": "",
    "request_type": props.redirectedFromPage ? props.requestType: "1",
    "brand": "",
    "model_name": "",
    "model_num": "",
    "device_type": "",
    "operating_system": "",
    "technologies": "",
    "device_count": "",
    "imei_per_device": "",
    "imeis": [],
    "m_location": ""
  }),

  // Custom sync validation
  validate: values => {
    let errors = {};
    if (!values.device_count) {

    } else if (isNaN(Number(values.device_count))) {
      errors.device_count = i18n.t('validation.number')
    } else if (!/^([1-9][0-9]{0,5}|1000000)$/i.test(values.device_count)) {
      errors.device_count = i18n.t('validation.deviceCount');
    }
    if(values.brand && languageCheck(values.brand) === false){
      errors.brand = i18n.t('validation.langError')
      // errors.brand = 'Not supported Lang'
    }
    if (values.operating_system && languageCheck(values.operating_system) === false){
      errors.operating_system = i18n.t('validation.langError')
      // errors.brand = 'Not supported Lang'
    }
    if (values.model_name && languageCheck(values.model_name) === false){
      errors.model_name = i18n.t('validation.langError')
    }

    if (!values.imei_per_device) {

    } else if (isNaN(Number(values.imei_per_device))) {
      errors.imei_per_device = i18n.t('validation.number')
    } else if (!/^[1-5]$/i.test(values.imei_per_device)) {
      errors.imei_per_device = i18n.t('validation.imeiPerDevice');
    }
    return errors;
  },

  handleSubmit: (values, bag) => {
    bag.setSubmitting(false);
    bag.props.callServer(prepareAPIRequest(values));
    bag.props.setSearchQuery(prepareAPIRequest(values));
    bag.props.toggleRedirected()
  },

  displayName: 'SearchForm', // helps with React DevTools
})(SearchForm);

function prepareAPIRequest(values) {
  // Validate Values before sending
  const searchParams = {};
  if(values.id) {
    searchParams.id = values.id
  }
  if(values.status) {
    searchParams.status = values.status
  }
  if(values.created_at) {
    searchParams.created_at = values.created_at
  }
  if(values.updated_at) {
    searchParams.updated_at = values.updated_at
  }
  if(values.request_type) {
    searchParams.request_type = values.request_type
  }
  if(values.brand) {
    searchParams.brand = values.brand
  }
  if(values.model_name) {
    searchParams.model_name = values.model_name
  }
  if(values.model_num) {
    searchParams.model_num = values.model_num
  }
  if(values.device_type) {
    searchParams.device_type = values.device_type
  }
  if(values.operating_system) {
    searchParams.operating_system = values.operating_system
  }
  if(values.technologies.length > 0) {
    searchParams.technologies = [];
    for (let i=0; i< values.technologies.length; i++) {
      searchParams.technologies[i] = values.technologies[i].value;
    }
  }
  if(values.device_count) {
    searchParams.device_count = values.device_count
  }
  if(values.imei_per_device) {
    searchParams.imei_per_device = values.imei_per_device
  }
  if(values.imeis.length > 0) {
    searchParams.imeis = [];
    for (let i=0; i< values.imeis.length; i++) {
      searchParams.imeis[i] = values.imeis[i].value;
    }
  }
  if(values.m_location) {
    searchParams.m_location = values.m_location
  }
  return searchParams;
}

class SearchRequests extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAllFilters: false,
      start: 1,
      limit: PAGE_LIMIT,
      data: null,
      loading: false,
      activePage: 1,
      totalCases: 0,
      searchQuery: {},
      apiFetched: false,
      requestType: null,
      currSearchQuery: [],
      redirectedFromPage : false,
      filters : {
        status : "",
        requestType : "1"
      }
    }
    this.handleShowFilters = this.handleShowFilters.bind(this);
    this.getSearchRequestsFromServer = this.getSearchRequestsFromServer.bind(this);
    this.handlePageClick = this.handlePageClick.bind(this);
    this.saveSearchQuery = this.saveSearchQuery.bind(this);
    this.closeRequest = this.closeRequest.bind(this);
    this.reInitiateRequest = this.reInitiateRequest.bind(this);
    this.updateTokenHOC = this.updateTokenHOC.bind(this);
    this.handleLimitChange = this.handleLimitChange.bind(this);
    this.handlePagination = this.handlePagination.bind(this);
    this.setSearchQuery = this.setSearchQuery.bind(this);
    this.delSearchQuery = this.delSearchQuery.bind(this);
  }

  isBottom(el) {
    return el.getBoundingClientRect().bottom - 100 <= window.innerHeight;
  }

  componentDidMount() {
    document.addEventListener('scroll', this.handlePagination);
    if(this.props.location.state){
      this.setState({
        loading : true,
        redirectedFromPage : true
      },()=>{
        const {filter} = this.props.location.state
        switch (filter) {
          case 'pending registrations':
            this.setState({
              requestType:1,
              searchQuery: {
                status: "Pending Review"
              },
              filters : {
                status : "Pending Review",
                requestType: "1"
              }
            },()=>{
              this.setSearchQuery({status: "Pending Review",request_type:"1"})
              this.updateTokenHOC(this.getSearchRequestsFromServer)
            })
            break
          case 'pending de-registrations':
            this.setState({
              requestType:2,
              searchQuery: {
                status: "Pending Review"
              },
              filters : {
                status : "Pending Review",
                requestType: "2"
              }
            },()=>{
              this.setSearchQuery({status: "Pending Review",request_type:"2"})
              this.updateTokenHOC(this.getSearchRequestsFromServer)
            })
            break
          case 'in review registrations':
            this.setState({
              requestType:1,
              searchQuery: {
                status: "In Review"
              },
              filters : {
                status : "In Review",
                requestType: "1"
              }
            },()=>{
              this.setSearchQuery({status: "In Review",request_type:"1"})
              this.updateTokenHOC(this.getSearchRequestsFromServer)
            })
            break
          case 'in review de-registrations':
            this.setState({
              requestType:2,
              searchQuery: {
                status: "In Review"
              },
              filters : {
                status : "In Review",
                requestType: "2"
              }
            },()=>{
              this.setSearchQuery({status: "In Review",request_type:"2"})
              this.updateTokenHOC(this.getSearchRequestsFromServer)
            })
            break
          case 'awaiting registrations':
            this.setState({
              requestType:1,
              searchQuery: {
                status: "Awaiting Documents"
              },
              filters : {
                status : "Awaiting Documents",
                requestType: "1"
              }
            },()=>{
              this.setSearchQuery({status: "Awaiting Documents",request_type:"1"})
              this.updateTokenHOC(this.getSearchRequestsFromServer)
            })
            break
          case 'awaiting de-registrations':
            this.setState({
              requestType:2,
              searchQuery: {
                status: "Awaiting Documents"
              },
              filters : {
                status : "Awaiting Documents",
                requestType: "2"
              }
            },()=>{
              this.setSearchQuery({status: "Awaiting Documents",request_type:"2"})
              this.updateTokenHOC(this.getSearchRequestsFromServer)
            })
            break
          case 'information requested registrations':
            this.setState({
              requestType:1,
              searchQuery: {
                status: "Information Requested"
              },
              filters : {
                status : "Information Requested",
                requestType: "1"
              }
            },()=>{
              this.setSearchQuery({status: "Information Requested",request_type:"1"})
              this.updateTokenHOC(this.getSearchRequestsFromServer)
            })
            break
          case 'information requested de-registrations':
            this.setState({
              requestType:2,
              searchQuery: {
                status: "Information Requested"
              },
              filters : {
                status : "Information Requested",
                requestType: "2"
              }
            },()=>{
              this.setSearchQuery({status: "Information Requested",request_type:"2"})
              this.updateTokenHOC(this.getSearchRequestsFromServer)
            })
            break
          case 'single request':
            this.setState({
              requestType:this.props.location.state.data.imeis!==undefined?1:2,
              searchQuery: {
                id: this.props.location.state.data.id.toString()
              },
              filters : {
                id : this.props.location.state.data.id.toString(),
                requestType: this.props.location.state.data.imeis!==undefined?"1":"2"
              }
            },()=>{
              this.setSearchQuery(
                {
                  'id': this.props.location.state.data.id.toString(),
                  'request_type':this.props.location.state.data.imeis!==undefined?"1":"2"
                })
              this.updateTokenHOC(this.getSearchRequestsFromServer)
            })
            break
          default:
            break
        }
      })
    }
  }

  componentWillUnmount() {
    document.removeEventListener('scroll', this.handlePagination);
  }

  handlePagination = () => {
    const wrappedElement = document.getElementById('root');
    if (this.isBottom(wrappedElement)) {
      document.body.classList.remove('pagination-fixed');
    } else {
      document.body.classList.add('pagination-fixed');
    }
  }

  updateTokenHOC(callingFunc, request) {
    let config = null;
    if(this.props.kc.isTokenExpired(0)) {
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

  reInitiateRequest(config, request) {
    const id = request.id;
    let requestType = '';
    let reqParam = '';
    switch (request.request_type) {
      case 1:
        requestType = 'registration';
        reqParam = 'reg_id';
        break;

      default:
        requestType = 'deregistration';
        reqParam = 'dereg_id';
        break;
    }
    const formData = new FormData();
    //formData.append('user_id', getUserInfo().sub);
    formData.append(reqParam, id);

    instance.post(`/review/restart/${requestType}/${id}`, formData, config)
      .then(response => {
        if(response.data) {
          SweetAlert({
            title: i18n.t('alert.success'),
            message: `${requestType} Request ID: ${id} has been re-initiated successfully`,
            type:'success'
          })
          this.updateTokenHOC(this.getSearchRequestsFromServer);
        }
      })
      .catch(error => {
        errors(this, error);
      })
  }

  closeRequest(config, request) {
    // Close Request
    MySwal.fire({
      title: i18n.t('Warning'),
      text: i18n.t('closeRequestAlert'),
      type: 'question',
      showCancelButton: true,
      confirmButtonText: i18n.t('ok'),
      cancelButtonText: i18n.t('cancel')
    }).then((result)=>{
      if(result.value){
        const id = request.id;
        let requestType = '';
        let reqParam = '';
        switch (request.request_type) {
          case 1:
            requestType = 'registration';
            reqParam = 'reg_id';
            break;

          default:
            requestType = 'deregistration';
            reqParam = 'dereg_id';
            break;
        }
        const formData = new FormData();
        formData.append('user_id', getUserInfo().sub);
        formData.append('close_request', 'True');
        formData.append(reqParam, id);

        instance.put(`/${requestType}`, formData, config)
          .then(response => {
            if(response.data) {
              SweetAlert({
                title: i18n.t('Closed'),
                message: `${i18n.t('Your')} ${requestType} ${i18n.t('Request ID')}: ${id} ${i18n.t('hasClosed')}`,
                type:'info'
              })
              this.updateTokenHOC(this.getSearchRequestsFromServer);
            }
          })
          .catch(error => {
            errors(this, error);
          })
      }
    })
  }

  saveSearchQuery(values) {
    if(getUserRole(this.props.resources) === AUTHORITY) {
      this.setState({ requestType: values.request_type });
    }
    this.setState({
      searchQuery: values,
      loading: true,
      showAllFilters: false,
      data: null,
      apiFetched: true,
      start: 1,
      activePage: 1
    }, () => {
      this.updateTokenHOC(this.getSearchRequestsFromServer);
    })
  }

  handlePageClick(page) {
    let a1 = 1;
    let d = this.state.limit;
    let start = a1 + d * (page - 1);

    this.setState({start: start, activePage: page, loading: true}, () => {
      this.updateTokenHOC(this.getSearchRequestsFromServer);
    });
  }

  handleLimitChange = (e) => {
    e.preventDefault();
    let limit = parseInt(e.target.value);
    let currentPage = Math.ceil(this.state.start / limit);
    this.setState({limit: limit},()=>{
      this.handlePageClick(currentPage);
    });
  }

  getSearchRequestsFromServer(config) {
    this.setState({loading: true});
    let start = this.state.start;
    let limit = this.state.limit;
    let searchQuery = this.state.searchQuery;
    const group = getUserRole(this.props.resources);
    let requestType = 1;
    if (this.state.requestType !== null) {
      requestType = parseInt(this.state.requestType);
    }
    delete searchQuery.request_type;
    switch (group) {
      case INDIVIDUAL_IMPORTER:
      case BULK_IMPORTER:
        requestType = 1;
        break;

      case EXPORTER:
        requestType = 2;
        break;

      default:
        break;
    }

    const postSearchData = {
      "start": start,
      "limit": limit,
      "search_specs": {
        "group": (group === AUTHORITY) ? 'reviewer' : group,
        "request_type": requestType,
        "user_id": ((this.props.userDetails || {}).sub || '')
      },
      "search_args": searchQuery
    }
    instance.post('/search?start=' + start + '&limit=' + limit, postSearchData, config)
      .then(response => {
        if (response.data.message) {
          this.setState({loading: false});
        } else {
          this.setState({
            data: response.data,
            totalCases: (response.data || {}).count,
            loading: false,
            apiFetched: true
          });
        }
      })
      .catch(error => {
        errors(this, error);
      })
  }

  handleShowFilters() {
    this.setState({ showAllFilters: !this.state.showAllFilters })
  }
  setSearchQuery(values){
    let query = []
    Object.keys(values).map((key,index)=>{
      switch (key) {
        case 'request_type':
          if(getUserRole(this.props.resources)===AUTHORITY){
            query.push(
              {
                name : key,
                id : index,
                label: 'requestType',
                value: parseInt(values[key]) === 1 ? i18n.t('registration') : i18n.t('deregistration')
              })
          }
          break;
        case 'brand':
          query.push(
            {name: key,id: index, label: 'brand', value: values[key]})
          break;
        case 'status':
          query.push({name: key,id: index, label: 'requestStatus', value: values[key]})
          break;
        case 'id':
          query.push({name: key,id: index, label: 'requestId', value: values[key]})
          break;
        case 'model_name':
          query.push({name: key,id: index, label: 'model', value: values[key]})
          break;
        case 'model_num':
          query.push({name: key,id: index, label: 'modelnumber', value: values[key]})
          break;
        case 'operating_system':
          query.push({name: key,id: index, label: 'operatingSystem', value: values[key]})
          break;
        case 'technologies':
          values[key].map((technology,i)=>{
            return query.push(
              {
                name: key,
                id: `technology${i}`,
                label: `${i18n.t('rat')}`,
                value: values[key][i]
              })
          })
          break;
        case 'imeis':
          values[key].map((imei,i)=>{
            return query.push(
              {
                name: key,
                id: `imei${i}`,
                label: `${i18n.t('deviceIMEIs')} ${i+1}`,
                value: values[key][i]
              })
          })
          break;
        case 'device_count':
          query.push({name: key,id: index, label: 'deviceCount', value: values[key]})
          break;
        case 'device_type':
          query.push({name: key,id: index, label: 'deviceType', value: values[key]})
          break;
        case 'imei_per_device':
          query.push({name: key,id: index, label: 'numberOfImeis', value: values[key]})
          break;
        case 'm_location':
          query.push({name: key,id: index, label: 'manufacturingLocation', value: values[key]})
          break;
        case 'created_at':
          query.push({name: key,id: index, label: 'createdDate', value: values[key]})
          break;
        case 'updated_at':
          query.push({name: key,id: index, label: 'lastUpdated', value: values[key]})
          break;
        default:
          break;
      }
      return ''
    })
    this.setState({
      currSearchQuery: query
    })
  }
  delSearchQuery(filters,selectedFilter){
    let searchQuery = this.state.searchQuery
    if(selectedFilter.name === 'request_type'){
      this.setState({
        requestType: 1
      })
    }
    if(selectedFilter === 'all'){
      this.setState({
        currSearchQuery: [],
        searchQuery:{}
      })
    } else {
      let query = filters.filter((el)=>{
        return el.id !== selectedFilter.id
      })
      delete searchQuery[selectedFilter.value]
      this.setState({
        searchQuery,
        currSearchQuery: query
      })
    }
  }
  render() {
    const options = ITEMS_PER_PAGE;
    const limitOptions = options.map((item)=>{
      return <option key={item.value} value={item.value}>{item.label}</option>
    })
    let searched_requests = null;
    let group = getUserRole(this.props.resources);
    if(((this.state.data || {}).requests || []).length > 0) {
      searched_requests = this.state.data.requests.map((searched_request) => {
        let links = '';
        let request_status = '';
        let processing_status = searched_request.processing_status_label;
        let report_status = searched_request.report_status_label;
        let isAuthority = group === AUTHORITY;
        if(isAuthority) {
          if(processing_status === 9 || report_status === 9) {
            request_status = 'Failed'
          } else if(processing_status === 11 || report_status === 11) {
            request_status = 'In Process'
          } else if(processing_status === 1 && report_status === 1) {
            request_status = 'In Complete'
          } else {
            request_status = searched_request.status;
          }
        } else {
          if(processing_status === 1 && report_status === 1 && (searched_request.status === 'Pending Review' ||
            searched_request.status === 'Information Requested')) {
            request_status = 'In Complete'
          } else {
            request_status = searched_request.status;
          }
        }
        if(searched_request.request_type === 1) {
          if (searched_request.status === 'New Request' || searched_request.status === 'Awaiting Documents') {
            links =
              <React.Fragment>
                {(group !== AUTHORITY)
                  ?
                  <React.Fragment>
                    <Link to={`/new-request-finish/${searched_request.id}`}>{i18n.t('complete')}</Link>{' | '}
                    <button className="btn btn-link btn-sm"
                            onClick={() => this.updateTokenHOC(this.closeRequest, searched_request)}>{i18n.t('close')}</button>
                  </React.Fragment>
                  :
                  null
                }
              </React.Fragment>
          } else if (searched_request.status === 'Information Requested') {
            links =
              <React.Fragment>
                {((group !== AUTHORITY) &&
                  <React.Fragment>
                    <Link to={`/update-registration/${searched_request.id}`}>{i18n.t('Modify')}</Link>{' | '}
                    <Link to={`/view-request/${searched_request.id}/registration`}>{i18n.t('view')}</Link>{' | '}
                    <button className="btn btn-link btn-sm"
                            onClick={() => this.updateTokenHOC(this.closeRequest, searched_request)}>{i18n.t('close')}</button>
                  </React.Fragment>)
                || <Link to={`/view-review/${searched_request.id}/registration`}>{i18n.t('view')}</Link>
                }
              </React.Fragment>
          } else if (searched_request.status === 'Pending Review') {
            links =
              <React.Fragment>
                {(group !== AUTHORITY)
                  ? <React.Fragment>
                    <Link to={`/update-registration/${searched_request.id}`}>{i18n.t('Modify')}</Link>{' | '}
                    <Link to={`/view-request/${searched_request.id}/registration`}>{i18n.t('view')}</Link>{' | '}
                    <button className="btn btn-link btn-sm"
                            onClick={() => this.updateTokenHOC(this.closeRequest, searched_request)}>{i18n.t('close')}</button>
                  </React.Fragment>
                  : (searched_request.reviewer.user_id === getUserInfo().sub)
                    ? (request_status === 'Failed') ?
                      <button className="btn btn-link btn-sm"
                              onClick={() => this.updateTokenHOC(this.reInitiateRequest, searched_request)}>
                        Re-initiate</button> : (request_status !== 'In Process') ?
                        <Link to={`/review-registration/${searched_request.id}/registration`}>
                          {i18n.t('Review')}</Link>: null
                    : (request_status === 'Failed') ?
                      <button className="btn btn-link btn-sm"
                              onClick={() => this.updateTokenHOC(this.reInitiateRequest, searched_request)}>
                        Re-initiate</button> : (request_status !== 'In Process') ?
                        <Link to={`/view-review/${searched_request.id}/registration`}>
                          {i18n.t('view')}</Link>: null
                }
              </React.Fragment>
          } else if (searched_request.status === 'In Review') {
            links =
              <React.Fragment>
                {(group === AUTHORITY) ?
                  <React.Fragment>
                    {(searched_request.reviewer.user_id === getUserInfo().sub)
                      ? (request_status === 'Failed') ?
                        <button className="btn btn-link btn-sm"
                                onClick={() => this.updateTokenHOC(this.reInitiateRequest, searched_request)}>
                          Re-initiate</button> : (request_status !== 'In Process') ?
                          <Link to={`/review-registration/${searched_request.id}/registration`}>{i18n.t('Review')}</Link>: null
                      : (request_status === 'Failed') ?
                        <button className="btn btn-link btn-sm"
                                onClick={() => this.updateTokenHOC(this.reInitiateRequest, searched_request)}>
                          Re-initiate</button> : (request_status !== 'In Process') ?
                          <Link to={`/view-review/${searched_request.id}/registration`}>{i18n.t('view')}</Link>: null
                    }
                  </React.Fragment>
                  : <Link to={`/view-request/${searched_request.id}/registration`}>{i18n.t('view')}</Link>
                }
              </React.Fragment>
          } else if (searched_request.status === 'Approved' || searched_request.status === 'Closed' ||
            searched_request.status === 'Rejected') {
            links =
              <React.Fragment>
                {((group !== AUTHORITY) &&
                  <React.Fragment>
                    <Link to={`/view-request/${searched_request.id}/registration`}>{i18n.t('view')}</Link>
                  </React.Fragment>)
                || (<Link to={`/view-review/${searched_request.id}/registration`}>{i18n.t('view')}</Link>)
                }
              </React.Fragment>
          }
        } else if(searched_request.request_type === 2) {
          if (searched_request.status === 'New Request' || searched_request.status === 'Awaiting Documents') {
            links =
              <React.Fragment>
                {(group !== AUTHORITY)
                  ?
                  <React.Fragment>
                    <Link to={`/de-registration-finish/${searched_request.id}`}>{i18n.t('complete')}</Link>{' | '}
                    <button className="btn btn-link btn-sm"
                            onClick={() => this.updateTokenHOC(this.closeRequest, searched_request)}>{i18n.t('close')}</button>
                  </React.Fragment>
                  :
                  null
                }
              </React.Fragment>
          } else if (searched_request.status === 'Information Requested') {
            links =
              <React.Fragment>
                {((group !== AUTHORITY) &&
                  <React.Fragment>
                    <Link to={`/update-deregistration/${searched_request.id}`}>{i18n.t('Modify')}</Link>{' | '}
                    <Link to={`/view-request/${searched_request.id}/deregistration`}>{i18n.t('view')}</Link>{' | '}
                    <button className="btn btn-link btn-sm"
                            onClick={() => this.updateTokenHOC(this.closeRequest, searched_request)}>{i18n.t('close')}</button>
                  </React.Fragment>)
                || <Link to={`/view-review/${searched_request.id}/deregistration`}>{i18n.t('view')}</Link>
                }
              </React.Fragment>
          } else if (searched_request.status === 'Pending Review') {
            links =
              <React.Fragment>
                {(group !== AUTHORITY)
                  ? <React.Fragment>
                    <Link to={`/update-deregistration/${searched_request.id}`}>{i18n.t('Modify')}</Link>{' | '}
                    <Link to={`/view-request/${searched_request.id}/deregistration`}>{i18n.t('view')}</Link>{' | '}
                    <button className="btn btn-link btn-sm"
                            onClick={() => this.updateTokenHOC(this.closeRequest, searched_request)}>{i18n.t('close')}</button>
                  </React.Fragment>
                  : (searched_request.reviewer.user_id === getUserInfo().sub)
                    ? (request_status === 'Failed') ?
                      <button className="btn btn-link btn-sm"
                              onClick={() => this.updateTokenHOC(this.reInitiateRequest, searched_request)}>
                        Re-initiate</button>: (request_status !== 'In Process') ?
                        <Link to={`/review-registration/${searched_request.id}/deregistration`}>{i18n.t('Review')}</Link>: null
                    : (request_status === 'Failed') ?
                      <button className="btn btn-link btn-sm"
                              onClick={() => this.updateTokenHOC(this.reInitiateRequest, searched_request)}>
                        Re-initiate</button>: (request_status !== 'In Process') ?
                        <Link to={`/view-review/${searched_request.id}/deregistration`}>{i18n.t('view')}</Link>: null
                }
              </React.Fragment>
          } else if (searched_request.status === 'In Review') {
            links =
              <React.Fragment>
                {(group === AUTHORITY) ?
                  <React.Fragment>
                    {(searched_request.reviewer.user_id === getUserInfo().sub)
                      ? (request_status === 'Failed') ?
                        <button className="btn btn-link btn-sm"
                                onClick={() => this.updateTokenHOC(this.reInitiateRequest, searched_request)}>
                          Re-initiate</button> : (request_status !== 'In Process') ?
                          <Link to={`/review-registration/${searched_request.id}/deregistration`}>{i18n.t('Review')}</Link> : null
                      : (request_status === 'Failed') ?
                        <button className="btn btn-link btn-sm"
                                onClick={() => this.updateTokenHOC(this.reInitiateRequest, searched_request)}>
                          Re-initiate</button> : (request_status !== 'In Process') ?
                          <Link to={`/view-review/${searched_request.id}/deregistration`}>{i18n.t('view')}</Link> : null
                    }
                  </React.Fragment>
                  : <Link to={`/view-request/${searched_request.id}/deregistration`}>{i18n.t('view')}</Link>
                }
              </React.Fragment>
          } else if (searched_request.status === 'Approved' || searched_request.status === 'Closed' ||
            searched_request.status === 'Rejected') {
            links =
              <React.Fragment>
                {((group !== AUTHORITY) &&
                  <React.Fragment>
                    <Link to={`/view-request/${searched_request.id}/deregistration`}>{i18n.t('view')}</Link>
                  </React.Fragment>)
                || (<Link to={`/view-review/${searched_request.id}/deregistration`}>{i18n.t('view')}</Link>)
                }
              </React.Fragment>
          }
        }
        return (
          <tr key={searched_request.tracking_id}>
            <td data-label="Request Status" className="d-md-none d-sm-block"><span
              className={getStatusClass(request_status)} data-for="status"
              data-tip={request_status === 'In Complete' ? true : null}>{request_status}</span>
            </td>
            <td data-label="Request ID">{searched_request.id}</td>
            <td data-label="Request Type">{searched_request.request_type === 1 ? i18n.t('registration'): i18n.t('deregistration')}</td>
            <td data-label="Device Count">{searched_request.device_details.device_count}</td>
            <td data-label="Date Created">{moment(searched_request.created_at).format('HH:mm DD/MM/YYYY')}</td>
            <td data-label="Date Last Updated">{moment(searched_request.updated_at).format('HH:mm DD/MM/YYYY')}</td>
            <td data-label="Request Status" className="d-sm-down-none">
              <span className={getStatusClass(request_status)}
                    data-for="status"
                    data-tip={request_status === 'In Complete' ? true : null}>{i18n.t(request_status)}</span>
            </td>
            <td data-label="Actions">{links}
              <ReactTooltip id="status" effect="solid">
                {group === AUTHORITY
                  ? <p>The user modified the request but didn't complete all the sections</p>
                  : <p>Please Modify all the sections otherwise your request won't be processed</p>
                }
              </ReactTooltip>
            </td>
          </tr>
        )
      });
    }
    const {t} = this.props
    const {
      redirectedFromPage,
      showAllFilters,
      currSearchQuery,
      searchQuery,
      filters,
      loading,
      data,
      apiFetched,
      totalCases,
      activePage,
      limit,
      start
    } = this.state
    return (

      <div className="search-box animated fadeIn">
        <div className="filters">
          <Card>
            <CardHeader>
              <b>{t('searchFilters')}</b>
            </CardHeader>
            <CardBody>
              {((!loading || !redirectedFromPage) &&
              <MyEnhancedForm
                showFilters={this.handleShowFilters} toggle={showAllFilters}
                callServer={this.saveSearchQuery}
                group={group}
                setSearchQuery={this.setSearchQuery}
                delSearchQuery={this.delSearchQuery}
                currSearchQuery={currSearchQuery}
                searchQuery={searchQuery}
                requestType={filters.requestType}
                status={filters.status}
                id={filters.id}
                loading={loading}
                toggleRedirected={() => this.setState({redirectedFromPage: false})}
                redirectedFromPage={redirectedFromPage}
              />) || <span>Loading...</span>
              }
            </CardBody>
          </Card>
        </div>
        <div className="listbox">
          {
            (loading)
              ?
              (
                <div>
                  <TableLoader />
                </div>
              )
              : ((data || {}).requests || []).length > 0
              ? <div>
                <Card className="mb-1">
                  <CardHeader className="border-bottom-0">
                    <b className="text-primary">{(this.state.totalCases > 1) ? `${this.state.totalCases} ${i18n.t('Requests found')}`:
                      `${this.state.totalCases} Request found`}</b>
                    {(group === AUTHORITY) &&
                    <button className="btn btn-link btn-sm float-right font-weight-bold"
                            onClick={() => this.updateTokenHOC(this.getSearchRequestsFromServer)}>
                      <i className="fa fa-refresh"></i>{t('refresh')}
                    </button>
                    }
                  </CardHeader>
                </Card>
                <table className="table table-sm table-bordered table-hover mt-3 table-mobile-primary table-search">
                  <thead className="thead-light">
                  <tr>
                    <th>{t('requestId')}</th>
                    <th>{t('requestType')}</th>
                    <th>{t('deviceCount')}</th>
                    <th>{t('createdDate')}</th>
                    <th>{t('lastUpdated')}</th>
                    <th>{t('requestStatus')}</th>
                    <th>{t('actions')}</th>
                  </tr>
                  </thead>
                  <tbody>
                  {searched_requests}
                  </tbody>
                </table>
              </div>
              : (apiFetched)
                ?
                <Card className="mb-1">
                  <CardHeader className="border-bottom-0">
                    <b className="text-danger">{i18n.t('noRequestFound')}</b>
                  </CardHeader>
                </Card>
                : null
          }
        </div>

        {(((data || {}).requests || []).length > 0 &&
          totalCases > PAGE_LIMIT && !(loading)) &&
        <article className='data-footer'>
          <Pagination
            pageRangeDisplayed={window.matchMedia("(max-width: 767px)").matches ? 4 : 10}
            activePage={activePage}
            itemsCountPerPage={limit}
            totalItemsCount={totalCases}
            onChange={this.handlePageClick}
            innerClass="pagination"
          />
          <div className="hand-limit">
            <Label>{i18n.t('show')}</Label>
            <div className="selectbox">
              <Input value={limit} onChange={(e) => {
                this.handleLimitChange(e)
              }} type="select" name="select">
                {limitOptions}
              </Input>
            </div>
            <Label>{i18n.t('requests')}</Label>
          </div>
          <div className='start-toend'>
            <DataTableInfo start={start} limit={limit} total={totalCases}
                           itemType={'requests'}/>
          </div>
        </article>
        }
      </div>
    )
  }
}

export default translate('translations')(SearchRequests);
