import React, {Component} from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import {Container} from 'reactstrap';
import Header from '../../components/Header/';
import Sidebar from '../../components/Sidebar/';
import Breadcrumb from '../../components/Breadcrumb/';
import Aside from '../../components/Aside/';
import Footer from '../../components/Footer/';
import RequestStatus from '../../components/RequestStatus/RequestStatus';

import Dashboard from '../../views/Dashboard/';
import NewRequest from '../../views/NewRequest/';
import SearchRequests from '../../views/SearchRequests/';
import UpdateRegistration from '../../views/Registration/Update';
import ReviewRegistration from '../../views/Registration/Review';
import DeRegistration from '../../views/DeRegistration/'
import UpdateDeRegistration from '../../views/DeRegistration/Update/Update';
import ViewReview from "../../views/View/ViewReview";
import ViewRequest from "../../views/View/ViewRequest";

import Page401 from '../../views/Errors/Page401';
import { I18n, translate } from 'react-i18next';
import {getUserRole} from "../../utilities/helpers";
import {AUTHORITY, EXPORTER, BULK_IMPORTER, INDIVIDUAL_IMPORTER} from "../../utilities/constants";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


class Full extends Component {
  constructor(props) {
    super(props);
    this.changeLanguage = this.changeLanguage.bind(this);
  }

  changeLanguage(lng) {
    const { i18n } = this.props;
    i18n.changeLanguage(lng);
  }

  render() {
    return (
      <I18n ns="translations">
        {
        (t, { i18n }) => (
      <div className="app">
        <Header {...this.props} switchLanguage={this.changeLanguage} />
        <div className="app-body">
          <Sidebar {...this.props}/>
          <main className="main">
            <Breadcrumb {...this.props} />
            <Container fluid>
              <ToastContainer 
              position="top-left" 
              hideProgressBar
              autoClose={false}
              closeOnClick
              />
              <Switch>
                <Route path="/dashboard" name="Dashboard"  render={(props) => <Dashboard {...this.props} /> } />
                <Route path="/search-requests" name="SearchRequests" render={(props) => <SearchRequests {...this.props} /> } />
                {(getUserRole(this.props.resources) === INDIVIDUAL_IMPORTER || getUserRole(this.props.resources) === BULK_IMPORTER || getUserRole(this.props.resources) === EXPORTER || getUserRole(this.props.resources) === AUTHORITY) &&
                  <Route path="/request-status" name="RequestStatus" component={RequestStatus}/>
                }
                {(getUserRole(this.props.resources) === INDIVIDUAL_IMPORTER || getUserRole(this.props.resources) === BULK_IMPORTER) &&
                  <Route path="/new-request/:id" name="NewRequest" key="new-request" render={(props) => <NewRequest {...this.props} {...props}/> }/>
                }
                {(getUserRole(this.props.resources) === INDIVIDUAL_IMPORTER || getUserRole(this.props.resources) === BULK_IMPORTER) &&
                  <Route path="/new-request-finish/:id" key="finish-new-request" name="NewRequest" render={(props) => <NewRequest {...this.props} {...props}/> }/>
                }
                {(getUserRole(this.props.resources) === INDIVIDUAL_IMPORTER || getUserRole(this.props.resources) === BULK_IMPORTER) &&
                  <Route path="/update-registration/:id" name="UpdateRegistration" key={Date.now()} render={(props) => <UpdateRegistration {...this.props} {...props}/> }/>
                }
                {(getUserRole(this.props.resources) === AUTHORITY) &&
                  <Route path="/review-registration/:id/:type" name="ReviewRegistration" render={(props) => <ReviewRegistration {...this.props} {...props}/> }/>
                }
                {(getUserRole(this.props.resources) === AUTHORITY) &&
                  <Route path="/view-review/:id/:type" name="ViewReview" render={(props) => <ViewReview {...this.props} {...props}/> }/>
                }
                {(getUserRole(this.props.resources) === INDIVIDUAL_IMPORTER || getUserRole(this.props.resources) === BULK_IMPORTER || getUserRole(this.props.resources) === EXPORTER) &&
                  <Route path="/view-request/:id/:type" name="ViewRequest" key={Date.now()} render={(props) => <ViewRequest {...this.props} {...props}/> }/>
                }
                {(getUserRole(this.props.resources) === EXPORTER) &&
                  <Route path="/de-registration/:id" key="new-de-request" name="DeRegistration" render={(props) => <DeRegistration {...this.props} {...props}/> }/>
                }
                {(getUserRole(this.props.resources) === EXPORTER) &&
                  <Route path="/de-registration-finish/:id" key="finish-de-request" name="DeRegistration" render={(props) => <DeRegistration {...this.props} {...props}/> }/>
                }
                {(getUserRole(this.props.resources) === EXPORTER) &&
                  <Route path="/update-deregistration/:id" name="UpdateDeRegistration" key={Date.now()} render={(props) => <UpdateDeRegistration {...this.props} {...props}/> }/>
                }
                <Route path="/unauthorized-access" name="Page401"  component={Page401} />
                <Redirect from="/" to="/dashboard"/>
              </Switch>
            </Container>
          </main>
          <Aside />
        </div>
        <Footer />
      </div>
      )
        }
      </I18n>
    );
  }
}

export default translate('translations')(Full);
