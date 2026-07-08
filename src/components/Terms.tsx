import { X, FileText } from 'lucide-react';

interface Props {
  onClose: () => void;
}

export default function Terms({ onClose }: Props) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[85vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between rounded-t-2xl z-10">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-brand-50 rounded-lg flex items-center justify-center">
              <FileText className="w-4 h-4 text-brand-600" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900">Kullanım Koşulları</h2>
              <p className="text-xs text-gray-500">Son güncelleme: Haziran 2026</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-400 hover:text-gray-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="px-6 py-5 space-y-5 text-sm text-gray-600 leading-relaxed">
          <p>
            PanjurMax web sitesini kullanmadan önce bu kullanım koşullarını dikkatlice
            okumanızı rica ederiz. Siteyi kullanarak aşağıdaki şartları kabul etmiş sayılırsınız.
          </p>

          <Section title="1. Hizmet Kapsamı">
            <p>
              PanjurMax, panjur sistemleri üzerine danışmanlık, satış, montaj ve satış sonrası
              hizmetler sunmaktadır. Web sitemizde yer alan fiyatlandırma bilgileri tahminidir
              ve bağlayıcı değildir. Kesin fiyat teklifi, ücretsiz keşif sonrası uzman ekibimiz
              tarafından iletilir.
            </p>
          </Section>

          <Section title="2. Fikri Mülkiyet">
            <p>
              Web sitemizde yer alan tüm içerik, logo, grafik, yazılım ve tasarım öğeleri
              PanjurMax'a aittir. İzinsiz kullanım, çoğaltma veya dağıtım yapılamaz.
            </p>
          </Section>

          <Section title="3. Kullanıcı Sorumlulukları">
            <ul className="list-disc pl-5 space-y-1">
              <li>Web sitesini yalnızca yasal amaçlarla kullanmak</li>
              <li>Formlara doğru ve güncel bilgi vermek</li>
              <li>Site güvenliğini ihlal edecek eylemlerden kaçınmak</li>
              <li>Başka kullanıcıların deneyimini olumsuz etkileyecek davranışlardan kaçınmak</li>
            </ul>
          </Section>

          <Section title="4. Sorumluluğun Sınırlandırılması">
            <p>
              PanjurMax, web sitesinde yer alan bilgilerin doğruluğu konusunda azami özeni
              göstermekle birlikte, oluşabilecek hatalardan veya kesintilerden dolayı hukuki
              sorumluluk kabul etmez.
            </p>
          </Section>

          <Section title="5. Fiyatlandırma ve Ödeme">
            <p>
              Fiyat hesaplama aracımız yaklaşık maliyet bilgisi sunar. Kesin teklif,
              montaj alanının görülmesi ve ölçü alınmasının ardından oluşturulur.
            </p>
          </Section>

          <Section title="6. Garanti ve İade">
            <p>
              Tüm panjur ürünlerimiz 2 yıl garantilidir. Garanti koşulları, montaj
              sonrası teslim edilen garanti belgesinde ayrıntılı olarak açıklanmıştır.
            </p>
          </Section>

          <Section title="7. Değişiklikler">
            <p>
              PanjurMax, bu kullanım koşullarını önceden bildirmeksizin değiştirme hakkını
              saklı tutar. Değişiklikler web sitesinde yayınlandığı andan itibaren geçerlidir.
            </p>
          </Section>

          <Section title="8. Uyuşmazlıklar">
            <p>
              İşbu kullanım koşulları Türkiye Cumhuriyeti yasalarına tabidir.
              Olası uyuşmazlıklarda İstanbul Mahkemeleri ve İcra Daireleri yetkilidir.
            </p>
          </Section>

          <Section title="9. İletişim">
            <p>
              <strong>E-posta:</strong> info@panjurmax.com<br />
              <strong>Telefon:</strong> 0532 123 45 67<br />
              <strong>Adres:</strong> Organize Sanayi Bölgesi, 2. Cadde No: 45, Ümraniye/İstanbul
            </p>
          </Section>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-gray-50 border-t border-gray-100 px-6 py-3 flex justify-end rounded-b-2xl">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-brand-600 hover:bg-brand-700 text-white text-sm font-semibold rounded-lg transition-colors"
          >
            Kapat
          </button>
        </div>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="text-base font-semibold text-gray-900 mb-2">{title}</h3>
      {children}
    </div>
  );
}
