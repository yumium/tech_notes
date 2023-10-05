# Docker



What is a container?

- Container is an example of PaaS

- A standard unit of software that packages up code + dependencies. This software is packaged into a Docker container image
- When the image is executed at runtime, it becomes containers (or Docker containers when run on the Docker engine). Docker containers are:
  - Standard: Docker industry standard for containers, so they are portable everywhere
  - Lightweight: Containers share OS kernel so no need for multiple OS as in VMs
  - Secure: Safe containers via isolation

- In short, containers give a uniform environment for apps to run. This gives a uniform application experience and accelerates the development cycle





Containers vs VMs in practice:

Container stack:

- Infrastructure
- Host OS
- Docker
- Apps A - Z

VM stack:

- Infrastructure
- Hypervisor
- VMs (App & Guest OS)





Components in Docker:

- Software
  - Docker daemon `dockerd` -> persistent software that manages Docker containers
  - Docker client `docker` for CLI interaction with Docker daemons
- Objects
  - Docker container
  - Docker image - read-only template for building containers
  - Docker service - allow containers to scale across daemons



Tools for Docker:

- Docker compose - define and run multi-container Docker applications
- Docker swarm - native clustering functionality for Docker containers
- Docker volume - persistence of data, allow data to remain after containers are deleted





https://docs.docker.com/get-started/

Containerise an application:

```dockerfile
# syntax=docker/dockerfile:1
FROM node:18-alpine
WORKDIR /app
COPY . .
RUN yarn install --production
CMD ["node", "src/index.js"]  # This is the entrypoint of the application
EXPOSE 3000
```

`Dockerfile` ^^



Running a docker

`docker build`

`docker run`

`docker ps` (get <container-id> of containers)

`docker stop`

`docker rm`



Sharing images

`docker push`

`docker pull`

`docker tag`



Persist DB

`docker volume`



And more ...
