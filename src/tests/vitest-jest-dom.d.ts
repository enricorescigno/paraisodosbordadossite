
import type { Assertion, AsymmetricMatchersContaining } from 'vitest'

interface CustomMatchers<R = unknown> {
  toBeInTheDocument(): R
  toHaveClass(className: string): R
  toHaveTextContent(text: string | RegExp): R
  toBeVisible(): R
  toBeDisabled(): R
  toHaveAttribute(attr: string, value?: string): R
}

declare module 'vitest' {
  interface Assertion<T = any> extends CustomMatchers<T> {}
  interface AsymmetricMatchersContaining extends CustomMatchers {}
}
