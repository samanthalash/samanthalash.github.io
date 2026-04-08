import homeLogo from "../../assets/home-logo.svg";
import paperclipImage from "../../assets/paperclip.png";
import type { FolderSection } from "../../data/folderSections";
import styles from "./ContentPanel.module.css";

interface ContentPanelProps {
  activeSection: FolderSection;
}

export function ContentPanel({ activeSection }: ContentPanelProps) {
  const { placeholderContent } = activeSection;
  const isHome = activeSection.id === "work";

  if (isHome) {
    return (
      <>
        <div className={`${styles.content} ${styles.homeContent}`}>
          <h1 className={styles.homeTitle}>{placeholderContent.title}</h1>

          <div className={styles.homeLogoWrap} aria-hidden="true">
            <img src={homeLogo} alt="" className={styles.homeLogo} />
          </div>

          <aside className={styles.homeCardWrap}>
            <div className={styles.homeCard}>
              <p className={styles.homeCardName}>Samantha Lash</p>
              <p className={styles.homeCardText}>{placeholderContent.body}</p>
            </div>
          </aside>
        </div>

        <img
          src={paperclipImage}
          alt=""
          className={styles.homePaperclip}
          aria-hidden="true"
        />
      </>
    );
  }

  return (
    <div className={styles.content}>
      <header className={styles.header}>
        <div>
          <p className={styles.eyebrow}>{placeholderContent.eyebrow}</p>
          <h1 className={styles.title}>{placeholderContent.title}</h1>
        </div>
        <div className={styles.headerMeta}>
          <p>{activeSection.shortCode}</p>
          <p>{activeSection.annotation}</p>
        </div>
      </header>

      <div className={styles.body}>
        <div className={styles.copyBlock}>
          <p className={styles.lede}>{placeholderContent.body}</p>

          <ul className={styles.list}>
            {placeholderContent.bullets.map((bullet) => (
              <li key={bullet}>{bullet}</li>
            ))}
          </ul>
        </div>

        <aside className={styles.sidebar}>
          <div className={styles.placeholderPhoto}>
            <span className={styles.photoTape} aria-hidden="true" />
            <span className={styles.photoInk} aria-hidden="true">
              {activeSection.label.slice(0, 1)}
            </span>
          </div>

          <div className={styles.noteBlock}>
            <p className={styles.noteLabel}>Margin Note</p>
            <p>{activeSection.marginNote}</p>
          </div>
        </aside>
      </div>

      <footer className={styles.footer}>
        <p>{placeholderContent.footer}</p>
        <p>Placeholder content only. Structural system ready for real work.</p>
      </footer>
    </div>
  );
}
