//ensures one input is selected at a time
function enterScore(scoreInputID, region, index){
    if ($(scoreInputID).val() == ""){
        $(scoreInputID).val("0");
    }else if ($(scoreInputID).val() > 4){
        alert("Each series is a best of 7. A team can only have a maximum of 4 wins. Do you mean 4?");
        $(scoreInputID).val("4");
    }else if ($(scoreInputID).val() < 0){
        alert("A team cannot have negative wins.")
        $(scoreInputID).val("0");
    }else{
        $(scoreInputID).val(parseInt($(scoreInputID).val()));
    }

    if(region == ".east"){
        updateEastBracket(index);
    }else{
        updateWestBracket(index);
    }
}

function populateTeam(region, index, side){
    let teamLocation = $(region).children().children(".matchup").eq(index).children().eq(side);
    return {
        score: parseInt(teamLocation.children(".value").val()),
        name: teamLocation.children(".team-name").text(),
        logo: teamLocation.attr('id')
    };
}

function updateEastBracket(index){
    if(index <= 0){
        return;
    }
    //get team info for both teams in matchup
    let topTeam = populateTeam(".east", index, 0);
    let botTeam = populateTeam(".east", index, 1);

    //scores for both teams are valid
    if ((topTeam.score == 4 || botTeam.score == 4) && ((topTeam.score + botTeam.score) <= 7)){
        let winningTeam = (topTeam.score == 4) ? topTeam : botTeam;
        advanceTeamToNextRound(".east", index, ".scoreinput2", winningTeam);
    }else{
        //no team found to have 4 wins
        clearTeamInNextRound(".east", index, ".scoreinput2");
    }
    //check next round as well
    updateEastBracket(Math.floor(index / 2));
}

function updateWestBracket(index){
    if(index >= 7){
        return;
    }
    //get both teams' info in a matchup
    let topTeam = populateTeam(".west", index, 0);
    let botTeam = populateTeam(".west", index, 1);

    //scores for both teams are valid
    if ((topTeam.score == 4 || botTeam.score == 4) && ((topTeam.score + botTeam.score) <= 7)){
        let winningTeam = (topTeam.score == 4) ? topTeam : botTeam;
        advanceTeamToNextRound(".west", index + 8, ".scoreinput", winningTeam);
    }else{ //no team found to have 4 wins
        clearTeamInNextRound(".west", index + 8, ".scoreinput");
    }
    //check next round as well
    updateWestBracket(index + Math.floor((8 - index) / 2));
}

//updates team in next round
function advanceTeamToNextRound(region, n, type, advTeam){
    let nextRoundLocation = $(region).children().children(".matchup").children().eq(n);
    nextRoundLocation.children(".team-name").text(advTeam.name);
    nextRoundLocation.attr('id', advTeam.logo);
    if (nextRoundLocation.hasClass("champ")){
        nextRoundLocation.children(".value").addClass("scoreinput");
        $(".scoreinput").show();
    }else{
        nextRoundLocation.children(".value").addClass(type.slice(1));
        $(type).show();
    }
    nextRoundLocation.removeClass("lock");
}

function clearTeamInNextRound(region, n, type){
    let nextRoundLocation = $(region).children().children(".matchup").children().eq(n);
    nextRoundLocation.addClass("lock");
    if (nextRoundLocation.hasClass("champ")){
        nextRoundLocation.children(".value").removeClass("scoreinput");
    }else{
        nextRoundLocation.children(".value").removeClass(type.slice(1));
    }
    nextRoundLocation.children(".value").val("0");
    nextRoundLocation.children(".value").hide();
    nextRoundLocation.children(".team-name").text("");
    nextRoundLocation.attr('id', "");
}

//checks if everything is filled in before submission
function submitPrediction(){
    //check if the prediction is complete and valid
    for (j=0; j<15; j++){
        let topTeamScore = parseInt($(".matchup").eq(j).children().eq(0).children(".value").val());
        let botTeamScore = parseInt($(".matchup").eq(j).children().eq(1).children(".value").val());
        if ((topTeamScore < 4 && botTeamScore < 4) || (topTeamScore == 4 && botTeamScore == 4)){
            alert("Please fill in all the scores");
            return;
        }
    }

    let prediction = [];
    for (i=0; i<30; i++){
        let teamLocation = $(".matchup").children().eq(i);
        prediction.push({
            teamName : teamLocation.children(".team-name").text(),
            score : teamLocation.children(".value").val(),
            teamID : teamLocation.attr("id")
        });
    }
    sendPredictionToServer(prediction);
}

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
    let modal = document.getElementById(x);

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