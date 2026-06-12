import { useMemo } from 'react';
import katex from 'katex';

// Renders a string with inline $...$ math segments via KaTeX.
// Plain text is escaped; only the math segments become HTML.
export default function MathText({ text, className }: { text: string; className?: string }) {
  const html = useMemo(() => renderMixed(text), [text]);
  return <span className={className} dangerouslySetInnerHTML={{ __html: html }} />;
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\\\$/g, '$'); // "\$" is a literal dollar sign
}

function renderMixed(text: string): string {
  // Split on unescaped $...$ pairs.
  const parts: string[] = [];
  let rest = text;
  const re = /(?<!\\)\$([^$]+?)(?<!\\)\$/;
  let match = re.exec(rest);
  while (match) {
    parts.push(escapeHtml(rest.slice(0, match.index)));
    try {
      parts.push(katex.renderToString(match[1], { throwOnError: false, output: 'html' }));
    } catch {
      parts.push(escapeHtml(match[0]));
    }
    rest = rest.slice(match.index + match[0].length);
    match = re.exec(rest);
  }
  parts.push(escapeHtml(rest));
  return parts.join('');
}
