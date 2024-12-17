import { codeToHtml } from 'shiki';

export async function highlight(code: string, lang = 'cpp') {
  return codeToHtml(code, {
    lang,
    theme: 'github-dark'
  });
} 