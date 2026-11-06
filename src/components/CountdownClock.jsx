import PropTypes from 'prop-types';
import { useEffect, useRef } from 'react';

const CountdownClock = ({ seconds, size = 180, color = '#000', alpha = 0.9 }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const scale = window.devicePixelRatio || 1;
    canvas.width = size * scale;
    canvas.height = size * scale;

    const ctx = canvas.getContext('2d');
    const radius = size / 2;
    const lineWidth = Math.max(4, radius / 8);
    const arcRadius = radius - lineWidth / 2;
    const start = performance.now();
    let frameId;

    const draw = (now) => {
      const remaining = Math.max(0, seconds - (now - start) / 1000);
      const progress = remaining / seconds;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.save();
      ctx.scale(scale, scale);
      ctx.lineWidth = lineWidth;

      ctx.beginPath();
      ctx.arc(radius, radius, arcRadius, 0, Math.PI * 2);
      ctx.strokeStyle = color;
      ctx.globalAlpha = alpha / 3;
      ctx.stroke();

      if (progress > 0) {
        ctx.beginPath();
        ctx.arc(radius, radius, arcRadius, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * progress);
        ctx.strokeStyle = color;
        ctx.globalAlpha = alpha;
        ctx.lineCap = 'round';
        ctx.stroke();
      }

      ctx.globalAlpha = alpha;
      ctx.fillStyle = color;
      ctx.font = `bold ${radius / 2.4}px Arial, sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(`${Math.ceil(remaining)}`, radius, radius);
      ctx.restore();

      if (remaining > 0) frameId = requestAnimationFrame(draw);
    };

    frameId = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(frameId);
  }, [seconds, size, color, alpha]);

  return <canvas ref={canvasRef} className="countdown-clock" style={{ width: size, height: size }} />;
};

CountdownClock.propTypes = {
  seconds: PropTypes.number.isRequired,
  size: PropTypes.number,
  color: PropTypes.string,
  alpha: PropTypes.number
};

export default CountdownClock;
