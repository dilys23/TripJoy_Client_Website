# Stage 1: Build the React app
FROM node:20 AS build

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json và package-lock.json để cài đặt dependencies
COPY package*.json ./

# Update npm và cài đặt dependencies với npm ci
RUN npm install -g npm@latest
RUN npm ci

# Copy toàn bộ mã nguồn vào container
COPY . .

# Build ứng dụng React
RUN npm run build

# Stage 2: Sử dụng NGINX để phục vụ ứng dụng
FROM nginx:alpine

# Copy thư mục build từ giai đoạn build vào thư mục HTML của NGINX
COPY --from=build /app/build /usr/share/nginx/html

# Mở cổng 80 cho ứng dụng
EXPOSE 80

# Chạy server NGINX
CMD ["nginx", "-g", "daemon off;"]
