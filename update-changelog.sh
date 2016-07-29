#!/bin/bash

if [ "$TRAVIS_BRANCH" != "test-changelog" ]
then
  echo "This commit was made against the $TRAVIS_BRANCH and not the master! Changelog not updated!"
  exit 0
fi

github_changelog_generator

rev=$(git rev-parse --short HEAD)

git config user.name "Travis CI"
git config user.email "thomas@crewmeister.com"

git remote add upstream "https://$GITHUB_TOKEN@github.com/$TRAVIS_REPO_SLUG.git"
git fetch upstream

git add -A .
git commit -m "updated changelog at ${rev}"
git push upstream master
