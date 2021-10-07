import React from "react";
import {checkStatus, json} from './utils';
import currencies from "./currencies";
import CurrencyTable from "./CurrencyTable";

class Home extends React.Component {
    constructor() {
        super();
        this.state = {
            base: 'USD',
            amount: 1,
            rates: null,
            loading: true,
        }

    }

    componentDidMount() {
        this.fetchTableData(this.state.base);
    }

    changeBase = (event) => {
        this.setState({ base: event.target.value });
        this.fetchTableData(event.target.value);
    }

    changeAmount = (event) => {
        const newAmount = event.target.value;
        const currentRates = this.state.rates;
        console.log(newAmount);
        console.log(currentRates);

        const newRates = currentRates.map(newRate => ({
            acronym: newRate.acronym,
            rate: newAmount * newRate.rate,
            name:currencies[newRate.acronym].name
        }))
        console.log(newRates);



        this.setState({ amount: event.target.value, rates: newRates });
    }

    fetchTableData = (base) => {
        this.setState({ loading: true });
        fetch(`https://altexchangerateapi.herokuapp.com/latest?from=${base}`)
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
      
                this.setState({ rates: currencyRates, loading: false });
            })
            .catch(response => console.error(response.message));
        
    }

    render () {
        const { base, amount, rates, loading } = this.state;

        return (
            <React.Fragment>
                <div className="container-fluid">
                    <CurrencyTable key={base} base={base} changeBase={this.changeBase} amount={amount} changeAmount={this.changeAmount} 
                        rates={rates} loading={loading} />
                </div>
            </React.Fragment>
        )
    }
}

export default Home;