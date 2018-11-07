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
import {
  Row,
  Col,
  Button,
  Form
} from 'reactstrap';
import StepIndicator from '../../components/Sidebar/StepIndicator';
import CommentBox from '../../components/CommentSection/CommentBox'
import {
  instance,
  errors,
  getAuthHeader,
  getUserInfo,
  getStatusClass
} from "../../utilities/helpers";
import {isNil} from 'ramda'
import DeviceQuota from "../../views/Registration/Sections/DeviceQuota"
import DeviceDescription from "../../views/Registration/Sections/DeviceDescription"
import ImeiClassification from "../../views/Registration/Sections/ImeiClassification"
import ImeiRegistration from "../../views/Registration/Sections/ImeiRegistration"
import ApprovalDocuments from "../../views/Registration/Sections/ApprovalDocuments"

const Steps = ({
                 stepsInfo,
                 stepsNames,
                 assigned,
                 assignedTo,
                 step,
                 callPrev,
                 id,
                 requestStatus,
                 viewType,
                 stepIndicator,
                 gotoReview,
                 jumpToNext,
                 totalImeis,
                 stepReady,
                 kcProps
               }) => {
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
                  <small>{viewType === 'registration_request' ?
                    <span>{t('requestType')}: <span className="text-primary">{t('registration')}</span></span> :
                    <span>{t('requestType')}: <span
                      className="text-primary"> {t('deregistration')}</span></span>}</small>
                </h4>
              </div>
              <div className='steps-status no-previous'>
                {assignedTo !== 'N/A' &&
                <p>{t('assignee')}: <span className='text-primary'>{assignedTo}</span> - {t('status')}: <span
                  className={getStatusClass(requestStatus, 'text')}>{requestStatus}</span></p>
                }
                {!assigned &&
                <div className='steps-status'>
                  <p>Status: <span className={getStatusClass(requestStatus, 'text')}>{requestStatus}</span></p>
                  <Button onClick={gotoReview} color="primary" size="sm">{t('assignRequest')}</Button>
                </div>
                }
              </div>
            </div>
            {step === 1 &&
            <Form>
              <Row>
                <Col className="col-12 col-xl-4 order-xl-12 mt-3">
                  <StepIndicator stepsInfo={stepsNames} step={step} mode="view"/>
                  <CommentBox header={t('commentBox.header')} comments={stepsInfo.step1.comments}/>
                </Col>
                <Col className="col-12 col-xl-8 order-xl-1 mt-3">
                  <DeviceQuota step1Data={step1Data} stepReady={stepReady} />
                  <div className="stepBtn_container">
                    <Button color="primary" onClick={jumpToNext} disabled={isNil(step1Data)}
                            className='btn-next-prev'>{t('next')}</Button>{' '}
                  </div>
                </Col>
              </Row>
            </Form>
            }
            {step === 2 &&
            <Form>
              <Row>
                <Col className="col-12 col-xl-4 order-xl-12 mt-3">
                  <StepIndicator stepsInfo={stepsNames} step={stepIndicator} mode="view"/>
                  <CommentBox header={t('commentBox.header')} comments={stepsInfo.step2.comments}/>
                </Col>
                <Col className="col-12 col-xl-8 order-xl-1 mt-3">
                  <DeviceDescription step2Data={step2Data} stepReady={stepReady}/>
                  <div className="stepBtn_container">
                    <button onClick={callPrev}
                       className={viewType === 'de_registration_request' ? 'btn btn-link btn-next-prev stepBtn--hide' : 'btn btn-link btn-next-prev'}
                       >{t('previous')}</button>
                    <Button color="primary" onClick={jumpToNext} disabled={isNil(step2Data)}
                            className='btn-next-prev'>{t('next')}</Button>{' '}
                  </div>
                </Col>
              </Row>
            </Form>
            }
            {step === 3 &&
            <Form>
              <Row>
                <Col className="col-12 col-xl-4 order-xl-12 mt-3">
                  <StepIndicator stepsInfo={stepsNames} step={stepIndicator} mode="view"/>
                  <CommentBox header={t('commentBox.header')} comments={stepsInfo.step3.comments}/>
                </Col>
                <Col className="col-12 col-xl-8 order-xl-1 mt-3">
                  <ImeiClassification step3Data={step3Data} stepReady={stepReady} id={id} totalImeis={totalImeis} viewType={viewType=== 'registration_request' ? 'registration' : 'deregistration'} kcProps={kcProps}/>
                  <div className="stepBtn_container">
                    <button onClick={callPrev} className="btn btn-link btn-next-prev">{t('previous')}</button>
                    <Button color="primary" onClick={jumpToNext} disabled={isNil(step3Data)}
                            className='btn-next-prev'>{t('next')}</Button>{' '}
                  </div>
                </Col>
              </Row>
            </Form>
            }
            {step === 4 &&
            <Form>
              <Row>
                <Col className="col-12 col-xl-4 order-xl-12 mt-3">
                  <StepIndicator stepsInfo={stepsNames} step={stepIndicator} mode="view"/>
                  <CommentBox header={t('commentBox.header')} comments={stepsInfo.step4.comments}/>
                </Col>
                <Col className="col-12 col-xl-8 order-xl-1 mt-3">
                  <ImeiRegistration step4Data={step4Data} stepReady={stepReady} viewType={viewType=== 'registration_request' ? 'registration' : 'deregistration'}/>
                  <div className="stepBtn_container">
                    <button onClick={callPrev} className="btn btn-link btn-next-prev">{t('previous')}</button>
                    <Button color="primary" onClick={jumpToNext} disabled={isNil(step4Data)}
                            className='btn-next-prev'>{t('next')}</Button>{' '}
                  </div>
                </Col>
              </Row>
            </Form>
            }
            {step === 5 &&
            <Form>
              <Row>
                <Col className="col-12 col-xl-4 order-xl-12 mt-3">
                  <StepIndicator stepsInfo={stepsNames} step={stepIndicator} mode="view"/>
                  <CommentBox header={t('commentBox.header')} comments={stepsInfo.step4.comments}/>
                </Col>
                <Col className="col-12 col-xl-8 order-xl-1 mt-3">
                  <ApprovalDocuments step5Data={step5Data} stepReady={stepReady} kcProps={kcProps}/>
                  <div className="stepBtn_container">
                    <button onClick={callPrev} className="btn btn-link btn-next-prev">{t('previous')}</button>
                    <Button color="primary" onClick={jumpToNext} disabled={isNil(step5Data)}
                            className='btn-next-prev'>{t('finish')}</Button>{' '}
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
};

class ViewReview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewType: '',
      assigned: false,
      assignedTo: 'N/A',
      requestId: 0,
      requestStatus: '',
      stepReady: false,
      stepsInfo: ['Device Quota', 'Device Description', 'IMEI Classification Results', 'IMEI Registration Status', 'Approval Documents'],
      stepsInfo2: ['Device Description', 'IMEI Classification Results', 'IMEI Registration Status', 'Approval Documents'],
      totalImeis: null,
      steps: {
        currentStep: 1,
        step1: {
          apiData: {},
          comments: [],
        },
        step2: {
          apiData: null,
          comments: [],
        },
        step3: {
          apiData: null,
          comments: [],
        },
        step4: {
          apiData: null,
          comments: [],
        },
        step5: {
          apiData: null,
          comments: [],
        }
      },
    }
    this.gotoReview = this.gotoReview.bind(this);
    this.checkReviewer = this.checkReviewer.bind(this);
    this.getCommentsData = this.getCommentsData.bind(this);
    this.getStepDataFromServer = this.getStepDataFromServer.bind(this);
    this.callPrev = this.callPrev.bind(this);
    this.jumpToNext = this.jumpToNext.bind(this);
    this.updateTokenHOC = this.updateTokenHOC.bind(this);
  }
  /**
   * HOC function to update token
   * @param callingFunc
   */
  updateTokenHOC(callingFunc, param=null) {
    let config = null;
    if (this.props.kc.isTokenExpired(0)) {
      this.props.kc.updateToken(0)
        .success(() => {
          localStorage.setItem('token', this.props.kc.token)
          config = {
            headers: getAuthHeader(this.props.kc.token)
          }
          callingFunc(config, param);
        })
        .error(() => this.props.kc.logout());
    } else {
      config = {
        headers: getAuthHeader()
      }
      callingFunc(config, param);
    }
  }

  gotoReview(config) {
    const id = this.state.requestId
    let data = {
      "request_id": parseInt(id),
      "request_type": this.state.viewType,
      "reviewer_id": getUserInfo().sub,
      "reviewer_name": getUserInfo().preferred_username
    }
    instance.put(`/review/assign-reviewer`, data, config)
      .then((response) => {
        if (response.status === 201) {
          if (this.state.viewType === 'registration_request') {
            this.props.history.push(`/review-registration/${id}/registration`)
          } else {
            this.props.history.push(`/review-registration/${id}/deregistration`)
          }
        }
      })
      .catch((error) => {
        errors(this, error);
      })
  }

  checkReviewer(config) {
    const id = this.state.requestId;
    const type = this.state.viewType === 'registration_request' ? 'registration' : 'deregistration'
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
              assigned: false,
              assignedTo: 'N/A',
              requestStatus: response.data.status_label
            })
          }
          if (type === 'registration_request') {
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
    const type = this.props.match.params.type === 'registration' ? 'registration_request' : 'de_registration_request'
    const id = parseInt(this.props.match.params.id);
    this.setState({
      viewType: type,
      requestId: id
    }, () => {
      this.updateTokenHOC(this.getCommentsData)
      this.updateTokenHOC(this.checkReviewer)
      this.updateTokenHOC(this.getStepDataFromServer,1)
      this.updateTokenHOC(this.getStepDataFromServer,2)
      this.updateTokenHOC(this.getStepDataFromServer,3)
      this.updateTokenHOC(this.getStepDataFromServer,4)
      this.updateTokenHOC(this.getStepDataFromServer,5)
    })
  }

  getCommentsData(config) {
    const type = this.state.viewType
    const id = this.state.requestId
    instance.get(`/review/sections?request_id=${id}&request_type=${type}`, config)
      .then((response) => {
        if (response.status === 200) {
          for (let step in response.data.sections) {
            if (response.data.sections[step].section_type === 'device_quota') {
              this.setState({
                ...this.state,
                steps: {
                  ...this.state.steps,
                  step1: {
                    ...this.state.steps.step1,
                    comments: response.data.sections[step].comments,
                  },
                }
              })
            }
            else if (response.data.sections[step].section_type === 'device_description') {
              this.setState({
                ...this.state,
                steps: {
                  ...this.state.steps,
                  step2: {
                    ...this.state.steps.step2,
                    comments: response.data.sections[step].comments,
                  },
                }
              })
            }
            else if (response.data.sections[step].section_type === 'imei_classification') {
              this.setState({
                ...this.state,
                steps: {
                  ...this.state.steps,
                  step3: {
                    ...this.state.steps.step3,
                    comments: response.data.sections[step].comments,
                  },
                }
              })
            }
            else if (response.data.sections[step].section_type === 'imei_registration') {
              this.setState({
                ...this.state,
                steps: {
                  ...this.state.steps,
                  step4: {
                    ...this.state.steps.step4,
                    comments: response.data.sections[step].comments,
                  },
                }
              })
            }
            else if (response.data.sections[step].section_type === 'approval_documents') {
              this.setState({
                ...this.state,
                steps: {
                  ...this.state.steps,
                  step5: {
                    ...this.state.steps.step5,
                    comments: response.data.sections[step].comments,
                  },
                }
              })
            }
          }
        }
      })
      .catch((error) => {
        errors(this, error);
      })
  }

  getStepDataFromServer(config,step) {
    const {id} = this.props.match.params;
    const type = this.state.viewType
    this.setState({
      stepReady: false
    })
    let stepNumber = step
    if (stepNumber === 1 && type === 'registration_request') {
      instance.get(`/review/device-quota?request_id=${id}`, config)
        .then(response => {
          this.setState({
            steps: {
              ...this.state.steps,
              step1: {
                ...this.state.steps.step1,
                apiData: response.data
              },
            }
          });
        })
        .catch(error => {
          errors(this, error);
        })
    }
    else if (stepNumber === 2) {
      instance.get(`/review/device-description?request_id=${id}&request_type=${type}`, config)
        .then(response => {
          this.setState({
            steps: {
              ...this.state.steps,
              step2: {
                ...this.state.steps.step2,
                apiData: response.data
              },
            }
          });
        })
        .catch(error => {
          errors(this, error);
        })
    }
    else if (stepNumber === 3) {
      instance.get(`/review/imei-classification?request_id=${id}&request_type=${type}`, config)
        .then(response => {
          this.setState({
            steps: {
              ...this.state.steps,
              step3: {
                ...this.state.steps.step3,
                apiData: response.data
              }
            }
          });
        })
        .catch(error => {
          errors(this, error);
        })
    }
    else if (stepNumber === 4) {
      instance.get(`/review/imeis-status?request_id=${id}&request_type=${type}`, config)
        .then(response => {
          this.setState({
            steps: {
              ...this.state.steps,
              step4: {
                ...this.state.steps.step4,
                apiData: response.data
              }
            }
          });
        })
        .catch(error => {
          errors(this, error);
        })
    }
    else if (stepNumber === 5) {
      instance.get(`/review/documents?request_id=${id}&request_type=${type}`, config)
        .then(response => {
          this.setState({
            steps: {
              ...this.state.steps,
              currentStep: 1,
              step5: {
                ...this.state.steps.step5,
                apiData: response.data
              }
            }
          }, () => {
            this.setState({
              stepReady: true
            })
          });
        })
        .catch(error => {
          errors(this, error);
        })
    }
  }

  callPrev() {
    const {steps} = this.state
    if (this.state.viewType === 'registration_request') {
      if (steps.currentStep === 2) {
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
      }
      else if (steps.currentStep === 3) {
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
      }
      else if (steps.currentStep === 4) {
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
      }
      else if (steps.currentStep === 5) {
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
      }
    }
    else {
      if (steps.currentStep === 2) {
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
      }
      else if (steps.currentStep === 3) {
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
      }
      else if (steps.currentStep === 4) {
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
      }
    }
  }

  jumpToNext() {
    const {steps} = this.state
    if (this.state.viewType === 'registration_request') {
      if (steps.currentStep === 1) {
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
      }
      else if (steps.currentStep === 2) {
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
      }
      else if (steps.currentStep === 3) {
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
      }
      else if (steps.currentStep === 4) {
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
      }
      else if (steps.currentStep === 5) {
        this.props.history.push(`/dashboard`)
      }
    }
    else {
      if (steps.currentStep === 1) {
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
      }
      else if (steps.currentStep === 2) {
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
      }
      else if (steps.currentStep === 3) {
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
      }
      else if (steps.currentStep === 4) {
        this.props.history.push(`/dashboard`)
      }
    }
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
      requestStatus,
      totalImeis
    } = this.state;
    return (
      <div className="animated fadeIn">
        <Steps
          stepsInfo={steps}
          step={viewType === 'registration_request' ? steps.currentStep : steps.currentStep + 1}
          stepsNames={viewType === 'registration_request' ? stepsInfo : stepsInfo2}
          stepReady={stepReady}
          id={parseInt(this.props.match.params.id)}
          assigned={assigned}
          assignedTo={assignedTo}
          viewType={viewType}
          stepIndicator={steps.currentStep}
          gotoReview={()=>this.updateTokenHOC(this.gotoReview)}
          callPrev={this.callPrev}
          jumpToNext={this.jumpToNext}
          requestStatus={requestStatus}
          totalImeis={totalImeis}
          kcProps={this.props}
        />
      </div>
    )
  }
}

export default translate('translations')(ViewReview);
