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
  Input,
  FormGroup,
  FormFeedback,
  Card,
  CardHeader,
  CardBody,
  ModalHeader,
  ModalBody,
  ModalFooter
} from 'reactstrap';
import renderInput from './../../components/Form/RenderInput'
import RenderModal from '../../components/Form/RenderModal'
import doubleEntryInput from '../../components/Form/DoubleEntryInput'
import renderError from './../../components/Form/RenderError'
import RenderArrayError from './../../components/Form/RenderArrayError'
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
import {
  MANUFACTURE_LOCATIONS,
  DEVICE_TYPES,
  TECHNOLOGIES,
  DOCUMENTS,
  EXTENSIONS
} from "../../utilities/constants";
import StepLoading from "../../components/Loaders/StepLoading";
import {isNil, isEmpty, mapObjIndexed} from 'ramda';
import ReactTootip from 'react-tooltip'

class NewRegistrationStep1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imeiIndex: null,
      imeiModal: false,
      imeiModalTitle: null,
    }
    this.handleDeviceCountChange = this.handleDeviceCountChange.bind(this);
  }

  handleDeviceCountChange(event) {
    if (event.target.value > 10) {
      this.props.setFieldValue(event.target.name, event.target.value);
      this.props.setFieldValue('device_imei', 'tsv', false);
      this.props.setFieldValue('devices', [], false);
    } else {
      this.props.setFieldValue(event.target.name, event.target.value);
      this.props.setFieldValue('device_imei', 'webpage', false);
      this.props.setFieldValue('filename', '', false);
    }
  }

  render() {
    const {
      values,
      errors,
      touched,
      handleChange,
      handleBlur,
      handleSubmit,
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
                  downloadSampleFile(kcProps,'registration', e)
                }} className="btn btn-outline-dark">Download file
                </button>
              </p>
            </div>
            <div>
              <p className="alert alert-info mt-3 mb-1"><b> Webpage input:</b> You can add upto 10 devices with 5 IMEIs
                per device.</p>
              <p className="alert alert-info"><b> Tab-delimited file:</b> You can add upto 1,000,000 devices with 5
                IMEIs per device.</p>
            </div>
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
                      <FormGroup>
                        <Label>Device Count <i className="fa fa-question-circle text-secondary" data-tip
                                               data-for='dCount'></i> <span className="text-danger">*</span>
                          <ReactTootip id="dCount" effect="solid">
                            <p>Number of Devices for Registration:</p>
                            <ol className="ol-list">
                              <li>Use Web page input for less than 11 devices.</li>
                              <li>Use tab-delimited file for more than 10 devices.</li>
                            </ol>
                          </ReactTootip>
                        </Label>
                        <Input
                          name="device_count"
                          type="text"
                          onChange={this.handleDeviceCountChange}
                          onBlur={handleBlur}
                          placeholder="Device Count"
                          disabled={values.device_imei === 'webpage' && values.devices.length > 0}
                          valid={(touched.device_count && errors.device_count) ? false : null}
                        />
                        {errors.device_count && touched.device_count &&
                        <FormFeedback className="d-block">
                          {errors.device_count}
                        </FormFeedback>}
                      </FormGroup>
                    </Col>
                    <Col xs={12} sm={6}>
                      <Field name="imei_per_device" component={renderInput}
                             label="Number of IMEIs per Device" type="text"
                             placeholder="Number of IMEIs per Device" requiredStar
                             disable={values.device_imei === 'webpage' && values.devices.length > 0}/>
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={12} md={6}>
                      <FormGroup>
                        <Label>Device IMEI(s) <i className="fa fa-question-circle text-secondary" data-tip
                                                 data-for='dImeis'></i>
                          <ReactTootip id="dImeis" effect="solid">
                            <p>Device IMEI(s) method.</p>
                            <ol className='ol-list'>
                              <li>Web page input appears if Device Count input is less than 11.</li>
                              <li>Tab-delimited file appears if Device Count input is more than 10.</li>
                            </ol>
                          </ReactTootip>
                        </Label>
                        {(values.device_imei === '' || values.device_count === '')
                          ? <div className="alert alert-warning p-2">Please enter Device count</div>
                          : <div className="asitfield checkfield">
                            <label>
                              <input
                                name="device_imei"
                                type="radio"
                                value="tsv"
                                checked={values.device_imei === 'tsv'}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                disabled={(values.device_count && parseInt(values.device_count) <= 10)}
                                className="d-none"
                              />
                              {(values.device_imei === 'tsv') &&
                              <div>
                                <i className="fa fa-check"></i>
                                <span className="ml-2">Tab-delimited File</span>
                              </div>}
                            </label>
                            <label>
                              <input
                                name="device_imei"
                                type="radio"
                                value="webpage"
                                checked={values.device_imei === 'webpage'}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                disabled={(values.device_count && parseInt(values.device_count) > 10)}
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
                        }
                      </FormGroup>
                    </Col>
                    <Col xs={12} md={6}>
                      <FormGroup>
                        <Label> Manufacturing Location <span
                          className="text-danger">*</span></Label>
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
                                      <div key={index} className="device-box">
                                        <Button type="button" size="sm" color="danger" onClick={() => {
                                          if (window.confirm('Are you sure you want to delete this device?')) remove(index)
                                        }} className="btn-del-device">Delete</Button>
                                        <FieldArray
                                          name="imeis"
                                          render={({insert, remove, push}) => (
                                            <Card>
                                              <CardHeader><b>Device # {index + 1}</b></CardHeader>
                                              {values.devices[index].imeis.length && values.devices[index].imeis.map((imei, i) => (
                                                <CardBody key={i} className="pt-0 pb-0">
                                                  <div className="imei-row">
                                                    <div className="imei-col">
                                                      IMEI # {i + 1}
                                                    </div>
                                                    <div className="imei-col">
                                                      <Field name={`devices.${index}.imeis.${i}.imei`}
                                                             component={doubleEntryInput} type="text"
                                                             placeholder={`Type IMEI ${i + 1}`}/>
                                                      {errors.devices && touched.devices &&
                                                      <RenderArrayError errors={errors.devices}
                                                                        touched={touched.devices} mainIndex={index}
                                                                        innerIndex={i} field="imei"/>}
                                                    </div>
                                                    <div className="imei-col">
                                                      <Field name={`devices.${index}.imeis.${i}.reImei`}
                                                             component={doubleEntryInput} type="text"
                                                             placeholder={`Retype IMEI ${i + 1}`}/>
                                                      {errors.devices && touched.devices &&
                                                      <RenderArrayError errors={errors.devices}
                                                                        touched={touched.devices} mainIndex={index}
                                                                        innerIndex={i} field="reImei"/>}
                                                    </div>
                                                  </div>
                                                </CardBody>
                                              ))}
                                            </Card>
                                          )}
                                        />
                                      </div>
                                    ))}
                                    <Button type="button" onClick={() => push({imeis})}
                                            size="sm"
                                            className={((errors['device_count'] || errors['imei_per_device'] || values.devices.length === values.device_count)) ? 'btn-outline-primary d-none' : 'btn-outline-primary d-inline-block webpage-add-devices'}>Add
                                      Device</Button>
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
                  {values.device_imei === 'tsv' &&
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
              <Button color="primary" type="submit" className="btn-next-prev">Next</Button>{' '}
            </div>
          </Col>
        </Row>
      </Form>
    )

  }
}

class NewRegistrationStep2 extends Component {
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
      handleSubmit,
      isSubmitting,
      stepsInfo,
      step,
      id,
      stepReady
    } = this.props;

    return (
      <Form onSubmit={handleSubmit}>
        <div>
          <div className="steps-status space-between">
            <div>
              <h4>Request ID: <span className='text-primary mr-1'>{id}</span>
                <small> Request Type: <span className="text-primary">Registration</span></small>
              </h4>
            </div>
            <div className="steps-status">
              <p>Status: <span className='text-primary'>New Request</span></p>
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
                  <b>Device model description</b>
                </CardHeader>
                <CardBody className='steps-loading'>
                  {!stepReady &&
                  <StepLoading></StepLoading>
                  }
                  <div>
                    <Row>
                      <Col xs={12} sm={6}>
                        <Field name="brand" component={renderInput} label="Brand" type="text"
                               placeholder="Brand" requiredStar/>
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
                                <option value={deviceType.description}
                                        key={i}>{deviceType.description}</option>
                              ))}
                            </Field>
                          </div>
                          <Field name="device_type" component={renderError}/>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col xs={12} sm={6}>
                        <Field name="operating_system" component={renderInput} label="Operating System"
                               type="text" placeholder="Operating System" requiredStar/>
                      </Col>
                      <Col xs={12} sm={6}>
                        <FieldArray
                          name="technologies"
                          render={arrayHelpers => (
                            <FormGroup>
                              <Label>Radio Access Technology: <span
                                className="text-danger">*</span> </Label>
                              <div className="asitfield checkfield">
                                {TECHNOLOGIES.map((technology, i) => (
                                  <div key={technology.id} className="mr-3 d-inline-block">
                                    <label>
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
                                  </div>
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
                <Button color="primary" type="submit" disabled={isSubmitting}>Next</Button>{' '}
              </div>
            </Col>
          </Row>
        </div>
      </Form>
    )
  }
}

class NewRegistrationStep3 extends Component {
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
        <div>
          <div className="steps-status space-between">
            <div>
              <h4>Request ID: <span className='text-primary mr-1'>{id}</span>
                <small> Request Type: <span className="text-primary">Registration</span></small>
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
                          {DOCUMENTS.map((document, index) => (
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
                <Button color="primary" type="submit" disabled={isSubmitting}>Submit</Button>{' '}
              </div>
            </Col>
          </Row>
        </div>
      </Form>
    )
  }
}

const EnhancedNewRegistrationStep1 = withFormik({
  mapPropsToValues: () => {
    return ({
      "device_count": "",
      "imei_per_device": "",
      "device_imei": "",
      "filename": "",
      "imeis_count": "",
      "m_location": "",
      "devices": []
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

    if (!values.imei_per_device) {
      errors.imei_per_device = 'This field is required'
    } else if (isNaN(Number(values.imei_per_device))) {
      errors.imei_per_device = 'Must be a number'
    } else if (!/^[1-5]$/i.test(values.imei_per_device)) {
      errors.imei_per_device = 'Must be in between 1-5';
    }

    // if (!values.device_imei) {
    //     errors.device_imei = 'This field is required'
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
              if (Object.keys(errors.devices[i].imeis[j]).length === 0) {
                delete (errors.devices);
              }
            }
          }
        }
      }

    } else if (values.device_imei === 'tsv') {

      if (!values.filename) {
        errors.filename = 'This field is required'
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

  displayName: 'NewRegistrationStep1', // helps with React DevTools
})(NewRegistrationStep1);

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
  formData.append('user_name', getUserInfo().preferred_username);

  return formData;
}

const EnhancedNewRegistrationStep2 = withFormik({
  mapPropsToValues: () => ({
    "brand": "",
    "model_name": "",
    "model_num": "",
    "device_type": "",
    "operating_system": "",
    "technologies": []
  }),

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

  displayName: 'NewRegistrationStep2', // helps with React DevTools
})(NewRegistrationStep2);

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

const EnhancedNewRegistrationStep3 = withFormik({
  mapPropsToValues: () => ({"step3": "", "documents": []}),

  validate: values => {
    let errors = {};
    if (!values.documents.length || DOCUMENTS.length !== values.documents.length) {
      errors.allDocs = 'Document must be provided for all fields.';
    } else {
      for (let i = 0; i < values.documents.length; i++) {
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
        if (!values.documents[i] && DOCUMENTS[i].required) {
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
    bag.props.callServer(prepareAPIRequestStep3(values));
  },

  displayName: 'NewRegistrationStep3', // helps with React DevTools
})(NewRegistrationStep3);

function prepareAPIRequestStep3(values) {
  // Validate Values before sending
  const formData = new FormData();
  mapObjIndexed((document, key) => {
    formData.append(document.label, values.documents[key])
  }, DOCUMENTS)
  formData.append('user_id', getUserInfo().sub);
  return formData;
}

class NewRequest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 1,
      id: null,
      stepsInfo: ['Basic registration details', 'Device model description', 'Approval documents'],
      prevStepsData: null,
      prevStepsModal: false,
      stepReady: false
    }
    this.saveStep1 = this.saveStep1.bind(this);
    this.saveStep2 = this.saveStep2.bind(this);
    this.saveStep3 = this.saveStep3.bind(this);
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
      instance.get(`/registration/${id}`, config)
        .then(response => {
          if (response.data.status_label === 'New Request') {
            this.setState({id: response.data.id, step: 2}, () => {
              this.setState({stepReady: true});
            });
          } else if (response.data.status_label === 'Awaiting Documents') {
            this.setState({id: response.data.id, step: 3}, () => {
              this.setState({stepReady: true});
            });
          }
        })

      // Get Previous Steps Data
      this.updateTokenHOC(this.getPrevStepsDataFromServer, id);
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


  togglePrevStepsModal() {
    this.setState({prevStepsModal: !this.state.prevStepsModal});
  }

  getPrevStepsDataFromServer(config, id) {
    instance.get(`/registration/sections/${id}`, config)
      .then(response => {
        this.setState({prevStepsData: response.data});
      })
      .catch(error => {
        errors(this, error);
      })
  }

  saveStep1(config, formdata) {
    // Call API and save information
    this.setState({stepReady: false});
    instance.post(`/registration`, formdata, config)
      .then((response) => {
        if (response.data.id) {
          //toast.success('Your New Request has been registered successfully!');
        }
        this.setState({id: response.data.id, step: 2}, () => {
          this.updateTokenHOC(this.getPrevStepsDataFromServer, this.state.id);
          this.setState({stepReady: true});
        });
      })
      .catch((error) => {
        errors(this, error);
        this.setState({
          stepReady: true
        });
      })
  }

  saveStep2(config, formdata) {
    // Call API and save information
    this.setState({stepReady: false});
    const {id} = this.state;
    // Add Request ID to formData
    formdata.append('reg_id', id);
    instance.post(`/registration/device`, formdata, config)
      .then((response) => {
        if (response.data.id) {
          this.updateTokenHOC(this.getPrevStepsDataFromServer, id);
          this.setState({stepReady: true});
        }
        this.setState({step: 3});
        console.log(response.data)
        this.setState({stepReady: true});
      })
      .catch((error) => {
        this.setState({stepReady: true});
        errors(this, error);
      })
  }

  saveStep3(config, formdata) {
    // Call API and save information
    this.setState({stepReady: false});
    const {id} = this.state;
    formdata.append('reg_id', id);
    instance.post(`/registration/documents`, formdata, config)
      .then((response) => {
        if (response.data.length) {
          //toast.success('Your Request has been submitted successfully!');
          // Finish the Registration
          this.setState({stepReady: true});
          const statusDetails = {
            id: id,
            type: 'registration',
            typeLabel: 'Registration',
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

  render() {
    const {step, stepsInfo, id, prevStepsData, stepReady} = this.state;
    return (
      <I18n ns="translations">
        {
          (t, {i18n}) => (
            <div className="animated fadeIn">
              {(step === 1) &&
              <EnhancedNewRegistrationStep1 callServer={(values) => this.updateTokenHOC(this.saveStep1, values)}
                                            stepsInfo={stepsInfo}
                                            stepReady={stepReady}
                                            step={step}
                                            kcProps={this.props}
              />
              }
              {(step === 2) &&
              <EnhancedNewRegistrationStep2 callServer={(values) => this.updateTokenHOC(this.saveStep2, values)} stepsInfo={stepsInfo} step={step}
                                            stepReady={stepReady}
                                            id={id} showPrevStepsData={this.togglePrevStepsModal}/>}
              {(step === 3) &&
              <EnhancedNewRegistrationStep3 callServer={(values) => this.updateTokenHOC(this.saveStep3, values)} stepsInfo={stepsInfo} step={step}
                                            stepReady={stepReady}
                                            id={id} showPrevStepsData={this.togglePrevStepsModal}/>}
              <RenderModal show={this.state.prevStepsModal} className="modal-lg">
                <ModalHeader><b>Previous Steps Details</b></ModalHeader>
                <ModalBody>
                  {!isNil(prevStepsData) && !isEmpty(prevStepsData.reg_details) &&
                  <div>
                    <h6>Basic registration details</h6>
                    <table className="table table-bordered">
                      <tbody>
                      <tr>
                        <th>Device Count</th>
                        <td>{prevStepsData.reg_details.device_count}</td>
                      </tr>
                      <tr>
                        <th>No. of IMEIs per device</th>
                        <td>{prevStepsData.reg_details.imei_per_device}</td>
                      </tr>
                      {(prevStepsData.reg_details.file === null &&
                      <tr>
                        <th>IMEIs</th>
                        <td>
                          <table className="table table-mobile-primary table-webimeis table-striped table-sm mb-0">
                            <tbody>
                            {prevStepsData.reg_details.imeis.map((imeiList, index) => (
                              <tr key={index}>
                                <th>Device # {index + 1}</th>
                                <td>
                                  <table className="table table-sm mb-0">
                                    <tbody>
                                    <tr>
                                      {imeiList.map((imei, i) => (
                                        <td key={i}>{imei}</td>
                                      ))}
                                    </tr>
                                    </tbody>
                                  </table>
                                </td>
                              </tr>
                            ))}
                            </tbody>
                          </table>
                        </td>
                      </tr>)
                      ||
                      <tr>
                        <th>File</th>
                        <td>
                          <button onClick={(e) => {
                            downloadDocument(this.props,prevStepsData.reg_details.file_link, getExtension(prevStepsData.reg_details.file_link), removeExtension(prevStepsData.reg_details.file), e)
                          }} value={prevStepsData.reg_details.file_link} className="btn-link">Click here to view this
                            document
                          </button>
                        </td>
                      </tr>}
                      <tr>
                        <th>Manufacturing Location</th>
                        <td>{prevStepsData.reg_details.m_location}</td>
                      </tr>
                      </tbody>
                    </table>
                  </div>
                  }

                  {!isNil(prevStepsData) && !isEmpty(prevStepsData.reg_device) &&
                  <div className="mt-4">
                    <h6>Device model description</h6>
                    <table className="table table-bordered">
                      <tbody>
                      <tr>
                        <th>Brand</th>
                        <td>{prevStepsData.reg_device.brand}</td>
                      </tr>
                      <tr>
                        <th>Model name</th>
                        <td>{prevStepsData.reg_device.model_name}</td>
                      </tr>
                      <tr>
                        <th>Model number</th>
                        <td>{prevStepsData.reg_device.model_num}</td>
                      </tr>
                      <tr>
                        <th>Device type</th>
                        <td>{prevStepsData.reg_device.device_type}</td>
                      </tr>
                      <tr>
                        <th>Operating system</th>
                        <td>{prevStepsData.reg_device.operating_system}</td>
                      </tr>
                      <tr>
                        <th>Technologies</th>
                        <td>{prevStepsData.reg_device.technologies.join(', ')}</td>
                      </tr>
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

export default translate('translations')(NewRequest);
