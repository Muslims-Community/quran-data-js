# Contributing to @muslims-community/quran

Thank you for your interest in contributing to the @muslims-community/quran package! This project aims to provide a reliable, offline Quran data package for JavaScript applications.

## 🌟 Ways to Contribute

- 🐛 **Bug Reports** - Report issues you encounter
- 💡 **Feature Requests** - Suggest new functionality
- 📖 **Documentation** - Improve docs and examples
- 🧪 **Tests** - Add or improve test coverage
- 🔧 **Code** - Fix bugs or implement features

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- Git

### Setup Development Environment

1. **Fork the repository**
   ```bash
   # Fork on GitHub, then clone your fork
   git clone https://github.com/YOUR_USERNAME/quran-data-js.git
   cd quran-data-js
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Build the project**
   ```bash
   npm run build
   ```

4. **Run tests**
   ```bash
   npm test
   ```

## 📁 Project Structure

```
quran-data-js/
├── data/              # Source Quran data files from Tanzil.net
├── dist/              # Built package files (auto-generated)
├── scripts/           # Build scripts
├── src/               # Source code
├── types/             # TypeScript definitions
├── test.js            # Test file
└── package.json       # Package configuration
```

## 🛠️ Development Workflow

### Making Changes

1. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**
   - Follow the existing code style
   - Add tests for new functionality
   - Update documentation if needed

3. **Test your changes**
   ```bash
   npm test
   npm run build
   ```

4. **Commit your changes**
   ```bash
   git add .
   git commit -m "feat: add new feature description"
   ```

### Commit Message Guidelines

Use conventional commit format:

- `feat:` - New features
- `fix:` - Bug fixes
- `docs:` - Documentation changes
- `test:` - Test additions or changes
- `refactor:` - Code refactoring
- `chore:` - Maintenance tasks

Examples:
- `feat: add search by surah name functionality`
- `fix: handle edge case in getAyah function`
- `docs: update API documentation`

## 🧪 Testing

### Running Tests

```bash
npm test
```

### Adding Tests

When adding new functionality:

1. Add test cases in `test.js`
2. Test both success and error scenarios
3. Verify TypeScript definitions work correctly

### Test Coverage

Ensure your changes don't break existing functionality:

- All existing tests must pass
- New features should include tests
- Edge cases should be covered

## 📖 Documentation

### API Documentation

When adding new functions:

1. Add JSDoc comments to source code
2. Update TypeScript definitions in `types/index.d.ts`
3. Add examples to `README.md`
4. Update this contributing guide if needed

### Code Examples

Provide clear, working examples:

```javascript
// Good example
import { getAyah } from '@muslims-community/quran';

const ayah = getAyah(1, 1);
console.log(ayah.text); // "بِسمِ اللَّهِ الرَّحمٰنِ الرَّحيمِ"
```

## 🔒 Important Guidelines

### Quran Text Integrity

**CRITICAL**: The Quran text must never be modified.

- ✅ **Allowed**: Formatting, organizing, adding metadata
- ❌ **Forbidden**: Changing any Arabic text, diacritics, or words
- 📚 **Source**: All text must remain exactly as provided by Tanzil.net

### Attribution Requirements

Always maintain proper attribution:

- Keep Tanzil Project attribution in all responses
- Include source information in API responses
- Maintain copyright notices in license files

## 🎯 Code Style

### JavaScript/TypeScript

- Use ES6+ features
- Prefer `const` over `let`
- Use descriptive variable names
- Add JSDoc comments for public functions

```javascript
/**
 * Get a specific ayah from the Quran
 * @param {number} surahId - The surah number (1-114)
 * @param {number} ayahId - The ayah number within the surah
 * @returns {AyahWithSurah} The ayah with surah information
 */
function getAyah(surahId, ayahId) {
  // Implementation
}
```

### Error Handling

- Validate input parameters
- Provide clear error messages
- Use appropriate error types

```javascript
if (typeof surahId !== 'number') {
  throw new Error('Surah ID must be a number');
}

if (surahId < 1 || surahId > 114) {
  throw new Error('Surah ID must be between 1 and 114');
}
```

## 🚦 Pull Request Process

### Before Submitting

1. ✅ Tests pass: `npm test`
2. ✅ Build succeeds: `npm run build`
3. ✅ Code follows style guidelines
4. ✅ Documentation is updated
5. ✅ Commit messages follow conventions

### Submitting PR

1. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

2. **Create Pull Request**
   - Use a clear, descriptive title
   - Explain what changes you made and why
   - Reference any related issues
   - Include screenshots if relevant

3. **PR Template**
   ```markdown
   ## Description
   Brief description of changes

   ## Type of Change
   - [ ] Bug fix
   - [ ] New feature
   - [ ] Documentation update
   - [ ] Refactoring

   ## Testing
   - [ ] Tests pass
   - [ ] New tests added (if applicable)

   ## Checklist
   - [ ] Code follows style guidelines
   - [ ] Documentation updated
   - [ ] Quran text integrity maintained
   ```

## 🎉 Recognition

Contributors will be:

- Added to the contributors list
- Mentioned in release notes
- Credited in documentation

## 📞 Getting Help

- 💬 **Discussions**: [GitHub Discussions](https://github.com/Muslims-Community/quran-data-js/discussions)
- 🐛 **Issues**: [GitHub Issues](https://github.com/Muslims-Community/quran-data-js/issues)
- 📧 **Email**: memoibraheem1@gmail.com

## 📜 Code of Conduct

This project follows Islamic principles of respect, kindness, and collaboration:

- Be respectful and inclusive
- Help others learn and grow
- Focus on constructive feedback
- Maintain the sanctity of the Quranic content

## 🎯 Project Goals

Our mission is to:

- Provide reliable, authentic Quran data for developers
- Maintain the highest standards of text accuracy
- Support the global Muslim developer community
- Enable Islamic applications worldwide

---

**جزاك الله خيراً** (May Allah reward you with good) for contributing to this project!

**Made with ❤️ by the Muslim Community**