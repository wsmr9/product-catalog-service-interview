# Node.js Backend Setup Guide

This guide will walk you through the setup and installation process for the Node.js backend project. Please follow the steps outlined below to ensure the application is configured and running correctly.

## Prerequisites

- Docker and Docker Compose should be installed on your machine.
- Node.js should be installed if you plan to run the server locally without Docker.

## Installation Steps

### Step 1: Clone the Repository

Clone the project repository and navigate into the directory:

```bash
    git clone [URL of the repository]
    cd [repository-name]
```

### Step 2: Set Up Environment Variables

Copy the `.env.example` file to create a `.env` file. This file will store all your environment-specific settings.

```bash
    cp .env.example .env
```

Open the `.env` file and make any necessary changes to fit your local development environment, but you can leave it as it is.

### Step 3: Create Required Directories


Create a directory within the root of the project to store MySQL data:

```bash
    mkdir mysql_data_product
```

### Step 4: Launch Docker Containers


Use Docker Compose to launch the services defined in your `docker-compose.yml`:

```bash
    docker-compose up -d
```

This command will start the following services:
- **MySQL Database**: Hosts the database for the application.
- **phpMyAdmin**: Provides a web interface for database management.
- **Product Catalog Service**: The backend service for managing product data.

### Step 5: Initialize the Database


Once the Docker containers are running, you need to initialize the database:

1. Access phpMyAdmin at `http://localhost:8080`.
2. Log in using the credentials:
   - **Username:** root
   - **Password:** admin123
3. Navigate to the "SQL" tab in phpMyAdmin.
4. Open the `init-db.sql` file located in the root directory of your project and copy its contents.
5. Paste the SQL commands into the SQL tab in phpMyAdmin and execute them to populate the `products` table.

Verifying the Installation
--------------------------

To verify that your backend is set up correctly, navigate to the following URL, which will access the Product Catalog Service and display the products:

```bash
    http://localhost:[PORT]/products
```

Replace `[PORT]` with the port number you configured in your `.env` file.

Troubleshooting
---------------

If you encounter any problems, check the following:
- Ensure that all environment variables in the `.env` file are set correctly.
- Check the Docker container logs for any error messages:

```bash
    docker logs [container-name]
```

If issues persist, consider restarting the Docker containers or reinitializing the database.

Additional Help
---------------

For additional help or to report issues, please create an issue in the project's GitHub repository or contact the project maintainers directly.
