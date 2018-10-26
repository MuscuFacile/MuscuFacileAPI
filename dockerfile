FROM node:10-alpine

# Create app directory
WORKDIR /var/www/muscu-facile-api

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install -g nodemon \
    && npm install \
    && npm cache clean --force \
    && mv ./node_modules ~/.node_modules
# If you are building your code for production
# RUN npm install --only=production

# Bundle app source
COPY . .

ENV PORT 80
EXPOSE 80

CMD [ "npm", "start" ]