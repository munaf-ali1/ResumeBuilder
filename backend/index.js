import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from .env file
dotenv.config({ path: path.join(__dirname, '.env') });

console.log('Environment variables loaded:');
console.log('PORT:', process.env.PORT);
console.log('STRIPE_SECRET_KEY:', process.env.STRIPE_SECRET_KEY ? 'Defined' : 'Undefined');

async function startServer() {
  const { default: express } = await import('express');
  const { default: cors } = await import('cors');
  const { default: connectDB } = await import('./config/db.js');
  const { default: aiRouter } = await import('./routes/ai.routes.js');
  const { default: sseRouter } = await import('./routes/stream.routes.js');
  const { default: pdfRouter } = await import('./routes/pdf.routes.js');

  // Import Stripe router after environment variables are loaded
  const { default: stripeRouter } = await import('./routes/stripe.routes.js');

  const app = express();

  app.use(express.json());
  app.use(cors({
      origin: "http://localhost:5173"
  }));

  const PORT = process.env.PORT || 3000;

  app.use('/api/ai', aiRouter);
  app.use('/api/ai', sseRouter);
  app.use('/api/pdf', pdfRouter);
  app.use('/api/stripe', stripeRouter);

  app.get('/', (req, res) => {
      res.send('Hello World!');
  });

  app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
      connectDB();
  });
}

startServer().catch(console.error);
