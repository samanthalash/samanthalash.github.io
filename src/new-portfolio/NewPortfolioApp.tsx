import "@fontsource/anonymous-pro/latin-400.css";
import "@fontsource/anonymous-pro/latin-700.css";
import "@fontsource/beth-ellen/latin-400.css";
import { useEffect } from "react";
import { projectBySlug, projectCollageItems, projects, site, type Project } from "./data/portfolio";
import styles from "./NewPortfolio.module.css";

const normalizePath = (pathname: string) => {
  const cleanPath = pathname.replace(/\/+$/, "");
  return cleanPath || "/";
};

function LogoLink() {
  return (
    <a className={styles.logoLink} href="/" aria-label="Samantha Lash home">
      <img src={site.logo} alt="" />
    </a>
  );
}

function SiteNav({ current }: { current: "home" | "projects" | "about" }) {
  return (
    <nav className={`${styles.siteNav} ${current === "home" ? styles.homeNav : ""}`} aria-label="Main navigation">
      {current !== "home" && <a href="/">Home</a>}
      {current !== "about" && <a href="/about/">About me</a>}
      {current !== "projects" && <a href="/projects/">+ Projects</a>}
    </nav>
  );
}

function NameLockup({ heading = true }: { heading?: boolean }) {
  return (
    <div className={styles.nameLockup}>
      <img className={styles.portrait} src={site.portrait} alt="Portrait of Samantha Lash" />
      {heading ? <h1>Samantha<br />Lash</h1> : <p>Samantha<br />Lash</p>}
    </div>
  );
}

function HomePage() {
  return (
    <main className={styles.homePage}>
      <section className={styles.homeIntro} aria-labelledby="home-title">
        <LogoLink />
        <SiteNav current="home" />
        <nav className={styles.mobileHomeNav} aria-label="Mobile navigation">
          <a href="/about/">About me</a>
          <a href="/projects/">+ Projects</a>
        </nav>
        <NameLockup />
        <p id="home-title" className={styles.homeSummary}>{site.summary}</p>
        <div className={styles.socialLinks}>
          <a href={site.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
          <a href={`mailto:${site.email}`}>Email</a>
        </div>
      </section>
      <section className={styles.homeFeed} aria-label="Selected projects">
        {projects.map((project) => (
          <a className={styles.homeProject} href={`/projects/${project.slug}/`} key={project.slug}>
            <div className={styles.homeProjectMeta}>
              <p><span>{project.number}</span>{project.title.toUpperCase()}</p>
              <ul>
                {project.disciplines.map((discipline) => <li key={discipline}>{discipline}</li>)}
              </ul>
            </div>
            <img src={project.hero.src} alt={project.hero.alt} />
          </a>
        ))}
      </section>
    </main>
  );
}

function ProjectsPage() {
  return (
    <main className={`${styles.standardPage} ${styles.projectsPage}`}>
      <LogoLink />
      <SiteNav current="projects" />
      <h1 className={styles.visuallyHidden}>Projects</h1>
      <section className={styles.projectCollage} aria-label="Samantha Lash projects">
        {projectCollageItems.map((item, index) => {
          const project = projectBySlug.get(item.slug);
          if (!project) return null;

          return (
          <a
            className={`${styles.collageProject} ${styles[item.placement]}`}
            href={`/projects/${project.slug}/`}
            key={`${project.slug}-${index}`}
            aria-label={project.title}
          >
            <img src={item.image.src} alt={item.image.alt} />
            <span aria-hidden="true">{project.title}</span>
          </a>
          );
        })}
        <p className={styles.selectedWork}>Selected<br />Work</p>
      </section>
    </main>
  );
}

const experience = [
  {
    role: "Nurun (Publicis Groupe) – Marketing Coordinator",
    bullets: [
      "Developed social media strategy informed by competitor and market research.",
      "Produced content, photography, and copy for Instagram and LinkedIn.",
      "Collaborated with senior leadership on brand communications.",
    ],
  },
  {
    role: "MacIntyre Communications – Communications & Social Media Intern",
    bullets: [
      "Supported influencer campaigns, social media strategy, and consumer trend research for global brands.",
      "Produced campaign reports and media outreach.",
      "Supported influencer events with 200+ attendees.",
    ],
  },
];

function AboutPage() {
  return (
    <main className={styles.standardPage}>
      <LogoLink />
      <SiteNav current="about" />
      <section className={styles.aboutPage}>
        <aside className={styles.aboutIdentity}>
          <NameLockup heading={false} />
          <a className={styles.downloadLink} href={site.cvHref} download>Download CV</a>
        </aside>
        <div className={styles.aboutContent}>
          <section className={styles.aboutRow}>
            <h1>About me</h1>
            <p className={styles.boldCopy}>Creative Director with a background in communications and marketing. I create insight-led campaigns, brands, and visual identities rooted in strategy and culture.</p>
          </section>
          <section className={styles.aboutRow}>
            <h2>Experience</h2>
            <div>
              {experience.map((job) => (
                <article className={styles.experience} key={job.role}>
                  <h3>{job.role}</h3>
                  <ul>{job.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>
                </article>
              ))}
            </div>
          </section>
          <section className={styles.aboutRow}>
            <h2>Education</h2>
            <div className={styles.stack}>
              <p><strong>IE Business School</strong><br />MSc Creative Direction, Content &amp; Branding</p>
              <p><strong>McGill University</strong><br />BA Media, Cultural Studies &amp; Communications</p>
            </div>
          </section>
          <section className={styles.aboutRow}>
            <h2>Skills</h2>
            <p className={styles.boldCopy}>Creative Strategy, Branding, Art Direction, Content Creation, Photography, Video Production, Copywriting, Trend Analysis, Market Research, <u>Figma, Canva, Adobe Suite</u>.</p>
          </section>
          <section className={styles.aboutRow}>
            <h2>Languages</h2>
            <p className={styles.boldCopy}>English (Native)<br />French (Advanced)<br />Spanish (Beginner)</p>
          </section>
          <section className={styles.aboutRow}>
            <h2>Contact</h2>
            <p className={styles.boldCopy}>{site.phone}<br /><a href={`mailto:${site.email}`}>{site.email}</a></p>
          </section>
        </div>
      </section>
    </main>
  );
}

function ProjectFacts({ project }: { project: Project }) {
  const facts = [
    ["Context", project.context],
    ["Role", project.role],
    ["Insight", project.insight],
    ["Solution", project.solution],
  ] as const;

  return (
    <dl className={styles.projectFacts}>
      {facts.map(([label, value]) => (
        <div key={label}>
          <dt>{label}</dt>
          <dd>{value}</dd>
        </div>
      ))}
      <div>
        <dt>Tools</dt>
        <dd>{project.tools.map((tool) => <span key={tool}>{tool}</span>)}</dd>
      </div>
    </dl>
  );
}

function ProjectPage({ project }: { project: Project }) {
  const detailHero = project.detailHero ?? project.hero;
  const heroAccent = project.heroAccent ?? project.gallery[0];

  return (
    <main className={`${styles.standardPage} ${styles.projectPage}`}>
      <LogoLink />
      <section
        className={`${styles.projectHero} ${styles[`projectHero_${project.layout}`]} ${
          project.slug === "hunter-campaign" ? styles.hunterProjectHero : ""
        } ${
          project.slug === "levis-campaign" ? styles.levisProjectHero : ""
        } ${
          project.slug === "apramp-campaign" ? styles.aprampProjectHero : ""
        } ${
          project.slug === "tomorrowland-rebrand" ? styles.tomorrowlandProjectHero : ""
        } ${
          project.slug === "la-manuela-rebrand" ? styles.laManuelaProjectHero : ""
        }`}
      >
        <div className={styles.projectTitle}>
          <h1>{project.displayTitle}</h1>
          <p>{project.category}</p>
          {project.fullCampaignHref && (
            <a href={project.fullCampaignHref}>Full campaign</a>
          )}
        </div>
        <img src={detailHero.src} alt={detailHero.alt} />
        {project.layout === "landscape" && project.slug !== "la-manuela-rebrand" && heroAccent && (
          <img className={styles.projectHeroAccent} src={heroAccent.src} alt={heroAccent.alt} />
        )}
      </section>
      <section id="project-details" className={`${styles.projectDetails} ${
        project.slug === "levis-campaign" ? styles.levisProjectDetails : ""
      } ${
        project.slug === "tomorrowland-rebrand" ? styles.tomorrowlandProjectDetails : ""
      } ${
        project.slug === "apramp-campaign" ? styles.aprampProjectDetails : ""
      } ${
        project.slug === "la-manuela-rebrand" ? styles.laManuelaProjectDetails : ""
      }`}>
        <div className={styles.projectGallery}>
          {project.gallery.map((image, index) => (
            <img
              className={index === 0 ? styles.galleryLead : ""}
              src={image.src}
              alt={image.alt}
              key={image.src}
              loading="lazy"
            />
          ))}
        </div>
        <ProjectFacts project={project} />
      </section>
      {project.mediaCoverage && (
        <section className={styles.mediaCoverage} aria-labelledby="media-coverage-title">
          <a href={project.mediaCoverage.href}>
            <h2 id="media-coverage-title">Media coverage</h2>
            <img
              src={project.mediaCoverage.image.src}
              alt={project.mediaCoverage.image.alt}
              loading="lazy"
            />
          </a>
        </section>
      )}
      <nav className={styles.nextProject} aria-label="Project navigation">
        {(() => {
          const index = projects.findIndex((candidate) => candidate.slug === project.slug);
          const next = projects[(index + 1) % projects.length];
          return <a href={`/projects/${next.slug}/`}>Next project: {next.title}</a>;
        })()}
      </nav>
    </main>
  );
}

function NotFoundPage() {
  return (
    <main className={styles.notFound}>
      <LogoLink />
      <p>Page not found.</p>
      <a href="/">Return home</a>
    </main>
  );
}

const metadata = {
  "/": ["Samantha Lash", "Creative direction, brand identity, strategy, and concept portfolio for Samantha Lash."],
  "/projects": ["Projects | Samantha Lash", "Selected creative direction, strategy, and brand identity projects by Samantha Lash."],
  "/about": ["About | Samantha Lash", "About Samantha Lash, a creative direction master's student working across branding, communications, and marketing."],
} as const;

function updateMetadata(path: string, project?: Project) {
  const [title, description] = project
    ? [`${project.title} | Samantha Lash`, `${project.title}, a ${project.category.toLowerCase()} project by Samantha Lash.`]
    : metadata[path as keyof typeof metadata] ?? ["Samantha Lash", metadata["/"][1]];
  document.title = title;
  document.querySelector('meta[name="description"]')?.setAttribute("content", description);
  document.querySelector('link[rel="canonical"]')?.setAttribute("href", `https://samanthalash.com${path === "/" ? "/" : `${path}/`}`);
}

export default function NewPortfolioApp() {
  const path = normalizePath(window.location.pathname);
  const projectSlug = path.match(/^\/projects\/([^/]+)$/)?.[1];
  const project = projectSlug ? projectBySlug.get(projectSlug) : undefined;

  useEffect(() => {
    updateMetadata(path, project);
  }, [path, project]);

  if (path === "/") return <HomePage />;
  if (path === "/projects") return <ProjectsPage />;
  if (path === "/about") return <AboutPage />;
  if (project) return <ProjectPage project={project} />;
  return <NotFoundPage />;
}
