
var initialLoan;
var years;
var months;
var interest;
var payment = 0;
var extra;
var totalInterest = 0;
var totalOrigInterest = 0;

function loanGrab(){
    initialLoan = Number($('#loanAmount').val());
    years = Number($('#loanYears').val());
    months = years * 12;
    interest = $('#loanInterest').val();
    extra = $('#extraMoney').val();
    extra = Number(extra);
    totalInterest = 0;
    totalOrigInterest = 0;
    console.log("totalInterest at start of functions: ", totalInterest);
    payment = 0;
    calcPayment(initialLoan, months, interest);
}

//resets info in window upon button click for either submit or reset
function resetRemove(){
  $('#paymentsTable').find('tr:gt(0)').remove();
  $('#origInfo').empty();
  $('#extraInfo').empty();
}

function calcPayment(principle, numPayments, percent){
  //make sure values are integers
  percent = Number(percent) * 0.01;

  //formulas to calculate monthly payment amount
  var monthlyRate = percent/12;
  var powerCalc = Math.pow((1 + monthlyRate), numPayments);
  var secondCalc = (monthlyRate * powerCalc)/(powerCalc - 1);
  var monthlyPayment = (principle * secondCalc).toFixed(2);

  //function to get payment split with no extra money added
  function untouchedLoan(){
    var origPayments = numPayments;
    var installment = 0;
    var origPrinciple = principle;
    var interestPerMonth = monthlyRate;
    var interestOrigPaid;
    var paidOrigPrinciple;

      function calcOrig(){
        installment = installment + 1;
        interestOrigPaid = Number((origPrinciple * interestPerMonth).toFixed(2));
        totalOrigInterest = (totalOrigInterest + interestOrigPaid);
        paidOrigPrinciple = (monthlyPayment - interestOrigPaid).toFixed(2);
        origPrinciple = (origPrinciple - paidOrigPrinciple).toFixed(2);
        if(installment < origPayments && origPrinciple > 0){
          calcOrig();
        }
      }
    calcOrig();
    $('#origInfo').html('<b>Total Payments Originally: </b>' +
    origPayments +
    '<p><b>Total Interes Paid w/o Extra: </b>$' + totalOrigInterest.toFixed(2));
    }
  untouchedLoan();


  //function calculates what is paid on the principle and
  //in interest each payment
  function calcSplit(monthlyPayment, monthlyRate, principle){
    payment = payment + 1;
    var interestPaid = Number((principle * monthlyRate).toFixed(2));
    totalInterest = totalInterest + interestPaid;
    paidOnPrinciple = (monthlyPayment - interestPaid + extra).toFixed(2);
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


  //add savings details if extraMoney field is greater than 0
  function loanDetail(){
    var paymentsSaved = numPayments - payment;
    var interestSaved = (totalOrigInterest - totalInterest).toFixed(2);
    console.log("totalInterest: final ", totalInterest);
    if(extra > 0){
      $('#extraInfo').html('<h4><b>Saved with Extra Money:</b></h4>' +
        '<p><b>Payments saved: </b>' +
        paymentsSaved + '<br>' +
        '<b>Interest Saved: </b>$' + interestSaved + '</p>');
    }
  };

  calcSplit(monthlyPayment, monthlyRate, principle);
  loanDetail();
}
