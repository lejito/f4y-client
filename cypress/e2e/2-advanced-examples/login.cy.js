describe("Login Page", () => {
  beforeEach(() => {
    cy.visit("http://localhost:4200/login");
  });

  it("should display the logo", () => {
    cy.get('div[class="login-logo"]').should("be.visible");
  });

  it("should have input fields for identification type, number, and password", () => {
    cy.get("select[id='tipoIdentificacion']").should("be.visible");
    cy.get("input[id='numeroIdentificacion']").should("be.visible");
    cy.get("input[id='clave']").should("be.visible");
  });

  it("should display a message after clicking the login button without text", () => {
    cy.get("button[class='form__button']").click();
    cy.get("span[class='form__invalid-text']").should("be.visible");
  });
});
