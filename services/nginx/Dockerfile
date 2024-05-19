# Use the official Nginx image as a parent image
FROM nginx:1.21.3

# Update package lists and install inotify-tools
RUN apt-get update && apt-get install -y inotify-tools

# Remove all .conf Nginx configuration files as they will be regenerated
RUN rm -f /etc/nginx/conf.d/*.conf

# Copy the template files
COPY configs/http-template.conf /etc/nginx/conf.d/http-template.conf

# Expose ports (Optional, as this is mainly for documentation purposes)
EXPOSE 80

# Start Nginx when the container has provisioned
CMD ["nginx", "-g", "daemon off;"]