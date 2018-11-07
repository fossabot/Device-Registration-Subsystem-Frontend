/*
Copyright (c) 2018 Qualcomm Technologies, Inc.
All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted (subject to the limitations in the disclaimer below) provided that the following conditions are met:

* Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
* Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
* Neither the name of Qualcomm Technologies, Inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.
NO EXPRESS OR IMPLIED LICENSES TO ANY PARTY'S PATENT RIGHTS ARE GRANTED BY THIS LICENSE. THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

import React, { Component } from 'react';
import { translate, I18n } from 'react-i18next';
import {Card, CardHeader, CardBody} from 'reactstrap';
import {getUserRole} from "../../utilities/helpers";
import {AUTHORITY, EXPORTER, BULK_IMPORTER, INDIVIDUAL_IMPORTER} from "../../utilities/constants";

class Dashboard extends Component {

  render() {
    return (
      <I18n ns="translations">
        {
          (t, { i18n }) => (
            <div className="animated fadeIn">
              <Card>
                <CardHeader>
                  <b> Instructions</b>
                </CardHeader>
                <CardBody>
                  {(getUserRole(this.props.resources) === INDIVIDUAL_IMPORTER  || getUserRole(this.props.resources) === BULK_IMPORTER) &&
                    <ul className="instructions">
                        <li>Each Request should only be for single device brand/model.</li>
                        <li>Each Request should not have more than 1 million devices.</li>
                        <li>In case of Limited (1-10) devices, device count must be equal to entered devices using Webpage input.</li>
                        <li>In case of Bulk (>10) devices, device count must be equal to tab-delimited file using file input.</li>
                        <li>Requester should have all the information related to the device(s) to be registered i.e. IMEIs, Brand, Model Name, Model Number, Device Type, Operating System and Radio Access Technology (2G, 3G, 4G, 5G).</li>
                        <li>Requester should have all required approval documents for attachment such as:
                            <ul>
                                <li><div>Shipment document</div></li>
                                <li><div>Authorization document</div></li>
                                <li><div>Certificate document</div></li>
                            </ul>
                        </li>
                        <li>Size of each approval document should be less than 26MB (the lighter the better).</li>
                        <li>Approval Documents are accepted as attachment in the following formats only
                            <ul>
                                <li><div>.png</div></li>
                                <li><div>.jpg</div></li>
                                <li><div>.pdf</div></li>
                                <li><div>.bmp</div></li>
                                <li><div>.gif</div></li>
                            </ul>
                        </li>
                    </ul>
                  }
                  {(getUserRole(this.props.resources) === EXPORTER) &&
                    <ul className="instructions">
                        <li>Only registered device(s) can be de-register.</li>
                        <li>For device De-Registration the .txt file format is the only accepted file format.</li>
                        <li>Each De-registration Request should not have more than 1 million devices.</li>
                        <li>Requester should have all required approval documents for attachment such as:
                            <ul>
                                <li><div>Shipment document</div></li>
                                <li><div>Authorization document</div></li>
                                <li><div>Certificate document</div></li>
                            </ul>
                        </li>
                        <li>Size of each approval document should be less than 26MB (the lighter the better).</li>
                        <li>Approval Documents are accepted as attachment in the following formats only
                            <ul>
                                <li><div>.png</div></li>
                                <li><div>.jpg</div></li>
                                <li><div>.pdf</div></li>
                                <li><div>.bmp</div></li>
                                <li><div>.gif</div></li>
                            </ul>
                        </li>
                    </ul>
                  }
                  {(getUserRole(this.props.resources) === AUTHORITY) &&
                    <ul className="instructions">
                        <li>Approval documents for registration/de-registration request are:
                            <ul>
                                <li><div>Shipment document</div></li>
                                <li><div>Authorization document</div></li>
                                <li><div>Certificate document</div></li>
                            </ul>
                        </li>
                        <li>Approval documents for registration/de-registration request can be accepted in following formats:
                            <ul>
                                <li><div>.png</div></li>
                                <li><div>.jpg</div></li>
                                <li><div>.pdf</div></li>
                                <li><div>.bmp</div></li>
                                <li><div>.gif</div></li>
                            </ul>
                        </li>
                        <li>If any step of the request is selected as Rejected the whole request would be consider as rejected request.</li>
                        <li>If any step of the request is selected as information requested the whole request would be considered as information requested.</li>
                    </ul>
                  }
                </CardBody>
              </Card>
            </div>
          )
        }
      </I18n>
    )
  }
}

export default translate('translations')(Dashboard);
