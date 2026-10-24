import { lazy, Suspense, useState } from 'react'
import { portfolio } from './data/portfolio'
import { useSpatialBrowsing } from './hooks/useSpatialBrowsing'

const PortfolioWorld = lazy(() => import('./components/PortfolioWorld'))
const chapters = [
  ['home', 'Introduction'], ['work', 'Selected work'], ['experience', 'Experience'],
  ['about', 'About me'], ['education', 'Education'], ['contact', 'Contact'],
] as const

function App() {
  const [motionEnabled, setMotionEnabled] = useState(() => {
    try {
      return localStorage.getItem('carla-depth-enabled') !== 'false'
    } catch { return true }
  })
  const spatialRef = useSpatialBrowsing(motionEnabled)
  const [currentYear] = useState(() => new Date().getFullYear())
  const toggleDepth = () => {
    setMotionEnabled(!motionEnabled)
    try { localStorage.setItem('carla-depth-enabled', String(!motionEnabled)) } catch { /* Optional preference storage. */ }
  }

  return (
    <div ref={spatialRef} className="portfolio-world" data-motion={motionEnabled ? 'on' : 'off'}>
      <div className="world-fallback" aria-hidden="true" />
      <Suspense fallback={null}><PortfolioWorld enabled={motionEnabled} /></Suspense>
      <div className="reading-progress" aria-hidden="true" />
      <nav className="chapter-nav" aria-label="Portfolio chapters">
        {chapters.map(([id, title], index) => (
          <a key={id} className="chapter-link" href={`#${id}`} aria-label={`${index + 1}. ${title}`} title={title}>
            <span className="chapter-number">0{index + 1}</span><span className="chapter-name">{title}</span>
          </a>
        ))}
      </nav>
      <div className="page-shell mx-auto max-w-7xl px-6 sm:px-10">
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:z-50 focus:bg-blue-200 focus:p-4 focus:text-slate-950">
        Skip to content
      </a>
      <header className="flex flex-wrap items-center justify-between gap-6 border-b border-blue-400/25 py-7">
        <a href="#home" className="text-lg font-semibold tracking-tight">{portfolio.name}<span className="text-blue-700">.</span></a>
        <nav aria-label="Main navigation" className="flex flex-wrap gap-5 text-sm text-slate-700">
          <a className="hover:text-blue-700" href="#work">Work</a>
          <a className="hover:text-blue-700" href="#experience">Experience</a>
          <a className="hover:text-blue-700" href="#about">About</a>
          <a className="hover:text-blue-700" href="#contact">Contact ↗</a>
        </nav>
      </header>
      <div className="flex flex-wrap items-center justify-between gap-3 pt-6 text-xs text-blue-800/80">
        <span className="font-mono uppercase tracking-[0.16em]">A journey through learning & technology</span>
        <button type="button" onClick={toggleDepth} aria-pressed={motionEnabled} aria-label="3D browsing" className="depth-toggle cursor-pointer rounded-full border border-blue-300/30 px-4 py-2 text-blue-900 hover:bg-blue-400/10">
          {motionEnabled ? '3D browsing on · turn off' : 'Enable 3D browsing ↗'}
        </button>
      </div>

      <main id="main" className="spatial-sections">
        <section id="home" className="grid min-h-[75svh] items-center gap-10 py-20 lg:grid-cols-2">
          <div className="hero-intro">
            <p className="mb-7 font-mono text-xs uppercase tracking-[0.2em] text-blue-700">{portfolio.role}</p>
            <h1 className="max-w-2xl text-6xl leading-[0.95] font-medium tracking-tight sm:text-8xl">
              Carla Jean<br /><span className="text-blue-700 italic">Zozobrado.</span>
            </h1>
            <p className="mt-7 max-w-md text-lg leading-relaxed text-slate-600">{portfolio.intro}</p>
            <p className="mt-5 flex items-center gap-2 text-sm text-blue-800/80">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-400" aria-hidden="true" />
              {portfolio.location}
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <a href="#work" className="inline-flex items-center gap-8 rounded-full bg-blue-200 px-6 py-3.5 text-sm font-semibold text-slate-950 transition-colors hover:bg-blue-300">
                Explore my work <span aria-hidden="true">↗</span>
              </a>
              <a href="/documents/Carla-Jean-Zozobrado-CV.pdf" download="Carla-Jean-Zozobrado-CV.pdf" className="inline-flex items-center gap-5 rounded-full border border-blue-300/40 px-6 py-3.5 text-sm font-semibold text-blue-900 transition-colors hover:bg-blue-400/10">
                Download CV <span aria-hidden="true">↓</span>
              </a>
            </div>
          </div>
          <div className="portrait-stage">
            <div className="portrait-backplate" aria-hidden="true" />
            <figure data-depth-card className="depth-card portrait-panel relative flex flex-col items-center rounded-3xl border border-blue-300/25 px-6 pt-10">
              <div className="portrait-halo absolute top-14 h-56 w-56 rounded-full border border-blue-400/25 bg-blue-400/10" aria-hidden="true" />
              <figcaption className="portrait-caption relative mb-6 text-center">
                <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-blue-800">Education × Technology</p>
                <p className="mt-3 font-display text-4xl italic text-blue-950">A human perspective.</p>
              </figcaption>
              <img src="/images/carla-jean-zozobrado.png" alt="Carla Jean Zozobrado wearing a black blazer and white shirt" width="192" height="192" fetchPriority="high" className="portrait-photo relative h-64 w-64 object-contain" />
              <div className="portrait-label"><span className="font-display text-2xl">Carla Jean</span><span className="text-xs text-blue-800">Educator. Developer. Collaborator.</span></div>
            </figure>
          </div>
          <a href="#work" className="scroll-invitation flex items-center gap-4 text-xs text-blue-800/80 lg:col-span-2"><span className="scroll-line" aria-hidden="true" />Scroll to explore my story ↓</a>
        </section>

        <section id="work" className="border-t border-blue-400/25 py-20">
          <div className="mb-10 flex flex-wrap items-baseline justify-between gap-4">
            <h2 className="text-3xl font-medium tracking-tight sm:text-4xl">Selected work</h2>
            <span className="font-mono text-xs text-blue-700">TECHNOLOGY WITH PURPOSE</span>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {portfolio.projects.map((project, index) => (
              <article key={project.title} data-depth-card className="depth-card project-card rounded-2xl border border-blue-400/25 p-6 sm:p-8">
                <div className={`project-cover mb-7 flex h-48 items-center justify-center rounded-xl ${index % 2 === 0 ? 'bg-blue-200/10 text-blue-700' : 'bg-sky-300/10 text-sky-700'}`} aria-hidden="true">
                  <div className={`project-object ${index === 0 ? 'health-object' : 'library-object'}`}>
                    <span className="object-back" /><span className="object-middle" />
                    <span className="object-front">{index === 0 ? '+' : 'A—Z'}</span>
                  </div>
                </div>
                <p className="mb-3 text-xs font-medium uppercase tracking-widest text-blue-700">{project.role}</p>
                <h3 className="text-2xl font-medium">{project.title}</h3>
                <p className="mt-2 text-xs text-slate-600">{project.period}</p>
                <p className="mt-3 leading-relaxed text-slate-600">{project.description}</p>
                <ul className="mt-6 flex flex-wrap gap-2" aria-label="Project focus">
                  {project.tags.map((tag) => <li key={tag} className="rounded-full border border-blue-400/25 px-3 py-1 text-xs text-slate-700">{tag}</li>)}
                </ul>
                {project.url && <a href={project.url} target="_blank" rel="noreferrer" className="mt-6 inline-block text-sm text-blue-700 hover:underline">View project ↗</a>}
              </article>
            ))}
          </div>
        </section>

        <section id="experience" className="border-t border-blue-400/25 py-20">
          <p className="mb-4 font-mono text-xs uppercase tracking-widest text-blue-700">Teaching · Development · Leadership</p>
          <h2 className="mb-12 text-3xl font-medium tracking-tight sm:text-4xl">Professional experience</h2>
          <div className="space-y-10">
            {portfolio.experience.map((experience) => (
              <article key={experience.organization} className="experience-step grid gap-5 border-l-2 border-blue-400/40 p-6 md:grid-cols-[220px_1fr] md:gap-10">
                <div>
                  <p className="text-sm font-medium text-blue-800">{experience.period}</p>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{experience.location}</p>
                </div>
                <div>
                  <h3 className="text-xl font-medium">{experience.role}</h3>
                  <p className="mt-2 text-blue-700">{experience.organization}</p>
                  <ul className="mt-5 list-disc space-y-2 pl-5 text-sm leading-relaxed text-slate-700 marker:text-blue-400">
                    {experience.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="about" className="grid gap-8 border-t border-blue-400/25 py-20 md:grid-cols-2">
          <div>
            <p className="mb-4 font-mono text-xs uppercase tracking-widest text-blue-700">Curiosity. Care. Collaboration.</p>
            <h2 className="text-3xl font-medium tracking-tight sm:text-4xl">A little about me.</h2>
          </div>
          <div>
            <p className="text-lg leading-relaxed text-slate-600">{portfolio.about}</p>
            <ul aria-label="Skills" className="mt-8 flex flex-wrap gap-3">
              {portfolio.skills.map((skill) => <li key={skill} className="rounded-full bg-blue-400/10 px-4 py-2 text-sm text-slate-700">{skill}</li>)}
            </ul>
          </div>
        </section>

        <section id="education" className="grid gap-10 border-t border-blue-400/25 py-20 md:grid-cols-2">
          <div>
            <h2 className="mb-8 text-3xl font-medium tracking-tight">Education</h2>
            <article data-depth-card className="depth-card rounded-2xl border border-blue-300/20 bg-blue-400/5 p-7">
              <span className="inline-block rounded-full bg-blue-200 px-3 py-1 text-xs font-semibold text-slate-950">{portfolio.education.distinction}</span>
              <h3 className="mt-5 text-2xl font-medium leading-snug">{portfolio.education.degree}</h3>
              <p className="mt-3 text-blue-700">{portfolio.education.specialization}</p>
              <p className="mt-6 text-sm text-slate-700">{portfolio.education.institution}</p>
              <p className="mt-2 text-sm text-slate-600">{portfolio.education.date}</p>
            </article>
          </div>
          <div>
            <h2 className="mb-8 text-3xl font-medium tracking-tight">Recognition</h2>
            <div className="space-y-6">
              {portfolio.achievements.map((achievement) => (
                <article key={achievement.title} data-depth-card className="depth-card rounded-xl border border-blue-400/25 p-6">
                  <p className="mb-2 font-mono text-xs text-blue-700">{achievement.date}</p>
                  <h3 className="text-xl font-medium">{achievement.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600">{achievement.detail}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="border-t border-blue-400/25 py-20">
          <p className="mb-6 font-mono text-xs uppercase tracking-widest text-blue-700">Let’s connect</p>
          <h2 className="max-w-3xl text-4xl font-medium tracking-tight sm:text-6xl">Better learning.<br /><span className="text-blue-700">Meaningful technology.</span></h2>
          <p className="mt-6 max-w-xl leading-relaxed text-slate-600">For conversations about education, digital experiences, or collaboration, I’d love to hear from you.</p>
          {portfolio.email ? (
            <a href={`mailto:${portfolio.email}`} className="mt-8 inline-block break-all text-base text-blue-700 underline underline-offset-8 sm:text-lg">{portfolio.email} ↗</a>
          ) : (
            <p className="mt-8 text-slate-600">Contact details coming soon.</p>
          )}
          <p className="mt-5 text-sm text-slate-700">Telegram: {portfolio.telegram}</p>
          <p className="mt-2 text-sm text-slate-600">{portfolio.location}</p>
          <a href="/documents/Carla-Jean-Zozobrado-CV.pdf" download="Carla-Jean-Zozobrado-CV.pdf" className="mt-7 inline-flex items-center gap-5 rounded-full border border-blue-300/40 px-5 py-3 text-sm font-medium text-blue-800 hover:bg-blue-400/10">Download my CV <span aria-hidden="true">↓</span></a>
          <div className="mt-6 flex gap-6">
            {portfolio.socials.map((social) => <a key={social.label} href={social.url} target="_blank" rel="noreferrer" className="text-sm text-slate-600 hover:text-blue-700">{social.label} ↗</a>)}
          </div>
        </section>
      </main>

      <footer className="flex flex-wrap justify-between gap-4 border-t border-blue-400/25 py-7 text-xs text-slate-600">
        <p>© {currentYear} {portfolio.name}</p>
        <a href="#home" className="hover:text-blue-700">Back to top ↑</a>
      </footer>
      </div>
    </div>
  )
}

export default App
