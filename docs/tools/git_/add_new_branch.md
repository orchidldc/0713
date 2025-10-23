### Add a new branch for the repository

1. Create a folder, place into important files.
2. Initialize this folder with `git init`.
3. Configure local Git username and email to avoid conflicts with global settings (optional, you may use global settings):
   - `git config --local user.name "your name"`
   - `git config --local user.email "your email"`
4. Create a new branch:
   - `git checkout -b new_branch`
5. Commit your changes and link the local repository to your remote:
   - `git add .`
   - `git commit -m "first commit"`
   - `git remote add origin https://gitee.com/yourname/yourrepo.git`
   - `git push -u origin new_branch` (need to enter username and password.)
6. Next time, you can directly push changes to the new branch:
   - `git add .`
   - `git commit -m "update info"`
   - `git push`