// frontend/src/components/FormSimulator.js
import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { generateMockCase } from '../services/api';
import './FormSimulator.css';

const FormSimulator = ({ formType }) => {
  const [caseNumber, setCaseNumber] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const initialValues = {
    'I-130': { petitionerName: '', beneficiaryName: '', relationship: '' },
    'I-485': { fullName: '', dob: '', entryDate: '', category: '' },
    'I-765': { fullName: '', eligibilityCategory: '' }
  };

  const formSchemas = {
    'I-130': Yup.object({
      petitionerName: Yup.string().required('Required field'),
      beneficiaryName: Yup.string().required('Required field'),
      relationship: Yup.string().required('Please select a relationship')
    }),
    'I-485': Yup.object({
      fullName: Yup.string().required('Required field'),
      dob: Yup.date()
        .max(new Date(), 'Date cannot be in future')
        .required('Required field'),
      entryDate: Yup.date().required('Required field')
    }),
    'I-765': Yup.object({
      fullName: Yup.string().required('Required field'),
      eligibilityCategory: Yup.string().required('Please select a category')
    })
  };

  const handleSubmit = async (values) => {
    setIsSubmitting(true);
    setError('');
    
    try {
      const response = await generateMockCase(formType, values);
      setCaseNumber(response.caseNumber);
    } catch (err) {
      setError('Failed to generate case. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="form-simulator">
      <h2>Form {formType} Simulation</h2>
      
      <Formik
        initialValues={initialValues[formType]}
        validationSchema={formSchemas[formType]}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form>
            {formType === 'I-130' && (
              <>
                <div className="form-group">
                  <label>Petitioner's Full Name</label>
                  <Field name="petitionerName" />
                  <ErrorMessage name="petitionerName" component="div" className="error" />
                </div>
                
                <div className="form-group">
                  <label>Beneficiary's Full Name</label>
                  <Field name="beneficiaryName" />
                  <ErrorMessage name="beneficiaryName" component="div" className="error" />
                </div>
                
                <div className="form-group">
                  <label>Relationship</label>
                  <Field as="select" name="relationship">
                    <option value="">Select relationship</option>
                    <option value="spouse">Spouse</option>
                    <option value="parent">Parent</option>
                    <option value="child">Child</option>
                    <option value="sibling">Sibling</option>
                  </Field>
                  <ErrorMessage name="relationship" component="div" className="error" />
                </div>
              </>
            )}
            
            {formType === 'I-485' && (
              <>
                <div className="form-group">
                  <label>Applicant's Full Name</label>
                  <Field name="fullName" placeholder="First, Middle, Last" />
                  <ErrorMessage name="fullName" component="div" className="error" />
                </div>
                
                <div className="form-group">
                  <label>Date of Birth</label>
                  <Field type="date" name="dob" />
                  <ErrorMessage name="dob" component="div" className="error" />
                </div>
                
                <div className="form-group">
                  <label>Last U.S. Entry Date</label>
                  <Field type="date" name="entryDate" />
                  <ErrorMessage name="entryDate" component="div" className="error" />
                </div>
              </>
            )}
            
            {formType === 'I-765' && (
              <>
                <div className="form-group">
                  <label>Applicant's Full Name</label>
                  <Field name="fullName" />
                  <ErrorMessage name="fullName" component="div" className="error" />
                </div>
                
                <div className="form-group">
                  <label>Eligibility Category</label>
                  <Field as="select" name="eligibilityCategory">
                    <option value="">Select category</option>
                    <option value="c8">(c)(8) - Asylum Applicant</option>
                    <option value="c9">(c)(9) - Adjustment Applicant</option>
                    <option value="a10">(a)(10) - Withholding of Removal</option>
                  </Field>
                  <ErrorMessage name="eligibilityCategory" component="div" className="error" />
                </div>
              </>
            )}
            
            <button type="submit" disabled={isSubmitting} className="submit-btn">
              {isSubmitting ? 'Processing...' : 'Submit Application'}
            </button>
          </Form>
        )}
      </Formik>
      
      {error && <div className="error-message">{error}</div>}
      
      {caseNumber && (
        <div className="success-message">
          <h3>Application Submitted Successfully!</h3>
          <p>Your mock case number: <strong>{caseNumber}</strong></p>
          <p>Check status updates in the Case Tracker below</p>
        </div>
      )}
    </div>
  );
};

export default FormSimulator;