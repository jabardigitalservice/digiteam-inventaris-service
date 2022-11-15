<a href="https://codeclimate.com/github/jabardigitalservice/digiteam-inventaris-service/test_coverage"><img src="https://api.codeclimate.com/v1/badges/dfdc2d35b631492a851b/test_coverage" /></a>
<a href="https://codeclimate.com/github/jabardigitalservice/digiteam-inventaris-service/maintainability"><img src="https://api.codeclimate.com/v1/badges/dfdc2d35b631492a851b/maintainability" /></a>

[![GitHub issues](https://img.shields.io/github/issues/jabardigitalservice/digiteam-inventaris-service)](https://github.com/jabardigitalservice/digiteam-inventaris-service/issues)
[![GitHub forks](https://img.shields.io/github/forks/jabardigitalservice/digiteam-inventaris-service)](https://github.com/jabardigitalservice/digiteam-inventaris-service/network)
[![GitHub stars](https://img.shields.io/github/stars/jabardigitalservice/digiteam-inventaris-service)](https://github.com/jabardigitalservice/digiteam-inventaris-service/stargazers)
[![GitHub license](https://img.shields.io/github/license/jabardigitalservice/digiteam-inventaris-service)](https://github.com/jabardigitalservice/digiteam-inventaris-service/blob/development/LICENSE)

# Digiteam Inventaris Service

## Tech Stacks

- **TypeScript** - <https://www.typescriptlang.org/>
- **Node.js** - <https://nodejs.org/>
- **NestJS** - <https://nestjs.com/>
- **TypeORM** - <https://typeorm.io//>
- **MySQL** - <https://www.mysql.com/>

## Quick Start

Clone the project:

```bash
git clone https://github.com/jabardigitalservice/digiteam-inventaris-service
cd digiteam-inventaris-service
cp .env.example .env
```

## Installing Dependencies

```bash
# Install node packages
npm install
```

## Applying Migrations

Make sure there is already a MySQL database created and the credetials are filled in the `.env` file

```bash
# apply migrations to database for development
npm run migration:dev

# Or apply migrations  database for production
npm run migration:prod

# rollback migrations from database
npm run migration:revert
```

## How to Run Locally

```bash
npm run start:dev
```

## Repo Structure

```bash
.github/
└── workflows
docker
src/
├── common/
│   ├── exceptions
│   ├── helpers
│   ├── interceptors
│   ├── interfaces
│   ├── lang
│   ├── logger
│   └── pipes
├── config
├── database/
│   ├── migrations
│   ├── mysql
│   └── orm
├── entities
├── modules/
│   └── <module_name>/
│       ├── <module_name>.controller
│       ├── <module_name>.interface
│       ├── <module_name>.module
│       ├── <module_name>.respository
│       ├── <module_name>.rules
│       └── <module_name>.service  
├── sso/
│   └── keycloak
└── storage
```
