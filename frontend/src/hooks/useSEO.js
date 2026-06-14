import { useEffect } from "react";

export default function useSEO({ title, description }) {
  useEffect(() => {
    if (title) document.title = `${title} | 24HR Fremont Tire & Auto`;

    const setMeta = (name, content, prop = false) => {
      const sel = prop
        ? `meta[property="${name}"]`
        : `meta[name="${name}"]`;
      let el = document.querySelector(sel);
      if (!el) {
        el = document.createElement("meta");
        prop ? el.setAttribute("property", name) : el.setAttribute("name", name);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    if (description) {
      setMeta("description", description);
      setMeta("og:description", description, true);
      setMeta("twitter:description", description);
    }
    if (title) {
      setMeta("og:title", `${title} | 24HR Fremont Tire & Auto`, true);
      setMeta("twitter:title", `${title} | 24HR Fremont Tire & Auto`);
    }
  }, [title, description]);
}
