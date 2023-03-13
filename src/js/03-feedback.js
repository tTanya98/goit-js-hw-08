import throttle from 'lodash.throttle';

const formEl = document.querySelector('.feedback-form');
const USER_FORM = 'feedback-form-state';

formEl.addEventListener('input', throttle(storageFormData, 500));
formEl.addEventListener('submit', onFormSubmit);

let formData = JSON.parse(localStorage.getItem(USER_FORM)) || {};
const { email, message } = formEl.elements;
reloadPage();

function storageFormData(e) {
    formData = { email: email.value, message: message.value };
    localStorage.setItem(USER_FORM, JSON.stringify(formData));
}
function reloadPage() {
    if (formData) {
        email.value = formData.email || '';
        message.value = formData.message || '';
    }
}

function onFormSubmit(e) {
    e.preventDefault();
    console.log({ email: email.value, message: message.value });
    if (email.value === '' && message.value === '') {
        return alert(`Please, fill all the fields!`);

    }
    localStorage.removeItem(USER_FORM);
    e.currentTarget.reset(); 
    formData = {};
}