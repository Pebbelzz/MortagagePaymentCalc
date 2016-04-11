
var initialLoan;
var years;
var months;
var interest;
var payment = 0;
var extra;

function loanGrab(){
    initialLoan = Number($('#loanAmount').val());
    years = Number($('#loanYears').val());
    months = years * 12;
    interest = $('#loanInterest').val();
    extra = $('#extraMoney').val();
    extra = Number(extra);
    $('#paymentsTable').find('tr:gt(0)').remove();
    payment = 0;
    calcPayment(initialLoan, months, interest);
}

function calcPayment(principle, numPayments, percent){
  //make sure values are integers
  percent = Number(percent) * 0.01;

  //formulas to calculate monthly payment amount
  var monthlyRate = percent/12;
  var powerCalc = Math.pow((1 + monthlyRate), numPayments);
  var secondCalc = (monthlyRate * powerCalc)/(powerCalc - 1);
  var monthlyPayment = (principle * secondCalc).toFixed(2);

  //function calculates what is paid on the principle and
  //in interest each payment
  function calcSplit(monthlyPayment, monthlyRate, principle){
    payment = payment + 1;
    var interestPaid = (principle * monthlyRate).toFixed(2);
    paidOnPrinciple = (monthlyPayment - interestPaid).toFixed(2);
    principle = (principle - paidOnPrinciple - extra).toFixed(2);
    $('#paymentsTable tr:last').after('<tr><td>' + payment +
      '</td><td>' + monthlyPayment + '</td><td>' + paidOnPrinciple +
      '</td><td>' + interestPaid + '</td><td>' + principle + '</td>');
    //call calcSplit again if payment is not over the total
    //number of payments

    if(payment < numPayments && principle > 0){
      calcSplit(monthlyPayment, monthlyRate, principle);
    }

  };

  calcSplit(monthlyPayment, monthlyRate, principle);
}
