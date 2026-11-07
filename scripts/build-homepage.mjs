import { build } from 'vite'
import { mkdir, readFile, writeFile } from 'node:fs/promises'

// Bundle from the React source, so index.html can also open directly from disk.
const result = await build({
  build: {
    write: false,
    rollupOptions: {
      input: 'src/main.jsx',
      output: { codeSplitting: false },
    },
  },
})
const outputs = (Array.isArray(result) ? result : [result]).flatMap(item => item.output)
const javascript = outputs.filter(item => item.type === 'chunk').map(item => item.code).join('\n')
const css = outputs.filter(item => item.type === 'asset' && item.fileName.endsWith('.css')).map(item => item.source).join('\n')
const favicon = await readFile('public/favicon.svg', 'utf8')
const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="theme-color" content="#171b18" />
    <meta name="description" content="Priyanka Kalla offers print-ready graphic design for corporate communications and personal use, website design, and e-commerce web design. Contact priyankakalla@outlook.com or 9432497485." />
    <title>Priyanka Kalla | Graphic, Website &amp; E-commerce Design</title>
    <link rel="icon" href="data:image/svg+xml,${encodeURIComponent(favicon)}" />
    <style>${css.replace(/<\/style/gi, '<\\/style')}</style>
  </head>
  <body>
    <div id="root"></div>
    <noscript>Please enable JavaScript to view Priyanka Kalla's portfolio. Contact priyankakalla@outlook.com or call 9432497485.</noscript>
    <script type="module">${javascript.replace(/<\/script/gi, '<\\/script')}</script>
  </body>
</html>
`
await mkdir('dist', { recursive: true })
await Promise.all([
  writeFile('index.html', html),
  writeFile('dist/index.html', html),
])
console.log('Standalone homepage created: index.html and dist/index.html')
