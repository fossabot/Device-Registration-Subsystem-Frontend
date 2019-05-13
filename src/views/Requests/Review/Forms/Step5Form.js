import React from 'react'
import {Button, Card, CardBody, CardHeader, Col, Form, Row} from "reactstrap";
import i18n from '../../../../i18n';
import StepIndicator from '../../../../components/Sidebar/StepIndicator';
import CommentBox from '../../../../components/CommentSection/CommentBox'
import UserInputReview from '../../../../components/Form/UserInputReview'
import {isEmpty,isNil} from "ramda";
import {getReviewStatus} from "../../../../utilities/helpers";
import ApprovalDocuments from "../Sections/ApprovalDocuments";

const Step5Form = ({
                     stepsNames,
                     stepIndicator,
                     step5Data,
                     stepsInfo,
                     callPrev,
                     reviewStatus,
                     dirty,
                     stepReady,
                     isValid,
                     kcProps,
                     comments,
                     type,
                     handleSubmit,
                     jumpToNext
                   }) => {
  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <Col className="col-12 col-xl-4 order-xl-12 mt-3">
          <StepIndicator stepsInfo={stepsNames} step={stepIndicator} mode={type}/>
          <CommentBox header={i18n.t('commentBox.header')} comments={type === 'view' ? comments : stepsInfo.step5.comments}/>
        </Col>
        <Col className="col-12 col-xl-8 order-xl-1 mt-3">
          <ApprovalDocuments step5Data={step5Data} stepReady={stepReady} kcProps={kcProps}/>
          {(stepReady && type!=='view') &&
          <Card>
            <CardHeader><b>{i18n.t('reviewStatus')}</b></CardHeader>
            <CardBody>
              {!isEmpty(stepsInfo.step5.prevReviewStatus) &&
              <div className="alert alert-warning"><b>{i18n.t('currentStatus')}:</b> {getReviewStatus(stepsInfo.step5.prevReviewStatus)}</div>
              }
              <UserInputReview />
            </CardBody>
          </Card>
          }
          <div className="stepBtn_container">
            {type === 'view' &&
            <React.Fragment>
              <Button onClick={callPrev} className="btn btn-link btn-next-prev">{i18n.t('previous')}</Button>
              <Button color="primary" onClick={jumpToNext} disabled={isNil(step5Data)}
                      className='btn-next-prev'>{i18n.t('finish')}</Button>
            </React.Fragment>
            }
            {type === 'review' &&
            <React.Fragment>
              <button onClick={callPrev} className="btn btn-link btn-next-prev"
              >{i18n.t('previous')}</button>
              <Button color="primary" type="submit"
                      className={(reviewStatus === '' || dirty) ? 'btn-next-prev stepBtn--show' : 'btn-next-prev stepBtn--hide'}
                      disabled={!isValid || !stepReady}>{i18n.t('next')}
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

export default Step5Form