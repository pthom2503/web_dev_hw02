(function () {
    "use strict";
    const stateEnum = {"add": 1, "subtract": 2, "multiply": 3, "divide": 4, "initial": 5};
    // total stored in memory
    let memNum = 0;
    // newest number
    let curNum = 0;
    // calculator state
    let curState = stateEnum.initial;
    // total digits displayed
    let digitCount = 0;
    // maximum digits, counting decimals and negatives, allowed to be displayed on the screen
    let maxDigits = 8;

    let decPlace = 0;

    function updateScreen(value) {
        let screen = document.getElementById("display_screen");
        screen.innerText = value;
    }

    function clear() {
        memNum = 0;
        curNum = 0;
        curState = stateEnum.initial;
        digitCount = 0;
        decPlace = 0;
        updateScreen(curNum)
    }

    function decimal() {
        if (decPlace === 0) {
            decPlace = 1;
            digitCount++;
            curNum += 0.0;
            // hitting the decimal point will add .0 if decimal point hasn't already been hit for this number
            updateScreen(curNum.toFixed(decPlace));
        }
    }

    function appendNumbers(x) {
        // if the calculator screen still has room to display, add a number
        if (digitCount < maxDigits) {
            // if we're appending whole numbers, shift everything left 1 digit and add
            if (decPlace === 0) {
                curNum *= 10;
                curNum += x;
                digitCount++;
                updateScreen(curNum);
            } else {
                // if we're appending decimals, set to the proper place and add
                for (let i = 0; i < decPlace; i++) {
                    x *= 0.1;
                }
                decPlace++;
                curNum += x;
                digitCount++;
                // display only the number of decimal points entered
                updateScreen(curNum.toFixed(decPlace - 1));
            }
        }
    }

    function appendZero() {
        appendNumbers(0)
    }

    function appendOne() {
        appendNumbers(1)
    }

    function appendTwo() {
        appendNumbers(2)
    }

    function appendThree() {
        appendNumbers(3)
    }

    function appendFour() {
        appendNumbers(4)
    }

    function appendFive() {
        appendNumbers(5)
    }

    function appendSix() {
        appendNumbers(6)
    }

    function appendSeven() {
        appendNumbers(7)
    }

    function appendEight() {
        appendNumbers(8)
    }

    function appendNine() {
        appendNumbers(9)
    }

    // allows for chained operations: [9, -, 4, += 3, +=] is a valid chain of input that will display 5 upon the first +=
    // and 8 upon the second
    function applyPrevOp(newOp) {
        digitCount = 0;
        if (curState === stateEnum.initial) {
            memNum = curNum;
        } else if (curState === stateEnum.add) {
            memNum += curNum;
        } else if (curState === stateEnum.subtract) {
            memNum -= curNum;
        } else if (curState === stateEnum.multiply) {
            memNum *= curNum;
        } else if (curState === stateEnum.divide) {
            memNum = memNum / curNum;
        }
        // if the number is beyond the digit constraints, switch to exponential
        if (memNum > 99999999 || memNum < -9999999) {
            updateScreen(memNum.toExponential(5));
        } else {
            // figure out how many decimal digits COULD be displayed
            let decDigits = 7 - Math.floor(memNum).toString().length;

            let digits = 0;
            // if all of the numbers would use fewer decimal places than the max, use that many
            if (Math.max(countValues(memNum), countValues(curNum)) <= decDigits) {
                digits = Math.max(countValues(memNum), countValues(curNum));
            } else {
                digits = decDigits;
            }
            // display with the calculated amount of digits
            updateScreen(memNum.toFixed(digits));

        }
        // reset values
        decPlace = 0;
        curNum = 0;
        curState = newOp;
    }

    // count the number of decimal digits in a number
    function countValues(value) {
        if (Math.floor(value) === value) return 0;
        return value.toString().split(".")[1].length || 0;
    }

    function plusEquals() {
        applyPrevOp(stateEnum.add);
    }

    function subtract() {
        applyPrevOp(stateEnum.subtract);
    }

    function multiply() {
        applyPrevOp(stateEnum.multiply);
    }

    function divide() {
        applyPrevOp(stateEnum.divide);
    }

    function init() {
        let btn = document.querySelector("#zero_btn");
        btn.addEventListener("click", appendZero);
        btn = document.querySelector("#one_btn");
        btn.addEventListener("click", appendOne);
        btn = document.querySelector("#two_btn");
        btn.addEventListener("click", appendTwo);
        btn = document.querySelector("#three_btn");
        btn.addEventListener("click", appendThree);
        btn = document.querySelector("#four_btn");
        btn.addEventListener("click", appendFour);
        btn = document.querySelector("#five_btn");
        btn.addEventListener("click", appendFive);
        btn = document.querySelector("#six_btn");
        btn.addEventListener("click", appendSix);
        btn = document.querySelector("#seven_btn");
        btn.addEventListener("click", appendSeven);
        btn = document.querySelector("#eight_btn");
        btn.addEventListener("click", appendEight);
        btn = document.querySelector("#nine_btn");
        btn.addEventListener("click", appendNine);
        btn = document.querySelector("#plus_eq_btn");
        btn.addEventListener("click", plusEquals);
        btn = document.querySelector("#minus_btn");
        btn.addEventListener("click", subtract);
        btn = document.querySelector("#times_btn");
        btn.addEventListener("click", multiply);
        btn = document.querySelector("#div_btn");
        btn.addEventListener("click", divide);
        btn = document.querySelector("#clear_btn");
        btn.addEventListener("click", clear);
        btn = document.querySelector("#dec_btn");
        btn.addEventListener("click", decimal);
    }

    window.addEventListener("load", init, false);
})()
