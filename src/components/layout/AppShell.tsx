import styled from 'styled-components'

export const Shell = styled.div`
  min-height: 100vh;
  display: grid;
  grid-template-columns: 260px 1fr;
  grid-template-rows: 72px 1fr auto;
  grid-template-areas:
    'sidebar header'
    'sidebar main'
    'sidebar footer';

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: 1fr;
    grid-template-areas:
      'header'
      'main'
      'footer';
  }
`

export const SidebarSlot = styled.aside`
  grid-area: sidebar;
  border-right: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.bgElevated};

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    display: none;
  }
`

export const HeaderSlot = styled.header`
  grid-area: header;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.bg};
  position: sticky;
  top: 0;
  z-index: 20;
`

export const MainSlot = styled.main`
  grid-area: main;
  padding: ${({ theme }) => theme.space(8)};
  max-width: 1400px;
  width: 100%;
  margin: 0 auto;
`

export const FooterSlot = styled.footer`
  grid-area: footer;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  padding: ${({ theme }) => theme.space(6)} ${({ theme }) => theme.space(8)};
`
