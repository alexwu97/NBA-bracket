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



