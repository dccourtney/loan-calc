import HomeEquityLoan from '../src/HomeEquityLoan';

test('Calculate home equity loan payment', () => {
  const loan = new HomeEquityLoan(50000, 4, 15);
  const monthlyPayment = loan.calculateMonthlyPayment();
  expect(monthlyPayment).toBeCloseTo(369.84, 2);
});

test('Calculate amortization schedule with prepayments', () => {
  const loan = new HomeEquityLoan(50000, 4, 15);
  const prepayments = { 12: 2000, 24: 1000 };
  const schedule = loan.calculateAmortizationSchedule(prepayments);
  expect(schedule.length).toBeLessThanOrEqual(180); // Loan should be paid off early
});

test('Calculate overall interest', () => {
  const loan = new HomeEquityLoan(50000, 4, 15);
  const schedule = loan.calculateAmortizationSchedule();
  const overallInterest = loan.calculateOverallInterest(schedule);
  expect(overallInterest).toBeGreaterThan(0);
});
