# Authentication Setup for Daily Changelog System

## Problem

The daily changelog GitHub Actions workflow needs permission to push changes back to the repository. You may encounter this error:

```
remote: Permission to R4V3NSH4D0W/nextjs_template.git denied to github-actions[bot].
fatal: unable to access 'https://github.com/...': The requested URL returned error: 403
```

## Solution Options

### Option 1: Use Personal Access Token (Recommended)

1. **Create a Personal Access Token (PAT):**
   - Go to GitHub Settings → Developer settings → Personal access tokens → Tokens (classic)
   - Click "Generate new token (classic)"
   - Set expiration (recommended: 90 days or no expiration for automation)
   - Select scopes:
     - `repo` (Full control of private repositories)
     - `workflow` (Update GitHub Action workflows)

2. **Add PAT to Repository Secrets:**
   - Go to your repository → Settings → Secrets and variables → Actions
   - Click "New repository secret"
   - Name: `PAT_TOKEN`
   - Value: Your generated Personal Access Token
   - Click "Add secret"

3. **The workflow will automatically use PAT_TOKEN if available**

### Option 2: Use Default GITHUB_TOKEN (Fallback)

If you don't set up a PAT_TOKEN, the workflow will fall back to the default `GITHUB_TOKEN`. However, this may have limited permissions.

**To enable GITHUB_TOKEN write permissions:**

1. Go to your repository → Settings → Actions → General
2. Scroll to "Workflow permissions"
3. Select "Read and write permissions"
4. Check "Allow GitHub Actions to create and approve pull requests"
5. Click "Save"

## Verification

After setting up authentication, the daily changelog workflow should:

- ✅ Generate daily changelogs automatically
- ✅ Commit changes with message: "docs: auto-generate daily changelogs [skip ci]"
- ✅ Push changes to the repository without permission errors

## Workflow Features

The updated workflow now includes:

- **Fallback authentication**: Uses PAT_TOKEN if available, falls back to GITHUB_TOKEN
- **Explicit permissions**: `contents: write` and `pull-requests: read`
- **Proper git configuration**: Sets up authenticated remote URL
- **Skip CI flag**: Prevents infinite workflow loops

## Testing

You can manually test the workflow:

1. Go to Actions tab in your repository
2. Select "Daily Changelog Automation"
3. Click "Run workflow" → "Run workflow"
4. Monitor the workflow execution for any permission errors

## Troubleshooting

**Still getting 403 errors?**

- Verify PAT_TOKEN is correctly set in repository secrets
- Ensure PAT has `repo` and `workflow` scopes
- Check that repository workflow permissions allow write access
- For organization repositories, ensure PAT has access to the organization

**Workflow not triggering?**

- Check that the workflow file is on the `main` branch
- Verify the cron schedule format
- Ensure repository has Actions enabled
