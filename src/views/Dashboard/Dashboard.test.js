/*
Copyright (c) 2018 Qualcomm Technologies, Inc.
All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted (subject to the
limitations in the disclaimer below) provided that the following conditions are met:

* Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
* Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following
* disclaimer in the documentation and/or other materials provided with the distribution.
* Neither the name of Qualcomm Technologies, Inc. nor the names of its contributors may be used to endorse or promote
* products derived from this software without specific prior written permission.
NO EXPRESS OR IMPLIED LICENSES TO ANY PARTY'S PATENT RIGHTS ARE GRANTED BY THIS LICENSE. THIS SOFTWARE IS PROVIDED BY
THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO,
THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR
BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
POSSIBILITY OF SUCH DAMAGE.
*/
import React from 'react';
import Dashboard from './Dashboard';
import {I18nextProvider} from "react-i18next";
import i18n from "./../../i18nTest";
import mockAxios from 'jest-mock-axios';
import {BrowserRouter as Router} from 'react-router-dom';

describe('Dashboard component', () => {
  beforeEach(() => {
    // cleaning up the mess left behind the previous test
    mockAxios.reset();
  });
  test('if renders correctly', () => {
    const wrapper = shallow(
      <Dashboard/>);
    expect(wrapper).toMatchSnapshot()
  })
  test('if renders correctly again', () => {
    const wrapper = render(
      <Router>
        <I18nextProvider i18n={i18n}>
          <Dashboard kc={mockKcProps}/>
        </I18nextProvider>
      </Router>
    )
    expect(wrapper).toMatchSnapshot()
  });
  describe('When logged in as Reviewer',()=>{
    beforeEach(() => {
      // cleaning up the mess left behind the previous test
      mockAxios.reset();
    });
    const kcResource = {
      realm_access: {
        roles: ['drs_authority']
      }
    }
    test('if initial state renders correctly',()=>{
      let pendingReviewsRegistration =10
      let pendingDeReviewsRegistration =12
      let inReviewRegistration =80
      let inReviewDeRegistration =100
      let latestRequestsDeRegistration = [
        {
          "id": 4483,
          "report_status_label": "Processed",
          "file": "deviceRegistration.txt",
          "invalid_imeis_file": null,
          "tracking_id": "94c93981-6ee8-4811-9242-4ba5cc583c87",
          "reason": "Export the Devices from Pakistan.",
          "reviewer_id": null,
          "updated_at": "2019-02-20T04:41:50.603240+00:00",
          "report_allowed": false,
          "created_at": "2019-02-20T01:07:35.463538+00:00",
          "reviewer_name": null,
          "status_label": "Pending Review",
          "processing_status_label": "Processing",
          "device_count": 22,
          "file_link": "/var/www/html/Device-Registration-Subsystem/etc/uploads/94c93981-6ee8-4811-9242-4ba5cc583c87/deviceRegistration.txt",
          "report": "compliant_report15261634-0c35-40d5-9349-40b00629b1bf.tsv",
          "user_id": "3c05fa5c-4106-4cd9-8a74-3552bff9c824",
          "user_name": "auto exporter"
        },
        {
          "id": 4479,
          "report_status_label": "Processed",
          "file": "00 dereg.txt",
          "invalid_imeis_file": null,
          "tracking_id": "4ad897a0-764a-4a59-926b-543a02315f70",
          "reason": "aaaaaaaaaaaaaaa",
          "reviewer_id": null,
          "updated_at": "2019-02-19T14:39:09.653872+00:00",
          "report_allowed": false,
          "created_at": "2019-02-19T14:38:09.989574+00:00",
          "reviewer_name": null,
          "status_label": "Pending Review",
          "processing_status_label": "Processed",
          "device_count": 3,
          "file_link": "/var/www/html/Device-Registration-Subsystem/etc/uploads/4ad897a0-764a-4a59-926b-543a02315f70/00 dereg.txt",
          "report": "compliant_report1dd8b609-9ab7-43e1-948c-18bfd8d66d86.tsv",
          "user_id": "85fd4c61-76d1-4558-b8d7-2e6299e76b64",
          "user_name": "zulfiqar drs exporter"
        }
      ]
      let latestRequestsRegistration = [
        {
          "imeis": null,
          "created_at": "2019-02-18T01:05:15.299472+00:00",
          "file": "deviceRegistration.tsv",
          "duplicate_imeis_file": null,
          "tracking_id": "af103994-550d-45ad-945a-9b13ed4f40a8",
          "reviewer_id": null,
          "updated_at": "2019-02-19T01:01:41.374987+00:00",
          "report_allowed": false,
          "report_status_label": "Processed",
          "reviewer_name": null,
          "status_label": "Pending Review",
          "processing_status_label": "Failed",
          "device_count": 11,
          "report": "compliant_report24c4b227-6e5f-4ada-ae3d-c3b0dfb826d9.tsv",
          "file_link": "/var/www/html/Device-Registration-Subsystem/etc/uploads/af103994-550d-45ad-945a-9b13ed4f40a8/deviceRegistration.tsv",
          "id": 44946,
          "user_name": "auto importer",
          "m_location": "local",
          "user_id": "eedbbc2d-6ded-4f34-bbd3-1e40c5c13b8d",
          "imei_per_device": 2
        },
        {
          "imeis": [["2222222222222222"]],
          "created_at": "2019-02-14T13:23:59.871998+00:00",
          "file": null,
          "duplicate_imeis_file": null,
          "tracking_id": "938d4fc6-3d3d-4b39-8813-2654d6000610",
          "reviewer_id": null,
          "updated_at": "2019-02-14T13:28:14.383851+00:00",
          "report_allowed": false,
          "report_status_label": "Processed",
          "reviewer_name": null,
          "status_label": "Pending Review",
          "processing_status_label": "Processed",
          "device_count": 1,
          "report": "compliant_reportca72ffa9-7efe-4e68-bb88-7066d5e929b9.tsv",
          "id": 44934,
          "user_name": "sana drs individual",
          "m_location": "overseas",
          "user_id": "b22a0920-6880-48d9-ae34-b98ef1a8be66",
          "imei_per_device": 1
        }
      ]
      const wrapper = mount(
        <Router>
          <I18nextProvider i18n={i18n}>
            <Dashboard kc={mockKcProps} resources={kcResource}/>
          </I18nextProvider>
        </Router>
      )
      const reportResponse = {
        data: {
          "user_type": "reviewer",
          "de-registration": {
            "pending_review_count": pendingDeReviewsRegistration,
            "latest_pending_requests": latestRequestsDeRegistration,
            "in_review_count": inReviewDeRegistration
          },
          "registration": {
            "pending_review_count": pendingReviewsRegistration,
            "latest_pending_requests": latestRequestsRegistration,
            "in_review_count": inReviewRegistration
          }, "user_id": "81e53d7a-4483-407c-b9f7-1ebd9fe05ac6"
        }
      }
      mockAxios.mockResponse(reportResponse)
      wrapper.update()

      let state = wrapper.find('Dashboard').state()
      //Tests
      expect(state.userRole).toEqual('authority')
      expect(state.pendingRegistrationRequests).toEqual(pendingReviewsRegistration)
      expect(state.pendingDeRegistrationRequests).toEqual(pendingDeReviewsRegistration)
      expect(state.inReviewRegistrationRequests).toEqual(inReviewRegistration)
      expect(state.inReviewDeRegistrationRequests).toEqual(inReviewDeRegistration)
    })
    test('if initial state renders dom correctly',()=>{
      let pendingReviewsRegistration =10
      let pendingDeReviewsRegistration =12
      let inReviewRegistration =80
      let inReviewDeRegistration =100
      let latestRequestsDeRegistration = [
        {
          "id": 4483,
          "report_status_label": "Processed",
          "file": "deviceRegistration.txt",
          "invalid_imeis_file": null,
          "tracking_id": "94c93981-6ee8-4811-9242-4ba5cc583c87",
          "reason": "Export the Devices from Pakistan.",
          "reviewer_id": null,
          "updated_at": "2019-02-20T04:41:50.603240+00:00",
          "report_allowed": false,
          "created_at": "2019-02-20T01:07:35.463538+00:00",
          "reviewer_name": null,
          "status_label": "Pending Review",
          "processing_status_label": "Processing",
          "device_count": 22,
          "file_link": "/var/www/html/Device-Registration-Subsystem/etc/uploads/94c93981-6ee8-4811-9242-4ba5cc583c87/deviceRegistration.txt",
          "report": "compliant_report15261634-0c35-40d5-9349-40b00629b1bf.tsv",
          "user_id": "3c05fa5c-4106-4cd9-8a74-3552bff9c824",
          "user_name": "auto exporter"
        },
        {
          "id": 4479,
          "report_status_label": "Processed",
          "file": "00 dereg.txt",
          "invalid_imeis_file": null,
          "tracking_id": "4ad897a0-764a-4a59-926b-543a02315f70",
          "reason": "aaaaaaaaaaaaaaa",
          "reviewer_id": null,
          "updated_at": "2019-02-19T14:39:09.653872+00:00",
          "report_allowed": false,
          "created_at": "2019-02-19T14:38:09.989574+00:00",
          "reviewer_name": null,
          "status_label": "Pending Review",
          "processing_status_label": "Processed",
          "device_count": 3,
          "file_link": "/var/www/html/Device-Registration-Subsystem/etc/uploads/4ad897a0-764a-4a59-926b-543a02315f70/00 dereg.txt",
          "report": "compliant_report1dd8b609-9ab7-43e1-948c-18bfd8d66d86.tsv",
          "user_id": "85fd4c61-76d1-4558-b8d7-2e6299e76b64",
          "user_name": "zulfiqar drs exporter"
        },]
      let latestRequestsRegistration = [
        {
          "imeis": null,
          "created_at": "2019-02-18T01:05:15.299472+00:00",
          "file": "deviceRegistration.tsv",
          "duplicate_imeis_file": null,
          "tracking_id": "af103994-550d-45ad-945a-9b13ed4f40a8",
          "reviewer_id": null,
          "updated_at": "2019-02-19T01:01:41.374987+00:00",
          "report_allowed": false,
          "report_status_label": "Processed",
          "reviewer_name": null,
          "status_label": "Pending Review",
          "processing_status_label": "Failed",
          "device_count": 11,
          "report": "compliant_report24c4b227-6e5f-4ada-ae3d-c3b0dfb826d9.tsv",
          "file_link": "/var/www/html/Device-Registration-Subsystem/etc/uploads/af103994-550d-45ad-945a-9b13ed4f40a8/deviceRegistration.tsv",
          "id": 44946,
          "user_name": "auto importer",
          "m_location": "local",
          "user_id": "eedbbc2d-6ded-4f34-bbd3-1e40c5c13b8d",
          "imei_per_device": 2
        },
        {
          "imeis": [["2222222222222222"]],
          "created_at": "2019-02-14T13:23:59.871998+00:00",
          "file": null,
          "duplicate_imeis_file": null,
          "tracking_id": "938d4fc6-3d3d-4b39-8813-2654d6000610",
          "reviewer_id": null,
          "updated_at": "2019-02-14T13:28:14.383851+00:00",
          "report_allowed": false,
          "report_status_label": "Processed",
          "reviewer_name": null,
          "status_label": "Pending Review",
          "processing_status_label": "Processed",
          "device_count": 1,
          "report": "compliant_reportca72ffa9-7efe-4e68-bb88-7066d5e929b9.tsv",
          "id": 44934,
          "user_name": "sana drs individual",
          "m_location": "overseas",
          "user_id": "b22a0920-6880-48d9-ae34-b98ef1a8be66",
          "imei_per_device": 1
        }
      ]
      const wrapper = mount(
        <Router>
          <I18nextProvider i18n={i18n}>
            <Dashboard kc={mockKcProps} resources={kcResource} lng="id"/>
          </I18nextProvider>
        </Router>
      )
      const reportResponse = {
        data: {
          "user_type": "reviewer",
          "de-registration": {
            "pending_review_count": pendingDeReviewsRegistration,
            "latest_pending_requests": latestRequestsDeRegistration,
            "in_review_count": inReviewDeRegistration
          },
          "registration": {
            "pending_review_count": pendingReviewsRegistration,
            "latest_pending_requests": latestRequestsRegistration,
            "in_review_count": inReviewRegistration
          }, "user_id": "81e53d7a-4483-407c-b9f7-1ebd9fe05ac6"
        }
      }
      mockAxios.mockResponse(reportResponse)
      wrapper.update()

      //Tests
      //Get pending review registration from DOM
      let pendingReviewText = wrapper.find('Dashboard').find({className:'dashbx pendbx'}).at(0).find('h3').text()
      expect(pendingReviewText).toEqual('10 Requests')

      //Get pending review de-registration from DOM
      pendingReviewText = wrapper.find('Dashboard').find({className:'dashbx pendbx'}).at(1).find('h3').text()
      expect(pendingReviewText).toEqual('12 Requests')

      //Get In review registration from DOM
      let inReviewText = wrapper.find('Dashboard').find({className:'dashbx inrevibx'}).at(0).find('h3').text()
      expect(inReviewText).toEqual('80 Requests')

      //Get In review de-registration from DOM
      inReviewText = wrapper.find('Dashboard').find({className:'dashbx inrevibx'}).at(1).find('h3').text()
      expect(inReviewText).toEqual('100 Requests')
    })
    test('if redirects to search page',()=>{
      let pendingReviewsRegistration =10
      let pendingDeReviewsRegistration =12
      let inReviewRegistration =80
      let inReviewDeRegistration =100
      let latestRequestsDeRegistration = [
        {
          "id": 4483,
          "report_status_label": "Processed",
          "file": "deviceRegistration.txt",
          "invalid_imeis_file": null,
          "tracking_id": "94c93981-6ee8-4811-9242-4ba5cc583c87",
          "reason": "Export the Devices from Pakistan.",
          "reviewer_id": null,
          "updated_at": "2019-02-20T04:41:50.603240+00:00",
          "report_allowed": false,
          "created_at": "2019-02-20T01:07:35.463538+00:00",
          "reviewer_name": null,
          "status_label": "Pending Review",
          "processing_status_label": "Processing",
          "device_count": 22,
          "file_link": "/var/www/html/Device-Registration-Subsystem/etc/uploads/94c93981-6ee8-4811-9242-4ba5cc583c87/deviceRegistration.txt",
          "report": "compliant_report15261634-0c35-40d5-9349-40b00629b1bf.tsv",
          "user_id": "3c05fa5c-4106-4cd9-8a74-3552bff9c824",
          "user_name": "auto exporter"
        },
        {
          "id": 4479,
          "report_status_label": "Processed",
          "file": "00 dereg.txt",
          "invalid_imeis_file": null,
          "tracking_id": "4ad897a0-764a-4a59-926b-543a02315f70",
          "reason": "aaaaaaaaaaaaaaa",
          "reviewer_id": null,
          "updated_at": "2019-02-19T14:39:09.653872+00:00",
          "report_allowed": false,
          "created_at": "2019-02-19T14:38:09.989574+00:00",
          "reviewer_name": null,
          "status_label": "Pending Review",
          "processing_status_label": "Processed",
          "device_count": 3,
          "file_link": "/var/www/html/Device-Registration-Subsystem/etc/uploads/4ad897a0-764a-4a59-926b-543a02315f70/00 dereg.txt",
          "report": "compliant_report1dd8b609-9ab7-43e1-948c-18bfd8d66d86.tsv",
          "user_id": "85fd4c61-76d1-4558-b8d7-2e6299e76b64",
          "user_name": "zulfiqar drs exporter"
        },]
      let latestRequestsRegistration = [
        {
          "imeis": null,
          "created_at": "2019-02-18T01:05:15.299472+00:00",
          "file": "deviceRegistration.tsv",
          "duplicate_imeis_file": null,
          "tracking_id": "af103994-550d-45ad-945a-9b13ed4f40a8",
          "reviewer_id": null,
          "updated_at": "2019-02-19T01:01:41.374987+00:00",
          "report_allowed": false,
          "report_status_label": "Processed",
          "reviewer_name": null,
          "status_label": "Pending Review",
          "processing_status_label": "Failed",
          "device_count": 11,
          "report": "compliant_report24c4b227-6e5f-4ada-ae3d-c3b0dfb826d9.tsv",
          "file_link": "/var/www/html/Device-Registration-Subsystem/etc/uploads/af103994-550d-45ad-945a-9b13ed4f40a8/deviceRegistration.tsv",
          "id": 44946,
          "user_name": "auto importer",
          "m_location": "local",
          "user_id": "eedbbc2d-6ded-4f34-bbd3-1e40c5c13b8d",
          "imei_per_device": 2
        },
        {
          "imeis": [["2222222222222222"]],
          "created_at": "2019-02-14T13:23:59.871998+00:00",
          "file": null,
          "duplicate_imeis_file": null,
          "tracking_id": "938d4fc6-3d3d-4b39-8813-2654d6000610",
          "reviewer_id": null,
          "updated_at": "2019-02-14T13:28:14.383851+00:00",
          "report_allowed": false,
          "report_status_label": "Processed",
          "reviewer_name": null,
          "status_label": "Pending Review",
          "processing_status_label": "Processed",
          "device_count": 1,
          "report": "compliant_reportca72ffa9-7efe-4e68-bb88-7066d5e929b9.tsv",
          "id": 44934,
          "user_name": "sana drs individual",
          "m_location": "overseas",
          "user_id": "b22a0920-6880-48d9-ae34-b98ef1a8be66",
          "imei_per_device": 1
        }
      ]
      const wrapper = mount(
        <Router>
          <I18nextProvider i18n={i18n}>
            <Dashboard kc={mockKcProps} resources={kcResource}/>
          </I18nextProvider>
        </Router>
      )
      const reportResponse = {
        data: {
          "user_type": "reviewer",
          "de-registration": {
            "pending_review_count": pendingDeReviewsRegistration,
            "latest_pending_requests": latestRequestsDeRegistration,
            "in_review_count": inReviewDeRegistration
          },
          "registration": {
            "pending_review_count": pendingReviewsRegistration,
            "latest_pending_requests": latestRequestsRegistration,
            "in_review_count": inReviewRegistration
          }, "user_id": "81e53d7a-4483-407c-b9f7-1ebd9fe05ac6"
        }
      }
      mockAxios.mockResponse(reportResponse)
      wrapper.update()

      //Tests
      expect(wrapper.find('Link').at(0).props().to.pathname).toBe('/search-requests');
      expect(wrapper.find('Link').at(0).props().to.state.filter).toBe('pending registrations');
      expect(wrapper.find('Link').at(1).props().to.state.filter).toBe('pending de-registrations');
      expect(wrapper.find('Link').at(2).props().to.state.filter).toBe('in review registrations');
      expect(wrapper.find('Link').at(3).props().to.state.filter).toBe('in review de-registrations');
    })
    test('if latest requests renders in table',()=>{
      let pendingReviewsRegistration =10
      let pendingDeReviewsRegistration =12
      let inReviewRegistration =80
      let inReviewDeRegistration =100
      let latestRequestsDeRegistration = [
        {
          "id": 4483,
          "report_status_label": "Processed",
          "file": "deviceRegistration.txt",
          "invalid_imeis_file": null,
          "tracking_id": "94c93981-6ee8-4811-9242-4ba5cc583c87",
          "reason": "Export the Devices from Pakistan.",
          "reviewer_id": null,
          "updated_at": "2019-02-20T04:41:50.603240+00:00",
          "report_allowed": false,
          "created_at": "2019-02-20T01:07:35.463538+00:00",
          "reviewer_name": null,
          "status_label": "Pending Review",
          "processing_status_label": "Processing",
          "device_count": 22,
          "file_link": "/var/www/html/Device-Registration-Subsystem/etc/uploads/94c93981-6ee8-4811-9242-4ba5cc583c87/deviceRegistration.txt",
          "report": "compliant_report15261634-0c35-40d5-9349-40b00629b1bf.tsv",
          "user_id": "3c05fa5c-4106-4cd9-8a74-3552bff9c824",
          "user_name": "auto exporter"
        },
        {
          "id": 4479,
          "report_status_label": "Processed",
          "file": "00 dereg.txt",
          "invalid_imeis_file": null,
          "tracking_id": "4ad897a0-764a-4a59-926b-543a02315f70",
          "reason": "aaaaaaaaaaaaaaa",
          "reviewer_id": null,
          "updated_at": "2019-02-19T14:39:09.653872+00:00",
          "report_allowed": false,
          "created_at": "2019-02-19T14:38:09.989574+00:00",
          "reviewer_name": null,
          "status_label": "Pending Review",
          "processing_status_label": "Processed",
          "device_count": 3,
          "file_link": "/var/www/html/Device-Registration-Subsystem/etc/uploads/4ad897a0-764a-4a59-926b-543a02315f70/00 dereg.txt",
          "report": "compliant_report1dd8b609-9ab7-43e1-948c-18bfd8d66d86.tsv",
          "user_id": "85fd4c61-76d1-4558-b8d7-2e6299e76b64",
          "user_name": "zulfiqar drs exporter"
        },]
      let latestRequestsRegistration = [
        {
          "imeis": null,
          "created_at": "2019-02-18T01:05:15.299472+00:00",
          "file": "deviceRegistration.tsv",
          "duplicate_imeis_file": null,
          "tracking_id": "af103994-550d-45ad-945a-9b13ed4f40a8",
          "reviewer_id": null,
          "updated_at": "2019-02-19T01:01:41.374987+00:00",
          "report_allowed": false,
          "report_status_label": "Processed",
          "reviewer_name": null,
          "status_label": "Pending Review",
          "processing_status_label": "Failed",
          "device_count": 11,
          "report": "compliant_report24c4b227-6e5f-4ada-ae3d-c3b0dfb826d9.tsv",
          "file_link": "/var/www/html/Device-Registration-Subsystem/etc/uploads/af103994-550d-45ad-945a-9b13ed4f40a8/deviceRegistration.tsv",
          "id": 44946,
          "user_name": "auto importer",
          "m_location": "local",
          "user_id": "eedbbc2d-6ded-4f34-bbd3-1e40c5c13b8d",
          "imei_per_device": 2
        },
        {
          "imeis": [["2222222222222222"]],
          "created_at": "2019-02-14T13:23:59.871998+00:00",
          "file": null,
          "duplicate_imeis_file": null,
          "tracking_id": "938d4fc6-3d3d-4b39-8813-2654d6000610",
          "reviewer_id": null,
          "updated_at": "2019-02-14T13:28:14.383851+00:00",
          "report_allowed": false,
          "report_status_label": "Processed",
          "reviewer_name": null,
          "status_label": "Pending Review",
          "processing_status_label": "Processed",
          "device_count": 1,
          "report": "compliant_reportca72ffa9-7efe-4e68-bb88-7066d5e929b9.tsv",
          "id": 44934,
          "user_name": "sana drs individual",
          "m_location": "overseas",
          "user_id": "b22a0920-6880-48d9-ae34-b98ef1a8be66",
          "imei_per_device": 1
        }
      ]
      let mergedLatest = [
        {
          "id": 4483,
          "report_status_label": "Processed",
          "file": "deviceRegistration.txt",
          "invalid_imeis_file": null,
          "tracking_id": "94c93981-6ee8-4811-9242-4ba5cc583c87",
          "reason": "Export the Devices from Pakistan.",
          "reviewer_id": null,
          "updated_at": "2019-02-20T04:41:50.603240+00:00",
          "report_allowed": false,
          "created_at": "2019-02-20T01:07:35.463538+00:00",
          "reviewer_name": null,
          "status_label": "Pending Review",
          "processing_status_label": "Processing",
          "device_count": 22,
          "file_link": "/var/www/html/Device-Registration-Subsystem/etc/uploads/94c93981-6ee8-4811-9242-4ba5cc583c87/deviceRegistration.txt",
          "report": "compliant_report15261634-0c35-40d5-9349-40b00629b1bf.tsv",
          "user_id": "3c05fa5c-4106-4cd9-8a74-3552bff9c824",
          "user_name": "auto exporter"
        },
        {
          "id": 4479,
          "report_status_label": "Processed",
          "file": "00 dereg.txt",
          "invalid_imeis_file": null,
          "tracking_id": "4ad897a0-764a-4a59-926b-543a02315f70",
          "reason": "aaaaaaaaaaaaaaa",
          "reviewer_id": null,
          "updated_at": "2019-02-19T14:39:09.653872+00:00",
          "report_allowed": false,
          "created_at": "2019-02-19T14:38:09.989574+00:00",
          "reviewer_name": null,
          "status_label": "Pending Review",
          "processing_status_label": "Processed",
          "device_count": 3,
          "file_link": "/var/www/html/Device-Registration-Subsystem/etc/uploads/4ad897a0-764a-4a59-926b-543a02315f70/00 dereg.txt",
          "report": "compliant_report1dd8b609-9ab7-43e1-948c-18bfd8d66d86.tsv",
          "user_id": "85fd4c61-76d1-4558-b8d7-2e6299e76b64",
          "user_name": "zulfiqar drs exporter"
        },
        {
          "imeis": null,
          "created_at": "2019-02-18T01:05:15.299472+00:00",
          "file": "deviceRegistration.tsv",
          "duplicate_imeis_file": null,
          "tracking_id": "af103994-550d-45ad-945a-9b13ed4f40a8",
          "reviewer_id": null,
          "updated_at": "2019-02-19T01:01:41.374987+00:00",
          "report_allowed": false,
          "report_status_label": "Processed",
          "reviewer_name": null,
          "status_label": "Pending Review",
          "processing_status_label": "Failed",
          "device_count": 11,
          "report": "compliant_report24c4b227-6e5f-4ada-ae3d-c3b0dfb826d9.tsv",
          "file_link": "/var/www/html/Device-Registration-Subsystem/etc/uploads/af103994-550d-45ad-945a-9b13ed4f40a8/deviceRegistration.tsv",
          "id": 44946,
          "user_name": "auto importer",
          "m_location": "local",
          "user_id": "eedbbc2d-6ded-4f34-bbd3-1e40c5c13b8d",
          "imei_per_device": 2
        },
        {
          "imeis": [["2222222222222222"]],
          "created_at": "2019-02-14T13:23:59.871998+00:00",
          "file": null,
          "duplicate_imeis_file": null,
          "tracking_id": "938d4fc6-3d3d-4b39-8813-2654d6000610",
          "reviewer_id": null,
          "updated_at": "2019-02-14T13:28:14.383851+00:00",
          "report_allowed": false,
          "report_status_label": "Processed",
          "reviewer_name": null,
          "status_label": "Pending Review",
          "processing_status_label": "Processed",
          "device_count": 1,
          "report": "compliant_reportca72ffa9-7efe-4e68-bb88-7066d5e929b9.tsv",
          "id": 44934,
          "user_name": "sana drs individual",
          "m_location": "overseas",
          "user_id": "b22a0920-6880-48d9-ae34-b98ef1a8be66",
          "imei_per_device": 1
        }
      ]
      const wrapper = mount(
        <Router>
          <I18nextProvider i18n={i18n}>
            <Dashboard kc={mockKcProps} resources={kcResource}/>
          </I18nextProvider>
        </Router>
      )
      const reportResponse = {
        data: {
          "user_type": "reviewer",
          "de-registration": {
            "pending_review_count": pendingDeReviewsRegistration,
            "latest_pending_requests": latestRequestsDeRegistration,
            "in_review_count": inReviewDeRegistration
          },
          "registration": {
            "pending_review_count": pendingReviewsRegistration,
            "latest_pending_requests": latestRequestsRegistration,
            "in_review_count": inReviewRegistration
          }, "user_id": "81e53d7a-4483-407c-b9f7-1ebd9fe05ac6"
        }
      }
      mockAxios.mockResponse(reportResponse)
      wrapper.update()

      //Test
      expect(wrapper.find('Dashboard').state().latestRequests).toEqual(mergedLatest)
      expect(wrapper.find('Dashboard').find('table tbody tr').length).toEqual(4)
    })
    test('if redirects to Search page when requested row is clicked',()=>{
      let pendingReviewsRegistration =10
      let pendingDeReviewsRegistration =12
      let inReviewRegistration =80
      let inReviewDeRegistration =100
      let latestRequestsDeRegistration = [
        {
          "id": 4483,
          "report_status_label": "Processed",
          "file": "deviceRegistration.txt",
          "invalid_imeis_file": null,
          "tracking_id": "94c93981-6ee8-4811-9242-4ba5cc583c87",
          "reason": "Export the Devices from Pakistan.",
          "reviewer_id": null,
          "updated_at": "2019-02-20T04:41:50.603240+00:00",
          "report_allowed": false,
          "created_at": "2019-02-20T01:07:35.463538+00:00",
          "reviewer_name": null,
          "status_label": "Pending Review",
          "processing_status_label": "Processing",
          "device_count": 22,
          "file_link": "/var/www/html/Device-Registration-Subsystem/etc/uploads/94c93981-6ee8-4811-9242-4ba5cc583c87/deviceRegistration.txt",
          "report": "compliant_report15261634-0c35-40d5-9349-40b00629b1bf.tsv",
          "user_id": "3c05fa5c-4106-4cd9-8a74-3552bff9c824",
          "user_name": "auto exporter"
        },
        {
          "id": 4479,
          "report_status_label": "Processed",
          "file": "00 dereg.txt",
          "invalid_imeis_file": null,
          "tracking_id": "4ad897a0-764a-4a59-926b-543a02315f70",
          "reason": "aaaaaaaaaaaaaaa",
          "reviewer_id": null,
          "updated_at": "2019-02-19T14:39:09.653872+00:00",
          "report_allowed": false,
          "created_at": "2019-02-19T14:38:09.989574+00:00",
          "reviewer_name": null,
          "status_label": "Pending Review",
          "processing_status_label": "Processed",
          "device_count": 3,
          "file_link": "/var/www/html/Device-Registration-Subsystem/etc/uploads/4ad897a0-764a-4a59-926b-543a02315f70/00 dereg.txt",
          "report": "compliant_report1dd8b609-9ab7-43e1-948c-18bfd8d66d86.tsv",
          "user_id": "85fd4c61-76d1-4558-b8d7-2e6299e76b64",
          "user_name": "zulfiqar drs exporter"
        },]
      let latestRequestsRegistration = [
        {
          "imeis": null,
          "created_at": "2019-02-18T01:05:15.299472+00:00",
          "file": "deviceRegistration.tsv",
          "duplicate_imeis_file": null,
          "tracking_id": "af103994-550d-45ad-945a-9b13ed4f40a8",
          "reviewer_id": null,
          "updated_at": "2019-02-19T01:01:41.374987+00:00",
          "report_allowed": false,
          "report_status_label": "Processed",
          "reviewer_name": null,
          "status_label": "Pending Review",
          "processing_status_label": "Failed",
          "device_count": 11,
          "report": "compliant_report24c4b227-6e5f-4ada-ae3d-c3b0dfb826d9.tsv",
          "file_link": "/var/www/html/Device-Registration-Subsystem/etc/uploads/af103994-550d-45ad-945a-9b13ed4f40a8/deviceRegistration.tsv",
          "id": 44946,
          "user_name": "auto importer",
          "m_location": "local",
          "user_id": "eedbbc2d-6ded-4f34-bbd3-1e40c5c13b8d",
          "imei_per_device": 2
        },
        {
          "imeis": [["2222222222222222"]],
          "created_at": "2019-02-14T13:23:59.871998+00:00",
          "file": null,
          "duplicate_imeis_file": null,
          "tracking_id": "938d4fc6-3d3d-4b39-8813-2654d6000610",
          "reviewer_id": null,
          "updated_at": "2019-02-14T13:28:14.383851+00:00",
          "report_allowed": false,
          "report_status_label": "Processed",
          "reviewer_name": null,
          "status_label": "Pending Review",
          "processing_status_label": "Processed",
          "device_count": 1,
          "report": "compliant_reportca72ffa9-7efe-4e68-bb88-7066d5e929b9.tsv",
          "id": 44934,
          "user_name": "sana drs individual",
          "m_location": "overseas",
          "user_id": "b22a0920-6880-48d9-ae34-b98ef1a8be66",
          "imei_per_device": 1
        }
      ]
      let mergedAndSortedLatest = [
        {
          "id": 4483,
          "report_status_label": "Processed",
          "file": "deviceRegistration.txt",
          "invalid_imeis_file": null,
          "tracking_id": "94c93981-6ee8-4811-9242-4ba5cc583c87",
          "reason": "Export the Devices from Pakistan.",
          "reviewer_id": null,
          "updated_at": "2019-02-20T04:41:50.603240+00:00",
          "report_allowed": false,
          "created_at": "2019-02-20T01:07:35.463538+00:00",
          "reviewer_name": null,
          "status_label": "Pending Review",
          "processing_status_label": "Processing",
          "device_count": 22,
          "file_link": "/var/www/html/Device-Registration-Subsystem/etc/uploads/94c93981-6ee8-4811-9242-4ba5cc583c87/deviceRegistration.txt",
          "report": "compliant_report15261634-0c35-40d5-9349-40b00629b1bf.tsv",
          "user_id": "3c05fa5c-4106-4cd9-8a74-3552bff9c824",
          "user_name": "auto exporter"
        },
        {
          "id": 4479,
          "report_status_label": "Processed",
          "file": "00 dereg.txt",
          "invalid_imeis_file": null,
          "tracking_id": "4ad897a0-764a-4a59-926b-543a02315f70",
          "reason": "aaaaaaaaaaaaaaa",
          "reviewer_id": null,
          "updated_at": "2019-02-19T14:39:09.653872+00:00",
          "report_allowed": false,
          "created_at": "2019-02-19T14:38:09.989574+00:00",
          "reviewer_name": null,
          "status_label": "Pending Review",
          "processing_status_label": "Processed",
          "device_count": 3,
          "file_link": "/var/www/html/Device-Registration-Subsystem/etc/uploads/4ad897a0-764a-4a59-926b-543a02315f70/00 dereg.txt",
          "report": "compliant_report1dd8b609-9ab7-43e1-948c-18bfd8d66d86.tsv",
          "user_id": "85fd4c61-76d1-4558-b8d7-2e6299e76b64",
          "user_name": "zulfiqar drs exporter"
        },
        {
          "imeis": null,
          "created_at": "2019-02-18T01:05:15.299472+00:00",
          "file": "deviceRegistration.tsv",
          "duplicate_imeis_file": null,
          "tracking_id": "af103994-550d-45ad-945a-9b13ed4f40a8",
          "reviewer_id": null,
          "updated_at": "2019-02-19T01:01:41.374987+00:00",
          "report_allowed": false,
          "report_status_label": "Processed",
          "reviewer_name": null,
          "status_label": "Pending Review",
          "processing_status_label": "Failed",
          "device_count": 11,
          "report": "compliant_report24c4b227-6e5f-4ada-ae3d-c3b0dfb826d9.tsv",
          "file_link": "/var/www/html/Device-Registration-Subsystem/etc/uploads/af103994-550d-45ad-945a-9b13ed4f40a8/deviceRegistration.tsv",
          "id": 44946,
          "user_name": "auto importer",
          "m_location": "local",
          "user_id": "eedbbc2d-6ded-4f34-bbd3-1e40c5c13b8d",
          "imei_per_device": 2
        },
        {
          "imeis": [["2222222222222222"]],
          "created_at": "2019-02-14T13:23:59.871998+00:00",
          "file": null,
          "duplicate_imeis_file": null,
          "tracking_id": "938d4fc6-3d3d-4b39-8813-2654d6000610",
          "reviewer_id": null,
          "updated_at": "2019-02-14T13:28:14.383851+00:00",
          "report_allowed": false,
          "report_status_label": "Processed",
          "reviewer_name": null,
          "status_label": "Pending Review",
          "processing_status_label": "Processed",
          "device_count": 1,
          "report": "compliant_reportca72ffa9-7efe-4e68-bb88-7066d5e929b9.tsv",
          "id": 44934,
          "user_name": "sana drs individual",
          "m_location": "overseas",
          "user_id": "b22a0920-6880-48d9-ae34-b98ef1a8be66",
          "imei_per_device": 1
        }
      ]
      let clickedRequest = {
        "id": 4483,
        "report_status_label": "Processed",
        "file": "deviceRegistration.txt",
        "invalid_imeis_file": null,
        "tracking_id": "94c93981-6ee8-4811-9242-4ba5cc583c87",
        "reason": "Export the Devices from Pakistan.",
        "reviewer_id": null,
        "updated_at": "2019-02-20T04:41:50.603240+00:00",
        "report_allowed": false,
        "created_at": "2019-02-20T01:07:35.463538+00:00",
        "reviewer_name": null,
        "status_label": "Pending Review",
        "processing_status_label": "Processing",
        "device_count": 22,
        "file_link": "/var/www/html/Device-Registration-Subsystem/etc/uploads/94c93981-6ee8-4811-9242-4ba5cc583c87/deviceRegistration.txt",
        "report": "compliant_report15261634-0c35-40d5-9349-40b00629b1bf.tsv",
        "user_id": "3c05fa5c-4106-4cd9-8a74-3552bff9c824",
        "user_name": "auto exporter"
      }
      // let spy = Sinon.spy()
      // const historyMock = { push: spy };
      const historyMock = { push: jest.fn() }
      const wrapper = mount(
        <Router>
          <I18nextProvider i18n={i18n}>
            <Dashboard kc={mockKcProps} resources={kcResource} history={historyMock}/>
          </I18nextProvider>
        </Router>
      )
      const reportResponse = {
        data: {
          "user_type": "reviewer",
          "de-registration": {
            "pending_review_count": pendingDeReviewsRegistration,
            "latest_pending_requests": latestRequestsDeRegistration,
            "in_review_count": inReviewDeRegistration
          },
          "registration": {
            "pending_review_count": pendingReviewsRegistration,
            "latest_pending_requests": latestRequestsRegistration,
            "in_review_count": inReviewRegistration
          }, "user_id": "81e53d7a-4483-407c-b9f7-1ebd9fe05ac6"
        }
      }
      mockAxios.mockResponse(reportResponse)
      wrapper.update()

      //Test
      expect(wrapper.find('Dashboard').state().latestRequests).toEqual(mergedAndSortedLatest)
      expect(wrapper.find('Dashboard').find('table tbody tr').length).toEqual(4)

      //Click on row
      wrapper.find('Dashboard').find('table tbody tr').at(0).simulate('click')
      expect(historyMock.push.mock.calls[0]).toEqual([
        {
          "pathname": "/search-requests",
          "state": {
            data: clickedRequest,
            filter: "single request"
          }
        }])
    })
    test('if Intructions Model renders when triggers',()=>{
      const wrapper = mount(
        <Router>
          <I18nextProvider i18n={i18n}>
            <Dashboard kc={mockKcProps} resources={kcResource} lng="en"/>
          </I18nextProvider>
        </Router>
      )

      //Click instruction icon
      const btn = wrapper.find('Dashboard').find({className:'help help-page'}).find('button')

      btn.simulate('click')
      wrapper.update()

      //Test
      expect(wrapper.find('RenderModal').props().show).toBe(true)

      //Close Modal
      wrapper.find({className:'btn btn-secondary'}).simulate('click')
      wrapper.debug()

      //Test
      expect(wrapper.find('RenderModal').props().show).toBe(false)
    })
  })
  describe('When logged in as Importer',()=>{
    beforeEach(() => {
      // cleaning up the mess left behind the previous test
      mockAxios.reset();
    });
    const kcResource = {
      realm_access: {
        roles: ['drs_importer']
      }
    }
    test('if initial state renders correctly',()=>{
      let mockInReview =13
      let mockPendingReview = 20
      let mockAwaitingDocs = 0
      let mockInformationRequested =18
      let latestRequests = [
        {
          "imeis": [["11111111111111"]],
          "created_at": "2019-02-15T06:00:32.685749+00:00",
          "file": null,
          "duplicate_imeis_file": null,
          "tracking_id": "0aaa9d88-f78a-4271-8db5-bc25ad171eb9",
          "reviewer_id": null,
          "updated_at": "2019-02-15T06:00:32.685749+00:00",
          "report_allowed": false,
          "report_status_label": "New Request",
          "reviewer_name": null,
          "status_label": "New Request",
          "processing_status_label": "New Request",
          "device_count": 1,
          "report": null,
          "id": 44943,
          "user_name": "drs importer user",
          "m_location": "local",
          "user_id": "6ed9747b-d36a-4799-88c8-59d17a9abb5a",
          "imei_per_device": 1
        },
        {
          "imeis": [["1111111111111111"]],
          "created_at": "2019-02-08T06:39:31.415704+00:00",
          "file": null,
          "duplicate_imeis_file": null,
          "tracking_id": "68bb615d-3ecf-4790-a056-6d93fa848fbb",
          "reviewer_id": null,
          "updated_at": "2019-02-08T06:39:31.415704+00:00",
          "report_allowed": false,
          "report_status_label": "New Request",
          "reviewer_name": null,
          "status_label": "New Request",
          "processing_status_label": "New Request",
          "device_count": 1,
          "report": null,
          "id": 44826,
          "user_name": "drs importer user",
          "m_location": "local",
          "user_id": "6ed9747b-d36a-4799-88c8-59d17a9abb5a",
          "imei_per_device": 1
        }]
      const wrapper = mount(
        <Router>
          <I18nextProvider i18n={i18n}>
            <Dashboard kc={mockKcProps} resources={kcResource} lng="es"/>
          </I18nextProvider>
        </Router>
      )
      const reportResponse = {
        data: {
          "user_type": "importer",
          "registration": {
            "new_requests": 22,
            "approved": 7,
            "information_requested": mockInformationRequested,
            "in_review": mockInReview,
            "pending_review": mockPendingReview,
            "latest_request": latestRequests,
            "rejected": 2,
            "awaiting_document": mockAwaitingDocs,
            "total_requests": 84
          },
          "user_id": "6ed9747b-d36a-4799-88c8-59d17a9abb5a"
        }
      }
      mockAxios.mockResponse(reportResponse)
      wrapper.update()

      let state = wrapper.find('Dashboard').state()
      //Tests
      expect(state.userRole).toEqual('importer')
      expect(state.pending).toEqual(mockPendingReview)
      expect(state.inReview).toEqual(mockInReview)
      expect(state.informationRequested).toEqual(mockInformationRequested)
      expect(state.awaitingdocs).toEqual(mockAwaitingDocs)
      expect(state.latestRequests).toEqual(latestRequests)
    })
    test('if initial state renders dom correctly',()=>{
      let mockInReview =13
      let mockPendingReview = 20
      let mockAwaitingDocs = 0
      let mockInformationRequested =18
      let latestRequests = [
        {
          "imeis": [["11111111111111"]],
          "created_at": "2019-02-15T06:00:32.685749+00:00",
          "file": null,
          "duplicate_imeis_file": null,
          "tracking_id": "0aaa9d88-f78a-4271-8db5-bc25ad171eb9",
          "reviewer_id": null,
          "updated_at": "2019-02-15T06:00:32.685749+00:00",
          "report_allowed": false,
          "report_status_label": "New Request",
          "reviewer_name": null,
          "status_label": "New Request",
          "processing_status_label": "New Request",
          "device_count": 1,
          "report": null,
          "id": 44943,
          "user_name": "drs importer user",
          "m_location": "local",
          "user_id": "6ed9747b-d36a-4799-88c8-59d17a9abb5a",
          "imei_per_device": 1
        },
        {
          "imeis": [["1111111111111111"]],
          "created_at": "2019-02-08T06:39:31.415704+00:00",
          "file": null,
          "duplicate_imeis_file": null,
          "tracking_id": "68bb615d-3ecf-4790-a056-6d93fa848fbb",
          "reviewer_id": null,
          "updated_at": "2019-02-08T06:39:31.415704+00:00",
          "report_allowed": false,
          "report_status_label": "New Request",
          "reviewer_name": null,
          "status_label": "New Request",
          "processing_status_label": "New Request",
          "device_count": 1,
          "report": null,
          "id": 44826,
          "user_name": "drs importer user",
          "m_location": "local",
          "user_id": "6ed9747b-d36a-4799-88c8-59d17a9abb5a",
          "imei_per_device": 1
        }]
      const wrapper = mount(
        <Router>
          <I18nextProvider i18n={i18n}>
            <Dashboard kc={mockKcProps} resources={kcResource}/>
          </I18nextProvider>
        </Router>
      )
      const reportResponse = {
        data: {
          "user_type": "importer",
          "registration": {
            "new_requests": 22,
            "approved": 7,
            "information_requested": mockInformationRequested,
            "in_review": mockInReview,
            "pending_review": mockPendingReview,
            "latest_request": latestRequests,
            "rejected": 2,
            "awaiting_document": mockAwaitingDocs,
            "total_requests": 84
          },
          "user_id": "6ed9747b-d36a-4799-88c8-59d17a9abb5a"
        }
      }
      mockAxios.mockResponse(reportResponse)
      wrapper.update()

      //Tests
      //Get pending review requests from DOM
      let pendingReviewText = wrapper.find('Dashboard').find({className:'col-sm-6 col-xl-3'}).at(0).find('h3').text()
      expect(pendingReviewText).toEqual('20 Requests')

      //Get Awaiting documents requests from DOM
      let awaitingDocs = wrapper.find('Dashboard').find({className:'col-sm-6 col-xl-3'}).at(1).find('h3').text()
      expect(awaitingDocs).toEqual('0 Requests')

      //Get In review requests from DOM
      let inReviewText = wrapper.find('Dashboard').find({className:'col-sm-6 col-xl-3'}).at(2).find('h3').text()
      expect(inReviewText).toEqual('13 Requests')

      //Get In review de-registration from DOM
      let informationRequestedReq = wrapper.find('Dashboard').find({className:'col-sm-6 col-xl-3'}).at(3).find('h3').text()
      expect(informationRequestedReq).toEqual('18 Requests')
    })
  })
  describe('When logged in as Exporter',()=>{
    beforeEach(() => {
      // cleaning up the mess left behind the previous test
      mockAxios.reset();
    });
    const kcResource = {
      realm_access: {
        roles: ['drs_exporter']
      }
    }
    test('if initial state renders correctly',()=>{
      let mockInReview =10
      let mockPendingReview = 15
      let mockAwaitingDocs = 13
      let mockInformationRequested =25
      let latestRequests = [
        {
          "imeis": [["11111111111111"]],
          "created_at": "2019-02-15T06:00:32.685749+00:00",
          "file": null,
          "duplicate_imeis_file": null,
          "tracking_id": "0aaa9d88-f78a-4271-8db5-bc25ad171eb9",
          "reviewer_id": null,
          "updated_at": "2019-02-15T06:00:32.685749+00:00",
          "report_allowed": false,
          "report_status_label": "New Request",
          "reviewer_name": null,
          "status_label": "New Request",
          "processing_status_label": "New Request",
          "device_count": 1,
          "report": null,
          "id": 44943,
          "user_name": "drs exporter user",
          "m_location": "local",
          "user_id": "6ed9747b-d36a-4799-88c8-59d17a9abb5a",
          "imei_per_device": 1
        },
        {
          "imeis": [["1111111111111111"]],
          "created_at": "2019-02-08T06:39:31.415704+00:00",
          "file": null,
          "duplicate_imeis_file": null,
          "tracking_id": "68bb615d-3ecf-4790-a056-6d93fa848fbb",
          "reviewer_id": null,
          "updated_at": "2019-02-08T06:39:31.415704+00:00",
          "report_allowed": false,
          "report_status_label": "New Request",
          "reviewer_name": null,
          "status_label": "New Request",
          "processing_status_label": "New Request",
          "device_count": 1,
          "report": null,
          "id": 44826,
          "user_name": "drs exporter user",
          "m_location": "local",
          "user_id": "6ed9747b-d36a-4799-88c8-59d17a9abb5a",
          "imei_per_device": 1
        }]
      const wrapper = mount(
        <Router>
          <I18nextProvider i18n={i18n}>
            <Dashboard kc={mockKcProps} resources={kcResource}/>
          </I18nextProvider>
        </Router>
      )
      const reportResponse = {
        data: {
          "user_type": "exporter",
          "de-registration": {
            "new_requests": 22,
            "approved": 7,
            "information_requested": mockInformationRequested,
            "in_review": mockInReview,
            "pending_review": mockPendingReview,
            "latest_request": latestRequests,
            "rejected": 2,
            "awaiting_document": mockAwaitingDocs,
            "total_requests": 84
          },
          "user_id": "6ed9747b-d36a-4799-88c8-59d17a9abb5a"
        },

      }
      mockAxios.mockResponse(reportResponse)
      wrapper.update()

      let state = wrapper.find('Dashboard').state()
      //Tests
      expect(state.userRole).toEqual('exporter')
      expect(state.pending).toEqual(mockPendingReview)
      expect(state.inReview).toEqual(mockInReview)
      expect(state.informationRequested).toEqual(mockInformationRequested)
      expect(state.awaitingdocs).toEqual(mockAwaitingDocs)
      expect(state.latestRequests).toEqual(latestRequests)
    })
  })
});
