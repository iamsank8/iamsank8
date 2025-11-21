describe('Portfolio E2E Tests', () => {
    beforeEach(() => {
        cy.visit('/');
    });

    it('should load the home page', () => {
        cy.contains('Sanket Thotange').should('be.visible');
    });

    it('should navigate to about page', () => {
        cy.contains('About').click();
        cy.url().should('include', '/about');
        cy.contains('About Me').should('be.visible');
    });

    it('should navigate to projects page', () => {
        cy.contains('Projects').click();
        cy.url().should('include', '/projects');
        cy.contains('My Projects').should('be.visible');
    });

    it('should navigate to skills page', () => {
        cy.contains('Skills').click();
        cy.url().should('include', '/skills');
        cy.contains('Technical Skills').should('be.visible');
    });

    it('should navigate to contact page', () => {
        cy.contains('Contact').click();
        cy.url().should('include', '/contact');
        cy.contains('Get In Touch').should('be.visible');
    });
});
