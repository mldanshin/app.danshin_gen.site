describe('Person Page', () => {
    before(() => {
        cy.visit('/');

        cy.get('[data-testid="email-input"]').type('admin@example.com');
        cy.get('[data-testid="password-input"]').type('admin123');
        cy.get('[data-testid="submit-button"]').click();

        cy.wait(1000);
    });

    it('Open card, card content', () => {
        cy.get('.people-person-links a').contains('Burkina').click();

        cy.get('a[href*="/tree/person/6"]').should('be.visible');
        cy.get('a[href*="/download/person?person_id=6"]').should('be.visible');
        cy.url().should('include', 'person/6');
        cy.get('h2').should('have.text', 'Карточка на Burkina Natalia Vladimirovna');
        cy.get('.person-card').should('contain', 'Живой');
        cy.get('.person-card').should('contain', 'Женский');
        cy.get('.person-card').should('contain', 'ФамилияBurkina');
        cy.get('.person-card').should('contain', 'ИмяNatalia');
        cy.get('.person-card').should('contain', 'ОтчествоVladimirovna');
        cy.get('.person-card').should('contain', 'Дата рождения18.01.1988');
        cy.get('.person-card').should('contain', 'Место рожденияKemerovo');
        cy.get('.person-card').should('contain', 'Электронная почтаnatali@fakemail.ru');
        cy.get('.person-card').should('contain', 'Телефоны9992222222');
        cy.get('.person-card').should('contain', 'Брак (сожительство)');
        cy.get('.person-card').should('contain', 'МужDanshin (Fake,AFake) Maxim Leonidovich');
        cy.get('.person-card').should('contain', 'ДетиDanshin Denis Maksimovich');

        cy.get('a[title="Открыть карточку"]').contains('Danshin (Fake,AFake) Maxim Leonidovich').click();
        cy.url().should('include', 'person/5');
        cy.get('h2').should('have.text', 'Карточка на Danshin Maxim Leonidovich');
        cy.get('.person-card').should('contain', 'Живой');
        cy.get('.person-card').should('contain', 'Мужской');
        cy.get('.person-card').should('contain', 'ФамилияDanshin');
        cy.get('.person-card').should('contain', 'Прежние фамилииFakeAFake');
        cy.get('.person-card').should('contain', 'ИмяMaxim');
        cy.get('.person-card').should('contain', 'ОтчествоLeonidovich');
        cy.get('.person-card').should('contain', 'Дата рождения18.11.1979');
        cy.get('.person-card').should('contain', 'Место рожденияKemerovo');
        cy.get('.person-card').should('contain', 'Примечаниеfakenote');
        cy.get('.person-card').should('contain', 'Электронная почтаmail@danshin.net');
        cy.get('.person-card').should('contain', 'Телефоны99911122229998882222');
        cy.get('.person-card').should('contain', 'Родители');
        cy.get('.person-card').should('contain', 'ОтецDanshin Leonid Pavlovich');
        cy.get('.person-card').should('contain', 'МатьDanshina (Pluta) Tatyana Ivanovna');
        cy.get('.person-card').should('contain', 'Брак (сожительство)');
        cy.get('.person-card').should('contain', 'ЖенаBurkina Natalia Vladimirovna');
        cy.get('.person-card').should('contain', 'ДетиDanshin Denis Maksimovich');
        cy.get('.person-card').should('contain', 'Братья, сёстры');
        cy.get('.person-card').should('contain', 'Danshin Egor Leonidovich');
        cy.get('.person-card').should('contain', 'Solovyova (Danshin) Oksana Leonidovna');

        cy.go('back');
        cy.url().should('include', 'person/6');
        cy.get('h2').should('have.text', 'Карточка на Burkina Natalia Vladimirovna');
        cy.get('a[title="Открыть карточку"]').contains('Danshin Denis Maksimovich').click();
        cy.url().should('include', 'person/7');
        cy.get('h2').should('have.text', 'Карточка на Danshin Denis Maksimovich');
        cy.get('.person-card').should('contain', 'Живой');
        cy.get('.person-card').should('contain', 'Мужской');
        cy.get('.person-card').should('contain', 'ФамилияDanshin');
        cy.get('.person-card').should('contain', 'ИмяDenis');
        cy.get('.person-card').should('contain', 'ОтчествоMaksimovich');
        cy.get('.person-card').should('contain', 'Дата рождения');
        cy.get('.person-card').should('contain', 'Место рождения');
        cy.get('.person-card').should('contain', 'Электронная почтаden@fakemail.ru');
        cy.get('.person-card').should('contain', 'Телефоны9993332222');
        cy.get('.person-card').should('contain', 'Родители');
        cy.get('.person-card').should('contain', 'ОтецDanshin (Fake,AFake) Maxim Leonidovich');
        cy.get('.person-card').should('contain', 'МатьBurkina Natalia Vladimirovna');
    });
});