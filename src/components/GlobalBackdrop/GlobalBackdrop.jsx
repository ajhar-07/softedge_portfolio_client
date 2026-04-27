/**
 * Site-wide fixed background: animated gradients + frosted glass (CSS only).
 */
export default function GlobalBackdrop() {
  return (
    <div
      className="site-bg pointer-events-none fixed inset-0 z-0 overflow-hidden"
      aria-hidden
    >
      <div className="site-bg__base" />
      <div className="site-bg__gradient-flow" />
      <div className="site-bg__blob site-bg__blob--1" />
      <div className="site-bg__blob site-bg__blob--2" />
      <div className="site-bg__blob site-bg__blob--3" />
      <div className="site-bg__aurora" />
      <div className="site-bg__glass" />
    </div>
  )
}
