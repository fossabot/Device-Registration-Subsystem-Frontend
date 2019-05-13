/*
Copyright (c) 2018 Qualcomm Technologies, Inc.
All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted (subject to the limitations in the disclaimer below) provided that the following conditions are met:

* Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
* Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
* Neither the name of Qualcomm Technologies, Inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.
NO EXPRESS OR IMPLIED LICENSES TO ANY PARTY'S PATENT RIGHTS ARE GRANTED BY THIS LICENSE. THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/
import i18n from '../../../../i18n'
import React from "react";
import axios from 'axios'
import mockAxios from 'jest-mock-axios';
import {I18nextProvider} from 'react-i18next';
import NewRegistationRequest from './NewRegistationRequest'

//Constants
import {
  MANUFACTURE_LOCATIONS,
  DEVICE_TYPES,
  TECHNOLOGIES,
  DOCUMENTS,
  EXTENSIONS
} from "../../../../utilities/constants";

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

//Mock params
const mockMatchParamsNewRequest = {
  match: {
    params: {
      id: "id",
    }
  }
}

//Mock global functions
/*const confirmStub = Sinon.stub(window, 'confirm');
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

describe("New Registration Request module", () => {
  afterEach(() => {
    mockAxios.reset();
  });
  test('if renders correctly', () => {
    const wrapper = shallow(
      <NewRegistationRequest/>);
    expect(wrapper).toMatchSnapshot()
  })
  test('if renders correctly again', () => {
    const wrapper = render(
      <I18nextProvider i18n={i18n}>
        <NewRegistationRequest/>
      </I18nextProvider>
    )
    expect(wrapper).toMatchSnapshot()
  });
  test('if state renders correctly', () => {
    const wrapper = mount(
      <I18nextProvider i18n={i18n}>
        <NewRegistationRequest kc={mockKcProps} {...mockMatchParamsNewRequest}/>
      </I18nextProvider>
    )
    expect(wrapper.find('NewRegistationRequest').state().id).toEqual(null)
    expect(wrapper.find('NewRegistationRequest').state().step).toEqual(1)
    expect(wrapper.find('NewRegistationRequest').state().stepReady).toBe(true)
  });
  describe('New Registration Step1', () => {
    afterEach(() => {
      mockAxios.reset();
    });
    //Step1 tests
    test('if renders step1 components correctly', () => {
      const wrapper = mount(
        <I18nextProvider i18n={i18n}>
          <NewRegistationRequest kc={mockKcProps} {...mockMatchParamsNewRequest}/>
        </I18nextProvider>
      )
      expect(wrapper.find('StepIndicator').length).toEqual(1)
      expect(wrapper.find('CardHeader').find('b').text()).toEqual('Basic registration details')
    })
    test('if step loading renders correctly', () => {
      const wrapper = mount(
        <I18nextProvider i18n={i18n}>
          <NewRegistationRequest kc={mockKcProps} {...mockMatchParamsNewRequest}/>
        </I18nextProvider>
      )
      wrapper.find('NewRegistationRequest').setState({
        stepReady: false
      })
      expect(wrapper.find('StepLoading').length).toEqual(1)
    })
    test('If downloads the report',()=>{

    })
    test('if number of devices changes type input', () => {
      const wrapper = mount(
        <I18nextProvider i18n={i18n}>
          <NewRegistationRequest kc={mockKcProps} {...mockMatchParamsNewRequest}/>
        </I18nextProvider>
      )
      let DeviceCountInput = wrapper.find('Input').at(0)
      let ImeiInput = wrapper.find('Input').at(1)
      DeviceCountInput.simulate('change', {
        target: {
          name: "device_count",
          value: 5
        }
      })
      ImeiInput.simulate('change', {
        target: {
          name: "imei_per_device",
          value: 2
        }
      })
      wrapper.update()
      expect(wrapper.find('.asitfield').find('span').text()).toEqual('Webpage input')

      DeviceCountInput = wrapper.find('Input').at(0)
      DeviceCountInput.simulate('change', {
        target: {
          name: "device_count",
          value: 11
        }
      })
      ImeiInput.simulate('change', {
        target: {
          name: "imei_per_device",
          value: 2
        }
      })
      wrapper.update()
      expect(wrapper.find('.asitfield').find('span').at(0).text()).toEqual(' Tab-delimited file')
      expect(wrapper.find('FormGroup').last().find('input').props().type).toEqual('file')
    })
    test('if Formik props renders correctly', () => {
      const wrapper = mount(
        <I18nextProvider i18n={i18n}>
          <NewRegistationRequest kc={mockKcProps} {...mockMatchParamsNewRequest}/>
        </I18nextProvider>
      )
      let DeviceCountInput = wrapper.find('Input').at(0)
      let ImeiInput = wrapper.find('Input').at(1)
      DeviceCountInput.simulate('change', {
        target: {
          name: "device_count",
          value: 5
        }
      })
      ImeiInput.simulate('change', {
        target: {
          name: "imei_per_device",
          value: 2
        }
      })
      wrapper.update()

      expect(wrapper.find('Formik').props().step).toEqual(1)
      expect(wrapper.find('Formik').props().initialValues.device_count).toEqual('')
      expect(wrapper.find('Formik').props().initialValues.imei_per_device).toEqual('')
      expect(wrapper.find('Formik').props().initialValues.device_imei).toEqual('')

      expect(wrapper.find('Formik').state().values.device_count).toEqual(5)
      expect(wrapper.find('Formik').state().values.imei_per_device).toEqual(2)
      expect(wrapper.find('Formik').state().values.device_imei).toEqual('webpage')
    })
    test('if Add device correctly', () => {
      const wrapper = mount(
        <I18nextProvider i18n={i18n}>
          <NewRegistationRequest kc={mockKcProps} {...mockMatchParamsNewRequest}/>
        </I18nextProvider>
      )
      let DeviceCountInput = wrapper.find('Input').at(0)
      let ImeiInput = wrapper.find('Input').at(1)
      DeviceCountInput.simulate('change', {
        target: {
          name: "device_count",
          value: 1
        }
      })
      ImeiInput.simulate('change', {
        target: {
          name: "imei_per_device",
          value: 1
        }
      })
      wrapper.update()

      const addDeviceBtn = wrapper.find('button').at(1)
      addDeviceBtn.simulate('click')

      expect(wrapper.find('.imei-col').at(1).find('Input').props().name).toEqual('devices.0.imeis.0.imei')
      expect(wrapper.find('.imei-col').at(2).find('Input').props().name).toEqual('devices.0.imeis.0.reImei')
    })
    test('if validations runs correctly', () => {
      const wrapper = mount(
        <I18nextProvider i18n={i18n}>
          <NewRegistationRequest kc={mockKcProps} {...mockMatchParamsNewRequest}/>
        </I18nextProvider>
      )

      let form = wrapper.find('Form')
      form.simulate('submit')

      expect(wrapper.find('Formik').state().errors.device_count).toEqual('This field is required')
      expect(wrapper.find('Formik').state().errors.imei_per_device).toEqual('This field is required')
      expect(wrapper.find('Formik').state().errors.m_location).toEqual('This field is required')


      let DeviceCountInput = wrapper.find('Input').at(0)
      let ImeiInput = wrapper.find('Input').at(1)

      DeviceCountInput.simulate('change', {
        target: {
          name: "device_count",
          value: 1
        }
      })
      ImeiInput.simulate('change', {
        target: {
          name: "imei_per_device",
          value: "abc"
        }
      })
      DeviceCountInput.simulate('change', {
        target: {
          name: "device_count",
          value: 'abc'
        }
      })
      form = wrapper.find('Form')
      form.simulate('submit')
      wrapper.update()

      expect(wrapper.find('Formik').state().errors.imei_per_device).toEqual('Must be a number')
      expect(wrapper.find('Formik').state().errors.device_count).toEqual('Must be a number')
    })
    test('if progress to next step2', () => {
      let mockId = 8806
      let mockRegDetailsResponse = {
        "imei_per_device": 1,
        "id": mockId,
        "reviewer_id": null,
        "imeis": [["11111111111111"]],
        "tracking_id": "e24b7e0b-d142-4bee-a358-bea6824a25ba",
        "device_count": 1,
        "updated_at": "2018-12-18T05:32:04.688010+00:00",
        "report": null,
        "created_at": "2018-12-18T05:32:04.688010+00:00",
        "reviewer_name": null,
        "processing_status_label": "New Request",
        "user_name": "drs importer user",
        "duplicate_imeis_file": null,
        "report_status_label": "New Request",
        "file": null,
        "status_label": "New Request",
        "m_location": "local",
        "user_id": "6ed9747b-d36a-4799-88c8-59d17a9abb5a"
      }
      const wrapper = mount(
        <I18nextProvider i18n={i18n}>
          <NewRegistationRequest kc={mockKcProps} {...mockMatchParamsNewRequest}/>
        </I18nextProvider>
      )

      let DeviceCountInput = wrapper.find('Input').at(0)
      let ImeiInput = wrapper.find('Input').at(1)
      let location = wrapper.find('select')

      //Add values to inputs
      location.simulate('change', {
        target: {
          name: 'm_location',
          value: 'local'
        }
      })

      DeviceCountInput.simulate('change', {
        target: {
          name: "device_count",
          value: 1
        }
      })
      ImeiInput.simulate('change', {
        target: {
          name: "imei_per_device",
          value: 1
        }
      })
      wrapper.update()

      //Add Device
      const addDeviceBtn = wrapper.find('button').at(1)
      addDeviceBtn.simulate('click')

      //Add device IMEIs
      wrapper.find('input').at(4).simulate('change', {
        target: {
          name: 'devices.0.imeis.0.imei',
          value: '11111111111111'
        }
      })
      wrapper.find('input').at(5).simulate('change', {
        target: {
          name: 'devices.0.imeis.0.reImei',
          value: '11111111111111'
        }
      })
      let form = wrapper.find('Form')
      form.simulate('submit')

      let saveStep1 = {
        data: mockRegDetailsResponse,
        status: 200
      }
      mockAxios.mockResponse(saveStep1)
      expect(wrapper.find('NewRegistationRequest').state().step).toEqual(2)
      expect(wrapper.find('NewRegistationRequest').state().id).toEqual(mockId)
      expect(wrapper.find('NewRegistationRequest').state().stepReady).toBe(true)
      let getPreviousStepsDataResponse = {
        data: {
          "reg_docs": [],
          "reg_details": mockRegDetailsResponse,
          "reg_device": {}
        },
        status: 200
      }

      mockAxios.mockResponse(getPreviousStepsDataResponse)
      expect(wrapper.find('NewRegistationRequest').state().prevStepsData.reg_details).toBe(mockRegDetailsResponse)
    })
  })
  describe('New Registration Step2', () => {
    afterEach(() => {
      mockAxios.reset();
    });
    test('if step2 has all fields rendered successfully', () => {
      let mockId = 8806
      let mockRegDetailsResponse = {
        "imei_per_device": 1,
        "id": mockId,
        "reviewer_id": null,
        "imeis": [["11111111111111"]],
        "tracking_id": "e24b7e0b-d142-4bee-a358-bea6824a25ba",
        "device_count": 1,
        "updated_at": "2018-12-18T05:32:04.688010+00:00",
        "report": null,
        "created_at": "2018-12-18T05:32:04.688010+00:00",
        "reviewer_name": null,
        "processing_status_label": "New Request",
        "user_name": "drs importer user",
        "duplicate_imeis_file": null,
        "report_status_label": "New Request",
        "file": null,
        "status_label": "New Request",
        "m_location": "local",
        "user_id": "6ed9747b-d36a-4799-88c8-59d17a9abb5a"
      }
      const wrapper = mount(
        <I18nextProvider i18n={i18n}>
          <NewRegistationRequest kc={mockKcProps} {...mockMatchParamsNewRequest}/>
        </I18nextProvider>
      )

      let DeviceCountInput = wrapper.find('Input').at(0)
      let ImeiInput = wrapper.find('Input').at(1)
      let location = wrapper.find('select')

      //Add values to inputs
      location.simulate('change', {
        target: {
          name: 'm_location',
          value: 'local'
        }
      })

      DeviceCountInput.simulate('change', {
        target: {
          name: "device_count",
          value: 1
        }
      })
      ImeiInput.simulate('change', {
        target: {
          name: "imei_per_device",
          value: 1
        }
      })
      wrapper.update()

      //Add Device
      const addDeviceBtn = wrapper.find('button').at(1)
      addDeviceBtn.simulate('click')

      //Add device IMEIs
      wrapper.find('input').at(4).simulate('change', {
        target: {
          name: 'devices.0.imeis.0.imei',
          value: '11111111111111'
        }
      })
      wrapper.find('input').at(5).simulate('change', {
        target: {
          name: 'devices.0.imeis.0.reImei',
          value: '11111111111111'
        }
      })
      let form = wrapper.find('Form')
      form.simulate('submit')

      let saveStep1 = {
        data: mockRegDetailsResponse,
        status: 200
      }
      mockAxios.mockResponse(saveStep1)
      expect(wrapper.find('NewRegistationRequest').state().step).toEqual(2)
      expect(wrapper.find('NewRegistationRequest').state().id).toEqual(mockId)
      expect(wrapper.find('NewRegistationRequest').state().stepReady).toBe(true)
      let getPreviousStepsDataResponse = {
        data: {
          "reg_docs": [],
          "reg_details": mockRegDetailsResponse,
          "reg_device": {}
        },
        status: 200
      }

      mockAxios.mockResponse(getPreviousStepsDataResponse)
      expect(wrapper.find('NewRegistationRequest').state().prevStepsData.reg_details).toBe(mockRegDetailsResponse)
      wrapper.update()

      //STEP2 Tests
      expect(wrapper.find('Field').at(0).props().name).toEqual('brand')
      expect(wrapper.find('Field').at(1).props().name).toEqual('model_name')
      expect(wrapper.find('Field').at(2).props().name).toEqual('model_num')
      expect(wrapper.find('Field').at(3).props().name).toEqual('device_type')
      expect(wrapper.find('Field').at(5).props().name).toEqual('operating_system')
      expect(wrapper.find('Field').at(6).props().name).toEqual('technologies')

    })
    test('if previous Details render modal', () => {
      let mockId = 8806
      let mockRegDetailsResponse = {
        "imei_per_device": 1,
        "id": mockId,
        "reviewer_id": null,
        "imeis": [["11111111111111"]],
        "tracking_id": "e24b7e0b-d142-4bee-a358-bea6824a25ba",
        "device_count": 1,
        "updated_at": "2018-12-18T05:32:04.688010+00:00",
        "report": null,
        "created_at": "2018-12-18T05:32:04.688010+00:00",
        "reviewer_name": null,
        "processing_status_label": "New Request",
        "user_name": "drs importer user",
        "duplicate_imeis_file": null,
        "report_status_label": "New Request",
        "file": null,
        "status_label": "New Request",
        "m_location": "local",
        "user_id": "6ed9747b-d36a-4799-88c8-59d17a9abb5a"
      }
      const wrapper = mount(
        <I18nextProvider i18n={i18n}>
          <NewRegistationRequest kc={mockKcProps} {...mockMatchParamsNewRequest}/>
        </I18nextProvider>
      )

      let DeviceCountInput = wrapper.find('Input').at(0)
      let ImeiInput = wrapper.find('Input').at(1)
      let location = wrapper.find('select')

      //Add values to inputs
      location.simulate('change', {
        target: {
          name: 'm_location',
          value: 'local'
        }
      })

      DeviceCountInput.simulate('change', {
        target: {
          name: "device_count",
          value: 1
        }
      })
      ImeiInput.simulate('change', {
        target: {
          name: "imei_per_device",
          value: 1
        }
      })
      wrapper.update()

      //Add Device
      const addDeviceBtn = wrapper.find('button').at(1)
      addDeviceBtn.simulate('click')

      //Add device IMEIs
      wrapper.find('input').at(4).simulate('change', {
        target: {
          name: 'devices.0.imeis.0.imei',
          value: '11111111111111'
        }
      })
      wrapper.find('input').at(5).simulate('change', {
        target: {
          name: 'devices.0.imeis.0.reImei',
          value: '11111111111111'
        }
      })
      let form = wrapper.find('Form')
      form.simulate('submit')

      let saveStep1 = {
        data: mockRegDetailsResponse,
        status: 200
      }
      mockAxios.mockResponse(saveStep1)
      expect(wrapper.find('NewRegistationRequest').state().step).toEqual(2)
      expect(wrapper.find('NewRegistationRequest').state().id).toEqual(mockId)
      expect(wrapper.find('NewRegistationRequest').state().stepReady).toBe(true)
      let getPreviousStepsDataResponse = {
        data: {
          "reg_docs": [],
          "reg_details": mockRegDetailsResponse,
          "reg_device": {}
        },
        status: 200
      }

      mockAxios.mockResponse(getPreviousStepsDataResponse)
      expect(wrapper.find('NewRegistationRequest').state().prevStepsData.reg_details).toBe(mockRegDetailsResponse)
      wrapper.update()

      //STEP2 Tests
      const previousDetailsBtn = wrapper.find('.steps-status').at(1).find('button')
      previousDetailsBtn.simulate('click')
      wrapper.update()

      expect(wrapper.find('NewRegistationRequest').state().prevStepsModal).toBe(true)
      expect(wrapper.find('Modal').props().isOpen).toBe(true)
      expect(wrapper.find('ModalHeader').length).toEqual(1)
      expect(wrapper.find('ModalBody').find('h6').text()).toEqual('Basic registration details')
      expect(wrapper.find('ModalBody').length).toEqual(1)
      expect(wrapper.find('ModalBody').find('.table-bordered').length).toEqual(1)
      expect(wrapper.find('ModalFooter').length).toEqual(1)
      expect(wrapper.find('ModalFooter').find('button').length).toEqual(1)

      wrapper.find('ModalFooter').find('button').simulate('click')
      expect(wrapper.find('Modal').props().isOpen).toBe(false)
    })
    test('if validations for step2 runs correctly', () => {
      let mockId = 8806

      let mockRegDetailsResponse = {
        "imei_per_device": 1,
        "id": mockId,
        "reviewer_id": null,
        "imeis": [["11111111111111"]],
        "tracking_id": "e24b7e0b-d142-4bee-a358-bea6824a25ba",
        "device_count": 1,
        "updated_at": "2018-12-18T05:32:04.688010+00:00",
        "report": null,
        "created_at": "2018-12-18T05:32:04.688010+00:00",
        "reviewer_name": null,
        "processing_status_label": "New Request",
        "user_name": "drs importer user",
        "duplicate_imeis_file": null,
        "report_status_label": "New Request",
        "file": null,
        "status_label": "New Request",
        "m_location": "local",
        "user_id": "6ed9747b-d36a-4799-88c8-59d17a9abb5a"
      }
      const wrapper = mount(
        <I18nextProvider i18n={i18n}>
          <NewRegistationRequest kc={mockKcProps} {...mockMatchParamsNewRequest}/>
        </I18nextProvider>
      )

      let DeviceCountInput = wrapper.find('Input').at(0)
      let ImeiInput = wrapper.find('Input').at(1)
      let location = wrapper.find('select')

      //Add values to inputs
      location.simulate('change', {
        target: {
          name: 'm_location',
          value: 'local'
        }
      })

      DeviceCountInput.simulate('change', {
        target: {
          name: "device_count",
          value: 1
        }
      })
      ImeiInput.simulate('change', {
        target: {
          name: "imei_per_device",
          value: 1
        }
      })
      wrapper.update()

      //Add Device
      const addDeviceBtn = wrapper.find('button').at(1)
      addDeviceBtn.simulate('click')

      //Add device IMEIs
      wrapper.find('input').at(4).simulate('change', {
        target: {
          name: 'devices.0.imeis.0.imei',
          value: '11111111111111'
        }
      })
      wrapper.find('input').at(5).simulate('change', {
        target: {
          name: 'devices.0.imeis.0.reImei',
          value: '11111111111111'
        }
      })
      let form = wrapper.find('Form')
      form.simulate('submit')

      let saveStep1 = {
        data: mockRegDetailsResponse,
        status: 200
      }
      mockAxios.mockResponse(saveStep1)
      expect(wrapper.find('NewRegistationRequest').state().step).toEqual(2)
      expect(wrapper.find('NewRegistationRequest').state().id).toEqual(mockId)
      expect(wrapper.find('NewRegistationRequest').state().stepReady).toBe(true)
      let getPreviousStepsDataResponse = {
        data: {
          "reg_docs": [],
          "reg_details": mockRegDetailsResponse,
          "reg_device": {}
        },
        status: 200
      }

      mockAxios.mockResponse(getPreviousStepsDataResponse)
      expect(wrapper.find('NewRegistationRequest').state().prevStepsData.reg_details).toBe(mockRegDetailsResponse)
      wrapper.update()

      //STEP2 Tests
      let formStep2 = wrapper.find('Form')
      formStep2.simulate('submit')

      //Empty submit validation
      expect(wrapper.find('Formik').state().errors.brand).toEqual('This field is required')
      expect(wrapper.find('Formik').state().errors.model_name).toEqual('This field is required')
      expect(wrapper.find('Formik').state().errors.model_num).toEqual('This field is required')
      expect(wrapper.find('Formik').state().errors.device_type).toEqual('This field is required')
      expect(wrapper.find('Formik').state().errors.operating_system).toEqual('This field is required')
      expect(wrapper.find('Formik').state().errors.technologies).toEqual('Please select at least one option')

      let brandInput = wrapper.find('Field').at(0).find('input')
      brandInput.simulate('change', {
        target: {
          name: 'brand',
          value: mockInvalidInput
        }
      })

      let modelName = wrapper.find('Field').at(1).find('input')
      modelName.simulate('change', {
        target: {
          name: 'model_name',
          value: mockInvalidInput
        }
      })

      let modelNum = wrapper.find('Field').at(2).find('input')
      modelNum.simulate('change', {
        target: {
          name: 'model_num',
          value: mockInvalidInput
        }
      })

      let operatingSystem = wrapper.find('Field').at(5).find('input')
      operatingSystem.simulate('change', {
        target: {
          name: 'operating_system',
          value: mockInvalidInput
        }
      })

      formStep2 = wrapper.find('Form')
      formStep2.simulate('submit')

      expect(wrapper.find('Formik').state().errors.brand).toEqual('Must be 1000 characters or less')
      expect(wrapper.find('Formik').state().errors.model_name).toEqual('Must be 1000 characters or less')
      expect(wrapper.find('Formik').state().errors.model_num).toEqual('Must be 1000 characters or less')
      expect(wrapper.find('Formik').state().errors.operating_system).toEqual('Must be 1000 characters or less')
    })
    test('if progress to step3', () => {
      let mockId = 8806
      let mockRegDetailsResponse = {
        "imei_per_device": 1,
        "id": mockId,
        "reviewer_id": null,
        "imeis": [["11111111111111"]],
        "tracking_id": "e24b7e0b-d142-4bee-a358-bea6824a25ba",
        "device_count": 1,
        "updated_at": "2018-12-18T05:32:04.688010+00:00",
        "report": null,
        "created_at": "2018-12-18T05:32:04.688010+00:00",
        "reviewer_name": null,
        "processing_status_label": "New Request",
        "user_name": "drs importer user",
        "duplicate_imeis_file": null,
        "report_status_label": "New Request",
        "file": null,
        "status_label": "New Request",
        "m_location": "local",
        "user_id": "6ed9747b-d36a-4799-88c8-59d17a9abb5a"
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
          <NewRegistationRequest kc={mockKcProps} {...mockMatchParamsNewRequest}/>
        </I18nextProvider>
      )

      let DeviceCountInput = wrapper.find('Input').at(0)
      let ImeiInput = wrapper.find('Input').at(1)
      let location = wrapper.find('select')

      //Add values to inputs
      location.simulate('change', {
        target: {
          name: 'm_location',
          value: 'local'
        }
      })

      DeviceCountInput.simulate('change', {
        target: {
          name: "device_count",
          value: 1
        }
      })
      ImeiInput.simulate('change', {
        target: {
          name: "imei_per_device",
          value: 1
        }
      })
      wrapper.update()

      //Add Device
      const addDeviceBtn = wrapper.find('button').at(1)
      addDeviceBtn.simulate('click')

      //Add device IMEIs
      wrapper.find('input').at(4).simulate('change', {
        target: {
          name: 'devices.0.imeis.0.imei',
          value: '11111111111111'
        }
      })
      wrapper.find('input').at(5).simulate('change', {
        target: {
          name: 'devices.0.imeis.0.reImei',
          value: '11111111111111'
        }
      })
      let form = wrapper.find('Form')
      form.simulate('submit')

      let saveStep1 = {
        data: mockRegDetailsResponse,
        status: 200
      }
      mockAxios.mockResponse(saveStep1)
      expect(wrapper.find('NewRegistationRequest').state().step).toEqual(2)
      expect(wrapper.find('NewRegistationRequest').state().id).toEqual(mockId)
      expect(wrapper.find('NewRegistationRequest').state().stepReady).toBe(true)
      let getPreviousStepsDataResponse = {
        data: {
          "reg_docs": [],
          "reg_details": mockRegDetailsResponse,
          "reg_device": {}
        },
        status: 200
      }

      mockAxios.mockResponse(getPreviousStepsDataResponse)
      expect(wrapper.find('NewRegistationRequest').state().prevStepsData.reg_details).toBe(mockRegDetailsResponse)
      wrapper.update()

      //STEP2 Tests
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

      expect(wrapper.find('NewRegistationRequest').state().step).toEqual(3)
      expect(wrapper.find('NewRegistationRequest').state().id).toEqual(mockId)
      expect(wrapper.find('NewRegistationRequest').state().stepReady).toBe(true)

      getPreviousStepsDataResponse = {
        data: {
          "reg_docs": [],
          "reg_details": mockRegDetails,
          "reg_device": {}
        },
        status: 200
      }

      mockAxios.mockResponse(getPreviousStepsDataResponse)
      expect(wrapper.find('NewRegistationRequest').state().prevStepsData.reg_details).toBe(mockRegDetails)

    })
  })
  describe('New Registration Step3', () => {
    afterEach(() => {
      mockAxios.reset();
    });
    test('if has all fields rendered successfully', () => {
      let mockId = 8806
      let mockRegDetailsResponse = {
        "imei_per_device": 1,
        "id": mockId,
        "reviewer_id": null,
        "imeis": [["11111111111111"]],
        "tracking_id": "e24b7e0b-d142-4bee-a358-bea6824a25ba",
        "device_count": 1,
        "updated_at": "2018-12-18T05:32:04.688010+00:00",
        "report": null,
        "created_at": "2018-12-18T05:32:04.688010+00:00",
        "reviewer_name": null,
        "processing_status_label": "New Request",
        "user_name": "drs importer user",
        "duplicate_imeis_file": null,
        "report_status_label": "New Request",
        "file": null,
        "status_label": "New Request",
        "m_location": "local",
        "user_id": "6ed9747b-d36a-4799-88c8-59d17a9abb5a"
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
          <NewRegistationRequest kc={mockKcProps} {...mockMatchParamsNewRequest}/>
        </I18nextProvider>
      )

      let DeviceCountInput = wrapper.find('Input').at(0)
      let ImeiInput = wrapper.find('Input').at(1)
      let location = wrapper.find('select')

      //Add values to inputs
      location.simulate('change', {
        target: {
          name: 'm_location',
          value: 'local'
        }
      })

      DeviceCountInput.simulate('change', {
        target: {
          name: "device_count",
          value: 1
        }
      })
      ImeiInput.simulate('change', {
        target: {
          name: "imei_per_device",
          value: 1
        }
      })
      wrapper.update()

      //Add Device
      const addDeviceBtn = wrapper.find('button').at(1)
      addDeviceBtn.simulate('click')

      //Add device IMEIs
      wrapper.find('input').at(4).simulate('change', {
        target: {
          name: 'devices.0.imeis.0.imei',
          value: '11111111111111'
        }
      })
      wrapper.find('input').at(5).simulate('change', {
        target: {
          name: 'devices.0.imeis.0.reImei',
          value: '11111111111111'
        }
      })
      let form = wrapper.find('Form')
      form.simulate('submit')

      let saveStep1 = {
        data: mockRegDetailsResponse,
        status: 200
      }
      mockAxios.mockResponse(saveStep1)
      let getPreviousStepsDataResponse = {
        data: {
          "reg_docs": [],
          "reg_details": mockRegDetailsResponse,
          "reg_device": {}
        },
        status: 200
      }

      mockAxios.mockResponse(getPreviousStepsDataResponse)
      wrapper.update()

      //STEP2
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
      getPreviousStepsDataResponse = {
        data: {
          "reg_docs": [],
          "reg_details": mockRegDetails,
          "reg_device": {}
        },
        status: 200
      }
      mockAxios.mockResponse(getPreviousStepsDataResponse)
      wrapper.update()

      //STEP3 Tests
      expect(wrapper.find('FormGroup').at(0).find('label').text()).toEqual('Shipment document * ')
      expect(wrapper.find('FormGroup').at(1).find('label').text()).toEqual('Authorization document * ')
      expect(wrapper.find('FormGroup').at(2).find('label').text()).toEqual('Certificate document * ')
      expect(wrapper.find('RenderFileInput').length).toEqual(3)

    })
    test('if previous Details render modal', () => {
      let mockId = 8806
      let mockRegDetailsResponse = {
        "imei_per_device": 1,
        "id": mockId,
        "reviewer_id": null,
        "imeis": [["11111111111111"]],
        "tracking_id": "e24b7e0b-d142-4bee-a358-bea6824a25ba",
        "device_count": 1,
        "updated_at": "2018-12-18T05:32:04.688010+00:00",
        "report": null,
        "created_at": "2018-12-18T05:32:04.688010+00:00",
        "reviewer_name": null,
        "processing_status_label": "New Request",
        "user_name": "drs importer user",
        "duplicate_imeis_file": null,
        "report_status_label": "New Request",
        "file": null,
        "status_label": "New Request",
        "m_location": "local",
        "user_id": "6ed9747b-d36a-4799-88c8-59d17a9abb5a"
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
          <NewRegistationRequest kc={mockKcProps} {...mockMatchParamsNewRequest}/>
        </I18nextProvider>
      )

      let DeviceCountInput = wrapper.find('Input').at(0)
      let ImeiInput = wrapper.find('Input').at(1)
      let location = wrapper.find('select')

      //Add values to inputs
      location.simulate('change', {
        target: {
          name: 'm_location',
          value: 'local'
        }
      })

      DeviceCountInput.simulate('change', {
        target: {
          name: "device_count",
          value: 1
        }
      })
      ImeiInput.simulate('change', {
        target: {
          name: "imei_per_device",
          value: 1
        }
      })
      wrapper.update()

      //Add Device
      const addDeviceBtn = wrapper.find('button').at(1)
      addDeviceBtn.simulate('click')

      //Add device IMEIs
      wrapper.find('input').at(4).simulate('change', {
        target: {
          name: 'devices.0.imeis.0.imei',
          value: '11111111111111'
        }
      })
      wrapper.find('input').at(5).simulate('change', {
        target: {
          name: 'devices.0.imeis.0.reImei',
          value: '11111111111111'
        }
      })
      let form = wrapper.find('Form')
      form.simulate('submit')

      let saveStep1 = {
        data: mockRegDetailsResponse,
        status: 200
      }
      mockAxios.mockResponse(saveStep1)
      let getPreviousStepsDataResponse = {
        data: {
          "reg_docs": [],
          "reg_details": mockRegDetailsResponse,
          "reg_device": {}
        },
        status: 200
      }

      mockAxios.mockResponse(getPreviousStepsDataResponse)
      wrapper.update()

      //STEP2
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
      getPreviousStepsDataResponse = {
        data: {
          "reg_docs": [],
          "reg_details": mockRegDetails,
          "reg_device": {}
        },
        status: 200
      }
      mockAxios.mockResponse(getPreviousStepsDataResponse)
      wrapper.update()

      //STEP3 Tests
      const previousDetailsBtn = wrapper.find('.steps-status').at(1).find('button')
      previousDetailsBtn.simulate('click')
      wrapper.update()

      // console.log(wrapper.find('NewRegistationRequest').debug())

      expect(wrapper.find('NewRegistationRequest').state().prevStepsModal).toBe(true)
      expect(wrapper.find('Modal').props().isOpen).toBe(true)
      expect(wrapper.find('ModalHeader').length).toEqual(1)
      expect(wrapper.find('ModalBody').find('h6').text()).toEqual('Basic registration details')
      expect(wrapper.find('ModalBody').length).toEqual(1)
      expect(wrapper.find('ModalBody').find('.table-bordered').length).toEqual(1)
      expect(wrapper.find('ModalFooter').length).toEqual(1)
      expect(wrapper.find('ModalFooter').find('button').length).toEqual(1)

      wrapper.find('ModalFooter').find('button').simulate('click')
      expect(wrapper.find('Modal').props().isOpen).toBe(false)
    })
    test('if validations runs correctly', () => {
      let mockId = 8806
      let mockRegDetailsResponse = {
        "imei_per_device": 1,
        "id": mockId,
        "reviewer_id": null,
        "imeis": [["11111111111111"]],
        "tracking_id": "e24b7e0b-d142-4bee-a358-bea6824a25ba",
        "device_count": 1,
        "updated_at": "2018-12-18T05:32:04.688010+00:00",
        "report": null,
        "created_at": "2018-12-18T05:32:04.688010+00:00",
        "reviewer_name": null,
        "processing_status_label": "New Request",
        "user_name": "drs importer user",
        "duplicate_imeis_file": null,
        "report_status_label": "New Request",
        "file": null,
        "status_label": "New Request",
        "m_location": "local",
        "user_id": "6ed9747b-d36a-4799-88c8-59d17a9abb5a"
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
          <NewRegistationRequest kc={mockKcProps} {...mockMatchParamsNewRequest}/>
        </I18nextProvider>
      )

      let DeviceCountInput = wrapper.find('Input').at(0)
      let ImeiInput = wrapper.find('Input').at(1)
      let location = wrapper.find('select')

      //Add values to inputs
      location.simulate('change', {
        target: {
          name: 'm_location',
          value: 'local'
        }
      })

      DeviceCountInput.simulate('change', {
        target: {
          name: "device_count",
          value: 1
        }
      })
      ImeiInput.simulate('change', {
        target: {
          name: "imei_per_device",
          value: 1
        }
      })
      wrapper.update()

      //Add Device
      const addDeviceBtn = wrapper.find('button').at(1)
      addDeviceBtn.simulate('click')

      //Add device IMEIs
      wrapper.find('input').at(4).simulate('change', {
        target: {
          name: 'devices.0.imeis.0.imei',
          value: '11111111111111'
        }
      })
      wrapper.find('input').at(5).simulate('change', {
        target: {
          name: 'devices.0.imeis.0.reImei',
          value: '11111111111111'
        }
      })
      let form = wrapper.find('Form')
      form.simulate('submit')

      let saveStep1 = {
        data: mockRegDetailsResponse,
        status: 200
      }
      mockAxios.mockResponse(saveStep1)
      let getPreviousStepsDataResponse = {
        data: {
          "reg_docs": [],
          "reg_details": mockRegDetailsResponse,
          "reg_device": {}
        },
        status: 200
      }

      mockAxios.mockResponse(getPreviousStepsDataResponse)
      wrapper.update()

      //STEP2
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
      getPreviousStepsDataResponse = {
        data: {
          "reg_docs": [],
          "reg_details": mockRegDetails,
          "reg_device": {}
        },
        status: 200
      }
      mockAxios.mockResponse(getPreviousStepsDataResponse)
      wrapper.update()

      //STEP3 Tests
      let blob = new Blob
      const file = new File([blob], 'test.png', {type: 'image/png'});

      // console.log(wrapper.find('Formik').state())
      let shippingDocInput = wrapper.find('FormGroup').at(0).find('input')
      let authorizationDocInput = wrapper.find('FormGroup').at(1).find('input')
      let certificatieDocInput = wrapper.find('FormGroup').at(2).find('input')

      let step3Form = wrapper.find('form')
      step3Form.simulate('submit')
      expect(wrapper.find('Formik').state().errors.allDocs).toEqual('Document must be provided for all fields.')

      shippingDocInput.simulate('change', {
        target: {
          files: [{}]
        }
      })
      authorizationDocInput.simulate('change', {
        target: {
          files: [{}]
        }
      })
      certificatieDocInput.simulate('change', {
        target: {
          files: [{}]
        }
      })
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
      })
      // console.log(shippingDocInput.debug())

      step3Form = wrapper.find('form')
      step3Form.simulate('submit')

      //Documents validations with incorrect format
      expect(wrapper.find('Formik').state().errors.documents[0]).toEqual('Invalid File extension, valid extensions are: pdf, jpg, png, gif, bmp, tiff, svg')
      expect(wrapper.find('Formik').state().errors.documents[1]).toEqual('Invalid File extension, valid extensions are: pdf, jpg, png, gif, bmp, tiff, svg')
      expect(wrapper.find('Formik').state().errors.documents[2]).toEqual('Invalid File extension, valid extensions are: pdf, jpg, png, gif, bmp, tiff, svg')

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
      })

      step3Form = wrapper.find('form')
      step3Form.simulate('submit')

      //Documents validations with incorrect ile size
      expect(wrapper.find('Formik').state().errors.documents[0]).toEqual('File size exceeds 26 MBs')
      expect(wrapper.find('Formik').state().errors.documents[1]).toEqual('File size exceeds 26 MBs')
      expect(wrapper.find('Formik').state().errors.documents[2]).toEqual('File size exceeds 26 MBs')
    })
    test('if save step', () => {
      let spy = Sinon.spy()
      const historyMock = {push: spy};

      let mockId = 8806
      let mockRegDetailsResponse = {
        "imei_per_device": 1,
        "id": mockId,
        "reviewer_id": null,
        "imeis": [["11111111111111"]],
        "tracking_id": "e24b7e0b-d142-4bee-a358-bea6824a25ba",
        "device_count": 1,
        "updated_at": "2018-12-18T05:32:04.688010+00:00",
        "report": null,
        "created_at": "2018-12-18T05:32:04.688010+00:00",
        "reviewer_name": null,
        "processing_status_label": "New Request",
        "user_name": "drs importer user",
        "duplicate_imeis_file": null,
        "report_status_label": "New Request",
        "file": null,
        "status_label": "New Request",
        "m_location": "local",
        "user_id": "6ed9747b-d36a-4799-88c8-59d17a9abb5a"
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
          <NewRegistationRequest kc={mockKcProps} {...mockMatchParamsNewRequest} history={historyMock}/>
        </I18nextProvider>
      )

      let DeviceCountInput = wrapper.find('Input').at(0)
      let ImeiInput = wrapper.find('Input').at(1)
      let location = wrapper.find('select')

      //Add values to inputs
      location.simulate('change', {
        target: {
          name: 'm_location',
          value: 'local'
        }
      })

      DeviceCountInput.simulate('change', {
        target: {
          name: "device_count",
          value: 1
        }
      })
      ImeiInput.simulate('change', {
        target: {
          name: "imei_per_device",
          value: 1
        }
      })
      wrapper.update()

      //Add Device
      const addDeviceBtn = wrapper.find('button').at(1)
      addDeviceBtn.simulate('click')

      //Add device IMEIs
      wrapper.find('input').at(4).simulate('change', {
        target: {
          name: 'devices.0.imeis.0.imei',
          value: '11111111111111'
        }
      })
      wrapper.find('input').at(5).simulate('change', {
        target: {
          name: 'devices.0.imeis.0.reImei',
          value: '11111111111111'
        }
      })
      let form = wrapper.find('Form')
      form.simulate('submit')

      let saveStep1 = {
        data: mockRegDetailsResponse,
        status: 200
      }
      mockAxios.mockResponse(saveStep1)
      let getPreviousStepsDataResponse = {
        data: {
          "reg_docs": [],
          "reg_details": mockRegDetailsResponse,
          "reg_device": {}
        },
        status: 200
      }

      mockAxios.mockResponse(getPreviousStepsDataResponse)
      wrapper.update()

      //STEP2
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
      getPreviousStepsDataResponse = {
        data: {
          "reg_docs": [],
          "reg_details": mockRegDetails,
          "reg_device": {}
        },
        status: 200
      }
      mockAxios.mockResponse(getPreviousStepsDataResponse)
      wrapper.update()

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
      expect(wrapper.find('NewRegistationRequest').state().stepReady).toBe(true)
    })
  })
})

