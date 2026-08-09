import { ThemeProvider } from 'styled-components'
import * as RadixTooltip from '@radix-ui/react-tooltip'
import { theme } from './styles/theme'
import { GlobalStyle } from './styles/GlobalStyle'
import { ToastProvider, ToastViewport } from './components/ui/Toast'
import { Shell, SidebarSlot, HeaderSlot, MainSlot, FooterSlot } from './components/layout/AppShell'
import { Sidebar } from './components/layout/Sidebar'
import { Header } from './components/layout/Header'
import { Footer } from './components/layout/Footer'
import { Hero } from './components/sections/Hero'
import { StatsGrid } from './components/sections/StatsGrid'
import { ContentGrid } from './components/sections/ContentGrid'
import { DataTable } from './components/sections/DataTable'
import { Gallery } from './components/sections/Gallery'
import PixelPolice from './components/pixelpolice/PixelPolice'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <RadixTooltip.Provider>
        <ToastProvider swipeDirection="right">
          <Shell>
            <SidebarSlot>
              <Sidebar />
            </SidebarSlot>
            <HeaderSlot>
              <Header />
            </HeaderSlot>
            <MainSlot>
              <Hero />
              <StatsGrid />
              <ContentGrid />
              <DataTable />
              <Gallery />
            </MainSlot>
            <FooterSlot>
              <Footer />
            </FooterSlot>
          </Shell>
          <PixelPolice />
          <ToastViewport />
        </ToastProvider>
      </RadixTooltip.Provider>
    </ThemeProvider>
  )
}

export default App
