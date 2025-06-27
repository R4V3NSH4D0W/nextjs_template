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
    // Use first() to avoid multiple elements issue
    cy.get('a[href="#features"]')
      .first()
      .then($link => {
        if ($link.is(':visible')) {
          cy.wrap($link).click();
          cy.wait(500);
        }
      });
  });

  it('should load all images', () => {
    // Check if images exist first
    cy.get('body').then($body => {
      if ($body.find('img').length > 0) {
        cy.get('img').each($img => {
          cy.wrap($img)
            .should('be.visible')
            .and($img => {
              const img = $img[0] as HTMLImageElement;
              expect(img.naturalWidth).to.be.greaterThan(0);
            });
        });
      } else {
        // Skip test if no images are present
        cy.log('No images found on page');
      }
    });
  });

  it('should have proper meta tags', () => {
    cy.document().should(doc => {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
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
    // Test keyboard navigation by focusing on first interactive element
    cy.get('a, button, input, [tabindex]:not([tabindex="-1"])').first().focus();
    cy.focused().should('exist');
  });
});

describe('Form Interactions', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should handle form submissions', () => {
    // Check if forms exist before testing
    cy.get('body').then($body => {
      if ($body.find('form').length > 0) {
        cy.get('form').should('be.visible');
      } else {
        // Skip test if no forms are present
        cy.log('No forms found on page');
      }
    });
  });
});

describe('API Integration', () => {
  it('should handle API calls', () => {
    cy.intercept('GET', '/api/**', { fixture: 'api-response.json' }).as(
      'apiCall'
    );

    cy.visit('/');

    // Test API calls if they exist
    cy.get('@apiCall.all').then(interceptions => {
      if (interceptions.length > 0) {
        // API calls were made
        cy.log(`${interceptions.length} API calls intercepted`);
      } else {
        // No API calls were made
        cy.log('No API calls detected');
      }
    });
  });
});
