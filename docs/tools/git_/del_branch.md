### Delete Branch

To delete a branch in a Git repository, you can follow these steps. You can delete both local and remote branches:

### Delete a Local Branch

1. **Delete a Local Branch**:
   Use the following command to delete a local branch:
   ```bash
   git branch -d branch_name
   ```
   If the branch has not been merged, Git will prompt you to use the `-D` option to force delete it:
   ```bash
   git branch -D branch_name
   ```

### Delete a Remote Branch

1. **Delete a Remote Branch**:
   Use the following command to delete a remote branch:
   ```bash
   git push origin --delete branch_name
   ```
   Or use the older syntax:
   ```bash
   git push origin :branch_name
   ```

### Example

Suppose you want to delete a branch named `feature-branch`:

1. **Delete a Local Branch**:
   ```bash
   git branch -d feature-branch
   ```
   If the branch has not been merged, you can use:
   ```bash
   git branch -D feature-branch
   ```

2. **Delete a Remote Branch**:
   ```bash
   git push origin --delete feature-branch
   ```
   Or:
   ```bash
   git push origin :feature-branch
   ```