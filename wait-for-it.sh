#!/bin/bash
# wait-for-it.sh: Wait for a service to be available
# Usage: wait-for-it.sh <host>:<port> -- <command>

host="$1"
shift
port="$1"
shift
cmd="$@"

# Check if host and port are available
until nc -z "$host" "$port"; do
  echo "Waiting for $host:$port to be available..."
  sleep 2
done

# Execute the command
exec $cmd
