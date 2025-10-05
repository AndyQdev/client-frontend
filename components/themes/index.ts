// Exportaciones centrales de todos los temas
export * from './tecnologia/modern'
export * from './moda/elegante'
export * from './hogar/minimal'
export * from './belleza/classic'
export * from './deportes/darkmode'
export * from './arte/creative'

// Selector principal
export { default as ThemeComponentSelector } from './ThemeComponentSelector'

// Tipos para los componentes de tema
export interface ThemeComponentProps {
  store: any
  products: any[]
  categories: any[]
}