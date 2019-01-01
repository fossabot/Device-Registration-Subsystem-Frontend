/*Copyright (c) 2018 Qualcomm Technologies, Inc.
  All rights reserved.

  Redistribution and use in source and binary forms, with or without modification, are permitted (subject to the limitations in the disclaimer below) provided that the following conditions are met:

  * Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
* Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
* Neither the name of Qualcomm Technologies, Inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.
  NO EXPRESS OR IMPLIED LICENSES TO ANY PARTY'S PATENT RIGHTS ARE GRANTED BY THIS LICENSE. THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/
import Review from './Review'
import {I18nextProvider} from 'react-i18next';
import i18n from './../../../i18nTest'
import React from "react";
import axios from "axios";
import mockAxios from 'jest-mock-axios';
// This sets the mock adapter on the default instance
const fakeResponse = {
  data: {},
  status: 404
}
const mockStep1APIdata = {
  "allowed_import_quota": 1000000,
  "request_device_count": 100,
  "allowed_export_quota": 1000000,
  "used_registration_quota": 3400,
  "used_de_registration_quota": 0
}
const mockStep2APIdata = {
  "user_device_description": [{
    "operating_system": "android",
    "model_number": "2012",
    "device_type": "Smartphone",
    "brand": "samsung",
    "model_name": "G5",
    "radio_access_technology": "2G,4G,3G"
  }],
  "gsma_device_description": [{
    "operating_system": "N/A",
    "model_number": "Rhone-L21",
    "device_type": "Smartphone",
    "brand": "HUAWEI",
    "model_name": "RNE-L21",
    "radio_access_technology": "SATELLITE"
  }]
}
const mockStep3APIdata = {
  "imei_compliance_status": {
    "provisional_non_compliant": 0,
    "non_compliant_imeis": 100,
    "provisional_compliant": 0,
    "compliant_imeis": 0
  },
  "seen_on_network": 0,
  "per_condition_classification_state": {
    "malformed": 0,
    "not_on_registration_list": 0,
    "gsma_not_found": 0,
    "local_stolen": 0,
    "duplicate": 0,
    "duplicate_large": 0
  },
  "lost_stolen_status": {"provisional_stolen": 0, "stolen": 0}
}
const mockStep4APIdata = {"registered": 3400, "not_registered": 0, "pending_registration": 2100}
const mockStep5APIdata = {
  "documents": [{
    "document_type": "shipment document",
    "link": "/var/www/html/dirbs_intl_drs/uploads/d47d1a9d-d162-42f0-8287-4ecfd44569b3/20181114093604_Complaint.pdf"
  }, {
    "document_type": "certificate document",
    "link": "/var/www/html/dirbs_intl_drs/uploads/d47d1a9d-d162-42f0-8287-4ecfd44569b3/20181114093604_Complaint 3.pdf"
  }, {
    "document_type": "authorization document",
    "link": "/var/www/html/dirbs_intl_drs/uploads/d47d1a9d-d162-42f0-8287-4ecfd44569b3/20181114093604_Complaint 2.pdf"
  }]
}

//Mock Comments
const mockStep1Comments = [{
  "user_id": "81e53d7a-4483-407c-b9f7-1ebd9fe05ac6",
  "user_name": "drs auth user",
  "comment": "Device Quota Section",
  "datetime": "2018-11-22T07:18:05.658390+00:00"
}]
const mockStep2Comments = [{
  "user_id": "81e53d7a-4483-407c-b9f7-1ebd9fe05ac6",
  "user_name": "drs auth user",
  "comment": "Device Description Section",
  "datetime": "2018-11-22T07:18:05.658390+00:00"
}]
const mockStep3Comments = [{
  "user_id": "81e53d7a-4483-407c-b9f7-1ebd9fe05ac6",
  "user_name": "drs auth user",
  "comment": "IMEI Classification Section",
  "datetime": "2018-11-22T07:18:05.658390+00:00"
}]
const mockStep4Comments = [{
  "user_id": "81e53d7a-4483-407c-b9f7-1ebd9fe05ac6",
  "user_name": "drs auth user",
  "comment": "IMEI Registration Section",
  "datetime": "2018-11-22T07:18:05.658390+00:00"
}]
const mockStep5Comments = [{
  "user_id": "81e53d7a-4483-407c-b9f7-1ebd9fe05ac6",
  "user_name": "drs auth user",
  "comment": "Approval Documents Section",
  "datetime": "2018-11-22T07:18:05.658390+00:00"
}]

//Review Component
describe("Review component", () => {
  describe("Registration Review", () => {
    const mockMatchParams = {
      match: {
        params: {
          id: 2,
          type: 'registration'
        }
      }
    }
    afterEach(() => {
      mockAxios.reset();
    })
    test('if renders correctly', () => {
      const wrapper = shallow(
        <Review {...mockMatchParams}/>);
      expect(wrapper).toMatchSnapshot()
    })
    test('if renders correctly again', () => {
      const wrapper = render(
        <I18nextProvider i18n={i18n}>
          <Review {...mockMatchParams}/>
        </I18nextProvider>
      )
      expect(wrapper).toMatchSnapshot()
    });
    test('if componentDidMount renders state correctly', () => {
      const wrapper = mount(
        <I18nextProvider i18n={i18n}>
          <Review kc={mockKcProps}  {...mockMatchParams}/>
        </I18nextProvider>
      )
      let state = wrapper.find('Review').state()
      expect(state.viewType).toEqual('registration')
      expect(state.requestId).toEqual(2)
      wrapper.find('Review').instance().getSectionsData = Sinon.spy()
      wrapper.update();
      wrapper.find('Review').instance().getSectionsData({
        "headers": {
          "Authorization": "Bearer null",
          "Content-Type": "application/json"
        }
      })
      const mockStep1Status = 6
      let responseObj = {
        data: {
          "sections": [
            {
              "section_status": mockStep1Status,
              "comments": mockStep1Comments,
              "section_type": "device_quota"
            },
            {
              "section_status": 6,
              "comments": mockStep2Comments,
              "section_type": "device_description"
            },
            {
              "section_status": 6,
              "comments": mockStep3Comments,
              "section_type": "imei_classification"
            },
            {
              "section_status": 6,
              "comments": mockStep4Comments,
              "section_type": "imei_registration"
            },
            {
              "section_status": 6,
              "comments": mockStep5Comments,
              "section_type": "approval_documents"
            }
          ]
        },
        status: 200
      }
      mockAxios.mockResponse(responseObj)
      expect(wrapper.find('Review').state().steps.step1.comments).toEqual(mockStep1Comments)
      expect(wrapper.find('Review').state().steps.step2.comments).toEqual(mockStep2Comments)
      expect(wrapper.find('Review').state().steps.step3.comments).toEqual(mockStep3Comments)
      expect(wrapper.find('Review').state().steps.step4.comments).toEqual(mockStep4Comments)
      expect(wrapper.find('Review').state().steps.step5.comments).toEqual(mockStep5Comments)
      wrapper.update()
      wrapper.find('Review').instance().checkReviewer = Sinon.spy()
      wrapper.update();

      //Check Reviewer
      wrapper.find('Review').instance().checkReviewer({
        "headers": {
          "Authorization": "Bearer null",
          "Content-Type": "application/json"
        }
      })
      responseObj = {
        data: {
          "report_status_label": "Processed",
          "imeis": [["5555555555555555"]],
          "reviewer_name": "drs auth user",
          "duplicate_imeis_file": null,
          "m_location": "local",
          "device_count": 1,
          "processing_status_label": "Processed",
          "user_id": "6ed9747b-d36a-4799-88c8-59d17a9abb5a",
          "report": "compliant_reportc55c5595-1f8f-4801-869a-4f4993f84390.tsv",
          "tracking_id": "921381ca-b60d-4be5-a3b9-8503d1ca8022",
          "updated_at": "2018-12-06T05:57:52.296226+00:00",
          "user_name": "drs importer user",
          "reviewer_id": "81e53d7a-4483-407c-b9f7-1ebd9fe05ac6",
          "created_at": "2018-11-30T10:24:53.724787+00:00",
          "imei_per_device": 1,
          "file": null,
          "status_label": "In Review",
          "id": 8434
        },
        status: 200
      }
      mockAxios.mockResponse(responseObj)
      expect(wrapper.find('Review').state().assigned).toBe(true)
      expect(wrapper.find('Review').state().assignedTo).toEqual('drs auth user')
      expect(wrapper.find('Review').state().requestStatus).toEqual('In Review')
    })
    test('if has all child components', () => {
      const wrapper = mount(
        <I18nextProvider i18n={i18n}>
          <Review kc={mockKcProps} {...mockMatchParams}/>
        </I18nextProvider>
      )
      let reviewComponent = wrapper.find('Review')
      expect(reviewComponent.find('StepIndicator').length).toEqual(1)
      expect(reviewComponent.find('CommentBox').length).toEqual(1)
      expect(reviewComponent.find('#stepHeader').length).toEqual(1)
      expect(reviewComponent.find('.stepBtn_container').length).toEqual(1)
    })
    test('if next button is disabled', () => {
      const wrapper = mount(
        <I18nextProvider i18n={i18n}>
          <Review kc={mockKcProps} {...mockMatchParams}/>
        </I18nextProvider>
      )
      let reviewComponent = wrapper.find('Review')
      expect(reviewComponent.find('Button').at(0).props().disabled).toBe(true)
    })
    test('if has unassign request button', () => {
      const wrapper = mount(
        <I18nextProvider i18n={i18n}>
          <Review kc={mockKcProps} {...mockMatchParams}/>
        </I18nextProvider>
      )
      let reviewComponent = wrapper.find('Review')
      reviewComponent.setState({
        assigned: true,
        assignedTo: 'test user'
      })
      wrapper.update()
      reviewComponent = wrapper.find('Review')
      expect(reviewComponent.find('button').at(0).text()).toBe('Unassign request')
    })
    test('if unassigning request works correctly', () => {
      const spy = Sinon.spy()
      const historyMock = {push: spy};
      const wrapper = mount(
        <I18nextProvider i18n={i18n}>
          <Review kc={mockKcProps} {...mockMatchParams} history={historyMock}>
          </Review>
        </I18nextProvider>
      )
      let reviewComponent = wrapper.find('Review')
      reviewComponent.setState({
        assigned: true,
        assignedTo: 'test user'
      })
      wrapper.update()
      reviewComponent = wrapper.find('Review')
      reviewComponent.find('button').at(0).simulate('click')
      let responseObj = {
        data: {},
        status: 201
      }
      let fakeResponse = {
        data: {},
        status: 204
      }
      mockAxios.mockResponse(fakeResponse)
      mockAxios.mockResponse(fakeResponse)
      mockAxios.mockResponse(responseObj)
      expect(spy.callCount).toEqual(1)
      expect(wrapper.find('Review').state().assigned).toBe(false)
    })
    test('if it has review feedback inputs', () => {
      const wrapper = mount(
        <I18nextProvider i18n={i18n}>
          <Review kc={mockKcProps} {...mockMatchParams}>
          </Review>
        </I18nextProvider>
      )
      wrapper.find('Review').setState({
        stepReady: true
      })
      wrapper.update()
      // console.log(wrapper.find('Field').debug())
      expect(wrapper.find('Field').last().props().name).toEqual('reviewFeedback')
      expect(wrapper.find('Field').first().props().name).toEqual('reviewStatus')
    })
    test('if changing values reflect changes in props', () => {
      const wrapper = mount(
        <I18nextProvider i18n={i18n}>
          <Review kc={mockKcProps} {...mockMatchParams}>
          </Review>
        </I18nextProvider>
      )
      wrapper.find('Review').setState({
        stepReady: true
      })
      wrapper.update()
      wrapper.find('Field').last().find('textarea').simulate('change', {
        target: {
          name: "reviewFeedback",
          value: "An example comment"
        }
      })
      wrapper.find('Field').first().find('select').simulate('change', {
        target: {
          name: "reviewStatus",
          value: "6"
        }
      })
      wrapper.update()
      expect(wrapper.find('Formik').state().values.reviewFeedback).toEqual('An example comment')
      expect(wrapper.find('Formik').state().values.reviewStatus).toEqual('6')
    })
    test('if next button state changes with input', () => {
      const wrapper = mount(
        <I18nextProvider i18n={i18n}>
          <Review kc={mockKcProps} {...mockMatchParams}>
          </Review>
        </I18nextProvider>
      )
      wrapper.find('Review').setState({
        stepReady: true
      })
      expect(wrapper.find('button').at(0).props().disabled).toBe(true)
      wrapper.update()
      wrapper.find('Field').last().find('textarea').simulate('change', {
        target: {
          name: "reviewFeedback",
          value: "An example comment"
        }
      })
      wrapper.find('Field').first().find('select').simulate('change', {
        target: {
          name: "reviewStatus",
          value: "6"
        }
      })
      wrapper.update()
      expect(wrapper.find('button').at(0).props().disabled).toBe(false)
    })
    test('if validation on input runs correctly', () => {
      const wrapper = mount(
        <I18nextProvider i18n={i18n}>
          <Review kc={mockKcProps} {...mockMatchParams}>
          </Review>
        </I18nextProvider>
      )
      wrapper.find('Review').setState({
        stepReady: true
      })
      wrapper.update()
      wrapper.find('Field').last().find('textarea').simulate('change', {
        target: {
          name: "reviewFeedback",
          value: ""
        }
      })
      wrapper.find('Field').first().find('select').simulate('change', {
        target: {
          name: "reviewStatus",
          value: "6"
        }
      })
      wrapper.update()
      expect(wrapper.find('Formik').state().errors).not.toBe({})
      expect(wrapper.find('Formik').state().errors.reviewFeedback).toEqual('This field is required')
    })

    //Navigating steps
    test('if progress to next step', () => {
      const spy = Sinon.spy()
      const historyMock = {push: spy};
      const wrapper = mount(
        <I18nextProvider i18n={i18n}>
          <Review kc={mockKcProps} {...mockMatchParams} history={historyMock}>
          </Review>
        </I18nextProvider>
      )
      wrapper.find('Review').setState({
        stepReady: true
      })
      wrapper.update()
      //Set initial Sections data
      let responseObj = {
        data: {
          "sections": [
            {
              "section_status": null,
              "comments": [],
              "section_type": "device_quota"
            },
            {
              "section_status": null,
              "comments": [],
              "section_type": "device_description"
            },
            {
              "section_status": null,
              "comments": [],
              "section_type": "imei_classification"
            },
            {
              "section_status": null,
              "comments": [],
              "section_type": "imei_registration"
            },
            {
              "section_status": null,
              "comments": [],
              "section_type": "approval_documents"
            }
          ]
        },
        status: 200
      }
      let fakeResponse = {
        data: {},
        status: 404
      }
      let getStep1DataResponse = {
        data: mockStep1APIdata,
        status: 200
      }
      mockAxios.mockResponse(responseObj)
      mockAxios.mockResponse(fakeResponse)
      mockAxios.mockResponse(getStep1DataResponse)

      //Step1 form
      wrapper.find('Field').last().find('textarea').simulate('change', {
        target: {
          name: "reviewFeedback",
          value: "An example comment in step1"
        }
      })
      wrapper.find('Field').first().find('select').simulate('change', {
        target: {
          name: "reviewStatus",
          value: "6"
        }
      })
      wrapper.update()
      wrapper.find('Form').simulate('submit')

      //Step1 submit to API
      responseObj = {
        data: {
          message: 'iam message'
        },
        status: 201
      }
      mockAxios.mockResponse(responseObj)
      //Get data from server step 2
      let getStepDataFromServer = {
        data: mockStep2APIdata,
        status: 200
      }
      mockAxios.mockResponse(getStepDataFromServer)
      wrapper.update()
      expect(wrapper.find('Review').state().steps.step2.apiData).toEqual(mockStep2APIdata)
      expect(wrapper.find('Review').state().steps.currentStep).toEqual(2)
      expect(wrapper.find('Review').state().steps.step1.reviewFeedback).toEqual('An example comment in step1')
      expect(wrapper.find('Review').state().steps.step1.reviewStatus).toEqual(6)

      //Step2 form
      wrapper.find('Field').last().find('textarea').simulate('change', {
        target: {
          name: "reviewFeedback",
          value: "An example comment in step2"
        }
      })
      wrapper.find('Field').first().find('select').simulate('change', {
        target: {
          name: "reviewStatus",
          value: "6"
        }
      })
      wrapper.update()
      wrapper.find('Form').simulate('submit')
      //Step2 submit to API
      mockAxios.mockResponse(responseObj)
      //Get data from server step 3
      getStepDataFromServer = {
        data: mockStep3APIdata,
        status: 200
      }
      mockAxios.mockResponse(getStepDataFromServer)
      wrapper.update()
      expect(wrapper.find('Review').state().steps.step3.apiData).toEqual(mockStep3APIdata)
      expect(wrapper.find('Review').state().steps.currentStep).toEqual(3)
      expect(wrapper.find('Review').state().steps.step2.reviewFeedback).toEqual('An example comment in step2')
      expect(wrapper.find('Review').state().steps.step2.reviewStatus).toEqual(6)

      //Step3 form
      wrapper.find('Field').last().find('textarea').simulate('change', {
        target: {
          name: "reviewFeedback",
          value: "An example comment in step3"
        }
      })
      wrapper.find('Field').first().find('select').simulate('change', {
        target: {
          name: "reviewStatus",
          value: "6"
        }
      })
      wrapper.update()
      wrapper.find('Form').simulate('submit')
      //Step3 submit to API
      mockAxios.mockResponse(responseObj)
      //Get data from server step 4
      getStepDataFromServer = {
        data: mockStep4APIdata,
        status: 200
      }
      mockAxios.mockResponse(getStepDataFromServer)
      wrapper.update()
      expect(wrapper.find('Review').state().steps.step4.apiData).toEqual(mockStep4APIdata)
      expect(wrapper.find('Review').state().steps.currentStep).toEqual(4)
      expect(wrapper.find('Review').state().steps.step3.reviewFeedback).toEqual('An example comment in step3')
      expect(wrapper.find('Review').state().steps.step3.reviewStatus).toEqual(6)

      //Step4 form
      wrapper.find('Field').last().find('textarea').simulate('change', {
        target: {
          name: "reviewFeedback",
          value: "An example comment in step4"
        }
      })
      wrapper.find('Field').first().find('select').simulate('change', {
        target: {
          name: "reviewStatus",
          value: "6"
        }
      })
      wrapper.update()
      wrapper.find('Form').simulate('submit')
      //Step4 submit to API
      mockAxios.mockResponse(responseObj)
      //Get data from server step 5
      getStepDataFromServer = {
        data: mockStep5APIdata,
        status: 200
      }
      mockAxios.mockResponse(getStepDataFromServer)
      wrapper.update()
      expect(wrapper.find('Review').state().steps.step5.apiData).toEqual(mockStep5APIdata)
      expect(wrapper.find('Review').state().steps.currentStep).toEqual(5)
      expect(wrapper.find('Review').state().steps.step4.reviewFeedback).toEqual('An example comment in step4')
      expect(wrapper.find('Review').state().steps.step4.reviewStatus).toEqual(6)

      //Step5 form
      wrapper.find('Field').last().find('textarea').simulate('change', {
        target: {
          name: "reviewFeedback",
          value: "An example comment in step5"
        }
      })
      wrapper.find('Field').first().find('select').simulate('change', {
        target: {
          name: "reviewStatus",
          value: "7"
        }
      })
      wrapper.update()
      wrapper.find('Form').simulate('submit')
      //Step4 submit to API
      mockAxios.mockResponse(responseObj)
      //Submit Review
      getStepDataFromServer = {
        data: {},
        status: 201
      }
      mockAxios.mockResponse(getStepDataFromServer)
      wrapper.update()
      // expect(wrapper.find('Review').state().steps.currentStep).toEqual(5)
      expect(wrapper.find('Review').state().steps.step5.reviewFeedback).toEqual('An example comment in step5')
      expect(wrapper.find('Review').state().steps.step5.reviewStatus).toEqual(7)
      //Router history push
      expect(spy.callCount).toEqual(1)
      // console.log(wrapper.find('Review').state())
    })
    test('if previous button render step correctly with data', () => {
      const wrapper = mount(
        <I18nextProvider i18n={i18n}>
          <Review kc={mockKcProps}  {...mockMatchParams}/>
        </I18nextProvider>
      )
      //Setting API data
      wrapper.find('Review').setState({
        assigned: true,
        assignedTo: 'test user',
        steps: {
          currentStep: 5,
          step1: {
            data: {},
            apiData: mockStep1APIdata
          },
          step2: {
            data: {},
            apiData: mockStep2APIdata
          },
          step3: {
            data: {},
            apiData: mockStep3APIdata
          },
          step4: {
            data: {},
            apiData: mockStep4APIdata
          },
          step5: {
            data: {},
            apiData: mockStep5APIdata
          }
        }
      })

      let responseObj = {
        data: {
          "sections": [
            {
              "section_status": 6,
              "comments": mockStep1Comments,
              "section_type": "device_quota"
            },
            {
              "section_status": 5,
              "comments": mockStep2Comments,
              "section_type": "device_description"
            },
            {
              "section_status": 6,
              "comments": mockStep3Comments,
              "section_type": "imei_classification"
            },
            {
              "section_status": 5,
              "comments": mockStep4Comments,
              "section_type": "imei_registration"
            },
            {
              "section_status": 6,
              "comments": mockStep5Comments,
              "section_type": "approval_documents"
            }
          ]
        },
        status: 200
      }
      mockAxios.mockResponse(responseObj)

      //Click previous button
      let previousBtn = wrapper.find('.stepBtn_container').find('button').at(0)
      previousBtn.simulate('click')
      expect(wrapper.find('Review').state().steps.currentStep).toEqual(4)
      expect(wrapper.find('Review').state().currentReviewStatus).toEqual(5)
      expect(wrapper.find('Review').state().currentReviewFeedback).toEqual('IMEI Registration Section')

      //Click previous button
      previousBtn = wrapper.find('.stepBtn_container').find('button').at(0)
      previousBtn.simulate('click')
      expect(wrapper.find('Review').state().steps.currentStep).toEqual(3)
      expect(wrapper.find('Review').state().currentReviewStatus).toEqual(6)
      expect(wrapper.find('Review').state().currentReviewFeedback).toEqual('IMEI Classification Section')

      //Click previous button
      previousBtn = wrapper.find('.stepBtn_container').find('button').at(0)
      previousBtn.simulate('click')
      expect(wrapper.find('Review').state().steps.currentStep).toEqual(2)
      expect(wrapper.find('Review').state().currentReviewStatus).toEqual(5)
      expect(wrapper.find('Review').state().currentReviewFeedback).toEqual('Device Description Section')

      //Click previous button
      previousBtn = wrapper.find('.stepBtn_container').find('button').at(0)
      previousBtn.simulate('click')
      expect(wrapper.find('Review').state().steps.currentStep).toEqual(1)
      expect(wrapper.find('Review').state().currentReviewStatus).toEqual(6)
      expect(wrapper.find('Review').state().currentReviewFeedback).toEqual('Device Quota Section')
    })
    test('if next button render step correctly with data', () => {
      const wrapper = mount(
        <I18nextProvider i18n={i18n}>
          <Review kc={mockKcProps}  {...mockMatchParams}/>
        </I18nextProvider>
      )
      //Setting API data
      wrapper.find('Review').setState({
        assigned: true,
        assignedTo: 'test user',
        steps: {
          currentStep: 5,
          step1: {
            data: {},
            apiData: mockStep1APIdata
          },
          step2: {
            data: {},
            apiData: mockStep2APIdata
          },
          step3: {
            data: {},
            apiData: mockStep3APIdata
          },
          step4: {
            data: {},
            apiData: mockStep4APIdata
          },
          step5: {
            data: {},
            apiData: mockStep5APIdata
          }
        }
      })

      let responseObj = {
        data: {
          "sections": [
            {
              "section_status": 6,
              "comments": mockStep1Comments,
              "section_type": "device_quota"
            },
            {
              "section_status": 5,
              "comments": mockStep2Comments,
              "section_type": "device_description"
            },
            {
              "section_status": 6,
              "comments": mockStep3Comments,
              "section_type": "imei_classification"
            },
            {
              "section_status": 5,
              "comments": mockStep4Comments,
              "section_type": "imei_registration"
            },
            {
              "section_status": 6,
              "comments": mockStep5Comments,
              "section_type": "approval_documents"
            }
          ]
        },
        status: 200
      }
      mockAxios.mockResponse(responseObj)

      //Click previous button
      let previousBtn = wrapper.find('.stepBtn_container').find('button').at(0)
      previousBtn.simulate('click')
      expect(wrapper.find('Review').state().steps.currentStep).toEqual(4)
      expect(wrapper.find('Review').state().currentReviewStatus).toEqual(5)
      expect(wrapper.find('Review').state().currentReviewFeedback).toEqual('IMEI Registration Section')

      //Click previous button
      previousBtn = wrapper.find('.stepBtn_container').find('button').at(0)
      previousBtn.simulate('click')
      expect(wrapper.find('Review').state().steps.currentStep).toEqual(3)
      expect(wrapper.find('Review').state().currentReviewStatus).toEqual(6)
      expect(wrapper.find('Review').state().currentReviewFeedback).toEqual('IMEI Classification Section')

      //Click previous button
      previousBtn = wrapper.find('.stepBtn_container').find('button').at(0)
      previousBtn.simulate('click')
      expect(wrapper.find('Review').state().steps.currentStep).toEqual(2)
      expect(wrapper.find('Review').state().currentReviewStatus).toEqual(5)
      expect(wrapper.find('Review').state().currentReviewFeedback).toEqual('Device Description Section')

      //Click previous button
      previousBtn = wrapper.find('.stepBtn_container').find('button').at(0)
      previousBtn.simulate('click')
      expect(wrapper.find('Review').state().steps.currentStep).toEqual(1)
      expect(wrapper.find('Review').state().currentReviewStatus).toEqual(6)
      expect(wrapper.find('Review').state().currentReviewFeedback).toEqual('Device Quota Section')

      //Click Next button
      let nextBtn = wrapper.find('.stepBtn_container').find('button').last()
      nextBtn.simulate('click')
      expect(wrapper.find('Review').state().steps.currentStep).toEqual(2)
      expect(wrapper.find('Review').state().currentReviewStatus).toEqual(5)
      expect(wrapper.find('Review').state().currentReviewFeedback).toEqual('Device Description Section')

      //Click Next button
      nextBtn = wrapper.find('.stepBtn_container').find('button').last()
      nextBtn.simulate('click')
      expect(wrapper.find('Review').state().steps.currentStep).toEqual(3)
      expect(wrapper.find('Review').state().currentReviewStatus).toEqual(6)
      expect(wrapper.find('Review').state().currentReviewFeedback).toEqual('IMEI Classification Section')

      //Click Next button
      nextBtn = wrapper.find('.stepBtn_container').find('button').last()
      nextBtn.simulate('click')
      expect(wrapper.find('Review').state().steps.currentStep).toEqual(4)
      expect(wrapper.find('Review').state().currentReviewStatus).toEqual(5)
      expect(wrapper.find('Review').state().currentReviewFeedback).toEqual('IMEI Registration Section')

      //Click Next button
      nextBtn = wrapper.find('.stepBtn_container').find('button').last()
      nextBtn.simulate('click')
      expect(wrapper.find('Review').state().steps.currentStep).toEqual(5)
      expect(wrapper.find('Review').state().currentReviewStatus).toEqual(6)
      expect(wrapper.find('Review').state().currentReviewFeedback).toEqual('Approval Documents Section')

    })

    //Navigating and Updating steps
    test('if updating status and comments loads step data from state', () => {
      let fakeResponse = {
        data: {},
        status: 404
      }
      const spy = Sinon.spy()
      const historyMock = {push: spy};
      const wrapper = mount(
        <I18nextProvider i18n={i18n}>
          <Review kc={mockKcProps} {...mockMatchParams} history={historyMock}>
          </Review>
        </I18nextProvider>
      )
      wrapper.find('Review').setState({
        stepReady: true,
        assigned: true,
        assignedTo: 'test user',
        steps: {
          currentStep: 1,
          step1: {
            data: {},
            apiData: mockStep1APIdata
          },
          step2: {
            data: {},
            apiData: mockStep2APIdata
          },
          step3: {
            data: {},
            apiData: mockStep3APIdata
          },
          step4: {
            data: {},
            apiData: mockStep4APIdata
          },
          step5: {
            data: {},
            apiData: mockStep5APIdata
          }
        }
      })
      wrapper.update()
      //Set initial Sections data
      let responseObj = {
        data: {
          "sections": [
            {
              "section_status": 5,
              "comments": mockStep1Comments,
              "section_type": "device_quota"
            },
            {
              "section_status": 6,
              "comments": mockStep2Comments,
              "section_type": "device_description"
            },
            {
              "section_status": 5,
              "comments": mockStep3Comments,
              "section_type": "imei_classification"
            },
            {
              "section_status": 6,
              "comments": mockStep4Comments,
              "section_type": "imei_registration"
            },
            {
              "section_status": 5,
              "comments": mockStep5Comments,
              "section_type": "approval_documents"
            }
          ]
        },
        status: 200
      }

      mockAxios.mockResponse(responseObj)
      mockAxios.mockResponse(fakeResponse)
      mockAxios.mockResponse(fakeResponse)
      mockAxios.mockResponse(fakeResponse)
      wrapper.update()
      // console.log(wrapper.find('Review').state())

      //Step1 form
      wrapper.find('Field').last().find('textarea').simulate('change', {
        target: {
          name: "reviewFeedback",
          value: "An example comment in step1"
        }
      })
      wrapper.find('Field').first().find('select').simulate('change', {
        target: {
          name: "reviewStatus",
          value: "6"
        }
      })
      wrapper.find('Form').simulate('submit')

      //Step1 submit to API
      responseObj = {
        data: {
          message: 'iam message'
        },
        status: 201
      }
      mockAxios.mockResponse(fakeResponse)
      mockAxios.mockResponse(fakeResponse)
      mockAxios.mockResponse(fakeResponse)
      mockAxios.mockResponse(responseObj)
      wrapper.update()
      expect(wrapper.find('Review').state().steps.step1.apiData).toEqual(mockStep1APIdata)
      expect(wrapper.find('Review').state().steps.currentStep).toEqual(2)
      expect(wrapper.find('Review').state().steps.step1.reviewFeedback).toEqual('An example comment in step1')
      expect(wrapper.find('Review').state().steps.step1.reviewStatus).toEqual(6)
      // console.log(wrapper.find('Review').state())

      //Step2 form
      wrapper.find('Field').last().find('textarea').simulate('change', {
        target: {
          name: "reviewFeedback",
          value: "An example comment in step2"
        }
      })
      wrapper.find('Field').first().find('select').simulate('change', {
        target: {
          name: "reviewStatus",
          value: "6"
        }
      })
      wrapper.update()
      wrapper.find('Form').simulate('submit')
      //Step2 submit to API
      mockAxios.mockResponse(responseObj)
      wrapper.update()
      expect(wrapper.find('Review').state().steps.step2.apiData).toEqual(mockStep2APIdata)
      expect(wrapper.find('Review').state().steps.currentStep).toEqual(3)
      expect(wrapper.find('Review').state().steps.step2.reviewFeedback).toEqual('An example comment in step2')
      expect(wrapper.find('Review').state().steps.step2.reviewStatus).toEqual(6)

      //Step3 form
      wrapper.find('Field').last().find('textarea').simulate('change', {
        target: {
          name: "reviewFeedback",
          value: "An example comment in step3"
        }
      })
      wrapper.find('Field').first().find('select').simulate('change', {
        target: {
          name: "reviewStatus",
          value: "6"
        }
      })
      wrapper.update()
      wrapper.find('Form').simulate('submit')
      mockAxios.mockResponse(responseObj)
      // console.log(wrapper.find('Review').state())

      wrapper.update()
      expect(wrapper.find('Review').state().steps.step3.apiData).toEqual(mockStep3APIdata)
      expect(wrapper.find('Review').state().steps.currentStep).toEqual(4)
      expect(wrapper.find('Review').state().steps.step3.reviewFeedback).toEqual('An example comment in step3')
      expect(wrapper.find('Review').state().steps.step3.reviewStatus).toEqual(6)

      //Step4 form
      wrapper.find('Field').last().find('textarea').simulate('change', {
        target: {
          name: "reviewFeedback",
          value: "An example comment in step4"
        }
      })
      wrapper.find('Field').first().find('select').simulate('change', {
        target: {
          name: "reviewStatus",
          value: "6"
        }
      })
      wrapper.update()
      wrapper.find('Form').simulate('submit')
      //Step4 submit to API
      mockAxios.mockResponse(responseObj)

      wrapper.update()
      expect(wrapper.find('Review').state().steps.step4.apiData).toEqual(mockStep4APIdata)
      expect(wrapper.find('Review').state().steps.currentStep).toEqual(5)
      expect(wrapper.find('Review').state().steps.step4.reviewFeedback).toEqual('An example comment in step4')
      expect(wrapper.find('Review').state().steps.step4.reviewStatus).toEqual(6)

      //Step5 form
      wrapper.find('Field').last().find('textarea').simulate('change', {
        target: {
          name: "reviewFeedback",
          value: "An example comment in step5"
        }
      })
      wrapper.find('Field').first().find('select').simulate('change', {
        target: {
          name: "reviewStatus",
          value: "6"
        }
      })
      wrapper.update()
      wrapper.find('Form').simulate('submit')

      //Submit Review
      mockAxios.mockResponse(responseObj)
      wrapper.update()

      expect(wrapper.find('Review').state().steps.step5.reviewFeedback).toEqual('An example comment in step5')
      expect(wrapper.find('Review').state().steps.step5.reviewStatus).toEqual(6)
    })

    //Navigating with Error from API call
    test('if step1 with API error handle correctly', () => {

    })

    //Error Handling
    test('if step1 API call fails, correct step and data is loaded', () => {
      const spy = Sinon.spy()
      const historyMock = {push: spy};
      const wrapper = mount(
        <I18nextProvider i18n={i18n}>
          <Review kc={mockKcProps} {...mockMatchParams} history={historyMock}>
          </Review>
        </I18nextProvider>
      )
      wrapper.find('Review').setState({
        stepReady: true
      })
      wrapper.update()
      //Set initial Sections data
      let responseObj = {
        data: {
          "sections": [
            {
              "section_status": null,
              "comments": [],
              "section_type": "device_quota"
            },
            {
              "section_status": null,
              "comments": [],
              "section_type": "device_description"
            },
            {
              "section_status": null,
              "comments": [],
              "section_type": "imei_classification"
            },
            {
              "section_status": null,
              "comments": [],
              "section_type": "imei_registration"
            },
            {
              "section_status": null,
              "comments": [],
              "section_type": "approval_documents"
            }
          ]
        },
        status: 200
      }
      let errorResponse = {
        data: {},
        response: {
          status: 400,
          data: {
            message: 'iam message',
            error : []
          }
        },
        status: 200
      }
      mockAxios.mockResponse(responseObj)
      mockAxios.mockResponse(fakeResponse)
      mockAxios.mockError(errorResponse)
      expect(wrapper.find('Review').state().steps.currentStep).toEqual(1)
      expect(wrapper.find('Review').state().stepReady).toBe(true)
      expect(wrapper.find('Review').state().currentReviewStatus).toEqual('')
      expect(wrapper.find('Review').state().currentReviewFeedback).toEqual('')
    })
    test('if step2 API call fails, correct step and data is loaded', () => {
      const spy = Sinon.spy()
      const historyMock = {push: spy};
      const wrapper = mount(
        <I18nextProvider i18n={i18n}>
          <Review kc={mockKcProps} {...mockMatchParams} history={historyMock}>
          </Review>
        </I18nextProvider>
      )
      wrapper.find('Review').setState({
        stepReady: true
      })
      wrapper.update()
      //Set initial Sections data
      let responseObj = {
        data: {
          "sections": [
            {
              "section_status": 6,
              "comments": mockStep1Comments,
              "section_type": "device_quota"
            },
            {
              "section_status": null,
              "comments": [],
              "section_type": "device_description"
            },
            {
              "section_status": null,
              "comments": [],
              "section_type": "imei_classification"
            },
            {
              "section_status": null,
              "comments": [],
              "section_type": "imei_registration"
            },
            {
              "section_status": null,
              "comments": [],
              "section_type": "approval_documents"
            }
          ]
        },
        status: 200
      }
      let errorResponse = {
        data: {},
        response: {
          status: 401,
          data: {
            message: 'iam message'
          }
        },
        status: 200
      }
      let getStep1DataResponse = {
        data: mockStep1APIdata,
        status: 200
      }
      mockAxios.mockResponse(responseObj)
      mockAxios.mockResponse(getStep1DataResponse)
      mockAxios.mockError(errorResponse)

      expect(wrapper.find('Review').state().steps.currentStep).toEqual(1)
      expect(wrapper.find('Review').state().stepReady).toBe(true)
      expect(wrapper.find('Review').state().currentReviewStatus).toEqual(6)
      expect(wrapper.find('Review').state().currentReviewFeedback).toEqual('Device Quota Section')
    })
    test('if step3 API call fails,  correct step and data is loaded', () => {
      const spy = Sinon.spy()
      const historyMock = {push: spy};
      const wrapper = mount(
        <I18nextProvider i18n={i18n}>
          <Review kc={mockKcProps} {...mockMatchParams} history={historyMock}>
          </Review>
        </I18nextProvider>
      )
      wrapper.find('Review').setState({
        stepReady: true
      })
      wrapper.update()
      //Set initial Sections data
      let responseObj = {
        data: {
          "sections": [
            {
              "section_status": 6,
              "comments": mockStep1Comments,
              "section_type": "device_quota"
            },
            {
              "section_status": 5,
              "comments": mockStep2Comments,
              "section_type": "device_description"
            },
            {
              "section_status": null,
              "comments": [],
              "section_type": "imei_classification"
            },
            {
              "section_status": null,
              "comments": [],
              "section_type": "imei_registration"
            },
            {
              "section_status": null,
              "comments": [],
              "section_type": "approval_documents"
            }
          ]
        },
        status: 200
      }
      let errorResponse = {
        data: {},
        response: {
          status: 403,
          data: {
            message: 'iam message'
          }
        },
        status: 200
      }
      let getStep1DataResponse = {
        data: mockStep1APIdata,
        status: 200
      }
      let getStep2DataResponse = {
        data: mockStep1APIdata,
        status: 200
      }
      mockAxios.mockResponse(responseObj)
      mockAxios.mockResponse(getStep1DataResponse)
      mockAxios.mockResponse(getStep2DataResponse)
      mockAxios.mockError(errorResponse)
// console.log(wrapper.find('Review').state())
      // expect(wrapper.find('Review').state().steps.step2.apiData).toEqual(mockStep2APIdata)
      expect(wrapper.find('Review').state().steps.currentStep).toEqual(2)
      expect(wrapper.find('Review').state().stepReady).toBe(true)
      expect(wrapper.find('Review').state().currentReviewStatus).toEqual(5)
      expect(wrapper.find('Review').state().currentReviewFeedback).toEqual('Device Description Section')
    })
    test('if step4 API call fails,  correct step and data is loaded', () => {
      const spy = Sinon.spy()
      const historyMock = {push: spy};
      const wrapper = mount(
        <I18nextProvider i18n={i18n}>
          <Review kc={mockKcProps} {...mockMatchParams} history={historyMock}>
          </Review>
        </I18nextProvider>
      )
      wrapper.find('Review').setState({
        stepReady: true
      })
      wrapper.update()
      //Set initial Sections data
      let responseObj = {
        data: {
          "sections": [
            {
              "section_status": 6,
              "comments": mockStep1Comments,
              "section_type": "device_quota"
            },
            {
              "section_status": 5,
              "comments": mockStep2Comments,
              "section_type": "device_description"
            },
            {
              "section_status": 6,
              "comments": mockStep3Comments,
              "section_type": "imei_classification"
            },
            {
              "section_status": null,
              "comments": [],
              "section_type": "imei_registration"
            },
            {
              "section_status": null,
              "comments": [],
              "section_type": "approval_documents"
            }
          ]
        },
        status: 200
      }
      let errorResponse = {
        data: {},
        response: {
          status: 404,
          data: {
            message: 'iam message'
          }
        },
        status: 200
      }
      let getStep1DataResponse = {
        data: mockStep1APIdata,
        status: 200
      }
      let getStep2DataResponse = {
        data: mockStep2APIdata,
        status: 200
      }
      let getStep3DataResponse = {
        data: mockStep3APIdata,
        status: 200
      }
      mockAxios.mockResponse(responseObj)
      mockAxios.mockResponse(fakeResponse)
      mockAxios.mockResponse(getStep1DataResponse)
      mockAxios.mockResponse(getStep2DataResponse)
      mockAxios.mockResponse(getStep3DataResponse)
      mockAxios.mockError(errorResponse)

      expect(wrapper.find('Review').state().steps.currentStep).toEqual(3)
      expect(wrapper.find('Review').state().stepReady).toBe(true)
      expect(wrapper.find('Review').state().currentReviewStatus).toEqual(6)
      expect(wrapper.find('Review').state().currentReviewFeedback).toEqual('IMEI Classification Section')
    })
    test('if step5 API call fails,  correct step and data is loaded', () => {
      const spy = Sinon.spy()
      const historyMock = {push: spy};
      const wrapper = mount(
        <I18nextProvider i18n={i18n}>
          <Review kc={mockKcProps} {...mockMatchParams} history={historyMock}>
          </Review>
        </I18nextProvider>
      )
      wrapper.find('Review').setState({
        stepReady: true
      })
      wrapper.update()
      //Set initial Sections data
      let responseObj = {
        data: {
          "sections": [
            {
              "section_status": 6,
              "comments": mockStep1Comments,
              "section_type": "device_quota"
            },
            {
              "section_status": 5,
              "comments": mockStep2Comments,
              "section_type": "device_description"
            },
            {
              "section_status": 6,
              "comments": mockStep3Comments,
              "section_type": "imei_classification"
            },
            {
              "section_status": 5,
              "comments": mockStep4Comments,
              "section_type": "imei_registration"
            },
            {
              "section_status": null,
              "comments": [],
              "section_type": "approval_documents"
            }
          ]
        },
        status: 200
      }
      let errorResponse = {
        data: {},
        response: {
          status: 405,
          data: {
            message: 'iam message'
          }
        },
        status: 200
      }
      let getStep1DataResponse = {
        data: mockStep1APIdata,
        status: 200
      }
      let getStep2DataResponse = {
        data: mockStep2APIdata,
        status: 200
      }
      let getStep3DataResponse = {
        data: mockStep3APIdata,
        status: 200
      }
      let getStep4DataResponse = {
        data: mockStep4APIdata,
        status: 200
      }
      mockAxios.mockResponse(responseObj)
      mockAxios.mockResponse(fakeResponse)
      mockAxios.mockResponse(getStep1DataResponse)
      mockAxios.mockResponse(getStep2DataResponse)
      mockAxios.mockResponse(getStep3DataResponse)
      mockAxios.mockResponse(getStep4DataResponse)
      mockAxios.mockError(errorResponse)

      expect(wrapper.find('Review').state().steps.currentStep).toEqual(4)
      expect(wrapper.find('Review').state().stepReady).toBe(true)
      expect(wrapper.find('Review').state().currentReviewStatus).toEqual(5)
      expect(wrapper.find('Review').state().currentReviewFeedback).toEqual('IMEI Registration Section')
    })
    test('if Step6 (when all step data exist) fails', () => {
      const spy = Sinon.spy()
      const historyMock = {push: spy};
      const wrapper = mount(
        <I18nextProvider i18n={i18n}>
          <Review kc={mockKcProps} {...mockMatchParams} history={historyMock}>
          </Review>
        </I18nextProvider>
      )
      wrapper.find('Review').setState({
        stepReady: true
      })
      wrapper.update()
      //Set initial Sections data
      let responseObj = {
        data: {
          "sections": [
            {
              "section_status": 6,
              "comments": mockStep1Comments,
              "section_type": "device_quota"
            },
            {
              "section_status": 5,
              "comments": mockStep2Comments,
              "section_type": "device_description"
            },
            {
              "section_status": 6,
              "comments": mockStep3Comments,
              "section_type": "imei_classification"
            },
            {
              "section_status": 5,
              "comments": mockStep4Comments,
              "section_type": "imei_registration"
            },
            {
              "section_status": 6,
              "comments": mockStep5Comments,
              "section_type": "approval_documents"
            }
          ]
        },
        status: 200
      }
      let errorResponse = {
        data: {},
        response: {
          status: 406,
          data: {
            message: 'iam message'
          }
        },
        status: 200
      }
      let getStep1DataResponse = {
        data: mockStep1APIdata,
        status: 200
      }
      let getStep2DataResponse = {
        data: mockStep2APIdata,
        status: 200
      }
      let getStep3DataResponse = {
        data: mockStep3APIdata,
        status: 200
      }
      let getStep4DataResponse = {
        data: mockStep4APIdata,
        status: 200
      }
      let getStep5DataResponse = {
        data: mockStep5APIdata,
        status: 200
      }
      mockAxios.mockResponse(responseObj)
      mockAxios.mockResponse(getStep1DataResponse)
      mockAxios.mockResponse(getStep2DataResponse)
      mockAxios.mockResponse(getStep3DataResponse)
      mockAxios.mockResponse(getStep4DataResponse)
      mockAxios.mockResponse(getStep5DataResponse)
      mockAxios.mockError(errorResponse)

      expect(wrapper.find('Review').state().steps.currentStep).toEqual(5)
      expect(wrapper.find('Review').state().stepReady).toBe(true)
      expect(wrapper.find('Review').state().currentReviewStatus).toEqual(6)
      expect(wrapper.find('Review').state().currentReviewFeedback).toEqual('Approval Documents Section')
    })
  })
  describe("De-Registration Review", () => {
    const mockMatchParams = {
      match: {
        params: {
          id: 2,
          type: 'deregistration'
        }
      }
    }
    afterEach(() => {
      mockAxios.reset();
    })
    test('if renders correctly', () => {
      const wrapper = shallow(
        <Review {...mockMatchParams}/>);
      expect(wrapper).toMatchSnapshot()
    })
    test('if renders correctly again', () => {
      const wrapper = render(
        <I18nextProvider i18n={i18n}>
          <Review {...mockMatchParams}/>
        </I18nextProvider>
      )
      expect(wrapper).toMatchSnapshot()
    });
    test('if componentDidMount renders state correctly', () => {
      const wrapper = mount(
        <I18nextProvider i18n={i18n}>
          <Review kc={mockKcProps}  {...mockMatchParams}/>
        </I18nextProvider>
      )
      let state = wrapper.find('Review').state()
      expect(state.viewType).toEqual('deregistration')
      expect(state.requestId).toEqual(2)
      wrapper.find('Review').instance().getSectionsData = Sinon.spy()
      wrapper.update();
      wrapper.find('Review').instance().getSectionsData({
        "headers": {
          "Authorization": "Bearer null",
          "Content-Type": "application/json"
        }
      })
      const mockStep2Comments = [{
        "user_id": "81e53d7a-4483-407c-b9f7-1ebd9fe05ac6",
        "user_name": "drs auth user",
        "comment": "Device Description Section",
        "datetime": "2018-11-22T07:18:05.658390+00:00"
      }]
      const mockStep3Comments = [{
        "user_id": "81e53d7a-4483-407c-b9f7-1ebd9fe05ac6",
        "user_name": "drs auth user",
        "comment": "IMEI Classification Section",
        "datetime": "2018-11-22T07:18:05.658390+00:00"
      }]
      const mockStep4Comments = [{
        "user_id": "81e53d7a-4483-407c-b9f7-1ebd9fe05ac6",
        "user_name": "drs auth user",
        "comment": "IMEI Registration Section",
        "datetime": "2018-11-22T07:18:05.658390+00:00"
      }]
      const mockStep5Comments = [{
        "user_id": "81e53d7a-4483-407c-b9f7-1ebd9fe05ac6",
        "user_name": "drs auth user",
        "comment": "Approval Documents Section",
        "datetime": "2018-11-22T07:18:05.658390+00:00"
      }]
      let responseObj = {
        data: {
          "sections": [
            {
              "section_status": 6,
              "comments": mockStep2Comments,
              "section_type": "device_description"
            },
            {
              "section_status": 6,
              "comments": mockStep3Comments,
              "section_type": "imei_classification"
            },
            {
              "section_status": 6,
              "comments": mockStep4Comments,
              "section_type": "imei_registration"
            },
            {
              "section_status": 6,
              "comments": mockStep5Comments,
              "section_type": "approval_documents"
            }
          ]
        },
        status: 200
      }
      mockAxios.mockResponse(responseObj)
      expect(wrapper.find('Review').state().steps.step2.comments).toEqual(mockStep2Comments)
      expect(wrapper.find('Review').state().steps.step3.comments).toEqual(mockStep3Comments)
      expect(wrapper.find('Review').state().steps.step4.comments).toEqual(mockStep4Comments)
      expect(wrapper.find('Review').state().steps.step5.comments).toEqual(mockStep5Comments)
      wrapper.update()
      wrapper.find('Review').instance().checkReviewer = Sinon.spy()
      wrapper.update();

      //Check Reviewer
      wrapper.find('Review').instance().checkReviewer({
        "headers": {
          "Authorization": "Bearer null",
          "Content-Type": "application/json"
        }
      })
      responseObj = {
        data: {
          "report_status_label": "Processed",
          "imeis": [["5555555555555555"]],
          "reviewer_name": "drs auth user",
          "duplicate_imeis_file": null,
          "m_location": "local",
          "device_count": 1,
          "processing_status_label": "Processed",
          "user_id": "6ed9747b-d36a-4799-88c8-59d17a9abb5a",
          "report": "compliant_reportc55c5595-1f8f-4801-869a-4f4993f84390.tsv",
          "tracking_id": "921381ca-b60d-4be5-a3b9-8503d1ca8022",
          "updated_at": "2018-12-06T05:57:52.296226+00:00",
          "user_name": "drs importer user",
          "reviewer_id": "81e53d7a-4483-407c-b9f7-1ebd9fe05ac6",
          "created_at": "2018-11-30T10:24:53.724787+00:00",
          "imei_per_device": 1,
          "file": null,
          "status_label": "In Review",
          "id": 8434
        },
        status: 200
      }
      mockAxios.mockResponse(responseObj)
      expect(wrapper.find('Review').state().assigned).toBe(true)
      expect(wrapper.find('Review').state().assignedTo).toEqual('drs auth user')
      expect(wrapper.find('Review').state().requestStatus).toEqual('In Review')
    })
    test('if review skips to step where its left', () => {
      const wrapper = mount(
        <I18nextProvider i18n={i18n}>
          <Review kc={mockKcProps}  {...mockMatchParams}/>
        </I18nextProvider>
      )
      let state = wrapper.find('Review').state()
      expect(state.viewType).toEqual('deregistration')
      expect(state.requestId).toEqual(2)
      wrapper.find('Review').instance().getSectionsData = Sinon.spy()
      wrapper.update();
      wrapper.find('Review').instance().getSectionsData({
        "headers": {
          "Authorization": "Bearer null",
          "Content-Type": "application/json"
        }
      })
      const mockStep2Comments = [{
        "user_id": "81e53d7a-4483-407c-b9f7-1ebd9fe05ac6",
        "user_name": "drs auth user",
        "comment": "Device Description Section",
        "datetime": "2018-11-22T07:18:05.658390+00:00"
      }]
      let responseObj = {
        data: {
          "sections": [
            {
              "section_status": 6,
              "comments": mockStep2Comments,
              "section_type": "device_description"
            },
            {
              "section_status": null,
              "comments": [],
              "section_type": "imei_classification"
            },
            {
              "section_status": null,
              "comments": [],
              "section_type": "imei_registration"
            },
            {
              "section_status": null,
              "comments": [],
              "section_type": "approval_documents"
            }
          ]
        },
        status: 200
      }
      mockAxios.mockResponse(responseObj)

      responseObj = {
        data: mockStep3APIdata,
        status: 200
      }
      mockAxios.mockResponse(responseObj)
      expect(wrapper.find('Review').state().steps.step2.comments).toEqual(mockStep2Comments)
    })
    test('if previous button render step correctly with data', () => {
      const wrapper = mount(
        <I18nextProvider i18n={i18n}>
          <Review kc={mockKcProps}  {...mockMatchParams}/>
        </I18nextProvider>
      )
      //Setting API data
      wrapper.find('Review').setState({
        assigned: true,
        assignedTo: 'test user',
        steps: {
          currentStep: 5,
          step1: {
            data: {},
            apiData: {}
          },
          step2: {
            data: {},
            apiData: mockStep2APIdata
          },
          step3: {
            data: {},
            apiData: mockStep3APIdata
          },
          step4: {
            data: {},
            apiData: mockStep4APIdata
          },
          step5: {
            data: {},
            apiData: mockStep5APIdata
          }
        }
      })

      let responseObj = {
        data: {
          "sections": [
            {
              "section_status": 5,
              "comments": mockStep2Comments,
              "section_type": "device_description"
            },
            {
              "section_status": 6,
              "comments": mockStep3Comments,
              "section_type": "imei_classification"
            },
            {
              "section_status": 5,
              "comments": mockStep4Comments,
              "section_type": "imei_registration"
            },
            {
              "section_status": 6,
              "comments": mockStep5Comments,
              "section_type": "approval_documents"
            }
          ]
        },
        status: 200
      }
      mockAxios.mockResponse(responseObj)

      //Click previous button
      let previousBtn = wrapper.find('.stepBtn_container').find('button').at(0)
      previousBtn.simulate('click')
      expect(wrapper.find('Review').state().steps.currentStep).toEqual(4)
      expect(wrapper.find('Review').state().currentReviewStatus).toEqual(5)
      expect(wrapper.find('Review').state().currentReviewFeedback).toEqual('IMEI Registration Section')

      //Click previous button
      previousBtn = wrapper.find('.stepBtn_container').find('button').at(0)
      previousBtn.simulate('click')
      expect(wrapper.find('Review').state().steps.currentStep).toEqual(3)
      expect(wrapper.find('Review').state().currentReviewStatus).toEqual(6)
      expect(wrapper.find('Review').state().currentReviewFeedback).toEqual('IMEI Classification Section')

      //Click previous button
      previousBtn = wrapper.find('.stepBtn_container').find('button').at(0)
      previousBtn.simulate('click')
      expect(wrapper.find('Review').state().steps.currentStep).toEqual(2)
      expect(wrapper.find('Review').state().currentReviewStatus).toEqual(5)
      expect(wrapper.find('Review').state().currentReviewFeedback).toEqual('Device Description Section')
    })
    test('if next button render step correctly with data', () => {
      const wrapper = mount(
        <I18nextProvider i18n={i18n}>
          <Review kc={mockKcProps}  {...mockMatchParams}/>
        </I18nextProvider>
      )
      //Setting API data
      wrapper.find('Review').setState({
        assigned: true,
        assignedTo: 'test user',
        steps: {
          currentStep: 5,
          step1: {
            data: {},
            apiData: mockStep1APIdata
          },
          step2: {
            data: {},
            apiData: mockStep2APIdata
          },
          step3: {
            data: {},
            apiData: mockStep3APIdata
          },
          step4: {
            data: {},
            apiData: mockStep4APIdata
          },
          step5: {
            data: {},
            apiData: mockStep5APIdata
          }
        }
      })

      let responseObj = {
        data: {
          "sections": [
            {
              "section_status": 6,
              "comments": mockStep1Comments,
              "section_type": "device_quota"
            },
            {
              "section_status": 5,
              "comments": mockStep2Comments,
              "section_type": "device_description"
            },
            {
              "section_status": 6,
              "comments": mockStep3Comments,
              "section_type": "imei_classification"
            },
            {
              "section_status": 5,
              "comments": mockStep4Comments,
              "section_type": "imei_registration"
            },
            {
              "section_status": 6,
              "comments": mockStep5Comments,
              "section_type": "approval_documents"
            }
          ]
        },
        status: 200
      }
      mockAxios.mockResponse(responseObj)


      //Click previous button
      let previousBtn = wrapper.find('.stepBtn_container').find('button').at(0)
      previousBtn.simulate('click')
      expect(wrapper.find('Review').state().steps.currentStep).toEqual(4)
      expect(wrapper.find('Review').state().currentReviewStatus).toEqual(5)
      expect(wrapper.find('Review').state().currentReviewFeedback).toEqual('IMEI Registration Section')

      //Click previous button
      previousBtn = wrapper.find('.stepBtn_container').find('button').at(0)
      previousBtn.simulate('click')
      expect(wrapper.find('Review').state().steps.currentStep).toEqual(3)
      expect(wrapper.find('Review').state().currentReviewStatus).toEqual(6)
      expect(wrapper.find('Review').state().currentReviewFeedback).toEqual('IMEI Classification Section')

      //Click previous button
      previousBtn = wrapper.find('.stepBtn_container').find('button').at(0)
      previousBtn.simulate('click')
      expect(wrapper.find('Review').state().steps.currentStep).toEqual(2)
      expect(wrapper.find('Review').state().currentReviewStatus).toEqual(5)
      expect(wrapper.find('Review').state().currentReviewFeedback).toEqual('Device Description Section')

      //Click Next button
      let nextBtn = wrapper.find('.stepBtn_container').find('button').last()
      nextBtn.simulate('click')
      expect(wrapper.find('Review').state().steps.currentStep).toEqual(3)
      expect(wrapper.find('Review').state().currentReviewStatus).toEqual(6)
      expect(wrapper.find('Review').state().currentReviewFeedback).toEqual('IMEI Classification Section')

      //Click Next button
      nextBtn = wrapper.find('.stepBtn_container').find('button').last()
      nextBtn.simulate('click')
      expect(wrapper.find('Review').state().steps.currentStep).toEqual(4)
      expect(wrapper.find('Review').state().currentReviewStatus).toEqual(5)
      expect(wrapper.find('Review').state().currentReviewFeedback).toEqual('IMEI Registration Section')

      //Click Next button
      nextBtn = wrapper.find('.stepBtn_container').find('button').last()
      nextBtn.simulate('click')
      expect(wrapper.find('Review').state().steps.currentStep).toEqual(5)
      expect(wrapper.find('Review').state().currentReviewStatus).toEqual(6)
      expect(wrapper.find('Review').state().currentReviewFeedback).toEqual('Approval Documents Section')

    })

    //Navigating and Updating steps
    test('if updating status and comments loads step data from state', () => {
      let fakeResponse = {
        data: {},
        status: 404
      }
      const spy = Sinon.spy()
      const historyMock = {push: spy};
      const wrapper = mount(
        <I18nextProvider i18n={i18n}>
          <Review kc={mockKcProps} {...mockMatchParams} history={historyMock}>
          </Review>
        </I18nextProvider>
      )
      wrapper.find('Review').setState({
        stepReady: true,
        assigned: true,
        assignedTo: 'test user',
        steps: {
          currentStep: 2,
          step1: {
            data: {},
            apiData: null
          },
          step2: {
            data: {},
            apiData: mockStep2APIdata
          },
          step3: {
            data: {},
            apiData: mockStep3APIdata
          },
          step4: {
            data: {},
            apiData: mockStep4APIdata
          },
          step5: {
            data: {},
            apiData: mockStep5APIdata
          }
        }
      })
      wrapper.update()
      //Set initial Sections data
      let responseObj = {
        data: {
          "sections": [
            {
              "section_status": 6,
              "comments": mockStep2Comments,
              "section_type": "device_description"
            },
            {
              "section_status": 5,
              "comments": mockStep3Comments,
              "section_type": "imei_classification"
            },
            {
              "section_status": 6,
              "comments": mockStep4Comments,
              "section_type": "imei_registration"
            },
            {
              "section_status": 5,
              "comments": mockStep5Comments,
              "section_type": "approval_documents"
            }
          ]
        },
        status: 200
      }

      mockAxios.mockResponse(responseObj)
      mockAxios.mockResponse(fakeResponse)
      mockAxios.mockResponse(fakeResponse)
      mockAxios.mockResponse(fakeResponse)
      wrapper.update()
      // console.log(wrapper.find('Review').state())
      //Step1 form
      wrapper.find('Field').last().find('textarea').simulate('change', {
        target: {
          name: "reviewFeedback",
          value: "An example comment in step2"
        }
      })
      wrapper.find('Field').first().find('select').simulate('change', {
        target: {
          name: "reviewStatus",
          value: "6"
        }
      })
      wrapper.find('Form').simulate('submit')

      //Step1 submit to API
      responseObj = {
        data: {
          message: 'iam message'
        },
        status: 201
      }
      mockAxios.mockResponse(fakeResponse)
      mockAxios.mockResponse(fakeResponse)
      mockAxios.mockResponse(responseObj)
      wrapper.update()
      expect(wrapper.find('Review').state().steps.step3.apiData).toEqual(mockStep3APIdata)
      expect(wrapper.find('Review').state().steps.currentStep).toEqual(3)
      expect(wrapper.find('Review').state().steps.step2.reviewFeedback).toEqual('An example comment in step2')
      expect(wrapper.find('Review').state().steps.step2.reviewStatus).toEqual(6)
      // console.log(wrapper.find('Review').state())

      //Step2 form
      wrapper.find('Field').last().find('textarea').simulate('change', {
        target: {
          name: "reviewFeedback",
          value: "An example comment in step3"
        }
      })
      wrapper.find('Field').first().find('select').simulate('change', {
        target: {
          name: "reviewStatus",
          value: "6"
        }
      })
      wrapper.update()
      wrapper.find('Form').simulate('submit')
      //Step2 submit to API
      mockAxios.mockResponse(responseObj)
      wrapper.update()
      expect(wrapper.find('Review').state().steps.step4.apiData).toEqual(mockStep4APIdata)
      expect(wrapper.find('Review').state().steps.currentStep).toEqual(4)
      expect(wrapper.find('Review').state().steps.step3.reviewFeedback).toEqual('An example comment in step3')
      expect(wrapper.find('Review').state().steps.step3.reviewStatus).toEqual(6)

      //Step3 form
      wrapper.find('Field').last().find('textarea').simulate('change', {
        target: {
          name: "reviewFeedback",
          value: "An example comment in step4"
        }
      })
      wrapper.find('Field').first().find('select').simulate('change', {
        target: {
          name: "reviewStatus",
          value: "6"
        }
      })
      wrapper.update()
      wrapper.find('Form').simulate('submit')
      mockAxios.mockResponse(responseObj)
      // console.log(wrapper.find('Review').state())

      wrapper.update()
      expect(wrapper.find('Review').state().steps.step5.apiData).toEqual(mockStep5APIdata)
      expect(wrapper.find('Review').state().steps.currentStep).toEqual(5)
      expect(wrapper.find('Review').state().steps.step4.reviewFeedback).toEqual('An example comment in step4')
      expect(wrapper.find('Review').state().steps.step4.reviewStatus).toEqual(6)

      //Step4 form
      wrapper.find('Field').last().find('textarea').simulate('change', {
        target: {
          name: "reviewFeedback",
          value: "An example comment in step5"
        }
      })
      wrapper.find('Field').first().find('select').simulate('change', {
        target: {
          name: "reviewStatus",
          value: "6"
        }
      })
      wrapper.update()
      wrapper.find('Form').simulate('submit')
      //Step4 submit to API
      mockAxios.mockResponse(responseObj)

      wrapper.update()
      expect(wrapper.find('Review').state().steps.step5.reviewFeedback).toEqual('An example comment in step5')
      expect(wrapper.find('Review').state().steps.step5.reviewStatus).toEqual(6)
    })


    //Error Handling
    test('if step1 API call fails, correct step and data is loaded', () => {
      const spy = Sinon.spy()
      const historyMock = {push: spy};
      const wrapper = mount(
        <I18nextProvider i18n={i18n}>
          <Review kc={mockKcProps} {...mockMatchParams} history={historyMock}>
          </Review>
        </I18nextProvider>
      )
      wrapper.find('Review').setState({
        stepReady: true
      })
      wrapper.update()
      //Set initial Sections data
      let responseObj = {
        data: {
          "sections": [
            {
              "section_status": null,
              "comments": [],
              "section_type": "device_description"
            },
            {
              "section_status": null,
              "comments": [],
              "section_type": "imei_classification"
            },
            {
              "section_status": null,
              "comments": [],
              "section_type": "imei_registration"
            },
            {
              "section_status": null,
              "comments": [],
              "section_type": "approval_documents"
            }
          ]
        },
        status: 200
      }
      let errorResponse = {
        data: {},
        response: {
          status: 409,
          data: {
            message: 'iam message'
          }
        },
        status: 200
      }
      mockAxios.mockResponse(responseObj)
      mockAxios.mockResponse(fakeResponse)
      mockAxios.mockError(errorResponse)
      expect(wrapper.find('Review').state().steps.currentStep).toEqual(2)
      expect(wrapper.find('Review').state().stepReady).toBe(true)
      expect(wrapper.find('Review').state().currentReviewStatus).toEqual('')
      expect(wrapper.find('Review').state().currentReviewFeedback).toEqual('')
    })
    test('if step2 API call fails, correct step and data is loaded', () => {
      const spy = Sinon.spy()
      const historyMock = {push: spy};
      const wrapper = mount(
        <I18nextProvider i18n={i18n}>
          <Review kc={mockKcProps} {...mockMatchParams} history={historyMock}>
          </Review>
        </I18nextProvider>
      )
      wrapper.find('Review').setState({
        stepReady: true
      })
      wrapper.update()
      //Set initial Sections data
      let responseObj = {
        data: {
          "sections": [
            {
              "section_status": 6,
              "comments": mockStep2Comments,
              "section_type": "device_description"
            },
            {
              "section_status": null,
              "comments": [],
              "section_type": "imei_classification"
            },
            {
              "section_status": null,
              "comments": [],
              "section_type": "imei_registration"
            },
            {
              "section_status": null,
              "comments": [],
              "section_type": "approval_documents"
            }
          ]
        },
        status: 200
      }
      let errorResponse = {
        data: {},
        response: {
          status: 422,
          data: {
            message: 'iam message'
          }
        },
        status: 200
      }
      let getStep2DataResponse = {
        data: mockStep2APIdata,
        status: 200
      }
      mockAxios.mockResponse(responseObj)
      mockAxios.mockResponse(getStep2DataResponse)
      mockAxios.mockError(errorResponse)

      expect(wrapper.find('Review').state().steps.currentStep).toEqual(2)
      expect(wrapper.find('Review').state().stepReady).toBe(true)
      expect(wrapper.find('Review').state().currentReviewStatus).toEqual(6)
      expect(wrapper.find('Review').state().currentReviewFeedback).toEqual('Device Description Section')
    })
    test('if step3 API call fails,  correct step and data is loaded', () => {
      const spy = Sinon.spy()
      const historyMock = {push: spy};
      const wrapper = mount(
        <I18nextProvider i18n={i18n}>
          <Review kc={mockKcProps} {...mockMatchParams} history={historyMock}>
          </Review>
        </I18nextProvider>
      )
      wrapper.find('Review').setState({
        stepReady: true
      })
      wrapper.update()
      //Set initial Sections data
      let responseObj = {
        data: {
          "sections": [
            {
              "section_status": 5,
              "comments": mockStep2Comments,
              "section_type": "device_description"
            },
            {
              "section_status": 6,
              "comments": mockStep3Comments,
              "section_type": "imei_classification"
            },
            {
              "section_status": 5,
              "comments": mockStep4Comments,
              "section_type": "imei_registration"
            },
            {
              "section_status": null,
              "comments": [],
              "section_type": "approval_documents"
            }
          ]
        },
        status: 200
      }
      let errorResponse = {
        data: {},
        response: {
          status: 501,
          data: {
            message: 'iam message'
          }
        },
        status: 200
      }
      let getStep2DataResponse = {
        data: mockStep2APIdata,
        status: 200
      }
      let getStep3DataResponse = {
        data: mockStep3APIdata,
        status: 200
      }
      let getStep4DataResponse = {
        data: mockStep4APIdata,
        status: 200
      }
      mockAxios.mockResponse(responseObj)
      mockAxios.mockResponse(fakeResponse)
      mockAxios.mockResponse(getStep2DataResponse)
      mockAxios.mockResponse(getStep3DataResponse)
      mockAxios.mockResponse(getStep4DataResponse)
      mockAxios.mockError(errorResponse)
      expect(wrapper.find('Review').state().steps.currentStep).toEqual(4)
      expect(wrapper.find('Review').state().stepReady).toBe(true)
      expect(wrapper.find('Review').state().currentReviewStatus).toEqual(5)
      expect(wrapper.find('Review').state().currentReviewFeedback).toEqual('IMEI Registration Section')
    })
    test('if step4 API call fails,  correct step and data is loaded', () => {
      const spy = Sinon.spy()
      const historyMock = {push: spy};
      const wrapper = mount(
        <I18nextProvider i18n={i18n}>
          <Review kc={mockKcProps} {...mockMatchParams} history={historyMock}>
          </Review>
        </I18nextProvider>
      )
      wrapper.find('Review').setState({
        stepReady: true
      })
      wrapper.update()
      //Set initial Sections data
      let responseObj = {
        data: {
          "sections": [
            {
              "section_status": 5,
              "comments": mockStep2Comments,
              "section_type": "device_description"
            },
            {
              "section_status": 6,
              "comments": mockStep3Comments,
              "section_type": "imei_classification"
            },
            {
              "section_status": 5,
              "comments": mockStep4Comments,
              "section_type": "imei_registration"
            },
            {
              "section_status": 6,
              "comments": mockStep5Comments,
              "section_type": "approval_documents"
            }
          ]
        },
        status: 200
      }
      let errorResponse = {
        data: {},
        response: {
          status: 404,
          data: {
            message: 'iam message'
          }
        },
        status: 200
      }
      let getStep1DataResponse = {
        data: mockStep1APIdata,
        status: 200
      }
      let getStep2DataResponse = {
        data: mockStep2APIdata,
        status: 200
      }
      let getStep3DataResponse = {
        data: mockStep3APIdata,
        status: 200
      }
      let getStep4DataResponse = {
        data: mockStep4APIdata,
        status: 200
      }
      mockAxios.mockResponse(responseObj)
      mockAxios.mockResponse(getStep1DataResponse)
      mockAxios.mockResponse(getStep2DataResponse)
      mockAxios.mockResponse(getStep3DataResponse)
      mockAxios.mockResponse(getStep4DataResponse)
      mockAxios.mockError(errorResponse)

      expect(wrapper.find('Review').state().steps.currentStep).toEqual(5)
      expect(wrapper.find('Review').state().stepReady).toBe(true)
      expect(wrapper.find('Review').state().currentReviewStatus).toEqual(6)
      expect(wrapper.find('Review').state().currentReviewFeedback).toEqual('Approval Documents Section')
    })
  })
})