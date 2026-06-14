export default class HeroesPage {
    selectorsList() {
        return {
            heroCard: "[data-cy='hero-card']",
            heroName: "[data-cy='name']",
            heroPrice: "[data-cy='price']",
            heroFans: "[data-cy='fans']",
            heroSaves: "[data-cy='saves']",
            heroAvatar: 'img',
        };
    }

    accessHeroesPage() {
        cy.visit('/heroes');
    }

    getHeroCards() {
        return cy.get(this.selectorsList().heroCard);
    }

    getFirstHeroCard() {
        return this.getHeroCards().first();
    }
}
