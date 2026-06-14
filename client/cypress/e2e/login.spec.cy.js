import LoginPage from '../pages/loginPage';
import infos from '../fixtures/infos.json';

const loginPage = new LoginPage();

describe('Testes área de login', () => {
    it('CT01 - Login válido', () => {
        loginPage.accessLoginArea();
        loginPage.loginValid(infos.validUser.email, infos.validUser.password);
    });

    it('CT02 - Login inválido', () => {
        loginPage.accessLoginArea();
        loginPage.loginInvalid(infos.invalidUser.email, infos.invalidUser.password);
    });
})
