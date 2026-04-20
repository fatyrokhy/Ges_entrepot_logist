import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './config/swagger.js';
import  { corsMiddleware, corsPreFlight } from './config/cors.js';
import zoneRoutes from './routes/zone.routes.js';
import articleRoutes from './routes/article.routes.js';
import preparateurRoutes from './routes/preparateur.routes.js';
import expeditionRoutes from './routes/expedition.routes.js';
import errorHandler from './middlewares/error-handler.middleware.js';
import notFound from './middlewares/not-found.middleware.js';

const app = express();

app.use(corsMiddleware);
app.options('/{*path}', corsPreFlight);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Documentation Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use('/api/zones', zoneRoutes);
app.use('/api/articles', articleRoutes);
app.use('/api/preparateurs', preparateurRoutes);
app.use('/api/expeditions', expeditionRoutes );

//health check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'oks' });
});

app.use(notFound);
app.use(errorHandler);

export default app;