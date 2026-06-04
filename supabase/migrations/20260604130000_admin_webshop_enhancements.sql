-- Admin/verkkokauppa-parannukset
-- 1) product_variants: manuaalinen "loppuunmyyty" -lippu + "tulossa" -teksti
-- 2) blog-kuvien storage-bucket (julkinen luku) artikkelikuvien latausta varten

-- 1. VARIANTTI: sold_out + incoming_note ---------------------------------
alter table public.product_variants
  add column if not exists sold_out boolean not null default false;

alter table public.product_variants
  add column if not exists incoming_note text;

-- 2. STORAGE BUCKET blogikuville -----------------------------------------
insert into storage.buckets (id, name, public)
values ('blog-images', 'blog-images', true)
on conflict (id) do nothing;

-- Julkinen luku blog-images-bucketille (lataus tapahtuu edge functionin
-- service_role-avaimella, joka ohittaa RLS:n — tarvitaan vain SELECT-policy)
do $$
begin
  create policy "blog_images_public_read"
    on storage.objects for select
    using (bucket_id = 'blog-images');
exception
  when duplicate_object then null;
end $$;
