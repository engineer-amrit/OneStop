import { Router } from 'express'
import type express from "express";

// middlewares
import { getAccessLogger } from '@utils/api';
import { TokenVerifierMiddleware } from '../middleware/auth/tokenVerifier-middleware.js'
import { rateLimiter } from '@utils/api';
import { generalLogger } from '@/utils/logger.js';
import { cookieService, refreshTokenService, userService } from '@/classes/services/dependency-injection.js';
import { tokenService } from '@/classes/services/token-service.js';

// routers
import authRouter from './auth-router.js'
import clientRouter from './client-router.js'
import adminRouter from '@/routers/admin-routes/index.js'
import publicRouter from './public-router.js'
import { accessLogger as al } from '@/utils/logger.js';
import config from '@/config/config.js';
import { CsrfSetMiddleware } from '@/middleware/security/csrfSet-middleware.js';

const accessLogger = getAccessLogger(al)
const csrfSetMiddleware = new CsrfSetMiddleware(cookieService, tokenService, generalLogger)
const tokenVerifier = new TokenVerifierMiddleware(
  tokenService,
  refreshTokenService,
  userService,
  cookieService,
)

const router: express.Router = Router()

// Apply security middleware globally
router.use(csrfSetMiddleware.setCsrfToken);


// Public router: /v1/public
router.use("/v1/public", publicRouter)

// Auth router: /v1/auth
router.use("/v1/auth", accessLogger, rateLimiter(config), authRouter)

// Client router: /v1/client
router.use("/v1/client", accessLogger, tokenVerifier.verify, clientRouter)

// // Admin router: /v1/admin
router.use("/v1/admin", accessLogger, tokenVerifier.verify, adminRouter)

// health check route
router.get('/health', (_, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Server is running smoothly',
  })
})

export default router
