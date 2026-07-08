-- ═══════════════════════════════════════════════
-- PanjurMax — Supabase Veritabanı Şeması
-- ═══════════════════════════════════════════════
-- Bu SQL'i Supabase SQL Editor'da çalıştırın.
-- https://supabase.com → SQL Editor → New Query

-- 1. Site Ayarları (tek satır — tüm marka bilgileri JSON olarak)
create table if not exists site_config (
  id bigint primary key default 1,
  data jsonb not null default '{}'::jsonb,
  updated_at timestamptz default now(),
  constraint single_row check (id = 1)
);
-- Tek satır garantisi
insert into site_config (id, data) values (1, '{}'::jsonb)
on conflict (id) do nothing;

-- 2. Ürünler / Fiyatlar
create table if not exists products (
  id bigint generated always as identity primary key,
  type text unique not null,         -- 'aluminium', 'pvc', 'motorlu', 'guvenlik'
  name text not null,
  base_price numeric(10,2) not null,  -- ₺/m²
  sort_order int default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 3. Galeri
create table if not exists gallery (
  id bigint generated always as identity primary key,
  src text not null,
  title text not null,
  location text not null default '',
  sort_order int default 0,
  created_at timestamptz default now()
);

-- 4. Müşteri Yorumları
create table if not exists reviews (
  id bigint generated always as identity primary key,
  name text not null,
  role text not null default '',
  text text not null,
  rating int default 5,
  initials text,
  color text default 'bg-blue-500',
  sort_order int default 0,
  created_at timestamptz default now()
);

-- 5. İletişim Formu Mesajları
create table if not exists contacts (
  id bigint generated always as identity primary key,
  name text not null,
  phone text not null,
  email text not null default '',
  message text not null default '',
  is_read boolean default false,
  created_at timestamptz default now()
);

-- RLS (Row Level Security) — admin kullanıcısı dışındakiler göremez
alter table site_config enable row level security;
alter table products enable row level security;
alter table gallery enable row level security;
alter table reviews enable row level security;
alter table contacts enable row level security;

-- Sadece authenticated kullanıcılar okuyup yazabilsin
create policy "Authenticated users can read site_config"
  on site_config for select using (auth.role() = 'authenticated');
create policy "Authenticated users can insert site_config"
  on site_config for insert with check (auth.role() = 'authenticated');
create policy "Authenticated users can update site_config"
  on site_config for update using (auth.role() = 'authenticated');

create policy "Authenticated users can read products"
  on products for select using (auth.role() = 'authenticated');
create policy "Authenticated users can manage products"
  on products for all using (auth.role() = 'authenticated');

create policy "Authenticated users can read gallery"
  on gallery for select using (auth.role() = 'authenticated');
create policy "Authenticated users can manage gallery"
  on gallery for all using (auth.role() = 'authenticated');

create policy "Authenticated users can read reviews"
  on reviews for select using (auth.role() = 'authenticated');
create policy "Authenticated users can manage reviews"
  on reviews for all using (auth.role() = 'authenticated');

-- 6. Fiyatlandırma Yapılandırması (tek satır — kasa tipleri, ek ücretler, indirimler)
create table if not exists pricing_config (
  id bigint primary key default 1,
  data jsonb not null default '{}'::jsonb,
  updated_at timestamptz default now(),
  constraint single_row check (id = 1)
);
insert into pricing_config (id, data) values (1, '{
  "caseTypes": [
    {"id": "siva_ustu", "name": "Sıva Üstü Kasa", "price": 0},
    {"id": "siva_alti", "name": "Sıva Altı Kasa", "price": 450},
    {"id": "mini", "name": "Mini Kasa", "price": 650}
  ],
  "extraCosts": {
    "motorExtra": 1450,
    "specialColorExtra": 480,
    "baseLabor": 350,
    "floorExtraPer": 120,
    "removalCost": 200,
    "minMaterialCost": 1200
  },
  "discounts": {
    "areaDiscounts": [
      {"minArea": 0, "maxArea": 1.5, "rate": 0},
      {"minArea": 1.5, "maxArea": 3, "rate": 0.08},
      {"minArea": 3, "maxArea": 999, "rate": 0.15}
    ],
    "bulkDiscountThreshold": 5,
    "bulkDiscountRate": 0.05,
    "kdvRate": 0.20
  }
}'::jsonb) on conflict (id) do nothing;

-- RLS
alter table site_config enable row level security;
alter table products enable row level security;
alter table gallery enable row level security;
alter table reviews enable row level security;
alter table contacts enable row level security;
alter table pricing_config enable row level security;

-- Public site herkes okuyabilir, sadece admin yazabilir
drop policy if exists "Anyone can read site_config" on site_config;
create policy "Anyone can read site_config"
  on site_config for select using (true);
drop policy if exists "Authenticated users can read site_config" on site_config;
drop policy if exists "Authenticated users can insert site_config" on site_config;
drop policy if exists "Authenticated users can update site_config" on site_config;
create policy "Authenticated users can manage site_config"
  on site_config for all using (auth.role() = 'authenticated');

drop policy if exists "Anyone can read products" on products;
create policy "Anyone can read products"
  on products for select using (true);
drop policy if exists "Authenticated users can read products" on products;
drop policy if exists "Authenticated users can manage products" on products;
create policy "Authenticated users can manage products"
  on products for all using (auth.role() = 'authenticated');

drop policy if exists "Anyone can read gallery" on gallery;
create policy "Anyone can read gallery"
  on gallery for select using (true);
drop policy if exists "Authenticated users can read gallery" on gallery;
drop policy if exists "Authenticated users can manage gallery" on gallery;
create policy "Authenticated users can manage gallery"
  on gallery for all using (auth.role() = 'authenticated');

drop policy if exists "Anyone can read reviews" on reviews;
create policy "Anyone can read reviews"
  on reviews for select using (true);
drop policy if exists "Authenticated users can read reviews" on reviews;
drop policy if exists "Authenticated users can manage reviews" on reviews;
create policy "Authenticated users can manage reviews"
  on reviews for all using (auth.role() = 'authenticated');

drop policy if exists "Anyone can read pricing_config" on pricing_config;
create policy "Anyone can read pricing_config"
  on pricing_config for select using (true);
create policy "Authenticated users can manage pricing_config"
  on pricing_config for all using (auth.role() = 'authenticated');

-- Mesajlar: herkes ekleyebilir, sadece admin okuyabilir
drop policy if exists "Anyone can insert contacts" on contacts;
create policy "Anyone can insert contacts"
  on contacts for insert with check (true);
drop policy if exists "Authenticated users can read contacts" on contacts;
drop policy if exists "Authenticated users can update contacts" on contacts;
create policy "Authenticated users can read contacts"
  on contacts for select using (auth.role() = 'authenticated');
create policy "Authenticated users can update contacts"
  on contacts for update using (auth.role() = 'authenticated');
