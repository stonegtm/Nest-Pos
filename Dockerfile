# Base image
FROM node:16.5

# Create app directory
WORKDIR /app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

# Install app dependencies
RUN npm install --force

# Bundle app source
COPY . .

# Creates a "dist" folder with the production build
RUN npm run build

# Expose a port (if your application listens on a specific port)
EXPOSE 5000

# Start the server using the production build
CMD [ "node", "dist/main.js" ]

