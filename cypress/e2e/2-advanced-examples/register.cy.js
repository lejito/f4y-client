describe("Register page", () => {
  beforeEach(() => {
    cy.visit("http://localhost:4200/register");
  });

  it("should display the back button", () => {
    cy.get('a[class="back-button"]').should("be.visible");
  });

  it("should have input fields for identification type,first name, last name, middle name,birth date,e-mail,password, password again", () => {
    cy.get("select[id='tipoIdentificacion']").should("be.visible");
    cy.get("input[id='numeroIdentificacion']").should("be.visible");
    cy.get("input[id='primerNombre']").should("be.visible");
    cy.get("input[id='segundoNombre']").should("be.visible");
    cy.get("input[id='primerApellido']").should("be.visible");
    cy.get("input[id='segundoApellido']").should("be.visible");
    cy.get("input[id='fechaNacimiento']").should("be.visible");
    cy.get("input[id='correo']").should("be.visible");
    cy.get("input[id='password']").should("be.visible");
    cy.get("input[id='repetirClave']").should("be.visible");
    cy.get("BUTTON[id='form__button']").should("be.visible");
  });

  it("should let me register", () => {
    cy.get("select[id='tipoIdentificacion']").select(1);
    cy.get("input[id='numeroIdentificacion']").type("1234989021");
    cy.get("input[id='primerNombre']").type("Juan");
    cy.get("input[id='segundoNombre']").type("Camilo");
    cy.get("input[id='primerApellido']").type("Naranjo");
    cy.get("input[id='segundoApellido']").type("Cuartas");
    cy.get("input[id='fechaNacimiento']").type("1998-03-06");
    cy.get("input[id='correo']").type("juanca.naranjo03@gmail.com");
    cy.get("input[id='password']").should("juan123");
    cy.get("input[id='repetirClave']").should("juan123");
    cy.get("BUTTON[id='form__button']").click();
  });

  it("should not let me register", () => {
    cy.get("select[id='tipoIdentificacion']").select(1);
    cy.get("input[id='numeroIdentificacion']").type("12");
    cy.get("input[id='primerNombre']").type("Juan");
    cy.get("input[id='segundoNombre']").type("Camilo");
    cy.get("input[id='primerApellido']").type("Naranjo");
    cy.get("input[id='segundoApellido']").type("Cuartas");
    cy.get("input[id='fechaNacimiento']").type("2024-03-06");
    cy.get("input[id='correo']").type("prueba@prueba");
    cy.get("input[id='password']").should("juan123");
    cy.get("input[id='repetirClave']").should("juan123");
    cy.get("BUTTON[id='form__button']").click();
  });
});
