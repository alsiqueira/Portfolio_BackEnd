import { Router, Request, Response } from 'express'

import { usersRouter } from  './users.routes'
import { sessionsRouter } from './sessions.routes'

const routes = Router()

routes.use('/users', usersRouter)
routes.use('/sessions', sessionsRouter)



export { routes }