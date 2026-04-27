import { BrowserRouter } from 'react-router-dom'
import GlobalBackdrop from './components/GlobalBackdrop/GlobalBackdrop.jsx'
import AppRoutes from './Routes/Routes.jsx'

export default function App() {
  return (
    <BrowserRouter>
      <div className="relative min-h-dvh min-h-screen">
        <GlobalBackdrop />
        <div className="relative z-10 flex min-h-dvh min-h-screen flex-col">
          <AppRoutes />
        </div>
      </div>
    </BrowserRouter>
  )
}
