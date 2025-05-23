import React, { useContext } from 'react';
import { FormContext } from './context';

const Step3 = () => {
  const { state, dispatch } = useContext(FormContext);
  const { formData, errors } = state;

  return (
    <div className="step">
      <div className="form-group">
        <label>
          <input
            type="checkbox"
            checked={formData.terms}
            onChange={(e) => dispatch({
              type: 'UPDATE_FORM_DATA',
              payload: { terms: e.target.checked }
            })}
          />
          I agree to the terms and conditions
        </label>
        {errors.terms && <span className="error">{errors.terms}</span>}
      </div>
    </div>
  );
};

export default Step3;