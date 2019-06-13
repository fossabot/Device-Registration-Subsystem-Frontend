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

import i18n from '../../../i18n'
import ViewRequest from './ViewRequest'
import React from "react";
import mockAxios from 'jest-mock-axios';
import {I18nextProvider} from 'react-i18next';
//Mock File Saver
import FileSaver from "file-saver";
jest.mock('file-saver', ()=>({saveAs: jest.fn()}))
global.Blob = function (content, options){return  ({content, options})}

//
const step1comments = [{
  "user_id": "81e53d7a-4483-407c-b9f7-1ebd9fe05ac6",
  "user_name": "drs auth user",
  "comment": "Device Quota Section",
  "datetime": "2018-11-22T07:18:05.658390+00:00"
},
  {
    "user_id": "81e53d7a-4483-407c-b9f7-1ebd9fe05ac6",
    "user_name": "drs auth user",
    "comment": "IMEI Classification Section",
    "datetime": "2018-11-22T07:18:05.658390+00:00"
  },
  {
    "user_id": "81e53d7a-4483-407c-b9f7-1ebd9fe05ac6",
    "user_name": "drs auth user",
    "comment": "IMEI Registration Section",
    "datetime": "2018-11-22T07:18:05.658390+00:00"
  }
  ]
const step2comments = [
  {
    "user_id": "81e53d7a-4483-407c-b9f7-1ebd9fe05ac6",
    "user_name": "drs auth user",
    "comment": "Device Description Section",
    "datetime": "2018-11-22T07:18:05.658390+00:00"
  }
]
const step3comments = [
  {
    "user_id": "81e53d7a-4483-407c-b9f7-1ebd9fe05ac6",
    "user_name": "drs auth user",
    "comment": "Approval Documents Section",
    "datetime": "2018-11-22T07:18:05.658390+00:00"
  }
]

//Mock Step data

const mockStep1Data = {
  "imei_per_device": 1,
  "id": 8432,
  "reviewer_id": null,
  "imeis": [["1111111111111111"]],
  "tracking_id": "f46c8da1-ead6-4c02-91d7-1789adf9f3c3",
  "device_count": 1,
  "updated_at": "2018-12-17T07:06:08.855296+00:00",
  "report": "compliant_report8d0bd8b2-34a7-4b39-864a-9039dcb33aed.tsv",
  "created_at": "2018-11-30T09:52:28.319010+00:00",
  "reviewer_name": null,
  "processing_status_label": "Processed",
  "report_allowed": true,
  "user_name": "drs importer user",
  "duplicate_imeis_file": null,
  "report_status_label": "Processed",
  "file": null,
  "status_label": "Pending Review",
  "m_location": "local",
  "user_id": "6ed9747b-d36a-4799-88c8-59d17a9abb5a"
}

const mockStep2Data = {
  "technologies": ["5G", "2G", "3G", "4G"],
  "id": "2291",
  "model_num": "test",
  "device_type": "Smartphone",
  "model_name": "test",
  "reg_details_id": 8432,
  "brand": "test",
  "operating_system": "test"
}

const mockStep3Data = [{
  "id": 6548,
  "filename": "20181130095246_Untitled.png3.png",
  "link": "/var/www/html/dirbs_intl_drs/uploads/f46c8da1-ead6-4c02-91d7-1789adf9f3c3/20181130095246_Untitled.png3.png",
  "label": "certificate document",
  "required": true,
  "reg_details_id": 8432,
  "document_id": 3
}, {
  "id": 6549,
  "filename": "20181130095246_Untitled.png1.png",
  "link": "/var/www/html/dirbs_intl_drs/uploads/f46c8da1-ead6-4c02-91d7-1789adf9f3c3/20181130095246_Untitled.png1.png",
  "label": "shipment document",
  "required": true,
  "reg_details_id": 8432,
  "document_id": 1
}, {
  "id": 6550,
  "filename": "20181130095246_Untitled.png2.png",
  "link": "/var/www/html/dirbs_intl_drs/uploads/f46c8da1-ead6-4c02-91d7-1789adf9f3c3/20181130095246_Untitled.png2.png",
  "label": "authorization document",
  "required": true,
  "reg_details_id": 8432,
  "document_id": 2
}]

let responseObj = {
  data: {
    "sections": [
      {
        "section_status": 5,
        "comments": [{
          "user_id": "81e53d7a-4483-407c-b9f7-1ebd9fe05ac6",
          "user_name": "drs auth user",
          "comment": "Device Quota Section",
          "datetime": "2018-11-22T07:18:05.658390+00:00"
        }],
        "section_type": "device_quota"
      },
      {
        "section_status": 6,
        "comments": [{
          "user_id": "81e53d7a-4483-407c-b9f7-1ebd9fe05ac6",
          "user_name": "drs auth user",
          "comment": "Device Description Section",
          "datetime": "2018-11-22T07:18:05.658390+00:00"
        }],
        "section_type": "device_description"
      },
      {
        "section_status": 5,
        "comments": [{
          "user_id": "81e53d7a-4483-407c-b9f7-1ebd9fe05ac6",
          "user_name": "drs auth user",
          "comment": "IMEI Classification Section",
          "datetime": "2018-11-22T07:18:05.658390+00:00"
        }],
        "section_type": "imei_classification"
      },
      {
        "section_status": 6,
        "comments": [{
          "user_id": "81e53d7a-4483-407c-b9f7-1ebd9fe05ac6",
          "user_name": "drs auth user",
          "comment": "IMEI Registration Section",
          "datetime": "2018-11-22T07:18:05.658390+00:00"
        }],
        "section_type": "imei_registration"
      },
      {
        "section_status": 5,
        "comments": [{
          "user_id": "81e53d7a-4483-407c-b9f7-1ebd9fe05ac6",
          "user_name": "drs auth user",
          "comment": "Approval Documents Section",
          "datetime": "2018-11-22T07:18:05.658390+00:00"
        }],
        "section_type": "approval_documents"
      }
    ]
  },
  status: 200
}

describe("View Request Component", () => {
  describe("Registration Request",()=>{
    const mockMatchParams = {
      match: {
        params: {
          id: 8432,
          type: 'registration'
        }
      }
    }
    afterEach(() => {
      mockAxios.reset();
    });
   /* test('if renders correctly', () => {
      const wrapper = shallow(
        <ViewRequest/>);
      expect(wrapper).toMatchSnapshot()
    })
    test('if renders correctly again', () => {
      const wrapper = render(
        <I18nextProvider i18n={i18n}>
          <ViewRequest/>
        </I18nextProvider>
      )
      expect(wrapper).toMatchSnapshot()
    });*/
    test('if initial state renders correctly', () => {
      const wrapper = mount(
        <I18nextProvider i18n={i18n}>
          <ViewRequest kc={mockKcProps} {...mockMatchParams}/>
        </I18nextProvider>
      )
      expect(wrapper.find('ViewRequest').state().viewType).toEqual('registration')
      expect(wrapper.find('ViewRequest').state().requestId).toEqual(8432)
      expect(wrapper.find('ViewRequest').state().currentStep).toEqual(1)
      expect(wrapper.find('ViewRequest').state().hasReport).toEqual(false)
    });
    test('if initial data loaded correctly', () => {
      const wrapper = mount(
        <I18nextProvider i18n={i18n}>
          <ViewRequest kc={mockKcProps} {...mockMatchParams}/>
        </I18nextProvider>
      )
      let sectionsResponse = {
        data: {
          "reg_docs": mockStep3Data,
          "reg_details": mockStep1Data,
          "reg_device": mockStep2Data
        },
        status: 200
      }
      mockAxios.mockResponse(responseObj)
      mockAxios.mockResponse(sectionsResponse)
      wrapper.update()

      expect(wrapper.find('ViewRequest').state().step1Data).toEqual(mockStep1Data)
      expect(wrapper.find('ViewRequest').state().step2Data).toEqual(mockStep2Data)
      expect(wrapper.find('ViewRequest').state().step3Data).toEqual(mockStep3Data)

      expect(wrapper.find('ViewRequest').state().step1Comments).toEqual(step1comments)
      expect(wrapper.find('ViewRequest').state().step2Comments).toEqual(step2comments)
      expect(wrapper.find('ViewRequest').state().step3Comments).toEqual(step3comments)
    });
    test('if step header renders',()=>{
      const wrapper = mount(
        <I18nextProvider i18n={i18n}>
          <ViewRequest kc={mockKcProps} {...mockMatchParams}/>
        </I18nextProvider>
      )
      let sectionsResponse = {
        data: {
          "reg_docs": mockStep3Data,
          "reg_details": mockStep1Data,
          "reg_device": mockStep2Data
        },
        status: 200
      }
      mockAxios.mockResponse(responseObj)
      mockAxios.mockResponse(sectionsResponse)
      wrapper.update()
      expect(wrapper.find('#stepHeader').find('span').at(0).text()).toEqual("8432")
      expect(wrapper.find('#stepHeader').find('span').at(1).find('span').at(1).text()).toEqual("Registration")
      expect(wrapper.find('#stepHeader').find('span').last().text()).toEqual('Pending review')
    })
    describe('if download report',()=>{
      test('Downloading for importer user',()=>{
        const kcResource = {
          realm_access: {
            roles: ['uma_authorization', "drs_importer"]
          }
        }
        const wrapper = mount(
          <I18nextProvider i18n={i18n}>
            <ViewRequest kc={mockKcProps} {...mockMatchParams} resources={kcResource}/>
          </I18nextProvider>
        )
        let sectionsResponse = {
          data: {
            "reg_docs": mockStep3Data,
            "reg_details": mockStep1Data,
            "reg_device": mockStep2Data
          },
          status: 200
        }
        mockAxios.mockResponse(responseObj)
        mockAxios.mockResponse(sectionsResponse)
        wrapper.update()

        //Test
        expect(wrapper.find('ViewRequest').state().hasReport).toEqual(true)

        //Download Report
        wrapper.find('.samplefile').find('button').simulate('click')
        //API call
        let downloadReportResponse = {
          data: "Test reponse data",
          status: 200
        }
        mockAxios.mockResponse(downloadReportResponse)

        //Test
        expect(FileSaver.saveAs).toBeCalled()
      })
      test('Downloading for exporter user',()=>{
        const kcResource = {
          realm_access: {
            roles: ['uma_authorization', "drs_exporter"]
          }
        }
        const wrapper = mount(
          <I18nextProvider i18n={i18n}>
            <ViewRequest kc={mockKcProps} {...mockMatchParams} resources={kcResource}/>
          </I18nextProvider>
        )
        wrapper.find('ViewRequest').setState({
          viewType: 'deregistration'
        })
        let sectionsResponse = {
          data: {
            "reg_docs": mockStep3Data,
            "reg_details": mockStep1Data,
            "reg_device": mockStep2Data
          },
          status: 200
        }
        mockAxios.mockResponse(responseObj)
        mockAxios.mockResponse(sectionsResponse)
        wrapper.update()

        //Test
        expect(wrapper.find('ViewRequest').state().hasReport).toEqual(true)

        //Download Report
        wrapper.find('.samplefile').find('button').simulate('click')
        //API call
        let downloadReportResponse = {
          data: "Test reponse data",
          status: 200
        }
        mockAxios.mockResponse(downloadReportResponse)

        //Test
        expect(FileSaver.saveAs).toBeCalled()
      })
      test('Downloading for individual user',()=>{
        const kcResource = {
          realm_access: {
            roles: ['uma_authorization', "drs_individual"]
          }
        }
        const wrapper = mount(
          <I18nextProvider i18n={i18n}>
            <ViewRequest kc={mockKcProps} {...mockMatchParams} resources={kcResource}/>
          </I18nextProvider>
        )
        let sectionsResponse = {
          data: {
            "reg_docs": mockStep3Data,
            "reg_details": mockStep1Data,
            "reg_device": mockStep2Data
          },
          status: 200
        }
        mockAxios.mockResponse(responseObj)
        mockAxios.mockResponse(sectionsResponse)
        wrapper.update()

        //Test
        expect(wrapper.find('ViewRequest').state().hasReport).toEqual(true)

        //Download Report
        wrapper.find('.samplefile').find('button').simulate('click')
        //API call
        let downloadReportResponse = {
          data: "Test reponse data",
          status: 200
        }
        mockAxios.mockResponse(downloadReportResponse)

        //Test
        expect(FileSaver.saveAs).toBeCalled()
      })
    })

    //Step Navigation next
    test('if step navigate to next correctly', () => {
      let spy = Sinon.spy()
      const historyMock = {push: spy};
      const wrapper = mount(
        <I18nextProvider i18n={i18n}>
          <ViewRequest kc={mockKcProps} {...mockMatchParams}  history={historyMock}/>
        </I18nextProvider>
      )
      let sectionsResponse = {
        data: {
          "reg_docs": mockStep3Data,
          "reg_details": mockStep1Data,
          "reg_device": mockStep2Data
        },
        status: 200
      }
      mockAxios.mockResponse(responseObj)
      mockAxios.mockResponse(sectionsResponse)
      wrapper.update()

      expect(wrapper.find('StepIndicator').length).toEqual(1)
      expect(wrapper.find('CommentBox').length).toEqual(1)
      expect(wrapper.find('ViewRequest').state().currentStep).toEqual(1)
      expect(wrapper.find('ViewRequest').find('CardHeader').at(1).find('h6').text()).toEqual('Basic registration details')

      wrapper.find('Form').find('button').at(1).simulate('click')
      wrapper.update()

      expect(wrapper.find('ViewRequest').state().currentStep).toEqual(2)
      expect(wrapper.find('ViewRequest').find('CardHeader').at(1).find('h6').text()).toEqual('Device model description')

      wrapper.find('Form').find('button').at(1).simulate('click')
      wrapper.update()

      expect(wrapper.find('ViewRequest').state().currentStep).toEqual(3)
      expect(wrapper.find('ViewRequest').find('CardHeader').at(1).find('h6').text()).toEqual('Approval documents')

      // console.log(wrapper.find('Form').find('button').debug())
      wrapper.find('Form').find('button').last().simulate('click')
      wrapper.update()

      expect(spy.calledOnce).toBe(true)
    });
    test('if step navigate to previous correctly', () => {
      let spy = Sinon.spy()
      const historyMock = {push: spy};
      const wrapper = mount(
        <I18nextProvider i18n={i18n}>
          <ViewRequest kc={mockKcProps} {...mockMatchParams}  history={historyMock}/>
        </I18nextProvider>
      )
      let sectionsResponse = {
        data: {
          "reg_docs": mockStep3Data,
          "reg_details": mockStep1Data,
          "reg_device": mockStep2Data
        },
        status: 200
      }
      mockAxios.mockResponse(responseObj)
      mockAxios.mockResponse(sectionsResponse)
      wrapper.find('ViewRequest').setState({
        currentStep: 3
      })
      wrapper.update()

      expect(wrapper.find('StepIndicator').length).toEqual(1)
      expect(wrapper.find('CommentBox').length).toEqual(1)
      expect(wrapper.find('ViewRequest').state().currentStep).toEqual(3)
      expect(wrapper.find('ViewRequest').find('CardHeader').at(1).find('h6').text()).toEqual('Approval documents')

      wrapper.find('Form').find('button').at(3).simulate('click')
      wrapper.update()

      expect(wrapper.find('ViewRequest').state().currentStep).toEqual(2)
      expect(wrapper.find('ViewRequest').find('CardHeader').at(1).find('h6').text()).toEqual('Device model description')

      wrapper.find('Form').find('button').at(0).simulate('click')
      wrapper.update()

      expect(wrapper.find('ViewRequest').state().currentStep).toEqual(1)
      expect(wrapper.find('ViewRequest').find('CardHeader').at(1).find('h6').text()).toEqual('Basic registration details')

    });

  })
  describe("De-Registration Request",()=>{
    const mockMatchParams = {
      match: {
        params: {
          id: 843,
          type: 'deregistration'
        }
      }
    }
    afterEach(() => {
      mockAxios.reset();
    });
    test('if initial state renders correctly', () => {
      const wrapper = mount(
        <I18nextProvider i18n={i18n}>
          <ViewRequest kc={mockKcProps} {...mockMatchParams}/>
        </I18nextProvider>
      )
      expect(wrapper.find('ViewRequest').state().viewType).toEqual('deregistration')
      expect(wrapper.find('ViewRequest').state().requestId).toEqual(843)
      expect(wrapper.find('ViewRequest').state().currentStep).toEqual(1)
    });
    test('if initial data loaded correctly', () => {
      const wrapper = mount(
        <I18nextProvider i18n={i18n}>
          <ViewRequest kc={mockKcProps} {...mockMatchParams}/>
        </I18nextProvider>
      )
      let sectionsResponse = {
        data: {
          "dereg_docs": mockStep3Data,
          "dereg_details": mockStep1Data,
          "dereg_device": mockStep2Data
        },
        status: 200
      }
      mockAxios.mockResponse(responseObj)
      mockAxios.mockResponse(sectionsResponse)
      wrapper.update()

      expect(wrapper.find('ViewRequest').state().step1Data).toEqual(mockStep1Data)
      expect(wrapper.find('ViewRequest').state().step2Data).toEqual(mockStep2Data)
      expect(wrapper.find('ViewRequest').state().step3Data).toEqual(mockStep3Data)

      expect(wrapper.find('ViewRequest').state().step1Comments).toEqual(step1comments)
      expect(wrapper.find('ViewRequest').state().step2Comments).toEqual(step2comments)
      expect(wrapper.find('ViewRequest').state().step3Comments).toEqual(step3comments)
    });

    //Step Navigation next
    test('if step navigate to next correctly', () => {
      let spy = Sinon.spy()
      const historyMock = {push: spy};
      const wrapper = mount(
        <I18nextProvider i18n={i18n}>
          <ViewRequest kc={mockKcProps} {...mockMatchParams}  history={historyMock}/>
        </I18nextProvider>
      )
      let sectionsResponse = {
        data: {
          "reg_docs": mockStep3Data,
          "reg_details": mockStep1Data,
          "reg_device": mockStep2Data
        },
        status: 200
      }
      mockAxios.mockResponse(responseObj)
      mockAxios.mockResponse(sectionsResponse)
      wrapper.update()

      expect(wrapper.find('StepIndicator').length).toEqual(1)
      expect(wrapper.find('CommentBox').length).toEqual(1)
      expect(wrapper.find('ViewRequest').state().currentStep).toEqual(1)
      expect(wrapper.find('ViewRequest').find('CardHeader').at(1).find('h6').text()).toEqual('Basic De-registration details')

      wrapper.find('Form').find('button').at(1).simulate('click')
      wrapper.update()

      expect(wrapper.find('ViewRequest').state().currentStep).toEqual(2)
      expect(wrapper.find('ViewRequest').find('CardHeader').at(1).find('h6').text()).toEqual('Device model description')

      wrapper.find('Form').find('button').at(1).simulate('click')
      wrapper.update()

      expect(wrapper.find('ViewRequest').state().currentStep).toEqual(3)
      expect(wrapper.find('ViewRequest').find('CardHeader').at(1).find('h6').text()).toEqual('Approval documents')

      // console.log(wrapper.find('Form').find('button').debug())
      wrapper.find('Form').find('button').last().simulate('click')
      wrapper.update()

      expect(spy.calledOnce).toBe(true)
    });
    test('if step navigate to previous correctly', () => {
      let spy = Sinon.spy()
      const historyMock = {push: spy};
      const wrapper = mount(
        <I18nextProvider i18n={i18n}>
          <ViewRequest kc={mockKcProps} {...mockMatchParams}  history={historyMock}/>
        </I18nextProvider>
      )
      let sectionsResponse = {
        data: {
          "reg_docs": mockStep3Data,
          "reg_details": mockStep1Data,
          "reg_device": mockStep2Data
        },
        status: 200
      }
      mockAxios.mockResponse(responseObj)
      mockAxios.mockResponse(sectionsResponse)
      wrapper.find('ViewRequest').setState({
        currentStep: 3
      })
      wrapper.update()

      expect(wrapper.find('StepIndicator').length).toEqual(1)
      expect(wrapper.find('CommentBox').length).toEqual(1)
      expect(wrapper.find('ViewRequest').state().currentStep).toEqual(3)
      expect(wrapper.find('ViewRequest').find('CardHeader').at(1).find('h6').text()).toEqual('Approval documents')

      wrapper.find('Form').find('button').at(0).simulate('click')
      wrapper.update()

      expect(wrapper.find('ViewRequest').state().currentStep).toEqual(2)
      expect(wrapper.find('ViewRequest').find('CardHeader').at(1).find('h6').text()).toEqual('Device model description')

      wrapper.find('Form').find('button').at(0).simulate('click')
      wrapper.update()

      expect(wrapper.find('ViewRequest').state().currentStep).toEqual(1)
      expect(wrapper.find('ViewRequest').find('CardHeader').at(1).find('h6').text()).toEqual('Basic De-registration details')

    });
  })
})
