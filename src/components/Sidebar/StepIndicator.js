import React from 'react';
import {translate} from "react-i18next";
import i18n from './../../i18n'
const StepIndicator = (props) => {
      const icon = props.mode === 'view'?'fa fa-info':'fa fa-pencil';
      const successIcon = props.mode === 'view'? 'fa fa-check-circle' : 'fa fa-check-circle text-success';
      return (
        <ol className="stepsinfo">
          {props.stepsInfo.map((step, i) => (
            <li key={i}><i className={(props.step === (i + 1)) ? icon: ((props.step > i + 1) ? successIcon : '')}></i>
              {props.step === (i + 1) ? <b>{i18n.t(step)}</b>: (i18n.t(step))}</li>
          ))}
        </ol>
      )
}
export default translate('translations')(StepIndicator);
