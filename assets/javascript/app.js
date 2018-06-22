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

$(document).ready(function () {
    var currentQ = 0;

    var nWins = 0;

    var populateFields = function () {
        $('.card').show();
        $('#questionImg').hide();
        var details = questionDetails[currentQ];
        $('#question').text(details["Question"]);
        for (var i = 1; i <= details["Answers"].length; i++) {
            $('#card' + i).text(details["Answers"][i - 1]);
        }
        // startTimer();
    }

    var setImage = function (qData) {
        var imgEl = $('#questionImg');
        imgEl.attr('src', qData["Ending"]);
        imgEl.show();
    }

    var nextQuestion = function () {
        $('.card').hide();
        var qData = questionDetails[currentQ];
        $('#question').text("The answer was " + qData["Answers"][qData["CorrectIndex"]]);
        setImage(qData);
        setTimeout(function () {
            currentQ++;
            // populateFields(currentQ);
        }, 4000);
    }

    var startTimer = function () {
        var timeLeft = 15;
        var timerElement = $('#timer');
        var timer = setInterval(function () {
            timerElement.text(timeLeft);
            timeLeft--;
            if (timeLeft < 0) {
                clearInterval(timer);
            }
        }, 1000)
        $('.card').on("click", function () {
            if (this.id[4] == questionDetails[currentQ]["CorrectIndex"]) {
                clearInterval(timer);
                nWins++;
            }
            return;
        })

    }

    $('.card').hide();

    var questionImg = $('#questionImg');
    questionImg.hide();

    document.onkeyup = function (event) {
        if ($('#welcomePrompt').is(':visible')) {

            var timerElement = $('#timer');

            $('#welcomePrompt').hide();

            // populateFields();

            for (var i = 0; i < questionDetails.length; i++) {
                if (i !== 0) nextQuestion();
                populateFields();
                startTimer();
            }
        }
    }
})