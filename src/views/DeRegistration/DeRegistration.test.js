/*
Copyright (c) 2018 Qualcomm Technologies, Inc.
All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted (subject to the limitations in the disclaimer below) provided that the following conditions are met:

* Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
* Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
* Neither the name of Qualcomm Technologies, Inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.
NO EXPRESS OR IMPLIED LICENSES TO ANY PARTY'S PATENT RIGHTS ARE GRANTED BY THIS LICENSE. THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

import React from "react";
import DeRegistration from './DeRegistration';
import RenderModal from '../../components/Form/RenderModal'
import {I18nextProvider} from 'react-i18next';
import i18n from './../../i18nTest';
import sinon from 'sinon';
import axios from 'axios';
import mockAxios from 'jest-mock-axios';

//Constants
import {
  DOCUMENTS,
  DE_DOCUMENTS,
  EXTENSIONS,
} from "../../utilities/constants";

//Mock constants
DE_DOCUMENTS.push({
  label: "shipment document",
  id: 1,
  required: true,
  type: 2
})
DE_DOCUMENTS.push({
  label: "authorization document",
  id: 2,
  required: true,
  type: 2
})
DE_DOCUMENTS.push({
  label: "certificate document",
  id: 3,
  required: true,
  type: 2
})

const mockMatchParamsDeRegistration = {
  match: {
    params: {
      id: "XYZ123",
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

const mockKcProps = {
  'isTokenExpired': sinon.spy()
}

const mockHeader = {
  "headers": {
    "Authorization": "Bearer null",
    "Content-Type": "application/json"
  }
}

afterEach(() => {
  // cleaning up the mess left behind the previous test
  mockAxios.reset();
});

// simulating a server response
let mockId = 4357
let mockResponseObj = {
  "request": {
    "id": mockId, 
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

describe("DeRegistration Component", () => {

  test('if renders correctly', () => {
    const wrapper = shallow(<DeRegistration />);
    expect(wrapper).toMatchSnapshot();
  });

  test('if renders correctly again', () => {
    const wrapper = render(
      <I18nextProvider i18n={i18n}>
        <DeRegistration />
      </I18nextProvider>
    );
    expect(wrapper).toMatchSnapshot();
  });

  test('if exists correctly', () => {
    const mockLogout = jest.fn();
    const wrapper = shallow(<DeRegistration kc={mockKcProps} {...mockMatchParamsDeRegistration} />);
    expect(wrapper.exists()).toBe(true);
  });

  //Step1

  test('Step loading renders correctly', () => {
    const wrapper = mount(
      <I18nextProvider i18n={i18n}>
        <DeRegistration kc={mockKcProps} {...mockMatchParamsDeRegistration} />
      </I18nextProvider>
    );
    wrapper.find('DeRegistration').setState({
      stepReady : false
    });
    expect(wrapper.find('StepLoading').length).toEqual(1);
  });

  test('StepIndicator - check classes, count elements and text inside DOM', () => {
    const wrapper = mount(
      <I18nextProvider i18n={i18n}>
        <DeRegistration kc={mockKcProps} {...mockMatchParamsDeRegistration} />
      </I18nextProvider>
    );
    const step1Form = wrapper.find('DeRegistrationStep1');
    expect(step1Form.find('StepIndicator').find('.stepsinfo').length).toEqual(1);
    expect(step1Form.find('StepIndicator').find('.stepsinfo').find('li').length).toEqual(2);
    expect(step1Form.find('.samplefile').length).toEqual(1);
    expect(step1Form.find('.samplefile').find('p').length).toEqual(2);
    expect(step1Form.find('.samplefile').find('button').length).toEqual(1);
    expect(step1Form.find('.samplefile').find('button').text()).toBe('Download file');
  });

  /*test('if sample file downloads', () => {
    const wrapper = mount(
      <I18nextProvider i18n={i18n}>
        <DeRegistration kc={mockKcProps} {...mockMatchParamsDeRegistration} />
      </I18nextProvider>
    );
    const button = wrapper.find('Form').find('button').at(0);
    button.simulate('click');
    let sampleFileDownloadResponse = {
      data : {},
      status: 200
    }
    mockAxios.mockResponse(sampleFileDownloadResponse);
    expect(downloadSampleFile.calledOnce).toBe(true);
  });*/

  test('Step1 Card - check classes, count elements and text inside DOM', () => {
    const wrapper = mount(
      <I18nextProvider i18n={i18n}>
        <DeRegistration kc={mockKcProps} {...mockMatchParamsDeRegistration} />
      </I18nextProvider>
    );
    const step1Form = wrapper.find('DeRegistrationStep1');
    const step1Card = step1Form.find('Card');
    expect(step1Card.find('.card')).toHaveLength(1);
    expect(step1Card.find('CardHeader')).toHaveLength(1);
    expect(step1Card.find('CardBody')).toHaveLength(1);
    expect(step1Card.find('RenderFileInput')).toHaveLength(1);
    expect(step1Card.find('renderInput')).toHaveLength(2);
  });

  test('Check form elements length', () => {
    const wrapper = mount(
      <I18nextProvider i18n={i18n}>
        <DeRegistration kc={mockKcProps} {...mockMatchParamsDeRegistration} />
      </I18nextProvider>
    );
    const form = wrapper.find('form');
    expect(form.find('RenderFileInput').length).toEqual(1);
    expect(form.find('renderInput').length).toEqual(2);
  });

  test('Check form element classes and text', () => {
    const wrapper = mount(
      <I18nextProvider i18n={i18n}>
        <DeRegistration kc={mockKcProps} {...mockMatchParamsDeRegistration} />
      </I18nextProvider>
    );
    const form = wrapper.find('form');
    form.simulate('submit');
    wrapper.update();
    expect(wrapper.find('RenderFileInput').find('.is-invalid').length).toEqual(1);
    expect(wrapper.find('RenderFileInput').contains(<div className="text-danger">This field is required</div>)).toBe(true);
    expect(wrapper.find('renderInput').length).toEqual(2);
    expect(wrapper.find('renderInput').contains(<div className="invalid-feedback">This field is required</div>)).toBe(true);
    expect(wrapper.find('renderInput').at(1).find('textarea').length).toEqual(1);
  });

  test('Check Formik state errors renders correctly', () => {
    const wrapper = mount(
      <I18nextProvider i18n={i18n}>
        <DeRegistration kc={mockKcProps} {...mockMatchParamsDeRegistration} />
      </I18nextProvider>
    );
    let form = wrapper.find('form');
    let deviceCount = wrapper.find('renderInput').at(0).find('input');
    let reason = wrapper.find('renderInput').at(1).find('textarea');
    const file = new File(['867009033925481'], 'test.tsv', {type: 'text/plain'});
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
        value: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat.'
      }
    });

    form.simulate('submit');
    expect(wrapper.find('Formik').state().errors.filename).toEqual('Invalid File extension, valid extension is: txt');
    expect(wrapper.find('Formik').state().errors.device_count).toEqual('Must be a number');
    expect(wrapper.find('Formik').state().errors.reason).toEqual('Must be 1000 characters or less');

    deviceCount.simulate('change', {
      target:{
        name: "device_count",
        value: 10000001
      }
    });
    form.simulate('submit');
    expect(wrapper.find('Formik').state().errors.device_count).toEqual('Must be in between 1-1,000,000');
  });

  test('Submit to next step 2', () => {
    const wrapper = mount(
      <I18nextProvider i18n={i18n}>
        <DeRegistration kc={mockKcProps} {...mockMatchParamsDeRegistration} />
      </I18nextProvider>
    );
    const form = wrapper.find('form');
    const file = new File(['867009033925481'], 'test.txt', {type: 'text/plain'});
    wrapper.find('Formik').setState({
      values : {
        filename: file
      }
    });
    form.find('renderInput').at(0).find('input').simulate('change', {
      target: {
        value: 1,
        name: 'device_count'
      }
    });
    form.find('renderInput').at(1).find('textarea').simulate('change', {
      target: {
        value: "test reason",
        name: 'reason'
      }
    });
    wrapper.find('form').simulate('submit');

    let saveStep1 = {
      data: mockResponseObj,
      status: 200 
    }

    let fakeResponse = {
      data: mockResponseObj,
      status: 400
    }

    mockAxios.mockResponse(fakeResponse);
    mockAxios.mockResponse(saveStep1);
    expect(wrapper.find('DeRegistration').state().step).toEqual(2);
    expect(wrapper.find('DeRegistration').state().id).toEqual(mockId);
    expect(wrapper.find('DeRegistration').state().stepReady).toBe(true);
  });

  //Step2

  test('No record found in step2', () => {
    // simulating a server response
    let mockId = 4357
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
    const wrapper = mount(
      <I18nextProvider i18n={i18n}>
        <DeRegistration kc={mockKcProps} {...mockMatchParamsDeRegistration} />
      </I18nextProvider>
    );
    const form = wrapper.find('form');
    const file = new File(['867009033925481'], 'test.txt', {type: 'text/plain'});
    wrapper.find('Formik').setState({
      values : {
        filename: file
      }
    });
    form.find('renderInput').at(0).find('input').simulate('change', {
      target: {
        value: 1,
        name: 'device_count'
      }
    });
    form.find('renderInput').at(1).find('textarea').simulate('change', {
      target: {
        value: "test reason",
        name: 'reason'
      }
    });
    wrapper.find('form').simulate('submit');

    let saveStep1 = {
      data: mockNoRegResponseObj,
      status: 200 
    }

    let fakeResponse = {
      data: mockNoRegResponseObj,
      status: 400
    }

    mockAxios.mockResponse(fakeResponse);
    mockAxios.mockResponse(saveStep1);
    expect(wrapper.find('DeRegistration').state().step).toEqual(2);
    expect(wrapper.find('DeRegistration').state().stepReady).toBe(true);

    wrapper.update();
    wrapper.find('DeRegistration').find('Formik').setState({isSubmitting: true});
    expect(wrapper.find('DeRegistrationStep2').props().values.devices.length).toEqual(0);
    expect(wrapper.find('DeRegistrationStep2').props().isValid).toBe(false);
    expect(wrapper.find('DeRegistrationStep2').find('table tbody tr td').find('.text-danger').length).toEqual(1);
    expect(wrapper.find('DeRegistrationStep2').find('table tbody tr td').find('span').text()).toEqual('No record found');
  });

  test('Renders step2 records correctly', () => {
    const wrapper = mount(
      <I18nextProvider i18n={i18n}>
        <DeRegistration kc={mockKcProps} {...mockMatchParamsDeRegistration} />
      </I18nextProvider>
    );
    const form = wrapper.find('form');
    const file = new File(['867009033925481'], 'test.txt', {type: 'text/plain'});
    wrapper.find('Formik').setState({
      values : {
        filename: file
      }
    });
    form.find('renderInput').at(0).find('input').simulate('change', {
      target: {
        value: 1,
        name: 'device_count'
      }
    });
    form.find('renderInput').at(1).find('textarea').simulate('change', {
      target: {
        value: "test reason",
        name: 'reason'
      }
    });
    wrapper.find('form').simulate('submit');

    let saveStep1 = {
      data: mockResponseObj,
      status: 200 
    }

    let fakeResponse = {
      data: mockResponseObj,
      status: 400
    }

    mockAxios.mockResponse(fakeResponse);
    mockAxios.mockResponse(saveStep1);

    wrapper.update();
    wrapper.find('DeRegistration').find('Formik').setState({isSubmitting: true});
    expect(wrapper.find('DeRegistrationStep2').props().values.devices.length).toEqual(1);
    expect(wrapper.find('DeRegistrationStep2').props().isValid).toBe(false);

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
    // simulating a server response
    let mockId = 4357
    let mockResponseObj = {
      "request": {
        "id": 4368, 
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
    const wrapper = mount(
      <I18nextProvider i18n={i18n}>
        <DeRegistration kc={mockKcProps} {...mockMatchParamsDeRegistration} />
      </I18nextProvider>
    );
    const form = wrapper.find('form');
    const file = new File(['867009033925481'], 'test.txt', {type: 'text/plain'});
    wrapper.find('Formik').setState({
      values : {
        filename: file
      }
    });
    form.find('renderInput').at(0).find('input').simulate('change', {
      target: {
        value: 1,
        name: 'device_count'
      }
    });
    form.find('renderInput').at(1).find('textarea').simulate('change', {
      target: {
        value: "test reason",
        name: 'reason'
      }
    });
    wrapper.find('DeRegistration').setState({
      notRegIMEIs: ['11111111000000']
    });
    wrapper.find('form').simulate('submit');

    let saveStep1 = {
      data: mockResponseObj,
      status: 200 
    }

    let fakeResponse = {
      data: mockResponseObj,
      status: 400
    }

    mockAxios.mockResponse(fakeResponse);
    mockAxios.mockResponse(saveStep1);

    wrapper.update();
    wrapper.find('DeRegistration').find('Formik').setState({isSubmitting: true});
    const DeRegistrationStep2 = wrapper.find('DeRegistrationStep2');
    expect(DeRegistrationStep2.find('.col-lg-3').find('.alert-danger').length).toEqual(1);
    expect(DeRegistrationStep2.find('.col-lg-3').find('ul li').length).toEqual(1);
    expect(DeRegistrationStep2.find('.col-lg-3').find('ul li').text()).toEqual('11111111000000');
  });

  test('Submit to next step 3', () => {
    let mockVerifiedDevices = {
      "devices": [
        {
          "count": 1, 
          "brand_name": "HUAWEI", 
          "tac": "86700903", 
          "model_num": "E5573Cs-322", 
          "id": 3361, 
          "technology": "NONE", 
          "device_type": "WLAN Router", 
          "model_name": "E5573Cs-322", 
          "operating_system": "N/A"
        }
      ], 
      "dreg_id": 4386
    }
    let mockSaveStep2Response = {
      "dereg_details": {
        "id": 4386, 
        "reviewer_id": null, 
        "tracking_id": "f6d44340-fd74-4598-a46d-f37bc6facca4", 
        "device_count": 1, 
        "report": null, 
        "file_link": "/var/www/html/dirbs_intl_drs/uploads/f6d44340-fd74-4598-a46d-f37bc6facca4/deregister.txt", 
        "reviewer_name": null, 
        "processing_status_label": "Processed", 
        "status_label": "Awaiting Documents", 
        "report_status_label": "Processing", 
        "reason": "xcx", 
        "file": "deregister.txt", 
        "user_name": "drs exporter user", 
        "invalid_imeis_file": null, 
        "user_id": "e5d58da7-a7af-4661-8c04-0f80eda3922e"
      }, 
      "dereg_docs": [], 
      "dereg_device": [
        {
          "count": 1, 
          "brand_name": "HUAWEI", 
          "tac": "86700903", 
          "model_num": "E5573Cs-322", 
          "id": 3361, 
          "technology": "NONE", 
          "device_type": "WLAN Router", 
          "model_name": "E5573Cs-322", 
          "operating_system": "N/A"
        }
      ]
    }
    const wrapper = mount(
      <I18nextProvider i18n={i18n}>
        <DeRegistration kc={mockKcProps} {...mockMatchParamsDeRegistration} />
      </I18nextProvider>
    );
    let form = wrapper.find('Form');
    const file = new File(['867009033925481'], 'test.txt', {type: 'text/plain'});
    wrapper.find('Formik').setState({
      values : {
        filename: file
      }
    });
    form.find('renderInput').at(0).find('input').simulate('change', {
      target: {
        value: 1,
        name: 'device_count'
      }
    });
    form.find('renderInput').at(1).find('textarea').simulate('change', {
      target: {
        value: "test reason",
        name: 'reason'
      }
    });
    form.simulate('submit');

    let saveStep1 = {
      data: mockResponseObj,
      status: 200 
    }

    let fakeResponse = {
      data: mockResponseObj,
      status: 400
    }

    mockAxios.mockResponse(fakeResponse);
    mockAxios.mockResponse(saveStep1);
    expect(wrapper.find('DeRegistration').state().step).toEqual(2);
    expect(wrapper.find('DeRegistration').state().id).toEqual(mockId);
    expect(wrapper.find('DeRegistration').state().stepReady).toBe(true);
    
    wrapper.update();

    let formStep2 = wrapper.find('Form');
    let verifiedDevices = formStep2.find('FieldArray').find('input');
    verifiedDevices.simulate('change', {
      target: {
        name: 'verified_devices',
        checked: true
      }
    });
    
    formStep2.simulate('submit');
    wrapper.update();

    let saveStep2 = {
      data: mockVerifiedDevices,
      status: 200 
    }

    let getSections = {
      data: mockSaveStep2Response,
      status: 200 
    }

    mockAxios.mockResponse(saveStep2);    
    mockAxios.mockResponse(getSections);

    expect(wrapper.find('DeRegistration').state().step).toEqual(3);
    expect(wrapper.find('DeRegistration').state().id).toEqual(mockId)
    expect(wrapper.find('DeRegistration').state().stepReady).toBe(true);
  });

  //Step3

  test('Step3 has all fields rendered', () => {
    let mockVerifiedDevices = {
      "devices": [
        {
          "count": 1, 
          "brand_name": "HUAWEI", 
          "tac": "86700903", 
          "model_num": "E5573Cs-322", 
          "id": 3361, 
          "technology": "NONE", 
          "device_type": "WLAN Router", 
          "model_name": "E5573Cs-322", 
          "operating_system": "N/A"
        }
      ], 
      "dreg_id": 4386
    }
    let mockSaveStep2Response = {
      "dereg_details": {
        "id": 4386, 
        "reviewer_id": null, 
        "tracking_id": "f6d44340-fd74-4598-a46d-f37bc6facca4", 
        "device_count": 1, 
        "report": null, 
        "file_link": "/var/www/html/dirbs_intl_drs/uploads/f6d44340-fd74-4598-a46d-f37bc6facca4/deregister.txt", 
        "reviewer_name": null, 
        "processing_status_label": "Processed", 
        "status_label": "Awaiting Documents", 
        "report_status_label": "Processing", 
        "reason": "xcx", 
        "file": "deregister.txt", 
        "user_name": "drs exporter user", 
        "invalid_imeis_file": null, 
        "user_id": "e5d58da7-a7af-4661-8c04-0f80eda3922e"
      }, 
      "dereg_docs": [], 
      "dereg_device": [
        {
          "count": 1, 
          "brand_name": "HUAWEI", 
          "tac": "86700903", 
          "model_num": "E5573Cs-322", 
          "id": 3361, 
          "technology": "NONE", 
          "device_type": "WLAN Router", 
          "model_name": "E5573Cs-322", 
          "operating_system": "N/A"
        }
      ]
    }
    const wrapper = mount(
      <I18nextProvider i18n={i18n}>
        <DeRegistration kc={mockKcProps} {...mockMatchParamsDeRegistration} />
      </I18nextProvider>
    );
    let form = wrapper.find('Form');
    const file = new File(['867009033925481'], 'test.txt', {type: 'text/plain'});
    wrapper.find('Formik').setState({
      values : {
        filename: file
      }
    });
    form.find('renderInput').at(0).find('input').simulate('change', {
      target: {
        value: 1,
        name: 'device_count'
      }
    });
    form.find('renderInput').at(1).find('textarea').simulate('change', {
      target: {
        value: "test reason",
        name: 'reason'
      }
    });
    form.simulate('submit');

    let saveStep1 = {
      data: mockResponseObj,
      status: 200 
    }

    let fakeResponse = {
      data: mockResponseObj,
      status: 400
    }

    mockAxios.mockResponse(fakeResponse);
    mockAxios.mockResponse(saveStep1);
    expect(wrapper.find('DeRegistration').state().step).toEqual(2);
    expect(wrapper.find('DeRegistration').state().id).toEqual(mockId);
    expect(wrapper.find('DeRegistration').state().stepReady).toBe(true);
    
    wrapper.update();

    let formStep2 = wrapper.find('Form');
    let verifiedDevices = formStep2.find('FieldArray').find('input');
    verifiedDevices.simulate('change', {
      target: {
        name: 'verified_devices',
        checked: true
      }
    });
    
    formStep2.simulate('submit');
    wrapper.update();

    let saveStep2 = {
      data: mockVerifiedDevices,
      status: 200 
    }

    let getSections = {
      data: mockSaveStep2Response,
      status: 200 
    }

    mockAxios.mockResponse(saveStep2);    
    mockAxios.mockResponse(getSections);

    expect(wrapper.find('DeRegistration').state().step).toEqual(3);
    expect(wrapper.find('DeRegistration').state().id).toEqual(mockId)
    expect(wrapper.find('DeRegistration').state().stepReady).toBe(true);

    wrapper.update();
    expect(wrapper.find('.steps-status').length).toEqual(2);
    expect(wrapper.find('FormGroup').at(0).find('label').text()).toEqual('Shipment document * ');
    expect(wrapper.find('FormGroup').at(1).find('label').text()).toEqual('Authorization document * ');
    expect(wrapper.find('FormGroup').at(2).find('label').text()).toEqual('Certificate document * ');
    expect(wrapper.find('RenderFileInput').length).toEqual(3);
  });

  test('Step3 renders validation errors', () => {
    let mockVerifiedDevices = {
      "devices": [
        {
          "count": 1, 
          "brand_name": "HUAWEI", 
          "tac": "86700903", 
          "model_num": "E5573Cs-322", 
          "id": 3361, 
          "technology": "NONE", 
          "device_type": "WLAN Router", 
          "model_name": "E5573Cs-322", 
          "operating_system": "N/A"
        }
      ], 
      "dreg_id": 4386
    }
    let mockSaveStep2Response = {
      "dereg_details": {
        "id": 4386, 
        "reviewer_id": null, 
        "tracking_id": "f6d44340-fd74-4598-a46d-f37bc6facca4", 
        "device_count": 1, 
        "report": null, 
        "file_link": "/var/www/html/dirbs_intl_drs/uploads/f6d44340-fd74-4598-a46d-f37bc6facca4/deregister.txt", 
        "reviewer_name": null, 
        "processing_status_label": "Processed", 
        "status_label": "Awaiting Documents", 
        "report_status_label": "Processing", 
        "reason": "xcx", 
        "file": "deregister.txt", 
        "user_name": "drs exporter user", 
        "invalid_imeis_file": null, 
        "user_id": "e5d58da7-a7af-4661-8c04-0f80eda3922e"
      }, 
      "dereg_docs": [], 
      "dereg_device": [
        {
          "count": 1, 
          "brand_name": "HUAWEI", 
          "tac": "86700903", 
          "model_num": "E5573Cs-322", 
          "id": 3361, 
          "technology": "NONE", 
          "device_type": "WLAN Router", 
          "model_name": "E5573Cs-322", 
          "operating_system": "N/A"
        }
      ]
    }
    const wrapper = mount(
      <I18nextProvider i18n={i18n}>
        <DeRegistration kc={mockKcProps} {...mockMatchParamsDeRegistration} />
      </I18nextProvider>
    );
    let form = wrapper.find('Form');
    const file = new File(['867009033925481'], 'test.txt', {type: 'text/plain'});
    wrapper.find('Formik').setState({
      values : {
        filename: file
      }
    });
    form.find('renderInput').at(0).find('input').simulate('change', {
      target: {
        value: 1,
        name: 'device_count'
      }
    });
    form.find('renderInput').at(1).find('textarea').simulate('change', {
      target: {
        value: "test reason",
        name: 'reason'
      }
    });
    form.simulate('submit');

    let saveStep1 = {
      data: mockResponseObj,
      status: 200 
    }

    let fakeResponse = {
      data: mockResponseObj,
      status: 400
    }

    mockAxios.mockResponse(fakeResponse);
    mockAxios.mockResponse(saveStep1);
    expect(wrapper.find('DeRegistration').state().step).toEqual(2);
    expect(wrapper.find('DeRegistration').state().id).toEqual(mockId);
    expect(wrapper.find('DeRegistration').state().stepReady).toBe(true);
    
    wrapper.update();

    let formStep2 = wrapper.find('Form');
    let verifiedDevices = formStep2.find('FieldArray').find('input');
    verifiedDevices.simulate('change', {
      target: {
        name: 'verified_devices',
        checked: true
      }
    });
    
    formStep2.simulate('submit');
    wrapper.update();

    let saveStep2 = {
      data: mockVerifiedDevices,
      status: 200 
    }

    let getSections = {
      data: mockSaveStep2Response,
      status: 200 
    }

    mockAxios.mockResponse(saveStep2);    
    mockAxios.mockResponse(getSections);

    wrapper.update();
    expect(wrapper.find('.steps-status').length).toEqual(2);
    expect(wrapper.find('FormGroup').at(0).find('label').text()).toEqual('Shipment document * ');
    expect(wrapper.find('FormGroup').at(1).find('label').text()).toEqual('Authorization document * ');
    expect(wrapper.find('FormGroup').at(2).find('label').text()).toEqual('Certificate document * ');
    expect(wrapper.find('RenderFileInput').length).toEqual(3);

    wrapper.update();

    const previousDetailsBtn = wrapper.find('.steps-status').at(1).find('button');
    previousDetailsBtn.simulate('click');
    wrapper.update();

    expect(wrapper.find('DeRegistration').state().prevStepsModal).toBe(true);
    expect(wrapper.find('Modal').props().isOpen).toBe(true);
    expect(wrapper.find('ModalHeader').length).toEqual(1);
    expect(wrapper.find('ModalBody').find('h6').at(0).text()).toEqual('Basic de-registration details');
    expect(wrapper.find('ModalBody').find('h6').at(1).text()).toEqual('Device model description');
    expect(wrapper.find('ModalBody').length).toEqual(1);
    expect(wrapper.find('ModalBody').find('.table-bordered').length).toEqual(2);
    expect(wrapper.find('ModalFooter').length).toEqual(1);
    expect(wrapper.find('ModalFooter').find('button').length).toEqual(1);

    wrapper.find('ModalFooter').find('button').simulate('click');
    expect(wrapper.find('Modal').props().isOpen).toBe(false);
  });

  test('Step3 has all fields rendered', () => {
    let mockVerifiedDevices = {
      "devices": [
        {
          "count": 1, 
          "brand_name": "HUAWEI", 
          "tac": "86700903", 
          "model_num": "E5573Cs-322", 
          "id": 3361, 
          "technology": "NONE", 
          "device_type": "WLAN Router", 
          "model_name": "E5573Cs-322", 
          "operating_system": "N/A"
        }
      ], 
      "dreg_id": 4386
    }
    let mockSaveStep2Response = {
      "dereg_details": {
        "id": 4386, 
        "reviewer_id": null, 
        "tracking_id": "f6d44340-fd74-4598-a46d-f37bc6facca4", 
        "device_count": 1, 
        "report": null, 
        "file_link": "/var/www/html/dirbs_intl_drs/uploads/f6d44340-fd74-4598-a46d-f37bc6facca4/deregister.txt", 
        "reviewer_name": null, 
        "processing_status_label": "Processed", 
        "status_label": "Awaiting Documents", 
        "report_status_label": "Processing", 
        "reason": "xcx", 
        "file": "deregister.txt", 
        "user_name": "drs exporter user", 
        "invalid_imeis_file": null, 
        "user_id": "e5d58da7-a7af-4661-8c04-0f80eda3922e"
      }, 
      "dereg_docs": [], 
      "dereg_device": [
        {
          "count": 1, 
          "brand_name": "HUAWEI", 
          "tac": "86700903", 
          "model_num": "E5573Cs-322", 
          "id": 3361, 
          "technology": "NONE", 
          "device_type": "WLAN Router", 
          "model_name": "E5573Cs-322", 
          "operating_system": "N/A"
        }
      ]
    }
    const wrapper = mount(
      <I18nextProvider i18n={i18n}>
        <DeRegistration kc={mockKcProps} {...mockMatchParamsDeRegistration} />
      </I18nextProvider>
    );
    let form = wrapper.find('Form');
    const file = new File(['867009033925481'], 'test.txt', {type: 'text/plain'});
    wrapper.find('Formik').setState({
      values : {
        filename: file
      }
    });
    form.find('renderInput').at(0).find('input').simulate('change', {
      target: {
        value: 1,
        name: 'device_count'
      }
    });
    form.find('renderInput').at(1).find('textarea').simulate('change', {
      target: {
        value: "test reason",
        name: 'reason'
      }
    });
    form.simulate('submit');

    let saveStep1 = {
      data: mockResponseObj,
      status: 200 
    }

    let fakeResponse = {
      data: mockResponseObj,
      status: 400
    }

    mockAxios.mockResponse(fakeResponse);
    mockAxios.mockResponse(saveStep1);
    expect(wrapper.find('DeRegistration').state().step).toEqual(2);
    expect(wrapper.find('DeRegistration').state().id).toEqual(mockId);
    expect(wrapper.find('DeRegistration').state().stepReady).toBe(true);
    
    wrapper.update();

    let formStep2 = wrapper.find('Form');
    let verifiedDevices = formStep2.find('FieldArray').find('input');
    verifiedDevices.simulate('change', {
      target: {
        name: 'verified_devices',
        checked: true
      }
    });
    
    formStep2.simulate('submit');
    wrapper.update();

    let saveStep2 = {
      data: mockVerifiedDevices,
      status: 200 
    }

    let getSections = {
      data: mockSaveStep2Response,
      status: 200 
    }

    mockAxios.mockResponse(saveStep2);    
    mockAxios.mockResponse(getSections);

    wrapper.update();
    
    //STEP3 Tests
    let blob = new Blob
    const docFile = new File([blob], 'test.png', {type: 'image/png'});

    let shippingDocInput = wrapper.find('FormGroup').at(0).find('input');
    let authorizationDocInput = wrapper.find('FormGroup').at(1).find('input');
    let certificatieDocInput = wrapper.find('FormGroup').at(2).find('input');

    let step3Form = wrapper.find('form');
    step3Form.simulate('submit');
    expect(wrapper.find('Formik').state().errors.allDocs).toEqual('Document must be provided for all fields.');

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

  test('Submit Step3', () => {
    let spy = sinon.spy()
    const historyMock = {push: spy};
    let mockVerifiedDevices = {
      "devices": [
        {
          "count": 1, 
          "brand_name": "HUAWEI", 
          "tac": "86700903", 
          "model_num": "E5573Cs-322", 
          "id": 3361, 
          "technology": "NONE", 
          "device_type": "WLAN Router", 
          "model_name": "E5573Cs-322", 
          "operating_system": "N/A"
        }
      ], 
      "dreg_id": 4386
    }
    let mockSaveStep2Response = {
      "dereg_details": {
        "id": 4386, 
        "reviewer_id": null, 
        "tracking_id": "f6d44340-fd74-4598-a46d-f37bc6facca4", 
        "device_count": 1, 
        "report": null, 
        "file_link": "/var/www/html/dirbs_intl_drs/uploads/f6d44340-fd74-4598-a46d-f37bc6facca4/deregister.txt", 
        "reviewer_name": null, 
        "processing_status_label": "Processed", 
        "status_label": "Awaiting Documents", 
        "report_status_label": "Processing", 
        "reason": "xcx", 
        "file": "deregister.txt", 
        "user_name": "drs exporter user", 
        "invalid_imeis_file": null, 
        "user_id": "e5d58da7-a7af-4661-8c04-0f80eda3922e"
      }, 
      "dereg_docs": [], 
      "dereg_device": [
        {
          "count": 1, 
          "brand_name": "HUAWEI", 
          "tac": "86700903", 
          "model_num": "E5573Cs-322", 
          "id": 3361, 
          "technology": "NONE", 
          "device_type": "WLAN Router", 
          "model_name": "E5573Cs-322", 
          "operating_system": "N/A"
        }
      ]
    }
    const wrapper = mount(
      <I18nextProvider i18n={i18n}>
        <DeRegistration kc={mockKcProps} {...mockMatchParamsDeRegistration} history={historyMock} />
      </I18nextProvider>
    );
    let form = wrapper.find('Form');
    const file = new File(['867009033925481'], 'test.txt', {type: 'text/plain'});
    wrapper.find('Formik').setState({
      values : {
        filename: file
      }
    });
    form.find('renderInput').at(0).find('input').simulate('change', {
      target: {
        value: 1,
        name: 'device_count'
      }
    });
    form.find('renderInput').at(1).find('textarea').simulate('change', {
      target: {
        value: "test reason",
        name: 'reason'
      }
    });
    form.simulate('submit');

    let saveStep1 = {
      data: mockResponseObj,
      status: 200 
    }

    let fakeResponse = {
      data: mockResponseObj,
      status: 400
    }

    mockAxios.mockResponse(fakeResponse);
    mockAxios.mockResponse(saveStep1);
    expect(wrapper.find('DeRegistration').state().step).toEqual(2);
    expect(wrapper.find('DeRegistration').state().id).toEqual(mockId);
    expect(wrapper.find('DeRegistration').state().stepReady).toBe(true);
    
    wrapper.update();

    let formStep2 = wrapper.find('Form');
    let verifiedDevices = formStep2.find('FieldArray').find('input');
    verifiedDevices.simulate('change', {
      target: {
        name: 'verified_devices',
        checked: true
      }
    });
    
    formStep2.simulate('submit');
    wrapper.update();

    let saveStep2 = {
      data: mockVerifiedDevices,
      status: 200 
    }

    let getSections = {
      data: mockSaveStep2Response,
      status: 200 
    }

    mockAxios.mockResponse(saveStep2);    
    mockAxios.mockResponse(getSections);

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

      let step3Form = wrapper.find('form');
      step3Form.simulate('submit');

      let saveStep3 = {
        data: [
          {
            "id": 6695,
            "filename": "20181219070059_Screen Shot 2018-12-18 at 10.07.08.png",
            "link": "/var/www/html/dirbs_intl_drs/uploads/b43fb560-a5fb-4be8-b94c-99e8746fe71b/20181219070059_Screen Shot 2018-12-18 at 10.07.08.png",
            "label": "shipment document",
            "required": true,
            "reg_details_id": 8819,
            "document_id": 1
          }, 
          {
            "id": 6696,
            "filename": "20181219070059_Screen Shot 2018-12-17 at 17.13.02.png",
            "link": "/var/www/html/dirbs_intl_drs/uploads/b43fb560-a5fb-4be8-b94c-99e8746fe71b/20181219070059_Screen Shot 2018-12-17 at 17.13.02.png",
            "label": "authorization document",
            "required": true,
            "reg_details_id": 8819,
            "document_id": 2
          }, 
          {
            "id": 6697,
            "filename": "20181219070059_Screen Shot 2018-12-17 at 11.46.57.png",
            "link": "/var/www/html/dirbs_intl_drs/uploads/b43fb560-a5fb-4be8-b94c-99e8746fe71b/20181219070059_Screen Shot 2018-12-17 at 11.46.57.png",
            "label": "certificate document",
            "required": true,
            "reg_details_id": 8819,
            "document_id": 3
          }
        ],
        status: 200
      }
      mockAxios.mockResponse(saveStep3);

      expect(spy.calledOnce).toBe(true);
      expect(wrapper.find('DeRegistration').state().stepReady).toBe(true);
  });

  //Step4

  test('If state renders correctly', () => {
    const wrapper = mount(
      <I18nextProvider i18n={i18n}>
        <DeRegistration kc={mockKcProps} {...mockMatchParams} />
      </I18nextProvider>
    );
    let step1DataResponse = {
      data: {
        "tracking_id": "9824a47f-a427-4507-9f40-ea25ffff4fd2",
        "device_count": 1,
        "user_name": "drs exporter user",
        "reason": "test",
        "file_link": "./uploads/9824a47f-a427-4507-9f40-ea25ffff4fd2/deregister.txt",
        "report": null,
        "report_status_label": "New Request",
        "status_label": "New Request",
        "processing_status_label": "New Request",
        "reviewer_id": null,
        "user_id": "e5d58da7-a7af-4661-8c04-0f80eda3922e",
        "id": 842,
        "file": "deregister.txt",
        "reviewer_name": null,
        "invalid_imeis_file": null
      },
      status: 200
    }

    //Mock API responses
    mockAxios.mockResponse(step1DataResponse);
    wrapper.update();

    expect(wrapper.find('DeRegistration').state().step).toEqual(4);
    expect(wrapper.find('DeRegistration').state().stepReady).toBe(true);
    expect(wrapper.find('DeRegistration').state().id).toEqual(842);
  });

  test('If render html elements correctly', () => {
    const wrapper = mount(
      <I18nextProvider i18n={i18n}>
        <DeRegistration kc={mockKcProps} {...mockMatchParams} />
      </I18nextProvider>
    );
    let step1DataResponse = {
      data: {
        "tracking_id": "9824a47f-a427-4507-9f40-ea25ffff4fd2",
        "device_count": 1,
        "user_name": "drs exporter user",
        "reason": "test",
        "file_link": "./uploads/9824a47f-a427-4507-9f40-ea25ffff4fd2/deregister.txt",
        "report": null,
        "report_status_label": "New Request",
        "status_label": "New Request",
        "processing_status_label": "New Request",
        "reviewer_id": null,
        "user_id": "e5d58da7-a7af-4661-8c04-0f80eda3922e",
        "id": 842,
        "file": "deregister.txt",
        "reviewer_name": null,
        "invalid_imeis_file": null
      },
      status: 200
    }

    //Mock API responses
    mockAxios.mockResponse(step1DataResponse);
    wrapper.update();

    expect(wrapper.find('FormGroup').length).toEqual(3);
    expect(wrapper.find('FormGroup').find('Input').at(0).props().disabled).toBe(true);
    expect(wrapper.find('FormGroup').at(0).find('.selectedfile').length).toEqual(1);
    expect(wrapper.find('.alert-warning').length).toEqual(1);
    expect(wrapper.find('Button').last().props().disabled).toBe(false);
  });

  test('Check Formik state errors renders correctly', () => {
    const wrapper = mount(
      <I18nextProvider i18n={i18n}>
        <DeRegistration kc={mockKcProps} {...mockMatchParams} />
      </I18nextProvider>
    );
    let step1DataResponse = {
      data: {
        "tracking_id": "9824a47f-a427-4507-9f40-ea25ffff4fd2",
        "device_count": 1,
        "user_name": "drs exporter user",
        "reason": "test",
        "file_link": "./uploads/9824a47f-a427-4507-9f40-ea25ffff4fd2/deregister.txt",
        "report": null,
        "report_status_label": "New Request",
        "status_label": "New Request",
        "processing_status_label": "New Request",
        "reviewer_id": null,
        "user_id": "e5d58da7-a7af-4661-8c04-0f80eda3922e",
        "id": 842,
        "file": "deregister.txt",
        "reviewer_name": null,
        "invalid_imeis_file": null
      },
      status: 200
    }

    //Mock API responses
    mockAxios.mockResponse(step1DataResponse);
    wrapper.update();

    let form = wrapper.find('form');
    let deviceCount = wrapper.find('renderInput').at(0).find('input');
    let reason = wrapper.find('renderInput').at(1).find('textarea');
    deviceCount.simulate('change', {
      target:{
        name: "device_count",
        value: 'test'
      }
    });
    reason.simulate('change', {
      target:{
        name: "reason",
        value: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat.'
      }
    });
    form.simulate('submit');
    expect(wrapper.find('Formik').state().errors.device_count).toEqual('Must be a number');
    expect(wrapper.find('Formik').state().errors.reason).toEqual('Must be 1000 characters or less');

    deviceCount.simulate('change', {
      target:{
        name: "device_count",
        value: 100000001
      }
    });
    form.simulate('submit');
    expect(wrapper.find('Formik').state().errors.device_count).toEqual('Must be in between 1-1,000,000');
  });

  test('Submit to next step 2', () => {
    const wrapper = mount(
      <I18nextProvider i18n={i18n}>
        <DeRegistration kc={mockKcProps} {...mockMatchParams} />
      </I18nextProvider>
    );
    let step1DataResponse = {
      data: {
        "tracking_id": "9824a47f-a427-4507-9f40-ea25ffff4fd2",
        "device_count": 1,
        "user_name": "drs exporter user",
        "reason": "test",
        "file_link": "./uploads/9824a47f-a427-4507-9f40-ea25ffff4fd2/deregister.txt",
        "report": null,
        "report_status_label": "New Request",
        "status_label": "New Request",
        "processing_status_label": "New Request",
        "reviewer_id": null,
        "user_id": "e5d58da7-a7af-4661-8c04-0f80eda3922e",
        "id": 842,
        "file": "deregister.txt",
        "reviewer_name": null,
        "invalid_imeis_file": null
      },
      status: 200
    }

    //Mock API responses
    mockAxios.mockResponse(step1DataResponse);
    wrapper.update();

    wrapper.find('form').simulate('submit');
    let mockResponseS4Obj = {
      "request": {
        "id": 842, 
        "reviewer_id": null, 
        "tracking_id": "9824a47f-a427-4507-9f40-ea25ffff4fd2", 
        "device_count": 1, 
        "report": null, 
        "file_link": "./uploads/9824a47f-a427-4507-9f40-ea25ffff4fd2/deregister.txt", 
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

    let saveStep4 = {
      data: mockResponseS4Obj,
      status: 200 
    }

    mockAxios.mockResponse(saveStep4);
    expect(wrapper.find('DeRegistration').state().step).toEqual(2);
    expect(wrapper.find('DeRegistration').state().id).toEqual(842);
    expect(wrapper.find('DeRegistration').state().stepReady).toBe(true);
  });

  test('Close request button click works correctly', () => {
    const wrapper = mount(
      <I18nextProvider i18n={i18n}>
        <DeRegistration kc={mockKcProps} {...mockMatchParams} />
      </I18nextProvider>
    );
    let step1DataResponse = {
      data: {
        "tracking_id": "9824a47f-a427-4507-9f40-ea25ffff4fd2",
        "device_count": 1,
        "user_name": "drs exporter user",
        "reason": "test",
        "file_link": "./uploads/9824a47f-a427-4507-9f40-ea25ffff4fd2/deregister.txt",
        "report": null,
        "report_status_label": "New Request",
        "status_label": "New Request",
        "processing_status_label": "New Request",
        "reviewer_id": null,
        "user_id": "e5d58da7-a7af-4661-8c04-0f80eda3922e",
        "id": 842,
        "file": "deregister.txt",
        "reviewer_name": null,
        "invalid_imeis_file": null
      },
      status: 200
    }

    //Mock API responses
    mockAxios.mockResponse(step1DataResponse);
    wrapper.update();

    wrapper.find('form').simulate('submit');
    let mockResponseS4Obj = {
      "request": {
        "id": 842, 
        "reviewer_id": null, 
        "tracking_id": "9824a47f-a427-4507-9f40-ea25ffff4fd2", 
        "device_count": 1, 
        "report": null, 
        "file_link": "./uploads/9824a47f-a427-4507-9f40-ea25ffff4fd2/deregister.txt", 
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
    let saveStep4 = {
      data: mockResponseS4Obj,
      status: 200 
    }
    mockAxios.mockResponse(saveStep4);

    wrapper.update();

    let closeButton = wrapper.find('ModalFooter').find('Button').at(0);
    closeButton.simulate('click');

    let closeRequestResponse = {
      "tracking_id": "9824a47f-a427-4507-9f40-ea25ffff4fd2", 
      "device_count": 1, 
      "user_name": "drs exporter user", 
      "id": 842, 
      "reviewer_name": null, 
      "report_status_label": "New Request", 
      "status_label": "Closed", 
      "processing_status_label": "New Request", 
      "reviewer_id": null, 
      "user_id": "e5d58da7-a7af-4661-8c04-0f80eda3922e", 
      "file": "deregister.txt", 
      "reason": "test step 4", 
      "invalid_imeis_file": null
    }
    let closeDeRequest = {
      data: closeRequestResponse,
      status: 200 
    }
    mockAxios.mockResponse(closeDeRequest);
    wrapper.update();
    expect(wrapper.find('DeRegistration').state().id).toEqual(842);
    expect(wrapper.find('DeRegistration').state().stepReady).toBe(true);
  });

})