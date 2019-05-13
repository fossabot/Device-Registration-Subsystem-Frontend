import React from 'react'
import {Button, Card, CardBody, CardHeader, Col, Form, Row} from "reactstrap";
import i18n from '../../../../i18n';
import StepIndicator from '../../../../components/Sidebar/StepIndicator';
import CommentBox from '../../../../components/CommentSection/CommentBox'
import DeviceDescription from "../Sections/DeviceDescription";
import UserInputReview from '../../../../components/Form/UserInputReview'
import {isEmpty, isNil} from "ramda";
import {getReviewStatus} from "../../../../utilities/helpers";

const Step2Form = ({
                     stepsNames,
                     stepIndicator,
                     step2Data,
                     stepsInfo,
                     callPrev,
                     jumpToNext,
                     viewType,
                     reviewStatus,
                     dirty,
                     stepReady,
                     isValid,
                     type,
                     comments,
                     handleSubmit
                   }) => {
  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <Col className="col-12 col-xl-4 order-xl-12 mt-3">
          <StepIndicator stepsInfo={stepsNames} step={stepIndicator} mode={type}/>
          <CommentBox header={i18n.t('commentBox.header')}
                      comments={type === 'view' ? comments : stepsInfo.step2.comments}/>
        </Col>
        <Col className="col-12 col-xl-8 order-xl-1 mt-3">
          <DeviceDescription step2Data={step2Data} stepReady={stepReady}/>
          {(stepReady && type !== 'view') &&
          <Card>
            <CardHeader><b>{i18n.t('reviewStatus')}</b></CardHeader>
            <CardBody>
              {!isEmpty(stepsInfo.step2.prevReviewStatus) &&
              <div className="alert alert-warning">
                <b>{i18n.t('currentStatus')}:</b> {getReviewStatus(stepsInfo.step2.prevReviewStatus)}</div>
              }
              <UserInputReview/>
            </CardBody>
          </Card>
          }
          <div className="stepBtn_container">
            {type === 'view' &&
            <React.Fragment>
              <Button onClick={callPrev} className={viewType === 'deregistration' ? 'btn btn-link btn-next-prev stepBtn--hide' : 'btn btn-link btn-next-prev'}>{i18n.t('previous')}</Button>
              <Button color="primary" onClick={jumpToNext} disabled={isNil(step2Data)}
                      className='btn-next-prev'>{i18n.t('next')}</Button>
            </React.Fragment>
            }
            {type === 'review' &&
            <React.Fragment>
              <Button onClick={callPrev}
                      className={viewType === 'deregistration' ? 'btn btn-link btn-next-prev stepBtn--hide' : 'btn btn-link btn-next-prev'}
              >{i18n.t('previous')}</Button>
              <Button color="primary" type="submit"
                      className={(reviewStatus === '' || dirty) ? 'btn-next-prev stepBtn--show' : 'btn-next-prev stepBtn--hide'}
                      disabled={!isValid && (viewType === 'registration' || !stepReady)}>{i18n.t('next')}
              </Button>{' '}
              <Button color="primary" onClick={jumpToNext}
                      className={(reviewStatus === '' || dirty) ? 'btn-next-prev stepBtn--hide' : 'btn-next-prev stepBtn--show'}
              >{i18n.t('next')}
              </Button>
            </React.Fragment>
            }
            {' '}
          </div>
        </Col>
      </Row>
    </Form>
  )}

export default Step2Form
