(function($) {          
$(document).ready(function(){           
  $('#newsletter-success').hide();
    $('#subscribe-newsletter').click(function() {
      var email = $('#newlettermail').val();
      $.ajax({
        type: "POST",
        url: "https://entourage-back-preprod.herokuapp.com/api/v1/newsletter_subscriptions",
        data: { "newsletter_subscription": { "email": email, "active": true } },
        success: function(){
          $('#newsletter-success').show();
        },
        error: function(){
          alert("Votre requête n'a pu aboutir, vérifier le format de l'email");
        }
      });
    });
});
})(jQuery);