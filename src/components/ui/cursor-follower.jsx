import { useEffect, useRef, useState } from 'react';

export const Component = () => {
  const mousePosition = useRef({ x: 0, y: 0 });
  const dotPosition = useRef({ x: 0, y: 0 });
  const borderDotPosition = useRef({ x: 0, y: 0 });
  const dotRef = useRef(null);
  const borderDotRef = useRef(null);
  const hasMoved = useRef(false);
  const [isHovering, setIsHovering] = useState(false);
  const [hasFinePointer] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(pointer: fine)').matches,
  );

  useEffect(() => {
    if (!hasFinePointer) return undefined;

    const handleMouseMove = (event) => {
      mousePosition.current = { x: event.clientX, y: event.clientY };
      hasMoved.current = true;
    };

    const getInteractiveElement = (target) =>
      target instanceof Element ? target.closest('a, button, img, input, textarea, select') : null;

    const handlePointerOver = (event) => {
      const element = getInteractiveElement(event.target);
      if (element && !element.contains(event.relatedTarget)) setIsHovering(true);
    };

    const handlePointerOut = (event) => {
      const element = getInteractiveElement(event.target);
      if (element && !element.contains(event.relatedTarget)) setIsHovering(false);
    };

    let animationId;
    const animate = () => {
      const dot = dotPosition.current;
      const border = borderDotPosition.current;
      const mouse = mousePosition.current;

      dot.x += (mouse.x - dot.x) * 0.2;
      dot.y += (mouse.y - dot.y) * 0.2;
      border.x += (mouse.x - border.x) * 0.1;
      border.y += (mouse.y - border.y) * 0.1;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${dot.x}px, ${dot.y}px, 0) translate(-50%, -50%)`;
        dotRef.current.style.opacity = hasMoved.current ? '1' : '0';
      }
      if (borderDotRef.current) {
        borderDotRef.current.style.transform = `translate3d(${border.x}px, ${border.y}px, 0) translate(-50%, -50%)`;
        borderDotRef.current.style.opacity = hasMoved.current ? '1' : '0';
      }

      animationId = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('pointerover', handlePointerOver);
    document.addEventListener('pointerout', handlePointerOut);
    animationId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('pointerover', handlePointerOver);
      document.removeEventListener('pointerout', handlePointerOut);
      cancelAnimationFrame(animationId);
    };
  }, [hasFinePointer]);

  if (typeof window === 'undefined' || !hasFinePointer) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-60" aria-hidden="true">
      <div
        ref={dotRef}
        className="absolute left-0 top-0 rounded-full bg-black"
        style={{ width: 8, height: 8, opacity: 0 }}
      />
      <div
        ref={borderDotRef}
        className={`absolute left-0 top-0 rounded-full border border-black ${isHovering ? 'h-11 w-11' : 'h-7 w-7'}`}
        style={{ opacity: 0, transition: 'width 0.3s, height 0.3s' }}
      />
    </div>
  );
};