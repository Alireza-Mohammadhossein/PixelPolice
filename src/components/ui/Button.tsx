import styled, { css } from 'styled-components'

export type ButtonVariant = 'primary' | 'ghost' | 'subtle' | 'danger'
export type ButtonSize = 'sm' | 'md'

const variants = {
  primary: css`
    background: ${({ theme }) => theme.colors.primary};
    color: white;
    border: 1px solid transparent;

    &:hover {
      background: ${({ theme }) => theme.colors.primaryHover};
    }
  `,
  ghost: css`
    background: transparent;
    color: ${({ theme }) => theme.colors.text};
    border: 1px solid ${({ theme }) => theme.colors.border};

    &:hover {
      background: ${({ theme }) => theme.colors.bgElevated};
    }
  `,
  subtle: css`
    background: ${({ theme }) => theme.colors.bgElevated};
    color: ${({ theme }) => theme.colors.textMuted};
    border: 1px solid transparent;

    &:hover {
      color: ${({ theme }) => theme.colors.text};
    }
  `,
  danger: css`
    background: transparent;
    color: ${({ theme }) => theme.colors.danger};
    border: 1px solid ${({ theme }) => theme.colors.danger};

    &:hover {
      background: rgba(255, 92, 124, 0.1);
    }
  `,
}

export interface ButtonProps {
  $variant?: ButtonVariant
  $size?: ButtonSize
}

export const Button = styled.button<ButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.space(1.5)};
  padding: ${({ theme, $size }) => ($size === 'sm' ? `${theme.space(1.5)} ${theme.space(3)}` : `${theme.space(2.5)} ${theme.space(4)}`)};
  font-size: ${({ $size }) => ($size === 'sm' ? '13px' : '14px')};
  font-weight: 600;
  border-radius: ${({ theme }) => theme.radii.md};
  cursor: pointer;
  transition: background 0.15s ease, color 0.15s ease, border-color 0.15s ease, transform 0.1s ease;
  white-space: nowrap;
  border: none;

  &:active {
    transform: translateY(1px);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  ${({ $variant = 'primary' }) => variants[$variant]}
`

export const IconButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: ${({ theme }) => theme.space(9)};
  height: ${({ theme }) => theme.space(9)};
  border-radius: ${({ theme }) => theme.radii.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.bgElevated};
  color: ${({ theme }) => theme.colors.textMuted};
  cursor: pointer;
  transition: color 0.15s ease, border-color 0.15s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.text};
    border-color: ${({ theme }) => theme.colors.primary};
  }
`
