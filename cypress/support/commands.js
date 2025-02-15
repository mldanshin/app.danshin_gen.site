Cypress.Commands.add('loginAs', (email, password) => {
    cy.session(
        email,
        () => {
            cy.request({
                method: 'POST',
                url: 'http://localhost:8071/api/auth/login',
                body: { 
                    email: email,
                    password: password 
                }
            }).then((response) => {
                const token = response.body.token; 

                cy.window().then((win) => {
                    win.document.cookie = `access_token=${token}; Domain=localhost; Path=/; Secure=false; HttpOnly=false`;
                });
                window.localStorage.setItem('authToken', token);
            });
        }
    );
});