describe('Heimasíða (E2E)', () => {
  it('Front page components are visible', () => {
    cy.visit('/');
    cy.findByRole('heading', {
      name: /Verkefni 14 — Storybook og prófanir/,
    }).should('be.visible');
    cy.findByRole('heading', { name: /Teljari/ }).should('be.visible');
    cy.findByRole('heading', { name: /Kveðja/ }).should('be.visible');
    cy.findByRole('heading', { name: /Quote/ }).should('be.visible');
  });
});
