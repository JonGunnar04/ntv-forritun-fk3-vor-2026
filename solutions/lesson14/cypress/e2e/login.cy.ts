describe('Login (E2E)', () => {
  beforeEach(() => {
    cy.clearAllSessionStorage();
  });

  it('Login and redirect to welcome page', () => {
    cy.visit('/login');
    cy.findByLabelText(/Notandanafn/).type('kennari');
    cy.findByLabelText(/Lykilorð/).type('lykilorð');
    cy.findByRole('button', { name: /Skrá inn/ }).click();
    cy.location('pathname').should('eq', '/velkominn');
    cy.findByRole('heading', { name: /Velkomin\(n\) inn/ }).should(
      'be.visible',
    );
  });

  it('Unauthenticated user is redirected to login page and then to welcome page after login', () => {
    cy.visit('/velkominn');
    cy.location('pathname').should('eq', '/login');
    cy.findByLabelText(/Notandanafn/).type('notandi');
    cy.findByLabelText(/Lykilorð/).type('eitthvað');
    cy.findByRole('button', { name: /Skrá inn/ }).click();
    cy.location('pathname').should('eq', '/velkominn');
    cy.findByRole('heading', { name: /Velkomin\(n\) inn/ }).should(
      'be.visible',
    );
  });

  it('logout and redirect to login page', () => {
    cy.visit('/login');
    cy.findByLabelText(/Notandanafn/).type('kennari');
    cy.findByLabelText(/Lykilorð/).type('lykilorð');
    cy.findByRole('button', { name: /Skrá inn/ }).click();
    cy.location('pathname').should('eq', '/velkominn');
    cy.findByRole('button', { name: /Skrá út/ }).click();
    cy.location('pathname').should('eq', '/login');
    cy.findByRole('heading', { name: /Innskráning/ }).should('be.visible');
  });
});
