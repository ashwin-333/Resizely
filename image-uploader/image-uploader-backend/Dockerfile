# Use Node.js as the base image
FROM node:14

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose port 3000 for the backend API
EXPOSE 3000

# Start the Express.js server
CMD ["node", "index.js"]
