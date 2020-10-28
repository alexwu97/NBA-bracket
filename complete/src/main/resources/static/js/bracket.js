//ensures one input is selected at a time
function enterScore(inputID, region, index){
    if ($(inputID).val() == ""){
        $(inputID).val("0");
    }else if ($(inputID).val() > 4){
        alert("Each series is a best of 7. A team can only have a maximum of 4 wins. Do you mean 4?");
        $(inputID).val("4");
    }else if ($(inputID).val() < 0){
        alert("A team cannot have negative wins.")
        $(inputID).val("0");
    }else{
        $(inputID).val(parseInt($(inputID).val()));
    }

    if(region == ".east"){
        updateEastBracket(index);
    }else{
        updateWestBracket(index);
    }
}

function populateTeam(region, index, side){
    return {
        score: parseInt($(region).children().children(".matchup").eq(index).children().eq(side).children(".value").val()),
        name: $(region).children().children(".matchup").eq(index).children().eq(side).children(".team-name").text(),
        logo: $(region).children().children(".matchup").eq(index).children().eq(side).attr('id')
    };
}

function updateEastBracket(index){
    if(index > 0){
        //get team info for both teams in matchup
        var topTeam = populateTeam(".east", index, 0);
        var botTeam = populateTeam(".east", index, 1);

        //scores for both teams are valid
        if ((topTeam.score == 4 || botTeam.score == 4) && ((topTeam.score + botTeam.score) <= 7)){
            //update top team if it has 4 wins
            if(topTeam.score == 4){
                advanceTeamToNextRound(".east", index, ".scoreinput2", topTeam.name, topTeam.logo);
            }else{ //update bot team if it has 4 wins
                advanceTeamToNextRound(".east", index, ".scoreinput2", botTeam.name, botTeam.logo);
            }
        }else{ //no team found to have 4 wins
            clearTeamInNextRound(".east", index, ".scoreinput2");
        }
        //check next round as well
        updateEastBracket(Math.floor(index /2));
    }
}

function updateWestBracket(index){
    if(index < 7){
        //get team info for both teams in matchup
        var topTeam = populateTeam(".west", index, 0);
        var botTeam = populateTeam(".west", index, 1);

        //scores for both teams are valid
        if ((topTeam.score == 4 || botTeam.score == 4) && ((topTeam.score + botTeam.score) <= 7)){
            //update top team if it has 4 wins
            if(topTeam.score == 4){
                advanceTeamToNextRound(".west", index + 8, ".scoreinput", topTeam.name, topTeam.logo);
            }else{ //update bot team if it has 4 wins
                advanceTeamToNextRound(".west", index + 8, ".scoreinput", botTeam.name, botTeam.logo);
            }
        }else{ //no team found to have 4 wins
            clearTeamInNextRound(".west", index + 8, ".scoreinput");
        }
        //check next round as well
        updateWestBracket(index + Math.floor((8 - index) / 2));
    }
}

//updates team in next round
function advanceTeamToNextRound(region, n, type, advTeam, logo){
    $(region).children().children(".matchup").children().eq(n).children(".team-name").text(advTeam);
    $(region).children().children(".matchup").children().eq(n).attr('id', logo);
    if ($(region).children().children(".matchup").children().eq(n).hasClass("champ")){
        $(region).children().children(".matchup").children().eq(n).children(".value").addClass("scoreinput");
        $(".scoreinput").show();
    }else{
        $(region).children().children(".matchup").children().eq(n).children(".value").addClass(type.slice(1));
        $(type).show();
    }
    $(region).children().children(".matchup").children().eq(n).removeClass("lock");
}

function clearTeamInNextRound(region, n, type){
    $(region).children().children(".matchup").children().eq(n).addClass("lock");
    if ($(region).children().children(".matchup").children().eq(n).hasClass("champ")){
        $(region).children().children(".matchup").children().eq(n).children(".value").removeClass("scoreinput");
    }else{
        $(region).children().children(".matchup").children().eq(n).children(".value").removeClass(type.slice(1));
    }
    $(region).children().children(".matchup").children().eq(n).children(".value").val("0");
    $(region).children().children(".matchup").children().eq(n).children(".value").hide();
    $(region).children().children(".matchup").children().eq(n).children(".team-name").text("");
    $(region).children().children(".matchup").children().eq(n).attr('id', "");
}

//checks if everything is filled in before submission
function submitPrediction(){
    //check if the prediction is complete and valid
    for (j=0; j<15; j++){
        var topTeamScore = parseInt($(".matchup").eq(j).children().eq(0).children(".value").val());
        var botTeamScore = parseInt($(".matchup").eq(j).children().eq(1).children(".value").val());
        if ((topTeamScore < 4 && botTeamScore < 4) || (topTeamScore == 4 && botTeamScore == 4)){
            alert("Please fill in all the scores");
            return;
        }
    }

    //store prediction
    var prediction = [];
    var i;
    for (i=0; i<30; i++){
        prediction.push({
            teamName : $(".matchup").children().eq(i).children(".team-name").text(),
            score : $(".matchup").children().eq(i).children(".value").val(),
            teamID : $(".matchup").children().eq(i).attr("id")
        });
    }
    sendPredictionToServer(prediction);
}

//sends prediction to backend
function sendPredictionToServer(responseBody){
    $.ajax({
        type: "POST",
        url: "/bracket",
        data: JSON.stringify(responseBody),
        contentType: "application/json",
        success: function (responseNumber){
            showDisplay('stats');
            $('#stats > div > p:eq(1)').text("Your reference number is: " + responseNumber);
        },
        error: function(){
            console.log("fail");
        }
    });
}

function showDisplay(x){
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

//highlights the whole input value for user to start entering values right away
$(function(){
    $(document).on('click', 'input[type=number]', function(){this.select();
    });
});