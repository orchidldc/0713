# Opeartions on files

### create folders

使用 `mkdir` 命令新建文件夹：

```bash
mkdir new_folder
```

创建多个层级的文件夹：

```bash
mkdir -p new_folder/sub_folder
```

这将会创建 `new_folder` 和它的子文件夹 `sub_folder`，即使 `new_folder` 本来不存在。

### create files

- 使用 `touch` 命令：

    ```bash
    touch new_file.txt
    ```

    这个命令将创建一个名为 `new_file.txt` 的空文件。如果文件已经存在，`touch` 命令会更新文件的访问和修改时间。

- 使用 `>` 操作符：

    ```bash
    > new_file.txt
    ```

    这将创建一个名为 `new_file.txt` 的新文件。如果该文件已存在，此操作将会清空文件内容，所以使用时需要谨慎。如果你只是想确保文件存在而不清空内容，可以使用 `touch` 命令。

### find specific files

`find`命令在默认情况下会在指定的目录及其所有子目录中递归查找，不限制子目录的层数。所以，如果你想查找某个文件，不管它位于多少层的子目录内，可以直接使用`find`命令。

例如，假设你想在`/home/user`目录及其所有子目录中查找名为`myfile.txt`的文件，可以使用以下命令：

```bash
find /home/user -name "myfile.txt"
```

这条命令会搜索`/home/user`目录及其所有级别的子目录中的每一个位置，寻找名为`myfile.txt`的文件。

---

要查找文件名中带有 `concat` 字样的文件，可以使用 `find` 命令并结合通配符来进行匹配。以下是具体命令：

```bash
find /home/lidc/QI_2 -type f -name "*concat*"
```

这个命令会在 `/home/lidc/QI_2` 目录下搜索所有文件名中包含 `concat` 的文件。`*concat*` 中的星号 `*` 是**通配符**，表示任意字符，因此这个命令可以匹配所有包含 `concat` 字样的文件。

> [!TIP|label:常用命令:]
> ```bash
> find /home/lidc/QI_2 -type f -name rename.py
> find /home/lidc/QI_2 -type f -name "*concat*"
> ```

### view folder size

```shell
du -sh * path   
```

### view file count

在Linux终端中，可以使用多种方法来查看某个文件夹包含的文件数量。以下是几种常用的方法：

#### 1. 使用`ls`和`wc`命令

如果你只想计算当前目录下的文件数量（不包括子目录中的文件），可以使用`ls`命令结合`wc`命令：

```bash
ls -1 | wc -l
```

这里，`ls -1`命令列出当前目录下的所有文件和文件夹，每项占一行。然后，通过管道`|`将输出传递给`wc -l`命令，后者计算接收到的行数，即文件和文件夹的总数。

#### 2. 使用`find`命令

如果你想包括所有子目录中的文件数量，可以使用`find`命令：

```bash
find . -type f | wc -l
```

这里，`find . -type f`命令在当前目录（用`.`表示）及其所有子目录中搜索所有的文件（不包括目录），然后通过管道传递给`wc -l`以计算找到的文件数量。

#### 3. 使用`find`命令查看包括目录在内的总数

如果你想计算包括目录在内的总数，可以稍微修改上面的命令：

```bash
find . | wc -l
```

这条命令会计算当前目录及其子目录中的所有项（包括文件和目录）的总数。

#### 4. 只计算子目录的文件数量

如果你只想计算子目录中的文件数量，排除当前目录，可以使用：

```bash
find . -mindepth 2 -type f | wc -l
```

这里的`-mindepth 2`选项意味着`find`命令从每个目录的第二级深度开始计数，从而排除了顶级目录中的文件。