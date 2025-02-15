describe('Date upcoming page', () => {
    it('Content', () => {
        cy.loginAs('admin@example.com', 'admin123');

        cy.visit('/');

        cy.get('a[href*="/dates/all"]').click();

        cy.get('a[href*="/dates/upcoming"]').click();
        cy.get('h2').should('have.text', 'Список ближайших дат');
    });
});