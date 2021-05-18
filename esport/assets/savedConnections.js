$(document).ready(function() {

    // Onclicks for buttons: update and delete
    $('.buttons').click( "click", function(){

        if (this.name == 'update') {
            location.replace('/connections');
            
        }
        else {
            location.replace('/savedConnections');
            
        }
    });
});

    