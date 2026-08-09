import type { ReactNode } from 'react'
import * as RadixToast from '@radix-ui/react-toast'
import styled, { keyframes } from 'styled-components'

const slideIn = keyframes`
  from { transform: translateX(calc(100% + 24px)); }
  to { transform: translateX(0); }
`

const Viewport = styled(RadixToast.Viewport)`
  position: fixed;
  bottom: ${({ theme }) => theme.space(6)};
  right: ${({ theme }) => theme.space(6)};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space(3)};
  width: 340px;
  max-width: 100vw;
  list-style: none;
  margin: 0;
  padding: 0;
  z-index: 60;
  outline: none;
`

const Root = styled(RadixToast.Root)`
  background: ${({ theme }) => theme.colors.bgCard};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  padding: ${({ theme }) => theme.space(4)};
  box-shadow: ${({ theme }) => theme.shadows.lg};
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: start;
  gap: ${({ theme }) => theme.space(3)};

  &[data-state='open'] {
    animation: ${slideIn} 0.2s ease;
  }
`

const Dot = styled.span`
  width: 8px;
  height: 8px;
  margin-top: 6px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.accent};
`

const Title = styled(RadixToast.Title)`
  font-size: 13px;
  font-weight: 700;
`

const Description = styled(RadixToast.Description)`
  font-size: 13px;
  color: ${({ theme }) => theme.colors.textMuted};
  margin-top: ${({ theme }) => theme.space(1)};
`

const Close = styled(RadixToast.Close)`
  background: transparent;
  border: none;
  color: ${({ theme }) => theme.colors.textMuted};
  cursor: pointer;
  font-size: 12px;

  &:hover {
    color: ${({ theme }) => theme.colors.text};
  }
`

export const ToastProvider = RadixToast.Provider
export const ToastViewport = Viewport

export interface ToastProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  title: ReactNode
  description: ReactNode
}

export function Toast({ open, onOpenChange, title, description }: ToastProps) {
  return (
    <Root open={open} onOpenChange={onOpenChange} duration={4000}>
      <Dot />
      <div>
        <Title>{title}</Title>
        <Description>{description}</Description>
      </div>
      <Close aria-label="Dismiss">✕</Close>
    </Root>
  )
}
