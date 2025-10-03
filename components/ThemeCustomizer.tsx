// 'use client'

// import React, { useState, useEffect } from 'react'
// import { ProfessionalTheme, CustomColors, PROFESSIONAL_THEMES, THEME_PREVIEWS, DEFAULT_CUSTOM_COLORS, generateThemeColors } from '@/lib/themes'
// import { useApplyProfessionalTheme } from '@/lib/theming'

// interface ThemeCustomizerProps {
//   onThemeChange?: (theme: ProfessionalTheme, colors: CustomColors) => void
//   defaultTheme?: ProfessionalTheme
//   defaultColors?: CustomColors
//   className?: string
// }

// export default function ThemeCustomizer({
//   onThemeChange,
//   defaultTheme = PROFESSIONAL_THEMES[0],
//   defaultColors = DEFAULT_CUSTOM_COLORS,
//   className = ''
// }: ThemeCustomizerProps) {
//   const [selectedTheme, setSelectedTheme] = useState<ProfessionalTheme>(defaultTheme)
//   const [customColors, setCustomColors] = useState<CustomColors>(defaultColors)
//   const [isPreviewMode, setIsPreviewMode] = useState(false)

//   // Apply theme in real-time during preview
//   useApplyProfessionalTheme(isPreviewMode ? selectedTheme : undefined, customColors)

//   // Notify parent of changes
//   useEffect(() => {
//     if (onThemeChange) {
//       onThemeChange(selectedTheme, customColors)
//     }
//   }, [selectedTheme, customColors, onThemeChange])

//   const handleColorChange = (colorType: keyof CustomColors, color: string) => {
//     setCustomColors(prev => ({
//       ...prev,
//       [colorType]: color
//     }))
//   }

//   const handleThemeSelect = (theme: ProfessionalTheme) => {
//     setSelectedTheme(theme)
//   }

//   const togglePreview = () => {
//     setIsPreviewMode(!isPreviewMode)
//   }

//   const resetColors = () => {
//     setCustomColors(DEFAULT_CUSTOM_COLORS)
//   }

//   const presetColors = [
//     { name: 'Azul', primary: '#3B82F6', secondary: '#8B5CF6' },
//     { name: 'Verde', primary: '#10B981', secondary: '#06B6D4' },
//     { name: 'Púrpura', primary: '#8B5CF6', secondary: '#EC4899' },
//     { name: 'Naranja', primary: '#F59E0B', secondary: '#EF4444' },
//     { name: 'Rosa', primary: '#EC4899', secondary: '#F97316' },
//     { name: 'Índigo', primary: '#6366F1', secondary: '#8B5CF6' },
//   ]

//   return (
//     <div className={`bg-white rounded-lg shadow-lg p-6 ${className}`}>
//       <div className="space-y-6">
//         {/* Header */}
//         <div className="flex items-center justify-between">
//           <h2 className="text-2xl font-bold text-gray-900">Personalizar Tema</h2>
//           <button
//             onClick={togglePreview}
//             className={`px-4 py-2 rounded-lg transition-colors ${
//               isPreviewMode
//                 ? 'bg-blue-600 text-white'
//                 : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
//             }`}
//           >
//             {isPreviewMode ? 'Vista Previa ON' : 'Vista Previa OFF'}
//           </button>
//         </div>

//         {/* Theme Selection */}
//         <div>
//           <h3 className="text-lg font-semibold text-gray-900 mb-4">Seleccionar Tema</h3>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//             {PROFESSIONAL_THEMES.map((theme) => {
//               const preview = THEME_PREVIEWS[theme.id as keyof typeof THEME_PREVIEWS]
//               const isSelected = selectedTheme.id === theme.id

//               return (
//                 <div
//                   key={theme.id}
//                   onClick={() => handleThemeSelect(theme)}
//                   className={`cursor-pointer p-4 rounded-lg border-2 transition-all ${
//                     isSelected
//                       ? 'border-blue-500 bg-blue-50'
//                       : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
//                   }`}
//                 >
//                   <div className="flex items-center space-x-3 mb-3">
//                     <div
//                       className="w-8 h-8 rounded-full flex-shrink-0"
//                       style={{
//                         background: `linear-gradient(135deg, ${preview.colors[0]}, ${preview.colors[1]})`
//                       }}
//                     />
//                     <div>
//                       <h4 className="font-semibold text-gray-900">{theme.name}</h4>
//                       <p className="text-sm text-gray-500">{theme.category}</p>
//                     </div>
//                   </div>
//                   <p className="text-sm text-gray-600 mb-2">{preview.description}</p>
//                   <div className="flex flex-wrap gap-1">
//                     {preview.features.map((feature, index) => (
//                       <span
//                         key={index}
//                         className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded"
//                       >
//                         {feature}
//                       </span>
//                     ))}
//                   </div>
//                 </div>
//               )
//             })}
//           </div>
//         </div>

//         {/* Color Customization */}
//         <div>
//           <div className="flex items-center justify-between mb-4">
//             <h3 className="text-lg font-semibold text-gray-900">Personalizar Colores</h3>
//             <button
//               onClick={resetColors}
//               className="text-sm text-gray-600 hover:text-gray-900 underline"
//             >
//               Restablecer
//             </button>
//           </div>

//           {/* Custom Color Pickers */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Color Primario
//               </label>
//               <div className="flex items-center space-x-3">
//                 <input
//                   type="color"
//                   value={customColors.primary}
//                   onChange={(e) => handleColorChange('primary', e.target.value)}
//                   className="w-12 h-12 rounded-lg border border-gray-300 cursor-pointer"
//                 />
//                 <input
//                   type="text"
//                   value={customColors.primary}
//                   onChange={(e) => handleColorChange('primary', e.target.value)}
//                   className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm font-mono"
//                   placeholder="#3B82F6"
//                 />
//               </div>
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Color Secundario
//               </label>
//               <div className="flex items-center space-x-3">
//                 <input
//                   type="color"
//                   value={customColors.secondary}
//                   onChange={(e) => handleColorChange('secondary', e.target.value)}
//                   className="w-12 h-12 rounded-lg border border-gray-300 cursor-pointer"
//                 />
//                 <input
//                   type="text"
//                   value={customColors.secondary}
//                   onChange={(e) => handleColorChange('secondary', e.target.value)}
//                   className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm font-mono"
//                   placeholder="#8B5CF6"
//                 />
//               </div>
//             </div>
//           </div>

//           {/* Preset Colors */}
//           <div>
//             <h4 className="text-sm font-medium text-gray-700 mb-3">Combinaciones Predefinidas</h4>
//             <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
//               {presetColors.map((preset) => (
//                 <button
//                   key={preset.name}
//                   onClick={() => setCustomColors({ primary: preset.primary, secondary: preset.secondary })}
//                   className="flex flex-col items-center p-3 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors"
//                 >
//                   <div className="flex space-x-1 mb-2">
//                     <div
//                       className="w-4 h-4 rounded-full"
//                       style={{ backgroundColor: preset.primary }}
//                     />
//                     <div
//                       className="w-4 h-4 rounded-full"
//                       style={{ backgroundColor: preset.secondary }}
//                     />
//                   </div>
//                   <span className="text-xs text-gray-600">{preset.name}</span>
//                 </button>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* Color Preview */}
//         <div>
//           <h3 className="text-lg font-semibold text-gray-900 mb-4">Vista Previa de Colores</h3>
//           <div className="bg-gray-50 rounded-lg p-4">
//             <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//               {(() => {
//                 // Use the standalone generateThemeColors function
//                 const generatedColors = generateThemeColors(customColors)
//                 const colorKeys = ['primary', 'secondary', 'accent', 'background'] as const

//                 return colorKeys.map((key) => (
//                   <div key={key} className="text-center">
//                     <div
//                       className="w-full h-16 rounded-lg border border-gray-200 mb-2"
//                       style={{ backgroundColor: generatedColors[key] }}
//                     />
//                     <div className="text-xs">
//                       <div className="font-semibold text-gray-900 capitalize">{key}</div>
//                       <div className="text-gray-500 font-mono">{generatedColors[key]}</div>
//                     </div>
//                   </div>
//                 ))
//               })()}
//             </div>
//           </div>
//         </div>

//         {/* Current Theme Info */}
//         <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4">
//           <h4 className="font-semibold text-gray-900 mb-2">Tema Actual: {selectedTheme.name}</h4>
//           <p className="text-sm text-gray-600 mb-3">{selectedTheme.description}</p>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
//             <div>
//               <span className="font-medium text-gray-700">Tipografía Principal:</span>
//               <span className="text-gray-600 ml-2">{selectedTheme.typography.primary.family.split(',')[0]}</span>
//             </div>
//             <div>
//               <span className="font-medium text-gray-700">Categoría:</span>
//               <span className="text-gray-600 ml-2 capitalize">{selectedTheme.category}</span>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }