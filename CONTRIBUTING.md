# Contributing to README Profile Tech Stack Sync

Thank you for your interest in contributing! This document provides guidelines and instructions for contributing to this project.

## 🤝 How to Contribute

### Reporting Bugs

If you find a bug, please create an issue with:

1. **Clear title**: Describe the bug briefly
2. **Description**: Explain what happened and what you expected
3. **Steps to reproduce**: List the exact steps to reproduce the bug
4. **Environment**: Include your GitHub Actions runner OS, Node version, etc.
5. **Screenshots**: If applicable, add screenshots

### Suggesting Features

We love feature suggestions! Please create an issue with:

1. **Clear title**: Describe the feature briefly
2. **Use case**: Explain why this feature would be useful
3. **Proposed solution**: Describe how you envision it working
4. **Alternatives**: Any alternative solutions you've considered

### Pull Requests

1. **Fork the repository**
   ```bash
   git clone https://github.com/YosefHayim/readme-profile-tech-stack-sync.git
   cd readme-profile-tech-stack-sync
   ```

2. **Create a branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make your changes**
   - Write clean, readable code
   - Follow existing code style
   - Add comments for complex logic
   - Update documentation if needed

4. **Test your changes**
   ```bash
   npm run build
   # Test the action manually in a test repository
   ```

5. **Commit your changes**
   ```bash
   git add .
   git commit -m "feat: add amazing feature"
   ```

   Use conventional commit messages:
   - `feat:` - New feature
   - `fix:` - Bug fix
   - `docs:` - Documentation changes
   - `style:` - Code style changes (formatting, etc.)
   - `refactor:` - Code refactoring
   - `test:` - Adding or updating tests
   - `chore:` - Maintenance tasks

6. **Push and create PR**
   ```bash
   git push origin feature/your-feature-name
   ```

   Then create a Pull Request on GitHub with:
   - Clear title and description
   - Reference any related issues
   - List of changes made
   - Screenshots (if applicable)

## 🏗️ Development Setup

### Prerequisites

- Node.js 20 or higher
- npm or yarn
- Git

### Installation

```bash
# Install dependencies
npm install

# Build the action
npm run build
```

### Project Structure

```
src/
  index.js          # Main action logic
dist/
  index.js          # Compiled action (don't edit directly)
.github/
  workflows/        # Example workflows
action.yml          # Action metadata
package.json        # Dependencies
```

### Building

After making changes to `src/index.js`, you must rebuild:

```bash
npm run build
```

This compiles the code into `dist/index.js` using `@vercel/ncc`.

### Testing

To test your changes:

1. Create a test repository
2. Add the markers to the README
3. Create a workflow that uses your fork:
   ```yaml
   - uses: your-username/readme-profile-tech-stack-sync@your-branch
   ```
4. Run the workflow manually

## 📝 Coding Guidelines

### JavaScript Style

- Use ES6+ features
- Use `const` and `let`, not `var`
- Use async/await instead of callbacks
- Use template literals for strings
- Add JSDoc comments for functions
- Keep functions small and focused

### Error Handling

- Always catch and handle errors appropriately
- Use `core.warning()` for warnings
- Use `core.error()` for errors
- Use `core.setFailed()` to fail the action

### API Usage

- Use `@octokit/rest` for GitHub API calls
- Handle rate limiting appropriately
- Batch API calls when possible
- Add appropriate delays between requests

## 🎯 Areas for Contribution

Here are some areas where we'd especially appreciate help:

### High Priority

- [ ] Add unit tests using Jest
- [ ] Add integration tests
- [ ] Improve error messages
- [ ] Add support for more frameworks
- [ ] Optimize API usage to reduce rate limiting

### Features

- [ ] Add support for more dependency files
- [ ] Create a badge preview tool
- [ ] Add support for custom badge templates
- [ ] Add statistics output (most used language, etc.)
- [ ] Add support for grouping badges by category
- [ ] Add dark mode badge variants

### Documentation

- [ ] Add more examples
- [ ] Create video tutorials
- [ ] Translate documentation to other languages
- [ ] Add troubleshooting guides
- [ ] Create a FAQ section

### DevOps

- [ ] Add automated testing with GitHub Actions
- [ ] Add automated release workflow
- [ ] Add code quality checks (ESLint, Prettier)
- [ ] Add security scanning

## 🧪 Testing Checklist

Before submitting a PR, please ensure:

- [ ] Code builds successfully (`npm run build`)
- [ ] Action runs successfully in a test repository
- [ ] No console errors or warnings
- [ ] README is updated (if needed)
- [ ] action.yml is updated (if adding inputs/outputs)
- [ ] Examples are updated (if changing API)
- [ ] Commit messages follow conventions

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

## 💬 Questions?

Feel free to:

- Open an issue for questions
- Start a discussion in GitHub Discussions
- Reach out to the maintainers

## 🙏 Thank You!

Every contribution, no matter how small, is valued and appreciated. Thank you for helping make this project better!
