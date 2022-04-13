import { useState } from 'react'
import ExchangeRate from "./ExchangeRate"
import axios from 'axios'

function CurrencyConverter() {
    const currencies = ['BTC', 'ETH', 'USD', 'XRP', 'RUB', 'LTC', 'ADA', 'LUNA', 'DOGE', 'SOL', 'BNB', 'USDT', 'USDC', 'AVAX', 'BUSD', 'DOT', 'SHIB', 'MATIC']
    var [chosenPrimaryCurrency, setChosenPrimaryCurrency] = useState('BTC')
    var [chosenTargetCurrency, setChosenTargetCurrency] = useState('BTC')
    var [amount, setAmount] = useState(1)
    var [exchangeRate, setExchangeRate] = useState(0)
    var [result, setResult] = useState(0)

    console.log(amount)

    const convert = () => {

        var options = {
          method: 'GET',
          url: 'https://alpha-vantage.p.rapidapi.com/query',
          params: {from_currency: chosenPrimaryCurrency, function: 'CURRENCY_EXCHANGE_RATE', to_currency: chosenTargetCurrency},
          headers: {
            'x-rapidapi-host': 'alpha-vantage.p.rapidapi.com',
            'x-rapidapi-key': '4e888dc983msh6087ca5f322894fp1067e6jsn02742bbc31bd'
          }
        }

        axios.request(options).then((response) => {
            console.log(response.data['Realtime Currency Exchange Rate']['5. Exchange Rate'])
            setExchangeRate(response.data['Realtime Currency Exchange Rate']['5. Exchange Rate'])
            setResult(response.data['Realtime Currency Exchange Rate']['5. Exchange Rate'] * amount)
        }).catch((error) => {
            console.error(error)
        })
    }

    console.log(exchangeRate)

    return (
      <div className="currency-converter">
          <h2>Currency Converter</h2>

        <div className="input-box">

            <table>
                <tbody>
                    <tr>
                        <td>From </td>
                        <td>
                            <input
                            type="number"
                            name="currency-amount-1"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            />
                        </td>
                        <td>
                            <select
                                value={chosenPrimaryCurrency}
                                name="currency-option-1"
                                className="currency-options"
                                onChange={(e) => setChosenPrimaryCurrency(e.target.value)}
                            >
                                {currencies.map((currency, _index) => (<option key={_index}>{currency}</option>))}
                            </select>

                        </td>
                    </tr>
                    <tr>
                        <td>To </td>
                        <td>
                            <input
                            name="currency-amount-2"
                            value={result}
                            disabled={true}
                            />
                        </td>
                        <td>
                            <select
                                value={chosenTargetCurrency}
                                name="currency-option-2"
                                className="currency-options"
                                onChange={(e) => setChosenTargetCurrency(e.target.value)}
                            >

                            {currencies.map((currency, _index) => (<option key={_index}>{currency}</option>))}
                            </select>
                        </td>
                    </tr>
                </tbody>
            </table>

            <button className="convert-button" id="convert-button" onClick={convert}>Convert</button>



        </div>


          <ExchangeRate
          exchangeRate={exchangeRate}
          chosenPrimaryCurrency={chosenPrimaryCurrency}
          chosenTargetCurrency={chosenTargetCurrency}
          />
      </div>
    )
  }

  export default CurrencyConverter
