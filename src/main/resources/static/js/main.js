$(document).ready(function(){

    $('.parallax').parallax();
    $('.tap-target').tapTarget('open');
    $(".button-collapse").sideNav();

    function onSignIn(googleUser) {
        // Useful data for your client-side scripts:
        var profile = googleUser.getBasicProfile();
        console.log("ID: " + profile.getId()); // Don't send this directly to your server!
        console.log('Full Name: ' + profile.getName());
        console.log('Given Name: ' + profile.getGivenName());
        console.log('Family Name: ' + profile.getFamilyName());
        console.log("Image URL: " + profile.getImageUrl());
        console.log("Email: " + profile.getEmail());

        // The ID token you need to pass to your backend:
        var id_token = googleUser.getAuthResponse().id_token;
        console.log("ID Token: " + id_token);
    };

    $("#show").click( function () {
        $("#wrapper").fadeIn();
        $.ajax({
            url: "http://swapi.co/api/people/?format=json"
        }).done(function(data){
            $("#wrapper").fadeOut();
            $(".alert-success").text("Star wars names loaded");
            $(".alert-success").removeClass("hide");
            data.results.forEach(function(element){
                $("#content").append("<b>Name: </b>"+ element.name + "<br>");
            });
        });
    });
    //ESC key
    $(document).keyup(function(e) {
        //ESC
        if (e.keyCode === 27){
            $("#wrapper").fadeOut();
        }
    });

     function animateLoadText(){
        $text = $("#load-text").text();
        var dotsa = '';
        var interval = setInterval(function() {
            if ((dots += '.').length == 4)
               dots = '';
            $text.html += dots;
        }, 100);
    }

});