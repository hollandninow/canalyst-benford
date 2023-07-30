import '@babel/polyfill';
import { runCompanyAnalysis, runSectorAnalysis } from './runAnalysis';

// DOM ELEMENTS
const analysisForm = document.querySelector('.form__analysis');
const chartWindow = document.querySelector('.chart-window');
const selectionContainer = document.querySelector('.selection-container');
const selectionList = document.querySelector('.selection-list');

// DELEGATION
analysisForm.addEventListener('submit', async e => {
    e.preventDefault();
    const ticker = document.getElementById('ticker').value;
    const sector = document.getElementById('sector').value;
    const token = document.getElementById('token').value;
    const fsString = 'Income Statement As Reported,Balance Sheet,Cash Flow Statement,Adjusted Numbers As Reported';

    // TODO: add loading graphic
    renderSpinner(chartWindow);

    // chartWindow.innerHTML = '';
    hideSelectionList();

    if (!ticker && sector) {
      selectionList.innerHTML = '';

      const data = await runSectorAnalysis(token, sector, fsString);
      const markupArray = data.data.data.HTMLMarkupArray;

      displaySelectionList();

      displayChart(chartWindow, markupArray[0]);

      markupArray.forEach( (markup, index) => {
        const isSector = index === 0 ? true : false;
        displaySelectionListItem(isSector, markup, selectionList);
      });
    }

    if (ticker) {
      const data = await runCompanyAnalysis(token, ticker, 'Bloomberg', fsString);

      displayChart(chartWindow, data.data.data.HTMLMarkup);
    }

    const sectorListItem = document.querySelectorAll('.selection-list-item')[0];
    sectorListItem.style.backgroundColor = '#d3e9e9';
    sectorListItem.style.borderRadius = '1rem';
    sectorListItem.style.boxShadow = '0 3px 5px rgba(78, 78, 78, 0.089)';
    
    hideSpinner(chartWindow);
  }
);

const changeDisplayedChart = (e, markup) => {
  console.log(e);
  chartWindow.innerHTML = '';
  displayChart(chartWindow, markup);
};

const displayChart = (parentEl, markup) => {
  const iframe = document.createElement('iframe');
  iframe.srcdoc = markup;
  iframe.width = '100%';
  iframe.height = '100%';
  iframe.frameBorder = '0';
  parentEl.appendChild(iframe);
}

const displaySelectionList = () => {
  chartWindow.style.gridColumn = '3 / span 1';
  selectionContainer.style.display = 'block';
}

const renderSpinner = (parentEl) => {
  const markup = `<div class="spinner"></div>`;
  parentEl.style.position = 'relative';

  parentEl.innerHTML = markup;
}

const hideSpinner = (parentEl) => {
  parentEl.querySelector('.spinner').style.display = 'none';
}

const hideSelectionList = () => {
  chartWindow.style.gridColumn = '2 / span 2';
  selectionContainer.style.display = 'none';
}

const displaySelectionListItem = (sector = true, markup, parentEl) => {
  const selectionListItem = parentEl.appendChild(document.createElement('li'));

  selectionListItem.classList.add('selection-list-item');
  const selectionListItemSpan = selectionListItem.appendChild(document.createElement('span'));

  if (sector) {
    selectionListItemSpan.classList.add('selection-list-item__sector');
  } else {
    selectionListItemSpan.classList.add('selection-list-item__name');
  }
  
  const name = getNameFromMarkup(markup);

  selectionListItemSpan.textContent = name;

  selectionListItem.addEventListener('click', e => changeDisplayedChart(e, markup));
  selectionListItem.addEventListener('click', e => highlightSelectedItem(e))

  if (!sector) {
    const selectionListItemSpanTicker = selectionListItem.appendChild(document.createElement('span'));
    selectionListItemSpanTicker.classList.add('selection-list-item__ticker');

    const ticker = getTickerFromMarkup(markup);

    selectionListItemSpanTicker.textContent = ticker;

    selectionListItem.addEventListener('click', e => changeDisplayedChart(e, markup));
  }
}

const highlightSelectedItem = e => {
  unhighlightSelectionListItems();

  const selectedItem = e.target;
  selectedItem.style.backgroundColor = '#d3e9e9';
  selectedItem.style.borderRadius = '1rem';
  selectedItem.style.boxShadow = '0 3px 5px rgba(78, 78, 78, 0.089)';
}

const unhighlightSelectionListItems = () => {
  const selectionListItems = document.querySelectorAll('.selection-list-item');

  selectionListItems.forEach( el => {
    el.style.backgroundColor = '';
    el.style.borderRadius = '';
    el.style.boxShadow = '';
  });
}

const getTickerFromMarkup = markup => {
  const tickerIndexStart = markup.indexOf('<h1>Benford\'s Law Analysis: ') + 28;
  const tickerIndexEnd = markup.indexOf('</h1>');

  return markup.slice(tickerIndexStart, tickerIndexEnd);
}

const getNameFromMarkup = markup => {
  const nameIndexStart = markup.indexOf('<title>') + 7;
  const nameIndexEnd = markup.indexOf('</title>');

  return markup.slice(nameIndexStart, nameIndexEnd);
}