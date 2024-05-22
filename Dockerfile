# Use an official Node runtime as a parent image
FROM node:14-alpine

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json (if available)
COPY package*.json ./

# Install any dependencies
RUN npm install

# Bundle the app source inside the Docker image
COPY . .

ARG DATABASE_URL
ENV DATABASE_URL=${DATABASE_URL}

ARG DB_DIALECT
ENV DB_DIALECT=${DB_DIALECT}

EXPOSE 3001

# Define the command to run your app using CMD which defines your runtime
CMD ["node", "index.js"]
