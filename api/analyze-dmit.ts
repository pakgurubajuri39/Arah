import express from 'express';
import { handleAnalyzeDMIT } from '../server';

const app = express();
app.use(express.json({ limit: '30mb' }));
app.use(express.urlencoded({ extended: true, limit: '30mb' }));

app.all(['/api/analyze-dmit', '/analyze-dmit', '/'], (req, res) => {
  return handleAnalyzeDMIT(req, res);
});

app.all('*', (req, res) => {
  return handleAnalyzeDMIT(req, res);
});

export default app;
