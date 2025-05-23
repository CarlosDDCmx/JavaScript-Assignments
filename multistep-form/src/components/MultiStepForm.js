import React, { useReducer, useCallback, useMemo } from 'react';
import { FormProvider } from './context';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import ProgressBar from './ProgressBar';

const initialState = {
  currentStep: 1,
  formData: {
    name: '',
    email: '',
    address: '',
    city: '',
    country: '',
    terms: false,
  },
  errors: {},
  submitted: false,
};

function formReducer(state, action) {
  switch (action.type) {
    case 'GO_NEXT_STEP':
      return { ...state, currentStep: state.currentStep + 1 };
    case 'GO_PREV_STEP':
      return { ...state, currentStep: state.currentStep - 1 };
    case 'UPDATE_FORM_DATA':
      const updatedFormData = { ...state.formData, ...action.payload };
      const newErrors = { ...state.errors };
      Object.keys(action.payload).forEach(field => delete newErrors[field]);
      return { ...state, formData: updatedFormData, errors: newErrors };
    case 'SET_ERRORS':
      return { ...state, errors: action.payload };
    case 'SUBMIT_FORM':
      return { ...state, submitted: true };
    default:
      return state;
  }
}

const MultiStepForm = () => {
  const [state, dispatch] = useReducer(formReducer, initialState);
  const { currentStep, formData, errors, submitted } = state;

  const validateCurrentStep = useCallback(() => {
    let errors = {};
    switch (currentStep) {
      case 1:
        if (!formData.name.trim()) errors.name = 'Name is required';
        if (!formData.email.trim()) {
          errors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
          errors.email = 'Invalid email format';
        }
        break;
      case 2:
        if (!formData.address.trim()) errors.address = 'Address is required';
        if (!formData.city.trim()) errors.city = 'City is required';
        if (!formData.country) errors.country = 'Country is required';
        break;
      case 3:
        if (!formData.terms) errors.terms = 'You must agree to the terms';
        break;
      default:
        break;
    }
    return errors;
  }, [currentStep, formData]);

  const handleNext = useCallback(() => {
    const errors = validateCurrentStep();
    if (Object.keys(errors).length === 0) {
      if (currentStep < 3) {
        dispatch({ type: 'GO_NEXT_STEP' });
      } else {
        dispatch({ type: 'SUBMIT_FORM' });
      }
    } else {
      dispatch({ type: 'SET_ERRORS', payload: errors });
    }
  }, [currentStep, validateCurrentStep]);

  const handlePrev = useCallback(() => {
    dispatch({ type: 'GO_PREV_STEP' });
  }, []);

  const progress = useMemo(
    () => (currentStep / 3) * 100,
    [currentStep]
  );

  if (submitted) {
    return (
      <div className="confirmation">
        <h2>Form Submitted Successfully!</h2>
        <pre>{JSON.stringify(formData, null, 2)}</pre>
      </div>
    );
  }

  return (
    <FormProvider value={{ state, dispatch }}>
      <div className="form-container">
        <ProgressBar progress={progress} />
        {currentStep === 1 && <Step1 />}
        {currentStep === 2 && <Step2 />}
        {currentStep === 3 && <Step3 />}
        <div className="navigation-buttons">
          {currentStep > 1 && (
            <button onClick={handlePrev}>Back</button>
          )}
          <button onClick={handleNext}>
            {currentStep === 3 ? 'Submit' : 'Next'}
          </button>
        </div>
      </div>
    </FormProvider>
  );
};

export default MultiStepForm;