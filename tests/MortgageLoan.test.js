import MortgageLoan from '../src/MortgageLoan';

test('Calculate mortgage payment', () => {
  const loan = new MortgageLoan(200000, 5, 30);
  const monthlyPayment = loan.calculateMonthlyPayment();
  expect(monthlyPayment).toBeCloseTo(1073.64, 2);
});

test('Calculate amortization schedule with prepayments', () => {
  const loan = new MortgageLoan(200000, 5, 30);
  const prepayments = { 12: 10000, 24: 5000 };
  const schedule = loan.calculateAmortizationSchedule(prepayments);
  expect(schedule.length).toBeLessThanOrEqual(360); // Loan should be paid off early
});

test('Calculate overall interest', () => {
  const loan = new MortgageLoan(200000, 5, 30);
  const schedule = loan.calculateAmortizationSchedule();
  const overallInterest = loan.calculateOverallInterest(schedule);
  expect(overallInterest).toBeGreaterThan(0);
});

test('Calculate total payment with additional costs (monthly and yearly)', () => {
  const loan = new MortgageLoan(200000, 5, 30, { 
    hoa: { amount: 100, frequency: 'monthly' }, 
    taxes: { amount: 2400, frequency: 'yearly' }, 
    insurance: { amount: 600, frequency: 'yearly' } 
  });
  const schedule = loan.calculateAmortizationSchedule();
  expect(schedule[0].totalPayment).toBeCloseTo(1073.64 + 100 + 200 + 50, 2); // Monthly payment + additional costs
});
