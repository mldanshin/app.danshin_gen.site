describe('Date All Page', () => {
    it('Content: dates all, navigation', () => {
        cy.loginAs('admin@example.com', 'admin123');

        cy.visit('/');

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