### Delete Commit

**Scenario**: Suppose you have made an incorrect commit and want to delete it. In this situation, you can roll back to the previous commit and then re-commit as needed.

1. **Reset to the Target Commit**:
   For example, if you want to reset to commit `8aaeae2`, deleting all commits after it:
   ```bash
   git reset --hard 8aaeae2
   ```

2. **Force Push to the Remote Repository**:
   Since you have rewritten history, you need to force push to update the remote repository:
   ```bash
   git push origin main --force
   ```

---

> [!NOTE|label:NOTE]
> The **hard reset** (`git reset --hard`) will reset your working directory and remove any commits after the specified commit (`8aaeae2`). This means you will lose any uncommitted changes, so make sure you are sure about this before proceeding.
>
> The **force push** (`--force`) is necessary because the history of the branch is rewritten. When you do a hard reset, you alter the commit history, which requires a force push to update the remote branch accordingly.