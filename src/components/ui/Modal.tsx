import type { ReactNode } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import styled, { keyframes } from 'styled-components'

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`

const scaleIn = keyframes`
  from { opacity: 0; transform: translate(-50%, -48%) scale(0.96); }
  to { opacity: 1; transform: translate(-50%, -50%) scale(1); }
`

const Overlay = styled(Dialog.Overlay)`
  position: fixed;
  inset: 0;
  background: rgba(6, 7, 10, 0.7);
  animation: ${fadeIn} 0.15s ease;
  z-index: 40;
`

export type ModalSize = 'md' | 'lg'

const Content = styled(Dialog.Content)<{ $size: ModalSize }>`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: min(90vw, ${({ $size }) => ($size === 'lg' ? '640px' : '460px')});
  max-height: 85vh;
  overflow-y: auto;
  background: ${({ theme }) => theme.colors.bgCard};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.lg};
  padding: ${({ theme }) => theme.space(7)};
  box-shadow: ${({ theme }) => theme.shadows.lg};
  animation: ${scaleIn} 0.18s ease;
  z-index: 41;

  &:focus {
    outline: none;
  }
`

const Title = styled(Dialog.Title)`
  font-size: 18px;
  font-weight: 700;
  margin-bottom: ${({ theme }) => theme.space(2)};
`

const Description = styled(Dialog.Description)`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.textMuted};
  margin-bottom: ${({ theme }) => theme.space(6)};
`

const CloseButton = styled(Dialog.Close)`
  position: absolute;
  top: ${({ theme }) => theme.space(4)};
  right: ${({ theme }) => theme.space(4)};
  width: 28px;
  height: 28px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: ${({ theme }) => theme.radii.md};
  border: none;
  background: transparent;
  color: ${({ theme }) => theme.colors.textMuted};
  cursor: pointer;

  &:hover {
    background: ${({ theme }) => theme.colors.bgElevated};
    color: ${({ theme }) => theme.colors.text};
  }
`

export interface ModalProps {
  trigger?: ReactNode
  title?: ReactNode
  description?: ReactNode
  children?: ReactNode
  size?: ModalSize
  footer?: ReactNode
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

export function Modal({ trigger, title, description, children, size = 'md', footer, open, onOpenChange }: ModalProps) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      {trigger && <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>}
      <Dialog.Portal>
        <Overlay />
        <Content $size={size}>
          {title && <Title>{title}</Title>}
          {description && <Description>{description}</Description>}
          {children}
          {footer && <div style={{ marginTop: 24 }}>{footer}</div>}
          <CloseButton aria-label="Close">✕</CloseButton>
        </Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
