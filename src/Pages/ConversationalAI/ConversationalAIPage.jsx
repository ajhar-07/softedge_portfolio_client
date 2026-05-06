import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ScrollReveal } from '../../components/ScrollReveal/ScrollReveal.jsx'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

const DEFAULT_PAGE_DATA = {
  heroImage:
    'https://images.unsplash.com/photo-1677442135968-6d894f7d8f6a?auto=format&fit=crop&w=2200&q=80',
  heroBadge: 'AI Automation Suite',
  heroTitle: 'Conversational AI Chatbots + AI Analytics',
  breadcrumbTitle: 'Conversational AI',
  smartBadge: 'Smart Interaction Layer',
  smartTitle: 'Transform Customer Conversations Into Growth Signals',
  smartDescription:
    'Conversational AI is not just a chatbot popup. It is a full digital communication engine that supports customers, collects qualified leads, assists operations, and creates analytics for better decisions. We design enterprise-ready chatbots with clear business logic, secure integrations, and measurable outcomes.',
  smartDescriptionBottom:
    'From support and sales to onboarding and internal service desk, each conversation is mapped, analyzed, and optimized for user satisfaction and business efficiency.',
  implementationTitle: 'Implementation Workflow',
  capabilitiesTitle: 'Key Capabilities',
  readyBadge: 'Ready To Launch AI',
  readyTitle: 'Build an intelligent conversation system that supports, sells, and learns.',
  readyDescription:
    'We provide strategy, bot design, channel deployment, model tuning, analytics dashboard setup, and continuous optimization support for production-scale usage.',
  ctaButtonText: 'Start AI Consultation',
  ctaButtonLink: '/services',
  solutionBlocks: [
    {
      _id: 's1',
      title: 'AI Customer Support Chatbot',
      description:
        '24/7 multilingual chatbot for website, Facebook, WhatsApp, and app support with instant responses and contextual conversation.',
      bullets: ['Intent detection + smart fallback', 'Ticket handoff to human agent', 'Knowledge base connected answers'],
    },
  ],
  capabilities: [{ _id: 'c1', text: 'Website widget + mobile app chatbot integration' }],
  aiWorkflow: [{ _id: 'w1', phase: 'Phase 1', title: 'Discovery & Use-case Mapping', text: 'Business goals and intent planning.' }],
  kpiCards: [{ _id: 'k1', value: '60%+', label: 'Average response time reduction' }],
}

export default function ConversationalAIPage() {
  const [pageData, setPageData] = useState(DEFAULT_PAGE_DATA)

  useEffect(() => {
    let ignore = false

    const loadPage = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/conversational-ai-page`)
        if (!response.ok) throw new Error('Failed to fetch conversational ai page data')
        const data = await response.json()
        if (ignore) return
        setPageData({
          ...DEFAULT_PAGE_DATA,
          ...data,
          solutionBlocks: data.solutionBlocks?.length ? data.solutionBlocks : DEFAULT_PAGE_DATA.solutionBlocks,
          capabilities: data.capabilities?.length ? data.capabilities : DEFAULT_PAGE_DATA.capabilities,
          aiWorkflow: data.aiWorkflow?.length ? data.aiWorkflow : DEFAULT_PAGE_DATA.aiWorkflow,
          kpiCards: data.kpiCards?.length ? data.kpiCards : DEFAULT_PAGE_DATA.kpiCards,
        })
      } catch (error) {
        console.error(error)
      }
    }

    loadPage()
    return () => {
      ignore = true
    }
  }, [])

  return (
    <div className="w-full text-white">
      <section className="relative isolate overflow-hidden">
        <div
          className="h-[230px] w-full bg-cover bg-center sm:h-[260px]"
          style={{
            backgroundImage: `url(${pageData.heroImage})`,
          }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(0,11,30,0.88),rgba(0,11,30,0.48),rgba(0,11,30,0.2))]" />
        <div className="absolute inset-0 mx-auto flex w-full max-w-7xl items-center px-4 sm:px-6 lg:px-8">
          <ScrollReveal variant="slide-right" duration={0.55}>
            <p className="inline-flex items-center gap-2 rounded-sm bg-[#1f4358]/55 px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] text-[#00d2ff]">
              {pageData.heroBadge}
            </p>
            <h1 className="mt-3 text-3xl font-black leading-tight text-white sm:text-4xl lg:text-5xl">
              {pageData.heroTitle}
            </h1>
            <p className="mt-3 inline-flex items-center gap-2 rounded-sm bg-[#20394a]/60 px-3 py-1 text-sm font-semibold text-white/90">
              <Link to="/" className="transition-colors hover:text-[#00d2ff]">
                Home
              </Link>
              <span className="text-[#00d2ff]">●</span>
              <Link to="/conversational-ai-chatbots-analytics" className="transition-colors hover:text-[#00d2ff]">
                {pageData.breadcrumbTitle}
              </Link>
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8 lg:py-14">
        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <ScrollReveal className="rounded-2xl border border-white/10 bg-[#031a2e]/70 p-6 sm:p-8">
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-[#00d2ff]">{pageData.smartBadge}</p>
            <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
              {pageData.smartTitle}
            </h2>
            <p className="mt-4 text-base leading-8 text-white/80">
              {pageData.smartDescription}
            </p>
            <p className="mt-4 text-sm leading-7 text-white/75">
              {pageData.smartDescriptionBottom}
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.08} className="grid gap-4 rounded-2xl border border-white/10 bg-[#000b1e]/55 p-6">
            {pageData.kpiCards.map((kpi) => (
              <div key={kpi._id || kpi.label} className="rounded-xl border border-white/10 bg-[#0a3146]/35 px-4 py-3">
                <p className="text-2xl font-black text-[#00d2ff]">{kpi.value}</p>
                <p className="mt-1 text-xs uppercase tracking-[0.16em] text-white/75">{kpi.label}</p>
              </div>
            ))}
          </ScrollReveal>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 pb-10 sm:px-6 lg:px-8">
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {pageData.solutionBlocks.map((block, index) => (
            <ScrollReveal
              key={block._id || block.title}
              variant="fade-up"
              delay={index * 0.08}
              className="rounded-2xl border border-white/10 bg-[linear-gradient(170deg,rgba(0,11,30,0.8),rgba(7,36,54,0.72))] p-5 shadow-[0_14px_40px_-14px_rgba(0,0,0,0.65)]"
            >
              <h3 className="text-xl font-bold text-white">{block.title}</h3>
              <p className="mt-3 text-sm leading-7 text-white/80">{block.description}</p>
              <ul className="mt-4 space-y-2">
                {(block.bullets || []).map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-white/85">
                    <span className="mt-1 text-[#00d2ff]">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </ScrollReveal>
          ))}
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-7xl gap-6 px-4 pb-10 sm:px-6 lg:grid-cols-[1fr_1fr] lg:px-8">
        <ScrollReveal className="rounded-2xl border border-white/10 bg-[#041d33]/72 p-6 sm:p-8">
          <h3 className="text-2xl font-bold text-white">{pageData.implementationTitle}</h3>
          <div className="mt-4 space-y-3">
            {pageData.aiWorkflow.map((step) => (
              <div key={step._id || step.title} className="rounded-lg border border-white/10 bg-[#08253b]/50 p-4">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#00d2ff]">{step.phase}</p>
                <h4 className="mt-1 text-lg font-bold text-white">{step.title}</h4>
                <p className="mt-2 text-sm leading-6 text-white/85">{step.text}</p>
              </div>
            ))}
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1} className="rounded-2xl border border-white/10 bg-[#000b1e]/55 p-6 sm:p-8">
          <h3 className="text-2xl font-bold text-white">{pageData.capabilitiesTitle}</h3>
          <div className="mt-4 grid gap-2">
            {pageData.capabilities.map((item) => (
              <div key={item._id || item.text} className="rounded-lg border border-white/10 bg-[#0a3146]/38 px-3 py-2 text-sm text-white/85">
                {item.text}
              </div>
            ))}
          </div>
        </ScrollReveal>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 pb-14 sm:px-6 lg:px-8 lg:pb-20">
        <ScrollReveal className="rounded-2xl border border-[#00d2ff]/28 bg-[linear-gradient(145deg,rgba(0,11,30,0.92),rgba(10,49,70,0.78))] p-6 sm:p-8 lg:p-10">
          <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#00d2ff]">{pageData.readyBadge}</p>
              <h3 className="mt-2 text-2xl font-bold leading-tight text-white sm:text-3xl">
                {pageData.readyTitle}
              </h3>
              <p className="mt-3 text-sm leading-7 text-white/80">
                {pageData.readyDescription}
              </p>
            </div>
            <Link
              to={pageData.ctaButtonLink || '/services'}
              className="inline-flex items-center justify-center rounded-sm bg-[#00d2ff] px-8 py-3 text-sm font-bold uppercase tracking-wide text-[#000b1e] transition hover:bg-[#38ddff]"
            >
              {pageData.ctaButtonText}
            </Link>
          </div>
        </ScrollReveal>
      </section>
    </div>
  )
}

