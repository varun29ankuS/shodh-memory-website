/** Renders a JSON-LD structured-data script tag. Server-safe. */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

const BASE_URL = "https://www.shodh-memory.com";

/** BreadcrumbList for a top-level page under the site root. */
export function breadcrumbs(pageName: string, path: string) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
      { "@type": "ListItem", position: 2, name: pageName, item: `${BASE_URL}${path}` },
    ],
  };
}
