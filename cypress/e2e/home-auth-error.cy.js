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
        cy.loginAs('user@example.com', 'admin123');

        cy.request({
            url: '/',
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(403);
            expect(response.body).to.contain('Forbidden');
            expect(response.headers['content-type']).to.include('text/plain');
        });
    });
});