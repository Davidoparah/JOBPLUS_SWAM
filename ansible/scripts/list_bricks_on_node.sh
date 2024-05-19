#!/bin/bash

# This script checks for GlusterFS bricks that are located on a specified node.
# It iterates over all volumes in the GlusterFS cluster and prints the volume
# name and path for any bricks found on the specified node.
#
# Usage: ./script_name.sh <node_name>


# Check if a node name was passed
if [ "$#" -ne 1 ]; then
    echo "Usage: $0 <node_name>"
    exit 1
fi

NODE_NAME="$1"

# Fetch all volume names
VOLUMES=$(gluster volume list)

# Iterate over each volume to check for bricks on the specified node
for VOL in $VOLUMES; do
    # Fetching detailed info for each volume
    INFO=$(gluster volume info $VOL)

    # Using awk to parse volume info. Adjust the match pattern as necessary.
    echo "$INFO" | awk -v node="$NODE_NAME" '
    /Volume Name:/ { volume = $3 }
    /Brick[0-9]+:/ {
        if ($0 ~ node) {
            print volume ": " $NF
        }
    }'
done