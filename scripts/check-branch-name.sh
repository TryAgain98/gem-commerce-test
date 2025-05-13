#!/bin/bash

# Get the current branch name
branch_name=$(git rev-parse --abbrev-ref HEAD)

# Allow exceptions for specific branches
if [[ $branch_name == "develop" || $branch_name == "staging" || $branch_name == "product" || $branch_name == "master" ]]; then
 echo "✅ Valid branch name."
  exit 0
fi

# Branch naming rule: only allow branch names that start with feat/ or fix/
if [[ ! $branch_name =~ ^(feat|fix)\/[a-z0-9_\-]+$ ]]; then
  echo "❌ Invalid branch name. Branch name must start with 'feat/' or 'fix/' followed by a lowercase alphanumeric string. Example: feat/add-new-feature"
  exit 1
fi

echo "✅ Valid branch name."
