"use strict";

let formElem = document.querySelector(".form");

formElem.addEventListener("submit", (event) => {
    event.preventDefault();
    validate(document.forms["user-registration"].elements);
});

function validate(fields) {
    fields = Array.from(fields);
    fields.forEach(field => {
        //campo vazio
        if(field.value.length === 0 || field.value === '') {
            //filtra campos
            if(field.type === "text" || field.type === "email" || field.type === "password") {
                if(!checkInvalid(field))
                    showIsInvalid(field);
            }
        }else{
            if(checkInvalid(field))      
                hiddenInvalid(field);
        }
    });
}

function checkInvalid(input) {
    if(input.nextSibling && input.classList.contains("is-invalid")) {
        return true;
    }else{
        return false;
    }
}

function hiddenInvalid(input) {
    input.nextSibling.remove();
    input.classList.remove('is-invalid');
    input.classList.remove('is-invalid__email');
}

function showIsInvalid(input) {
    let elemMsg = document.createElement("span");
    elemMsg.setAttribute("class", "alert-error");
    if(input.type === "text" || input.type === "password") {
        elemMsg.textContent = `${input.dataset.name} cannot be empty`; 
        input.placeholder = '';
    }else if(input.type === "email") {
        elemMsg.textContent = `Looks like this is not an email`;
        input.placeholder = 'email@example.com';
        input.classList.add('is-invalid__email');
    }
    input.classList.add('is-invalid');
    input.after(elemMsg);
}