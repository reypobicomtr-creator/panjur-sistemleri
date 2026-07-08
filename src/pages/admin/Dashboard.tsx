import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MessageSquare, DollarSign, Images, Star, ArrowRight } from 'lucide-react';
import { supabase } from '@/lib/supabase';

interface Counts {
  messages: number;
  unread: number;
  products: number;
  gallery: number;
  reviews: number;
}

export default function Dashboard() {
  const navigate = useNavigate();
  const [counts, setCounts] = useState<Counts>({ messages: 0, unread: 0, products: 0, gallery: 0, reviews: 0 });

  useEffect(() => {
    Promise.all([
      supabase.from('contacts').select('*', { count: 'exact', head: true }),
      supabase.from('contacts').select('*', { count: 'exact', head: true }).eq('is_read', false),
      supabase.from('products').select('*', { count: 'exact', head: true }),
      supabase.from('gallery').select('*', { count: 'exact', head: true }),
      supabase.from('reviews').select('*', { count: 'exact', head: true }),
    ]).then(([msg, unread, prod, gal, rev]) => {
      setCounts({
        messages: msg.count ?? 0,
        unread: unread.count ?? 0,
        products: prod.count ?? 0,
        gallery: gal.count ?? 0,
        reviews: rev.count ?? 0,
      });
    });
  }, []);

  const cards = [
    { label: 'Gelen Mesajlar', value: counts.messages, sub: `${counts.unread} okunmamış`, icon: MessageSquare, color: 'bg-blue-500', href: '/admin/mesajlar' },
    { label: 'Ürün / Fiyat', value: counts.products, sub: 'fiyat listesi', icon: DollarSign, color: 'bg-green-500', href: '/admin/fiyatlar' },
    { label: 'Galeri', value: counts.gallery, sub: 'fotoğraf', icon: Images, color: 'bg-purple-500', href: '/admin/galeri' },
    { label: 'Müşteri Yorumları', value: counts.reviews, sub: 'yorum', icon: Star, color: 'bg-amber-500', href: '/admin/yorumlar' },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Genel Bakış</h1>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {cards.map((card) => (
          <button
            key={card.label}
            onClick={() => navigate(card.href)}
            className="bg-white rounded-xl border border-gray-200 p-5 text-left hover:shadow-md transition-shadow group"
          >
            <div className={`w-10 h-10 ${card.color} rounded-lg flex items-center justify-center mb-3`}>
              <card.icon className="w-5 h-5 text-white" />
            </div>
            <div className="text-2xl font-bold text-gray-900">{card.value}</div>
            <div className="text-sm text-gray-500 mt-0.5">{card.label}</div>
            <div className="text-xs text-gray-400 mt-1 flex items-center gap-1 group-hover:text-brand-600 transition-colors">
              {card.sub} <ArrowRight className="w-3 h-3" />
            </div>
          </button>
        ))}
      </div>

      {/* Quick tips */}
      <div className="bg-brand-50 border border-brand-200 rounded-xl p-5">
        <h2 className="font-semibold text-brand-800 text-sm mb-2">📌 Hızlı İpuçları</h2>
        <ul className="text-sm text-brand-700 space-y-1.5">
          <li>• İlk kullanımda <strong>Site Ayarları</strong> sayfasından firma bilgilerinizi girin.</li>
          <li>• <strong>Fiyatlar</strong> sayfasında ürünlerin m² fiyatını belirleyin.</li>
          <li>• Gelen mesajları <strong>Mesajlar</strong> sayfasından takip edin.</li>
          <li>• <strong>Galeri</strong> ve <strong>Yorumlar</strong> ile sitenizi zenginleştirin.</li>
        </ul>
      </div>
    </div>
  );
}
