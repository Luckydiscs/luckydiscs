import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useTranslation } from "@/hooks/useTranslation";

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  content: string; // markdown
  category: string;
  keywords: string;
  readingTime: number;
  author: string;
  heroImage: string;
  heroAlt: string;
  publishedAt: string;
}

interface BlogRow {
  slug: string;
  title: string;
  description: string | null;
  content: string;
  category: string | null;
  keywords: string | null;
  reading_time: number | null;
  author: string | null;
  hero_image: string | null;
  hero_alt: string | null;
  published_at: string | null;
}

const mapRow = (r: BlogRow): BlogPost => ({
  slug: r.slug,
  title: r.title,
  description: r.description ?? "",
  content: r.content,
  category: r.category ?? "",
  keywords: r.keywords ?? "",
  readingTime: r.reading_time ?? 5,
  author: r.author ?? "Lucky Discs",
  heroImage: r.hero_image ?? "/images/brand/blog-golf-course-green.webp",
  heroAlt: r.hero_alt ?? "",
  publishedAt: r.published_at ?? "",
});

export function useBlogPosts() {
  const { language } = useTranslation();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("published", true)
        .eq("language", language)
        .order("published_at", { ascending: false });
      if (cancelled) return;
      if (!error && data) setPosts((data as BlogRow[]).map(mapRow));
      setLoading(false);
    })();
    return () => {
      cancelled = true;
    };
  }, [language]);

  return { posts, loading };
}

export function useBlogPost(slug: string | undefined) {
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) {
      setLoading(false);
      return;
    }
    let cancelled = false;
    (async () => {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("slug", slug)
        .eq("published", true)
        .maybeSingle();
      if (cancelled) return;
      if (!error && data) setPost(mapRow(data as BlogRow));
      setLoading(false);
    })();
    return () => {
      cancelled = true;
    };
  }, [slug]);

  return { post, loading };
}
