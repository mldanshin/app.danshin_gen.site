describe('Home Page Auth Error', () => {
    it('401 - Redirect', () => {
        cy.visit('/');

        cy.get('[data-testid="email-input"]').type('fakeuser@example.com');
        cy.get('[data-testid="password-input"]').type('fake123');
        cy.get('[data-testid="submit-button"]').click();

        cy.wait(1000);

        cy.get('[data-testid="email-input"]').should('be.visible');
        cy.get('[data-testid="password-input"]').should('be.visible');
    });
    it('403 - Error', () => {
        cy.visit('/');

        cy.get('[data-testid="email-input"]').type('user@example.com');
        cy.get('[data-testid="password-input"]').type('admin123');
        cy.get('[data-testid="submit-button"]').click();

        cy.wait(1000);

        cy.get('body').should('contain', 'Forbidden');
    });
});