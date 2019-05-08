import React from 'react'
import {Button, Card, CardBody, CardHeader, Col, Form, Row} from "reactstrap";
import i18n from '../../../../i18n';
import StepIndicator from '../../../../components/Sidebar/StepIndicator';
import CommentBox from '../../../../components/CommentSection/CommentBox'
import UserInputReview from '../../../../components/Form/UserInputReview'
import {isEmpty, isNil} from "ramda";
import {getReviewStatus} from "../../../../utilities/helpers";
import DeviceQuota from "../Sections/DeviceQuota";

const Step1Form = ({
                     stepsNames,
                     stepIndicator,
                     step1Data,
                     stepsInfo,
                     jumpToNext,
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
                      comments={type === 'view' ? comments : stepsInfo.step1.comments}/>
        </Col>
        <Col className="col-12 col-xl-8 order-xl-1 mt-3">
          <DeviceQuota step1Data={step1Data} stepReady={stepReady}/>
          {(stepReady && type !== 'view') &&
          <Card>
            <CardHeader><b>{i18n.t('reviewStatus')}</b></CardHeader>
            <CardBody>
              {!isEmpty(stepsInfo.step1.prevReviewStatus) &&
              <div className="alert alert-warning">
                <b>{i18n.t('currentStatus')}:</b> {getReviewStatus(stepsInfo.step1.prevReviewStatus)}</div>
              }
              <UserInputReview/>
            </CardBody>
          </Card>
          }
          <div className="stepBtn_container">
            {type === 'review' &&
            <React.Fragment>
              <Button color="primary" type="submit"
                      className={(reviewStatus === '' || dirty) ? 'btn-next-prev stepBtn--show' : 'btn-next-prev stepBtn--hide'}
                      disabled={!isValid || !stepReady}>{i18n.t('next')}
              </Button>{' '}
              <Button color="primary" onClick={jumpToNext}
                      className={(reviewStatus === '' || dirty) ? 'btn-next-prev stepBtn--hide' : 'btn-next-prev stepBtn--show'}
              >{i18n.t('next')}
              </Button>{''}
            </React.Fragment>
            }
            {type === 'view' &&
            <React.Fragment>
              <Button color="primary" onClick={jumpToNext} disabled={isNil(step1Data)}
                      className='btn-next-prev'>{i18n.t('next')}</Button>
            </React.Fragment>
            }
            {' '}
          </div>
        </Col>
      </Row>
    </Form>
  )
}
export default Step1Form