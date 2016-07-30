#!/bin/bash

if [ "$TRAVIS_BRANCH" == "$CHANGELOG_BRANCH" ]
then
  echo "This commit was made against the $TRAVIS_BRANCH and not $CHANGELOG_BRANCH! Changelog not updated!"
  exit 0
fi

rev=$(git rev-parse --short HEAD)

git config user.name "Travis CI"
git config user.email "thomas@crewmeister.com"

git remote add upstream "https://$GITHUB_TOKEN@github.com/$TRAVIS_REPO_SLUG.git"
git fetch upstream
git checkout $CHANGELOG_BRANCH

github_changelog_generator

git add -A .
git commit -m "updated changelog at ${rev}"
git push upstream $CHANGELOG_BRANCH
