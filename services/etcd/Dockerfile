FROM ubuntu:20.04

# Install dependencies
RUN apt-get update && \
    apt-get install -y wget curl net-tools && \
    wget https://github.com/etcd-io/etcd/releases/download/v3.4.15/etcd-v3.4.15-linux-amd64.tar.gz && \
    tar -xvf etcd-v3.4.15-linux-amd64.tar.gz && \
    mv etcd-v3.4.15-linux-amd64/etcd* /usr/local/bin/ && \
    rm -rf etcd-v3.4.15-linux-amd64* etcd-v3.4.15-linux-amd64.tar.gz && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Create a non-root user and group for etcd to enhance security
RUN groupadd -g 10002 etcdgroup && \
    useradd -m -u 10002 -g etcdgroup -s /bin/bash etcduser

# Create directory for etcd data and set permissions
RUN mkdir /etcd-data && \
    chown etcduser:etcdgroup /etcd-data && \
    chmod 700 /etcd-data

# Set environment variables for etcd
ENV ETCD_ADVERTISE_CLIENT_URLS=http://etcd:2379 \
    ETCD_LISTEN_CLIENT_URLS=http://0.0.0.0:2379 \
    ETCD_LISTEN_PEER_URLS=http://0.0.0.0:2380 \
    ETCD_INITIAL_ADVERTISE_PEER_URLS=http://etcd:2380 \
    ETCD_INITIAL_CLUSTER_TOKEN="etcd-cluster-01" \
    ETCD_INITIAL_CLUSTER="etcd=http://etcd:2380" \
    ETCD_INITIAL_CLUSTER_STATE="new" \
    ETCD_DATA_DIR="/etcd-data" \
    ETCD_LOGGER="zap" \
    ETCD_NAME="etcd" \
    ETCDCTL_API=3


# Expose the etcd client and peer ports
EXPOSE 2379 2380

# Switch to non-root user before running etcd
USER etcduser

# Run etcd
CMD ["etcd"]