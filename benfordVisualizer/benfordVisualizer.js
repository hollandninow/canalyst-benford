class BenfordVisualizer {

  createChartCode(statementBenfordObj, index) {
    const frequencyDataArray = Object.keys(statementBenfordObj.getFrequencyData()).map(bucket => statementBenfordObj.getFrequencyData()[bucket]);
    const errorBarDataArray = statementBenfordObj.getErrorBarData();

    const frequencyDataArrayStr = `[${frequencyDataArray.toString()}]`;
    const errorBarDataArrayStr = `[${errorBarDataArray.toString()}]`;
    
    const chartCode = `
        const yValue${index} = ${frequencyDataArrayStr};
        
        const chart${index} = {
          x: xValue,
          y: yValue${index},
          error_y: {
            type: 'data',
            array: ${errorBarDataArrayStr},
            visible: true,
            color: '#444',
            thickness: 1.5,
            width: 5,
            opacity: 1
          },
          type: 'bar',
          text: yValue${index}.map(String),
          textposition: 'auto',
          name: 'Actual Frequency',
          hoverinfo: 'none',
          marker: {
            color: '#96c8e9',
            line: {
              color: '#44a6e7',
              width: 1.5
            }
          }
        };
    
        const data${index} = [chart${index},benford];
    
        const layout${index} = {
          title: '${statementBenfordObj.getFinancialStatement()}',
          plot_bgcolor: '#CBD4C8',
          paper_bgcolor: '#CBD4C8',
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

  createBaseHTML(benfordObj) {
    const chartCodeArray = this.bundleChartCode(benfordObj.getStatementBenfordArray());
    const ticker = benfordObj.getTicker() === 'Multiple' ? benfordObj.getSector() : benfordObj.getTicker();

    const name = benfordObj.getCompanyName() === undefined ? ticker : benfordObj.getCompanyName();

    let chartCodeArrStr = '';

    chartCodeArray.forEach(str => {
      chartCodeArrStr += str;
    });

    let chartDivArrStr = '';

    for(let i = 0; i < chartCodeArray.length; i++) {
      chartDivArrStr += `<div id="myDiv${i}" style="width:1000px;height:400px;"></div>`;
    }

    const standaloneHTML = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <link rel="preconnect" href="https://fonts.googleapis.com"/>
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="crossorigin"/>
      <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700&amp;display=swap" rel="stylesheet"/>
      <title>${name}</title>
    </head>
    <style>
        h1 {
          font-family: "Manrope", verdana, arial, sans-serif;
          font-weight: 500;
          color: #555;
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
    </html>
    `

    return standaloneHTML;
  }
}

module.exports = BenfordVisualizer;