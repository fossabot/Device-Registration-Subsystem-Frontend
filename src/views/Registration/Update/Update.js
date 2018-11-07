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
import i18n from './../../../i18n';
import {translate} from 'react-i18next';
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
  CardBody
} from 'reactstrap';
import renderInput from './../../../components/Form/RenderInput'
import doubleEntryInput from '../../../components/Form/DoubleEntryInput'
import renderError from './../../../components/Form/RenderError'
import RenderArrayError from './../../../components/Form/RenderArrayError'
import RenderFileInput from './../../../components/Form/RenderFileInput'
import StepIndicator from './../../../components/Sidebar/StepIndicator';
import {
  getExtension,
  removeExtension,
  instance,
  errors,
  getUserInfo,
  capitalize,
  getAuthHeader,
  downloadDocument,
  downloadReport
} from "../../../utilities/helpers";
import {MANUFACTURE_LOCATIONS, DEVICE_TYPES, TECHNOLOGIES, DOCUMENTS, EXTENSIONS} from "../../../utilities/constants";
import CommentBox from "../../../components/CommentSection/CommentBox";
import StepLoading from "../../../components/Loaders/StepLoading";

class UpdateRegistrationStep1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imeiIndex: null,
      imeiModal: false,
      imeiModalTitle: null,
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
      handleChange,
      handleBlur,
      handleSubmit,
      isSubmitting,
      setFieldValue,
      setFieldTouched,
      dirty,
      stepsInfo,
      step,
      comments,
      id,
      statusLabel,
      stepReady,
      anySectionChange,
      info,
      kcProps
    } = this.props;
    return (
      <Form onSubmit={handleSubmit}>
        <div className="steps-status space-between">
          <div>
            <h4>Request ID: <span className='text-primary mr-1'>{id}</span>
              <small> Request Type: <span className="text-primary">Registration</span></small>
            </h4>
          </div>
          <div className="steps-status no-previous">
            <p>Status: <span className='text-primary'>{statusLabel}</span></p>
          </div>
        </div>
        <Row>
          <Col className='order-xl-12 mt-3' xs={12} xl={4}>
            <StepIndicator stepsInfo={stepsInfo} step={step}></StepIndicator>
            <CommentBox header={i18n.t('commentBox.header')} comments={comments}/>
          </Col>
          <Col className='order-xl-1 mt-3' xs={12} xl={8}>
            <Card>
              <CardHeader>
                <b>Basic registration details</b>
              </CardHeader>
              <CardBody className='steps-loading'>
                {!stepReady &&
                <StepLoading></StepLoading>
                }
                <div>
                  <Row>
                    <Col xs={12} sm={6}>
                      <Field name="device_count" component={renderInput} label="Device Count" type="text"
                             placeholder="Device Count" requiredStar
                             disable={(values.device_imei === 'webpage' && values.devices.length > 0) || (values.device_imei === 'tsv' && values.filename && !this.state.step1FileUpload)}/>
                    </Col>
                    <Col xs={12} sm={6}>
                      <Field name="imei_per_device" component={renderInput} label="Number of IMEI Per Device"
                             type="text" placeholder="Number of IMEI Per Device" requiredStar
                             disable={(values.device_imei === 'webpage' && values.devices.length > 0) || (values.device_imei === 'tsv' && values.filename && !this.state.step1FileUpload)}/>
                    </Col>
                    {(values.device_imei === 'tsv' && values.filename && !this.state.step1FileUpload) &&
                    <p className="alert alert-warning ml-3 mr-3">You can't modify <b>Device Count</b> and <b>Number of IMEIs Per Device</b> unless you delete existing uploaded file below.</p>}
                    {(values.device_imei === 'webpage' && values.devices.length > 0) &&
                    <p className="alert alert-warning ml-3 mr-3">You can't modify <b>Device Count</b> and <b>Number of IMEIs Per Device</b> unless you delete existing devices listed below.</p>}
                  </Row>
                  <Row>
                    <Col xs={12} sm={6}>
                      <FormGroup>
                        <Label>Device IMEI(s)</Label>
                        <div className="asitfield checkfield">
                          <label>
                            <input
                              name="device_imei"
                              type="radio"
                              value="tsv"
                              checked={values.device_imei === 'tsv'}
                              readOnly
                              onBlur={handleBlur}
                              onChange={handleChange}
                              disabled={values.device_imei === 'webpage'}
                              className="d-none"
                            />
                            {(values.device_imei === 'tsv') &&
                            <div>
                              <i className="fa fa-check"></i>
                              <span className="ml-2">Tab-delimited File</span>
                            </div>
                            }
                          </label>
                          <label>
                            <input
                              name="device_imei"
                              type="radio"
                              value="webpage"
                              checked={values.device_imei === 'webpage'}
                              readOnly
                              onBlur={handleBlur}
                              onChange={handleChange}
                              disabled={values.device_imei === 'tsv'}
                              className="d-none"
                            />
                            {(values.device_imei === 'webpage') &&
                            <div>
                              <i className="fa fa-check"></i>
                              <span className="ml-2">Webpage input</span>
                            </div>
                            }
                          </label>
                        </div>
                        <Field name="device_imei" component={renderError}/>
                      </FormGroup>
                    </Col>
                    <Col xs={12} sm={6}>
                      <FormGroup>
                        <Label> Manufacturing Location <span className="text-danger">*</span></Label>
                        <div className='selectbox'>
                          <Field component="select" name="m_location" className="form-control">
                            <option value="">Select Manufacturing Location</option>
                            {MANUFACTURE_LOCATIONS.map((location, i) => (
                              <option value={location.value} key={i}>{location.label}</option>
                            ))}
                          </Field>
                        </div>
                        <Field name="m_location" component={renderError}/>
                      </FormGroup>
                    </Col>
                  </Row>
                  <p className="alert alert-warning">You can't modify <b>Device IMEI(s) input method</b>. Apply for <b>New Request</b> instead.</p>
                  {values.device_imei === 'webpage' &&
                  <Row>
                    <Col xs={12}>
                      <div className="devices-imeis">
                        <div className="devices-heading">
                          <b>Devices List</b>
                        </div>
                        <div>
                          <div className="read-box position-relative">
                            <FieldArray
                              name="devices"
                              render={({insert, remove, push}) => {
                                let imeis = [];
                                if (values.imei_per_device > 0) {
                                  for (let i = 0; i < values.imei_per_device; i++) {
                                    imeis[i] = {};
                                    imeis[i].imei = '';
                                    imeis[i].reImei = '';
                                  }
                                }
                                return (
                                  <div>
                                    {values.devices.length > 0 &&
                                    values.devices.map((device, index) => (
                                      <div key={index} className="position-relative">
                                        <Button type="button" size="sm" color="danger"
                                                onClick={() => {
                                                  if (window.confirm('Are you sure you want to delete this device?')) remove(index)
                                                }} className="btn-del-device">Delete</Button>
                                        <FieldArray
                                          name="imeis"
                                          render={({insert, remove, push}) => (
                                            <Card>
                                              <CardHeader><b>Device
                                                # {index + 1}</b></CardHeader>
                                              {values.devices[index].imeis.length && values.devices[index].imeis.map((imei, i) => (
                                                <CardBody key={i}
                                                          className="pt-0 pb-0">
                                                  <div className="imei-row">
                                                    <div className="imei-col">
                                                      IMEI # {i + 1}
                                                    </div>
                                                    <div className="imei-col">
                                                      <Field
                                                        name={`devices.${index}.imeis.${i}.imei`}
                                                        component={doubleEntryInput}
                                                        type="text"
                                                        placeholder={`Type IMEI ${i + 1}`}/>
                                                      {errors.devices && touched.devices &&
                                                      <RenderArrayError
                                                        errors={errors.devices}
                                                        touched={touched.devices}
                                                        mainIndex={index}
                                                        innerIndex={i}
                                                        field="imei"/>}
                                                    </div>
                                                    <div className="imei-col">
                                                      <Field
                                                        name={`devices.${index}.imeis.${i}.reImei`}
                                                        component={doubleEntryInput}
                                                        type="text"
                                                        placeholder={`Retype IMEI ${i + 1}`}/>
                                                      {errors.devices && touched.devices &&
                                                      <RenderArrayError
                                                        errors={errors.devices}
                                                        touched={touched.devices}
                                                        mainIndex={index}
                                                        innerIndex={i}
                                                        field="reImei"/>}
                                                    </div>
                                                  </div>
                                                </CardBody>
                                              ))}
                                            </Card>
                                          )}
                                        />
                                      </div>
                                    ))}
                                    <Button type="button"
                                            onClick={() => push({imeis})}
                                            size="sm"
                                            className={((errors['device_count'] || errors['imei_per_device'] || values.devices.length === values.device_count)) ? 'btn-outline-primary d-none' : 'btn-outline-primary d-inline-block'}>
                                      Add Device
                                    </Button>

                                  </div>
                                )
                              }}
                            />
                            <Field name="imeis_count" component={renderError} class="alert alert-danger"/>
                          </div>
                        </div>
                      </div>
                    </Col>
                  </Row>
                  }
                  {values.filename && !this.state.step1FileUpload &&
                  <Row>
                    <Col xs={12} sm={12}>
                      <FormGroup>
                        <Label className="d-block">Selected tab-delimited file <span
                          className="text-danger">*</span></Label>
                        <div className="asitfield">
                          <div className='filespan'>
                            <input type="button" value="Choose File" disabled/>
                            <span className="selectedfile">{values.filename}</span>
                          </div>
                          <button className="btn btn-link btn-sm text-danger" onClick={(e) => this.handleFileUpload(e)}><i
                            className="fa fa-close"></i></button>
                        </div>
                        <button onClick={(e) => {
                          downloadDocument(kcProps,info.file_link, getExtension(info.file_link), removeExtension(values.filename), e)
                        }} value={info.file_link} className="btn-link">{i18n.t('download.file')}
                        </button>
                      </FormGroup>
                    </Col>
                  </Row>
                  }
                  {values.device_imei === 'tsv' && this.state.step1FileUpload &&
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
                    label="Select tab-delimited file"
                    requiredStar
                  />
                  }
                </div>
              </CardBody>
            </Card>
            <div className="text-right">
              <Button color="primary" type="submit" disabled={isSubmitting}
                      className={(!dirty && !anySectionChange) ? 'btn-next-prev d-none' : 'btn-next-prev d-inline-block'}>Next</Button>{' '}
              <Button color="primary" onClick={this.props.jumpToNextStep}
                      className={(dirty || anySectionChange) ? 'btn-next-prev d-none' : 'btn-next-prev d-inline-block'}>Next</Button>{' '}
            </div>
          </Col>
        </Row>
      </Form>
    )

  }
}

class UpdateRegistrationStep2 extends Component {
  render() {
    const {
      values,
      handleSubmit,
      isSubmitting,
      dirty,
      stepsInfo,
      step,
      id,
      comments,
      statusLabel,
      stepReady,
      anySectionChange
    } = this.props;

    return (
      <Form onSubmit={handleSubmit}>
        <div className="steps-status space-between">
          <div>
            <h4>Request ID: <span className='text-primary mr-1'>{id}</span>
              <small> Request Type: <span className="text-primary">Registration</span></small>
            </h4>
          </div>
          <div className="steps-status no-previous">
            <p>Status: <span className='text-primary'>{statusLabel}</span></p>
          </div>
        </div>
        <Row>
          <Col className='order-xl-12 mt-3' xs={12} xl={4}>
            <StepIndicator stepsInfo={stepsInfo} step={step}></StepIndicator>
            <CommentBox header={i18n.t('commentBox.header')} comments={comments}/>
          </Col>
          <Col className='order-xl-1 mt-3' xs={12} xl={8}>
            <Card>
              <CardHeader>
                <b>Device model description</b>
              </CardHeader>
              <CardBody className='steps-loading'>
                {!stepReady &&
                <StepLoading></StepLoading>
                }
                <div>
                  <Row>
                    <Col xs={12} sm={6}>
                      <Field name="brand" component={renderInput} label="Brand" type="text" placeholder="Brand"
                             requiredStar/>
                    </Col>
                    <Col xs={12} sm={6}>
                      <Field name="model_name" component={renderInput} label="Model Name" type="text"
                             placeholder="Model Name" requiredStar/>
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={12} sm={6}>
                      <Field name="model_num" component={renderInput} label="Model Number" type="text"
                             placeholder="Model Number" requiredStar/>
                    </Col>
                    <Col xs={12} sm={6}>
                      <FormGroup>
                        <Label> Device type <span className="text-danger">*</span></Label>
                        <div className='selectbox'>
                          <Field component="select" name="device_type" className="form-control">
                            <option value="">Select Device type</option>
                            {DEVICE_TYPES.map((deviceType, i) => (
                              <option value={deviceType.description} key={i}>{deviceType.description}</option>
                            ))}
                          </Field>
                        </div>
                        <Field name="device_type" component={renderError}/>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={12} sm={6}>
                      <Field name="operating_system" component={renderInput} label="Operating System" type="text"
                             placeholder="Operating System" requiredStar/>
                    </Col>
                    <Col xs={12} sm={6}>
                      <FieldArray
                        name="technologies"
                        render={arrayHelpers => (
                          <FormGroup>
                            <Label>Radio Access Technology: <span className="text-danger">*</span> </Label>
                            <div className="asitfield checkfield">
                              {TECHNOLOGIES.map((technology, i) => (
                                <label key={technology.id}>
                                  <input
                                    name="technologies"
                                    type="checkbox"
                                    value={technology.description}
                                    checked={values.technologies.includes(technology.description)}
                                    onChange={e => {
                                      if (e.target.checked) arrayHelpers.push(technology.description);
                                      else {
                                        const idx = values.technologies.indexOf(technology.description);
                                        arrayHelpers.remove(idx);
                                      }
                                    }}
                                  />{" "}
                                  {technology.description}
                                </label>
                              ))}
                            </div>
                            <Field name="technologies" component={renderError}/>
                          </FormGroup>
                        )}
                      />
                    </Col>
                  </Row>
                </div>
              </CardBody>
            </Card>
            <div className="text-right">
              <Button color="primary" type="submit" disabled={isSubmitting}
                      className={(!dirty && !anySectionChange) ? 'btn-next-prev d-none' : 'btn-next-prev d-inline-block'}>Next</Button>{' '}
              <Button color="primary" onClick={this.props.jumpToNextStep}
                      className={(dirty || anySectionChange) ? 'btn-next-prev d-none' : 'btn-next-prev d-inline-block'}>Next</Button>{' '}
            </div>
          </Col>
        </Row>
      </Form>
    )
  }
}

class UpdateRegistrationStep3 extends Component {
  constructor(props) {
    super(props);
    this.state = {}
    this.handleFileUpload = this.handleFileUpload.bind(this);
    this.updateTokenHOC = this.updateTokenHOC.bind(this);
  }

  componentDidMount() {
    if (DOCUMENTS.length > 0) {
      DOCUMENTS.map((doc, i) => {
        if (this.props.info[i]) {
          this.setState({[i]: false})
          return null;
        } else {
          this.setState({[i]: true})
          return null;
        }
      })
    }
  }

  handleFileUpload(e, id, index) {
    e.preventDefault();
    //this.setState({ [id]: true}, () => {
    this.setState({[index]: true}, () => {
      this.props.setFieldValue(`documents[${index}]`, '', true);
    })
  }
  /**
   * HOC function to update token
   * @param callingFunc
   * @param e
   * @param param1
   * @param param2
   */
  updateTokenHOC(callingFunc, e, param1=null,param2=null) {
    e.preventDefault()
    let config = null;
    if (this.props.kcProps.kc.isTokenExpired(0)) {
      this.props.kcProps.kc.updateToken(0)
        .success(() => {
          localStorage.setItem('token', this.props.kcProps.kc.token)
          config = {
            headers: getAuthHeader(this.props.kcProps.kc.token)
          }
          callingFunc(config,param1,param2);
        })
        .error(() => this.props.kcProps.kc.logout());
    } else {
      config = {
        headers: getAuthHeader()
      }
      callingFunc(config,param1,param2);
    }
  }
  render() {
    const {
      values,
      errors,
      handleSubmit,
      isSubmitting,
      dirty,
      setFieldValue,
      setFieldTouched,
      stepsInfo,
      step,
      id,
      reportReady,
      comments,
      statusLabel,
      stepReady,
      anySectionChange,
      kcProps
    } = this.props;
    return (
      <Form onSubmit={handleSubmit}>
        <div className="steps-status space-between">
          <div>
            <h4>Request ID: <span className='text-primary mr-1'>{id}</span>
              <small> Request Type: <span className="text-primary">Registration</span></small>
            </h4>
          </div>
          <div className="steps-status no-previous">
            <p>Status: <span className='text-primary'>{statusLabel}</span></p>
          </div>
        </div>
        <Row>
          <Col className='order-xl-12 mt-3' xs={12} xl={4}>
            <StepIndicator stepsInfo={stepsInfo} step={step}></StepIndicator>
            <CommentBox header={i18n.t('commentBox.header')} comments={comments}/>
            {reportReady &&
            <div className="samplefile">
              <p><i className="fa fa-file-text-o fa-2x"></i> Report
                <button onClick={(e) => { this.updateTokenHOC(downloadReport,e, id, 'registration')
                }} className="btn btn-outline-dark pull-right">Download
                  Report</button>
              </p>
            </div>
            }
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
                        {DOCUMENTS.map((document, index) => {
                          return (
                            <Col xs={12} sm={6} key={document.id}>
                              {(typeof values.documents[index] === 'undefined' || this.state[index])
                                ? <RenderFileInput
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
                                : (document.id === values.documents[index].document_id) &&
                                <FormGroup>
                                  <Label className="d-block">{capitalize(document.label)} <span
                                    className="text-danger">*</span></Label>
                                  <div className="asitfield">
                                    <div className='filespan'>
                                      <input type="button" value="Chosen File" disabled/>
                                      <span
                                        className="selectedfile">{values.documents[index].filename.split(':')[0]}</span>
                                    </div>
                                    <button className="btn btn-link btn-sm text-danger" onClick={(e) => this.handleFileUpload(e, document.document_id, index)}
                                      ><i className="fa fa-close"></i></button>
                                  </div>
                                  <button onClick={(e) => {
                                    downloadDocument(kcProps,values.documents[index].link, getExtension(values.documents[index].link), removeExtension(values.documents[index].filename), e)
                                  }} value={values.documents[index].link}
                                          className="btn-link">{i18n.t('download.document')}
                                  </button>
                                </FormGroup>
                              }

                            </Col>
                          )
                        })
                        }
                      </Row>
                    )}
                  />
                  <div className="text-danger">{errors.allDocs}</div>
                </div>
              </CardBody>
            </Card>
            <div className="text-right">
              <Button color="primary" type="submit" disabled={isSubmitting}
                      className={(!dirty && !anySectionChange) ? 'btn-next-prev d-none' : 'btn-next-prev d-inline-block'}>Submit</Button>{' '}
              <Button color="primary" onClick={this.props.jumpToNextStep}
                      className={(dirty || anySectionChange) ? 'btn-next-prev d-none' : 'btn-next-prev d-inline-block'}>Submit</Button>{' '}
            </div>
          </Col>
        </Row>
      </Form>
    )
  }
}

const EnhancedUpdateRegistrationStep1 = withFormik({
  mapPropsToValues: (props) => {
    let device_imei = null
    let filename = null
    let devices = []
    if (props.info.file === null) {
      if ((props.info.imeis || []).length > 0) {
        for (var d = 0; d < props.info.imeis.length; d++) {
          devices[d] = {};
          for (var im = 0; im < props.info.imeis[d].length; im++) {
            if (typeof devices[d].imeis === "undefined") {
              devices[d].imeis = [];
            }
            if (typeof devices[d].imeis[im] === "undefined") {
              devices[d].imeis[im] = {};
            }
            devices[d].imeis[im].imei = props.info.imeis[d][im]
            devices[d].imeis[im].reImei = props.info.imeis[d][im]
          }
        }
      }
      device_imei = 'webpage'
    } else {
      filename = props.info.file
      device_imei = 'tsv'
    }
    return ({
      "device_count": props.info.device_count || "",
      "imei_per_device": props.info.imei_per_device || "",
      "device_imei": device_imei || "",
      "filename": filename || "",
      "imeis_count": "",
      "m_location": props.info.m_location || "",
      "devices": devices
    })
  },

  // Custom sync validation
  validate: values => {
    let errors = {};

    if (values.device_imei === 'webpage') {
      if (!values.device_count) {
        errors.device_count = 'This field is required'
      } else if (isNaN(Number(values.device_count))) {
        errors.device_count = 'Must be a number'
      } else if (!/^([1-9]|10)$/i.test(values.device_count)) {
        errors.device_count = 'Must be in between 1-10';
      }
    } else if (values.device_imei === 'tsv') {
      if (!values.device_count) {
        errors.device_count = 'This field is required'
      } else if (isNaN(Number(values.device_count))) {
        errors.device_count = 'Must be a number'
      } else if (!/^([1-9][0-9]{0,6}|1000000)$/i.test(values.device_count)) {
        errors.device_count = 'Must be in between 1-1,000,000';
      }
    }

    if (!values.imei_per_device) {
      errors.imei_per_device = 'This field is required'
    } else if (isNaN(Number(values.imei_per_device))) {
      errors.imei_per_device = 'Must be a number'
    } else if (!/^[1-5]$/i.test(values.imei_per_device)) {
      errors.imei_per_device = 'Must be in between 1-5';
    }

    // if(!values.device_imei) {
    //   errors.device_imei = 'This field is required'
    // }

    if (values.device_imei === 'webpage') {

      if (!values.devices || !values.devices.length) {
        errors.imeis_count = 'At least one Device must be entered'
      } else if (!((values.devices.length) === parseInt(values.device_count))) {
        errors.imeis_count = 'Your Device(s) must be equal to Device Count'
      }

      if (values.devices.length > 0) {
        for (let i = 0; i < parseInt(values.device_count); i++) {
          if (typeof values.devices[i] !== 'undefined') {
            for (let j = 0; j < parseInt(values.imei_per_device); j++) {
              if (typeof errors.devices === "undefined") {
                errors.devices = [];
              }
              if (typeof errors.devices[i] === "undefined") {
                errors.devices[i] = {};
              }
              if (typeof errors.devices[i].imeis === "undefined") {
                errors.devices[i].imeis = [];
              }
              if (typeof errors.devices[i].imeis[j] === "undefined") {
                errors.devices[i].imeis[j] = {};
              }

              // IMEIs Validation
              if (!values.devices[i].imeis[j].imei) {
                errors.devices[i].imeis[j].imei = 'This field is required'
              } else if (isNaN(Number(values.devices[i].imeis[j].imei))) {
                errors.devices[i].imeis[j].imei = 'IMEI Must be digit characters'
              } else if (values.devices[i].imeis[j].imei.length < 14 || values.devices[i].imeis[j].imei.length > 16) {
                errors.devices[i].imeis[j].imei = 'IMEI must consist of 14 to 16 digit characters'
              }

              // Retype IMEIs Validation
              if (!values.devices[i].imeis[j].reImei) {
                errors.devices[i].imeis[j].reImei = 'This field is required'
              } else if (isNaN(Number(values.devices[i].imeis[j].reImei))) {
                errors.devices[i].imeis[j].reImei = 'Retype IMEI Must be digit characters'
              } else if (values.devices[i].imeis[j].reImei.length < 14 || values.devices[i].imeis[j].reImei.length > 16) {
                errors.devices[i].imeis[j].reImei = 'Retype IMEI must consist of 14 to 16 digit characters'
              } else if (values.devices[i].imeis[j].imei !== values.devices[i].imeis[j].reImei) {
                errors.devices[i].imeis[j].reImei = 'Entered IMEI doesn\'t match'
              }
              if (Object.keys(errors.devices[i].imeis[j]).length === 0) { // Needs to change logic for that
                delete (errors.devices);
              }
            }
          }
        }
      }

    } else if (values.device_imei === 'tsv') {

      if (!values.filename) {
        errors.filename = 'This field is required'
      } else if (typeof values.filename === 'string') {
        // No error if filename is string
      } else if (getExtension(values.filename.name) !== 'tsv') {
        errors.filename = 'Invalid File extension, valid extension is: tsv'
      }
    }

    if (!values.m_location) {
      errors.m_location = 'This field is required'
    }

    return errors;
  },

  handleSubmit: (values, bag) => {
    bag.setSubmitting(false);
    console.log('I am called step1');
    //bag.props.callServer(values);
    bag.props.callServer(prepareAPIRequestStep1(values));
  },

  displayName: 'UpdateRegistrationStep1', // helps with React DevTools
})(UpdateRegistrationStep1);

function prepareAPIRequestStep1(values) {
  // Validate Values before sending
  const formData = new FormData();
  if (values.device_count) {
    formData.append('device_count', values.device_count);
  }
  if (values.imei_per_device) {
    formData.append('imei_per_device', values.imei_per_device);
  }
  if (values.devices.length > 0) {
    let devices = [];
    for (let d = 0; d < values.devices.length; d++) {
      if (values.devices[d].imeis.length > 0) {
        devices[d] = [];
        for (let im = 0; im < values.devices[d].imeis.length; im++) {
          devices[d][im] = values.devices[d].imeis[im].imei;
        }
      }
    }
    formData.append('imeis', JSON.stringify(devices));
  }
  if (values.filename) {
    formData.append('file', values.filename);
  }
  if (values.m_location) {
    formData.append('m_location', values.m_location);
  }

  formData.append('user_id', getUserInfo().sub);

  return formData;
}

const EnhancedUpdateRegistrationStep2 = withFormik({
  mapPropsToValues: (props) => {
    return ({
      "brand": props.info.brand || "",
      "model_name": props.info.model_name || "",
      "model_num": props.info.model_num || "",
      "device_type": props.info.device_type || "",
      "operating_system": props.info.operating_system || "",
      "technologies": props.info.technologies || []
    })
  },

  // Custom sync validation
  validate: values => {
    let errors = {};
    if (!values.brand) {
      errors.brand = 'This field is required'
    } else if (values.brand.length >= 1000) {
      errors.brand = 'Must be 1000 characters or less'
    }
    if (!values.model_name) {
      errors.model_name = 'This field is required'
    } else if (values.model_name.length >= 1000) {
      errors.model_name = 'Must be 1000 characters or less'
    }
    if (!values.model_num) {
      errors.model_num = 'This field is required'
    } else if (values.model_num.length >= 1000) {
      errors.model_num = 'Must be 1000 characters or less'
    }
    if (!values.device_type) {
      errors.device_type = 'This field is required'
    }
    if (!values.operating_system) {
      errors.operating_system = 'This field is required'
    } else if (values.operating_system.length >= 1000) {
      errors.operating_system = 'Must be 1000 characters or less'
    }
    if (!values.technologies || !values.technologies.length) {
      errors.technologies = 'Please select at least one option'
    }
    return errors;
  },

  handleSubmit: (values, bag) => {
    bag.setSubmitting(false);
    console.log('I am called step2');
    bag.props.callServer(prepareAPIRequestStep2(values));
  },

  displayName: 'UpdateRegistrationStep2', // helps with React DevTools
})(UpdateRegistrationStep2);

function prepareAPIRequestStep2(values) {
  // Validate Values before sending
  const formData = new FormData();
  if (values.brand) {
    formData.append('brand', values.brand);
  }
  if (values.operating_system) {
    formData.append('operating_system', values.operating_system);
  }
  if (values.model_name) {
    formData.append('model_name', values.model_name);
  }
  if (values.model_num) {
    formData.append('model_num', values.model_num);
  }
  if (values.device_type) {
    formData.append('device_type', values.device_type);
  }
  if (values.technologies) {
    formData.append('technologies', values.technologies);
  }

  formData.append('user_id', getUserInfo().sub);
  return formData;
}

const EnhancedUpdateRegistrationStep3 = withFormik({
  mapPropsToValues: (props) => {
    if (props.info.length > 0) {
      props.info.sort((a, b) => a.document_id - b.document_id)
    }
    return (
      {
        "documents": props.info || []
      }
    )
  },

  validate: values => {
    let errors = {};
    if (!values.documents.length) {
      errors.allDocs = 'Please report all documents';
    } else {
      for (let i = 0; i < DOCUMENTS.length; i++) {
        if (values.documents[i]) {
          if (typeof values.documents[i].filename === 'string') {
            // No error if filename is string
          } else if (!EXTENSIONS.includes(getExtension(values.documents[i].name).toLowerCase())) {
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
        if (!(typeof values.documents[i] === 'undefined') && typeof values.documents[i].filename === 'string') {
          // No error if filename is string
        } else if (!values.documents[i] && DOCUMENTS[i].required) {

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

  displayName: 'UpdateRegistrationStep3', // helps with React DevTools
})(UpdateRegistrationStep3);

function prepareAPIRequestStep3(values) {
  // Validate Values before sending
  const formData = new FormData();
  for (let i = 0; i < DOCUMENTS.length; i++) {
    formData.append(DOCUMENTS[i].label, values.documents[i])
  }
  formData.append('user_id', getUserInfo().sub);
  return formData;
}

class Update extends Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 1,
      step1Comments: [],
      step2Comments: [],
      step3Comments: [],
      id: null,
      stepsInfo: ['Basic registration details', 'Device model description', 'Approval documents'],
      requestId: null,
      data: null,
      loading: true,
      reportReady: false,
      stepReady: false,
      statusLabel: '',
      anySectionChange: false
    }
    this.getCommentsData = this.getCommentsData.bind(this);
    this.saveStep1 = this.saveStep1.bind(this);
    this.saveStep2 = this.saveStep2.bind(this);
    this.saveStep3 = this.saveStep3.bind(this);
    this.getStep1DataFromServer = this.getStep1DataFromServer.bind(this);
    this.getStep2DataFromServer = this.getStep2DataFromServer.bind(this);
    this.getStep3DataFromServer = this.getStep3DataFromServer.bind(this);
    this.jumpToNextStep = this.jumpToNextStep.bind(this);
    this.updateTokenHOC = this.updateTokenHOC.bind(this);
  }

  componentDidMount() {
    const {step} = this.state;
    const id = parseInt(this.props.match.params.id)
    if (step === 1) {
      this.updateTokenHOC(this.getStep1DataFromServer);
    }
    this.setState({
      id: id
    }, () => {
      this.updateTokenHOC(this.getCommentsData);
    })
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

  jumpToNextStep() {
    const {step} = this.state;
    console.log(step);
    if ((step + 1) === 2) {
      this.updateTokenHOC(this.getStep2DataFromServer);
    } else if ((step + 1) === 3) {
      this.updateTokenHOC(this.getStep3DataFromServer);
    } else if (step === 3) { // step is now 3, meaning finish this
      this.props.history.push('/search-requests');
    }
  }

  getCommentsData(config) {
    const {
      step1Comments,
      step2Comments,
      step3Comments
    } = this.state
    this.setState({
      stepReady: false
    })
    let step1comments = step1Comments
    let step2comments = step2Comments
    let step3comments = step3Comments
    const type = 'registration_request'
    const id = this.state.id
    instance.get(`/review/sections?request_id=${id}&request_type=${type}`, config)
      .then((response) => {
        if (response.status === 200) {
          for (let step in response.data.sections) {
            if (response.data.sections[step].section_type === 'device_quota') {
              if (response.data.sections[step].comments !== null && response.data.sections[step].comments.length > 0) {
                response.data.sections[step].comments.map((value) => {
                  step1comments.push(value)
                  return this.setState({
                    step1Comments: step1comments
                  });
                })
              } else {
                this.setState({
                  stepReady: true
                })
              }
            }
            else if (response.data.sections[step].section_type === 'device_description') {
              if (response.data.sections[step].comments !== null && response.data.sections[step].comments.length > 0) {
                response.data.sections[step].comments.map((value) => {
                  step2comments.push(value)
                  return this.setState({
                    step2Comments: step2comments
                  });
                })
              }
            }
            else if (response.data.sections[step].section_type === 'imei_classification') {
              if (response.data.sections[step].comments !== null && response.data.sections[step].comments.length > 0) {
                response.data.sections[step].comments.map((value) => {
                  step1comments.push(value)
                  return this.setState({
                    step1Comments: step1comments
                  });
                })
              }
            }
            else if (response.data.sections[step].section_type === 'imei_registration') {
              if (response.data.sections[step].comments !== null && response.data.sections[step].comments.length > 0) {
                response.data.sections[step].comments.map((value) => {
                  step1comments.push(value)
                  return this.setState({
                    step1Comments: step1comments
                  });
                })
              }
            }
            else if (response.data.sections[step].section_type === 'approval_documents') {
              if (response.data.sections[step].comments !== null && response.data.sections[step].comments.length > 0) {
                response.data.sections[step].comments.map((value) => {
                  step3comments.push(value)
                  return this.setState({
                    step3Comments: step3comments,
                    stepReady: true
                  });
                })
              } else {
                this.setState({
                  stepReady: true
                })
              }
            }
          }
        }
      })
      .catch((error) => {
        errors(this, error);
      })
  }

  getStep1DataFromServer(config) {
    const {id} = this.props.match.params;
    this.setState({
      stepReady: false
    })
    instance.get(`/registration/${id}`, config)
      .then(response => {
        this.setState({
          data: response.data,
          loading: false,
          requestId: response.data.id,
          stepReady: true,
          statusLabel: response.data.status_label
        });
      })
      .catch(error => {
        errors(this, error);
        this.setState({stepReady: true});
      })
  }

  getStep2DataFromServer(config) {
    const {requestId} = this.state;
    this.setState({
      stepReady: false
    })
    instance.get(`/registration/device/${requestId}`, config)
      .then(response => {
        this.setState({data: response.data, loading: false});
        this.setState({step: 2}, () => {
          this.setState({
            stepReady: true
          })
        });
      })
      .catch(error => {
        errors(this, error);
        this.setState({stepReady: true});
      })
  }

  getStep3DataFromServer(config) {
    // const {id} = this.state;
    const {requestId} = this.state;
    this.setState({
      stepReady: false
    })
    instance.get(`/registration/documents/${requestId}`, config)
      .then(response => {
        this.setState({data: response.data, loading: false});
        instance.get(`/registration/${requestId}`, config)
          .then(response => {
            if (response.data.report) {
              this.setState({
                reportReady: true
              }, () => {
                this.setState({step: 3}, () => {
                  this.setState({
                    stepReady: true
                  })
                });
              })
            } else {
              this.setState({
                reportReady: false
              }, () => {
                this.setState({step: 3}, () => {
                  this.setState({
                    stepReady: true
                  })
                });
              })
            }
          })
          .catch(error => {
            this.setState({stepReady: true});
            errors(this, error);
          })
      })
      .catch(error => {
        errors(this, error);
      })
  }

  saveStep1(config, formdata) {
    // Call API and save information
    const {requestId} = this.state;
    formdata.append('reg_id', requestId);
    instance.put(`/registration`, formdata, config)
      .then((response) => {
        if (response.data.id) {
          //toast.success('Your Registration Basic Details has been updated successfully!');
          this.setState({anySectionChange: true});
          this.updateTokenHOC(this.getStep2DataFromServer);
        }
      })
      .catch((error) => {
        errors(this, error);
      })
  }

  saveStep2(config, formdata) {
    // Call API and save information
    const {requestId} = this.state;
    formdata.append('reg_id', requestId);
    instance.put(`/registration/device`, formdata, config)
      .then((response) => {
        if (response.data) {
          this.setState({anySectionChange: true});
          //toast.success('Device Details has been updated successfully!');
          this.updateTokenHOC(this.getStep3DataFromServer);
        }
      })
      .catch((error) => {
        errors(this, error);
      })
  }

  saveStep3(config, formdata) {
    // Call API and save information
    this.setState({stepReady: false});
    const {requestId} = this.state;
    formdata.append('reg_id', requestId);
    instance.put(`/registration/documents`, formdata, config)
      .then((response) => {
        if (response.data) {
          //toast.success('Your Request has been updated successfully!');
          this.setState({stepReady: true, anySectionChange: true});
          // Finish the Registration
          const statusDetails = {
            id: requestId,
            type: 'registration',
            typeLabel: 'Registration',
            icon: 'fa fa-check',
            status: 'Pending Review',
            action: 'Updated'
          }
          this.props.history.push({
            pathname: '/request-status',
            state: {details: statusDetails}
          });
        }
      })
      .catch((error) => {
        this.setState({stepReady: true});
        errors(this, error);
      })
  }

  render() {
    const {step, stepsInfo, requestId, stepReady, anySectionChange} = this.state;
    return (
      <div className="animated fadeIn">
        {(step === 1) && this.state.data &&
        <EnhancedUpdateRegistrationStep1 callServer={(values) => this.updateTokenHOC(this.saveStep1, values)} stepsInfo={stepsInfo} step={step} id={requestId}
                                         info={this.state.data} comments={this.state.step1Comments}
                                         statusLabel={this.state.statusLabel} stepReady={stepReady}
                                         jumpToNextStep={() => this.updateTokenHOC(this.jumpToNextStep)}
                                         anySectionChange={anySectionChange}
                                         kcProps={this.props}
        />
        }
        {(step === 2) && this.state.data &&
        <EnhancedUpdateRegistrationStep2 callServer={(values) => this.updateTokenHOC(this.saveStep2, values)} stepsInfo={stepsInfo} step={step} id={requestId}
                                         info={this.state.data} comments={this.state.step2Comments}
                                         statusLabel={this.state.statusLabel} stepReady={stepReady}
                                         jumpToNextStep={() => this.updateTokenHOC(this.jumpToNextStep)} anySectionChange={anySectionChange}/>}
        {(step === 3) && this.state.data &&
        <EnhancedUpdateRegistrationStep3 callServer={(values) => this.updateTokenHOC(this.saveStep3, values)} stepsInfo={stepsInfo} step={step} id={requestId}
                                         info={this.state.data} comments={this.state.step3Comments}
                                         statusLabel={this.state.statusLabel} stepReady={stepReady}
                                         jumpToNextStep={() => this.updateTokenHOC(this.jumpToNextStep)}
                                         anySectionChange={anySectionChange}
                                         kcProps={this.props}/>
        }
      </div>
    )
  }
}

export default translate('translations')(Update);
