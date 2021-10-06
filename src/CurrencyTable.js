import React from 'react';
import './CurrencyTable.css'
import currencies from './currencies';

const CurrencyTable = (props) => {
    const {base, rates, loading, amount, changeBase, changeAmount} = props;
    if (!rates) {
        return null;
    }
    return (
        <div className="row">
            <div className="col-3">
                <form className="formTag">
                    <div className="form-group">
                        <label className="currencyLabel">Currency Amount</label>
                        <input className="form-control form-control-lg mb-3 tableAmountInput" type="number" placeholder="Enter amount"
                             value={amount} onChange={changeAmount}></input>
                    </div>
                    <div className="form-group">
                        <label className="amountLabel">Base Currency</label>
                        <select className="form-control form-control-lg tableBaseInput" value={base} onChange={changeBase} disabled={loading}>
                            {Object.keys(currencies).map(currencyAcronym => <option key={currencyAcronym} value={currencyAcronym}>{currencyAcronym}</option>)}
                        </select>
                    </div>
                </form>
            </div>
            <div className="col-9 verDiv table-responsive">
                <h4 className="text-center">Base Currency Rates Table</h4>
                <table className="table table-striped currencyTable">
                    <thead>
                        <tr className="tableHeadRow">
                            <th scope="col" className="horDiv">Name of currencies</th>
                            <th scope="col" className="horDiv rightCol">Rate of currencies</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rates.map(currency =>
                            <tr key={currency.acronym} className="tableBodyRow">
                                <td>{currency.name} <small>({currency.acronym})</small></td>
                                <td className="rightCol">{currency.rate.toFixed(6)}</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default CurrencyTable;