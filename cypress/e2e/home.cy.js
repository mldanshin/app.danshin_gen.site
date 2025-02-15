describe('Home Page', () => {
    beforeEach(() => {
        cy.visit('/');

        cy.get('[data-testid="email-input"]').type('admin@example.com');
        cy.get('[data-testid="password-input"]').type('admin123');
        cy.get('[data-testid="submit-button"]').click();

        cy.wait(1000);
    });

    it('Should have logout button', () => {
        cy.get('.logout-button').should('exist');
    });

    it('Should logout and redirect to SSO', () => {
        cy.get('.logout-button').click();

        cy.url({ timeout: 10000 }).should('include', '/login');
        cy.url().should('include', 'redirect=');

        cy.get('[data-testid="email-input"]').should('be.visible');
        cy.get('[data-testid="password-input"]').should('be.visible');
    });

    it('Should have logout button', () => {
        cy.get('.logout-button').should('exist');
    });

    it('Navigation', () => {
        cy.get('a[href*="/download/db"]').should('be.visible');
        cy.get('a[href*="/download/people"]').should('be.visible');
        cy.get('a[href*="/download/photo"]').should('be.visible');
        cy.get('a[href*="/dates/all"]').should('be.visible');
    });

    it('Should hide and open the panel with people', () => {
        cy.get('.aside').should('be.visible');
        cy.get('[data-testid="people-visibility-toggle-haeder"]').click();
        cy.get('.aside').should('not.be.visible');
        cy.get('[data-testid="people-visibility-toggle-haeder"]').click();
        cy.get('.aside').should('be.visible');
        cy.get('[data-testid="people-visibility-toggle-aside"]').click();
        cy.get('.aside').should('not.be.visible');
        cy.get('[data-testid="people-visibility-toggle-haeder"]').click();
        cy.get('.aside').should('be.visible');
    });

    it('People Sort By', () => {
        cy.get('.aside').should('be.visible');
        cy.get('#people_order_name').should('be.checked');
        cy.get('.people-person-links a').first().should('contain', 'Burkina');
        cy.get('#people_order_age').click();
        cy.url().should('include', '?people_order=age');
        cy.get('.people-person-links a').first().should('contain', 'Fakefake');
        cy.get('#people_order_name').click();
        cy.url().should('include', '?people_order=name');
        cy.get('.people-person-links a').first().should('contain', 'Burkina');
        cy.get('.people-person-links a').contains('Burkina').click();
        cy.url().should('include', 'person/6?people_order=name');
    });

    it('People search', () => {
        cy.get('.aside').should('be.visible');
        cy.get('#people_search').type('Burkina', { delay: 100 });
        cy.wait(500);
        cy.get('.people-person-links').should('have.length', 1);
        cy.get('.people-person-links a').first().should('contain', 'Burkina');
        cy.url().should('include', '?people_order=name&people_search=Burkina');
        cy.get('.people-person-links a').contains('Burkina').click();
        cy.url().should('include', 'person/6?people_order=name&people_search=Burkina');
    });

    it('Download', () => {
        cy.get('a[href*="/download/db"]').click();
        cy.readFile('cypress/downloads/db').should('exist');
    });
});