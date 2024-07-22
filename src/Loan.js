class Loan {
    constructor(type, principal, annualInterestRate, years, additionalCosts = {}, startDate = new Date()) {
      this.type = type;
      this.principal = principal;
      this.annualInterestRate = annualInterestRate;
      this.years = years;
      this.additionalCosts = additionalCosts;
      this.startDate = startDate;
    }
  
    calculateMonthlyPayment() {
      const monthlyInterestRate = this.annualInterestRate / 100 / 12;
      const numberOfPayments = this.years * 12;
      const monthlyPayment = this.principal * monthlyInterestRate / (1 - Math.pow(1 + monthlyInterestRate, -numberOfPayments));
      return parseFloat(monthlyPayment.toFixed(2));
    }
  
    calculateAmortizationSchedule(prepayments = {}) {
      const monthlyInterestRate = this.annualInterestRate / 100 / 12;
      const numberOfPayments = this.years * 12;
      const schedule = [];
      let remainingPrincipal = this.principal;
      let currentDate = new Date(this.startDate);
  
      for (let i = 0; i < numberOfPayments; i++) {
        const interestPayment = remainingPrincipal * monthlyInterestRate;
        const monthlyPayment = this.calculateMonthlyPayment();
        const principalPayment = monthlyPayment - interestPayment;
  
        // Apply prepayments
        if (prepayments[i + 1]) {
          remainingPrincipal -= prepayments[i + 1];
        }
  
        remainingPrincipal -= principalPayment;
  
        // Consider additional costs (e.g., HOA, taxes)
        const additionalCost = this.getAdditionalCostsPerMonth(i + 1);
  
        schedule.push({
          month: i + 1,
          date: new Date(currentDate),
          monthlyPayment,
          principalPayment: parseFloat(principalPayment.toFixed(2)),
          interestPayment: parseFloat(interestPayment.toFixed(2)),
          additionalCost,
          totalPayment: parseFloat((monthlyPayment + additionalCost).toFixed(2)),
          remainingPrincipal: Math.max(parseFloat(remainingPrincipal.toFixed(2)), 0)
        });
  
        // Increment date by one month
        currentDate.setMonth(currentDate.getMonth() + 1);
  
        // Stop if the loan is paid off
        if (remainingPrincipal <= 0) break;
      }
  
      return schedule;
    }
  
    getAdditionalCostsPerMonth(month) {
      const { hoa = { amount: 0, frequency: 'monthly' }, taxes = { amount: 0, frequency: 'yearly' }, insurance = { amount: 0, frequency: 'yearly' } } = this.additionalCosts;
      
      const hoaCost = hoa.frequency === 'monthly' ? hoa.amount : hoa.amount / 12;
      const taxesCost = taxes.frequency === 'monthly' ? taxes.amount : taxes.amount / 12;
      const insuranceCost = insurance.frequency === 'monthly' ? insurance.amount : insurance.amount / 12;
  
      return parseFloat((hoaCost + taxesCost + insuranceCost).toFixed(2));
    }
  
    calculateOverallInterest(amortizationSchedule) {
      return parseFloat(amortizationSchedule.reduce((acc, payment) => acc + payment.interestPayment, 0).toFixed(2));
    }
  }
  
  export default Loan;
  