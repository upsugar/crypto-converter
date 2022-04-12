
const ExchangeRate = ({exchangeRate, chosenPrimaryCurrency, chosenTargetCurrency}) => {
    return (
      <div className="exchange-rate">
          <h3>Exchage Rate</h3>
          <h1>{exchangeRate}</h1>
          <p>{chosenPrimaryCurrency} to {chosenTargetCurrency}</p>
      </div>
    )
  }
  
export default ExchangeRate