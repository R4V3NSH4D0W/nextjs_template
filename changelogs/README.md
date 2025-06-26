# Individual Changelogs

This directory contains individual changelog files for each contributor to avoid merge conflicts.

## Available Changelogs

- [R4V3NSH4D0W](./CHANGELOG-r4v3nsh4d0w.md)

## Daily Reports

Daily reports are automatically generated in the `daily/` directory:

- **Aggregate reports**: `daily/{YYYY-MM-DD}.md` - All commits for a specific day
- **Contributor reports**: `daily/contributors/{YYYY-MM-DD}-{username}.md` - Individual daily activity

Generate daily reports with:

```bash
npm run daily-report
```

The main aggregated changelog is available in the root [CHANGELOG.md](../CHANGELOG.md)
