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

    const nameValid = validateName($("#name").val());
    const emailValid = validateEmail($("#email").val());
    const dateValid = validateDate($("#day").val(), $("#month").val(), $("#year").val());
    const timeValid = validateTime($("#hour").val(), $("#minute").val(), $("#day").val(), $("#month").val(), $("#year").val());

    const formValid = nameValid && emailValid && dateValid && timeValid;

    if (formValid) {
        event.target.reset();
        $(".success").addClass("active");
    }
})

// CLOSING THE SUCCESS MESSAGE

$(".success__close").on("click", function () {
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

function daysInMonth(month, year) {
    switch (month) {
        case 1:
            return (year % 4 === 0 && year % 100) || year % 400 === 0 ? 29 : 28;
        case 8: case 3: case 5: case 10:
            return 30;
        default:
            return 31
    }
}

function isValidDate(day, month, year) {
    month = parseInt(month, 10) - 1;
    return month >= 0 && month < 12 && day > 0 && day <= daysInMonth(month, year);
}

function validateDate(day, month, year) {
    const dateField = $("#date-label, #day, #month, #year");
    const dateValid = isValidDate(day, month, year);

    const inputDate = new Date(moment(new Date(year, month - 1, day)).format("LL"));
    const currentDate = new Date(moment(new Date()).format("LL"));
    const datePassed = inputDate.getTime() < currentDate.getTime();

    if (day === "" || month === "" || year === "") {
        dateField.addClass("error").removeClass("invalid");
        return false;
    }
    else {
        if (!dateValid || datePassed) {
            dateField.addClass("error").addClass("invalid");
            return false;
        }
        else {
            dateField.removeClass("error").removeClass("invalid");
            return true;
        }
    }
}

// VALIDATING TIME

function validateTime(hour, minute, day, month, year) {
    const timeField = $("#time-label, #hour, #minute");
    const timeValid = validateHour(hour) && validateMinute(minute);
    const timePassed = new Date(year, month - 1, day, hour, minute).getTime() <= Date.now();

    if (hour === "" || minute === "") {
        timeField.addClass("error").removeClass("invalid");
        return false;
    }
    else {
        if (!timeValid || timePassed) {
            timeField.addClass("error").addClass("invalid");
            return false;
        }
        else {
            timeField.removeClass("error").removeClass("invalid");
            return true;
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
