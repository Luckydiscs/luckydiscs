import { Youtube } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";

// Esitellyt YouTube-videot (Vesan toimittamat). Käytetään etusivulla + /discs-sivulla.
const FEATURED_VIDEOS = [
  { id: "7K99391BuGE", start: 3, title: "Lucky Discs – frisbeegolfvideo 1" },
  { id: "rwQNWo8m1UU", start: 5, title: "Lucky Discs – frisbeegolfvideo 2" },
  { id: "fOsTRQ61z2s", start: 31, title: "Lucky Discs – frisbeegolfvideo 3" },
];

const FeaturedVideos = ({ className = "" }: { className?: string }) => {
  const { t } = useTranslation();
  return (
    <section className={`py-12 md:py-16 bg-gradient-to-b from-black to-gray-900 ${className}`}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 md:mb-10 max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-heading text-white mb-3">{t("social.videoHighlight")}</h2>
          <p className="text-gray-300">{t("social.videoDesc")}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {FEATURED_VIDEOS.map((video) => (
            <div
              key={video.id}
              className="rounded-xl overflow-hidden border border-white/10 bg-black shadow-lg hover:border-lucky-green/40 transition-colors duration-300"
            >
              <div className="aspect-video">
                <iframe
                  className="w-full h-full"
                  src={`https://www.youtube-nocookie.com/embed/${video.id}?start=${video.start}&rel=0`}
                  title={video.title}
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <a
            href="https://www.youtube.com/@LuckyDiscs"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-lucky-green text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-black transition-colors duration-300"
          >
            <Youtube className="w-5 h-5" />
            {t("social.watchVideos")}
          </a>
        </div>
      </div>
    </section>
  );
};

export default FeaturedVideos;
