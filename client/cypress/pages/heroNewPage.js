export default class HeroNewPage {
    selectorsList() {
        return {
            nameInput: "[data-cy='nameInput']",
            priceInput: "[data-cy='priceInput']",
            fansInput: "[data-cy='fansInput']",
            savesInput: "[data-cy='savesInput']",
            powersSelect: "[data-cy='powersSelect']",
            avatarFile: "[data-cy='avatarFile']",
            submitButton: "button",
        };
    }

    accessNewHeroPage() {
        cy.visit('/heroes/new');
    }

    fillHeroForm({ name, price, fans, saves }) {
        cy.get(this.selectorsList().nameInput).clear().type(name);
        cy.get(this.selectorsList().priceInput).clear().type(`${price}`);
        cy.get(this.selectorsList().fansInput).clear().type(`${fans}`);
        cy.get(this.selectorsList().savesInput).clear().type(`${saves}`);

        cy.get(this.selectorsList().powersSelect).then(($select) => {
            const firstOption = $select.find('option').first();
            if (firstOption.length) {
                cy.wrap($select).select(firstOption.val().toString());
            }
        });
    }

    uploadAvatar(filePath) {
        cy.get(this.selectorsList().avatarFile).selectFile(filePath, { force: true });
    }

    submitHeroForm() {
        cy.contains('button', 'Submit').click();
    }
}
