import {
  AbsoluteFill,
  Audio,
  Img,
  Sequence,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
  spring,
  staticFile,
} from "remotion";
import React from "react";

// ─── Konstanta ──────────────────────────────────────────────────
const FPS = 30;
const PRIMARY = "#0ff";
const ACCENT = "#f0f";
const BG_DARK = "#03050f";
const GOLD = "#fbbf24";

// Teks narasi per segmen (sesuai skrip)
const SEGMENTS = [
  {
    id: "opening",
    start: 0,
    end: 10,
    title: "Selamat Datang",
    subtitle: "Swashopping & Customer Vision",
    zone: null,
    body: "Ekosistem inovasi mutakhir yang mengubah toko eceran dan grosir Anda menjadi pusat perbelanjaan pintar, otomatis, dan sepenuhnya berbasis data.",
    icon: "🌐",
    color: "#6366f1",
    accent: "#818cf8",
  },
  {
    id: "zona1",
    start: 11,
    end: 25,
    title: "ZONA 1",
    subtitle: "Kedatangan & Identifikasi",
    zone: "Arrival & Identification",
    body: "Face Capture cerdas dan pemindai RFID tersembunyi mendeteksi identitas pengunjung otomatis. Pelanggan baru langsung terdaftar di database — masuk toko tanpa hambatan.",
    icon: "👁️",
    color: "#06b6d4",
    accent: "#22d3ee",
  },
  {
    id: "zona2",
    start: 26,
    end: 45,
    title: "ZONA 2",
    subtitle: "Eksplorasi & Interaksi",
    zone: "Browsing & Interaction",
    body: "Kamera AI menganalisis pergerakan & dwell time pelanggan. Perekam suara otomatis menangkap percakapan dengan staf — setiap pertanyaan menjadi data evaluasi berharga.",
    icon: "🎯",
    color: "#8b5cf6",
    accent: "#a78bfa",
  },
  {
    id: "zona3",
    start: 46,
    end: 55,
    title: "ZONA 3",
    subtitle: "Kasir Cerdas",
    zone: "Checkout with OCR Vision",
    body: "Teknologi OCR Vision mendeteksi jenis & jumlah barang secara instan langsung dari meja kasir — tanpa scan barcode satu per satu. Proses belanja lebih cepat.",
    icon: "💳",
    color: "#10b981",
    accent: "#34d399",
  },
  {
    id: "zona4",
    start: 56,
    end: 70,
    title: "ZONA 4",
    subtitle: "Logika Sistem Backend",
    zone: "Auto-Tiering & Loyalty",
    body: "5 kunjungan + Rp 500rb belanja = Member Basic otomatis aktif. Sistem mencatat setiap transaksi dan memberikan benefit loyalitas tanpa repot.",
    icon: "⚙️",
    color: "#f59e0b",
    accent: "#fbbf24",
  },
  {
    id: "zona5",
    start: 71,
    end: 85,
    title: "ZONA 5",
    subtitle: "Dasbor Analitik",
    zone: "Business Insights",
    body: "Laporan real-time komprehensif: pola perilaku pembeli, barang paling diminati, rata-rata nilai transaksi. Data untuk mengoptimalkan stok dan strategi penjualan.",
    icon: "📊",
    color: "#ec4899",
    accent: "#f472b6",
  },
  {
    id: "closing",
    start: 86,
    end: 95,
    title: "Masa Depan Ritel",
    subtitle: "Swashopping & Customer Vision",
    zone: null,
    body: "Tidak hanya melayani pelanggan. Anda mempelajari mereka, memanjakan mereka, dan membawa bisnis ritel Anda selangkah lebih maju ke masa depan.",
    icon: "🚀",
    color: "#6366f1",
    accent: "#818cf8",
  },
];

// ─── Komponen Teks Animasi ──────────────────────────────────────
const AnimatedText: React.FC<{
  text: string;
  frame: number;
  startFrame: number;
  style?: React.CSSProperties;
  delay?: number;
}> = ({ text, frame, startFrame, style, delay = 0 }) => {
  const relFrame = frame - startFrame - delay;
  const opacity = interpolate(relFrame, [0, 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const translateY = interpolate(relFrame, [0, 15], [20, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        opacity,
        transform: `translateY(${translateY}px)`,
        ...style,
      }}
    >
      {text}
    </div>
  );
};

// ─── Komponen Kartu Zona ────────────────────────────────────────
const ZoneCard: React.FC<{
  segment: (typeof SEGMENTS)[0];
  frame: number;
  startFrame: number;
}> = ({ segment, frame, startFrame }) => {
  const relFrame = frame - startFrame;
  const duration = (segment.end - segment.start) * FPS;

  // Progress bar
  const progress = interpolate(relFrame, [0, duration], [0, 100], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Slide in dari kiri
  const slideX = interpolate(relFrame, [0, 20], [-120, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Glow pulse effect
  const glow = interpolate(
    Math.sin(relFrame * 0.05),
    [-1, 1],
    [0.3, 0.8]
  );

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${BG_DARK} 0%, #0a0f1e 50%, #060a14 100%)`,
        fontFamily: "'Inter', 'Segoe UI', sans-serif",
        overflow: "hidden",
      }}
    >
      {/* Background image dengan overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url(${staticFile("store-hero.png")})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.08,
          filter: "blur(2px) saturate(0.5)",
        }}
      />

      {/* Gradient overlay kiri ke kanan */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `linear-gradient(to right, rgba(3,5,15,0.97) 45%, rgba(3,5,15,0.75) 100%)`,
        }}
      />

      {/* Decorative grid lines */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(6,182,212,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,0.03) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      {/* Accent circle kanan */}
      <div
        style={{
          position: "absolute",
          right: -100,
          top: "50%",
          transform: "translateY(-50%)",
          width: 700,
          height: 700,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${segment.color}22 0%, transparent 70%)`,
          opacity: glow,
        }}
      />

      {/* Content */}
      <div
        style={{
          position: "absolute",
          left: 120,
          top: "50%",
          transform: `translate(${slideX}px, -50%)`,
          maxWidth: 900,
        }}
      >
        {/* Zone badge */}
        {segment.zone && (
          <AnimatedText
            text={segment.zone.toUpperCase()}
            frame={frame}
            startFrame={startFrame}
            delay={0}
            style={{
              fontSize: 16,
              fontWeight: 700,
              letterSpacing: "0.3em",
              color: segment.accent,
              fontFamily: "'JetBrains Mono', monospace",
              marginBottom: 16,
              paddingLeft: 4,
            }}
          />
        )}

        {/* Icon + Title */}
        <div style={{ display: "flex", alignItems: "center", gap: 24, marginBottom: 16 }}>
          <AnimatedText
            text={segment.icon}
            frame={frame}
            startFrame={startFrame}
            delay={3}
            style={{ fontSize: 64 }}
          />
          <AnimatedText
            text={segment.title}
            frame={frame}
            startFrame={startFrame}
            delay={5}
            style={{
              fontSize: segment.id === "opening" || segment.id === "closing" ? 56 : 72,
              fontWeight: 900,
              color: "#ffffff",
              lineHeight: 1,
              letterSpacing: "-0.02em",
            }}
          />
        </div>

        {/* Subtitle */}
        <AnimatedText
          text={segment.subtitle}
          frame={frame}
          startFrame={startFrame}
          delay={8}
          style={{
            fontSize: 28,
            fontWeight: 600,
            color: segment.accent,
            marginBottom: 32,
          }}
        />

        {/* Divider */}
        <div
          style={{
            width: interpolate(relFrame, [8, 25], [0, 120], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
            height: 3,
            background: `linear-gradient(90deg, ${segment.color}, transparent)`,
            borderRadius: 2,
            marginBottom: 28,
          }}
        />

        {/* Body text */}
        <AnimatedText
          text={segment.body}
          frame={frame}
          startFrame={startFrame}
          delay={12}
          style={{
            fontSize: 22,
            color: "rgba(255,255,255,0.78)",
            lineHeight: 1.75,
            maxWidth: 820,
            fontWeight: 400,
          }}
        />
      </div>

      {/* Progress bar bawah */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 4,
          background: "rgba(255,255,255,0.07)",
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${progress}%`,
            background: `linear-gradient(90deg, ${segment.color}, ${segment.accent})`,
            transition: "none",
          }}
        />
      </div>

      {/* Watermark bawah kanan */}
      <div
        style={{
          position: "absolute",
          bottom: 32,
          right: 60,
          fontSize: 16,
          color: "rgba(255,255,255,0.2)",
          fontFamily: "'JetBrains Mono', monospace",
          letterSpacing: "0.15em",
        }}
      >
        SWASHOPPING × CUSTOMER VISION
      </div>

      {/* Nomor zona kanan atas */}
      {segment.zone && (
        <div
          style={{
            position: "absolute",
            top: 60,
            right: 80,
            fontSize: 140,
            fontWeight: 900,
            color: `${segment.color}12`,
            lineHeight: 1,
            fontFamily: "'Inter', sans-serif",
            userSelect: "none",
          }}
        >
          {SEGMENTS.findIndex((s) => s.id === segment.id)}
        </div>
      )}
    </AbsoluteFill>
  );
};

// ─── Komponen Opening/Closing Khusus ───────────────────────────
const HeroScene: React.FC<{
  segment: (typeof SEGMENTS)[0];
  frame: number;
  startFrame: number;
  isClosing?: boolean;
}> = ({ segment, frame, startFrame, isClosing = false }) => {
  const relFrame = frame - startFrame;
  const duration = (segment.end - segment.start) * FPS;

  // Ken Burns effect pada gambar
  const scale = interpolate(relFrame, [0, duration], [1.0, 1.08], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const opacity = interpolate(
    relFrame,
    [0, 10, duration - 15, duration],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const titleScale = spring({
    frame: relFrame - 5,
    fps: FPS,
    config: { damping: 15, stiffness: 80, mass: 1 },
  });

  return (
    <AbsoluteFill
      style={{
        fontFamily: "'Inter', 'Segoe UI', sans-serif",
        overflow: "hidden",
        opacity,
      }}
    >
      {/* Background gambar utama */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          transform: `scale(${scale})`,
          transformOrigin: "center center",
        }}
      >
        <img
          src={staticFile("store-hero.png")}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
          alt="Store"
        />
      </div>

      {/* Dark overlay gradient */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: isClosing
            ? "linear-gradient(to top, rgba(3,5,15,0.95) 0%, rgba(3,5,15,0.7) 50%, rgba(3,5,15,0.4) 100%)"
            : "linear-gradient(to bottom, rgba(3,5,15,0.5) 0%, rgba(3,5,15,0.85) 60%, rgba(3,5,15,0.97) 100%)",
        }}
      />

      {/* Content center */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: isClosing ? "flex-end" : "center",
          padding: isClosing ? "0 80px 120px" : "0 80px",
          textAlign: "center",
        }}
      >
        {/* Top badge */}
        {!isClosing && (
          <div
            style={{
              fontSize: 14,
              fontWeight: 700,
              letterSpacing: "0.4em",
              color: "#06b6d4",
              fontFamily: "'JetBrains Mono', monospace",
              marginBottom: 32,
              opacity: interpolate(relFrame, [10, 25], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }),
              transform: `translateY(${interpolate(relFrame, [10, 25], [20, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}px)`,
            }}
          >
            ▶ ERA BARU DUNIA RITEL
          </div>
        )}

        {/* Main title */}
        <div
          style={{
            transform: `scale(${titleScale})`,
            marginBottom: 24,
          }}
        >
          <div
            style={{
              fontSize: isClosing ? 72 : 88,
              fontWeight: 900,
              color: "#ffffff",
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
              textShadow: "0 0 80px rgba(99,102,241,0.5)",
            }}
          >
            {isClosing ? "Masa Depan" : "SWASHOPPING"}
          </div>
          {!isClosing && (
            <div
              style={{
                fontSize: 48,
                fontWeight: 900,
                background: "linear-gradient(90deg, #06b6d4, #8b5cf6, #ec4899)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                letterSpacing: "-0.02em",
              }}
            >
              × CUSTOMER VISION
            </div>
          )}
          {isClosing && (
            <div
              style={{
                fontSize: 48,
                fontWeight: 700,
                color: "#818cf8",
                marginTop: 8,
              }}
            >
              Ada di Genggaman Anda
            </div>
          )}
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: 22,
            color: "rgba(255,255,255,0.75)",
            maxWidth: 800,
            lineHeight: 1.65,
            opacity: interpolate(relFrame, [20, 35], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
            transform: `translateY(${interpolate(relFrame, [20, 35], [20, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}px)`,
          }}
        >
          {segment.body}
        </div>

        {/* CTA untuk closing */}
        {isClosing && (
          <div
            style={{
              marginTop: 40,
              fontSize: 18,
              fontWeight: 600,
              color: "#06b6d4",
              letterSpacing: "0.2em",
              fontFamily: "'JetBrains Mono', monospace",
              opacity: interpolate(relFrame, [30, 50], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }),
            }}
          >
            swashopping.id × customervision.id
          </div>
        )}
      </div>

      {/* Watermark */}
      <div
        style={{
          position: "absolute",
          bottom: 28,
          right: 60,
          fontSize: 14,
          color: "rgba(255,255,255,0.18)",
          fontFamily: "'JetBrains Mono', monospace",
          letterSpacing: "0.15em",
        }}
      >
        SWASHOPPING × CUSTOMER VISION
      </div>
    </AbsoluteFill>
  );
};

// ─── Komponen Utama Video ───────────────────────────────────────
export const SwashoppingVideo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill style={{ background: BG_DARK }}>
      {SEGMENTS.map((segment) => {
        const startFrame = segment.start * FPS;
        const endFrame = segment.end * FPS;
        const isOpening = segment.id === "opening";
        const isClosing = segment.id === "closing";
        const isHero = isOpening || isClosing;

        return (
          <Sequence
            key={segment.id}
            from={startFrame}
            durationInFrames={endFrame - startFrame + FPS} // tambah 30f buffer fade
          >
            {isHero ? (
              <HeroScene
                segment={segment}
                frame={frame}
                startFrame={startFrame}
                isClosing={isClosing}
              />
            ) : (
              <ZoneCard
                segment={segment}
                frame={frame}
                startFrame={startFrame}
              />
            )}
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
};
