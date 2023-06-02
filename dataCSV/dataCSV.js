const Papa = require('papaparse');

class DataCSV {
  constructor(csv) {
    this.data = Papa.parse(csv, {header:true}).data;
  }
}

module.exports = DataCSV;