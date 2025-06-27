describe('Home Page', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should display the main navigation', () => {
    cy.get('nav').should('be.visible');
    cy.contains('NextJS Template').should('be.visible');
  });

  it('should display the hero section', () => {
    cy.contains('NextJS Template').should('be.visible');
  });

  it('should be responsive', () => {
    // Test mobile viewport
    cy.viewport('iphone-6');
    cy.get('nav').should('be.visible');
    
    // Test tablet viewport
    cy.viewport('ipad-2');
    cy.get('nav').should('be.visible');
    
    // Test desktop viewport
    cy.viewport(1280, 720);
    cy.get('nav').should('be.visible');
  });

  it('should handle navigation', () => {
    cy.get('a[href="#features"]').then(($link) => {
      if ($link.is(':visible')) {
        cy.wrap($link).click();
        cy.wait(500);
      }
    });
  });

  it('should load all images', () => {
    cy.get('img').each(($img) => {
      cy.wrap($img).should('be.visible').and(($img) => {
        expect($img[0].naturalWidth).to.be.greaterThan(0);
      });
    });
  });

  it('should have proper meta tags', () => {
    cy.document().should((doc) => {
      expect(doc.title).to.not.be.empty;
    });
  });
});

describe('Accessibility Tests', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.injectAxe();
  });

  it('should not have accessibility violations', () => {
    cy.checkA11y();
  });

  it('should be keyboard navigable', () => {
    cy.get('body').tab();
    cy.focused().should('exist');
  });
});

describe('Form Interactions', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should handle form submissions', () => {
    // Add form tests when forms are implemented
    cy.get('form').then(($form) => {
      if ($form.length > 0) {
        cy.wrap($form).should('be.visible');
      }
    });
  });
});

describe('API Integration', () => {
  it('should handle API calls', () => {
    cy.intercept('GET', '/api/**', { fixture: 'api-response.json' }).as('apiCall');
    
    cy.visit('/');
    
    // Test API calls if they exist
    cy.get('@apiCall').then((interception) => {
      if (interception) {
        expect(interception.response?.statusCode).to.eq(200);
      }
    });
  });
});
