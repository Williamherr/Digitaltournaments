
$(document).ready(function() {
    //Saves title name into a global storage and sends the user to connectionDetail.html
    $("div a").click(function()  {
        //Gets the url for the file clicked on
        localStorage.setItem('titleName', $(this).attr('title'));
        location.href = '/connectionDetail';
    });
});


    