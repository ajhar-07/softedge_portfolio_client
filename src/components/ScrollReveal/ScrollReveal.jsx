import { motion, useReducedMotion } from 'framer-motion'

const PRESETS = {
  'fade-up': {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  },
  'fade-down': {
    hidden: { opacity: 0, y: -32 },
    visible: { opacity: 1, y: 0 },
  },
  fade: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  'slide-left': {
    hidden: { opacity: 0, x: 56 },
    visible: { opacity: 1, x: 0 },
  },
  'slide-right': {
    hidden: { opacity: 0, x: -56 },
    visible: { opacity: 1, x: 0 },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.93 },
    visible: { opacity: 1, scale: 1 },
  },
  'zoom-out': {
    hidden: { opacity: 0, scale: 1.08 },
    visible: { opacity: 1, scale: 1 },
  },
  'blur-in': {
    hidden: { opacity: 0, filter: 'blur(12px)' },
    visible: { opacity: 1, filter: 'blur(0px)' },
  },
  flip: {
    hidden: { opacity: 0, rotateX: -12, y: 16 },
    visible: { opacity: 1, rotateX: 0, y: 0 },
  },
}

const TAGS = {
  div: motion.div,
  section: motion.section,
  article: motion.article,
  header: motion.header,
  footer: motion.footer,
  main: motion.main,
  aside: motion.aside,
  ul: motion.ul,
  li: motion.li,
}

const ease = [0.22, 1, 0.36, 1]

/**
 * Scroll-triggered reveal. Respects prefers-reduced-motion.
 */
export function ScrollReveal({
  children,
  variant = 'fade-up',
  delay = 0,
  duration = 0.55,
  className = '',
  as = 'div',
  once = true,
  amount = 0.18,
  margin = '0px 0px -10% 0px',
  ...rest
}) {
  const reduced = useReducedMotion()
  const presets = PRESETS[variant] || PRESETS['fade-up']
  const MotionTag = TAGS[as] || motion.div

  if (reduced) {
    const HtmlTag = as
    return (
      <HtmlTag className={className} {...rest}>
        {children}
      </HtmlTag>
    )
  }

  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount, margin }}
      variants={presets}
      transition={{ duration, delay, ease }}
      {...rest}
    >
      {children}
    </MotionTag>
  )
}

/** Page / route enter (use inside AnimatePresence) */
export const pageMotionProps = {
  initial: { opacity: 0, y: 22 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -16 },
  transition: { duration: 0.42, ease: [0.22, 1, 0.36, 1] },
}
