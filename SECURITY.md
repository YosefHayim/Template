# Security Policy

## Supported Versions

We release patches for security vulnerabilities. Which versions are eligible for receiving such patches depends on the CVSS v3.0 Rating:

| Version | Supported          |
| ------- | ------------------ |
| 1.x.x   | :white_check_mark: |

## Reporting a Vulnerability

If you discover a security vulnerability within this project, please send an email to the maintainers. All security vulnerabilities will be promptly addressed.

**Please do not report security vulnerabilities through public GitHub issues.**

When reporting a vulnerability, please include:

1. **Description**: A clear description of the vulnerability
2. **Impact**: What can an attacker do with this vulnerability?
3. **Steps to reproduce**: Detailed steps to reproduce the vulnerability
4. **Proof of concept**: If possible, include a proof of concept
5. **Suggested fix**: If you have an idea for how to fix it

## Security Best Practices for Users

### Token Security

1. **Use Secrets**: Never hardcode your GitHub token in the workflow file
   ```yaml
   # ❌ BAD
   github_token: ghp_xxxxxxxxxxxx

   # ✅ GOOD
   github_token: ${{ secrets.GITHUB_TOKEN }}
   ```

2. **Limit Token Scope**: Use tokens with the minimum required permissions
   - For public repos only: Use `GITHUB_TOKEN` (automatic)
   - For private repos: Create a PAT with only `repo` scope

3. **Use Personal Access Tokens (Classic)** for private repos, not fine-grained tokens (which may have API limitations)

### Workflow Security

1. **Pin Action Versions**: Always pin to a specific version
   ```yaml
   # ❌ BAD - uses latest version
   uses: YosefHayim/readme-profile-tech-stack-sync@main

   # ✅ GOOD - pinned to specific version
   uses: YosefHayim/readme-profile-tech-stack-sync@v1
   ```

2. **Review Permissions**: Only grant necessary permissions
   ```yaml
   permissions:
     contents: write  # Only what's needed
   ```

3. **Review Changes**: Always review the changes made by the action

### Repository Security

1. **Protect Branches**: Enable branch protection on your main branch
2. **Review PRs**: Review all pull requests, even automated ones
3. **Enable Dependabot**: Keep dependencies up to date
4. **Enable Code Scanning**: Use GitHub's security features

## Known Security Considerations

### API Rate Limiting

This action makes multiple API calls to GitHub. Be aware of:

1. **Rate Limits**: GitHub API has rate limits
   - 1,000 requests/hour for authenticated requests
   - 60 requests/hour for unauthenticated requests

2. **Mitigation**: The action handles rate limiting gracefully, but consider:
   - Using a PAT for higher limits
   - Reducing scan frequency if you have many repositories

### Data Privacy

1. **Public Repositories**: All data from public repos is already public
2. **Private Repositories**: When using `include_private: true`:
   - Ensure your profile repository is private if you don't want to expose private repo names
   - Or keep your profile public but set `include_private: false`

## Disclosure Policy

When we receive a security bug report, we will:

1. Confirm the problem and determine affected versions
2. Audit code to find any similar problems
3. Prepare fixes for all supported versions
4. Release new versions as soon as possible

## Comments on this Policy

If you have suggestions on how this process could be improved, please submit a pull request.
