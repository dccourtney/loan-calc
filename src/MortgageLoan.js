import Loan from './Loan';

class MortgageLoan extends Loan {
  constructor(principal, annualInterestRate, years, additionalCosts = {}, startDate = new Date()) {
    super('mortgage', principal, annualInterestRate, years, additionalCosts, startDate);
  }
}

export default MortgageLoan;
