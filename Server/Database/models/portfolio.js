const mongoose = require('mongoose');

const PortfolioSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  shortfilms: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Shortfilm',
  }],
});

module.exports = mongoose.model('Portfolio', PortfolioSchema);
