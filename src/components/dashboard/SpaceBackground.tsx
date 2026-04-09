import { useEffect, useRef } from "react";

const SpaceBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Generate stars
    const stars = Array.from({ length: 200 }, () => ({
      x: Math.random(),
      y: Math.random(),
      size: Math.random() * 2 + 0.5,
      speed: Math.random() * 0.0002 + 0.0001,
      brightness: Math.random() * 0.5 + 0.5,
      twinkleSpeed: Math.random() * 0.02 + 0.005,
    }));

    // Nebula clouds
    const nebulae = [
      { x: 0.2, y: 0.3, radius: 0.25, color: "130, 80, 200" },
      { x: 0.7, y: 0.6, radius: 0.3, color: "40, 100, 180" },
      { x: 0.5, y: 0.15, radius: 0.2, color: "60, 140, 200" },
      { x: 0.85, y: 0.2, radius: 0.15, color: "180, 60, 120" },
    ];

    let time = 0;
    let animId: number;

    const render = () => {
      time += 1;
      const w = canvas.width;
      const h = canvas.height;

      // Deep space gradient
      const bg = ctx.createLinearGradient(0, 0, 0, h);
      bg.addColorStop(0, "#050510");
      bg.addColorStop(0.5, "#0a0a1a");
      bg.addColorStop(1, "#060612");
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, w, h);

      // Nebulae
      for (const n of nebulae) {
        const grad = ctx.createRadialGradient(
          n.x * w, n.y * h, 0,
          n.x * w, n.y * h, n.radius * Math.max(w, h)
        );
        const pulse = Math.sin(time * 0.005) * 0.02 + 0.08;
        grad.addColorStop(0, `rgba(${n.color}, ${pulse + 0.03})`);
        grad.addColorStop(0.5, `rgba(${n.color}, ${pulse * 0.5})`);
        grad.addColorStop(1, "transparent");
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, w, h);
      }

      // Stars
      for (const star of stars) {
        star.y = (star.y + star.speed) % 1;
        const twinkle = Math.sin(time * star.twinkleSpeed) * 0.3 + 0.7;
        const alpha = star.brightness * twinkle;
        ctx.beginPath();
        ctx.arc(star.x * w, star.y * h, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(200, 220, 255, ${alpha})`;
        ctx.fill();

        // Star glow
        if (star.size > 1.2) {
          ctx.beginPath();
          ctx.arc(star.x * w, star.y * h, star.size * 3, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(180, 210, 255, ${alpha * 0.1})`;
          ctx.fill();
        }
      }

      animId = requestAnimationFrame(render);
    };

    render();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ zIndex: 0 }}
    />
  );
};

export default SpaceBackground;
