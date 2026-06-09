import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface MarkdownContentProps {
  content: string;
  lang?: 'en' | 'te';
}

export default function MarkdownContent({ content, lang = 'en' }: MarkdownContentProps) {
  const isTE = lang === 'te';

  return (
    <div className={`prose prose-invert prose-gold max-w-none ${isTE ? 'font-telugu' : ''}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ children }) => (
            <h1 className="text-3xl sm:text-4xl font-black text-white mb-6 leading-tight">{children}</h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-2xl font-black text-white mt-10 mb-4 pb-2 border-b border-gold-500/20">{children}</h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-xl font-bold text-gold-400 mt-8 mb-3">{children}</h3>
          ),
          h4: ({ children }) => (
            <h4 className="text-lg font-bold text-gray-200 mt-6 mb-2">{children}</h4>
          ),
          p: ({ children }) => (
            <p className="text-gray-300 leading-relaxed mb-4">{children}</p>
          ),
          ul: ({ children }) => (
            <ul className="list-none space-y-2 mb-6 pl-0">{children}</ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal list-inside space-y-2 mb-6 text-gray-300">{children}</ol>
          ),
          li: ({ children }) => (
            <li className="flex items-start gap-2 text-gray-300">
              <span className="text-gold-400 mt-1 flex-shrink-0">▸</span>
              <span>{children}</span>
            </li>
          ),
          a: ({ href, children }) => (
            <a
              href={href}
              className="text-gold-400 hover:text-gold-300 underline underline-offset-2 transition-colors"
              {...(href?.startsWith('http') ? { target: '_blank', rel: 'nofollow noopener noreferrer' } : {})}
            >
              {children}
            </a>
          ),
          table: ({ children }) => (
            <div className="overflow-x-auto mb-6 rounded-xl border border-gold-500/10">
              <table className="w-full text-sm">{children}</table>
            </div>
          ),
          thead: ({ children }) => (
            <thead className="bg-dark-800">{children}</thead>
          ),
          th: ({ children }) => (
            <th className="px-4 py-3 text-left font-bold text-gold-400 whitespace-nowrap border-b border-gold-500/20">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="px-4 py-3 text-gray-300 border-b border-dark-700">{children}</td>
          ),
          tr: ({ children }) => (
            <tr className="even:bg-dark-800/40 hover:bg-dark-700/40 transition-colors">{children}</tr>
          ),
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-gold-500 pl-4 py-2 bg-dark-800/50 rounded-r-xl my-6 text-gray-400 italic">
              {children}
            </blockquote>
          ),
          strong: ({ children }) => (
            <strong className="text-white font-bold">{children}</strong>
          ),
          hr: () => <hr className="border-gold-500/20 my-8" />,
          code: ({ children, className }) => {
            const isBlock = className?.includes('language-');
            return isBlock ? (
              <code className="block bg-dark-800 rounded-lg p-4 text-sm text-gray-200 overflow-x-auto my-4">
                {children}
              </code>
            ) : (
              <code className="bg-dark-700 text-gold-400 px-1.5 py-0.5 rounded text-sm">{children}</code>
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
