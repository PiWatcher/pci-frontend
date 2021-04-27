echo "Starting setup..."

echo "Is the environment DEV/PROD?"
read ENV

if [ $ENV = PROD ]
then
    echo "Setting up PROD environment..."
    
    # load prod environment
    sleep 1
    docker-compose -f docker-compose.prod.yml up -d --build
fi

if [ $ENV = DEV ]
then
    echo "Setting up DEV environment..."

    # load dev envrionment
    sleep 1
    docker-compose up -d --build
fi