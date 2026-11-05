/**
 * Structured data as a `<script type="application/ld+json">`. `<` is escaped to
 * its unicode form: JSON.stringify does not sanitize, and this payload goes into
 * the document as raw HTML.
 * Source: node_modules/next/dist/docs/01-app/02-guides/json-ld.md
 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
