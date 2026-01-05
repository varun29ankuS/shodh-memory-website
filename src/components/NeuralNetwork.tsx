"use client";

import { useEffect, useRef } from "react";

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  activation: number;
  targetActivation: number;
}

interface Edge {
  from: number;
  to: number;
  strength: number;
  targetStrength: number;
}

export function NeuralNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nodesRef = useRef<Node[]>([]);
  const edgesRef = useRef<Edge[]>([]);
  const animationRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Initialize nodes
    const nodeCount = 25;
    const nodes: Node[] = [];
    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * canvas.offsetWidth,
        y: Math.random() * canvas.offsetHeight,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        radius: 3 + Math.random() * 3,
        activation: 0,
        targetActivation: 0,
      });
    }
    nodesRef.current = nodes;

    // Initialize edges (sparse connections)
    const edges: Edge[] = [];
    for (let i = 0; i < nodeCount; i++) {
      const connectionCount = 2 + Math.floor(Math.random() * 3);
      for (let j = 0; j < connectionCount; j++) {
        const target = Math.floor(Math.random() * nodeCount);
        if (target !== i && !edges.some(e => (e.from === i && e.to === target) || (e.from === target && e.to === i))) {
          edges.push({
            from: i,
            to: target,
            strength: 0.1 + Math.random() * 0.2,
            targetStrength: 0.1 + Math.random() * 0.2,
          });
        }
      }
    }
    edgesRef.current = edges;

    // Hebbian learning simulation
    const hebbianPulse = () => {
      // Pick a random node to activate
      const seedNode = Math.floor(Math.random() * nodes.length);
      nodes[seedNode].targetActivation = 1;

      // Spread activation through edges
      setTimeout(() => {
        edges.forEach(edge => {
          if (edge.from === seedNode || edge.to === seedNode) {
            const otherNode = edge.from === seedNode ? edge.to : edge.from;
            nodes[otherNode].targetActivation = 0.7;
            // Strengthen the edge (Hebbian learning!)
            edge.targetStrength = Math.min(1, edge.strength + 0.1);
          }
        });
      }, 200);

      // Decay activation
      setTimeout(() => {
        nodes.forEach(n => n.targetActivation = 0);
      }, 1000);
    };

    // Pulse every 2-4 seconds
    const pulseInterval = setInterval(() => {
      hebbianPulse();
    }, 2000 + Math.random() * 2000);

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);

      // Update and draw edges
      edges.forEach(edge => {
        const fromNode = nodes[edge.from];
        const toNode = nodes[edge.to];

        // Lerp strength
        edge.strength += (edge.targetStrength - edge.strength) * 0.02;
        // Decay strength slowly
        edge.targetStrength = Math.max(0.1, edge.targetStrength - 0.001);

        const avgActivation = (fromNode.activation + toNode.activation) / 2;
        const alpha = 0.1 + edge.strength * 0.3 + avgActivation * 0.4;

        ctx.beginPath();
        ctx.moveTo(fromNode.x, fromNode.y);
        ctx.lineTo(toNode.x, toNode.y);
        ctx.strokeStyle = `rgba(240, 136, 62, ${alpha})`;
        ctx.lineWidth = 0.5 + edge.strength * 2;
        ctx.stroke();
      });

      // Update and draw nodes
      nodes.forEach(node => {
        // Move nodes slowly
        node.x += node.vx;
        node.y += node.vy;

        // Bounce off edges
        if (node.x < 0 || node.x > canvas.offsetWidth) node.vx *= -1;
        if (node.y < 0 || node.y > canvas.offsetHeight) node.vy *= -1;

        // Keep in bounds
        node.x = Math.max(0, Math.min(canvas.offsetWidth, node.x));
        node.y = Math.max(0, Math.min(canvas.offsetHeight, node.y));

        // Lerp activation
        node.activation += (node.targetActivation - node.activation) * 0.1;

        // Draw node
        const alpha = 0.3 + node.activation * 0.7;
        const radius = node.radius + node.activation * 4;

        // Glow effect when activated
        if (node.activation > 0.1) {
          ctx.beginPath();
          ctx.arc(node.x, node.y, radius + 8, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(240, 136, 62, ${node.activation * 0.2})`;
          ctx.fill();
        }

        ctx.beginPath();
        ctx.arc(node.x, node.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(240, 136, 62, ${alpha})`;
        ctx.fill();
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationRef.current);
      clearInterval(pulseInterval);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none opacity-60"
      style={{ zIndex: 0 }}
    />
  );
}
