import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ScrollReveal } from '../../components/ScrollReveal/ScrollReveal.jsx'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

const DEFAULT_PAGE_DATA = {
  heroImage: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=2200&q=80',
  heroBadge: 'Skill To Career Pathway',
  heroTitle: 'IT Training + Internship Program',
  breadcrumbTitle: 'IT Training',
  introTitle: 'Learn Practical Skills, Build Real Projects, Start Your IT Career',
  introDescription:
    'Our training and internship program is designed for students and early professionals who want real industry exposure. You will learn modern tools, build practical projects, collaborate like a software team, and prepare for job placement with mentor support.',
  curriculumTitle: 'Detailed Curriculum & Lab Modules',
  curriculumBadge: 'Industry Aligned',
  processTitle: 'Internship Working Process',
  outcomesTitle: 'Program Outcomes',
  videoTitle: 'Training & Internship Video Demos',
  videoBadge: 'Live Sessions',
  supportTitle: 'Mentorship & Career Support',
  supportDescription:
    'The program is not only about technical classes. We focus on complete professional development through mentorship, communication practice, and guided career planning.',
  faqTitle: 'Frequently Asked Questions',
  ctaTitle: 'Start Your Learning Journey With SoftEdge',
  ctaDescription:
    'Join our IT training and internship ecosystem to gain practical confidence, build portfolio-ready projects, and prepare for professional opportunities in software and digital services.',
  ctaPrimaryText: 'Apply For Next Batch',
  ctaPrimaryLink: '/contact',
  ctaSecondaryText: 'Explore Other Services',
  ctaSecondaryLink: '/services',
  trainingTracks: [
    {
      _id: 'track-1',
      title: 'Full-Stack Development Training',
      description:
        'Hands-on curriculum covering frontend, backend, databases, API design, deployment, and production-ready coding practices.',
      highlights: ['React + Node.js project labs', 'Git/GitHub workflow mastery', 'Code review and debugging discipline'],
    },
    {
      _id: 'track-2',
      title: 'Career-Focused Internship Program',
      description:
        'Structured internship model where learners work on practical tasks, team collaboration, and sprint-based project delivery.',
      highlights: ['Mentor-guided real tasks', 'Weekly performance feedback', 'Portfolio and interview readiness'],
    },
    {
      _id: 'track-3',
      title: 'Industry Tools & Team Process',
      description:
        'Train with tools used by modern software teams: issue tracking, CI/CD mindset, testing flow, and release management.',
      highlights: ['Agile sprint simulation', 'Documentation and communication', 'Deployment and monitoring basics'],
    },
  ],
  internshipFlow: [
    { _id: 'flow-1', phase: 'Phase 1', title: 'Screening & Skill Mapping', text: 'Assess baseline skills and assign personalized learning path.' },
    { _id: 'flow-2', phase: 'Phase 2', title: 'Bootcamp + Foundation', text: 'Core concepts, coding standards, and guided mini-project implementation.' },
    { _id: 'flow-3', phase: 'Phase 3', title: 'Team Project Execution', text: 'Collaborative feature delivery with reviews, revisions, and demos.' },
    { _id: 'flow-4', phase: 'Phase 4', title: 'Portfolio & Placement Prep', text: 'CV polishing, mock interview, and career roadmap support.' },
  ],
  outcomes: [
    { _id: 'outcome-1', text: 'Job-ready project portfolio' },
    { _id: 'outcome-2', text: 'Strong programming fundamentals' },
    { _id: 'outcome-3', text: 'Practical team collaboration skills' },
    { _id: 'outcome-4', text: 'Confidence in live project environments' },
    { _id: 'outcome-5', text: 'Interview and communication readiness' },
    { _id: 'outcome-6', text: 'Clear entry path to IT career growth' },
  ],
  demoVideos: [
    { _id: 'video-1', title: 'Student Project Demo', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
    { _id: 'video-2', title: 'Internship Orientation Session', url: 'https://www.youtube.com/embed/ysz5S6PUM-U' },
  ],
  curriculumModules: [
    {
      _id: 'module-1',
      title: 'Core Programming Foundation',
      points: ['Programming logic and problem solving', 'Data structures and algorithm basics', 'Clean code practices'],
    },
    {
      _id: 'module-2',
      title: 'Frontend & UX Engineering',
      points: ['Responsive UI with React', 'Reusable components and state management', 'Performance and accessibility basics'],
    },
    {
      _id: 'module-3',
      title: 'Backend & API Development',
      points: ['Node.js and Express architecture', 'REST API design and validation', 'Authentication and role-based access'],
    },
    {
      _id: 'module-4',
      title: 'Database & Deployment',
      points: ['MongoDB schema modeling and query optimization', 'Cloud deployment pipeline basics', 'Monitoring and logging setup'],
    },
  ],
  learningSupports: [
    { _id: 'support-1', text: 'Daily coding practice tasks with review comments' },
    { _id: 'support-2', text: 'Weekly one-to-one mentor feedback sessions' },
    { _id: 'support-3', text: 'Soft skill sessions: communication, teamwork, presentation' },
    { _id: 'support-4', text: 'Interview preparation and mock technical rounds' },
    { _id: 'support-5', text: 'Certificate and recommendation for successful completion' },
    { _id: 'support-6', text: 'Career guidance for freelancing and job placement' },
  ],
  faqItems: [
    {
      _id: 'faq-1',
      question: 'Who can join this program?',
      answer: 'Students, fresh graduates, and career switchers who want practical IT skills and internship-style experience.',
    },
    {
      _id: 'faq-2',
      question: 'Do I need prior coding experience?',
      answer: 'Basic computer knowledge is enough to start. We provide a beginner-to-advanced learning path with mentor support.',
    },
    {
      _id: 'faq-3',
      question: 'Will I build real projects?',
      answer: 'Yes. Every participant works on practical projects that can be added to a professional portfolio.',
    },
    {
      _id: 'faq-4',
      question: 'Is there job support after completion?',
      answer: 'Yes. We provide CV guidance, interview preparation, and career direction based on your skills and performance.',
    },
  ],
}

export default function ITTrainingPage() {
  const [pageData, setPageData] = useState(DEFAULT_PAGE_DATA)

  useEffect(() => {
    let isMounted = true
    async function loadPageData() {
      try {
        const response = await fetch(`${API_BASE_URL}/api/it-training-page`)
        if (!response.ok) throw new Error('Request failed')
        const data = await response.json()
        if (!isMounted) return
        setPageData({ ...DEFAULT_PAGE_DATA, ...data })
      } catch (error) {
        if (isMounted) setPageData(DEFAULT_PAGE_DATA)
      }
    }
    loadPageData()
    return () => {
      isMounted = false
    }
  }, [])

  return (
    <div className="w-full text-white">
      <section className="relative isolate overflow-hidden">
        <div
          className="h-[245px] w-full bg-cover bg-center sm:h-[300px]"
          style={{
            backgroundImage: `url(${pageData.heroImage || DEFAULT_PAGE_DATA.heroImage})`,
          }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(0,210,255,0.24),transparent_40%),linear-gradient(120deg,rgba(0,11,30,0.92),rgba(0,11,30,0.62),rgba(0,11,30,0.35))]" />
        <div className="absolute inset-0 mx-auto flex w-full max-w-7xl items-center px-4 sm:px-6 lg:px-8">
          <ScrollReveal variant="slide-right">
            <p className="inline-flex rounded-sm bg-[#1f4358]/65 px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] text-[#00d2ff]">
              {pageData.heroBadge}
            </p>
            <h1 className="mt-3 text-3xl font-black leading-tight sm:text-4xl lg:text-5xl">
              {pageData.heroTitle}
            </h1>
            <p className="mt-3 inline-flex items-center gap-2 rounded-sm bg-[#20394a]/60 px-3 py-1 text-sm font-semibold text-white/90">
              <Link to="/" className="hover:text-[#00d2ff]">Home</Link>
              <span className="text-[#00d2ff]">●</span>
              <Link to="/it-training-internship-program" className="hover:text-[#00d2ff]">{pageData.breadcrumbTitle}</Link>
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <ScrollReveal className="rounded-2xl border border-white/10 bg-[linear-gradient(150deg,rgba(3,26,46,0.8),rgba(0,11,30,0.85))] p-6 sm:p-8 lg:p-10">
          <h2 className="text-3xl font-bold sm:text-4xl">{pageData.introTitle}</h2>
          <p className="mt-4 text-base leading-8 text-white/80">
            {pageData.introDescription}
          </p>
        </ScrollReveal>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 pb-10 sm:px-6 lg:px-8">
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {(pageData.trainingTracks || []).map((track, index) => (
            <ScrollReveal key={track._id || track.title} delay={index * 0.08} className="rounded-2xl border border-white/10 bg-[#031a2e]/65 p-5">
              <h3 className="text-xl font-bold">{track.title}</h3>
              <p className="mt-3 text-sm leading-7 text-white/80">{track.description}</p>
              <ul className="mt-4 space-y-2">
                {(track.highlights || []).map((item) => (
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

      <section className="mx-auto w-full max-w-7xl px-4 pb-10 sm:px-6 lg:px-8">
        <ScrollReveal className="rounded-2xl border border-white/10 bg-[linear-gradient(160deg,rgba(4,25,43,0.82),rgba(0,11,30,0.9))] p-6 sm:p-8 lg:p-10">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <h3 className="text-2xl font-bold sm:text-3xl">{pageData.curriculumTitle}</h3>
            <span className="rounded-full border border-[#00d2ff]/35 bg-[#00d2ff]/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-[#9aefff]">
              {pageData.curriculumBadge}
            </span>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {(pageData.curriculumModules || []).map((module) => (
              <div key={module._id || module.title} className="rounded-xl border border-white/10 bg-[#061f34]/55 p-4">
                <h4 className="text-lg font-bold">{module.title}</h4>
                <ul className="mt-3 space-y-2">
                  {(module.points || []).map((point) => (
                    <li key={point} className="flex items-start gap-2 text-sm text-white/85">
                      <span className="mt-1 text-[#00d2ff]">•</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 pb-10 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <ScrollReveal className="rounded-2xl border border-white/10 bg-[#000b1e]/58 p-6 sm:p-8">
            <h3 className="text-2xl font-bold">{pageData.processTitle}</h3>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {(pageData.internshipFlow || []).map((item) => (
                <div key={item._id || item.title} className="rounded-xl border border-white/10 bg-[#0a3146]/30 p-4">
                  <p className="text-xs font-bold tracking-[0.18em] text-[#00d2ff]">{item.phase}</p>
                  <h4 className="mt-1 text-base font-bold">{item.title}</h4>
                  <p className="mt-2 text-sm text-white/75">{item.text}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.08} className="rounded-2xl border border-white/10 bg-[#031a2e]/65 p-6 sm:p-8">
            <img
              src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80"
              alt="Students collaborating in training lab"
              className="h-48 w-full rounded-xl border border-white/10 object-cover"
            />
            <h3 className="mt-4 text-2xl font-bold">{pageData.outcomesTitle}</h3>
            <ul className="mt-3 space-y-2">
              {(pageData.outcomes || []).map((item) => (
                <li key={item._id || item.text} className="flex items-start gap-2 text-sm text-white/85">
                  <span className="mt-1 text-[#00d2ff]">•</span>
                  <span>{item.text}</span>
                </li>
              ))}
            </ul>
          </ScrollReveal>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 pb-14 sm:px-6 lg:px-8 lg:pb-20">
        <ScrollReveal className="rounded-2xl border border-[#00d2ff]/30 bg-[linear-gradient(145deg,rgba(0,11,30,0.95),rgba(10,49,70,0.78))] p-6 sm:p-8 lg:p-10">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <h3 className="text-2xl font-bold sm:text-3xl">{pageData.videoTitle}</h3>
            <span className="rounded-full border border-[#00d2ff]/35 bg-[#00d2ff]/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-[#9aefff]">
              {pageData.videoBadge}
            </span>
          </div>
          <div className="grid gap-4 lg:grid-cols-2">
            {(pageData.demoVideos || []).map((video) => (
              <div key={video._id || video.title} className="overflow-hidden rounded-xl border border-white/10 bg-[#021427]/60">
                <p className="border-b border-white/10 px-3 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#8be6ff]">
                  {video.title}
                </p>
                <iframe
                  className="h-64 w-full"
                  src={video.url}
                  title={video.title}
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              </div>
            ))}
          </div>
        </ScrollReveal>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 pb-10 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
          <ScrollReveal className="rounded-2xl border border-white/10 bg-[#031a2e]/70 p-6 sm:p-8">
            <h3 className="text-2xl font-bold">{pageData.supportTitle}</h3>
            <p className="mt-3 text-sm leading-7 text-white/80">
              {pageData.supportDescription}
            </p>
            <ul className="mt-4 space-y-2">
              {(pageData.learningSupports || []).map((item) => (
                <li key={item._id || item.text} className="flex items-start gap-2 text-sm text-white/85">
                  <span className="mt-1 text-[#00d2ff]">•</span>
                  <span>{item.text}</span>
                </li>
              ))}
            </ul>
          </ScrollReveal>

          <ScrollReveal delay={0.08} className="rounded-2xl border border-white/10 bg-[#000b1e]/65 p-6 sm:p-8">
            <h3 className="text-2xl font-bold">{pageData.faqTitle}</h3>
            <div className="mt-4 space-y-3">
              {(pageData.faqItems || []).map((item) => (
                <div key={item._id || item.question} className="rounded-xl border border-white/10 bg-[#0a3146]/30 p-4">
                  <h4 className="text-base font-semibold text-white">{item.question}</h4>
                  <p className="mt-2 text-sm leading-7 text-white/75">{item.answer}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 pb-16 sm:px-6 lg:px-8 lg:pb-24">
        <ScrollReveal className="rounded-2xl border border-[#00d2ff]/30 bg-[linear-gradient(145deg,rgba(0,11,30,0.96),rgba(8,40,58,0.82))] p-6 text-center sm:p-8 lg:p-10">
          <h3 className="text-2xl font-bold sm:text-3xl">{pageData.ctaTitle}</h3>
          <p className="mx-auto mt-3 max-w-3xl text-sm leading-7 text-white/80 sm:text-base">
            {pageData.ctaDescription}
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <Link
              to={pageData.ctaPrimaryLink || '/contact'}
              className="rounded-lg bg-[#00d2ff] px-5 py-2.5 text-sm font-bold text-[#001523] transition hover:bg-[#42ddff]"
            >
              {pageData.ctaPrimaryText}
            </Link>
            <Link
              to={pageData.ctaSecondaryLink || '/services'}
              className="rounded-lg border border-white/20 px-5 py-2.5 text-sm font-semibold text-white/90 transition hover:border-[#00d2ff]/50 hover:text-[#00d2ff]"
            >
              {pageData.ctaSecondaryText}
            </Link>
          </div>
        </ScrollReveal>
      </section>
    </div>
  )
}

