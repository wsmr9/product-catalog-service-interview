# Base Image
# Use an official lightweight Node.js image as a parent image
FROM node:14-alpine

# Set the working directory inside the container
WORKDIR /usr/src/app

# Dependency installation
# Copy the package.json and package-lock.json (if available) to the container
COPY package*.json ./

# Install project dependencies
# This layer is cached, speeding up subsequent builds if package.json has not changed
RUN npm install

# Copy application source
# Copy the rest of your app's source code from your host to your image filesystem.
COPY . .

# Environment Variables
# Argument for external database URL, defaults to empty if not provided
ARG DATABASE_URL
# Set the environment variable DATABASE_URL to the value of ARG DATABASE_URL
ENV DATABASE_URL=${DATABASE_URL}

# Argument for specifying database dialect, defaults to empty if not provided
ARG DB_DIALECT
# Set the environment variable DB_DIALECT to the value of ARG DB_DIALECT
ENV DB_DIALECT=${DB_DIALECT}

# Port configuration
# Inform Docker that the container listens on the specified network port at runtime.
EXPOSE 3001

# Application command
# Define the command to run your app using CMD which defines your runtime
# This is the command that will be executed when your Docker container starts.
CMD ["node", "index.js"]
