# 1. Use the specific LTS version you requested
FROM node:24.13.0-alpine AS base

# 2. Add dependencies often needed for alpine-based builds (like sharp or canvas)
RUN apk add --no-cache libc6-compat
WORKDIR /app

# 3. Cache dependencies: only re-run npm install if package.json changes
COPY package.json package-lock.json* ./
RUN npm install

# 4. Copy the rest of the source code
COPY . .

# 5. Environment Variables
ENV NEXT_TELEMETRY_DISABLED=1
# Ensure the dev server binds to 0.0.0.0 so you can access it outside the container
ENV HOSTNAME="0.0.0.0" 
ENV PORT=3000

# 6. Expose the port for documentation
EXPOSE 3000

CMD ["npm", "run", "dev"]