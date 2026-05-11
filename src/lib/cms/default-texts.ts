import { translations } from '@/src/i18n/translations';
import type { StaticTextRow } from './types';

function flatten(value: unknown, prefix = '', output: Record<string, unknown> = {}) {
  if (Array.isArray(value) || typeof value !== 'object' || value === null) {
    output[prefix] = value;
    return output;
  }

  for (const [key, child] of Object.entries(value)) {
    flatten(child, prefix ? `${prefix}.${key}` : key, output);
  }

  return output;
}

export function getDefaultStaticTextRows(): StaticTextRow[] {
  const ro = flatten(translations.ro);
  const en = flatten(translations.en);
  const ru = flatten(translations.ru);
  const keys = Array.from(new Set([...Object.keys(ro), ...Object.keys(en), ...Object.keys(ru)])).sort();

  return keys.map((key) => ({
    key,
    value_ro: ro[key] ?? '',
    value_en: en[key] ?? '',
    value_ru: ru[key] ?? ''
  }));
}
