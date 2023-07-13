import React, { useState } from 'react';

import './App.css';
import logo from './logo.svg';

function App() {
  const [monthlyPayment, setMonthlyPayment] = useState('');
  const [totalPayment, setTotalPayment] = useState('');
  const [totalInterest, setTotalInterest] = useState('');

  function onSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);

    // Extracting form input values
    const loanAmount = parseFloat(formData.get('loan-amount'));
    const monthlyInterestRate =
      parseFloat(formData.get('interest-rate')) / 100 / 12;
    const loanTermInMonths =
      parseFloat(formData.get('loan-term')) * 12;

    // Calculating mortgage values
    const monthlyPaymentAmount =
      (loanAmount * monthlyInterestRate) /
      (1 - 1 / Math.pow(1 + monthlyInterestRate, loanTermInMonths));
    const totalPayment = monthlyPaymentAmount * loanTermInMonths;

    const currencyFormatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    });

    // Formatting and updating state with calculated values
    setMonthlyPayment(currencyFormatter.format(monthlyPaymentAmount));
    setTotalPayment(currencyFormatter.format(totalPayment));
    setTotalInterest(currencyFormatter.format(totalPayment - loanAmount));
  }

  return (
    <div className="container">
      <div className="calculator">
        <h2>Mortgage Calculator</h2>
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="amount">Amount ($): </label>
            <input
              type="number"
              name="loan-amount"
              defaultValue="100000"
              min="1"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="loan-term">Loan term (in years): </label>
            <input
              type="number"
              name="loan-term"
              defaultValue="30"
              min="1"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="interest-rate">Interest Rate (%): </label>
            <input
              type="number"
              name="interest-rate"
              defaultValue="3"
              step="0.01"
              min="0.01"
              required
            />
          </div>

          <button type="submit">Calculate</button>
        </form>

        <hr
          style={{ width: '100%', overflow: 'hidden', color: 'grey', margin: '40px 0px' }}
        />

        <div className="mortgage-calculator-results">
          <div className='results'>
            Monthly Payment Amount: <strong>{monthlyPayment}</strong>
          </div>

          <div className='results'>
            Total Payment Amount: <strong>{totalPayment}</strong>
          </div>

          <div className='results'>
            Total Interest Paid: <strong>{totalInterest}</strong>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
