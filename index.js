$().ready(function() {
    $.get( "https://api.entourage.social/api/v1/stats.json", function( data ) {
      $("#assos_number").text(data["organizations"])
    });
  }
)