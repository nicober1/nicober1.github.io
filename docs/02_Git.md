---
slug: /git
id: git
title: Git
tags:
  - git
  - Git
  - git merge conflict, resolve merge conflict in Git
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
```


