import styled from 'styled-components'
import { CardTitle, CardSubtitle } from '../ui/Card'
import { Badge } from '../ui/Badge'
import { Tooltip } from '../ui/Tooltip'
import { galleryItems } from '../../data/lorem'

const Section = styled.section`
  margin-bottom: ${({ theme }) => theme.space(8)};
`

const Heading = styled.div`
  margin-bottom: ${({ theme }) => theme.space(5)};
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${({ theme }) => theme.space(5)};

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`

const Tile = styled.div`
  border-radius: ${({ theme }) => theme.radii.lg};
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.bgCard};
  cursor: pointer;
  transition: transform 0.15s ease, border-color 0.15s ease;

  &:hover {
    transform: translateY(-2px);
    border-color: ${({ theme }) => theme.colors.primary};
  }
`

const TileVisual = styled.div<{ $hue: number }>`
  height: 120px;
  background: ${({ $hue }) => `linear-gradient(135deg, hsl(${$hue}, 70%, 55%), hsl(${$hue + 40}, 70%, 45%))`};
`

const TileBody = styled.div`
  padding: ${({ theme }) => theme.space(4)};
`

const TileTitle = styled.p`
  font-size: 14px;
  font-weight: 600;
  margin-bottom: ${({ theme }) => theme.space(2)};
`

export function Gallery() {
  return (
    <Section>
      <Heading>
        <CardTitle as="h2" style={{ fontSize: 18 }}>Excepteur Sint Collection</CardTitle>
        <CardSubtitle>Occaecat cupidatat non proident lorem ipsum items</CardSubtitle>
      </Heading>
      <Grid>
        {galleryItems.map((item, i) => (
          <Tooltip key={item.id} label="Click to preview lorem ipsum">
            <Tile>
              <TileVisual $hue={(i * 55) % 360} />
              <TileBody>
                <TileTitle>{item.title}</TileTitle>
                <Badge $tone="neutral">#{item.tag}</Badge>
              </TileBody>
            </Tile>
          </Tooltip>
        ))}
      </Grid>
    </Section>
  )
}
