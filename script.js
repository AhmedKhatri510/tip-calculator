"use strict";

//getting bill inputs
const domBill = document.getElementById("bill");
let inputBill;
domBill.addEventListener("keyup", function (e) {
  inputBill = +this.value;
});

//label dark
let tipPercent = 0;

const domTipPercents = document.querySelectorAll(".label-dark");
const domCustom = document.querySelector(".custom");

const resetTipInputs = function (e = undefined) {
  tipPercent = domCustom.value || tipPercent;
  console.log(tipPercent);
  domTipPercents.forEach((el) => {
    if (el.dataset.tip !== e?.target.dataset.tip)
      el.style.backgroundColor = "hsl(183, 100%, 15%)";
  });
};

const setTipPercent = function (e) {
  domCustom.value = "";
  e.target.style.backgroundColor = "hsl(172, 67%, 45%)";
  tipPercent = +e.target.dataset.tip;
  resetTipInputs(e);
};

domTipPercents.forEach((domTipPercent) => {
  domTipPercent.addEventListener("click", setTipPercent);
});

//checking for custom input for tip percent

domCustom.addEventListener("keyup", function (e) {
  tipPercent = +this.value;
  resetTipInputs(e);
});

//calculating total tip and total amount
const amounts = document.querySelectorAll(".amount");
const calcAmount = function () {
  amounts[0].innerText = `$${Math.round(
    noOfPeoples * (tipPercent / 100) * inputBill
  )}`;
  amounts[1].innerText = `$${Math.round(
    noOfPeoples * ((tipPercent / 100) * inputBill + inputBill)
  )}`;
};

//getting no of peoples
const domNoOfPeoples = document.getElementById("no-of-peoples");
let noOfPeoples = 1;
const setNoOfPeoples = function (e) {
  if (e.keyCode !== 13) return;

  noOfPeoples = +e.target.value;
  if (noOfPeoples === 0) {
    domNoOfPeoples.style.outlineColor = "red";
    document.getElementById("alert-noofpeoples").style.display = "inline-block";
  } else {
    document.getElementById("alert-noofpeoples").style.display = "none";
    domNoOfPeoples.style.outlineColor = "hsl(172, 67%, 45%)";

    //calculating the total tip and total amount
    calcAmount();
  }
};

domNoOfPeoples.addEventListener("keyup", setNoOfPeoples);

//reset button
const reset = document.querySelector(".btn--reset");
reset.addEventListener("click", function (e) {
  domBill.value = 0;
  resetTipInputs();
  tipPercent = 0;
  domCustom.value = "";
  noOfPeoples = 1;
  domNoOfPeoples.value = "1";

  amounts[0].innerText = `$0`;
  amounts[1].innerText = "$0";
});
