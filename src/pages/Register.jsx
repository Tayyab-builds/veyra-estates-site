import { useEffect, useState } from 'react'
import {
  FiCheckCircle,
  FiCompass,
  FiHeart,
  FiMail,
  FiMessageSquare,
  FiPhone,
} from 'react-icons/fi'
import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'
import Button from '../components/Button.jsx'
import FinalCTA from '../components/FinalCTA.jsx'
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
/* 1. Create Account Hero                                               */
/* ------------------------------------------------------------------ */

function CreateAccountHero() {
  return (
    <section
      aria-label="Create your Veyra account"
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
              Membership
            </RevealItem>
            <RevealItem
              as="h1"
              className="mt-5 max-w-[34rem] font-display text-[2.15rem] font-normal leading-[1.08] text-ivory sm:text-[2.7rem] lg:text-[3.35rem]"
            >
              Create an account, at your own pace.
            </RevealItem>
            <RevealItem
              as="p"
              className="mt-6 max-w-md text-[0.98rem] leading-relaxed text-ivory/70 sm:text-[1.05rem]"
            >
              A few details are all it takes — somewhere to keep the residences
              you return to, the searches you've refined, and the conversations
              you'd rather not start over.
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
                  src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1400&auto=format&fit=crop"
                  alt="A calm, light-filled living room with considered furnishings, representative of a Veyra-listed home"
                  className="h-full w-full object-cover transition-transform duration-[900ms] ease-editorial group-hover:scale-[1.03]"
                  loading="eager"
                />
              </div>
              <div className="absolute -bottom-5 -left-5 hidden bg-ivory px-6 py-4 shadow-[0_20px_40px_-20px_rgba(24,33,31,0.55)] sm:block">
                <p className="font-display text-[0.95rem] text-plum">Free to join</p>
                <p className="mt-1 text-[0.65rem] uppercase tracking-[0.14em] text-plum/70">
                  Considered, from the first visit
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
/* 2. Registration Form                                                 */
/* ------------------------------------------------------------------ */

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const phonePattern = /^[+()\-.\s\d]{7,}$/

const initialValues = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  password: '',
  confirmPassword: '',
}

function RegistrationForm({ onRegisterSuccess }) {
  const { user, register, logout } = useAuth()
  const { navigate } = useRouter()
  const [values, setValues] = useState(initialValues)
  const [subscribe, setSubscribe] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [errors, setErrors] = useState({})
  const [formError, setFormError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [justRegistered, setJustRegistered] = useState(false)

  const update = (field) => (e) => {
    setValues((prev) => ({ ...prev, [field]: e.target.value }))
    setErrors((prev) => ({ ...prev, [field]: undefined }))
    if (formError) setFormError('')
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const nextErrors = {}

    if (!values.firstName.trim()) nextErrors.firstName = 'Please enter your first name.'
    if (!values.lastName.trim()) nextErrors.lastName = 'Please enter your last name.'

    if (!values.email.trim()) {
      nextErrors.email = 'Please enter your email.'
    } else if (!emailPattern.test(values.email.trim())) {
      nextErrors.email = 'Please enter a valid email address.'
    }

    if (!values.phone.trim()) {
      nextErrors.phone = 'Please enter a phone number.'
    } else if (!phonePattern.test(values.phone.trim())) {
      nextErrors.phone = 'Please enter a valid phone number.'
    }

    if (!values.password) {
      nextErrors.password = 'Please create a password.'
    } else if (values.password.length < 8) {
      nextErrors.password = 'Password must be at least 8 characters.'
    }

    if (!values.confirmPassword) {
      nextErrors.confirmPassword = 'Please confirm your password.'
    } else if (values.password && values.confirmPassword !== values.password) {
      nextErrors.confirmPassword = 'Passwords do not match.'
    }

    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    setSubmitting(true)
    setFormError('')

    // Simulated latency so the demo has a believable loading state — no
    // request is actually made.
    window.setTimeout(() => {
      const result = register({
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        phone: values.phone,
        password: values.password,
        subscribe,
      })
      setSubmitting(false)
      if (!result.success) {
        setFormError(result.error)
        return
      }
      setJustRegistered(true)
      onRegisterSuccess?.(result.user)
    }, 650)
  }

  if (user && justRegistered) {
    return (
      <section id="register-form" aria-label="Account created" className="bg-plum py-20 lg:py-24">
        <div className="container-veyra">
          <Reveal
            amount={0.3}
            className="mx-auto flex max-w-lg flex-col items-center gap-5 border border-ivory/12 bg-ivory/[0.03] px-6 py-12 text-center sm:px-10"
          >
            <span className="flex h-12 w-12 items-center justify-center border border-accent/40 text-accent-light">
              <FiCheckCircle size={20} aria-hidden="true" />
            </span>
            <p className="font-display text-[1.6rem] leading-snug text-ivory">
              Welcome to Veyra, {user.name.split(' ')[0]}.
            </p>
            <p className="max-w-sm text-sm leading-relaxed text-ivory/70">
              Your account has been created and you're signed in as a
              customer for this frontend preview.
            </p>
            <div className="mt-3 flex flex-wrap items-center justify-center gap-4">
              <Button as={Link} to="/properties" variant="primary">
                Explore Properties
              </Button>
              <Button type="button" variant="light" onClick={logout}>
                Log Out
              </Button>
            </div>
          </Reveal>
        </div>
      </section>
    )
  }

  if (user && !justRegistered) {
    return (
      <section
        id="register-form"
        aria-label="Already signed in"
        className="bg-plum py-20 lg:py-24"
      >
        <div className="container-veyra">
          <Reveal
            amount={0.3}
            className="mx-auto flex max-w-lg flex-col items-center gap-5 border border-ivory/12 bg-ivory/[0.03] px-6 py-12 text-center sm:px-10"
          >
            <span className="flex h-12 w-12 items-center justify-center border border-accent/40 text-accent-light">
              <FiCheckCircle size={20} aria-hidden="true" />
            </span>
            <p className="font-display text-[1.6rem] leading-snug text-ivory">
              You're already signed in as {user.name}.
            </p>
            <p className="max-w-sm text-sm leading-relaxed text-ivory/70">
              Log out first if you'd like to create a different account.
            </p>
            <div className="mt-3 flex flex-wrap items-center justify-center gap-4">
              <Button as={Link} to="/properties" variant="primary">
                Explore Properties
              </Button>
              <Button type="button" variant="light" onClick={logout}>
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
      id="register-form"
      aria-label="Create your account"
      className="bg-plum py-20 lg:py-24"
    >
      <div className="container-veyra">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-12">
          <Reveal className="lg:col-span-5">
            <p className="eyebrow-dark">Create Account</p>
            <h2 className="mt-5 max-w-sm font-display text-[2rem] font-normal leading-[1.1] text-ivory sm:text-[2.5rem]">
              Tell us a little about you.
            </h2>
            <p className="mt-5 max-w-sm text-[0.98rem] leading-relaxed text-ivory/70">
              This is a frontend demo — no real account is required, and
              nothing you enter is sent anywhere. Registering simply signs
              you in for this preview.
            </p>

            <div className="mt-9 flex flex-col gap-3 border-t border-ivory/12 pt-6 text-sm">
              <p className="text-[0.65rem] font-medium uppercase tracking-[0.16em] text-ivory/60">
                Already Registered?
              </p>
              <p className="text-ivory/70">
                <Link to="/login" className={authLinkClasses}>
                  Log in to your existing account
                </Link>{' '}
                instead.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.08} amount={0.2} className="lg:col-span-7">
            <form
              onSubmit={handleSubmit}
              noValidate
              className={`flex flex-col gap-5 ${authPanelClasses}`}
            >
              <AuthFormHeader label="Your Details" />

              <div className="grid gap-4 sm:grid-cols-2 sm:gap-5">
                <AuthField
                  id="register-first-name"
                  label="First Name"
                  value={values.firstName}
                  onChange={update('firstName')}
                  autoComplete="given-name"
                  placeholder="Isabelle"
                  error={errors.firstName}
                />
                <AuthField
                  id="register-last-name"
                  label="Last Name"
                  value={values.lastName}
                  onChange={update('lastName')}
                  autoComplete="family-name"
                  placeholder="Carter"
                  error={errors.lastName}
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2 sm:gap-5">
                <AuthField
                  id="register-email"
                  label="Email"
                  icon={FiMail}
                  type="email"
                  value={values.email}
                  onChange={update('email')}
                  autoComplete="email"
                  placeholder="you@example.com"
                  error={errors.email}
                />
                <AuthField
                  id="register-phone"
                  label="Phone"
                  icon={FiPhone}
                  type="tel"
                  value={values.phone}
                  onChange={update('phone')}
                  autoComplete="tel"
                  placeholder="+1 (555) 123-4567"
                  error={errors.phone}
                />
              </div>

              <div className="grid gap-4 lg:grid-cols-2 lg:gap-5">
                <AuthPasswordField
                  id="register-password"
                  label="Password"
                  value={values.password}
                  onChange={update('password')}
                  autoComplete="new-password"
                  error={errors.password}
                  hint="Use at least 8 characters."
                  show={showPassword}
                  onToggleShow={() => setShowPassword((v) => !v)}
                />
                <AuthPasswordField
                  id="register-confirm-password"
                  label="Confirm Password"
                  value={values.confirmPassword}
                  onChange={update('confirmPassword')}
                  autoComplete="new-password"
                  error={errors.confirmPassword}
                  show={showConfirmPassword}
                  onToggleShow={() => setShowConfirmPassword((v) => !v)}
                />
              </div>

              <AuthCheckbox
                id="register-subscribe"
                checked={subscribe}
                onChange={(e) => setSubscribe(e.target.checked)}
                className="border-t border-ivory/12 pt-5"
              >
                Send me new listings and considered updates from Veyra.
              </AuthCheckbox>

              {formError && (
                <div
                  role="alert"
                  className="flex flex-col gap-2 border-l-2 border-clay-light pl-3 text-sm leading-relaxed text-clay-light"
                >
                  <p>{formError}</p>
                  <button
                    type="button"
                    onClick={() => navigate('/login')}
                    className="w-fit text-ivory/70 underline decoration-ivory/30 decoration-1 underline-offset-4 transition-colors duration-200 ease-editorial hover:text-accent-light hover:decoration-accent-light focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-light"
                  >
                    Go to Log In
                  </button>
                </div>
              )}

              <AuthSubmit
                loading={submitting}
                label="Create Account"
                loadingLabel="Creating Account…"
              />

              <p className="border-t border-ivory/12 pt-5 text-center text-[0.95rem] text-ivory/70">
                Already have an account?{' '}
                <Link to="/login" className={authLinkClasses}>
                  Log in
                </Link>
              </p>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* 3. Membership Benefits                                               */
/* ------------------------------------------------------------------ */

const membershipBenefits = [
  {
    number: '01',
    title: 'A Personal Collection',
    text: 'Save the residences that catch your eye into a private collection you can return to at any time.',
  },
  {
    number: '02',
    title: 'Smoother Discovery',
    text: 'Pick your search back up exactly where you left it, without retracing every filter and location.',
  },
  {
    number: '03',
    title: 'Your Enquiries, Kept',
    text: 'Follow the conversations you’ve started with our team from one considered place.',
  },
]

function MembershipBenefits() {
  return (
    <section aria-label="Membership benefits" className="bg-parchment py-20 lg:py-28">
      <div className="container-veyra">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-12">
          <Reveal className="lg:col-span-4">
            <p className="eyebrow-soft">Membership Benefits</p>
            <h2 className="mt-5 max-w-sm font-display text-[2rem] font-normal leading-[1.1] text-plum sm:text-[2.5rem]">
              What an account gives you.
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
              className="grid border-t border-stone sm:grid-cols-3"
            >
              {membershipBenefits.map(({ number, title, text }) => (
                <RevealItem
                  key={title}
                  as="li"
                  className="flex flex-col gap-4 border-b border-stone py-8 sm:border-b-0 sm:border-r sm:pr-8 sm:last:border-r-0 sm:last:pr-0"
                >
                  <span className="font-display text-[1.75rem] leading-none text-accent-dark">
                    {number}
                  </span>
                  <h3 className="font-display text-xl text-plum sm:text-[1.35rem]">{title}</h3>
                  <p className="max-w-xs text-sm leading-relaxed text-plum/70">{text}</p>
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
/* 4. Your Veyra Profile                                                */
/* ------------------------------------------------------------------ */

const profileDetails = [
  {
    icon: FiHeart,
    title: 'Saved preferences',
    text: 'The property types, locations and price ranges you search most.',
  },
  {
    icon: FiCompass,
    title: 'Property interests',
    text: 'A running record of the residences you’ve favourited along the way.',
  },
  {
    icon: FiMessageSquare,
    title: 'Easier communication',
    text: 'Enquiries tied to your account, so an advisor already has the context.',
  },
]

function YourVeyraProfile() {
  return (
    <section aria-label="Your Veyra profile" className="bg-ivory py-20 lg:py-28">
      <div className="container-veyra">
        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-6">
            <p className="eyebrow-soft">Your Profile</p>
            <h2 className="mt-5 font-display text-[2rem] font-normal leading-[1.1] text-plum sm:text-[2.5rem]">
              A quieter way to keep track of what matters.
            </h2>
            <p className="mt-5 max-w-md text-[1.05rem] leading-relaxed text-plum/70">
              Your Veyra profile holds the small details that make a search
              feel personal — the residences you're drawn to, the way
              you like to be reached, and the searches you'd rather not
              start over.
            </p>

            <RevealGroup as="dl" stagger={0.07} amount={0.3} className="mt-10 border-t border-stone">
              {profileDetails.map(({ icon: Icon, title, text }) => (
                <RevealItem
                  key={title}
                  as="div"
                  className="flex items-start gap-5 border-b border-stone py-6"
                >
                  <Icon size={16} aria-hidden="true" className="mt-0.5 shrink-0 text-accent-dark" />
                  <div>
                    <dt className="font-display text-lg text-plum">{title}</dt>
                    <dd className="mt-1 text-sm leading-relaxed text-plum/70">{text}</dd>
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>
          </Reveal>

          <Reveal
            variant="scale"
            scaleFrom={1.02}
            amount={0.2}
            className="relative lg:col-span-6"
          >
            <div className="group aspect-[4/5] w-full overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1615529182904-14819c35db37?q=80&w=1400&auto=format&fit=crop"
                alt="A calm study nook with considered details, representative of a personal Veyra profile"
                className="h-full w-full object-cover transition-transform duration-[900ms] ease-editorial group-hover:scale-[1.03]"
                loading="lazy"
              />
            </div>
            <div className="absolute -bottom-5 -left-5 hidden max-w-[15rem] bg-parchment px-6 py-5 shadow-[0_20px_40px_-20px_rgba(24,33,31,0.3)] sm:block">
              <p className="font-display text-sm text-plum">Isabelle Carter</p>
              <p className="mt-0.5 text-[0.65rem] uppercase tracking-[0.14em] text-plum/70">
                3 saved residences
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* 5. Private Property Access                                          */
/* ------------------------------------------------------------------ */

function PrivatePropertyAccess() {
  return (
    <section
      aria-label="Private property access"
      className="relative overflow-hidden bg-ink py-24 lg:py-32"
    >
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=1800&auto=format&fit=crop"
          alt="A softly lit residence exterior at dusk, representative of a privately introduced Veyra home"
          className="h-full w-full object-cover opacity-40"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/75 to-ink/35" />
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent"
      />

      <div className="container-veyra relative z-10">
        <Reveal amount={0.3} className="mx-auto max-w-2xl text-center">
          <p className="eyebrow-dark">Private Access</p>
          <h2 className="mt-5 font-display text-[2rem] font-normal leading-[1.1] text-ivory sm:text-[2.5rem] lg:text-[2.9rem]">
            Some introductions happen quietly.
          </h2>
          <p className="mt-6 text-[1.05rem] leading-relaxed text-ivory/70">
            An account simply means we know who to call first — a considered
            introduction, at your pace, with the personal attention a
            thoughtful search deserves.
          </p>
        </Reveal>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* 6. Register CTA                                                     */
/* ------------------------------------------------------------------ */

function RegisterCTA() {
  return (
    <FinalCTA
      heading="Ready when you are."
      description="Create your account in a couple of minutes, or sign in if you've already joined."
      primaryLabel="Create Account"
      primaryHref="#register-form"
      secondaryLabel="Log In Instead"
      secondaryTo="/login"
    />
  )
}

/* ------------------------------------------------------------------ */

function Register() {
  const { navigate } = useRouter()

  useEffect(() => {
    document.getElementById('root')?.scrollTo?.(0, 0)
  }, [])

  const handleRegisterSuccess = () => {
    // Public registration only ever creates customer accounts, so new
    // members land straight on their account dashboard.
    window.setTimeout(() => navigate('/account'), 900)
  }

  return (
    <div className="min-h-screen bg-parchment">
      <Navbar />
      <main>
        <CreateAccountHero />
        <RegistrationForm onRegisterSuccess={handleRegisterSuccess} />
        <MembershipBenefits />
        <YourVeyraProfile />
        <PrivatePropertyAccess />
        <RegisterCTA />
      </main>
      <Footer />
    </div>
  )
}

export default Register