import { useEffect, useRef, useState } from "react";

const forecasts = ["sunny", "rainy", "snowy"] as const;
type Weather = typeof forecasts[number];

export default function WeatherScene() {
  const [weather, setWeather] = useState<Weather>("sunny");
  const [visible, setVisible] = useState(true);
  const canvas = useRef<HTMLCanvasElement>(null);
  const currentWeather = useRef<Weather>(weather);
  const [reducedMotion, setReducedMotion] = useState(() => window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  const running = visible && !reducedMotion;

  useEffect(() => { currentWeather.current = weather; }, [weather]);

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(preference.matches);
    update();
    preference.addEventListener("change", update);
    return () => preference.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const section = canvas.current?.closest("section");
    if (!section) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting));
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!running) return;
    const timer = window.setInterval(() => {
      setWeather(current => forecasts[(forecasts.indexOf(current) + 1) % forecasts.length]);
    }, 5000);
    return () => window.clearInterval(timer);
  }, [running]);

  useEffect(() => {
    if (typeof CanvasRenderingContext2D === "undefined") return;
    const element = canvas.current;
    const context = element?.getContext("2d");
    const section = element?.closest("section");
    if (!element || !context || !section) return;

    let width = 0, height = 0, frame = 0, previous = 0, elapsed = 0;
    const pointer = { x: 0, y: 0, targetX: 0, targetY: 0, localX: -1000, localY: -1000 };
    const opacity: Record<Weather, number> = { sunny: 0, rainy: 0, snowy: 0 };
    opacity[currentWeather.current] = 1;
    const createParticles = (count: number) => Array.from({ length: count }, (_, index) => ({
      x: ((index * 73.37 + 11) % 100) / 100,
      y: ((index * 47.89 + 7) % 100) / 100,
      size: 0.8 + (index % 5) * 0.45,
      depth: 0.35 + (index % 7) / 10,
      phase: index * 2.4,
    }));
    const particlesByWeather = { sunny: createParticles(65), rainy: createParticles(150), snowy: createParticles(110) };
    let waterDepth = 0, snowDepth = 0;
    const snowDrifts = Array<number>(80).fill(0);
    const ripples: { x: number; age: number; strength: number }[] = [];

    const snowLine = (x: number) => {
      const position = Math.max(0, Math.min(1, x / Math.max(width, 1))) * (snowDrifts.length - 1);
      const index = Math.floor(position);
      const drift = snowDrifts[index] * (1 - position + index) + snowDrifts[Math.min(index + 1, snowDrifts.length - 1)] * (position - index);
      const dune = (Math.sin(x * 0.018) + Math.sin(x * 0.041 + 1.4)) * Math.min(snowDepth * 0.2, 2.2);
      return height - Math.min(36, Math.min(waterDepth, 7) + snowDepth + drift + dune);
    };

    const waterLine = (x: number) => height - waterDepth
      + Math.sin(x * 0.027 + elapsed * 1.7) * Math.min(waterDepth * 0.18, 1.7)
      + Math.sin(x * 0.063 - elapsed * 2.1 + pointer.x) * Math.min(waterDepth * 0.1, 0.8);

    const drawSurface = (light: boolean, delta: number) => {
      // Accumulation persists across forecasts, then slowly evaporates or melts.
      waterDepth = Math.max(0, Math.min(22, waterDepth + delta * (opacity.rainy * 2 - opacity.sunny * 0.65)));
      snowDepth = Math.max(0, Math.min(18, snowDepth + delta * (opacity.snowy * 2.6 - opacity.sunny * 0.9 - opacity.rainy * 0.6)));
      for (let index = 0; index < snowDrifts.length; index++) {
        snowDrifts[index] = Math.max(0, snowDrifts[index] - delta * (opacity.sunny * 0.6 + opacity.rainy * 0.4));
      }

      if (waterDepth > 0.1) {
        const water = context.createLinearGradient(0, height - 28, 0, height);
        water.addColorStop(0, light ? "rgba(117,172,217,.3)" : "rgba(102,171,218,.24)");
        water.addColorStop(1, light ? "rgba(90,153,204,.6)" : "rgba(102,171,218,.52)");
        context.fillStyle = water;
        context.strokeStyle = light ? "rgba(65,125,177,.8)" : "rgba(175,222,250,.88)";
        context.lineWidth = 1.6;
        context.globalAlpha = Math.min(waterDepth / 3, 1);
        context.beginPath();
        context.moveTo(0, height);
        for (let x = 0; x <= width + 4; x += 4) context.lineTo(x, waterLine(x));
        context.lineTo(width, height);
        context.closePath();
        context.fill();
        context.beginPath();
        for (let x = 0; x <= width + 4; x += 4) {
          if (x === 0) context.moveTo(x, waterLine(x));
          else context.lineTo(x, waterLine(x));
        }
        context.stroke();
        // Broken reflections make the collected water read as a shallow puddle.
        context.strokeStyle = light ? "rgba(237,248,255,.8)" : "rgba(194,231,255,.6)";
        context.lineWidth = 1;
        context.beginPath();
        for (let index = 0; index < 18; index++) {
          const x = (index + 0.35) / 18 * width + Math.sin(elapsed * 0.8 + index) * 8;
          const y = waterLine(x) + 3 + (index % 3) * 2;
          context.moveTo(x, y);
          context.lineTo(x + 10 + (index % 4) * 5, y);
        }
        context.stroke();
      }

      for (let index = ripples.length - 1; index >= 0; index--) {
        const ripple = ripples[index];
        ripple.age += delta;
        if (ripple.age > 0.7) { ripples.splice(index, 1); continue; }
        const x = ripple.x * width, y = waterLine(x);
        context.globalAlpha = (1 - ripple.age / 0.7) * Math.min(waterDepth / 2, 1);
        context.strokeStyle = light ? "rgba(73,130,175,.65)" : "rgba(182,224,249,.75)";
        context.lineWidth = 0.9;
        context.beginPath();
        context.ellipse(x, y, 2 + ripple.age * 23 * ripple.strength, 0.6 + ripple.age * 3, 0, 0, Math.PI * 2);
        context.stroke();
        if (ripple.age < 0.3) {
          const jump = Math.sin(ripple.age / 0.3 * Math.PI) * 7 * ripple.strength;
          context.fillStyle = light ? "rgba(73,130,175,.65)" : "rgba(182,224,249,.8)";
          for (const direction of [-1, 1]) {
            context.beginPath();
            context.arc(x + direction * ripple.age * 15, y - jump, 0.9, 0, Math.PI * 2);
            context.fill();
          }
        }
      }

      if (snowDepth > 0.1) {
        const snow = context.createLinearGradient(0, height - 42, 0, height);
        snow.addColorStop(0, light ? "rgba(255,255,255,1)" : "rgba(244,250,255,.98)");
        snow.addColorStop(0.55, light ? "rgba(229,241,251,.98)" : "rgba(216,234,249,.94)");
        snow.addColorStop(1, light ? "rgba(180,207,230,.98)" : "rgba(151,187,218,.92)");
        context.globalAlpha = Math.min(snowDepth / 3, 1);
        context.fillStyle = snow;
        context.strokeStyle = light ? "rgba(111,153,190,.85)" : "rgba(250,253,255,1)";
        context.lineWidth = 1.8;
        context.beginPath();
        context.moveTo(0, height);
        for (let x = 0; x <= width + 4; x += 4) context.lineTo(x, snowLine(x));
        context.lineTo(width, height);
        context.closePath();
        context.fill();
        context.beginPath();
        for (let x = 0; x <= width + 4; x += 4) {
          if (x === 0) context.moveTo(x, snowLine(x));
          else context.lineTo(x, snowLine(x));
        }
        context.stroke();
        context.strokeStyle = light ? "rgba(255,255,255,.95)" : "rgba(238,249,255,.7)";
        context.lineWidth = 1;
        context.beginPath();
        for (let x = 0; x <= width + 4; x += 4) {
          if (x === 0) context.moveTo(x, snowLine(x) + 3);
          else context.lineTo(x, snowLine(x) + 3);
        }
        context.stroke();
      }
      context.globalAlpha = 1;
    };

    const resize = () => {
      width = element.clientWidth;
      height = element.clientHeight;
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      element.width = width * ratio;
      element.height = height * ratio;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
    };

    const draw = (time: number) => {
      const delta = running ? Math.min((time - previous) / 1000 || 0, 0.05) : 0;
      previous = time;
      elapsed += delta;
      pointer.x += (pointer.targetX - pointer.x) * Math.min(delta * 5, 1);
      pointer.y += (pointer.targetY - pointer.y) * Math.min(delta * 5, 1);
      context.clearRect(0, 0, width, height);
      const light = document.documentElement.dataset.theme === "light";
      const wind = pointer.x * 65;

      for (const weather of forecasts) {
        const targetOpacity = currentWeather.current === weather ? 1 : 0;
        opacity[weather] += (targetOpacity - opacity[weather]) * (running ? 1 - Math.exp(-delta * 3) : 1);
        if (opacity[weather] < 0.001) continue;
        context.globalAlpha = opacity[weather];

        if (weather === "sunny") {
          const sunX = width * 0.78 + pointer.x * 55 + Math.sin(elapsed * 0.45) * 18;
          const sunY = height * 0.17 + pointer.y * 35 + Math.cos(elapsed * 0.4) * 10;
          const radius = Math.max(width * 0.32, 260);
          if (!light) {
            const moonlight = context.createRadialGradient(sunX, sunY, 0, sunX, sunY, radius);
            moonlight.addColorStop(0, "rgba(161,189,224,.13)");
            moonlight.addColorStop(0.35, "rgba(131,159,202,.05)");
            moonlight.addColorStop(1, "rgba(131,159,202,0)");
            context.fillStyle = moonlight;
            context.fillRect(0, 0, width, height);
            context.fillStyle = "rgba(223,234,248,.85)";
            context.beginPath();
            context.moveTo(sunX + 7, sunY - 18);
            context.bezierCurveTo(sunX - 20, sunY - 24, sunX - 25, sunY + 15, sunX - 3, sunY + 20);
            context.bezierCurveTo(sunX + 7, sunY + 23, sunX + 16, sunY + 17, sunX + 19, sunY + 10);
            context.bezierCurveTo(sunX - 3, sunY + 16, sunX - 9, sunY - 6, sunX + 7, sunY - 18);
            context.fill();
            for (const star of particlesByWeather.sunny) {
              const x = star.x * width + pointer.x * star.depth * 6;
              const y = star.y * height * 0.72 + pointer.y * star.depth * 4;
              const twinkle = 0.55 + Math.sin(elapsed * 0.7 + star.phase) * 0.25;
              context.globalAlpha = opacity.sunny * twinkle;
              context.fillStyle = "rgba(216,231,250,.65)";
              context.beginPath();
              context.arc(x, y, star.size * 0.45, 0, Math.PI * 2);
              context.fill();
            }
            context.globalAlpha = opacity.sunny;
            continue;
          }
          const glow = context.createRadialGradient(sunX, sunY, 0, sunX, sunY, radius);
          glow.addColorStop(0, light ? "rgba(255,205,115,.32)" : "rgba(246,185,78,.18)");
          glow.addColorStop(0.3, light ? "rgba(255,218,154,.16)" : "rgba(246,185,78,.08)");
          glow.addColorStop(1, "rgba(246,185,78,0)");
          context.fillStyle = glow;
          context.fillRect(0, 0, width, height);
          for (let ray = 0; ray < 7; ray++) {
            const angle = 0.5 + ray * 0.32 + elapsed * 0.075 + Math.sin(elapsed * 0.65 + ray * 0.7) * 0.09;
            const spread = 0.065 + Math.sin(elapsed * 0.8 + ray) * 0.025;
            context.globalAlpha = opacity.sunny * (0.75 + Math.sin(elapsed * 1.1 + ray * 0.8) * 0.25);
            const beam = context.createLinearGradient(sunX, sunY, sunX + Math.cos(angle) * radius * 2, sunY + Math.sin(angle) * radius * 2);
            beam.addColorStop(0, light ? "rgba(238,181,80,.07)" : "rgba(250,213,143,.045)");
            beam.addColorStop(1, "rgba(250,213,143,0)");
            context.fillStyle = beam;
            context.beginPath();
            context.moveTo(sunX, sunY);
            context.arc(sunX, sunY, radius * 2, angle, angle + spread);
            context.closePath();
            context.fill();
          }
          context.globalAlpha = opacity.sunny;
        }

        for (const particle of particlesByWeather[weather]) {
          const speed = weather === "rainy" ? 430 : weather === "snowy" ? 42 : -8;
          const surface = weather === "snowy" ? snowLine(particle.x * width) : waterLine(particle.x * width);
          particle.y += speed * particle.depth * delta / Math.max(surface, 1);
          particle.x += (wind + (weather === "rainy" ? -35 : 7)) * particle.depth * delta / Math.max(width, 1);
          if (particle.y >= 1 && weather !== "sunny") {
            const landing = ((particle.x % 1) + 1) % 1;
            if (weather === "rainy") {
              waterDepth = Math.min(22, waterDepth + 0.04 * opacity.rainy);
              if (ripples.length < 45) ripples.push({ x: landing, age: 0, strength: particle.depth });
            } else {
              const center = Math.round(landing * (snowDrifts.length - 1));
              for (let offset = -3; offset <= 3; offset++) {
                const index = center + offset;
                if (index >= 0 && index < snowDrifts.length) snowDrifts[index] = Math.min(7, snowDrifts[index] + Math.exp(-offset * offset / 4) * 2 * opacity.snowy);
              }
            }
          }
          particle.y = (particle.y + 1) % 1;
          particle.x = (particle.x + 1) % 1;
          let x = particle.x * width + Math.sin(elapsed * 0.5 + particle.phase) * (weather === "rainy" ? 0 : 18);
          let y = particle.y * (weather === "sunny" ? height : surface);
          const distance = Math.hypot(x - pointer.localX, y - pointer.localY);
          if (running && distance > 0 && distance < 150) {
            const push = (1 - distance / 150) * 30 * particle.depth;
            x += (x - pointer.localX) / distance * push;
            y += (y - pointer.localY) / distance * push;
          }
          context.beginPath();
          if (weather === "rainy") {
            context.strokeStyle = light ? "rgba(67,103,134,.52)" : "rgba(176,211,239,.62)";
            context.lineWidth = 0.65 + particle.depth * 0.95;
            context.lineCap = "round";
            context.moveTo(x, y);
            context.lineTo(x + (wind - 35) * 0.04, Math.min(surface, y + 17 + particle.depth * 21));
            context.stroke();
          } else {
            context.fillStyle = weather === "sunny"
              ? light ? "rgba(176,130,48,.3)" : "rgba(255,222,153,.4)"
              : light ? "rgba(83,123,157,.6)" : "rgba(237,247,255,.88)";
            context.arc(x, y, particle.size * (weather === "sunny" ? 0.65 : 1.4), 0, Math.PI * 2);
            context.fill();
          }
        }
      }
      context.globalAlpha = 1;
      drawSurface(light, delta);
      if (running && !document.hidden) frame = requestAnimationFrame(draw);
    };

    const restart = () => {
      cancelAnimationFrame(frame);
      previous = 0;
      if (!document.hidden) draw(performance.now());
    };
    const move = (event: PointerEvent) => {
      if (!running || event.pointerType === "touch") return;
      const bounds = section.getBoundingClientRect();
      pointer.localX = event.clientX - bounds.left;
      pointer.localY = event.clientY - bounds.top;
      pointer.targetX = pointer.localX / Math.max(width, 1) * 2 - 1;
      pointer.targetY = pointer.localY / Math.max(height, 1) * 2 - 1;
    };
    const leave = () => {
      pointer.targetX = pointer.targetY = 0;
      pointer.localX = pointer.localY = -1000;
    };
    const observer = new ResizeObserver(() => { resize(); restart(); });
    const themeObserver = new MutationObserver(restart);
    observer.observe(element);
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    section.addEventListener("pointermove", move, { passive: true });
    section.addEventListener("pointerleave", leave);
    document.addEventListener("visibilitychange", restart);
    resize();
    restart();
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      themeObserver.disconnect();
      section.removeEventListener("pointermove", move);
      section.removeEventListener("pointerleave", leave);
      document.removeEventListener("visibilitychange", restart);
    };
  }, [running]);

  return <div className="weather-background" data-weather={weather} aria-hidden="true">
      {forecasts.map(item => <div key={item} className={`weather-wash weather-wash-${item} ${weather === item ? "is-visible" : ""}`} />)}
      <canvas ref={canvas} className="weather-canvas" />
    </div>;
}
