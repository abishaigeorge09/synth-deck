import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

type Props = {
  length?: number
  onSubmit: (code: string) => void
  hasError?: boolean
  disabled?: boolean
  ariaLabel?: string
}

export function PasscodeInput({
  length = 8,
  onSubmit,
  hasError = false,
  disabled = false,
  ariaLabel = 'Passcode',
}: Props) {
  const [digits, setDigits] = useState<string[]>(() => Array(length).fill(''))
  const inputs = useRef<Array<HTMLInputElement | null>>([])
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    const id = requestAnimationFrame(() => {
      inputs.current[0]?.focus()
    })
    return () => cancelAnimationFrame(id)
  }, [])

  const focusCell = (i: number) => {
    const target = inputs.current[Math.max(0, Math.min(length - 1, i))]
    target?.focus()
    target?.select()
  }

  const tryAutoSubmit = (next: string[]) => {
    if (next.every((d) => d !== '')) onSubmit(next.join(''))
  }

  const onCellChange = (i: number, raw: string) => {
    const cleaned = raw.replace(/\D+/g, '')
    if (cleaned.length === 0) return
    if (cleaned.length === 1) {
      setDigits((prev) => {
        const next = [...prev]
        next[i] = cleaned
        if (i < length - 1) focusCell(i + 1)
        tryAutoSubmit(next)
        return next
      })
      return
    }
    setDigits((prev) => {
      const next = [...prev]
      const room = length - i
      const slice = cleaned.slice(0, room).split('')
      for (let k = 0; k < slice.length; k++) next[i + k] = slice[k]
      const lastFilled = i + slice.length - 1
      focusCell(Math.min(length - 1, lastFilled + 1))
      tryAutoSubmit(next)
      return next
    })
  }

  const onCellKeyDown = (i: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace') {
      e.preventDefault()
      setDigits((prev) => {
        const next = [...prev]
        if (next[i] !== '') {
          next[i] = ''
          return next
        }
        if (i > 0) {
          next[i - 1] = ''
          focusCell(i - 1)
        }
        return next
      })
      return
    }
    if (e.key === 'ArrowLeft') {
      e.preventDefault()
      focusCell(i - 1)
      return
    }
    if (e.key === 'ArrowRight') {
      e.preventDefault()
      focusCell(i + 1)
      return
    }
    if (e.key === 'Enter') {
      e.preventDefault()
      if (digits.every((d) => d !== '')) onSubmit(digits.join(''))
      return
    }
  }

  const onPaste = (i: number, e: React.ClipboardEvent<HTMLInputElement>) => {
    const cleaned = e.clipboardData.getData('text').replace(/\D+/g, '')
    if (cleaned.length === 0) return
    e.preventDefault()
    setDigits((prev) => {
      const next = [...prev]
      const room = length - i
      const slice = cleaned.slice(0, room).split('')
      for (let k = 0; k < slice.length; k++) next[i + k] = slice[k]
      const lastFilled = i + slice.length - 1
      focusCell(Math.min(length - 1, lastFilled + 1))
      tryAutoSubmit(next)
      return next
    })
  }

  const shake = hasError && !reducedMotion
    ? { x: [0, -8, 8, -6, 6, -3, 3, 0] }
    : { x: 0 }

  return (
    <motion.div
      role="group"
      aria-label={ariaLabel}
      animate={shake}
      transition={{ duration: 0.32, ease: 'easeInOut' }}
      className="flex w-full items-center justify-center gap-2 sm:gap-2.5"
    >
      {digits.map((d, i) => (
        <input
          key={i}
          ref={(el) => {
            inputs.current[i] = el
          }}
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          autoComplete={i === 0 ? 'one-time-code' : 'off'}
          aria-label={`Digit ${i + 1}`}
          maxLength={length}
          value={d}
          disabled={disabled}
          onChange={(e) => onCellChange(i, e.target.value)}
          onKeyDown={(e) => onCellKeyDown(i, e)}
          onPaste={(e) => onPaste(i, e)}
          onFocus={(e) => e.target.select()}
          className="h-10 w-7 border-0 border-b bg-transparent p-0 text-center text-[22px] font-semibold tabular-nums caret-transparent outline-none transition-[border-color,color] duration-150 sm:h-12 sm:w-8 sm:text-[24px]"
          style={{
            color: '#FFFFFF',
            borderBottomWidth: d ? 2 : 1,
            borderBottomColor: hasError
              ? 'rgba(239, 68, 68, 0.7)'
              : d
                ? 'rgba(255, 255, 255, 0.85)'
                : 'rgba(255, 255, 255, 0.30)',
            fontFamily: 'JetBrains Mono, ui-monospace, monospace',
          }}
        />
      ))}
    </motion.div>
  )
}
