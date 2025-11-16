# 🚀 Quick Start Guide

Get your tech stack badges up and running in 5 minutes!

## ⚡ Super Quick Setup (3 Steps)

### Step 1: Edit Your Profile README

1. Go to your profile repository (same name as your username)
2. Open `README.md`
3. Add these markers where you want badges:

```markdown
## 🛠️ Tech Stack

<!-- TECH-STACK:START -->
<!-- TECH-STACK:END -->
```

4. Commit the changes

### Step 2: Create Workflow File

1. In your profile repository, create `.github/workflows/tech-stack.yml`
2. Copy and paste this:

```yaml
name: Update Tech Stack

on:
  schedule:
    - cron: '0 */12 * * *'
  workflow_dispatch:

jobs:
  update:
    runs-on: ubuntu-latest
    permissions:
      contents: write
    steps:
      - uses: actions/checkout@v4
      - uses: YosefHayim/readme-profile-tech-stack-sync@v1
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
```

3. Commit the file

### Step 3: Run It!

1. Go to your repository's **Actions** tab
2. Click on **Update Tech Stack** workflow
3. Click **Run workflow** → **Run workflow**
4. Wait 30-60 seconds
5. Check your README - badges should appear! 🎉

## 🎨 Customization Examples

### Example 1: Different Badge Style

Want flat badges instead?

```yaml
- uses: YosefHayim/readme-profile-tech-stack-sync@v1
  with:
    github_token: ${{ secrets.GITHUB_TOKEN }}
    badge_style: 'flat-square'
```

### Example 2: Exclude HTML/CSS

Don't want markup languages?

```yaml
- uses: YosefHayim/readme-profile-tech-stack-sync@v1
  with:
    github_token: ${{ secrets.GITHUB_TOKEN }}
    exclude_languages: 'HTML,CSS'
```

### Example 3: Show Only Top 10

Limit to your most-used technologies:

```yaml
- uses: YosefHayim/readme-profile-tech-stack-sync@v1
  with:
    github_token: ${{ secrets.GITHUB_TOKEN }}
    max_badges: 10
    sort_by: 'usage'
```

### Example 4: Include Private Repos

1. Create a Personal Access Token:
   - GitHub Settings → Developer settings → Personal access tokens → Tokens (classic)
   - Click "Generate new token (classic)"
   - Select `repo` scope
   - Generate and copy the token

2. Add it as a secret:
   - Your profile repo → Settings → Secrets and variables → Actions
   - New repository secret
   - Name: `PROFILE_TOKEN`
   - Value: paste your token

3. Update workflow:

```yaml
- uses: YosefHayim/readme-profile-tech-stack-sync@v1
  with:
    github_token: ${{ secrets.PROFILE_TOKEN }}
    include_private: true
```

## 🎯 Common Use Cases

### Minimalist Setup

Just the essentials, no frameworks:

```yaml
- uses: YosefHayim/readme-profile-tech-stack-sync@v1
  with:
    github_token: ${{ secrets.GITHUB_TOKEN }}
    include_frameworks: false
    min_percentage: 5
    badge_style: 'flat'
```

### Show Everything

All technologies, frameworks included:

```yaml
- uses: YosefHayim/readme-profile-tech-stack-sync@v1
  with:
    github_token: ${{ secrets.GITHUB_TOKEN }}
    include_frameworks: true
    min_percentage: 0.5
    max_badges: 0
```

### Professional Look

Clean, sorted by usage:

```yaml
- uses: YosefHayim/readme-profile-tech-stack-sync@v1
  with:
    github_token: ${{ secrets.GITHUB_TOKEN }}
    badge_style: 'for-the-badge'
    sort_by: 'usage'
    exclude_languages: 'HTML,CSS,Markdown'
    max_badges: 15
```

## 🔧 Troubleshooting

### "Markers not found"

Make sure you have both markers in your README:
```markdown
<!-- TECH-STACK:START -->
<!-- TECH-STACK:END -->
```

### No badges appear

1. Check if you have public repositories
2. Lower `min_percentage` to 0.5
3. Set `include_frameworks: true`

### Action fails with 403

You hit the API rate limit:
1. Use a Personal Access Token
2. Reduce scan frequency to once per day

### Badges don't update

1. Check the Actions tab for errors
2. Make sure the workflow has `contents: write` permission
3. Verify the markers are correct

## 📖 Next Steps

- Read the [full documentation](README.md)
- Check out [example README](EXAMPLE_README.md)
- Join the [discussions](https://github.com/YosefHayim/readme-profile-tech-stack-sync/discussions)
- Star the repo if you find it useful! ⭐

## 🆘 Need Help?

- [Open an issue](https://github.com/YosefHayim/readme-profile-tech-stack-sync/issues)
- Check [existing issues](https://github.com/YosefHayim/readme-profile-tech-stack-sync/issues?q=is%3Aissue)
- Read the [FAQ](README.md#-troubleshooting)

---

Happy coding! 🚀
