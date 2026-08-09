import { useState } from 'react'
import styled from 'styled-components'
import * as Avatar from '@radix-ui/react-avatar'
import { Button, IconButton } from '../ui/Button'
import { Tooltip } from '../ui/Tooltip'
import { Popover } from '../ui/Popover'
import { DropdownMenu } from '../ui/DropdownMenu'
import { Modal } from '../ui/Modal'
import { Badge } from '../ui/Badge'
import { ProfilePanel } from './ProfilePanel'
import { notifications } from '../../data/lorem'

const Bar = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.space(4)};
  padding: 0 ${({ theme }) => theme.space(8)};
`

const SearchWrap = styled.div`
  flex: 1;
  max-width: 420px;
`

const SearchInput = styled.input`
  width: 100%;
  background: ${({ theme }) => theme.colors.bgElevated};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  padding: ${({ theme }) => `${theme.space(2.5)} ${theme.space(4)}`};
  font-size: 13px;
  color: ${({ theme }) => theme.colors.text};

  &::placeholder {
    color: ${({ theme }) => theme.colors.textMuted};
  }

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }
`

const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space(3)};
`

const AvatarRoot = styled(Avatar.Root)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.primary};
  overflow: hidden;
  cursor: pointer;
  border: 2px solid ${({ theme }) => theme.colors.border};
`

const AvatarFallback = styled(Avatar.Fallback)`
  font-size: 13px;
  font-weight: 700;
  color: white;
`

const NotifList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space(3)};
`

const NotifItem = styled.li`
  padding-bottom: ${({ theme }) => theme.space(3)};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};

  &:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }
`

const NotifTitle = styled.p`
  font-size: 13px;
  font-weight: 600;
`

const NotifBody = styled.p`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.textMuted};
  margin-top: ${({ theme }) => theme.space(1)};
`

const FormField = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space(1.5)};
  margin-bottom: ${({ theme }) => theme.space(4)};
`

const Label = styled.label`
  font-size: 12px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textMuted};
`

const Input = styled.input`
  background: ${({ theme }) => theme.colors.bgElevated};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  padding: ${({ theme }) => theme.space(2.5)};
  font-size: 13px;
  color: ${({ theme }) => theme.colors.text};

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }
`

const Textarea = styled.textarea`
  background: ${({ theme }) => theme.colors.bgElevated};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  padding: ${({ theme }) => theme.space(2.5)};
  font-size: 13px;
  color: ${({ theme }) => theme.colors.text};
  min-height: 90px;
  resize: vertical;
  font-family: inherit;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }
`

export function Header() {
  const [modalOpen, setModalOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)

  return (
    <Bar>
      <SearchWrap>
        <SearchInput placeholder="Search lorem ipsum..." />
      </SearchWrap>
      <Actions>
        <Tooltip label="Toggle theme">
          <IconButton aria-label="Toggle theme">◐</IconButton>
        </Tooltip>

        <Popover
          trigger={
            <IconButton aria-label="Notifications" style={{ position: 'relative' }}>
              🔔
              <Badge
                $tone="danger"
                style={{ position: 'absolute', top: -4, right: -4, padding: '1px 5px', fontSize: 10 }}
              >
                {notifications.length}
              </Badge>
            </IconButton>
          }
          align="end"
        >
          <p style={{ fontSize: 13, fontWeight: 700, marginBottom: 12 }}>Notifications</p>
          <NotifList>
            {notifications.map((n) => (
              <NotifItem key={n.id}>
                <NotifTitle>{n.title}</NotifTitle>
                <NotifBody>{n.body}</NotifBody>
              </NotifItem>
            ))}
          </NotifList>
        </Popover>

        <Modal
          open={modalOpen}
          onOpenChange={setModalOpen}
          trigger={<Button $variant="primary" $size="sm">New Project</Button>}
          title="Create new project"
          description="Consectetur adipiscing elit. Fill in the lorem ipsum details below."
          footer={
            <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
              <Button $variant="ghost" $size="sm" onClick={() => setModalOpen(false)}>
                Cancel
              </Button>
              <Button $variant="primary" $size="sm" onClick={() => setModalOpen(false)}>
                Create
              </Button>
            </div>
          }
        >
          <FormField>
            <Label htmlFor="project-name">Project name</Label>
            <Input id="project-name" placeholder="Lorem ipsum dolor" />
          </FormField>
          <FormField>
            <Label htmlFor="project-desc">Description</Label>
            <Textarea id="project-desc" placeholder="Consectetur adipiscing elit, sed do eiusmod..." />
          </FormField>
        </Modal>

        <DropdownMenu
          trigger={
            <AvatarRoot>
              <Avatar.Image src="" alt="User avatar" />
              <AvatarFallback delayMs={0}>LI</AvatarFallback>
            </AvatarRoot>
          }
        >
          <DropdownMenu.Label>Lorem Ipsum</DropdownMenu.Label>
          <DropdownMenu.Item onSelect={() => setProfileOpen(true)}>Profile</DropdownMenu.Item>
          <DropdownMenu.Item>Billing</DropdownMenu.Item>
          <DropdownMenu.Item>Settings</DropdownMenu.Item>
          <DropdownMenu.Separator />
          <DropdownMenu.Item>Log out</DropdownMenu.Item>
        </DropdownMenu>

        <ProfilePanel open={profileOpen} onOpenChange={setProfileOpen} />
      </Actions>
    </Bar>
  )
}
