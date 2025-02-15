describe('Date Notice Page', () => {
    it('The user has no notifications', () => {
        cy.visit('/');

        cy.get('[data-testid="email-input"]').type('trusted@example.com');
        cy.get('[data-testid="password-input"]').type('admin123');
        cy.get('[data-testid="submit-button"]').click();

        cy.wait(1000);

        cy.get('a[href*="/dates/all"]').click();
        cy.get('a[href*="/dates/notice"]').click();
        cy.url().should('include', 'dates/notice');

        cy.get('h2').should('have.text', 'Настройка каналов');

        cy.get('.channel-open-btn').click();
        cy.get('.channel-modal-overlay').should('be.visible');
        
        cy.get('h3').should('contain', 'Email');

        cy.get('.channel-input').should('exist');
        
        cy.get('.channel-add-btn').should('exist')
            .and('be.disabled');

        cy.get('.channel-input').type('test@example.com');

        cy.get('.channel-add-btn').should('be.enabled');

        cy.get('.channel-input').clear();
        cy.get('.channel-add-btn').should('be.disabled');

        cy.get('h3').should('contain', 'Telegram');

        cy.get('.channel-add-btn').should('exist')
            .and('be.enabled');

        cy.get('.channel-modal-close').should('exist')
            .and('be.visible');

        cy.get('.channel-modal-close').click();
        cy.get('.channel-modal-overlay').should('not.exist');
        
        cy.get('.channel-open-btn').click();
        cy.get('.channel-modal-overlay').should('be.visible');
        cy.get('.channel-modal-content').should('be.visible');

        cy.get('.channel-modal-overlay').click('topLeft');
        cy.get('.channel-modal-overlay').should('not.exist');
    });
    

    it('The user has notifications', () => {
        cy.visit('/');

        cy.get('[data-testid="email-input"]').type('admin@example.com');
        cy.get('[data-testid="password-input"]').type('admin123');
        cy.get('[data-testid="submit-button"]').click();

        cy.wait(1000);

        cy.get('a[href*="/dates/all"]').click();
        cy.get('a[href*="/dates/notice"]').click();
        cy.url().should('include', 'dates/notice');
        cy.get('h2').should('have.text', 'Настройка уведомлений');
        cy.get('.form-group').should('contain', 'Выбирите время получения сообщений:');
        cy.get('.form-group').should('contain', 'За какое количество дней до события присылать сообщение (значение от 1 до 30)?');
        cy.get('.form-group').should('contain', 'Какое количество дней после события присылать сообщение (значение от 1 до 30)?');
        cy.get('h3').should('have.text', 'Выбирите даты, по которым будите получать сообщения:');
    });

    
});
