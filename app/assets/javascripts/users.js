/* global $, global Stripe */
//Document ready
$(document).on('turbolinks:load', function(){
  var theForm = $('#pro_form'); //<--sets theForm variable for jquery as the pro_form element
  var submitBtn = $('#form-submit-btn');
  //Set Stripe public key
  Stripe.setPublishableKey( $('meta[name="stripe-key"]').attr('content') ); //<== jQuery syntax, $(...) uses css selectors to refer to meta tag from html
  
  //When user clicks form submit
  
  submitBtn.click(function(event){
    event.preventDefault();
    //prevent default submission behavior
    
    var ccNum = $('#card_number').val(),  //<- .val returns the value inside the card_number element 
      cvcNum =$('#card_code').val(),
      expMonth =$('#card_month').val(),
      expYear =$('#card_year').val();
    //collect the credit card fields
    
    Stripe.createToken({
      number: ccNum,
      cvc: cvcNum,
      exp_month: expMonth,
      exp_year: expYear
    }, stripeResponseHandler);
    //send the card info to Stripe
  
    
  });
  
  
  //Stripe will return card token.
  //Inject card token as hidden field into form
  //submit form to rails
});
