// CurrencyConverter.js
import React from 'react';
import currencies from './currencies';
import {checkStatus, json} from './utils';
import './CurrencyConverter.css'

class CurrencyConverter extends React.Component {
  constructor(props) {
    super(props);

    const params = new URLSearchParams(props.location.search);

    this.state = {
        baseAcronym: params.get('base'),
        baseAmount: 1,
        quoteAcronym: params.get('quote'),
        quoteAmount: 0,
        loading: true,
    };
  }

  componentDidMount() {
      const { baseAcronym, quoteAcronym } = this.state;
      this.fetchConversionData(baseAcronym, quoteAcronym);
  }

  changeAmount = (event) => {
      this.setState({ baseAmount: event.target.value});
  }

  changeBase = (event) => {
      if (event.target.value !== this.state.quoteAcronym) {
        this.setState({ baseAcronym: event.target.value});
        this.fetchConversionData(event.target.value, this.state.quoteAcronym);
      }
      else {
          alert("Same currency as Quote");
      }
  }

  changeQuote = (event) => {
      if (event.target.value !== this.state.baseAcronym) {
        this.setState({ quoteAcronym: event.target.value });
        this.fetchConversionData(this.state.baseAcronym, event.target.value);
      }
      else {
          alert("Same currency as Base");
      }
  }

  fetchConversionData = (base, quote) => {
    this.setState({ loading: true });
    fetch(`https://altexchangerateapi.herokuapp.com/latest?from=${base}&to=${quote}`)
      .then(checkStatus)
      .then(json)
      .then(data => {
        if (data.error) {
          throw new Error(data.error);
        }

        const quoteRate = data.rates[quote];

        this.setState({
            quoteAmount: quoteRate,
            loading:false,
        });
      })
      .catch(error => console.error(error.message));
  }

  render() {
      const { baseAcronym, baseAmount, quoteAcronym, quoteAmount, loading} = this.state;

    return (
      <React.Fragment>
        <form>
            <h4 className="text-center">Direct Currency Exchange</h4>
            <div className="row">
                <div className="form-group col-4">
                    <label className="amountLabel">Amount</label>
                    <input className="form-control" type="number" placeholder="Enter amount" value={baseAmount} onChange={this.changeAmount}></input>
                </div>
                <div className="form-group col-4">
                    <label className="fromLabel">Base Currency</label>
                    <select className="form-control" value={baseAcronym} onChange={this.changeBase} disabled={loading}>
                        {Object.keys(currencies).map(currencyAcronym => <option key={currencyAcronym} value={currencyAcronym}>{currencyAcronym}</option>)}
                    </select>
                </div>
                <div className="form-group col-4">
                    <label className="toLabel">Quote Currency</label>
                    <select className="form-control" value={quoteAcronym} onChange={this.changeQuote} disabled={loading}>
                        {Object.keys(currencies).map(currencyAcronym => <option key={currencyAcronym} value={currencyAcronym}>{currencyAcronym}</option>)}
                    </select>
                </div>
            </div>
            <div className="row mt-4">
                <div className="col-6">
                    <p className="beforeConNum">{baseAmount}<span className="mx-2 beforeConVal">{baseAcronym} =</span></p>
                    <p className="afterConNum">{(baseAmount * quoteAmount).toFixed(3)}<span className="mx-2 afterConVal">{quoteAcronym}</span></p>
                </div>
            </div>
        </form>
      </React.Fragment>
    )
  }
}

export default CurrencyConverter