// api/index.js
import { createServer } from 'http';
import { createRequire } from 'module';

// Import your bundled server application
const serverModule = await import('../dist/index.js');
const app = serverModule.default || serverModule.app;

export default app;