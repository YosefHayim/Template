#!/bin/sh
# ─────────────────────────────────────────────────────
# Project Bootstrap Script
# Replaces template placeholders with your project values
# ─────────────────────────────────────────────────────
# Usage:
#   bash scripts/init.sh
#   npm run init
#
# POSIX-compatible (works on macOS + Linux)
# ─────────────────────────────────────────────────────

set -e

# ── Colors (only if terminal supports them) ──
if [ -t 1 ]; then
  BOLD='\033[1m'
  GREEN='\033[0;32m'
  YELLOW='\033[0;33m'
  CYAN='\033[0;36m'
  NC='\033[0m'
else
  BOLD='' GREEN='' YELLOW='' CYAN='' NC=''
fi

# ── Helpers ──
info()  { printf "${CYAN}[info]${NC}  %s\n" "$1"; }
ok()    { printf "${GREEN}[done]${NC}  %s\n" "$1"; }
warn()  { printf "${YELLOW}[warn]${NC}  %s\n" "$1"; }

# Portable sed -i (macOS BSD sed vs GNU sed)
sedi() {
  if sed --version >/dev/null 2>&1; then
    # GNU sed
    sed -i "$@"
  else
    # BSD sed (macOS)
    sed -i '' "$@"
  fi
}

# ── Navigate to project root ──
cd "$(dirname "$0")/.."
PROJECT_ROOT="$(pwd)"

printf "\n${BOLD}🚀 Project Template Setup${NC}\n"
printf "━━━━━━━━━━━━━━━━━━━━━━━━━\n\n"

# ── Collect input ──
printf "${BOLD}Project name${NC} (lowercase, hyphens ok): "
read -r PROJECT_NAME
if [ -z "$PROJECT_NAME" ]; then
  echo "Error: Project name is required." >&2
  exit 1
fi

printf "${BOLD}Description${NC}: "
read -r PROJECT_DESCRIPTION
PROJECT_DESCRIPTION="${PROJECT_DESCRIPTION:-A modern TypeScript project}"

printf "${BOLD}Author${NC} (e.g. Jane Doe): "
read -r AUTHOR
AUTHOR="${AUTHOR:-Author}"

printf "${BOLD}GitHub owner${NC} (username or org): "
read -r OWNER
OWNER="${OWNER:-owner}"

printf "${BOLD}Security contact email${NC}: "
read -r SECURITY_EMAIL
SECURITY_EMAIL="${SECURITY_EMAIL:-security@example.com}"

# ── Derived values ──
REPO_URL="https://github.com/${OWNER}/${PROJECT_NAME}.git"
YEAR="$(date +%Y)"

printf "\n"
info "Project:  ${PROJECT_NAME}"
info "Author:   ${AUTHOR}"
info "Owner:    ${OWNER}"
info "Repo:     ${REPO_URL}"
info "Year:     ${YEAR}"
printf "\n"

# ── Replace placeholders ──
# Using | as sed delimiter to avoid conflicts with / in URLs

replace_in_file() {
  local file="$1"
  local placeholder="$2"
  local value="$3"

  if [ -f "$file" ]; then
    sedi "s|${placeholder}|${value}|g" "$file"
  fi
}

info "Replacing placeholders..."

# Core project files
for file in \
  package.json \
  README.md \
  LICENSE \
  SECURITY.md \
  CONTRIBUTING.md \
  .github/CODEOWNERS \
  .github/ISSUE_TEMPLATE/config.yml \
  .ai/standards/architecture.md \
  .ai/project/index.md \
  docs/PROJECT_RULES.md
do
  replace_in_file "$file" "{{PROJECT_NAME}}" "$PROJECT_NAME"
  replace_in_file "$file" "{{PROJECT_DESCRIPTION}}" "$PROJECT_DESCRIPTION"
  replace_in_file "$file" "{{AUTHOR}}" "$AUTHOR"
  replace_in_file "$file" "{{OWNER}}" "$OWNER"
  replace_in_file "$file" "{{REPO_URL}}" "$REPO_URL"
  replace_in_file "$file" "{{SECURITY_EMAIL}}" "$SECURITY_EMAIL"
  replace_in_file "$file" "{{YEAR}}" "$YEAR"
done

ok "Placeholders replaced in core files"

# ── Copy .env.example → .env ──
if [ ! -f .env ] && [ -f .env.example ]; then
  cp .env.example .env
  ok "Created .env from .env.example"
else
  warn ".env already exists or .env.example not found — skipping"
fi

# ── Install dependencies ──
info "Installing dependencies..."
if command -v bun >/dev/null 2>&1; then
  bun install
elif command -v npm >/dev/null 2>&1; then
  npm install
else
  warn "Neither bun nor npm found — skipping dependency install"
fi
ok "Dependencies installed"

# ── Clean up ──
info "Removing init script..."
rm -rf scripts/

# Remove the init script entry from package.json
sedi '/"init":/d' package.json

ok "Init script removed"

# ── Done ──
printf "\n${GREEN}${BOLD}✅ Project '${PROJECT_NAME}' is ready!${NC}\n\n"
printf "Next steps:\n"
printf "  1. Review and edit ${CYAN}.env${NC} with your values\n"
printf "  2. Fill in tech-stack placeholders in ${CYAN}.ai/project/tech-stack.md${NC}\n"
printf "  3. Update ${CYAN}docs/PROJECT_RULES.md${NC} with your framework choices\n"
printf "  4. Run ${CYAN}npm run dev${NC} to start developing\n"
printf "\n"
