# TaskManager
Hello everyone this is my project which is a task Manager application


## How would I deploy after testing:
After testing the application locally, the deployment process would follow these steps:

### Containerization
- Backend would be containerized using Docker
- A Dockerfile would define Node environment, dependencies, and startup command
- Environment variables would be managed using .env (excluded via .gitignore)

### Cloud Hosting
-Launch an AWS EC2 instance
-Install Docker on the server
- Pull project repository or Docker image
- Run container with proper port mapping

### Reverse Proxy Setup
-Configure Nginx to:
- Route HTTP traffic to backend container
-Enable HTTPS (via SSL)
- Improve security and performance

### Database Deployment

Deploy MongoDB in a separate container

### CI/CD Pipeline

- Configure GitHub Actions:
- On push → run tests
- Build Docker image
- Deploy to EC2 automatically

### Monitoring & Scaling
- Use PM2 or container restart policies for uptime
- Monitor CPU & memory usage
- Scale horizontally by running multiple backend containers
