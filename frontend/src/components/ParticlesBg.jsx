import Particles from "react-tsparticles";

export default function ParticlesBg() {
  return (
    <Particles
      options={{
        background: { color: "transparent" },
        particles: {
          number: { value: 40 },
          size: { value: 2 },
          move: { enable: true, speed: 0.5 },
          opacity: { value: 0.3 },
          links: {
            enable: true,
            distance: 120,
            color: "#22c55e",
            opacity: 0.2,
          },
        },
      }}
      style={{ position: "fixed", top: 0, left: 0, zIndex: 0 }}
    />
  );
}