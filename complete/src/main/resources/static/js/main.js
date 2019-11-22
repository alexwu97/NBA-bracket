function reveal(){
    $(".container").addClass("container-reveal");
    $(".center").addClass("center-positioning");
    $(".reveal-button").hide();
}

function testcall(){
    $.ajax({
            type: "GET",
            url: "https://swapi.co/api/planets/1/",
            contentType: "application/json",
            success: function (result){
                console.log(result);
            },
            error: function(){
                console.log("fail");
            }
        });

}