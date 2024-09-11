
describe('User Authentication Test', () => {
    const email = 'test@fau.edu';
    const password = 'TestPassword123';
    const name = 'Test_User';
  
    // Test 1: Register a new account
    it('should register a new account', () => {
      cy.visit('/login'); 
  
      // Switch to Registration form
      cy.contains('Sign Up').click();
  

      cy.get('input[placeholder="Please enter your name"]').type(name);
      cy.get('input[placeholder="Please enter your email address"]').type(email);
      cy.get('input[placeholder="Please enter your password"]').type(password);
  

      cy.contains('Sign Up').click();
  
      // Assert that the registration was successful
      cy.get('.message').should('contain', 'Success!'); 
  
      // Verify that the user is redirected to the dashboard or the login page
      cy.url().should('include', '/dashboard'); // Assuming redirect to dashboard on success
    });
  
    // Test 2: Log in with the registered account
    it('should log in with the newly registered account', () => {
      cy.visit('/login'); // Go to the login page
  

      cy.get('input[placeholder="Please enter your email address"]').type(email);
      cy.get('input[placeholder="Please enter your password"]').type(password);
  

      cy.contains('Login').click();
  
      // Assert that login was successful
      cy.get('.message').should('contain', 'Success!'); 
  
      // Verify that the user is redirected to the dashboard
      cy.url().should('include', '/dashboard');
    });
  });
  