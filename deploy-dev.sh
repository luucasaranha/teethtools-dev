#!/bin/bash

# Increase the version
npm version patch

# Create a new Git tag
VERSION=$(node -p "require('./package.json').version")
git tag v$VERSION

# Push changes to Git
git push --follow-tags

# Deploy to Heroku
git push heroku master
