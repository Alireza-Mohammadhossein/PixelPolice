import type { ReactElement, ReactNode } from 'react'
import * as RadixDropdown from '@radix-ui/react-dropdown-menu'
import styled, { keyframes } from 'styled-components'

const slideIn = keyframes`
  from { opacity: 0; transform: translateY(-4px); }
  to { opacity: 1; transform: translateY(0); }
`

const Content = styled(RadixDropdown.Content)`
  min-width: 220px;
  background: ${({ theme }) => theme.colors.bgCard};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  padding: ${({ theme }) => theme.space(1.5)};
  box-shadow: ${({ theme }) => theme.shadows.md};
  animation: ${slideIn} 0.12s ease;
  z-index: 30;
`

const Item = styled(RadixDropdown.Item)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.space(2)};
  padding: ${({ theme }) => `${theme.space(2)} ${theme.space(3)}`};
  font-size: 13px;
  border-radius: ${({ theme }) => theme.radii.sm};
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;
  outline: none;

  &[data-highlighted] {
    background: ${({ theme }) => theme.colors.primary};
    color: white;
  }

  &[data-disabled] {
    color: ${({ theme }) => theme.colors.textMuted};
    cursor: not-allowed;
  }
`

const Label = styled(RadixDropdown.Label)`
  padding: ${({ theme }) => `${theme.space(2)} ${theme.space(3)}`};
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: ${({ theme }) => theme.colors.textMuted};
`

const Separator = styled(RadixDropdown.Separator)`
  height: 1px;
  background: ${({ theme }) => theme.colors.border};
  margin: ${({ theme }) => theme.space(1.5)} 0;
`

export interface DropdownMenuProps {
  trigger: ReactElement
  children?: ReactNode
  align?: RadixDropdown.DropdownMenuContentProps['align']
}

interface DropdownMenuComponent {
  (props: DropdownMenuProps): ReactElement
  Item: typeof Item
  Label: typeof Label
  Separator: typeof Separator
}

const DropdownMenu = (({ trigger, children, align = 'end' }: DropdownMenuProps) => {
  return (
    <RadixDropdown.Root>
      <RadixDropdown.Trigger asChild>{trigger}</RadixDropdown.Trigger>
      <RadixDropdown.Portal>
        <Content align={align} sideOffset={8}>
          {children}
        </Content>
      </RadixDropdown.Portal>
    </RadixDropdown.Root>
  )
}) as DropdownMenuComponent

DropdownMenu.Item = Item
DropdownMenu.Label = Label
DropdownMenu.Separator = Separator

export { DropdownMenu }
