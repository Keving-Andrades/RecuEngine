import { Register } from './formsHandler.js';

// Function Listener Storage
const handlerFunctionListener = {};

/**
 * Close/unshow HTML Element with Escape key
 * @param {HTMLElement} element Element that can close with Escape key
 */
const escapeCloseElement = element => {
    const elementName = element.getAttribute('class').split(' ')[0] + '_onEscapeKey';
    return handlerFunctionListener[elementName] || (handlerFunctionListener[elementName] = key => {
        if (key.code === 'Escape') {
            window.removeEventListener('keydown', escapeCloseElement(element));
            document.removeEventListener('click', clickCloseElement(element));

            element.classList.remove('show');
        };
    });
};

/**
 * Close/unshow HTML Element with Click
 * @param {HTMLElement} element Element that can close with Click
 */
const clickCloseElement = element => {
    const elementName = element.getAttribute('class').split(' ')[0] + '_onClick';
    return handlerFunctionListener[elementName] || (handlerFunctionListener[elementName] = click => {
        if (!click.target.classList.contains('userMenu') && !click.target.classList.contains('userMenuSpan')) {
            window.removeEventListener('keydown', escapeCloseElement(element));
            document.removeEventListener('click', clickCloseElement(element));

            element.classList.remove('show');
        };
    });
};

document.addEventListener('DOMContentLoaded', () => {
	alertBox();

    const loggedUser = document.getElementById('loggedUser');
    if (loggedUser) {
        const userMenu = loggedUser.querySelector('.userMenu');
        loggedUser.addEventListener('click', () => {
            if (!userMenu.classList.contains('show')) {
                userMenu.classList.add('show');
                setTimeout(() => {
                    if (userMenu.classList.contains('show')) {
                        window.addEventListener('keydown', escapeCloseElement(userMenu));
                        document.addEventListener('click', clickCloseElement(userMenu));
                    };
                }, 300);
            };
        });
    };

	if (document.title === 'RecuEngine - Iniciar Sesión') {
        checkForm();
	};

	if (document.title === 'RecuEngine - Registrarse') {
        const formViews = document.getElementById('formViews');
        const formNavbar = document.getElementById('formNavbar');
        const nextBtn = document.getElementById('signInUpBtn');
        const registerForm = document.getElementById('signInUpForm');

        const register = new Register(formViews, formNavbar, nextBtn, registerForm);

        register.activate();

        if (register.currentActiveForm().classList.contains('form1')) {
            Array.from(register.currentActiveForm().children[1].children).forEach(e => {
                if (e.classList.contains('type')) {
                    e.addEventListener('click', () => {
                        if (!e.classList.contains('active')) {
                            Array.from(register.currentActiveForm().children[1].children).forEach(e => {
                                if (e.classList.contains('active')) {
                                    e.classList.remove('active');
                                    e.classList.add('inactive');
                                };
                            });

                            if (e.classList.contains('inactive')) e.classList.remove('inactive');
                            e.classList.add('active');
                            
                            register.currentActiveForm().querySelector('input').value = e.children[1].innerText;
                        };

                        if (!register.currentActiveForm().classList.contains('valid')) {
                            register.currentActiveForm().classList.add('valid');
                            register.currentActiveForm().classList.add('ready');
                            register.triggerFormEvent(register.currentActiveForm(), true, false);
                        };

                        if (register.currentActiveForm().children[0].classList.contains('invalid')) register.currentActiveForm().children[0].classList.remove('invalid');
                    });
                };
            });
        };
	};
});

const alertBox = () => {
    const alertBox = document.querySelector('.alertBox');
    const alertBoxCloseBtn = document.querySelector('.alertBox__container--close');

    if (alertBox !== null) {
        alertBoxCloseBtn.addEventListener('click', () => {
            closeAlertBox();
        })

        setTimeout(() => {
            alertBox.classList.add('show');
        }, 100);

        setTimeout(() => {
            closeAlertBox();
        }, 7200);

        const closeAlertBox = () => {
            alertBox.classList.remove('show');
            setTimeout(() => {
                alertBox.remove();
            }, 200);
        };
    };
};

const checkForm = () => {
    const signInForm = document.getElementById('signInUpForm');
    const signInBtn = document.getElementById('signInUpBtn');

    for (let i = 0; i < signInForm.elements.length; i++) {
        signInForm.elements[i].addEventListener('keyup', () => {
            if (signInForm.checkValidity() == true) {
                signInBtn.classList.add('next');
            } else {
                signInBtn.classList.remove('next');
            };
        });
    };

    signInBtn.addEventListener('click', () => {
        if (signInBtn.classList.contains('next')) {
            signInForm.submit();
        } else {
            for (let i = 0; i < signInForm.elements.length; i++) {
                if (signInForm[i].value.length == 0 || signInForm[i].checkValidity() == false) {
                    signInForm[i].focus();
                    break;
                };
            };
        };
    });
};