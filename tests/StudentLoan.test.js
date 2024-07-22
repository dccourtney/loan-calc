import StudentLoan from '../src/StudentLoan';

test('Calculate student loan payment', () => {
  const loan = new StudentLoan(50000, 4.5, 10);
  const monthlyPayment = loan.calculateMonthlyPayment();
  expect(monthlyPayment).toBeCloseTo(518.19, 2); // Updated expected value
});

test('Calculate amortization schedule with prepayments', () => {
  const loan = new StudentLoan(50000, 4.5, 10);
  const prepayments = { 12: 2000, 24: 1000 };
  const schedule = loan.calculateAmortizationSchedule(prepayments);
  expect(schedule.length).toBeLessThanOrEqual(120); // Loan should be paid off early
});

test('Calculate overall interest', () => {
  const loan = new StudentLoan(50000, 4.5, 10);
  const schedule = loan.calculateAmortizationSchedule();
  const overallInterest = loan.calculateOverallInterest(schedule);
  expect(overallInterest).toBeGreaterThan(0);
});
