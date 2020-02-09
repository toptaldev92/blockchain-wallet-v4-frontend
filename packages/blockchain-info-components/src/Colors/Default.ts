import { DefaultTheme } from 'styled-components'

const Default = {
  // USE THESE \\
  whiteFade100: 'rgba(255, 255, 255, 0.1)',
  whiteFade400: 'rgba(255, 255, 255, 0.4)',
  whiteFade600: 'rgba(255, 255, 255, 0.6)',
  whiteFade700: 'rgba(255, 255, 255, 0.7)',
  whiteFade800: 'rgba(255, 255, 255, 0.8)',
  whiteFade900: 'rgba(255, 255, 255, 0.9)',
  greyFade100: 'rgba(5, 24, 61, 0.1)',
  greyFade200: 'rgba(5, 24, 61, 0.2)',
  greyFade400: 'rgba(5, 24, 61, 0.4)',
  greyFade600: 'rgba(3, 17, 47, 0.6)',
  greyFade800: 'rgba(18, 29, 51, 0.8)',
  grey000: '#F0F2F7',
  grey100: '#DFE3EB',
  grey400: '#98A1B2',
  grey600: '#677185',
  grey700: '#50596B',
  grey800: '#353F52',
  grey900: '#121D33',
  blue000: '#ECF5FE',
  blue100: '#D8EBFD',
  blue200: '#BBDBFC',
  blue300: '#85B5F8',
  blue500: '#3D89F5',
  blue600: '#0C6CF2',
  blue700: '#1656B9',
  blue800: '#144699',
  blue900: '#0D3578',
  green000: '#E6F5EB',
  green100: '#D1F0DB',
  green200: '#B8E5C7',
  green300: '#8BDCB3',
  green400: '#59CD93',
  green500: '#339F7B',
  green600: '#00994C',
  green700: '#006B47',
  green800: '#04593D',
  green900: '#004025',
  orange000: '#FFF2E5',
  orange100: '#FFE6CC',
  orange200: '#FFD6AD',
  orange300: '#FFC994',
  orange400: '#FFB266',
  orange500: '#F5A250',
  orange600: '#F28B24',
  orange700: '#D96716',
  orange800: '#B24400',
  orange900: '#8C2F00',
  red000: '#FAECEB',
  red100: '#F5D9D7',
  red200: '#F0C3C0',
  red300: '#F6A7A1',
  red400: '#F28979',
  red500: '#EA5B50',
  red600: '#D93B30',
  red700: '#B2251B',
  red800: '#99180F',
  red900: '#800900',
  btc: '#FF9B22',
  bch: '#8DC351',
  eth: '#473BCB',
  pax: '#00522C',
  stx: '#211F6D',
  xlm: '#121D33',
  // OLD - AVOID USE \\
  // Brand
  'brand-yellow': '#FFB266',
  'brand-yellow-lighter': '#FFE6CC',
  'logo-primary': '#153A62',
  'logo-secondary': '#799EB2',
  'logo-tertiary': '#3558A8',
  'logo-quaternary': '#B2D5E5',
  'logo-quinary': '#10ADE4',
  // EXCHANGE
  exchangeNight: '#0A0D10',
  exchangeTurquoise: '#42F1B8',
  // Action
  sent: '#F26C57',
  received: '#00BABC',
  transferred: '#828B9E',
  // State
  error: '#D93B30',
  warn: '#F28979',
  success: '#00875A',
  // Marketing
  'marketing-primary': '#0C6CF2',
  'marketing-secondary': '#144699',
  // Grays
  'gray-1': '#F0F2F7',
  'gray-2': '#CCD2DE',
  'gray-3': '#98A1B2',
  'gray-4': '#757679',
  'gray-5': '#50596B',
  'gray-6': '#353F52',
  // Whites
  white: '#FFFFFF',
  silver: '#B1B8C7',
  // Blacks
  black: '#000000',
  textBlack: '#121D33',
  // Blues
  purple: '#4C18BA',
  'deep-blue': '#144699',
  // Service Announcements
  info: '#4A90E2'
}

export type IDefaultTheme = typeof Default
export default Default
