# pic-idsn-backend

## Usage

- **Prerequisites:** Create a `.env` file in this folder with database and Strapi secrets. The compose mounts local folders (`./config`, `./src`, `./public/uploads`) into the container so your code changes reflect in the app.

- **Start the stack (production compose):**

```bash
docker compose -f docker-compose.production.yml up -d
```

- **Force image rebuild when Docker cache is stale or dependencies changed:**

```bash
docker compose -f docker-compose.production.yml up --build -d
```

- **Rebuild Strapi admin after code/config changes (fast path):**

```bash
docker compose -f docker-compose.production.yml exec strapi npm run build
docker compose -f docker-compose.production.yml restart strapi
```

- **What happens on start:** The `strapi` service runs `npm run build && npm run start`, ensuring admin assets are rebuilt on container start. This is defined in the compose file.

- **View services:**

```bash
docker compose -f docker-compose.production.yml ps
```

- **Stop and remove containers:**

```bash
docker compose -f docker-compose.production.yml down
```

- **Logs:**

```bash
docker compose -f docker-compose.production.yml logs -f strapi
docker compose -f docker-compose.production.yml logs -f nginx
```

### Development tip

- For live development, consider a dev compose that runs `strapi develop` with `NODE_ENV=development`. If you want, we can add `docker-compose.dev.yml` with hot reload.

