import React, { useContext, useEffect, useRef } from 'react';
import { FormContext } from './context';

const Step1 = () => {
  const { state, dispatch } = useContext(FormContext);
  const { formData, errors } = state;
  const nameRef = useRef(null);

  useEffect(() => {
    nameRef.current.focus();
  }, []);

  return (
    <div className="step">
      <div className="form-group">
        <label>Full Name</label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => dispatch({
            type: 'UPDATE_FORM_DATA',
            payload: { name: e.target.value }
          })}
          ref={nameRef}
        />
        {errors.name && <span className="error">{errors.name}</span>}
      </div>
      <div className="form-group">
        <label>Email Address</label>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => dispatch({
            type: 'UPDATE_FORM_DATA',
            payload: { email: e.target.value }
          })}
        />
        {errors.email && <span className="error">{errors.email}</span>}
      </div>
    </div>
  );
};

export default Step1;