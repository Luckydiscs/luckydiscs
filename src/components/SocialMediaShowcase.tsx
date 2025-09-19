import { Instagram, Facebook, Youtube, ExternalLink } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";

const SocialMediaShowcase = () => {
  const { t } = useTranslation();

  const socialPlatforms = [
    {
      name: "Instagram",
      handle: "@luckydiscsofficial", 
      url: "https://www.instagram.com/luckydiscsofficial",
      icon: Instagram,
      description: t('social.instagramDesc'),
      color: "from-pink-500 to-purple-600"
    },
    {
      name: "Facebook", 
      handle: "LuckyDiscs",
      url: "https://www.facebook.com/LuckyDiscs",
      icon: Facebook,
      description: t('social.facebookDesc'),
      color: "from-blue-600 to-blue-800"
    },
    {
      name: "YouTube",
      handle: "@LuckyDiscs", 
      url: "https://www.youtube.com/@LuckyDiscs",
      icon: Youtube,
      description: t('social.youtubeDesc'),
      color: "from-red-500 to-red-700"
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-black to-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-heading mb-4 bg-gradient-to-r from-white via-lucky-green to-white bg-clip-text text-transparent">
            {t('social.title')}
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            {t('social.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {socialPlatforms.map((platform) => {
            const IconComponent = platform.icon;
            return (
              <div key={platform.name} className="group relative">
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-300 hover:scale-105">
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${platform.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  
                  <h3 className="text-xl font-heading text-white mb-2">{platform.name}</h3>
                  <p className="text-lucky-green font-medium mb-3">{platform.handle}</p>
                  <p className="text-gray-400 text-sm mb-4 line-clamp-2">{platform.description}</p>
                  
                  <a 
                    href={platform.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-lucky-green hover:text-white transition-colors duration-300 font-medium"
                  >
                    {t('social.followUs')}
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <div className="bg-gradient-to-r from-lucky-green/20 to-transparent p-6 rounded-xl border border-lucky-green/30">
            <h3 className="text-xl font-heading text-white mb-2">{t('social.videoHighlight')}</h3>
            <p className="text-gray-300 mb-4">{t('social.videoDesc')}</p>
            <a 
              href="https://www.youtube.com/@LuckyDiscs"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-lucky-green text-black px-6 py-3 rounded-lg font-semibold hover:bg-white transition-colors duration-300"
            >
              <Youtube className="w-5 h-5" />
              {t('social.watchVideos')}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialMediaShowcase;