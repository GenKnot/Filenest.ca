/**
 * Generates /public/og-image.png (1200×630)
 * Run: node scripts/generate-og.mjs
 */

import { readFileSync, writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");

const { ImageResponse } = await import(
  join(root, "node_modules/next/dist/compiled/@vercel/og/index.node.js")
);

// Logo as base64
const logoData = readFileSync(join(root, "public/logo.png")).toString("base64");
const logoSrc = `data:image/png;base64,${logoData}`;

const response = new ImageResponse(
  {
    type: "div",
    props: {
      style: {
        width: "1200px",
        height: "630px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "#06060a",
        fontFamily: "system-ui, -apple-system, sans-serif",
        position: "relative",
        overflow: "hidden",
      },
      children: [
        // Purple glow — center
        {
          type: "div",
          props: {
            style: {
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "700px",
              height: "500px",
              borderRadius: "50%",
              background:
                "radial-gradient(ellipse, rgba(124,92,252,0.22) 0%, transparent 70%)",
              filter: "blur(60px)",
            },
          },
        },

        // Secondary glow — top right
        {
          type: "div",
          props: {
            style: {
              position: "absolute",
              top: "-100px",
              right: "-100px",
              width: "400px",
              height: "400px",
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(34,211,238,0.08) 0%, transparent 70%)",
              filter: "blur(50px)",
            },
          },
        },

        // Top border line accent
        {
          type: "div",
          props: {
            style: {
              position: "absolute",
              top: "0px",
              left: "0px",
              right: "0px",
              height: "1px",
              background:
                "linear-gradient(to right, transparent, rgba(124,92,252,0.5) 50%, transparent)",
            },
          },
        },

        // Content — centered column
        {
          type: "div",
          props: {
            style: {
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              gap: "0px",
              padding: "0 80px",
              position: "relative",
            },
            children: [
              // Logo + brand
              {
                type: "div",
                props: {
                  style: {
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    marginBottom: "44px",
                  },
                  children: [
                    {
                      type: "img",
                      props: {
                        src: logoSrc,
                        width: 40,
                        height: 40,
                        style: { objectFit: "contain" },
                      },
                    },
                    {
                      type: "span",
                      props: {
                        style: {
                          fontSize: "26px",
                          fontWeight: 600,
                          color: "#f4f4f5",
                          letterSpacing: "-0.5px",
                        },
                        children: "Filenest",
                      },
                    },
                  ],
                },
              },

              // Headline — 3 lines
              {
                type: "div",
                props: {
                  style: {
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "4px",
                    marginBottom: "28px",
                  },
                  children: [
                    {
                      type: "span",
                      props: {
                        style: {
                          fontSize: "78px",
                          fontWeight: 800,
                          lineHeight: 1.05,
                          letterSpacing: "-3px",
                          color: "#a5b4fc",
                        },
                        children: "Your files.",
                      },
                    },
                    {
                      type: "span",
                      props: {
                        style: {
                          fontSize: "78px",
                          fontWeight: 800,
                          lineHeight: 1.05,
                          letterSpacing: "-3px",
                          color: "#f4f4f5",
                        },
                        children: "Your AI. Your machine.",
                      },
                    },
                  ],
                },
              },

              // Subtitle
              {
                type: "p",
                props: {
                  style: {
                    fontSize: "22px",
                    color: "#71717a",
                    lineHeight: 1.5,
                    margin: "0 0 40px 0",
                    maxWidth: "640px",
                    textAlign: "center",
                  },
                  children:
                    "Local-first, AI-powered document management for lawyers, immigration consultants & accountants.",
                },
              },

              // Badges
              {
                type: "div",
                props: {
                  style: {
                    display: "flex",
                    gap: "12px",
                    alignItems: "center",
                    justifyContent: "center",
                  },
                  children: [
                    "Zero cloud uploads",
                    "AES-256 encrypted",
                    "Local AI inference",
                  ].map((label) => ({
                    type: "div",
                    props: {
                      style: {
                        display: "flex",
                        alignItems: "center",
                        padding: "8px 18px",
                        borderRadius: "999px",
                        background: "rgba(52,211,153,0.08)",
                        border: "1px solid rgba(52,211,153,0.18)",
                        fontSize: "15px",
                        fontWeight: 500,
                        color: "#34d399",
                        letterSpacing: "0px",
                      },
                      children: label,
                    },
                  })),
                },
              },
            ],
          },
        },

        // filenest.ca — bottom right watermark
        {
          type: "div",
          props: {
            style: {
              position: "absolute",
              bottom: "28px",
              right: "48px",
              fontSize: "14px",
              color: "rgba(113,113,122,0.6)",
              letterSpacing: "0.3px",
            },
            children: "filenest.ca",
          },
        },
      ],
    },
  },
  { width: 1200, height: 630 }
);

const buffer = Buffer.from(await response.arrayBuffer());
const outPath = join(root, "public/og-image.png");
writeFileSync(outPath, buffer);
console.log(`✓ og-image.png generated → ${outPath}`);
console.log(`  Size: ${(buffer.length / 1024).toFixed(1)} KB`);
