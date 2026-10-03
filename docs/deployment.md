# Week 11 — Deployment Notes

## Current status

**LOCAL PREPARATION: COMPLETE**  
**PUBLIC DEPLOYMENT: PENDING**

The application has been tested locally and the local automated suite currently reports 46 passing tests and 150 assertions.

## Production configuration

Set these values on the hosting provider rather than committing secrets:

- APP_ENV=production
- APP_KEY=generated production key
- APP_DEBUG=false
- APP_URL=public application URL
- DB_CONNECTION=production driver
- DB_HOST=production host
- DB_PORT=production port
- DB_DATABASE=production database
- DB_USERNAME=production username
- DB_PASSWORD=production password

Do not commit actual production credentials.

## Deployment sequence

1. Provision the host.
2. Configure production environment variables.
3. Install Composer dependencies.
4. Deploy the repository.
5. Run production migrations.
6. Confirm the application is reachable.
7. Test login.
8. Test Product/Supplier/Category CRUD.
9. Submit invalid data and confirm the 422 message.
10. Record the public URL and deployment date.

## Smoke-test record

| Check | Result |
|---|---|
| Public URL | PENDING |
| Login | PENDING |
| Create | PENDING |
| View | PENDING |
| Edit | PENDING |
| Delete | PENDING |
| 422 invalid data | PENDING |
| Migrations | PENDING |

No live result is marked PASS until it has been observed at the public URL.
