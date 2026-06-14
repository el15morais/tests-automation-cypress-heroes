import HeroesPage from '../pages/heroesPage';
import HeroNewPage from '../pages/heroNewPage';
import HeroEditPage from '../pages/heroEditPage';
import infos from '../fixtures/infos.json';

const heroesPage = new HeroesPage();
const heroNewPage = new HeroNewPage();
const heroEditPage = new HeroEditPage();

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
        const heroName = `Hero To Edit ${Date.now()}`;
        const heroData = {
            name: heroName,
            price: 33,
            fans: 3,
            saves: 3,
        };

        heroNewPage.accessNewHeroPage();
        heroNewPage.fillHeroForm(heroData);
        heroNewPage.submitHeroForm();
        cy.contains('[data-cy="name"]', heroName).should('be.visible');

        cy.contains('[data-cy="name"]', heroName)
            .closest('[data-cy="hero-card"]')
            .within(() => {
                cy.get("[data-cy='pencil']").click();
            });

        cy.url().should('include', '/heroes/').and('include', '/edit');
        heroNewPage.fillHeroForm({
            name: updatedName,
            price: 99,
            fans: 99,
            saves: 99,
        });
        heroNewPage.submitHeroForm();

        cy.url().should('include', '/heroes');
        cy.contains('[data-cy="name"]', updatedName).should('be.visible');
    });

    it('CT07 - Excluir herói', () => {
        cy.login(infos.validUser.email, infos.validUser.password);
        const heroName = `Hero To Delete ${Date.now()}`;
        const heroData = {
            name: heroName,
            price: 11,
            fans: 1,
            saves: 1,
        };

        heroNewPage.accessNewHeroPage();
        heroNewPage.fillHeroForm(heroData);
        heroNewPage.submitHeroForm();

        cy.contains('[data-cy="name"]', heroName)
            .closest('[data-cy="hero-card"]')
            .within(() => {
                cy.get("[data-cy='pencil']").click();
            });

        cy.url().should('include', '/heroes/').and('include', '/edit');
        heroEditPage.deleteHero();
        heroEditPage.confirmDelete();

        cy.url().should('include', '/heroes');
        cy.contains('[data-cy="name"]', heroName).should('not.exist');
        cy.request(`/heroes?search=${encodeURIComponent(heroName)}`).its('body').should('be.an', 'array').and('have.length', 0);
    });

    it('CT08 - Upload de imagem do herói', () => {
        cy.login(infos.validUser.email, infos.validUser.password);
        const heroName = `Hero Upload ${Date.now()}`;
        const heroData = {
            name: heroName,
            price: 21,
            fans: 2,
            saves: 2,
        };

        heroNewPage.accessNewHeroPage();
        heroNewPage.fillHeroForm(heroData);
        heroNewPage.uploadAvatar('cypress/fixtures/avatar.jpg');
        heroNewPage.submitHeroForm();

        cy.url().should('include', '/heroes');
        heroesPage.getHeroCardByName(heroName).within(() => {
            cy.get('img')
                .should('be.visible')
                .and('have.attr', 'src')
                .and('not.include', 'empty-avatar');
            cy.get('[data-cy="name"]').should('contain.text', heroName);
        });
    });

    it('CT09 - Comprar herói', () => {
        cy.login(infos.validUser.email, infos.validUser.password);
        const heroName = `Hero Buy ${Date.now()}`;
        const heroData = {
            name: heroName,
            price: 13,
            fans: 3,
            saves: 3,
        };

        heroNewPage.accessNewHeroPage();
        heroNewPage.fillHeroForm(heroData);
        heroNewPage.submitHeroForm();

        heroesPage.getHeroCardByName(heroName).within(() => {
            cy.get('[data-cy="saves"]').invoke('text').then((text) => {
                const currentSaves = Number(text.replace(/\D/g, ''));
                cy.get("[data-cy='money']").click();
                cy.wrap(currentSaves).as('currentSaves');
            });
        });

        cy.contains('button', 'Yes').click();

        cy.get('@currentSaves').then((currentSaves) => {
            heroesPage.getHeroCardByName(heroName).within(() => {
                cy.get('[data-cy="saves"]').should('contain.text', currentSaves + 1);
            });
        });
    });

    it('CT10 - Marcar like no herói', () => {
        cy.login(infos.validUser.email, infos.validUser.password);
        const heroName = `Hero Like ${Date.now()}`;
        const heroData = {
            name: heroName,
            price: 14,
            fans: 4,
            saves: 4,
        };

        heroNewPage.accessNewHeroPage();
        heroNewPage.fillHeroForm(heroData);
        heroNewPage.submitHeroForm();

        heroesPage.getHeroCardByName(heroName).within(() => {
            cy.get('[data-cy="fans"]').invoke('text').then((text) => {
                const currentFans = Number(text.replace(/\D/g, ''));
                cy.get("[data-cy='like']").click();
                cy.get('[data-cy="fans"]').should('contain.text', currentFans + 1);
            });
        });
    });
});
