exports.baseMarkupTemplate = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Benford's Law</title>
</head>
<body>
  <script src="https://cdn.plot.ly/plotly-2.20.0.min.js" charset="utf-8"></script>
  %%CHART_MARKUP%%
</body>
</html>`

exports.chartMarkupTemplate = `
  <div id="%%FINANCIAL_STATEMENT%%" style="width:1000px;height:400px;"></div>
  <script>
    const xValue = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];

    const yValue = %%FREQUENCY_ARRAY%%;
    
    const yValue2 = [];

    for(let i = 1; i < 10; i++) {
      yValue2.push( Math.log10(1 + (1/i)));
    }

    const trace1 = {
      x: xValue,
      y: yValue,
      type: 'bar',
      text: yValue.map(String),
      textposition: 'auto',
      name: 'Actual Frequency',
      hoverinfo: 'none',
      opacity: 0.5,
      marker: {
        color: 'rgb(158,202,225)',
        line: {
          color: 'rgb(8,48,107)',
          width: 1.5
        }
      }
    };

    const trace2 = {
      x: xValue,
      y: yValue2,
      type: 'bar',
      text: yValue2.map(String),
      textposition: 'auto',
      name: 'Expected Frequency',
      hoverinfo: 'none',
      marker: {
        color: 'rgba(58,200,225,.5)',
        line: {
          color: 'rgb(8,48,107)',
          width: 1.5
        }
      }
    };

    const data = [trace1,trace2];

    const layout = {
      title: 'Benford\'s Law Analysis: %%TICKER%%'
    };

    Plotly.newPlot('%%FINANCIAL_STATEMENT%%', data, layout);
  </script>`