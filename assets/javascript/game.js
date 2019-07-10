$(document).ready(function() {
    var playerNum = 0;
    var randomNum = randomNumGen(120, 19);
    var playerWins = 0;
    var playerLosses = 0;
    var crystals;
    
    function gameStart() {
        console.log("gameStart");
        playerNum = 0;
        crystals = crystalGen();
        randomNum = randomNumGen(120, 19);
        $("#computerNumber").text(randomNum);
    }
    function crystalGen() {
        return {
            red: {
                score: randomNumGen(12, 1),
                btnSrc: "assets/images/blue.jpg"
            },
            blue: {
                score: randomNumGen(12, 1),
                btnSrc: "assets/images/green.jpg"
            },
            yellow: {
                score: randomNumGen(12, 1),
                btnSrc: "assets/images/pink.jpg"
            },
            green: {
                score: randomNumGen(12, 1),
                btnSrc: "assets/images/yellow.jpg"
            }
        };
    }
    function randomNumGen(max, min) {
        console.log("randomNumGen", min, max);
        return Math.floor(Math.random() * max) + min;
    }
    function screenUpdate(UserWin) {
        console.log("screenUpdate");
        $("#win-area").empty();
        if (UserWin === true) {
            $("#win-area").append($("<p>").text("You won!!"));
            gameStart();
            displayPlayerNumber();
        }
        else if (UserWin === false) {
            $("#win-area").append($("<p>").text("You lost!!"));
            gameStart();
            displayPlayerNumber();
        }
        var winLable = $("<p>").text("Wins: ");
        var winText = $("<span>").text(playerWins);
        var lossLable = $("<p>").text("Losses: ");
        var lossText = $("<span>").text(playerLosses);
        winLable.append(winText);
        lossLable.append(lossText);
        $("#win-area").append(winLable);
        $("#win-area").append(lossLable);
    }
    function displayPlayerNumber() {
        console.log("displayPlayerNumber");
        var playerScoreTracker = $("<div id='NumberTrack'>").text(playerNum);
        $("#scoreScreen").html(playerScoreTracker);
    }
    function displayButtons() {
        console.log("displayButtons");
        for (var key in crystals) {
            var buttonDiv = $("<div class='crystals-button' data-name='" + key + "'>");
            var buttonImg = $("<img alt='image' class='crystal-img'>").attr("src", crystals[key].btnSrc);
            buttonDiv.append(buttonImg);
            $("#crystalSpace").append(buttonDiv);
        }
    }
    function refreshPlayerNumber(crystal) {
        console.log("refreshPlayerNumber", crystal);
        playerNum += crystals[crystal.attr("data-name")].score;
    }
    gameStart();
    screenUpdate();
    displayButtons();
    displayPlayerNumber();
    $(".crystals-button").on("click", function() {
        console.log("Crystal Clicked", this);
        refreshPlayerNumber($(this));
        displayPlayerNumber();
        if (playerNum === randomNum) {
            playerWins++;
            gameStart();
            screenUpdate(true);
        }
        else if (playerNum > randomNum) {
            playerLosses++;
            gameStart();
            screenUpdate(false);
        }
    });
});