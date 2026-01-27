const GITHUB_REPO = "varun29ankuS/shodh-memory";
const NPM_PACKAGE = "@shodh/memory-mcp";
const PYPI_PACKAGE = "shodh-memory";
const CRATES_PACKAGE = "shodh-memory";

interface DownloadStats {
  github: number;
  npm: number;
  pypi: number;
  crates: number;
  total: number;
  lastUpdated: string;
}

async function fetchGitHubDownloads(): Promise<number> {
  try {
    const response = await fetch(
      `https://api.github.com/repos/${GITHUB_REPO}/releases`,
      {
        headers: { Accept: "application/vnd.github.v3+json" },
        next: { revalidate: 3600 },
      }
    );
    if (!response.ok) return 0;

    const releases = await response.json();
    let total = 0;
    for (const release of releases) {
      for (const asset of release.assets || []) {
        total += asset.download_count || 0;
      }
    }
    return total;
  } catch {
    return 0;
  }
}

async function fetchNpmDownloads(): Promise<number> {
  try {
    const response = await fetch(
      `https://api.npmjs.org/downloads/point/last-month/${encodeURIComponent(NPM_PACKAGE)}`,
      { next: { revalidate: 3600 } }
    );
    if (!response.ok) return 0;

    const data = await response.json();
    return data.downloads || 0;
  } catch {
    return 0;
  }
}

async function fetchPyPIDownloads(): Promise<number> {
  try {
    const response = await fetch(
      `https://pypistats.org/api/packages/${PYPI_PACKAGE}/recent`,
      {
        headers: { Accept: "application/json" },
        next: { revalidate: 3600 },
      }
    );
    if (!response.ok) return 0;

    const data = await response.json();
    return data.data?.last_month || 0;
  } catch {
    return 0;
  }
}

async function fetchCratesDownloads(): Promise<number> {
  try {
    const response = await fetch(
      `https://crates.io/api/v1/crates/${CRATES_PACKAGE}`,
      {
        headers: { "User-Agent": "shodh-memory-website" },
        next: { revalidate: 3600 },
      }
    );
    if (!response.ok) return 0;

    const data = await response.json();
    return data.crate?.downloads || 0;
  } catch {
    return 0;
  }
}

export async function getDownloadStats(): Promise<DownloadStats> {
  const [github, npm, pypi, crates] = await Promise.all([
    fetchGitHubDownloads(),
    fetchNpmDownloads(),
    fetchPyPIDownloads(),
    fetchCratesDownloads(),
  ]);

  return {
    github,
    npm,
    pypi,
    crates,
    total: github + npm + pypi + crates,
    lastUpdated: new Date().toISOString(),
  };
}

export function formatDownloads(count: number): string {
  if (count >= 1000000) {
    return `${(count / 1000000).toFixed(1)}M`;
  }
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}K`;
  }
  return count.toString();
}
