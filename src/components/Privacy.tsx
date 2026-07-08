import { X, Shield } from 'lucide-react';

interface Props {
  onClose: () => void;
}

export default function Privacy({ onClose }: Props) {
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
              <Shield className="w-4 h-4 text-brand-600" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900">Gizlilik Politikası</h2>
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
            PanjurMax ("biz", "bizim", "şirketimiz") olarak, kişisel verilerinizin güvenliğine
            önem veriyoruz. Bu gizlilik politikası, web sitemizi ziyaret ettiğinizde veya
            hizmetlerimizi kullandığınızda hangi bilgileri topladığımızı, bu bilgileri nasıl
            kullandığımızı ve koruduğumuzu açıklamaktadır.
          </p>

          <Section title="1. Toplanan Bilgiler">
            <p>Aşağıdaki bilgileri toplayabiliriz:</p>
            <ul className="list-disc pl-5 space-y-1 mt-1.5">
              <li><strong>Kimlik Bilgileri:</strong> Ad, soyad, telefon numarası, e-posta adresi</li>
              <li><strong>İletişim Bilgileri:</strong> Adres, telefon, e-posta</li>
              <li><strong>Talep Bilgileri:</strong> Pencere ölçüleri, tercih edilen ürün tipi, renk seçimi</li>
              <li><strong>Teknik Veriler:</strong> IP adresi, tarayıcı türü, sitemizdeki gezinti süresi</li>
            </ul>
          </Section>

          <Section title="2. Bilgilerin Kullanımı">
            <ul className="list-disc pl-5 space-y-1">
              <li>Size fiyat teklifi sunmak ve keşif randevusu oluşturmak</li>
              <li>Taleplerinize yanıt vermek ve müşteri hizmeti sağlamak</li>
              <li>Hizmet kalitemizi artırmak için analiz yapmak</li>
              <li>Yasal yükümlülüklerimizi yerine getirmek</li>
            </ul>
          </Section>

          <Section title="3. Bilgilerin Paylaşımı">
            <p>
              Kişisel bilgileriniz, açık rızanız olmadan üçüncü taraflarla paylaşılmaz.
              Ancak, yasal zorunluluk hallerinde veya hizmet sağlayıcılarımızla sınırlı ölçüde paylaşılabilir.
            </p>
          </Section>

          <Section title="4. Veri Güvenliği">
            <p>
              Kişisel verilerinizi korumak için endüstri standardı güvenlik önlemleri
              (SSL şifreleme, güvenli sunucular, yetkisiz erişime karşı koruma) kullanılmaktadır.
            </p>
          </Section>

          <Section title="5. Çerezler">
            <p>
              Web sitemiz, kullanıcı deneyimini iyileştirmek için çerezler kullanabilir.
              Çerez tercihlerinizi tarayıcı ayarlarınızdan yönetebilirsiniz.
            </p>
          </Section>

          <Section title="6. KVKK Haklarınız">
            <p>6698 sayılı KVKK kapsamında aşağıdaki haklara sahipsiniz:</p>
            <ul className="list-disc pl-5 space-y-1 mt-1.5">
              <li>Kişisel verilerinizin işlenip işlenmediğini öğrenme</li>
              <li>Eksik veya yanlış verilerin düzeltilmesini talep etme</li>
              <li>Verilerinizin silinmesini veya yok edilmesini talep etme</li>
              <li>İşleme amaçlarına aykırı kullanım durumunda itiraz etme</li>
            </ul>
          </Section>

          <Section title="7. İletişim">
            <p>
              <strong>E-posta:</strong> info@panjurmax.com<br />
              <strong>Telefon:</strong> 0532 123 45 67
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
