"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var Loan = /*#__PURE__*/function () {
  function Loan(type, principal, annualInterestRate, years) {
    var additionalCosts = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};
    var startDate = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : new Date();
    _classCallCheck(this, Loan);
    this.type = type;
    this.principal = principal;
    this.annualInterestRate = annualInterestRate;
    this.years = years;
    this.additionalCosts = additionalCosts;
    this.startDate = startDate;
  }
  return _createClass(Loan, [{
    key: "calculateMonthlyPayment",
    value: function calculateMonthlyPayment() {
      var monthlyInterestRate = this.annualInterestRate / 100 / 12;
      var numberOfPayments = this.years * 12;
      var monthlyPayment = this.principal * monthlyInterestRate / (1 - Math.pow(1 + monthlyInterestRate, -numberOfPayments));
      return parseFloat(monthlyPayment.toFixed(2));
    }
  }, {
    key: "calculateAmortizationSchedule",
    value: function calculateAmortizationSchedule() {
      var prepayments = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var monthlyInterestRate = this.annualInterestRate / 100 / 12;
      var numberOfPayments = this.years * 12;
      var schedule = [];
      var remainingPrincipal = this.principal;
      var currentDate = new Date(this.startDate);
      for (var i = 0; i < numberOfPayments; i++) {
        var interestPayment = remainingPrincipal * monthlyInterestRate;
        var monthlyPayment = this.calculateMonthlyPayment();
        var principalPayment = monthlyPayment - interestPayment;

        // Apply prepayments
        if (prepayments[i + 1]) {
          remainingPrincipal -= prepayments[i + 1];
        }
        remainingPrincipal -= principalPayment;

        // Consider additional costs (e.g., HOA, taxes)
        var additionalCost = this.getAdditionalCostsPerMonth(i + 1);
        schedule.push({
          month: i + 1,
          date: new Date(currentDate),
          monthlyPayment: monthlyPayment,
          principalPayment: parseFloat(principalPayment.toFixed(2)),
          interestPayment: parseFloat(interestPayment.toFixed(2)),
          additionalCost: additionalCost,
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
  }, {
    key: "getAdditionalCostsPerMonth",
    value: function getAdditionalCostsPerMonth(month) {
      var _this$additionalCosts = this.additionalCosts,
        _this$additionalCosts2 = _this$additionalCosts.hoa,
        hoa = _this$additionalCosts2 === void 0 ? {
          amount: 0,
          frequency: 'monthly'
        } : _this$additionalCosts2,
        _this$additionalCosts3 = _this$additionalCosts.taxes,
        taxes = _this$additionalCosts3 === void 0 ? {
          amount: 0,
          frequency: 'yearly'
        } : _this$additionalCosts3,
        _this$additionalCosts4 = _this$additionalCosts.insurance,
        insurance = _this$additionalCosts4 === void 0 ? {
          amount: 0,
          frequency: 'yearly'
        } : _this$additionalCosts4;
      var hoaCost = hoa.frequency === 'monthly' ? hoa.amount : hoa.amount / 12;
      var taxesCost = taxes.frequency === 'monthly' ? taxes.amount : taxes.amount / 12;
      var insuranceCost = insurance.frequency === 'monthly' ? insurance.amount : insurance.amount / 12;
      return parseFloat((hoaCost + taxesCost + insuranceCost).toFixed(2));
    }
  }, {
    key: "calculateOverallInterest",
    value: function calculateOverallInterest(amortizationSchedule) {
      return parseFloat(amortizationSchedule.reduce(function (acc, payment) {
        return acc + payment.interestPayment;
      }, 0).toFixed(2));
    }
  }]);
}();
var _default = exports["default"] = Loan;