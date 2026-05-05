import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ScrollReveal } from '../../components/ScrollReveal/ScrollReveal.jsx'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'
const PAGE_PATH = '/backup-disaster-cloud'

const fallbackContent = {
  hero: {
    image:
      'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=2200&q=80',
    eyebrow: 'Resilience · continuity · hardening',
    title: 'Backup, disaster recovery & cloud security',
    subtitle:
      'Design backups you can restore, DR drills your team trusts, and cloud foundations that resist misconfiguration — documented, tested, and aligned to your RTO/RPO and compliance obligations.',
  },
  whySectionEyebrow: 'Why this matters',
  pillarIntro:
    'Most outages are not exotic zero-days — they are failed patches, human error, region incidents, or ransomware. We combine engineering discipline with runbooks so recovery is repeatable under stress.',
  matrixSectionEyebrow: 'Tiers & patterns',
  matrixSectionTitle: 'RTO / RPO reference matrix',
  matrixSectionSubtitle:
    'Starting point for workshops — your actual numbers depend on revenue impact, regulatory language, and technical constraints.',
  hyperscalersSectionEyebrow: 'Hyperscalers',
  hyperscalersSectionTitle: 'What we implement by platform',
  engagementSectionEyebrow: 'How we engage',
  engagementSectionTitle: 'From discovery to steady-state',
  deliverablesSectionEyebrow: 'Deliverables',
  deliverablesSectionTitle: 'What you walk away with',
  faqSectionEyebrow: 'FAQ',
  faqSectionTitle: 'Common questions',
  ctaTitle: 'Strengthen continuity and cloud posture',
  ctaSubtitle:
    'Share your environments, compliance drivers, and past incidents — we will propose a phased roadmap with clear tests and documentation.',
  ctaPrimaryLabel: 'Talk to us',
  ctaPrimaryTo: '/how-we-work',
  ctaSecondaryLabel: 'Browse services',
  ctaSecondaryTo: '/services',
  navPills: [
    { label: 'Backup + DR + cloud', to: PAGE_PATH },
    { label: 'Security audit', to: '/security-audit' },
    { label: 'Information security', to: '/information-security' },
    { label: 'All services', to: '/services' },
  ],
  kpis: [
    { label: 'RPO / RTO clarity', value: 'Targets per workload' },
    { label: 'Restore proof', value: 'Quarterly test evidence' },
    { label: 'Cloud guardrails', value: 'IAM · network · data' },
  ],
  pillars: [
    {
      id: 'backup',
      badge: '01 — Backup',
      title: 'Backup strategy & immutable copies',
      lead:
        'Backups only matter when restores work on deadline. We define retention, encryption, access separation, and verification so your copies survive operator mistakes and malicious actors.',
      points: [
        {
          head: 'Scope & classification',
          text: 'Map databases, file shares, VMs, SaaS exports, and config-as-code repos. Tag sensitivity (PII, finance, PHI) to drive retention and encryption choices.',
        },
        {
          head: '3-2-1 and modern variants',
          text: 'Three copies, two media types, one off-site — extended with immutability (object lock), air-gapped or offline vaults where policy demands it.',
        },
        {
          head: 'Application-consistent captures',
          text: 'Quiesce databases and distributed systems correctly; avoid “silent corruption” restores. Document pre/post snapshot hooks for critical apps.',
        },
        {
          head: 'Encryption & keys',
          text: 'KMS integration, CMK vs provider keys, rotation, and break-glass procedures. Separate backup admin from production admin where feasible.',
        },
        {
          head: 'Monitoring & alerting',
          text: 'Failed jobs, capacity trends, SLA drift. Dashboards that surface “last successful restore test” per tier, not only last backup job.',
        },
      ],
    },
    {
      id: 'dr',
      badge: '02 — Disaster recovery',
      title: 'DR architectures & rehearsal culture',
      lead:
        'DR is a program — not a second data center collecting dust. We align failover patterns to cost and risk: pilot light, warm standby, active-active where justified.',
      points: [
        {
          head: 'Business impact analysis',
          text: 'Tier workloads: gold (minutes), silver (hours), bronze (days). Tie each tier to RTO/RPO, dependencies, and manual runbook steps.',
        },
        {
          head: 'Runbooks & communications',
          text: 'Decision trees for “region down” vs “app bug” vs “ransomware”. Escalation lists, customer comms templates, and internal status page hooks.',
        },
        {
          head: 'DNS, traffic & data lag',
          text: 'Health checks, weighted routing, global load balancing. Understand replication lag before you promise zero data loss.',
        },
        {
          head: 'Tabletop & technical drills',
          text: 'Semi-annual tabletops plus annual isolated restores and failover exercises. Capture time-to-recover metrics and gap lists.',
        },
        {
          head: 'Cyber recovery specifics',
          text: 'Golden images, clean-room analysis, identity reset playbooks. Assume AD / SSO may be compromised — parallel recovery paths.',
        },
      ],
    },
    {
      id: 'cloud',
      badge: '03 — Cloud security',
      title: 'AWS, GCP & Azure hardening patterns',
      lead:
        'Cloud providers give powerful primitives; misconfiguration is the dominant breach class. We implement baseline guardrails, least privilege, and continuous checks.',
      points: [
        {
          head: 'Landing zone & accounts',
          text: 'Org structure, centralized logging, guardrails for new accounts, service control policies, and tagging standards for cost + security.',
        },
        {
          head: 'Identity & access',
          text: 'SSO integration, MFA enforcement, permission boundaries, short-lived credentials, break-glass accounts with extra monitoring.',
        },
        {
          head: 'Network segmentation',
          text: 'Private subnets, hub-spoke or mesh patterns, egress controls, private endpoints for PaaS, and inspection where required.',
        },
        {
          head: 'Data protection',
          text: 'Encryption at rest defaults, bucket policies blocking public ACLs, DLP hooks, key rotation, and cross-region replication rules.',
        },
        {
          head: 'Detection & posture',
          text: 'CSPM or native config rules, anomaly alerts, CloudTrail / Activity logs to SIEM, vulnerability scanning for images and VMs.',
        },
      ],
    },
  ],
  rtoRpoRows: [
    {
      tier: 'Tier 0 — Mission critical',
      rpo: 'Near zero to 15 min',
      rto: '15–60 min',
      pattern: 'Active-active or hot standby + synchronous or near-sync replication',
    },
    {
      tier: 'Tier 1 — Revenue / ops',
      rpo: '1–4 hours',
      rto: '4–24 hours',
      pattern: 'Warm standby, frequent async replication, automated failover scripts',
    },
    {
      tier: 'Tier 2 — Standard',
      rpo: '24 hours',
      rto: '24–72 hours',
      pattern: 'Pilot light + restore from backup; documented manual steps',
    },
    {
      tier: 'Tier 3 — Archive / internal',
      rpo: 'Days',
      rto: 'Best effort',
      pattern: 'Backup-centric; DR event may defer restore until capacity returns',
    },
  ],
  providerNotes: [
    {
      name: 'Amazon Web Services',
      items: [
        'Organizations + Control Tower or custom LZ',
        'S3 versioning + Object Lock for ransomware resilience',
        'AWS Backup cross-account / cross-region',
        'DR with Route 53, Global Accelerator, Aurora global',
      ],
    },
    {
      name: 'Google Cloud',
      items: [
        'Folders, org policies, VPC SC for data perimeter',
        'Immutable retention buckets + dual-region options',
        'Backup for GKE / Cloud SQL schedules',
        'Global LB + health-checked MIGs for failover',
      ],
    },
    {
      name: 'Microsoft Azure',
      items: [
        'Management groups + Azure Policy initiatives',
        'RA-GRS / GZRS storage and immutable blobs',
        'Azure Site Recovery for VM orchestration',
        'Front Door / Traffic Manager patterns',
      ],
    },
  ],
  engagementPhases: [
    {
      step: 'Discover',
      detail:
        'Inventory workloads, data flows, current backups, DR assets, and cloud accounts. Interview owners for pain points and past incidents.',
    },
    {
      step: 'Design',
      detail:
        'Propose target architectures per tier: backup products, DR topology, cloud guardrails. Produce RACI and cost bands.',
    },
    {
      step: 'Implement',
      detail:
        'Build landing zones, policies, backup jobs, replication, monitoring, and documentation. Peer review all IaC changes.',
    },
    {
      step: 'Validate',
      detail: 'Restore tests, failover drills, tabletop. Capture metrics and update runbooks with real timings.',
    },
    {
      step: 'Operate',
      detail:
        'Handover with health dashboards, quarterly review cadence, and roadmap for maturity (e.g., chaos engineering lite).',
    },
  ],
  deliverableBullets: [
    { text: 'Architecture diagrams (as-is / to-be) and dependency maps' },
    { text: 'Backup & retention matrix per application tier' },
    { text: 'DR runbooks with decision trees and comms templates' },
    { text: 'Cloud baseline policy pack (IaC + console references)' },
    { text: 'Test reports with RTO/RPO evidence and remediation backlog' },
    { text: 'Executive one-pager for board or insurer questionnaires' },
  ],
  faqs: [
    {
      q: 'Do you replace our IT team or MSP?',
      a: 'We typically partner: we deliver designs, automation, and evidence; your team or MSP executes day-to-day operations with clearer standards.',
    },
    {
      q: 'Can you work only in one cloud?',
      a: 'Yes — many engagements start single-cloud. We still document portability risks if you later add multi-cloud or hybrid links.',
    },
    {
      q: 'How do you price this?',
      a: 'Scoped by number of workloads, regions, compliance add-ons, and drill depth. Fixed phases are common; retainers optional for ongoing posture reviews.',
    },
    {
      q: 'What about Microsoft 365 / Google Workspace backups?',
      a: 'SaaS retention is not infinite backup. We scope third-party or native export strategies for mail, drives, and Teams / Chat where required.',
    },
    {
      q: 'Ransomware: is backup enough?',
      a: 'Backups help only if they are immutable, monitored, and restored in a clean environment. DR and identity recovery are equally critical.',
    },
  ],
}

function mergeBackupDisasterCloudFromApi(data) {
  const fb = fallbackContent
  if (!data || typeof data !== 'object') return fb

  const str = (k, fallback) => (typeof data[k] === 'string' && data[k].trim() ? data[k].trim() : fallback)

  const navPills = Array.isArray(data.navPills) && data.navPills.length ? data.navPills : fb.navPills
  const kpis = Array.isArray(data.kpis) && data.kpis.length ? data.kpis : fb.kpis
  const pillarsRaw = Array.isArray(data.pillars) && data.pillars.length ? data.pillars : fb.pillars
  const pillars = pillarsRaw.map((col, i) => {
    const fbCol = fb.pillars[i] || fb.pillars[0]
    const points = Array.isArray(col.points) && col.points.length ? col.points : fbCol.points
    return {
      _id: col._id,
      id: typeof col.id === 'string' ? col.id : fbCol.id,
      badge: typeof col.badge === 'string' ? col.badge : fbCol.badge,
      title: typeof col.title === 'string' ? col.title : fbCol.title,
      lead: typeof col.lead === 'string' ? col.lead : fbCol.lead,
      points: points.map((pt, j) => ({
        head: typeof pt?.head === 'string' ? pt.head : fbCol.points[j]?.head || '',
        text: typeof pt?.text === 'string' ? pt.text : fbCol.points[j]?.text || '',
      })),
    }
  })

  const rtoRpoRows =
    Array.isArray(data.rtoRpoRows) && data.rtoRpoRows.length ? data.rtoRpoRows : fb.rtoRpoRows
  const providerNotes =
    Array.isArray(data.providerNotes) && data.providerNotes.length ? data.providerNotes : fb.providerNotes
  const engagementPhases =
    Array.isArray(data.engagementPhases) && data.engagementPhases.length
      ? data.engagementPhases
      : fb.engagementPhases

  const deliverableBullets =
    Array.isArray(data.deliverableBullets) && data.deliverableBullets.length
      ? data.deliverableBullets
      : fb.deliverableBullets

  const faqs = Array.isArray(data.faqs) && data.faqs.length ? data.faqs : fb.faqs

  return {
    hero: {
      image: str('heroImage', fb.hero.image),
      eyebrow: str('eyebrow', fb.hero.eyebrow),
      title: str('title', fb.hero.title),
      subtitle: str('subtitle', fb.hero.subtitle),
    },
    whySectionEyebrow: str('whySectionEyebrow', fb.whySectionEyebrow),
    pillarIntro: str('pillarIntro', fb.pillarIntro),
    matrixSectionEyebrow: str('matrixSectionEyebrow', fb.matrixSectionEyebrow),
    matrixSectionTitle: str('matrixSectionTitle', fb.matrixSectionTitle),
    matrixSectionSubtitle: str('matrixSectionSubtitle', fb.matrixSectionSubtitle),
    hyperscalersSectionEyebrow: str('hyperscalersSectionEyebrow', fb.hyperscalersSectionEyebrow),
    hyperscalersSectionTitle: str('hyperscalersSectionTitle', fb.hyperscalersSectionTitle),
    engagementSectionEyebrow: str('engagementSectionEyebrow', fb.engagementSectionEyebrow),
    engagementSectionTitle: str('engagementSectionTitle', fb.engagementSectionTitle),
    deliverablesSectionEyebrow: str('deliverablesSectionEyebrow', fb.deliverablesSectionEyebrow),
    deliverablesSectionTitle: str('deliverablesSectionTitle', fb.deliverablesSectionTitle),
    faqSectionEyebrow: str('faqSectionEyebrow', fb.faqSectionEyebrow),
    faqSectionTitle: str('faqSectionTitle', fb.faqSectionTitle),
    ctaTitle: str('ctaTitle', fb.ctaTitle),
    ctaSubtitle: str('ctaSubtitle', fb.ctaSubtitle),
    ctaPrimaryLabel: str('ctaPrimaryLabel', fb.ctaPrimaryLabel),
    ctaPrimaryTo: str('ctaPrimaryTo', fb.ctaPrimaryTo),
    ctaSecondaryLabel: str('ctaSecondaryLabel', fb.ctaSecondaryLabel),
    ctaSecondaryTo: str('ctaSecondaryTo', fb.ctaSecondaryTo),
    navPills,
    kpis,
    pillars,
    rtoRpoRows,
    providerNotes,
    engagementPhases,
    deliverableBullets,
    faqs,
  }
}

export default function BackupDisasterCloudPage() {
  const [live, setLive] = useState(() => mergeBackupDisasterCloudFromApi(null))
  const [pageLoading, setPageLoading] = useState(true)
  const [fetchError, setFetchError] = useState('')

  useEffect(() => {
    const load = async () => {
      setPageLoading(true)
      setFetchError('')
      try {
        const response = await fetch(`${API_BASE_URL}/api/backup-disaster-cloud-page`)
        const data = await response.json()
        if (response.ok && data) {
          setLive(mergeBackupDisasterCloudFromApi(data))
          setFetchError('')
        } else {
          setLive(mergeBackupDisasterCloudFromApi(null))
          setFetchError(typeof data?.error === 'string' ? data.error : 'Could not load live content')
        }
      } catch (_e) {
        setLive(mergeBackupDisasterCloudFromApi(null))
        setFetchError('Could not reach server — showing built-in defaults')
      } finally {
        setPageLoading(false)
      }
    }
    load()
  }, [])

  const {
    hero,
    whySectionEyebrow,
    pillarIntro,
    matrixSectionEyebrow,
    matrixSectionTitle,
    matrixSectionSubtitle,
    hyperscalersSectionEyebrow,
    hyperscalersSectionTitle,
    engagementSectionEyebrow,
    engagementSectionTitle,
    deliverablesSectionEyebrow,
    deliverablesSectionTitle,
    faqSectionEyebrow,
    faqSectionTitle,
    ctaTitle,
    ctaSubtitle,
    ctaPrimaryLabel,
    ctaPrimaryTo,
    ctaSecondaryLabel,
    ctaSecondaryTo,
    navPills,
    kpis,
    pillars,
    rtoRpoRows,
    providerNotes,
    engagementPhases,
    deliverableBullets,
    faqs,
  } = live

  return (
    <div className="w-full overflow-x-hidden text-white">
      {pageLoading || fetchError ? (
        <div
          className={`border-b px-4 py-2.5 text-center text-sm ${
            fetchError && !pageLoading
              ? 'border-amber-400/25 bg-amber-500/10 text-amber-100'
              : 'border-[#00d2ff]/20 bg-[#0a3146]/95 text-white/88'
          }`}
        >
          {pageLoading ? 'Loading latest content from server…' : fetchError}
        </div>
      ) : null}
      <section className="relative isolate min-h-[320px] overflow-hidden sm:min-h-[380px]">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${hero.image})` }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(0,210,255,0.18)_0%,transparent_42%),linear-gradient(115deg,rgba(15,31,46,0.82)_0%,rgba(8,34,53,0.72)_50%,rgba(15,31,46,0.55)_100%)]" />
        <div
          className="absolute -right-1/4 top-0 h-[140%] w-[70%] rotate-[12deg] bg-[linear-gradient(135deg,rgba(0,210,255,0.22)_0%,transparent_55%,rgba(67,183,232,0.12)_100%)]"
          aria-hidden
        />
        <div className="relative mx-auto flex max-w-7xl flex-col justify-end px-4 pb-12 pt-24 sm:px-6 sm:pb-16 lg:px-8 lg:pt-28">
          <ScrollReveal variant="fade-up">
            <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#00d2ff]/35 bg-[#0a3146]/40 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.22em] text-[#00d2ff] backdrop-blur-md">
              <span className="h-1.5 w-1.5 rounded-full bg-[#00d2ff] shadow-[0_0_10px_#00d2ff]" aria-hidden />
              {hero.eyebrow}
            </p>
            <h1 className="max-w-4xl text-3xl font-black leading-tight tracking-tight sm:text-5xl lg:text-[3.15rem]">
              {hero.title}
            </h1>
            <p className="mt-5 max-w-2xl border-l-4 border-[#43B7E8] pl-5 text-sm leading-7 text-white/82 sm:text-base">
              {hero.subtitle}
            </p>
          </ScrollReveal>
        </div>
      </section>

      <div className="relative">
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(0,210,255,0.35),transparent)]"
          aria-hidden
        />

        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          <ScrollReveal variant="fade-up" className="mb-10 flex flex-wrap gap-2">
            {navPills.map((p) => (
              <Link
                key={p._id || `${p.label}-${p.to}`}
                to={p.to}
                className={`rounded-full border px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wide transition sm:text-[13px] ${
                  p.to === PAGE_PATH
                    ? 'border-[#00d2ff] bg-[#00d2ff] text-[#0f1f2e]'
                    : 'border-white/12 bg-[#0a3146]/25 text-white/82 backdrop-blur-sm hover:border-[#00d2ff]/40 hover:text-[#00d2ff]'
                }`}
              >
                {p.label}
              </Link>
            ))}
          </ScrollReveal>

          <ScrollReveal variant="fade-up" delay={0.04} className="mb-4 max-w-3xl">
            <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#43B7E8]">{whySectionEyebrow}</p>
            <p className="mt-3 text-base leading-relaxed text-white/75 sm:text-lg">{pillarIntro}</p>
          </ScrollReveal>

          <div className="mb-16 grid gap-4 sm:grid-cols-3">
            {kpis.map((k, i) => (
              <ScrollReveal key={k._id || k.label} variant="fade-up" delay={i * 0.06}>
                <div className="relative overflow-hidden rounded-2xl border border-white/[0.1] bg-[#0a3146]/30 p-5 backdrop-blur-sm before:absolute before:inset-x-0 before:top-0 before:h-1 before:bg-[linear-gradient(90deg,#00d2ff,#43B7E8)]">
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#43B7E8]/90">{k.label}</p>
                  <p className="mt-2 text-lg font-bold text-white">{k.value}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <div className="mb-20 grid gap-6 lg:grid-cols-12">
            {pillars.map((col, i) => (
              <ScrollReveal
                key={col._id || col.id}
                variant="fade-up"
                delay={i * 0.08}
                className={`lg:col-span-4 ${i === 1 ? 'lg:mt-8' : i === 2 ? 'lg:mt-4' : ''}`}
              >
                <article className="flex h-full flex-col rounded-3xl border border-white/[0.1] bg-[linear-gradient(165deg,rgba(10,49,70,0.38)_0%,rgba(18,40,58,0.55)_100%)] p-6 shadow-[0_16px_40px_-20px_rgba(0,0,0,0.35)] backdrop-blur-sm sm:p-7">
                  <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#00d2ff]">{col.badge}</p>
                  <h2 className="mt-3 text-xl font-black tracking-tight sm:text-2xl">{col.title}</h2>
                  <p className="mt-3 text-sm leading-relaxed text-white/68">{col.lead}</p>
                  <ul className="mt-6 flex flex-1 flex-col gap-4 border-t border-white/[0.08] pt-6">
                    {col.points.map((pt, pi) => (
                      <li key={`${pt.head}-${pi}`}>
                        <p className="text-sm font-bold text-[#43B7E8]">{pt.head}</p>
                        <p className="mt-1 text-sm leading-relaxed text-white/65">{pt.text}</p>
                      </li>
                    ))}
                  </ul>
                </article>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal variant="fade-up" className="mb-6">
            <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#43B7E8]">{matrixSectionEyebrow}</p>
            <h2 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">{matrixSectionTitle}</h2>
            <p className="mt-2 max-w-2xl text-sm text-white/65">{matrixSectionSubtitle}</p>
          </ScrollReveal>

          <ScrollReveal variant="fade-up" delay={0.06} className="mb-20 overflow-x-auto rounded-2xl border border-white/[0.1] bg-[#0a3146]/25 backdrop-blur-sm">
            <table className="w-full min-w-[640px] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-white/[0.1] bg-[#0a3146]/35">
                  <th className="px-4 py-3 font-bold text-[#00d2ff] sm:px-5">Tier</th>
                  <th className="px-4 py-3 font-bold text-white/90 sm:px-5">Typical RPO</th>
                  <th className="px-4 py-3 font-bold text-white/90 sm:px-5">Typical RTO</th>
                  <th className="px-4 py-3 font-bold text-white/90 sm:px-5">Pattern</th>
                </tr>
              </thead>
              <tbody>
                {rtoRpoRows.map((row) => (
                  <tr key={row._id || row.tier} className="border-b border-white/[0.06] last:border-0">
                    <td className="px-4 py-4 font-semibold text-white/92 sm:px-5">{row.tier}</td>
                    <td className="px-4 py-4 text-white/70 sm:px-5">{row.rpo}</td>
                    <td className="px-4 py-4 text-white/70 sm:px-5">{row.rto}</td>
                    <td className="px-4 py-4 text-white/62 sm:px-5">{row.pattern}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </ScrollReveal>

          <ScrollReveal variant="fade-up" className="mb-8">
            <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#43B7E8]">{hyperscalersSectionEyebrow}</p>
            <h2 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">{hyperscalersSectionTitle}</h2>
          </ScrollReveal>

          <div className="mb-20 grid gap-5 lg:grid-cols-3">
            {providerNotes.map((p, i) => (
              <ScrollReveal key={p._id || p.name} variant="fade-up" delay={i * 0.07}>
                <div className="h-full rounded-2xl border border-[#00d2ff]/18 bg-[#0a3146]/28 p-6 backdrop-blur-sm">
                  <h3 className="text-lg font-bold text-white">{p.name}</h3>
                  <ul className="mt-4 space-y-3 text-sm leading-relaxed text-white/68">
                    {(p.items || []).map((line) => (
                      <li key={line} className="flex gap-2">
                        <span className="shrink-0 text-[#00d2ff]" aria-hidden>
                          ▸
                        </span>
                        <span>{line}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <div className="mb-20 grid gap-10 lg:grid-cols-2 lg:gap-14">
            <ScrollReveal variant="fade-up">
              <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#43B7E8]">{engagementSectionEyebrow}</p>
              <h2 className="mt-2 text-2xl font-black tracking-tight sm:text-3xl">{engagementSectionTitle}</h2>
              <ol className="mt-8 space-y-6">
                {engagementPhases.map((ph, idx) => (
                  <li key={ph._id || ph.step} className="flex gap-4">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#00d2ff]/15 text-sm font-black text-[#00d2ff]">
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    <div>
                      <p className="font-bold text-white">{ph.step}</p>
                      <p className="mt-1 text-sm leading-relaxed text-white/65">{ph.detail}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </ScrollReveal>

            <ScrollReveal variant="fade-up" delay={0.1}>
              <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#43B7E8]">{deliverablesSectionEyebrow}</p>
              <h2 className="mt-2 text-2xl font-black tracking-tight sm:text-3xl">{deliverablesSectionTitle}</h2>
              <ul className="mt-8 space-y-4">
                {deliverableBullets.map((item, di) => (
                  <li
                    key={item._id || item.text || di}
                    className="flex gap-3 rounded-xl border border-white/[0.1] bg-[#0a3146]/22 px-4 py-3 text-sm text-white/78 backdrop-blur-sm"
                  >
                    <span className="text-[#43B7E8]" aria-hidden>
                      ✓
                    </span>
                    {typeof item === 'string' ? item : item.text}
                  </li>
                ))}
              </ul>
            </ScrollReveal>
          </div>

          <section className="rounded-3xl border border-white/[0.1] bg-[#0a3146]/22 p-6 backdrop-blur-sm sm:p-10">
            <ScrollReveal variant="fade-up" className="mb-8 text-center">
              <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#43B7E8]">{faqSectionEyebrow}</p>
              <h2 className="mt-3 text-3xl font-black tracking-tight">{faqSectionTitle}</h2>
            </ScrollReveal>
            <div className="mx-auto max-w-3xl space-y-3">
              {faqs.map((f, i) => (
                <ScrollReveal key={f._id || f.q} variant="fade-up" delay={i * 0.04}>
                  <details className="group rounded-2xl border border-white/[0.1] bg-[#0a3146]/20 open:border-[#00d2ff]/35 open:bg-[#0a3146]/30">
                    <summary className="cursor-pointer list-none px-5 py-4 pr-10 text-left text-sm font-semibold text-white/92 marker:content-none [&::-webkit-details-marker]:hidden">
                      {f.q}
                      <span className="mt-2 block text-[11px] font-normal text-[#00d2ff]/80 group-open:hidden">Tap to expand</span>
                    </summary>
                    <div className="border-t border-white/[0.06] px-5 pb-4 pt-3 text-sm leading-relaxed text-white/70">{f.a}</div>
                  </details>
                </ScrollReveal>
              ))}
            </div>
          </section>
        </div>

        <section className="border-t border-white/[0.1] bg-[linear-gradient(90deg,rgba(0,210,255,0.14)_0%,rgba(67,183,232,0.1)_50%,rgba(0,210,255,0.14)_100%)]">
          <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 px-4 py-14 sm:flex-row sm:items-center sm:px-6 lg:px-8">
            <ScrollReveal variant="fade-up">
              <h2 className="text-2xl font-black tracking-tight text-[#0f1f2e] sm:text-3xl">{ctaTitle}</h2>
              <p className="mt-2 max-w-xl text-sm text-[#0f1f2e]/78">{ctaSubtitle}</p>
            </ScrollReveal>
            <ScrollReveal variant="fade-up" delay={0.08}>
              <div className="flex flex-wrap gap-3">
                <Link
                  to={ctaPrimaryTo}
                  className="inline-flex items-center gap-2 rounded-xl bg-[#0f1f2e] px-6 py-3.5 text-sm font-bold text-[#00d2ff] shadow-lg transition hover:bg-[#152f45]"
                >
                  {ctaPrimaryLabel}
                  <span aria-hidden>→</span>
                </Link>
                <Link
                  to={ctaSecondaryTo}
                  className="inline-flex items-center gap-2 rounded-xl border border-[#0f1f2e]/25 bg-[#0f1f2e]/08 px-6 py-3.5 text-sm font-bold text-[#0f1f2e] transition hover:border-[#0f1f2e]/40"
                >
                  {ctaSecondaryLabel}
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </section>
      </div>
    </div>
  )
}
