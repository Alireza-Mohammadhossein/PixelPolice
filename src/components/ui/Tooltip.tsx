import type { ReactElement, ReactNode } from 'react'
import * as RadixTooltip from '@radix-ui/react-tooltip'
import styled, { keyframes } from 'styled-components'

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(2px); }
  to { opacity: 1; transform: translateY(0); }
`

const Content = styled(RadixTooltip.Content)`
  background: ${({ theme }) => theme.colors.text};
  color: ${({ theme }) => theme.colors.bg};
  font-size: 12px;
  font-weight: 600;
  padding: ${({ theme }) => `${theme.space(1.5)} ${theme.space(3)}`};
  border-radius: ${({ theme }) => theme.radii.sm};
  animation: ${fadeIn} 0.1s ease;
  z-index: 50;
`

const Arrow = styled(RadixTooltip.Arrow)`
  fill: ${({ theme }) => theme.colors.text};
`

export interface TooltipProps {
  label: ReactNode
  children: ReactElement
  side?: RadixTooltip.TooltipContentProps['side']
}

export function Tooltip({ label, children, side = 'top' }: TooltipProps) {
  return (
    <RadixTooltip.Root delayDuration={200}>
      <RadixTooltip.Trigger asChild>{children}</RadixTooltip.Trigger>
      <RadixTooltip.Portal>
        <Content side={side} sideOffset={6}>
          {label}
          <Arrow />
        </Content>
      </RadixTooltip.Portal>
    </RadixTooltip.Root>
  )
}

export const TooltipProvider = RadixTooltip.Provider
