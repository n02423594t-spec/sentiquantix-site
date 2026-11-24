import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import React from 'react'
import { renderToString } from 'react-dom/server'
import { createServer } from 'vite'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const rootDir = path.resolve(__dirname, '..')
const distIndexPath = path.join(rootDir, 'dist', 'index.html')

const vite = await createServer({
  root: rootDir,
  server: { middlewareMode: true },
  appType: 'custom',
  logLevel: 'error',
  optimizeDeps: { noDiscovery: true },
})

try {
  const { default: App } = await vite.ssrLoadModule('/src/App.jsx')
  const appHtml = renderToString(React.createElement(App))
  const template = fs.readFileSync(distIndexPath, 'utf-8')

  if (!template.includes('<!--app-html-->')) {
    throw new Error('Prerender placeholder <!--app-html--> not found in dist/index.html')
  }

  const prerenderedHtml = template.replace('<!--app-html-->', appHtml)
  fs.writeFileSync(distIndexPath, prerenderedHtml, 'utf-8')
  console.log(`Prerendered ${appHtml.length} bytes of semantic HTML into dist/index.html`)
} finally {
  await vite.close()
}
