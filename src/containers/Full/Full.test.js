/*Copyright (c) 2018 Qualcomm Technologies, Inc.
  All rights reserved.

  Redistribution and use in source and binary forms, with or without modification, are permitted (subject to the limitations in the disclaimer below) provided that the following conditions are met:

  * Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
* Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
* Neither the name of Qualcomm Technologies, Inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.
  NO EXPRESS OR IMPLIED LICENSES TO ANY PARTY'S PATENT RIGHTS ARE GRANTED BY THIS LICENSE. THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/
import React from 'react'
import i18n from "./../../i18nTest"
import { I18nextProvider } from "react-i18next";
import Full from './Full'
import { BrowserRouter as Router } from 'react-router-dom';
import { MemoryRouter } from 'react-router';
import SearchRequests from '../../views/SearchRequests/SearchRequests';
import RequestStatus from "../../components/RequestStatus/RequestStatus";
import * as helpers from '../../utilities/helpers';
import NewRequest from "../../views/NewRequest";
import UpdateRegistration from "../../views/Registration/Update/Update";
import DeRegistration from "../../views/DeRegistration";
import UpdateDeRegistration from "../../views/DeRegistration/Update/Update";
import ReviewRegistration from "../../views/Registration/Review/Review";
import Dashboard from "../../views/Dashboard";
import ViewReview from "../../views/View/ViewReview";
import ViewRequest from "../../views/View/ViewRequest";

const mockLogout = Sinon.spy();

const kcMock={logout: mockLogout}

const userDetails = {
  preferred_username: "User"
}

Object.defineProperty(window, 'matchMedia', {
  value: () => ({
    matches: false,
    addListener: () => {
    },
    removeListener: () => {
    }
  })
});

Object.defineProperty(window, 'getUserRole', { value: Sinon.spy()})

describe("Full component", () => {
  test("if renders correctly", () => {
    const wrapper = shallow(
      <Full/>);
    expect(wrapper).toMatchSnapshot()
  })
  test("if renders correctly again", () => {
    const wrapper = render(
      <Router>
        <I18nextProvider i18n={i18n}>
          <Full kc={kcMock}/>
        </I18nextProvider>
      </Router>
    )
    expect(wrapper).toMatchSnapshot()
  });
  test('if render header',()=>{
    const wrapper = mount(
      <Router>
        <I18nextProvider i18n={i18n}>
          <Full  kc={kcMock}/>
        </I18nextProvider>
      </Router>
    )
    let component = wrapper.find('Full')
    expect(component.find('Header').length).toEqual(1)
  })
  test('if has class main',()=>{
    const wrapper = mount(
      <Router>
        <I18nextProvider i18n={i18n}>
          <Full kc={kcMock}/>
        </I18nextProvider>
      </Router>
    )
    let component = wrapper.find('Full')
    expect(component.find('main').hasClass('main')).toBe(true)
  });

  test('/search-requests should redirect to Search Page', () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={[ '/search-requests' ]}>
        <I18nextProvider i18n={i18n}>
          <Full userDetails={userDetails} kc={mockKcProps} location={location} />
        </I18nextProvider>
      </MemoryRouter>
    );
    expect(wrapper.find(SearchRequests)).toHaveLength(1);
  });

  test('/new-request should redirect to New Request Page', () => {
    const kcResource = {
      realm_access: {
        roles: ['uma_authorization', 'drs_importer']
      }
    }
    const location = {
      pathname: '/new-request/id',
      state: {
        details: {
          icon: 'fa fa-check',
          action: 'Register',
          id: 12,
          status: 'Pending'
        }
      }
    };
    const wrapper = mount(
      <MemoryRouter initialEntries={[ '/new-request/:id' ]}>
        <I18nextProvider i18n={i18n}>
          <Full userDetails={userDetails} kc={mockKcProps} location={location} resources={kcResource}/>
        </I18nextProvider>
      </MemoryRouter>
    );
    jest.spyOn(helpers, 'getUserRole');
    expect(wrapper.find(NewRequest)).toHaveLength(1);
  });

  test('/new-request-finish/id should redirect to New Request Page', () => {
    const kcResource = {
      realm_access: {
        roles: ['uma_authorization', 'drs_importer']
      }
    }
    const wrapper = mount(
      <MemoryRouter initialEntries={[ '/new-request-finish/:id' ]}>
        <I18nextProvider i18n={i18n}>
          <Full userDetails={userDetails} kc={mockKcProps} resources={kcResource}/>
        </I18nextProvider>
      </MemoryRouter>
    );
    jest.spyOn(helpers, 'getUserRole');
    expect(wrapper.find(NewRequest)).toHaveLength(1);
  });

  test('/update-registration/id should redirect to Modify Request Page', () => {
    const kcResource = {
      realm_access: {
        roles: ['uma_authorization', 'drs_importer']
      }
    }
    const wrapper = mount(
      <MemoryRouter initialEntries={[ '/update-registration/:id' ]}>
        <I18nextProvider i18n={i18n}>
          <Full userDetails={userDetails} kc={mockKcProps} resources={kcResource}/>
        </I18nextProvider>
      </MemoryRouter>
    );
    jest.spyOn(helpers, 'getUserRole');
    expect(wrapper.find(UpdateRegistration)).toHaveLength(1);
  });

  test('/de-registration/id should redirect to De-registration Page', () => {
    const kcResource = {
      realm_access: {
        roles: ['uma_authorization', 'drs_exporter']
      }
    }
    const wrapper = mount(
      <MemoryRouter initialEntries={[ '/de-registration/:id' ]}>
        <I18nextProvider i18n={i18n}>
          <Full userDetails={userDetails} kc={mockKcProps} resources={kcResource}/>
        </I18nextProvider>
      </MemoryRouter>
    );
    jest.spyOn(helpers, 'getUserRole');
    expect(wrapper.find(DeRegistration)).toHaveLength(1);
  });

  test('/de-registration-finish/id should redirect to De-registration Page', () => {
    const kcResource = {
      realm_access: {
        roles: ['uma_authorization', 'drs_exporter']
      }
    }
    const wrapper = mount(
      <MemoryRouter initialEntries={[ '/de-registration-finish/:id' ]}>
        <I18nextProvider i18n={i18n}>
          <Full userDetails={userDetails} kc={mockKcProps} resources={kcResource}/>
        </I18nextProvider>
      </MemoryRouter>
    );
    jest.spyOn(helpers, 'getUserRole');
    expect(wrapper.find(DeRegistration)).toHaveLength(1);
  });

  test('/update-deregistration/id should redirect to Modify De-registration Page', () => {
    const kcResource = {
      realm_access: {
        roles: ['uma_authorization', 'drs_exporter']
      }
    }
    const wrapper = mount(
      <MemoryRouter initialEntries={[ '/update-deregistration/:id' ]}>
        <I18nextProvider i18n={i18n}>
          <Full userDetails={userDetails} kc={mockKcProps} resources={kcResource}/>
        </I18nextProvider>
      </MemoryRouter>
    );
    jest.spyOn(helpers, 'getUserRole');
    expect(wrapper.find(UpdateDeRegistration)).toHaveLength(1);
  });

  test('/review-registration/id/type should redirect to Review Registration Page', () => {
    const kcResource = {
      realm_access: {
        roles: ['uma_authorization', 'drs_authority']
      }
    }
    const mockMatchParams = {
      match: {
        params: {
          id: '1'
        }
      }
    };
    const wrapper = mount(
      <MemoryRouter initialEntries={[ '/review-registration/:id/:type' ]}>
        <I18nextProvider i18n={i18n}>
          <Full userDetails={userDetails} kc={mockKcProps} resources={kcResource} match={mockMatchParams}/>
        </I18nextProvider>
      </MemoryRouter>
    );
    jest.spyOn(helpers, 'getUserRole');
    expect(wrapper.find(ReviewRegistration)).toHaveLength(1);
  });

  test('/view-review/id/type should redirect to View Review Page', () => {
    const kcResource = {
      realm_access: {
        roles: ['uma_authorization', 'drs_authority']
      }
    }
    const mockMatchParams = {
      match: {
        params: {
          id: '1'
        }
      }
    };
    const wrapper = mount(
      <MemoryRouter initialEntries={[ '/view-review/:id/:type' ]}>
        <I18nextProvider i18n={i18n}>
          <Full userDetails={userDetails} kc={mockKcProps} resources={kcResource} match={mockMatchParams}/>
        </I18nextProvider>
      </MemoryRouter>
    );
    jest.spyOn(helpers, 'getUserRole');
    expect(wrapper.find(ViewReview)).toHaveLength(1);
  });

  test('/view-request/id/type should redirect to View Request Page', () => {
    const kcResource = {
      realm_access: {
        roles: ['uma_authorization', 'drs_individual']
      }
    }
    const mockMatchParams = {
      match: {
        params: {
          id: '1'
        }
      }
    };
    const wrapper = mount(
      <MemoryRouter initialEntries={[ '/view-request/:id/:type' ]}>
        <I18nextProvider i18n={i18n}>
          <Full userDetails={userDetails} kc={mockKcProps} resources={kcResource} match={mockMatchParams}/>
        </I18nextProvider>
      </MemoryRouter>
    );
    jest.spyOn(helpers, 'getUserRole');
    expect(wrapper.find(ViewRequest)).toHaveLength(1);
  });

  test('/ should redirect to Dashboard', () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={[ '/' ]}>
        <I18nextProvider i18n={i18n}>
          <Full userDetails={userDetails} kc={mockKcProps} location={location} />
        </I18nextProvider>
      </MemoryRouter>
    );
    expect(wrapper.find(Dashboard)).toHaveLength(1);
  });
})