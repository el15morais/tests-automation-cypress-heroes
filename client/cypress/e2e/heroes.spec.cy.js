import HeroesPage from '../pages/heroesPage';
import HeroNewPage from '../pages/heroNewPage';
import infos from '../fixtures/infos.json';

const heroesPage = new HeroesPage();
const heroNewPage = new HeroNewPage();

describe('Testes área de heróis', () => {
    beforeEach(() => {
        cy.login(infos.validUser.email, infos.validUser.password);
    });

    it('CT03 - Listagem de heróis após login', () => {
        heroesPage.accessHeroesPage();

        heroesPage.getHeroCards().should('have.length.at.least', 1);

        heroesPage.getFirstHeroCard().within(() => {
            cy.get(heroesPage.selectorsList().heroName).should('be.visible').and('not.be.empty');
            cy.get(heroesPage.selectorsList().heroPrice).should('be.visible').and('contain.text', '$');
            cy.get(heroesPage.selectorsList().heroFans).should('be.visible').and('not.be.empty');
            cy.get(heroesPage.selectorsList().heroSaves).should('be.visible').and('not.be.empty');
            cy.get(heroesPage.selectorsList().heroAvatar)
                .should('be.visible')
                .and('have.attr', 'src')
                .and('not.be.empty');
        });
    });

    it('CT04 - Criar novo herói', () => {
        const heroName = `E2E Hero ${Date.now()}`;
        const heroData = {
            name: heroName,
            price: 42,
            fans: 5,
            saves: 3,
        };

        heroNewPage.accessNewHeroPage();
        heroNewPage.fillHeroForm(heroData);
        heroNewPage.submitHeroForm();

        cy.url().should('include', '/heroes');
        cy.contains('[data-cy="name"]', heroName).should('be.visible');
    });
});
