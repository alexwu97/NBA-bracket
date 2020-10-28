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
    var predictionList = data.predictionList;
    for(i = 0; i < predictionList.length; i++){
        $(".matchup").children().eq(i).children(".team-name").text(predictionList[i].teamName);
        $(".matchup").children().eq(i).children(".scoreVal").text(predictionList[i].score);
        $(".matchup").children().eq(i).attr('id', predictionList[i].teamID);
    }
}