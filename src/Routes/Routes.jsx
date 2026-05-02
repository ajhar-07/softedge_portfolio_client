import { Route, Routes as RouterRoutes } from 'react-router-dom'
import MainLayout from '../Layouts/MainLayout.jsx'
import AboutPage from '../Pages/AboutPage/AboutPage.jsx'
import Login from '../Pages/Auth/Login/Login.jsx'
import RegisterPage from '../Pages/Auth/Register/RegisterPage.jsx'
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
import PrivacyPolicyPage from '../Pages/PrivacyPolicy/PrivacyPolicyPage.jsx'
import ServicesPage from '../Pages/Services/ServicesPage.jsx'
import Dashboard from '../Pages/DashboardPages/Dashboard/Dashboard.jsx'
import DataSyynchronizationManagement from '../Pages/DashboardPages/dataSyynchronizationManagement/dataSyynchronizationManagement.jsx'
import InformationSecurityManagement from '../Pages/DashboardPages/InformationSecurityManagement/InformationSecurityManagement.jsx'
import MobilePlatformManagement from '../Pages/DashboardPages/MobilePlatformManagement/MobilePlatformManagement.jsx'
import ProccessAutamationManagement from '../Pages/DashboardPages/ProccessAutamationManagement/ProccessAutamationManagement.jsx'
import EventProcessingManagement from '../Pages/DashboardPages/EventProcessingManagement/EventProcessingManagement.jsx'
import ContentManagementDashboard from '../Pages/DashboardPages/ContentManagement/ContentManagement.jsx'
import ServicesManagement from '../Pages/DashboardPages/ServicesManagement/ServicesManagement.jsx'
import UserManagement from '../Pages/DashboardPages/UserManagement/UserManagement.jsx'
import PrivacyPolicyManagement from '../Pages/DashboardPages/PrivacyPolicyManagement/PrivacyPolicyManagement.jsx'
import PrivateRoutes from './PrivateRoutes.jsx'

export default function AppRoutes() {
  return (
    <RouterRoutes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<RegisterPage />} />

      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="faq" element={<FAQpage />} />
        <Route path="how-we-work" element={<HowWeWork />} />
        <Route path="our-team" element={<OurTeampage />} />
        <Route path="services" element={<ServicesPage />} />
        <Route path="privacy-policy" element={<PrivacyPolicyPage />} />
        <Route path="information-security" element={<InformationSecurityPage />} />
        <Route path="mobile-platform" element={<MobilerPlatformPage />} />
        <Route path="data-synchronization" element={<DataSynchronizationPage />} />
        <Route path="process-automation" element={<ProcessAutomationPage />} />
        <Route path="event-processing" element={<EventProcessingPage />} />
        <Route path="content-management" element={<ContentManagementPage />} />

        <Route element={<PrivateRoutes requireAdmin />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="dashboard/user-management" element={<UserManagement />} />
          <Route path="dashboard/services-management" element={<ServicesManagement />} />
          <Route
            path="dashboard/information-security-management"
            element={<InformationSecurityManagement />}
          />
          <Route path="dashboard/mobile-platform-management" element={<MobilePlatformManagement />} />
          <Route
            path="dashboard/data-syynchronization-management"
            element={<DataSyynchronizationManagement />}
          />
          <Route
            path="dashboard/proccess-autamation-management"
            element={<ProccessAutamationManagement />}
          />
          <Route path="dashboard/event-processing-management" element={<EventProcessingManagement />} />
          <Route path="dashboard/content-management" element={<ContentManagementDashboard />} />
          <Route path="dashboard/privacy-policy-management" element={<PrivacyPolicyManagement />} />
        </Route>
      </Route>
    </RouterRoutes>
  )
}
