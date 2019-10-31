function outputFunc(inputID, side){
    if ($(inputID).val() == ""){
        $(inputID).val("0");
    }else if ($(inputID).val() < 0 || $(inputID).val() > 4){
        if($(inputID).val() > 4){
            alert("Each series is a best of 7. A team can only have a maximum of 4 wins. Do you mean 4?");
             $(inputID).val("4");
        }else{
            alert("A team cannot have negative wins.")
             $(inputID).val("0");
        }
    }else{
        $(inputID).val(parseInt($(inputID).val()));
    }
    nextLvlCheck(side);

}

var topTeam = new Object();
var botTeam = new Object();

function nextLvlCheck(side){
    var j;
    for(i = 0; i <= 6; i++){
        j = i;
        if (side == ".east"){
            j = 7 - i;
        }
        topTeam.Num = parseInt($(side).children().children(".matchup").eq(j).children().eq(0).children(".value").val());
        topTeam.Name = $(side).children().children(".matchup").eq(j).children().eq(0).children(".team-name").text();
        topTeam.Logo = $(side).children().children(".matchup").eq(j).children().eq(0).attr('id');
        botTeam.Num = parseInt($(side).children().children(".matchup").eq(j).children().eq(1).children(".value").val());
        botTeam.Name = $(side).children().children(".matchup").eq(j).children().eq(1).children(".team-name").text();
        botTeam.Logo = $(side).children().children(".matchup").eq(j).children().eq(1).attr('id');

        if ((topTeam.Num == 4 || botTeam.Num == 4) && ((topTeam.Num + botTeam.Num) <= 7)){
            if(topTeam.Num == 4){
                if (side == ".east"){
                    bracketAddition(side, j, ".scoreinput2", topTeam.Name, topTeam.Logo);
                }else{
                    bracketAddition(side, j+8, ".scoreinput", topTeam.Name, topTeam.Logo);
                }
            }else{
                if (side == ".east"){
                    bracketAddition(side, j, ".scoreinput2", botTeam.Name, botTeam.Logo);
                }else{
                    bracketAddition(side, j+8, ".scoreinput", botTeam.Name, botTeam.Logo);
                }
            }
        }else{
            if (side == ".east"){
                bracketRemoval(side, j, ".scoreinput2");
            }else{
                bracketRemoval(side, j+8, ".scoreinput");
            }
        }
    }

}

function bracketAddition(side, n, type, advTeam, logo){
    $(side).children().children(".matchup").children().eq(n).children(".team-name").text(advTeam);
    $(side).children().children(".matchup").children().eq(n).attr('id', logo);
    if ($(side).children().children(".matchup").children().eq(n).hasClass("champ")){
        $(side).children().children(".matchup").children().eq(n).children(".value").addClass("scoreinput");
        $(".scoreinput").show();
    }else{
        $(side).children().children(".matchup").children().eq(n).children(".value").addClass(type.slice(1));
        $(type).show();
    }
    $(side).children().children(".matchup").children().eq(n).removeClass("lock");

}

function bracketRemoval(side, n, type){
    $(side).children().children(".matchup").children().eq(n).addClass("lock");
    if ($(side).children().children(".matchup").children().eq(n).hasClass("champ")){
        $(side).children().children(".matchup").children().eq(n).children(".value").removeClass("scoreinput");
    }else{
        $(side).children().children(".matchup").children().eq(n).children(".value").removeClass(type.slice(1));
    }
    $(side).children().children(".matchup").children().eq(n).children(".value").val("0");
    $(side).children().children(".matchup").children().eq(n).children(".value").hide();
    $(side).children().children(".matchup").children().eq(n).children(".team-name").text("");
    $(side).children().children(".matchup").children().eq(n).attr('id', "");
}

function testFunct(){
    var j;
    for (j=0; j<15; j++){
        topTeam.Num = parseInt($(".matchup").eq(j).children().eq(0).children(".value").val());
        botTeam.Num = parseInt($(".matchup").eq(j).children().eq(1).children(".value").val());
        if (topTeam.Num < 4 && botTeam.Num < 4){
            alert("Please fill in all the scores");
            return ;
        }
    }

    var responseBody = [];
    var i;
    for (i=0; i<30; i++){
        responseBody.push({
            team : $(".matchup").children().eq(i).children(".team-name").text(),
            score : $(".matchup").children().eq(i).children(".value").val()
         });
    }

    $.ajax({
        type: "POST",
        url: "/bracket",
        data: JSON.stringify(responseBody),
        contentType: "application/json",
        success: function (result){
            hideFunct('stats');

        },
        error: function(){
            console.log("fail");
        }
    });
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

$(function(){
    $(document).on('click', 'input[type=number]', function(){this.select();
    });
});