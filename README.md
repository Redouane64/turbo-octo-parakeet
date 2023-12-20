# Turbo-octo-parakeet

Green API task implemented using NestJS and its built-in logging. In this implementation `m1` takes an int query parameter and pass it to `m2` to calculate its double. Result is returned to the client.

Service is hosted at: https://parakeet-m1.onrender.com

Example Usage:

```console
curl --location --request POST 'https://parakeet-m1.onrender.com?n=450'
```

response:
```json
{"n":450,"double":202500}
```

## ⚠️ Disclaimer

This task is implemented as requested in task description. Generally, it is not recommended to wait for long-running job response on HTTP API. In a real world scenario backend should return immediately to the client when job is created and provide a job ID which allow client to track job status using a different API endpoint.

## Additional considerations

- Use rate limiter.
- Use idempotent key to avoid duplicate jobs processing if it make sense for the business requirement that is being solved.

## Requirements

- **Docker** to run RabbitMQ instance, `m1` service and `m2` service.
- **curl** to call `m1` service api

## Running services locally with Docker

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
