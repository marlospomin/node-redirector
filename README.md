# Node Redirector

> A smart and disposable HTTPS C2 redirector built with Node.

Node Redirector is meant to be modified in order to serve its full potential.

By default all HTTPS traffic will be proxied to the desired destination, so not very **smart**, but still.

It is also possible to fully control the core aspects of the script using environment variables (see [documentation](#Documentation) below).

Rate limit, security headers and other spicy functionalities are implemented by default.

**Key aspects**:

* Simple, lightweight and documented.
* Resilient and yet disposable.
* Lightning fast.

## Usage

Host it anywhere that runs Node, then run the `index.mjs` file.

```bash
npm start
# or
node index.mjs
```

TLS/SSL is, or, should be handled by the provider, example: Heroku. Meaning, no self-signed certificates here, but feel free to add it yourself.

## Documentation

Below you are presented with the control/environment variables.

| variable | description | default |
|----------|-------------|---------|
`PROXY_DOMAIN` | The domain you want traffic to be proxied to. | `localhost:9000`
`PORT` | The port the app will listen locally. | `3000`
`NODE_ENV` | The environment specified | `undefined`
`RATE_LIMIT_MAX` | The max number of requests per 15m allowed. | `200`
`PROXY_WS` | Whether or not websockets should be proxied. | `true`

For more options and general implementation guide please check the [Express](https://expressjs.com/en/api.html) and [http-proxy-middleware](https://github.com/chimurai/http-proxy-middleware) documentation.

## Roadmap

* Add Docker support.
* Add Lambda/serverless support.
* Add examples.

## License

Code released under the [Apache 2.0](LICENSE) license.
