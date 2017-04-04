/* global $, global Stripe */
//Document ready.
$(document).on('turbolinks:load', function(){
  var theForm = $('#pro_form'); //<--sets theForm variable for jquery as the pro_form element
  var submitBtn = $('#form-submit-btn');
  Stripe.setPublishableKey( $('meta[name="stripe-key"]').attr('content') ); //<== jQuery syntax, $(...) uses css selectors to refer to meta tag from html
  
  // ---When user clicks form submit--
  
  submitBtn.click(function(event){
    event.preventDefault();
    //prevents default submission behavior
    submitBtn.val("proccessing").prop('disabled', true);
    //disables button during Stripe process
    
    
    var ccNum =$('#card_number').val(),  //<- .val returns the value inside the card_number element 
      cvcNum =$('#card_code').val(),
      expMonth =$('#card_month').val(),
      expYear =$('#card_year').val();
    //collects the credit card fields
    
    var error = false;
    //creates error bool and sets to false
    
    if (! Stripe.card.validateCardNumber(ccNum)) { //<-- bang (!) operator doubles for not
      error = true; //<--if the condition (Stripe.card...) is true the "not if" staement triggers error
      alert('The credit card number appears to be invalid');
    } //^^^validates card number
    if (! Stripe.card.validateCVC(cvcNum)) {
      error = true;
      alert('The CVC appears to be invalid');
    } //^^^validates cvc
    if (! Stripe.card.validateExpiry(expMonth, expYear)) {
      error = true;
      alert('The expiration date appears to be invalid');
    } //^^^validates expiration
    //validates card infor
    
    if (error) {
      submitBtn.prop('disabled', false).val("Sign up");
      //enables button in case of error changes text to def if error bool is true
      
    } else {
      Stripe.createToken(card).then({
        number: ccNum,
        cvc: cvcNum,
        exp_month: expMonth,
        exp_year: expYear
      }, stripeResponseHandler);
    }
    //sends the card info to Stripe  
    return: false; //prevents looping
    
  });
  
  //      ----Stripe returns card token----
  
function stripeResponseHandler(status, response){
  var token = response.id; //<-- retrieves token from Swipe
  theForm.append($('<input type="hidden" name="user[stripe_card_token]">').val(token) ); 
  theForm.get(0).submit(); //.get(0) pulls from the first slot(0) of the plan array
  //submits form to rails based on the plan id
}
});
