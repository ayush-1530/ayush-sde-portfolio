import { useEffect, useRef, useState } from "react";
import "./character.css";

export default function CharacterGuide() {
  const host = useRef<HTMLDivElement>(null);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    if (failed || typeof WebGL2RenderingContext === "undefined") return;
    let cancelled = false;
    let dispose: (() => void) | undefined;
    const timer = window.setTimeout(() => {
      void import("./CharacterRenderer").then(({ mountCharacterGuide }) => {
        if (!cancelled && host.current) dispose = mountCharacterGuide(host.current, () => { if (!cancelled) setFailed(true); });
      }).catch(() => { if (!cancelled) setFailed(true); });
    }, 350);
    return () => { cancelled = true; clearTimeout(timer); dispose?.(); };
  }, [failed]);
  return failed ? null : <div ref={host} className="character-viewport" aria-hidden="true" data-visible="false" />;
}
