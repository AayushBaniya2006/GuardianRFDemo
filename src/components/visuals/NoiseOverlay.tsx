"use client";

export function NoiseOverlay() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-50 opacity-[0.035] mix-blend-overlay"
      style={{
        backgroundImage: `url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwBAMAAAClLOS0AAAAElBMVEUAAAAAAAAAAAAAAAAAAAAAAADgKxmiAAAABnRSTlMHFBkuPlJFwW4mAAAA3klEQVQ4y63TsQ3CQBCE0QULpAkncECDJxckuAdC4BL4UnfgBkjcAuXgC+0/shS4BN/kk1azOxpJJ7BI4lUqebNS6Wfl0dz+0mqbnmcyC+bCM5qf5sI4nD9q8tnc3WG/1Mt2pbnvef0yLtvbs7m88bgfa3N3h/1Sq0+bt3rO+/7WW7a3Z3Mfsm2zzHy3F8bhfL6pR3N3h/1SR+btXvLe/6qX7e3ZPOR9z+r63N1hv6Jf0+bJ3vNkX7a3Z/OQK5tt5pu9yAzzfJnnfOKw/88ez/IuL3KpPr/K+T+l+QKPV2NtVhMbFAAAAABJRU5ErkJggg==")`,
        backgroundRepeat: "repeat",
        backgroundSize: "64px 64px",
      }}
    />
  );
}
