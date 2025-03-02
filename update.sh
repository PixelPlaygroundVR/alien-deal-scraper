#!/bin/bash

# Alien Deal Scraper Update Script
# This script runs the Python scraper, builds the Jekyll site, and pushes changes to GitHub

echo "🛸 Starting Alien Deal Scraper update process..."

# Check if Python is installed
if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 is not installed. Please install it first."
    exit 1
fi

# Check if Ruby and Jekyll are installed
if ! command -v jekyll &> /dev/null; then
    echo "❌ Jekyll is not installed. Please install it first."
    exit 1
fi

# Check if Git is installed
if ! command -v git &> /dev/null; then
    echo "❌ Git is not installed. Please install it first."
    exit 1
fi

# Get the current directory
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"
cd "$SCRIPT_DIR"

echo "👽 Running Python scraper..."
python3 scraper.py

# Check if the scraper was successful
if [ $? -ne 0 ]; then
    echo "❌ Scraper failed. Aborting update."
    exit 1
fi

echo "🌌 Building Jekyll site..."
bundle exec jekyll build

# Check if the build was successful
if [ $? -ne 0 ]; then
    echo "❌ Jekyll build failed. Aborting update."
    exit 1
fi

echo "🚀 Committing and pushing changes to GitHub..."

# Check if there are any changes to commit
if git diff --quiet; then
    echo "✅ No changes to commit. Everything is up to date."
    exit 0
fi

# Add all changes
git add .

# Commit with timestamp
git commit -m "Update deals - $(date '+%Y-%m-%d %H:%M:%S')"

# Push to GitHub
git push origin main

# Check if the push was successful
if [ $? -ne 0 ]; then
    echo "❌ Failed to push changes to GitHub. Please check your credentials and try again."
    exit 1
fi

echo "✅ Alien Deal Scraper update completed successfully!"
echo "🌍 Your site should be updated on GitHub Pages shortly." 