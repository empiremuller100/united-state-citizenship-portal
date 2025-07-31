// frontend/src/components/ComplianceBanner.js
import React from 'react';
import './ComplianceBanner.css';

const ComplianceBanner = () => (
  <div className="compliance-banner">
    <div className="warning-icon">⚠️</div>
    <div className="warning-text">
      <strong>SIMULATION ONLY</strong> - Educational tool for practice purposes. 
      Not affiliated with U.S. Citizenship and Immigration Services (USCIS)
    </div>
  </div>
);

export default ComplianceBanner;