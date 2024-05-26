# Stage 1: Build Stage
FROM node:18-alpine as build

# Install dependencies for building native modules
RUN apk update && apk add --no-cache \
    python3 \
    make \
    g++ \
    zlib-dev \
    libpng-dev \
    vips-dev \
    git \
    build-base

ENV NODE_ENV=production

# Set the working directory
WORKDIR /opt/

# Copy package.json and yarn.lock to the working directory
COPY package.json yarn.lock ./

# Install global dependencies and configure yarn
RUN yarn global add node-gyp
RUN yarn config set network-timeout 600000 -g && yarn install --production

# Ensure binaries are available in the PATH
ENV PATH /opt/node_modules/.bin:$PATH

# Set the working directory for the application code
WORKDIR /opt/app

# Copy the application code
COPY . .

# Build the application
RUN yarn build

# Stage 2: Production Stage
FROM node:18-alpine

# Install runtime dependencies
RUN apk add --no-cache vips-dev

ENV NODE_ENV=production

# Set the working directory
WORKDIR /opt/

# Copy node_modules and built application from the build stage
COPY --from=build /opt/node_modules ./node_modules
COPY --from=build /opt/app ./

# Ensure binaries are available in the PATH
ENV PATH /opt/node_modules/.bin:$PATH

# Change ownership to non-root user (optional)
RUN chown -R node:node /opt/app

# Switch to non-root user
USER node

# Expose the port the application will run on
EXPOSE 1337

# Define the command to run the application
CMD ["yarn", "start"]