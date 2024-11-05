# Use Node.js to build the Vue.js app
FROM node:14 AS build-stage

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the Vue.js application
RUN npm run build

# Use an nginx image to serve the static files
FROM nginx:alpine AS production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html

# Expose port 80 to serve the frontend
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
