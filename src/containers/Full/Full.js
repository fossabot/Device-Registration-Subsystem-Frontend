import React, {Component} from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import {Container} from 'reactstrap';
import {Helmet} from 'react-helmet'
import Header from '../../components/Header/';
import Sidebar from '../../components/Sidebar/';
import Breadcrumb from '../../components/Breadcrumb/';
import Aside from '../../components/Aside/';
import Footer from '../../components/Footer/';
import RequestStatus from '../../components/RequestStatus/RequestStatus';

import Dashboard from '../../views/Dashboard/';
import NewRegistrationRequest from '../../views/Requests/Registration/NewRequest/NewRegistationRequest';
import SearchRequests from '../../views/SearchRequests/';
import UpdateRegistration from '../../views/Requests/Registration/Update';
import ReviewRegistration from '../../views/Requests/Review/Review';
import NewDeregistrationRequest from '../../views/Requests/DeRegistration/NewRequest/NewDeregistrationRequest'
import UpdateDeRegistration from '../../views/Requests/DeRegistration/Update/Update';
import ViewReview from "../../views/Requests/Review/View/ViewReview";
import ViewRequest from "../../views/Requests/View/ViewRequest";

import Page401 from '../../views/Errors/Page401';
import { I18n, translate } from 'react-i18next';
import {getUserRole} from "../../utilities/helpers";
import {AUTHORITY, EXPORTER, BULK_IMPORTER, INDIVIDUAL_IMPORTER} from "../../utilities/constants";

class Full extends Component {
  constructor(props) {
    super(props);
    this.state={
      lang: 'en'
    }
    this.changeLanguage = this.changeLanguage.bind(this);
  }
  componentDidMount() {
    this.setState({
      lang: localStorage.getItem('i18nextLng')
    })
  }

  changeLanguage(lng) {
    this.setState({
      lang: lng
    },()=>{
      setTimeout(() => {
        const { i18n } = this.props;
        i18n.changeLanguage(lng);
        window.location.reload();
      }, 1000);
    })
  }

  rtlLanguageHandler = (langTag) => {
    if(langTag==='ur'){
      return true
    }
    return false
  }
  render() {
    return (
      <I18n ns="translations">
        {
          (t, {i18n}) => (
            <div className="app">
              <Helmet>
                <html lang={this.state.lang} />
                <title>{i18n.t('title')}</title>
                <body dir={this.rtlLanguageHandler(this.state.lang)?'rtl':'ltr'} />
              </Helmet>
                <Header {...this.props} switchLanguage={this.changeLanguage}/>
                <div className="app-body">
                  <Sidebar {...this.props}/>
                  <main className="main">
                    <Breadcrumb {...this.props} />
                    <Container fluid>
                      <Switch>
                        <Route path="/dashboard" name="Dashboard" render={(props) => <Dashboard {...this.props} />}/>
                        <Route path="/search-requests" name="SearchRequests"
                               render={(props) => <SearchRequests {...this.props} />}/>
                        {(getUserRole(this.props.resources) === INDIVIDUAL_IMPORTER ||
                          getUserRole(this.props.resources) === BULK_IMPORTER ||
                          getUserRole(this.props.resources) === EXPORTER ||
                          getUserRole(this.props.resources) === AUTHORITY) &&
                        <Route path="/request-status" name="RequestStatus" component={RequestStatus}/>
                        }
                        {(getUserRole(this.props.resources) === INDIVIDUAL_IMPORTER ||
                          getUserRole(this.props.resources) === BULK_IMPORTER) &&
                        <Route path="/new-request/:id" name="NewRequest" key="new-request"
                               render={(props) => <NewRegistrationRequest {...this.props} {...props}/>}/>
                        }
                        {(getUserRole(this.props.resources) === INDIVIDUAL_IMPORTER ||
                          getUserRole(this.props.resources) === BULK_IMPORTER) &&
                        <Route path="/new-request-finish/:id" key="finish-new-request" name="NewRequest"
                               render={(props) => <NewRegistrationRequest {...this.props} {...props}/>}/>
                        }
                        {(getUserRole(this.props.resources) === INDIVIDUAL_IMPORTER ||
                          getUserRole(this.props.resources) === BULK_IMPORTER) &&
                        <Route path="/update-registration/:id" name="UpdateRegistration" key={Date.now()}
                               render={(props) => <UpdateRegistration {...this.props} {...props}/>}/>
                        }
                        {(getUserRole(this.props.resources) === AUTHORITY) &&
                        <Route path="/review-registration/:id/:type" name="ReviewRegistration"
                               render={(props) => <ReviewRegistration {...this.props} {...props}/>}/>
                        }
                        {(getUserRole(this.props.resources) === AUTHORITY) &&
                        <Route path="/view-review/:id/:type" name="ViewReview"
                               render={(props) => <ViewReview {...this.props} {...props}/>}/>
                        }
                        {(getUserRole(this.props.resources) === INDIVIDUAL_IMPORTER ||
                          getUserRole(this.props.resources) === BULK_IMPORTER ||
                          getUserRole(this.props.resources) === EXPORTER) &&
                        <Route path="/view-request/:id/:type" name="ViewRequest" key={Date.now()}
                               render={(props) => <ViewRequest {...this.props} {...props}/>}/>
                        }
                        {(getUserRole(this.props.resources) === EXPORTER) &&
                        <Route path="/de-registration/:id" key="new-de-request" name="DeRegistration"
                               render={(props) => <NewDeregistrationRequest {...this.props} {...props}/>}/>
                        }
                        {(getUserRole(this.props.resources) === EXPORTER) &&
                        <Route path="/de-registration-finish/:id" key="finish-de-request" name="DeRegistration"
                               render={(props) => <NewDeregistrationRequest {...this.props} {...props}/>}/>
                        }
                        {(getUserRole(this.props.resources) === EXPORTER) &&
                        <Route path="/update-deregistration/:id" name="UpdateDeRegistration" key={Date.now()}
                               render={(props) => <UpdateDeRegistration {...this.props} {...props}/>}/>
                        }
                        <Route path="/unauthorized-access" name="Page401" component={Page401}/>
                        <Redirect from="/" to="/dashboard"/>
                      </Switch>
                    </Container>
                  </main>
                  <Aside/>
                </div>
                <Footer/>
            </div>
          )
        }
      </I18n>
    );
  }
}

export default translate('translations')(Full);
