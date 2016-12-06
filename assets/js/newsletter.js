$(document).ready(function(){
  $('#newsletter-success').hide();
  $('#subscribe-newsletter').click(function() {
    var email = $('#newslettermail').val();
    $.ajax({
      type: "POST",
      url: "https://api.entourage.social/api/v1/newsletter_subscriptions",
      data: { "newsletter_subscription": { "email": email, "active": true } },
      success: function(){
        $('#newsletter-success').show();
      },
      error: function(){
        alert("Votre requête n'a pu aboutir, vérifiez le format de l'email");
      }
    });
  });
});
