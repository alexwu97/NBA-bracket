function getPrediction(){
    $(".text").hide();
    var searchedID = $("#search-box").val();
    $.ajax({
        type: "GET",
        url: "/display/" + searchedID,
        success: function (result){
            console.log(result.predictionList);
            if(result){
               $(".visible").show();
               populateBracket(result);
            }else{
               $(".text").show();
            }
        },
        error: function(){
            console.log("fail");
        }
    });
}

function populateBracket(data){
    let predictionList = data.predictionList;
    for(i = 0; i < predictionList.length; i++){
        let teamLocation = $(".matchup").children().eq(i);
        teamLocation.children(".team-name").text(predictionList[i].teamName);
        teamLocation.children(".scoreVal").text(predictionList[i].score);
        teamLocation.attr('id', predictionList[i].teamID);
    }
}