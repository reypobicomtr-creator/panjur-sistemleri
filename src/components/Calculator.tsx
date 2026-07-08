import React, { useState, useRef, useEffect } from 'react';
import { Bot, Send, RotateCcw, Info } from 'lucide-react';
import type { ShutterType, ControlType, CaseType, ColorGroup, FormState, PriceBreakdown } from '@/utils/pricing';
import { calculatePrice, PRODUCT_NAMES, CASE_NAMES, getPriceInfoText } from '@/utils/pricing';
import { useSiteConfig } from '@/contexts/SiteConfigContext';

interface Message {
  from: 'bot' | 'user';
  text: string;
  options?: { label: string; value: string }[];
  isInput?: 'dimension' | 'quantity' | 'floor';
  isPriceSummary?: boolean;
  priceDetails?: PriceBreakdown;
}

function PriceSummaryCard({ p }: { p: PriceBreakdown }) {
  return (
    <div className="bg-gradient-to-br from-brand-50 to-white border border-brand-200 rounded-xl p-4 text-sm space-y-3">
      <div className="flex items-center gap-2 text-brand-700 font-bold text-base">
        <span>📋</span> Fiyat Detayı
      </div>

      <div className="space-y-1 text-gray-600">
        <div className="flex justify-between"><span>📦 {p.productName}</span></div>
        <div className="flex justify-between"><span>📐 {p.width}×{p.height} cm ({p.area.toFixed(2)} m²)</span></div>
        <div className="flex justify-between"><span>🔢 {p.quantity} adet</span></div>
        <div className="flex justify-between"><span>📦 {p.caseLabel}</span></div>
        <div className="flex justify-between"><span>🎮 {p.controlLabel}</span></div>
        <div className="flex justify-between"><span>🎨 {p.colorLabel}</span></div>
        {p.hasOldShutter && <div className="flex justify-between"><span>🔧 Eski panjur söküm dahil</span></div>}
        <div className="flex justify-between"><span>🏢 {p.floor}. kat{p.floor > 3 ? ' (ek montaj ücreti)' : ''}</span></div>
      </div>

      <div className="border-t border-brand-200 pt-3 space-y-1.5">
        <div className="text-xs text-gray-500 font-semibold uppercase tracking-wide mb-2">Birim Fiyat Kırılımı</div>
        <div className="flex justify-between text-gray-700">
          <span>Malzeme ({p.area.toFixed(2)} m²)</span>
          <span>{p.baseMaterialCost.toLocaleString('tr-TR')} ₺</span>
        </div>
        {p.caseCost > 0 && (
          <div className="flex justify-between text-gray-700">
            <span>{p.caseLabel}</span>
            <span>+{p.caseCost.toLocaleString('tr-TR')} ₺</span>
          </div>
        )}
        {p.motorCost > 0 && (
          <div className="flex justify-between text-gray-700">
            <span>Motor sistemi</span>
            <span>+{p.motorCost.toLocaleString('tr-TR')} ₺</span>
          </div>
        )}
        {p.colorCost > 0 && (
          <div className="flex justify-between text-gray-700">
            <span>Özel renk boyama</span>
            <span>+{p.colorCost.toLocaleString('tr-TR')} ₺</span>
          </div>
        )}
        <div className="flex justify-between text-gray-700">
          <span>Montaj işçiliği</span>
          <span>{p.laborCost.toLocaleString('tr-TR')} ₺</span>
        </div>
        {p.floorCost > 0 && (
          <div className="flex justify-between text-gray-700">
            <span>Kat ek ücreti ({p.floor - 3} ek kat)</span>
            <span>+{p.floorCost.toLocaleString('tr-TR')} ₺</span>
          </div>
        )}
        {p.removalCost > 0 && (
          <div className="flex justify-between text-gray-700">
            <span>Eski panjur söküm</span>
            <span>+{p.removalCost.toLocaleString('tr-TR')} ₺</span>
          </div>
        )}
        <div className="flex justify-between font-semibold text-gray-900 border-t border-dashed border-gray-300 pt-1.5">
          <span>Birim Fiyat</span>
          <span>{p.unitTotal.toLocaleString('tr-TR')} ₺</span>
        </div>
      </div>

      <div className="border-t border-brand-200 pt-3 space-y-1.5">
        <div className="flex justify-between text-gray-700">
          <span>Ara Toplam ({p.quantity} adet × {p.unitTotal.toLocaleString('tr-TR')} ₺)</span>
          <span>{p.subtotal.toLocaleString('tr-TR')} ₺</span>
        </div>
        {p.discountApplied && (
          <div className="flex justify-between text-green-600 font-medium">
            <span>🎉 {p.quantity}+ adet indirimi (%5)</span>
            <span>-{p.discountAmount.toLocaleString('tr-TR')} ₺</span>
          </div>
        )}
        <div className="flex justify-between text-gray-500 text-xs">
          <span>KDV (%20)</span>
          <span>+{p.kdv.toLocaleString('tr-TR')} ₺</span>
        </div>
        <div className="flex justify-between font-bold text-lg text-brand-700 border-t border-brand-200 pt-2">
          <span>Toplam (KDV Dahil)</span>
          <span>{p.grandTotal.toLocaleString('tr-TR')} ₺</span>
        </div>
      </div>

      <p className="text-xs text-gray-400 leading-relaxed">
        ℹ️ Bu fiyat tahmini bir hesaplamadır. Kesin fiyat, ücretsiz keşif sonrası
        pencere durumu ve montaj koşullarına göre netleştirilir.
      </p>
    </div>
  );
}

const INITIAL_BOT_MESSAGE = `Merhaba! 👋 Ben PanjurMax fiyat asistanıyım. Pencere ölçülerinize göre detaylı fiyat hesaplıyorum.\n\nHangi panjur tipini tercih ediyorsunuz?`;

const INITIAL_OPTIONS = [
  { label: '🏠 Alüminyum Panjur', value: 'aluminium' },
  { label: '🪟 PVC Panjur', value: 'pvc' },
  { label: '⚡ Motorlu Panjur', value: 'motorlu' },
  { label: '🛡️ Güvenlik Panjuru', value: 'guvenlik' },
];

const CASE_OPTIONS = [
  { label: '📦 Sıva Üstü Kasa (Standart)', value: 'siva_ustu' },
  { label: '🧱 Sıva Altı Kasa (Gömme) +450 ₺', value: 'siva_alti' },
  { label: '📏 Mini Kasa (İnce Profil) +650 ₺', value: 'mini' },
];

const CONTROL_OPTIONS = [
  { label: '🤚 Manuel — Kayış / Kollu', value: 'manuel' },
  { label: '⚡ Motorlu Kumanda +1.450 ₺/adet', value: 'motorlu' },
];

const COLOR_OPTIONS = [
  { label: '🎨 Standart (Beyaz, Bej, Antrasit, Kahve)', value: 'standart' },
  { label: '✨ RAL Özel Renk +480 ₺/adet', value: 'ozel' },
];

const OLD_SHUTTER_OPTIONS = [
  { label: '✅ Evet, eski panjur var', value: 'yes' },
  { label: '❌ Hayır, ilk kez takılacak', value: 'no' },
];

const FINAL_OPTIONS = (display: string) => [
  { label: `📞 Hemen Arayın: ${display}`, value: 'call' },
  { label: '📋 WhatsApp ile Teklif Al', value: 'whatsapp' },
  { label: '🔄 Yeni Hesaplama Yap', value: 'reset' },
];

const EMPTY_FORM: FormState = {
  step: 0,
  shutterType: '',
  width: '',
  height: '',
  quantity: '',
  controlType: '',
  colorGroup: '',
  caseType: '',
  floor: '',
  hasOldShutter: null,
};

export default function Calculator() {
  const { config } = useSiteConfig();
  const { site } = config;
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [showPriceInfo, setShowPriceInfo] = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);

  const [dimWidth, setDimWidth] = useState('');
  const [dimHeight, setDimHeight] = useState('');
  const [qty, setQty] = useState('1');
  const [floorInput, setFloorInput] = useState('');

  const scrollToBottom = () => {
    setTimeout(() => {
      if (chatRef.current) {
        chatRef.current.scrollTop = chatRef.current.scrollHeight;
      }
    }, 100);
  };

  const addBotMessage = (
    text: string,
    options?: Message['options'],
    isInput?: Message['isInput'],
    isPriceSummary?: boolean,
    priceDetails?: PriceBreakdown,
  ) => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [...prev, { from: 'bot', text, options, isInput, isPriceSummary, priceDetails }]);
      scrollToBottom();
    }, 600);
  };

  const addUserMessage = (text: string) => {
    setMessages((prev) => [...prev, { from: 'user', text }]);
    scrollToBottom();
  };

  const resetChat = () => {
    setMessages([]);
    setForm(EMPTY_FORM);
    setDimWidth('');
    setDimHeight('');
    setQty('1');
    setFloorInput('');
    setTimeout(() => {
      addBotMessage(INITIAL_BOT_MESSAGE, INITIAL_OPTIONS);
    }, 200);
  };

  // Initialize
  useEffect(() => {
    addBotMessage(INITIAL_BOT_MESSAGE, INITIAL_OPTIONS);
  }, []);

  // ─── Step handlers ──────────────────────────────────

  const handleSelectType = (value: string) => {
    const label = PRODUCT_NAMES[value as ShutterType];
    addUserMessage(label);
    setForm((prev) => ({ ...prev, shutterType: value as ShutterType, step: 1 }));
    setTimeout(() => {
      addBotMessage(
        `${label} — güzel tercih! 👍\n\nŞimdi pencere boşluğunun genişlik ve yüksekliğini santimetre olarak girin.\n\n💡 İpucu: Panjur kasasını da dahil ederek ölçü alın.`,
        undefined,
        'dimension',
      );
    }, 300);
  };

  const handleDimensionSubmit = () => {
    const w = parseInt(dimWidth);
    const h = parseInt(dimHeight);
    if (!w || !h || w < 30 || w > 500 || h < 30 || h > 400) return;
    addUserMessage(`${w} cm × ${h} cm`);
    setForm((prev) => ({ ...prev, width: String(w), height: String(h), step: 2 }));
    const area = (w / 100) * (h / 100);
    setDimWidth('');
    setDimHeight('');
    setTimeout(() => {
      addBotMessage(`Ölçüler alındı ✅ (${area.toFixed(2)} m²)\n\nKaç adet panjur yaptırmak istiyorsunuz?`, undefined, 'quantity');
    }, 300);
  };

  const handleQuantitySubmit = () => {
    const q = parseInt(qty);
    if (!q || q < 1 || q > 50) return;
    addUserMessage(`${q} adet`);
    setForm((prev) => ({ ...prev, quantity: String(q), step: 3 }));
    setQty('1');
    setTimeout(() => {
      addBotMessage('Kasa tipini seçin:', CASE_OPTIONS);
    }, 300);
  };

  const handleCaseType = (value: string) => {
    addUserMessage(CASE_NAMES[value as CaseType]);
    setForm((prev) => ({ ...prev, caseType: value as CaseType, step: 4 }));
    setTimeout(() => {
      if (form.shutterType === 'motorlu') {
        setForm((prev) => ({ ...prev, controlType: 'motorlu', step: 5 }));
        addBotMessage('Renk tercihiniz nedir?', COLOR_OPTIONS);
      } else {
        addBotMessage('Kontrol sistemi nasıl olsun?', CONTROL_OPTIONS);
      }
    }, 300);
  };

  const handleControlType = (value: string) => {
    addUserMessage(value === 'manuel' ? 'Manuel (Kayış)' : 'Motorlu Kumanda');
    setForm((prev) => ({ ...prev, controlType: value as ControlType, step: 5 }));
    setTimeout(() => {
      addBotMessage('Renk tercihiniz nedir?', COLOR_OPTIONS);
    }, 300);
  };

  const handleColorGroup = (value: string) => {
    addUserMessage(value === 'standart' ? 'Standart Renk' : 'RAL Özel Renk');
    setForm((prev) => ({ ...prev, colorGroup: value as ColorGroup, step: 6 }));
    setTimeout(() => {
      addBotMessage('Mevcut eski panjurunuz var mı? (Söküm gerekiyor mu?)', OLD_SHUTTER_OPTIONS);
    }, 300);
  };

  const handleOldShutter = (value: string) => {
    const hasOld = value === 'yes';
    addUserMessage(hasOld ? 'Evet, eski panjur var' : 'Hayır, ilk kez takılacak');
    setForm((prev) => ({ ...prev, hasOldShutter: hasOld, step: 7 }));
    setTimeout(() => {
      addBotMessage(
        'Son adım! Montaj yapılacak kat numarası nedir?\n\n📌 3. kata kadar standart montaj ücreti, üzeri için kat başına +120 ₺ ek ücret uygulanır.',
        undefined,
        'floor',
      );
    }, 300);
  };

  const handleFloorSubmit = () => {
    const f = parseInt(floorInput);
    if (isNaN(f) || f < 0 || f > 30) return;
    addUserMessage(`${f}. kat`);
    setForm((prev) => ({ ...prev, floor: String(f), step: 8 }));
    setFloorInput('');

    setTimeout(() => {
      const updatedForm: FormState = { ...form, floor: String(f), step: 8 };
      const price = calculatePrice(updatedForm, config.pricing, config.products);

      addBotMessage('', undefined, undefined, true, price);

      setTimeout(() => {
        addBotMessage('Nasıl devam etmek istersiniz?', FINAL_OPTIONS(site.phone.display));
      }, 1000);
    }, 500);
  };

  const handleFinalAction = (value: string) => {
    if (value === 'call') {
      addUserMessage('Telefon ile arayacağım');
      setTimeout(() => {
        addBotMessage(`📞 Bizi hemen arayabilirsiniz:\n\n${site.phone.display}\n${site.phone.secondary}\n\n🕐 Çalışma saatleri:\n${site.workingHours.days} ${site.workingHours.hours}\n\nGörüşmek üzere! 😊`);
      }, 300);
    } else if (value === 'whatsapp') {
      addUserMessage('WhatsApp ile yazacağım');
      setTimeout(() => {
        addBotMessage(`📱 WhatsApp hattımız:\nwa.me/${site.whatsapp.number}\n\nMesajınıza hesaplama sonucunuzu ekleyerek gönderirseniz daha hızlı dönüş yapabiliriz! 😊`);
      }, 300);
    } else {
      resetChat();
    }
  };

  const handleOptionClick = (value: string) => {
    if (form.step === 0) handleSelectType(value);
    else if (form.step === 3) handleCaseType(value);
    else if (form.step === 4) handleControlType(value);
    else if (form.step === 5) handleColorGroup(value);
    else if (form.step === 6) handleOldShutter(value);
    else if (form.step >= 8) handleFinalAction(value);
  };

  // ─── Input areas ────────────────────────────────────

  const renderInputArea = () => {
    const lastBotMsg = [...messages].reverse().find((m) => m.from === 'bot');
    if (!lastBotMsg) return null;

    if (lastBotMsg.isInput === 'dimension' && form.step === 1) {
      return (
        <div className="p-4 border-t border-gray-100 bg-white">
          <div className="flex gap-2 items-end">
            <div className="flex-1">
              <label className="text-xs text-gray-500 mb-1 block">Genişlik (cm)</label>
              <input
                type="number"
                placeholder="ör: 120"
                value={dimWidth}
                onChange={(e) => setDimWidth(e.target.value)}
                className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20"
                min={30}
                max={500}
              />
            </div>
            <div className="flex-1">
              <label className="text-xs text-gray-500 mb-1 block">Yükseklik (cm)</label>
              <input
                type="number"
                placeholder="ör: 150"
                value={dimHeight}
                onChange={(e) => setDimHeight(e.target.value)}
                className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20"
                min={30}
                max={400}
                onKeyDown={(e) => e.key === 'Enter' && handleDimensionSubmit()}
              />
            </div>
            <button
              onClick={handleDimensionSubmit}
              disabled={!dimWidth || !dimHeight}
              className="p-2.5 bg-brand-600 hover:bg-brand-700 disabled:bg-gray-300 text-white rounded-lg transition-colors shrink-0"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
          <p className="text-xs text-gray-400 mt-2">Genişlik: 30–500 cm · Yükseklik: 30–400 cm</p>
        </div>
      );
    }

    if (lastBotMsg.isInput === 'quantity' && form.step === 2) {
      return (
        <div className="p-4 border-t border-gray-100 bg-white">
          <div className="flex gap-2 items-end">
            <div className="flex-1">
              <label className="text-xs text-gray-500 mb-1 block">Adet</label>
              <input
                type="number"
                placeholder="ör: 3"
                value={qty}
                onChange={(e) => setQty(e.target.value)}
                className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20"
                min={1}
                max={50}
                onKeyDown={(e) => e.key === 'Enter' && handleQuantitySubmit()}
              />
            </div>
            <button
              onClick={handleQuantitySubmit}
              disabled={!qty}
              className="p-2.5 bg-brand-600 hover:bg-brand-700 disabled:bg-gray-300 text-white rounded-lg transition-colors shrink-0"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
          <p className="text-xs text-gray-400 mt-2">5 ve üzeri adette %5 indirim uygulanır</p>
        </div>
      );
    }

    if (lastBotMsg.isInput === 'floor' && form.step === 7) {
      return (
        <div className="p-4 border-t border-gray-100 bg-white">
          <div className="flex gap-2 items-end">
            <div className="flex-1">
              <label className="text-xs text-gray-500 mb-1 block">Kat No (giriş kat = 0)</label>
              <input
                type="number"
                placeholder="ör: 3"
                value={floorInput}
                onChange={(e) => setFloorInput(e.target.value)}
                className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20"
                min={0}
                max={30}
                onKeyDown={(e) => e.key === 'Enter' && handleFloorSubmit()}
              />
            </div>
            <button
              onClick={handleFloorSubmit}
              disabled={floorInput === ''}
              className="p-2.5 bg-brand-600 hover:bg-brand-700 disabled:bg-gray-300 text-white rounded-lg transition-colors shrink-0"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      );
    }

    return null;
  };

  // ─── Render ─────────────────────────────────────────

  return (
    <section id="calculator" className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-brand-600 font-semibold text-sm tracking-wider uppercase">
            Fiyat Hesaplama
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-serif font-bold text-gray-900">
            Anında <span className="text-brand-600">Fiyat Teklifi</span> Alın
          </h2>
          <p className="mt-4 text-gray-500 leading-relaxed">
            Asistanımız pencere ölçülerinize, malzeme ve kasa tipine göre detaylı fiyat hesaplar.
          </p>
        </div>

        <div className="max-w-lg mx-auto">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
            {/* Chat header */}
            <div className="bg-gradient-to-r from-brand-600 to-brand-700 px-5 py-4 flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-white font-semibold text-sm">Fiyat Asistanı</h3>
                <p className="text-white/70 text-xs flex items-center gap-1.5">
                  <span className="w-2 h-2 bg-green-400 rounded-full" />
                  Çevrimiçi
                </p>
              </div>
              <button
                onClick={() => setShowPriceInfo(!showPriceInfo)}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors text-white/70 hover:text-white"
                title="Fiyatlandırma bilgisi"
              >
                <Info className="w-4 h-4" />
              </button>
              <button
                onClick={resetChat}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors text-white/70 hover:text-white"
                title="Yeniden başlat"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>

            {/* Pricing info panel */}
            {showPriceInfo && (
              <div className="bg-brand-50 border-b border-brand-200 px-5 py-4 text-xs text-gray-600 space-y-2">
                <div className="font-semibold text-brand-700 text-sm">Fiyatlandırma Nasıl Hesaplanır?</div>
                <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                  {config.products.map((p) => (
                    <React.Fragment key={p.type}>
                      <span>• {p.name}:</span>
                      <span className="text-right">{p.base_price.toLocaleString('tr-TR')} ₺/m²</span>
                    </React.Fragment>
                  ))}
                </div>
                <p className="text-gray-500 pt-1">
                  + Kasa tipi, motor, renk, montaj işçiliği, kat ve söküm ücretleri ayrıca eklenir.
                  {config.pricing.discounts.areaDiscounts.filter((d) => d.rate > 0).map((d) => {
                    const upper = d.maxArea >= 999 ? 'üzeri' : `${d.maxArea} m²'ye kadar`;
                    return ` ${d.minArea} – ${upper} alanda %${(d.rate * 100).toFixed(0)} malzeme indirimi.`;
                  })}
                  {config.pricing.discounts.bulkDiscountThreshold}+ adette %{(config.pricing.discounts.bulkDiscountRate * 100).toFixed(0)} toplu sipariş indirimi.
                </p>
                <button onClick={() => setShowPriceInfo(false)} className="text-brand-600 font-medium">Kapat</button>
              </div>
            )}

            {/* Messages */}
            <div ref={chatRef} className="h-[440px] sm:h-[480px] overflow-y-auto p-4 space-y-4 bg-gray-50/50">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[88%] ${msg.from === 'user' ? '' : 'flex gap-2'}`}>
                    {msg.from === 'bot' && (
                      <div className="w-7 h-7 bg-brand-100 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                        <Bot className="w-3.5 h-3.5 text-brand-600" />
                      </div>
                    )}
                    <div className="min-w-0">
                      {msg.isPriceSummary && msg.priceDetails ? (
                        <PriceSummaryCard p={msg.priceDetails} />
                      ) : (
                        <div
                          className={`px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-line ${
                            msg.from === 'user'
                              ? 'bg-brand-600 text-white rounded-br-md'
                              : 'bg-white text-gray-700 shadow-sm border border-gray-100 rounded-bl-md'
                          }`}
                        >
                          {msg.text}
                        </div>
                      )}
                      {msg.options && i === messages.length - 1 && (
                        <div className="mt-2 space-y-1.5">
                          {msg.options.map((opt) => (
                            <button
                              key={opt.value}
                              onClick={() => handleOptionClick(opt.value)}
                              className="block w-full text-left px-4 py-2.5 bg-white hover:bg-brand-50 border border-gray-200 hover:border-brand-300 rounded-xl text-sm text-gray-700 hover:text-brand-700 transition-colors"
                            >
                              {opt.label}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="flex gap-2">
                    <div className="w-7 h-7 bg-brand-100 rounded-full flex items-center justify-center shrink-0">
                      <Bot className="w-3.5 h-3.5 text-brand-600" />
                    </div>
                    <div className="px-4 py-3 bg-white rounded-2xl rounded-bl-md shadow-sm border border-gray-100">
                      <div className="flex gap-1">
                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Input area */}
            {renderInputArea()}
          </div>

          <div className="mt-6 flex flex-wrap justify-center gap-3">
            {[
              'Malzeme + İşçilik dahil',
              'm² bazlı hesaplama',
              'KDV dahil fiyat',
            ].map((label) => (
              <span key={label} className="inline-flex items-center gap-1.5 text-xs text-gray-400 bg-gray-50 border border-gray-100 rounded-full px-3 py-1.5">
                <span className="w-1 h-1 bg-brand-400 rounded-full" />
                {label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
