questionDetails = [{
    "Question": "What Apollo was the first to land on the moon?",
    "Answers": [
        "Apollo 3",
        "Apollo 8",
        "Apollo 11",
        "Apollo 13"
    ],
    "CorrectIndex": 2,
    "Ending": "assets/images/apollo11.gif"
}, {
    "Question": "Which of these events happened first?",
    "Answers": [
        "Founding of Jamestown",
        "French Revolution",
        "Black Death",
        "Mongol conquest"
    ],
    "CorrectIndex": 3,
    "Ending": "assets/images/mongolempire.gif"
}, {
    "Question": "Who was US President during the First World War?",
    "Answers": [
        "Woodrow Wilson",
        "James Buchanan",
        "Lyndon Johnson",
        "Gerald Ford"
    ],
    "CorrectIndex": 0,
    "Ending": "assets/images/woodrowwilson.jpg"
}, {
    "Question": "In what year did the Berlin Wall come down?",
    "Answers": [
        "1985",
        "1987",
        "1989",
        "1991"
    ],
    "CorrectIndex": 2,
    "Ending": "assets/images/berlinwall.gif"
}, {
    "Question": "1492 saw the sailing of Columbus and what other event?",
    "Answers": [
        "Invention of the printing press",
        "Queen Isabella expelled the Jews of Spain",
        "Queen Elizabeth defeats the Spanish Armada",
        "Charlemagne is crowned ruler of the Holy Roman Empire"
    ],
    "CorrectIndex": 1,
    "Ending": "assets/images/spanishinquisition.gif"
}, {
    "Question": "Who was the head of the Bolsheviks during the Russian Revolution?",
    "Answers": [
        "Leon Trotsky",
        "Joseph Stalin",
        "Karl Marx",
        "Vladimir Lenin"
    ],
    "CorrectIndex": 3,
    "Ending": "assets/images/lenin.gif"
}]

// Load all images at start so user doesn't have to wait for them when they are shown
questionDetails.forEach(el = () => {
    var test = $("<img>");
    test.attr("src",el["Ending"]);
})

$(document).ready(function () {
    var currentQ = 0;

    var nWins = 0;
    var prevWins = 0;

    var populateFields = function () {
        $('.card').show();
        $('#questionImg').hide();
        var details = questionDetails[currentQ];
        $('#question').text(details["Question"]);
        for (var i = 1; i <= details["Answers"].length; i++) {
            $('#card' + i).text(details["Answers"][i - 1]);
        }
        startTimer();
    }

    var setImage = function (qData) {
        var imgEl = $('#questionImg');
        imgEl.remove();
        imgEl = $('<img>');
        imgEl.attr('src',qData["Ending"]);
        imgEl.attr("id","questionImg");
        return imgEl;
    }

    var nextQuestion = function () {
        var qData = questionDetails[currentQ];
        if (prevWins == nWins) {
            $('#question').text("Incorrect, the answer was " + qData["Answers"][qData["CorrectIndex"]]);
        } else {
            $('#question').text("Correct! The answer was " + qData["Answers"][qData["CorrectIndex"]]);
        }
        prevWins = nWins;
        var imgEl = setImage(qData);
        prevWins = nWins;
        $('.card').hide();
        $("#mainContent").append(imgEl);
        setTimeout(function () {
            if (currentQ < questionDetails.length - 1) {
                currentQ++;
                populateFields(currentQ);
            } else {
                endOfGame();
            }
        }, 4000);
    }

    var startTimer = function () {
        var timeLeft = 30;
        var timerElement = $('#timer');
        var timer = setInterval(function () {
            timerElement.text(timeLeft);
            timeLeft--;
            if (timeLeft < 0) {
                clearInterval(timer);
                nextQuestion();
            }
        }, 1000)
        $('.card').unbind('click');
        $('.card').on("click", function () {
            if (this.id[4] == (questionDetails[currentQ]["CorrectIndex"] + 1)) {
                nWins++;
            }
            clearInterval(timer);
            nextQuestion();
        })
    }

    var endOfGame = function () {
        var welcome = $('#welcomePrompt');
        welcome.text("Press any key to start over");
        welcome.show();
        $('#questionImg').hide();
        $('#timer').text("Correct answers: " + nWins);
        var nIncorrect = questionDetails.length - nWins;
        $('#question').text("Incorrect answers: " + nIncorrect);
        currentQ = 0;
        nWins = 0;
        prevWins = 0;
    }

    $('.card').hide();

    var questionImg = $('#questionImg');
    questionImg.hide();

    document.onkeyup = function (event) {
        var welcome = $('#welcomePrompt');
        if (welcome.is(':visible')) {

            welcome.hide();

            populateFields();
        }
    }
})