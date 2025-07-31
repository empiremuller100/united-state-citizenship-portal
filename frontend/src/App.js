// frontend/src/App.js
import React, { useState } from 'react';
import FormSimulator from './components/FormSimulator';
import CaseTracker from './components/CaseTracker';
import ComplianceBanner from './components/ComplianceBanner';
import './App.css';

function App() {
  const [currentForm, setCurrentForm] = useState('I-485');
  
  return (
    <div className="App">
      <ComplianceBanner />
      <header>
        <h1>United States Citizenship Portal</h1>
        <p>Educational Simulation - Not affiliated with U.S. government</p>
      </header>
      
      <nav>
        <button onClick={() => setCurrentForm('I-130')}>I-130</button>
        <button onClick={() => setCurrentForm('I-485')}>I-485</button>
        <button onClick={() => setCurrentForm('I-765')}>I-765</button>
      </nav>
      
      <main>
        <FormSimulator formType={currentForm} />
        <CaseTracker />
      </main>
      
      <footer>
        <p>
          Official U.S. Citizenship Information: {' '}
          <a href="https://www.uscis.gov/" target="_blank" rel="noopener noreferrer">
            USCIS.gov
          </a>
        </p>
      </footer>
    </div>
  );
}

export default App;