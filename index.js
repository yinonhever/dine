// MANAGING THE SLIDER SECTION

const firstTab = $(".slider__tab:first-child");
var tabID = firstTab.attr("id");
var imgID = tabID + "__img";
var contentID = tabID + "__content";

$("#" + tabID).addClass("active");
$("#" + imgID).addClass("active");
$("#" + contentID).addClass("active");

$(".slider__tab").click(function (event) {
    event.preventDefault();
    $(".slider__tab, .slider__img, .slider__content").removeClass("active");

    tabID = $(this).attr("id");
    imgID = tabID + "__img";
    contentID = tabID + "__content";

    $(this).addClass("active");
    $("#" + imgID).addClass("active");
    $("#" + contentID).addClass("active");
});


// ADDING ANIMATIONS

$(document).ready(function () {
    $(".features__row--left").waypoint(function () {
        $(this).children(".features__img").css({
            animation: "slideRight .7s ease-out",
            opacity: "1"
        })
        $(this).children(".features__content").css({
            animation: "slideLeft .7s ease-out",
            opacity: "1"
        })
    }, { offset: "50%" })

    $(".features__row--right").waypoint(function () {
        $(this).children(".features__img").css({
            animation: "slideLeft .7s ease-out",
            opacity: "1"
        })
        $(this).children(".features__content").css({
            animation: "slideRight .7s ease-out",
            opacity: "1"
        })
    }, { offset: "50%" })
})