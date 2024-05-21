describe("Login Page", () => {
  beforeEach(() => {
    cy.visit("http://localhost:4200/login");
  });

  it("should display the logo", () => {
    cy.get("[data-cy=login-logo]").should("be.visible");
  });

  it("should have input fields for identification type, number, and password", () => {
    cy.get("[data-cy=tipoIdentificacion]").should("be.visible");
    cy.get("[data-cy=numeroIdentificacion]").should("be.visible");
    cy.get("[data-cy=clave]").should("be.visible");
  });

  it("should display a message after clicking the login button", () => {
    cy.get("[data-cy=login-button]").click();
    cy.get("[data-cy=login-message]").should("be.visible");
  });
});
