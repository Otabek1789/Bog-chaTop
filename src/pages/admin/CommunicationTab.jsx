import React, { useState, useRef, useEffect } from 'react';
import { Send, Phone, Video, MoreVertical, Search, Paperclip, Smile } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

const initialContacts = [
  { id: 1, name: "Aliyev Vali (Ota)", avatar: "A", lastMessage: "Xo'p, rahmat!", time: "10:30", unread: 0, online: true },
  { id: 2, name: "Karimova Madina (Ona)", avatar: "K", lastMessage: "Ertaga boramiz", time: "Kecha", unread: 2, online: false },
  { id: 3, name: "Sodiqov Jasur (Ota)", avatar: "S", lastMessage: "To'lovni qildim", time: "Chor", unread: 0, online: true },
  { id: 4, name: "Murodov Aziz (Ona)", avatar: "M", lastMessage: "Assalomu alaykum", time: "Chor", unread: 1, online: false },
  { id: 5, name: "Tursunova Zebo (Ona)", avatar: "T", lastMessage: "Bolam kasal bo'lib qoldi", time: "11:15", unread: 0, online: true },
  { id: 6, name: "Usmonov Qodir (Ota)", avatar: "U", lastMessage: "Rasm uchun rahmat", time: "Dush", unread: 0, online: false },
];

const initialMessages = {
  1: [
    { id: 1, text: "Assalomu alaykum, bolam bugun qanday?", sender: "parent", time: "09:00" },
    { id: 2, text: "Va alaykum assalom. Yaxshi, hozir nonushta qilyapti.", sender: "admin", time: "09:05" },
    { id: 3, text: "Xo'p, rahmat!", sender: "parent", time: "10:30" }
  ],
  2: [
    { id: 1, text: "Ertaga boramiz", sender: "parent", time: "Kecha" },
    { id: 2, text: "Kutib qolamiz", sender: "admin", time: "Kecha" }
  ],
  3: [
    { id: 1, text: "Oylik to'lovni plastikdan o'tkazdim.", sender: "parent", time: "Chor" },
    { id: 2, text: "Qabul qildik, rahmat.", sender: "admin", time: "Chor" },
    { id: 3, text: "To'lovni qildim", sender: "parent", time: "Chor" }
  ],
  4: [
    { id: 1, text: "Assalomu alaykum", sender: "parent", time: "Chor" }
  ],
  5: [
    { id: 1, text: "Bolam kasal bo'lib qoldi", sender: "parent", time: "11:15" },
    { id: 2, text: "Shifo bersin, ertaga kelasizlarmi?", sender: "admin", time: "11:20" }
  ],
  6: [
    { id: 1, text: "Kecha rasmlarga oldik, zo'r chiqibdi.", sender: "admin", time: "Dush" },
    { id: 2, text: "Rasm uchun rahmat", sender: "parent", time: "Dush" }
  ]
};

export default function CommunicationTab() {
  const { t } = useLanguage();
  const [activeContactId, setActiveContactId] = useState(1);
  const [messages, setMessages] = useState(initialMessages);
  const [newMessage, setNewMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  
  const messagesEndRef = useRef(null);

  const activeContact = initialContacts.find(c => c.id === activeContactId);
  const currentMessages = messages[activeContactId] || [];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [currentMessages]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const newMsgObj = {
      id: Date.now(),
      text: newMessage,
      sender: 'admin',
      time: new Date().toLocaleTimeString('uz-UZ', { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => ({
      ...prev,
      [activeContactId]: [...(prev[activeContactId] || []), newMsgObj]
    }));

    setNewMessage('');
  };

  const filteredContacts = initialContacts.filter(c => c.name.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="animate-fade-in-up" style={{ height: 'calc(100vh - 120px)', display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h2 className="text-h2" style={{ color: 'var(--neutral-900)' }}>{t('crm.communication')}</h2>
      </div>

      <div style={{ flex: 1, display: 'flex', background: 'var(--surface-warm)', borderRadius: '16px', border: '1px solid var(--neutral-200)', overflow: 'hidden' }}>
        
        {/* Sidebar (Contacts) */}
        <div style={{ width: '350px', borderRight: '1px solid var(--neutral-200)', display: 'flex', flexDirection: 'column', background: 'var(--neutral-50)' }}>
          <div style={{ padding: '16px', borderBottom: '1px solid var(--neutral-200)' }}>
            <div style={{ position: 'relative' }}>
              <input 
                type="text" 
                placeholder={t('crm.chatSearch')} 
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                style={{ width: '100%', padding: '10px 10px 10px 40px', borderRadius: '8px', border: '1px solid var(--neutral-300)', background: 'var(--surface-warm)', color: 'var(--neutral-900)', outline: 'none' }} 
              />
              <Search size={18} color="var(--neutral-400)" style={{ position: 'absolute', left: '12px', top: '11px' }} />
            </div>
          </div>
          
          <div style={{ flex: 1, overflowY: 'auto' }}>
            {filteredContacts.map(contact => (
              <div 
                key={contact.id} 
                onClick={() => setActiveContactId(contact.id)}
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  padding: '16px', 
                  gap: '12px', 
                  cursor: 'pointer',
                  background: activeContactId === contact.id ? 'var(--brand-50)' : 'transparent',
                  borderBottom: '1px solid var(--neutral-100)',
                  transition: 'background 0.2s'
                }}
              >
                <div style={{ position: 'relative' }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'var(--brand-500)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600, fontSize: '18px' }}>
                    {contact.avatar}
                  </div>
                  {contact.online && <div style={{ position: 'absolute', bottom: 2, right: 2, width: '12px', height: '12px', background: '#10B981', borderRadius: '50%', border: '2px solid white' }}></div>}
                </div>
                
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '4px' }}>
                    <div style={{ fontWeight: 600, color: 'var(--neutral-900)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{contact.name}</div>
                    <div style={{ fontSize: '12px', color: 'var(--neutral-400)' }}>{contact.time}</div>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ fontSize: '14px', color: 'var(--neutral-500)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {contact.id === activeContactId && currentMessages.length > 0 ? currentMessages[currentMessages.length - 1].text : contact.lastMessage}
                    </div>
                    {contact.unread > 0 && (
                      <div style={{ background: '#10B981', color: 'white', fontSize: '12px', fontWeight: 600, padding: '2px 6px', borderRadius: '10px' }}>
                        {contact.unread}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          {/* Chat Header */}
          <div style={{ padding: '16px 24px', borderBottom: '1px solid var(--neutral-200)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--surface-warm)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--brand-500)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600 }}>
                {activeContact?.avatar}
              </div>
              <div>
                <div style={{ fontWeight: 600, color: 'var(--neutral-900)' }}>{activeContact?.name}</div>
                <div style={{ fontSize: '13px', color: activeContact?.online ? '#10B981' : 'var(--neutral-400)' }}>
                  {activeContact?.online ? t('crm.chatOnline') : t('crm.chatOffline')}
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '16px', color: 'var(--neutral-500)' }}>
              <Phone size={20} style={{ cursor: 'pointer' }} />
              <Video size={20} style={{ cursor: 'pointer' }} />
              <MoreVertical size={20} style={{ cursor: 'pointer' }} />
            </div>
          </div>

          {/* Messages */}
          <div style={{ flex: 1, padding: '24px', overflowY: 'auto', background: 'var(--neutral-50)', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {currentMessages.length === 0 ? (
              <div style={{ margin: 'auto', color: 'var(--neutral-400)' }}>{t('crm.chatNoMessages')}</div>
            ) : (
              currentMessages.map(msg => (
                <div key={msg.id} style={{ display: 'flex', flexDirection: 'column', alignItems: msg.sender === 'admin' ? 'flex-end' : 'flex-start' }}>
                  <div style={{ 
                    maxWidth: '70%', 
                    padding: '12px 16px', 
                    borderRadius: '16px',
                    borderBottomRightRadius: msg.sender === 'admin' ? '4px' : '16px',
                    borderBottomLeftRadius: msg.sender === 'parent' ? '4px' : '16px',
                    background: msg.sender === 'admin' ? 'var(--brand-500)' : 'var(--surface-warm)',
                    color: msg.sender === 'admin' ? 'white' : 'var(--neutral-900)',
                    boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
                  }}>
                    {msg.text}
                  </div>
                  <div style={{ fontSize: '11px', color: 'var(--neutral-400)', marginTop: '4px', padding: '0 4px' }}>
                    {msg.time}
                  </div>
                </div>
              ))
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Message Input */}
          <div style={{ padding: '16px 24px', background: 'var(--surface-warm)', borderTop: '1px solid var(--neutral-200)' }}>
            <form onSubmit={handleSend} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <button type="button" style={{ background: 'none', border: 'none', color: 'var(--neutral-400)', cursor: 'pointer', padding: '8px' }}>
                <Paperclip size={20} />
              </button>
              <input 
                type="text" 
                value={newMessage}
                onChange={e => setNewMessage(e.target.value)}
                placeholder={t('crm.chatPlaceholder')} 
                style={{ flex: 1, padding: '12px 16px', borderRadius: '24px', border: '1px solid var(--neutral-300)', background: 'var(--neutral-50)', color: 'var(--neutral-900)', outline: 'none' }} 
              />
              <button type="button" style={{ background: 'none', border: 'none', color: 'var(--neutral-400)', cursor: 'pointer', padding: '8px' }}>
                <Smile size={20} />
              </button>
              <button 
                type="submit" 
                style={{ 
                  background: newMessage.trim() ? 'var(--brand-500)' : 'var(--neutral-300)', 
                  color: 'white', 
                  border: 'none', 
                  borderRadius: '50%', 
                  width: '44px', 
                  height: '44px', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  cursor: newMessage.trim() ? 'pointer' : 'default',
                  transition: 'background 0.2s'
                }}
              >
                <Send size={18} style={{ marginLeft: '2px' }} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
