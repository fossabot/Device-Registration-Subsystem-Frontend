import React, {Component} from 'react';
import {
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Dropdown
} from 'reactstrap';
import i18n from './../../i18n'
import {getUserRole} from "./../../utilities/helpers";

class HeaderDropdown extends Component {

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false
    };
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  dropAccnt() {
    return (
      <Dropdown nav isOpen={this.state.dropdownOpen} toggle={this.toggle} className='dd-itereg'>
        <DropdownToggle nav>
        <span className="userpro-lg">{i18n.t('hi')} <span
            className="h6">{((this.props.userDetails || {}).preferred_username || '')}</span></span>
          <span className="userpro-xs"><i className="fa fa-user"></i></span>
          <span className="fa fa-caret-down"></span>
        </DropdownToggle>
        <DropdownMenu>
          <div className="userpro-xs">{i18n.t('hi')} <span
              className="h6">{((this.props.userDetails || {}).preferred_username || '')}</span></div>
          <DropdownItem><i className="fa fa-user"></i> {getUserRole(this.props.resources)}</DropdownItem>
          <DropdownItem onClick={this.props.kc.logout}><i className="fa fa-lock"></i>{i18n.t('logout')}</DropdownItem>
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

export default HeaderDropdown;
