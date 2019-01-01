/*
Copyright (c) 2018 Qualcomm Technologies, Inc.
All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted (subject to the limitations in the disclaimer below) provided that the following conditions are met:

* Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
* Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
* Neither the name of Qualcomm Technologies, Inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.
NO EXPRESS OR IMPLIED LICENSES TO ANY PARTY'S PATENT RIGHTS ARE GRANTED BY THIS LICENSE. THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

import HeaderNotifyDropdown from './HeaderNotifyDropdown'
import axios from 'axios';
import mockAxios from 'jest-mock-axios';

describe('Header Nofication Component', () => {
  afterEach(() => {
    mockAxios.reset();
  });
  test('if render correctly', () => {
    const wrapper = shallow(<HeaderNotifyDropdown/>);
    expect(wrapper).toMatchSnapshot();
  })
  test('if renders correctly again', () => {
    const wrapper = render(<HeaderNotifyDropdown/>);
    expect(wrapper).toMatchSnapshot();
  });
  test('if state renders correctly', () => {
    const wrapper = mount(<HeaderNotifyDropdown/>);
    expect(wrapper.find('HeaderNotifyDropdown').state().dropdownOpen).toBe(false)
    expect(wrapper.find('HeaderNotifyDropdown').state().notifications).toEqual([])
    expect(wrapper.find('HeaderNotifyDropdown').state().loading).toBe(false)
    expect(wrapper.find('HeaderNotifyDropdown').state().hasNotifications).toBe(false)
  });
  test('if state renders correctly', () => {
    let mockNotifications = [
      {
        "request_type": "registration_request",
        "id": 985,
        "request_status": 6,
        "message": "Your request 1579 has been approved",
        "request_id": 1579,
        "generated_at": "2018-10-29T07:03:10.824439+00:00"
      },
      {
        "request_type": "registration_request",
        "id": 94,
        "request_status": 7,
        "message": "Your request 360 has been rejected",
        "request_id": 360,
        "generated_at": "2018-10-19T07:42:03.661755+00:00"
      }
    ]
    const wrapper = mount(<HeaderNotifyDropdown/>);
    let mockNotificationResponse = {
      data: {
        notifications: mockNotifications
      },
      status: 200
    }

    mockAxios.mockResponse(mockNotificationResponse)
    wrapper.setState({
      notifications: mockNotifications,
      dropdownOpen: true,
      loading: false
    })
    wrapper.update()

    expect(wrapper.find('DropdownItem').length).toEqual(2)
    expect(wrapper.state().notifications).toEqual(mockNotifications)
    expect(wrapper.state().hasNotifications).toBe(true)
    expect(wrapper.find('Dropdown').props().isOpen).toBe(true)
    // console.log(wrapper.find('HeaderNotifyDropdown').state())
    // console.log(wrapper.find('HeaderNotifyDropdown').debug())
  });
  test('if dropdown triggers', () => {
    let mockNotifications = [
      {
        "request_type": "registration_request",
        "id": 985,
        "request_status": 6,
        "message": "Your request 1579 has been approved",
        "request_id": 1579,
        "generated_at": "2018-10-29T07:03:10.824439+00:00"
      },
      {
        "request_type": "registration_request",
        "id": 94,
        "request_status": 7,
        "message": "Your request 360 has been rejected",
        "request_id": 360,
        "generated_at": "2018-10-19T07:42:03.661755+00:00"
      }
    ]
    const wrapper = mount(<HeaderNotifyDropdown/>);
    let mockNotificationResponse = {
      data: {
        notifications: mockNotifications
      },
      status: 200
    }
    mockAxios.mockResponse(mockNotificationResponse)
    wrapper.setState({
      notifications: mockNotifications,
      dropdownOpen: true,
      loading: false
    })
    wrapper.update()

    //Toggle dropdown
    wrapper.instance().toggle()
    wrapper.update()

    mockAxios.mockResponse(mockNotificationResponse)
    wrapper.update()

    expect(wrapper.state().dropdownOpen).toBe(false)
    expect(wrapper.state().loading).toBe(false)
    expect(wrapper.find('Dropdown').props().isOpen).toBe(false)
  });
  test('if clicking on notification item render information correctly', () => {
    let mockNotifications = [
      {
        "request_type": "registration_request",
        "id": 985,
        "request_status": 6,
        "message": "Your request 1579 has been approved",
        "request_id": 1579,
        "generated_at": "2018-10-29T07:03:10.824439+00:00"
      },
      {
        "request_type": "registration_request",
        "id": 94,
        "request_status": 7,
        "message": "Your request 360 has been rejected",
        "request_id": 360,
        "generated_at": "2018-10-19T07:42:03.661755+00:00"
      }
    ]
    let spy = Sinon.spy()
    const historyMock = {push: spy};
    const wrapper = mount(<HeaderNotifyDropdown history={historyMock}/>);
    let mockNotificationResponse = {
      data: {
        notifications: mockNotifications
      },
      status: 200
    }
    mockAxios.mockResponse(mockNotificationResponse)
    wrapper.setState({
      notifications: mockNotifications,
      dropdownOpen: true,
      loading: false
    })
    wrapper.update()

    wrapper.find('DropdownItem').at(0).simulate('click')
    let notifcationclickResponse = {
      data :{
        "notifications": []
      },
      status:201
    }
    mockAxios.mockResponse(notifcationclickResponse)
    wrapper.update()

    expect(spy.calledOnce).toBe(true)
    expect(wrapper.state().hasNotifications).toBe(false)
  })
})