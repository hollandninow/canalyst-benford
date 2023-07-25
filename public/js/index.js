import '@babel/polyfill';
import { runCompanyAnalysis, runSectorAnalysis } from './runAnalysis';

// DOM ELEMENTS
const analysisForm = document.querySelector('.form__analysis');
const chartWindow = document.querySelector('.chart-window');
const chartWindowText = document.querySelector('.chart-window-text');

// DELEGATION
analysisForm.addEventListener('submit', async e => {
    e.preventDefault();
    const ticker = document.getElementById('ticker').value;
    const sector = document.getElementById('sector').value;
    const token = document.getElementById('token').value;

    // TODO: add loading graphic
    chartWindow.innerHTML = '';

    if (!ticker && sector) {
      // TODO: add sector loading
    }

    if (ticker) {
      const data = await runCompanyAnalysis(token, ticker, 'Bloomberg', 'Income Statement As Reported,Balance Sheet,Cash Flow Statement,Adjusted Numbers As Reported');

      const iframe = document.createElement('iframe');
      iframe.srcdoc = data.data.data.HTMLMarkup;
      iframe.width = '100%';
      iframe.height = '100%';
      iframe.frameBorder = '0';
      chartWindow.appendChild(iframe);
    }
  }
);