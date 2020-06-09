// MANAGING THE SLIDER SECTION

const firstTab = $(".slider__tab:first-child");
var tabID = firstTab.attr("id");
var imgID = tabID + "__img";
var contentID = tabID + "__content";

$("#" + tabID).addClass("active");
$("#" + imgID).addClass("active");
$("#" + contentID).addClass("active");

$(".slider__tab").click(function () {
    $(".slider__tab, .slider__img, .slider__content").removeClass("active");

    tabID = $(this).attr("id");
    imgID = tabID + "__img";
    contentID = tabID + "__content";

    $(this).addClass("active");
    $("#" + imgID).addClass("active");
    $("#" + contentID).addClass("active");
});


// MANAGING THE DROPDOWN SELECTOR

$(".form__select").on("click", function () {
    $(this).toggleClass("open");
})

$(".form__option").on("click", function () {
    $(".form__option").removeClass("selected");
    $(this).addClass("selected");
    const selected = $(this).text();
    $(this).parent().siblings(".form__select-trigger").children("span").text(selected);
    $(this).parent().siblings(".form__select-input").val(selected);
})


// MANAGING THE PEOPLE COUNT SELECTOR

var peopleCount = 4;
$("#people").val(peopleCount);
$("#people-count").text(peopleCount + " people");

$("#decrement").click(function () {
    if (peopleCount > 1) {
        peopleCount--;
        $("#people").val(peopleCount);
    }

    if (peopleCount > 1) {
        $("#people-count").text(peopleCount + " people");
    }
    else {
        $("#people-count").text(peopleCount + " person");
    }
})

$("#increment").click(function () {
    peopleCount++;
    $("#people").val(peopleCount);
    $("#people-count").text(peopleCount + " people");
})


// SUBMITTING THE FORM

$(".form").on("submit", function (event) {
    event.preventDefault();

    const name = $("#name").val();
    const nameValid = validateName(name);

    const email = $("#email").val();
    const emailValid = validateEmail(email);

    const day = $("#day").val();
    const month = $("#month").val();
    const year = $("#year").val();
    const dateValid = validateDate(day, month, year);

    const hour = $("#hour").val();
    const minute = $("#minute").val();
    const timeValid = validateTime(hour, minute);

    const formValid = nameValid && emailValid && dateValid && timeValid;

    if (formValid) {
        $(".form__input").val("");
        $(".success").addClass("active");
        console.log($(this));
    }
})


// CLOSING THE SUCCESS MESSAGE

$(".success__close").on("click", function() {
    $(this).parent().parent().removeClass("active");
})


// CHECKING IF AN INPUT IS NUMERIC

function isNumeric(input) {
    return (input - 0) == input && input.length > 0;
}


// VALIDATING NAME

function validateName(name) {
    const nameField = $("#name-container, #name");

    if (name === "") {
        nameField.addClass("error");
        return false;
    }
    else {
        nameField.removeClass("error");
        return true;
    }
}


// VALIDATING EMAIL

function isEmail(email) {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
}

function validateEmail(email) {
    const emailField = $("#email-container, #email");

    if (email === "") {
        emailField.addClass("error").removeClass("invalid");
        return false;
    }
    else {
        if (isEmail(email)) {
            emailField.removeClass("error").removeClass("invalid");
            return true;
        }
        else {
            emailField.addClass("error").addClass("invalid");
            return false;
        }
    }
}


// VALIDATING DATE

function validateDate(day, month, year) {
    const dateField = $("#date-label, #day, #month, #year");

    if (day === "" && month === "" && year === "") {
        dateField.addClass("error").removeClass("invalid");
        return false;
    }
    else {
        if (!validateDay(day) || !validateMonth(month) || !validateYear(year)) {
            dateField.addClass("error").addClass("invalid");
            return false;
        }
        else {
            if (day === "" || month === "" || year === "") {
                dateField.addClass("error").removeClass("invalid");
                return false;
            }
            else {
                dateField.removeClass("error").removeClass("invalid");
                return true;
            }
        }
    }
}

function validateDay(day) {
    if (day != "" && (!isNumeric(day) || day < 1 || day > 31)) {
        return false;
    }
    else {
        return true;
    }
}

function validateMonth(month) {
    if (month != "" && (!isNumeric(month) || month < 1 || month > 12)) {
        return false;
    }
    else {
        return true;
    }
}

function validateYear(year) {
    const currentYear = new Date().getFullYear();

    if (year != "" && (!isNumeric(year) || year < currentYear)) {
        return false;
    }
    else {
        return true;
    }
}


// VALIDATING TIME

function validateTime(hour, minute) {
    const timeField = $("#time-label, #hour, #minute");
    
    if (hour === "" && minute === "") {
        timeField.addClass("error").removeClass("invalid");
        return false;
    }
    else {
        if (!validateHour(hour) || !validateMinute(minute)) {
            timeField.addClass("error").addClass("invalid");
            return false;
        }
        else {
            if (hour === "" || minute === "") {
                timeField.addClass("error").removeClass("invalid");
                return false;
            }
            else {
                timeField.removeClass("error").removeClass("invalid");
                return true;
            }
        }
    }
}

function validateHour(hour) {
    if (hour != "" && (hour < 1 || hour > 12)) {
        return false;
    }
    else {
        return true;
    }
}

function validateMinute(minute) {
    if (minute != "" && (minute < 0 || minute > 59)) {
        return false;
    }
    else {
        return true;
    }
}
