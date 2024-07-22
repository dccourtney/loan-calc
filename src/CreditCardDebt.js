import Loan from './Loan';

class CreditCardDebt extends Loan {
  constructor(principal, annualInterestRate, years, additionalCosts = {}, startDate = new Date()) {
    super('creditCard', principal, annualInterestRate, years, additionalCosts, startDate);
  }
}

export default CreditCardDebt;
