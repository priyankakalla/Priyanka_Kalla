import { readFile, writeFile } from 'node:fs/promises'

const selections = [
  {
    repo: 'ShreeVatsTradingCo', name: 'Shree Vats Trading Company',
    type: 'Business website & product catalog', imagePath: 'Images/Banner2.png',
    description: 'An industrial trading business website with a product catalog, category navigation, product search, and a quote inquiry interface. Built with HTML, CSS, and JavaScript.',
    highlights: ['Product catalog', 'Product search', 'Quote inquiries'],
  },
  {
    repo: 'travelagencywebsite', name: 'Happy Travelers',
    type: 'Travel & experiences website', imagePath: 'IMAGES/H-banner/b1.jpg',
    description: 'A multi-page travel website presenting destinations, host-led experiences, tour cards, a travel search interface, and image galleries. Includes home, about, Mexico, and upcoming-experience pages.',
    highlights: ['Destination discovery', 'Tour listings', 'Multi-page design'],
  },
  {
    repo: 'ott_platform_web_design', name: 'OTT Streaming Interface',
    type: 'Streaming UI / practice clone', imagePath: 'images/banner.jpg',
    description: 'A Netflix-inspired front-end practice project featuring movie and series collections, episode panels, carousels, and subscription plan layouts. An interface demonstration, without a streaming or payment backend.',
    highlights: ['Content collections', 'Episode layouts', 'Plan comparisons'],
  },
]
const webProjects = []
for (const project of selections) {
  const response = await fetch(`https://raw.githubusercontent.com/priyankakalla/${project.repo}/main/${encodeURI(project.imagePath)}`, { signal: AbortSignal.timeout(30000) })
  if (!response.ok) throw new Error(`Could not download artwork for ${project.repo}: ${response.status}`)
  const mime = response.headers.get('content-type').split(';')[0]
  if (!mime.startsWith('image/')) throw new Error('Expected image content')
  const image = `data:${mime};base64,${Buffer.from(await response.arrayBuffer()).toString('base64')}`
  webProjects.push({ ...project, id: project.repo, category: 'Web design', source: 'GitHub', sourceUrl: `https://github.com/priyankakalla/${project.repo}`, url: `https://priyankakalla.github.io/${project.repo}/`, image })
}
const graphics = JSON.parse(await readFile('src/data/projects.json', 'utf8'))
for (const project of graphics) {
  project.source = 'Behance'
  project.category = 'Graphic design'
  if (project.id === 197769691) project.type = 'Watch graphic design'
  if (project.id === 197767169) project.type = 'Interior design graphics'
  if (project.id === 210438055) project.type = 'Website UI design study'
}
await writeFile('src/data/projects.json', JSON.stringify(graphics))
await writeFile('src/data/web-projects.json', JSON.stringify(webProjects))
console.log(`Imported ${webProjects.length} GitHub website highlights; corrected Behance categories.`)
