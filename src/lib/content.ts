import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const CONTENT_DIR = path.join(process.cwd(), 'content');

export interface PageMeta {
  title: string;
  description: string;
  lang: 'en' | 'te';
  url: string;
  keywords: string[];
  lastUpdated: string;
  author: string;
  schema: string[];
  slug: string;
}

export interface PageContent extends PageMeta {
  body: string;
}

export function getPageContent(lang: 'en' | 'te', slug: string): PageContent | null {
  const filePath = path.join(CONTENT_DIR, lang, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(raw);

  return {
    title: data.title ?? '',
    description: data.description ?? '',
    lang: data.lang ?? lang,
    url: data.url ?? `/${lang === 'te' ? 'te/' : ''}${slug}/`,
    keywords: data.keywords ?? [],
    lastUpdated: data.lastUpdated ?? '',
    author: data.author ?? '',
    schema: data.schema ?? [],
    slug,
    body: content,
  };
}

export function getAllSlugs(lang: 'en' | 'te'): string[] {
  const dir = path.join(CONTENT_DIR, lang);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.md'))
    .map((f) => f.replace(/\.md$/, ''));
}

export const EN_SLUGS = [
  'index',
  'dafabet-review',
  'cricket-betting',
  'ipl-betting',
  'online-casino',
  'dafabet-bonus',
  'dafabet-registration',
  'dafabet-payment',
  'dafabet-app-download',
  'sports-betting',
  'responsible-gambling',
];

export const TE_SLUGS = EN_SLUGS;

export const SLUG_TO_PATH: Record<string, string> = {
  index: '/',
  'dafabet-review': '/dafabet-review/',
  'cricket-betting': '/cricket-betting/',
  'ipl-betting': '/ipl-betting/',
  'online-casino': '/online-casino/',
  'dafabet-bonus': '/dafabet-bonus/',
  'dafabet-registration': '/dafabet-registration/',
  'dafabet-payment': '/dafabet-payment/',
  'dafabet-app-download': '/dafabet-app-download/',
  'sports-betting': '/sports-betting/',
  'responsible-gambling': '/responsible-gambling/',
};
