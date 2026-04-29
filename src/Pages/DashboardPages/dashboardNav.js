export const dashboardPageLinks = [
  { label: 'Dashboard', to: '/dashboard' },
  { label: 'User Management', to: '/dashboard/user-management' },
  { label: 'Services Management', to: '/dashboard/services-management' },
  { label: 'Information Security Management', to: '/dashboard/information-security-management' },
]

export const dashboardSidebarGroups = [
  {
    title: 'Services',
    items: [
      { label: 'Our Services', to: '/dashboard/services-management' },
      { label: 'Information Security', to: '/dashboard/information-security-management' },
      { label: 'Mobile Platform', to: '/mobile-platform' },
      { label: 'Data Synchronization', to: '/data-synchronization' },
      { label: 'Process Automation', to: '/process-automation' },
      { label: 'Event Processing', to: '/event-processing' },
      { label: 'Content Management', to: '/content-management' },
      { label: 'Privacy Policy', to: '/privacy-policy' },
    ],
  },
  {
    title: 'Industries',
    items: [
      { label: 'FinTech', to: '/dashboard' },
      { label: 'Healthcare', to: '/dashboard' },
    ],
  },
  {
    title: 'Technologies',
    items: [
      { label: 'Cloud', to: '/dashboard' },
      { label: 'AI / ML', to: '/dashboard' },
    ],
  },
  {
    title: 'About',
    items: [
      { label: 'About Us', to: '/about' },
      { label: 'How We Work', to: '/how-we-work' },
      { label: 'FAQ', to: '/faq' },
      { label: 'Our Team', to: '/our-team' },
    ],
  },
  {
    title: 'General',
    items: [
      { label: 'Case Study', to: '/' },
      { label: 'Blog', to: '/' },
    ],
  },
]
