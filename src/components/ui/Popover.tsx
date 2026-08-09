import type { ReactElement, ReactNode } from 'react'
import * as RadixPopover from '@radix-ui/react-popover'
import styled, { keyframes } from 'styled-components'

const slideIn = keyframes`
  from { opacity: 0; transform: translateY(-4px) scale(0.98); }
  to { opacity: 1; transform: translateY(0) scale(1); }
`

const Content = styled(RadixPopover.Content)`
  width: 280px;
  background: ${({ theme }) => theme.colors.bgCard};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.lg};
  padding: ${({ theme }) => theme.space(5)};
  box-shadow: ${({ theme }) => theme.shadows.md};
  animation: ${slideIn} 0.15s ease;
  z-index: 30;

  &:focus {
    outline: none;
  }
`

const Arrow = styled(RadixPopover.Arrow)`
  fill: ${({ theme }) => theme.colors.border};
`

export interface PopoverProps {
  trigger: ReactElement
  children?: ReactNode
  side?: RadixPopover.PopoverContentProps['side']
  align?: RadixPopover.PopoverContentProps['align']
}

export function Popover({ trigger, children, side = 'bottom', align = 'center' }: PopoverProps) {
  return (
    <RadixPopover.Root>
      <RadixPopover.Trigger asChild>{trigger}</RadixPopover.Trigger>
      <RadixPopover.Portal>
        <Content side={side} align={align} sideOffset={8}>
          {children}
          <Arrow />
        </Content>
      </RadixPopover.Portal>
    </RadixPopover.Root>
  )
}
