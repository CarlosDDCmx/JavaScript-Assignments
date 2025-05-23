import React, { useContext, useEffect, useRef } from 'react';
import { FormContext } from './context';

const Step2 = () => {
  const { state, dispatch } = useContext(FormContext);
  const { formData, errors } = state;
  const addressRef = useRef(null);

  useEffect(() => {
    addressRef.current.focus();
  }, []);

  return (
    <div className="step">
      <div className="form-group">
        <label>Street Address</label>
        <input
          type="text"
          value={formData.address}
          onChange={(e) => dispatch({
            type: 'UPDATE_FORM_DATA',
            payload: { address: e.target.value }
          })}
          ref={addressRef}
        />
        {errors.address && <span className="error">{errors.address}</span>}
      </div>
      <div className="form-group">
        <label>City</label>
        <input
          type="text"
          value={formData.city}
          onChange={(e) => dispatch({
            type: 'UPDATE_FORM_DATA',
            payload: { city: e.target.value }
          })}
        />
        {errors.city && <span className="error">{errors.city}</span>}
      </div>
      <div className="form-group">
        <label>Country</label>
        <select
          value={formData.country}
          onChange={(e) => dispatch({
            type: 'UPDATE_FORM_DATA',
            payload: { country: e.target.value }
          })}
        >
          <option value="">Select Country</option>
          <option value="MX">México</option>
          <option value="CAN">Canada</option>
          <option value="UK">United Kingdom</option>
          <option value="JP">日本</option>
        </select>
        {errors.country && <span className="error">{errors.country}</span>}
      </div>
    </div>
  );
};

export default Step2;