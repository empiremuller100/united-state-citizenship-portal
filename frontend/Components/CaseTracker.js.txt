// frontend/src/components/CaseTracker.js
import React, { useState } from 'react';
import './CaseTracker.css';

const CaseTracker = () => {
  const [caseNumber, setCaseNumber] = useState('');
  const [caseStatus, setCaseStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleTrack = async () => {
    if (!caseNumber) {
      setError('Please enter a case number');
      return;
    }

    setIsLoading(true);
    setError('');
    setCaseStatus(null);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      
      // Mock case statuses
      const mockStatuses = [
        "Case Received",
        "Biometrics Scheduled",
        "Interview Scheduled",
        "Case Approved",
        "Card Being Produced"
      ];
      
      const randomStatus = mockStatuses[Math.floor(Math.random() * mockStatuses.length)];
      
      setCaseStatus({
        status: randomStatus,
        lastUpdated: new Date().toLocaleDateString('en-US', { 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        }),
        nextStep: 'Check back for updates in 30 days'
      });
    }, 1500);
  };

  return (
    <div className="case-tracker">
      <h2>Case Status Tracker</h2>
      <div className="tracker-form">
        <input
          type="text"
          placeholder="Enter mock case number (e.g., MOCK-2023-123456)"
          value={caseNumber}
          onChange={(e) => setCaseNumber(e.target.value)}
          className="case-input"
        />
        <button 
          onClick={handleTrack} 
          disabled={isLoading}
          className="track-btn"
        >
          {isLoading ? 'Checking Status...' : 'Check Status'}
        </button>
      </div>
      
      {error && <div className="error-message">{error}</div>}
      
      {caseStatus && (
        <div className="status-card">
          <div className="status-header">
            <h3>Case Status</h3>
            <div className={`status-indicator ${
              caseStatus.status.includes('Approved') || caseStatus.status.includes('Card') 
                ? 'approved' 
                : 'pending'
            }`}>
              {caseStatus.status}
            </div>
          </div>
          
          <div className="status-details">
            <p><strong>Case Number:</strong> {caseNumber}</p>
            <p><strong>Last Updated:</strong> {caseStatus.lastUpdated}</p>
            <p><strong>Next Step:</strong> {caseStatus.nextStep}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CaseTracker;