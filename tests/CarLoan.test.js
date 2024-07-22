import CarLoan from '../src/CarLoan';

test('Calculate car loan payment', () => {
  const loan = new CarLoan(30000, 3, 5);
  const monthlyPayment = loan.calculateMonthlyPayment();
  expect(monthlyPayment).toBeCloseTo(539.06, 2);
});

test('Calculate amortization schedule with prepayments', () => {
  const loan = new CarLoan(30000, 3, 5);
  const prepayments = { 12: 1000, 24: 500 };
  const schedule = loan.calculateAmortizationSchedule(prepayments);
  expect(schedule.length).toBeLessThanOrEqual(60); // Loan should be paid off early
});

test('Calculate overall interest', () => {
  const loan = new CarLoan(30000, 3, 5);
  const schedule = loan.calculateAmortizationSchedule();
  const overallInterest = loan.calculateOverallInterest(schedule);
  expect(overallInterest).toBeGreaterThan(0);
});
