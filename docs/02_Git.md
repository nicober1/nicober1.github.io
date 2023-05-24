---
slug: /git
id: git
title: Git
description: Git commands
keywords: [git, git merge conflict, resolve merge conflict in Git]
tags: [git]
image: String
sidebar_label: Git
sidebar_position: 2
---

### Create feature branch locally

#### Create feature branch locally and after making changes push feature branch to the remote repository

```git
git checkout main
git branch feature-branch
git checkout feature-branch
git add .
git commit -m "your commit message"
git push -u origin feature-branch
```

#### Revert previous commit in remote branch

```git
git branch
git reset HEAD~2
git reset --hard HEAD~2
git push --force origin <branch-name>

```

### Update feature branch with changes in main branch

```git
git fetch origin
git checkout <local_branch_name>
git merge origin/main
esc/:wq
git push
git push origin <local_branch_name>
```

### Resolve Merge Conflict

Open the file(s) that have conflicts in your text editor. You should see lines of code with "<<<<<<< HEAD", "=======", and ">>>>>>> branch-name" markers. These markers indicate the conflicting code from the two branches that are being merged.

```git
git remote -v
git fetch <remote-name>
git log --oneline --decorate --graph --all
git diff <branch-name>..<remote-name>/<branch-name>
git log <remote>/<branch-name>
git diff <commit-hash-1>..<commit-hash-2>
git status
nano <file>
git add <file>
git commit
git commit -m "your commit message"
git push -u origin feature-branch
docs/pull_request_template.md

```

```git
  git config pull.rebase false  # merge
  git config pull.rebase true   # rebase
  git config pull.ff only       # fast-forward only

  git config
  git config --global
  git config --rebase
  git config --no-rebase
  git config --ff-only

  git branch -d branch_name



```
