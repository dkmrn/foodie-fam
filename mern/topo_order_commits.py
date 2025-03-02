#!/usr/bin/python3

import subprocess
import sys
import os 
import zlib

def find_git_dir():
    # Get current working directory
    cwd = os.getcwd()
    # Loops while cwd does not contain .git
    while not os.path.exists(os.path.join(cwd,'.git')):
        ## If cwd is root dir return
        if (cwd == '/'):
            print('Not inside a Git repository',file=sys.stderr)
            exit(1)
        # If not in root dir go to parent dir and search
        else:
            os.chdir('../')
            cwd = os.getcwd()
    # If .git exist in cwd return path
    return os.path.join(cwd,'.git')

# call with path to .git including .git in path
def list_branches(cwd):
    if not cwd.__contains__('/refs/heads'):
        print('Inputed incorrect path of branches',file=sys.stderr)
        exit(1)
    branches = []
    # Maybe use Walk?
    for root, dirs, files in os.walk(cwd, topdown=False):
        # for branch in files:
        for branch in sorted(files):
            branchName = os.path.abspath(os.path.join(root,branch))
            with open(branchName, 'r') as file:
                branchHash = file.readline().strip() # Strip just in case has new line
            branchName = os.path.relpath(branchName,cwd)
            branchTuple = (branchName,branchHash)
            branches.append(branchTuple)
    # return branches
    return sorted(branches)

def commit_graph():
    # CommitNode Class
    class CommitNode:
        def __init__(self, commit_hash):
            """
            :type commit_hash: str
            """
            self.commit_hash = commit_hash
            self.parents = set()
            self.children = set()

    def read_commit(git_path,commitHash):
        # Path to commit.
        # Inside objects each dir is the first 2 chars of a commit so adding commit[:2] to path
        # The rest of the commmit excluding first 2 chars is inside the directory or commit [2:]
        commitPath = os.path.join(git_path,'objects',commitHash[:2],commitHash[2:])
        with open(commitPath,'rb') as file: # r read, b binary file
            commitCompressed = file.read()
        commitData = zlib.decompress(commitCompressed)
        return commitData.decode('utf-8') # Git commit use utf-8

    def get_commit_parents(commitData):
        parentCommits = []
        for line in commitData.split('\n'):
            if line.startswith('parent '):
                parentCommits.append(line.split(' ')[1]) # Getting has of parent node
        return parentCommits

    # Dictionary to hole CommitNode
    commitNodes = {}
    # Making sure to not add commtis mutiple times
    commitHistory = set()
    commitStack = []
    # Union of Leafs
    root_commits = set()

    gitDir = find_git_dir()
    branchesDir = os.path.join(gitDir,"refs/heads")
    for branchName, branchHash in list_branches(branchesDir):
        # commitStack = [branchHash]
        commitStack.append(branchHash)
        while commitStack:
            currentCommit = commitStack.pop()
            if currentCommit in commitHistory:
                continue
            commitHistory.add(currentCommit)
            if currentCommit not in commitNodes:
                commitNodes[currentCommit] = CommitNode(currentCommit)
            parentCommits = get_commit_parents(read_commit(gitDir,currentCommit))
            if not parentCommits:
                root_commits.add(currentCommit)
                continue
            for parentCommit in parentCommits:
                if parentCommit not in commitNodes:
                    commitNodes[parentCommit] = CommitNode(parentCommit)
                commitNodes[currentCommit].parents.add(commitNodes[parentCommit])
                commitNodes[parentCommit].children.add(commitNodes[currentCommit])
                commitStack.append(parentCommit)
        # The last commit poped should have no parents

    return root_commits, commitNodes
        

cwd = find_git_dir()
cwd = os.path.join(cwd,"refs/heads")
branches = list_branches(cwd)
for branch in branches:
    print(branch)

commit_nodes, root_commits = commit_graph()
print("Root Commits:", root_commits)
for commit_hash, node in commit_nodes.items():
    print(f"Commit: {commit_hash}")
    print(f"Parents: {node.parents}")
    print(f"Children: {node.children}")
    print()