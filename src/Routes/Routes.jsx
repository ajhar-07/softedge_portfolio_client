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
import IoTSmartOfficeHomePage from '../Pages/IoT SmartOfficeHome/IoTSmartOfficeHomePage.jsx'
import BiometricCCTVPage from '../Pages/BiometricCCTV/BiometricCCTVPage.jsx'
import ConversationalAIPage from '../Pages/ConversationalAI/ConversationalAIPage.jsx'
import RoboticProcessPage from '../Pages/RoboticProcess/RoboticProcessPage.jsx'
import GenerativeAIMarketingPage from '../Pages/GenerativeAIMarketing/GenerativeAIMarketingPage.jsx'
import ServicePointPage from '../Pages/ServicePoint/ServicePointPage.jsx'
import CustomSaaSPage from '../Pages/CustomSaaS/CustomSaaSPage.jsx'
import StartupITconsultingPage from '../Pages/StartupITconsulting/StartupITconsultingPage.jsx'
import ITTrainingPage from '../Pages/ITTraining/ITTrainingPage.jsx'
import TechnicalSupportPage from '../Pages/TechnicalSupport/TechnicalSupportPage.jsx'
import OurTeampage from '../Pages/OurTeam/OurTeampage.jsx'
import BlogsPage from '../Pages/Blogs/BlogsPage.jsx'
import PrivacyPolicyPage from '../Pages/PrivacyPolicy/PrivacyPolicyPage.jsx'
import ServicesPage from '../Pages/Services/ServicesPage.jsx'
import EducationalInstituteManagementPage from '../Pages/EducationalInstituteManagement/EducationalInstituteManagementPage.jsx'
import ERPSoftwarePage from '../Pages/ERPSoftware/ERPSoftwarePage.jsx'
import HospitalManagementSoftwarePage from '../Pages/HospitalManagementSoftware/HospitalManagementSoftwarePage.jsx'
import PharmacyManagementSoftwarePage from '../Pages/PharmacyManagementSoftware/PharmacyManagementSoftwarePage.jsx'
import RestaurantManagementSoftwarePage from '../Pages/RestaurantManagement/RestaurantManagementSoftwarePage.jsx'
import InventoryManagementSoftwarePage from '../Pages/InventoryManagement/InventoryManagementSoftwarePage.jsx'
import MunicipalityManagementPage from '../Pages/MunicipalityManagement/MunicipalityManagementPage.jsx'
import PaymentGatewaysPage from '../Pages/PaymentGateways/PaymentGatewaysPage.jsx'
import WebsiteDevelopmentPage from '../Pages/WebsiteDevelopment/WebsiteDevelopmentPage.jsx'
import LandingPageDesignPage from '../Pages/LandingPage/LandingPageDesignPage.jsx'
import EcommerceNewsPortalPage from '../Pages/E-commerce&portal/EcommerceNewsPortalPage.jsx'
import DomainHostingServerPage from '../Pages/DomainHostingServer/DomainHostingServerPage.jsx'
import AdsSEOPage from '../Pages/AdsSEO/AdsSEOPage.jsx'
import SocialContentBrandingPage from '../Pages/SocialContentBranding/SocialContentBrandingPage.jsx'
import SecurityAuditPage from '../Pages/SecurityAudit/SecurityAuditPage.jsx'
import BackupDisasterCloudPage from '../Pages/BackupDisasterCloud/BackupDisasterCloudPage.jsx'
import BackupDisasterCloudManagement from '../Pages/DashboardPages/BackupDisasterCloudManagement/BackupDisasterCloudManagement.jsx'
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
import AboutManagement from '../Pages/DashboardPages/AboutManagement/AboutManagement.jsx'
import HowWeWorkManagement from '../Pages/DashboardPages/HowWeWorkManagement/HowWeWorkManagement.jsx'
import FAQManagement from '../Pages/DashboardPages/FAQManagement/FAQManagement.jsx'
import TeamManagement from '../Pages/DashboardPages/TeamManagement/TeamManagement.jsx'
import BlogManagement from '../Pages/DashboardPages/BlogManagement/BlogManagement.jsx'
import EducationalInstituteManagement from '../Pages/DashboardPages/EducationalInstituteManagement/EducationalInstituteManagement.jsx'
import ERPSoftwareManagement from '../Pages/DashboardPages/ERPSoftwareManagement/ERPSoftwareManagement.jsx'
import HospitalManagement from '../Pages/DashboardPages/HospitalManagement/HospitalManagement.jsx'
import PharrmacyManagement from '../Pages/DashboardPages/PharrmacyManagement/PharrmacyManagement.jsx'
import RestaurantManagement from '../Pages/DashboardPages/RestaurantManagement/RestaurantManagement.jsx'
import InventoryManagement from '../Pages/DashboardPages/InventoryManagement/InventoryManagement.jsx'
import MinicipalityManagement from '../Pages/DashboardPages/MinicipalityManagement/MinicipalityManagement.jsx'
import PaymentGatewaysManagement from '../Pages/DashboardPages/PaymentGatewaysManagement/PaymentGatewaysManagement.jsx'
import WebsiteDevelopmentManagement from '../Pages/DashboardPages/WebsiteDevelopmentManagement/WebsiteDevelopmentManagement.jsx'
import LandingPageManagement from '../Pages/DashboardPages/LandingPageManagement/LandingPageManagement.jsx'
import EcommercePortalManagement from '../Pages/DashboardPages/Ecommerce&PortalManagement/EcommercePortalManagement.jsx'
import DomainHostingManagement from '../Pages/DashboardPages/DomainHostingManagement/DomainHostingManagement.jsx'
import AdsSEOManagement from '../Pages/DashboardPages/AdsSEOManagement/AdsSEOManagement.jsx'
import SocialContentBrandingManagement from '../Pages/DashboardPages/SocialContentBrandingManagement/SocialContentBrandingManagement.jsx'
import SecurityAuditManagement from '../Pages/DashboardPages/SecurityAuditManagement/SecurityAuditManagement.jsx'
import IoTSmartOfficeHomeManagement from '../Pages/DashboardPages/IoTSmartOfficeHomeManagement/IoTSmartOfficeHomeManagement.jsx'
import BiometricCCTVManagement from '../Pages/DashboardPages/BiometricCCTVManagement/BiometricCCTVManagement.jsx'
import ConversationalAIManagement from '../Pages/DashboardPages/ConversationalAIManagement/ConversationalAIManagement.jsx'
import RoboticProcessManagement from '../Pages/DashboardPages/RoboticProcessManagement/RoboticProcessManagement.jsx'
import GenerativeAIMarketingManagement from '../Pages/DashboardPages/GenerativeAIMarketingManagement/GenerativeAIMarketingManagement.jsx'
import ServicePointManagement from '../Pages/DashboardPages/ServicePointManagement/ServicePointManagement.jsx'
import CustomSaaSManagement from '../Pages/DashboardPages/CustomSaaSManagement/CustomSaaSManagement.jsx'
import StartupITconsultingManagement from '../Pages/DashboardPages/StartupITconsultingManagement/StartupITconsultingManagement.jsx'
import ITTrainingManagement from '../Pages/DashboardPages/ITTrainingManagement/ITTrainingManagement.jsx'
import TechnicalSupportManagement from '../Pages/DashboardPages/TechnicalSupportManagement/TechnicalSupportManagement.jsx'
import FooterManagement from '../Pages/DashboardPages/FooterManagement/FooterManagement.jsx'
import HomePageManagement from '../Pages/DashboardPages/HomePageManagement/HomePageManagement.jsx'
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
        <Route path="blogs" element={<BlogsPage />} />
        <Route path="services" element={<ServicesPage />} />
        <Route
          path="educational-institute-management"
          element={<EducationalInstituteManagementPage />}
        />
        <Route path="erp-software" element={<ERPSoftwarePage />} />
        <Route path="hospital-management-software" element={<HospitalManagementSoftwarePage />} />
        <Route path="pharmacy-management-software" element={<PharmacyManagementSoftwarePage />} />
        <Route path="restaurant-management-software" element={<RestaurantManagementSoftwarePage />} />
        <Route path="inventory-management-software" element={<InventoryManagementSoftwarePage />} />
        <Route path="municipality-union-management" element={<MunicipalityManagementPage />} />
        <Route path="payment-gateways" element={<PaymentGatewaysPage />} />
        <Route path="website-development" element={<WebsiteDevelopmentPage />} />
        <Route path="landing-page-design" element={<LandingPageDesignPage />} />
        <Route path="ecommerce-news-portal" element={<EcommerceNewsPortalPage />} />
        <Route path="domain-hosting-server-management" element={<DomainHostingServerPage />} />
        <Route path="ads-seo-management" element={<AdsSEOPage />} />
        <Route path="social-content-branding" element={<SocialContentBrandingPage />} />
        <Route path="security-audit" element={<SecurityAuditPage />} />
        <Route path="backup-disaster-cloud" element={<BackupDisasterCloudPage />} />
        <Route path="privacy-policy" element={<PrivacyPolicyPage />} />
        <Route path="information-security" element={<InformationSecurityPage />} />
        <Route path="mobile-platform" element={<MobilerPlatformPage />} />
        <Route path="data-synchronization" element={<DataSynchronizationPage />} />
        <Route path="process-automation" element={<ProcessAutomationPage />} />
        <Route path="iot-smart-office-home" element={<IoTSmartOfficeHomePage />} />
        <Route path="biometric-cctv-surveillance" element={<BiometricCCTVPage />} />
        <Route path="conversational-ai-chatbots-analytics" element={<ConversationalAIPage />} />
        <Route path="robotic-process-automation" element={<RoboticProcessPage />} />
        <Route path="generative-ai-marketing" element={<GenerativeAIMarketingPage />} />
        <Route path="service-point-municipality-union" element={<ServicePointPage />} />
        <Route path="custom-saas-platform-development" element={<CustomSaaSPage />} />
        <Route path="startup-it-consulting-digital-transformation" element={<StartupITconsultingPage />} />
        <Route path="it-training-internship-program" element={<ITTrainingPage />} />
        <Route path="technical-support-amc" element={<TechnicalSupportPage />} />
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
          <Route path="dashboard/about-management" element={<AboutManagement />} />
          <Route path="dashboard/how-we-work-management" element={<HowWeWorkManagement />} />
          <Route path="dashboard/faq-management" element={<FAQManagement />} />
          <Route path="dashboard/team-management" element={<TeamManagement />} />
          <Route path="dashboard/blog-management" element={<BlogManagement />} />
          <Route
            path="dashboard/educational-institute-management"
            element={<EducationalInstituteManagement />}
          />
          <Route path="dashboard/erp-software-management" element={<ERPSoftwareManagement />} />
          <Route path="dashboard/hospital-management" element={<HospitalManagement />} />
          <Route path="dashboard/pharmacy-management" element={<PharrmacyManagement />} />
          <Route path="dashboard/restaurant-management" element={<RestaurantManagement />} />
          <Route path="dashboard/inventory-management" element={<InventoryManagement />} />
          <Route path="dashboard/minicipality-management" element={<MinicipalityManagement />} />
          <Route path="dashboard/payment-gateways-management" element={<PaymentGatewaysManagement />} />
          <Route path="dashboard/website-development-management" element={<WebsiteDevelopmentManagement />} />
          <Route path="dashboard/landing-page-management" element={<LandingPageManagement />} />
          <Route path="dashboard/ecommerce-portal-management" element={<EcommercePortalManagement />} />
          <Route path="dashboard/domain-hosting-management" element={<DomainHostingManagement />} />
          <Route path="dashboard/ads-seo-management" element={<AdsSEOManagement />} />
          <Route
            path="dashboard/social-content-branding-management"
            element={<SocialContentBrandingManagement />}
          />
          <Route path="dashboard/security-audit-management" element={<SecurityAuditManagement />} />
          <Route
            path="dashboard/iot-smart-office-home-management"
            element={<IoTSmartOfficeHomeManagement />}
          />
          <Route
            path="dashboard/biometric-cctv-management"
            element={<BiometricCCTVManagement />}
          />
          <Route
            path="dashboard/conversational-ai-management"
            element={<ConversationalAIManagement />}
          />
          <Route
            path="dashboard/robotic-process-management"
            element={<RoboticProcessManagement />}
          />
          <Route
            path="dashboard/generative-ai-marketing-management"
            element={<GenerativeAIMarketingManagement />}
          />
          <Route
            path="dashboard/service-point-management"
            element={<ServicePointManagement />}
          />
          <Route
            path="dashboard/custom-saas-management"
            element={<CustomSaaSManagement />}
          />
          <Route
            path="dashboard/startup-it-consulting-management"
            element={<StartupITconsultingManagement />}
          />
          <Route
            path="dashboard/it-training-management"
            element={<ITTrainingManagement />}
          />
          <Route
            path="dashboard/technical-support-management"
            element={<TechnicalSupportManagement />}
          />
          <Route
            path="dashboard/footer-management"
            element={<FooterManagement />}
          />
          <Route
            path="dashboard/home-page-management"
            element={<HomePageManagement />}
          />
          <Route
            path="dashboard/backup-disaster-cloud-management"
            element={<BackupDisasterCloudManagement />}
          />
        </Route>
      </Route>
    </RouterRoutes>
  )
}
