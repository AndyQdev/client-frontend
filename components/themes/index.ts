// Exportaciones centrales de todos los temas
export * from './modern'
export * from './elegante'
export * from './minimal'
export * from './classic'
export * from './editorial'
export * from './creative'

// Selector principal
export { default as ThemeComponentSelector } from './ThemeComponentSelector'

// Tipos para los componentes de tema
export interface ThemeComponentProps {
  store: any
  products: any[]
  categories: any[]
}