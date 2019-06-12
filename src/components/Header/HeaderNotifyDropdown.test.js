/*
SPDX-License-Identifier: ZLIB-ACKNOWLEDGEMENT

Copyright (c) 2018 Qualcomm Technologies, Inc.

This software is provided 'as-is', without any express or implied warranty.
In no event will the authors be held liable for any damages arising from the
use of this software.

Permission is granted to anyone to use this software for any purpose,
including commercial applications, and to alter it and redistribute it
freely, subject to the following restrictions:

*         The origin of this software must not be misrepresented; you must
not claim that you wrote the original software. If you use this software in
a product, an acknowledgment is required by displaying the trademark/logo as
per the details provided here:
https://www.qualcomm.com/documents/dirbs-logo-and-brand-guidelines

*         Altered source versions must be plainly marked as such, and must
not be misrepresented as being the original software.

*         This notice may not be removed or altered from any source
distribution.

NO EXPRESS OR IMPLIED LICENSES TO ANY PARTY'S PATENT RIGHTS ARE GRANTED BY
THIS LICENSE. THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND
CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT
NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A
PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR
CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS;
OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR
OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF
ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

import HeaderNotifyDropdown from './HeaderNotifyDropdown'
import mockAxios from 'jest-mock-axios';
import {getUserInfo} from "../../utilities/helpers";
// import {getUserGroups} from './../../utilities/helpers'

describe('Header Notification Component', () => {
  afterEach(() => {
    mockAxios.reset();
  });
  beforeEach(() => {
    localStorage.clear();
    localStorage.userInfo = 'eyJzdWIiOiI2ZWQ5NzQ3Yi1kMzZhLTQ3OTktODhjOC01OWQxN2E5YWJiNWEiLCJuYW1lIjoiIiwicHJlZmVycmVkX3VzZXJuYW1lIjoiZHJzIGltcG9ydGVyIHVzZXIifQ=='
  })
  const resourceMock = {
    realm_access: {
      roles: ['drs_authority']
    }
  }
  const mockHeader = {
    "headers": {
      "Accept-Language": "en-US",
      "Authorization": "Bearer null",
      "Content-Type": "application/json"
    }
  }
  test('if render correctly', () => {
    const wrapper = shallow(<HeaderNotifyDropdown kc={mockKcProps}/>);
    expect(wrapper).toMatchSnapshot();
  })
  test('if renders correctly again', () => {
    const wrapper = render(<HeaderNotifyDropdown kc={mockKcProps}/>);
    expect(wrapper).toMatchSnapshot();
  });
  test('if state renders correctly', () => {
    const wrapper = mount(<HeaderNotifyDropdown kc={mockKcProps}/>);
    expect(wrapper.find('HeaderNotifyDropdown').state().dropdownOpen).toBe(false)
    expect(wrapper.find('HeaderNotifyDropdown').state().notifications).toEqual([])
    expect(wrapper.find('HeaderNotifyDropdown').state().loading).toBe(false)
    expect(wrapper.find('HeaderNotifyDropdown').state().notificationCount).toBe(null)
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
    const wrapper = mount(<HeaderNotifyDropdown kc={mockKcProps} resources={resourceMock}/>);
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
    expect(wrapper.state().notificationCount).toBe(2)
    expect(wrapper.find('Dropdown').props().isOpen).toBe(true)
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
    const wrapper = mount(<HeaderNotifyDropdown resources={resourceMock} kc={mockKcProps}/>);
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
    wrapper.setState({
      dropdownOpen: false
    });

    expect(wrapper.state().dropdownOpen).toBe(false)
    expect(wrapper.state().loading).toBe(false)
    expect(wrapper.find('Dropdown').props().isOpen).toBe(false)
  });
  test('if clicking on notification item render information correctly for Reviewer user', () => {
    getUserInfo().sub = '6ed9747b-d36a-4799-88c8-59d17a9abb5a';
    let mockNotifications = [
      {
        "request_type": "registration_request",
        "id": 985,
        "request_status": 4,
        "message": "Request in Review",
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
    const wrapper = mount(<HeaderNotifyDropdown kc={mockKcProps} resources={resourceMock}/>);
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
    wrapper.find('button').at(0).simulate('click')
    let notifcationclickResponse = {
      data :"",
      status:201
    }
    mockAxios.mockResponse(notifcationclickResponse)
    wrapper.update()

    //Test
    expect(mockAxios.put).toHaveBeenCalledWith('/notification', {
        notification_id: 985,
        user_id: "6ed9747b-d36a-4799-88c8-59d17a9abb5a"
      }, mockHeader);
  })
  test('if clicking on notification item render information correctly for non Reviewer users', () => {
    getUserInfo().sub = '6ed9747b-d36a-4799-88c8-59d17a9abb5a';
    let mockNotifications = [
      {
        "id": 20,
        "message": "The request 16 has been updated.",
        "request_status": 4,
        "request_type": "registration_request",
        "generated_at": "2019-02-06T12:23:48.912550+00:00",
        "request_id": 16
      }
    ]
    const kcResource = {
      realm_access: {
        roles: ['uma_authorization', 'importer']
      }
    }
    const wrapper = mount(<HeaderNotifyDropdown kc={mockKcProps} resources={kcResource}/>);
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
    wrapper.find('button').at(0).simulate('click')
    let notifcationclickResponse = {
      data :"",
      status:201
    }
    mockAxios.mockResponse(notifcationclickResponse)
    wrapper.update()

    //Test
    expect(mockAxios.put).toHaveBeenCalledWith('/notification', {
      notification_id: 20,
      user_id: "6ed9747b-d36a-4799-88c8-59d17a9abb5a"
    }, mockHeader);
  })
})
