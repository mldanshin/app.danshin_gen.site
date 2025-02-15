describe('Date upcoming page', () => {
    it('Content', () => {
        cy.visit('/');

        cy.get('[data-testid="email-input"]').type('admin@example.com');
        cy.get('[data-testid="password-input"]').type('admin123');
        cy.get('[data-testid="submit-button"]').click();

        cy.wait(1000);

        cy.get('a[href*="/dates/all"]').click();

        cy.get('a[href*="/dates/upcoming"]').click();
        cy.get('h2').should('have.text', 'Список ближайших дат');
    });
});