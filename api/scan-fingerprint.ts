import express from 'express';
import { handleScanFingerprint } from '../server';

const app = express();
app.use(express.json({ limit: '30mb' }));
app.use(express.urlencoded({ extended: true, limit: '30mb' }));

app.all(['/api/scan-fingerprint', '/scan-fingerprint', '/'], (req, res) => {
  return handleScanFingerprint(req, res);
});

app.all('*', (req, res) => {
  return handleScanFingerprint(req, res);
});

export default app;
