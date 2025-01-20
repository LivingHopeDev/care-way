# Care-way API

Access to affordable healthcare is a pressing challenge, especially in low-income and underserved communities. Patients face difficulties in finding nearby healthcare providers, understanding the cost of services, and scheduling appointments efficiently. These barriers result in delayed care, poorer health outcomes, and financial strain.

This project aims to tackle these issues with a web-based solution that prioritizes accessibility, transparency, and ease of use.

## Table of Contents

- [Live url](#url)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Project Setup](#project-setup)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Running the Application](#running-the-application)
  - [Database Migrations](#database-migrations)
- [API Documentation](#api-documentation)
- [Acknowledgement](#Acknowledgement)
- [Contributing](#contributing)
- [License](#license)

## Live url

`https://care-way.onrender.com/api`

## Features

### Search Nearby Healthcare Providers

- Search by location and specialization.
- Filter providers based on proximity and expertise.

### Transparent Fee Information

- Upfront display of consultation fees.
- Details of accepted insurance plans.

### Appointment Scheduling System

- User-friendly booking interface.
- Appointment reminders to reduce missed visits.

### Provider Feedback and Ratings

- Enable users to provide feedback on their experiences.
- Ratings system to promote accountability and improve care quality.

## Technology Stack

- **Backend:** Node.js with Express.js, Redis for background job
- **Database:** PostgreSQL with Prisma
- **Hosting:** Render

## Project Setup

### Prerequisites

Before setting up the project, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or later)
- [Yarn](https://yarnpkg.com/) (v1.x)
- [PostgreSQL](https://www.postgresql.org/) (Ensure the database is running and accessible)
- Ensure redis is running on your system or server.

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/LivingHopeDev/care-way.git
   cd care-way
   ```

2. **Install dependencies:**

   ```bash
   yarn install
   ```

### Environment Variables

Create a `.env` file in the root of the project and configure the following environment variables:
Check `.env.example ` file

```env
PORT=yourPortNumber
NODE_ENV=development
AUTH_SECRET=yourSecretKey
AUTH_EXPIRY=7d
DATABASE_URL=postgresql://postgres:yourDbPassword@yourhost:yourDbport/dbName


```

### Running the Application

#### Start the development server

```
yarn run start:dev

```

#### Access the application

The server will start on the specified PORT in your .env file. If PORT is set to 8000, the application will be available at <http://localhost:8070>.

#### Database Migrations

```
yarn prisma migrate dev
```

### API Documentation

Visit the url below to view the documentation
live url
`https://care-way.onrender.com/api/docs/`

`localhost:8070/api/docs`

### Contributing

Contributions are welcome!

### License

This project is licensed under the MIT License - see the LICENSE file for details.

### Key Points

- The `README.md` provides a comprehensive guide on setting up the project locally, including installation instructions, environment variable configuration, and starting the server.
- Since the API documentation is not yet available, it includes a placeholder indicating that it will be provided later.
- The setup instructions are tailored specifically for a Node.js and PostgreSQL environment using Yarn.

This `README.md` file should serve as a solid foundation for your project documentation. Let me know if you need any changes or additional information!
