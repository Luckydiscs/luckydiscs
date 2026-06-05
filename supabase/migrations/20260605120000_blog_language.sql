-- Blogi monikielisenä: kielisarake. Olemassa olevat artikkelit = suomi.
alter table public.blog_posts
  add column if not exists language text not null default 'fi';

create index if not exists blog_posts_lang_idx
  on public.blog_posts (language, published, published_at desc);
