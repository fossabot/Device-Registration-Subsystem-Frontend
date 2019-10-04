/*
Copyright (c) 2018-2019 Qualcomm Technologies, Inc.
All rights reserved.
Redistribution and use in source and binary forms, with or without modification, are permitted (subject to the limitations in the 
disclaimer below) provided that the following conditions are met:
    * Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
    * Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer 
      in the documentation and/or other materials provided with the distribution.
    * Neither the name of Qualcomm Technologies, Inc. nor the names of its contributors may be used to endorse or promote 
      products derived from this software without specific prior written permission.
    * The origin of this software must not be misrepresented; you must not claim that you wrote the original software. If you use 
      this software in a product, an acknowledgment is required by displaying the trademark/log as per the details provided 
      here: https://www.qualcomm.com/documents/dirbs-logo-and-brand-guidelines
    * Altered source versions must be plainly marked as such, and must not be misrepresented as being the original software.
    * This notice may not be removed or altered from any source distribution.
NO EXPRESS OR IMPLIED LICENSES TO ANY PARTY'S PATENT RIGHTS ARE GRANTED BY THIS LICENSE. THIS SOFTWARE IS PROVIDED 
BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT 
LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO 
EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, 
EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; 
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN 
CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS 
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

import React from "react";
import {Card, CardBody, CardHeader} from "reactstrap";
import {isEmpty, isNil} from "ramda";
import StepLoading from "../../../../components/Loaders/StepLoading";
import i18n from '../../../../i18n';

const DeviceQuota = ({
                       step1Data,
                       stepReady,
                     }) => {
  return (
    <Card>
      <CardHeader><b>{i18n.t('reviewRegistration.step1')}</b></CardHeader>
      <CardBody className='steps-loading'>
        {(((!isNil(step1Data) && !isEmpty(step1Data)) && stepReady) &&
        <table className="table table-bordered mb-0">
          <tbody>
          <tr>
            <th>{i18n.t('allowedQuota')}</th>
            <td>{!isNil(step1Data.allowed_import_quota) && (step1Data.allowed_import_quota.toLocaleString() || 0)}</td>
          </tr>
          <tr>
            <th>{i18n.t('usedQuota')}</th>
            <td>{!isNil(step1Data.used_registration_quota) && (step1Data.used_registration_quota.toLocaleString() || 0)}</td>
          </tr>
          <tr>
            <th>{i18n.t('requestQuota')}</th>
            <td>{!isNil(step1Data.request_device_count) && (step1Data.request_device_count.toLocaleString() || 0)}</td>
          </tr>
          <tr>
            <th>{i18n.t('remainQuota')}</th>
            <td>{((!isNil(step1Data.allowed_import_quota) && !isNil(step1Data.used_registration_quota)) && (step1Data.allowed_import_quota - step1Data.used_registration_quota).toLocaleString()) || 0}</td>
          </tr>
          </tbody>
        </table>) || <StepLoading/>
        }
      </CardBody>
    </Card>
  )
};
export default DeviceQuota;