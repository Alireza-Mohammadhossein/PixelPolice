import styled from 'styled-components'
import { Card, CardHeader, CardTitle, CardSubtitle } from '../ui/Card'
import { Badge } from '../ui/Badge'
import { Button } from '../ui/Button'
import { TabsRoot, TabsList, TabsTrigger, TabsContent } from '../ui/Tabs'
import { Modal } from '../ui/Modal'
import { loremLong, loremMedium, loremShort, loremTitles } from '../../data/lorem'

const Bento = styled.section`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-auto-rows: minmax(100px, auto);
  gap: ${({ theme }) => theme.space(5)};
  margin-bottom: ${({ theme }) => theme.space(8)};

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: repeat(2, 1fr);
  }
`

const SpanCard = styled(Card)<{ $colSpan?: number; $rowSpan?: number }>`
  grid-column: span ${({ $colSpan }) => $colSpan || 2};
  grid-row: span ${({ $rowSpan }) => $rowSpan || 1};
  display: flex;
  flex-direction: column;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-column: span 2;
  }
`

const List = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space(3)};
  flex: 1;
`

const ListItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.space(3)};
  padding-bottom: ${({ theme }) => theme.space(3)};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  font-size: 13px;

  &:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }
`

const Progress = styled.div`
  height: 6px;
  border-radius: ${({ theme }) => theme.radii.pill};
  background: ${({ theme }) => theme.colors.bgElevated};
  overflow: hidden;
  margin-top: ${({ theme }) => theme.space(3)};
`

const ProgressFill = styled.div<{ $pct: number }>`
  height: 100%;
  width: ${({ $pct }) => $pct}%;
  background: linear-gradient(90deg, ${({ theme }) => theme.colors.primary}, ${({ theme }) => theme.colors.accent});
`

export function ContentGrid() {
  return (
    <Bento>
      <SpanCard $colSpan={4} $rowSpan={2}>
        <CardHeader>
          <div>
            <CardTitle>Nostrud Exercitation Overview</CardTitle>
            <CardSubtitle>Ullamco laboris nisi ut aliquip ex ea commodo</CardSubtitle>
          </div>
          <Badge $tone="accent">Live</Badge>
        </CardHeader>
        <TabsRoot defaultValue="summary">
          <TabsList>
            <TabsTrigger value="summary">Summary</TabsTrigger>
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
          </TabsList>
          <TabsContent value="summary">{loremMedium}</TabsContent>
          <TabsContent value="details">{loremLong}</TabsContent>
          <TabsContent value="activity">{loremShort} {loremShort}</TabsContent>
        </TabsRoot>
        <Progress>
          <ProgressFill $pct={64} />
        </Progress>
      </SpanCard>

      <SpanCard $colSpan={2} $rowSpan={2}>
        <CardHeader>
          <div>
            <CardTitle>Top Dolor Sit</CardTitle>
            <CardSubtitle>Ranked this week</CardSubtitle>
          </div>
        </CardHeader>
        <List>
          {loremTitles.slice(0, 4).map((title, i) => (
            <ListItem key={title}>
              <span>{i + 1}. {title}</span>
              <Badge $tone="neutral">{(4 - i) * 12}%</Badge>
            </ListItem>
          ))}
        </List>
      </SpanCard>

      <SpanCard $colSpan={2}>
        <CardTitle>Magna Aliqua</CardTitle>
        <CardSubtitle style={{ marginBottom: 12 }}>{loremShort}</CardSubtitle>
        <Modal
          size="lg"
          trigger={<Button $size="sm" $variant="subtle">View report</Button>}
          title="Magna Aliqua Report"
          description="Detailed breakdown of consectetur adipiscing elit metrics."
        >
          <p style={{ fontSize: 13, color: 'inherit', lineHeight: 1.7 }}>{loremLong}</p>
        </Modal>
      </SpanCard>

      <SpanCard $colSpan={2}>
        <CardTitle>Voluptate Velit</CardTitle>
        <CardSubtitle style={{ marginBottom: 12 }}>{loremShort}</CardSubtitle>
        <Badge $tone="warning">Needs review</Badge>
      </SpanCard>

      <SpanCard $colSpan={2}>
        <CardTitle>Cillum Dolore</CardTitle>
        <CardSubtitle style={{ marginBottom: 12 }}>{loremShort}</CardSubtitle>
        <Badge $tone="success">On track</Badge>
      </SpanCard>
    </Bento>
  )
}
