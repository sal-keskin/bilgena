# Use Node.js 20 Alpine for a small image size
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files first to leverage cache
COPY package.json package-lock.json ./

# Install dependencies
# Using npm ci for reliable builds
RUN npm ci

# Copy the rest of the application code
COPY . .

# Generate Prisma Client
# This is necessary because 'npm ci' doesn't run postinstall hooks if not configured,
# and we want to ensure the client is generated before build.
RUN npx prisma generate

# Build the Next.js application
# This runs `prisma generate && prisma db push && next build` as defined in package.json
# Note: The 'prisma db push' here creates a temporary DB inside the image which allows static generation to succeed.
# At runtime, we might mount a volume which hides this DB, so we re-run push in CMD.
RUN npm run build

# Expose the application port
EXPOSE 3000

# Start command
# We run 'prisma db push' to ensure the runtime database (which might be a volume) matches the schema.
# Then we start the application.
CMD ["sh", "-c", "npx prisma db push && npm start"]
