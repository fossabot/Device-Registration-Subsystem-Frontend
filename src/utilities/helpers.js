/*
Copyright (c) 2018 Qualcomm Technologies, Inc.
All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted (subject to the limitations in the disclaimer below) provided that the following conditions are met:

* Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
* Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
* Neither the name of Qualcomm Technologies, Inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.
NO EXPRESS OR IMPLIED LICENSES TO ANY PARTY'S PATENT RIGHTS ARE GRANTED BY THIS LICENSE. THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

import axios from 'axios';
import {toast} from 'react-toastify';
import Base64 from 'base-64';
import {BASE_URL, APP_NAME} from './constants';
import FileSaver from "file-saver";
import {lastIndexOf, take} from 'ramda'

export const instance = axios.create({ // API Gateway
  baseURL: BASE_URL, // Dev API
});

export function getExtension(param) {
  if (!param) {
    return null
  } else {
    return param.slice((Math.max(0, param.lastIndexOf(".")) || Infinity) + 1)
  }
}

export function removeExtension(name) {
  // let lastDotPosition = name.lastIndexOf(".");
  let lastDotPosition = lastIndexOf('.', name)
  if (lastDotPosition === -1) return name;
  else return take(lastDotPosition, name);
}

export function capitalize(text) {
  if (!text)
    return null;
  return text.charAt(0).toUpperCase() + text.slice(1);
}

export function getReviewStatus(status) {
  switch (status) {
    case 5:
      return 'Information requested';

    case 6:
      return 'Approved';

    case 7:
      return 'Rejected';

    default:
      return '';
  }
}

export function downloadSampleFile(kcProps,type, e) {
  e.preventDefault()
  let config = null;
  if (kcProps.kc.isTokenExpired(0)) {
    kcProps.kc.updateToken(0)
      .success(() => {
        localStorage.setItem('token', kcProps.kc.token)
        config = {
          headers: getAuthHeader(kcProps.kc.token)
        }
        instance.get(`/sample/${type}`, config)
          .then(response => {
            if (response.status === 200) {
              try {
                let file = new File([response.data], `sample.${type === 'deregistration' ? 'txt' : 'tsv'}`);
                FileSaver.saveAs(file);
              } catch (err) {
                let file = new Blob([response.data]);
                window.navigator.msSaveBlob(file, `sample.${type === 'deregistration' ? 'txt' : 'tsv'}`);
              }
            }
          })
          .catch(error => {
            errors(this, error);
          })
      })
      .error(() => kcProps.kc.logout());
  } else {
    config = {
      headers: getAuthHeader()
    }
    instance.get(`/sample/${type}`, config)
      .then(response => {
        if (response.status === 200) {
          try {
            let file = new File([response.data], `sample.${type === 'deregistration' ? 'txt' : 'tsv'}`);
            FileSaver.saveAs(file);
          } catch (err) {
            let file = new Blob([response.data]);
            window.navigator.msSaveBlob(file, `sample.${type === 'deregistration' ? 'txt' : 'tsv'}`);
          }
        }
      })
      .catch(error => {
        errors(this, error);
      })
  }
}

export function downloadReport(config, id, viewType) {
  const type = viewType
  instance.get(`/${type}/report/${id}`, config)
    .then(response => {
      if (response.status === 200) {
        try {
          let file = new File([response.data], `Report.tsv`);
          FileSaver.saveAs(file);
        } catch (err) {
          let textFileAsBlob = new Blob([response.data]);
          window.navigator.msSaveBlob(textFileAsBlob, 'Report.tsv');
        }
      }
    })
    .catch(error => {
      errors(this, error);
    })
}

export function downloadDocument(kcProps,link, fileType, fileName, event) {
  event.preventDefault()
  let accessToken = '';
  if (kcProps.kc.isTokenExpired(0)) {
    kcProps.kc.updateToken(0)
      .success(() => {
        localStorage.setItem('token', kcProps.kc.token)
        accessToken = kcProps.kc.token
        axios({
          url: `${BASE_URL}files/download?path=${link}`,
          method: 'GET',
          responseType: 'blob', // important
          headers: {
            'Authorization': 'Bearer ' + accessToken
          }
        }).then((response) => {
          if (response.status === 200) {
            try {
              let file = new Blob([response.data]);
              FileSaver.saveAs(file, `${fileName === '' ? 'download' : fileName}.${fileType}`);
            } catch (err) {
              let textFileAsBlob = new Blob([response.data]);
              window.navigator.msSaveBlob(textFileAsBlob, `${fileName === '' ? 'download' : fileName}.${fileType}`);
            }
          }
        })
          .catch((error) => {
            errors(this, error);
          })
      })
      .error(() => kcProps.kc.logout());
  } else {
    accessToken = localStorage.getItem('token')
    axios({
      url: `${BASE_URL}files/download?path=${link}`,
      method: 'GET',
      responseType: 'blob', // important
      headers: {
        'Authorization': 'Bearer ' + accessToken
      }
    }).then((response) => {
      if (response.status === 200) {
        try {
          let file = new Blob([response.data]);
          FileSaver.saveAs(file, `${fileName === '' ? 'download' : fileName}.${fileType}`);
        } catch (err) {
          let textFileAsBlob = new Blob([response.data]);
          window.navigator.msSaveBlob(textFileAsBlob, `${fileName === '' ? 'download' : fileName}.${fileType}`);
        }
      }
    })
      .catch((error) => {
        errors(this, error);
      })
  }
}

export function getStatusClass(status, sType = 'badge') {
  let statusClass = '';
  let styleType = sType
  switch (status) {
    case 'In Review':
      statusClass = `${styleType} ${styleType}-secondary`
      break;

    case 'Pending Review':
      statusClass = `${styleType} ${styleType}-primary`
      break;

    case 'New Request':
    case 'Awaiting Documents':
    case 'In Complete':
      statusClass = `${styleType} ${styleType}-info`
      break;

    case 'Information Requested':
    case 'In Process':
      statusClass = `${styleType} ${styleType}-warning`
      break;

    case 'Approved':
      statusClass = `${styleType} ${styleType}-success`
      break;

    case 'Closed':
    case 'Rejected':
    case 'Failed':
      statusClass = `${styleType} ${styleType}-danger`
      break;

    default:
      statusClass = ''
  }
  return statusClass;
}

export function getAuthHeader (token) {
  let accessToken = localStorage.getItem('token');
  if(token) {
    accessToken = token;
  }
  return {
    'Authorization': 'Bearer ' + accessToken,
    'Content-Type': 'application/json'
  }
}

export function range(start, limit, step) {

  if (arguments.length === 1) {
    limit = start;
    start = 0;
  }

  limit = limit || 0;
  step = step || 1;

  for (var result = []; (limit - start) * step > 0; start += step) {
    result.push(start);
  }
  return result;
}

export function getUserInfo() {
  if(!localStorage.getItem('userInfo')) {
    return {};
  }
  return JSON.parse(Base64.decode(localStorage.getItem('userInfo')))
}

/**
 * this function get currently loggedIn user Role
 *
 * @param resources
 * @returns {string}
 */
export function getUserRole(resources) {
  let role = '';
  let groupDetails = (((resources || {}).realm_access || {}).roles || []);
  if (groupDetails.length > 0) {
    role = groupDetails.find(app => app.split('_')[0] === APP_NAME);
  }
  if (role) {
    role = role.split('_')[1];
  }
  return role;
}

/**
 * this function get all groups of currently loggedIn user
 *
 * @param resources
 * @returns {string}
 */
export function getUserGroups(resources) {
  let groups = '';
  let groupDetails = (((resources || {}).realm_access || {}).roles || []);
  // Remove default group first
  let index = groupDetails.indexOf('uma_authorization');
  if (index !== -1)
    groupDetails.splice(index, 1);
  if (groupDetails.length > 0) {
    groups = groupDetails;
  }
  return groups;
}

/**
 * This functions get users' groups assigned by Keycloak and see if user has access to this application
 *
 * @param groups
 * @returns {boolean}
 */
export function isPage401(groups) {
  let pageStatus = false; // assume it's not page401
  pageStatus = (groups.length > 0) ? false : true; // if groups exist then that's not page401
  if (!pageStatus) { // if groups exist then we apply another check
    pageStatus = groups.find(app => app.split('_')[0] === APP_NAME) ? false : true; // app name is same as role assigned
  }
  return pageStatus;
}


// Generic Errors handling for Axios
export function errors(context, error, noToastr = false) {
  if (typeof error !== 'undefined') {
    if (typeof error.response === 'undefined') {
      //toast.error('API Server is not responding or You are having some network issues');
    } else {
      if (error.response.status === 400) {
        toast.error(error.response.data.message);
        //toast.error(error.response.data.error[0]);
      } else if (error.response.status === 401) {
        toast.error('Your session has been expired, please wait');
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      } else if (error.response.status === 403) {
        toast.error('These credential do not match our records.');
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      } else if (error.response.status === 404) {
        toast.error(error.response.data.message);
      } else if (error.response.status === 405) {
        toast.error('You have used a wrong HTTP verb');
      } else if (error.response.status === 406) {
        toast.error(error.response.data.message);
      } else if (error.response.status === 409) {
        toast.error(error.response.data.message, {autoClose: false, closeOnClick: true});
      } else if (error.response.status === 422 && !noToastr) {
        let errors = error.response.data;
        for (var key in errors) {
          if (typeof errors[key][0] === 'object') {
            for (var k in errors[key][0]) {
              toast.error(k + ' ' + errors[key][0][k], {autoClose: false, closeOnClick: true});
            }
          } else {
            toast.error(errors[key][0], {autoClose: false, closeOnClick: true});
          }
        }
      } else if (error.response.status >= 500) {
        toast.error("API Server is not responding or You are having some network issues", {autoClose: 8000});
      }
    }
  }
}