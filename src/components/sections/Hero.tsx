import { useState } from 'react'
import styled from 'styled-components'
import { Button } from '../ui/Button'
import { Badge } from '../ui/Badge'
import { Popover } from '../ui/Popover'
import { Toast } from '../ui/Toast'
import { loremMedium, loremTags } from '../../data/lorem'

const Wrap = styled.section`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.space(8)};
  margin-bottom: ${({ theme }) => theme.space(10)};
`

const Copy = styled.div`
  max-width: 560px;
`

const Eyebrow = styled(Badge)`
  margin-bottom: ${({ theme }) => theme.space(4)};
`

const Title = styled.h1`
  font-size: 34px;
  font-weight: 800;
  letter-spacing: -0.02em;
  margin-bottom: ${({ theme }) => theme.space(4)};
`

const Subtitle = styled.p`
  font-size: 15px;
  color: ${({ theme }) => theme.colors.textMuted};
  margin-bottom: ${({ theme }) => theme.space(6)};
`

const Actions = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.space(3)};
  flex-wrap: wrap;
`

const TagRow = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.space(2)};
  margin-top: ${({ theme }) => theme.space(6)};
  flex-wrap: wrap;
`

const QuickActionsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space(1)};
`

const QuickAction = styled.button`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space(2)};
  padding: ${({ theme }) => theme.space(2.5)};
  background: transparent;
  border: none;
  border-radius: ${({ theme }) => theme.radii.sm};
  color: ${({ theme }) => theme.colors.text};
  font-size: 13px;
  text-align: left;
  cursor: pointer;

  &:hover {
    background: ${({ theme }) => theme.colors.bgElevated};
  }
`

const Visual = styled.div`
  flex-shrink: 0;
  width: 320px;
  height: 220px;
  border-radius: ${({ theme }) => theme.radii.lg};
  background:
    radial-gradient(circle at 30% 20%, rgba(124, 92, 255, 0.5), transparent 60%),
    radial-gradient(circle at 70% 80%, rgba(56, 217, 201, 0.4), transparent 55%),
    ${({ theme }) => theme.colors.bgCard};
  border: 1px solid ${({ theme }) => theme.colors.border};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: none;
  }
`

export function Hero() {
  const [toastOpen, setToastOpen] = useState(false)

  const fireToast = () => {
    setToastOpen(true)
  }

  return (
    <Wrap>
      <Copy>
        <Eyebrow $tone="accent">Lorem Ipsum Platform</Eyebrow>
        <Title>Consectetur adipiscing elit, sed do eiusmod</Title>
        <Subtitle>{loremMedium}</Subtitle>
        <Actions>
          <Button $variant="primary" onClick={fireToast}>
            Get started
          </Button>
          <Popover
            trigger={<Button $variant="ghost">Quick actions</Button>}
            align="start"
          >
            <QuickActionsList>
              <QuickAction onClick={fireToast}>📄 Duplicate lorem</QuickAction>
              <QuickAction onClick={fireToast}>📤 Export ipsum</QuickAction>
              <QuickAction onClick={fireToast}>🔗 Share dolor</QuickAction>
            </QuickActionsList>
          </Popover>
        </Actions>
        <TagRow>
          {loremTags.slice(0, 4).map((tag) => (
            <Badge key={tag} $tone="neutral">
              #{tag}
            </Badge>
          ))}
        </TagRow>
      </Copy>
      <Visual />
      <Toast
        open={toastOpen}
        onOpenChange={setToastOpen}
        title="Lorem ipsum triggered"
        description="Dolor sit amet consectetur adipiscing elit successfully."
      />
    </Wrap>
  )
}
