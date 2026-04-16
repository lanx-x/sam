# longwang

## Docker release

This repository publishes Docker images to Alibaba Cloud Container Registry when a Git tag like `v1.2.3` is pushed.

Published images:

- `crpi-i9di0h4v1o29h468.cn-shenzhen.personal.cr.aliyuncs.com/lanx_x/longwang-web`
- `crpi-i9di0h4v1o29h468.cn-shenzhen.personal.cr.aliyuncs.com/lanx_x/longwang-cms`

Before using the workflow, configure these GitHub Actions secrets:

- `ALIYUN_REGISTRY_USERNAME`
- `ALIYUN_REGISTRY_PASSWORD`
- `NEXT_PUBLIC_STRAPI_API_URL`
- `NEXT_PUBLIC_STRAPI_FORM_TOKEN`

Trigger a release with:

```bash
git tag v1.0.0
git push origin v1.0.0
```

Each release pushes:

- the Git tag as an image tag, for example `v1.0.0`
- a commit tag in the form `sha-<commit>`
- `latest` for non-prerelease tags

Run the published images with:

```bash
docker compose -f docker-compose.release.yml pull
docker compose -f docker-compose.release.yml up -d
```

Deploy a specific release with:

```bash
IMAGE_TAG=v1.0.0 docker compose -f docker-compose.release.yml up -d
```
