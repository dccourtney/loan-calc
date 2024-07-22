import Loan from './Loan';

class StudentLoan extends Loan {
  constructor(principal, annualInterestRate, years, additionalCosts = {}, startDate = new Date()) {
    super('student', principal, annualInterestRate, years, additionalCosts, startDate);
  }
}

export default StudentLoan;
