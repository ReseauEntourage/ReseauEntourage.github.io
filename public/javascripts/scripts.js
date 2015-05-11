;

// BEGIN USEFUL FUNCTIONS
function ajaxBeforesend (element) {
  var temp_element = element;
  var buttonLoading = function buttonLoading (btn) {
    if($(btn).data('loading-text'))
      $(btn).button('loading');
  };

  if($(element).is('form'))
   temp_element = $(element).find('[type=submit]');

 if($(temp_element).size() > 1)
   $(temp_element).each(buttonLoading);
 else
   buttonLoading(temp_element);

 $('*').addClass('is-loading');
}
function ajaxAlways (element) {
  var temp_element = element;
  var resetButton = function resetButton (btn) {
    $(btn).button('reset');
  };

  if($(element).is('form'))
   temp_element = $(element).find('[type=submit]');

 if($(temp_element).size() > 1)
   $(temp_element).each(resetButton);
 else
   resetButton(temp_element);

 $('*').removeClass('is-loading');
}
function ajaxError ($form) {
  var $message = createFlashMessage('Une erreur inattendue s\'est produite!', 'danger');
  var findErrorDiv = function findErrorDiv() { return $form.find('.error-message') };

  $form.addClass('has-error');

  if(findErrorDiv().size() == 0)
   $form.append('<div class="error-message">' + $message + '</div>')
 else
   findErrorDiv().html($message);
}
function createFlashMessage (message, level) {
  return '<div class="alert alert-'+level+' fade in" data-alert="alert">'+message+'</div>';
}
// END USEFUL FUNCTIONS

// BEGIN BIND ON AJAX JSON-FORM
function bindJsonForm () {
  $('.form-json').on('submit', function (event) {
    var $form = $(this);
    event.preventDefault();

    $.ajax({
      url: $form.attr('action'),
      type: $form.attr('method'),
      crossDomain: true,
      data: $form.serialize(),
      dataType: 'json',
      beforeSend: function() { ajaxBeforesend($form) }
    }).done(function (data, status, xhr) {
      $form.fadeOut(400, function bindJsonForm_onDone() {
        $form.html(createFlashMessage('<strong>Merci !</strong> Votre email a bien été enregistré !', 'success')).fadeIn(400);
      });
    }).fail(function () {
      ajaxError($form);
    }).always(function () {
      ajaxAlways($form);
    });
  });
}
// END BIND ON AJAX JSON-FORM

jQuery(document).ready(function ( $ ) {
  // BEGIN CALLS
  // END CALLS

  // BEGIN BINDS
  bindJsonForm();
  // END BINDS

  // BEGIN MANUAL BINDS
  // END MANUAL BINDS
});
