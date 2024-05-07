# Version Control (Git)

<iframe src="https://www.youtube.com/embed/2sjqTHE0zok" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen="" frameborder="0"></iframe>

Version control systems (VCSs) are tools used to track changes to source code (or other collections of files and folders). As the name implies, these tools help maintain a history of changes; furthermore, they facilitate collaboration. VCSs track changes to a folder and its contents in a series of **snapshots**, where each snapshot encapsulates the entire state of files/folders within a top-level directory. VCSs also maintain **metadata** like who created each snapshot, messages associated with each snapshot, and so on.

Why is version control useful? Even when you’re working by yourself, it can let you look at old snapshots of a project, keep a log of why certain changes were made, work on parallel branches of development, and much more. When working with others, it’s an invaluable tool for seeing what other people have changed, as well as resolving conflicts in concurrent development.

Modern VCSs also let you easily (and often automatically) answer questions like:

- Who wrote this module?
- When was this particular line of this particular file edited? By whom? Why was it edited?
- Over the last 1000 revisions, when/why did a particular unit test stop working?

While other VCSs exist, **Git** is the de facto standard for version control. This [XKCD comic](https://xkcd.com/1597/) captures Git’s reputation:

![xkcd 1597](https://imgs.xkcd.com/comics/git.png)

Because Git’s interface is a leaky abstraction, learning Git top-down (starting with its interface / command-line interface) can lead to a lot of confusion. It’s possible to memorize a handful of commands and think of them as magic incantations, and follow the approach in the comic above whenever anything goes wrong.

While Git admittedly has an ugly interface, its underlying design and ideas are beautiful. While an ugly interface has to be *memorized*, a beautiful design can be *understood*. For this reason, we give a bottom-up explanation of Git, starting with its data model and later covering the command-line interface. Once the data model is understood, the commands can be better understood, in terms of how they manipulate the underlying data model.

# Git’s data model

There are many ad-hoc approaches you could take to version control. Git has a well thought-out model that enables all the nice features of version control, like maintaining history, supporting branches, and enabling collaboration.

## Snapshots

Git models the history of a collection of files and folders within some top-level directory as a series of snapshots. In Git terminology, a file is called a “blob” => **leaf of a tree**, and it’s just a bunch of bytes. A directory is called a “tree”, and it maps names to blobs or trees (so directories can contain other directories). A snapshot is the top-level tree that is being tracked. For example, we might have a tree as follows:

```
<root> (tree)
|
+- foo (tree)
|  |
|  + bar.txt (blob, contents = "hello world")
|
+- baz.txt (blob, contents = "git is wonderful")
```

The top-level tree contains two elements, a tree “foo” (that itself contains one element, a blob “bar.txt”), and a blob “baz.txt”.

## Modeling history: relating snapshots

How should a version control system relate snapshots? One simple model would be to have a linear history. A history would be a list of snapshots in time-order. For many reasons, Git doesn’t use a simple model like this.

In Git, a history is a directed acyclic graph (DAG) of snapshots. That may sound like a fancy math word, but don’t be intimidated. All this means is that each snapshot in Git refers to *a set of “parents”*, the snapshots that preceded it. It’s a set of parents rather than a single parent (as would be the case in a linear history) because a snapshot might descend from multiple parents, for example due to combining (merging) two parallel branches of development.

Git calls these snapshots “commit”s. Visualizing a commit history might look something like this:

```
o <-- o <-- o <-- o
            ^
             \
              --- o <-- o
```

In the ASCII art above, the `o`s correspond to individual commits (snapshots). The arrows point to the parent of each commit (it’s a “comes before” relation, not “comes after”). After the third commit, the history branches into two separate branches. This might correspond to, for example, two separate features being developed in parallel, independently from each other. In the future, these branches may be merged to create a new snapshot that incorporates both of the features, producing a new history that looks like this, with the newly created merge commit shown in bold:

```
o <-- o <-- o <-- o <---- o  # merged back
            ^            /
             \          v
              --- o <-- o
```

*Commits in Git are immutable*. This doesn’t mean that mistakes can’t be corrected, however; it’s just that “edits” to the commit history are actually creating entirely new commits, and references (see below) are updated to point to the new ones.

## Data model, as pseudocode

It may be instructive to see Git’s data model written down in pseudocode:

```
// a file is a bunch of bytes
type blob = array<byte>

// a directory contains named files and directories
type tree = map<string, tree | blob>

// a commit has parents, metadata, and the top-level tree
type commit = struct {
    parent: array<commit>
    author: string
    message: string
    snapshot: tree
}

// In haskell notation. Tree is a recursive data structure
data Tree = [Map String (Either Tree Blob)]
type Blob = Bytes
```

It’s a clean, simple model of history.

## Objects and content-addressing

**All objects have their hash ID. Then reference objects (tree, commit) simply reference to the hash ID of their contents.**

An “object” is a blob, tree, or commit:

```
type object = blob | tree | commit
```

In Git data store, all objects are content-addressed by their [SHA-1 hash](https://en.wikipedia.org/wiki/SHA-1).

```
objects = map<string, object>

def store(object):
    id = sha1(object)
    objects[id] = object

def load(id):
    return objects[id]
```

Blobs, trees, and commits are unified in this way: they are all objects. **When they reference other objects, they don’t actually *contain* them in their on-disk representation, but have a reference to them by their hash.**

For example, the tree for the example directory structure [above](https://missing.csail.mit.edu/2020/version-control/#snapshots) (visualized using `git cat-file -p 698281bc680d1995c5f4caaf3359721a5a58d48d`), looks like this:

```
100644 blob 4448adbf7ecd394f42ae135bbeed9676e894af85    baz.txt
040000 tree c68d233a33c5c06e0340e4c224f0afca87c8ce87    foo
```

The tree itself contains pointers to its contents, `baz.txt` (a blob) and `foo` (a tree). If we look at the contents addressed by the hash corresponding to baz.txt with `git cat-file -p 4448adbf7ecd394f42ae135bbeed9676e894af85`, we get the following:

```
git is wonderful
```

## References

**References are basically aliases for hash IDs.**

Now, all snapshots can be identified by their SHA-1 hash. That’s inconvenient, because humans aren’t good at remembering strings of 40 hexadecimal characters.

Git’s solution to this problem is human-readable names for SHA-1 hashes, called “references”. References are pointers to commits. Unlike objects, which are immutable, references are mutable (can be updated to point to a new commit). For example, the `master` reference usually points to the latest commit in the main branch of development.

```
references = map<string, string>

def update_reference(name, id):
    references[name] = id

def read_reference(name):
    return references[name]

def load_reference(name_or_id):
    if name_or_id in references:
        return load(references[name_or_id])
    else:
        return load(name_or_id)
```

With this, Git can use human-readable names like “master” to refer to a particular snapshot in the history, instead of a long hexadecimal string.

One detail is that we often want a notion of “where we currently are” in the history, so that when we take a new snapshot, we know what it is relative to (how we set the `parents` field of the commit). In Git, that “where we currently are” is a special reference called “HEAD”.

## Repositories

Finally, we can define what (roughly) is a Git *repository*: it is the data `objects` and `references`.

On disk, all Git stores are objects and references: that’s all there is to Git’s data model. All `git` commands map to some manipulation of the commit DAG by adding objects and adding/updating references.

Whenever you’re typing in any command, think about what manipulation the command is making to the underlying graph data structure. Conversely, if you’re trying to make a particular kind of change to the commit DAG, e.g. “discard uncommitted changes and make the ‘master’ ref point to commit `5d83f9e`”, there’s probably a command to do it (e.g. in this case, `git checkout master; git reset --hard 5d83f9e`).

# Staging area

This is another concept that’s orthogonal to the data model, but it’s a part of the interface to create commits.

One way you might imagine implementing snapshotting as described above is to have a “create snapshot” command that creates a new snapshot based on the *current state* of the working directory. Some version control tools work like this, but not Git. We want clean snapshots, and it might not always be ideal to make a snapshot from the current state. For example, imagine a scenario where you’ve implemented two separate features, and you want to create two separate commits, where the first introduces the first feature, and the next introduces the second feature. Or imagine a scenario where you have debugging print statements added all over your code, along with a bugfix; you want to commit the bugfix while discarding all the print statements.

Git accommodates such scenarios by allowing you to specify which modifications should be included in the next snapshot through a mechanism called the “staging area”.

# Git command-line interface

To avoid duplicating information, we’re not going to explain the commands below in detail. See the highly recommended [Pro Git](https://git-scm.com/book/en/v2) for more information, or watch the lecture video.

Terms: (un)tracked, (un)modified, staged, committed; working tree, staging area, commits

## Chpt 0: Setting up

- `git config --list --show-origin`: show full list of config
- `git config [--system/--global/--local] <name> <value>`: add a new config
  --system: config for all users of this PC, PATH: /etc/gitconfig
  --global: config for this user, PATH: ~/.gitconfig
  --local: config for this repo, the default one used when change config, PATH: .git/config in your repo
  changes to each level overrides values in previous level, git search config from local to system and takes the first set value
- `git config <name> [--show-origin]`: reads a value of a config



## Chpt 1: Basics

### Showing status

- `git help <command>`: get help for a git command
  `git <command> -h`: for a shorter version of help
- `git init`: creates a new git repo, with data stored in the `.git` directory
  Then you need to add files and do your first commit
- `git clone <url to repo`: Clone objects of repo with its full history into your local disk 
- `git status`: tells you what’s going on -> status of files, branch currently on etc.
  `git status -s`: give you TL;DR version of status

### Adding and committing

- `git add <filename>`: adds files to staging area (either untracked or modified)
- `git commit`: creates a new commit    
  - Write [good commit messages](https://tbaggery.com/2008/04/19/a-note-about-git-commit-messages.html)!
  - Even more reasons to write [good commit messages](https://chris.beams.io/posts/git-commit/)!
- `git commit -m "message"` to write your commit message easily
- `git commit -a -m "message"`: add all files to staging area and commit

### Displaying log

- `git log`: shows a flattened log of history
  `git log -p -2`: show diff (patch) in last 2 commits
  `git log --stat/--shortstat`: show stats (LoC changed)
  `git log --pretty=oneline/short/full/fuller`: show history with varying levels of detail
  `git log --relative-date`: show date relative to now, v. useful

  `git log --abbrev-commit`: show only start of commit hash 
  `git log --since/--until=<time>`: show log limited to these times
  time=2021-03-14/"1 year 2 months 3 minutes ago"/3.month
  `git log -S <function_name>`: show commits that modify the # of occurrences of this string

- `git log --all --graph --decorate`: visualises history as a DAG

- `git diff [filename]`: show changes in current working tree relative to the staging area
  `git diff --staged/--cached [filename]`: show changes in staging area relative to last commit
  can also use external tools to visualise this, eg. VSCode

### Undoing

- To remove a file, first delete on your system, then do
  `git rm <filename, dir, glob>`: to stage the removal
- `git rm --cached <filename>`: stop tracking a file
- `git mv [oldname] [newname]`: rename a file and track that in git
  this is equivalent to: `mv [1] [2]`; `git rm [1]`; `git add [2]`
  somehow git doesn't track file movement, only file creation/deletion/modification etc.
- `git commit --amend`: Add changes in **current staging area** to last commit
- `git reset HEAD <file>`: unstage a staged file
  alternatively, do `git restore --staged <file>` for newer versions of git
- `git checkout -- <file>`: unmodify a modified file, **this will wipe local changes!!!!**
  the above 2 commands are unified under `git restore` on newer version of git

### Remotes

- `git remote [-v]`: show remote repo handles in current directory
- `git remote add <shortname> <url>`: add remote handle to your directory. Now master branch in `shortname`is `shortname/master`
- `git fetch <remote/shortname>`: downloads/updates history (commits, branches, tags) of repo to your machine
- `git fetch --all`: fetch all remote repo in this directory
- `git pull`: fetches and merges the remote repo into your current branch
- `git push <remote> <branch>`: merges your work in your branch upstream, will be rejected if you haven't pulled the most recent version
- `git push <remote> --delete <branch>`: push and delete remote branch with name `<branch>`
- `git remote show <remote>`: shows more info on remote, incl. its configuration
  Note you need to manually add local branches to track remote branch with `git checkout <branch>`. Only master is added by default
- `git remote rename <oldname> <newname>`: rename the shortname for a remote repo
- `git remote rm <remote>`: remove a remote repo in your current directory
- `git checkout --track origin/dev`: create a local branch `dev` that tracks remote branch `origin/dev`, same as `git checkout -b dev origin/dev`
  an even shorter shorthand is `git checkout dev`, given `dev` isn't one of your branches and it matches exactly the name in the remote repo
- `git branch -u <remote_branch>`: set the current branch to track `remote_branch`
- `git branch -vv`: show all branches w/ info on remote repo tracking

### Tagging

- `git tag -l ["glob"]`: list all tags in repo history
- `git tag -a v1.4 -m "message"`: create an annotated tag v1.4 on last commit
- `git tag v1.0-lw`: create a lightweight tag v1.4-lw on last commit
- `git show <tag>` show tag info
- `git tag [-a] <tag> <checksum/start of checksum>`: tag previous commits
- `git push <remote> <tag>`: push tag to remote repo
- `git push --tags`: push and add all tags
- `git tag -d <tag>`: delete a tag
- `git push <remote> <branch> --delete <tag>`: delete a tag on remote repo
- `git checkout <tag>`: checkout the commit the tag is pointing to

- `git checkout <revision>`: updates HEAD and current branch



## Chpt 2: Branching and merging

- `git branch`: shows branches
- `git branch <name>`: creates a branch
- `git branch -d <name>`: deletes a branch
- `git branch -v`: see last commit on this branch
- `git branch --merged/--no-merged`: see branches (not )merged to current branch
  put <branch> in the end to get info for another branch
- `git checkout -b <name>`: creates a branch and switches to it    
  - same as `git branch <name>; git checkout <name>`
- `git merge <revision>`: merges into current branch
- `git mergetool`: use a fancy tool to help resolve merge conflicts
- `git merge --abort`: to abort a merge when conflict encountered
- `git rebase <branch>`: rebase set of patches/diff between `<branch>` and common ancestor, into the current branch and creates a new base

git merge <branch>; vim <conflict_files>; git add -A; git commit

​									\\__ git merge --abort

# Advanced Git

Read the chapter on `Refspec`, p.458

- `git config`: Git is [highly customizable](https://git-scm.com/docs/git-config)
- `git clone --depth=1`: shallow clone, without entire version history
- `git add -p`: interactive staging
- `git rebase -i`: interactive rebasing
- `git blame`: show who last edited which line
- `git stash`: temporarily remove modifications to working directory
- `git bisect`: binary search history (e.g. for regressions)
- `.gitignore`: [specify](https://git-scm.com/docs/gitignore) intentionally untracked files to ignore
- `git cherry-pick <commitSHA>`: Apply changes in that commit to current branch and commits it, this allows change applied from any arbitrary commit in any order.

# Selected topics

## Submodules

Submodules are repositories that are contained inside another repository (called the supermodule). The supermodule doesn't actually contain all the **code** of the submodule, but instead just have a special pointer-like object to the submodule **repo** and its commit. This can be seen when you look at a particular commit of a supermodule:

![submodule](/home/zaiyuming/Tech/GitGood/img/submodule.png)

Git knows that a particular folder is a submodule by storing the info inside the `.gitmodule` file. 

Submodules are great as they add modularisation. This is useful when you use 3rd party libraries or have multiple conceptually independent projects that work together to make a larger project. Instead of copying all the code into one gigantic repo and having all the changes mashed together into commits, submodules each have their own commit history and the supermodule just points to the desired commit of each submodule.



**Adding a submodule** modifies the .gitmodule file (which specifies submodule locations locally and their url remotely) and adds submodules as essentially pointers to the repo with a particular commit. Make sure you commit this change to add the submodule.

- `git submodule add <url>`: Add submodule in folder with same name to the current directory
- `git submodule add <url> <path>`: Add submodule to directory of that path



**Cloning into a file with submodules** include 2 extra steps you need to do after `git clone`: (1) get the submodule info and (2) get the submodule content of the commit the supermodule points to. The relevant commands are given below. When you clone the supermodule repo, the submodules are empty folders. You need (2) to get the code on your local machine.

You might have to do this recursively if you have recursive submodules

- `git submodule init`: Initialise the submodules (adding some info to .git/config etc.) (1)
- `git submodule update`: Download submodule content (2)
- `git submodule update --init`: The above 2 combined
- `git submodule update --init --resursive`: Also download data recursively for nested submodules
- `git pull --recurse-submodules`: pull and update submodule content recursively, also adding new submodules if there are any. This is essentially everything combined, equivalent to `git pull`; `git submodule update --init --recursive`



**Pulling updates from the supermodule** need `git submodule update` besides `git pull`. Say your teammate added some changes to the supermodule (eg. changing its README file). The new commit includes these changes, perhaps with some updates on the submodules where it now point to new commits of the submodules. To get these changes, you do `git pull`, which fetches the new commit and merges it into your current branch. `git pull` also lets the local git repo know that the submodules are pointing at the newer commits. However, it **doesn't update the submodule content**. (This could be useful. Perhaps the code you are working on right now breaks with the newer version of the submodules)

To get the new submodule content, do `git submodule update`. This will download and modify the code in the submodule to be exactly what it looks like in the commit the supermodule is pointing at.

Sometimes you might want to do ` git submodule update --init --recursive`. The `--init` flag adds new submodules which may be introduced in the new supermodule commit. The `--recursive` update the content recursively. So in fact, you could just again do `git pull --recurse-submodules` to combine all the steps to pull updates from the supermodule.



**Making changes**

Now remember, the supermodule sees every submodule as just a pointer to another repo and its commit. If you make changes to the local submodule code and push it into the supermodule, the changes will be lost. The correct way of doing this consist of (1) make changes in the submodule and push it to the submodule repo and (2) update the pointer in the supermodule to point to the newer commits of the submodules. 

Fortunately, git has a clever way of managing this. When you are in the supermodule directory, the output of `git branch` are the branches of the supermodule. When you `cd` into a submodule, the branches you see are the submodule branches. In fact, when you are inside the submodule folder, everything works as if you are in that repo and the supermodule doesn't exist. You can create branches, commit changes etc. So to make changes, just `cd` into the submodule directory, checkout a branch, and commit changes.

*: By default all the submodules have a detached HEAD, aka. there is no current branch. This is to make things simpler, as most of the time submodules are not being edited. To edit, simply checkout a branch.

Now say you've made some changes and you are ready to push the new local commits of submodules to the remote repo.

**First, pull any new changes that happened while you were editing**

- Go back to supermodule directory and do `git submodule update --remote --merge`. This will get the newest commit from submodules and merge them into their current branch.

=> What if I accidentally did `git submodule update` (without the --remote flag) and I lost my changes?

- `git submodule update` will download and refresh the submodules to be the state of the commit pointed by the supermodule, and detach the HEAD of the submodule. To get your changes back, simply `cd` back into the submodule and checkout the branch you were working on.

**Next, push your changes**

- To push, go to each submodule you changed and push to their remote. Then, go to the supermodule and first do `git submodule update --remote --merge` (to get update the supermodule to point to the newer commits for the submodules (which you just pushed)), then push to remote.
- You can also just go to the supermodule and do `git push --recurse-submodules=on-demand`, which will push all submodules for you before pushing the supermodule. Though sometimes this doesn't work so it's better to do the first option. (I haven't got it to work)



**Useful aliases**

```python
# In the supermodule, diff will only give you changes in the supermodule code and not the submodule code
git config --global alias.sdiff '!'"git diff && git submodule foreach 'git diff'"

# Pull changes from the supermodule and refresh the content for submodules determined by the commit specified in the supermodule
git config --global alias.spull 'pull --recurse-submodules'

# If the above doesn't work, do this after you do `git pull`
git config --global alias.srefresh 'submodule update --init --recursive'

# Fetch newer commits from the submodules and merge it with their current branches, also update the commit pointer in the supermodule
git config --global alias.supdate 'submodule update --remote --merge'

# Push for each submodule then push on the supermodule
git config --global alias.spush 'push --recurse-submodules=on-demand'
```



**Summary and commands for common workflow**

```python
# Cloning into master repo
git clone https://github.com/yumium/microbit-ML
git srefresh # this could take a while the first time

...few days later

# Pulling new updates upstream
git spull (git pull --recursive-submodules)

# If git spull didn't update the submodules, do the following equivalent commands instead
git pull
git srefresh

# Add some changes to a submodule
cd PythonEditor
git checkout master
...make some changes
git commit -a -m "Added some stuff"

# Ready to push the changes upstream
# 1. Pull first for submodules
cd ..
git supdate (git submodule update --remote --merge)
# 2. Push local commit to submodule remote repo
cd PythonEditor
git push origin master
# 3. Update supermodule so it pointers to newer commit of submodules
cd ..
git supdate
# 4. Pull and push for supermodule
git commit -a -m "Update Python submodule version"
git pull
git push
```



**IMPORTANT**

As we are using the v1.13 micropython (repo is at `microbit-ML/micropython-microbit-v2/lib/micropython`), I have created a new branch called **stable** that is currently pointing at the v1.13 commit. Please pull and push to that branch. I have set up the `.gitmodules` file to track that branch when refreshing submodules.





**Miscellaneous**

Get the supermodule to track a different branch for a submodule

- `git submodule add -b <branch_name> <url_to_repo>`

- You can also just add the line `branch = <branch_name>` in the submodule in .gitmodules

Other commands

- `git submodule sync`: update url in .gitmodule if url of submodules changed





## Viewing diff across MRs for one piece of work using `cherry-pick`

Often one piece of work will be spread across multiple MRs/PRs. Overtime you may lose track of all the changes you made.

You could use `cherry-pick` to execute all the changes across MRs in order, then compare that branch to where you started to get an aggregated view of the changes.

Luckily, `cherry-pick` can be used on a merge request, so now you are picking the MRs you want instead of all the commits one by one.

Apply the following command

```
git cherry-pick -m 1 <mergecommithash> -n
```

- `-m`: Pick which parent you want to apply the changes from. View the parents of a merge using `git show --pretty=raw <mergecommithash>`
- `-n`: Don't commit the changes, just stage them




# Miscellaneous

- **GUIs**: there are many [GUI clients](https://git-scm.com/downloads/guis) out there for Git. We personally don’t use them and use the command-line interface instead.
- **Shell integration**: it’s super handy to have a Git status as part of your shell prompt ([zsh](https://github.com/olivierverdier/zsh-git-prompt), [bash](https://github.com/magicmonty/bash-git-prompt)). Often included in frameworks like [Oh My Zsh](https://github.com/ohmyzsh/ohmyzsh).
- **Editor integration**: similarly to the above, handy integrations with many features. [fugitive.vim](https://github.com/tpope/vim-fugitive) is the standard one for Vim.
- **Workflows**: we taught you the data model, plus some basic commands; we didn’t tell you what practices to follow when working on big projects (and there are [many](https://nvie.com/posts/a-successful-git-branching-model/) [different](https://www.endoflineblog.com/gitflow-considered-harmful) [approaches](https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow)).
- **GitHub**: *Git is not GitHub*. GitHub has a specific way of contributing code to other projects, called [pull requests](https://help.github.com/en/github/collaborating-with-issues-and-pull-requests/about-pull-requests).
- **Other Git providers**: GitHub is not special: there are many Git repository hosts, like [GitLab](https://about.gitlab.com/) and [BitBucket](https://bitbucket.org/).

# Resources

- [Pro Git](https://git-scm.com/book/en/v2) is **highly recommended reading**. Going through Chapters 1–5 should teach you most of what you need to use Git proficiently, now that you understand the data model. The later chapters have some interesting, advanced material.
- [Oh Shit, Git!?!](https://ohshitgit.com/) is a short guide on how to recover from some common Git mistakes.
- [Git for Computer Scientists](https://eagain.net/articles/git-for-computer-scientists/) is a short explanation of Git’s data model, with less pseudocode and more fancy diagrams than these lecture notes.
- [Git from the Bottom Up](https://jwiegley.github.io/git-from-the-bottom-up/) is a detailed explanation of Git’s implementation details beyond just the data model, for the curious.
- [How to explain git in simple words](https://smusamashah.github.io/blog/2017/10/14/explain-git-in-simple-words)
- [Learn Git Branching](https://learngitbranching.js.org/) is a browser-based game that teaches you Git.

# Exercises

1. If you don’t have any past experience with Git, either try reading the first couple chapters of [Pro Git](https://git-scm.com/book/en/v2) or go through a tutorial like [Learn Git Branching](https://learngitbranching.js.org/). As you’re working through it, relate Git commands to the data model.

2. Clone the 

   repository for the class website

   .    

   1. Explore the version history by visualizing it as a graph.
   2. Who was the last person to modify `README.md`? (Hint: use `git log` with an argument)
   3. What was the commit message associated with the last modification to the `collections:` line of `_config.yml`? (Hint: use `git blame` and `git show`)

3. One common mistake when learning Git is to commit large files that should not be managed by Git or adding sensitive information. Try adding a file to a repository, making some commits and then deleting that file from history (you may want to look at [this](https://help.github.com/articles/removing-sensitive-data-from-a-repository/)).

4. Clone some repository from GitHub, and modify one of its existing files. What happens when you do `git stash`? What do you see when running `git log --all --oneline`? Run `git stash pop` to undo what you did with `git stash`. In what scenario might this be useful?

5. Like many command line tools, Git provides a configuration file (or dotfile) called `~/.gitconfig`. Create an alias in `~/.gitconfig` so that when you run `git graph`, you get the output of `git log --all --graph --decorate --oneline`.

6. You can define global ignore patterns in `~/.gitignore_global` after running `git config --global core.excludesfile ~/.gitignore_global`. Do this, and set up your global gitignore file to ignore OS-specific or editor-specific temporary files, like `.DS_Store`.

7. Fork the [repository for the class website](https://github.com/missing-semester/missing-semester), find a typo or some other improvement you can make, and submit a pull request on GitHub.

