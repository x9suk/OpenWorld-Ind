# Security Policy

## Supported Versions

| Version | Supported |
|---|---|
| 0.x (development) | Limited |

## Reporting a Vulnerability

We take security seriously. If you discover a security vulnerability, please **do not** open a public issue.

Instead, report it privately by emailing the project maintainers or opening a GitHub Security Advisory.

### What to include

- Description of the vulnerability
- Steps to reproduce
- Potential impact
- Suggested fix (if any)

### Response timeline

- **24 hours**: Initial acknowledgment
- **7 days**: Assessment and mitigation plan
- **30 days**: Fix deployed (depending on severity)

## Security Best Practices

- Never commit `.env` files or secrets to the repository
- Use environment variables for all API keys and configuration
- Keep dependencies up to date with `pnpm audit`
- Follow the principle of least privilege for data access
- Validate and sanitize all user-submitted data
