/******************************************
Treehouse FSJS Techdegree:
project 3 - Creating a submission form with validation measures
******************************************/

/*
  The code below lets users interact with the submission form on the web page. It checks the validity of the web
  users answers and -if necessary- tells the web user how to improve the input as to satisfy the validity check.

  If something is unclear in this code, please contact me.
*/

document.getElementById("name").focus();

// If user selects 'other job', a designated input-bar appears
const otherJobInput = document.getElementById("other-title");
otherJobInput.style.display = "none";
const otherJob = document.getElementById("title");

otherJob.addEventListener('click', () => {
  if (otherJob.value === "other") {
    otherJobInput.style.display = "block";
    otherJobInput.addEventListener('mouseover', () => {
      otherJobInput.focus();
    });
  } else {
    otherJobInput.style.display = "none";
  }
});

const selectTheme = document.createElement("option");
selectTheme.textContent = "Please select a T-shirt theme";
const colorList = document.getElementById("color");
colorList.add(selectTheme, 0);
selectTheme.selected = true;
selectTheme.hidden = true;
colorList.hidden = true;

const design = document.getElementById("design");
design.addEventListener('change', () => {
  if (design.value === "js puns") {
    selectTheme.selected = true;
    colorList.hidden = false;
    colorList[1].hidden = false;
    colorList[2].hidden = false;
    colorList[3].hidden = false;
    colorList[4].hidden = true;
    colorList[5].hidden = true;
    colorList[6].hidden = true;
  } else if (design.value === "heart js") {
    selectTheme.selected = true;
    colorList.hidden = false;
    colorList[1].hidden = true;
    colorList[2].hidden = true;
    colorList[3].hidden = true;
    colorList[4].hidden = false;
    colorList[5].hidden = false;
    colorList[6].hidden = false;
  } else {
  colorList.hidden = true;
  }
});

let costStatement = document.createElement('h3');
const activSection = document.querySelector('.activities');
activSection.appendChild(costStatement);

let totalActivCost = 0;

const activityList = document.querySelectorAll('input[type=checkbox]');

activSection.addEventListener('change', (e) => {
  const selectedActivity = e.target;
  const cost = selectedActivity.getAttribute('data-cost');
  const time = selectedActivity.getAttribute('data-day-and-time');
  if (selectedActivity.checked) {
    totalActivCost += Number(cost);
  } else {
    totalActivCost -= Number(cost);
  }
  for (let i = 0; i < activityList.length; i++) {
    const activityListItem = activityList[i];
    const timeItem = activityListItem.getAttribute('data-day-and-time');
    if (timeItem === time && activityListItem !== selectedActivity) {
      if (activityListItem.checked) {
        activityListItem.checked = false;
        activityListItem.disabled = true;
        totalActivCost -= Number(activityListItem.getAttribute('data-cost'));
      } else {
        activityListItem.disabled = false;
      }
    }
  }
  costStatement.textContent = `Total: $${totalActivCost}`;
});

const paymentMethod = document.getElementById('payment');
paymentMethod[0].hidden = true;

const creditCard = document.getElementById('credit-card');
const paypal = document.getElementById('paypal');
const bitcoin = document.getElementById('bitcoin');
paypal.hidden = true;
bitcoin.hidden = true;

paymentMethod.addEventListener('change', (e) => {
  if (e.target.value === "credit card") {
    creditCard.hidden = false;
    paypal.hidden = true;
    bitcoin.hidden = true;
  } else if (e.target.value === "paypal") {
    creditCard.hidden = true;
    paypal.hidden = false;
    bitcoin.hidden = true;
  } else if (e.target.value === "bitcoin") {
    creditCard.hidden = true;
    paypal.hidden = true;
    bitcoin.hidden = false;
  }
});

// Styling of error messages
function alert () {
  const alertImage = document.createElement('span');
  const image = `           <img src="https://upload-icon.s3.us-east-2.amazonaws.com/uploads/icons/png/20924305121543238852-512.png" alt="icon of exclamation mark inside triangle" width= "20" height="20">`;
  alertImage.innerHTML = image;
  return alertImage;
}

function errorMessageStyling(incorrectInput) {
  if (incorrectInput.children.length === 0) {
    incorrectInput.appendChild(alert());
  }
  incorrectInput.style.color = "red";
  incorrectInput.hidden = false;
  return true;
}

// Regular expressions to test validity
// 1. Name input field
const nameRegex = /\S/;
const nameInput = document.getElementById('name');
let nameLabel = document.querySelector('label[for=name]');
const validateMessageName = document.createElement('p');
nameLabel.appendChild(validateMessageName);
validateMessageName.hidden = true;
validateMessageName.textContent = `Please fill out your name. The field must contain at least one character.`;

function validateName() {
  validateMessageName.hidden = true;
  if (nameRegex.test(nameInput.value)) {
    nameInput.style.border = "none";
    validateMessageName.hidden = true;
    return true;
  } else {
    validateMessageName.hidden = false;
    nameInput.style.border = "3px solid red";
    errorMessageStyling(validateMessageName);
    return false;
  }
}

nameInput.addEventListener('keyup', (e) => {
  validateName(e.target.value);
});

// 2. Email input field
const emailRegex = /^[^@.]+\@[^.@]+\.[a-z][a-z]+$/i;
const emailRegexShort = /^[^@.]+$/;

const emailInput = document.getElementById('mail');
let emailLabel = document.querySelector('label[for=mail]');
const validateMessageEmail = document.createElement('p');
emailLabel.appendChild(validateMessageEmail);
validateMessageEmail.hidden = true;
const text = `Please fill out a valid emailaccount (for example: name@monkey.com)`;
const textShort = `Please fill out a valid emailaccount (must contain an @-sign and a dot)`
validateMessageEmail.textContent = "";

function validateEmail() {
  validateMessageEmail.hidden = true;
  if (emailRegex.test(emailInput.value)) {
    emailInput.style.border = "none";
    validateMessageEmail.hidden = true;
    return true;
  } else if (emailRegexShort.test(emailInput.value)) {
    validateMessageEmail.textContent = textShort;
    validateMessageEmail.hidden = false;
    emailInput.style.border = "3px solid red";
    errorMessageStyling(validateMessageEmail);
    return false;
  } else {
    validateMessageEmail.textContent = text;
    validateMessageEmail.hidden = false;
    emailInput.style.border = "3px solid red";
    errorMessageStyling(validateMessageEmail);
    return false;
  }
}

emailInput.addEventListener('keyup', (e) => {
  validateEmail(e.target.value);
});

// 3. Activity input field
const validateMessageActivity = document.createElement('span');
activSection.appendChild(validateMessageActivity);
validateMessageActivity.hidden = true;
validateMessageActivity.textContent = `Please select at least one activity`;

function validateActivitySection() {
  validateMessageActivity.hidden = true;
  let counter = 0;
  for (let i = 0; i < activityList.length; i++) {
    if (activityList[i].checked) {
      console.log(counter);
      counter =+ 1;
    }
  }
  if (counter >= 1) {
    validateMessageActivity.hidden = true;
    return true;
  } else {
    validateMessageActivity.hidden = false;
    errorMessageStyling(validateMessageActivity);
    return false;
  }
}

// 4. Creditcard input fields
const creditNumRegex = /^\d{13}\d?\d?\d?$/;
const creditNumInput = document.getElementById('cc-num');
let creditNumLabel = document.querySelector('label[for=cc-num]');
const validateMessageCreditNum = document.createElement('p');
creditNumLabel.appendChild(validateMessageCreditNum);
validateMessageCreditNum.hidden = true;
validateMessageCreditNum.textContent = `Please fill out a 13 to 16 digit combination.`;

function validateCreditCardNo() {
  validateMessageCreditNum.hidden = true;
  if (creditNumRegex.test(creditNumInput.value)) {
    creditNumInput.style.border = "none";
    validateMessageCreditNum.hidden = true;
    return true;
  } else {
    validateMessageCreditNum.hidden = false;
    creditNumInput.style.border = "3px solid red";
    errorMessageStyling(validateMessageCreditNum);
    return false;
  }
}

creditNumInput.addEventListener('keyup', (e) => {
  validateCreditCardNo(e.target.value);
});


const zipCodeRegex = /^\d{5}$/;
const zipCodeInput = document.getElementById('zip');
let zipCodeLabel = document.querySelector('label[for=zip]');
const validateMessageZipCode = document.createElement('p');
zipCodeLabel.appendChild(validateMessageZipCode);
validateMessageZipCode.hidden = true;
validateMessageZipCode.textContent = `Please fill out a 5 digit number.`;

function validateZipCode() {
  validateMessageZipCode.hidden = true;
  if (zipCodeRegex.test(zipCodeInput.value)) {
    zipCodeInput.style.border = "none";
    validateMessageZipCode.hidden = true;
    return true;
  } else {
    validateMessageZipCode.hidden = false;
    zipCodeInput.style.border = "3px solid red";
    errorMessageStyling(validateMessageZipCode);
    return false;
  }
}

zipCodeInput.addEventListener('keyup', (e) => {
  validateZipCode(e.target.value);
});

const cvvRegex = /^\d{3}$/;
const cvvInput = document.getElementById('cvv');
let cvvLabel = document.querySelector('label[for=cvv]');
const validateMessageCVV = document.createElement('p');
cvvLabel.appendChild(validateMessageCVV);
validateMessageCVV.hidden = true;
validateMessageCVV.textContent = `Please fill out a 3 digit number.`;

function validateCVV() {
  validateMessageCVV.hidden = true;
  if (cvvRegex.test(cvvInput.value)) {
    cvvInput.style.border = "none";
    validateMessageCVV.hidden = true;
    return true;
  } else {
    validateMessageCVV.hidden = false;
    cvvInput.style.border = "3px solid red";
    errorMessageStyling(validateMessageCVV);
    return false;
  }
}

cvvInput.addEventListener('keyup', (e) => {
  validateCVV(e.target.value);
});

// Overall validity check
function formValidation() {
  if (paymentMethod.value === "credit card") {
    if (validateName() && validateEmail() && validateActivitySection() && validateCreditCardNo() && validateZipCode() && validateCVV()) {
      return true;
    } else {
      if (!validateName()) {
        validateName();
      }
      if (!validateEmail()) {
        validateEmail();
      }
      if (!validateActivitySection()) {
        validateActivitySection();
      }
      if (!validateCreditCardNo()) {
        validateCreditCardNo();
      }
      if (!validateZipCode()) {
        validateZipCode();
      }
      if (!validateCVV()) {
        validateCVV();
      }
    return false;
    }
  } else if (paymentMethod.value === "paypal" || paymentMethod.value === "bitcoin") {
    if (validateName() && validateEmail() && validateActivitySection()) {
      return true;
    } else {
      if (!validateName()) {
        validateName();
      }
      if (!validateEmail()) {
        validateEmail();
      }
      if (!validateActivitySection()) {
        validateActivitySection();
      }
    return false;
    }
  } else if (paymentMethod.value === "select method") {
    validateName();
    validateEmail();
    validateActivitySection();
    validateCreditCardNo();
    validateZipCode();
    validateCVV();
    return false;
  } else {
    return false;
  }
}

// Submit event initiates validation
const form = document.querySelector('form');
form.addEventListener('submit', () => {
  if (!formValidation()) {
    event.preventDefault();
  } else {
    form.submit();
  }
});
