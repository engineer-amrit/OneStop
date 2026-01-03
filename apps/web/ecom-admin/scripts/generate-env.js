import path from 'path'
import fs from 'fs'

const env = {
  SERVER_URL: process.env.SERVER_URL,
  APP_NODE_ENV: process.env.APP_NODE_ENV,
}

// basic validation
for (const [key, value] of Object.entries(env)) {
  if (!value) {
    throw new Error(`Missing env var: ${key}`)
  }
}

const content = `window.__ENV__ = ${JSON.stringify(env, null, 2)};`

const outDir = '/usr/share/nginx/html'
const outFile = path.join(outDir, 'env.js')

fs.mkdirSync(outDir, { recursive: true })
fs.writeFileSync(outFile, content, 'utf8')

console.log('✅ env.js generated at', outFile)
