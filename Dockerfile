# Multi-stage build untuk optimasi ukuran image

# Stage 1: Build
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy source code
COPY . .

# Build aplikasi
RUN npm run build

# Stage 2: Production
FROM node:18-alpine AS runner

WORKDIR /app

# Set environment ke production
ENV NODE_ENV production

# Buat user non-root untuk keamanan
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy necessary files dari builder
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# Set ownership ke user nextjs
RUN chown -R nextjs:nodejs /app

# Switch ke user non-root
USER nextjs

# Expose port
EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000/api/health', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"

# Start aplikasi
CMD ["node", "server.js"]