// backend/server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const geoip = require('geoip-lite');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Security: Block high-risk countries
const BLOCKED_COUNTRIES = ['CU', 'IR', 'KP', 'SY', 'VE'];

app.use((req, res, next) => {
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  const geo = geoip.lookup(ip);
  
  if (geo && BLOCKED_COUNTRIES.includes(geo.country)) {
    return res.status(403).json({
      error: 'Educational access restricted in your region'
    });
  }
  next();
});

// Real data detection patterns
const REAL_DATA_PATTERNS = [
  /\b\d{3}-\d{2}-\d{4}\b/, // SSN
  /A\d{9}/, // Alien Number
  /USCIS-\d{10}/ // Case Number
];

app.use((req, res, next) => {
  const requestData = JSON.stringify({
    body: req.body,
    query: req.query,
    headers: req.headers
  });
  
  const realDataDetected = REAL_DATA_PATTERNS.some(pattern => 
    pattern.test(requestData)
  );
  
  if (realDataDetected) {
    return res.status(302).json({
      redirect: 'https://www.uscis.gov/'
    });
  }
  
  next();
});

// Form submission endpoint
app.post('/api/submit-form', (req, res) => {
  const { formType } = req.body;
  
  // Generate mock case number (MOCK-YYYY-RANDOM)
  const year = new Date().getFullYear();
  const randomNum = Math.floor(100000 + Math.random() * 900000);
  const caseNumber = `MOCK-${year}-${randomNum}`;
  
  // Simulate processing time
  setTimeout(() => {
    res.json({
      status: 'success',
      caseNumber,
      message: 'Form submitted successfully',
      nextSteps: [
        'Biometrics appointment scheduled within 30 days',
        'Interview preparation materials available'
      ]
    });
  }, 1500);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});