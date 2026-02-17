import { ImageResponse } from "next/og";
import { BLOG_POSTS } from "../page";

export const runtime = "edge";
export const alt = "Blog post";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  const title = post?.title || "shodh-memory blog";
  const tags = post?.tags || [];
  const date = post?.date || "";
  const readTime = post?.readTime || "";

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#0d1117",
          padding: "60px",
          fontFamily: "monospace",
          position: "relative",
        }}
      >
        {/* Scanline overlay effect */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background:
              "repeating-linear-gradient(0deg, rgba(0,0,0,0.15) 0px, rgba(0,0,0,0.15) 1px, transparent 1px, transparent 3px)",
            display: "flex",
          }}
        />

        {/* Terminal header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            marginBottom: "40px",
          }}
        >
          <div
            style={{
              width: "14px",
              height: "14px",
              borderRadius: "50%",
              backgroundColor: "#f85149",
              display: "flex",
            }}
          />
          <div
            style={{
              width: "14px",
              height: "14px",
              borderRadius: "50%",
              backgroundColor: "#d29922",
              display: "flex",
            }}
          />
          <div
            style={{
              width: "14px",
              height: "14px",
              borderRadius: "50%",
              backgroundColor: "#3fb950",
              display: "flex",
            }}
          />
          <span
            style={{
              color: "#8b949e",
              fontSize: "18px",
              marginLeft: "12px",
            }}
          >
            shodh-memory://blog/{slug}
          </span>
        </div>

        {/* Title */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
            justifyContent: "center",
          }}
        >
          <div
            style={{
              fontSize: "48px",
              fontWeight: 700,
              color: "#c9d1d9",
              lineHeight: 1.2,
              maxWidth: "1000px",
              display: "flex",
              flexWrap: "wrap",
            }}
          >
            {title}
          </div>

          {/* Meta row */}
          <div
            style={{
              display: "flex",
              gap: "24px",
              marginTop: "32px",
              alignItems: "center",
            }}
          >
            {date && (
              <span style={{ color: "#8b949e", fontSize: "20px" }}>
                {date}
              </span>
            )}
            {readTime && (
              <span style={{ color: "#8b949e", fontSize: "20px" }}>
                {readTime} read
              </span>
            )}
            {tags.map((tag) => (
              <span
                key={tag}
                style={{
                  color: "#f0883e",
                  fontSize: "18px",
                  border: "1px solid #30363d",
                  padding: "4px 12px",
                  display: "flex",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "1px solid #30363d",
            paddingTop: "24px",
          }}
        >
          <span
            style={{
              color: "#f0883e",
              fontSize: "28px",
              fontWeight: 700,
            }}
          >
            shodh-memory
          </span>
          <span style={{ color: "#8b949e", fontSize: "20px" }}>
            shodh-memory.com
          </span>
        </div>
      </div>
    ),
    { ...size }
  );
}
