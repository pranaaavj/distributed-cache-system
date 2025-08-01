# services/product-service/Dockerfile (Alternative multi-stage build)
# Build stage
FROM node:18-alpine AS builder

# Install build dependencies
RUN apk add --no-cache \
    protobuf protobuf-dev \
    python3 make g++ \
    libc6-compat

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install all dependencies (including devDependencies)
RUN npm ci

# Copy proto files and source code
COPY protos ./protos
COPY src ./src
COPY tsconfig.json ./

# Generate protobuf code and build
RUN npm run generate-proto
RUN npm run build

# Production stage
FROM node:18-alpine AS production

# Install runtime dependencies only
RUN apk add --no-cache protobuf

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install only production dependencies
RUN npm ci --omit=dev && npm cache clean --force

# Copy built application from builder stage
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/protos ./protos

# Expose port
EXPOSE 50052

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD pgrep node || exit 1

# Start the application
CMD ["node", "dist/main.js"]