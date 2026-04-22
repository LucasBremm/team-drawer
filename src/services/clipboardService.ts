export interface CopyResult {
  ok: boolean
  usedFallback: boolean
  manualText?: string
  error?: string
}

export async function copyToClipboard(text: string): Promise<CopyResult> {
  if (!text.trim()) {
    return {
      ok: false,
      usedFallback: false,
      error: 'Nao ha conteudo para copiar.',
    }
  }

  try {
    if (!navigator.clipboard?.writeText) {
      return {
        ok: false,
        usedFallback: true,
        manualText: text,
        error: 'Clipboard API indisponivel; use a copia manual.',
      }
    }

    await navigator.clipboard.writeText(text)
    return {
      ok: true,
      usedFallback: false,
    }
  } catch {
    return {
      ok: false,
      usedFallback: true,
      manualText: text,
      error: 'Falha ao copiar automaticamente; use a copia manual.',
    }
  }
}
