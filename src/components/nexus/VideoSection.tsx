import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { Play, Pause, Volume2, VolumeX, Maximize } from "lucide-react";

export const VideoSection = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [showOverlay, setShowOverlay] = useState(true);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
      setShowOverlay(false);
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const toggleFullscreen = () => {
    if (!videoRef.current) return;
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      videoRef.current.requestFullscreen();
    }
  };

  const handleVideoEnd = () => {
    setIsPlaying(false);
    setShowOverlay(true);
  };

  return (
    <section className="relative bg-background py-20 md:py-28">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-4xl text-center"
        >
          <p className="text-sm font-medium uppercase tracking-wider text-primary">
            Conheça a Nexus DevHub
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Seu Departamento de Tecnologia,
            <br />
            <span className="text-gradient">sem o custo de um time interno</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground">
            Assista e descubra como empresas estão escalando seu faturamento com um
            setor digital de elite — por uma fração do investimento.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mt-12 max-w-5xl"
        >
          <div className="group relative overflow-hidden rounded-2xl border border-border bg-card shadow-card ring-1 ring-primary/10">
            <video
              ref={videoRef}
              className="aspect-video w-full cursor-pointer object-cover"
              poster="/videos/poster.jpg"
              preload="metadata"
              playsInline
              muted
              onEnded={handleVideoEnd}
              onClick={togglePlay}
              aria-label="Vídeo apresentando os serviços da Nexus DevHub"
            >
              <source src="/videos/nexus-pitch.mp4" type="video/mp4" />
              Seu navegador não suporta vídeo HTML5.
            </video>

            {/* Play overlay */}
            {showOverlay && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/40 transition-opacity duration-300">
                <button
                  onClick={togglePlay}
                  className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/90 text-primary-foreground shadow-glow backdrop-blur-sm transition-transform duration-200 hover:scale-110 active:scale-95"
                  aria-label="Reproduzir vídeo"
                >
                  <Play className="ml-1 h-8 w-8 fill-current" />
                </button>
              </div>
            )}

            {/* Controls bar */}
            <div className="absolute bottom-0 left-0 right-0 flex items-center gap-2 bg-gradient-to-t from-black/80 to-transparent px-4 py-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <button
                onClick={togglePlay}
                className="rounded-full p-2 text-white/90 transition-colors hover:bg-white/20"
                aria-label={isPlaying ? "Pausar" : "Reproduzir"}
              >
                {isPlaying ? (
                  <Pause className="h-5 w-5" />
                ) : (
                  <Play className="h-5 w-5" />
                )}
              </button>

              <button
                onClick={toggleMute}
                className="rounded-full p-2 text-white/90 transition-colors hover:bg-white/20"
                aria-label={isMuted ? "Ativar som" : "Silenciar"}
              >
                {isMuted ? (
                  <VolumeX className="h-5 w-5" />
                ) : (
                  <Volume2 className="h-5 w-5" />
                )}
              </button>

              <div className="flex-1" />

              <button
                onClick={toggleFullscreen}
                className="rounded-full p-2 text-white/90 transition-colors hover:bg-white/20"
                aria-label="Tela cheia"
              >
                <Maximize className="h-5 w-5" />
              </button>
            </div>
          </div>

          <p className="mt-4 text-center text-xs text-muted-foreground">
            1080p · Legendado · Otimizado para web
          </p>
        </motion.div>
      </div>
    </section>
  );
};
