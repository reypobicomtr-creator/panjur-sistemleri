import { supabase } from './supabase';

/* ─── Tipler ─────────────────────────────── */

export interface Product {
  id?: number;
  type: string;
  name: string;
  base_price: number;
  sort_order?: number;
}

export interface GalleryItem {
  id?: number;
  src: string;
  title: string;
  location: string;
  sort_order?: number;
}

export interface Review {
  id?: number;
  name: string;
  role: string;
  text: string;
  rating: number;
  initials?: string;
  color?: string;
  sort_order?: number;
}

export interface ContactMessage {
  id?: number;
  name: string;
  phone: string;
  email: string;
  message: string;
  is_read?: boolean;
  created_at?: string;
}

/* ─── Site Config ────────────────────────── */

export async function getSiteConfig(): Promise<Record<string, unknown>> {
  const { data } = await supabase.from('site_config').select('data').single();
  return (data as { data: Record<string, unknown> } | null)?.data ?? {};
}

export async function updateSiteConfig(data: Record<string, unknown>): Promise<void> {
  const { error } = await supabase.from('site_config').upsert({ id: 1, data, updated_at: new Date().toISOString() });
  if (error) throw error;
}

/* ─── Products ───────────────────────────── */

export async function getProducts(): Promise<Product[]> {
  const { data } = await supabase.from('products').select('*').order('sort_order');
  return (data as Product[]) ?? [];
}

export async function upsertProduct(product: Product): Promise<void> {
  if (product.id) {
    await supabase.from('products').update(product).eq('id', product.id);
  } else {
    await supabase.from('products').insert(product);
  }
}

export async function deleteProduct(id: number): Promise<void> {
  await supabase.from('products').delete().eq('id', id);
}

/* ─── Gallery ────────────────────────────── */

export async function getGallery(): Promise<GalleryItem[]> {
  const { data } = await supabase.from('gallery').select('*').order('sort_order');
  return (data as GalleryItem[]) ?? [];
}

export async function upsertGalleryItem(item: GalleryItem): Promise<void> {
  if (item.id) {
    await supabase.from('gallery').update(item).eq('id', item.id);
  } else {
    await supabase.from('gallery').insert(item);
  }
}

export async function deleteGalleryItem(id: number): Promise<void> {
  await supabase.from('gallery').delete().eq('id', id);
}

/* ─── Reviews ────────────────────────────── */

export async function getReviews(): Promise<Review[]> {
  const { data } = await supabase.from('reviews').select('*').order('sort_order');
  return (data as Review[]) ?? [];
}

export async function upsertReview(review: Review): Promise<void> {
  if (review.id) {
    await supabase.from('reviews').update(review).eq('id', review.id);
  } else {
    await supabase.from('reviews').insert(review);
  }
}

export async function deleteReview(id: number): Promise<void> {
  await supabase.from('reviews').delete().eq('id', id);
}

/* ─── Contacts ───────────────────────────── */

export async function getContacts(): Promise<ContactMessage[]> {
  const { data } = await supabase.from('contacts').select('*').order('created_at', { ascending: false });
  return (data as ContactMessage[]) ?? [];
}

export async function markContactRead(id: number): Promise<void> {
  await supabase.from('contacts').update({ is_read: true }).eq('id', id);
}

export async function deleteContact(id: number): Promise<void> {
  await supabase.from('contacts').delete().eq('id', id);
}

/* ─── Pricing Config ───────────────────────── */

import type { PricingConfigData } from './config';

export async function getPricingConfig(): Promise<PricingConfigData | null> {
  const { data } = await supabase.from('pricing_config').select('data').eq('id', 1).maybeSingle();
  return (data as { data: PricingConfigData } | null)?.data ?? null;
}

export async function updatePricingConfig(data: PricingConfigData): Promise<void> {
  await supabase.from('pricing_config').upsert({ id: 1, data, updated_at: new Date().toISOString() });
}
