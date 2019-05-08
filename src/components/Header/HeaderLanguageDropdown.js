import React, {Component} from 'react';
import {
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Dropdown
} from 'reactstrap';
import {getLangTag} from './../../utilities/helpers'
class HeaderLanguageDropdown extends Component {

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
    let lang = 'English';
    let langXs = 'En';
    if(getLangTag(this.props.i18n.language) === 'en') {
      lang = 'English';
      langXs = 'En';
    } else if(getLangTag(this.props.i18n.language) === 'es') {
      lang = 'Spanish';
      langXs = 'Es';
    } else if(getLangTag(this.props.i18n.language) === 'id') {
      lang = 'Indonesian';
      langXs = 'Id';
    }
    return (
      <Dropdown nav isOpen={this.state.dropdownOpen} toggle={this.toggle}>
        <DropdownToggle caret>
          <span className="lang-lg">{lang}</span>
          <span className="lang-xs">{langXs}</span>
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem onClick={() => this.props.switchLanguage('en')}>
            <i className="flag-icon flag-icon-us"></i> English</DropdownItem>
          <DropdownItem onClick={() => this.props.switchLanguage('es')}>
            <i className="flag-icon flag-icon-es"></i> Spanish</DropdownItem>
          <DropdownItem onClick={() => this.props.switchLanguage('id')}>
            <i className="flag-icon flag-icon-id"></i> Indonesian</DropdownItem>
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

export default HeaderLanguageDropdown;
