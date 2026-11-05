import { useEffect, useState, type ReactNode } from "react"
import { siteConfig } from "./siteConfig"

const phoneDigits = siteConfig.phone.replace(/\D/g, "")
const phoneHref = phoneDigits ? `tel:${phoneDigits}` : "#contacto"
const whatsappDigits = siteConfig.whatsapp.replace(/\D/g, "")
const whatsappBase = whatsappDigits
  ? `https://wa.me/${whatsappDigits}?text=`
  : "https://wa.me/?text="

const waLink = (message: string) =>
  `${whatsappBase}${encodeURIComponent(`Hola, Servicio Técnico Integral. ${message}`)}`

function Icon({
  children,
  size = "md",
}: {
  children: ReactNode
  size?: "sm" | "md" | "lg"
}) {
  return (
    <span className={`icon icon-${size}`} aria-hidden="true">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        {children}
      </svg>
    </span>
  )
}

const icons = {
  snow: (
    <>
      <path d="M12 2v20M4.2 6.5l15.6 11M4.2 17.5l15.6-11" />
      <path d="m9.5 3.5 2.5 2 2.5-2M9.5 20.5l2.5-2 2.5 2M3.8 9.3l3-.4.3-3M20.2 14.7l-3 .4-.3 3M3.8 14.7l3 .4.3 3M20.2 9.3l-3-.4-.3-3" />
    </>
  ),
  wrench: (
    <path d="M14.7 6.3a4 4 0 0 0-5-5l2.2 2.2-3 3-2.2-2.2a4 4 0 0 0 5 5l-7.4 7.4a2.1 2.1 0 1 0 3 3l7.4-7.4a4 4 0 0 0 5-5l-2.2 2.2-3-3 2.2-2.2Z" />
  ),
  check: <path d="m5 12 4 4L19 6" />,
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3 5 6v5c0 4.8 2.8 8 7 10 4.2-2 7-5.2 7-10V6l-7-3Z" />
      <path d="m9 12 2 2 4-4" />
    </>
  ),
  file: (
    <>
      <path d="M6 3h9l3 3v15H6zM14 3v4h4" />
      <path d="M9 12h6M9 16h4" />
    </>
  ),
  pin: (
    <>
      <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
      <circle cx="12" cy="10" r="2.5" />
    </>
  ),
  phone: (
    <path d="M6.7 3H4.3C3.6 3 3 3.6 3 4.3 3 13.5 10.5 21 19.7 21c.7 0 1.3-.6 1.3-1.3v-2.4l-4.2-1.4-1.2 2c-4.2-1.8-7.7-5.3-9.5-9.5l2-1.2L6.7 3Z" />
  ),
  message: (
    <>
      <path d="M21 11.5a8.5 8.5 0 0 1-12.8 7.3L3 20l1.3-5A8.5 8.5 0 1 1 21 11.5Z" />
      <path d="M8 12h.01M12 12h.01M16 12h.01" />
    </>
  ),
  camera: (
    <>
      <path d="M4 7h3l1.5-2h7L17 7h3v12H4z" />
      <circle cx="12" cy="13" r="3.5" />
    </>
  ),
  appliance: (
    <>
      <rect x="6" y="2.5" width="12" height="19" rx="2" />
      <path d="M6 9h12M9 6h.01M15 6h.01" />
      <circle cx="12" cy="15" r="3.5" />
    </>
  ),
}

function SectionTitle({
  eyebrow,
  title,
  copy,
}: {
  eyebrow: string
  title: string
  copy?: string
}) {
  return (
    <div className="section-title">
      <span className="eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
      {copy && <p>{copy}</p>}
    </div>
  )
}

// TODO: Confirmar esta lista con el cliente antes de publicar.
const applianceList = "Heladeras, freezer, lavarropas, secarropas y más."

const airServices = [
  "Instalación",
  "Reparación",
  "Mantenimiento y limpieza",
  "Carga de gas",
  "Urgencias",
]

const reasons = [
  { icon: icons.wrench, title: "Más de 15 años", copy: "de experiencia" },
  { icon: icons.clock, title: "Urgencias", copy: "atendidas el mismo día" },
  { icon: icons.shield, title: "60 días", copy: "de garantía en mano de obra" },
  { icon: icons.file, title: "Presupuesto", copy: "sin cargo y sin compromiso" },
]

const faqs = [
  ["¿Cobran la visita?", "El presupuesto es sin cargo y sin compromiso."],
  [
    "¿Qué pasa si el equipo vuelve a fallar?",
    "Todos los trabajos tienen 60 días de garantía en mano de obra.",
  ],
  ["¿Atienden urgencias?", "Sí, se atienden el mismo día."],
  ["¿Trabajan fuera de Chaco?", `Sí, cubrimos ${siteConfig.cities}.`],
  ["¿Cómo se paga?", `Aceptamos ${siteConfig.paymentMethods.toLowerCase()}.`],
]

const workPhotos = [
  "Screenshot_20261101-221804_Instagram~3.jpg",
  "portada.jpg",
  "despues1.jpg",
  "Antes1.jpg",
  "1793582487838.jpg",
  "1793582475265.jpg",
  "1793582425312.jpg",
  "1793582420835.jpg",
]

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [showLoader, setShowLoader] = useState(false)

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const loaderSeen = sessionStorage.getItem("sti-loader-seen")
    if (!loaderSeen) {
      setShowLoader(true)
      const timer = window.setTimeout(() => {
        sessionStorage.setItem("sti-loader-seen", "true")
        setShowLoader(false)
      }, reducedMotion ? 100 : 1300)

      return () => {
        window.clearTimeout(timer)
        window.removeEventListener("scroll", onScroll)
      }
    }

    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    const targets = document.querySelectorAll<HTMLElement>(
      "main > section, .service-card, .reason-card, .photo-placeholder",
    )
    const staggerGroups = [".service-card", ".reason-card", ".photo-placeholder"]
    staggerGroups.forEach((selector) => {
      document.querySelectorAll<HTMLElement>(selector).forEach((item, index) => {
        item.style.setProperty("--reveal-delay", `${index * 80}ms`)
      })
    })

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      targets.forEach((target) => target.classList.add("is-visible"))
      return
    }

    document.documentElement.classList.add("motion-ready")
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible")
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    )
    targets.forEach((target) => observer.observe(target))
    return () => {
      observer.disconnect()
      document.documentElement.classList.remove("motion-ready")
    }
  }, [])

  useEffect(() => {
    if (!menuOpen) return
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false)
    }
    document.addEventListener("keydown", closeOnEscape)
    return () => document.removeEventListener("keydown", closeOnEscape)
  }, [menuOpen])

  const closeMenu = () => setMenuOpen(false)

  return (
    <div className="site-shell">
      {showLoader && (
        <div className="loading-screen" aria-label="Cargando">
          <span className="logo-mark loading-logo"><Icon size="sm">{icons.snow}</Icon></span>
        </div>
      )}
      <header className={`topbar${isScrolled ? " is-scrolled" : ""}`}>
        <div className="container nav-wrap">
          <a className="brand" href="#inicio" aria-label="Servicio Técnico Integral, inicio">
            <span className="logo-mark">
              <Icon size="sm">{icons.snow}</Icon>
            </span>
            <span>
              <strong>Servicio Técnico</strong>
              <small>INTEGRAL</small>
            </span>
          </a>
          <nav className="desktop-nav" aria-label="Navegación principal">
            <a href="#servicios">Servicios</a>
            <a href="#nosotros">Por qué elegirnos</a>
            <a href="#trabajos">Trabajos</a>
            <a href="#preguntas">Preguntas</a>
          </nav>
          <a className="nav-cta" href="#contacto">
            Contactanos
          </a>
          <button
            className="menu-toggle"
            type="button"
            aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span /><span /><span />
          </button>
        </div>
      </header>
      <div className={`mobile-menu${menuOpen ? " is-open" : ""}`} aria-hidden={!menuOpen}>
        <button className="menu-backdrop" type="button" aria-label="Cerrar menú" onClick={closeMenu} tabIndex={menuOpen ? 0 : -1} />
        <nav id="mobile-navigation" className="mobile-menu-panel" aria-label="Navegación móvil" inert={!menuOpen}>
          <a href="#servicios" onClick={closeMenu}>Servicios</a>
          <a href="#nosotros" onClick={closeMenu}>Por qué elegirnos</a>
          <a href="#trabajos" onClick={closeMenu}>Trabajos</a>
          <a href="#preguntas" onClick={closeMenu}>Preguntas</a>
          <a className="nav-cta" href="#contacto" onClick={closeMenu}>Contactanos</a>
        </nav>
      </div>

      <main>
        <section className="hero" id="inicio">
          <div className="hero-glow" />
          <div className="container hero-grid">
            <div className="hero-copy">
              <div className="location-pill">
                <Icon size="sm">{icons.pin}</Icon>
                Chaco, Argentina
              </div>
              <h1>Especialistas en aire acondicionado en Chaco</h1>
              <p className="hero-lead">
                Más de 15 años de experiencia. Urgencias atendidas en el día y
                presupuesto sin cargo.
              </p>
              <div className="hero-actions">
                <a
                  className="button button-whatsapp"
                  href={waLink("Quiero pedir un presupuesto.")}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Icon size="sm">{icons.message}</Icon>
                  Pedí tu presupuesto por WhatsApp
                </a>
                <a className="button button-secondary" href={phoneHref}>
                  <Icon size="sm">{icons.phone}</Icon>
                  Llamar ahora
                </a>
              </div>
              <div className="trust-row" aria-label="Beneficios">
                <span>
                  <Icon size="sm">{icons.check}</Icon> 60 días de garantía en mano de obra
                </span>
                <span>
                  <Icon size="sm">{icons.check}</Icon> Atención en el día
                </span>
              </div>
            </div>
            <div className="hero-visual">
              <img
                src="/img/portada.jpg"
                alt="Ambiente de hogar confortable y climatizado"
              />
              <div className="hero-visual-overlay" />
              <div className="experience-card">
                <strong>+15</strong>
                <span>años cuidando<br />tus equipos</span>
              </div>
              <div className="service-badge">
                <span className="pulse" />
                Urgencias atendidas en el día
              </div>
            </div>
          </div>
        </section>

        <section className="section services-section" id="servicios">
          <div className="container">
            <SectionTitle
              eyebrow="Soluciones para tu hogar"
              title="Todo lo que necesitás, en un solo lugar"
              copy="Diagnóstico claro, trabajo prolijo y soluciones pensadas para durar."
            />
            <div className="service-layout">
              <article className="service-card service-primary">
                <div className="service-heading">
                  <Icon size="lg">{icons.snow}</Icon>
                  <div>
                    <span className="card-label">Nuestro fuerte</span>
                    <h3>Aire acondicionado</h3>
                  </div>
                </div>
                <div className="service-list">
                  {airServices.map((service) => (
                    <span key={service}>
                      <Icon size="sm">{icons.check}</Icon>
                      {service}
                    </span>
                  ))}
                </div>
                <a href={waLink("Necesito ayuda con mi aire acondicionado.")}>
                  Consultar por mi equipo <span aria-hidden="true">→</span>
                </a>
              </article>

              <article className="service-card appliance-card">
                <div className="service-heading">
                  <Icon size="lg">{icons.appliance}</Icon>
                  <div>
                    <span className="card-label">Servicio integral</span>
                    <h3>Y además reparamos tus electrodomésticos</h3>
                  </div>
                </div>
                <p>{applianceList}</p>
                <div className="appliance-tags">
                  {["Heladeras", "Freezer", "Lavarropas", "Secarropas"].map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
                <a href={waLink("Necesito reparar un electrodoméstico.")}>
                  Consultar reparación <span aria-hidden="true">→</span>
                </a>
              </article>
            </div>
            <div className="business-callout">
              <span className="business-icon">
                <Icon>{icons.wrench}</Icon>
              </span>
              <div>
                <strong>¿Tenés un comercio u oficina?</strong>
                <p>Planes de mantenimiento preventivo para que tus equipos no paren.</p>
              </div>
              <a href={waLink("Quiero conocer los planes para negocios y oficinas.")}>
                Conocer planes
              </a>
            </div>
          </div>
        </section>

        <section className="section reasons-section" id="nosotros">
          <div className="container">
            <SectionTitle
              eyebrow="Servicio que da tranquilidad"
              title="¿Por qué elegirnos?"
            />
            <div className="reasons-grid">
              {reasons.map((reason) => (
                <article className="reason-card" key={reason.title}>
                  <Icon size="lg">{reason.icon}</Icon>
                  <strong>{reason.title}</strong>
                  <p>{reason.copy}</p>
                </article>
              ))}
            </div>
            <div className="travel-note">
              <Icon size="sm">{icons.pin}</Icon>
              Cubrimos {siteConfig.cities}.
            </div>
          </div>
        </section>

        <section className="section work-section" id="trabajos">
          <div className="container">
            <SectionTitle
              eyebrow="Resultados reales"
              title="Así trabajamos"
              copy="Prolijidad, cuidado y soluciones que se ven en nuestros trabajos."
            />
            <div className="gallery-grid">
              {workPhotos.map((photo) => (
                <div className="photo-placeholder" key={photo}>
                  <img src={`/img/${photo}`} alt="Fotografía de un trabajo realizado" />
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="season-section">
          <div className="container season-inner">
            <div className="season-icon">
              <Icon size="lg">{icons.snow}</Icon>
            </div>
            <div>
              <span className="eyebrow">Preparate con tiempo</span>
              <h2>Llegá al verano con tu equipo a punto.</h2>
              <p>Pedí tu limpieza y revisión antes de los días de más calor.</p>
            </div>
            <a
              className="button button-whatsapp"
              href={waLink("Quiero reservar un mantenimiento.")}
            >
              Reservá tu mantenimiento
            </a>
          </div>
        </section>

        <section className="section faq-section" id="preguntas">
          <div className="container faq-layout">
            <SectionTitle
              eyebrow="Antes de coordinar"
              title="Preguntas frecuentes"
              copy="Todo lo que necesitás saber antes de pedir tu visita."
            />
            <div className="faq-list">
              {faqs.map(([question, answer], index) => (
                <details key={question} open={index === 0}>
                  <summary>
                    {question}
                    <span aria-hidden="true">+</span>
                  </summary>
                  <p>{answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="contact-section" id="contacto">
          <div className="container contact-layout">
            <div className="contact-copy">
              <span className="eyebrow">Estamos para ayudarte</span>
              <h2>Contanos qué necesita tu equipo</h2>
              <p>Elegí una opción y escribinos directo por WhatsApp.</p>
              <div className="tip">
                <Icon>{icons.camera}</Icon>
                <span>
                  <strong>Agilizá el diagnóstico</strong>
                  Mandanos una foto del equipo y te orientamos.
                </span>
              </div>
            </div>
            <div className="contact-panel">
              <a href={waLink("Quiero instalar un equipo.")}>
                <Icon>{icons.snow}</Icon>
                <span>Quiero instalar un equipo</span>
                <b>→</b>
              </a>
              <a href={waLink("Mi equipo no enfría.")}>
                <Icon>{icons.wrench}</Icon>
                <span>Mi equipo no enfría</span>
                <b>→</b>
              </a>
              <a href={waLink("Quiero mantenimiento.")}>
                <Icon>{icons.check}</Icon>
                <span>Quiero mantenimiento</span>
                <b>→</b>
              </a>
            </div>
          </div>
          <div className="container contact-details">
            <div><small>Teléfono</small><strong>{siteConfig.phone}</strong></div>
            <div><small>Instagram</small><strong><a href={siteConfig.instagramUrl} target="_blank" rel="noreferrer">{siteConfig.instagram}</a></strong></div>
            <div><small>Horarios</small><strong>{siteConfig.hours}</strong></div>
            <div><small>Zona</small><strong>{siteConfig.cities}</strong></div>
          </div>
        </section>
      </main>

      <footer>
        <div className="container footer-inner">
          <a className="brand brand-footer" href="#inicio">
            <span className="logo-mark">
              <Icon size="sm">{icons.snow}</Icon>
            </span>
            <span><strong>Servicio Técnico Integral</strong><small>Chaco, Argentina</small></span>
          </a>
          <p>© 2026 Servicio Técnico Integral. Todos los derechos reservados.</p>
          <a href="#inicio">Volver arriba ↑</a>
        </div>
      </footer>

      <a
        className="floating-whatsapp"
        href={waLink("Quiero hacer una consulta.")}
        target="_blank"
        rel="noreferrer"
        aria-label="Contactar por WhatsApp"
      >
        <Icon>{icons.message}</Icon>
        <span>WhatsApp</span>
      </a>
    </div>
  )
}
