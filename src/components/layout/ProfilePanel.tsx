import * as Dialog from '@radix-ui/react-dialog'
import * as Avatar from '@radix-ui/react-avatar'
import styled, { keyframes } from 'styled-components'
import { Button } from '../ui/Button'
import { Badge } from '../ui/Badge'
import { loremTags } from '../../data/lorem'

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`

const slideIn = keyframes`
  from { transform: translateX(100%); }
  to { transform: translateX(0); }
`

const Overlay = styled(Dialog.Overlay)`
  position: fixed;
  inset: 0;
  background: rgba(6, 7, 10, 0.6);
  animation: ${fadeIn} 0.15s ease;
  z-index: 40;
`

const Content = styled(Dialog.Content)`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: 33.333vw;
  min-width: 320px;
  max-width: 560px;
  background: ${({ theme }) => theme.colors.bgCard};
  border-left: 1px solid ${({ theme }) => theme.colors.border};
  box-shadow: ${({ theme }) => theme.shadows.lg};
  padding: ${({ theme }) => theme.space(7)};
  overflow-y: auto;
  animation: ${slideIn} 0.2s ease;
  z-index: 41;

  &:focus {
    outline: none;
  }
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

const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: ${({ theme }) => theme.space(3)};
  padding-bottom: ${({ theme }) => theme.space(6)};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  margin-bottom: ${({ theme }) => theme.space(6)};
`

const AvatarRoot = styled(Avatar.Root)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.primary};
  overflow: hidden;
  border: 2px solid ${({ theme }) => theme.colors.border};
`

const AvatarFallback = styled(Avatar.Fallback)`
  font-size: 24px;
  font-weight: 700;
  color: white;
`

const Name = styled(Dialog.Title)`
  font-size: 18px;
  font-weight: 700;
`

const Role = styled(Dialog.Description)`
  font-size: 13px;
  color: ${({ theme }) => theme.colors.textMuted};
`

const TagRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.space(1.5)};
  justify-content: center;
`

const Section = styled.section`
  margin-bottom: ${({ theme }) => theme.space(6)};
`

const SectionTitle = styled.h3`
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: ${({ theme }) => theme.colors.textMuted};
  margin-bottom: ${({ theme }) => theme.space(3)};
`

const Bio = styled.p`
  font-size: 13px;
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.text};
`

const InfoList = styled.dl`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space(3)};
  margin: 0;
`

const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  gap: ${({ theme }) => theme.space(3)};
  font-size: 13px;
`

const InfoLabel = styled.dt`
  color: ${({ theme }) => theme.colors.textMuted};
`

const InfoValue = styled.dd`
  margin: 0;
  font-weight: 600;
  text-align: right;
`

const StatsRow = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${({ theme }) => theme.space(3)};
`

const StatBox = styled.div`
  background: ${({ theme }) => theme.colors.bgElevated};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  padding: ${({ theme }) => theme.space(3)};
  text-align: center;
`

const StatValue = styled.p`
  font-size: 16px;
  font-weight: 700;
`

const StatLabel = styled.p`
  font-size: 11px;
  color: ${({ theme }) => theme.colors.textMuted};
  margin-top: ${({ theme }) => theme.space(1)};
`

const Actions = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.space(3)};
`

export interface ProfilePanelProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ProfilePanel({ open, onOpenChange }: ProfilePanelProps) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Overlay />
        <Content>
          <Header>
            <AvatarRoot>
              <Avatar.Image src="" alt="User avatar" />
              <AvatarFallback delayMs={0}>LI</AvatarFallback>
            </AvatarRoot>
            <div>
              <Name>Lorem Ipsum</Name>
              <Role>Consectetur Adipiscing · Dolor Team</Role>
            </div>
            <TagRow>
              {loremTags.slice(0, 3).map((tag) => (
                <Badge key={tag} $tone="neutral">
                  {tag}
                </Badge>
              ))}
            </TagRow>
          </Header>

          <Section>
            <StatsRow>
              <StatBox>
                <StatValue>128</StatValue>
                <StatLabel>Projects</StatLabel>
              </StatBox>
              <StatBox>
                <StatValue>4.6k</StatValue>
                <StatLabel>Followers</StatLabel>
              </StatBox>
              <StatBox>
                <StatValue>312</StatValue>
                <StatLabel>Following</StatLabel>
              </StatBox>
            </StatsRow>
          </Section>

          <Section>
            <SectionTitle>About</SectionTitle>
            <Bio>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua, working on nostrud exercitation across the ullamco laboris platform.
            </Bio>
          </Section>

          <Section>
            <SectionTitle>Details</SectionTitle>
            <InfoList>
              <InfoRow>
                <InfoLabel>Email</InfoLabel>
                <InfoValue>lorem.ipsum@example.com</InfoValue>
              </InfoRow>
              <InfoRow>
                <InfoLabel>Location</InfoLabel>
                <InfoValue>Dolor City, SA</InfoValue>
              </InfoRow>
              <InfoRow>
                <InfoLabel>Joined</InfoLabel>
                <InfoValue>March 2021</InfoValue>
              </InfoRow>
              <InfoRow>
                <InfoLabel>Plan</InfoLabel>
                <InfoValue>Magna Aliqua Pro</InfoValue>
              </InfoRow>
            </InfoList>
          </Section>

          <Actions>
            <Button $variant="primary" $size="sm">
              Edit profile
            </Button>
            <Button $variant="ghost" $size="sm" onClick={() => onOpenChange(false)}>
              Close
            </Button>
          </Actions>

          <CloseButton aria-label="Close">✕</CloseButton>
        </Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
