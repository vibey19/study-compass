const UDEMY_COURSE_URL =
  "https://www.udemy.com/course/complete-machine-learning-nlp-bootcamp-mlops-deployment/";

// "Udemy — …" resources go straight to the course; direct URLs are linked
// as-is; anything else falls back to a web search for the resource name.
function hrefFor(resource: string): string {
  if (/^udemy/i.test(resource)) return UDEMY_COURSE_URL;
  const url = resource.match(
    /(?:https?:\/\/)?((?:github\.com|kaggle\.com|youtube\.com|sqlbolt\.com)\/[^\s)]+)/i
  );
  if (url) return `https://${url[1]}`;
  return `https://www.google.com/search?q=${encodeURIComponent(resource)}`;
}

export function ResourceLinks({
  resources,
  className = "mt-2",
}: {
  resources: string[];
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
            className="text-blue-600 hover:underline dark:text-blue-400"
          >
            {r} <span aria-hidden>↗</span>
          </a>
        </li>
      ))}
    </ul>
  );
}
