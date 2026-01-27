const GITHUB_REPO = "varun29ankuS/shodh-memory";
const FALLBACK_VERSION = "0.1.75";

interface GitHubRelease {
  tag_name: string;
  name: string;
  published_at: string;
  html_url: string;
  body: string;
}

let cachedVersion: string | null = null;
let cachedRelease: GitHubRelease | null = null;

export async function getLatestVersion(): Promise<string> {
  if (cachedVersion) return cachedVersion;

  try {
    const response = await fetch(
      `https://api.github.com/repos/${GITHUB_REPO}/releases/latest`,
      {
        headers: {
          Accept: "application/vnd.github.v3+json",
        },
        next: { revalidate: 3600 }, // Cache for 1 hour
      }
    );

    if (!response.ok) {
      console.warn(`GitHub API returned ${response.status}, using fallback version`);
      return FALLBACK_VERSION;
    }

    const release: GitHubRelease = await response.json();
    cachedVersion = release.tag_name.replace(/^v/, "");
    cachedRelease = release;
    return cachedVersion;
  } catch (error) {
    console.warn("Failed to fetch latest version from GitHub:", error);
    return FALLBACK_VERSION;
  }
}

export async function getLatestRelease(): Promise<GitHubRelease | null> {
  if (cachedRelease) return cachedRelease;

  await getLatestVersion(); // This populates cachedRelease
  return cachedRelease;
}

export function getDownloadUrl(version: string, platform: string): string {
  const platformMap: Record<string, string> = {
    "linux-x64": "shodh-memory-x86_64-linux",
    "linux-arm64": "shodh-memory-aarch64-linux",
    "macos-x64": "shodh-memory-x86_64-darwin",
    "macos-arm64": "shodh-memory-aarch64-darwin",
    "windows-x64": "shodh-memory-x86_64-windows.exe",
  };

  const binary = platformMap[platform] || platformMap["linux-x64"];
  return `https://github.com/${GITHUB_REPO}/releases/download/v${version}/${binary}`;
}

// For static/hardcoded usage (when dynamic fetch isn't possible)
export const VERSION = FALLBACK_VERSION;
export const REPO_URL = `https://github.com/${GITHUB_REPO}`;
export const RELEASES_URL = `${REPO_URL}/releases`;
