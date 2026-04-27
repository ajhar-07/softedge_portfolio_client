import { ScrollReveal } from '../ScrollReveal/ScrollReveal.jsx'

export default function Footer() {
  return (
    <footer className="relative mt-8 border-t border-white/10 bg-[#0a344a] text-white/85">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#00d2ff]/60 to-transparent" />

      <ScrollReveal
        as="div"
        className="mx-auto grid w-full max-w-7xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-12 lg:px-8 lg:py-12"
        variant="fade-up"
        duration={0.55}
        amount={0.2}
      >
        <section>
          <h3 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">About Company</h3>
          <p className="mt-4 max-w-sm text-sm leading-7 text-white/75 sm:mt-5 sm:text-base sm:leading-8">
            We have 14+ years experience. Helping you overcome technology challenges.
          </p>

          <div className="mt-6 flex items-center gap-2.5">
            {['f', 'x', 'yt', 'in'].map((item) => (
              <a
                key={item}
                href="#"
                aria-label={`${item} social link`}
                className="flex h-10 w-10 items-center justify-center rounded-sm border border-white/10 bg-[#26465b] text-xs font-semibold uppercase text-white transition-colors duration-200 hover:border-[#00d2ff]/55 hover:bg-[#00d2ff]/20"
              >
                {item}
              </a>
            ))}
          </div>
        </section>

        <section>
          <h3 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">Contacts</h3>
          <ul className="mt-4 space-y-2.5 text-sm leading-7 text-white/80 sm:mt-5 sm:space-y-3 sm:text-base sm:leading-8">
            <li>
              <span className="font-bold text-white">Adress:</span> 4211 Webster Street Rahway, NJ 07065.
            </li>
            <li>
              <span className="font-bold text-white">Email:</span> info@yourdomain.com
            </li>
            <li>
              <span className="font-bold text-white">Phone:</span> (+44) 123 456 789
            </li>
          </ul>
        </section>

        <section>
          <h3 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">Newsletter</h3>
          <p className="mt-4 max-w-sm text-sm leading-7 text-white/75 sm:mt-5 sm:text-base sm:leading-8">
            Subscribe to our newsletter to receive updates on the latest news!
          </p>

          <form className="mt-6">
            <label htmlFor="footer-newsletter" className="sr-only">
              Newsletter email
            </label>
            <div className="flex flex-col overflow-hidden rounded-sm border border-white/10 bg-[#3b5b71] sm:h-12 sm:flex-row sm:items-center">
              <input
                id="footer-newsletter"
                type="email"
                placeholder="Subscribe with us"
                className="h-11 w-full bg-transparent px-4 text-sm text-white placeholder:text-white/70 focus:outline-none sm:h-full"
              />
              <button
                type="submit"
                className="inline-flex h-11 items-center justify-center border-t border-white/10 px-4 text-[#dceaf3] transition-colors duration-200 hover:bg-[#00d2ff]/20 hover:text-[#00d2ff] sm:h-full sm:border-l sm:border-t-0"
                aria-label="Submit newsletter form"
              >
                ➤
              </button>
            </div>
          </form>
        </section>
      </ScrollReveal>

      <ScrollReveal as="aside" variant="fade-up" duration={0.5} amount={0.2}>
        <div className="border-t border-white/10 bg-[#0a3044]">
          <div className="mx-auto w-full max-w-7xl px-4 py-5 text-center sm:px-6 lg:px-8">
            <p className="text-sm text-white/80 sm:text-base">
              © Developed by{' '}
              <span className="font-semibold text-[#00d2ff]">SoftEdge Technology LTD.</span>
            </p>
          </div>
        </div>
      </ScrollReveal>
    </footer>
  )
}
