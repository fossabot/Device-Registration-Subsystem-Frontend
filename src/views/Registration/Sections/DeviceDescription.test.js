/*Copyright (c) 2018 Qualcomm Technologies, Inc.
  All rights reserved.

  Redistribution and use in source and binary forms, with or without modification, are permitted (subject to the limitations in the disclaimer below) provided that the following conditions are met:

  * Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
* Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
* Neither the name of Qualcomm Technologies, Inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.
  NO EXPRESS OR IMPLIED LICENSES TO ANY PARTY'S PATENT RIGHTS ARE GRANTED BY THIS LICENSE. THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

import DeviceDescription from './DeviceDescription'

import {I18nextProvider} from 'react-i18next';
import i18n from './../../../i18nTest'
import React from "react";

const mockStep2APIdata = {
  "user_device_description": [{
    "operating_system": "android",
    "model_number": "2012",
    "device_type": "Smartphone",
    "brand": "samsung",
    "model_name": "G5",
    "radio_access_technology": "2G,4G,3G"
  },null],
  "gsma_device_description": [{
    "operating_system": "N/A",
    "model_number": "Rhone-L21",
    "device_type": "Smartphone",
    "brand": "HUAWEI",
    "model_name": "RNE-L21",
    "radio_access_technology": "SATELLITE"
  },null]
}

describe("IMEI classification Component", () => {
  test('if renders correctly', () => {
    const wrapper = shallow(
      <DeviceDescription/>);
    expect(wrapper).toMatchSnapshot()
  })
  test('if renders correctly again', () => {
    const wrapper = render(
      <I18nextProvider i18n={i18n}>
        <DeviceDescription/>
      </I18nextProvider>
    )
    expect(wrapper).toMatchSnapshot()
  });
  test('if renders props correctly', () => {
    const wrapper = mount(
      <I18nextProvider i18n={i18n}>
        <DeviceDescription step2Data={mockStep2APIdata} stepReady={true}/>
      </I18nextProvider>
    )
    const tables = wrapper.find('table')
    //User device description
    //Brand
    expect(tables.at(0).find('td').at(0).text()).toEqual('samsung')
    //Model
    expect(tables.at(0).find('td').at(1).text()).toEqual('G5')
    //Model number
    expect(tables.at(0).find('td').at(2).text()).toEqual('2012')
    //Device type
    expect(tables.at(0).find('td').at(3).text()).toEqual('Smartphone')
    //Operating system
    expect(tables.at(0).find('td').at(4).text()).toEqual('android')
    //Radio access technology
    expect(tables.at(0).find('td').at(5).text()).toEqual('2G,4G,3G')

    //GSMA device description
    //Brand
    expect(tables.at(1).find('td').at(0).text()).toEqual('HUAWEI')
    //Model
    expect(tables.at(1).find('td').at(1).text()).toEqual('RNE-L21')
    //Model number
    expect(tables.at(1).find('td').at(2).text()).toEqual('Rhone-L21')
    //Device type
    expect(tables.at(1).find('td').at(3).text()).toEqual('Smartphone')
    //Operating system
    expect(tables.at(1).find('td').at(4).text()).toEqual('N/A')
    //Radio access technology
    expect(tables.at(1).find('td').at(5).text()).toEqual('SATELLITE')

    expect(wrapper.find('DeviceDescription').props().step2Data).toEqual(mockStep2APIdata)
    expect(wrapper.find('DeviceDescription').props().stepReady).toBe(true)
  });
  test('if null props render correctly', () => {
    let mockStep3nullData = {
      "user_device_description": [{
        "operating_system": null,
        "model_number": null,
        "device_type": null,
        "brand": null,
        "model_name": null,
        "radio_access_technology": null
      }],
      "gsma_device_description": [{
        "operating_system": null,
        "model_number": null,
        "device_type": null,
        "brand": null,
        "model_name": null,
        "radio_access_technology": null
      }]
    }
    const wrapper = mount(
      <I18nextProvider i18n={i18n}>
        <DeviceDescription step2Data={mockStep3nullData} stepReady={true}/>
      </I18nextProvider>
    )
    const tables = wrapper.find('table')
    //User device description
    //Brand
    expect(tables.at(0).find('td').at(0).text()).toEqual('N/A')
    //Model
    expect(tables.at(0).find('td').at(1).text()).toEqual('N/A')
    //Model number
    expect(tables.at(0).find('td').at(2).text()).toEqual('N/A')
    //Device type
    expect(tables.at(0).find('td').at(3).text()).toEqual('N/A')
    //Operating system
    expect(tables.at(0).find('td').at(4).text()).toEqual('N/A')
    //Radio access technology
    expect(tables.at(0).find('td').at(5).text()).toEqual('N/A')

    //GSMA device description
    //Brand
    expect(tables.at(1).find('td').at(0).text()).toEqual('N/A')
    //Model
    expect(tables.at(1).find('td').at(1).text()).toEqual('N/A')
    //Model number
    expect(tables.at(1).find('td').at(2).text()).toEqual('N/A')
    //Device type
    expect(tables.at(1).find('td').at(3).text()).toEqual('N/A')
    //Operating system
    expect(tables.at(1).find('td').at(4).text()).toEqual('N/A')
    //Radio access technology
    expect(tables.at(1).find('td').at(5).text()).toEqual('N/A')
  });

  test('if all null devices render correctly', () => {
    let mockStep3nullData = {
      "user_device_description": [null,null],
      "gsma_device_description": [null,null]
    }
    const wrapper = mount(
      <I18nextProvider i18n={i18n}>
        <DeviceDescription step2Data={mockStep3nullData} stepReady={true}/>
      </I18nextProvider>
    )
    expect(wrapper.find('td').at(0).text()).toEqual('User device description not found')
    expect(wrapper.find('td').at(1).text()).toEqual('GSMA device description not found')
  });

})
