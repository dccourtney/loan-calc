import Loan from './Loan';

class HomeEquityLoan extends Loan {
  constructor(principal, annualInterestRate, years, additionalCosts = {}, startDate = new Date()) {
    super('homeEquity', principal, annualInterestRate, years, additionalCosts, startDate);
  }
}

export default HomeEquityLoan;
