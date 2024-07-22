import Loan from '../src/Loan';

test('Calculate loan payment', () => {
  const loan = new Loan('generic', 200000, 5, 30);
  const monthlyPayment = loan.calculateMonthlyPayment();
  expect(monthlyPayment).toBeCloseTo(1073.64, 2);
});
