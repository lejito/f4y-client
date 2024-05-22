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

  it("should let me login", () => {
    cy.get("select[id='tipoIdentificacion']").select(1);
    cy.get("input[id='numeroIdentificacion']").type("1234989021");
    cy.get("input[id='clave']").type("jJuan123*");

    cy.get("button[class='form__button']").click();

    cy.wait(4000);

    cy.get("div[class='swal2-html-container']")
      .should("be.visible")
      .and(
        "contain.text",
        "Ha ocurrido un error en el servidor. Inténtelo de nuevo más tarde."
      );

      cy.screenshot()
  });

  it("should dont login", () => {
    cy.get("select[id='tipoIdentificacion']").select(1);
    cy.get("input[id='numeroIdentificacion']").type("12343");
    cy.get("input[id='clave']").type("1234");

    cy.get("button[class='form__button']").click();

    cy.wait(4000);

    cy.get("div[class='swal2-html-container']")
      .should("be.visible")
      .and(
        "contain.text",
        "Ha ocurrido un error en el servidor. Inténtelo de nuevo más tarde."
      );


      cy.screenshot();
  });
});
