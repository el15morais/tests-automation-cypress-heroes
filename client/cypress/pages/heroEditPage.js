export default class HeroEditPage {
    selectorsList() {
        return {
            deleteButton: 'button',
            confirmDeleteButton: "button:contains('Yes')",
        };
    }

    deleteHero() {
        cy.contains('button', 'Delete Hero').click();
    }

    confirmDelete() {
        cy.contains('button', 'Yes').click();
    }
}
