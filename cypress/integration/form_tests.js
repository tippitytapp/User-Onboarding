describe('Testing All Input and Selector Fields', function(){
    beforeEach(function(){
        cy.visit("http://localhost:3000");
    })
    it("Adds text to fields, selects options, and submits form", function(){
        cy.get('#fname')
          .type("Marc")
          .should("have.value", "Marc");
        cy.get('#lname')
          .type("Tapp")
          .should("have.value", "Tapp");
        cy.get("#roles")
          .select("Backend Developer")
          .should("have.value", "Backend Developer")
        cy.get("#email")
          .type("marc.tapp@gmail.com")
          .should("have.value", "marc.tapp@gmail.com");
        cy.get('#pword')
          .type("ABCDEFGH")
          .should("have.value", "ABCDEFGH");
        cy.get('[type="checkbox"]')
          .check()
          .should("be.checked")
        cy.get('button')
          .click()
    });
});