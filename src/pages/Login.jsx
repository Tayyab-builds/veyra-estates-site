import { useEffect, useState } from 'react'
import { FiArrowRight, FiCheckCircle, FiLogOut, FiMail, FiPhone } from 'react-icons/fi'
import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'
import Button from '../components/Button.jsx'
import FinalCTA from '../components/FinalCTA.jsx'
import ForgotPasswordModal from '../components/ForgotPasswordModal.jsx'
import AuthField, {
  AuthCheckbox,
  AuthFormHeader,
  AuthPasswordField,
  AuthSubmit,
  authLinkClasses,
  authPanelClasses,
} from '../components/auth/AuthField.jsx'
import { Reveal, RevealGroup, RevealItem } from '../components/motion/Reveal.jsx'
import { Link, useRouter } from '../router.jsx'
import { useAuth } from '../hooks/useAuth.js'

/* ------------------------------------------------------------------ */
/* 1. Login Hero                                                       */
/* ------------------------------------------------------------------ */

function LoginHero() {
  return (
    <section
      aria-label="Welcome back to Veyra"
      className="relative overflow-hidden bg-ink pt-28 pb-16 sm:pt-32 sm:pb-20 lg:pt-36 lg:pb-24"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.05] [background-image:linear-gradient(to_right,#f5f1e8_1px,transparent_1px),linear-gradient(to_bottom,#f5f1e8_1px,transparent_1px)] [background-size:64px_64px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-accent/[0.09] blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent"
      />

      <div className="container-veyra relative z-10">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-end lg:gap-12">
          <RevealGroup as="div" stagger={0.08} amount={0.4} className="lg:col-span-7">
            <RevealItem as="p" duration={0.45} className="eyebrow-dark">
              Member Access
            </RevealItem>
            <RevealItem
              as="h1"
              className="mt-5 max-w-[34rem] font-display text-[2.15rem] font-normal leading-[1.08] text-ivory sm:text-[2.7rem] lg:text-[3.35rem]"
            >
              Welcome back to a more considered property experience.
            </RevealItem>
            <RevealItem
              as="p"
              className="mt-6 max-w-md text-[0.98rem] leading-relaxed text-ivory/70 sm:text-[1.05rem]"
            >
              Sign in to pick up where you left off — saved residences, recent
              enquiries and a quieter way to keep track of what matters to you.
            </RevealItem>
          </RevealGroup>

          <Reveal
            variant="scale"
            scaleFrom={1.02}
            delay={0.1}
            amount={0.2}
            className="relative lg:col-span-5"
          >
            <div className="group relative mx-auto max-w-sm sm:max-w-md lg:mx-0 lg:ml-auto">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -inset-3 hidden border border-accent/35 sm:block"
              />
              <div className="relative aspect-[3/4] w-full overflow-hidden sm:aspect-[4/5]">
                <img
                  src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1400&auto=format&fit=crop"
                  alt="A sunlit residence interior with exposed structure and floor-to-ceiling windows, representative of a Veyra-listed home"
                  className="h-full w-full object-cover transition-transform duration-[900ms] ease-editorial group-hover:scale-[1.03]"
                  loading="eager"
                />
              </div>
              <div className="absolute bottom-4 left-4 max-w-[13rem] bg-ivory/95 px-5 py-4 sm:bottom-5 sm:left-5">
                <p className="font-display text-[0.95rem] leading-snug text-plum">
                  By invitation &amp; referral
                </p>
                <p className="mt-1 text-[0.65rem] uppercase tracking-[0.14em] text-plum/70">
                  Discreet &amp; Unhurried
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* 2. Login Form                                                       */
/* ------------------------------------------------------------------ */

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function LoginForm({ onLoginSuccess }) {
  const { user, login, logout } = useAuth()
  const [values, setValues] = useState({ email: '', password: '' })
  const [remember, setRemember] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState({})
  const [formError, setFormError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [forgotOpen, setForgotOpen] = useState(false)

  const update = (field) => (e) => {
    setValues((prev) => ({ ...prev, [field]: e.target.value }))
    setErrors((prev) => ({ ...prev, [field]: undefined }))
    if (formError) setFormError('')
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const nextErrors = {}
    if (!values.email.trim()) {
      nextErrors.email = 'Please enter your email.'
    } else if (!emailPattern.test(values.email.trim())) {
      nextErrors.email = 'Please enter a valid email address.'
    }
    if (!values.password) {
      nextErrors.password = 'Please enter your password.'
    }
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    setSubmitting(true)
    setFormError('')

    // Simulated latency so the demo has a believable loading state — no
    // request is actually made.
    window.setTimeout(() => {
      const result = login({ email: values.email, password: values.password, remember })
      setSubmitting(false)
      if (!result.success) {
        setFormError(result.error)
        return
      }
      onLoginSuccess?.(result.user)
    }, 650)
  }

  if (user) {
    return (
      <section id="login-form" aria-label="Signed in" className="bg-plum py-20 lg:py-24">
        <div className="container-veyra">
          <Reveal
            amount={0.3}
            className="mx-auto flex max-w-lg flex-col items-center gap-5 border border-ivory/12 bg-ivory/[0.03] px-6 py-12 text-center sm:px-10"
          >
            <span className="flex h-12 w-12 items-center justify-center border border-accent/40 text-accent-light">
              <FiCheckCircle size={20} aria-hidden="true" />
            </span>
            <p className="font-display text-[1.6rem] leading-snug text-ivory">
              You're signed in as {user.name}.
            </p>
            <p className="max-w-sm text-sm leading-relaxed text-ivory/70">
              {user.role === 'admin'
                ? 'Signed in with a demo admin account for this frontend preview.'
                : 'Signed in with a demo customer account for this frontend preview.'}
            </p>
            <div className="mt-3 flex flex-wrap items-center justify-center gap-4">
              <Button as={Link} to="/properties" variant="primary">
                Explore Properties
              </Button>
              <Button type="button" variant="light" onClick={logout} className="gap-2">
                <FiLogOut size={15} aria-hidden="true" />
                Log Out
              </Button>
            </div>
          </Reveal>
        </div>
      </section>
    )
  }

  return (
    <section
      id="login-form"
      aria-label="Sign in to your account"
      className="bg-plum py-20 lg:py-24"
    >
      <div className="container-veyra">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-12">
          <Reveal className="lg:col-span-5">
            <p className="eyebrow-dark">Sign In</p>
            <h2 className="mt-5 max-w-sm font-display text-[2rem] font-normal leading-[1.1] text-ivory sm:text-[2.5rem]">
              Access your account.
            </h2>
            <p className="mt-5 max-w-sm text-[0.98rem] leading-relaxed text-ivory/70">
              This is a frontend demo — no real account is required. Use one of
              the demo accounts below to try it.
            </p>

            <div className="mt-9 flex flex-col gap-3 border-t border-ivory/12 pt-6 text-sm">
              <p className="text-[0.65rem] font-medium uppercase tracking-[0.16em] text-ivory/60">
                Demo Accounts
              </p>
              <p className="text-ivory/70">
                Customer — <span className="text-ivory/90">customer@veyraestates.com</span> /{' '}
                <span className="text-ivory/90">veyra2024</span>
              </p>
              <p className="text-ivory/70">
                Admin — <span className="text-ivory/90">admin@veyraestates.com</span> /{' '}
                <span className="text-ivory/90">veyra2024</span>
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.08} amount={0.2} className="lg:col-span-7">
            <form
              onSubmit={handleSubmit}
              noValidate
              className={`flex flex-col gap-5 ${authPanelClasses}`}
            >
              <AuthFormHeader label="Member Sign In" />

              <AuthField
                id="login-email"
                label="Email"
                icon={FiMail}
                type="email"
                value={values.email}
                onChange={update('email')}
                autoComplete="email"
                placeholder="you@example.com"
                error={errors.email}
              />

              <AuthPasswordField
                id="login-password"
                label="Password"
                value={values.password}
                onChange={update('password')}
                autoComplete="current-password"
                error={errors.password}
                show={showPassword}
                onToggleShow={() => setShowPassword((v) => !v)}
              />

              {formError && (
                <p
                  role="alert"
                  className="border-l-2 border-clay-light pl-3 text-sm leading-relaxed text-clay-light"
                >
                  {formError}
                </p>
              )}

              <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-4 pt-1">
                <AuthCheckbox
                  id="login-remember"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                >
                  Remember me
                </AuthCheckbox>
                <button
                  type="button"
                  onClick={() => setForgotOpen(true)}
                  className="text-sm text-ivory/70 underline decoration-ivory/30 decoration-1 underline-offset-4 transition-colors duration-200 ease-editorial hover:text-accent-light hover:decoration-accent-light focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-light"
                >
                  Forgot password?
                </button>
              </div>

              <AuthSubmit loading={submitting} label="Log In" loadingLabel="Signing In…" />
            </form>
          </Reveal>
        </div>
      </div>

      <ForgotPasswordModal open={forgotOpen} onClose={() => setForgotOpen(false)} />
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* 2b. Create Account Prompt                                           */
/* ------------------------------------------------------------------ */

// Rendered unconditionally, directly beneath the login form section, so it
// is always visible on /login regardless of auth state (signed in or out).
function CreateAccountPrompt() {
  return (
    <div className="bg-plum pb-16 lg:pb-20">
      <div className="container-veyra">
        <div className="border-t border-ivory/12 pt-8">
          <p className="text-center text-[0.95rem] text-ivory/70">
            Don&apos;t have an account?{' '}
            <Link to="/register" className={authLinkClasses}>
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* 3. Member Benefits                                                   */
/* ------------------------------------------------------------------ */

const memberBenefits = [
  {
    number: '01',
    title: 'Saved Residences',
    text: 'Keep a running shortlist of the properties that caught your eye, ready whenever you return.',
  },
  {
    number: '02',
    title: 'Easier Discovery',
    text: 'Pick up your search exactly where you left it, without retracing every filter.',
  },
  {
    number: '03',
    title: 'Your Enquiries',
    text: 'See the conversations you’ve started with our team, all in one considered place.',
  },
]

function MemberBenefits() {
  return (
    <section aria-label="Member benefits" className="bg-parchment py-20 lg:py-28">
      <div className="container-veyra">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-12">
          <Reveal className="lg:col-span-4">
            <p className="eyebrow-soft">Member Benefits</p>
            <h2 className="mt-5 max-w-sm font-display text-[2rem] font-normal leading-[1.1] text-plum sm:text-[2.5rem]">
              What signing in gives you.
            </h2>
            <p className="mt-5 max-w-sm text-[0.98rem] leading-relaxed text-plum/70">
              Nothing complicated — just a quieter, more personal way to
              keep track of the homes and conversations that matter to you.
            </p>
          </Reveal>

          <div className="lg:col-span-8">
            <RevealGroup
              as="ul"
              stagger={0.07}
              amount={0.2}
              className="flex flex-col border-t border-stone"
            >
              {memberBenefits.map(({ number, title, text }) => (
                <RevealItem
                  key={title}
                  as="li"
                  className="grid gap-2 border-b border-stone py-7 sm:grid-cols-[4rem_1fr] sm:gap-6"
                >
                  <span className="font-display text-2xl leading-none text-accent-dark sm:text-[1.75rem]">
                    {number}
                  </span>
                  <div>
                    <h3 className="font-display text-xl text-plum sm:text-[1.4rem]">{title}</h3>
                    <p className="mt-2 max-w-md text-sm leading-relaxed text-plum/70">{text}</p>
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* 4. Private Access                                                    */
/* ------------------------------------------------------------------ */

function PrivateAccess() {
  return (
    <section aria-label="Private access" className="bg-ivory py-20 lg:py-28">
      <div className="container-veyra">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal
            variant="scale"
            scaleFrom={1.02}
            amount={0.2}
            className="relative lg:col-span-5 lg:col-start-1"
          >
            <div className="group relative">
              <div className="aspect-[4/5] w-full overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1400&auto=format&fit=crop"
                  alt="A quiet townhouse facade, representative of Veyra's privately introduced residences"
                  className="h-full w-full object-cover transition-transform duration-[900ms] ease-editorial group-hover:scale-[1.03]"
                  loading="lazy"
                />
              </div>
              <div className="absolute bottom-4 left-4 max-w-[12rem] bg-parchment px-5 py-4 sm:-bottom-6 sm:-left-6">
                <p className="font-display text-[0.95rem] leading-snug text-plum">
                  Private introductions
                </p>
                <p className="mt-1 text-[0.65rem] uppercase tracking-[0.14em] text-plum/70">
                  Shown before listing
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.08} className="lg:col-span-6 lg:col-start-7">
            <p className="eyebrow-soft">Private Access</p>
            <h2 className="mt-5 font-display text-[2rem] font-normal leading-[1.1] text-plum sm:text-[2.5rem] lg:text-[2.9rem]">
              Some homes are never publicly listed.
            </h2>
            <div className="mt-8 max-w-md border-l-2 border-accent/70 pl-6">
              <p className="font-display text-[1.15rem] leading-relaxed text-plum/80">
                Signed-in members are simply better placed to hear about them
                first — a quieter introduction, at your own pace, with the
                personal attention a considered search deserves.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* 5. Support / Assistance                                              */
/* ------------------------------------------------------------------ */

function SupportAssistance() {
  return (
    <section aria-label="Help signing in" className="bg-parchment py-16 lg:py-20">
      <div className="container-veyra">
        <div className="flex flex-col gap-8 border-t border-stone pt-10 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
          <Reveal amount={0.4}>
            <p className="eyebrow-soft">Need a Hand?</p>
            <h2 className="mt-4 font-display text-[1.6rem] leading-[1.15] text-plum sm:text-[1.9rem]">
              Trouble accessing your account?
            </h2>
            <p className="mt-3 max-w-md text-[0.95rem] leading-relaxed text-plum/70">
              An advisor is glad to help directly — no queue, no automated
              responses.
            </p>
          </Reveal>

          <Reveal
            delay={0.08}
            amount={0.4}
            className="flex flex-wrap items-center gap-x-8 gap-y-4"
          >
            <a
              href="mailto:hello@veyraestates.com"
              className="inline-flex items-center gap-2.5 text-sm text-plum/75 transition-colors duration-200 ease-editorial hover:text-plum"
            >
              <FiMail size={15} aria-hidden="true" className="text-accent-dark" />
              hello@veyraestates.com
            </a>
            <a
              href="tel:+442079460192"
              className="inline-flex items-center gap-2.5 text-sm text-plum/75 transition-colors duration-200 ease-editorial hover:text-plum"
            >
              <FiPhone size={15} aria-hidden="true" className="text-accent-dark" />
              +44 20 7946 0192
            </a>
            <Link
              to="/agents"
              className="inline-flex items-center gap-2 text-sm text-plum underline decoration-stone decoration-1 underline-offset-4 transition-colors duration-200 ease-editorial hover:decoration-plum"
            >
              Contact an Agent
              <FiArrowRight size={14} aria-hidden="true" className="text-accent-dark" />
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* 6. Login CTA                                                         */
/* ------------------------------------------------------------------ */

function LoginCTA() {
  return (
    <FinalCTA
      heading="Prefer to browse first?"
      description="There's no need to sign in to explore what we currently represent."
      primaryLabel="Explore Properties"
      primaryTo="/properties"
      secondaryLabel="Create an Account"
      secondaryTo="/register"
    />
  )
}

/* ------------------------------------------------------------------ */

function Login() {
  const { navigate } = useRouter()

  useEffect(() => {
    document.getElementById('root')?.scrollTo?.(0, 0)
  }, [])

  const handleLoginSuccess = (user) => {
    window.setTimeout(() => navigate(user?.role === 'admin' ? '/admin/dashboard' : '/account'), 900)
  }

  return (
    <div className="min-h-screen bg-parchment">
      <Navbar />
      <main>
        <LoginHero />
        <LoginForm onLoginSuccess={handleLoginSuccess} />
        <CreateAccountPrompt />
        <MemberBenefits />
        <PrivateAccess />
        <SupportAssistance />
        <LoginCTA />
      </main>
      <Footer />
    </div>
  )
}

export default Login