var obj = {firstname: "cool", lastname: "bad"};
var myjson = JSON.stringify(obj);
var newobj;



function sendData(){
    $.ajax({
        type: "POST",
        url: "/groot",
        data: myjson,
        contentType: "application/json",
        success: function (result){
            newobj = result;
            document.getElementById("fat").innerHTML = newobj.firstname;

        },
        error: function(){
            console.log("no reason");
        }
    });
}

function greeting(){
    document.getElementById("fat").innerHTML = newobj.firstname;
}

function hideFunct(x){
    document.getElementById(x).style.display = "block";
    // Get the modal
    var modal = document.getElementById(x);

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

}



