# Harshify - Running Guide

## Quick Start (Docker Compose)

### AWS Only
```bash
docker compose up -d
```

### Full Multi-Cloud (AWS + Azure + GCP)
```bash
docker compose --profile multicloud up -d
```

### Then Open
**http://localhost:4500**

---

## Services & Ports

| Service | Port | Description |
|---------|------|-------------|
| Harshify (Frontend) | 4500 | Web console |
| Harshify API | 4501 | Backend API |
| Harshify (AWS) | 4566 | AWS local runtime |
| Harshify-AZ (Azure) | 4577 | Azure local runtime |
| Harshify-GCP | 4588 | GCP local runtime |

---

## Useful Commands

### Check Status
```bash
docker compose --profile multicloud ps
```

### View Logs
```bash
# All services
docker compose --profile multicloud logs -f

# Specific service
docker compose --profile multicloud logs -f harshify-ui
docker compose --profile multicloud logs -f harshify-api
docker compose --profile multicloud logs -f harshify
docker compose --profile multicloud logs -f harshify-az
docker compose --profile multicloud logs -f harshify-gcp
```

### Stop Everything
```bash
docker compose --profile multicloud down
```

### Restart
```bash
docker compose --profile multicloud up -d
```

### Rebuild (after code changes)
```bash
docker compose --profile multicloud up -d --build
```

### Clean Reset (removes volumes)
```bash
docker compose --profile multicloud down -v
docker compose --profile multicloud up -d
```

---

## Health Checks

### API Cloud Status
```bash
# All clouds
curl http://localhost:4501/api/clouds

# Individual cloud status
curl http://localhost:4501/api/clouds/aws/status
curl http://localhost:4501/api/clouds/azure/status
curl http://localhost:4501/api/clouds/gcp/status
```

### Runtime Health
```bash
curl http://localhost:4566/_floci/health      # AWS
curl http://localhost:4577/_floci/health      # Azure
curl http://localhost:4588/_floci-gcp/health  # GCP
```

---

## Manual Local Development (Alternative)

### Prerequisites
- Node.js 20+
- pnpm 9+
- Bun
- Running Harshify core runtime (and optionally Harshify-AZ / Harshify-GCP)

### Setup
```bash
# Install dependencies
pnpm install

# Configure API environment
cp .env.example packages/api/.env

# Start Harshify AWS Core
docker run -d --name harshify \
  -p 4566:4566 \
  -v /var/run/docker.sock:/var/run/docker.sock \
  -e FLOCI_DEFAULT_REGION=us-east-1 \
  -u root \
  harshify/harshify:latest-compat

# Optional: Start Azure & GCP runtimes
# Harshify-AZ on http://localhost:4577
# Harshify-GCP on http://localhost:4588

# Start development servers
pnpm dev
```

### Split Commands
```bash
pnpm dev:api   # API only (port 4501)
pnpm dev:web   # Frontend only (port 4500)
```

### Verification
```bash
pnpm lint
pnpm type-check
pnpm test
pnpm build
```

---

## Environment Variables (packages/api/.env)

```env
HARSHIFY_ENDPOINT=http://localhost:4566
HARSHIFY_AZURE_ENDPOINT=http://localhost:4577
HARSHIFY_AZURE_ACCOUNT_NAME=devstoreaccount1
HARSHIFY_GCP_ENDPOINT=http://localhost:4588
HARSHIFY_GCP_PROJECT=harshify-local
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=test
AWS_SECRET_ACCESS_KEY=test
PORT=4501
VITE_MOCK_MODE=false
```

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Port 4500/4501/4566/4577/4588 in use | `lsof -i :<port>` then kill process |
| Containers not starting | Wait 1-2 min on first run (image pulls) |
| Docker daemon not running | Start Docker Desktop / `systemctl start docker` |
| Out of memory | Increase Docker Desktop memory to 8GB+ |
| `http proxy error` or `ECONNREFUSED` on `/api/*` | Check `pnpm dev:api` is running, verify `curl http://localhost:4501/api/clouds` |
| Runtime shows "Not connected" | Check runtime directly: `curl http://localhost:4566/_floci/health` |

---

## Project Structure

```
harshify/
├── packages/
│   ├── api/
│   │   ├── src/
│   │   │   ├── cloud-spi/        # Service contracts
│   │   │   ├── registry/         # Adapter registry
│   │   │   ├── adapter-aws/      # AWS adapter
│   │   │   ├── adapter-azure/    # Azure adapter
│   │   │   ├── adapter-gcp/      # GCP adapter
│   │   │   ├── routes/           # API routes
│   │   │   └── service/          # Business logic
│   │   └── Dockerfile.dev
│   └── frontend/
│       ├── src/
│       │   ├── api/              # API client
│       │   ├── components/       # React components
│       │   ├── features/         # Feature modules
│       │   └── pages/            # Page components
│       └── Dockerfile.dev
├── docker-compose.yml
├── Makefile
└── pnpm-workspace.yaml
```

---

## Makefile Shortcuts

```bash
make up           # AWS only
make up-multicloud # All three clouds
make down         # Stop everything
make logs         # Follow logs
make build        # Build images
```

---

## License

MIT — part of the Harshify ecosystem.