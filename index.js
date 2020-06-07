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


// MANAGING THE PERIOD SELECTOR

$(".form__select").on("click", function() {
    $(this).toggleClass("open");
})

$(".form__option").on("click", function() {
    $(".form__option").removeClass("selected");
    $(this).addClass("selected");
    const selected = $(this).text();
    $("#period-trigger span").text(selected);
    $("#period").val(selected);
})


// MANAGING THE PEOPLE COUNT OPERATOR

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
        $(".form__input:not(#period)").val("");
    }
})


// CHECKING IF AN INPUT IS NUMERIC

function isNumeric(input) {
    return (input - 0) == input && input.length > 0;
}


// VALIDATING NAME

function validateName(name) {
    if (name === "") {
        $("#name-container, #name").addClass("error");
        return false;
    }
    else {
        $("#name-container, #name").removeClass("error");
        return true;
    }
}


// VALIDATING EMAIL

function isEmail(email) {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
}

function validateEmail(email) {
    if (email === "") {
        $("#email-container, #email").addClass("error").removeClass("invalid");
        return false;
    }
    else {
        if (isEmail(email)) {
            $("#email-container, #email").removeClass("error").removeClass("invalid");
            return true;
        }
        else {
            $("#email-container, #email").addClass("error").addClass("invalid");
            return false;
        }
    }
}


// VALIDATING DATE

function validateDate(day, month, year) {
    if (day === "" && month === "" && year === "") {
        $("#date-label, #day, #month, #year").addClass("error").removeClass("invalid");
        return false;
    }
    else {
        if (!validateDay(day) || !validateMonth(month) || !validateYear(year)) {
            $("#date-label, #day, #month, #year").addClass("error").addClass("invalid");
            return false;
        }
        else {
            if (!dayFittingMonth(day, month)) {
                $("#date-label, #day, #month, #year").addClass("error").addClass("invalid");
                return false;
            }
            else {
                if (day === "" || month === "" || year === "") {     
                    $("#date-label, #day, #month, #year").addClass("error").removeClass("invalid");
                    return false;
                }
                else {
                    $("#date-label, #day, #month, #year").removeClass("error").removeClass("invalid");
                    return true;
                }
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

function dayFittingMonth(day, month) {
    if (day > 28 && month === 2) {
        return false;
    }
    else {
        if (day > 30 && (month === 4 || month === 6 || month === 9 || month === 11)) {
            return false;
        }
        else {
            return true;
        }
    }
}


// VALIDATING TIME

function validateTime(hour, minute) {
    if (hour === "" && minute === "") {
        $("#time-label, #hour, #minute").addClass("error").removeClass("invalid");
        return false;
    }
    else {
        if (!validateHour(hour) || !validateMinute(minute)) {
            $("#time-label, #hour, #minute").addClass("error").addClass("invalid");
            return false;
        }
        else {
            if (hour === "" || minute === "") {
                $("#time-label, #hour, #minute").addClass("error").removeClass("invalid");
                return false;
            }
            else {
                $("#time-label, #hour, #minute").removeClass("error").removeClass("invalid");
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