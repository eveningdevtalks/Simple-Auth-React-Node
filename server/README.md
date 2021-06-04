# Super Hero Zone API :zap:

This API is developed using NodeJS and MongoDB

## Development :hammer:

### Local :computer:

- Install NodeJS 12+ and MongoDB locally
- Install yarn
- Run `yarn`
- Copy `.env.example` to `.env` and adjust parameters
- Start development server by running `npm run dev`

### Docker :whale:

- Install Docker
- Copy `.env.example` to `.env` and adjust parameters
- Run `docker-compose up` to start development environment


## Environment Variables :alembic:

| Variable         | Default | Description               |
|------------------|---------|---------------------------|
| SECRET           | none    | Used to encode/decode JWT |
| MONGO_URI        | none    | MongoDB uri               |
| PORT             | 4041    | Port to run the API       |
| TOKEN_EXPIRES_IN | 15s     | Token expiry time         |

## Running in production :rocket:

- Install Node 12+ and MongoDB
- Run `yarn`
- Run `yarn start`
