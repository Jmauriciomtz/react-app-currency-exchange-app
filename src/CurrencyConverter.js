import React from 'react';
import './CurrencyConverter.css'
import currencies from './currencies';

const CurrencyConverter = (props) => {
    const {base, changeBase, amount, changeAmount, to, changeTo, rate, loading} = props;
    if (!rate) {
        return null;
    }

    return (
        <form>
            <h4 className="text-center">Direct Currency Exchange</h4>
            <div className="row">
                <div className="form-group col-4">
                    <label className="amountLabel">Amount</label>
                    <input className="form-control" type="number" placeholder="Enter amount" value={amount} onChange={changeAmount}></input>
                </div>
                <div className="form-group col-4">
                    <label className="fromLabel">From</label>
                    <select className="form-control" value={base} onChange={changeBase} disabled={loading}>
                        {Object.keys(currencies).map(currencyAcronym => <option key={currencyAcronym} value={currencyAcronym}>{currencyAcronym}</option>)}
                    </select>
                </div>
                <div className="form-group col-4">
                    <label className="toLabel">To</label>
                    <select className="form-control" value={to} onChange={changeTo} disabled={loading}>
                        {Object.keys(currencies).map(currencyAcronym => <option key={currencyAcronym} value={currencyAcronym}>{currencyAcronym}</option>)}
                    </select>
                </div>
            </div>
            <div className="row mt-4">
                <div className="col-6">
                    <p className="beforeConNum">{amount}<span className="mx-2 beforeConVal">{base} =</span></p>
                    <p className="afterConNum">{rate}<span className="mx-2 afterConVal">{to}</span></p>
                </div>
            </div>
        </form>
    )
}

export default CurrencyConverter;