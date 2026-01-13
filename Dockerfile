# Use Node.js 20 Alpine
FROM node:20-alpine

# --- CRITICAL FIX: Install OpenSSL for Prisma ---
RUN apk add --no-cache openssl

# Set working directory
WORKDIR /app

# 1. Copy package files
COPY package.json package-lock.json ./

# 2. Copy the Prisma folder
COPY prisma ./prisma

# 3. Install dependencies
RUN npm ci

# 4. Copy the rest of the application code
COPY . .

# Set DB URL for build
ENV DATABASE_URL="file:./dev.db"

# 5. Generate Prisma Client
RUN npx prisma generate

# 6. Build the application
RUN npm run build

# Expose port
EXPOSE 3000

# Start command
CMD ["sh", "-c", "npx prisma db push && npm start"]
