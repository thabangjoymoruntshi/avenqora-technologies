"use client";

import { useEffect, useState } from "react";

type Message = {
  role: "user" | "assistant";
  content: string;
};

const suggestions = [
  {
    label: "I need a website",
    description: "Build a professional online presence",
  },
  {
    label: "I need business software",
    description: "Create a system around your workflow",
  },
  {
    label: "I want to automate something",
    description: "Reduce repetitive manual work",
  },
  {
    label: "I have an idea",
    description: "Explore what could be built",
  },
  {
    label: "I'm not sure what I need",
    description: "Start with the problem you're facing",
  },
];

export default function AvenqoraAI() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
  const savedMessages = localStorage.getItem("avenqora-ai-messages");

  if (savedMessages) {
    try {
      setMessages(JSON.parse(savedMessages));
    } catch {
      localStorage.removeItem("avenqora-ai-messages");
    }
  }
}, []);

useEffect(() => {
  if (messages.length > 0) {
    localStorage.setItem(
      "avenqora-ai-messages",
      JSON.stringify(messages)
    );
  }
}, [messages]);

  const sendMessage = async (text?: string) => {
    const trimmedMessage = (text ?? message).trim();

    if (!trimmedMessage || isLoading) return;

    const userMessage: Message = {
      role: "user",
      content: trimmedMessage,
    };

    const updatedMessages = [...messages, userMessage];

    setMessages(updatedMessages);
    setMessage("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/ai/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: trimmedMessage,
          history: messages,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong.");
      }

      setMessages([
        ...updatedMessages,
        {
          role: "assistant",
          content: data.reply,
        },
      ]);
    } catch (error) {
      console.error("Chat error:", error);

      setMessages([
        ...updatedMessages,
        {
          role: "assistant",
          content:
            "Avenqora AI is temporarily busy. Please try again in a moment.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <>
      {/* Floating button */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-cyan-400 text-slate-950 shadow-lg shadow-cyan-400/20 transition hover:scale-105 hover:bg-cyan-300"
        aria-label="Open Avenqora AI"
      >
        <span className="text-xl">✦</span>
      </button>

      {/* Chat window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 flex h-[600px] w-[calc(100vw-2rem)] max-w-md flex-col overflow-hidden rounded-2xl border border-white/10 bg-slate-950 shadow-2xl shadow-black/40">

          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/10 bg-slate-900 px-5 py-4">
  <div>
    <p className="text-sm font-semibold text-cyan-400">
      Avenqora AI
    </p>

    <p className="text-xs text-slate-400">
      Discover what&apos;s possible
    </p>
  </div>

  <div className="flex items-center gap-3">
    {messages.length > 0 && (
      <button
        type="button"
        onClick={() => {
          setMessages([]);
          localStorage.removeItem("avenqora-ai-messages");
        }}
        className="text-xs font-medium text-slate-400 transition hover:text-cyan-400"
      >
        New chat
      </button>
    )}

    <button
      type="button"
      onClick={() => setIsOpen(false)}
      className="text-xl text-slate-400 transition hover:text-white"
      aria-label="Close chat"
    >
      ×
    </button>
  </div>
</div>

          {/* Conversation */}
          <div className="flex-1 overflow-y-auto p-5">

            {/* Welcome screen */}
            {messages.length === 0 && (
              <div className="flex h-full flex-col justify-center">

                <div className="mb-7">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl border border-cyan-400/20 bg-cyan-400/10 text-cyan-400">
                    ✦
                  </div>

                  <h2 className="text-2xl font-bold tracking-tight text-white">
                    What are you looking to accomplish?
                  </h2>

                  <p className="mt-3 text-sm leading-6 text-slate-400">
                    Tell me about your idea, problem, or goal. You don&apos;t
                    need to know the technical solution.
                  </p>
                </div>

                <div className="space-y-2.5">
                  {suggestions.map((suggestion) => (
                    <button
                      key={suggestion.label}
                      type="button"
                      onClick={() => sendMessage(suggestion.label)}
                      className="group flex w-full items-center justify-between rounded-xl border border-white/10 bg-slate-900/60 px-4 py-3 text-left transition hover:border-cyan-400/30 hover:bg-slate-900"
                    >
                      <div>
                        <p className="text-sm font-medium text-slate-200 transition group-hover:text-white">
                          {suggestion.label}
                        </p>

                        <p className="mt-0.5 text-xs text-slate-500">
                          {suggestion.description}
                        </p>
                      </div>

                      <span className="ml-3 text-slate-600 transition group-hover:translate-x-1 group-hover:text-cyan-400">
                        →
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Messages */}
            {messages.length > 0 && (
              <div className="space-y-4">
                {messages.map((item, index) => (
                  <div
                    key={index}
                    className={`flex ${
                      item.role === "user"
                        ? "justify-end"
                        : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-6 ${
                        item.role === "user"
                          ? "bg-cyan-400 text-slate-950"
                          : "bg-slate-900 text-slate-300"
                      }`}
                    >
                    <div>
  {item.content}

  {item.role === "assistant" &&
    item.content.toLowerCase().includes("start a project") && (
      <a
        href="/?project=website#contact"
        onClick={() => setIsOpen(false)}
        className="mt-4 inline-flex items-center rounded-full bg-cyan-400 px-4 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
      >
        Start a Project
        <span className="ml-2">→</span>
      </a>
    )}
</div>
                      
                             
                    </div>
                  </div>
                ))}

                {isLoading && (
                  <div className="flex justify-start">
                    <div className="rounded-2xl bg-slate-900 px-4 py-3 text-sm text-slate-400">
                      Thinking...
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Input */}
          <div className="border-t border-white/10 bg-slate-900 p-4">
            <div className="flex gap-2">
              <input
                type="text"
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Tell me what you want to build..."
                className="min-w-0 flex-1 rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-cyan-400/50"
              />

              <button
                type="button"
                onClick={() => sendMessage()}
                disabled={isLoading || !message.trim()}
                className="rounded-xl bg-cyan-400 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}