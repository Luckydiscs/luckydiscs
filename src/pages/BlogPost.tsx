import { useParams, Link, Navigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useTranslation } from "@/hooks/useTranslation";
import useSEO from "@/hooks/useSEO";
import { blogPosts } from "@/data/blogPosts";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const { t, language } = useTranslation();

  const post = blogPosts.find((p) => p.slug === slug);

  const basePath = language === "fi" ? "/blogi" : "/blog";

  useSEO({
    title: post ? t(post.titleKey) + " | Lucky Discs" : "Not Found",
    description: post ? t(post.descriptionKey) : "",
    keywords: post?.keywords || "",
    canonicalPath: `${basePath}/${slug}`,
    structuredData: post
      ? {
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          "headline": t(post.titleKey),
          "description": t(post.descriptionKey),
          "datePublished": post.date,
          "author": { "@type": "Organization", "name": post.author },
          "publisher": {
            "@type": "Organization",
            "name": "Lucky Discs",
            "url": "https://www.luckydiscs.fi",
          },
          "mainEntityOfPage": `https://www.luckydiscs.fi${basePath}/${slug}`,
        }
      : undefined,
  });

  if (!post) {
    return <Navigate to={basePath} replace />;
  }

  const content = t(post.contentKey);
  const paragraphs = content.split("\n\n");

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
              <div className="flex items-center gap-3 mb-4">
                <Badge className="bg-lucky-green/20 text-lucky-green border-lucky-green text-xs">
                  {t(post.categoryKey)}
                </Badge>
                <div className="flex items-center gap-1 text-gray-400 text-sm">
                  <Calendar className="h-3.5 w-3.5" />
                  <span>{post.date}</span>
                </div>
                <div className="flex items-center gap-1 text-gray-400 text-sm">
                  <Clock className="h-3.5 w-3.5" />
                  <span>
                    {post.readingTime} {t("blog.minRead")}
                  </span>
                </div>
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-medium mb-4 text-white">
                {t(post.titleKey)}
              </h1>
              <p className="text-lg text-gray-300">{t(post.descriptionKey)}</p>
            </div>
          </div>
        </section>

        {/* Hero Image */}
        <section className="px-4 bg-black">
          <div className="container mx-auto">
            <div className="max-w-3xl mx-auto">
              <img
                src={post.heroImage}
                alt={post.heroAlt}
                className="w-full rounded-lg shadow-2xl object-cover aspect-[4/3]"
                loading="eager"
              />
            </div>
          </div>
        </section>

        <section className="py-12 px-4 bg-black">
          <div className="container mx-auto">
            <article className="max-w-3xl mx-auto prose-invert">
              {paragraphs.map((paragraph, index) => {
                const midImageIndex = Math.floor(paragraphs.length / 2);
                const showMidImage = post.midImage && index === midImageIndex;

                if (paragraph.startsWith("## ")) {
                  return (
                    <div key={index}>
                      {showMidImage && (
                        <img
                          src={post.midImage}
                          alt={post.midAlt || ""}
                          className="w-full rounded-lg shadow-xl object-cover max-h-[350px] my-8"
                          loading="lazy"
                        />
                      )}
                      <h2 className="text-2xl font-medium text-white mt-10 mb-4">
                        {paragraph.replace("## ", "")}
                      </h2>
                    </div>
                  );
                }
                if (paragraph.startsWith("### ")) {
                  return (
                    <div key={index}>
                      {showMidImage && (
                        <img
                          src={post.midImage}
                          alt={post.midAlt || ""}
                          className="w-full rounded-lg shadow-xl object-cover max-h-[350px] my-8"
                          loading="lazy"
                        />
                      )}
                      <h3 className="text-xl font-medium text-white mt-8 mb-3">
                        {paragraph.replace("### ", "")}
                      </h3>
                    </div>
                  );
                }
                return (
                  <div key={index}>
                    {showMidImage && (
                      <img
                        src={post.midImage}
                        alt={post.midAlt || ""}
                        className="w-full rounded-lg shadow-xl object-cover max-h-[350px] my-8"
                        loading="lazy"
                      />
                    )}
                    <p className="text-gray-300 leading-relaxed mb-4">
                      {paragraph}
                    </p>
                  </div>
                );
              })}

              <div className="mt-12 p-6 bg-gradient-to-r from-lucky-green/10 to-transparent rounded-lg border-l-4 border-lucky-green">
                <p className="text-white font-medium mb-4">
                  {t("blog.ctaText")}
                </p>
                <Button
                  className="bg-lucky-green text-white hover:bg-lucky-green/90"
                  asChild
                >
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
