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

ARG NODE_ENV=production
ENV NODE_ENV ${NODE_ENV}

ARG PORT=3000
ENV PORT ${PORT}
EXPOSE ${PORT}

CMD [ "npm", "start" ]