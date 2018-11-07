/*
Copyright (c) 2018 Qualcomm Technologies, Inc.
All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted (subject to the limitations in the disclaimer below) provided that the following conditions are met:

* Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
* Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
* Neither the name of Qualcomm Technologies, Inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.
NO EXPRESS OR IMPLIED LICENSES TO ANY PARTY'S PATENT RIGHTS ARE GRANTED BY THIS LICENSE. THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

import React, {Component} from 'react';
import {translate, I18n} from 'react-i18next';
import {withFormik, Field, FieldArray} from 'formik';
import {
  Row,
  Col,
  Button,
  Form,
  Label,
  FormGroup,
  Card,
  CardHeader,
  CardBody,
  ModalHeader,
  ModalBody,
  ModalFooter
} from 'reactstrap';
import renderInput from './../../components/Form/RenderInput'
import RenderModal from '../../components/Form/RenderModal'
import renderError from './../../components/Form/RenderError'
import RenderFileInput from './../../components/Form/RenderFileInput'
import StepIndicator from './../../components/Sidebar/StepIndicator';
import {
  getExtension,
  instance,
  errors,
  getUserInfo,
  capitalize,
  getAuthHeader,
  downloadDocument,
  removeExtension,
  downloadSampleFile
} from "../../utilities/helpers";
import {toast} from 'react-toastify';
import {
  DOCUMENTS,
  DE_DOCUMENTS,
  EXTENSIONS,
} from "../../utilities/constants";
import StepLoading from "../../components/Loaders/StepLoading";

class DeRegistrationStep1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      step1FileUpload: false
    }
    this.handleFileUpload = this.handleFileUpload.bind(this);
  }

  handleFileUpload(e) {
    e.preventDefault();
    this.setState({step1FileUpload: true});
    this.props.setFieldValue('filename', '', false);
  }

  render() {
    const {
      values,
      errors,
      touched,
      handleSubmit,
      isSubmitting,
      setFieldValue,
      setFieldTouched,
      stepsInfo,
      step,
      stepReady,
      kcProps
    } = this.props;
    return (
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col className='order-xl-12 mt-3' xs={12} xl={4}>
            <StepIndicator stepsInfo={stepsInfo} step={step}></StepIndicator>
            <div className="samplefile">
              <p><i className="fa fa-file-text-o fa-3x"></i>Sample IMEI File</p>
              <p className="text-right">
                <button onClick={(e) => {
                  downloadSampleFile(kcProps,'deregistration', e)
                }} className="btn btn-outline-dark">Download file
                </button>
              </p>
            </div>
          </Col>
          <Col className='order-xl-1 mt-3' xs={12} xl={8}>
            <Card>
              <CardHeader>
                <b>Basic De-registration details</b>
              </CardHeader>
              <CardBody className='steps-loading'>
                {!stepReady &&
                <StepLoading></StepLoading>
                }
                <div>
                  <Row>
                    <Col xs={12} sm={6}>
                      <RenderFileInput
                        onChange={setFieldValue}
                        onBlur={setFieldTouched}
                        error={errors.filename}
                        touched={touched.filename}
                        values={values.filename}
                        fieldName="filename"
                        type="file"
                        inputClass="asitfield"
                        inputClassError="asitfield is-invalid"
                        label="Device IMEIs"
                        requiredStar
                      />
                    </Col>
                    <Col xs={12} sm={6}>
                      <Field name="device_count" component={renderInput} label="Device Count"
                             type="text" placeholder="Device Count" requiredStar/>
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={12} sm={12}>
                      <Field name="reason" component={renderInput} label="Reason for De-registration"
                             type="textarea" placeholder="Type reason for De-registration"
                             requiredStar/>
                    </Col>
                  </Row>
                </div>
              </CardBody>
            </Card>
            <div className="text-right">
              <Button color="primary" type="submit" className="btn-next-prev"
                      disabled={isSubmitting}>Next</Button>{' '}
            </div>
          </Col>
        </Row>
      </Form>
    )
  }
}

class DeRegistrationStep2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      verifyDevicesModal: false
    }
  }

  componentDidMount() {
    this.setState({verifyDevicesModal: true});
  }

  render() {
    const {
      values,
      handleSubmit,
      isValid,
      closeRequest,
      stepReady,
      notRegisteredIMEIs
    } = this.props;

    return (
      <RenderModal show={this.state.verifyDevicesModal} className="modal-xl">
        <Form onSubmit={handleSubmit}>
          <ModalHeader>Device Model Information</ModalHeader>
          <div className="steps-loading">
            {!stepReady &&
            <StepLoading></StepLoading>
            }
            <ModalBody>
              <Row>
                <Col xs={12} lg={3} className='order-lg-12'>
                  {notRegisteredIMEIs.length > 0 &&
                  <React.Fragment>
                    <p className="alert alert-danger"><b>Error:</b> Following IMEIs are not registered in DRS.</p>
                    <Card className="border-danger">
                      <CardHeader className="bg-danger"><b>Not Registered IMEIs</b></CardHeader>
                      <CardBody className='p0'>
                        <ul className='file-imeis'>
                          {notRegisteredIMEIs.length > 0 && notRegisteredIMEIs.map((imei, key) => (
                            <li key={key}>{imei}</li>
                          ))}
                        </ul>
                      </CardBody>
                    </Card>
                  </React.Fragment>
                  }
                </Col>
                <Col xs={12} lg={9} className='order-lg-1'>
                  <div>
                    <table
                      className="table table-striped table-bordered table-mobile-primary table-verify-model-info table-sm mb-0">
                      <thead>
                      <tr>
                        <th>Verify</th>
                        <th>Brand</th>
                        <th>Model name</th>
                        <th>Model Number</th>
                        <th>Device Type</th>
                        <th>Operating System</th>
                        <th>Radio access technology</th>
                        <th>Device Count</th>
                      </tr>
                      </thead>
                      <FieldArray
                        name="verified_devices"
                        render={arrayHelpers => (
                          <tbody>
                          {values.devices.length > 0 ?
                            values.devices.map((device, i) => (
                              <tr key={i}>
                                <td data-label='Verify'>
                                  <label>
                                    <input
                                      name="verified_devices"
                                      type="checkbox"
                                      value={device}
                                      checked={values.verified_devices.includes(device)}
                                      onChange={e => {
                                        if (e.target.checked) arrayHelpers.push(device);
                                        else {
                                          const idx = values.verified_devices.indexOf(device);
                                          arrayHelpers.remove(idx);
                                        }
                                      }}
                                    />{" "}
                                  </label>
                                </td>
                                <td data-label='Brand'>{device.brand_name}</td>
                                <td data-label='Model name'>{device.model_name}</td>
                                <td data-label='Model Number'>{device.model_num}</td>
                                <td data-label='Device Type'>{device.device_type}</td>
                                <td data-label='Operating System'>{device.operating_system}</td>
                                <td data-label='Radio access technology'>{device.technology}</td>
                                <td data-label='Device Count'>{device.count}</td>
                              </tr>
                            ))
                            : <tr>
                              <td colSpan="8">
                                <span className="text-danger text-center">No record found</span>
                              </td>
                            </tr>
                          }
                          </tbody>
                        )}
                      />
                    </table>
                    <Field name="verified_devices" component={renderError}/>
                  </div>

                  {values.devices.length > 0 &&
                  <div className="text-info padd-info">* By checking checkbox(es), you are verifying Devices and will be
                    added to your Request</div>}
                </Col>
              </Row>
            </ModalBody>
            <ModalFooter>
              {/*<Button color="primary" onClick={this.handleVerifyModalSaving}>Add Selected IMEIs To Case</Button>*/}
              <Button className='eq-width' color="secondary" type="button" onClick={closeRequest}>Close Request</Button>
              <Button className='eq-width' color="primary" type="submit" disabled={!isValid}>Approve</Button>
            </ModalFooter>
          </div>
        </Form>
      </RenderModal>
    )
  }
}

class DeRegistrationStep3 extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    e.preventDefault();
    this.props.showPrevStepsData();
  }

  render() {
    const {
      values,
      errors,
      handleSubmit,
      isSubmitting,
      setFieldValue,
      setFieldTouched,
      stepsInfo,
      step,
      id,
      stepReady
    } = this.props;
    return (
      <Form onSubmit={handleSubmit}>
        <div className="steps-status space-between">
          <div>
            <h4>Request ID: <span className='text-primary mr-1'>{id}</span>
              <small> Request Type: <span className="text-primary">De-registration</span></small>
            </h4>
          </div>
          <div className="steps-status">
            <p>Status: <span className='text-primary'>Awaiting Documents</span></p>
            <button onClick={this.handleClick} className="btn-link">Previous Details</button>
          </div>
        </div>
        <Row>
          <Col className='order-xl-12 mt-3' xs={12} xl={4}>
            <StepIndicator stepsInfo={stepsInfo} step={step}></StepIndicator>
          </Col>
          <Col className='order-xl-1 mt-3' xs={12} xl={8}>
            <Card>
              <CardHeader>
                <b>Approval Documents</b>
              </CardHeader>
              <CardBody className='steps-loading'>
                {!stepReady &&
                <StepLoading></StepLoading>
                }
                <div>
                  <FieldArray
                    name="documents"
                    render={arrayHelpers => (
                      <Row>
                        {DE_DOCUMENTS.map((document, index) => (
                          <Col xs={12} sm={6} key={document.id}>
                            <RenderFileInput
                              onChange={setFieldValue}
                              onBlur={setFieldTouched}
                              error={((errors || {}).documents || []).length > 0 ? errors.documents[`${index}`] : null}
                              //touched={touched.documents[`${index}`]}
                              values={values.documents[`${index}`]}
                              fieldName={`documents[${index}]`}
                              type="file"
                              label={capitalize(document.label)}
                              inputClass="asitfield"
                              inputClassError="asitfield is-invalid"
                              requiredStar={document.required}
                            />
                          </Col>
                        ))}
                      </Row>
                    )}
                  />
                  <div className="text-danger">{errors.allDocs}</div>
                </div>
              </CardBody>
            </Card>
            <div className="text-right">
              <Button className='width-xs-50per' color="primary" type="submit"
                      disabled={isSubmitting}>Submit</Button>{' '}
            </div>
          </Col>
        </Row>
      </Form>
    )
  }
}

class DeRegistrationStep4 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      step1FileUpload: false
    }

    this.handleFileUpload = this.handleFileUpload.bind(this);
  }

  handleFileUpload(e) {
    e.preventDefault();
    this.setState({step1FileUpload: true});
    this.props.setFieldValue('filename', '', false);
  }

  render() {
    const {
      values,
      errors,
      touched,
      handleSubmit,
      isSubmitting,
      setFieldValue,
      setFieldTouched,
      stepsInfo,
      step,
      stepReady
    } = this.props;
    return (
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col className='order-xl-12 mt-3' xs={12} xl={4}>
            <StepIndicator stepsInfo={stepsInfo} step={step}></StepIndicator>
          </Col>
          <Col className='order-xl-1 mt-3' xs={12} xl={8}>
            <Card>
              <CardHeader>
                <b>Basic De-registration details</b>
              </CardHeader>
              <CardBody className='steps-loading'>
                {!stepReady &&
                <StepLoading></StepLoading>
                }
                <div>
                  <Row>
                    <Col xs={12} sm={6}>
                      {values.filename && !this.state.step1FileUpload && <FormGroup>
                        <Label className="d-block">Selected Device IMEIs<span className="text-danger">*</span></Label>
                        <div className="asitfield">
                          <div className='filespan'>
                            <input type="button" value="Choose File" disabled/>
                            <span className="selectedfile">{values.filename}</span>
                          </div>
                          {/*<a href="#" onClick={(e) => this.handleFileUpload(e)} className="text-danger"><i className="fa fa-close"></i></a>*/}
                        </div>
                      </FormGroup>}
                      {this.state.step1FileUpload &&
                      <RenderFileInput
                        onChange={setFieldValue}
                        onBlur={setFieldTouched}
                        error={errors.filename}
                        touched={touched.filename}
                        values={values.filename}
                        fieldName="filename"
                        type="file"
                        inputClass="asitfield"
                        inputClassError="asitfield is-invalid"
                        label="Device IMEIs"
                        requiredStar
                      />}
                    </Col>
                    <Col xs={12} sm={6}>
                      <Field name="device_count" component={renderInput} label="Device Count"
                             type="text" placeholder="Device Count" requiredStar disable={!this.state.step1FileUpload}/>
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={12} sm={12}>
                      <Field name="reason" component={renderInput} label="Reason for De-registration"
                             type="textarea" placeholder="Type reason for De-registration"
                             requiredStar disable/>
                    </Col>
                    <p className="alert alert-warning ml-3 mr-3">De-registration information can't be changed in
                      Modification, instead you can <b>Close</b> this request or apply for <b>New request</b>.</p>
                  </Row>
                </div>
              </CardBody>
            </Card>
            <div className="text-right">
              <Button color="primary" type="submit" className="btn-next-prev"
                      disabled={isSubmitting}>Next</Button>{' '}
            </div>
          </Col>
        </Row>
      </Form>
    )
  }
}

const EnhancedDeRegistrationStep1 = withFormik({
  mapPropsToValues: (props) => {
    return ({
      "device_count": "",
      "reason": "",
      "filename": ""
    })
  },

  // Custom sync validation
  validate: values => {
    let errors = {};
    if (!values.device_count) {
      errors.device_count = 'This field is required'
    } else if (isNaN(Number(values.device_count))) {
      errors.device_count = 'Must be a number'
    } else if (!/^([1-9][0-9]{0,5}|1000000)$/i.test(values.device_count)) {
      errors.device_count = 'Must be in between 1-1,000,000';
    }

    if (!values.reason) {
      errors.reason = 'This field is required'
    } else if (values.reason.length >= 1000) {
      errors.reason = 'Must be 1000 characters or less'
    }

    if (!values.filename) {
      errors.filename = 'This field is required'
    } else if (getExtension(values.filename.name) !== 'txt') {
      errors.filename = 'Invalid File extension, valid extension is: txt'
    }

    return errors;
  },

  handleSubmit: (values, bag) => {
    bag.setSubmitting(false);
    console.log('I am called step1');
    //bag.props.callServer(values);
    bag.props.callServer(prepareAPIRequestStep1(values));
  },

  displayName: 'DeRegistrationStep1', // helps with React DevTools
})(DeRegistrationStep1);

function prepareAPIRequestStep1(values) {
  // Validate Values before sending
  const formData = new FormData();
  if (values.device_count) {
    formData.append('device_count', values.device_count);
  }
  if (values.filename) {
    formData.append('file', values.filename);
  }
  if (values.reason) {
    formData.append('reason', values.reason);
  }

  formData.append('user_id', getUserInfo().sub);
  formData.append('user_name', getUserInfo().preferred_username);

  return formData;
}

const EnhancedDeRegistrationStep2 = withFormik({
  mapPropsToValues: (props) => ({"devices": props.info || [], "verified_devices": []}),

  // Custom sync validation
  validate: values => {
    let errors = {};
    console.log(values.verified_devices);
    if (!values.verified_devices || values.verified_devices.length === 0) {
      errors.verified_devices = 'Please check at least one device'
    }
    return errors;
  },

  handleSubmit: (values, bag) => {
    bag.setSubmitting(false);
    console.log('I am called step2');
    bag.props.callServer(prepareAPIRequestStep2(values));
  },

  displayName: 'DeRegistrationStep2', // helps with React DevTools
})(DeRegistrationStep2);

function prepareAPIRequestStep2(values) {
  // Validate Values before sending
  const formData = new FormData();
  if (values.verified_devices) {
    formData.append('devices', JSON.stringify(values.verified_devices));
  }
  formData.append('user_id', getUserInfo().sub);

  return formData;
}

const EnhancedDeRegistrationStep3 = withFormik({
  mapPropsToValues: () => ({"documents": []}),

  validate: values => {
    let errors = {};
    if (!values.documents.length) {
      errors.allDocs = 'Document must be provided for all fields.';
    } else {
      for (let i = 0; i < DE_DOCUMENTS.length; i++) {
        if (values.documents[i]) {
          if (!EXTENSIONS.includes(getExtension(values.documents[i].name).toLowerCase())) {
            if (typeof errors.documents === "undefined") {
              errors.documents = [];
            }
            errors.documents[i] = 'Invalid File extension, valid extensions are: ' + EXTENSIONS.join(', ')
          } else if ((values.documents[i].size / 1024 / 1024) > 26) {
            if (typeof errors.documents === "undefined") {
              errors.documents = [];
            }
            errors.documents[i] = 'File size exceeds 26 MBs'
          }
        }
        if (!values.documents[i] && DE_DOCUMENTS[i].required) {
          if (typeof errors.documents === "undefined") {
            errors.documents = [];
          }
          errors.documents[i] = 'This field is required'
        }
      }
    }
    return errors;
  },

  handleSubmit: (values, bag) => {
    bag.setSubmitting(false);
    console.log('I am called step3');
    bag.props.callServer(prepareAPIRequestStep3(values));
  },

  displayName: 'DeRegistrationStep3', // helps with React DevTools
})(DeRegistrationStep3);

function prepareAPIRequestStep3(values) {
  // Validate Values before sending
  const formData = new FormData();
  for (let i = 0; i < DOCUMENTS.length; i++) {
    formData.append(DOCUMENTS[i].label, values.documents[i])
  }
  formData.append('user_id', getUserInfo().sub);

  return formData;
}

const EnhancedDeRegistrationStep4 = withFormik({
  mapPropsToValues: (props) => {
    return ({
      "device_count": props.info.device_count || "",
      "reason": props.info.reason || "",
      "filename": props.info.file || ""
    })
  },

  // Custom sync validation
  validate: values => {
    let errors = {};
    if (!values.device_count) {
      errors.device_count = 'This field is required'
    } else if (isNaN(Number(values.device_count))) {
      errors.device_count = 'Must be a number'
    } else if (!/^[1-9][0-9]{0,7}?$/i.test(values.device_count)) {
      errors.device_count = 'Must be in between 1-1,000,000';
    }

    if (!values.reason) {
      errors.reason = 'This field is required'
    } else if (values.reason.length >= 1000) {
      errors.reason = 'Must be 1000 characters or less'
    }

    if (!values.filename) {
      errors.filename = 'This field is required'
    } else if (typeof values.filename === 'string') {
      // No error if filename is string
    } else if (getExtension(values.filename.name) !== 'txt') {
      errors.filename = 'Invalid File extension'
    }

    return errors;
  },

  handleSubmit: (values, bag) => {
    bag.setSubmitting(false);
    console.log('I am called step4');
    //bag.props.callServer(values);
    bag.props.callServer(prepareAPIRequestStep4(values));
  },

  displayName: 'DeRegistrationStep4', // helps with React DevTools
})(DeRegistrationStep4);

function prepareAPIRequestStep4(values) {
  // Validate Values before sending
  const formData = new FormData();
  // if(values.device_count) {
  //   formData.append('device_count', values.device_count);
  // }
  // if(values.filename) {
  //   formData.append('file', values.filename);
  // }
  // if(values.reason) {
  //   formData.append('reason', values.reason);
  // }

  formData.append('user_id', getUserInfo().sub);
  formData.append('user_name', getUserInfo().preferred_username);

  return formData;
}

class DeRegistration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 1,
      id: null,
      stepsInfo: ['Basic De-registration details', 'Approval documents'],
      devices: null,
      data: null,
      prevStepsData: null,
      prevStepsModal: false,
      stepReady: false,
      notRegIMEIs: []
    }
    this.saveStep1 = this.saveStep1.bind(this);
    this.saveStep2 = this.saveStep2.bind(this);
    this.saveStep3 = this.saveStep3.bind(this);
    this.saveStep4 = this.saveStep4.bind(this);
    this.closeDeRequest = this.closeDeRequest.bind(this);
    this.togglePrevStepsModal = this.togglePrevStepsModal.bind(this);
    this.getPrevStepsDataFromServer = this.getPrevStepsDataFromServer.bind(this);
    this.redirectToNextStep = this.redirectToNextStep.bind(this);
    this.updateTokenHOC = this.updateTokenHOC.bind(this);
  }

  componentDidMount() {
    this.updateTokenHOC(this.redirectToNextStep);
  }

  redirectToNextStep(config) {
    const {id} = this.props.match.params;
    if (id !== 'id') {
      this.setState({stepReady: false});
      instance.get(`/deregistration/${id}`, config)
        .then(response => {
          if (response.data.status_label === 'New Request') {
            this.setState({id: response.data.id, data: response.data, step: 4}, () => {
              this.setState({stepReady: true});
            });
          } else if (response.data.status_label === 'Awaiting Documents') {
            this.setState({id: response.data.id, step: 3}, () => {
              this.updateTokenHOC(this.getPrevStepsDataFromServer, id);
              this.setState({stepReady: true});
            });
          }
        })
        .catch(error => {
          errors(this, error);
        })
    } else {
      this.setState({stepReady: true});
    }
  }

  updateTokenHOC(callingFunc, values = null) {
      let config = null;
      if(this.props.kc.isTokenExpired(0)) {
          this.props.kc.updateToken(0)
              .success(() => {
                  localStorage.setItem('token', this.props.kc.token)
                  config = {
                    headers: getAuthHeader(this.props.kc.token)
                  }
                  callingFunc(config, values);
              })
              .error(() => this.props.kc.logout());
      } else {
          config = {
            headers: getAuthHeader()
          }
          callingFunc(config, values);
      }
  }

  getPrevStepsDataFromServer(config, id) {
    instance.get(`/deregistration/sections/${id}`, config)
      .then(response => {
        this.setState({prevStepsData: response.data});
      })
      .catch(error => {
        errors(this, error);
      })
  }

  togglePrevStepsModal() {
    this.setState({prevStepsModal: !this.state.prevStepsModal});
  }

  closeDeRequest(config) {
    this.setState({stepReady: false});
    const id = this.state.id;
    const formData = new FormData();
    formData.append('user_id', getUserInfo().sub);
    formData.append('close_request', 'True');
    formData.append('dereg_id', id);

    instance.put(`/deregistration`, formData, config)
      .then(response => {
        if (response.data) {
          //toast.success('Your De-registration Request has been closed');
          this.setState({stepReady: true});
          const statusDetails = {
            id: id,
            type: 'deregistration',
            typeLabel: 'De-registration',
            icon: 'fa fa-check',
            status: 'Closed',
            action: 'Closed'
          }
          this.props.history.push({
            pathname: '/request-status',
            state: {details: statusDetails}
          });
          //this.props.history.push(`/dashboard`)
        }
      })
      .catch(error => {
        this.setState({stepReady: true});
        errors(this, error);
      })
  }

  saveStep1(config, formdata) {
    // Call API and save information
    this.setState({stepReady: false});
    instance.post(`/deregistration`, formdata, config)
      .then((response) => {
        console.log(response.data);
        if (response.data.id) {
          //toast.success('Your De-Registration Request has been registered successfully!');
        }
        this.setState({id: response.data.request.id, devices: response.data.devices, step: 2}, () => {
          this.setState({stepReady: true});
        });
      })
      .catch((error) => {
        this.setState({stepReady: true});
        errors(this, error);
      })
  }

  saveStep2(config, formdata) {
    // Call API and save information
    this.setState({stepReady: false});
    const {id} = this.state;
    formdata.append('dereg_id', id);
    instance.post(`/deregistration/devices`, formdata, config)
      .then((response) => {
        if (response.data.dreg_id) {
          //toast.success('Device Model Information Approval has been submitted successfully!');
          this.setState({step: 3}, () => {
            this.updateTokenHOC(this.getPrevStepsDataFromServer, id);
            this.setState({stepReady: true});
          });
        }
      })
      .catch((error) => {
        this.setState({stepReady: true});
        errors(this, error, true);
        if (error.response.status === 422) {
          let errors = error.response.data.not_registered_imeis;
          this.setState({notRegIMEIs: errors});
        }
      })
  }

  saveStep3(config, formdata) {
    // Call API and save information
    this.setState({stepReady: false});
    const {id} = this.state;
    formdata.append('dereg_id', id);
    instance.post(`/deregistration/documents`, formdata, config)
      .then((response) => {
        if (response.data.length) {
          //toast.success('Your De-registration request has been submitted successfully!');
          // Finish the Registration
          this.setState({stepReady: true});
          const statusDetails = {
            id: id,
            type: 'deregistration',
            typeLabel: 'De-registration',
            icon: 'fa fa-check',
            status: 'Pending Review',
            action: 'Submitted'
          }
          this.props.history.push({
            pathname: '/request-status',
            state: {details: statusDetails}
          });
        }
        console.log(response.data)
      })
      .catch((error) => {
        this.setState({stepReady: true});
        errors(this, error);
      })
  }

  saveStep4(config, formdata) {
    const {id} = this.state;
    // Call API and save information
    this.setState({stepReady: false});
    formdata.append('dereg_id', id);
    instance.put(`/deregistration`, formdata, config)
      .then((response) => {
        if (typeof response.data.devices !== 'undefined') {
          //toast.success('Your De-Registration Request has been updated successfully!');
          this.setState({devices: response.data.devices, step: 2}, () => {
            this.setState({stepReady: true});
          });
        } else {
          toast.success('Your De-Registration Request has been updated successfully!');
          this.setState({step: 3}, () => {
            this.updateTokenHOC(this.getPrevStepsDataFromServer, id);
            this.setState({stepReady: true});
          });
        }
      })
      .catch((error) => {
        this.setState({stepReady: true});
        errors(this, error);
      })
  }

  render() {
    const {step, stepsInfo, id, prevStepsData, stepReady, notRegIMEIs} = this.state;
    return (
      <I18n ns="translations">
        {
          (t, {i18n}) => (
            <div className="animated fadeIn">
              {(step === 1) &&
              <EnhancedDeRegistrationStep1 callServer={(values) => this.updateTokenHOC(this.saveStep1, values)}
                                           stepsInfo={stepsInfo}
                                           step={step}
                                           stepReady={stepReady}
                                           kcProps={this.props}
              />
              }
              {(step === 2) && this.state.devices &&
              <EnhancedDeRegistrationStep2 callServer={(values) => this.updateTokenHOC(this.saveStep2, values)} stepsInfo={stepsInfo} step={step}
                                           info={this.state.devices} id={id} closeRequest={() => this.updateTokenHOC(this.closeDeRequest)}
                                           stepReady={stepReady} notRegisteredIMEIs={notRegIMEIs}/>}
              {(step === 3) &&
              <EnhancedDeRegistrationStep3 callServer={(values) => this.updateTokenHOC(this.saveStep3, values)} stepsInfo={stepsInfo} step={step - 1} id={id}
                                           showPrevStepsData={this.togglePrevStepsModal} stepReady={stepReady}/>}
              {(step === 4) && this.state.data &&
              <EnhancedDeRegistrationStep4 callServer={(values) => this.updateTokenHOC(this.saveStep4, values)} stepsInfo={stepsInfo} step={1}
                                           info={this.state.data} stepReady={stepReady}/>}
              <RenderModal show={this.state.prevStepsModal} className="modal-lg">
                <ModalHeader><b>Previous Steps Details</b></ModalHeader>
                <ModalBody>
                  {this.state.prevStepsData && Object.keys(prevStepsData.dereg_details).length > 0 &&
                  <div>
                    <h6>Basic de-registration details</h6>
                    <table className="table table-bordered">
                      <tbody>
                      <tr>
                        <td>Device Count</td>
                        <td>{prevStepsData.dereg_details.device_count}</td>
                      </tr>
                      <tr>
                        <td>File</td>
                        <td>
                          <button onClick={(e) => {
                            downloadDocument(this.props,prevStepsData.dereg_details.file_link, getExtension(prevStepsData.dereg_details.file_link), removeExtension(prevStepsData.dereg_details.file), e)
                          }} value={prevStepsData.dereg_details.file_link} className="btn-link">Click here to view this
                            document
                          </button>
                        </td>
                      </tr>
                      <tr>
                        <td>Reason</td>
                        <td>{prevStepsData.dereg_details.reason}</td>
                      </tr>
                      </tbody>
                    </table>
                  </div>
                  }

                  {this.state.prevStepsData && prevStepsData.dereg_device.length > 0 &&
                  <div className="mt-4">
                    <h6>Device model description</h6>
                    <table className="table table-bordered table-mobile-primary table-mob-two-column">
                      <thead>
                      <tr>
                        <th>Brand</th>
                        <th>Model name</th>
                        <th>Model number</th>
                        <th>Device type</th>
                        <th>Operating system</th>
                        <th>Technologies</th>
                        <th>Device Count</th>
                      </tr>
                      </thead>
                      <tbody>
                      {prevStepsData.dereg_device.map((device, i) => (
                        <tr key={i}>
                          <td>{device.brand_name}</td>
                          <td>{device.model_name}</td>
                          <td>{device.model_num}</td>
                          <td>{device.device_type}</td>
                          <td>{device.operating_system}</td>
                          <td>{device.technology}</td>
                          <td>{device.count}</td>
                        </tr>
                      ))}
                      </tbody>
                    </table>
                  </div>
                  }
                </ModalBody>
                <ModalFooter>
                  <Button color="primary" onClick={this.togglePrevStepsModal}>Close</Button>
                </ModalFooter>
              </RenderModal>
            </div>
          )
        }
      </I18n>
    )
  }
}

export default translate('translations')(DeRegistration);
