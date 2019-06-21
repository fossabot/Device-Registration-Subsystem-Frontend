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
import ImeiClassification from './ImeiClassification'
import {I18nextProvider} from 'react-i18next';
import i18n from '../../../../i18nTest'
import mockAxios from 'jest-mock-axios';
import FileSaver from "file-saver";
jest.mock('file-saver', ()=>({saveAs: jest.fn()}))
global.Blob = function (content, options){return  ({content, options})}

const mockStep3APIdata = {
  "imei_compliance_status": {
    "provisional_non_compliant": 1000,
    "non_compliant_imeis": 100,
    "provisional_compliant": 1000,
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

const mockId = 2
const mockTotalImeis = 10
const mockViewType = 'registration_request'

  describe("IMEI classification Component", () => {
    test('if renders correctly', () => {
      const wrapper = shallow(
        <ImeiClassification/>);
      expect(wrapper).toMatchSnapshot()
    })
    test('if renders correctly again', () => {
      const wrapper = render(
        <I18nextProvider i18n={i18n}>
          <ImeiClassification/>
        </I18nextProvider>
      )
      expect(wrapper).toMatchSnapshot()
    });
    test('if renders props correctly', () => {
      const wrapper = mount(
        <I18nextProvider i18n={i18n}>
          <ImeiClassification step3Data={mockStep3APIdata} stepReady={true}
                              id={mockId} totalImeis={mockTotalImeis} viewType={mockViewType}/>
        </I18nextProvider>
      )
      expect(wrapper.find('.table').exists()).toBe(true)
      expect(wrapper.find('ImeiClassification').props().step3Data).toEqual(mockStep3APIdata)
      expect(wrapper.find('ImeiClassification').props().stepReady).toBe(true)
      expect(wrapper.find('ImeiClassification').props().totalImeis).toEqual(mockTotalImeis)
      expect(wrapper.find('ImeiClassification').props().viewType).toEqual(mockViewType)
      // console.log(wrapper.find('table').debug())
    });
    test('if null props render correctly', () => {
      let mockStep3nullData = {
        "imei_compliance_status": {
          "provisional_non_compliant": null,
          "non_compliant_imeis": null,
          "provisional_compliant": null,
          "compliant_imeis": null
        },
        "seen_on_network": null,
        "per_condition_classification_state": {
          "malformed": null,
          "not_on_registration_list": null,
          "gsma_not_found": null,
          "local_stolen": null,
          "duplicate": null,
          "duplicate_large": null
        },
        "lost_stolen_status": null
      }
      const wrapper = mount(
        <I18nextProvider i18n={i18n}>
          <ImeiClassification step3Data={mockStep3nullData} stepReady={true}
                              id={mockId} totalImeis={null} viewType={mockViewType}/>
        </I18nextProvider>
      )
      expect(wrapper.find('td').at(0).text()).toEqual('0')
      expect(wrapper.find('td').at(1).find('li').at(0).text()).toEqual('Non-compliant(0)')
      expect(wrapper.find('td').at(1).find('li').at(1).text()).toEqual('Compliant(0)')
      expect(wrapper.find('td').at(1).find('li').at(2).text()).toEqual('Provisional non-complaint(0)')
      expect(wrapper.find('td').at(1).find('li').at(3).text()).toEqual('Provisional complaint(0)')
    });
    test('if table has download report button', () => {
      const wrapper = mount(
        <I18nextProvider i18n={i18n}>
          <ImeiClassification step3Data={mockStep3APIdata} stepReady={true}
                              id={mockId} totalImeis={mockTotalImeis} viewType={mockViewType}/>
        </I18nextProvider>
      )
      const button = wrapper.find('button')
      expect(button.exists()).toBe(true)
    });
    test('if downloads the report',()=>{
      const wrapper = mount(
        <I18nextProvider i18n={i18n}>
          <ImeiClassification step3Data={mockStep3APIdata} stepReady={true} showReport={true} type="review"
                              userRole="authority"
                              kcProps={{kc: mockKcProps}} id={mockId} totalImeis={mockTotalImeis}
                              viewType={mockViewType}/>
        </I18nextProvider>
      )
      //Download Report
      wrapper.find('button').simulate('click')
      //API call
      let downloadReportResponse = {
        data: "Test reponse data",
        status: 200
      }
      mockAxios.mockResponse(downloadReportResponse)

      //Test
      expect(FileSaver.saveAs).toBeCalled()
    })
    test('if toggle the report visibility',()=>{
      const wrapper = mount(
        <I18nextProvider i18n={i18n}>
          <ImeiClassification step3Data={mockStep3APIdata} stepReady={true} showReport={true} type="review"
                              userRole="authority"
                              kcProps={{kc: mockKcProps}} id={mockId} totalImeis={mockTotalImeis}
                              viewType={mockViewType}/>
        </I18nextProvider>
      )
      wrapper.find('input').simulate('change',{
        target: {
          name : 'toggleReportVisibility',
          checked: true
        }
      })
      //API call
      let toggleReportVisibilityReponse = {
        data: {"value": false, "message": "The permission to view report is changed"},
        status: 200
      }
      mockAxios.mockResponse(toggleReportVisibilityReponse)

      //Test
      expect(wrapper.find('ImeiClassification').state().isReportVisible).toEqual(false)
    })
  })
