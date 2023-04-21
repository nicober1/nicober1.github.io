---
slug: /git
---


#### Create feature branch locally and after making changes push feature branch to the remote repository

```git
git checkout main
git branch feature-branch
git checkout feature-branch
git add .
git commit -m "your commit message"
git push -u origin feature-branch
```