describe("Register page", () => {
  beforeEach(() => {
    cy.visit("https://f4y.vercel.app/");
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
    cy.get("input[id='clave']").should("be.visible");
    cy.get("input[id='repetirClave']").should("be.visible");
    cy.get("button[class='form__button']").should("be.visible");
    cy.get("input[id='tratamientoDatos']").should("be.visible");
    cy.get("input[id='tyc']").should("be.visible");

    cy.screenshot()
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
    cy.get("input[id='clave']").type("jJuan123*");
    cy.get("input[id='repetirClave']").type("jJuan123*");
    cy.get("input[id='tratamientoDatos']").should("be.visible").check();
    cy.get("input[id='tyc']").should("be.visible").check();
    cy.get("button[class='form__button']").click();
    
    cy.wait(5000)
    cy.get("div[class='swal2-html-container']")
    .should("be.visible")
    .and(
      "contain.text",
      "Login exitoso."
    );

    cy.screenshot()
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
    cy.get("input[id='clave']").type("jJuan123*");
    cy.get("input[id='repetirClave']").type("jJuan123*");
    cy.get("input[id='tratamientoDatos']").should("be.visible").check();
    cy.get("input[id='tyc']").should("be.visible").check();
    cy.get("button[class='form__button']").click();

    cy.wait(5000)
    
    cy.get("span[class='form__invalid-text']").should("be.visible");
    cy.screenshot()
  });
});
