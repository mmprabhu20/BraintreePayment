const braintree = require("braintree");
var dbUri = process.env.DATABASE;
const mongoose = require("mongoose");
const DataModel = require("../Model/DBModel");
var gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.BRAINTREE_MERCHANT_ID,
  publicKey: process.env.BRAINTREE_PUBLIC_KEY,
  privateKey: process.env.BRAINTREE_PRIVATE_KEY,
});

module.exports = function (app) {
  app.get("/braintree", function (req, res) {
    res.send("Braintree route is healthy");
  });

  app.get("/api/braintree/v1/getToken", async function (req, res) {
    try {
      gateway.clientToken.generate({}, function (err, response) {
        if (err) {
          res.status(500).send(err);
        } else {
          res.send(response);
        }
      });
    } catch (err) {
      res.status(500).send(err);
    }
  });

  app.post("/api/braintree/v1/sandbox", async function (req, res) {
    try {
      var nonceFromTheClient = req.body.paymentMethodNonce;
      var newTransaction = gateway.transaction.sale(
        {
          amount: req.body.amount,
          paymentMethodNonce: nonceFromTheClient,
          options: {
            submitForSettlement: true,
          },
        },
        function (error, result) {
          if (result) {
            res.send(result);
          } else {
            res.status(500).send(error);
          }
        }
      );
    } catch (err) {
      console.log(err);
      res.send(err);
    }
  });
  app.post("/api/braintree/save/", async function (req, res) {
    const data = req.body;
    console.log(data);
    const uri = dbUri;
    await mongoose.connect(uri);
    try {
      let ins = {};
      ins.amount = data.amount;
      ins.currencyIsoCode = data.currencyIsoCode;
      ins.CustomerName = data.CustomerName;
      ins.Currency = data.Currency;
      ins.globalId = data.globalId;
      ins.paymentInstrumentType = data.paymentInstrumentType;
      ins.processorResponseType = data.processorResponseType;
      let insert = new DataModel(ins);
      await insert.save().then(
        (response) => {
          resultSet = {
            msg: "Data Added successfully",
            statusCode: 200,
          };
        },
        (err) => {
          // console.log("err: ", err);
          resultSet = {
            msg: err.message,
            statusCode: 500,
          };
        }
      );

      return resultSet;
    } catch (Error) {
      resultSet = {
        msg: Error,
        statusCode: 400,
      };
      return resultSet;
    }
  });
};
