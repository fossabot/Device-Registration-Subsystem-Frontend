import React from 'react';
import {shallow, mount, render} from 'enzyme';
import SearchRequests from './SearchRequests';
import {I18nextProvider} from "react-i18next";
import i18n from "./../../i18nTest";
import sinon from 'sinon';
import mockAxios from 'jest-mock-axios';
import {BrowserRouter as Router} from 'react-router-dom';
import {getUserInfo} from "../../utilities/helpers";

Object.defineProperty(window, 'matchMedia', {
  value: () => ({
    matches: false,
    addListener: () => {
    },
    removeListener: () => {
    }
  })
});

const mockKcProps = {
  'isTokenExpired': sinon.spy()
}

const kcResource = {
  realm_access: {
    roles: ['uma_authorization', 'drs_authority']
  }
}

let responseObj = {
  data: {
    requests: [
      {
        processing_status_label: 11,
        report_status_label: 9,
        status: 'New Request',
        request_type: 1,
        id: 1,
        tracking_id: 'test-tracking-id',
        reviewer: {
          user_id: '9a4403c2-5a48-4b79-9f30-02c0cc7799e0',
          user_name: 'test-user'
        },
        device_details: {
          device_count: 1,
        },
        created_at: '2018-01-01 10:10:10',
        updated_at: '2018-01-01 10:10:10'
      }
    ],
    count: 1,
    limit: 10,
    start: 1
  }
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

describe('Search component', () => {
  test("if renders correctly", () => {
    const wrapper = shallow(<SearchRequests/>);
    expect(wrapper).toMatchSnapshot()
  });
  test('If SearchCases renders',()=>{
    const wrapper = shallow(<SearchRequests/>);
    expect(wrapper.exists()).toBe(true);
  })
  test('SearchCases if renders no li elements would exists', () => {
    const wrapper = mount(
      <I18nextProvider i18n={i18n}>
        <SearchRequests/>
      </I18nextProvider>
    );
    expect(wrapper.find('li')).toHaveLength(0);
  })

  test('SearchCases have certain states', () => {
    const wrapper = mount(
      <I18nextProvider i18n={i18n}>
        <SearchRequests/>
      </I18nextProvider>
    );
    const PAGE_LIMIT = 10;
    expect(wrapper.find('SearchRequests').state().showAllFilters).toBe(false)
    expect(wrapper.find('SearchRequests').state().apiFetched).toBe(false)
    expect(wrapper.find('SearchRequests').state().loading).toBe(false)
    expect(wrapper.find('SearchRequests').state().totalCases).toBe(0)
    expect(wrapper.find('SearchRequests').state().limit).toBe(PAGE_LIMIT)
    expect(wrapper.find('SearchRequests').state().searchQuery).toEqual({})
  })

  test('showAllFilters button toggling works', () => {
    const wrapper = mount(
      <I18nextProvider i18n={i18n}>
        <SearchRequests/>
      </I18nextProvider>
    );
    const button = wrapper.find('Button').at(1).find('button');
    button.simulate('click')
    expect(wrapper.find('SearchRequests').state().showAllFilters).toBe(true);
    button.simulate('click')
    expect(wrapper.find('SearchRequests').state().showAllFilters).toBe(false);
  })

  test('Clear search button click works', () => {
    const wrapper = mount(
      <I18nextProvider i18n={i18n}>
        <SearchRequests/>
      </I18nextProvider>
    );
    let button = wrapper.find('Button').at(0).find('button');
    expect(button.props().disabled).toBe(true);
    wrapper.find('input').at(2).simulate('change', {
      target: {
        value: '2018-12-05',
        name: 'your_unique_start_date_id'
      }
    });
    wrapper.find('input').at(3).simulate('change', {
      target: {
        value: '2018-12-15',
        name: 'your_unique_end_date_id'
      }
    });
    wrapper.find('input').at(4).simulate('change', {
      target: {
        value: '2018-12-01',
        name: 'your_unique_start_date_id'
      }
    });
    wrapper.find('input').at(5).simulate('change', {
      target: {
        value: '2018-12-10',
        name: 'your_unique_end_date_id'
      }
    });
    wrapper.update();
    button = wrapper.find('Button').at(0).find('button');
    expect(button.props().disabled).toBe(false);
    button.simulate('click');
    wrapper.update();
    expect(wrapper.find('Formik').state().values.created_at).toEqual('');
    expect(wrapper.find('Formik').state().values.updated_at).toEqual('');
  })

  test('when submit button is clicked', () => {
    const wrapper = mount(
      <I18nextProvider i18n={i18n}>
        <SearchRequests kc={mockKcProps}/>
      </I18nextProvider>
    );
    const submitButton = wrapper.find('Button').at(2).find('button');
    submitButton.simulate('submit')
    expect(wrapper.find('SearchRequests').state().apiFetched).toBe(true);
  })

  test("if submit button clicked then call API and show records", () => {
    const wrapper = mount(
      <Router>
        <I18nextProvider i18n={i18n}>
          <SearchRequests kc={mockKcProps} resources={kcResource}/>
        </I18nextProvider>
      </Router>
    )

    const submitButton = wrapper.find('Button').at(2).find('button');
    submitButton.simulate('submit')
    // simulating a server response
    let responseObj = {
      data: {
        requests: [
          {
            processing_status_label: 11,
            report_status_label: 9,
            status: 'New Request',
            request_type: 1,
            id: 1,
            tracking_id: 'test-tracking-id',
            reviewer: {
              user_id: '9a4403c2-5a48-4b79-9f30-02c0cc7799e0',
              user_name: 'test-user'
            },
            device_details: {
              device_count: 1,
            },
            created_at: '2018-01-01 10:10:10',
            updated_at: '2018-01-01 10:10:10'
          }
        ],
        count: 1,
        limit: 10,
        start: 1
      }
    }

    mockAxios.mockResponse(responseObj)
    wrapper.update()
    expect(mockAxios.post).toHaveBeenCalledWith('/search?start=1&limit=10', {
      "limit": 10,
      "search_args": {},
      "search_specs": {
        "group": "reviewer",
        "request_type": 1,
        "user_id": "",
      },
      "start": 1
    }, mockHeader);
    expect(wrapper.find('SearchRequests').state().totalCases).toEqual(1);
    expect(wrapper.find('.listbox .text-primary').text()).toEqual('1 Request found');
    const table = wrapper.find('table');
    expect(table.exists()).toEqual(true);
    expect(wrapper.find('SearchRequests').find('.listbox table tr')).toHaveLength(2);
    // Do this for all other Heading fields
    expect(table.at(0).find('th').at(0).text()).toEqual('Request ID');
    expect(table.at(0).find('th').at(1).text()).toEqual('Request Type');
    // Do this for all other Data fields
    expect(table.at(0).find('td').at(0).text()).toEqual('Failed');
    expect(table.at(0).find('td').at(1).text()).toEqual("1");
  });

  test("provide ID and Status Inputs and submit search form", () => {
    const wrapper = mount(
      <Router>
        <I18nextProvider i18n={i18n}>
          <SearchRequests kc={mockKcProps} resources={kcResource}/>
        </I18nextProvider>
      </Router>
    )

    wrapper.find('input').at(0).simulate('change', {
      target: {
        value: "1",
        name: 'id'
      }
    });
    wrapper.find('select').at(0).simulate('change', {
      target: {
        value: "Pending Review",
        name: 'status'
      }
    });
    const submitButton = wrapper.find('Button').at(2).find('button');
    submitButton.simulate('submit')
    // Update Status
    responseObj.data.requests[0].status = 'Pending Review';
    responseObj.data.requests[0].processing_status_label = 12;
    responseObj.data.requests[0].report_status_label = 12;
    // simulating a server response
    mockAxios.mockResponse(responseObj)
    wrapper.update()
    expect(mockAxios.post).toHaveBeenCalledWith('/search?start=1&limit=10', {
      "limit": 10,
      "search_args": {
        id: "1",
        status: "Pending Review"
      },
      "search_specs": {
        "group": "reviewer",
        "request_type": 1,
        "user_id": "",
      },
      "start": 1
    }, mockHeader);
    expect(wrapper.find('SearchRequests').state().totalCases).toEqual(1);
    const table = wrapper.find('table');
    expect(table.at(0).find('td').at(0).text()).toEqual('Pending Review');
  });

  test("provide Request Type input and submit search form", () => {
    const wrapper = mount(
      <Router>
        <I18nextProvider i18n={i18n}>
          <SearchRequests kc={mockKcProps} resources={kcResource}/>
        </I18nextProvider>
      </Router>
    )

    wrapper.find('select').at(1).simulate('change', {
      target: {
        value: 2,
        name: 'request_type'
      }
    });
    const submitButton = wrapper.find('Button').at(2).find('button');
    submitButton.simulate('submit')
    // Update Status
    responseObj.data.requests[0].status = 'Pending Review';
    responseObj.data.requests[0].request_type = 2;
    // simulating a server response
    mockAxios.mockResponse(responseObj)
    wrapper.update()
    expect(mockAxios.post).toHaveBeenCalledWith('/search?start=1&limit=10', {
      "limit": 10,
      "search_args": {
      },
      "search_specs": {
        "group": "reviewer",
        "request_type": 2,
        "user_id": "",
      },
      "start": 1
    }, mockHeader);
    expect(wrapper.find('SearchRequests').state().totalCases).toEqual(1);
    const table = wrapper.find('table');
    expect(table.at(0).find('td').at(2).text()).toEqual('De-registration');
  });

  test("provide Created and Updated Date inputs and submit search form", () => {
    const wrapper = mount(
      <Router>
        <I18nextProvider i18n={i18n}>
          <SearchRequests kc={mockKcProps} resources={kcResource}/>
        </I18nextProvider>
      </Router>
    )
    // Populate Created_at Start and End Date
    wrapper.find('input').at(2).simulate('change', {
      target: {
        value: '2018-12-05',
        name: 'your_unique_start_date_id'
      }
    });
    wrapper.find('input').at(3).simulate('change', {
      target: {
        value: '2018-12-15',
        name: 'your_unique_end_date_id'
      }
    });
    // Populate Updated_at Start and End Date
    wrapper.find('input').at(4).simulate('change', {
      target: {
        value: '2018-12-01',
        name: 'your_unique_start_date_id'
      }
    });
    wrapper.find('input').at(5).simulate('change', {
      target: {
        value: '2018-12-10',
        name: 'your_unique_end_date_id'
      }
    });
    const submitButton = wrapper.find('Button').at(2).find('button');
    submitButton.simulate('submit')
    // Update Status
    responseObj.data.requests[0].status = 'Pending Review';
    responseObj.data.requests[0].request_type = 1;
    responseObj.data.requests[0].processing_status_label = 1;
    responseObj.data.requests[0].report_status_label = 1;
    // simulating a server response
    mockAxios.mockResponse(responseObj)
    wrapper.update()
    expect(mockAxios.post).toHaveBeenCalledWith('/search?start=1&limit=10', {
      "limit": 10,
      "search_args": {
        "created_at": "2018-12-05,2018-12-15",
        "updated_at": "2018-12-01,2018-12-10",
      },
      "search_specs": {
        "group": "reviewer",
        "request_type": 1,
        "user_id": "",
      },
      "start": 1
    }, mockHeader);
    expect(wrapper.find('SearchRequests').state().totalCases).toEqual(1);
    const table = wrapper.find('table');
    expect(table.at(0).find('td').at(4).text()).toEqual('2018-01-01 10:10:10');
    expect(table.at(0).find('td').at(5).text()).toEqual('2018-01-01 10:10:10');
  });

  test("provide other form inputs and submit search form", () => {
    let responseObj = {
      data: {
        requests: [
          {
            processing_status_label: 1,
            report_status_label: 1,
            status: 'Pending Review',
            request_type: 1,
            id: 1,
            tracking_id: 'test-tracking-id',
            reviewer: {
              user_id: '9a4403c2-5a48-4b79-9f30-02c0cc7799e0',
              user_name: 'test-user'
            },
            device_details: {
              brand: 'samsung',
              model_name: 'test model',
              model_num: 'test number',
              device_type: 'Smartphone',
              operating_system: 'android',
            },
            device_count: 1,
            imei_per_device: 1,
            m_location: 'local'
          }
        ],
        count: 1,
        limit: 10,
        start: 1
      }
    }
    const wrapper = mount(
      <Router>
        <I18nextProvider i18n={i18n}>
          <SearchRequests kc={mockKcProps} resources={kcResource}/>
        </I18nextProvider>
      </Router>
    )
    wrapper.find('input').at(6).simulate('change', {
      target: {
        value: 'samsung',
        name: 'brand'
      }
    });
    wrapper.find('input').at(7).simulate('change', {
      target: {
        value: 'test model',
        name: 'model_name'
      }
    });
    wrapper.find('input').at(8).simulate('change', {
      target: {
        value: 'test number',
        name: 'model_num'
      }
    });
    wrapper.find('select').at(2).simulate('change', {
      target: {
        value: 'Smartphone',
        name: 'device_type'
      }
    });
    wrapper.find('input').at(9).simulate('change', {
      target: {
        value: 'android',
        name: 'operating_system'
      }
    });
    
    wrapper.find('input').at(11).simulate('change', {
      target: {
        value: 1,
        name: 'device_count'
      }
    });
    wrapper.find('input').at(12).simulate('change', {
      target: {
        value: 1,
        name: 'imei_per_device'
      }
    });
    wrapper.find('select').at(3).simulate('change', {
      target: {
        value: 'local',
        name: 'm_location'
      }
    });
    const submitButton = wrapper.find('Button').at(2).find('button');
    submitButton.simulate('submit');
    // simulating a server response
    mockAxios.mockResponse(responseObj);
    wrapper.update();
    expect(mockAxios.post).toHaveBeenCalledWith('/search?start=1&limit=10', {
      "limit": 10,
      "search_args": {
        "brand": "samsung",
        "model_name": "test model",
        "model_num": "test number",
        "device_type": "Smartphone",
        "operating_system": "android",
        "device_count": 1,
        "imei_per_device": 1,
        "m_location": "local"
      },
      "search_specs": {
        "group": "reviewer",
        "request_type": 1,
        "user_id": "",
      },
      "start": 1
    }, mockHeader);
    expect(wrapper.find('SearchRequests').state().totalCases).toEqual(1);
    expect(wrapper.find('Formik').state().values.brand).toEqual('samsung');
    expect(wrapper.find('Formik').state().values.model_name).toEqual('test model');
    expect(wrapper.find('Formik').state().values.model_num).toEqual('test number');
    expect(wrapper.find('Formik').state().values.device_type).toEqual('Smartphone');
    expect(wrapper.find('Formik').state().values.operating_system).toEqual('android');
    expect(wrapper.find('Formik').state().values.device_count).toEqual(1);
    expect(wrapper.find('Formik').state().values.imei_per_device).toEqual(1);
    expect(wrapper.find('Formik').state().values.m_location).toEqual('local');
  });

  test("Invalid values of device count and imei per device inputs", () => {
    const wrapper = mount(
      <Router>
        <I18nextProvider i18n={i18n}>
          <SearchRequests kc={mockKcProps} resources={kcResource}/>
        </I18nextProvider>
      </Router>
    );
    wrapper.find('input').at(11).simulate('change', {
      target: {
        value: 'test',
        name: 'device_count'
      }
    });
    wrapper.find('input').at(12).simulate('change', {
      target: {
        value: 'test',
        name: 'imei_per_device'
      }
    });
    const submitButton = wrapper.find('Button').at(2).find('button');
    submitButton.simulate('submit');
    expect(wrapper.find('Formik').state().errors.device_count).toEqual('Must be a number');
    expect(wrapper.find('Formik').state().errors.imei_per_device).toEqual('Must be a number');
    wrapper.find('input').at(11).simulate('change', {
      target: {
        value: 100000001,
        name: 'device_count'
      }
    });
    wrapper.find('input').at(12).simulate('change', {
      target: {
        value: 6,
        name: 'imei_per_device'
      }
    });
    submitButton.simulate('submit');
    expect(wrapper.find('Formik').state().errors.device_count).toEqual('Must be in between 1-1,000,000');
    expect(wrapper.find('Formik').state().errors.imei_per_device).toEqual('Must be in between 1-5');
  });

  test("if user is importer then submit search form", () => {
    // if user is importer
    kcResource.realm_access.roles[1] = 'drs_importer'
    const wrapper = mount(
      <Router>
        <I18nextProvider i18n={i18n}>
          <SearchRequests kc={mockKcProps} resources={kcResource}/>
        </I18nextProvider>
      </Router>
    )

    const submitButton = wrapper.find('Button').at(2).find('button');
    submitButton.simulate('submit')

    // Update Status
    responseObj.data.requests[0].status = 'New Request';
    responseObj.data.requests[0].request_type = 1;
    responseObj.data.requests[0].processing_status_label = 11;
    responseObj.data.requests[0].report_status_label = 11;
    // simulating a server response
    mockAxios.mockResponse(responseObj)
    wrapper.update()
    expect(mockAxios.post).toHaveBeenCalledWith('/search?start=1&limit=10', {
      "limit": 10,
      "search_args": {
      },
      "search_specs": {
        "group": "importer",
        "request_type": 1,
        "user_id": "",
      },
      "start": 1
    }, mockHeader);
    expect(wrapper.find('SearchRequests').state().totalCases).toEqual(1);
    const closeButton = wrapper.find('table').find('button');
    window.confirm = jest.fn(() => true);
    closeButton.simulate('click');
    expect(window.confirm).toBeCalled();
    mockAxios.mockResponse({data: 'Some message'})
    wrapper.update()
    const formData = new FormData();
    formData.append('user_id', getUserInfo().sub);
    formData.append('close_request', 'True');
    formData.append('reg_id', 1);
    expect(mockAxios.put).toHaveBeenCalledWith('/registration', formData, mockHeader);
  });

  test("When request status is Information Requested then call API and show records", () => {
    const wrapper = mount(
      <Router>
        <I18nextProvider i18n={i18n}>
          <SearchRequests kc={mockKcProps} resources={kcResource}/>
        </I18nextProvider>
      </Router>
    )

    const submitButton = wrapper.find('Button').at(2).find('button');
    submitButton.simulate('submit')
    // simulating a server response
    let responseObj = {
      data: {
        requests: [
          {
            processing_status_label: 1,
            report_status_label: 1,
            status: 'Information Requested',
            request_type: 1,
            id: 1,
            tracking_id: 'test-tracking-id',
            reviewer: {
              user_id: '9a4403c2-5a48-4b79-9f30-02c0cc7799e0',
              user_name: 'test-user'
            },
            device_details: {
              device_count: 1,
            },
            created_at: '2018-01-01 10:10:10',
            updated_at: '2018-01-01 10:10:10'
          }
        ],
        count: 1,
        limit: 10,
        start: 1
      }
    }

    mockAxios.mockResponse(responseObj);
    wrapper.update();
    expect(mockAxios.post).toHaveBeenCalledWith('/search?start=1&limit=10', {
      "limit": 10,
      "search_args": {},
      "search_specs": {
        "group": "importer",
        "request_type": 1,
        "user_id": "",
      },
      "start": 1
    }, mockHeader);
    expect(wrapper.find('SearchRequests').state().totalCases).toEqual(1);
    const table = wrapper.find('table');
    expect(table.at(0).find('tbody tr td').at(6).find('span').text()).toEqual('In Complete');
    expect(table.at(0).find('tbody tr td').at(7).find('button').text()).toEqual('Close');
    table.at(0).find('tbody tr td').at(7).find('button').simulate('click');
    expect(wrapper.find('SearchRequests').state().apiFetched).toBe(true);
  });

  test("When request status is Pending Review then call API and show records", () => {
    const wrapper = mount(
      <Router>
        <I18nextProvider i18n={i18n}>
          <SearchRequests kc={mockKcProps} resources={kcResource}/>
        </I18nextProvider>
      </Router>
    )

    const submitButton = wrapper.find('Button').at(2).find('button');
    submitButton.simulate('submit')
    // simulating a server response
    let responseObj = {
      data: {
        requests: [
          {
            processing_status_label: 1,
            report_status_label: 1,
            status: 'Pending Review',
            request_type: 1,
            id: 1,
            tracking_id: 'test-tracking-id',
            reviewer: {
              user_id: '9a4403c2-5a48-4b79-9f30-02c0cc7799e0',
              user_name: 'test-user'
            },
            device_details: {
              device_count: 1,
            },
            created_at: '2018-01-01 10:10:10',
            updated_at: '2018-01-01 10:10:10'
          }
        ],
        count: 1,
        limit: 10,
        start: 1
      }
    }

    mockAxios.mockResponse(responseObj);
    wrapper.update();
    expect(mockAxios.post).toHaveBeenCalledWith('/search?start=1&limit=10', {
      "limit": 10,
      "search_args": {},
      "search_specs": {
        "group": "importer",
        "request_type": 1,
        "user_id": "",
      },
      "start": 1
    }, mockHeader);
    expect(wrapper.find('SearchRequests').state().totalCases).toEqual(1);
    const table = wrapper.find('table');
    expect(table.at(0).find('tbody tr td').at(6).find('span').text()).toEqual('In Complete');
    expect(table.at(0).find('tbody tr td').at(7).find('button').text()).toEqual('Close');
    table.at(0).find('tbody tr td').at(7).find('button').simulate('click');
    expect(wrapper.find('SearchRequests').state().apiFetched).toBe(true);
  });

  test("Registration request Close button click and reinitiate button click", () => {
    const wrapper = mount(
      <Router>
        <I18nextProvider i18n={i18n}>
          <SearchRequests kc={mockKcProps} resources={kcResource}/>
        </I18nextProvider>
      </Router>
    )

    const submitButton = wrapper.find('Button').at(2).find('button');
    submitButton.simulate('submit')
    // simulating a server response
    let responseObj = {
      data: {
        requests: [
          {
            processing_status_label: 1,
            report_status_label: 1,
            status: 'Information Requested',
            request_type: 1,
            id: 1,
            tracking_id: 'test-tracking-id',
            reviewer: {
              user_id: '9a4403c2-5a48-4b79-9f30-02c0cc7799e0',
              user_name: 'test-user'
            },
            device_details: {
              device_count: 1,
            },
            created_at: '2018-01-01 10:10:10',
            updated_at: '2018-01-01 10:10:10'
          }
        ],
        count: 1,
        limit: 10,
        start: 1
      }
    }

    mockAxios.mockResponse(responseObj);
    wrapper.update();
    expect(wrapper.find('SearchRequests').state().totalCases).toEqual(1);
    const table = wrapper.find('table');
    expect(table.at(0).find('tbody tr td').at(6).find('span').text()).toEqual('In Complete');
    expect(table.at(0).find('tbody tr td').at(7).find('button').text()).toEqual('Close');
    table.at(0).find('tbody tr td').at(7).find('button').simulate('click');
    expect(wrapper.find('SearchRequests').state().apiFetched).toBe(true);
  });

  test("Deregistration request Close button click and reinitiate button click", () => {
    const wrapper = mount(
      <Router>
        <I18nextProvider i18n={i18n}>
          <SearchRequests kc={mockKcProps} resources={kcResource}/>
        </I18nextProvider>
      </Router>
    );
    wrapper.find('select').at(1).simulate('change', {
      target: {
        value: 2,
        name: 'request_type'
      }
    });
    const submitButton = wrapper.find('Button').at(2).find('button');
    submitButton.simulate('submit');
    // simulating a server response
    let responseObj = {
      data: {
        requests: [
          {
            processing_status_label: 10,
            updated_at: '2018-12-27 07:56:08',
            report: "compliant_report8a054506-1ddc-4db8-92b6-ec8e607dd9fa.tsv",
            id: 1,
            status: 'Information Requested',
            report_status_label: 10,
            created_at: '2018-12-20 05:33:58',
            tracking_id: 'test-tracking-id',
            reviewer: {
              user_id: '3341',
              user_name: 'test-user'
            },
            device_details: {
              model_name: 'E440i',
              m_location: 'N/A',
              operating_system: 'N/A',
              technologies: 'NONE',
              imeis: ['35643807744165', '35643807744167'],
              device_count: 1,
              model_num: 'E440i',
              device_type: 'Mobile Phone/Feature Phone',
              brand: 'Sony'
            },
            request_type: 2,
            creator: {
              user_name: 'exporter',
              user_id: '3c05fa5c-4106-4cd9-8a74-3552bff9c824'
            }
          }
        ],
        count: 1,
        limit: 10,
        start: 1
      }
    }

    mockAxios.mockResponse(responseObj);
    wrapper.update();
    expect(wrapper.find('SearchRequests').state().totalCases).toEqual(1);
    const table = wrapper.find('table');
    expect(table.at(0).find('tbody tr td').at(6).find('span').text()).toEqual('Information Requested');
    expect(table.at(0).find('tbody tr td').at(7).find('button').text()).toEqual('Close');
    table.at(0).find('tbody tr td').at(7).find('button').simulate('click');
    expect(wrapper.find('SearchRequests').state().apiFetched).toBe(true);
  });

});