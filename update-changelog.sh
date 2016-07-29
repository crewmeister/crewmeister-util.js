#!/bin/bash

if [ "$TRAVIS_BRANCH" != "master" ]
then
  echo "This commit was made against the $TRAVIS_BRANCH and not the master! Changelog not updated!"
  exit 0
fi

github_changelog_generator

rev=$(git rev-parse --short HEAD)
git add -A .
git commit -m "updated changelog at ${rev}"
git push -q upstream HEAD:master
