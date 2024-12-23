# Stage 1: Build the React app
FROM node:20 AS build

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json to install dependencies
COPY package*.json ./

# Update npm and install dependencies with --legacy-peer-deps
RUN npm install -g npm@latest
RUN npm install --legacy-peer-deps

# Copy the entire source code into the container
COPY . .

# Build the React application and check if build folder exists
RUN npm run build && ls -la /app/dist  # Kiểm tra nội dung thư mục dist

# Stage 2: Use NGINX to serve the application
FROM nginx:alpine

# Copy the build folder from the build stage into NGINX's HTML folder
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80 for the application
EXPOSE 80

# Run the NGINX server
CMD ["nginx", "-g", "daemon off;"]
