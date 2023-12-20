# Turbo-octo-parakeet

Green API task implemented using NestJS and its built-in logging. In this implementation `m1` takes an int query parameter and pass it to `m2` to calculate its double. Result is returned to the client.

## ⚠️ Disclaimer

This task is implemented as requested in task description. Generally, it is not recommended to wait for long-running job response on HTTP API, in real world scenario, i would return immediately to the client when job is created and provide a job ID which allow client to track job status using a different API endpoint.

## Requirements

- **Docker** to run RabbitMQ instance, `m1` service and `m2` service.
- **curl** to call `m1` service api

## Running services with Docker

Run all services together using the following command:

```console
docker compose up --no-deps --build --remove-orphans --force-recreate --attach m1 --attach m2
```

- `--attach` arguments provide `m1` and `m2` service logging to console.

## Calling `M1` service

- Call `m1` service using curl command:

```console
curl --location --request POST 'http://localhost:3001/?n=9'
```

### Logging

Logging from `m1` and `m2` services can be observed on the console when after receiving a job.

Example response:

```json
{
    "n": 9,
    "double": 81
}
```
