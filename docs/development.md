# Development

## Testing

### Populate the test database
```console
$ TYPEORM_DATABASE=<INSERT TEST DATABASE NAME> \
  TYPEORM_MIGRATIONS=test/populate/*.ts \
  npm run typeorm -- migration:run
```

### Unit testing
```console
$ TYPEORM_DATABAS=<INSERT TEST DATABASE NAME> \
  npm run test
```

### End-to-end testing
```console
$ TYPEORM_DATABAS=<INSERT TEST DATABASE NAME> \
  npm run test:e2e
```

## TypeORM

### Configuration
As TypeORM can't access the `TypeOrmConfigService` instance, you will have to add a `.env` file containing the database configuration else it won't be able to connect to the database. See the [Database configuration](configuration.md#database) section for more information. In addition you will need to append the following variables.
```
# TypeORM CLI
TYPEORM_CONNECTION=mysql
TYPEORM_ENTITIES=src/**/*.entity.ts
TYPEORM_MIGRATIONS=src/migration/*.ts
TYPEORM_MIGRATIONS_DIR=src/migration
```

### Using CLI
```console
$ npm run typeorm -- <INSERT CLI COMMAND>
```

### Generating migrations
```console
$ npm run typeorm -- migration:generate -n <INSERT NAME>
```

### Creating populate 
```console
$ TYPEORM_MIGRATIONS_DIR=test/populate \
  npm run typeorm -- migration:create -n <INSERT NAME>
```

## Docker

### Build and start the 'production' environment
```console
$ docker-compose.exe \
    -f docker-compose.yml \
    up --build
```

### Build and start the 'development' environment
```console
$ docker-compose.exe \
    -f docker-compose.yml \
    -f docker-compose.dev.yml \
    up --build
```

### Only start the database
```console
$ docker-compose.exe \
    -f docker-compose.dev.yml \
    up --build database
```
