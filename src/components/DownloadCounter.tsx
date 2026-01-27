import { getDownloadStats, formatDownloads } from "@/lib/downloads";

export async function DownloadCounter() {
  const stats = await getDownloadStats();

  return (
    <div className="download-counter">
      <div className="download-total">
        <span className="download-number">{formatDownloads(stats.total)}</span>
        <span className="download-label">total downloads</span>
      </div>
      <div className="download-breakdown">
        <DownloadSource name="GitHub" count={stats.github} icon="github" />
        <DownloadSource name="npm" count={stats.npm} icon="npm" />
        <DownloadSource name="PyPI" count={stats.pypi} icon="pypi" />
        <DownloadSource name="crates.io" count={stats.crates} icon="crates" />
      </div>
    </div>
  );
}

function DownloadSource({
  name,
  count,
  icon,
}: {
  name: string;
  count: number;
  icon: string;
}) {
  return (
    <div className="download-source">
      <SourceIcon icon={icon} />
      <span className="source-count">{formatDownloads(count)}</span>
      <span className="source-name">{name}</span>
    </div>
  );
}

function SourceIcon({ icon }: { icon: string }) {
  switch (icon) {
    case "github":
      return (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
          <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
        </svg>
      );
    case "npm":
      return (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
          <path d="M0 0v16h16V0H0zm13 13H8V5H5v8H3V3h10v10z" />
        </svg>
      );
    case "pypi":
      return (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
          <path d="M8.037 1.035c-.773 0-1.504.15-2.108.495-.604.345-1.083.87-1.367 1.526-.284.656-.371 1.4-.258 2.103.113.703.422 1.335.89 1.814.35.358.78.636 1.258.812v2.38c-.478.176-.908.454-1.258.812-.468.479-.777 1.111-.89 1.814-.113.703-.026 1.447.258 2.103.284.656.763 1.181 1.367 1.526.604.345 1.335.495 2.108.495.773 0 1.504-.15 2.108-.495.604-.345 1.083-.87 1.367-1.526.284-.656.371-1.4.258-2.103-.113-.703-.422-1.335-.89-1.814-.35-.358-.78-.636-1.258-.812V7.785c.478-.176.908-.454 1.258-.812.468-.479.777-1.111.89-1.814.113-.703.026-1.447-.258-2.103-.284-.656-.763-1.181-1.367-1.526-.604-.345-1.335-.495-2.108-.495zM8 3.5a1.5 1.5 0 110 3 1.5 1.5 0 010-3zm0 6a1.5 1.5 0 110 3 1.5 1.5 0 010-3z" />
        </svg>
      );
    case "crates":
      return (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
          <path d="M8 0L1 4v8l7 4 7-4V4L8 0zM7 12.5L3 10V6l4 2.5v4zm1-5L4 5l4-2.5L12 5 8 7.5zm5 2.5l-4 2.5v-4L13 6v4z" />
        </svg>
      );
    default:
      return null;
  }
}
