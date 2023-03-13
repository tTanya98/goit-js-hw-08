import throttle from 'lodash.throttle';

const formEl = document.querySelector('.feedback-form');
const USER_FORM = 'feedback-form-state';

let formData = JSON.parse(localStorage.getItem(USER_FORM)) || {};

formEl.addEventListener('input', throttle(storageFormData, 500));
formEl.addEventListener('submit', onFormSubmit);
reloadPage();

function storageFormData(e) {
    formData[e.target.name] = e.target.value.trim();
    localStorage.setitem(USER_FORM, JSON.stringify(formData));
}

function onFormSubmit(e) {
    e.preventDefault();
    if (refs.input.value === "" && refs.textarea.value === "") {
        return alert(`Please, fill all the fields!`);
    }
    const { email, message } = e.currentTarget.elemnts;
    e.currentTarget.reset();
    localStorage.removeItem(USER_FORM);
    formData = {};
}

function reloadPage() {
    if (formData) {
        let { email, message } = formEl.elements;
        email.value = formData.email || '';
        message.value = formData.message || '';
    }
}
