function inputFunc(inputID){
    $(".scoreinput").hide();
    $(".scoreinput2").hide();
    $(".score2").show();
    $(".score").show();
    $(inputID).val("");
    $(inputID).show();
    $(this).hide();
}

function outputFunc(spanID, inputID, side){
    $(inputID).hide();
    if ($(inputID).val() == ""){
        $(spanID).text("0");
    }else if ($(inputID).val() < 0 || $(inputID).val() > 4){
        alert("number must be between 0 to 4");
    }else{
        $(spanID).text($(inputID).val());
    }

    $(spanID).show();
    nextLvlCheck(side);

}

function nextLvlCheck(side){
    var topTeamNum;
    var botTeamNum;
    var topTeamName;
    var botTeamName;
    var j;
    for(i = 0; i <= 6; i++){
        j = i;
        if (side == ".east"){
            j = 7 - i;
        }
        topTeamNum = parseInt($(side).children().children(".matchup").eq(j).children().eq(0).children(".value").text());
        topTeamName = $(side).children().children(".matchup").eq(j).children().eq(0).children(".team-name").text();
        botTeamNum = parseInt($(side).children().children(".matchup").eq(j).children().eq(1).children(".value").text());
        botTeamName = $(side).children().children(".matchup").eq(j).children().eq(1).children(".team-name").text();

        if ((topTeamNum == 4 || botTeamNum == 4) && ((topTeamNum + botTeamNum) <= 7)){
            if(topTeamNum == 4){
                if (side == ".east"){
                    bracketAddition(side, j, ".score2", topTeamName);
                }else{
                    bracketAddition(side, j+8, ".score", topTeamName);
                }
            }else{
                if (side == ".east"){
                    bracketAddition(side, j, ".score2", botTeamName);
                }else{
                    bracketAddition(side, j+8, ".score", botTeamName);
                }
            }
        }else{
            if (side == ".east"){
                bracketRemoval(side, j, ".score2");
            }else{
                bracketRemoval(side, j+8, ".score");
            }
        }
    }

}

function bracketAddition(side, n, type, advTeam){
    $(side).children().children(".matchup").children().eq(n).children(".team-name").text(advTeam);
    if ($(side).children().children(".matchup").children().eq(n).hasClass("champ")){
        $(side).children().children(".matchup").children().eq(n).children(".value").addClass("score");
        $(".score").show();
    }else{
        $(side).children().children(".matchup").children().eq(n).children(".value").addClass(type.slice(1));
        $(type).show();
    }
    $(side).children().children(".matchup").children().eq(n).removeClass("lock");

}

function bracketRemoval(side, n, type){
    $(side).children().children(".matchup").children().eq(n).addClass("lock");
    if ($(side).children().children(".matchup").children().eq(n).hasClass("champ")){
        $(side).children().children(".matchup").children().eq(n).children(".value").removeClass("score");
    }else{
        $(side).children().children(".matchup").children().eq(n).children(".value").removeClass(type.slice(1));
    }
    $(side).children().children(".matchup").children().eq(n).children(".value").text("0");
    $(side).children().children(".matchup").children().eq(n).children(".value").hide();
    $(side).children().children(".matchup").children().eq(n).children(".team-name").text("");
}




function sendData(){
    $.ajax({
        type: "POST",
        url: "/bracket",
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