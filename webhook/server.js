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
// app.get('/', (req, res) => {
//   res.send(`<pre>Server is up and running. Visit /webhook for webhook functionality.</pre>`);
// });
app.get('/', (req, res) => {
    res.send(`
      <html>
        <head>
          <style>
            body {
              display: flex;
              justify-content: center;
              align-items: center;
              height: 100vh;
              margin: 0;
              background-color: #f0f0f0;
              font-family: Arial, sans-serif;
            }
            pre {
              background-color: #333;
              color: #fff;
              padding: 20px;
              border-radius: 8px;
              font-size: 20px;
              text-align: center;
              border: 2px solid #ff6347;  /* Tomato color for border */
              box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            }
            h1 {
              color: #ff6347;  /* Tomato color for the heading */
            }
          </style>
        </head>
        <body>
          <pre>Server is up and running. Visit /webhook for webhook functionality.</pre>
        </body>
      </html>
    `);
  });
  
// Start the server
app.listen(process.env.PORT, () => {
  logger.info(`Server is listening on port: ${process.env.PORT}`);
});
