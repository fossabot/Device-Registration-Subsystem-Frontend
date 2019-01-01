/*
Copyright (c) 2018 Qualcomm Technologies, Inc.
All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted (subject to the limitations in the disclaimer below) provided that the following conditions are met:

* Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
* Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
* Neither the name of Qualcomm Technologies, Inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.
NO EXPRESS OR IMPLIED LICENSES TO ANY PARTY'S PATENT RIGHTS ARE GRANTED BY THIS LICENSE. THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
    .use(LanguageDetector)
    .init({
        // we init with resources
        resources: {
            en: {
                translations: {
                    "welcomeApp": "Welcome to ProjectName",
                    "homeLink"  : "Home",
                    "dashboardLink": "Dashboard",
                    "newRequestLink": "Device Registration",
                    "updateRegistration": "Update Registration",
                    "searchRequestLink": "Search Request",
                    "deRegistrationLink": "De-Registration",
                    "updateDeregistration": "Update De-registration",
                    "viewReviewLink": "View Review",
                    "viewRequestLink": "View Request",
                    "reviewRequestLink": "Review Request",
                    "requestStatusLink": "Request Status",
                    "commentBox.header": "Remarks",

                    //Review Registration
                    "requestId": "Request ID",
                    "registration": "Registration",
                    "deregistration": "De-Registration",
                    "requestType": "Request type",
                    "assignRequest": "Assign to me",
                    "unAssignRequest": "Unassign request",
                    "deviceQuota.header": "Device Quota",
                    "deviceQuota.allowed": "Allowed device quota",
                    "deviceQuota.used": "Used device quota",
                    "deviceQuota.request": "Request device count",
                    "reviewStatus": "Review status",
                    "reviewStatus.approve": "Approve",
                    "reviewStatus.requested": "Information requested",
                    "reviewStatus.rejected": "Rejected",
                    "reviewFeedback": "Review feedback",
                    "reviewFeedback.placeholder": "Approve the section",
                    "reviewFeedback.inprocess": "The Request is in the process",
                    //Review Registration Steps
                    "reviewRegistration.step1":"Device Quota",
                    "reviewRegistration.step2":"Device Description",
                    "reviewRegistration.step3":"IMEI Classification Results",
                    "reviewRegistration.step4":"IMEI Registration Status",
                    "reviewRegistration.step5":"Approval Documents",

                    //Review Steps
                    "allowedQuota": "Allowed Device Quota",
                    "remainQuota": "Remaining Device quota",
                    "usedQuota": "Used Device Quota",
                    "requestQuota": "Request Device Count",
                    "remainingQuota": "Remaining Device Count",
                    "duplicatedIMEIs": "Duplicated IMEIs",
                    "invalidIMEIs": "Invalid IMEIs",
                    "brand":"Brand",
                    "model":"Model name",
                    "modelnumber":"Model number",
                    "deviceType":"Device type",
                    "operatingSystem":"Operating system",
                    "technologies":"Technologies",
                    "rat":"Radio access Technology",
                    "downloadReport":"Download Report",
                    "userRequested":"User Requested Device Description",
                    "tacDescription":"GSMA TAC Device Description",
                    "complianceStatus":"IMEI compliance status",
                    "complianceStatus.nonCompliant":"Non-compliant",
                    "complianceStatus.compliant":"Compliant",
                    "complianceStatus.provisional":"Provisional non-complaint",
                    "complianceStatus.nonProvisional":"Provisional complaint",
                    "perConditionClassificationState":"Per-condition classification state",
                    "pendingRegistration":"Pending registration",
                    "lostStolen":"Lost / Stolen status",
                    "lostStolen.stolen":"Stolen status",
                    "provisionalStolen":"Provisional stolen",
                    "seenOnNetwork":"Seen on network",
                    "registered":"Registered",
                    "notRegistered":"Not registered",
                    "documentType":"Document type",
                    "linkToDoc":"Link to view document",
                    "currentStatus":"Current Status",

                    //Request Steps
                    "deviceModelDescription":"Device model description",
                    "basicDetails":"Basic registration details",
                    "BasicDetailsDeRegistration":"Basic De-registration details",
                    "deviceCount":"Device Count",
                    "IMEIsPerDevice":"No. of IMEIs per device",
                    "manufacturingLocation":"Manufacturing Location",
                    "reason":"Reason",
                    "approvalDocuments":"Approval Documents",
                    "request.inprocess": "No information provided",
                    "download.file":"Click here to view this file",
                    "download.document":"Click here to view this document",
                    //Common
                    "assignee": "Assignee",
                    "status": "Status",
                    "file":"File",
                    "next": "Next",
                    "finish": "Finish",
                    "previous": "Previous",
                    "totalImeis": "Total IMEIs"
                }
            },
            es: {
                translations: {
                  "welcomeApp": "Welcome to ProjectName",
                  "homeLink"  : "Home",
                  "dashboardLink": "Dashboard",
                  "newRequestLink": "Device Registration",
                  "updateRegistration": "Update Registration",
                  "searchRequestLink": "Search Request",
                  "deRegistrationLink": "De-Registration",
                  "updateDeregistration": "Update De-registration",
                  "viewReviewLink": "View Review",
                  "viewRequestLink": "View Request",
                  "reviewRequestLink": "Review Request",
                  "requestStatusLink": "Request Status",
                  "commentBox.header": "Remarks",

                  //Review Registration
                  "requestId": "Request ID",
                  "registration": "Registration",
                  "deregistration": "De-Registration",
                  "requestType": "Request type",
                  "assignRequest": "Assign to me",
                  "unAssignRequest": "Unassign request",
                  "deviceQuota.header": "Device Quota",
                  "deviceQuota.allowed": "Allowed device quota",
                  "deviceQuota.used": "Used device quota",
                  "deviceQuota.request": "Request device count",
                  "reviewStatus": "Review status",
                  "reviewStatus.approve": "Approve",
                  "reviewStatus.requested": "Information requested",
                  "reviewStatus.rejected": "Rejected",
                  "reviewFeedback": "Review feedback",
                  "reviewFeedback.placeholder": "Approve the section",
                  "reviewFeedback.inprocess": "The Request is in the process",
                  //Review Registration Steps
                  "reviewRegistration.step1":"Device Quota",
                  "reviewRegistration.step2":"Device Description",
                  "reviewRegistration.step3":"IMEI Classification Results",
                  "reviewRegistration.step4":"IMEI Registration Status",
                  "reviewRegistration.step5":"Approval Documents",

                  //Review Steps
                  "allowedQuota": "Allowed Device Quota",
                  "usedQuota": "Used Device Quota",
                  "requestQuota": "Request Device Count",
                  "remainingQuota": "Remaining Device Count",
                  "duplicatedIMEIs": "Duplicated IMEIs",
                  "invalidIMEIs": "Invalid IMEIs",
                  "brand":"Brand",
                  "model":"Model name",
                  "modelnumber":"Model number",
                  "deviceType":"Device type",
                  "operatingSystem":"Operating system",
                  "technologies":"Technologies",
                  "rat":"Radio access Technology",
                  "downloadReport":"Download Report",
                  "userRequested":"User Requested Device Description",
                  "tacDescription":"GSMA TAC Device Description",
                  "complianceStatus":"IMEI compliance status",
                  "complianceStatus.nonCompliant":"Non-compliant",
                  "complianceStatus.compliant":"Compliant",
                  "complianceStatus.provisional":"Provisional non-complaint",
                  "complianceStatus.nonProvisional":"Provisional complaint",
                  "perConditionClassificationState":"Per-condition classification state",
                  "pendingRegistration":"Pending registration",
                  "lostStolen":"Lost / Stolen status",
                  "lostStolen.stolen":"Stolen status",
                  "provisionalStolen":"Provisional stolen",
                  "seenOnNetwork":"Seen on network",
                  "registered":"Registered",
                  "notRegistered":"Not registered",
                  "documentType":"Document type",
                  "linkToDoc":"Link to view document",

                  //Request Steps
                  "deviceModelDescription":"Device model description",
                  "basicDetails":"Basic registration details",
                  "BasicDetailsDeRegistration":"Basic De-registration details",
                  "deviceCount":"Device Count",
                  "IMEIsPerDevice":"No. of IMEIs per device",
                  "manufacturingLocation":"Manufacturing Location",
                  "reason":"Reason",
                  "approvalDocuments":"Approval Documents",
                  "request.inprocess": "No information provided",
                  //Common
                  "assignee": "Assignee",
                  "status": "Status",
                  "file":"File",
                  "next": "Next",
                  "finish": "Finish",
                  "previous": "Previous",
                  "totalImeis": "Total IMEIs",
                }
            },
            id: {
                translations: {
                  "welcomeApp": "Welcome to ProjectName",
                  "homeLink"  : "Home",
                  "dashboardLink": "Dashboard",
                  "newRequestLink": "Device Registration",
                  "updateRegistration": "Update Registration",
                  "searchRequestLink": "Search Request",
                  "deRegistrationLink": "De-Registration",
                  "updateDeregistration": "Update De-registration",
                  "viewReviewLink": "View Review",
                  "viewRequestLink": "View Request",
                  "reviewRequestLink": "Review Request",
                  "requestStatusLink": "Request Status",
                  "commentBox.header": "Remarks",

                  //Review Registration
                  "requestId": "Request ID",
                  "registration": "Registration",
                  "deregistration": "De-Registration",
                  "requestType": "Request type",
                  "assignRequest": "Assign to me",
                  "unAssignRequest": "Unassign request",
                  "deviceQuota.header": "Device Quota",
                  "deviceQuota.allowed": "Allowed device quota",
                  "deviceQuota.used": "Used device quota",
                  "deviceQuota.request": "Request device count",
                  "reviewStatus": "Review status",
                  "reviewStatus.approve": "Approve",
                  "reviewStatus.requested": "Information requested",
                  "reviewStatus.rejected": "Rejected",
                  "reviewFeedback": "Review feedback",
                  "reviewFeedback.placeholder": "Approve the section",
                  "reviewFeedback.inprocess": "The Request is in the process",
                  //Review Registration Steps
                  "reviewRegistration.step1":"Device Quota",
                  "reviewRegistration.step2":"Device Description",
                  "reviewRegistration.step3":"IMEI Classification Results",
                  "reviewRegistration.step4":"IMEI Registration Status",
                  "reviewRegistration.step5":"Approval Documents",

                  //Review Steps
                  "allowedQuota": "Allowed Device Quota",
                  "usedQuota": "Used Device Quota",
                  "requestQuota": "Request Device Count",
                  "remainingQuota": "Remaining Device Count",
                  "duplicatedIMEIs": "Duplicated IMEIs",
                  "invalidIMEIs": "Invalid IMEIs",
                  "brand":"Brand",
                  "model":"Model name",
                  "modelnumber":"Model number",
                  "deviceType":"Device type",
                  "operatingSystem":"Operating system",
                  "technologies":"Technologies",
                  "rat":"Radio access Technology",
                  "downloadReport":"Download Report",
                  "userRequested":"User Requested Device Description",
                  "tacDescription":"GSMA TAC Device Description",
                  "complianceStatus":"IMEI compliance status",
                  "complianceStatus.nonCompliant":"Non-compliant",
                  "complianceStatus.compliant":"Compliant",
                  "complianceStatus.provisional":"Provisional non-complaint",
                  "complianceStatus.nonProvisional":"Provisional complaint",
                  "perConditionClassificationState":"Per-condition classification state",
                  "pendingRegistration":"Pending registration",
                  "lostStolen":"Lost / Stolen status",
                  "lostStolen.stolen":"Stolen status",
                  "provisionalStolen":"Provisional stolen",
                  "seenOnNetwork":"Seen on network",
                  "registered":"Registered",
                  "notRegistered":"Not registered",
                  "documentType":"Document type",
                  "linkToDoc":"Link to view document",

                  //Request Steps
                  "deviceModelDescription":"Device model description",
                  "basicDetails":"Basic registration details",
                  "BasicDetailsDeRegistration":"Basic De-registration details",
                  "deviceCount":"Device Count",
                  "IMEIsPerDevice":"No. of IMEIs per device",
                  "manufacturingLocation":"Manufacturing Location",
                  "reason":"Reason",
                  "approvalDocuments":"Approval Documents",
                  "request.inprocess": "No information provided",
                  //Common
                  "assignee": "Assignee",
                  "status": "Status",
                  "file":"File",
                  "next": "Next",
                  "finish": "Finish",
                  "previous": "Previous",
                  "totalImeis": "Total IMEIs"
                }
            }
        },
        fallbackLng: 'en',
        debug: false,

        // have a common namespace used around the full app
        ns: ['translations'],
        defaultNS: 'translations',

        keySeparator: false, // we use content as keys

        interpolation: {
            escapeValue: false, // not needed for react!!
            formatSeparator: ','
        },

        react: {
            wait: true
        }
    });

export default i18n;