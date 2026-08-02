import { lazy, Suspense } from "react";
import styles from "./App.module.css";

const ArchivedPortfolio = lazy(
  () => import("./archive/portfolio/ArchivedPortfolio"),
);
const NewPortfolioApp = lazy(
  () => import("./new-portfolio/NewPortfolioApp"),
);

const isArchivePath = (pathname: string) =>
  pathname === "/archive" || pathname.startsWith("/archive/");

export default function App() {
  if (isArchivePath(window.location.pathname)) {
    return (
      <Suspense fallback={<main className={styles.loading}>Loading archive</main>}>
        <ArchivedPortfolio />
      </Suspense>
    );
  }

  return (
    <Suspense fallback={<main className={styles.loading}>Loading portfolio</main>}>
      <NewPortfolioApp />
    </Suspense>
  );
}
