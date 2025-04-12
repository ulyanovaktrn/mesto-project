const showInputError = (popupForm, formInput, errorMessage, settings) => {
    const formError = popupForm.querySelector(`.${formInput.name}-input-error`);
    //console.log(`.${formInput.name}-input-error`);
  
    formInput.classList.add(settings.inputErrorClass);
    formError.textContent = errorMessage;
    formError.classList.add(settings.errorClass);
};
  

const hideInputError = (popupForm, formInput, settings) => {
    const formError = popupForm.querySelector(`.${formInput.name}-input-error`);
  
    formInput.classList.remove(settings.inputErrorClass);
    formError.classList.remove(settings.errorClass);
    formError.textContent = '';
};


const isValid = (popupForm, formInput, settings) => {
    if (!formInput.validity.valid) {
      showInputError(popupForm, formInput, formInput.validationMessage, settings);
      console.log('smth');
    } else {
      hideInputError(popupForm, formInput, settings);
    };
  };


const setEventListeners = (popupForm, settings) => {
    const inputList = Array.from(popupForm.querySelectorAll(settings.inputSelector));
    const buttonElement = popupForm.querySelector(settings.submitButtonSelector);
    toggleButtonState(inputList, buttonElement, settings);

    inputList.forEach((formInput) => {
        formInput.addEventListener('input', () => {
            isValid(popupForm, formInput, settings);
            toggleButtonState(inputList, buttonElement, settings);
        });
    });
};


const enableValidation = (settings) => {
    const formList = Array.from(document.querySelectorAll(settings.formSelector));

    formList.forEach((popupForm) => {
        popupForm.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });
        setEventListeners(popupForm, settings);
    });
};


const hasInvalidInput = (inputList) => {
    return inputList.some((formInput) => {
      return !formInput.validity.valid;
    })
};


const toggleButtonState = (inputList, buttonElement, settings) => {
    if (hasInvalidInput(inputList)) {
        inactivateButton(buttonElement, settings);
    } else {
        buttonElement.classList.remove(settings.inactiveButtonClass);
        buttonElement.disabled = false;
    }
};


const inactivateButton = (buttonItem, settings) => {
    buttonItem.classList.add(settings.inactiveButtonClass);
    buttonItem.setAttribute('disabled', true);
}


export {enableValidation, inactivateButton};