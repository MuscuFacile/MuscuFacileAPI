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
# For Windows, you cannot use $(pwd), you need to replace by the absolute path to your project
docker create --name muscu-facile-api -v $(pwd)/src:/var/www/graph-commune/src -p 8080:8080 muscu-facile-api

# Start the container
docker start muscu-facile-api
```