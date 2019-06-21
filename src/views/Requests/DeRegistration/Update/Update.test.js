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
import React from "react";
import Update from './Update';
import FileSaver from "file-saver";
import {I18nextProvider} from 'react-i18next';
import i18n from '../../../../i18n';
import sinon from 'sinon';

import mockAxios from 'jest-mock-axios';
//Constants

import {
  DE_DOCUMENTS,
  EXTENSIONS
} from "../../../../utilities/constants";
//Mock comments
const mockStep1Comments = [{
  "user_id": "e5d58da7-a7af-4661-8c04-0f80eda3922e",
  "user_name": "drs exporter user",
  "comment": "Device Quota Section",
  "datetime": "2018-11-22T07:18:05.658390+00:00"
}]
const mockStep2Comments = [{
  "user_id": "e5d58da7-a7af-4661-8c04-0f80eda3922e",
  "user_name": "drs exporter user",
  "comment": "Device Description Section",
  "datetime": "2018-11-22T07:18:05.658390+00:00"
}]
const mockStep3Comments = [{
  "user_id": "e5d58da7-a7af-4661-8c04-0f80eda3922e",
  "user_name": "drs exporter user",
  "comment": "IMEI Classification Section",
  "datetime": "2018-11-22T07:18:05.658390+00:00"
}]
const mockStep4Comments = [{
  "user_id": "e5d58da7-a7af-4661-8c04-0f80eda3922e",
  "user_name": "drs exporter user",
  "comment": "IMEI Registration Section",
  "datetime": "2018-11-22T07:18:05.658390+00:00"
}]
const mockStep5Comments = [{
  "user_id": "e5d58da7-a7af-4661-8c04-0f80eda3922e",
  "user_name": "drs exporter user",
  "comment": "Approval Documents Section",
  "datetime": "2018-11-22T07:18:05.658390+00:00"
}]

const step1Comments = [
  {
    user_id: 'e5d58da7-a7af-4661-8c04-0f80eda3922e',
    user_name: 'drs exporter user',
    comment: 'IMEI Classification Section',
    datetime: '2018-11-22T07:18:05.658390+00:00'
  },
  {
    user_id: 'e5d58da7-a7af-4661-8c04-0f80eda3922e',
    user_name: 'drs exporter user',
    comment: 'IMEI Registration Section',
    datetime: '2018-11-22T07:18:05.658390+00:00'
  }
]
const step2Comments = [
  {
    user_id: 'e5d58da7-a7af-4661-8c04-0f80eda3922e',
    user_name: 'drs exporter user',
    comment: 'Device Description Section',
    datetime: '2018-11-22T07:18:05.658390+00:00'
  }
]
const step3Comments = [
  {
    user_id: 'e5d58da7-a7af-4661-8c04-0f80eda3922e',
    user_name: 'drs exporter user',
    comment: 'Approval Documents Section',
    datetime: '2018-11-22T07:18:05.658390+00:00'
  }
]
//Mock constants
DE_DOCUMENTS.push({
  label: "shipment document",
  id: 4,
  required: true,
  type: 2
})
DE_DOCUMENTS.push({
  label: "authorization document",
  id: 5,
  required: true,
  type: 2
})

DE_DOCUMENTS.push({
  label: "certificate document",
  id: 6,
  required: true,
  type: 2
})
//Mock params
const mockMatchParamsDeRegistration = {
  match: {
    params: {
      id: "id",
    }
  }
}
const mockMatchParams = {
  match: {
    params: {
      id: 113,
    }
  }
}
//Mock File Saver
jest.mock('file-saver', ()=>({saveAs: jest.fn()}))
global.Blob = function (content, options){return  ({content, options})}
afterEach(() => {
  // cleaning up the mess left behind the previous test
  mockAxios.reset();
});

const mockInvalidCharacters = 'XsWcQSL9ohTM0iayfeRZ7jI5o3Vnb9MSS6dd1tnJrr5W3QqZL4zpfKZCNlLDDXuoXktYlx5DNKgQ2' +
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

let mockResponseObj = {
  "request": {
    "id": 114, 
    "reviewer_id": null, 
    "tracking_id": "06718b52-9d31-42a5-af76-c7ddb709c827", 
    "device_count": 1, 
    "report": null, 
    "file_link": "/var/www/html/dirbs_intl_drs/uploads/06718b52-9d31-42a5-af76-c7ddb709c827/deregister.txt", 
    "reviewer_name": null, 
    "processing_status_label": "New Request", 
    "status_label": "New Request", 
    "report_status_label": "New Request", 
    "reason": "test", 
    "file": "deregister.txt", 
    "user_name": "drs exporter user", 
    "invalid_imeis_file": null, 
    "user_id": "e5d58da7-a7af-4661-8c04-0f80eda3922e"
  }, 
  "devices": [
    {
      "model_num": "E5573Cs-322", 
      "count": 1, 
      "brand_name": "HUAWEI", 
      "tac": "86700903", 
      "technology": "NONE", 
      "operating_system": "N/A", 
      "device_type": "WLAN Router", 
      "model_name": "E5573Cs-322"
    }
  ]
}
let mockNoRegResponseObj = {
  "request": {
    "id": 4372, 
    "reviewer_id": null, 
    "tracking_id": "7b93112e-6df3-4bf9-90ea-761fa7241177", 
    "device_count": 1, 
    "report": null, 
    "file_link": "/var/www/html/dirbs_intl_drs/uploads/7b93112e-6df3-4bf9-90ea-761fa7241177/noregister.txt", 
    "reviewer_name": null, 
    "processing_status_label": "New Request", 
    "status_label": "New Request", 
    "report_status_label": "New Request", 
    "reason": "test", 
    "file": "noregister.txt", 
    "user_name": "drs exporter user", 
    "invalid_imeis_file": null, 
    "user_id": "e5d58da7-a7af-4661-8c04-0f80eda3922e"
  }, 
  "devices": []
}

describe("Update DeRegistration Request component", () => {

  /*test('DeRegistration update renders correctly', () => {
    const wrapper = shallow(<Update />);
    expect(wrapper).toMatchSnapshot();
  });

  test('Should renders again correctly', () => {
    const wrapper = render(
      <I18nextProvider i18n={i18n}>
        <Update />
      </I18nextProvider>
    );
    expect(wrapper).toMatchSnapshot();
  });*/

  test('If state renders correctly', () => {
    const wrapper = mount(
      <I18nextProvider i18n={i18n}>
        <Update kc={mockKcProps} {...mockMatchParams} />
      </I18nextProvider>
    );
    let step1DataResponse = {
      data: {
        "id": 113, 
        "reviewer_id": null, 
        "tracking_id": "06718b52-9d31-42a5-af76-c7ddb709c827", 
        "device_count": 1, 
        "report": null, 
        "file_link": "/var/www/html/dirbs_intl_drs/uploads/06718b52-9d31-42a5-af76-c7ddb709c827/deregister.txt", 
        "reviewer_name": null, 
        "processing_status_label": "Processed", 
        "status_label": "Pending Review", 
        "report_status_label": "Processed", 
        "reason": "test", 
        "file": "deregister.txt", 
        "user_name": "drs exporter user", 
        "invalid_imeis_file": null, 
        "user_id": "e5d58da7-a7af-4661-8c04-0f80eda3922e"
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

    expect(wrapper.find('Update').state().step).toEqual(1);
    expect(wrapper.find('Update').state().stepReady).toBe(true);
    expect(wrapper.find('Update').state().statusLabel).toEqual('Pending Review');
    expect(wrapper.find('Update').state().id).toEqual(113);
    expect(wrapper.find('Update').state().step1Comments).toEqual(step1Comments);
    expect(wrapper.find('Update').state().step2Comments).toEqual(step2Comments);
    expect(wrapper.find('Update').state().step3Comments).toEqual(step3Comments);
  });

  //Step1

  test('Should have renders form elements', () => {
    const wrapper = mount(
      <I18nextProvider i18n={i18n}>
        <Update kc={mockKcProps} {...mockMatchParams} />
      </I18nextProvider>
    );
    let step1DataResponse = {
      data: {
        "id": 113, 
        "reviewer_id": null, 
        "tracking_id": "06718b52-9d31-42a5-af76-c7ddb709c827", 
        "device_count": 1, 
        "report": null, 
        "file_link": "/var/www/html/dirbs_intl_drs/uploads/06718b52-9d31-42a5-af76-c7ddb709c827/deregister.txt", 
        "reviewer_name": null, 
        "processing_status_label": "Processed", 
        "status_label": "Pending Review", 
        "report_status_label": "Processed",
        "report_allowed": false,
        "reason": "test", 
        "file": "deregister.txt", 
        "user_name": "drs exporter user", 
        "invalid_imeis_file": null, 
        "user_id": "e5d58da7-a7af-4661-8c04-0f80eda3922e"
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

    expect(wrapper.find('Formik').props().initialValues.device_count).toEqual(1);
    expect(wrapper.find('Formik').props().initialValues.reason).toEqual('test');
    expect(wrapper.find('Formik').find('FormGroup').at(0).find('.selectedfile').text()).toEqual('deregister.txt');
  });

  test('Step loading renders correctly', () => {
    const wrapper = mount(
      <I18nextProvider i18n={i18n}>
        <Update kc={mockKcProps} {...mockMatchParams} />
      </I18nextProvider>
    );
    let step1DataResponse = {
      data: {
        "id": 113, 
        "reviewer_id": null, 
        "tracking_id": "06718b52-9d31-42a5-af76-c7ddb709c827", 
        "device_count": 1, 
        "report": null, 
        "file_link": "/var/www/html/dirbs_intl_drs/uploads/06718b52-9d31-42a5-af76-c7ddb709c827/deregister.txt", 
        "reviewer_name": null, 
        "processing_status_label": "Processed", 
        "status_label": "Pending Review", 
        "report_status_label": "Processed", 
        "reason": "test", 
        "file": "deregister.txt", 
        "user_name": "drs exporter user", 
        "invalid_imeis_file": null, 
        "user_id": "e5d58da7-a7af-4661-8c04-0f80eda3922e"
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
    //console.log(wrapper.debug());

    wrapper.find('Update').setState({
      stepReady : false
    });
    expect(wrapper.find('StepLoading').length).toEqual(1);
  });

  test('Check Formik state errors renders correctly', () => {
    const wrapper = mount(
      <I18nextProvider i18n={i18n}>
        <Update kc={mockKcProps} {...mockMatchParams} />
      </I18nextProvider>
    );
    let step1DataResponse = {
      data: {
        "id": 113, 
        "reviewer_id": null, 
        "tracking_id": "06718b52-9d31-42a5-af76-c7ddb709c827", 
        "device_count": 1, 
        "report": null, 
        "file_link": "/var/www/html/dirbs_intl_drs/uploads/06718b52-9d31-42a5-af76-c7ddb709c827/deregister.txt", 
        "reviewer_name": null, 
        "processing_status_label": "Processed", 
        "status_label": "Pending Review", 
        "report_status_label": "Processed", 
        "reason": "test", 
        "file": "deregister.txt", 
        "user_name": "drs exporter user", 
        "invalid_imeis_file": null, 
        "user_id": "e5d58da7-a7af-4661-8c04-0f80eda3922e"
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
    expect(wrapper.find('RenderFileInput').length).toEqual(0);

    let button = wrapper.find('.asitfield').at(0).find('button');
    button.simulate('click');
    wrapper.update();
    expect(wrapper.find('RenderFileInput').length).toEqual(1);

    let deviceCount = wrapper.find('renderInput').at(0).find('input');
    let reason = wrapper.find('renderInput').at(1).find('textarea');
    const file = new File(['867009033925481'], 'test.tsv', {type: 'text/plain'});
    wrapper.find('Formik').setState({
      values : {
        filename: ''
      }
    });
    deviceCount.simulate('change', {
      target:{
        name: "device_count",
        value: ''
      }
    });
    reason.simulate('change', {
      target:{
        name: "reason",
        value: ''
      }
    });
    wrapper.find('Formik').find('form').simulate('submit');
    expect(wrapper.find('Formik').state().errors.filename).toEqual('This field is required');
    expect(wrapper.find('Formik').state().errors.device_count).toEqual('This field is required');
    expect(wrapper.find('Formik').state().errors.reason).toEqual('This field is required');

    wrapper.find('Formik').setState({
      values : {
        filename: file
      }
    });
    deviceCount.simulate('change', {
      target:{
        name: "device_count",
        value: 'test'
      }
    });
    reason.simulate('change', {
      target:{
        name: "reason",
        value: mockInvalidCharacters
      }
    });

    wrapper.find('Formik').find('form').simulate('submit');
    expect(wrapper.find('Formik').state().errors.filename).toEqual('Invalid File extension, valid extension is: txt');
    expect(wrapper.find('Formik').state().errors.device_count).toEqual('Must be a number');
    expect(wrapper.find('Formik').state().errors.reason).toEqual('Must be 1000 characters or less');

    deviceCount.simulate('change', {
      target:{
        name: "device_count",
        value: 10000001
      }
    });
    wrapper.find('Formik').find('form').simulate('submit');
    expect(wrapper.find('Formik').state().errors.device_count).toEqual('Must be in between 1-1,000,000');
  });

/*  test('If downloads the report',()=>{
    const kcResource = {
      realm_access: {
        roles: ['uma_authorization', "drs_exporter"]
      }
    }
    const wrapper = mount(
      <I18nextProvider i18n={i18n}>
        <Update kc={mockKcProps} {...mockMatchParams} resources={kcResource}/>
      </I18nextProvider>
    );
    let step1DataResponse = {
      data: {
        "id": 113,
        "reviewer_id": null,
        "tracking_id": "06718b52-9d31-42a5-af76-c7ddb709c827",
        "device_count": 1,
        "report": null,
        "file_link": "/var/www/html/dirbs_intl_drs/uploads/06718b52-9d31-42a5-af76-c7ddb709c827/deregister.txt",
        "reviewer_name": null,
        "processing_status_label": "Processed",
        "status_label": "Pending Review",
        "report_status_label": "Processed",
        "report_allowed": true,
        "reason": "test",
        "file": "deregister.txt",
        "user_name": "drs exporter user",
        "invalid_imeis_file": null,
        "user_id": "e5d58da7-a7af-4661-8c04-0f80eda3922e"
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
    expect(wrapper.find('.samplefile').length).toEqual(1)

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

  test('Submit to next step 2', () => {
    const wrapper = mount(
      <I18nextProvider i18n={i18n}>
        <Update kc={mockKcProps} {...mockMatchParams} />
      </I18nextProvider>
    );
    let step1DataResponse = {
      data: {
        "id": 113, 
        "reviewer_id": null, 
        "tracking_id": "06718b52-9d31-42a5-af76-c7ddb709c827", 
        "device_count": 1, 
        "report": null, 
        "file_link": "/var/www/html/dirbs_intl_drs/uploads/06718b52-9d31-42a5-af76-c7ddb709c827/deregister.txt", 
        "reviewer_name": null, 
        "processing_status_label": "Processed", 
        "status_label": "Pending Review", 
        "report_status_label": "Processed", 
        "reason": "test", 
        "file": "deregister.txt", 
        "user_name": "drs exporter user", 
        "invalid_imeis_file": null, 
        "user_id": "e5d58da7-a7af-4661-8c04-0f80eda3922e"
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

    let deviceCount = wrapper.find('renderInput').at(0).find('input');
    let reason = wrapper.find('renderInput').at(1).find('textarea');
    deviceCount.simulate('change', {
      target:{
        name: "device_count",
        value: '1'
      }
    });
    reason.simulate('change', {
      target:{
        name: "reason",
        value: 'test'
      }
    });

    wrapper.find('Formik').find('form').simulate('submit');
    let saveStep1 = {
      data: mockResponseObj,
      status: 200 
    }
    mockAxios.mockResponse(saveStep1);
    expect(wrapper.find('Update').state().step).toEqual(2);
    expect(wrapper.find('Update').state().id).toEqual(113);
    expect(wrapper.find('Update').state().stepReady).toBe(true);
  });

  //Step2

  test('Close request button click works correctly', () => {
    const wrapper = mount(
      <I18nextProvider i18n={i18n}>
        <Update kc={mockKcProps} {...mockMatchParams} />
      </I18nextProvider>
    );
    let step1DataResponse = {
      data: {
        "id": 113, 
        "reviewer_id": null, 
        "tracking_id": "06718b52-9d31-42a5-af76-c7ddb709c827", 
        "device_count": 1, 
        "report": null, 
        "file_link": "/var/www/html/dirbs_intl_drs/uploads/06718b52-9d31-42a5-af76-c7ddb709c827/deregister.txt", 
        "reviewer_name": null, 
        "processing_status_label": "Processed", 
        "status_label": "Pending Review", 
        "report_status_label": "Processed", 
        "reason": "test", 
        "file": "deregister.txt", 
        "user_name": "drs exporter user", 
        "invalid_imeis_file": null, 
        "user_id": "e5d58da7-a7af-4661-8c04-0f80eda3922e"
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

    wrapper.find('Formik').find('form').simulate('submit');
    let saveStep1 = {
      data: mockResponseObj,
      status: 200 
    }
    mockAxios.mockResponse(saveStep1);

    wrapper.update();

    let closeButton = wrapper.find('ModalFooter').find('Button').at(0);
    closeButton.simulate('click');

    let closeRequestResponse = {
      "id": 113, 
      "reviewer_id": null, 
      "tracking_id": "06718b52-9d31-42a5-af76-c7ddb709c827", 
      "device_count": 1, 
      "report": null, 
      "file_link": "/var/www/html/dirbs_intl_drs/uploads/06718b52-9d31-42a5-af76-c7ddb709c827/deregister.txt", 
      "reviewer_name": null, 
      "processing_status_label": "Processed", 
      "status_label": "Pending Review", 
      "report_status_label": "Processed", 
      "reason": "test", 
      "file": "deregister.txt", 
      "user_name": "drs exporter user", 
      "invalid_imeis_file": null, 
      "user_id": "e5d58da7-a7af-4661-8c04-0f80eda3922e"
    }
    let closeDeRequest = {
      data: closeRequestResponse,
      status: 200 
    }
    mockAxios.mockResponse(closeDeRequest);
    wrapper.update();
    expect(wrapper.find('Update').state().id).toEqual(113);
    expect(wrapper.find('Update').state().stepReady).toBe(true);
  });

  test('No record found in step2', () => {
    const wrapper = mount(
      <I18nextProvider i18n={i18n}>
        <Update kc={mockKcProps} {...mockMatchParams} />
      </I18nextProvider>
    );
    let step1DataResponse = {
      data: {
        "id": 113, 
        "reviewer_id": null, 
        "tracking_id": "06718b52-9d31-42a5-af76-c7ddb709c827", 
        "device_count": 1, 
        "report": null, 
        "file_link": "/var/www/html/dirbs_intl_drs/uploads/06718b52-9d31-42a5-af76-c7ddb709c827/deregister.txt", 
        "reviewer_name": null, 
        "processing_status_label": "Processed", 
        "status_label": "Pending Review", 
        "report_status_label": "Processed", 
        "reason": "test", 
        "file": "deregister.txt", 
        "user_name": "drs exporter user", 
        "invalid_imeis_file": null, 
        "user_id": "e5d58da7-a7af-4661-8c04-0f80eda3922e"
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

    let deviceCount = wrapper.find('renderInput').at(0).find('input');
    let reason = wrapper.find('renderInput').at(1).find('textarea');
    deviceCount.simulate('change', {
      target:{
        name: "device_count",
        value: '1'
      }
    });
    reason.simulate('change', {
      target:{
        name: "reason",
        value: 'test'
      }
    });

    wrapper.find('Formik').find('form').simulate('submit');
    let saveStep1 = {
      data: mockNoRegResponseObj,
      status: 200 
    }
    mockAxios.mockResponse(saveStep1);
    expect(wrapper.find('Update').state().step).toEqual(2);

    wrapper.update();
    expect(wrapper.find('DeRegistrationStep2').props().values.devices.length).toEqual(0);
    expect(wrapper.find('DeRegistrationStep2').props().isValid).toBe(false);
    expect(wrapper.find('DeRegistrationStep2').find('table tbody tr td').find('.text-danger').length).toEqual(1);
    expect(wrapper.find('DeRegistrationStep2').find('table tbody tr td').find('span').text()).toEqual('No record found');
  });

  test('Renders step2 records correctly', () => {
    const wrapper = mount(
      <I18nextProvider i18n={i18n}>
        <Update kc={mockKcProps} {...mockMatchParams} />
      </I18nextProvider>
    );
    let step1DataResponse = {
      data: {
        "id": 113, 
        "reviewer_id": null, 
        "tracking_id": "06718b52-9d31-42a5-af76-c7ddb709c827", 
        "device_count": 1, 
        "report": null, 
        "file_link": "/var/www/html/dirbs_intl_drs/uploads/06718b52-9d31-42a5-af76-c7ddb709c827/deregister.txt", 
        "reviewer_name": null, 
        "processing_status_label": "Processed", 
        "status_label": "Pending Review", 
        "report_status_label": "Processed", 
        "reason": "test", 
        "file": "deregister.txt", 
        "user_name": "drs exporter user", 
        "invalid_imeis_file": null, 
        "user_id": "e5d58da7-a7af-4661-8c04-0f80eda3922e"
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

    let deviceCount = wrapper.find('renderInput').at(0).find('input');
    let reason = wrapper.find('renderInput').at(1).find('textarea');
    deviceCount.simulate('change', {
      target:{
        name: "device_count",
        value: '1'
      }
    });
    reason.simulate('change', {
      target:{
        name: "reason",
        value: 'test'
      }
    });

    wrapper.find('Formik').find('form').simulate('submit');
    let saveStep1 = {
      data: mockResponseObj,
      status: 200 
    }
    mockAxios.mockResponse(saveStep1);
    expect(wrapper.find('Update').state().step).toEqual(2);

    wrapper.update();

    const DeRegistrationStep2 = wrapper.find('DeRegistrationStep2');
    let verifiedDevices = DeRegistrationStep2.find('table tbody tr').at(0).find('input');
    verifiedDevices.simulate('change', {
      target: {
        name: 'verified_devices',
        value: {},
        checked: true
      }
    });
    expect(wrapper.find('DeRegistrationStep2').props().isValid).toBe(true);
    verifiedDevices.simulate('change', {
      target: {
        name: 'verified_devices',
        value: {},
        checked: false
      }
    });
    expect(wrapper.find('DeRegistrationStep2').props().isValid).toBe(false);
  });

  test('Not registered IMEIs should have length', () => {
    const wrapper = mount(
      <I18nextProvider i18n={i18n}>
        <Update kc={mockKcProps} {...mockMatchParams} />
      </I18nextProvider>
    );
    let step1DataResponse = {
      data: {
        "id": 113, 
        "reviewer_id": null, 
        "tracking_id": "06718b52-9d31-42a5-af76-c7ddb709c827", 
        "device_count": 1, 
        "report": null, 
        "file_link": "/var/www/html/dirbs_intl_drs/uploads/06718b52-9d31-42a5-af76-c7ddb709c827/deregister.txt", 
        "reviewer_name": null, 
        "processing_status_label": "Processed", 
        "status_label": "Pending Review", 
        "report_status_label": "Processed", 
        "reason": "test", 
        "file": "deregister.txt", 
        "user_name": "drs exporter user", 
        "invalid_imeis_file": null, 
        "user_id": "e5d58da7-a7af-4661-8c04-0f80eda3922e"
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

    let deviceCount = wrapper.find('renderInput').at(0).find('input');
    let reason = wrapper.find('renderInput').at(1).find('textarea');
    deviceCount.simulate('change', {
      target:{
        name: "device_count",
        value: '1'
      }
    });
    reason.simulate('change', {
      target:{
        name: "reason",
        value: 'test'
      }
    });
    wrapper.find('Update').setState({
      notRegIMEIs: ['11111111000000']
    });
    wrapper.find('Formik').find('form').simulate('submit');
    let saveStep1 = {
      data: mockResponseObj,
      status: 200 
    }
    mockAxios.mockResponse(saveStep1);
    expect(wrapper.find('Update').state().step).toEqual(2);

    wrapper.update();

    const DeRegistrationStep2 = wrapper.find('DeRegistrationStep2');
    expect(DeRegistrationStep2.find('.col-lg-4').find('.alert-danger').length).toEqual(1);
    expect(DeRegistrationStep2.find('.col-lg-4').find('.file-imeis').find('li').length).toEqual(1);
    expect(DeRegistrationStep2.find('.col-lg-4').find('.file-imeis').find('li').text()).toEqual('11111111000000');
  });

  test('Submit to next step 3', () => {
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
    let mockDeRegDetails = {
      "devices": [
        { 
          model_num: 'E5573Cs-322',
          count: 1,
          brand_name: 'HUAWEI',
          tac: '86700903',
          id: 115,
          technology: 'NONE',
          operating_system: 'N/A',
          device_type: 'WLAN Router',
          model_name: 'E5573Cs-322' 
        }
      ], 
      "dreg_id": 113
    }
    const wrapper = mount(
      <I18nextProvider i18n={i18n}>
        <Update kc={mockKcProps} {...mockMatchParams} />
      </I18nextProvider>
    );
    let step1DataResponse = {
      data: {
        "id": 113, 
        "reviewer_id": null, 
        "tracking_id": "06718b52-9d31-42a5-af76-c7ddb709c827", 
        "device_count": 1, 
        "report": null, 
        "file_link": "/var/www/html/dirbs_intl_drs/uploads/06718b52-9d31-42a5-af76-c7ddb709c827/deregister.txt", 
        "reviewer_name": null, 
        "processing_status_label": "Processed", 
        "status_label": "Pending Review", 
        "report_status_label": "Processed", 
        "reason": "test", 
        "file": "deregister.txt", 
        "user_name": "drs exporter user", 
        "invalid_imeis_file": null, 
        "user_id": "e5d58da7-a7af-4661-8c04-0f80eda3922e"
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

    wrapper.find('form').simulate('submit');
    let mockVerifiedDevices = {
      "devices": [
        { 
          model_num: 'E5573Cs-322',
          count: 1,
          brand_name: 'HUAWEI',
          tac: '86700903',
          id: 115,
          technology: 'NONE',
          operating_system: 'N/A',
          device_type: 'WLAN Router',
          model_name: 'E5573Cs-322' 
        }
      ], 
      "dreg_id": 113
    }
    let saveStep2DataResponse = {
      data: mockVerifiedDevices,
      status: 200 
    }
    mockAxios.mockResponse(saveStep2DataResponse);
    wrapper.update();

    let formStep2 = wrapper.find('Formik').find('Form');
    let verifiedDevices = wrapper.find('FieldArray').find('input');
    verifiedDevices.simulate('change', {
      target: {
        name: 'verified_devices',
        checked: true
      }
    });
    
    formStep2.simulate('submit');
    wrapper.update();
    let saveStep2 = {
      data: mockDeRegDetails,
      status: 200
    }
    mockAxios.mockResponse(saveStep2);
    mockAxios.mockResponse(documentsResponse);

    expect(wrapper.find('Update').state().step).toEqual(3);
    expect(wrapper.find('Update').state().stepReady).toBe(true);
    expect(wrapper.find('Update').state().loading).toBe(false)
  });

  //Step3
  test('Submited to next step without any changes', () => {
    let spy = sinon.spy();
    const historyMock = {push: spy};
    const wrapper = mount(
      <I18nextProvider i18n={i18n}>
        <Update kc={mockKcProps} {...mockMatchParams} history={historyMock} />
      </I18nextProvider>
    );
    let step1DataResponse = {
      data: {
        "id": 113, 
        "reviewer_id": null, 
        "tracking_id": "06718b52-9d31-42a5-af76-c7ddb709c827", 
        "device_count": 1, 
        "report": null, 
        "file_link": "/var/www/html/dirbs_intl_drs/uploads/06718b52-9d31-42a5-af76-c7ddb709c827/deregister.txt", 
        "reviewer_name": null, 
        "processing_status_label": "Processed", 
        "status_label": "Pending Review", 
        "report_status_label": "Processed", 
        "reason": "test", 
        "file": "deregister.txt", 
        "user_name": "drs exporter user", 
        "invalid_imeis_file": null, 
        "user_id": "e5d58da7-a7af-4661-8c04-0f80eda3922e"
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

    wrapper.find('form').simulate('submit');
    let mockVerifiedDevices = {
      "devices": [
        { 
          model_num: 'E5573Cs-322',
          count: 1,
          brand_name: 'HUAWEI',
          tac: '86700903',
          id: 115,
          technology: 'NONE',
          operating_system: 'N/A',
          device_type: 'WLAN Router',
          model_name: 'E5573Cs-322' 
        }
      ], 
      "dreg_id": 113
    }
    let saveStep2DataResponse = {
      data: mockVerifiedDevices,
      status: 200 
    }
    mockAxios.mockResponse(saveStep2DataResponse);
    expect(wrapper.find('Update').state().step).toEqual(2);
    wrapper.update();

    //console.log(wrapper.find('Update').state());

    let formStep2 = wrapper.find('Formik').find('Form');
    let verifiedDevices = wrapper.find('FieldArray').find('input');
    verifiedDevices.simulate('change', {
      target: {
        name: 'verified_devices',
        checked: true
      }
    });
    
    formStep2.simulate('submit');
    wrapper.update();
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
    let mockDeRegDetails = {
      "devices": [
        { 
          model_num: 'E5573Cs-322',
          count: 1,
          brand_name: 'HUAWEI',
          tac: '86700903',
          id: 115,
          technology: 'NONE',
          operating_system: 'N/A',
          device_type: 'WLAN Router',
          model_name: 'E5573Cs-322' 
        }
      ], 
      "dreg_id": 113
    }
    let saveStep2 = {
      data: mockDeRegDetails,
      status: 200
    }
    mockAxios.mockResponse(saveStep2);
    mockAxios.mockResponse(documentsResponse);

    expect(wrapper.find('Update').state().step).toEqual(3);
    expect(wrapper.find('Update').state().loading).toBe(false)
    
    wrapper.update();
    wrapper.find('form').simulate('submit');
    let saveStep3 = {
      data: documentsResponse,
      status: 200
    }
    mockAxios.mockResponse(saveStep3);
    expect(spy.calledOnce).toBe(true);
    expect(wrapper.find('Update').state().stepReady).toBe(true);
  });
  
  test('Save steps and finish request', () => {
    let spy = sinon.spy();
    const historyMock = {push: spy};
    const wrapper = mount(
      <I18nextProvider i18n={i18n}>
        <Update kc={mockKcProps} {...mockMatchParams} history={historyMock} />
      </I18nextProvider>
    );
    let step1DataResponse = {
      data: {
        "id": 113, 
        "reviewer_id": null, 
        "tracking_id": "06718b52-9d31-42a5-af76-c7ddb709c827", 
        "device_count": 1, 
        "report": null, 
        "file_link": "/var/www/html/dirbs_intl_drs/uploads/06718b52-9d31-42a5-af76-c7ddb709c827/deregister.txt", 
        "reviewer_name": null, 
        "processing_status_label": "Processed", 
        "status_label": "Pending Review", 
        "report_status_label": "Processed", 
        "reason": "test", 
        "file": "deregister.txt", 
        "user_name": "drs exporter user", 
        "invalid_imeis_file": null, 
        "user_id": "e5d58da7-a7af-4661-8c04-0f80eda3922e"
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

    wrapper.find('form').simulate('submit');
    let mockVerifiedDevices = {
      "devices": [
        { 
          model_num: 'E5573Cs-322',
          count: 1,
          brand_name: 'HUAWEI',
          tac: '86700903',
          id: 115,
          technology: 'NONE',
          operating_system: 'N/A',
          device_type: 'WLAN Router',
          model_name: 'E5573Cs-322' 
        }
      ], 
      "dreg_id": 113
    }
    let saveStep2DataResponse = {
      data: mockVerifiedDevices,
      status: 200 
    }
    mockAxios.mockResponse(saveStep2DataResponse);
    expect(wrapper.find('Update').state().step).toEqual(2);
    wrapper.update();

    //console.log(wrapper.find('Update').state());

    let formStep2 = wrapper.find('Formik').find('Form');
    let verifiedDevices = wrapper.find('FieldArray').find('input');
    verifiedDevices.simulate('change', {
      target: {
        name: 'verified_devices',
        checked: true
      }
    });
    
    formStep2.simulate('submit');
    wrapper.update();
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
    let mockDeRegDetails = {
      "devices": [
        { 
          model_num: 'E5573Cs-322',
          count: 1,
          brand_name: 'HUAWEI',
          tac: '86700903',
          id: 115,
          technology: 'NONE',
          operating_system: 'N/A',
          device_type: 'WLAN Router',
          model_name: 'E5573Cs-322' 
        }
      ], 
      "dreg_id": 113
    }
    let saveStep2 = {
      data: mockDeRegDetails,
      status: 200
    }
    mockAxios.mockResponse(saveStep2);
    mockAxios.mockResponse(documentsResponse);

    expect(wrapper.find('Update').state().step).toEqual(3);
    expect(wrapper.find('Update').state().loading).toBe(false);
    wrapper.update();

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
    });

    wrapper.find('form').simulate('submit');

    let saveStep3 = {
      data: documentsResponse,
      status: 200
    }
    mockAxios.mockResponse(saveStep3);

    expect(spy.calledOnce).toBe(true);
    expect(wrapper.find('Update').state().loading).toBe(false);
    expect(wrapper.find('Update').state().stepReady).toBe(true);
  });

  test('If renders validation errors', () => {
    const wrapper = mount(
      <I18nextProvider i18n={i18n}>
        <Update kc={mockKcProps} {...mockMatchParams} />
      </I18nextProvider>
    );
    let step1DataResponse = {
      data: {
        "id": 113, 
        "reviewer_id": null, 
        "tracking_id": "06718b52-9d31-42a5-af76-c7ddb709c827", 
        "device_count": 1, 
        "report": null, 
        "file_link": "/var/www/html/dirbs_intl_drs/uploads/06718b52-9d31-42a5-af76-c7ddb709c827/deregister.txt", 
        "reviewer_name": null, 
        "processing_status_label": "Processed", 
        "status_label": "Pending Review", 
        "report_status_label": "Processed", 
        "reason": "test", 
        "file": "deregister.txt", 
        "user_name": "drs exporter user", 
        "invalid_imeis_file": null, 
        "user_id": "e5d58da7-a7af-4661-8c04-0f80eda3922e"
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

    wrapper.find('form').simulate('submit');
    let mockVerifiedDevices = {
      "devices": [
        { 
          model_num: 'E5573Cs-322',
          count: 1,
          brand_name: 'HUAWEI',
          tac: '86700903',
          id: 115,
          technology: 'NONE',
          operating_system: 'N/A',
          device_type: 'WLAN Router',
          model_name: 'E5573Cs-322' 
        }
      ], 
      "dreg_id": 113
    }
    let saveStep2DataResponse = {
      data: mockVerifiedDevices,
      status: 200 
    }
    mockAxios.mockResponse(saveStep2DataResponse);
    expect(wrapper.find('Update').state().step).toEqual(2);
    wrapper.update();

    //console.log(wrapper.find('Update').state());

    let formStep2 = wrapper.find('Formik').find('Form');
    let verifiedDevices = wrapper.find('FieldArray').find('input');
    verifiedDevices.simulate('change', {
      target: {
        name: 'verified_devices',
        checked: true
      }
    });
    
    formStep2.simulate('submit');
    wrapper.update();
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
    let mockDeRegDetails = {
      "devices": [
        { 
          model_num: 'E5573Cs-322',
          count: 1,
          brand_name: 'HUAWEI',
          tac: '86700903',
          id: 115,
          technology: 'NONE',
          operating_system: 'N/A',
          device_type: 'WLAN Router',
          model_name: 'E5573Cs-322' 
        }
      ], 
      "dreg_id": 113
    }
    let saveStep2 = {
      data: mockDeRegDetails,
      status: 200
    }
    mockAxios.mockResponse(saveStep2);
    mockAxios.mockResponse(documentsResponse);

    expect(wrapper.find('Update').state().step).toEqual(3);
    expect(wrapper.find('Update').state().loading).toBe(false);
    wrapper.update();

    wrapper.find('Formik').setState({
      values: {
        documents: []
      }
    });

    let step3Form = wrapper.find('form');
    step3Form.simulate('submit');
    expect(wrapper.find('Formik').state().errors.allDocs).toEqual('Please report all required fields');

    wrapper.update();
    let shippingDocInput = wrapper.find('FormGroup').at(0).find('input');
    let authorizationDocInput = wrapper.find('FormGroup').at(1).find('input');
    let certificatieDocInput = wrapper.find('FormGroup').at(2).find('input');

    shippingDocInput.simulate('change', {
      target: {
        files: [{}]
      }
    });
    authorizationDocInput.simulate('change', {
      target: {
        files: [{}]
      }
    });
    certificatieDocInput.simulate('change', {
      target: {
        files: [{}]
      }
    });
      
    //Documents validations
    expect(wrapper.find('Formik').state().errors.documents[0]).toEqual('This field is required')
    expect(wrapper.find('Formik').state().errors.documents[1]).toEqual('This field is required')
    expect(wrapper.find('Formik').state().errors.documents[2]).toEqual('This field is required')

    wrapper.find('Formik').setState({
      values: {
        documents: [
          {
            name: 'test.txt',
            size: 0
          },
          {
            name: 'test.txt',
            size: 0
          },
          {
            name: 'test.txt',
            size: 0
          }
        ]
      }
    });

    step3Form = wrapper.find('form');
    step3Form.simulate('submit');
    //Documents validations with incorrect format
    expect(wrapper.find('Formik').state().errors.documents[0]).toEqual('Invalid File extension, valid extensions are: pdf, jpg, png, gif, bmp, tiff, svg');
    expect(wrapper.find('Formik').state().errors.documents[1]).toEqual('Invalid File extension, valid extensions are: pdf, jpg, png, gif, bmp, tiff, svg');
    expect(wrapper.find('Formik').state().errors.documents[2]).toEqual('Invalid File extension, valid extensions are: pdf, jpg, png, gif, bmp, tiff, svg');

    wrapper.find('Formik').setState({
      values: {
        documents: [
          {
            name: 'test.png',
            size: 30000000
          },
          {
            name: 'test.png',
            size: 30000000
          },
          {
            name: 'test.png',
            size: 30000000
          }
        ]
      }
    });

    step3Form = wrapper.find('form');
    step3Form.simulate('submit');
    //Documents validations with incorrect ile size
    expect(wrapper.find('Formik').state().errors.documents[0]).toEqual('File size exceeds 26 MBs');
    expect(wrapper.find('Formik').state().errors.documents[1]).toEqual('File size exceeds 26 MBs');
    expect(wrapper.find('Formik').state().errors.documents[2]).toEqual('File size exceeds 26 MBs');
  });

});
