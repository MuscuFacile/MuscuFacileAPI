# MuscuFacileAPI

## Contributing

### Using docker
If you are using a Windows OS, you need to install Docker for Windows and use Powershell

```bash
# Go to your project folder
cd /path/to/project/muscu-facile-api

# Build the docker's image using project's sources
docker build -t muscu-facile-api .

# Create docker's container from the image and mount project's folder on the container
# For Windows, you cannot use $(pwd), use ${PWD} instead
docker create --name muscu-facile-api
    -v $(pwd):/var/www/muscu-facile-api
    -p 8080:80
    muscu-facile-api

# Start the container
docker start muscu-facile-api

# Get server's logs
docker logs -f muscu-facile-api
```
Inspired by https://github.com/BretFisher/node-docker-good-defaults

### Manually

Requierement

Install nodemon globaly
```bash
npm install -g nodemon
```
