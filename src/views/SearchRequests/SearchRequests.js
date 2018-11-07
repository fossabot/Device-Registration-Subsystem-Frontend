/*
Copyright (c) 2018 Qualcomm Technologies, Inc.
All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted (subject to the limitations in the disclaimer below) provided that the following conditions are met:

* Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
* Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
* Neither the name of Qualcomm Technologies, Inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.
NO EXPRESS OR IMPLIED LICENSES TO ANY PARTY'S PATENT RIGHTS ARE GRANTED BY THIS LICENSE. THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

import React, { Component } from 'react';
import { translate, I18n } from 'react-i18next';
import {Row, Col, Button, Form, Label, FormGroup, Card, CardHeader, CardBody} from 'reactstrap';
import { Link } from "react-router-dom";
import { withFormik, Field } from 'formik';
// Date Picker
import "react-dates/initialize";
import RenderDateRangePicker from "../../components/Form/RenderDateRangePicker";
import renderInput from "../../components/Form/RenderInput";
import MultiSelect from "../../components/Form/MultiSelect";
import "react-dates/lib/css/_datepicker.css";
import {instance, errors, getAuthHeader, getStatusClass, getUserInfo, getUserRole} from "../../utilities/helpers";
import {PAGE_LIMIT, STATUS_TYPES, DEVICE_TYPES, TECHNOLOGIES, AUTHORITY, EXPORTER, BULK_IMPORTER, INDIVIDUAL_IMPORTER} from '../../utilities/constants';
import TableLoader from './../../components/Loaders/TableLoader';
import Pagination from "react-js-pagination";
import { toast } from 'react-toastify';
import RenderSelect from "../../components/Form/RenderSelect";
import DataTableInfo from '../../components/DataTable/DataTableInfo';
import ReactTooltip from 'react-tooltip'

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
    this.handleTypeChange = this.handleTypeChange.bind(this);
    this.handleResetForm = this.handleResetForm.bind(this);
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
  }
  componentDidMount() {
    let technologies = []
    for (let i = 0; i < TECHNOLOGIES.length; i ++) {
      if(typeof technologies[i] === 'undefined') {
        technologies[i] = {}
      }
      technologies[i].label = TECHNOLOGIES[i].description;
      technologies[i].value = TECHNOLOGIES[i].description;
      //this.setState({ technologies: technologies[i]});
    }
    this.setState({ technologies: technologies, techSelect: true});
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
      dirty,
      group
    } = this.props;

    return (
      <Form onSubmit={handleSubmit}>
        <Row className="justify-content-end">
          <Col xs={12} sm={6} md={4} xl={3}>
            <Field name="id" component={renderInput} type="text" label="Request ID" placeholder="Request ID" />
          </Col>
          <Col xs={12} sm={6} md={4} xl={3}>
            <FormGroup>
              <Label> Request Status </Label>
              <div className="selectbox">
                <Field component="select" name="status" className="form-control">
                  <option value="">Select Request status</option>
                    {STATUS_TYPES.map((status) => {
                      if((group === AUTHORITY)) {
                          if(status.description === 'New Request' || status.description === 'Awaiting Documents'  || status.description === 'Closed' || status.description === 'Failed' || status.description === 'Processed' || status.description === 'Processing') {
                              // Ignore the above Statuses
                            return null;
                          } else {
                            return (
                               <option value={status.description} key={status.id}>{status.description}</option>
                            )
                          }
                      } else if(status.description === 'Failed' || status.description === 'Processed' || status.description === 'Processing') {
                          // Ignore the above Statuses
                        return null;
                      } else {
                        return (
                           <option value={status.description} key={status.id}>{status.description}</option>
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
                  <Label> Request Type </Label>
                  <div className="selectbox">
                    <select onChange={this.handleTypeChange} name="request_type" className="form-control">
                      <option value="1" defaultValue={1}>Registration</option>
                      <option value="2">De-registration</option>
                    </select>
                  </div>
                </FormGroup>
              </Col>
              }
          <Col xs={12} sm={(group === AUTHORITY) ? 6 : 12} md={(group === AUTHORITY) ? 12 : 4} xl={(group === AUTHORITY) ? 3 : 6}>
            <FormGroup>
             <MultiSelect
                value={values.imeis}
                onChange={setFieldValue}
                onBlur={setFieldTouched}
                error={errors.imeis}
                touched={touched.imeis}
                fieldName="imeis"
                label="Device IMEIs"
                placeholder="Type IMEI and Press Enter"
              />
            </FormGroup>
          </Col>
        </Row>
        <div className={toggle ? 'collapse show': 'collapse'}>
          <Row>
              <Col xs={12} sm={6} md={4} xl={3}>
                <FormGroup>
                  <Label>Created Date</Label>
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
                  <Label>Date Last Updated</Label>
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
                <Field name="brand" component={renderInput} type="text" label="Brand" placeholder="Brand" />
              </Col>
              <Col xs={12} sm={6} md={4} xl={3}>
                <Field name="model_name" component={renderInput} type="text" label="Model Name" placeholder="Model Name" />
              </Col>
              <Col xs={12} sm={6} md={4} xl={3}>
                <Field name="model_num" component={renderInput} type="text" label="Model Number" placeholder="Model Number" />
              </Col>
              <Col xs={12} sm={6} md={4} xl={3}>
                <FormGroup>
                  <Label> Device types </Label>
                  <div className="selectbox">
                    <Field component="select" name="device_type" className="form-control">
                      <option value="">Select Device type</option>
                        {DEVICE_TYPES.map((type) => (
                               <option value={type.description} key={type.id}>{type.description}</option>
                        ))}
                    </Field>
                  </div>
                </FormGroup>
              </Col>
              <Col xs={12} sm={6} md={4} xl={3}>
                <Field name="operating_system" component={renderInput} type="text" label="Operating System" placeholder="Operating System" />
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
                      label="Technologies"
                      placeholder="Select Technologies"
                      stayOpen={true}
                      multi={true}
                    />
                  }
                </FormGroup>
              </Col>
              <Col xs={12} sm={6} md={4} xl={3}>
                <Field name="device_count" component={renderInput} type="number" label="Device Count" placeholder="Device Count" />
              </Col>
              {(group !== EXPORTER && this.state.requestRelatedCheck) &&
              <React.Fragment>
              <Col xs={12} sm={6} md={4} xl={3}>
                <Field name="imei_per_device" component={renderInput} type="number" label="Number of IMEIs per device"
                       placeholder="Number of IMEIs per device"/>
              </Col>
              <Col xs={12} sm={6} md={4} xl={3}>
                <FormGroup>
                  <Label> Manufacturing Location </Label>
                  <div className="selectbox">
                    <Field component="select" name="m_location" className="form-control">
                      <option value="">Select Manufacturing Location</option>
                      <option value="local">Local</option>
                      <option value="overseas">Overseas</option>
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
              <Button color="default" onClick={() => { this.handleResetForm(); }} disabled={!dirty || isSubmitting} block>Clear Search</Button>
            </FormGroup>
          </Col>
          <Col xs={12} sm={6} md={4} xl={3}>
            <FormGroup>
              <Button color="default" block onClick={showFilters}>{toggle ? 'Hide More Filters': 'Show More Filters'}</Button>
            </FormGroup>
          </Col>
          <Col xs={12} sm={12} md={4} xl={3}>
            <Button color="primary" type="submit" block  disabled={isSubmitting}>Search Requests</Button>
          </Col>
        </Row>
      </Form>
    );
  }
}

const MyEnhancedForm = withFormik({
  mapPropsToValues: () => ({ "id": "", "status": "", "created_at": "", "updated_at": "", "request_type": "1", "brand": "", "model_name": "", "model_num": "", "device_type": "", "operating_system": "", "technologies": "", "device_count": "", "imei_per_device": "", "imeis": [], "m_location": "" }),

  // Custom sync validation
  validate: values => {
      let errors = {};
      if (!values.device_count) {

      } else if (isNaN(Number(values.device_count))) {
          errors.device_count = 'Must be a number'
      } else if (!/^([1-9][0-9]{0,5}|1000000)$/i.test(values.device_count)) {
          errors.device_count = 'Must be in between 1-1,000,000';
      }

      if (!values.imei_per_device) {

      } else if (isNaN(Number(values.imei_per_device))) {
          errors.imei_per_device = 'Must be a number'
      } else if (!/^[1-5]$/i.test(values.imei_per_device)) {
          errors.imei_per_device = 'Must be in between 1-5';
      }
      return errors;
  },

  handleSubmit: (values, bag) => {
    bag.setSubmitting(false);
    bag.props.callServer(prepareAPIRequest(values));
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
      requestType: null
    }
    this.handleShowFilters = this.handleShowFilters.bind(this);
    this.getSearchRequestsFromServer = this.getSearchRequestsFromServer.bind(this);
    this.handlePageClick = this.handlePageClick.bind(this);
    this.saveSearchQuery = this.saveSearchQuery.bind(this);
    this.closeRequest = this.closeRequest.bind(this);
    this.reInitiateRequest = this.reInitiateRequest.bind(this);
    this.updateTokenHOC = this.updateTokenHOC.bind(this);
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
            toast.success(`${requestType} Request ID: ${id} has been re-initiated successfully`);
            this.updateTokenHOC(this.getSearchRequestsFromServer);
          }
      })
      .catch(error => {
          errors(this, error);
      })
  }

  closeRequest(config, request) {
      // Close Request
      if(window.confirm('Are you sure you want to close this request ?')) {
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
                toast.success(`Your ${requestType} Request ID: ${id} has been closed`);
                this.updateTokenHOC(this.getSearchRequestsFromServer);
              }
          })
          .catch(error => {
              errors(this, error);
          })
      }
  }
  saveSearchQuery(values) {
    if(getUserRole(this.props.resources) === AUTHORITY) {
        this.setState({ requestType: values.request_type });
    }
    this.setState({ searchQuery: values, loading: true, showAllFilters: false, data: null, apiFetched: true, start: 1, activePage: 1} , () => {
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

  getSearchRequestsFromServer(config) {
      this.setState({ loading: true });
      let start = this.state.start;
      let limit = this.state.limit;
      let searchQuery = this.state.searchQuery;
      const group = getUserRole(this.props.resources);
      let requestType = 1;
      if(this.state.requestType !== null) {
        requestType = parseInt(this.state.requestType);
      }
      delete searchQuery.request_type;
      switch(group) {
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
        "search_specs":{
            "group": (group === AUTHORITY) ? 'reviewer' : group,
            "request_type": requestType,
            "user_id": ((this.props.userDetails || {}).sub || '')
        },
        "search_args": searchQuery
      }
      instance.post('/search?start='+start+'&limit='+limit, postSearchData, config)
          .then(response => {
              if(response.data.message) {
                this.setState({ loading: false });
              } else {
                this.setState({ data: response.data, totalCases: (response.data || {}).count, loading: false});
              }
          })
          .catch(error => {
              errors(this, error);
          })
  }

  handleShowFilters() {
    this.setState({ showAllFilters: !this.state.showAllFilters })
  }
  render() {
    let searched_requests = null;
    let group = getUserRole(this.props.resources);
    if(((this.state.data || {}).requests || []).length > 0) {
      searched_requests = this.state.data.requests.map((searched_request) => {
          let links = '';
          //let request_status = (group === AUTHORITY && searched_request.status === 'Pending Review' && searched_request.report === null) ? 'In Process' : searched_request.status;
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
            if(processing_status === 1 && report_status === 1 && (searched_request.status === 'Pending Review' || searched_request.status === 'Information Requested')) {
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
                            <Link to={`/new-request-finish/${searched_request.id}`}>Complete</Link>{' | '}
                            <button className="btn btn-link btn-sm" onClick={() => this.updateTokenHOC(this.closeRequest, searched_request)}>Close</button>
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
                                  <Link to={`/update-registration/${searched_request.id}`}>Modify</Link>{' | '}
                                  <Link to={`/view-request/${searched_request.id}/registration`}>View</Link>{' | '}
                                  <button className="btn btn-link btn-sm" onClick={() => this.updateTokenHOC(this.closeRequest, searched_request)}>Close</button>
                              </React.Fragment>)
                            || <Link to={`/view-review/${searched_request.id}/registration`}>View</Link>
                          }
                      </React.Fragment>
              } else if (searched_request.status === 'Pending Review') {
                links =
                      <React.Fragment>
                        {(group !== AUTHORITY)
                          ? <React.Fragment>
                            <Link to={`/update-registration/${searched_request.id}`}>Modify</Link>{' | '}
                            <Link to={`/view-request/${searched_request.id}/registration`}>View</Link>{' | '}
                            <button className="btn btn-link btn-sm" onClick={() => this.updateTokenHOC(this.closeRequest, searched_request)}>Close</button>
                          </React.Fragment>
                          : (searched_request.reviewer.user_id === getUserInfo().sub)
                            ? (request_status === 'Failed') ? <button className="btn btn-link btn-sm" onClick={() => this.updateTokenHOC(this.reInitiateRequest, searched_request)}>Re-initiate</button> : (request_status !== 'In Process') ? <Link to={`/review-registration/${searched_request.id}/registration`}>Review</Link>: null
                            : (request_status === 'Failed') ? <button className="btn btn-link btn-sm" onClick={() => this.updateTokenHOC(this.reInitiateRequest, searched_request)}>Re-initiate</button> : (request_status !== 'In Process') ? <Link to={`/view-review/${searched_request.id}/registration`}>View</Link>: null
                        }
                      </React.Fragment>
              } else if (searched_request.status === 'In Review') {
                  links =
                      <React.Fragment>
                          {(group === AUTHORITY) ?
                              <React.Fragment>
                                  {(searched_request.reviewer.user_id === getUserInfo().sub)
                                     ? (request_status === 'Failed') ? <button className="btn btn-link btn-sm" onClick={() => this.updateTokenHOC(this.reInitiateRequest, searched_request)}>Re-initiate</button> : (request_status !== 'In Process') ? <Link to={`/review-registration/${searched_request.id}/registration`}>Review</Link>: null
                                     : (request_status === 'Failed') ? <button className="btn btn-link btn-sm" onClick={() => this.updateTokenHOC(this.reInitiateRequest, searched_request)}>Re-initiate</button> : (request_status !== 'In Process') ? <Link to={`/view-review/${searched_request.id}/registration`}>View</Link>: null
                                  }
                              </React.Fragment>
                              : <Link to={`/view-request/${searched_request.id}/registration`}>View</Link>
                          }
                      </React.Fragment>
              } else if (searched_request.status === 'Approved' || searched_request.status === 'Closed' || searched_request.status === 'Rejected') {
                  links =
                      <React.Fragment>
                          {((group !== AUTHORITY) &&
                              <React.Fragment>
                                  <Link to={`/view-request/${searched_request.id}/registration`}>View</Link>
                              </React.Fragment>)
                            || (<Link to={`/view-review/${searched_request.id}/registration`}>View</Link>)
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
                            <Link to={`/de-registration-finish/${searched_request.id}`}>Complete</Link>{' | '}
                            <button className="btn btn-link btn-sm" onClick={() => this.updateTokenHOC(this.closeRequest, searched_request)}>Close</button>
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
                                  <Link to={`/update-deregistration/${searched_request.id}`}>Modify</Link>{' | '}
                                  <Link to={`/view-request/${searched_request.id}/deregistration`}>View</Link>{' | '}
                                  <button className="btn btn-link btn-sm" onClick={() => this.updateTokenHOC(this.closeRequest, searched_request)}>Close</button>
                              </React.Fragment>)
                              || <Link to={`/view-review/${searched_request.id}/deregistration`}>View</Link>
                          }
                      </React.Fragment>
              } else if (searched_request.status === 'Pending Review') {
                  links =
                      <React.Fragment>
                      {(group !== AUTHORITY)
                          ? <React.Fragment>
                              <Link to={`/update-deregistration/${searched_request.id}`}>Modify</Link>{' | '}
                              <Link to={`/view-request/${searched_request.id}/deregistration`}>View</Link>{' | '}
                              <button className="btn btn-link btn-sm" onClick={() => this.updateTokenHOC(this.closeRequest, searched_request)}>Close</button>
                            </React.Fragment>
                          : (searched_request.reviewer.user_id === getUserInfo().sub)
                          ? (request_status === 'Failed') ? <button className="btn btn-link btn-sm" onClick={() => this.updateTokenHOC(this.reInitiateRequest, searched_request)}>Re-initiate</button>: (request_status !== 'In Process') ? <Link to={`/review-registration/${searched_request.id}/deregistration`}>Review</Link>: null
                          : (request_status === 'Failed') ? <button className="btn btn-link btn-sm" onClick={() => this.updateTokenHOC(this.reInitiateRequest, searched_request)}>Re-initiate</button>: (request_status !== 'In Process') ? <Link to={`/view-review/${searched_request.id}/deregistration`}>View</Link>: null
                      }
                      </React.Fragment>
              } else if (searched_request.status === 'In Review') {
                  links =
                      <React.Fragment>
                          {(group === AUTHORITY) ?
                              <React.Fragment>
                                {(searched_request.reviewer.user_id === getUserInfo().sub)
                                  ? (request_status === 'Failed') ? <button className="btn btn-link btn-sm" onClick={() => this.updateTokenHOC(this.reInitiateRequest, searched_request)}>Re-initiate</button>: (request_status !== 'In Process') ? <Link to={`/review-registration/${searched_request.id}/deregistration`}>Review</Link>: null
                                  : (request_status === 'Failed') ? <button className="btn btn-link btn-sm" onClick={() => this.updateTokenHOC(this.reInitiateRequest, searched_request)}>Re-initiate</button>: (request_status !== 'In Process') ? <Link to={`/view-review/${searched_request.id}/deregistration`}>View</Link>: null
                                }
                              </React.Fragment>
                              : <Link to={`/view-request/${searched_request.id}/deregistration`}>View</Link>
                          }
                      </React.Fragment>
              } else if (searched_request.status === 'Approved' || searched_request.status === 'Closed' || searched_request.status === 'Rejected') {
                  links =
                      <React.Fragment>
                          {((group !== AUTHORITY) &&
                              <React.Fragment>
                                  <Link to={`/view-request/${searched_request.id}/deregistration`}>View</Link>
                              </React.Fragment>)
                            || (<Link to={`/view-review/${searched_request.id}/deregistration`}>View</Link>)
                          }
                      </React.Fragment>
              }
          }
          return (
                <tr key={searched_request.tracking_id}>
                    <td data-label="Request Status" className="d-md-none d-sm-block"><span className={getStatusClass(request_status)} data-for="status" data-tip={request_status === 'In Complete' ? true : null}>{request_status}</span>
                    </td>
                    <td data-label="Request ID">{searched_request.id}</td>
                    <td data-label="Request Type">{searched_request.request_type === 1 ? 'Registration': 'De-registration'}</td>
                    <td data-label="Device Count">{searched_request.device_details.device_count}</td>
                    <td data-label="Date Created">{searched_request.created_at}</td>
                    <td data-label="Date Last Updated">{searched_request.updated_at}</td>
                    <td data-label="Request Status" className="d-sm-down-none"><span className={getStatusClass(request_status)} data-for="status" data-tip={request_status === 'In Complete' ? true : null}>{request_status}</span>
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
    return (
        <I18n ns="translations">
        {
          (t, { i18n }) => (
            <div className="search-box animated fadeIn">
              <div className="filters">
                <Card>
                  <CardHeader>
                    <b>Search Filters</b>
                  </CardHeader>
                  <CardBody>
                    <MyEnhancedForm showFilters={this.handleShowFilters} toggle={this.state.showAllFilters} callServer={this.saveSearchQuery} group={group}/>
                  </CardBody>
                </Card>
              </div>
              <div className="listbox">
              {
                (this.state.loading)
                    ?
                    (
                        <div>
                            <TableLoader />
                        </div>
                    )
                    : ((this.state.data || {}).requests || []).length > 0
                    ? <div>
                        <Card className="mb-1">
                            <CardHeader className="border-bottom-0">
                                <b className="text-primary">{(this.state.totalCases > 1) ? `${this.state.totalCases} Requests found`: `${this.state.totalCases} Request found`}</b>
                              {(group === AUTHORITY) &&
                              <button className="btn btn-link btn-sm float-right font-weight-bold"
                                 onClick={() => this.updateTokenHOC(this.getSearchRequestsFromServer)}><i
                                className="fa fa-refresh"></i> Refresh</button>
                              }
                            </CardHeader>
                        </Card>
                        <table className="table table-sm table-bordered table-hover mt-3 table-mobile-primary table-search">
                            <thead className="thead-light">
                                <tr>
                                    <th>Request ID</th>
                                    <th>Request Type</th>
                                    <th>Device Count</th>
                                    <th>Date Created</th>
                                    <th>Date Last Updated</th>
                                    <th>Request Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {searched_requests}
                            </tbody>
                        </table>
                      </div>
                    : (this.state.apiFetched)
                    ?
                        <Card className="mb-1">
                            <CardHeader className="border-bottom-0">
                                <b className="text-danger">No Requests Found</b>
                            </CardHeader>
                        </Card>
                        : null
              }
              </div>

              {((((this.state.data || {}).requests || []).length > 0 && this.state.totalCases > PAGE_LIMIT) &&
              <Row>
                <Col xs={12} lg={6}>
                  <div className='mt-3'>
                    <DataTableInfo start={this.state.start} limit={this.state.limit} total={this.state.totalCases} itemType={'requests'} />
                  </div>
                </Col>
                <Col xs={12} lg={6}>
                  <Pagination
                    pageRangeDisplayed={window.matchMedia("(max-width: 767px)").matches ? 4 : 10}
                    activePage={this.state.activePage}
                    itemsCountPerPage={this.state.limit}
                    totalItemsCount={this.state.totalCases}
                    onChange={this.handlePageClick}
                    innerClass="pagination float-right mt-3"
                  />
                </Col>
              </Row>) || <div className="mb-3"></div>}
            </div>
          )
        }
        </I18n>
    )
  }
}

export default translate('translations')(SearchRequests);
