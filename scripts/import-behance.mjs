import { readFile, writeFile, mkdir } from 'node:fs/promises'

const source = JSON.parse(await readFile('portfolio-import/projects.json', 'utf8'))
const types = ['Poster design', 'Editorial & cover design', 'Brochure design', 'Graphic design & UI/UX', 'Motion design', 'Event branding', 'Corporate communications', 'Social media design', 'Website UI design study', 'Watch graphic design', 'Interior design graphics']
const projects = []
for (const [index, project] of source.entries()) {
  const cover = project.covers.allAvailable.find(image => image.width === 808)
  const response = await fetch(cover.url, { signal: AbortSignal.timeout(30000) })
  if (!response.ok) throw new Error(`Image download failed for ${project.name}: ${response.status}`)
  const buffer = Buffer.from(await response.arrayBuffer())
  const mime = response.headers.get('content-type').split(';')[0]
  if (!mime.startsWith('image/')) throw new Error(`Invalid image for ${project.name}`)
  projects.push({
    id: project.id,
    name: project.name,
    type: types[index],
    category: 'Graphic design',
    source: 'Behance',
    url: project.url,
    image: `data:${mime};base64,${buffer.toString('base64')}`,
    description: `Explore ${project.name} by Priyanka Kalla. Open the complete project on Behance to see every image and the full presentation.`,
  })
  console.log(`Imported ${project.name} (${buffer.length} bytes)`)
}
await mkdir('src/data', { recursive: true })
await writeFile('src/data/projects.json', JSON.stringify(projects))
console.log(`Saved ${projects.length} projects with embedded cover images.`)
