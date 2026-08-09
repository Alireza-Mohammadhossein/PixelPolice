import styled from 'styled-components'

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.space(3)};
  font-size: 13px;
  color: ${({ theme }) => theme.colors.textMuted};
`

const Links = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.space(5)};

  a {
    color: inherit;
    text-decoration: none;

    &:hover {
      color: ${({ theme }) => theme.colors.text};
    }
  }
`

export function Footer() {
  return (
    <Row>
      <span>© 2026 Lorem Corp. Consectetur adipiscing elit.</span>
      <Links>
        <a href="#">Privacy</a>
        <a href="#">Terms</a>
        <a href="#">Status</a>
      </Links>
    </Row>
  )
}
