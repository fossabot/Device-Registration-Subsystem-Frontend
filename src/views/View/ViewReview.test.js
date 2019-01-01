/*Copyright (c) 2018 Qualcomm Technologies, Inc.
  All rights reserved.

  Redistribution and use in source and binary forms, with or without modification, are permitted (subject to the limitations in the disclaimer below) provided that the following conditions are met:

  * Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
* Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
* Neither the name of Qualcomm Technologies, Inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.
  NO EXPRESS OR IMPLIED LICENSES TO ANY PARTY'S PATENT RIGHTS ARE GRANTED BY THIS LICENSE. THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/
import ViewReview from './ViewReview'
import Steps from './ViewReview'
import {I18nextProvider} from 'react-i18next';
import i18n from './../../i18nTest'
import React from "react";
import axios from 'axios'
import mockAxios from 'jest-mock-axios';

const mockMatchParams = {
  match: {
    params: {
      id: 2,
      type: 'registration'
    }
  }
}

const mockStep1APIdata = {
  "allowed_import_quota": 1000000,
  "request_device_count": 100,
  "allowed_export_quota": 1000000,
  "used_registration_quota": 3400,
  "used_de_registration_quota": 0
}
let mockStep2APIdata = {
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
let mockStep5APIdata = {
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
const mockComments = [
  {
  "user_id": "81e53d7a-4483-407c-b9f7-1ebd9fe05ac6",
  "user_name": "drs auth user",
  "comment": "test1",
  "datetime": "2018-11-22T07:18:05.658390+00:00"
}, {
  "user_id": "81e53d7a-4483-407c-b9f7-1ebd9fe05ac6",
  "user_name": "drs auth user",
  "comment": "test12",
  "datetime": "2018-11-22T07:18:05.658390+00:00"
}]
const mockHeader = {"headers": {"Authorization": "Bearer null", "Content-Type": "application/json"}}

describe("View Review Component", () => {
  afterEach(() => {
    mockAxios.reset();
  });
  beforeEach(() => {
    localStorage.clear();
    localStorage.userInfo = 'eyJzdWIiOiI4MWU1M2Q3YS00NDgzLTQwN2MtYjlmNy0xZWJkOWZlMDVhYzYiLCJuYW1lIjoiIiwicHJlZmVycmVkX3VzZXJuYW1lIjoiZHJzIGF1dGggdXNlciJ9'
  })
  test('if renders correctly', () => {
    const wrapper = shallow(
      <ViewReview {...mockMatchParams}/>);
    expect(wrapper).toMatchSnapshot()
  })
  test('if renders correctly again', () => {
    const wrapper = render(
      <I18nextProvider i18n={i18n}>
        <ViewReview {...mockMatchParams}/>
      </I18nextProvider>
    )
    expect(wrapper).toMatchSnapshot()
  });
  test('if initial state renders correctly', () => {
    const wrapper = mount(
      <I18nextProvider i18n={i18n}>
        <ViewReview kc={mockKcProps} {...mockMatchParams}/>
      </I18nextProvider>
    )
    let state = wrapper.find('ViewReview').state()
    expect(state.viewType).toEqual('registration_request')
    expect(state.requestId).toEqual(2)
    expect(state.stepReady).toEqual(false)
    expect(state.totalImeis).toEqual(null)
  })
  test('if renders props correctly', () => {
    let mockSteps = {
      currentStep: 1,
      step1: {
        apiData: {
          "allowed_import_quota": 1000000,
          "request_device_count": 100,
          "allowed_export_quota": 1000000,
          "used_registration_quota": 3400,
          "used_de_registration_quota": 0
        },
        comments: [{
          "user_id": "81e53d7a-4483-407c-b9f7-1ebd9fe05ac6",
          "user_name": "drs auth user",
          "comment": "test",
          "datetime": "2018-11-22T07:18:05.658390+00:00"
        }],
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
    }
    const wrapper = mount(
      <I18nextProvider i18n={i18n}>
        <ViewReview
          kc={mockKcProps}
          {...mockMatchParams}
          stepsInfo={mockSteps}
          stepReady={true}
          totalImeis={2}
          requestStatus='Approved'
          requestId={2}
          assignedTo='test user'
          assigned={true}
          viewType='registration_request'
        />
      </I18nextProvider>
    )
    let Props = wrapper.find('ViewReview').props()
    expect(Props.stepsInfo).toEqual(mockSteps)
    expect(Props.stepReady).toBe(true)
    expect(Props.totalImeis).toBe(2)
    expect(Props.requestStatus).toEqual('Approved')
    expect(Props.requestId).toEqual(2)
    expect(Props.assignedTo).toEqual('test user')
    expect(Props.assigned).toBe(true)
    expect(Props.viewType).toEqual('registration_request')
  })
  test('if ComponentDidMount renders state correctly', () => {
    const wrapper = mount(
      <I18nextProvider i18n={i18n}>
        <ViewReview kc={mockKcProps} {...mockMatchParams}/>
      </I18nextProvider>
    )
    // Get Comments Data API call
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
    let responseObj = {
      data: {
        "sections": [
          {
            "section_status": null,
            "comments": mockStep1Comments,
            "section_type": "device_quota"
          },
          {
            "section_status": null,
            "comments": mockStep2Comments,
            "section_type": "device_description"
          },
          {
            "section_status": null,
            "comments": mockStep3Comments,
            "section_type": "imei_classification"
          },
          {
            "section_status": null,
            "comments": mockStep4Comments,
            "section_type": "imei_registration"
          },
          {
            "section_status": null,
            "comments": mockStep5Comments,
            "section_type": "approval_documents"
          }
        ]
      },
      status: 200
    }
    mockAxios.mockResponse(responseObj)
    expect(wrapper.find('ViewReview').state().steps.step1.comments).toEqual(mockStep1Comments)
    expect(wrapper.find('ViewReview').state().steps.step2.comments).toEqual(mockStep2Comments)
    expect(wrapper.find('ViewReview').state().steps.step3.comments).toEqual(mockStep3Comments)
    expect(wrapper.find('ViewReview').state().steps.step4.comments).toEqual(mockStep4Comments)
    expect(wrapper.find('ViewReview').state().steps.step5.comments).toEqual(mockStep5Comments)

    // Check Reviewer API call
    responseObj = {
      data: {
        "report_status_label": "Processed",
        "imeis": [["5555555555555555"]],
        "reviewer_name": "drs auth user",
        "duplicate_imeis_file": null,
        "m_location": "local",
        "device_count": 10,
        "processing_status_label": "Processed",
        "user_id": "6ed9747b-d36a-4799-88c8-59d17a9abb5a",
        "report": "compliant_reportc55c5595-1f8f-4801-869a-4f4993f84390.tsv",
        "tracking_id": "921381ca-b60d-4be5-a3b9-8503d1ca8022",
        "updated_at": "2018-12-06T05:57:52.296226+00:00",
        "user_name": "drs importer user",
        "reviewer_id": "81e53d7a-4483-407c-b9f7-1ebd9fe05ac6",
        "created_at": "2018-11-30T10:24:53.724787+00:00",
        "imei_per_device": 3,
        "file": null,
        "status_label": "In Review",
        "id": 8434
      },
      status: 200
    }
    mockAxios.mockResponse(responseObj)
    // console.log(wrapper.find('ViewReview').state())
    expect(wrapper.find('ViewReview').state().assigned).toBe(true)
    expect(wrapper.find('ViewReview').state().assignedTo).toEqual('drs auth user')
    expect(wrapper.find('ViewReview').state().requestStatus).toEqual('In Review')
    //Getting Step1 data API call
    responseObj = {
      data: mockStep1APIdata,
      status: 200
    }
    mockAxios.mockResponse(responseObj)
    expect(wrapper.find('ViewReview').state().steps.step1.apiData).toEqual(mockStep1APIdata)
    //Geting Step2 data API call
    responseObj = {
      data: mockStep2APIdata,
      status: 200
    }
    mockAxios.mockResponse(responseObj)
    expect(wrapper.find('ViewReview').state().steps.step2.apiData).toEqual(mockStep2APIdata)
    //Geting Step3 data API call
    responseObj = {
      data: mockStep3APIdata,
      status: 200
    }
    mockAxios.mockResponse(responseObj)
    expect(wrapper.find('ViewReview').state().steps.step3.apiData).toEqual(mockStep3APIdata)
    //Geting Step4 data API call
    responseObj = {
      data: mockStep4APIdata,
      status: 200
    }
    mockAxios.mockResponse(responseObj)
    expect(wrapper.find('ViewReview').state().steps.step4.apiData).toEqual(mockStep4APIdata)
    //Geting Step5 data API call
    responseObj = {
      data: mockStep5APIdata,
      status: 200
    }
    mockAxios.mockResponse(responseObj)
    expect(wrapper.find('ViewReview').state().steps.step5.apiData).toEqual(mockStep5APIdata)
  })
  test('Assign Review', () => {
    const spy = Sinon.spy()
    const historyMock = {push: spy};
    const wrapper = mount(
      <I18nextProvider i18n={i18n}>
        <ViewReview
          kc={mockKcProps}
          {...mockMatchParams}
          history={historyMock}
        />
      </I18nextProvider>
    )
    // console.log(wrapper.find('button').debug())
    const assignMeBtn = wrapper.find('button').at(0)
    assignMeBtn.simulate('click')
    let fakeResponse = {
      data: {},
      status: 404
    }
    let responseObj = {
      data: { "message": "reviewer 81e53d7a-4483-407c-b9f7-1ebd9fe05ac6 assigned to request 8434" },
      status: 201
    }
    //Mocking the request made at startup
    mockAxios.mockResponse(fakeResponse)
    mockAxios.mockResponse(fakeResponse)
    mockAxios.mockResponse(fakeResponse)
    mockAxios.mockResponse(fakeResponse)
    mockAxios.mockResponse(fakeResponse)
    mockAxios.mockResponse(fakeResponse)
    mockAxios.mockResponse(fakeResponse)
    //Mocking Assign review request
    mockAxios.mockResponse(responseObj)
    expect(spy.callCount).toEqual(1)
    expect(axios.put).toHaveBeenCalledWith('/review/assign-reviewer', {"request_id": 2, "request_type": "registration_request", "reviewer_id": "81e53d7a-4483-407c-b9f7-1ebd9fe05ac6", "reviewer_name": "drs auth user"},mockHeader)
  })
})
describe("Steps components", () => {
  test('if renders correctly', () => {
    const wrapper = shallow(
      <ViewReview {...mockMatchParams}>
        <Steps/>
      </ViewReview>);
    expect(wrapper).toMatchSnapshot()
  })
  test('if renders correctly again', () => {
    const wrapper = render(
      <I18nextProvider i18n={i18n}>
        <ViewReview {...mockMatchParams}>
          <Steps/>
        </ViewReview>
      </I18nextProvider>
    )
    expect(wrapper).toMatchSnapshot()
  });
  test('if common props renders correctly', () => {
    const wrapper = mount(
      <I18nextProvider i18n={i18n}>
        <ViewReview kc={mockKcProps} {...mockMatchParams}>
          <Steps/>
        </ViewReview>
      </I18nextProvider>
    )
    let steps = wrapper.find('Steps')
    //Request ID test
    expect(steps.find('#stepHeader').find('span').at(0).text()).toBe("2")
    //Request Type test
    expect(steps.find('#stepHeader').find('span').at(1).find('.text-primary').text()).toBe("Registration")
    //Has Step indicator
    expect(steps.find('StepIndicator').length).toBe(1)
    //Has Comment box
    expect(steps.find('CommentBox').length).toBe(1)
  });
  test('if request assigned', () => {
    const wrapper = mount(
      <I18nextProvider i18n={i18n}>
        <ViewReview kc={mockKcProps} {...mockMatchParams}>
          <Steps/>
        </ViewReview>
      </I18nextProvider>
    )
    wrapper.find('ViewReview').setState({
      assigned: true,
      assignedTo: 'test user',
      requestStatus: 'Approved',
      viewType: 'registration_request'
    })
    wrapper.update()
    let steps = wrapper.find('Steps')
    //Assigned to
    expect(steps.find('#stepHeader').find('p').find('span').at(0).text()).toBe("test user")
    //Request status
    expect(steps.find('#stepHeader').find('p').find('span').at(1).text()).toBe("Approved")

  });
  //Steps
  test('if step1 renders with mock data', () => {
    const wrapper = mount(
      <I18nextProvider i18n={i18n}>
        <ViewReview kc={mockKcProps} {...mockMatchParams}>
          <Steps/>
        </ViewReview>
      </I18nextProvider>
    )
    wrapper.find('ViewReview').setState({
      stepReady: true,
      assigned: true,
      assignedTo: 'test user',
      requestStatus: 'Approved',
      viewType: 'registration_request',
      steps: {
        currentStep: 1,
        step1: {
          apiData: mockStep1APIdata,
          comments: mockComments,
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
      }
    })
    wrapper.update()
    expect(wrapper.find('DeviceQuota').length).toEqual(1)
    expect(wrapper.find('CommentBox').find('li').length).toEqual(2)
    expect(wrapper.find('DeviceQuota').props().step1Data).toEqual(mockStep1APIdata)
  });
  test('if step2 renders with mock data', () => {

    const wrapper = mount(
      <I18nextProvider i18n={i18n}>
        <ViewReview kc={mockKcProps} {...mockMatchParams}>
          <Steps/>
        </ViewReview>
      </I18nextProvider>
    )
    wrapper.find('ViewReview').setState({
      stepReady: true,
      assigned: true,
      assignedTo: 'test user',
      requestStatus: 'Approved',
      viewType: 'registration_request',
      steps: {
        currentStep: 2,
        step1: {
          apiData: null,
          comments: [],
        },
        step2: {
          apiData: mockStep2APIdata,
          comments: mockComments,
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
      }
    })
    wrapper.update()
    expect(wrapper.find('DeviceDescription').length).toEqual(1)
    expect(wrapper.find('CommentBox').find('li').length).toEqual(2)
    expect(wrapper.find('DeviceDescription').props().step2Data).toEqual(mockStep2APIdata)
  });
  test('if step3 renders with mock data', () => {
    const wrapper = mount(
      <I18nextProvider i18n={i18n}>
        <ViewReview kc={mockKcProps} {...mockMatchParams}>
          <Steps/>
        </ViewReview>
      </I18nextProvider>
    )
    wrapper.find('ViewReview').setState({
      stepReady: true,
      assigned: true,
      assignedTo: 'test user',
      requestStatus: 'Approved',
      viewType: 'registration_request',
      steps: {
        currentStep: 3,
        step1: {
          apiData: null,
          comments: [],
        },
        step2: {
          apiData: null,
          comments: [],
        },
        step3: {
          apiData: mockStep3APIdata,
          comments: mockComments,
        },
        step4: {
          apiData: null,
          comments: [],
        },
        step5: {
          apiData: null,
          comments: [],
        }
      }
    })
    wrapper.update()
    expect(wrapper.find('ImeiClassification').length).toEqual(1)
    expect(wrapper.find('CommentBox').find('li').length).toEqual(2)
    expect(wrapper.find('ImeiClassification').props().step3Data).toEqual(mockStep3APIdata)
  });
  test('if step4 renders with mock data', () => {
    const wrapper = mount(
      <I18nextProvider i18n={i18n}>
        <ViewReview kc={mockKcProps} {...mockMatchParams}>
          <Steps/>
        </ViewReview>
      </I18nextProvider>
    )
    wrapper.find('ViewReview').setState({
      stepReady: true,
      assigned: true,
      assignedTo: 'test user',
      requestStatus: 'Approved',
      viewType: 'registration_request',
      steps: {
        currentStep: 4,
        step1: {
          apiData: null,
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
          apiData: mockStep4APIdata,
          comments: mockComments,
        },
        step5: {
          apiData: null,
          comments: [],
        }
      }
    })
    wrapper.update()
    expect(wrapper.find('ImeiRegistration').length).toEqual(1)
    expect(wrapper.find('CommentBox').find('li').length).toEqual(2)
    expect(wrapper.find('ImeiRegistration').props().step4Data).toEqual(mockStep4APIdata)
  });
  test('if step5 renders with mock data', () => {
    const wrapper = mount(
      <I18nextProvider i18n={i18n}>
        <ViewReview kc={mockKcProps} {...mockMatchParams}>
          <Steps/>
        </ViewReview>
      </I18nextProvider>
    )
    wrapper.find('ViewReview').setState({
      stepReady: true,
      assigned: true,
      assignedTo: 'test user',
      requestStatus: 'Approved',
      viewType: 'registration_request',
      steps: {
        currentStep: 5,
        step1: {
          apiData: null,
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
          apiData: mockStep5APIdata,
          comments: mockComments,
        }
      }
    })
    wrapper.update()
    expect(wrapper.find('ApprovalDocuments').length).toEqual(1)
    expect(wrapper.find('ApprovalDocuments').props().step5Data).toEqual(mockStep5APIdata)
  });

  //Next and Previous Navigation buttons
  //Navigating Next Registration
  test('navigating next button in registration', () => {
    const spy = Sinon.spy()
    const historyMock = {push: spy};
    const wrapper = mount(
      <I18nextProvider i18n={i18n}>
        <ViewReview kc={mockKcProps} {...mockMatchParams} history={historyMock}>
          <Steps/>
        </ViewReview>
      </I18nextProvider>
    )
    //For Registration
    wrapper.find('ViewReview').setState({
      stepReady: true,
      assigned: true,
      assignedTo: 'test user',
      requestStatus: 'Approved',
      viewType: 'registration_request',
      steps: {
        currentStep: 1,
        step1: {
          apiData: mockStep1APIdata,
          comments: mockComments,
        },
        step2: {
          apiData: mockStep2APIdata,
          comments: mockComments,
        },
        step3: {
          apiData: mockStep3APIdata,
          comments: mockComments,
        },
        step4: {
          apiData: mockStep4APIdata,
          comments: mockComments,
        },
        step5: {
          apiData: mockStep5APIdata,
          comments: mockComments,
        }
      }
    })
    wrapper.update()
    wrapper.find('ViewReview').find('button').simulate('click')
    wrapper.update()
    expect(wrapper.find('ViewReview').state().steps.currentStep).toBe(2)
    expect(wrapper.find('ViewReview').find('DeviceDescription').length).toBe(1)
    wrapper.find('ViewReview').find('button').at(1).simulate('click')
    wrapper.update()
    expect(wrapper.find('ViewReview').state().steps.currentStep).toBe(3)
    expect(wrapper.find('ViewReview').find('ImeiClassification').length).toBe(1)

    wrapper.find('ViewReview').find('button').at(0).simulate('click')
    wrapper.update()

    wrapper.find('ViewReview').find('button').at(2).simulate('click')
    wrapper.update()
    expect(wrapper.find('ViewReview').state().steps.currentStep).toBe(4)
    expect(wrapper.find('ViewReview').find('ImeiRegistration').length).toBe(1)
    wrapper.find('ViewReview').find('button').at(1).simulate('click')
    wrapper.update()
    expect(wrapper.find('ViewReview').state().steps.currentStep).toBe(5)
    expect(wrapper.find('ViewReview').find('ApprovalDocuments').length).toBe(1)
    wrapper.find('ViewReview').find('button').last().simulate('click')
    wrapper.update()
    expect(spy.callCount).toBe(1)
  })
  //Navigating Next De-Registration
  test('navigating next button in De-registration', () => {
    const spy = Sinon.spy()
    const historyMock = {push: spy};
    const wrapper = mount(
      <I18nextProvider i18n={i18n}>
        <ViewReview kc={mockKcProps} {...mockMatchParams} history={historyMock}>
          <Steps/>
        </ViewReview>
      </I18nextProvider>
    )
    //For De-Registration which contains 4 steps
    wrapper.find('ViewReview').setState({
      stepReady: true,
      assigned: true,
      assignedTo: 'test user',
      requestStatus: 'Approved',
      viewType: 'de_registration_request',
      steps: {
        currentStep: 1,
        step1: {
          apiData: null,
          comments: [],
        },
        step2: {
          apiData: mockStep2APIdata,
          comments: mockComments,
        },
        step3: {
          apiData: mockStep3APIdata,
          comments: mockComments,
        },
        step4: {
          apiData: mockStep4APIdata,
          comments: mockComments,
        },
        step5: {
          apiData: mockStep5APIdata,
          comments: mockComments,
        }
      }
    })
    wrapper.update()
    wrapper.find('ViewReview').find('button').at(1).simulate('click')
    wrapper.update()
    expect(wrapper.find('ViewReview').state().steps.currentStep).toBe(2)
    expect(wrapper.find('ViewReview').find('ImeiClassification').length).toBe(1)
    wrapper.find('ViewReview').find('button').at(2).simulate('click')
    wrapper.update()
    expect(wrapper.find('ViewReview').state().steps.currentStep).toBe(3)
    expect(wrapper.find('ViewReview').find('ImeiRegistration').length).toBe(1)
    wrapper.find('ViewReview').find('button').at(1).simulate('click')
    wrapper.update()
    expect(wrapper.find('ViewReview').state().steps.currentStep).toBe(4)
    expect(wrapper.find('ViewReview').find('ApprovalDocuments').length).toBe(1)
    wrapper.find('ViewReview').find('button').last().simulate('click')
    wrapper.update()
    expect(spy.callCount).toBe(1)
  })

  //Navigating Previous Registration
  test('navigating previous button in registration', () => {
    const wrapper = mount(
      <I18nextProvider i18n={i18n}>
        <ViewReview kc={mockKcProps} {...mockMatchParams}>
          <Steps/>
        </ViewReview>
      </I18nextProvider>
    )
    wrapper.find('ViewReview').setState({
      stepReady: true,
      assigned: true,
      assignedTo: 'test user',
      requestStatus: 'Approved',
      viewType: 'registration_request',
      steps: {
        currentStep: 5,
        step1: {
          apiData: mockStep1APIdata,
          comments: mockComments,
        },
        step2: {
          apiData: mockStep2APIdata,
          comments: mockComments,
        },
        step3: {
          apiData: mockStep3APIdata,
          comments: mockComments,
        },
        step4: {
          apiData: mockStep4APIdata,
          comments: mockComments,
        },
        step5: {
          apiData: mockStep5APIdata,
          comments: mockComments,
        }
      }
    })
    //For Registration
    wrapper.update()
    wrapper.find('ViewReview').find('button').at(3).simulate('click')
    wrapper.update()
    expect(wrapper.find('ViewReview').state().steps.currentStep).toBe(4)
    expect(wrapper.find('ViewReview').find('ImeiRegistration').length).toBe(1)
    wrapper.find('ViewReview').find('button').at(0).simulate('click')
    wrapper.update()
    expect(wrapper.find('ViewReview').state().steps.currentStep).toBe(3)
    expect(wrapper.find('ViewReview').find('ImeiClassification').length).toBe(1)
    wrapper.find('ViewReview').find('button').at(1).simulate('click')
    wrapper.update()
    expect(wrapper.find('ViewReview').state().steps.currentStep).toBe(2)
    expect(wrapper.find('ViewReview').find('DeviceDescription').length).toBe(1)
    wrapper.find('ViewReview').find('button').at(0).simulate('click')
    wrapper.update()
    expect(wrapper.find('ViewReview').state().steps.currentStep).toBe(1)
    expect(wrapper.find('ViewReview').find('DeviceQuota').length).toBe(1)
  })
  //Navigating Previous De-Registration
  test('navigating previous button in de-registration', () => {
    const wrapper = mount(
      <I18nextProvider i18n={i18n}>
        <ViewReview kc={mockKcProps} {...mockMatchParams}>
          <Steps/>
        </ViewReview>
      </I18nextProvider>
    )
    //For De-Registration which contains 4 steps
    wrapper.find('ViewReview').setState({
      stepReady: true,
      assigned: true,
      assignedTo: 'test user',
      requestStatus: 'Approved',
      viewType: 'de_registration_request',
      steps: {
        currentStep: 4,
        step1: {
          apiData: null,
          comments: [],
        },
        step2: {
          apiData: mockStep2APIdata,
          comments: mockComments,
        },
        step3: {
          apiData: mockStep3APIdata,
          comments: mockComments,
        },
        step4: {
          apiData: mockStep4APIdata,
          comments: mockComments,
        },
        step5: {
          apiData: mockStep5APIdata,
          comments: mockComments,
        }
      }
    })
    wrapper.update()
    wrapper.find('ViewReview').find('button').at(3).simulate('click')
    wrapper.update()
    expect(wrapper.find('ViewReview').state().steps.currentStep).toBe(3)
    expect(wrapper.find('ViewReview').find('ImeiRegistration').length).toBe(1)
    wrapper.find('ViewReview').find('button').at(0).simulate('click')
    wrapper.update()
    expect(wrapper.find('ViewReview').state().steps.currentStep).toBe(2)
    expect(wrapper.find('ViewReview').find('ImeiClassification').length).toBe(1)
    wrapper.find('ViewReview').find('button').at(1).simulate('click')
    wrapper.update()
    expect(wrapper.find('ViewReview').state().steps.currentStep).toBe(1)
    expect(wrapper.find('ViewReview').find('DeviceDescription').length).toBe(1)
  })

})
