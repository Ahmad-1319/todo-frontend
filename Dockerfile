# Use the official Node.js image as the base image
FROM node:14

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json first to install dependencies
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Build the app (ensure `npm run build` works in your app)
RUN npm run build

# Expose the port the app runs on
EXPOSE 8000

# Command to run the app
CMD ["node", "index.js"]
