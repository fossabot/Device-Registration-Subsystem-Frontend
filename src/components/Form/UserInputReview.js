import React from 'react'
import {Col, FormGroup, Label, Row} from "reactstrap";
import {Field} from "formik";
import i18n from '../../i18n';
import renderError from "./RenderError";
import RenderInput from "./RenderInput";
const UserInputReview = () => {
  return (
    <Row>
      <Col className="col-12 col-sm-6 col-md-4">
        <FormGroup>
          <Label>{i18n.t('reviewStatus')}<span className="text-danger">*</span></Label>
          <div className='selectbox'>
            <Field name="reviewStatus" component="select" className="form-control">
              <option value="select">{i18n.t('selectStatus')}</option>
              <option value="6">{i18n.t('reviewStatus.approve')}</option>
              <option value="5">{i18n.t('reviewStatus.requested')}</option>
              <option value="7">{i18n.t('reviewStatus.rejected')}</option>
            </Field>
          </div>
          <Field name="reviewStatus" component={renderError}/>
        </FormGroup>
      </Col>
      <Col className="col-12 col-sm-6 col-md-8">
        <FormGroup>
          <Field name="reviewFeedback" type="textarea" label={i18n.t('reviewFeedback')}
                 component={RenderInput} className="form-control" requiredStar/>
        </FormGroup>
      </Col>
    </Row>
  )}

export default UserInputReview
