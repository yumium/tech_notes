#aliases
alias cc="clickhouse-client"
alias gitm="git ls-files -m"
alias tt="./build/Release/dist/TestExe --report_level=detailed > /tdc/yzai/workspace/personal/dump.txt 2>&1"

#exports
export TMPDIR="/tdc/yzai/workspace/personal/tmpdir/"

parse_git_branch() {
  git branch 2>/dev/null | sed -n '/\* /s///p'
}

GREEN_BOLD="\[\033[1;32m\]"   # Bold green
PURPLE="\[\033[0;35m\]"       # Non-bold purple
RESET="\[\033[0m\]"

alias ps1="export PS1='${GREEN_BOLD}[nix-shell:\w ${PURPLE}\$(parse_git_branch)${GREEN_BOLD}]${RESET} '"
