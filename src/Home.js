import React from "react";
import {checkStatus, json} from './utils';
import currencies from "./currencies";
import CurrencyTable from "./CurrencyTable";
import CurrencyConverter from "./CurrencyConverter";

class Home extends React.Component {
    constructor() {
        super();
        this.state = {
            base: 'USD',
            amount: 1,
            rates: null,
            loading: true,
            baseConversion: 'MXN',
            toConversion: 'USD',
            amountConversion: 20,
            rateConversion: 0,
            loadingConversion: true,
        }

    }

    componentDidMount() {
        this.fetchTableData(this.state.amount, this.state.base);
        this.fetchConverterData(this.state.amountConversion, this.state.baseConversion, this.state.toConversion);
    }

    changeBase = (event) => {
        this.setState({ base: event.target.value });
        this.fetchTableData(this.state.amount, event.target.value);
    }

    changeBaseConverter = (event) => {
        this.setState({ baseConversion: event.target.value});
        this.fetchConverterData(this.state.amountConversion, event.target.value, this.state.toConversion);
    }

    changeToConverter = (event) => {
        this.setState({ toConversion: event.target.value});
        this.fetchConverterData(this.state.amountConversion, this.state.baseConversion, event.target.value);
    }

    changeAmount = (event) => {
        this.setState({ amount: event.target.value });
        this.fetchTableData(event.target.value, this.state.base);
    }

    changeAmountConverter = (event) => {
        this.setState({ amountConversion: event.target.value });
        this.fetchConverterData(event.target.value, this.state.baseConversion, this.state.toConversion)
    }

    fetchTableData = (amount, base) => {
        this.setState({ loading: true });
        fetch(`https://altexchangerateapi.herokuapp.com/latest?amount=${amount}&from=${base}`)
            .then(checkStatus)
            .then(json)
            .then(response => {
                console.log(response);
                if (response.error) {
                    throw new Error(response.error)
                }

                const currencyRates = Object.keys(response.rates)
                .filter(acronym => acronym !== base)
                .map(acronym => ({
                  acronym,
                  rate: response.rates[acronym],
                  name: currencies[acronym].name,
                }))

                const currencyAmount = response.amount;
      
                this.setState({ rates: currencyRates, amount: currencyAmount, loading: false });
            })
            .catch(response => console.error(response.message));
        
    }

    fetchConverterData = (amount, base, to) => {
        this.setState({ loading: true});
        fetch(`https://altexchangerateapi.herokuapp.com/latest?amount=${amount}&from=${base}&to=${to}`)
            .then(checkStatus)
            .then(json)
            .then(response => {
                console.log(response);
                if (response.error) {
                    throw new Error(response.error)
                }

                const currencyConvertion = response.rates[to];

                this.setState({ amountConversion: amount, baseConversion: base, toConversion: to, rateConversion: currencyConvertion,
                    loadingConversion: false });
            })

    }

    render () {
        const { base, amount, rates, loading, baseConversion, toConversion, amountConversion, rateConversion, loadingConversion } = this.state;

        return (
            <React.Fragment>
                <div className="container-fluid">
                    <CurrencyConverter key={baseConversion} base={baseConversion} changeBase={this.changeBaseConverter} amount={amountConversion}
                        changeAmount={this.changeAmountConverter} to={toConversion} changeTo={this.changeToConverter} rate={rateConversion} loading={loadingConversion}/>
                    <hr></hr>
                    <CurrencyTable key={base} base={base} changeBase={this.changeBase} amount={amount} changeAmount={this.changeAmount} 
                        rates={rates} loading={loading} />
                </div>
            </React.Fragment>
        )
    }
}

export default Home;