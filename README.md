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
<<<<<<< HEAD
docker create --name muscu-facile-api
    -v $(pwd):/var/www/muscu-facile-api
    -p 8080:80
    muscu-facile-api
=======
docker create --name muscu-facile-api -v $(pwd):/var/www/muscu-facile-api -p 8080:80 muscu-facile-api
>>>>>>> 10da5f4a2dd3b38d9a1d2efbfb18bfee31be4853

# Start the container
docker start muscu-facile-api

# Get server's logs
docker logs -f muscu-facile-api
```
<<<<<<< HEAD

Inspired by https://github.com/BretFisher/node-docker-good-defaults

=======
>>>>>>> 10da5f4a2dd3b38d9a1d2efbfb18bfee31be4853
### Manually

Requierement

Install nodemon globaly
```bash
npm install -g nodemon
<<<<<<< HEAD
```
=======
```
>>>>>>> 10da5f4a2dd3b38d9a1d2efbfb18bfee31be4853
