
var initialLoan;
var years;
var months;
var interest;
var payment = 0;

function loanGrab(){
    initialLoan = $('#loanAmount').val();
    years = $('#loanYears').val();
    months = years * 12;
    interest = $('#loanInterest').val();
    $('#paymentsTable').find('tr:gt(0)').remove();
    console.log("remove started");
    payment = 0;
    calcPayment(initialLoan, months, interest);
}

function calcPayment(principle, numPayments, percent){
  //make sure values are integers
  principle = Number(principle);
  console.log("principle: ", principle);
  numPayments = Number(numPayments);
  console.log("number of Payments: ", numPayments);
  percent = Number(percent) * 0.01;
  console.log("APR: ", percent);

  //formulas to calculate monthly payment amount
  var monthlyRate = percent/12;
  console.log("Monthly Rate: ", monthlyRate);
  var powerCalc = Math.pow((1 + monthlyRate), numPayments);
  console.log("powerCalc: ", powerCalc);
  var secondCalc = (monthlyRate * powerCalc)/(powerCalc - 1);
  console.log("secondCalc: ", secondCalc);
  var monthlyPayment = (principle * secondCalc).toFixed(2);
  console.log("monthly Payment: ", monthlyPayment);

  //function calculates what is paid on the principle and
  //in interest each payment
  function calcSplit(monthlyPayment, monthlyRate, principle){

    payment = payment + 1;
    console.log(payment);
    var interestPaid = (principle * monthlyRate).toFixed(2);
    console.log("interestPaid: ", interestPaid);
    paidOnPrinciple = (monthlyPayment - interestPaid).toFixed(2);
    console.log("Paid on principle: ", paidOnPrinciple);
    principle = (principle - paidOnPrinciple).toFixed(2);
    console.log("principle: ", principle);
    $('#paymentsTable tr:last').after('<tr><td>' + payment +
      '</td><td>' + monthlyPayment + '</td><td>' + paidOnPrinciple +
      '</td><td>' + interestPaid + '</td><td>' + principle + '</td>');
    console.log(numPayments);
    //call calcSplit again if payment is not over the total
    //number of payments

    if(payment < numPayments){
      calcSplit(monthlyPayment, monthlyRate, principle);
    }

  };

  calcSplit(monthlyPayment, monthlyRate, principle);
}
