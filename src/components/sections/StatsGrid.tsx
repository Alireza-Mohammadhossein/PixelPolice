import styled from 'styled-components'
import { Card } from '../ui/Card'
import { Tooltip } from '../ui/Tooltip'
import { statItems, type Trend } from '../../data/lorem'

const Grid = styled.section`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: ${({ theme }) => theme.space(5)};
  margin-bottom: ${({ theme }) => theme.space(8)};

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`

const Label = styled.p`
  font-size: 13px;
  color: ${({ theme }) => theme.colors.textMuted};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space(1.5)};
`

const InfoDot = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  border: 1px solid ${({ theme }) => theme.colors.border};
  font-size: 9px;
  cursor: help;
`

const Value = styled.p`
  font-size: 26px;
  font-weight: 800;
  margin: ${({ theme }) => theme.space(2)} 0 ${({ theme }) => theme.space(1)};
`

const Delta = styled.span<{ $trend: Trend }>`
  font-size: 12px;
  font-weight: 700;
  color: ${({ theme, $trend }) => ($trend === 'up' ? theme.colors.success : theme.colors.danger)};
`

export function StatsGrid() {
  return (
    <Grid>
      {statItems.map((stat) => (
        <Card key={stat.label}>
          <Label>
            {stat.label}
            <Tooltip label="Consectetur adipiscing elit ipsum">
              <InfoDot>i</InfoDot>
            </Tooltip>
          </Label>
          <Value>{stat.value}</Value>
          <Delta $trend={stat.trend}>
            {stat.trend === 'up' ? '▲' : '▼'} {stat.delta}
          </Delta>
        </Card>
      ))}
    </Grid>
  )
}
