import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useTranslation } from "@/hooks/useTranslation";
import { useBlogPost } from "@/hooks/useBlogPosts";
import useSEO from "@/hooks/useSEO";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, ArrowLeft, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const { t, language } = useTranslation();
  const { post, loading } = useBlogPost(slug);

  const basePath = language === "fi" ? "/blogi" : "/blog";

  useSEO({
    title: post ? `${post.title} | Lucky Discs` : "Lucky Discs Blogi",
    description: post?.description || "",
    keywords: post?.keywords || "",
    canonicalPath: `${basePath}/${slug}`,
    structuredData: post
      ? {
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: post.title,
          description: post.description,
          datePublished: post.publishedAt,
          author: {
            "@type": "Organization",
            name: "Lucky Discs",
            url: "https://www.luckydiscs.fi",
          },
          publisher: {
            "@type": "Organization",
            name: "Lucky Discs",
            url: "https://www.luckydiscs.fi",
          },
          mainEntityOfPage: `https://www.luckydiscs.fi${basePath}/${slug}`,
        }
      : undefined,
  });

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-black text-white">
        <Navbar />
        <main className="flex-1 flex flex-col items-center justify-center py-40 text-gray-400">
          <Loader2 className="w-8 h-8 animate-spin text-lucky-green mb-3" />
          Ladataan artikkelia…
        </main>
        <Footer />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col bg-black text-white">
        <Navbar />
        <main className="flex-1 flex flex-col items-center justify-center py-40 text-center px-4">
          <h1 className="text-2xl font-bold mb-4">Artikkelia ei löytynyt</h1>
          <Button asChild className="bg-lucky-green text-white hover:bg-lucky-green/90">
            <Link to={basePath}>Takaisin blogiin</Link>
          </Button>
        </main>
        <Footer />
      </div>
    );
  }

  const paragraphs = post.content.split("\n\n").filter((p) => p.trim());

  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      <Navbar />

      <main className="flex-1">
        <section className="pt-20 sm:pt-24 md:pt-32 lg:pt-40 pb-8 bg-gradient-to-br from-black via-gray-900/50 to-black relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-lucky-green/5 to-transparent" />
          <div className="container mx-auto relative z-10 px-4">
            <div className="max-w-3xl mx-auto">
              <Link
                to={basePath}
                className="inline-flex items-center gap-1 text-gray-400 hover:text-lucky-green transition-colors mb-6"
              >
                <ArrowLeft className="h-4 w-4" />
                {t("blog.backToBlog")}
              </Link>
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
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-medium mb-4 text-white">
                {post.title}
              </h1>
              <p className="text-lg text-gray-300">{post.description}</p>
            </div>
          </div>
        </section>

        {/* Hero Image */}
        <section className="px-4 bg-black">
          <div className="container mx-auto">
            <div className="max-w-3xl mx-auto">
              <div className="relative w-full aspect-[16/9] rounded-lg shadow-2xl overflow-hidden bg-black">
                <img
                  src={post.heroImage}
                  alt={post.heroAlt}
                  className="w-full h-full object-cover"
                  loading="eager"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 px-4 bg-black">
          <div className="container mx-auto">
            <article className="max-w-3xl mx-auto prose-invert">
              {paragraphs.map((paragraph, index) => {
                if (paragraph.startsWith("## ")) {
                  return (
                    <h2 key={index} className="text-2xl font-medium text-white mt-10 mb-4">
                      {paragraph.replace("## ", "")}
                    </h2>
                  );
                }
                if (paragraph.startsWith("### ")) {
                  return (
                    <h3 key={index} className="text-xl font-medium text-white mt-8 mb-3">
                      {paragraph.replace("### ", "")}
                    </h3>
                  );
                }
                return (
                  <p key={index} className="text-gray-300 leading-relaxed mb-4">
                    {paragraph}
                  </p>
                );
              })}

              <div className="mt-12 p-6 bg-gradient-to-r from-lucky-green/10 to-transparent rounded-lg border-l-4 border-lucky-green">
                <p className="text-white font-medium mb-4">{t("blog.ctaText")}</p>
                <Button className="bg-lucky-green text-white hover:bg-lucky-green/90" asChild>
                  <Link to="/wholesale">{t("blog.ctaButton")}</Link>
                </Button>
              </div>
            </article>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default BlogPost;
