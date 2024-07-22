# Loan Calculator

  

A JavaScript library for calculating mortgages, car loans, and personal loans with advanced features.

  

## Installation

  

```bash
npm  install  loan-calc
```
  

## Usage

  

```javascript

import { MortgageLoan, CarLoan, StudentLoan, HomeEquityLoan, CreditCardDebt } from 'loan-calc';

  

const mortgage = new MortgageLoan(200000, 5, 30, {

hoa: { amount: 100, frequency: 'monthly' },

taxes: { amount: 2400, frequency: 'yearly' },

insurance: { amount: 600, frequency: 'yearly' }

});

const carLoan = new CarLoan(30000, 3, 5);

const studentLoan = new StudentLoan(50000, 4.5, 10);

const homeEquityLoan = new HomeEquityLoan(50000, 4, 15);

const creditCardDebt = new CreditCardDebt(10000, 18, 3);

  

// Calculate Monthly Payments

console.log('Mortgage Payment:', mortgage.calculateMonthlyPayment());

console.log('Car Loan Payment:', carLoan.calculateMonthlyPayment());

console.log('Student Loan Payment:', studentLoan.calculateMonthlyPayment());

console.log('Home Equity Loan Payment:', homeEquityLoan.calculateMonthlyPayment());

console.log('Credit Card Debt Payment:', creditCardDebt.calculateMonthlyPayment());

  

// Calculate Amortization Schedule

const prepayments = { 12: 10000, 24: 5000 };

const schedule = mortgage.calculateAmortizationSchedule(prepayments);

console.log('Amortization Schedule:', schedule);

  

// Calculate Overall Interest

const overallInterest = mortgage.calculateOverallInterest(schedule);

console.log('Overall Interest:', overallInterest);

  

// Example Schedule Output

schedule.forEach(payment => {

console.log(`Month: ${payment.month}, Date: ${payment.date.toISOString().slice(0, 10)}, Total Payment: ${payment.totalPayment}, Remaining Principal: ${payment.remainingPrincipal}`);

});
```