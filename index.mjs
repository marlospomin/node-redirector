// required imports
import express from 'express'
import rateLimit from 'express-rate-limit'
import helmet from 'helmet'
import { createProxyMiddleware } from 'http-proxy-middleware'

// create server instance
const app = express()

// control variables
const endpoint = process.env.PROXY_DOMAIN || 'localhost:9000'
const port = process.env.PORT || 3000
const isProd = (process.env.NODE_ENV === 'production') ? true : false

// security headers ;)
if (isProd) {
  app.use(helmet())                               // use everything in prod
} else {                                          // else just basic
  app.use(helmet.crossOriginEmbedderPolicy())
  app.use(helmet.crossOriginOpenerPolicy())
  app.use(helmet.crossOriginResourcePolicy())
  app.use(helmet.dnsPrefetchControl())
  app.use(helmet.expectCt())
  app.use(helmet.frameguard())
  app.use(helmet.hidePoweredBy())
  app.use(helmet.ieNoOpen())
  app.use(helmet.noSniff())
  app.use(helmet.originAgentCluster())
  app.use(helmet.permittedCrossDomainPolicies())
  app.use(helmet.referrerPolicy())
  app.use(helmet.xssFilter())
}

// rate limit, cos we don't want them to fuzz!
// make sure to tweak the values, you don't want to block user access completely
app.use(rateLimit({
  windowMs: 15 * 60 * 1000,
	max: process.env.RATE_LIMIT_MAX || 200
}))

// create route and proxy options
// by default everything gets proxied
app.use('/', createProxyMiddleware({
  target: `https://${endpoint}`,          // proxy to target
  ws: process.env.PROXY_WS || true,       // proxy websocks
  headers: { host: endpoint },            // set host header (required)
  secure: isProd,                         // disable ssl in development
  cookieDomainRewrite: '*',               // replace cookies to prevent leakage
  proxyTimeout: 10 * 60 * 1000,           // really long proxy timeout
  onError: (err, req, res, target) => {   // add custom proxy error function
    res.writeHead(500, { 'Content-Type': 'text/plain' })
    res.end('Something went wrong!')
  }
}))

// listen on defined port
app.listen(port)
