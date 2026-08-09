import * as RadixTabs from '@radix-ui/react-tabs'
import styled from 'styled-components'

export const TabsRoot = styled(RadixTabs.Root)`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space(4)};
`

export const TabsList = styled(RadixTabs.List)`
  display: inline-flex;
  gap: ${({ theme }) => theme.space(1)};
  padding: ${({ theme }) => theme.space(1)};
  background: ${({ theme }) => theme.colors.bgElevated};
  border-radius: ${({ theme }) => theme.radii.md};
  width: fit-content;
`

export const TabsTrigger = styled(RadixTabs.Trigger)`
  padding: ${({ theme }) => `${theme.space(2)} ${theme.space(4)}`};
  font-size: 13px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textMuted};
  background: transparent;
  border: none;
  border-radius: ${({ theme }) => theme.radii.sm};
  cursor: pointer;
  transition: background 0.15s ease, color 0.15s ease;

  &[data-state='active'] {
    background: ${({ theme }) => theme.colors.primary};
    color: white;
  }
`

export const TabsContent = styled(RadixTabs.Content)`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.textMuted};
  outline: none;
`
