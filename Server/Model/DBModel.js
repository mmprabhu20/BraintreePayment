const mongoose = require("mongoose");
const Schema = mongoose.Schema;
require("dotenv").config();

const PaymentSchema = Schema({
  amount: {
    type: String,
  },
  currencyIsoCode: {
    type: String,
  },
  globalId: {
    type: String,
  },
  paymentInstrumentType: {
    type: String,
  },
  processorResponseType: {
    type: String,
  },
  CustomerName: {
    type: String,
  },
  Currency: {
    type: String,
  },
  status: {
    type: String,
  },
  createDt: {
    type: Date,
    default: Date.now(),
  },
  modifyDt: {
    type: Date,
    default: Date.now(),
  },
  is_delete: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("PaymentData", PaymentSchema);
