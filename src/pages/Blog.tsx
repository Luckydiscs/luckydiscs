import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useTranslation } from "@/hooks/useTranslation";
import { useBlogPosts } from "@/hooks/useBlogPosts";
import useSEO from "@/hooks/useSEO";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, ArrowRight, Loader2 } from "lucide-react";

const Blog = () => {
  const { t, language } = useTranslation();
  const { posts, loading } = useBlogPosts();

  useSEO({
    title:
      language === "fi"
        ? "Lucky Discs Blogi - Frisbeegolf B2B & Jälleenmyynti"
        : "Lucky Discs Blog - Disc Golf B2B & Wholesale Insights",
    description:
      language === "fi"
        ? "Lucky Discs blogi: disc golf -markkinan kasvu, jälleenmyyntivinkit ja tukkumyyntioppaat."
        : "Lucky Discs blog: disc golf market growth, retailer tips and wholesale guides.",
    keywords: "disc golf blog, frisbeegolf blogi, disc golf wholesale, jälleenmyynti, B2B disc golf",
    canonicalPath: language === "fi" ? "/blogi" : "/blog",
    structuredData: {
      "@context": "https://schema.org",
      "@type": "Blog",
      name: "Lucky Discs Blog",
      description: "Disc golf industry insights, wholesale guides and market analysis",
      url: `https://www.luckydiscs.fi/${language === "fi" ? "blogi" : "blog"}`,
      publisher: { "@type": "Organization", name: "Lucky Discs", url: "https://www.luckydiscs.fi" },
      blogPost: posts.map((post) => ({
        "@type": "BlogPosting",
        headline: post.title,
        description: post.description,
        datePublished: post.publishedAt,
        author: { "@type": "Organization", name: post.author },
        url: `https://www.luckydiscs.fi/${language === "fi" ? "blogi" : "blog"}/${post.slug}`,
      })),
    },
  });

  const basePath = language === "fi" ? "/blogi" : "/blog";

  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      <Navbar />

      <main className="flex-1">
        <section className="pt-20 sm:pt-24 md:pt-32 lg:pt-40 pb-16 bg-gradient-to-br from-black via-gray-900/50 to-black relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-lucky-green/5 to-transparent" />
          <div className="container mx-auto text-center relative z-10 px-4">
            <h1 className="text-3xl md:text-4xl lg:text-6xl font-medium mb-4 md:mb-6 bg-gradient-to-r from-white via-lucky-green to-white bg-clip-text text-transparent">
              {t("blog.title")}
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
              {t("blog.subtitle")}
            </p>
          </div>
        </section>

        <section className="py-16 px-4 bg-black">
          <div className="container mx-auto">
            <div className="max-w-4xl mx-auto space-y-8">
              {loading ? (
                <div className="flex flex-col items-center justify-center py-20 text-gray-400">
                  <Loader2 className="w-8 h-8 animate-spin text-lucky-green mb-3" />
                  Ladataan artikkeleita…
                </div>
              ) : posts.length === 0 ? (
                <div className="text-center py-20 text-gray-500">
                  Ei vielä artikkeleita. Uusia julkaisuja tulossa pian!
                </div>
              ) : (
                posts.map((post) => (
                  <Link key={post.slug} to={`${basePath}/${post.slug}`} className="block group">
                    <article className="bg-gray-900/50 rounded-lg border border-gray-800 overflow-hidden hover:border-lucky-green/50 transition-colors">
                      <div className="relative w-full aspect-[16/9] bg-black overflow-hidden">
                        <img
                          src={post.heroImage}
                          alt={post.heroAlt}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          loading="lazy"
                        />
                      </div>
                      <div className="p-6 md:p-8">
                        <div className="flex items-center gap-3 mb-4 flex-wrap">
                          {post.category && (
                            <Badge className="bg-lucky-green/20 text-lucky-green border-lucky-green text-xs">
                              {post.category}
                            </Badge>
                          )}
                          <div className="flex items-center gap-1 text-gray-400 text-sm">
                            <Calendar className="h-3.5 w-3.5" />
                            <span>{post.publishedAt}</span>
                          </div>
                          <div className="flex items-center gap-1 text-gray-400 text-sm">
                            <Clock className="h-3.5 w-3.5" />
                            <span>
                              {post.readingTime} {t("blog.minRead")}
                            </span>
                          </div>
                        </div>
                        <h2 className="text-xl md:text-2xl font-medium text-white mb-3 group-hover:text-lucky-green transition-colors">
                          {post.title}
                        </h2>
                        <p className="text-gray-300 mb-4 line-clamp-2">{post.description}</p>
                        <span className="inline-flex items-center gap-1 text-lucky-green text-sm font-medium">
                          {t("blog.readMore")}
                          <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </span>
                      </div>
                    </article>
                  </Link>
                ))
              )}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Blog;
