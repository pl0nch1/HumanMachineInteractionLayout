var messages = {}
var messageDiv

validators_by_id = {
    "email": validateEmail,
    "name": [validateCapitalLetter, validateAlphabetical, validateLength]}

function updateValidationDescription(key, value) {

    if (value == null) {
        delete messages[key]
    } else {
        messages[key] = value
    }
    messageDiv.innerHTML = Object.entries(messages).map(entry => "<div class=\"validationError\">" + entry[1] + "</div>").join("")
}

function validateEmail(text) {
    if (!text.endsWith("mail.ru")) {
        return "Убедитесь, что почта находится в зоне \"mail.ru\""
    }
}

function validateCapitalLetter(text) {
    if ((text[0]) && (text[0].toUpperCase() != text[0])) {
        return "Убедитесь, что имя начинается с большой буквы"
    }
}

function validateAlphabetical(text) {
    if (text.match("[а-яА-Я ]*")[0] != text) {
        return "Убедитесь, что имя состоит исключительно из кирилических букв"
    }
}

function validateLength(text) {
    if (text.length <= 1) {
        return "Убедитесь, что имя длиннее 1 символа"
    }
}

function validate(element) {
    value = element.value
    id = element.id
    validators = validators_by_id[id]

    if (validators == null)
        return

    if (!Array.isArray(validators)) {
        validators = [validators]
    }
    validators.forEach((validationRule) => {
        updateValidationDescription((id + "_" + validationRule.name), validationRule(value))
    })
}

function init(){
    messageDiv = document.getElementById('msg')
}

window.onload = init