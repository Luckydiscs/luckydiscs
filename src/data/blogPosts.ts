export interface BlogPost {
  slug: string;
  titleKey: string;
  descriptionKey: string;
  contentKey: string;
  date: string;
  author: string;
  categoryKey: string;
  keywords: string;
  readingTime: number;
  heroImage: string;
  heroAlt: string;
  midImage?: string;
  midAlt?: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: "disc-golf-markkina-kasvu-suomessa",
    titleKey: "blog.post1.title",
    descriptionKey: "blog.post1.description",
    contentKey: "blog.post1.content",
    date: "2026-03-25",
    author: "Lucky Discs",
    categoryKey: "blog.category.business",
    keywords: "disc golf jälleenmyyjä, frisbeegolf tukkumyynti, disc golf markkinan kasvu Suomi",
    readingTime: 5,
    heroImage: "/images/brand/blog-disc-golf-winter.jpg",
    heroAlt: "Disc golf basket in Finnish winter landscape - growing market",
    midImage: "/images/brand/blog-disc-golf-forest.jpg",
    midAlt: "Lucky Discs Treasure Hunt frisbeegolfkiekot eri väreissä",
  },
  {
    slug: "kuinka-valita-disc-golf-tavarantoimittaja",
    titleKey: "blog.post2.title",
    descriptionKey: "blog.post2.description",
    contentKey: "blog.post2.content",
    date: "2026-03-22",
    author: "Lucky Discs",
    categoryKey: "blog.category.guide",
    keywords: "disc golf tavarantoimittaja, frisbeegolf jälleenmyyjä, disc golf wholesale Suomi",
    readingTime: 7,
    heroImage: "/images/brand/blog-golf-course-green.jpg",
    heroAlt: "Lucky Discs kiekkovalikoima - Treasure Hunt, Bank Robber ja Money Shot luonnossa",
    midImage: "/images/brand/blog-frisbee-sunset.jpg",
    midAlt: "Lucky Discs Treasure Hunt ja Bank Robber kiekot oranssina talvisessa luonnossa",
  },
];
