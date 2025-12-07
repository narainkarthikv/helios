# 🗺️ GLIS

> **Geospatial Land Information System - Your comprehensive solution for managing and visualizing geospatial data**

[![GitHub issues](https://img.shields.io/github/issues/narainkarthikv/GLIS?style=flat-square)](https://github.com/narainkarthikv/GLIS/issues)
[![GitHub forks](https://img.shields.io/github/forks/narainkarthikv/GLIS?style=flat-square)](https://github.com/narainkarthikv/GLIS/network)
[![GitHub stars](https://img.shields.io/github/stars/narainkarthikv/GLIS?style=flat-square)](https://github.com/narainkarthikv/GLIS/stargazers)
[![MIT License](https://img.shields.io/github/license/narainkarthikv/GLIS?style=flat-square)](./LICENSE)

---

## 🌟 Why GLIS?

GLIS is a MERN-stack application designed to help you **manage geospatial data**, **visualize agricultural information**, **analyze market trends**, and **assess land resources**. Whether you're an agricultural expert or data analyst, we welcome your contributions to make GLIS better for everyone.

✨ **Key Features:**

- Interactive map-based geospatial visualization
- Agricultural land and crop management
- Market data analysis and trends
- Environmental and flood risk assessment
- User authentication and data management
- Real-time data visualization with charts and heatmaps

---

## 🛠️ Tech Stack

| Area         | Stack / Tools                                |
| ------------ | -------------------------------------------- |
| **Frontend** | React + Vite, Tailwind CSS, Leaflet Maps     |
| **Backend**  | Node.js, Express.js, MongoDB                 |
| **Database** | MongoDB (Local or Atlas)                      |
| **CI/CD**    | Docker, Docker Compose, GitHub Actions        |

<p align="center">
  <img src="https://skillicons.dev/icons?i=react,vite,tailwindcss,nodejs,express,mongodb,docker" />
</p>

---

## 📑 Table of Contents

- [Quick Start with Docker](#quick-start-with-docker)
- [Local Installation](#local-installation)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [Project Structure](#project-structure)
- [Environment Variables](#environment-variables)
- [Available Scripts](#available-scripts)
- [Development Standards](#development-standards)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [Contributors](#contributors)
- [License](#license)

---

## 🐳 Quick Start with Docker

Get the entire development environment running in seconds using Docker and Docker Compose.

### Prerequisites

- [Docker](https://docs.docker.com/get-docker/) (v20.10+)
- [Docker Compose](https://docs.docker.com/compose/install/) (v2.0+)

### Steps

1. **Clone the repository:**

```bash
git clone https://github.com/narainkarthikv/GLIS.git
cd GLIS
```

2. **Configure environment variables:**

```bash
cp .env.example .env
```

Edit `.env` and update the following variables:

```bash
# Backend Configuration
NODE_ENV=development
BACKEND_PORT=5000
JWT_SECRET=your-secret-key-here
JWT_EXPIRATION=7d

# MongoDB Connection String (Choose one)
# Local MongoDB (default)
MONGODB_URI=mongodb://admin:password@mongodb:27017/glis?authSource=admin

# OR MongoDB Atlas
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/glis?retryWrites=true&w=majority

# Frontend Configuration
FRONTEND_PORT=5173
VITE_API_URL=http://localhost:5000/
```

3. **Start the application:**

```bash
# Build and start all services
docker-compose up -d --build

# View logs
docker-compose logs -f
```

4. **Access the application:**

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000
- **MongoDB**: localhost:27017 (if accessing locally)

### Useful Docker Commands

```bash
# View running containers
docker-compose ps

# View logs for all services
docker-compose logs -f

# View logs for specific service
docker-compose logs -f backend    # Backend logs
docker-compose logs -f frontend   # Frontend logs
docker-compose logs -f mongodb    # MongoDB logs

# Stop services
docker-compose stop

# Remove services and volumes
docker-compose down -v

# Rebuild images
docker-compose build --no-cache

# Stop and remove all containers, networks, and orphans
docker-compose down --remove-orphans

# Restart all services
docker-compose restart

# Execute commands in container
docker-compose exec backend npm install
docker-compose exec frontend npm install

# View service health
docker-compose ps
```

---

## 🚀 Local Installation

### Prerequisites

- Node.js (v18+)
- npm or yarn
- MongoDB (local or Atlas connection)

### 1️⃣ Backend Setup

1. **Navigate to backend directory**:

   ```bash
   cd backend
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Create .env file**:

   ```bash
   cat > .env << EOF
   NODE_ENV=development
   PORT=5000
   JWT_SECRET=your-secret-key-here
   JWT_EXPIRATION=7d
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/glis?retryWrites=true&w=majority
   EOF
   ```

Update the `.env` file with your MongoDB connection string:

```bash
# backend/.env
NODE_ENV=development
PORT=5000
JWT_SECRET=your-secret-key-here-change-in-production
JWT_EXPIRATION=7d
MONGODB_URI=mongodb+srv://your-username:your-password@cluster.mongodb.net/glis?retryWrites=true&w=majority
```

Start the server:

```bash
# Development mode with auto-reload
npm run dev

# Production mode
npm start
```

The backend server will be available at `http://localhost:5000`

### 2️⃣ Frontend Setup

1. **Navigate to frontend directory**:

   ```bash
   cd frontend
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Create .env file**:

   ```bash
   cat > .env << EOF
   VITE_API_URL=http://localhost:5000/
   EOF
   ```

Start the development server:

```bash
npm run dev
```

The frontend will be available at `http://localhost:5173`

---

## 🗂️ Project Structure

```plaintext
GLIS/
├── frontend/
│   ├── public/                 # Static assets
│   ├── src/
│   │   ├── assets/             # Images, animations, etc.
│   │   │   ├── animations/
│   │   │   └── images/
│   │   ├── components/         # Reusable React components
│   │   │   ├── Agri/           # Agricultural components
│   │   │   ├── Dashboard/      # Dashboard components
│   │   │   ├── Data/           # Data view components
│   │   │   ├── Map/            # Map components
│   │   │   ├── Market/         # Market components
│   │   │   └── common/         # Common components (Navbar, etc.)
│   │   ├── pages/              # Page components
│   │   │   ├── Login.jsx
│   │   │   └── SignUp.jsx
│   │   ├── App.jsx             # Main App component
│   │   ├── main.jsx            # React entry point
│   │   ├── App.css
│   │   └── index.css
│   ├── index.html              # HTML template
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── postcss.config.js
│
├── backend/
│   ├── Model/                  # MongoDB models
│   │   ├── agri.js             # Agricultural model
│   │   ├── market.js           # Market model
│   │   ├── user.js             # User model
│   │   └── info.js             # Info model
│   ├── Routes/                 # Express routes
│   │   ├── enviRoutes.js       # Environment routes
│   │   ├── floodriskRoutes.js  # Flood risk routes
│   │   ├── Inforoutes.js       # Info routes
│   │   ├── landRoute.js        # Land routes
│   │   ├── marketRoutes.js     # Market routes
│   │   ├── toprevRoutes.js     # Top review routes
│   │   └── usercreateroute.js  # User creation routes
│   ├── server.js               # Express server entry point
│   ├── package.json
│   └── route.rest              # REST API test file
│
├── .env.example                # Environment variables template
├── docker-compose.yml          # Docker Compose configuration
├── Dockerfile.backend          # Backend Docker image
├── Dockerfile.frontend         # Frontend Docker image
├── README.md                   # This file
├── LICENSE                     # MIT License
└── Contributors.md             # List of contributors
```

---

## 🔑 Environment Variables

### Backend Environment Variables

| Variable        | Default Value                          | Description                                |
| --------------- | -------------------------------------- | ------------------------------------------ |
| `NODE_ENV`      | `development`                          | Node.js environment                        |
| `PORT`          | `5000`                                 | Backend server port                        |
| `JWT_SECRET`    | `your-secret-key-here`                 | Secret key for JWT tokens                  |
| `JWT_EXPIRATION`| `7d`                                   | JWT token expiration time                  |
| `MONGODB_URI`   | `mongodb://admin:password@mongodb:27017/glis?authSource=admin` | MongoDB connection string |

### Frontend Environment Variables

| Variable         | Default Value              | Description                       |
| ---------------- | -------------------------- | --------------------------------- |
| `VITE_API_URL`   | `http://localhost:5000/`   | Backend API URL                   |

---

## 📜 Available Scripts

### Backend Scripts

```bash
cd backend

# Development mode with hot reload (nodemon)
npm run dev

# Production mode
npm start

# Run tests (to be implemented)
npm test
```

### Frontend Scripts

```bash
cd frontend

# Development server with hot reload
npm run dev

# Build for production
npm run build

# Preview production build
npm start

# Run tests (to be implemented)
npm test

# Fix linting issues
npm run lint -- --fix
```

---

## 📝 Development Standards

### Code Style

- **Formatting & Linting:**
  - ESLint + Prettier for all code
  - 2-space indentation
  - Max line length: 100 characters
  - Use semicolons

- **Frontend:**
  - Follow React Hooks best practices
  - Functional components only
  - Props validation where applicable
  - Keep components modular and reusable

- **Backend:**
  - RESTful API design principles
  - Proper error handling and validation
  - Use async/await instead of callbacks
  - Add JSDoc comments for endpoints
  - Consistent naming conventions

- **Documentation:**
  - JSDoc for functions and components
  - Comments for complex logic
  - Keep README updated
  - Document API endpoints

### Git Workflow

- **Branch Naming:**
  - Features: `feature/description`
  - Bugs: `fix/description`
  - Docs: `docs/description`
  - Chores: `chore/description`

- **Commits:**
  - Follow [Conventional Commits](https://www.conventionalcommits.org/)
  - Examples:
    - `feat: add flood risk visualization`
    - `fix: resolve login authentication error`
    - `docs: update API documentation`
    - `refactor: optimize database queries`

- **Pull Requests:**
  - Keep PRs focused and small
  - Link related issues
  - Provide clear description
  - Request reviews from maintainers
  - Ensure CI/CD checks pass

### Testing (To be implemented)

- **Coverage:** Aim for ≥ 80% test coverage
- **Unit Tests:** Test individual functions/components
- **Integration Tests:** Test component interactions
- **E2E Tests:** Test critical user flows
- **Tools:**
  - Frontend: Vitest + React Testing Library
  - Backend: Jest

### Code Review Checklist

- [ ] Code follows project style guidelines
- [ ] Changes are well-documented
- [ ] Tests added/updated (once testing is implemented)
- [ ] No console logs in production code
- [ ] No breaking changes (or documented)
- [ ] Performance impact assessed
- [ ] README updated if needed

---

## 🐛 Troubleshooting

### Docker Issues

**Hot reload not working:**

```bash
# Rebuild without cache
docker-compose up -d --build

# Check file permissions
ls -la backend/
ls -la frontend/
```

**Container won't start:**

```bash
# Check container logs
docker-compose logs backend
docker-compose logs frontend

# Rebuild everything
docker-compose down -v
docker-compose up -d --build
```

### Local Development Issues

**Port conflicts:**

```bash
# Check what's using the port
lsof -i :5000   # Backend
lsof -i :5173   # Frontend
lsof -i :27017  # MongoDB

# Kill process on specific port
kill -9 <PID>
```

**Dependencies issues:**

```bash
# Clear npm cache and reinstall
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

**Build errors:**

```bash
# Check Node.js version (should be 18+)
node --version

# Clear build cache
rm -rf dist
npm run build
```

**MongoDB connection issues:**

```bash
# Test local MongoDB connection
mongosh mongodb://admin:password@localhost:27017/glis

# For MongoDB Atlas, ensure:
# 1. Connection string is correct
# 2. IP address is whitelisted
# 3. Network access is enabled
```

---

## 🤝 Contributing

We ❤️ contributions! Here's how to get started:

1. **Fork the repo** (click the Fork button at the top right).

2. **Clone your fork:**

   ```bash
   git clone https://github.com/your-username/GLIS.git
   cd GLIS
   ```

3. **Create a new branch:**

   ```bash
   git switch -c feature/your-feature-name
   ```

4. **Make changes** in your editor of choice.

5. **Stage & Commit:**

   ```bash
   git add .
   git commit -m "feat: add new geospatial feature"
   ```

6. **Push your branch:**

   ```bash
   git push origin feature/your-feature-name
   ```

7. **Open a Pull Request** from your fork to the `develop` branch of the main repo.

📌 _Tip: Keep your PRs small and focused to get faster reviews._

### Development Workflow

```bash
# 1. Clone and setup
git clone https://github.com/narainkarthikv/GLIS.git
cd GLIS

# 2. Create feature branch
git switch -c feature/amazing-feature

# 3. Install dependencies
docker-compose up -d

# 4. Make your changes
# Edit files in backend/ and/or frontend/

# 5. Test your changes locally
docker-compose logs -f

# 6. Commit with conventional commit message
git add .
git commit -m "feat: add amazing feature"

# 7. Push and create PR
git push origin feature/amazing-feature
```

---

## 👥 Contributors

Thanks to everyone who has helped make GLIS awesome! 🙏

<a href="https://github.com/narainkarthikv/GLIS/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=narainkarthikv/GLIS" />
</a>

See the [Contributors Page](https://github.com/narainkarthikv/GLIS/blob/main/Contributors.md) for the full list.

### How to Add Yourself

When your PR is merged, add yourself to the `Contributors.md` file following the format in that file.

---

## 📜 License

This project is licensed under the **MIT License**.

See the [LICENSE](https://github.com/narainkarthikv/GLIS/blob/main/LICENSE) file for full details.

**Summary:** You are free to use, modify, and distribute this software for any purpose, including commercial use.

---

## 📚 Additional Resources

- [Contributing Guide](CONTRIBUTING.md) - Coming soon
- [API Documentation](backend/README.md) - Coming soon
- [Frontend Setup Guide](frontend/README.md) - Coming soon

---

## 🔗 Links

- **Repository**: [GitHub GLIS](https://github.com/narainkarthikv/GLIS)
- **Issues**: [GitHub Issues](https://github.com/narainkarthikv/GLIS/issues)
- **Discussions**: [GitHub Discussions](https://github.com/narainkarthikv/GLIS/discussions)

---

## 🙏 Support

If you find GLIS helpful:

- ⭐ Give us a star on GitHub
- 🐛 Report bugs and suggest features through [Issues](https://github.com/narainkarthikv/GLIS/issues)
- 💬 Join discussions and help other contributors
- 📢 Share GLIS with your network

---

## 💡 Final Thoughts

We're building **GLIS** as a comprehensive geospatial solution. Your code, ideas, and feedback make it stronger every day.

Whether you're fixing a typo, improving performance, or building new features — **every contribution matters!** 🗺️💚

Let's build the best geospatial platform together! 🚀

---

<div align="center">

**Made with ❤️ by the GLIS Community**

</div>
7. Commit the changes with a descriptive message:
   ```sh
   git commit -m "Description of your changes"
   ```

### Pushing Changes

8. Push the changes to your forked repository:
   ```sh
   git push origin your-branch-name
   ```

### Creating a Pull Request

9. Create a pull request from your forked repository to the main repository. Go to the "Pull Requests" tab on the main repository, and click "New Pull Request". Follow the instructions to create your pull request.

## Contributors

We appreciate the contributions of the following individuals: [Contributors](https://github.com/narainkarthikv/GLIS/blob/main/Contributors.md)

This is just the beginning! We look forward to making more meaningful contributions and collaborating with this amazing community. Let's build something great together and make GLIS the best it can be! ❤️🤝

## License

This project is licensed under the MIT License - see the [LICENSE](https://github.com/narainkarthikv/GLIS/blob/main/LICENSE) file for details.
