export function getLanguage() {
  const params = new URLSearchParams(window.location.search);
  const lang = params.get("lang") ?? localStorage.getItem("lang") ?? "en";

  localStorage.setItem("lang", lang);
  return lang;
}

export async function initTranslate() {
  const lang = getLanguage();
  const path = window.location.pathname;

  const filename = path.split("/").pop().split(".").shift();
  const file =
    filename === "index" || filename === ""
      ? `index.${lang}.html`
      : `${filename}.${lang}.html`;

  const content = await fetch(file);
  document.documentElement.innerHTML = await content.text();
}
