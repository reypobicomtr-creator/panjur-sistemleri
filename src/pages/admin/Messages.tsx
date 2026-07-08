import { useEffect, useState } from 'react';
import { Trash2, Mail, Phone, User, Calendar, CheckCheck } from 'lucide-react';
import { getContacts, markContactRead, deleteContact, type ContactMessage } from '@/lib/db';

export default function Messages() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);

  useEffect(() => {
    getContacts().then(setMessages);
  }, []);

  const handleMarkRead = async (id: number) => {
    await markContactRead(id);
    setMessages((prev) => prev.map((m) => (m.id === id ? { ...m, is_read: true } : m)));
  };

  const handleDelete = async (id: number) => {
    await deleteContact(id);
    setMessages((prev) => prev.filter((m) => m.id !== id));
  };

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return '';
    const d = new Date(dateStr);
    return d.toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' });
  };

  const unread = messages.filter((m) => !m.is_read).length;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gelen Mesajlar</h1>
          <p className="text-sm text-gray-500 mt-1">{messages.length} mesaj ({unread} okunmamış)</p>
        </div>
      </div>

      <div className="space-y-3">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`bg-white rounded-xl border p-4 transition-colors ${msg.is_read ? 'border-gray-200' : 'border-brand-300 bg-brand-50/30'}`}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="flex items-center gap-1.5 font-semibold text-gray-900 text-sm">
                    <User className="w-3.5 h-3.5 text-gray-400" />
                    {msg.name}
                  </span>
                  {!msg.is_read && (
                    <span className="px-2 py-0.5 bg-brand-600 text-white text-[10px] font-semibold rounded-full">YENİ</span>
                  )}
                </div>
                <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-500 mb-2">
                  <span className="flex items-center gap-1">
                    <Phone className="w-3 h-3" /> {msg.phone}
                  </span>
                  {msg.email && (
                    <span className="flex items-center gap-1">
                      <Mail className="w-3 h-3" /> {msg.email}
                    </span>
                  )}
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" /> {formatDate(msg.created_at)}
                  </span>
                </div>
                {msg.message && (
                  <p className="text-sm text-gray-600 leading-relaxed bg-gray-50 rounded-lg p-3 mt-1">
                    {msg.message}
                  </p>
                )}
              </div>
              <div className="flex items-center gap-1 shrink-0">
                {!msg.is_read && (
                  <button onClick={() => handleMarkRead(msg.id!)} className="p-1.5 text-brand-600 hover:bg-brand-100 rounded-lg transition-colors" title="Okundu işaretle">
                    <CheckCheck className="w-4 h-4" />
                  </button>
                )}
                <button onClick={() => handleDelete(msg.id!)} className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors" title="Sil">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
        {messages.length === 0 && (
          <div className="text-center py-16 bg-white rounded-xl border border-gray-200">
            <Mail className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-sm text-gray-400">Henüz mesaj yok.</p>
            <p className="text-xs text-gray-300 mt-1">Form doldurulunca mesajlar burada görünecek.</p>
          </div>
        )}
      </div>
    </div>
  );
}
