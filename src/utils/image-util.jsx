// import.meta.url is a native ESM feature that exposes the current module's URL. Combining it with the native URL constructor, we can dynamically obtain the full, resolved URL of a static asset using relative path from a JavaScript module.
export default function getImageURL(name) {
  return new URL(`../assets/icons/${name}.png`, import.meta.url).href;
}
