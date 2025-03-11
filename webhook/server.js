import express from 'express';
import dotenv from 'dotenv';
import webhookRoutes from './routes/webhookRoutes.js';
import logger from './utils/logger.js';

// Load environment variables from .env file
dotenv.config();

const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());

// Use routes defined in webhookRoutes.js
app.use('/', webhookRoutes);

// Default route for the root path
app.get('/', (req, res) => {
  res.send(`<pre>Server is up and running. Visit /webhook for webhook functionality.</pre>`);
});

// Start the server
app.listen(process.env.PORT, () => {
  logger.info(`Server is listening on port: ${process.env.PORT}`);
});
