# PCI-Prototype-Frontend

The prototype frontend build in React for PiWatcher, a people counting infrastructure.

## Setup

### For Windows, macOS, and Linux

Download the Node.JS installer for your platform and install

```

https://nodejs.org/en/download/

```

Fork and clone this project through HTTPS:

```

git clone https://github.com/PiWatcher/pci-prototype-frontend.git

```

Install necessary packages

```

npm install


```

### Start Live Server for Development

```

npm start

```

## Docker Container

### Docker-Compose (Develop)

```

docker-compose up -d --build

```

### Docker-Compose (Production)

```

docker-compose -f docker-compose.prod.yml up -d --build

```

## Pull latest build from Docker Hub

'''

docker run -it -d --name pci-frontend -p 4000:80 piwatcher/pci-frontend:latest

'''
