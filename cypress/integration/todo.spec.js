// cypress/integration/todo.spec.js
describe("Todo App", () => {
  beforeEach(() => {
    cy.visit("http://localhost:4200");
  });

  it("should display the todo list", () => {
    cy.get(".todo-list").should("be.visible");
  });

  it("should add a new todo item", () => {
    cy.get('input[name="new-todo"]').type("Buy milk{enter}");
    cy.get(".todo-list").should("contain", "Buy milk");
  });

  it("should delete a todo item", () => {
    cy.get(".todo-list li").first().find(".delete-button").click();
    cy.get(".todo-list li").should("have.length", 0);
  });
});
