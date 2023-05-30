import React, { Component } from "react";
import "./App.css";
import "braintree-web";
import axios from "axios";
import DropIn from "braintree-web-drop-in-react";
import { Col, Container, Input, Row, Button } from "reactstrap";
// import BraintreeDropIn from "./component/Braintree";

class Store extends Component {
  instance;

  state = {
    clientToken: null,
    showBraintreeDropIn: false,
    numberOfProducts: 1,
    CustomerName: "",
    Currency: "",
  };

  async componentDidMount() {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/braintree/v1/getToken"
      );
      const clientToken = response.data.clientToken;

      this.setState({ clientToken });
    } catch (err) {
      console.error(err);
    }
  }

  async buy(amount) {
    try {
      const { name } = this.props;
      const { nonce } = await this.instance.requestPaymentMethod();
      await axios
        .post("http://localhost:8000/api/braintree/v1/sandbox", {
          paymentMethodNonce: nonce,
          amount: name[0].amount,
        })
        .then(async (response) => {
          const datas = response.data;
          await axios.post("http://localhost:8000/api/braintree/save/", {
            amount: datas.transaction.amount,
            currencyIsoCode: datas.transaction.currencyIsoCode,
            globalId: datas.transaction.globalId,
            paymentInstrumentType: datas.transaction.paymentInstrumentType,
            processorResponseType: datas.transaction.processorResponseType,
            status: datas.success,
            CustomerName: this.state.CustomerName,
            CUrrency: this.state.Currency,
          });
        })
        .then((res) => {
          console.log(res);
          alert(res.message);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.error(err);
    }
  }

  render() {
    const { name } = this.props;
    if (!this.state.clientToken) {
      return (
        <div>
          <h1>Loading...</h1>
        </div>
      );
    } else {
      return (
        <div className="mt-5">
          <Container>
            {name.map((item) => {
              return (
                <>
                  <Col>
                    <Row className={"productHeaderRow"}>
                      <Col xs={4}>{"Product"}</Col>
                      <Col xs={2} className={"text-center"}>
                        {"Price"}
                      </Col>
                    </Row>
                    <Row className={"productInfoRow"}>
                      <Col xs={4} className={"productInfoColumn"}>
                        {item.productname}
                      </Col>
                      <Col xs={2} className={"productInfoColumnCenter"}>
                        {item.price}
                      </Col>
                    </Row>
                  </Col>
                </>
              );
            })}
            {/* <div className="row mt-3 mb-5">
              <div className="col-md-6">
                <input
                  type="text"
                  value={this.state.CustomerName}
                  className="form-control"
                  placeholder=" Your Name"
                />
              </div>
              <div className="col-md-6">
                <input
                  type="text"
                  value={this.state.Currency}
                  className="form-control"
                  placeholder="Currency"
                />
              </div>
            </div> */}

            <DropIn
              options={{
                authorization: this.state.clientToken,
              }}
              onInstance={(instance) => (this.instance = instance)}
            />
            <Col xs={12} className={"productInfoColumnCenter"}>
              <Button
                onClick={this.buy.bind(this)}
                disabled={!this.state.clientToken}
              >
                {"Buy"}
              </Button>
            </Col>
          </Container>
        </div>
      );
    }
  }
}

export default Store;
