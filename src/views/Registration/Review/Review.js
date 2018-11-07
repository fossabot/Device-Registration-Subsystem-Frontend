/*Copyright (c) 2018 Qualcomm Technologies, Inc.
  All rights reserved.

  Redistribution and use in source and binary forms, with or without modification, are permitted (subject to the limitations in the disclaimer below) provided that the following conditions are met:

  * Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
* Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
* Neither the name of Qualcomm Technologies, Inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.
  NO EXPRESS OR IMPLIED LICENSES TO ANY PARTY'S PATENT RIGHTS ARE GRANTED BY THIS LICENSE. THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/
import React, {Component} from 'react';
import {translate, I18n} from 'react-i18next';
import {withFormik, Field} from 'formik';
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
} from 'reactstrap';
import renderError from './../../../components/Form/RenderError'
import RenderInput from './../../../components/Form/RenderInput'
import StepIndicator from './../../../components/Sidebar/StepIndicator';
import CommentBox from '../../../components/CommentSection/CommentBox'
import {
  getAuthHeader,
  instance,
  errors,
  getUserInfo,
  getReviewStatus,
} from "../../../utilities/helpers";
import {isNil, isEmpty, lensPath, view, set} from 'ramda'
import DeviceQuota from "../Sections/DeviceQuota";
import DeviceDescription from "../Sections/DeviceDescription";
import ImeiClassification from "../Sections/ImeiClassification";
import ImeiRegistration from "../Sections/ImeiRegistration";
import ApprovalDocuments from "../Sections/ApprovalDocuments";

//Creating Lenses In Ramda for immutibility
const currentStepLens = lensPath(['steps', 'currentStep'])

const step1ApiDataLens = lensPath(['steps', 'step1', 'apiData'])
const step1DataLens = lensPath(['steps', 'step1', 'data'])
const step1Status = lensPath(['steps', 'step1', 'reviewStatus'])
const step1PrevStatus = lensPath(['steps', 'step1', 'prevReviewStatus'])
const step1Feedback = lensPath(['steps', 'step1', 'reviewFeedback'])
const step1Comments = lensPath(['steps', 'step1', 'comments'])
//Step2
const step2ApiDataLens = lensPath(['steps', 'step2', 'apiData'])
const step2DataLens = lensPath(['steps', 'step2', 'data'])
const step2Status = lensPath(['steps', 'step2', 'reviewStatus'])
const step2PrevStatus = lensPath(['steps', 'step2', 'prevReviewStatus'])
const step2Feedback = lensPath(['steps', 'step2', 'reviewFeedback'])
const step2Comments = lensPath(['steps', 'step2', 'comments'])
//Step3
const step3ApiDataLens = lensPath(['steps', 'step3', 'apiData'])
const step3DataLens = lensPath(['steps', 'step3', 'data'])
const step3Status = lensPath(['steps', 'step3', 'reviewStatus'])
const step3PrevStatus = lensPath(['steps', 'step3', 'prevReviewStatus'])
const step3Feedback = lensPath(['steps', 'step3', 'reviewFeedback'])
const step3Comments = lensPath(['steps', 'step3', 'comments'])
//Step4
const step4ApiDataLens = lensPath(['steps', 'step4', 'apiData'])
const step4DataLens = lensPath(['steps', 'step4', 'data'])
const step4Status = lensPath(['steps', 'step4', 'reviewStatus'])
const step4PrevStatus = lensPath(['steps', 'step4', 'prevReviewStatus'])
const step4Feedback = lensPath(['steps', 'step4', 'reviewFeedback'])
const step4Comments = lensPath(['steps', 'step4', 'comments'])
//Step5
const step5ApiDataLens = lensPath(['steps', 'step5', 'apiData'])
const step5DataLens = lensPath(['steps', 'step5', 'data'])
const step5Status = lensPath(['steps', 'step5', 'reviewStatus'])
const step5PrevStatus = lensPath(['steps', 'step5', 'prevReviewStatus'])
const step5Feedback = lensPath(['steps', 'step5', 'reviewFeedback'])
const step5Comments = lensPath(['steps', 'step5', 'comments'])

class ReviewRegistrationForm extends Component {
  render() {
    const {
      dirty,
      handleSubmit,
      isValid,
      stepsInfo,
      stepsNames,
      unAssignReview,
      assigned,
      assignedTo,
      step,
      callPrev,
      reviewStatus,
      id,
      viewType,
      stepIndicator,
      totalImeis,
      requestStatus,
      stepReady,
      kcProps
    } = this.props
    const step1Data = stepsInfo.step1.apiData
    const step2Data = stepsInfo.step2.apiData
    const step3Data = stepsInfo.step3.apiData
    const step4Data = stepsInfo.step4.apiData
    const step5Data = stepsInfo.step5.apiData
    return (
      <I18n ns="translations">
        {
          (t) => (
            <div>
              <div className="steps-status space-between">
                <div>
                  <h4>{t('requestId')}: <span className="text-primary">{id}</span> &nbsp;&nbsp;
                    <small>{viewType === 'registration' ?
                      <span>{t('requestType')}: <span className="text-primary">{t('registration')}</span></span> :
                      <span>{t('requestType')}: <span
                        className="text-primary"> {t('deregistration')}</span></span>}</small>
                  </h4>
                </div>
                <div className='steps-status'>
                  { assigned &&
                    <p>{t('assignee')}: <span className='text-primary'>{assignedTo}</span> - Status: <span
                      className='text-secondary'>{requestStatus}</span></p>
                  }
                  { assigned &&
                  <Button onClick={unAssignReview} color="danger"
                          size="sm">{t('unAssignRequest')}</Button>
                  }
                </div>
              </div>
              {step === 1 && viewType==='registration' &&
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col className="col-12 col-xl-4 order-xl-12 mt-3">
                    <StepIndicator stepsInfo={stepsNames} step={step}/>
                    <CommentBox header={t('commentBox.header')} comments={stepsInfo.step1.comments}/>
                  </Col>
                  <Col className="col-12 col-xl-8 order-xl-1 mt-3">
                    <DeviceQuota step1Data={step1Data} stepReady={stepReady}/>
                    {stepReady &&
                    <Card>
                      <CardHeader><b>{t('reviewStatus')}</b></CardHeader>
                      <CardBody>
                        {!isEmpty(stepsInfo.step1.prevReviewStatus) &&
                        <div className="alert alert-warning"><b>{t('currentStatus')}:</b> {getReviewStatus(stepsInfo.step1.prevReviewStatus)}</div>
                        }
                        <Row>
                          <Col className="col-12 col-sm-6 col-md-4">
                            <FormGroup>
                              <Label>Review Status<span className="text-danger">*</span></Label>
                              <div className='selectbox'>
                                <Field name="reviewStatus" component="select" className="form-control">
                                  <option value="select">Select a status</option>
                                  <option value="6">{t('reviewStatus.approve')}</option>
                                  <option value="5">{t('reviewStatus.requested')}</option>
                                  <option value="7">{t('reviewStatus.rejected')}</option>
                                </Field>
                              </div>
                              <Field name="reviewStatus" component={renderError}/>
                            </FormGroup>
                          </Col>
                          <Col className="col-12 col-sm-6 col-md-8">
                            <FormGroup>
                              <Field name="reviewFeedback" type="textarea" label="Review Feedback"
                                     component={RenderInput} className="form-control" requiredStar/>
                            </FormGroup>
                          </Col>
                        </Row>
                      </CardBody>
                    </Card>
                    }
                    <div className="stepBtn_container">
                      <Button color="primary" type="submit"
                              className={(reviewStatus === '' || dirty) ? 'btn-next-prev stepBtn--show' : 'btn-next-prev stepBtn--hide'}
                              disabled={!isValid || !stepReady}>Next
                      </Button>{' '}
                      <Button color="primary" onClick={this.props.jumpToNext}
                              className={(reviewStatus === '' || dirty) ? 'btn-next-prev stepBtn--hide' : 'btn-next-prev stepBtn--show'}
                      >Next
                      </Button>{' '}
                    </div>
                  </Col>
                </Row>
              </Form>
              }
              {step === 2 &&
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col className="col-12 col-xl-4 order-xl-12 mt-3">
                    <StepIndicator stepsInfo={stepsNames} step={stepIndicator}/>
                    <CommentBox header={t('commentBox.header')} comments={stepsInfo.step2.comments}/>
                  </Col>
                  <Col className="col-12 col-xl-8 order-xl-1 mt-3">
                    <DeviceDescription step2Data={step2Data} stepReady={stepReady}/>
                    {stepReady &&
                    <Card>
                      <CardHeader><b>{t('reviewStatus')}</b></CardHeader>
                      <CardBody>
                        {!isEmpty(stepsInfo.step2.prevReviewStatus) &&
                        <div className="alert alert-warning"><b>{t('currentStatus')}:</b> {getReviewStatus(stepsInfo.step2.prevReviewStatus)}</div>
                        }
                        <Row>
                          <Col className="col-12 col-sm-6 col-md-4">
                            <FormGroup>
                              <Label>Review Status<span className="text-danger">*</span></Label>
                              <div className='selectbox'>
                                <Field name="reviewStatus" component="select"
                                       className="form-control">
                                  <option value="select">Select a status</option>
                                  <option value="6">{t('reviewStatus.approve')}</option>
                                  <option value="5">{t('reviewStatus.requested')}</option>
                                  <option value="7">{t('reviewStatus.rejected')}</option>
                                </Field>
                              </div>
                              <Field name="reviewStatus" component={renderError}/>
                            </FormGroup>
                          </Col>
                          <Col className="col-12 col-sm-6 col-md-8">
                            <FormGroup>
                              <Field name="reviewFeedback" type="textarea" label="Review Feedback"
                                     component={RenderInput} className="form-control" requiredStar/>
                            </FormGroup>
                          </Col>
                        </Row>
                      </CardBody>
                    </Card>
                    }
                    <div className="stepBtn_container">
                      <button onClick={callPrev}
                         className={viewType === 'deregistration' ? 'btn btn-link btn-next-prev stepBtn--hide' : 'btn btn-link btn-next-prev'}
                         >{t('previous')}</button>
                      <Button color="primary" type="submit"
                              className={(reviewStatus === '' || dirty) ? 'btn-next-prev stepBtn--show' : 'btn-next-prev stepBtn--hide'}
                              disabled={!isValid && (viewType === 'registration' || !stepReady)}>{t('next')}
                      </Button>{' '}
                      <Button color="primary" onClick={this.props.jumpToNext}
                              className={(reviewStatus === '' || dirty) ? 'btn-next-prev stepBtn--hide' : 'btn-next-prev stepBtn--show'}
                      >{t('next')}
                      </Button>{' '}
                    </div>
                  </Col>
                </Row>
              </Form>
              }
              {step === 3 &&
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col className="col-12 col-xl-4 order-xl-12 mt-3">
                    <StepIndicator stepsInfo={stepsNames} step={stepIndicator}/>
                    <CommentBox header={t('commentBox.header')} comments={stepsInfo.step3.comments}/>
                  </Col>
                  <Col className="col-12 col-xl-8 order-xl-1 mt-3">
                    <ImeiClassification step3Data={step3Data} id={id} totalImeis={totalImeis} stepReady={stepReady} viewType={viewType} kcProps={kcProps}/>
                    {stepReady &&
                    <Card>
                      <CardHeader><b>{t('reviewStatus')}</b></CardHeader>
                      <CardBody>
                        {!isEmpty(stepsInfo.step3.prevReviewStatus) &&
                        <div className="alert alert-warning"><b>{t('currentStatus')}:</b> {getReviewStatus(stepsInfo.step3.prevReviewStatus)}</div>
                        }
                        <Row>
                          <Col className="col-12 col-sm-6 col-md-4">
                            <FormGroup>
                              <Label>Review Status<span className="text-danger">*</span></Label>
                              <div className='selectbox'>
                                <Field name="reviewStatus" component="select"
                                       className="form-control">
                                  <option value="select">Select a status</option>
                                  <option value="6">{t('reviewStatus.approve')}</option>
                                  <option value="5">{t('reviewStatus.requested')}</option>
                                  <option value="7">{t('reviewStatus.rejected')}</option>
                                </Field>
                              </div>
                              <Field name="reviewStatus" component={renderError}/>
                            </FormGroup>
                          </Col>
                          <Col className="col-12 col-sm-6 col-md-8">
                            <FormGroup>
                              <Field name="reviewFeedback" type="textarea" label="Review Feedback"
                                     component={RenderInput} className="form-control" requiredStar/>
                            </FormGroup>
                          </Col>
                        </Row>
                      </CardBody>
                    </Card>
                    }
                    <div className="stepBtn_container">
                      <button onClick={callPrev} className="btn btn-link btn-next-prev"
                      >{t('previous')}</button>
                      <Button color="primary" type="submit"
                              className={(reviewStatus === '' || dirty) ? 'btn-next-prev stepBtn--show' : 'btn-next-prev stepBtn--hide'}
                              disabled={!isValid || isEmpty(step3Data) || !stepReady}>{t('next')}
                      </Button>{' '}
                      <Button color="primary" onClick={this.props.jumpToNext}
                              className={(reviewStatus === '' || dirty) ? 'btn-next-prev stepBtn--hide' : 'btn-next-prev stepBtn--show'}
                      >{t('next')}
                      </Button>{' '}
                    </div>
                  </Col>
                </Row>
              </Form>
              }
              {step === 4 &&
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col className="col-12 col-xl-4 order-xl-12 mt-3">
                    <StepIndicator stepsInfo={stepsNames} step={stepIndicator}/>
                    <CommentBox header={t('commentBox.header')} comments={stepsInfo.step4.comments}/>
                  </Col>
                  <Col className="col-12 col-xl-8 order-xl-1 mt-3">
                    <ImeiRegistration step4Data={step4Data} stepReady={stepReady} viewType={viewType}/>
                    {stepReady &&
                    <Card>
                      <CardHeader><b>{t('reviewStatus')}</b></CardHeader>
                      <CardBody>
                        {!isEmpty(stepsInfo.step4.prevReviewStatus) &&
                        <div className="alert alert-warning"><b>{t('currentStatus')}:</b> {getReviewStatus(stepsInfo.step4.prevReviewStatus)}</div>
                        }
                        <Row>
                          <Col className="col-12 col-sm-6 col-md-4">
                            <FormGroup>
                              <Label>Review Status<span className="text-danger">*</span></Label>
                              <div className='selectbox'>
                                <Field name="reviewStatus" component="select"
                                       className="form-control">
                                  <option value="select">Select a status</option>
                                  <option value="6">{t('reviewStatus.approve')}</option>
                                  <option value="5">{t('reviewStatus.requested')}</option>
                                  <option value="7">{t('reviewStatus.rejected')}</option>
                                </Field>
                              </div>
                              <Field name="reviewStatus" component={renderError}/>
                            </FormGroup>
                          </Col>
                          <Col className="col-12 col-sm-6 col-md-8">
                            <FormGroup>
                              <Field name="reviewFeedback" type="textarea" label="Review Feedback"
                                     component={RenderInput} className="form-control" requiredStar/>
                            </FormGroup>
                          </Col>
                        </Row>
                      </CardBody>
                    </Card>
                    }
                    <div className="stepBtn_container">
                      <button onClick={callPrev} className="btn btn-link btn-next-prev"
                      >{t('previous')}</button>
                      <Button color="primary" type="submit"
                              className={(reviewStatus === '' || dirty) ? 'btn-next-prev stepBtn--show' : 'btn-next-prev stepBtn--hide'}
                              disabled={!isValid || !stepReady}>{t('next')}
                      </Button>{' '}
                      <Button color="primary" onClick={this.props.jumpToNext}
                              className={(reviewStatus === '' || dirty) ? 'btn-next-prev stepBtn--hide' : 'btn-next-prev stepBtn--show'}
                      >{t('next')}
                      </Button>{' '}
                    </div>
                  </Col>
                </Row>
              </Form>
              }
              {step === 5 &&
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col className="col-12 col-xl-4 order-xl-12 mt-3">
                    <StepIndicator stepsInfo={stepsNames} step={stepIndicator}/>
                    <CommentBox header={t('commentBox.header')} comments={stepsInfo.step5.comments}/>
                  </Col>
                  <Col className="col-12 col-xl-8 order-xl-1 mt-3">
                    <ApprovalDocuments step5Data={step5Data} stepReady={stepReady} kcProps={kcProps}/>
                    {stepReady &&
                    <Card>
                      <CardHeader><b>{t('reviewStatus')}</b></CardHeader>
                      <CardBody>
                        {!isEmpty(stepsInfo.step5.prevReviewStatus) &&
                        <div className="alert alert-warning"><b>{t('currentStatus')}:</b> {getReviewStatus(stepsInfo.step5.prevReviewStatus)}</div>
                        }
                        <Row>
                          <Col className="col-12 col-sm-6 col-md-4">
                            <FormGroup>
                              <Label>Review Status<span className="text-danger">*</span></Label>
                              <div className='selectbox'>
                                <Field name="reviewStatus" component="select"
                                       className="form-control">
                                  <option value="select">Select a status</option>
                                  <option value="6">{t('reviewStatus.approve')}</option>
                                  <option value="5">{t('reviewStatus.requested')}</option>
                                  <option value="7">{t('reviewStatus.rejected')}</option>
                                </Field>
                              </div>
                              <Field name="reviewStatus" component={renderError}/>
                            </FormGroup>
                          </Col>
                          <Col className="col-12 col-sm-6 col-md-8">
                            <FormGroup>
                              <Field name="reviewFeedback" type="textarea" label="Review Feedback"
                                     component={RenderInput} className="form-control" requiredStar/>
                            </FormGroup>
                          </Col>
                        </Row>
                      </CardBody>
                    </Card>
                    }
                    <div className="stepBtn_container">
                      <button onClick={callPrev} className="btn btn-link btn-next-prev"
                         >{t('previous')}</button>
                      <Button color="primary" type="submit"
                              className={(reviewStatus === '' || dirty) ? 'btn-next-prev stepBtn--show' : 'btn-next-prev stepBtn--hide'}
                              disabled={!isValid || !stepReady}>{t('finish')}
                      </Button>{' '}
                    </div>
                  </Col>
                </Row>
              </Form>
              }
            </div>
          )
        }
      </I18n>
    )
  }
}

function prepareAPIRequest(values, step, id, requestType) {
  // Validate Values before sending
  const type = requestType === 'registration' ? 'registration_request' : 'de_registration_request'
  const reviewer_name = getUserInfo().preferred_username
  let data = {}
  if (step === 1) {
    data = {
      "comment": values.reviewFeedback,
      "request_id": id,
      "request_type": type,
      "reviewer_id": getUserInfo().sub,
      "reviewer_name": reviewer_name,
      "status": parseInt(values.reviewStatus),
      "section": "device_quota",
    }
    return data;
  }
  else if (step === 2) {
    data = {
      "comment": values.reviewFeedback,
      "request_id": id,
      "request_type": type,
      "reviewer_id": getUserInfo().sub,
      "reviewer_name": reviewer_name,
      "status": parseInt(values.reviewStatus),
      "section": "device_description",
    }
    return data;
  }
  else if (step === 3) {
    data = {
      "comment": values.reviewFeedback,
      "request_id": id,
      "request_type": type,
      "reviewer_id": getUserInfo().sub,
      "reviewer_name": reviewer_name,
      "status": parseInt(values.reviewStatus),
      "section": "imei_classification",
    }
    return data;
  }
  else if (step === 4) {
    data = {
      "comment": values.reviewFeedback,
      "request_id": id,
      "request_type": type,
      "reviewer_id": getUserInfo().sub,
      "reviewer_name": reviewer_name,
      "status": parseInt(values.reviewStatus),
      "section": "imei_registration",
    }
    return data;
  }
  else if (step === 5) {
    data = {
      "comment": values.reviewFeedback,
      "request_id": id,
      "request_type": type,
      "reviewer_id": getUserInfo().sub,
      "reviewer_name": reviewer_name,
      "status": parseInt(values.reviewStatus),
      "section": "approval_documents",
    }
    return data;
  }
}

const EnhancedForm = withFormik({
  mapPropsToValues: (props) => ({
    reviewStatus: props.reviewStatus,
    reviewFeedback: props.reviewFeedback
  }),
  // Custom sync validation
  validate: values => {
    let errors = {}
    if (values.reviewStatus === '' || values.reviewStatus === 'select') {
      errors.reviewStatus = 'This field is required'
    }
    if (values.reviewFeedback === '') {
      errors.reviewFeedback = 'This field is required'
    }
    return errors;
  },
  handleSubmit: (values, bag) => {
    if (bag.props.step === 1) {
      bag.props.callServer(prepareAPIRequest(values, 1, bag.props.id, bag.props.viewType))
    } else if (bag.props.step === 2) {
      bag.props.callServer(prepareAPIRequest(values, 2, bag.props.id, bag.props.viewType))
    } else if (bag.props.step === 3) {
      bag.props.callServer(prepareAPIRequest(values, 3, bag.props.id, bag.props.viewType))
    } else if (bag.props.step === 4) {
      bag.props.callServer(prepareAPIRequest(values, 4, bag.props.id, bag.props.viewType))
    } else if (bag.props.step === 5) {
      bag.props.callServer(prepareAPIRequest(values, 5, bag.props.id, bag.props.viewType))
    }
    bag.setSubmitting(false);
    bag.setFieldValue('reviewStatus', bag.props.reviewStatus)
    bag.setFieldValue('reviewFeedback', bag.props.reviewFeedback)
    bag.setFieldTouched('reviewStatus', false, false)
    bag.setFieldTouched('reviewFeedback', false, false)
  },
  displayName: 'ReviewRegistrationForm', // helps with React DevTools
})(ReviewRegistrationForm);

class Review extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewMode: '',
      viewType: '',
      assigned: false,
      assignedTo: 'N/A',
      requestId: 0,
      currentReviewStatus: '',
      currentReviewFeedback: '',
      stepReady: false,
      stepUpdated: false,
      isRejected: false,
      stepsInfo: ['Device Quota', 'Device Description', 'IMEI Classification Results', 'IMEI Registration Status', 'Approval Documents'],
      stepsInfo2: ['Device Description', 'IMEI Classification Results', 'IMEI Registration Status', 'Approval Documents'],
      totalImeis: null,
      requestStatus: '',
      completedRequest: false,
      steps: {
        currentStep: null,
        step1: {
          data: {},
          apiData: null,
          comments: [],
          reviewStatus: '',
          prevReviewStatus: '',
          reviewFeedback: ''
        },
        step2: {
          data: {},
          apiData: null,
          comments: [],
          reviewStatus: '',
          prevReviewStatus: '',
          reviewFeedback: ''
        },
        step3: {
          data: {},
          apiData: null,
          comments: [],
          reviewStatus: '',
          prevReviewStatus: '',
          reviewFeedback: ''
        },
        step4: {
          data: {},
          apiData: null,
          comments: [],
          reviewStatus: '',
          prevReviewStatus: '',
          reviewFeedback: ''
        },
        step5: {
          data: {},
          apiData: null,
          comments: [],
          reviewStatus: '',
          prevReviewStatus: '',
          reviewFeedback: ''
        }
      }
    }
    this.unAssignReview = this.unAssignReview.bind(this);
    this.checkReviewer = this.checkReviewer.bind(this);
    this.saveStep = this.saveStep.bind(this);
    this.getStepDataFromServer = this.getStepDataFromServer.bind(this);
    this.callPrev = this.callPrev.bind(this);
    this.jumpToNext = this.jumpToNext.bind(this);
    this.getSectionsData = this.getSectionsData.bind(this);
    this.submitReview = this.submitReview.bind(this);
    this.updateTokenHOC = this.updateTokenHOC.bind(this);
  }
  /**
   * HOC function to update token
   * @param callingFunc
   */
  updateTokenHOC(callingFunc, param1=null,param2=null,param3=null) {
    let config = null;
    if (this.props.kc.isTokenExpired(0)) {
      this.props.kc.updateToken(0)
        .success(() => {
          localStorage.setItem('token', this.props.kc.token)
          config = {
            headers: getAuthHeader(this.props.kc.token)
          }
          callingFunc(config,param1,param2,param3);
        })
        .error(() => this.props.kc.logout());
    } else {
      config = {
        headers: getAuthHeader()
      }
      callingFunc(config,param1,param2,param3);
    }
  }

  unAssignReview(config) {
    const id = this.state.requestId;
    const type = this.state.viewType === 'registration' ? 'registration_request' : 'de_registration_request'
    let data = {
      "request_id": parseInt(id),
      "request_type": type,
      "reviewer_id": getUserInfo().sub,
      "reviewer_name": getUserInfo().preferred_username
    }
    instance.put(`/review/unassign-reviewer`, data, config)
      .then((response) => {
        if (response.status === 201) {
          this.setState({
            assigned: false
          })
          this.props.history.push('/search-requests')
        }
      })
      .catch((error) => {
        errors(this, error);
      })
  }

  checkReviewer(config) {
    const id = this.state.requestId;
    const type = this.state.viewType
    instance.get(`/${type}/${id}`, config)
      .then((response) => {
        if (response.status === 200) {
          if (response.data.reviewer_id && response.data.reviewer_name) {
            this.setState({
              assigned: true,
              assignedTo: response.data.reviewer_name,
              requestStatus: response.data.status_label
            })
          } else {
            this.setState({
              assigned: false
            })
          }
          if (type === 'registration') {
            this.setState({
              totalImeis: response.data.device_count * response.data.imei_per_device
            })
          } else {
            this.setState({
              totalImeis: response.data.device_count
            })
          }
        }
      })
      .catch((error) => {
        errors(this, error);
      })
  }

  componentDidMount() {
    const type = this.props.match.params.type
    const id = parseInt(this.props.match.params.id);
    let currStep = null
    if(type === 'registration'){
      currStep = 1
    } else{
      currStep = 2
    }
    this.setState(state => {
      const updateCurrentStep = set(currentStepLens, currStep, state);
      const updateState = {
        ...updateCurrentStep,
        viewType: type,
        requestId: id
      }
      return updateState
    }, () => {
      this.updateTokenHOC(this.getSectionsData)
      this.updateTokenHOC(this.checkReviewer)
    })
  }

  getSectionsData(config) {
    const type = this.state.viewType === 'registration' ? 'registration_request' : 'de_registration_request'
    const id = this.state.requestId;
    instance.get(`/review/sections?request_id=${id}&request_type=${type}`, config)
      .then((response) => {
        if (response.status === 200) {
          for (let step in response.data.sections) {
            if (response.data.sections[step].section_type === 'device_quota') {
              if (!isNil(response.data.sections[step].section_status)) {
                this.setState(state => {
                  const updateComments = set(step1Comments, response.data.sections[step].comments, state)
                  const updateStatus = set(step1Status, response.data.sections[step].section_status, updateComments)
                  const updatePrevStatus = set(step1PrevStatus, response.data.sections[step].section_status, updateStatus)
                  const updateFeedback = set(step1Feedback, response.data.sections[step].comments[0].comment, updatePrevStatus)
                  return updateFeedback
                }, () => {
                  this.updateTokenHOC(this.getStepDataFromServer,1, false);
                })
              } else {
                this.setState({
                  currentReviewStatus: '',
                  currentReviewFeedback: '',
                }, () => {
                  this.updateTokenHOC(this.getStepDataFromServer,1, true);
                })
                break
              }
            }
            else if (response.data.sections[step].section_type === 'device_description') {
              if (!isNil(response.data.sections[step].section_status)) {
                this.setState(state => {
                  const updateComments = set(step2Comments, response.data.sections[step].comments, state)
                  const updateStatus = set(step2Status, response.data.sections[step].section_status, updateComments)
                  const updatePrevStatus = set(step2PrevStatus, response.data.sections[step].section_status, updateStatus)
                  const updateFeedback = set(step2Feedback, response.data.sections[step].comments[0].comment, updatePrevStatus)
                  return updateFeedback
                }, () => {
                  this.updateTokenHOC(this.getStepDataFromServer,2, false);
                })
              } else {
                this.setState({
                  currentReviewStatus: '',
                  currentReviewFeedback: '',
                }, () => {
                  this.updateTokenHOC(this.getStepDataFromServer,2, true);
                })
                break
              }
            }
            else if (response.data.sections[step].section_type === 'imei_classification') {
              if (!isNil(response.data.sections[step].section_status)) {
                this.setState(state => {
                  const updateComments = set(step3Comments, response.data.sections[step].comments, state)
                  const updateStatus = set(step3Status, response.data.sections[step].section_status, updateComments)
                  const updatePrevStatus = set(step3PrevStatus, response.data.sections[step].section_status, updateStatus)
                  const updateFeedback = set(step3Feedback, response.data.sections[step].comments[0].comment, updatePrevStatus)
                  return updateFeedback
                }, () => {
                  this.updateTokenHOC(this.getStepDataFromServer,3, false);
                })
              } else {
                this.setState({
                  currentReviewStatus: '',
                  currentReviewFeedback: '',
                }, () => {
                  this.updateTokenHOC(this.getStepDataFromServer,3, true);
                })
                break;
              }
            }
            else if (response.data.sections[step].section_type === 'imei_registration') {
              if (!isNil(response.data.sections[step].section_status)) {
                this.setState(state => {
                  const updateComments = set(step4Comments, response.data.sections[step].comments, state)
                  const updateStatus = set(step4Status, response.data.sections[step].section_status, updateComments)
                  const updatePrevStatus = set(step4PrevStatus, response.data.sections[step].section_status, updateStatus)
                  const updateFeedback = set(step4Feedback, response.data.sections[step].comments[0].comment, updatePrevStatus)
                  return updateFeedback
                }, () => {
                  this.updateTokenHOC(this.getStepDataFromServer,4, false);
                })
              } else {
                this.setState({
                  currentReviewStatus: '',
                  currentReviewFeedback: '',
                }, () => {
                  this.updateTokenHOC(this.getStepDataFromServer,4, true);
                })
                break
              }
            }
            else if (response.data.sections[step].section_type === 'approval_documents') {
              if (!isNil(response.data.sections[step].section_status)) {
                this.setState(state => {
                  const updateComments = set(step5Comments, response.data.sections[step].comments, state)
                  const updateStatus = set(step5Status, response.data.sections[step].section_status, updateComments)
                  const updatePrevStatus = set(step5PrevStatus, response.data.sections[step].section_status, updateStatus)
                  const updateFeedback = set(step5Feedback, response.data.sections[step].comments[0].comment, updatePrevStatus)
                  return updateFeedback
                }, () => {
                  this.updateTokenHOC(this.getStepDataFromServer,6, true);
                })
              } else {
                this.setState({
                  currentReviewStatus: '',
                  currentReviewFeedback: '',
                }, () => {
                  this.updateTokenHOC(this.getStepDataFromServer,5, true);
                })
                break
              }
            }
          }
        }
      })
      .catch((error) => {
        errors(this, error);
      })
  }

  getStepDataFromServer(config,step, push) {
    const {id} = this.props.match.params;
    const type = this.state.viewType === 'registration' ? 'registration_request' : 'de_registration_request'

    let stepNumber = step
    if (stepNumber === 1) {
      instance.get(`/review/device-quota?request_id=${id}`, config)
        .then(response => {
          this.setState(state => {
            return set(step1ApiDataLens, response.data, state);
          }, () => {
            if (push) {
              this.setState(state => {
                return set(currentStepLens, 1, state);
              }, () => {
                this.setState({
                  stepReady: true
                })
              })
            }
          });
        })
        .catch(error => {
          this.setState({
            currentReviewStatus: view(step1Status, this.state),
            currentReviewFeedback: view(step1Feedback, this.state),
          }, () => {
            this.setState(state => {
              return set(currentStepLens, 1, state);
            }, () => {
              this.setState({
                stepReady: true
              })
            })
          });
          errors(this, error);
        })
    }
    else if (stepNumber === 2) {
      instance.get(`/review/device-description?request_id=${id}&request_type=${type}`, config)
        .then(response => {
          this.setState((state) => {
            return set(step2ApiDataLens, response.data, state)
          }, () => {
            if (push) {
              this.setState(state => {
                return set(currentStepLens, 2, state);
              }, () => {
                this.setState({
                  stepReady: true
                })
              })
            }
          });
        })
        .catch(error => {
          if(type==='registration'){
            this.setState({
              currentReviewStatus: view(step1Status, this.state),
              currentReviewFeedback: view(step1Feedback, this.state),
            }, () => {
              this.setState(state => {
                return set(currentStepLens, 1, state);
              }, () => {
                this.setState({
                  stepReady: true
                })
              })
            });
          } else{
            this.setState({
              currentReviewStatus: view(step2Status, this.state),
              currentReviewFeedback: view(step2Feedback, this.state),
            }, () => {
              this.setState(state => {
                return set(currentStepLens, 2, state);
              }, () => {
                this.setState({
                  stepReady: true
                })
              })
            });
          }
          errors(this, error);
        })
    }
    else if (stepNumber === 3) {
      instance.get(`/review/imei-classification?request_id=${id}&request_type=${type}`, config)
        .then(response => {
          this.setState(state => {
            return set(step3ApiDataLens, response.data, state);
          }, () => {
            if (push) {
              this.setState(state => {
                return set(currentStepLens, 3, state);
              }, () => {
                this.setState({
                  stepReady: true
                })
              })
            }
          });
        })
        .catch(error => {
          this.setState({
            currentReviewStatus: view(step2Status, this.state),
            currentReviewFeedback: view(step2Feedback, this.state),
          }, () => {
            this.setState(state => {
              return set(currentStepLens, 2, state);
            }, () => {
              this.setState({
                stepReady: true
              })
            })
          });
          errors(this, error);
        })
    }
    else if (stepNumber === 4) {
      instance.get(`/review/imeis-status?request_id=${id}&request_type=${type}`, config)
        .then(response => {
          if (response.status === 200) {
            this.setState(state => {
              return set(step4ApiDataLens, response.data, state);
            }, () => {
              if (push) {
                this.setState(state => {
                  return set(currentStepLens, 4, state);
                }, () => {
                  this.setState({
                    stepReady: true
                  })
                })
              }
            });
          }
        })
        .catch(error => {
          this.setState({
            currentReviewStatus: view(step3Status, this.state),
            currentReviewFeedback: view(step3Feedback, this.state),
          }, () => {
            this.setState(state => {
              return set(currentStepLens, 3, state);
            }, () => {
              this.setState({
                stepReady: true
              })
            })
          });
          errors(this, error);
        })
    }
    else if (stepNumber === 5) {
      instance.get(`/review/documents?request_id=${id}&request_type=${type}`, config)
        .then(response => {
          this.setState(state => {
            return set(step5ApiDataLens, response.data, state);
          }, () => {
            if (push) {
              this.setState(state => {
                return set(currentStepLens, 5, state);
              }, () => {
                this.setState({
                  stepReady: true
                })
              })
            }
          });
        })
        .catch(error => {
          this.setState({
            currentReviewStatus: view(step4Status, this.state),
            currentReviewFeedback: view(step4Feedback, this.state),
          }, () => {
            this.setState(state => {
              return set(currentStepLens, 4, state);
            }, () => {
              this.setState({
                stepReady: true
              })
            })
          });
          errors(this, error);
        })
    }
    else if (stepNumber === 6) {
      if (this.state.viewType === 'registration') {
        instance.get(`/review/device-quota?request_id=${id}`, config)
          .then(response => {
            //Reset Data if all the steps are completed
            this.setState(state => {
              const updateApiData = set(step1ApiDataLens, response.data, state);
              const updateStatus = {
                ...updateApiData,
                currentReviewStatus: '',
                currentReviewFeedback: '',
                steps: {
                  ...this.state.steps,
                  step2: {
                    data: {},
                    ...this.state.steps.step2,
                    apiData: null,
                    reviewStatus: '',
                    reviewFeedback: ''
                  },
                  step3: {
                    ...this.state.steps.step3,
                    data: {},
                    apiData: null,
                    reviewStatus: '',
                    reviewFeedback: ''
                  },
                  step4: {
                    ...this.state.steps.step4,
                    data: {},
                    apiData: null,
                    reviewStatus: '',
                    reviewFeedback: ''
                  },
                  step5: {
                    ...this.state.steps.step5,
                    data: {},
                    apiData: null,
                    reviewStatus: '',
                    reviewFeedback: ''
                  }
                }
              }
              return updateStatus;
            }, () => {
              if (push) {
                this.setState(state => {
                  return set(currentStepLens, 1, state);
                }, () => {
                  this.setState({
                    stepReady: true
                  })
                })
              }
            });
          })
          .catch(error => {
            this.setState({
              currentReviewStatus: view(step5Status, this.state),
              currentReviewFeedback: view(step5Feedback, this.state)
            }, () => {
              this.setState(state => {
                return set(currentStepLens, 5, state);
              }, () => {
                this.setState({
                  stepReady: true
                })
              })
            });
            errors(this, error);
          })
      } else {
        instance.get(`/review/device-description?request_id=${id}&request_type=${type}`, config)
          .then(response => {
            //Reset Data if all the steps are completed
            this.setState(state => {
              const updateApiData = set(step2ApiDataLens, response.data, state);
              const updateStatus = {
                ...updateApiData,
                currentReviewStatus: '',
                currentReviewFeedback: '',
                steps: {
                  ...this.state.steps,
                  step3: {
                    ...this.state.steps.step3,
                    data: {},
                    apiData: null,
                    reviewStatus: '',
                    reviewFeedback: ''
                  },
                  step4: {
                    ...this.state.steps.step4,
                    data: {},
                    apiData: null,
                    reviewStatus: '',
                    reviewFeedback: ''
                  },
                  step5: {
                    ...this.state.steps.step5,
                    data: {},
                    apiData: null,
                    reviewStatus: '',
                    reviewFeedback: ''
                  }
                }
              };
              return updateStatus;
            }, () => {
              if (push) {
                this.setState(state => {
                  return set(currentStepLens, 2, state);
                }, () => {
                  this.setState({
                    stepReady: true
                  })
                })
              }
            });
          })
          .catch(error => {
            this.setState({
              currentReviewStatus: view(step5Status, this.state),
              currentReviewFeedback: view(step5Feedback, this.state)
            }, () => {
              this.setState(state => {
                return set(currentStepLens, 5, state);
              }, () => {
                this.setState({
                  stepReady: true
                })
              })
            });
            errors(this, error);
          })
      }
    }
  }

  saveStep(config,data) {
    // Call API and save information
    this.setState({
      stepReady: false
    })
    const {steps} = this.state
    if (data.section === 'device_quota') {
      instance.put(`/review/review-section`, data, config)
        .then((response) => {
          if (response.status === 201) {
            if (data.status === 7) {
              this.updateTokenHOC(this.submitReview,1, data.status)
            } else {
              if (steps.step2.apiData) {
                this.setState(state => {
                  const updateData = set(step1DataLens, data, state);
                  const updateCurrentStep = set(currentStepLens, 2, updateData);
                  const updateStatus = set(step1Status, data.status, updateCurrentStep);
                  const updateReview = set(step1Feedback, data.comment, updateStatus);
                  const updateState = {
                    ...updateReview,
                    currentReviewStatus: view(step2Status, updateReview),
                    currentReviewFeedback: view(step2Feedback, updateReview),
                  }
                  return updateState
                }, () => {
                  this.setState({
                    stepReady: true
                  })
                })
              }
              else {
                this.updateTokenHOC(this.getStepDataFromServer,2, true)
                this.setState(state => {
                  const updateData = set(step1DataLens, data, state);
                  const updateStatus = set(step1Status, data.status, updateData);
                  const updateReview = set(step1Feedback, data.comment, updateStatus);
                  const updateCurrentFields = {
                    ...updateReview,
                    currentReviewStatus: '',
                    currentReviewFeedback: '',
                  }
                  return updateCurrentFields
                })
              }
              this.setState({
                stepUpdated: true
              })
            }
          }
        })
        .catch((error) => {
          this.setState({stepReady: true})
          errors(this, error);
        })
    }
    else if (data.section === 'device_description') {
      instance.put(`/review/review-section`, data, config)
        .then((response) => {
          if (response.status === 201) {
            if (data.status === 7) {
              this.updateTokenHOC(this.submitReview,2, data.status)
            } else {
              if (steps.step3.apiData) {
                this.setState(state => {
                  const updateData = set(step2DataLens, data, state);
                  const updateCurrentStep = set(currentStepLens, 3, updateData);
                  const updateStatus = set(step2Status, data.status, updateCurrentStep);
                  const updateReview = set(step2Feedback, data.comment, updateStatus);
                  const updateState = {
                    ...updateReview,
                    currentReviewStatus: view(step3Status, updateReview),
                    currentReviewFeedback: view(step3Feedback, updateReview),
                  }
                  return updateState
                }, () => {
                  this.setState({
                    stepReady: true
                  })
                })
              }
              else {
                this.updateTokenHOC(this.getStepDataFromServer,3, true)
                this.setState(state => {
                  const updateData = set(step2DataLens, data, state);
                  const updateStatus = set(step2Status, data.status, updateData);
                  const updateReview = set(step2Feedback, data.comment, updateStatus);
                  const updateCurrentFields = {
                    ...updateReview,
                    currentReviewStatus: '',
                    currentReviewFeedback: '',
                  }
                  return updateCurrentFields
                })
                this.setState({
                  stepUpdated: true
                })
              }
            }
          }
        })
        .catch((error) => {
          this.setState({stepReady: true})
          errors(this, error);
        })
    }
    else if (data.section === 'imei_classification') {
      instance.put(`/review/review-section`, data, config)
        .then((response) => {
          if (response.status === 201) {
            if (data.status === 7) {
              this.updateTokenHOC(this.submitReview,3, data.status)
            } else {
              if (steps.step4.apiData) {
                this.setState(state => {
                  const updateData = set(step3DataLens, data, state);
                  const updateCurrentStep = set(currentStepLens, 4, updateData);
                  const updateStatus = set(step3Status, data.status, updateCurrentStep);
                  const updateReview = set(step3Feedback, data.comment, updateStatus);
                  const updateState = {
                    ...updateReview,
                    currentReviewStatus: view(step4Status, updateReview),
                    currentReviewFeedback: view(step4Feedback, updateReview),
                  }
                  return updateState
                }, () => {
                  this.setState({
                    stepReady: true
                  })
                })
              }
              else {
                this.updateTokenHOC(this.getStepDataFromServer,4, true)
                this.setState(state => {
                  const updateData = set(step3DataLens, data, state);
                  const updateStatus = set(step3Status, data.status, updateData);
                  const updateReview = set(step3Feedback, data.comment, updateStatus);
                  const updateCurrentFields = {
                    ...updateReview,
                    currentReviewStatus: '',
                    currentReviewFeedback: '',
                  }
                  return updateCurrentFields
                })
              }
              this.setState({
                stepUpdated: true
              })
            }
          }
        })
        .catch((error) => {
          this.setState({stepReady: true})
          errors(this, error);
        })
    }
    else if (data.section === 'imei_registration') {
      instance.put(`/review/review-section`, data, config)
        .then((response) => {
          if (response.status === 201) {
            if (data.status === 7) {
              this.updateTokenHOC(this.submitReview,4, data.status)
            } else {
              if (steps.step5.apiData) {
                this.setState(state => {
                  const updateData = set(step4DataLens, data, state);
                  const updateCurrentStep = set(currentStepLens, 5, updateData);
                  const updateStatus = set(step4Status, data.status, updateCurrentStep);
                  const updateReview = set(step4Feedback, data.comment, updateStatus);
                  const updateState = {
                    ...updateReview,
                    currentReviewStatus: view(step5Status, updateReview),
                    currentReviewFeedback: view(step5Feedback, updateReview),
                  }
                  return updateState
                }, () => {
                  this.setState({
                    stepReady: true
                  })
                })
              }
              else {
                this.updateTokenHOC(this.getStepDataFromServer,5, true)
                this.setState(state => {
                  const updateData = set(step4DataLens, data, state);
                  const updateStatus = set(step4Status, data.status, updateData);
                  const updateReview = set(step4Feedback, data.comment, updateStatus);
                  const updateCurrentFields = {
                    ...updateReview,
                    currentReviewStatus: '',
                    currentReviewFeedback: '',
                  }
                  return updateCurrentFields
                })
                this.setState({
                  stepUpdated: true
                })
              }
            }
          }
        })
        .catch((error) => {
          this.setState({stepReady: true})
          errors(this, error);
        })
    }
    else if (data.section === 'approval_documents') {
      instance.put(`/review/review-section`, data, config)
        .then((response) => {
          if (response.status === 201) {
            this.setState(state => {
              const updateData = set(step5DataLens, data, state);
              const updateStatus = set(step5Status, data.status, updateData);
              const updateReview = set(step5Feedback, data.comment, updateStatus);
              return updateReview
            })
            this.updateTokenHOC(this.submitReview,5)
          }
        })
        .catch((error) => {
          this.setState({stepReady: true})
          errors(this, error);
        })
    }
  }

  callPrev() {
    const {steps} = this.state
    if (this.state.viewType === 'registration') {
      if (steps.currentStep === 2) {
        this.setState({
          currentReviewStatus: view(step1Status, this.state),
          currentReviewFeedback: view(step1Feedback, this.state)
        }, () => {
          this.setState(state => {
            return set(currentStepLens, 1, state)
          },()=>{
            this.setState({
              stepReady: true
            })
          })
        })
      }
      else if (steps.currentStep === 3) {
        this.setState({
          currentReviewStatus: view(step2Status, this.state),
          currentReviewFeedback: view(step2Feedback, this.state)
        }, () => {
          this.setState(state => {
            return set(currentStepLens, 2, state)
          },()=>{
            this.setState({
              stepReady: true
            })
          })
        })
      }
      else if (steps.currentStep === 4) {
        this.setState({
          currentReviewStatus: view(step3Status, this.state),
          currentReviewFeedback: view(step3Feedback, this.state)
        }, () => {
          this.setState(state => {
            return set(currentStepLens, 3, state)
          },()=>{
            this.setState({
              stepReady: true
            })
          })
        })
      }
      else if (steps.currentStep === 5) {
        this.setState({
          currentReviewStatus: view(step4Status, this.state),
          currentReviewFeedback: view(step4Feedback, this.state)
        }, () => {
          this.setState(state => {
            return set(currentStepLens, 4, state)
          },()=>{
            this.setState({
              stepReady: true
            })
          })
        })
      }
    }
    else {
      if (steps.currentStep === 3) {
        this.setState({
          currentReviewStatus: view(step2Status, this.state),
          currentReviewFeedback: view(step2Feedback, this.state)
        }, () => {
          this.setState(state => {
            return set(currentStepLens, 2, state)
          },()=>{
            this.setState({
              stepReady: true
            })
          })
        })
      }
      else if (steps.currentStep === 4) {
        this.setState({
          currentReviewStatus: view(step3Status, this.state),
          currentReviewFeedback: view(step3Feedback, this.state)
        }, () => {
          this.setState(state => {
            return set(currentStepLens, 3, state)
          },()=>{
            this.setState({
              stepReady: true
            })
          })
        })
      }
      else if (steps.currentStep === 5) {
        this.setState({
          currentReviewStatus: view(step4Status, this.state),
          currentReviewFeedback: view(step4Feedback, this.state)
        }, () => {
          this.setState(state => {
            return set(currentStepLens, 4, state)
          },()=>{
            this.setState({
              stepReady: true
            })
          })
        })
      }
    }
  }

  jumpToNext() {
    const {steps} = this.state
    if (this.state.viewType === 'registration') {
      if (steps.currentStep === 1) {
        this.setState({
          currentReviewStatus: view(step2Status, this.state),
          currentReviewFeedback: view(step2Feedback, this.state)
        }, () => {
          this.setState(state => {
            return set(currentStepLens, 2, state)
          },()=>{
            this.setState({
              stepReady: true
            })
          })
        })
      }
      else if (steps.currentStep === 2) {
        this.setState({
          currentReviewStatus: view(step3Status, this.state),
          currentReviewFeedback: view(step3Feedback, this.state)
        }, () => {
          this.setState(state => {
            return set(currentStepLens, 3, state)
          },()=>{
            this.setState({
              stepReady: true
            })
          })
        })
      }
      else if (steps.currentStep === 3) {
        this.setState({
          currentReviewStatus: view(step4Status, this.state),
          currentReviewFeedback: view(step4Feedback, this.state)
        }, () => {
          this.setState(state => {
            return set(currentStepLens, 4, state)
          },()=>{
            this.setState({
              stepReady: true
            })
          })
        })
      }
      else if (steps.currentStep === 4) {
        this.setState({
          currentReviewStatus: view(step5Status, this.state),
          currentReviewFeedback: view(step5Feedback, this.state)
        }, () => {
          this.setState(state => {
            return set(currentStepLens, 5, state)
          },()=>{
            this.setState({
              stepReady: true
            })
          })
        })
      }
    }
    else {
      if (steps.currentStep === 2) {
        this.setState({
          currentReviewStatus: view(step3Status, this.state),
          currentReviewFeedback: view(step3Feedback, this.state)
        }, () => {
          this.setState(state => {
            return set(currentStepLens, 3, state)
          })
        })
      }
      else if (steps.currentStep === 3) {
        this.setState({
          currentReviewStatus: view(step4Status, this.state),
          currentReviewFeedback: view(step4Feedback, this.state)
        }, () => {
          this.setState(state => {
            return set(currentStepLens, 4, state)
          })
        })
      }
      else if (steps.currentStep === 4) {
        this.setState({
          currentReviewStatus: view(step5Status, this.state),
          currentReviewFeedback: view(step5Feedback, this.state)
        }, () => {
          this.setState(state => {
            return set(currentStepLens, 5, state)
          })
        })
      }
    }
  }

  submitReview(config, step, status=null) {
    const {id} = this.props.match.params;
    const type = this.state.viewType === 'registration' ? 'registration_request' : 'de_registration_request'
    let data = {
      "request_id": id,
      "request_type": type,
      "reviewer_id": getUserInfo().sub
    }
    instance.put(`/review/submit-review`, data, config)
      .then((response) => {
        if (response.status === 201) {
          if (step === 5 || status === 7) {
            const statusDetails = {
              id: response.data.request_id,
              userType: 'reviewer',
              type: response.data.request_type === 'registration_request' ? 'registration' : 'deregistration',
              typeLabel: this.state.viewType === 'registration' ? 'Registration' : 'De-Registration',
              icon: 'fa fa-check',
              status: getReviewStatus(response.data.status),
              action: 'Submitted'
            }
            this.props.history.push({
              pathname: '/request-status',
              state: {details: statusDetails}
            });
          }
        }
      })
      .catch((error) => {
        if (step === 1) {
          this.setState({
            currentReviewStatus: this.state.steps.step1.reviewStatus,
            currentReviewFeedback: this.state.steps.step1.reviewFeedback,
          }, () => {
            this.setState({
              steps: {
                ...this.state.steps,
                currentStep: 1
              }
            }, () => {
              this.setState({
                stepReady: true
              })
            })
          })
        } else if (step === 2) {
          this.setState({
            currentReviewStatus: this.state.steps.step2.reviewStatus,
            currentReviewFeedback: this.state.steps.step2.reviewFeedback,
          }, () => {
            this.setState({
              steps: {
                ...this.state.steps,
                currentStep: 2
              }
            }, () => {
              this.setState({
                stepReady: true
              })
            })
          })
        } else if (step === 3) {
          this.setState({
            currentReviewStatus: this.state.steps.step3.reviewStatus,
            currentReviewFeedback: this.state.steps.step3.reviewFeedback,
          }, () => {
            this.setState({
              steps: {
                ...this.state.steps,
                currentStep: 3
              }
            }, () => {
              this.setState({
                stepReady: true
              })
            })
          })
        } else if (step === 4) {
          this.setState({
            currentReviewStatus: this.state.steps.step4.reviewStatus,
            currentReviewFeedback: this.state.steps.step4.reviewFeedback,
          }, () => {
            this.setState({
              steps: {
                ...this.state.steps,
                currentStep: 4
              }
            }, () => {
              this.setState({
                stepReady: true
              })
            })
          })
        } else if (step === 5) {
          this.setState({
            currentReviewStatus: this.state.steps.step5.reviewStatus,
            currentReviewFeedback: this.state.steps.step5.reviewFeedback,
          }, () => {
            this.setState({
              steps: {
                ...this.state.steps,
                currentStep: 5
              }
            }, () => {
              this.setState({
                stepReady: true
              })
            })
          })
        }
        errors(this, error);
      })
  }

  render() {
    const {
      steps,
      stepReady,
      stepsInfo,
      stepsInfo2,
      viewType,
      assigned,
      assignedTo,
      currentReviewStatus,
      currentReviewFeedback,
      totalImeis,
      requestStatus
    } = this.state;
    return (
      <div className="animated fadeIn">
        <EnhancedForm
          enableReinitialize={true}
          reviewStatus={currentReviewStatus}
          reviewFeedback={currentReviewFeedback}
          stepsInfo={steps}
          step={steps.currentStep}
          stepsNames={viewType === 'registration' ? stepsInfo : stepsInfo2}
          id={parseInt(this.props.match.params.id)}
          viewType={viewType}
          stepIndicator={viewType === 'registration' ? steps.currentStep : steps.currentStep - 1}
          assigned={assigned}
          assignedTo={assignedTo}
          unAssignReview={()=>this.updateTokenHOC(this.unAssignReview)}
          callPrev={this.callPrev}
          jumpToNext={this.jumpToNext}
          callServer={(data)=>this.updateTokenHOC(this.saveStep,data)}
          stepReady={stepReady}
          totalImeis={totalImeis}
          requestStatus={requestStatus}
          kcProps = {this.props}
        />
      </div>
    )
  }
}

export default translate('translations')(Review);