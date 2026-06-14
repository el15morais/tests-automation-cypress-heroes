import HeroesPage from '../pages/heroesPage';
import HeroNewPage from '../pages/heroNewPage';
import infos from '../fixtures/infos.json';

const heroesPage = new HeroesPage();
const heroNewPage = new HeroNewPage();

describe('Testes área de heróis', () => {
    it('CT03 - Listagem de heróis após login', () => {
        cy.login(infos.validUser.email, infos.validUser.password);
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
        cy.login(infos.validUser.email, infos.validUser.password);

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

    it('CT05 - Controle de permissão (UI)', () => {
        cy.login(infos.commonUser.email, infos.commonUser.password);
        heroesPage.accessHeroesPage();

        cy.contains('Create New Hero').should('not.exist');
        heroesPage.getFirstHeroCard().within(() => {
            cy.get("[data-cy='pencil']").should('not.exist');
            cy.get("[data-cy='trash']").should('not.exist');
        });

        cy.contains('button', 'Logout').click();

        cy.login(infos.validUser.email, infos.validUser.password);
        heroesPage.accessHeroesPage();

        cy.contains('Create New Hero').should('be.visible');
        heroesPage.getFirstHeroCard().within(() => {
            cy.get("[data-cy='pencil']").should('be.visible');
            cy.get("[data-cy='trash']").should('be.visible');
        });

        cy.contains('button', 'Create New Hero').click();
        cy.url().should('include', '/heroes/new');
    });

    it('CT06 - Editar herói', () => {
        cy.login(infos.validUser.email, infos.validUser.password);
        heroesPage.accessHeroesPage();

        const updatedName = `Edited Hero ${Date.now()}`;
        const heroData = {
            name: updatedName,
            price: 99,
            fans: 99,
            saves: 99,
        };

        heroesPage.getFirstHeroCard().within(() => {
            cy.get("[data-cy='pencil']").click();
        });

        cy.url().should('include', '/heroes/').and('include', '/edit');
        heroNewPage.fillHeroForm(heroData);
        heroNewPage.submitHeroForm();

        cy.url().should('include', '/heroes');
        cy.contains('[data-cy="name"]', updatedName).should('be.visible');
    });
});
