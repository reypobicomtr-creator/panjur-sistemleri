import { MessageCircle } from 'lucide-react';
import { SITE } from '@/config/site';

export default function WhatsAppButton() {
  const waUrl = `https://wa.me/${SITE.whatsapp.number}?text=${encodeURIComponent(SITE.whatsapp.message)}`;

  return (
    <a
      href={waUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-40 w-14 h-14 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg hover:shadow-xl flex items-center justify-center transition-all hover:scale-110 group"
      title="WhatsApp ile iletişime geçin"
    >
      <MessageCircle className="w-6 h-6" />
      {/* Tooltip */}
      <span className="absolute right-full mr-3 px-3 py-1.5 bg-gray-900 text-white text-xs rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        WhatsApp ile yazın
      </span>
      {/* Pulse ring */}
      <span className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-25" />
    </a>
  );
}
