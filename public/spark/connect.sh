#!/usr/bin/env bash
# LocalAI Thailand - DGX Spark demo, one-command setup.
#
#   curl -fsSL https://localaithai.com/spark/connect.sh | bash -s -- <your key>
#
# Saves your key, writes a Codex profile, and adds spark-* commands to your
# shell. No sudo, nothing outside your home directory, safe to run twice.
set -euo pipefail

BASE_URL="https://spark.dgxthai.com"
KEY="${1:-${SPARK_KEY:-}}"

die() { printf '%s\n' "$*" >&2; exit 1; }

[ -n "$KEY" ] || die "usage: curl -fsSL https://localaithai.com/spark/connect.sh | bash -s -- <your key>"
case "$KEY" in
  sk-*) ;;
  *) die "that does not look like a key - it should start with sk-" ;;
esac

# SPARK_SKIP_CHECK=1 skips the live key check. For testing this script only.
if [ "${SPARK_SKIP_CHECK:-}" != "1" ]; then
  code=$(curl -sS -o /dev/null -w '%{http_code}' -H "Authorization: Bearer $KEY" "$BASE_URL/v1/models" || echo 000)
  case "$code" in
    200) ;;
    401|403) die "key rejected or expired, ask LocalAI Thailand for a new one" ;;
    000) die "cannot reach $BASE_URL - check your internet connection" ;;
    *) die "unexpected reply from $BASE_URL (HTTP $code) - tell LocalAI Thailand" ;;
  esac
fi

# 1. the key
mkdir -p "$HOME/.config/spark"
printf '%s\n' "$KEY" > "$HOME/.config/spark/key"
chmod 600 "$HOME/.config/spark/key"

# 2. a Codex profile of its own, so your normal ~/.codex is untouched
mkdir -p "$HOME/.codex-spark" "$HOME/.claude-spark"
conf="$HOME/.codex-spark/config.toml"
if [ ! -f "$conf" ] || grep -q 'model_provider = "spark"' "$conf"; then
  cat > "$conf" <<'TOML_EOF'
model = "claude-spark"
model_provider = "spark"

[model_providers.spark]
name = "LocalAI Thailand Spark"
base_url = "https://spark.dgxthai.com/v1"
env_key = "SPARK_API_KEY"
wire_api = "responses"
TOML_EOF
else
  echo "kept your own $conf (it is not ours to overwrite)"
fi

# 3. the spark-* commands, in a marked block we can replace on a rerun
case "${SHELL:-}" in
  */zsh) rc="$HOME/.zshrc" ;;
  *) rc="$HOME/.bashrc" ;;
esac
begin='# >>> localaithai spark >>>'
end='# <<< localaithai spark <<<'
touch "$rc"
tmp=$(mktemp)
awk -v b="$begin" -v e="$end" '$0==b{skip=1} !skip{print} $0==e{skip=0}' "$rc" > "$tmp"
cat >> "$tmp" <<'RC_EOF'
# >>> localaithai spark >>>
# LocalAI Thailand DGX Spark demo. Delete this block to undo.
# The commands are spark-claude / spark-codex / spark-hermes, not claude-spark:
# claude-spark is the name of the model, and yours may already be taken.
spark-claude() {
  CLAUDE_CONFIG_DIR=$HOME/.claude-spark \
  ANTHROPIC_BASE_URL=https://spark.dgxthai.com \
  ANTHROPIC_AUTH_TOKEN=$(cat ~/.config/spark/key) \
  ANTHROPIC_DEFAULT_MODEL=claude-spark \
  ANTHROPIC_DEFAULT_FAST_MODEL=claude-spark-fast \
  claude --model claude-spark --settings '{"autoCompactWindow":"60k"}' "$@"
}
spark-codex() {
  CODEX_HOME=$HOME/.codex-spark SPARK_API_KEY=$(cat ~/.config/spark/key) codex "$@"
}
spark-hermes() {
  OPENAI_BASE_URL=https://spark.dgxthai.com/v1 OPENAI_API_KEY=$(cat ~/.config/spark/key) \
  hermes chat --provider openai-api --model claude-spark "$@"
}
spark-test() {
  curl -sS https://spark.dgxthai.com/v1/chat/completions \
    -H "Authorization: Bearer $(cat ~/.config/spark/key)" \
    -H 'Content-Type: application/json' \
    -d '{"model":"claude-spark","messages":[{"role":"user","content":"Reply with exactly: spark is up"}]}' \
  | if command -v python3 >/dev/null 2>&1; then
      python3 -c 'import json,sys; d=json.load(sys.stdin); print(d.get("choices",[{}])[0].get("message",{}).get("content") or d)'
    else cat; fi
}
# <<< localaithai spark <<<
RC_EOF
cat "$tmp" > "$rc"
rm -f "$tmp"

# 4. what you can run now
echo
echo "Done. Key in ~/.config/spark/key, Codex profile in ~/.codex-spark, commands in $rc"
for t in claude codex hermes; do
  if command -v "$t" >/dev/null 2>&1; then echo "  $t      installed"; else echo "  $t      not installed - skip its command"; fi
done
echo
echo "Open a new terminal, then: spark-test - spark-claude - spark-codex - spark-hermes"
echo "On Windows, use the snippets on https://localaithai.com/spark/customer.html instead."
