import styled, { css } from 'styled-components'

export type BadgeTone = 'neutral' | 'success' | 'warning' | 'danger' | 'accent'

const tones = {
  neutral: css`
    background: ${({ theme }) => theme.colors.bgElevated};
    color: ${({ theme }) => theme.colors.textMuted};
  `,
  success: css`
    background: rgba(74, 222, 128, 0.12);
    color: ${({ theme }) => theme.colors.success};
  `,
  warning: css`
    background: rgba(255, 184, 77, 0.12);
    color: ${({ theme }) => theme.colors.warning};
  `,
  danger: css`
    background: rgba(255, 92, 124, 0.12);
    color: ${({ theme }) => theme.colors.danger};
  `,
  accent: css`
    background: rgba(56, 217, 201, 0.12);
    color: ${({ theme }) => theme.colors.accent};
  `,
}

export interface BadgeProps {
  $tone?: BadgeTone
}

export const Badge = styled.span<BadgeProps>`
  display: inline-flex;
  align-items: center;
  padding: ${({ theme }) => `${theme.space(1)} ${theme.space(2.5)}`};
  font-size: 12px;
  font-weight: 600;
  border-radius: ${({ theme }) => theme.radii.pill};
  ${({ $tone = 'neutral' }) => tones[$tone]}
`
