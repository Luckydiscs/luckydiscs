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
        ? "Lucky Discs Blogi - Frisbeegolfvinkit, oppaat & näkemykset"
        : "Lucky Discs Blog - Disc Golf Tips, Guides & Insights",
    description:
      language === "fi"
        ? "Lucky Discs blogi: frisbeegolfoppaat aloittelijalle, lentonumerot, kiekkovinkit ja markkinanäkemykset."
        : "Lucky Discs blog: disc golf guides for beginners, flight numbers, disc tips and market insights.",
    keywords: "frisbeegolf blogi, disc golf blog, frisbeegolf opas, aloittelijan kiekot, lentonumerot, jälleenmyynti",
    canonicalPath: language === "fi" ? "/blogi" : "/blog",
    structuredData: {
      "@context": "https://schema.org",
      "@type": "Blog",
      name: "Lucky Discs Blog",
      description: "Disc golf guides, tips and market analysis",
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

  const Meta = ({ post, light = false }: { post: any; light?: boolean }) => (
    <div className={`flex items-center gap-3 flex-wrap text-sm ${light ? "text-gray-200" : "text-gray-400"}`}>
      {post.category && (
        <Badge className="bg-lucky-green/20 text-lucky-green border border-lucky-green/40 text-xs">
          {post.category}
        </Badge>
      )}
      <span className="inline-flex items-center gap-1"><Calendar className="h-3.5 w-3.5" /> {post.publishedAt}</span>
      <span className="inline-flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {post.readingTime} {t("blog.minRead")}</span>
    </div>
  );

  const featured = posts[0];
  const rest = posts.slice(1);

  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      <Navbar />

      <main className="flex-1">
        <section className="pt-20 sm:pt-24 md:pt-32 lg:pt-40 pb-12 bg-gradient-to-br from-black via-gray-900/50 to-black relative overflow-hidden">
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

        <section className="pb-20 px-4 bg-black">
          <div className="container mx-auto max-w-6xl">
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
              <>
                {/* Featured (uusin) — iso nostokortti */}
                {featured && (
                  <Link to={`${basePath}/${featured.slug}`} className="group block mb-10 md:mb-14">
                    <article className="relative rounded-2xl overflow-hidden border border-white/10 hover:border-lucky-green/50 transition-colors duration-300">
                      <div className="aspect-[16/10] sm:aspect-[2/1] lg:aspect-[2.4/1] overflow-hidden">
                        <img
                          src={featured.heroImage}
                          alt={featured.heroAlt}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          loading="eager"
                        />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
                        <div className="mb-3"><Meta post={featured} light /></div>
                        <h2 className="text-2xl md:text-4xl font-medium text-white mb-3 max-w-3xl group-hover:text-lucky-green transition-colors">
                          {featured.title}
                        </h2>
                        <p className="text-gray-200 max-w-2xl line-clamp-2 mb-4 hidden sm:block">{featured.description}</p>
                        <span className="inline-flex items-center gap-1 text-lucky-green font-medium">
                          {t("blog.readMore")}
                          <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </span>
                      </div>
                    </article>
                  </Link>
                )}

                {/* Loput — ruudukko */}
                {rest.length > 0 && (
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {rest.map((post) => (
                      <Link key={post.slug} to={`${basePath}/${post.slug}`} className="group flex">
                        <article className="flex flex-col w-full bg-gradient-to-b from-white/[0.06] to-white/[0.02] rounded-xl border border-white/10 hover:border-lucky-green/50 overflow-hidden transition-colors duration-300">
                          <div className="aspect-[16/10] overflow-hidden">
                            <img
                              src={post.heroImage}
                              alt={post.heroAlt}
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                              loading="lazy"
                            />
                          </div>
                          <div className="p-5 flex flex-col flex-1">
                            <div className="mb-3"><Meta post={post} /></div>
                            <h3 className="text-lg font-medium text-white mb-2 line-clamp-2 group-hover:text-lucky-green transition-colors">
                              {post.title}
                            </h3>
                            <p className="text-sm text-gray-400 line-clamp-3 mb-4 flex-1">{post.description}</p>
                            <span className="inline-flex items-center gap-1 text-lucky-green text-sm font-medium mt-auto">
                              {t("blog.readMore")}
                              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                            </span>
                          </div>
                        </article>
                      </Link>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Blog;
