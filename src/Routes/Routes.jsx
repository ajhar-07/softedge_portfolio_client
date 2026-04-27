import { Link, Route, Routes as RouterRoutes } from 'react-router-dom'
import MainLayout from '../Layouts/MainLayout.jsx'
import { ScrollReveal } from '../components/ScrollReveal/ScrollReveal.jsx'
import AboutPage from '../Pages/AboutPage/AboutPage.jsx'
import FAQpage from '../Pages/FAQ/FAQpage.jsx'
import Home from '../Pages/Homepages/Home/Home.jsx'
import HowWeWork from '../Pages/HowWeWork/HowWeWork.jsx'
import EventProcessingPage from '../Pages/EventProcessing/EventProcessingPage.jsx'
import ContentManagementPage from '../Pages/ContentManagement/ContentManagementPage.jsx'
import InformationSecurityPage from '../Pages/InformationSecurity/InformationSecurityPage.jsx'
import MobilerPlatformPage from '../Pages/MobilrPlatform/MobilerPlatformPage.jsx'
import DataSynchronizationPage from '../Pages/DataSynchronization/DataSynchronizationPage.jsx'
import ProcessAutomationPage from '../Pages/ProcessAutomation/ProcessAutomationPage.jsx'
import OurTeampage from '../Pages/OurTeam/OurTeampage.jsx'
import ServicesPage from '../Pages/Services/ServicesPage.jsx'
import PrivateRoutes from './PrivateRoutes.jsx'

function Login() {
  return (
    <div className="hero min-h-dvh min-h-screen bg-transparent">
      <div className="hero-content">
        <ScrollReveal variant="scale" duration={0.55} className="w-full max-w-md">
          <div className="card border border-white/10 bg-[#000b1e]/45 text-white shadow-xl backdrop-blur-xl backdrop-saturate-150">
            <div className="card-body">
              <h2 className="card-title text-white">Login</h2>
              <p className="text-sm text-white/70">
                Private পাতা দেখতে লগইন লাগবে। এখানে পরে আপনার ফর্ম/API বসান।
              </p>
              <Link className="btn btn-ghost btn-sm" to="/">
                ← Home
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </div>
  )
}

function Dashboard() {
  return (
    <div className="min-h-full flex-1 bg-transparent p-8">
      <ScrollReveal variant="slide-left" duration={0.6}>
        <h1 className="text-3xl font-bold text-white">Dashboard</h1>
        <p className="mt-2 text-white/75">এটি একটি private রাউটের উদাহরণ।</p>
        <Link className="btn btn-ghost mt-6" to="/">
          ← Home
        </Link>
      </ScrollReveal>
    </div>
  )
}

export default function AppRoutes() {
  return (
    <RouterRoutes>
      <Route path="/login" element={<Login />} />

      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="faq" element={<FAQpage />} />
        <Route path="how-we-work" element={<HowWeWork />} />
        <Route path="our-team" element={<OurTeampage />} />
        <Route path="services" element={<ServicesPage />} />
        <Route path="information-security" element={<InformationSecurityPage />} />
        <Route path="mobile-platform" element={<MobilerPlatformPage />} />
        <Route path="data-synchronization" element={<DataSynchronizationPage />} />
        <Route path="process-automation" element={<ProcessAutomationPage />} />
        <Route path="event-processing" element={<EventProcessingPage />} />
        <Route path="content-management" element={<ContentManagementPage />} />

        <Route element={<PrivateRoutes />}>
          <Route path="dashboard" element={<Dashboard />} />
        </Route>
      </Route>
    </RouterRoutes>
  )
}
