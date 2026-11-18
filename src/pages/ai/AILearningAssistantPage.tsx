import React, { useState } from 'react';
import {
  Sparkles,
  Send,
  BookOpen,
  Copy,
  RotateCcw,
  Check,
  HelpCircle,
  Lightbulb,
  Layers,
} from 'lucide-react';
import { useStore } from '../../store/useStore';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { Breadcrumb } from '../../components/common/Breadcrumb';

export const AILearningAssistantPage: React.FC = () => {
  const { aiStudentMessages, sendStudentAIMessage, subjects } = useStore();

  const [inputPrompt, setInputPrompt] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('Informatika');
  const [isThinking, setIsThinking] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const quickPrompts = [
    'Jelaskan perbedaan Linear Search dan Binary Search dengan analogi',
    'Buatkan 3 kartu belajar (flashcard) ringkas bab Polinomial',
    'Bagaimana langkah membuktikan rumus kontinuitas fluida?',
    'Rangkumkan perbedaan Bubble Sort dan Merge Sort',
  ];

  const handleSendMessage = (textToSend?: string) => {
    const text = textToSend || inputPrompt;
    if (!text.trim() || isThinking) return;

    setInputPrompt('');
    setIsThinking(true);

    setTimeout(() => {
      sendStudentAIMessage(text);
      setIsThinking(false);
    }, 700);
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-6">
      <Breadcrumb
        items={[
          { label: 'AI Center', href: '/ai/assistant' },
          { label: 'AI Learning Assistant (Tutor Belajar)' },
        ]}
      />

      {/* Header */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#EAF0F8] text-[#142B50] flex items-center justify-center font-bold">
              <Sparkles className="w-4 h-4 text-[#142B50]" />
            </div>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">
              AI Learning Assistant & Tutor
            </h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Pendamping belajar siswa interaktif dengan rujukan silabus buku teks resmi Kemendikdasmen.
          </p>
        </div>

        {/* Subject Context Selector */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500 font-medium">Konteks Mata Pelajaran:</span>
          <select
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            className="px-3 py-1.5 text-xs font-semibold text-[#142B50] border border-[#142B50]/20 rounded-lg bg-[#EAF0F8] focus:outline-none cursor-pointer"
          >
            {subjects.map((s) => (
              <option key={s.id} value={s.name}>
                {s.name} ({s.className})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Chat Area Container */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col h-[650px] overflow-hidden">
        {/* Messages Stream */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5">
          {aiStudentMessages.map((msg) => {
            const isUser = msg.sender === 'user';
            return (
              <div
                key={msg.id}
                className={`flex gap-3 max-w-3xl ${isUser ? 'ml-auto flex-row-reverse' : ''}`}
              >
                {/* Avatar */}
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-xs font-bold ${
                    isUser
                      ? 'bg-[#142B50] text-white'
                      : 'bg-gradient-to-tr from-blue-600 to-indigo-700 text-white'
                  }`}
                >
                  {isUser ? 'U' : <Sparkles className="w-4 h-4" />}
                </div>

                {/* Message Bubble */}
                <div
                  className={`rounded-2xl p-4 text-xs sm:text-sm leading-relaxed ${
                    isUser
                      ? 'bg-[#142B50] text-white rounded-tr-none'
                      : 'bg-[#F5F7FB] border border-slate-200 text-slate-800 rounded-tl-none'
                  }`}
                >
                  <div className="whitespace-pre-line space-y-2">{msg.content}</div>

                  {/* Sources / References */}
                  {msg.sourceReferences && msg.sourceReferences.length > 0 && (
                    <div className="mt-3 pt-3 border-t border-slate-200/60 text-[11px] text-slate-500 flex flex-wrap items-center gap-1.5">
                      <BookOpen className="w-3.5 h-3.5 text-[#142B50]" />
                      <span className="font-semibold text-slate-700">Rujukan Resmi:</span>
                      {msg.sourceReferences.map((ref, idx) => (
                        <span
                          key={idx}
                          className="bg-white px-2 py-0.5 rounded border border-slate-200 text-slate-600"
                        >
                          {ref.title} {ref.page ? `(Hal. ${ref.page})` : ''}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Suggested Follow-ups */}
                  {msg.suggestedFollowUps && msg.suggestedFollowUps.length > 0 && (
                    <div className="mt-4 pt-3 border-t border-slate-200/60">
                      <span className="text-[10px] text-slate-400 font-bold uppercase block mb-1.5">
                        Pertanyaan Terkait:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {msg.suggestedFollowUps.map((prompt, pIdx) => (
                          <button
                            key={pIdx}
                            type="button"
                            onClick={() => handleSendMessage(prompt)}
                            className="text-[11px] bg-white hover:bg-slate-100 text-[#142B50] px-2.5 py-1 rounded-full border border-slate-200 transition-colors text-left cursor-pointer"
                          >
                            + {prompt}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Assistant Message Actions */}
                  {!isUser && (
                    <div className="mt-3 flex items-center justify-end gap-2 text-[11px] text-slate-400">
                      <button
                        type="button"
                        onClick={() => handleCopy(msg.id, msg.content)}
                        className="hover:text-slate-700 flex items-center gap-1 cursor-pointer"
                      >
                        {copiedId === msg.id ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-600" />
                            <span className="text-emerald-600">Disalin</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span>Salin</span>
                          </>
                        )}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {/* Thinking loading indicator */}
          {isThinking && (
            <div className="flex gap-3 max-w-xl">
              <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0">
                <Sparkles className="w-4 h-4 animate-spin" />
              </div>
              <div className="bg-[#F5F7FB] border border-slate-200 rounded-2xl p-4 text-xs text-slate-500 flex items-center gap-2">
                <span className="animate-pulse">AI Tutor sedang menganalisis silabus buku dan menyusun jawaban...</span>
              </div>
            </div>
          )}
        </div>

        {/* Quick Suggestion Chips */}
        <div className="px-4 py-2 bg-slate-50 border-t border-slate-200 flex items-center gap-2 overflow-x-auto">
          <span className="text-[10px] text-slate-400 font-semibold uppercase shrink-0">
            Contoh Pertanyaan:
          </span>
          {quickPrompts.map((q, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleSendMessage(q)}
              className="text-[11px] bg-white text-slate-700 hover:text-[#142B50] hover:border-[#142B50] px-2.5 py-1 rounded-md border border-slate-200 whitespace-nowrap transition-colors cursor-pointer"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Bottom Input Form */}
        <div className="p-3 sm:p-4 bg-white border-t border-slate-200">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex gap-2"
          >
            <input
              type="text"
              value={inputPrompt}
              onChange={(e) => setInputPrompt(e.target.value)}
              placeholder={`Tanyakan konsep pembelajaran seputar ${selectedSubject}...`}
              className="flex-1 px-4 py-2.5 text-xs sm:text-sm border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#142B50] bg-slate-50 focus:bg-white"
            />
            <Button
              type="submit"
              variant="primary"
              size="md"
              disabled={!inputPrompt.trim() || isThinking}
              rightIcon={<Send className="w-4 h-4" />}
            >
              Kirim
            </Button>
          </form>
          <p className="text-[10px] text-slate-400 text-center mt-2">
            AI Assistant bertindak sebagai pendamping pemahaman konsep. Selalu diskusikan kembali hasil belajar bersama bapak/ibu guru di kelas.
          </p>
        </div>
      </div>
    </div>
  );
};
