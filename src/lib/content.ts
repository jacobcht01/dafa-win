import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface PageFrontmatter {
  title: string;
  description: string;
  lang: 'en' | 'te';
  url: string;
  keywords: string[];
  lastUpdated: string;
  author: string;
  schema: string[];
}

export interface PageData extends PageFrontmatter {
  body: string;
  slug: string;
}

const CONTENT_DIR = path.join(process.cwd(), 'content');

export function getPageData(locale: string, slug: string): PageData | null {
  const filePath = path.join(CONTENT_DIR, locale, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(raw);
  return {
    title: data.title ?? '',
    description: data.description ?? '',
    lang: data.lang ?? locale,
    url: data.url ?? `/${locale}/${slug}/`,
    keywords: Array.isArray(data.keywords) ? data.keywords : [],
    lastUpdated: data.lastUpdated ?? '',
    author: data.author ?? '',
    schema: Array.isArray(data.schema) ? data.schema : [],
    body: content.trim(),
    slug,
  };
}

/** Extract FAQ Q&A pairs from a markdown body (### headings inside a FAQ section). */
export function extractFaqs(body: string): { q: string; a: string }[] {
  const faqMatch = body.match(
    /##\s+[^\n]*(?:FAQ|ప్రశ్న|Frequently|Questions)[^\n]*([\s\S]*?)(?=\n##\s|\n---\s*\n\s*>|\n\*Key|\n---\s*$|$)/i
  );
  if (!faqMatch) return [];

  const pairs: { q: string; a: string }[] = [];
  const section = faqMatch[1];
  const blocks = section.split(/\n###\s+/).slice(1);

  for (const block of blocks.slice(0, 10)) {
    const lines = block.split('\n');
    const q = lines[0].trim().replace(/\??\s*$/, '?');
    const a = lines
      .slice(1)
      .join(' ')
      .replace(/\s+/g, ' ')
      .trim();
    if (q && a) pairs.push({ q, a });
  }

  return pairs;
}
