export const loremWords = [
  'lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit',
  'sed', 'do', 'eiusmod', 'tempor', 'incididunt', 'ut', 'labore', 'et', 'dolore',
  'magna', 'aliqua', 'enim', 'ad', 'minim', 'veniam', 'quis', 'nostrud',
]

export const loremShort = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'

export const loremMedium =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.'

export const loremLong =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'

export const loremTitles = [
  'Consectetur Adipiscing',
  'Tempor Incididunt',
  'Labore Et Dolore',
  'Magna Aliqua Ventures',
  'Nostrud Exercitation',
  'Voluptate Velit Esse',
  'Cillum Dolore Eu',
  'Cupidatat Non Proident',
  'Officia Deserunt Mollit',
  'Anim Id Est',
]

export const loremTags = [
  'alpha', 'beta', 'gamma', 'delta', 'epsilon', 'zeta', 'theta', 'sigma',
]

export type Trend = 'up' | 'down'

export interface StatItem {
  label: string
  value: string
  delta: string
  trend: Trend
}

export const statItems: StatItem[] = [
  { label: 'Sit Amet', value: '48,204', delta: '+12.4%', trend: 'up' },
  { label: 'Consectetur', value: '1,204', delta: '-3.1%', trend: 'down' },
  { label: 'Adipiscing Elit', value: '87.3%', delta: '+0.8%', trend: 'up' },
  { label: 'Eiusmod Tempor', value: '$92.1k', delta: '+5.6%', trend: 'up' },
]

export type RowStatus = 'Active' | 'Pending' | 'Archived'

export interface TableRow {
  id: string
  name: string
  status: RowStatus
  owner: string
  value: string
}

const rowStatuses: RowStatus[] = ['Active', 'Pending', 'Archived']

export const tableRows: TableRow[] = Array.from({ length: 8 }).map((_, i) => ({
  id: `ID-${1000 + i}`,
  name: loremTitles[i % loremTitles.length],
  status: rowStatuses[i % 3],
  owner: ['A. Ipsum', 'B. Dolor', 'C. Sit'][i % 3],
  value: `${(i + 1) * 137}.00`,
}))

export interface GalleryItem {
  id: number
  title: string
  tag: string
}

export const galleryItems: GalleryItem[] = Array.from({ length: 6 }).map((_, i) => ({
  id: i,
  title: loremTitles[(i + 3) % loremTitles.length],
  tag: loremTags[i % loremTags.length],
}))

export interface NotificationItem {
  id: number
  title: string
  body: string
}

export const notifications: NotificationItem[] = [
  { id: 1, title: 'Lorem ipsum update', body: 'Dolor sit amet consectetur adipiscing.' },
  { id: 2, title: 'Tempor incididunt', body: 'Ut labore et dolore magna aliqua enim.' },
  { id: 3, title: 'Nostrud exercitation', body: 'Ullamco laboris nisi ut aliquip ex ea.' },
]
