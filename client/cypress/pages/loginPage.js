export default class LoginPage {
    
    selectorsList() {
        const selectors = {
            loginButton: "nav button",
            emailField: "[data-cy='email']",
            passwordField: "[data-cy='password']",
            submitButton: "[novalidate=''] button",
            confirmLogin: "[href='/heroes/new']",
            errorMessage: "[novalidate=''] .text-red-500"
        };
        return selectors;
    }

    accessLoginArea() {
        cy.visit('/heroes');
    }

    loginValid(email, password) {
        cy.get(this.selectorsList().loginButton).click();
        cy.get(this.selectorsList().emailField).type(email);
        cy.get(this.selectorsList().passwordField).type(password);
        cy.get(this.selectorsList().submitButton).click();
        cy.get(this.selectorsList().confirmLogin).should('be.visible');
    }

    loginInvalid(email, invalidPassword) {
        cy.get(this.selectorsList().loginButton).click();
        cy.get(this.selectorsList().emailField).type(email);
        cy.get(this.selectorsList().passwordField).type(invalidPassword);
        cy.get(this.selectorsList().submitButton).click();
        cy.get(this.selectorsList().errorMessage).should('be.visible');
    }
}