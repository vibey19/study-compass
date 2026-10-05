import type { Resource } from "@/data/curriculum";

// A resource with a URL links straight to it and shows only its name;
// anything the curriculum lists without a link (a book, a study path)
// falls back to a web search for the name.
function hrefFor(resource: Resource): string {
  if (resource.url) return resource.url;
  return `https://www.google.com/search?q=${encodeURIComponent(resource.label)}`;
}

export function ResourceLinks({
  resources,
  className = "mt-2",
}: {
  resources: Resource[];
  className?: string;
}) {
  if (resources.length === 0) return null;
  return (
    <ul className={`space-y-1 text-sm ${className}`}>
      {resources.map((r, i) => (
        <li key={i}>
          <a
            href={hrefFor(r)}
            target="_blank"
            rel="noreferrer"
            title={r.url || `Search for "${r.label}"`}
            className="break-words text-blue-600 hover:underline dark:text-blue-400"
          >
            {r.label} <span aria-hidden>↗</span>
          </a>
        </li>
      ))}
    </ul>
  );
}
