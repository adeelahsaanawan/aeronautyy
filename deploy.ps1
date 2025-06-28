# PowerShell Deployment Script for Aeronautyy Website
# This script will initialize git, add all files, and push to GitHub

Write-Host "Starting deployment process for Aeronautyy website..." -ForegroundColor Green

# Check if git is installed
if (!(Get-Command git -ErrorAction SilentlyContinue)) {
    Write-Host "Git is not installed. Please install Git first." -ForegroundColor Red
    exit 1
}

# Initialize git repository if not already initialized
if (!(Test-Path ".git")) {
    Write-Host "Initializing Git repository..." -ForegroundColor Yellow
    git init
} else {
    Write-Host "Git repository already exists." -ForegroundColor Green
}

# Add remote origin if not already added
$remoteExists = git remote get-url origin 2>$null
if (!$remoteExists) {
    Write-Host "Adding remote origin..." -ForegroundColor Yellow
    git remote add origin https://github.com/adeelahsaanawan/aeronautyy.git
} else {
    Write-Host "Remote origin already exists: $remoteExists" -ForegroundColor Green
}

# Create .gitignore if it doesn't exist
if (!(Test-Path ".gitignore")) {
    Write-Host "Creating .gitignore file..." -ForegroundColor Yellow
    $gitignoreContent = @"
# Dependencies
node_modules/
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Environment variables
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# IDE files
.vscode/
.idea/
*.swp
*.swo
*~

# OS generated files
.DS_Store
.DS_Store?
._*
.Spotlight-V100
.Trashes
ehthumbs.db
Thumbs.db

# Logs
*.log
logs/

# Temporary files
*.tmp
*.temp
*.bak
*.old

# Build outputs (if any)
dist/
build/

# Cache
.cache/
"@
    $gitignoreContent | Out-File -FilePath ".gitignore" -Encoding UTF8
}

# Stage all files
Write-Host "Staging all files..." -ForegroundColor Yellow
git add .

# Check if there are any changes to commit
$status = git status --porcelain
if ($status) {
    # Commit changes
    $commitMessage = "SEO optimization and website deployment - $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')"
    Write-Host "Committing changes: $commitMessage" -ForegroundColor Yellow
    git commit -m $commitMessage

    # Set main branch
    Write-Host "Setting main branch..." -ForegroundColor Yellow
    git branch -M main

    # Push to GitHub
    Write-Host "Pushing to GitHub..." -ForegroundColor Yellow
    try {
        git push -u origin main
        Write-Host "Successfully deployed to GitHub!" -ForegroundColor Green
        Write-Host ""
        Write-Host "Deployment Complete!" -ForegroundColor Green
        Write-Host "Next Steps:" -ForegroundColor Cyan
        Write-Host "   1. Go to Cloudflare Pages dashboard" -ForegroundColor White
        Write-Host "   2. Connect your GitHub repository: adeelahsaanawan/aeronautyy" -ForegroundColor White
        Write-Host "   3. Set up custom domain: aeronautyy.com" -ForegroundColor White
        Write-Host "   4. Follow the SEO-SETUP-GUIDE.md for analytics setup" -ForegroundColor White
        Write-Host ""
        Write-Host "Repository URL: https://github.com/adeelahsaanawan/aeronautyy" -ForegroundColor Blue
    }
    catch {
        Write-Host "Failed to push to GitHub. Error: $($_.Exception.Message)" -ForegroundColor Red
        Write-Host "You may need to authenticate with GitHub first." -ForegroundColor Yellow
        Write-Host "   Run: gh auth login" -ForegroundColor White
        Write-Host "   Or set up SSH keys: https://docs.github.com/en/authentication/connecting-to-github-with-ssh" -ForegroundColor White
    }
} else {
    Write-Host "No changes to commit." -ForegroundColor Blue
    Write-Host "Repository URL: https://github.com/adeelahsaanawan/aeronautyy" -ForegroundColor Blue
}

Write-Host ""
Write-Host "SEO Features Implemented:" -ForegroundColor Cyan
Write-Host "   Enhanced meta tags and structured data" -ForegroundColor Green
Write-Host "   Google Analytics 4 ready (needs configuration)" -ForegroundColor Green
Write-Host "   Google Search Console ready (needs verification)" -ForegroundColor Green
Write-Host "   Optimized sitemap.xml with images" -ForegroundColor Green
Write-Host "   Enhanced robots.txt" -ForegroundColor Green
Write-Host "   Cloudflare Pages headers and redirects" -ForegroundColor Green
Write-Host "   Web manifest for PWA features" -ForegroundColor Green
Write-Host "   Performance optimization headers" -ForegroundColor Green
Write-Host "   Security headers configuration" -ForegroundColor Green
Write-Host "   SEO tracking and analytics setup" -ForegroundColor Green

Write-Host ""
Write-Host "Don't forget to read SEO-SETUP-GUIDE.md for complete setup instructions!" -ForegroundColor Yellow
