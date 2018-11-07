/*
Copyright (c) 2018 Qualcomm Technologies, Inc.
All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted (subject to the limitations in the disclaimer below) provided that the following conditions are met:

* Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
* Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
* Neither the name of Qualcomm Technologies, Inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.
NO EXPRESS OR IMPLIED LICENSES TO ANY PARTY'S PATENT RIGHTS ARE GRANTED BY THIS LICENSE. THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

import React, {Component} from 'react';
import {
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Dropdown
} from 'reactstrap';
import {errors, getAuthHeader, getUserInfo, instance, getStatusClass} from "../../utilities/helpers";
import moment from 'moment';

class HeaderNotifyDropdown extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dropdownOpen: false,
            notifications: [],
            loading: false,
            hasNotifications: false
        };
        this.toggle = this.toggle.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }
    componentDidMount(){
      const id = getUserInfo().sub
      let config = {
          headers: getAuthHeader()
      }
      instance.get(`/notification?user_id=${id}`, config)
        .then(response => {
          if(response.data.notifications.length>0){
            this.setState({
              hasNotifications:true
            })
          }
        })
        .catch(error => {
          errors(this, error);
        })
    }
    toggle() {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen,
            loading: true
        });
        const id = getUserInfo().sub
        let config = {
            headers: getAuthHeader()
        }
        instance.get(`/notification?user_id=${id}`, config)
            .then(response => {
                // console.log(response.data)
                this.setState({
                    notifications : response.data.notifications
                },()=>{
                    this.setState({
                        loading: false
                    });
                })
            })
            .catch(error => {
                errors(this, error);
            })
    }
    handleClick(notification,event) {
        event.preventDefault()
        let type = notification.request_type==='registration_request'?'registration':'deregistration'
        let requestId = notification.request_id;
        let data = {
            "notification_id": notification.id,
            "user_id": getUserInfo().sub
        }
        let config = {
            headers: getAuthHeader()
        }
        instance.put(`/notification`,data,config)
            .then(response => {
                if(response.status === 201){
                    if(notification.request_status===6 || notification.request_status===7){
                        this.props.history.push(`/view-request/${requestId}/${type}`)
                    } else {
                        this.props.history.push(`/update-${type}/${requestId}`)
                    }
                    if(response.data.notifications.length===0){
                      this.setState({
                        hasNotifications:false
                      })
                    }
                }
            })
            .catch(error => {
                errors(this, error);
            })
    }
    getStatus(statusId){
        if(statusId===7){
            return 'Rejected'
        } else if(statusId===6){
            return 'Approved'
        } else{
            return 'Information Requested'
        }
    }
    dropAccnt() {
        return (
            <Dropdown nav isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                <DropdownToggle nav>
                    <i className="fa fa-bell-o fa-lg"></i>
                    {this.state.hasNotifications &&
                        <span className="badge badge-pill badge-danger">&nbsp;</span>
                    }
                </DropdownToggle>
                <DropdownMenu right className='dropdown-notify dropdown-menu-lg'>
                    <div className="dropdown-header text-center"><b>Notifications</b></div>
                        { this.state.loading && <div className='loader-center'><div className="lds-roller">
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                        </div></div>}
                        { ((this.state.notifications.length>0 && !this.state.loading) && this.state.notifications.map((notification,i)=> {
                            return <DropdownItem className='itenotify' href="#" key={i}
                                                 onClick={(e) => this.handleClick(notification, e)}>
                                <div className='notifymessage'>
                                    <p>{notification.message}</p>
                                </div>
                                <div className='notifyfoot'>
                                    <p className='reqdate'>{moment(notification.generated_at).format('DD/MM/YYYY hh:m:s a')}</p>
                                    <p className='reqstatus'><span className={getStatusClass(this.getStatus(notification.request_status))}>{this.getStatus(notification.request_status)}</span>
                                    </p>
                                </div>
                            </DropdownItem>
                        })) || (!this.state.loading && <p className="no-data">No new Notifications</p>)}
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