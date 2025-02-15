describe('Date All Page', () => {
    before(() => {
        cy.visit('/');

        cy.get('[data-testid="email-input"]').type('admin@example.com');
        cy.get('[data-testid="password-input"]').type('admin123');
        cy.get('[data-testid="submit-button"]').click();

        cy.wait(1000);
    });

    it('Content: dates all, navigation', () => {
        cy.get('a[href*="/dates/all"]').click();
        cy.url().should('include', 'dates/all');
        cy.get('h2').should('have.text', 'Список доступных дат');
        cy.get('.dates-container').should('contain', 'День рождения');
        cy.get('.dates-container').should('contain', 'Danshin');
        cy.get('.dates-container').should('contain', 'Tikhonovich');
        cy.get('a[href*="/dates/all"]').should('be.visible');
        cy.get('a[href*="/dates/upcoming"]').should('be.visible');
        cy.get('a[href*="/dates/notice"]').should('be.visible');

        cy.get('a[href*="/dates/upcoming"]').click();
        cy.get('h2').should('have.text', 'Список ближайших дат');

        cy.get('.nav-list a[href*="/dates/all"]').click();
        cy.get('h2').should('have.text', 'Список доступных дат');
    });
});