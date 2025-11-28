# Agent Guidelines

## Adding New Services
1. Add service to docker-compose.yml following existing patterns
2. Use specific image versions (no `latest`)
3. Include restart policy: `unless-stopped`
4. Connect to `app-network` bridge network
5. Create persistent volume for data services
6. Map ports consistently (host:container)

## Documentation
- Create `{service}.md` file with minimal connection info only
- Include: host, port, username/password (if applicable)
- Keep documentation super minimal - just essential connection details
- No extra explanations, tutorials, or unnecessary info

## Code Style
- YAML 2-space indentation
- Service names: lowercase, hyphenated
- Container names: lowercase, underscored
- Environment variables: UPPER_SNAKE_CASE