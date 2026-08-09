import { useState } from 'react'
import styled from 'styled-components'
import { Card, CardHeader, CardTitle, CardSubtitle } from '../ui/Card'
import { Badge, type BadgeTone } from '../ui/Badge'
import { IconButton } from '../ui/Button'
import { DropdownMenu } from '../ui/DropdownMenu'
import { Modal } from '../ui/Modal'
import { tableRows, loremMedium, type TableRow as TableRowData, type RowStatus } from '../../data/lorem'

const Wrap = styled(Card)`
  margin-bottom: ${({ theme }) => theme.space(8)};
  overflow-x: auto;
`

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;
`

const Th = styled.th`
  text-align: left;
  padding: ${({ theme }) => theme.space(3)};
  color: ${({ theme }) => theme.colors.textMuted};
  font-weight: 600;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  white-space: nowrap;
`

const Td = styled.td`
  padding: ${({ theme }) => theme.space(3)};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  white-space: nowrap;
`

const Tr = styled.tr`
  &:last-child td {
    border-bottom: none;
  }

  &:hover td {
    background: ${({ theme }) => theme.colors.bgElevated};
  }
`

const tones: Record<RowStatus, BadgeTone> = {
  Active: 'success',
  Pending: 'warning',
  Archived: 'neutral',
}

export function DataTable() {
  const [activeRow, setActiveRow] = useState<TableRowData | null>(null)

  return (
    <Wrap>
      <CardHeader>
        <div>
          <CardTitle>Sit Amet Records</CardTitle>
          <CardSubtitle>Consectetur adipiscing elit ipsum dataset</CardSubtitle>
        </div>
      </CardHeader>
      <Table>
        <thead>
          <tr>
            <Th>ID</Th>
            <Th>Name</Th>
            <Th>Status</Th>
            <Th>Owner</Th>
            <Th>Value</Th>
            <Th />
          </tr>
        </thead>
        <tbody>
          {tableRows.map((row) => (
            <Tr key={row.id}>
              <Td>{row.id}</Td>
              <Td>{row.name}</Td>
              <Td>
                <Badge $tone={tones[row.status]}>{row.status}</Badge>
              </Td>
              <Td>{row.owner}</Td>
              <Td>${row.value}</Td>
              <Td>
                <DropdownMenu trigger={<IconButton aria-label="Row actions">⋯</IconButton>}>
                  <DropdownMenu.Item onSelect={() => setActiveRow(row)}>View details</DropdownMenu.Item>
                  <DropdownMenu.Item>Edit</DropdownMenu.Item>
                  <DropdownMenu.Item>Duplicate</DropdownMenu.Item>
                  <DropdownMenu.Separator />
                  <DropdownMenu.Item>Archive</DropdownMenu.Item>
                </DropdownMenu>
              </Td>
            </Tr>
          ))}
        </tbody>
      </Table>

      <Modal
        open={!!activeRow}
        onOpenChange={(open) => !open && setActiveRow(null)}
        title={activeRow?.name}
        description={activeRow ? `Record ${activeRow.id} · Owned by ${activeRow.owner}` : undefined}
      >
        <p style={{ fontSize: 13, lineHeight: 1.7, color: 'inherit' }}>{loremMedium}</p>
      </Modal>
    </Wrap>
  )
}
