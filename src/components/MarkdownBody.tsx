import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export default function MarkdownBody({ content }: { content: string }) {
  return (
    <div className="prose-dafawin">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ children }) => <h1 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">{children}</h1>,
          h2: ({ children }) => <h2 className="text-2xl font-bold text-white mt-10 mb-4 pb-2 border-b border-brand-border">{children}</h2>,
          h3: ({ children }) => <h3 className="text-xl font-semibold text-gold-400 mt-8 mb-3">{children}</h3>,
          h4: ({ children }) => <h4 className="text-lg font-semibold text-gray-200 mt-6 mb-2">{children}</h4>,
          p: ({ children }) => <p className="text-gray-300 leading-relaxed mb-4">{children}</p>,
          ul: ({ children }) => <ul className="space-y-2 mb-6">{children}</ul>,
          ol: ({ children }) => <ol className="list-decimal list-inside space-y-2 mb-6 text-gray-300">{children}</ol>,
          li: ({ children }) => (
            <li className="flex items-start gap-2 text-gray-300">
              <span className="text-gold-400 mt-1 flex-shrink-0 text-xs">▸</span>
              <span>{children}</span>
            </li>
          ),
          a: ({ href, children }) => (
            <a href={href} className="text-gold-400 hover:text-gold-300 underline underline-offset-2 transition-colors"
              {...(href?.startsWith('http') ? { target: '_blank', rel: 'nofollow noopener noreferrer' } : {})}>
              {children}
            </a>
          ),
          table: ({ children }) => (
            <div className="overflow-x-auto mb-6 rounded-xl border border-brand-border">
              <table className="w-full text-sm">{children}</table>
            </div>
          ),
          thead: ({ children }) => <thead className="bg-brand-card">{children}</thead>,
          th: ({ children }) => <th className="px-4 py-3 text-left font-bold text-gold-400 border-b border-brand-border whitespace-nowrap">{children}</th>,
          td: ({ children }) => <td className="px-4 py-3 text-gray-300 border-b border-brand-border/50">{children}</td>,
          tr: ({ children }) => <tr className="even:bg-brand-card/30 hover:bg-brand-card/60 transition-colors">{children}</tr>,
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-gold-500 pl-4 py-2 bg-brand-card rounded-r-xl my-6 text-gray-400 italic">
              {children}
            </blockquote>
          ),
          strong: ({ children }) => <strong className="text-white font-bold">{children}</strong>,
          hr: () => <hr className="border-brand-border my-8" />,
          code: ({ children }) => <code className="bg-brand-card text-gold-400 px-1.5 py-0.5 rounded text-sm">{children}</code>,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
