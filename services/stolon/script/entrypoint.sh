#!/bin/bash

# Fetch the IP address of the container
IP_ADDRESS=$(hostname -I | awk '{print $1}')

echo "Starting Stolon as a $ROLE..."

case "$ROLE" in
  "ctl")
    echo "Checking if Stolon cluster is already initialized..."
    if stolonctl status --cluster-name $STOLONCTL_CLUSTER_NAME --store-backend $STOLONCTL_STORE_BACKEND --store-endpoints $STOLONCTL_STORE_URL; then
      echo "Stolon cluster already initialized."
    else
      echo "Initializing Stolon cluster..."
      stolonctl \
        --cluster-name $STOLONCTL_CLUSTER_NAME \
        --store-backend $STOLONCTL_STORE_BACKEND \
        --store-endpoints $STOLONCTL_STORE_URL \
        init --yes
      echo "Stolon cluster initialized."
    fi
    ;;
  "keeper")
    echo "Starting Stolon keeper..."
    ;;
  "sentinel")
    echo "Starting Stolon sentinel..."
    ;;
  "proxy")
    echo "Starting Stolon proxy..."
    ;;
  *)
    echo "Unknown role: $ROLE"
    exit 1
    ;;
esac

# Keep the script running
tail -f /dev/null