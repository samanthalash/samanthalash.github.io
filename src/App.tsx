import { lazy, Suspense } from "react";
import styles from "./App.module.css";

const ArchivedPortfolio = lazy(
  () => import("./archive/portfolio/ArchivedPortfolio"),
);

const isArchivePath = (pathname: string) =>
  pathname === "/archive" || pathname.startsWith("/archive/");

function NewPortfolioHome() {
  return (
    <main className={styles.newPortfolio}>
      <section className={styles.intro} aria-labelledby="portfolio-title">
        <p className={styles.kicker}>Portfolio</p>
        <h1 id="portfolio-title">Samantha Lash</h1>
        <p className={styles.summary}>
          Creative direction, brand identity, strategy, and concept development.
        </p>
      </section>
      <nav className={styles.archiveLink} aria-label="Archive">
        <a href="/archive/">View previous portfolio</a>
      </nav>
    </main>
  );
}

export default function App() {
  if (isArchivePath(window.location.pathname)) {
    return (
      <Suspense fallback={<main className={styles.loading}>Loading archive</main>}>
        <ArchivedPortfolio />
      </Suspense>
    );
  }

  return <NewPortfolioHome />;
}
