describe('Tree Page', () => {
    before(() => {
        cy.visit('/');

        cy.get('[data-testid="email-input"]').type('admin@example.com');
        cy.get('[data-testid="password-input"]').type('admin123');
        cy.get('[data-testid="submit-button"]').click();

        cy.wait(1000);
    });

    it('Open tree, content page', () => {
        cy.get('#people_order_age').click();
        cy.get('a[href="/tree/person/6?people_order=age"]').click();
        cy.url().should('include', 'tree/person/6?people_order=age');
        cy.get('h2').should('have.text', 'Древо для Burkina Natalia Vladimirovna');
        cy.get('.nav-list').should('be.visible');
        cy.get('a[href="/tree/window?person_id=6"]').should('be.visible');
        cy.get('a[href="/download/tree?person_id=6"]').should('be.visible');
        cy.get('a[href="/person/6?person_id=6"]').should('be.visible');
        cy.get('#tree-object-container').should('be.visible');
        cy.get('image[data-path="/person/7"]').should('be.visible');
        cy.get('image[data-path="/tree/person/7"]').should('be.visible');

        cy.get('a[href="/person/6?person_id=6"]').click();
        cy.url().should('include', 'person/6?person_id=6');

        cy.get('a[href="/tree/person/6"]').first().click();
        cy.url().should('include', 'tree/person/6');

        cy.get('a[href="/download/tree?person_id=6"]').click();
        cy.readFile('cypress/downloads/danshin_genealogy_tree_6.svg').should('exist');

        cy.get('a[href="/tree/window?person_id=6"]').should('have.attr', 'target', '_blank');
    });
});