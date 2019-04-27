"use strict"

function init() {
    let button = document.getElementsByClassName('js-button')[0];
    let mainBG = document.getElementsByClassName('js-main')[0];
    let title = document.getElementsByClassName('js-content-title')[0];

    changeColor(mainBG, button, title);

    button.addEventListener('click', function(e) {
        changeColor(mainBG, button, title, e);
    });
}

function changeColor(domElement, button, title, e) {
    if(e) {
        e.preventDefault();
    }

    let HSLValuesObject = returnRandomColorValues();
    let mainBGColorString = HSLValuesObject.HSLStringBG;
    let buttonColorString = HSLValuesObject.HSLStringButton;
    let buttonFontColorString = HSLValuesObject.HSLStringFontColor;

    let backgroundColor = 'hsl(' + mainBGColorString + ')';
    let buttonColor = 'hsl(' + buttonColorString + ')';
    let buttonFontColor = 'hsl(' + buttonFontColorString + ')';

    domElement.style.background = backgroundColor;
    button.style.background = buttonColor;
    button.style.color = buttonFontColor;
    title.style.color = buttonFontColor;
}

function returnRandomColorValues() {
    let randomDegrees = Math.round(returnRandomNumber(0, 360)); //hue
    let randomSaturation = Math.round(returnRandomNumber(50, 90));
    let randomLightness = Math.round(returnRandomNumber(30, 70));
    let buttonLightness = 50 - (randomLightness - 50); //buttonLightness should be based on BGlightness so no conflict
    if(Math.abs(randomLightness - buttonLightness) < 5) { //if these values are too close to each other, we force buttonLightness to be darker
        buttonLightness = buttonLightness - 10;
    }
    //obj to hold random color values assigned later
    let objectOfColors = {};

    //for bg
    let HSLStringBG = randomDegrees + ', ' + randomSaturation + '%, ' + randomLightness + '%';
    //for button
    let HSLStringButton = randomDegrees + ', ' + randomSaturation + '%, ' + buttonLightness + '%';
    //for font color of button
    let HSLStringFontColor;
    //if buttonLightness is light, color === black, else white
    if(buttonLightness > 50) {
        HSLStringFontColor = 0 + ', ' + 0 + '%, ' + 0 + '%';
    }
    else {
        HSLStringFontColor = 0 + ', ' + 0 + '%, ' + 100 + '%';
    }

    objectOfColors.HSLStringBG = HSLStringBG;
    objectOfColors.HSLStringButton = HSLStringButton;
    objectOfColors.HSLStringFontColor = HSLStringFontColor;

    return objectOfColors;
}

function returnRandomNumber(minNumber, maxNumber) {
    return Math.random() * (maxNumber - minNumber) + minNumber;
}

init();
