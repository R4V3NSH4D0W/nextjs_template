import { Button } from '../../src/components/ui/button';

describe('Button Component', () => {
  it('renders with default props', () => {
    cy.mount(<Button>Click me</Button>);
    cy.get('button').should('contain.text', 'Click me');
    cy.get('button').should('have.class', 'bg-primary');
  });

  it('renders with different variants', () => {
    const variants = ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'];
    
    variants.forEach((variant) => {
      cy.mount(<Button variant={variant as any}>{variant}</Button>);
      cy.get('button').should('contain.text', variant);
    });
  });

  it('handles click events', () => {
    const onClick = cy.stub().as('onClick');
    cy.mount(<Button onClick={onClick}>Click me</Button>);
    
    cy.get('button').click();
    cy.get('@onClick').should('have.been.called');
  });

  it('can be disabled', () => {
    cy.mount(<Button disabled>Disabled</Button>);
    cy.get('button').should('be.disabled');
    cy.get('button').should('have.class', 'disabled:opacity-50');
  });

  it('applies custom className', () => {
    cy.mount(<Button className="custom-test-class">Custom</Button>);
    cy.get('button').should('have.class', 'custom-test-class');
  });

  it('renders different sizes correctly', () => {
    const sizes = ['sm', 'default', 'lg', 'icon'];
    
    sizes.forEach((size) => {
      cy.mount(<Button size={size as any}>Size {size}</Button>);
      cy.get('button').should('be.visible');
    });
  });

  it('has proper accessibility attributes', () => {
    cy.mount(<Button aria-label="Test button">Accessible</Button>);
    cy.get('button').should('have.attr', 'aria-label', 'Test button');
    
    // Test keyboard navigation
    cy.get('button').focus();
    cy.get('button').should('have.focus');
    
    // Test with keyboard
    cy.get('button').type('{enter}');
  });

  it('shows focus states', () => {
    cy.mount(<Button>Focus me</Button>);
    cy.get('button').focus();
    cy.get('button').should('have.focus');
  });
});
