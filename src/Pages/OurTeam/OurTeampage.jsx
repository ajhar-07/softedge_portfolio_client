import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ScrollReveal } from '../../components/ScrollReveal/ScrollReveal.jsx'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

const TEAM_MEMBERS_SEED = [
  {
    name: 'Hamish French',
    role: 'Computer Scientist',
    image:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=900&q=80',
    social: {
      facebook: 'https://facebook.com/hamish.french',
      linkedin: 'https://linkedin.com/in/hamish-french',
      github: 'https://github.com/hamishfrench',
    },
  },
  {
    name: 'Zara Matheson',
    role: 'CEO',
    image:
      'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=900&q=80',
    social: {
      facebook: 'https://facebook.com/zara.matheson',
      linkedin: 'https://linkedin.com/in/zara-matheson',
      github: 'https://github.com/zaramatheson',
    },
  },
  {
    name: 'Dylan Bonney',
    role: 'Process Analyst',
    image:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=900&q=80',
    social: {
      facebook: 'https://facebook.com/dylan.bonney',
      linkedin: 'https://linkedin.com/in/dylan-bonney',
      github: 'https://github.com/dylanbonney',
    },
  },
  {
    name: 'Skye Finney',
    role: 'Web Developer',
    image:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=900&q=80',
    social: {
      facebook: 'https://facebook.com/skye.finney',
      linkedin: 'https://linkedin.com/in/skye-finney',
      github: 'https://github.com/skyefinney',
    },
  },
  {
    name: 'Luca Barnes',
    role: 'UI Engineer',
    image:
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=900&q=80',
    social: {
      facebook: 'https://facebook.com/luca.barnes',
      linkedin: 'https://linkedin.com/in/luca-barnes',
      github: 'https://github.com/lucabarnes',
    },
  },
  {
    name: 'Elena Moore',
    role: 'Project Lead',
    image:
      'https://images.unsplash.com/photo-1498551172505-8ee7ad69f235?auto=format&fit=crop&w=900&q=80',
    social: {
      facebook: 'https://facebook.com/elena.moore',
      linkedin: 'https://linkedin.com/in/elena-moore',
      github: 'https://github.com/elenamoore',
    },
  },
  {
    name: 'Mia Chen',
    role: 'Quality Analyst',
    image:
      'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=900&q=80',
    social: {
      facebook: 'https://facebook.com/mia.chen',
      linkedin: 'https://linkedin.com/in/mia-chen',
      github: 'https://github.com/miachen',
    },
  },
  {
    name: 'Noah Carter',
    role: 'Business Consultant',
    image:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=900&q=80',
    social: {
      facebook: 'https://facebook.com/noah.carter',
      linkedin: 'https://linkedin.com/in/noah-carter',
      github: 'https://github.com/noahcarter',
    },
  },
]

const DEFAULT_PAGE_DATA = {
  heroImage:
    'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=2000&q=80',
  teamMembers: TEAM_MEMBERS_SEED.map((member, index) => ({
    ...member,
    _id: `default-${index}`,
  })),
}

function mergeTeamPageData(data) {
  const d = DEFAULT_PAGE_DATA
  const raw = Array.isArray(data.teamMembers) ? data.teamMembers : []
  const teamMembers = raw.length
    ? raw
        .map((member, index) => {
          const social = member.social && typeof member.social === 'object' ? member.social : {}
          return {
            _id: member._id || `member-${index}`,
            name: (member.name || '').trim(),
            role: (member.role || '').trim(),
            image: (member.image || '').trim(),
            social: {
              facebook: typeof social.facebook === 'string' ? social.facebook.trim() : '',
              linkedin: typeof social.linkedin === 'string' ? social.linkedin.trim() : '',
              github: typeof social.github === 'string' ? social.github.trim() : '',
            },
          }
        })
        .filter((member) => member.name && member.image)
    : d.teamMembers

  return {
    heroImage: (data.heroImage ?? '').trim() || d.heroImage,
    teamMembers,
  }
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden>
      <path d="M13.5 21v-7h2.3l.4-2.8h-2.7V9.4c0-.8.2-1.4 1.4-1.4h1.5V5.5c-.7-.1-1.4-.2-2.1-.2-2.1 0-3.5 1.3-3.5 3.7v2.1H8.5V14h2.3v7h2.7Z" />
    </svg>
  )
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden>
      <path d="M6.2 8.5a1.6 1.6 0 1 0 0-3.2 1.6 1.6 0 0 0 0 3.2ZM4.8 19h2.8V9.6H4.8V19Zm4.5 0h2.7v-4.7c0-1.2.2-2.4 1.7-2.4 1.4 0 1.4 1.3 1.4 2.5V19H18v-5.2c0-2.6-.6-4.6-3.6-4.6-1.4 0-2.3.8-2.7 1.5h-.1V9.6H9.3c0 .7 0 9.4 0 9.4Z" />
    </svg>
  )
}

function GithubIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden>
      <path d="M12 2a10 10 0 0 0-3.2 19.5c.5.1.7-.2.7-.5v-1.9c-2.9.6-3.5-1.2-3.5-1.2-.5-1.2-1.1-1.5-1.1-1.5-.9-.6.1-.6.1-.6 1 .1 1.6 1.1 1.6 1.1.9 1.5 2.4 1.1 3 .9.1-.7.4-1.1.7-1.3-2.3-.3-4.8-1.2-4.8-5.2 0-1.1.4-2.1 1.1-2.8-.1-.3-.5-1.3.1-2.7 0 0 .9-.3 2.9 1.1A10 10 0 0 1 12 7.5a10 10 0 0 1 2.7.4c2-1.4 2.9-1.1 2.9-1.1.6 1.4.2 2.4.1 2.7.7.8 1.1 1.7 1.1 2.8 0 4-2.5 4.8-4.9 5.1.4.3.8 1 .8 2.1V21c0 .3.2.6.7.5A10 10 0 0 0 12 2Z" />
    </svg>
  )
}

export default function OurTeampage() {
  const [pageData, setPageData] = useState(DEFAULT_PAGE_DATA)
  const [fetchState, setFetchState] = useState('loading')

  const teamMembers = pageData.teamMembers || []

  useEffect(() => {
    let ignore = false

    const load = async () => {
      setFetchState('loading')
      try {
        const response = await fetch(`${API_BASE_URL}/api/our-team-page`)
        if (!response.ok) throw new Error('Failed to fetch team page')
        const data = await response.json()
        if (!ignore) {
          setPageData(mergeTeamPageData(data))
          setFetchState('ok')
        }
      } catch {
        if (!ignore) {
          setPageData(DEFAULT_PAGE_DATA)
          setFetchState('error')
        }
      }
    }

    load()
    return () => {
      ignore = true
    }
  }, [])

  return (
    <div className="w-full text-white">
      <section className="relative isolate overflow-hidden">
        <div
          className="h-[220px] w-full bg-cover bg-center sm:h-[250px]"
          style={{
            backgroundImage: `url(${pageData.heroImage})`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#000b1e]/75 via-[#000b1e]/45 to-transparent" />
        <div className="absolute inset-0 mx-auto flex w-full max-w-7xl items-center px-4 sm:px-6 lg:px-8">
          <ScrollReveal variant="slide-right" duration={0.55}>
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">Our Team</h1>
            <p className="mt-3 inline-flex items-center gap-2 rounded-sm bg-[#20394a]/60 px-3 py-1 text-sm font-semibold text-white/90">
              <Link to="/" className="transition-colors hover:text-[#00d2ff]">
                Home
              </Link>
              <span className="text-[#00d2ff]">●</span>
              <Link to="/our-team" className="transition-colors hover:text-[#00d2ff]">
                Our Team
              </Link>
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8 lg:py-14">
        {fetchState === 'loading' ? (
          <p className="rounded-xl border border-white/10 bg-[#0a3146]/25 px-4 py-10 text-center text-sm text-white/70">
            Loading…
          </p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {teamMembers.map((member, index) => (
              <ScrollReveal
                key={member._id || `${member.name}-${index}`}
                variant="fade-up"
                delay={index * 0.06}
                className="group overflow-hidden rounded-sm border border-white/10 bg-[#0a3146]/28 p-3"
              >
                <div className="relative overflow-hidden">
                  <img src={member.image} alt={member.name} className="h-64 w-full object-cover" loading="lazy" />
                  <div className="absolute inset-0 flex items-end justify-center bg-gradient-to-t from-[#000b1e]/85 via-[#000b1e]/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <div className="mb-4 flex items-center gap-2">
                      {member.social.facebook ? (
                        <a
                          href={member.social.facebook}
                          target="_blank"
                          rel="noreferrer"
                          aria-label={`${member.name} Facebook`}
                          className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white hover:bg-[#1877f2]"
                        >
                          <FacebookIcon />
                        </a>
                      ) : null}
                      {member.social.linkedin ? (
                        <a
                          href={member.social.linkedin}
                          target="_blank"
                          rel="noreferrer"
                          aria-label={`${member.name} LinkedIn`}
                          className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white hover:bg-[#0a66c2]"
                        >
                          <LinkedInIcon />
                        </a>
                      ) : null}
                      {member.social.github ? (
                        <a
                          href={member.social.github}
                          target="_blank"
                          rel="noreferrer"
                          aria-label={`${member.name} Github`}
                          className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white hover:bg-[#24292f]"
                        >
                          <GithubIcon />
                        </a>
                      ) : null}
                    </div>
                  </div>
                </div>
                <div className="pt-3 text-center">
                  <h3 className="text-2xl font-bold text-white sm:text-3xl">{member.name}</h3>
                  <p className="mt-1 text-base text-white/70">{member.role}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
