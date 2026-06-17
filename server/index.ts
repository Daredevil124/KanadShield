import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// In-memory database for the Hackathon Demo
let reports = [
  {
    id: 1,
    caseId: 'CYB-1042',
    category: 'Phishing/Spam',
    description: 'Received a fake bank SMS with a malicious link.',
    incidentDate: new Date('2026-06-16T10:00:00Z'),
    financialLoss: 0,
    riskScore: 20,
    status: 'Investigating'
  },
  {
    id: 2,
    caseId: 'CYB-8921',
    category: 'Financial Fraud',
    description: 'Lost 50k to a fake UPI payment request.',
    incidentDate: new Date('2026-06-15T14:30:00Z'),
    financialLoss: 50000,
    riskScore: 80,
    status: 'High Priority'
  }
];

let nextId = 3;

// --- ROUTES ---

// 1. Create a new cybercrime report
app.post('/api/reports', (req, res) => {
  try {
    const { category, description, incidentDate, financialLoss } = req.body;

    // AI Triage Algorithm (Mock)
    let riskScore = 10;
    const loss = parseFloat(financialLoss) || 0;
    if (loss > 10000) riskScore += 40;
    if (category === 'Financial Fraud') riskScore += 30;
    if (category === 'Phishing/Spam') riskScore += 10;

    let status = 'New';
    if (riskScore > 50) status = 'High Priority';

    const newReport = {
      id: nextId++,
      caseId: `CYB-${Math.floor(1000 + Math.random() * 9000)}`,
      category,
      description,
      incidentDate: new Date(incidentDate || Date.now()),
      financialLoss: loss,
      riskScore,
      status
    };

    reports.unshift(newReport); // Add to beginning of array

    res.status(201).json({ success: true, report: newReport });
  } catch (error) {
    console.error("Error creating report:", error);
    res.status(500).json({ success: false, error: "Failed to create report" });
  }
});

// 2. Fetch all reports for the dashboard
app.get('/api/reports', (req, res) => {
  try {
    res.json({ success: true, reports });
  } catch (error) {
    console.error("Error fetching reports:", error);
    res.status(500).json({ success: false, error: "Failed to fetch reports" });
  }
});

app.listen(PORT, () => {
  console.log(`KanadShield API running on http://localhost:${PORT}`);
});
