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
    heroImage: "/images/brand/finnish-sunset-course.jpg",
    heroAlt: "Disc golf course in Finland - growing market",
    midImage: "/images/brand/disc-collection-rock.jpg",
    midAlt: "Lucky Discs collection - premium Finnish disc golf discs",
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
    heroImage: "/images/brand/disc-collection-vol2.jpg",
    heroAlt: "Lucky Discs wholesale collection for retailers",
    midImage: "/images/brand/discs-yyteri-beach.jpg",
    midAlt: "Lucky Discs on Yyteri beach - premium quality from Finland",
  },
];
