// import { icons as lineMd } from '@iconify-json/line-md'
import { icons as antDesign } from '@iconify-json/ant-design'
import presetIcons from 'unocss/preset-icons'
import presetUno from 'unocss/preset-uno'
import { defineConfig } from 'unocss/vite'

// Todo 全量导入 vite 启动太慢
const IconNames = [
  // ...Object.keys(lineMd.icons).map((iconName) => `i-${lineMd.prefix}:${iconName}`)
  ...Object.keys(antDesign.icons).map((iconName) => `i-${antDesign.prefix}:${iconName}`)
]

export default defineConfig({
  transformers: [],
  content: {
    pipeline: {
      exclude: ['node_modules', 'dist', '.git', '.husky', '.vscode', 'public', 'build', 'mock']
    }
  },
  presets: [
    presetUno({ dark: 'class' }),
    presetIcons({ warn: true, extraProperties: { display: 'inline-block' } })
  ],
  shortcuts: {
    'wh-full': 'w-full h-full',
    'flex-center': 'flex justify-center items-center',
    'flex-between': 'flex justify-between items-center',
    'flex-x-center': 'flex justify-center',
    'flex-y-center': 'flex items-center',
    'fixed-lt': 'fixed left-0 top-0',
    'fixed-center': 'fixed-lt flex-center w-full h-full',
    'transition-base': 'transition-all duration-300 ease-in-out'
  },
  theme: {
    colors: {
      primary: 'rgb(var(--primary-color))',
      primary_hover: 'rgb(var(--primary-color-hover))',
      primary_pressed: 'rgb(var(--primary-color-pressed))',
      primary_active: 'rgba(var(--primary-color-active),0.1)',
      primary_1: 'rgb(var(--primary-color1))',
      primary_2: 'rgb(var(--primary-color2))',
      primary_3: 'rgb(var(--primary-color3))',
      primary_4: 'rgb(var(--primary-color4))',
      primary_5: 'rgb(var(--primary-color5))',
      primary_6: 'rgb(var(--primary-color6))',
      primary_7: 'rgb(var(--primary-color7))',
      primary_8: 'rgb(var(--primary-color8))',
      primary_9: 'rgb(var(--primary-color9))',
      info: 'rgb(var(--info-color))',
      info_hover: 'rgb(var(--info-color-hover))',
      info_pressed: 'rgb(var(--info-color-pressed))',
      info_active: 'rgb(var(--info-color-active),0.1)',
      success: 'rgb(var(--success-color))',
      success_hover: 'rgb(var(--success-color-hover))',
      success_pressed: 'rgb(var(--success-color-pressed))',
      success_active: 'rgb(var(--success-color-active),0.1)',
      warning: 'rgb(var(--warning-color))',
      warning_hover: 'rgb(var(--warning-color-hover))',
      warning_pressed: 'rgb(var(--warning-color-pressed))',
      warning_active: 'rgb(var(--warning-color-active),0.1)',
      error: 'rgb(var(--error-color))',
      error_hover: 'rgb(var(--error-color-hover))',
      error_pressed: 'rgb(var(--error-color-pressed))',
      error_active: 'rgb(var(--error-color-active),0.1)',
      dark: '#18181c'
    }
  },
  safelist: [...'prose prose-sm m-auto text-left'.split(' '), ...IconNames]
})
