/*
Copyright (c) 2018 Qualcomm Technologies, Inc.
All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted (subject to the limitations in the disclaimer below) provided that the following conditions are met:

* Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
* Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
* Neither the name of Qualcomm Technologies, Inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.
NO EXPRESS OR IMPLIED LICENSES TO ANY PARTY'S PATENT RIGHTS ARE GRANTED BY THIS LICENSE. THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

// Settings for API and Keycloak
import settings from './../settings';
const {host: apiHost, port: apiPort, version: apiVersion, use: apiUse} = settings.api;
const {host: apimanHost, port: apimanPort, clientId: apimanClientId, use: apimanUse} = settings.apiman;
const {appName} = settings.appDetails;

export let BASE_URL = '';

if(apiUse) {
 BASE_URL = `${apiHost}${apiPort ? ':'+ apiPort: ''}${apiVersion}`;
} else if(apimanUse) {
 BASE_URL = `${apimanHost}${apimanPort ? ':'+ apimanPort: ''}${apimanClientId}`;
}

export const APP_NAME = appName;

export const MANUFACTURE_LOCATIONS = [{'label': 'Local', 'value': 'local'}, {'label': 'Overseas', 'value': 'overseas'}];
export const DEVICE_TYPES = [];
export const TECHNOLOGIES = []
export const DOCUMENTS = []
export const DE_DOCUMENTS = []
export const EXTENSIONS = ['pdf', 'jpg', 'png', 'gif', 'bmp', 'tiff', 'svg'];
export const STATUS_TYPES = []

export const REVIEW_STEPS = {
 registration: [
  'reviewRegistration.step1',
  'reviewRegistration.step2',
  'reviewRegistration.step3',
  'reviewRegistration.step4',
  'reviewRegistration.step5'],
 de_registration: [
  'reviewRegistration.step2',
  'reviewRegistration.step3',
  'reviewRegistration.step4',
  'reviewRegistration.step5'
 ]
}
export const REQUEST_STEPS = {
 registration: [
  'requestSteps.registration.basic',
  'requestSteps.registration.deviceModel',
  'reviewRegistration.step5'
 ],
 de_registration: [
  'requestSteps.de-registration.basic',
  'reviewRegistration.step5'
 ]
}

export const Date_Format = 'YYYY-MM-DD';
export const PAGE_LIMIT = 10;

export const AUTHORITY = 'authority';
export const BULK_IMPORTER = 'importer';
export const INDIVIDUAL_IMPORTER = 'individual';
export const EXPORTER = 'exporter';

export const ITEMS_PER_PAGE= [
 { value: 10, label: '10' },
 { value: 20, label: '20' },
 { value: 30, label: '30' },
 { value: 50, label: '50' },
 { value: 100, label: '100' }
]
