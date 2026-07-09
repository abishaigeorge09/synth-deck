import { createContext, useContext } from 'react'

export type PrintExportContextValue = {
  requestPdfExport: () => void
}

export const PrintExportContext = createContext<PrintExportContextValue | null>(null)

export function usePrintExport() {
  const ctx = useContext(PrintExportContext)
  if (!ctx) throw new Error('usePrintExport must be used within PrintExportContext.Provider')
  return ctx
}
