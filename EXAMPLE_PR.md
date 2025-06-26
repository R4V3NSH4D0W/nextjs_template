# Example: How a Filled PR Template Looks

## 📝 Description

This PR adds a dark mode toggle feature to the application. Users can now switch between light and dark themes, and their preference is saved in localStorage.

## 🔗 Related Issue

Closes #23

## ✨ Type of Change

- [ ] 🐛 Bug fix (non-breaking change which fixes an issue)
- [x] ✨ New feature (non-breaking change which adds functionality)
- [ ] 💥 Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] 📚 Documentation update
- [x] 🎨 Style/UI changes
- [ ] ♻️ Code refactoring (no functional changes)
- [ ] ⚡ Performance improvements
- [ ] 🔧 Build/CI changes
- [ ] 🧪 Test additions or updates

## 🧪 Testing

- [x] Unit tests pass
- [x] Integration tests pass
- [x] Manual testing completed
- [x] Cross-browser testing (if applicable)
- [ ] Mobile testing (if applicable)

**Test Instructions:**

1. Clone the branch and run `npm install`
2. Start the dev server with `npm run dev`
3. Click the dark mode toggle in the top navigation
4. Verify the theme changes and persists on page reload
5. Test in both Chrome and Firefox

## 📸 Screenshots

### Light Mode

![Light Mode](https://example.com/light-mode.png)

### Dark Mode

![Dark Mode](https://example.com/dark-mode.png)

## 📋 Checklist

- [x] My code follows the project's style guidelines
- [x] I have performed a self-review of my own code
- [x] I have commented my code, particularly in hard-to-understand areas
- [x] I have made corresponding changes to the documentation
- [x] My changes generate no new warnings
- [x] I have added tests that prove my fix is effective or that my feature works
- [x] New and existing unit tests pass locally with my changes
- [x] Any dependent changes have been merged and published

## 📝 Additional Notes

- The dark mode uses CSS custom properties for theming
- localStorage key is `theme-preference`
- Future enhancement could add system theme detection

## 🔍 Code Review Focus Areas

- [x] Security implications (localStorage usage)
- [ ] Performance impact
- [ ] Error handling
- [x] Edge cases (theme persistence)
- [x] Documentation accuracy
