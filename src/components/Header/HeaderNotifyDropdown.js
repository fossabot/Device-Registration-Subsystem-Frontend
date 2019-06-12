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

import React, {Component} from 'react';
import {
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Dropdown,
  Button
} from 'reactstrap';
import {
  errors,
  getAuthHeader,
  getUserInfo,
  instance,
  getStatusClass,
  getUserRole,
  getUserGroups
} from "../../utilities/helpers";
import moment from 'moment';
import i18n from './../../i18n'
import {AUTHORITY} from "../../utilities/constants";
import {last} from 'ramda'

class HeaderNotifyDropdown extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dropdownOpen: false,
      notifications: [],
      loading: false,
      notificationCount: null
    };
    this.toggle = this.toggle.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.toggleDropdown = this.toggleDropdown.bind(this);
  }

  componentDidMount() {
    this.updateTokenHOC(this.checkNotifications)
  }
  updateTokenHOC = (callingFunc) => {
    let config = null;
    if(this.props.kc.isTokenExpired(0)) {
      this.props.kc.updateToken(0)
        .success(() => {
          localStorage.setItem('token', this.props.kc.token)
          config = {
            headers: getAuthHeader(this.props.kc.token)
          }
          callingFunc(config);
        })
        .error(() => this.props.kc.logout());
    } else {
      config = {
        headers: getAuthHeader()
      }
      callingFunc(config);
    }
  }
  checkNotifications = (config) => {
    const id = getUserInfo().sub
    const userGroup = getUserGroups(this.props.resources)
    if(userGroup!==""){
      instance.get(`/notification?user_id=${id}`, config)
        .then(response => {
          if (response.data.notifications.length > 0) {
            this.setState({
              notificationCount: response.data.notifications.length
            })
          }
        })
        .catch(error => {
          errors(this, error);
        })
    }
  }

  toggle(config) {
    const userGroup = getUserGroups(this.props.resources)
    if(userGroup!==""){
    this.setState({
      loading: true
    });
    const id = getUserInfo().sub
      instance.get(`/notification?user_id=${id}`, config)
        .then(response => {
          // console.log(response.data)
          this.setState({
            notifications: response.data.notifications
          }, () => {
            this.setState({
              loading: false
            });
          })
        })
        .catch(error => {
          errors(this, error);
        })
    }
  }

  handleClick(notification) {
    let data = {
      "notification_id": notification.id,
      "user_id": getUserInfo().sub
    }
    let config = {
      headers: getAuthHeader()
    }

    instance.put(`/notification`, data, config)
      .catch(error => {
        errors(this, error);
      })
  }

  getStatus(statusId) {
    if (statusId === 7) {
      return 'Rejected'
    } else if (statusId === 6) {
      return 'Approved'
    } else if(statusId === 8) {
      return 'Closed'
    } else {
      return 'Information Requested'
    }
  }
  parseMessage = (notification) => {
    let status = last(notification.message.split(' '))
    let user = getUserRole(this.props.resources)
    return `${user === AUTHORITY ? i18n.t('Notification.reviewer') : i18n.t('Notification.user')} ${notification.request_id} ${i18n.t(`Notification.${status}`)}`
  }
  toggleDropdown () {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
    })
  }
  dropAccnt() {
    return (
      <Dropdown nav isOpen={this.state.dropdownOpen} toggle={this.toggleDropdown}>
        <DropdownToggle nav onClick={()=>this.updateTokenHOC(this.toggle)}>
          <i className="fa fa-bell-o fa-lg"></i>
          {this.state.notificationCount>0 &&
          <span className="badge badge-pill badge-danger"></span>
          }
        </DropdownToggle>
        <DropdownMenu className='dropdown-notify dropdown-menu-lg'>
          <div className="dropdown-header text-center"><b>{i18n.t('Notifications')}</b></div>
          {this.state.loading && <div className='loader-center'>
            <div className="lds-roller">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>}
          {((this.state.notifications.length > 0 && !this.state.loading) && this.state.notifications.map((notification, i) => {
            return <DropdownItem className='itenotify' href="#" key={i}>
              <Button onClick={(e) =>
                {
                  e.preventDefault()
                  this.handleClick(notification)
                }
              } className="radio-close" />
              <div className='notifymessage'>
                <p>{this.parseMessage(notification)}</p>
              </div>
              <div className='notifyfoot'>
                <p className='reqdate'>{moment(notification.generated_at).format('HH:mm DD/MM/YYYY')}</p>
                <p className='reqstatus'><span
                  className={getStatusClass(this.getStatus(notification.request_status))}>{i18n.t(this.getStatus(notification.request_status))}</span>
                </p>
              </div>
            </DropdownItem>
          })) || (!this.state.loading && <p className="no-data">{i18n.t('Notification.noNewNotifications')}</p>)}
        </DropdownMenu>
      </Dropdown>
    );
  }

  render() {
    return (
      this.dropAccnt()
    );
  }
}

export default HeaderNotifyDropdown;
