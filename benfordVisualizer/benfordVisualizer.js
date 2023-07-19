class BenfordVisualizer {

  createChartCode(benfordObj, index) {
    const frequencyDataArray = Object.keys(benfordObj.getFrequencyData()).map(bucket => benfordObj.getFrequencyData()[bucket]);

    const frequencyDataArrayStr = `[${frequencyDataArray.toString()}]`;
    
    const chartCode = `
        const yValue${index} = ${frequencyDataArrayStr};
        
        const chart${index} = {
          x: xValue,
          y: yValue${index},
          type: 'bar',
          text: yValue${index}.map(String),
          textposition: 'auto',
          name: 'Actual Frequency',
          hoverinfo: 'none',
          marker: {
            color: '#3377FF',
            line: {
              color: 'rgb(8,48,107)',
              width: 1.5
            }
          }
        };
    
        const data${index} = [chart${index},benford];
    
        const layout${index} = {
          title: '${benfordObj.getFinancialStatement()}'
        };
        
        Plotly.newPlot('myDiv${index}', data${index}, layout${index});
        `

    return chartCode;
  }

  bundleChartCode(statementBenfordArray) {
    const chartCodeArray = [];

    statementBenfordArray.forEach((dataObj, i) => {
      chartCodeArray.push(this.createChartCode(dataObj, i));
    });

    return chartCodeArray;
  }

  // fullHTML = true if you want HTML markup that works as a standalone page. 
  // fullHTML = false if you want markup you can insert into another HTML page.
  createBaseHTML(companyBenfordObj, fullHTML = true) {
    const chartCodeArray = this.bundleChartCode(companyBenfordObj.getStatementBenfordArray());
    const ticker = companyBenfordObj.getTicker() === 'Multiple' ? companyBenfordObj.getSector() : companyBenfordObj.getTicker();

    let chartCodeArrStr = '';

    chartCodeArray.forEach(str => {
      chartCodeArrStr += str;
    });

    let chartDivArrStr = '';

    for(let i = 0; i < chartCodeArray.length; i++) {
      chartDivArrStr += `<div id="myDiv${i}" style="width:1000px;height:400px;"></div>`;
    }

    const middleHTML = `
      <style>
        h1 {
          font-family: "Open Sans", verdana, arial, sans-serif;
          font-weight: 400;
        }

        body {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
      </style>
      <body>
        <h1>Benford's Law Analysis: ${ticker}</h1>
        <script src="https://cdn.plot.ly/plotly-2.20.0.min.js" charset="utf-8"></script>
        ${chartDivArrStr}
        <script>
          const xValue = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];

          // Benford frequencies
          const yBenford = [];
          for(let i = 1; i < 10; i++) {
            yBenford.push( Math.log10(1 + (1/i)));
          }
          
          const benford = {
            x: xValue,
            y: yBenford,
            type: 'line',
            text: yBenford.map(String),
            textposition: 'auto',
            name: 'Benford Frequency',
            hoverinfo: 'none',
            marker: {
              color: 'rgba(255,0,0,.5)',
              line: {
                color: 'rgb(8,48,107)',
                width: 1.5
              }
            }
          };

          // Chart JS:
          ${chartCodeArrStr}      

        </script>
      </body>
    `

    const baseHTML = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${ticker}</title>
    </head>
    ${middleHTML}
    </html>
    `

    return fullHTML === true ? baseHTML : middleHTML;
  }
}

module.exports = BenfordVisualizer;