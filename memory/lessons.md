# Strategic Learning Log

## 2026-08-02 - Isolate the rebuild from the archive

**What happened:** The requested redesign sits in a repository where the previous
portfolio is still a live route and imports files from several legacy locations.

**Why it was risky:** Renaming folders for cleanliness or building directly on the
old components could silently break `/archive/` and destroy a working reference.

**What changed:** The new portfolio gets an isolated source and asset area. Legacy
paths are protected and only copied from.

**Deeper principle:** Reorganization should improve the new system without erasing
or destabilizing working history.

