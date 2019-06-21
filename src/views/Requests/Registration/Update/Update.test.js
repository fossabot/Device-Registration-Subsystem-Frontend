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
import i18n from '../../../../i18n'
import React from "react";
import FileSaver from "file-saver";
import axios from 'axios'
import mockAxios from 'jest-mock-axios';
import {I18nextProvider} from 'react-i18next';
import Update from './Update'
//Constants
import {
  MANUFACTURE_LOCATIONS,
  DEVICE_TYPES,
  TECHNOLOGIES,
  DOCUMENTS,
  EXTENSIONS
} from "../../../../utilities/constants";
//Mock comments
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
//Mock constants
const mockDeviceType = {
  id: 1,
  description: "Smartphone"
}
const mockTechnologies = {
  id: 1,
  description: "2G"
}
DOCUMENTS.push({
  label: "shipment document",
  id: 4,
  required: true,
  type: 2
})
DOCUMENTS.push({
  label: "authorization document",
  id: 5,
  required: true,
  type: 2
})
DOCUMENTS.push({
  label: "certificate document",
  id: 6,
  required: true,
  type: 2
})
DEVICE_TYPES.push(mockDeviceType)
TECHNOLOGIES.push(mockTechnologies)
//Mock File Saver
jest.mock('file-saver', ()=>({saveAs: jest.fn()}))
global.Blob = function (content, options){return  ({content, options})}

//Mock params
const mockMatchParamsNewRequest = {
  match: {
    params: {
      id: "id",
    }
  }
}
const mockMatchParams = {
  match: {
    params: {
      id: 842,
    }
  }
}
//Mock global functions
/*const confirmStub = Sinon.stub(window, 'confirm');
confirmStub.returns(true);*/
/*const confirmStub = Sinon.stub(window, 'swal');
confirmStub.returns(true);*/

const mockInvalidInput = 'XsWcQSL9ohTM0iayfeRZ7jI5o3Vnb9MSS6dd1tnJrr5W3QqZL4zpfKZCNlLDDXuoXktYlx5DNKgQ2' +
  '6vDdHWMHDyhzKLAzVrdLjVDh9QHmT1tVMfaHJbL3lSKvcQ9kYhdiemzVtvEQLGkjbG7fcJLRYLcfec2yKjy7Juuvdby' +
  'Et34XNz39ZBNzs9WMbRCfN8cTYQn4XIpoD2WaD6BtXnsHy1tyyxFWon4zn8cgWwcLVaHx1CmIGCwqztDFT9Na1vLGslz' +
  'kDrWb19X2SJ0BmuB6DO8F8tNXAK6iqlnRmuLy3mdGnMedEbyE1nsJWTdSoNCZe185zaoyug5IT5RvbWwl2zPJgP2' +
  '3wSQLSAXeGNBiZmKrI24gTuzkr2aadybYdevYqTjEPPoh4sxdUiuG4h6hPpuJMD0m7LoK0cMDh3urJ0el7ViKste' +
  'gCuK1V0VhvcCltflEaUIeA2YskT0pbkWImAQyV2jo9uFVR6wRpTWB2TkuJXkXZZ6iPYT4chmA5KBoa7wqwVb7Uzi0y' +
  's4neeXXVWeWDqqbidl5bnIKpuNf7vBcLhApW4N14PINajCi6b6ZuBvrOx6woHuh7wPAN2mKLrs8fGqaqALpaHGlc5j' +
  'd6295wXRHpcGMLBWK7NrdYirL9uBy4FTVDllwJYbQ1CDcKDsxyY0BDNiw3yqSglCuKj4rAMlFVuGcOeyT1nN4AAC2O' +
  'R2xwkhpHsH3jQYp5S09mZ4ELlWveHLqNoJB3UkXZHILQasO4OcT7Rd7pRk2PGvRjORnH4QCNxVFXD3n2Gcb1z0H5Ga' +
  '0DluifjqankatFQY5m80CeLcfAubTK3B8vMbbY7W4gXa9wkXGO4crxXKspLcNzGbGEOoj16KjqvePhtkUgvtbnIrtWU' +
  'LGYZ1M7Kjk6xRFZKX8ScJSdGAtA9825BTQSm2smZfFTcaZvjJTl4gncBl5LRpUi9SBcDEWwlQ8M2B3RUxAVr6m2Z6OWO4' +
  'TlKZ9D7IRF47MUjRkF6ws'

describe("Update Registration Request module", () => {
  afterEach(() => {
    mockAxios.reset();
  });
  /*test('if renders correctly', () => {
    const wrapper = shallow(
      <Update/>);
    expect(wrapper).toMatchSnapshot()
  })
  test('if renders correctly again', () => {
    const wrapper = render(
      <I18nextProvider i18n={i18n}>
        <Update/>
      </I18nextProvider>
    )
    expect(wrapper).toMatchSnapshot()
  });*/
  test('if state renders correctly', () => {
    const wrapper = mount(
      <I18nextProvider i18n={i18n}>
        <Update kc={mockKcProps} {...mockMatchParams}/>
      </I18nextProvider>
    )
    let step1DataResponse = {
      data: {
        "imei_per_device": 1,
        "id": 8819,
        "reviewer_id": null,
        "imeis": [["11111111111111"]],
        "tracking_id": "b43fb560-a5fb-4be8-b94c-99e8746fe71b",
        "device_count": 1,
        "updated_at": "2018-12-19T07:01:18.132995+00:00",
        "report": "compliant_reportf30bf120-a299-4699-a92d-8f3ebc369dfc.tsv",
        "created_at": "2018-12-19T06:59:41.552066+00:00",
        "reviewer_name": null,
        "report_allowed": false,
        "processing_status_label": "Processed",
        "user_name": "drs importer user",
        "duplicate_imeis_file": null,
        "report_status_label": "Processed",
        "file": null,
        "status_label": "Pending Review",
        "m_location": "local",
        "user_id": "6ed9747b-d36a-4799-88c8-59d17a9abb5a"
      },
      status: 200
    }
    let sectionsResponse = {
      data: {
        "sections": [
          {
            "section_status": 6,
            "section_type": "device_quota",
            "comments": mockStep1Comments
          },
          {"section_status": 5, "section_type": "device_description", "comments": mockStep2Comments},
          {"section_status": 6, "section_type": "imei_classification", "comments": mockStep3Comments},
          {"section_status": 5, "section_type": "imei_registration", "comments": mockStep4Comments},
          {
            "section_status": 6,
            "section_type": "approval_documents",
            "comments": mockStep5Comments
          }
        ]
      },
      status: 200
    }

    //Mock API responses
    mockAxios.mockResponse(step1DataResponse)
    mockAxios.mockResponse(sectionsResponse)

    expect(wrapper.find('Update').state().step).toEqual(1)
    expect(wrapper.find('Update').state().stepReady).toBe(true)
    expect(wrapper.find('Update').state().statusLabel).toEqual('Pending Review')
    expect(wrapper.find('Update').state().id).toEqual(842)
    expect(wrapper.find('Update').state().hasReport).toEqual(false)
    expect(wrapper.find('Update').state().step1Comments).toEqual(step1comments)
    expect(wrapper.find('Update').state().step2Comments).toEqual(step2comments)
    expect(wrapper.find('Update').state().step3Comments).toEqual(step3comments)
  });
  describe('Step one registration', () => {
    afterEach(() => {
      mockAxios.reset();
    });
    test('if field values populated correctly', () => {
      const wrapper = mount(
        <I18nextProvider i18n={i18n}>
          <Update kc={mockKcProps} {...mockMatchParams}/>
        </I18nextProvider>
      )
      let step1DataResponse = {
        data: {
          "imei_per_device": 1,
          "id": 8819,
          "reviewer_id": null,
          "imeis": [["11111111111111"]],
          "tracking_id": "b43fb560-a5fb-4be8-b94c-99e8746fe71b",
          "device_count": 1,
          "updated_at": "2018-12-19T07:01:18.132995+00:00",
          "report": "compliant_reportf30bf120-a299-4699-a92d-8f3ebc369dfc.tsv",
          "created_at": "2018-12-19T06:59:41.552066+00:00",
          "reviewer_name": null,
          "processing_status_label": "Processed",
          "user_name": "drs importer user",
          "duplicate_imeis_file": null,
          "report_status_label": "Processed",
          "report_allowed": true,
          "file": null,
          "status_label": "Pending Review",
          "m_location": "local",
          "user_id": "6ed9747b-d36a-4799-88c8-59d17a9abb5a"
        },
        status: 200
      }
      let sectionsResponse = {
        data: {
          "sections": [
            {
              "section_status": 6,
              "section_type": "device_quota",
              "comments": mockStep1Comments
            },
            {"section_status": 5, "section_type": "device_description", "comments": mockStep2Comments},
            {"section_status": 6, "section_type": "imei_classification", "comments": mockStep3Comments},
            {"section_status": 5, "section_type": "imei_registration", "comments": mockStep4Comments},
            {
              "section_status": 6,
              "section_type": "approval_documents",
              "comments": mockStep5Comments
            }
          ]
        },
        status: 200
      }

      //Mock API responses
      mockAxios.mockResponse(step1DataResponse)
      mockAxios.mockResponse(sectionsResponse)
      wrapper.update()

      //Initial values
      expect(wrapper.find('Formik').props().initialValues.device_count).toEqual(1)
      expect(wrapper.find('Formik').props().initialValues.imei_per_device).toEqual(1)
      expect(wrapper.find('Formik').props().initialValues.device_imei).toEqual('webpage')
      expect(wrapper.find('Formik').props().initialValues.m_location).toEqual('local')
    });
    test('if Device count and number of IMEIs cannot be modified', () => {
      const wrapper = mount(
        <I18nextProvider i18n={i18n}>
          <Update kc={mockKcProps} {...mockMatchParams}/>
        </I18nextProvider>
      )
      let step1DataResponse = {
        data: {
          "imei_per_device": 1,
          "id": 8819,
          "reviewer_id": null,
          "imeis": [["11111111111111"]],
          "tracking_id": "b43fb560-a5fb-4be8-b94c-99e8746fe71b",
          "device_count": 1,
          "updated_at": "2018-12-19T07:01:18.132995+00:00",
          "report": "compliant_reportf30bf120-a299-4699-a92d-8f3ebc369dfc.tsv",
          "created_at": "2018-12-19T06:59:41.552066+00:00",
          "reviewer_name": null,
          "processing_status_label": "Processed",
          "user_name": "drs importer user",
          "duplicate_imeis_file": null,
          "report_status_label": "Processed",
          "report_allowed": true,
          "file": null,
          "status_label": "Pending Review",
          "m_location": "local",
          "user_id": "6ed9747b-d36a-4799-88c8-59d17a9abb5a"
        },
        status: 200
      }
      let sectionsResponse = {
        data: {
          "sections": [
            {"section_status": 6,"section_type": "device_quota","comments": mockStep1Comments},
            {"section_status": 5, "section_type": "device_description", "comments": mockStep2Comments},
            {"section_status": 6, "section_type": "imei_classification", "comments": mockStep3Comments},
            {"section_status": 5, "section_type": "imei_registration", "comments": mockStep4Comments},
            {"section_status": 6,"section_type": "approval_documents", "comments": mockStep5Comments}
          ]
        },
        status: 200
      }

      //Mock API responses
      mockAxios.mockResponse(step1DataResponse)
      mockAxios.mockResponse(sectionsResponse)
      wrapper.update()

      //If inputs are disabled
      expect(wrapper.find('Field').at(0).find('Input').props().disabled).toBe(true)
      expect(wrapper.find('Field').at(1).find('Input').props().disabled).toBe(true)
    });
    /*test('If downloads the report',()=>{
      const kcResource = {
        realm_access: {
          roles: ['uma_authorization', "drs_importer"]
        }
      }
      const wrapper = mount(
        <I18nextProvider i18n={i18n}>
          <Update kc={mockKcProps} {...mockMatchParams} resources={kcResource}/>
        </I18nextProvider>
      );
      let step1DataResponse = {
        data: {
          "imei_per_device": 1,
          "id": 8819,
          "reviewer_id": null,
          "imeis": [["11111111111111"]],
          "tracking_id": "b43fb560-a5fb-4be8-b94c-99e8746fe71b",
          "device_count": 1,
          "updated_at": "2018-12-19T07:01:18.132995+00:00",
          "report": "compliant_reportf30bf120-a299-4699-a92d-8f3ebc369dfc.tsv",
          "created_at": "2018-12-19T06:59:41.552066+00:00",
          "reviewer_name": null,
          "processing_status_label": "Processed",
          "user_name": "drs importer user",
          "duplicate_imeis_file": null,
          "report_status_label": "Processed",
          "report_allowed": true,
          "file": null,
          "status_label": "Pending Review",
          "m_location": "local",
          "user_id": "6ed9747b-d36a-4799-88c8-59d17a9abb5a"
        },
        status: 200
      }
      let sectionsResponse = {
        data: {
          "sections": [
            {
              "section_status": 6,
              "section_type": "device_quota",
              "comments": mockStep1Comments
            },
            {"section_status": 5, "section_type": "device_description", "comments": mockStep2Comments},
            {"section_status": 6, "section_type": "imei_classification", "comments": mockStep3Comments},
            {"section_status": 5, "section_type": "imei_registration", "comments": mockStep4Comments},
            {
              "section_status": 6,
              "section_type": "approval_documents",
              "comments": mockStep5Comments
            }
          ]
        },
        status: 200
      }

      //Mock API responses
      mockAxios.mockResponse(step1DataResponse);
      mockAxios.mockResponse(sectionsResponse);
      wrapper.update();

      //Test
      expect(wrapper.find('.samplefile').length).toEqual(0)

      //Download Report
      wrapper.find('.samplefile').find('button').simulate('click')

      //API call
      let downloadResponse = {
        data: "Demo text response",
        status: 200
      }

      //Mock API responses
      mockAxios.mockResponse(downloadResponse);
      // console.log(wrapper.debug())

      //Text
      expect(FileSaver.saveAs).toBeCalled()
    })*/
    test('if progress to next step when no changes done', () => {
      const wrapper = mount(
        <I18nextProvider i18n={i18n}>
          <Update kc={mockKcProps} {...mockMatchParams}/>
        </I18nextProvider>
      )
      let step1DataResponse = {
        data: {
          "imei_per_device": 1,
          "id": 8819,
          "reviewer_id": null,
          "imeis": [["11111111111111"]],
          "tracking_id": "b43fb560-a5fb-4be8-b94c-99e8746fe71b",
          "device_count": 1,
          "updated_at": "2018-12-19T07:01:18.132995+00:00",
          "report": "compliant_reportf30bf120-a299-4699-a92d-8f3ebc369dfc.tsv",
          "created_at": "2018-12-19T06:59:41.552066+00:00",
          "reviewer_name": null,
          "processing_status_label": "Processed",
          "user_name": "drs importer user",
          "duplicate_imeis_file": null,
          "report_status_label": "Processed",
          "report_allowed": true,
          "file": null,
          "status_label": "Pending Review",
          "m_location": "local",
          "user_id": "6ed9747b-d36a-4799-88c8-59d17a9abb5a"
        },
        status: 200
      }
      let sectionsResponse = {
        data: {
          "sections": [
            {
              "section_status": 6,
              "section_type": "device_quota",
              "comments": mockStep1Comments
            },
            {"section_status": 5, "section_type": "device_description", "comments": mockStep2Comments},
            {"section_status": 6, "section_type": "imei_classification", "comments": mockStep3Comments},
            {"section_status": 5, "section_type": "imei_registration", "comments": mockStep4Comments},
            {
              "section_status": 6,
              "section_type": "approval_documents",
              "comments": mockStep5Comments
            }
          ]
        },
        status: 200
      }

      //Mock API responses
      mockAxios.mockResponse(step1DataResponse)
      mockAxios.mockResponse(sectionsResponse)
      wrapper.update()

      let jumpToNextBtn = wrapper.find('button').last()
      jumpToNextBtn.simulate('click')

      let step2DataResponse = {
        data: {
          "technologies": ["2G"],
          "id": "2355",
          "model_num": "30jjd",
          "device_type": "Smartphone",
          "model_name": "Iam model",
          "reg_details_id": 8819,
          "brand": "test",
          "operating_system": "Android"
        },
        status: 200
      }
      mockAxios.mockResponse(step2DataResponse)

      expect(wrapper.find('Update').state().step).toEqual(2)
      expect(wrapper.find('Update').state().anySectionChange).toBe(false)
    });
    test('if progress to next step when changes done', () => {
      const wrapper = mount(
        <I18nextProvider i18n={i18n}>
          <Update kc={mockKcProps} {...mockMatchParams}/>
        </I18nextProvider>
      )
      let step1DataResponse = {
        data: {
          "imei_per_device": 1,
          "id": 8819,
          "reviewer_id": null,
          "imeis": [["11111111111111"]],
          "tracking_id": "b43fb560-a5fb-4be8-b94c-99e8746fe71b",
          "device_count": 1,
          "updated_at": "2018-12-19T07:01:18.132995+00:00",
          "report": "compliant_reportf30bf120-a299-4699-a92d-8f3ebc369dfc.tsv",
          "created_at": "2018-12-19T06:59:41.552066+00:00",
          "reviewer_name": null,
          "processing_status_label": "Processed",
          "user_name": "drs importer user",
          "duplicate_imeis_file": null,
          "report_status_label": "Processed",
          "report_allowed": true,
          "file": null,
          "status_label": "Pending Review",
          "m_location": "local",
          "user_id": "6ed9747b-d36a-4799-88c8-59d17a9abb5a"
        },
        status: 200
      }
      let sectionsResponse = {
        data: {
          "sections": [
            {
              "section_status": 6,
              "section_type": "device_quota",
              "comments": mockStep1Comments
            },
            {"section_status": 5, "section_type": "device_description", "comments": mockStep2Comments},
            {"section_status": 6, "section_type": "imei_classification", "comments": mockStep3Comments},
            {"section_status": 5, "section_type": "imei_registration", "comments": mockStep4Comments},
            {
              "section_status": 6,
              "section_type": "approval_documents",
              "comments": mockStep5Comments
            }
          ]
        },
        status: 200
      }

      //Mock API responses
      mockAxios.mockResponse(step1DataResponse)
      mockAxios.mockResponse(sectionsResponse)
      wrapper.update()
/*
      //Delete device to enable inputs
      wrapper.find('button').at(0).simulate('click')
      wrapper.update()
      //Add device
      wrapper.find('button').at(0).simulate('click')*/
      /*wrapper.find('Field').at(0).find('Input').simulate('change', {
        target: {
          name: 'devices.0.imeis.0.imei',
          value: 11111111111111
        }
      })
      wrapper.find('Field').at(1).find('Input').simulate('change', {
        target: {
          name: 'devices.0.imeis.0.reImei',
          value: 11111111111111
        }
      })*/
      /*console.log(wrapper.find('select').find({name:'m_location'}).debug())
      console.log(wrapper.find('Formik').state())*/
      wrapper.find('select').find({name:'m_location'}).simulate('change',{
        target : {
          name: 'm_location',
          value:'local'
        }
      })
      // console.log(wrapper.find('Formik').state())
      wrapper.find('form').simulate('submit')
      wrapper.update()
      let updateStepResponse = {
        data: {
          "imei_per_device": 1,
          "id": "8819",
          "reviewer_id": null,
          "imeis": [["11111111111111"]],
          "tracking_id": "b43fb560-a5fb-4be8-b94c-99e8746fe71b",
          "device_count": 1,
          "updated_at": "2018-12-19T11:58:01.232596+00:00",
          "created_at": "2018-12-19T06:59:41.552066+00:00",
          "reviewer_name": null,
          "processing_status_label": "New Request",
          "user_name": "drs importer user",
          "duplicate_imeis_file": null,
          "report_status_label": "New Request",
          "file": null,
          "status_label": "Pending Review",
          "report_allowed": true,
          "m_location": "overseas",
          "user_id": "6ed9747b-d36a-4799-88c8-59d17a9abb5a"
        },
        status: 200
      }
      let step2DataResponse = {
        data: {
          "technologies": ["2G"],
          "id": "2355",
          "model_num": "30jjd",
          "device_type": "Smartphone",
          "model_name": "Iam model",
          "reg_details_id": 8819,
          "brand": "test",
          "operating_system": "Android"
        },
        status: 200
      }
      mockAxios.mockResponse(updateStepResponse)
      mockAxios.mockResponse(step2DataResponse)

      expect(wrapper.find('Update').state().step).toEqual(2)
      expect(wrapper.find('Update').state().loading).toBe(false)
      expect(wrapper.find('Update').state().anySectionChange).toBe(true)
    });
    test('if validations runs correctly for IMEI', () => {
      const wrapper = mount(
        <I18nextProvider i18n={i18n}>
          <Update kc={mockKcProps} {...mockMatchParamsNewRequest}/>
        </I18nextProvider>
      )
      let step1DataResponse = {
        data: {
          "imei_per_device": 1,
          "id": 8819,
          "reviewer_id": null,
          "imeis": [["11111111111111"]],
          "tracking_id": "b43fb560-a5fb-4be8-b94c-99e8746fe71b",
          "device_count": 1,
          "updated_at": "2018-12-19T07:01:18.132995+00:00",
          "report": "compliant_reportf30bf120-a299-4699-a92d-8f3ebc369dfc.tsv",
          "created_at": "2018-12-19T06:59:41.552066+00:00",
          "reviewer_name": null,
          "processing_status_label": "Processed",
          "user_name": "drs importer user",
          "duplicate_imeis_file": null,
          "report_status_label": "Processed",
          "report_allowed": true,
          "file": null,
          "status_label": "Pending Review",
          "m_location": "local",
          "user_id": "6ed9747b-d36a-4799-88c8-59d17a9abb5a"
        },
        status: 200
      }
      let sectionsResponse = {
        data: {
          "sections": [
            {
              "section_status": 6,
              "section_type": "device_quota",
              "comments": mockStep1Comments
            },
            {"section_status": 5, "section_type": "device_description", "comments": mockStep2Comments},
            {"section_status": 6, "section_type": "imei_classification", "comments": mockStep3Comments},
            {"section_status": 5, "section_type": "imei_registration", "comments": mockStep4Comments},
            {
              "section_status": 6,
              "section_type": "approval_documents",
              "comments": mockStep5Comments
            }
          ]
        },
        status: 200
      }

      //Mock API responses
      mockAxios.mockResponse(step1DataResponse)
      mockAxios.mockResponse(sectionsResponse)
      wrapper.update()

      //Delete device to enable inputs
      wrapper.find('button').at(0).simulate('click')
      wrapper.update()

      //Add device
      wrapper.find('button').at(0).simulate('click')
      // console.log(wrapper.find('Field').at(0).find('Input').debug())

      wrapper.find('Field').at(0).find('Input').simulate('change', {
        target: {
          name: 'devices.0.imeis.0.imei',
          value: 'abc'
        }
      })
      wrapper.find('Field').at(1).find('Input').simulate('change', {
        target: {
          name: 'devices.0.imeis.0.reImei',
          value: 'abc'
        }
      })

      wrapper.find('form').simulate('submit')
      wrapper.update()

      expect(wrapper.find('Formik').state().errors.devices[0].imeis[0].imei).toEqual('IMEI Must be digit characters')
      expect(wrapper.find('Formik').state().errors.devices[0].imeis[0].reImei).toEqual('Retype IMEI Must be digit characters')

      //Delete device to enable inputs
      wrapper.find('button').at(0).simulate('click')
      wrapper.update()

      //Add device
      wrapper.find('button').at(0).simulate('click')
      // console.log(wrapper.find('Field').at(0).find('Input').debug())

      wrapper.find('Field').at(0).find('Input').simulate('change', {
        target: {
          name: 'devices.0.imeis.0.imei',
          value: ''
        }
      })
      wrapper.find('Field').at(1).find('Input').simulate('change', {
        target: {
          name: 'devices.0.imeis.0.reImei',
          value: ''
        }
      })

      wrapper.find('form').simulate('submit')
      wrapper.update()

      expect(wrapper.find('Formik').state().errors.devices[0].imeis[0].imei).toEqual('This field is required')
      expect(wrapper.find('Formik').state().errors.devices[0].imeis[0].reImei).toEqual('This field is required')

      //Delete device to enable inputs
      wrapper.find('button').at(0).simulate('click')
      wrapper.update()

      //Add device
      wrapper.find('button').at(0).simulate('click')
      // console.log(wrapper.find('Field').at(0).find('Input').debug())

      wrapper.find('Field').at(0).find('Input').simulate('change', {
        target: {
          name: 'devices.0.imeis.0.imei',
          value: '1234567890'
        }
      })
      wrapper.find('Field').at(1).find('Input').simulate('change', {
        target: {
          name: 'devices.0.imeis.0.reImei',
          value: '1234567890'
        }
      })

      wrapper.find('form').simulate('submit')
      wrapper.update()

      expect(wrapper.find('Formik').state().errors.devices[0].imeis[0].imei).toEqual('IMEI must consist of 14 to 16 digit characters')
      expect(wrapper.find('Formik').state().errors.devices[0].imeis[0].reImei).toEqual('Retype IMEI must consist of 14 to 16 digit characters')
    })
    test('if validations runs correctly for IMEI', () => {
      const wrapper = mount(
        <I18nextProvider i18n={i18n}>
          <Update kc={mockKcProps} {...mockMatchParamsNewRequest}/>
        </I18nextProvider>
      )
      let step1DataResponse = {
        data: {
          "imei_per_device": 1,
          "id": 8819,
          "reviewer_id": null,
          "imeis": [["11111111111111"]],
          "tracking_id": "b43fb560-a5fb-4be8-b94c-99e8746fe71b",
          "device_count": 1,
          "updated_at": "2018-12-19T07:01:18.132995+00:00",
          "report": "compliant_reportf30bf120-a299-4699-a92d-8f3ebc369dfc.tsv",
          "created_at": "2018-12-19T06:59:41.552066+00:00",
          "reviewer_name": null,
          "processing_status_label": "Processed",
          "user_name": "drs importer user",
          "duplicate_imeis_file": null,
          "report_status_label": "Processed",
          "report_allowed": true,
          "file": null,
          "status_label": "Pending Review",
          "m_location": "local",
          "user_id": "6ed9747b-d36a-4799-88c8-59d17a9abb5a"
        },
        status: 200
      }
      let sectionsResponse = {
        data: {
          "sections": [
            {
              "section_status": 6,
              "section_type": "device_quota",
              "comments": mockStep1Comments
            },
            {"section_status": 5, "section_type": "device_description", "comments": mockStep2Comments},
            {"section_status": 6, "section_type": "imei_classification", "comments": mockStep3Comments},
            {"section_status": 5, "section_type": "imei_registration", "comments": mockStep4Comments},
            {
              "section_status": 6,
              "section_type": "approval_documents",
              "comments": mockStep5Comments
            }
          ]
        },
        status: 200
      }

      //Mock API responses
      mockAxios.mockResponse(step1DataResponse)
      mockAxios.mockResponse(sectionsResponse)
      wrapper.update()

      //Delete device to enable inputs
      wrapper.find('button').at(0).simulate('click')
      wrapper.update()

      let DeviceCountInput = wrapper.find('Input').at(0)
      let ImeiInput;
      let location = wrapper.find('select')

      //Add values to inputs
      location.simulate('change', {
        target: {
          name: 'm_location',
          value: ''
        }
      })

      DeviceCountInput.simulate('change', {
        target: {
          name: "device_count",
          value: ''
        }
      })
      wrapper.update()

      let form = wrapper.find('Form')
      form.simulate('submit')

      expect(wrapper.find('Formik').state().errors.imeis_count).toEqual('Your Device(s) must be equal to Device Count')
      expect(wrapper.find('Formik').state().errors.m_location).toEqual('This field is required')

      wrapper.update()
      DeviceCountInput = wrapper.find('Input').at(0)
      ImeiInput = wrapper.find('Input').at(1)

      DeviceCountInput.simulate('change', {
        target: {
          name: "device_count",
          value: 'abc'
        }
      })
      ImeiInput.simulate('change', {
        target: {
          name: "imei_per_device",
          value: 'abc'
        }
      })
      wrapper.update()

      form = wrapper.find('Form')
      form.simulate('submit')

      expect(wrapper.find('Formik').state().errors.device_count).toEqual('Must be a number')
      expect(wrapper.find('Formik').state().errors.imei_per_device).toEqual('Must be a number')
      wrapper.update()

      DeviceCountInput = wrapper.find('Input').at(0)
      ImeiInput = wrapper.find('Input').at(1)

      DeviceCountInput.simulate('change', {
        target: {
          name: "device_count",
          value: '0'
        }
      })
      ImeiInput.simulate('change', {
        target: {
          name: "imei_per_device",
          value: '0'
        }
      })
      wrapper.update()

      form = wrapper.find('Form')
      form.simulate('submit')

      expect(wrapper.find('Formik').state().errors.device_count).toEqual('Must be in between 1-10')
      expect(wrapper.find('Formik').state().errors.imei_per_device).toEqual('Must be in between 1-5')
    })
  })
  describe('Step two registration', () => {
    afterEach(() => {
      mockAxios.reset();
    });
    test('if progress to next step when no changes done', () => {
      let mockStatus = 'Approved'
      const wrapper = mount(
        <I18nextProvider i18n={i18n}>
          <Update kc={mockKcProps} {...mockMatchParams}/>
        </I18nextProvider>
      )
      let step1DataResponse = {
        data: {
          "imei_per_device": 1,
          "id": 8819,
          "reviewer_id": null,
          "imeis": [["11111111111111"]],
          "tracking_id": "b43fb560-a5fb-4be8-b94c-99e8746fe71b",
          "device_count": 1,
          "updated_at": "2018-12-19T07:01:18.132995+00:00",
          "report": "compliant_reportf30bf120-a299-4699-a92d-8f3ebc369dfc.tsv",
          "created_at": "2018-12-19T06:59:41.552066+00:00",
          "reviewer_name": null,
          "processing_status_label": "Processed",
          "user_name": "drs importer user",
          "duplicate_imeis_file": null,
          "report_status_label": "Processed",
          "report_allowed": true,
          "file": null,
          "status_label": "Pending Review",
          "m_location": "local",
          "user_id": "6ed9747b-d36a-4799-88c8-59d17a9abb5a"
        },
        status: 200
      }
      let sectionsResponse = {
        data: {
          "sections": [
            {
              "section_status": 6,
              "section_type": "device_quota",
              "comments": mockStep1Comments
            },
            {"section_status": 5, "section_type": "device_description", "comments": mockStep2Comments},
            {"section_status": 6, "section_type": "imei_classification", "comments": mockStep3Comments},
            {"section_status": 5, "section_type": "imei_registration", "comments": mockStep4Comments},
            {
              "section_status": 6,
              "section_type": "approval_documents",
              "comments": mockStep5Comments
            }
          ]
        },
        status: 200
      }

      //Mock API responses
      mockAxios.mockResponse(step1DataResponse)
      mockAxios.mockResponse(sectionsResponse)
      wrapper.update()

      let jumpToNextBtn = wrapper.find('button').last()
      jumpToNextBtn.simulate('click')

      let step2DataResponse = {
        data: {
          "technologies": ["2G"],
          "id": "2355",
          "model_num": "30jjd",
          "device_type": "Smartphone",
          "model_name": "Iam model",
          "reg_details_id": 8819,
          "brand": "test",
          "operating_system": "Android"
        },
        status: 200
      }
      mockAxios.mockResponse(step2DataResponse)

      expect(wrapper.find('Update').state().step).toEqual(2)
      expect(wrapper.find('Update').state().anySectionChange).toBe(false)

      wrapper.update()
      jumpToNextBtn = wrapper.find('button').last()
      jumpToNextBtn.simulate('click')

      let documentsResponse = {
        data: [{
          "id": 6695,
          "filename": "20181219070059_Screen Shot 2018-12-18 at 10.07.08.png",
          "link": "/var/www/html/dirbs_intl_drs/uploads/b43fb560-a5fb-4be8-b94c-99e8746fe71b/20181219070059_Screen Shot 2018-12-18 at 10.07.08.png",
          "label": "shipment document",
          "required": true,
          "reg_details_id": 8819,
          "document_id": 1
        }, {
          "id": 6696,
          "filename": "20181219070059_Screen Shot 2018-12-17 at 17.13.02.png",
          "link": "/var/www/html/dirbs_intl_drs/uploads/b43fb560-a5fb-4be8-b94c-99e8746fe71b/20181219070059_Screen Shot 2018-12-17 at 17.13.02.png",
          "label": "authorization document",
          "required": true,
          "reg_details_id": 8819,
          "document_id": 2
        }, {
          "id": 6697,
          "filename": "20181219070059_Screen Shot 2018-12-17 at 11.46.57.png",
          "link": "/var/www/html/dirbs_intl_drs/uploads/b43fb560-a5fb-4be8-b94c-99e8746fe71b/20181219070059_Screen Shot 2018-12-17 at 11.46.57.png",
          "label": "certificate document",
          "required": true,
          "reg_details_id": 8819,
          "document_id": 3
        }],
        status: 200
      }
      mockAxios.mockResponse(documentsResponse)

      expect(wrapper.find('Update').state().step).toEqual(3)
      expect(wrapper.find('Update').state().anySectionChange).toBe(false)
    });
    test('if all validation run correctly',()=>{
      const wrapper = mount(
        <I18nextProvider i18n={i18n}>
          <Update kc={mockKcProps} {...mockMatchParams}/>
        </I18nextProvider>
      )
      let step1DataResponse = {
        data: {
          "imei_per_device": 1,
          "id": 8819,
          "reviewer_id": null,
          "imeis": [["11111111111111"]],
          "tracking_id": "b43fb560-a5fb-4be8-b94c-99e8746fe71b",
          "device_count": 1,
          "updated_at": "2018-12-19T07:01:18.132995+00:00",
          "report": "compliant_reportf30bf120-a299-4699-a92d-8f3ebc369dfc.tsv",
          "created_at": "2018-12-19T06:59:41.552066+00:00",
          "reviewer_name": null,
          "processing_status_label": "Processed",
          "user_name": "drs importer user",
          "duplicate_imeis_file": null,
          "report_status_label": "Processed",
          "file": null,
          "status_label": "Pending Review",
          "m_location": "local",
          "user_id": "6ed9747b-d36a-4799-88c8-59d17a9abb5a"
        },
        status: 200
      }
      let sectionsResponse = {
        data: {
          "sections": [
            {
              "section_status": 6,
              "section_type": "device_quota",
              "comments": mockStep1Comments
            },
            {"section_status": 5, "section_type": "device_description", "comments": mockStep2Comments},
            {"section_status": 6, "section_type": "imei_classification", "comments": mockStep3Comments},
            {"section_status": 5, "section_type": "imei_registration", "comments": mockStep4Comments},
            {
              "section_status": 6,
              "section_type": "approval_documents",
              "comments": mockStep5Comments
            }
          ]
        },
        status: 200
      }

      //Mock API responses
      mockAxios.mockResponse(step1DataResponse)
      mockAxios.mockResponse(sectionsResponse)
      wrapper.update()

      //Jump to step2
      let jumpToNextBtn = wrapper.find('button').last()
      jumpToNextBtn.simulate('click')

      let step2DataResponse = {
        data: {
          "technologies": ["2G"],
          "id": "2355",
          "model_num": "30jjd",
          "device_type": "Smartphone",
          "model_name": "Iam model",
          "reg_details_id": 8819,
          "brand": "test",
          "operating_system": "Android"
        },
        status: 200
      }
      mockAxios.mockResponse(step2DataResponse)
      wrapper.update()

      //Step2 tests
      //Brand
      let brandInput = wrapper.find('Field').at(0).find('input')
      brandInput.simulate('change', {
        target: {
          name: 'brand',
          value: ''
        }
      })

      //Model name
      let modelName = wrapper.find('Field').at(1).find('input')
      modelName.simulate('change', {
        target: {
          name: 'model_name',
          value: ''
        }
      })

      //Model number
      let modelNum = wrapper.find('Field').at(2).find('input')
      modelNum.simulate('change', {
        target: {
          name: 'model_num',
          value: ''
        }
      })

      //Device type
      let deviceType = wrapper.find('Field').at(3).find('select')
      deviceType.simulate('change', {
        target: {
          name: 'device_type',
          value: ''
        }
      })

      //Operating system
      let operatingSystem = wrapper.find('Field').at(5).find('input')
      operatingSystem.simulate('change', {
        target: {
          name: 'operating_system',
          value: ''
        }
      })

      //Technologies
      let technologies = wrapper.find('FieldArray').find('input')
      technologies.simulate('change', {
        target: {
          name: 'technologies',
          checked: false
        }
      })

      // console.log(wrapper.find('Formik').state())
      //Empty submit validation
      expect(wrapper.find('Formik').state().errors.brand).toEqual('This field is required')
      expect(wrapper.find('Formik').state().errors.model_name).toEqual('This field is required')
      expect(wrapper.find('Formik').state().errors.model_num).toEqual('This field is required')
      expect(wrapper.find('Formik').state().errors.device_type).toEqual('This field is required')
      expect(wrapper.find('Formik').state().errors.operating_system).toEqual('This field is required')
      expect(wrapper.find('Formik').state().errors.technologies).toEqual('Please select at least one option')

      //Brand
      brandInput = wrapper.find('Field').at(0).find('input')
      brandInput.simulate('change', {
        target: {
          name: 'brand',
          value: mockInvalidInput
        }
      })

      //Model name
      modelName = wrapper.find('Field').at(1).find('input')
      modelName.simulate('change', {
        target: {
          name: 'model_name',
          value: mockInvalidInput
        }
      })

      //Model number
      modelNum = wrapper.find('Field').at(2).find('input')
      modelNum.simulate('change', {
        target: {
          name: 'model_num',
          value: mockInvalidInput
        }
      })

      //Operating system
      operatingSystem = wrapper.find('Field').at(5).find('input')
      operatingSystem.simulate('change', {
        target: {
          name: 'operating_system',
          value: mockInvalidInput
        }
      })

      //Max characters validations
      expect(wrapper.find('Formik').state().errors.brand).toEqual('Must be 1000 characters or less')
      expect(wrapper.find('Formik').state().errors.model_name).toEqual('Must be 1000 characters or less')
      expect(wrapper.find('Formik').state().errors.model_num).toEqual('Must be 1000 characters or less')
      expect(wrapper.find('Formik').state().errors.operating_system).toEqual('Must be 1000 characters or less')
    })
    test('if save step and progress to next',()=>{
      let documentsResponse = {
        data: [{
          "id": 6695,
          "filename": "20181219070059_Screen Shot 2018-12-18 at 10.07.08.png",
          "link": "/var/www/html/dirbs_intl_drs/uploads/b43fb560-a5fb-4be8-b94c-99e8746fe71b/20181219070059_Screen Shot 2018-12-18 at 10.07.08.png",
          "label": "shipment document",
          "required": true,
          "reg_details_id": 8819,
          "document_id": 1
        }, {
          "id": 6696,
          "filename": "20181219070059_Screen Shot 2018-12-17 at 17.13.02.png",
          "link": "/var/www/html/dirbs_intl_drs/uploads/b43fb560-a5fb-4be8-b94c-99e8746fe71b/20181219070059_Screen Shot 2018-12-17 at 17.13.02.png",
          "label": "authorization document",
          "required": true,
          "reg_details_id": 8819,
          "document_id": 2
        }, {
          "id": 6697,
          "filename": "20181219070059_Screen Shot 2018-12-17 at 11.46.57.png",
          "link": "/var/www/html/dirbs_intl_drs/uploads/b43fb560-a5fb-4be8-b94c-99e8746fe71b/20181219070059_Screen Shot 2018-12-17 at 11.46.57.png",
          "label": "certificate document",
          "required": true,
          "reg_details_id": 8819,
          "document_id": 3
        }],
        status: 200
      }
      let mockRegDetails = {
        "technologies": ["2G"],
        "id": "2350",
        "model_num": "30jjd",
        "device_type": "Smartphone",
        "model_name": "Iam model",
        "reg_details_id": 8814,
        "brand": "test",
        "operating_system": "Android"
      }
      //Mock input values
      let mockBrand = 'Samsung'
      let mockModelName = 'Samsung note'
      let mockModelNum = 'note 9'
      let mockOperatingSystem = 'Android'

      const wrapper = mount(
        <I18nextProvider i18n={i18n}>
          <Update kc={mockKcProps} {...mockMatchParams}/>
        </I18nextProvider>
      )
      let step1DataResponse = {
        data: {
          "imei_per_device": 1,
          "id": 8819,
          "reviewer_id": null,
          "imeis": [["11111111111111"]],
          "tracking_id": "b43fb560-a5fb-4be8-b94c-99e8746fe71b",
          "device_count": 1,
          "updated_at": "2018-12-19T07:01:18.132995+00:00",
          "report": "compliant_reportf30bf120-a299-4699-a92d-8f3ebc369dfc.tsv",
          "created_at": "2018-12-19T06:59:41.552066+00:00",
          "reviewer_name": null,
          "processing_status_label": "Processed",
          "user_name": "drs importer user",
          "duplicate_imeis_file": null,
          "report_status_label": "Processed",
          "file": null,
          "status_label": "Pending Review",
          "m_location": "local",
          "user_id": "6ed9747b-d36a-4799-88c8-59d17a9abb5a"
        },
        status: 200
      }
      let sectionsResponse = {
        data: {
          "sections": [
            {
              "section_status": 6,
              "section_type": "device_quota",
              "comments": mockStep1Comments
            },
            {"section_status": 5, "section_type": "device_description", "comments": mockStep2Comments},
            {"section_status": 6, "section_type": "imei_classification", "comments": mockStep3Comments},
            {"section_status": 5, "section_type": "imei_registration", "comments": mockStep4Comments},
            {
              "section_status": 6,
              "section_type": "approval_documents",
              "comments": mockStep5Comments
            }
          ]
        },
        status: 200
      }

      //Mock API responses
      mockAxios.mockResponse(step1DataResponse)
      mockAxios.mockResponse(sectionsResponse)
      wrapper.update()

      //Jump to step2
      let jumpToNextBtn = wrapper.find('button').last()
      jumpToNextBtn.simulate('click')

      let step2DataResponse = {
        data: {
          technologies: ["2G"],
          id: "2355",
          model_num: "30jjd",
          device_type: "Smartphone",
          model_name: "Iam model",
          reg_details_id: 8819,
          brand: "test",
          operating_system: "Android"
        },
        status: 200
      }
      mockAxios.mockResponse(step2DataResponse)
      wrapper.update()

      //Changing inputs in step2
      let brandInput = wrapper.find('Field').at(0).find('input')
      brandInput.simulate('change', {
        target: {
          name: 'brand',
          value: mockBrand
        }
      })
      let modelName = wrapper.find('Field').at(1).find('input')
      modelName.simulate('change', {
        target: {
          name: 'model_name',
          value: mockModelName
        }
      })

      let modelNum = wrapper.find('Field').at(2).find('input')
      modelNum.simulate('change', {
        target: {
          name: 'model_num',
          value: mockModelNum
        }
      })

      let deviceType = wrapper.find('Field').at(3).find('select')
      deviceType.simulate('change', {
        target: {
          name: 'device_type',
          value: 'Smartphone'
        }
      })

      let operatingSystem = wrapper.find('Field').at(5).find('input')
      operatingSystem.simulate('change', {
        target: {
          name: 'operating_system',
          value: mockOperatingSystem
        }
      })

      let technologies = wrapper.find('FieldArray').find('input')
      technologies.simulate('change', {
        target: {
          name: 'technologies',
          checked: true
        }
      })

      let formStep2 = wrapper.find('Form')
      formStep2.simulate('submit')
      wrapper.update()

      let saveStep2 = {
        data: mockRegDetails,
        status: 200
      }
      mockAxios.mockResponse(saveStep2)
      mockAxios.mockResponse(documentsResponse)

      expect(wrapper.find('Update').state().step).toEqual(3)
      expect(wrapper.find('Update').state().anySectionChange).toBe(true)
      expect(wrapper.find('Update').state().stepReady).toBe(true)
      expect(wrapper.find('Update').state().loading).toBe(false)
    })
  })
  describe('Step three registration', () => {
    afterEach(() => {
      mockAxios.reset();
    });
    test('if progress to next step when no changes done', () => {
      let spy = Sinon.spy()
      const historyMock = {push: spy};
      const wrapper = mount(
        <I18nextProvider i18n={i18n}>
          <Update kc={mockKcProps} {...mockMatchParams} history={historyMock}/>
        </I18nextProvider>
      )
      let step1DataResponse = {
        data: {
          "imei_per_device": 1,
          "id": 8819,
          "reviewer_id": null,
          "imeis": [["11111111111111"]],
          "tracking_id": "b43fb560-a5fb-4be8-b94c-99e8746fe71b",
          "device_count": 1,
          "updated_at": "2018-12-19T07:01:18.132995+00:00",
          "report": "compliant_reportf30bf120-a299-4699-a92d-8f3ebc369dfc.tsv",
          "created_at": "2018-12-19T06:59:41.552066+00:00",
          "reviewer_name": null,
          "processing_status_label": "Processed",
          "user_name": "drs importer user",
          "duplicate_imeis_file": null,
          "report_status_label": "Processed",
          "file": null,
          "status_label": "Pending Review",
          "m_location": "local",
          "user_id": "6ed9747b-d36a-4799-88c8-59d17a9abb5a"
        },
        status: 200
      }
      let sectionsResponse = {
        data: {
          "sections": [
            {
              "section_status": 6,
              "section_type": "device_quota",
              "comments": mockStep1Comments
            },
            {"section_status": 5, "section_type": "device_description", "comments": mockStep2Comments},
            {"section_status": 6, "section_type": "imei_classification", "comments": mockStep3Comments},
            {"section_status": 5, "section_type": "imei_registration", "comments": mockStep4Comments},
            {
              "section_status": 6,
              "section_type": "approval_documents",
              "comments": mockStep5Comments
            }
          ]
        },
        status: 200
      }

      //Mock API responses
      mockAxios.mockResponse(step1DataResponse)
      mockAxios.mockResponse(sectionsResponse)
      wrapper.update()

      let jumpToNextBtn = wrapper.find('button').last()
      jumpToNextBtn.simulate('click')

      let step2DataResponse = {
        data: {
          "technologies": ["2G"],
          "id": "2355",
          "model_num": "30jjd",
          "device_type": "Smartphone",
          "model_name": "Iam model",
          "reg_details_id": 8819,
          "brand": "test",
          "operating_system": "Android"
        },
        status: 200
      }
      mockAxios.mockResponse(step2DataResponse)

      expect(wrapper.find('Update').state().step).toEqual(2)
      expect(wrapper.find('Update').state().anySectionChange).toBe(false)

      wrapper.update()
      jumpToNextBtn = wrapper.find('button').last()
      jumpToNextBtn.simulate('click')

      let documentsResponse = {
        data: [{
          "id": 6695,
          "filename": "20181219070059_Screen Shot 2018-12-18 at 10.07.08.png",
          "link": "/var/www/html/dirbs_intl_drs/uploads/b43fb560-a5fb-4be8-b94c-99e8746fe71b/20181219070059_Screen Shot 2018-12-18 at 10.07.08.png",
          "label": "shipment document",
          "required": true,
          "reg_details_id": 8819,
          "document_id": 1
        }, {
          "id": 6696,
          "filename": "20181219070059_Screen Shot 2018-12-17 at 17.13.02.png",
          "link": "/var/www/html/dirbs_intl_drs/uploads/b43fb560-a5fb-4be8-b94c-99e8746fe71b/20181219070059_Screen Shot 2018-12-17 at 17.13.02.png",
          "label": "authorization document",
          "required": true,
          "reg_details_id": 8819,
          "document_id": 2
        }, {
          "id": 6697,
          "filename": "20181219070059_Screen Shot 2018-12-17 at 11.46.57.png",
          "link": "/var/www/html/dirbs_intl_drs/uploads/b43fb560-a5fb-4be8-b94c-99e8746fe71b/20181219070059_Screen Shot 2018-12-17 at 11.46.57.png",
          "label": "certificate document",
          "required": true,
          "reg_details_id": 8819,
          "document_id": 3
        }],
        status: 200
      }
      mockAxios.mockResponse(documentsResponse)

      expect(wrapper.find('Update').state().step).toEqual(3)
      expect(wrapper.find('Update').state().anySectionChange).toBe(false)

      wrapper.update()
      jumpToNextBtn = wrapper.find('button').last()
      jumpToNextBtn.simulate('click')

      expect(spy.calledOnce).toBe(true)
      expect(wrapper.find('Update').state().stepReady).toBe(true)
    });
    test('if save step and finish request', () => {
      let spy = Sinon.spy()
      const historyMock = {push: spy};
      const wrapper = mount(
        <I18nextProvider i18n={i18n}>
          <Update kc={mockKcProps} {...mockMatchParams} history={historyMock}/>
        </I18nextProvider>
      )
      let step1DataResponse = {
        data: {
          "imei_per_device": 1,
          "id": 8819,
          "reviewer_id": null,
          "imeis": [["11111111111111"]],
          "tracking_id": "b43fb560-a5fb-4be8-b94c-99e8746fe71b",
          "device_count": 1,
          "updated_at": "2018-12-19T07:01:18.132995+00:00",
          "report": "compliant_reportf30bf120-a299-4699-a92d-8f3ebc369dfc.tsv",
          "created_at": "2018-12-19T06:59:41.552066+00:00",
          "reviewer_name": null,
          "processing_status_label": "Processed",
          "user_name": "drs importer user",
          "duplicate_imeis_file": null,
          "report_status_label": "Processed",
          "file": null,
          "status_label": "Pending Review",
          "m_location": "local",
          "user_id": "6ed9747b-d36a-4799-88c8-59d17a9abb5a"
        },
        status: 200
      }
      let sectionsResponse = {
        data: {
          "sections": [
            {
              "section_status": 6,
              "section_type": "device_quota",
              "comments": mockStep1Comments
            },
            {"section_status": 5, "section_type": "device_description", "comments": mockStep2Comments},
            {"section_status": 6, "section_type": "imei_classification", "comments": mockStep3Comments},
            {"section_status": 5, "section_type": "imei_registration", "comments": mockStep4Comments},
            {
              "section_status": 6,
              "section_type": "approval_documents",
              "comments": mockStep5Comments
            }
          ]
        },
        status: 200
      }

      //Mock API responses
      mockAxios.mockResponse(step1DataResponse)
      mockAxios.mockResponse(sectionsResponse)
      wrapper.update()

      //Jump to step2
      let jumpToNextBtn = wrapper.find('button').last()
      jumpToNextBtn.simulate('click')

      let step2DataResponse = {
        data: {
          "technologies": ["2G"],
          "id": "2355",
          "model_num": "30jjd",
          "device_type": "Smartphone",
          "model_name": "Iam model",
          "reg_details_id": 8819,
          "brand": "test",
          "operating_system": "Android"
        },
        status: 200
      }
      mockAxios.mockResponse(step2DataResponse)
      wrapper.update()

      //Jump to step3
      jumpToNextBtn = wrapper.find('button').last()
      jumpToNextBtn.simulate('click')

      let documentsResponse = {
        data: [{
          "id": 6695,
          "filename": "20181219070059_Screen Shot 2018-12-18 at 10.07.08.png",
          "link": "/var/www/html/dirbs_intl_drs/uploads/b43fb560-a5fb-4be8-b94c-99e8746fe71b/20181219070059_Screen Shot 2018-12-18 at 10.07.08.png",
          "label": "shipment document",
          "required": true,
          "reg_details_id": 8819,
          "document_id": 4
        }, {
          "id": 6696,
          "filename": "20181219070059_Screen Shot 2018-12-17 at 17.13.02.png",
          "link": "/var/www/html/dirbs_intl_drs/uploads/b43fb560-a5fb-4be8-b94c-99e8746fe71b/20181219070059_Screen Shot 2018-12-17 at 17.13.02.png",
          "label": "authorization document",
          "required": true,
          "reg_details_id": 8819,
          "document_id": 5
        }, {
          "id": 6697,
          "filename": "20181219070059_Screen Shot 2018-12-17 at 11.46.57.png",
          "link": "/var/www/html/dirbs_intl_drs/uploads/b43fb560-a5fb-4be8-b94c-99e8746fe71b/20181219070059_Screen Shot 2018-12-17 at 11.46.57.png",
          "label": "certificate document",
          "required": true,
          "reg_details_id": 8819,
          "document_id": 6
        }],
        status: 200
      }
      mockAxios.mockResponse(documentsResponse)
      wrapper.update()

      //Delete Existing documents
      let deleteShippingDocumentBtn = wrapper.find('button').at(0)
      let deleteAuthDocumentBtn = wrapper.find('button').at(2)
      let deleteCertificateDocumentBtn = wrapper.find('button').at(4)

      deleteShippingDocumentBtn.simulate('click')
      deleteAuthDocumentBtn.simulate('click')
      deleteCertificateDocumentBtn.simulate('click')

      //STEP3 Tests
      wrapper.find('Formik').setState({
        values: {
          documents: [
            {
              name: 'test.png',
              size: 20000000
            },
            {
              name: 'test.png',
              size: 20000000
            },
            {
              name: 'test.png',
              size: 20000000
            }
          ]
        }
      })

      let step3Form = wrapper.find('form')
      step3Form.simulate('submit')

      let saveStep3 = {
        data: [{
          "id": 6695,
          "filename": "20181219070059_Screen Shot 2018-12-18 at 10.07.08.png",
          "link": "/var/www/html/dirbs_intl_drs/uploads/b43fb560-a5fb-4be8-b94c-99e8746fe71b/20181219070059_Screen Shot 2018-12-18 at 10.07.08.png",
          "label": "shipment document",
          "required": true,
          "reg_details_id": 8819,
          "document_id": 1
        }, {
          "id": 6696,
          "filename": "20181219070059_Screen Shot 2018-12-17 at 17.13.02.png",
          "link": "/var/www/html/dirbs_intl_drs/uploads/b43fb560-a5fb-4be8-b94c-99e8746fe71b/20181219070059_Screen Shot 2018-12-17 at 17.13.02.png",
          "label": "authorization document",
          "required": true,
          "reg_details_id": 8819,
          "document_id": 2
        }, {
          "id": 6697,
          "filename": "20181219070059_Screen Shot 2018-12-17 at 11.46.57.png",
          "link": "/var/www/html/dirbs_intl_drs/uploads/b43fb560-a5fb-4be8-b94c-99e8746fe71b/20181219070059_Screen Shot 2018-12-17 at 11.46.57.png",
          "label": "certificate document",
          "required": true,
          "reg_details_id": 8819,
          "document_id": 3
        }],
        status: 200
      }
      mockAxios.mockResponse(saveStep3)

      expect(spy.calledOnce).toBe(true)
      expect(wrapper.find('Update').state().anySectionChange).toBe(true)
      expect(wrapper.find('Update').state().stepReady).toBe(true)
    });
  })
})

