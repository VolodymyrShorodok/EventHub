import type { Config } from 'tailwindcss';

const config: Config = {
  theme: {
    extend: {
      colors: {
        canvas: '#f4f5fa',
        'text-default': '#243047',
        'surface-sidebar': '#f8fafc',
        'surface-active': '#eff6ff',
        'text-active': '#1976d2',
        'border-soft': '#dce3ed',
        'border-illustration': '#dde5ee',
        'surface-fact': '#eef4fb',
        'surface-benefit': '#dce5f0',
        'danger-soft': '#f45d69',
        'illustration-blue': '#2e8fe7',
        'illustration-indigo': '#4c54df',
        'illustration-light': '#83c5ff',
        'illustration-border': '#98c6ff',
        'illustration-icon': '#267ee6',
        'illustration-fill': '#8fc5ff',
        'color-heading': '#334155',
        'color-body': '#64748b',
        'color-muted': '#94a3b8',
        primary: '#3292e6',
        'primary-hover': '#197fd4',
        accent: '#258be4',
        'accent-soft': '#e3f1ff',
      },
      backgroundImage: {
        'illustration-radial':
          'radial-gradient(circle at 50% 56%, #e4f0ff 0, #f8fbff 28%, #fff 62%)',
      },
      fontSize: {
        micro: ['8px', { lineHeight: '1.4' }],
        tiny: ['9px', { lineHeight: '1.4' }],
        overline: ['10px', { lineHeight: '1.4', fontWeight: '700' }],
        caption: ['12px', { lineHeight: '1.4' }],
        ui: ['13px', { lineHeight: '1.4' }],
        'body-sm': ['14px', { lineHeight: '1.4' }],
        'heading-3': ['20px', { lineHeight: '1.25', fontWeight: '600' }],
        'page-title': ['28px', { lineHeight: '1.2', fontWeight: '700' }],
        price: ['28px', { lineHeight: '1.2', fontWeight: '800' }],
        'heading-1': ['30px', { lineHeight: '1.15', fontWeight: '700' }],
        'heading-2': ['20px', { lineHeight: '1.2', fontWeight: '600' }],
        body: ['16px', { lineHeight: '1.6' }],
      },
    },
  },
};

export default config;
