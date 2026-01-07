import path from 'path'
import { defineConfig, type Plugin, loadEnv } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
import { tanstackRouter } from '@tanstack/router-plugin/vite'

function envJsPlugin(env: Record<string, string>): Plugin {
  return {
    name: 'vite-env-js',
    configureServer(server) {
      server.middlewares.use('/env.js', (_, res) => {
        const e = {
          SERVER_URL: env.SERVER_URL,
          NODE_ENV: env.APP_NODE_ENV,
        };

        res.setHeader('Content-Type', 'application/javascript');
        res.end(`window.__ENV__ = ${JSON.stringify(e, null, 2)};`);
      });
    },
  };
}


// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [
      tanstackRouter({
        target: 'react',
        autoCodeSplitting: true,
      }),
      react(),
      tailwindcss(),
      envJsPlugin(env),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
  }
})
