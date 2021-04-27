# PCI Frontend

This codebase serves as the frontend to our web application of the People Counting Infrastructure. The instructions for setup are below.

If you are seeking instructions to install this software in a production environment, skip down to the production setup.

## Development Setup

### Prerequisites for Windows, macOS, and Linux

Node.js is required to develop and test this application.

1. Download the latest version of Node from the official link below and install on your machine.

```

https://nodejs.org/en/download/

```

2. Next, fork and clone this project onto your machine.

```
Using HTTPS:

git clone https://github.com/PiWatcher/pci-prototype-frontend.git


Using SSH:

git clone git@github.com:PiWatcher/pci-prototype-frontend.git

```

3. Finally, the necessary packages must be installed for the application to function. The command below should be run in the terminal of the cloned source code folder and will install all packages listed in the package.json.

```

npm install

```

### Creating Development Docker Container

Without adjustment, the development docker container will use localhost to look for the accompanying backend.  This can be changed in the
docker-compose.yml under the argument REACT_APP_BASE_URL.

1. Begin by running the following bash command:

```

./start.sh

```

2. You will be asked for your choice of environment. Typing DEV and hitting enter will begin the creation of the development container. The container can be reached at localhost:3001.


### Testing the project

Tests are housed within the tests subfolder of the src folder.  Running the testing suite can be done in the terminal of the cloned source code folder by running this command:

```

npm test

```

## Production Setup

1. Fork and clone this project onto your machine:

```

Using HTTPS:

git clone https://github.com/PiWatcher/pci-prototype-frontend.git


Using SSH:

git clone git@github.com:PiWatcher/pci-prototype-frontend.git

```

### Creating Production Docker Container

Prior to creating the container, the creator will need to set the address of the accompanying backend.  This can be set in the
docker-compose.prod.yml under the argument REACT_APP_BASE_URL.  This address must be the external address of the machine that is hosting the backend.

1. Begin by running the following bash command:

```

./start.sh

```

1. You will be asked for your choice of environment. Typing PROD and hitting enter will begin the creation of the production container.  A production build of the react application will then be hosted by an NGINX service within.  The container can be reached at localhost:80.

## Docker Container Cleanup

1. If removing the built container is needed, the following command will delete it if it is not currently running.

NOTE: this command will remove all built containers that are currently not running

```

docker system prune --all

```

2. If removing the container's volume is needed, the following command will delete it if its parent container is not currently running.

NOTE: this command will remove all volumes that do not currently have a parent container running

```

docker volume prune

```
