import Loan from './Loan';

class CarLoan extends Loan {
  constructor(principal, annualInterestRate, years, additionalCosts = {}, startDate = new Date()) {
    super('car', principal, annualInterestRate, years, additionalCosts, startDate);
  }
}

export default CarLoan;
