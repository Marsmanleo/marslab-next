FROM node:20-alpine

# 设置工作目录
WORKDIR /app

# 复制package.json和package-lock.json
COPY package*.json ./

# 安装依赖
RUN npm install

# 复制整个项目
COPY . .

# 为了解决Prisma在Docker中的问题
RUN mkdir -p node_modules/.prisma/client
RUN npx prisma generate

# 确保.next目录存在并且构建成功
RUN npm run build

# 暴露端口
EXPOSE 3000

# 使用开发模式启动，更便于调试
CMD ["npm", "run", "dev"] 