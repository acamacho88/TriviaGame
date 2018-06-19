questionDetails = [{
    "Question": "What Apollo was the first to land on the moon?",
    "Answers": [
        "Apollo 3",
        "Apollo 8",
        "Apollo 11",
        "Apollo 13"
    ],
    "CorrectIndex": 2
}, {
    "Question": "Which of these events happened first?",
    "Answers": [
        "Founding of Jamestown",
        "French Revolution",
        "Black Death",
        "Mongol conquest"
    ],
    "CorrectIndex": 3
}, {
    "Question": "Who was US President during the First World War?",
    "Answers": [
        "Woodrow Wilson",
        "James Buchanan",
        "Lyndon Johnson",
        "Gerald Ford"
    ],
    "CorrectIndex": 0
}, {
    "Question": "In what year did the Berlin Wall come down?",
    "Answers": [
        "1985",
        "1987",
        "1989",
        "1991"
    ],
    "CorrectIndex": 2
}, {
    "Question": "1492 saw the sailing of Columbus and what other event?",
    "Answers": [
        "Invention of the printing press",
        "Queen Isabella expelled the Jews of Spain",
        "Queen Elizabeth defeats the Spanish Armada",
        "Charlemagne is crowned ruler of the Holy Roman Empire"
    ],
    "CorrectIndex": 1
}, {
    "Question": "Who was the head of the Bolsheviks during the Russian Revolution?",
    "Answers": [
        "Leon Trotsky",
        "Joseph Stalin",
        "Karl Marx",
        "Vladimir Lenin"
    ],
    "CorrectIndex": 3
}]

$(document).ready(function () {
    var populateFields = function (currentQ) {
        var details = questionDetails[currentQ];
        $('#question').text(details["Question"]);
        for (var i = 1; i <= details["Answers"].length; i++) {
            $('#option' + i + ' + label').text(details["Answers"][i - 1]);
        }
    }

    $('input').hide();

    var timeLeft = 30;

    document.onkeyup = function (event) {
        if (timeLeft == 30) {
            $('#welcomePrompt').hide();

            $('input').show();

            var currentQ = 0;

            var timerElement = $('#timer');

            $('#question').text(questionDetails[0]["Question"]);

            populateFields(currentQ);

            var timer = setInterval(function () {
                timerElement.text(timeLeft);
                timeLeft--;
                if (timeLeft < 0) {
                    clearInterval(timer);
                }
            }, 1000)
        }
    }
})