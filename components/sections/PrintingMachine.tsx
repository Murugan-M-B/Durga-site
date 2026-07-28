"use client";

import { motion, useTransform, useSpring, type MotionValue } from "framer-motion";

interface Props {
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
}

export function PrintingMachine({ mouseX, mouseY }: Props) {
  // Subtle rotation limits (2-3 degrees) for high-end luxury feel
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-3, 3]);
  const rotateX = useTransform(mouseY, [-0.5, 0.5], [1.5, -1.5]);
  const sRotateY = useSpring(rotateY, { stiffness: 45, damping: 20 });
  const sRotateX = useSpring(rotateX, { stiffness: 45, damping: 20 });

  // Layered 3D Parallax: Front layers shift more than back layers
  const sChassisX = useSpring(useTransform(mouseX, [-0.5, 0.5], [-3, 3]), { stiffness: 50, damping: 22 });
  const sChassisY = useSpring(useTransform(mouseY, [-0.5, 0.5], [-1.5, 1.5]), { stiffness: 50, damping: 22 });

  const sTowersX = useSpring(useTransform(mouseX, [-0.5, 0.5], [-7, 7]), { stiffness: 45, damping: 18 });
  const sTowersY = useSpring(useTransform(mouseY, [-0.5, 0.5], [-3.5, 3.5]), { stiffness: 45, damping: 18 });

  const sForeX = useSpring(useTransform(mouseX, [-0.5, 0.5], [-12, 12]), { stiffness: 40, damping: 16 });
  const sForeY = useSpring(useTransform(mouseY, [-0.5, 0.5], [-6, 6]), { stiffness: 40, damping: 16 });

  // Light source is stationary, so shadow moves opposite to the chassis
  const sShadowX = useSpring(useTransform(mouseX, [-0.5, 0.5], [10, -10]), { stiffness: 45, damping: 20 });

  // 8-color unit data
  const units = [
    { color: "#00CFFF", ink: "#0EA5E9", inkH: 52 },
    { color: "#FF6B00", ink: "#F97316", inkH: 64 },
    { color: "#FF0077", ink: "#EC4899", inkH: 48 },
    { color: "#7C3AED", ink: "#8B5CF6", inkH: 58 },
    { color: "#059669", ink: "#10B981", inkH: 70 },
    { color: "#FBBF24", ink: "#F59E0B", inkH: 42 },
    { color: "#DC2626", ink: "#EF4444", inkH: 60 },
    { color: "#1E3A5F", ink: "#3B82F6", inkH: 55 },
  ];

  return (
    <motion.div
      className="relative w-full h-full flex items-center justify-center select-none"
      style={{ perspective: "1500px" }}
    >
      <motion.div
        style={{ transformStyle: "preserve-3d", rotateY: sRotateY, rotateX: sRotateX }}
        className="w-full"
      >
        <svg
          viewBox="0 0 900 520"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto drop-shadow-[0_20px_50px_rgba(0,0,0,0.15)]"
          aria-label="CPC 8-Color Premium Offset Printing Machine"
        >
          <defs>
            {/* Metallic chassis render gradient */}
            <linearGradient id="mg-chassis" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3A3A3D" />
              <stop offset="15%" stopColor="#252528" />
              <stop offset="70%" stopColor="#141416" />
              <stop offset="100%" stopColor="#0B0B0C" />
            </linearGradient>

            {/* Premium rim highlights */}
            <linearGradient id="mg-rail" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#55555A" />
              <stop offset="30%" stopColor="#2D2D32" />
              <stop offset="100%" stopColor="#16161A" />
            </linearGradient>

            <linearGradient id="mg-red" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#C2410C" />
              <stop offset="50%" stopColor="#EF4444" />
              <stop offset="100%" stopColor="#DC2626" />
            </linearGradient>

            {/* High-end matte black control console screen */}
            <linearGradient id="mg-screen" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#080E18" />
              <stop offset="100%" stopColor="#020408" />
            </linearGradient>

            {/* 3D Floor shadow radial gradient */}
            <radialGradient id="mg-floor-grad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgba(0,0,0,0.4)" />
              <stop offset="60%" stopColor="rgba(0,0,0,0.15)" />
              <stop offset="100%" stopColor="rgba(0,0,0,0)" />
            </radialGradient>

            {/* Soft background ambient halo (Spotlight) */}
            <radialGradient id="mg-spotlight" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgba(255,255,255,0.7)" />
              <stop offset="60%" stopColor="rgba(255,255,255,0.15)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0)" />
            </radialGradient>

            {/* 15s Reflection sweep gradient */}
            <linearGradient id="mg-sweep" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="white" stopOpacity="0" />
              <stop offset="35%" stopColor="white" stopOpacity="0" />
              <stop offset="50%" stopColor="white" stopOpacity="0.18" />
              <stop offset="65%" stopColor="white" stopOpacity="0" />
              <stop offset="100%" stopColor="white" stopOpacity="0" />
            </linearGradient>

            {/* Floor reflection gradient mask */}
            <linearGradient id="reflection-fade" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="white" stopOpacity="0.22" />
              <stop offset="45%" stopColor="white" stopOpacity="0.08" />
              <stop offset="100%" stopColor="white" stopOpacity="0" />
            </linearGradient>
            <mask id="reflection-mask">
              <rect x="0" y="446" width="900" height="120" fill="url(#reflection-fade)" />
            </mask>

            {/* Drop shadow filter */}
            <filter id="mg-shadow" x="-10%" y="-10%" width="120%" height="130%">
              <feDropShadow dx="0" dy="12" stdDeviation="16" floodColor="#000" floodOpacity="0.55" />
            </filter>
          </defs>

          {/* ── BACKGROUND SPOTLIGHT HALO ── */}
          <ellipse cx="450" cy="300" rx="380" ry="160" fill="url(#mg-spotlight)" opacity="0.65" />

          {/* ── DYNAMIC SHIFTING FLOOR SHADOW ── */}
          <motion.ellipse
            cx="450"
            cy="476"
            rx="410"
            ry="24"
            fill="url(#mg-floor-grad)"
            style={{ x: sShadowX }}
          />
          <motion.ellipse
            cx="450"
            cy="476"
            rx="330"
            ry="12"
            fill="rgba(0,0,0,0.5)"
            style={{ x: sShadowX }}
          />

          {/* ── FLOOR REFLECTION (Mirrored & Faded) ── */}
          <g mask="url(#reflection-mask)" opacity="0.45" transform="translate(0, 892) scale(1, -1)">
             <rect x="55" y="250" width="740" height="198" rx="8" fill="url(#mg-chassis)" />
             <rect x="55" y="238" width="740" height="18" rx="4" fill="url(#mg-rail)" />
             <rect x="55" y="240" width="740" height="3" rx="1" fill="url(#mg-red)" opacity="0.9" />
             {units.map(({ color }, i) => {
               const x = 68 + i * 86;
               return (
                 <g key={i}>
                   <rect x={x} y="90" width="74" height="162" rx="4" fill={`color-mix(in srgb, ${color} 10%, #17171A)`} />
                   <rect x={x} y="90" width="74" height="162" rx="4" fill="url(#mg-rail)" opacity="0.12" />
                 </g>
               );
             })}
          </g>

          {/* ── SHADOW FILTER LAYER FOR CHASSIS ── */}
          <g filter="url(#mg-shadow)">

            {/* ════ LAYER 1: BACKGROUND CHASSIS (Deep Parallax) ════ */}
            <motion.g style={{ x: sChassisX, y: sChassisY }}>
              {/* Feet (firmly grounded visual contact) */}
              {[90, 210, 350, 490, 630, 760].map((x, i) => (
                <g key={i}>
                  <rect x={x} y="446" width="42" height="18" rx="4" fill="#0E0E10" />
                  <rect x={x + 3} y="445" width="36" height="3" rx="1.5" fill="#EF4444" opacity="0.4" />
                </g>
              ))}

              {/* Main Machine Chassis Base */}
              <rect x="55" y="250" width="740" height="198" rx="8" fill="url(#mg-chassis)" />

              {/* Top rim highlight rail */}
              <rect x="55" y="238" width="740" height="18" rx="4" fill="url(#mg-rail)" />
              <line x1="55" y1="239" x2="795" y2="239" stroke="rgba(255,255,255,0.18)" strokeWidth="1" />

              {/* Bottom chassis sill */}
              <rect x="55" y="432" width="740" height="16" rx="3" fill="#131316" />

              {/* Red brand horizontal stripe */}
              <rect x="55" y="240" width="740" height="3" rx="1" fill="url(#mg-red)" opacity="0.9" />

              {/* Ventilation grilles for heat dissipation */}
              {[120, 200, 280, 360].map((x, i) => (
                <g key={i}>
                  {[0, 1, 2, 3].map(j => (
                    <rect
                      key={j}
                      x={x}
                      y={362 + j * 8}
                      width="54"
                      height="2.5"
                      rx="1"
                      fill="rgba(255,255,255,0.035)"
                      stroke="rgba(0,0,0,0.4)"
                      strokeWidth="0.5"
                    />
                  ))}
                </g>
              ))}
            </motion.g>

            {/* ════ LAYER 2: MIDDLE TOWERS (Medium Parallax) ════ */}
            <motion.g style={{ x: sTowersX, y: sTowersY }}>
              {units.map(({ color, ink, inkH }, i) => {
                const x = 68 + i * 86;
                return (
                  <g key={i}>
                    {/* Tower Tower Body */}
                    <rect
                      x={x}
                      y="90"
                      width="74"
                      height="162"
                      rx="4"
                      fill={`color-mix(in srgb, ${color} 10%, #17171A)`}
                      stroke="rgba(255,255,255,0.05)"
                      strokeWidth="1"
                    />

                    {/* Gloss Reflection sheen on towers */}
                    <rect x={x} y="90" width="74" height="162" rx="4" fill="url(#mg-rail)" opacity="0.12" />

                    {/* Colored rim top band indicator */}
                    <rect x={x} y="90" width="74" height="6" rx="3" fill={color} opacity="0.8" />
                    <line x1={x} y1="96" x2={x + 74} y2="96" stroke="rgba(255,255,255,0.15)" strokeWidth="0.75" />

                    {/* Ink well container */}
                    <rect x={x + 8} y="108" width="22" height="78" rx="2" fill="#0C0C0E" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" />
                    
                    {/* Dynamic moving ink levels */}
                    <motion.rect
                      x={x + 9}
                      width="20"
                      rx="1.5"
                      fill={ink}
                      opacity="0.8"
                      initial={{ height: inkH - 8, y: 109 + (76 - (inkH - 8)) }}
                      animate={{
                        height: [inkH - 6, inkH + 4, inkH - 6],
                        y: [109 + (76 - (inkH - 6)), 109 + (76 - (inkH + 4)), 109 + (76 - (inkH - 6))],
                      }}
                      transition={{
                        duration: 4.5 + (i * 0.4),
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />

                    {/* Ink well tick marks */}
                    {[120, 134, 148, 162, 176].map((tickY, j) => (
                      <rect key={j} x={x + 33} y={tickY} width={j % 2 === 0 ? "24" : "18"} height="1.5" rx="0.5" fill="rgba(255,255,255,0.08)" />
                    ))}

                    {/* 3D cylinder rollers */}
                    <ellipse cx={x + 37} cy="232" rx="32" ry="9" fill="#0A0A0C" />
                    <ellipse cx={x + 37} cy="226" rx="32" ry="9" fill="#18181B" />
                    <ellipse cx={x + 37} cy="220" rx="32" ry="9" fill="#202024" stroke="rgba(255,255,255,0.04)" strokeWidth="0.5" />
                    
                    {/* Animated reflection highlights on rollers */}
                    <motion.ellipse
                      cx={x + 37}
                      rx="20"
                      ry="2.5"
                      fill="rgba(255,255,255,0.09)"
                      animate={{
                        cy: [218, 221, 218],
                        opacity: [0.06, 0.14, 0.06],
                      }}
                      transition={{
                        duration: 3 + (i % 3) * 0.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />

                    {/* Bottom active LED state lights */}
                    <rect x={x + 8} y="244" width="58" height="2" rx="1" fill={ink} opacity="0.6" />

                    {/* Unit Number Label */}
                    <text
                      x={x + 37}
                      y="204"
                      textAnchor="middle"
                      fontSize="9"
                      fill="rgba(255,255,255,0.3)"
                      fontFamily="monospace"
                      letterSpacing="0.75"
                    >
                      {`UNIT ${i + 1}`}
                    </text>
                  </g>
                );
              })}
            </motion.g>

            {/* ════ LAYER 3: FOREGROUND CONTROLS & PAPER FLOW (Close Parallax) ════ */}
            <motion.g style={{ x: sForeX, y: sForeY }}>
              {/* Paper Feeder Tray (Left) */}
              <rect x="3" y="255" width="58" height="126" rx="6" fill="#16161A" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
              <rect x="3" y="255" width="58" height="8" rx="3" fill="#202024" />
              <text x="32" y="271" textAnchor="middle" fontSize="6.5" fill="rgba(255,255,255,0.4)" fontFamily="monospace" letterSpacing="0.5">INPUT</text>
              
              {/* Feeder paper stack (Embossed edges) */}
              {[0, 1, 2, 3, 4, 5].map(i => (
                <rect
                  key={i}
                  x={10 + i * 0.4}
                  y={282 + i * 1.5}
                  width="44"
                  height="66"
                  rx="1"
                  fill={`rgba(248, 246, 240, ${0.95 - i * 0.08})`}
                  stroke="rgba(0,0,0,0.06)"
                  strokeWidth="0.5"
                />
              ))}
              {/* Feeder roller wheel */}
              <ellipse cx="32" cy="350" rx="18" ry="5" fill="#0C0C0E" />
              <ellipse cx="32" cy="347" rx="18" ry="5" fill="#1C1C20" />

              {/* Paper Delivery Tray (Right) */}
              <rect x="839" y="255" width="58" height="126" rx="6" fill="#16161A" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
              <rect x="839" y="255" width="58" height="8" rx="3" fill="#202024" />
              <text x="868" y="271" textAnchor="middle" fontSize="6.5" fill="rgba(255,255,255,0.4)" fontFamily="monospace" letterSpacing="0.5">OUTPUT</text>
              
              {/* Output papers with printed colors */}
              {[0, 1, 2, 3].map(i => (
                <rect
                  key={i}
                  x={846 + i * 0.4}
                  y={282 + i * 2}
                  width="44"
                  height="66"
                  rx="1"
                  fill={`rgba(250, 248, 242, ${0.9 - i * 0.08})`}
                  stroke="rgba(0,0,0,0.06)"
                  strokeWidth="0.5"
                />
              ))}
              {/* Simulated printed text columns on output sheet */}
              <rect x="849" y="284" width="38" height="2" rx="0.5" fill="#DC2626" opacity="0.35" />
              <rect x="849" y="290" width="28" height="1.5" rx="0.5" fill="#3B82F6" opacity="0.3" />
              <rect x="849" y="296" width="34" height="1.5" rx="0.5" fill="#059669" opacity="0.25" />

              {/* Main CPC Operator Console Panel */}
              <rect x="720" y="244" width="70" height="178" rx="6" fill="#111113" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />

              {/* Display Bezel */}
              <rect x="726" y="252" width="58" height="74" rx="4" fill="#070708" />
              {/* Dynamic screen UI */}
              <rect x="729" y="255" width="52" height="68" rx="2.5" fill="url(#mg-screen)" />
              <rect x="729" y="255" width="52" height="68" rx="2.5" fill="none" stroke="#2563EB" strokeWidth="0.5" opacity="0.6" />

              {/* Graphical diagnostic line plots */}
              {[0, 1, 2, 3, 4].map(i => (
                <g key={i}>
                  <rect
                    x={733}
                    y={260 + i * 11}
                    width={i % 2 === 0 ? 32 : 24}
                    height="1.5"
                    rx="0.5"
                    fill={["#3B82F6", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6"][i]}
                    opacity="0.8"
                  />
                  <circle
                    cx={733 + (i % 2 === 0 ? 32 : 24)}
                    cy={261 + i * 11}
                    r="1"
                    fill={["#3B82F6", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6"][i]}
                    className="animate-pulse"
                  />
                </g>
              ))}

              {/* START (GO) Button */}
              <rect x="729" y="313" width="23" height="8" rx="2" fill="#10B981" opacity="0.9" />
              <text x="740.5" y="319.5" textAnchor="middle" fontSize="5" fill="white" fontFamily="monospace" fontWeight="bold">RUN</text>

              {/* STOP Button */}
              <rect x="758" y="313" width="23" height="8" rx="2" fill="#DC2626" opacity="0.9" />
              <text x="769.5" y="319.5" textAnchor="middle" fontSize="5" fill="white" fontFamily="monospace" fontWeight="bold">STOP</text>

              {/* Micro Status Indicators */}
              <circle cx="730" cy="331" r="3" fill="#10B981" opacity="0.9" />
              <circle cx="743" cy="331" r="3" fill="#F59E0B" opacity="0.8" />
              <circle cx="756" cy="331" r="3" fill="#EF4444" opacity="0.2" />
              <circle cx="769" cy="331" r="3" fill="#3B82F6" opacity="0.8" />

              {/* Rotary dials */}
              {[0, 1, 2].map(i => (
                <g key={i}>
                  <circle cx={732 + i * 18} cy="350" r="6.5" fill="#1B1B1E" stroke="rgba(255,255,255,0.07)" strokeWidth="0.75" />
                  <circle cx={732 + i * 18} cy="350" r="1.5" fill="rgba(255,255,255,0.25)" />
                  <line
                    x1={732 + i * 18}
                    y1="344.5"
                    x2={732 + i * 18}
                    y2="347.5"
                    stroke="rgba(255,255,255,0.6)"
                    strokeWidth="1"
                    strokeLinecap="round"
                  />
                </g>
              ))}

              {/* Speed / pressure gauges */}
              <circle cx="732" cy="372" r="9" fill="none" stroke="#25252A" strokeWidth="1.5" />
              <path d="M 723.5 374 A 9 9 0 0 1 738.5 365" stroke="#10B981" strokeWidth="1.5" fill="none" />
              <line x1="732" y1="372" x2="736" y2="366" stroke="white" strokeWidth="1" strokeLinecap="round" />
              
              <circle cx="760" cy="372" r="9" fill="none" stroke="#25252A" strokeWidth="1.5" />
              <path d="M 751.5 373 A 9 9 0 0 1 768.5 373" stroke="#3B82F6" strokeWidth="1.5" fill="none" />
              <line x1="760" y1="372" x2="760" y2="364.5" stroke="white" strokeWidth="1" strokeLinecap="round" />

              {/* Thread-like paper path running through rollers */}
              <path
                d="M 58 308 C 200 300 450 312 730 305"
                stroke="rgba(255,255,255,0.09)"
                strokeWidth="1.5"
                strokeDasharray="6 4"
                fill="none"
              />
              <circle cx="58" cy="308" r="2.5" fill="#EF4444" opacity="0.6" />
              <circle cx="730" cy="305" r="2.5" fill="#10B981" opacity="0.6" />

              {/* ── FLOWING PAPER SHEET ANIMATION ── */}
              <motion.g
                initial={{ x: 24, y: 318, opacity: 0, rotate: -3 }}
                animate={{
                  x: [24, 58, 400, 730, 846],
                  y: [318, 308, 308, 308, 318],
                  opacity: [0, 1, 1, 1, 0],
                  rotate: [-3, 0, 0, 0, 3]
                }}
                transition={{
                  duration: 9,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <rect x="0" y="0" width="34" height="50" rx="1" fill="#FAF9F5" stroke="rgba(0,0,0,0.07)" strokeWidth="0.5" />
                {/* Dynamic color print lines fading in */}
                <motion.g
                  animate={{
                    opacity: [0, 0.1, 0.4, 0.95, 0.95]
                  }}
                  transition={{
                    duration: 9,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <rect x="4" y="6" width="26" height="2" rx="0.5" fill="#DC2626" />
                  <rect x="4" y="11" width="18" height="1.5" rx="0.5" fill="#3B82F6" />
                  <rect x="4" y="16" width="22" height="1.5" rx="0.5" fill="#10B981" />
                </motion.g>
              </motion.g>

              {/* Branding Plate on chassis center */}
              <rect x="420" y="380" width="120" height="26" rx="3" fill="#0C0C0E" stroke="rgba(255,255,255,0.06)" strokeWidth="0.75" />
              <text x="480" y="390" textAnchor="middle" fontSize="6.5" fill="rgba(220,38,38,0.9)" fontFamily="monospace" letterSpacing="1" fontWeight="bold">DURGA PRINTERS</text>
              <text x="480" y="401" textAnchor="middle" fontSize="5.5" fill="rgba(255,255,255,0.4)" fontFamily="monospace" letterSpacing="0.5">8-COLOR OFFSET PRO</text>
            </motion.g>
          </g>

          {/* ── 15s GLOSS REFLECTION SWEEP OVERLAY ── */}
          <motion.rect
            x="-300"
            y="0"
            width="1400"
            height="520"
            fill="url(#mg-sweep)"
            animate={{ x: [-350, 950] }}
            transition={{
              duration: 4.5,
              repeat: Infinity,
              repeatDelay: 10.5,
              ease: "easeInOut",
            }}
            className="pointer-events-none mix-blend-overlay"
          />
        </svg>
      </motion.div>
    </motion.div>
  );
}
