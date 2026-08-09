import styled from 'styled-components'
import * as Separator from '@radix-ui/react-separator'
import { Tooltip } from '../ui/Tooltip'

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space(2.5)};
  padding: ${({ theme }) => theme.space(6)};
  font-weight: 800;
  font-size: 16px;
  letter-spacing: -0.01em;
`

const LogoMark = styled.span`
  width: 28px;
  height: 28px;
  border-radius: ${({ theme }) => theme.radii.sm};
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.primary}, ${({ theme }) => theme.colors.accent});
`

const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space(1)};
  padding: 0 ${({ theme }) => theme.space(4)};
`

const NavGroupLabel = styled.p`
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: ${({ theme }) => theme.colors.textMuted};
  padding: ${({ theme }) => theme.space(4)} ${({ theme }) => theme.space(3)} ${({ theme }) => theme.space(2)};
`

const NavItem = styled.a<{ $active?: boolean }>`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space(3)};
  padding: ${({ theme }) => `${theme.space(2.5)} ${theme.space(3)}`};
  border-radius: ${({ theme }) => theme.radii.md};
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme, $active }) => ($active ? theme.colors.text : theme.colors.textMuted)};
  background: ${({ theme, $active }) => ($active ? theme.colors.bgCard : 'transparent')};
  text-decoration: none;
  cursor: pointer;

  &:hover {
    background: ${({ theme }) => theme.colors.bgCard};
    color: ${({ theme }) => theme.colors.text};
  }
`

const Dot = styled.span`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: currentColor;
  opacity: 0.5;
`

const StyledSeparator = styled(Separator.Root)`
  background: ${({ theme }) => theme.colors.border};
  height: 1px;
  margin: ${({ theme }) => theme.space(4)} ${({ theme }) => theme.space(4)};
`

const primaryLinks = ['Dashboard', 'Analytics', 'Consectetur', 'Adipiscing']
const secondaryLinks = ['Settings', 'Integrations', 'Billing']

export function Sidebar() {
  return (
    <>
      <Logo>
        <LogoMark />
        Lorem Corp
      </Logo>
      <Nav aria-label="Primary">
        <NavGroupLabel>Overview</NavGroupLabel>
        {primaryLinks.map((label, i) => (
          <Tooltip key={label} label={`Go to ${label}`} side="right">
            <NavItem href="#" $active={i === 0}>
              <Dot />
              {label}
            </NavItem>
          </Tooltip>
        ))}
      </Nav>
      <StyledSeparator />
      <Nav aria-label="Secondary">
        <NavGroupLabel>Workspace</NavGroupLabel>
        {secondaryLinks.map((label) => (
          <Tooltip key={label} label={`Go to ${label}`} side="right">
            <NavItem href="#">
              <Dot />
              {label}
            </NavItem>
          </Tooltip>
        ))}
      </Nav>
    </>
  )
}
