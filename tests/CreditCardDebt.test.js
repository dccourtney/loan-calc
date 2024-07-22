import CreditCardDebt from '../src/CreditCardDebt';

test('Calculate credit card debt payment', () => {
  const loan = new CreditCardDebt(10000, 18, 3);
  const monthlyPayment = loan.calculateMonthlyPayment();
  expect(monthlyPayment).toBeCloseTo(361.52, 2);
});

test('Calculate amortization schedule with prepayments', () => {
  const loan = new CreditCardDebt(10000, 18, 3);
  const prepayments = { 12: 500, 24: 300 };
  const schedule = loan.calculateAmortizationSchedule(prepayments);
  expect(schedule.length).toBeLessThanOrEqual(36); // Loan should be paid off early
});

test('Calculate overall interest', () => {
  const loan = new CreditCardDebt(10000, 18, 3);
  const schedule = loan.calculateAmortizationSchedule();
  const overallInterest = loan.calculateOverallInterest(schedule);
  expect(overallInterest).toBeGreaterThan(0);
});
