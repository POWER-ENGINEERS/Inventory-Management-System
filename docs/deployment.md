# Week 11 — Deployment Notes

## Current deployment status

**Application deployed to Railway:** YES  
**Production migrations:** COMPLETED  
**Production seed:** COMPLETED  
**Production login/dashboard:** VERIFIED during the deployment session  
**Live CRUD smoke test:** REQUIRES DIRECT BROWSER EXECUTION  
**Live 422 failure-path test:** REQUIRES DIRECT BROWSER EXECUTION

### Public URL

`https://inventory-management-system-production-7080.up.railway.app`

The public URL above is the Railway deployment URL recorded for the project. The deployment session successfully reached the application and confirmed login/dashboard access.

## Production configuration

Production secrets must remain in Railway environment variables and must not be committed to Git.

Required configuration includes:

- `APP_ENV=production`
- `APP_DEBUG=false`
- `APP_KEY=<production key>`
- `APP_URL=<public URL>`
- `DB_CONNECTION=mysql`
- `DB_HOST=<Railway MySQL host>`
- `DB_PORT=<Railway MySQL port>`
- `DB_DATABASE=<Railway MySQL database>`
- `DB_USERNAME=<Railway MySQL username>`
- `DB_PASSWORD=<Railway MySQL password>`
- `SUPER_ADMIN_PASSWORD=<production admin password>`

No actual credentials are documented in this file.

## Deployment sequence completed

1. Provisioned the Railway application and MySQL service.
2. Configured production environment variables.
3. Deployed the repository.
4. Ran Laravel production migrations with `php artisan migrate --force`.
5. Confirmed the database was up to date.
6. Ran the production database seeder with `php artisan db:seed --force`.
7. Confirmed the application login/dashboard during the deployment session.

## Live smoke-test record

| Check | Result | Evidence/status |
|---|---|---|
| Public URL | PASS | Railway URL recorded above |
| Login | PASS | Successful login observed during deployment session |
| Dashboard | PASS | Dashboard opened after login |
| Create | PENDING | Must be observed at public URL |
| View | PENDING | Must be observed at public URL |
| Edit | PENDING | Must be observed at public URL |
| Delete | PENDING | Must be observed at public URL |
| 422 invalid data | PENDING | Must be observed at public URL |
| Migrations | PASS | `migrate --force` completed with no pending migrations |
| Database seed | PASS | `db:seed --force` completed |

## Week 11 release rule

Do not mark the remaining CRUD or 422 checks as PASS from source-code inspection alone. They require direct browser observation on the deployed application.

## Security note

Do not commit `.env`, production passwords, database credentials, or production API keys. Use Railway environment variables for all production secrets.
