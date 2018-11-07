/*Copyright (c) 2018 Qualcomm Technologies, Inc.
  All rights reserved.

  Redistribution and use in source and binary forms, with or without modification, are permitted (subject to the limitations in the disclaimer below) provided that the following conditions are met:

  * Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
* Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
* Neither the name of Qualcomm Technologies, Inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.
  NO EXPRESS OR IMPLIED LICENSES TO ANY PARTY'S PATENT RIGHTS ARE GRANTED BY THIS LICENSE. THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

import React from "react";
import {Card, CardBody, CardHeader} from "reactstrap";
import {isEmpty, isNil} from "ramda";
import StepLoading from "../../../components/Loaders/StepLoading";
import i18n from './../../../i18n';

const ImeiRegistration = ({
                            step4Data,
                            stepReady,
                            viewType
                          }) => {
  return (
    <Card>
      <CardHeader>
        <b>{i18n.t('reviewRegistration.step4')}</b>
      </CardHeader>
      <CardBody className='steps-loading'>
        {(((!isNil(step4Data) && !isEmpty(step4Data)) && stepReady) &&
        <table className="table table-bordered mb-0">
          <tbody>
          {viewType === 'registration' &&
          <tr>
            <th>{i18n.t('duplicatedIMEIs')}</th>
            <td>{(!isNil(step4Data.duplicated) && step4Data.duplicated.toLocaleString()) || 0}</td>
          </tr>
          }
          {viewType === 'deregistration' &&
          <tr>
            <th>{i18n.t('invalidIMEIs')}</th>
            <td>{(!isNil(step4Data.invalid) && step4Data.invalid.toLocaleString()) || 0}</td>
          </tr>
          }
          <tr>
            <th>{i18n.t('pendingRegistration')}</th>
            <td>{(!isNil(step4Data.pending_registration) && step4Data.pending_registration.toLocaleString()) || 0}</td>
          </tr>
          <tr>
            <th>{i18n.t('registered')}</th>
            <td>{(!isNil(step4Data.registered) && step4Data.registered.toLocaleString()) || 0}</td>
          </tr>
          <tr>
            <th>{i18n.t('notRegistered')}</th>
            <td>{(!isNil(step4Data.not_registered) && step4Data.not_registered.toLocaleString()) || 0}</td>
          </tr>
          </tbody>
        </table>) ||
        <StepLoading/>
        }
      </CardBody>
    </Card>
  )
};
export default ImeiRegistration;