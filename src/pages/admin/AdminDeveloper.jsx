import { useEffect, useMemo, useState } from 'react'
import {
  FiSave,
  FiRotateCcw,
  FiExternalLink,
  FiCheckCircle,
  FiInfo,
  FiAlertCircle,
} from 'react-icons/fi'
import RequireAdmin from '../../components/dashboard/RequireAdmin.jsx'
import AdminShell from '../../components/admin/AdminShell.jsx'
import DashboardCard from '../../components/dashboard/DashboardCard.jsx'
import ConfirmDialog from '../../components/admin/ConfirmDialog.jsx'
import Button from '../../components/Button.jsx'
import { pageContentSchema, defaultSiteContent } from '../../data/siteContent.js'
import {
  getSiteContent,
  updateSiteContent,
  resetSiteContent,
  isSiteContentEdited,
} from '../../data/siteContentStore.js'
import { getProperties } from '../../data/propertyStore.js'

const fieldClass =
  'w-full border border-stone bg-parchment/40 px-3.5 py-2.5 text-sm text-plum placeholder:text-plum/35 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-olive'
const labelClass = 'text-[0.7rem] uppercase tracking-[0.1em] text-plum/50'

// The public route each schema page corresponds to, so the admin can jump
// straight from Developer Mode to the live (or "Preview Page") result.
const pageRoutes = {
  home: '/',
  buy: '/buy',
  rent: '/rent',
  agents: '/agents',
  about: '/about',
  contact: '/contact',
  locations: '/locations',
}

/* ------------------------------------------------------------------ */
/* 1. Developer Mode Header                                            */
/* ------------------------------------------------------------------ */

function DeveloperModeHeader() {
  return (
    <section className="border border-stone bg-ivory p-6 sm:p-8 lg:p-10">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-[0.68rem] uppercase tracking-[0.14em] text-plum/45">
            Website Content Manager
          </p>
          <h1 className="mt-2 max-w-xl font-display text-3xl leading-[1.1] text-plum sm:text-4xl">
            Developer Mode
          </h1>
          <p className="mt-3 max-w-lg leading-relaxed text-plum/60">
            Edit the wording on a handful of live marketing pages without touching source
            files. This is a practical content tool, not a full backend CMS — changes are
            stored in this browser and read by the public pages the next time they render.
          </p>
        </div>
        <span className="inline-flex shrink-0 items-center gap-2 rounded-full border border-sage/40 bg-sage/15 px-3.5 py-1.5 text-[0.7rem] tracking-wide text-plum/70">
          <span className="h-1.5 w-1.5 rounded-full bg-sage" aria-hidden="true" />
          Local / Frontend Mode
        </span>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* 2. Page / Content Selector                                          */
/* ------------------------------------------------------------------ */

function PageSelector({ selectedKey, onSelect, editedPages }) {
  return (
    <DashboardCard eyebrow="Step 1" title="Page / Content Selector">
      <p className="mb-5 max-w-xl text-sm leading-relaxed text-plum/55">
        Choose which page's editable content to work on. Only pages with marketing copy the
        rest of the site already reads as content are listed here.
      </p>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {pageContentSchema.map((page) => {
          const active = page.key === selectedKey
          const edited = editedPages.has(page.key)
          return (
            <button
              key={page.key}
              type="button"
              onClick={() => onSelect(page.key)}
              aria-pressed={active}
              className={`flex flex-col items-start gap-1.5 border px-4 py-3.5 text-left transition-colors duration-300 ${
                active
                  ? 'border-plum bg-plum text-ivory'
                  : 'border-stone bg-parchment/40 text-plum hover:border-plum/40 hover:bg-parchment'
              }`}
            >
              <span className="flex w-full items-center justify-between gap-2">
                <span className="font-display text-base">{page.label}</span>
                {edited && (
                  <span
                    className={`h-1.5 w-1.5 shrink-0 rounded-full ${active ? 'bg-terracotta-light' : 'bg-terracotta'}`}
                    aria-label="Has saved edits"
                    title="Has saved edits"
                  />
                )}
              </span>
              <span className={`text-[0.72rem] leading-snug ${active ? 'text-ivory/65' : 'text-plum/50'}`}>
                {page.description}
              </span>
            </button>
          )
        })}
      </div>
    </DashboardCard>
  )
}

/* ------------------------------------------------------------------ */
/* 3. Content Editor                                                   */
/* ------------------------------------------------------------------ */

function ContentEditor({ page, values, onChange }) {
  // Free-text fields only — the `image` type field (if any) is handled by
  // Section 5, Media / Content Settings, not here. This editor can only
  // ever touch plain text: no JSX, markup, or code is ever accepted.
  const textFields = page.fields.filter((field) => field.type === 'text' || field.type === 'textarea')

  return (
    <DashboardCard eyebrow="Step 2" title="Content Editor">
      <p className="mb-5 max-w-xl text-sm leading-relaxed text-plum/55">
        Editing text for <span className="text-plum">{page.label}</span>. These are the exact
        words the public page renders — no code, no layout, just copy.
      </p>
      <div className="grid gap-5 sm:grid-cols-2">
        {textFields.map((field) => (
          <div
            key={field.key}
            className={`flex flex-col gap-1.5 ${field.type === 'textarea' ? 'sm:col-span-2' : ''}`}
          >
            <label htmlFor={`dev-${page.key}-${field.key}`} className={labelClass}>
              {field.label}
            </label>
            {field.type === 'textarea' ? (
              <textarea
                id={`dev-${page.key}-${field.key}`}
                rows={4}
                value={values[field.key] ?? ''}
                onChange={(e) => onChange(field.key, e.target.value)}
                className={`${fieldClass} resize-none`}
              />
            ) : (
              <input
                id={`dev-${page.key}-${field.key}`}
                type="text"
                value={values[field.key] ?? ''}
                onChange={(e) => onChange(field.key, e.target.value)}
                className={fieldClass}
              />
            )}
          </div>
        ))}
      </div>
    </DashboardCard>
  )
}

/* ------------------------------------------------------------------ */
/* 4. Live Preview                                                     */
/* ------------------------------------------------------------------ */

function PreviewShell({ dark = true, children }) {
  return (
    <div
      className={`relative overflow-hidden border border-stone px-6 py-10 sm:px-10 sm:py-14 ${
        dark ? 'bg-ink' : 'bg-parchment/50'
      }`}
    >
      {children}
    </div>
  )
}

function PreviewEyebrow({ children, dark }) {
  if (!children) return null
  return (
    <p className={`text-[0.65rem] tracking-[0.28em] uppercase ${dark ? 'text-ivory/55' : 'text-plum/50'}`}>
      {children}
    </p>
  )
}

function PreviewHeading({ children, dark }) {
  return (
    <h3
      className={`mt-3 max-w-xl font-display text-2xl font-normal leading-[1.15] sm:text-3xl ${
        dark ? 'text-ivory' : 'text-plum'
      }`}
    >
      {children || <span className="opacity-40">(empty heading)</span>}
    </h3>
  )
}

function PreviewBody({ children, dark }) {
  return (
    <p className={`mt-4 max-w-md text-sm leading-relaxed sm:text-base ${dark ? 'text-ivory/65' : 'text-plum/60'}`}>
      {children || <span className="opacity-40">(empty text)</span>}
    </p>
  )
}

function PreviewCtas({ primaryLabel, secondaryLabel, dark }) {
  if (!primaryLabel && !secondaryLabel) return null
  return (
    <div className="mt-7 flex flex-wrap gap-3">
      {primaryLabel && (
        <span
          className={`inline-flex items-center px-5 py-2.5 text-[0.8rem] font-medium tracking-wide ${
            dark ? 'bg-ivory text-plum' : 'bg-plum text-ivory'
          }`}
        >
          {primaryLabel}
        </span>
      )}
      {secondaryLabel && (
        <span
          className={`inline-flex items-center border px-5 py-2.5 text-[0.8rem] font-medium tracking-wide ${
            dark ? 'border-ivory/50 text-ivory' : 'border-plum/40 text-plum'
          }`}
        >
          {secondaryLabel}
        </span>
      )}
    </div>
  )
}

function LivePreview({ pageKey, values }) {
  let body

  if (pageKey === 'home') {
    body = (
      <PreviewShell dark>
        <PreviewHeading dark>{values.ctaHeading}</PreviewHeading>
        <PreviewBody dark>{values.ctaDescription}</PreviewBody>
        <PreviewCtas dark primaryLabel={values.ctaPrimaryLabel} secondaryLabel={values.ctaSecondaryLabel} />
      </PreviewShell>
    )
  } else if (pageKey === 'buy' || pageKey === 'rent') {
    body = (
      <PreviewShell dark>
        <PreviewEyebrow dark>{values.heroEyebrow}</PreviewEyebrow>
        <PreviewHeading dark>{values.heroHeading}</PreviewHeading>
        <PreviewBody dark>{values.heroDescription}</PreviewBody>
      </PreviewShell>
    )
  } else if (pageKey === 'agents' || pageKey === 'locations') {
    body = (
      <PreviewShell dark={false}>
        <PreviewHeading dark={false}>{values.heading}</PreviewHeading>
        <PreviewBody dark={false}>{values.description}</PreviewBody>
      </PreviewShell>
    )
  } else if (pageKey === 'about') {
    body = (
      <div className="flex flex-col gap-4">
        <PreviewShell dark>
          <PreviewEyebrow dark>About Veyra</PreviewEyebrow>
          <PreviewHeading dark>{values.heroHeading}</PreviewHeading>
          <PreviewBody dark>{values.heroDescription}</PreviewBody>
        </PreviewShell>
        <div className="grid gap-4 sm:grid-cols-2">
          <PreviewShell dark={false}>
            <PreviewEyebrow dark={false}>Our Story</PreviewEyebrow>
            <PreviewHeading dark={false}>{values.introHeading}</PreviewHeading>
            <PreviewBody dark={false}>{values.introText}</PreviewBody>
          </PreviewShell>
          <PreviewShell dark>
            <PreviewEyebrow dark>Our Philosophy</PreviewEyebrow>
            <PreviewHeading dark>{values.philosophyHeading}</PreviewHeading>
            <PreviewBody dark>{values.philosophyText}</PreviewBody>
          </PreviewShell>
        </div>
      </div>
    )
  } else if (pageKey === 'contact') {
    body = (
      <div className="flex flex-col gap-4">
        <PreviewShell dark>
          <PreviewEyebrow dark>Get In Touch</PreviewEyebrow>
          <PreviewHeading dark>{values.heroHeading}</PreviewHeading>
          <PreviewBody dark>{values.heroDescription}</PreviewBody>
        </PreviewShell>
        <PreviewShell dark={false}>
          <p className={`text-[0.65rem] tracking-[0.28em] uppercase text-plum/50`}>Closing CTA</p>
          <PreviewHeading dark={false}>{values.ctaHeading}</PreviewHeading>
        </PreviewShell>
      </div>
    )
  }

  return (
    <DashboardCard eyebrow="Step 3" title="Live Preview">
      <p className="mb-5 max-w-xl text-sm leading-relaxed text-plum/55">
        Reflects your unsaved changes above, styled the way the live page renders it. This is a
        representative preview of the editable section, not the full page.
      </p>
      {body}
    </DashboardCard>
  )
}

/* ------------------------------------------------------------------ */
/* 5. Media / Content Settings                                         */
/* ------------------------------------------------------------------ */

function HeroImageSetting({ pageKey, purpose, value, onChange }) {
  const options = useMemo(
    () => getProperties().filter((property) => property.purpose === purpose && property.image),
    [purpose],
  )

  return (
    <div className="flex flex-col gap-3">
      <p className={labelClass}>Hero Image</p>
      <p className="max-w-md text-sm leading-relaxed text-plum/55">
        Choose which existing {purpose === 'Buy' ? 'for-sale' : 'rental'} listing photo appears
        behind the {pageKey === 'buy' ? 'Buy' : 'Rent'} page hero. Only images already used
        elsewhere on the site are offered — Developer Mode doesn't upload new files.
      </p>
      <div className="grid grid-cols-3 gap-3 sm:grid-cols-5">
        {options.map((property) => {
          const active = value === property.image
          return (
            <button
              key={property.id}
              type="button"
              onClick={() => onChange(active ? '' : property.image)}
              aria-pressed={active}
              className={`group relative aspect-[4/3] overflow-hidden border-2 transition-colors duration-300 ${
                active ? 'border-terracotta' : 'border-transparent hover:border-stone'
              }`}
              title={property.name}
            >
              <img src={property.image} alt={property.name} className="h-full w-full object-cover" loading="lazy" />
              {active && (
                <span className="absolute right-1 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-terracotta text-ivory">
                  <FiCheckCircle size={12} />
                </span>
              )}
            </button>
          )
        })}
      </div>
      {value && (
        <button
          type="button"
          onClick={() => onChange('')}
          className="self-start text-[0.75rem] tracking-wide text-plum/50 underline decoration-plum/30 underline-offset-2 transition-colors duration-300 hover:text-plum"
        >
          Use default image instead
        </button>
      )}
    </div>
  )
}

function MediaSettings({ pageKey, page, values, onChange }) {
  const imageField = page.fields.find((field) => field.type === 'image')

  return (
    <DashboardCard eyebrow="Step 4" title="Media / Content Settings">
      <p className="mb-5 max-w-xl text-sm leading-relaxed text-plum/55">
        Supporting options for {page.label} — limited to what the current site can safely
        support without a real backend.
      </p>

      {imageField ? (
        <HeroImageSetting
          pageKey={pageKey}
          purpose={pageKey === 'buy' ? 'Buy' : 'Rent'}
          value={values[imageField.key] ?? ''}
          onChange={(next) => onChange(imageField.key, next)}
        />
      ) : (
        <div className="flex items-start gap-3 border border-dashed border-stone bg-parchment/60 p-5">
          <FiInfo size={16} className="mt-0.5 shrink-0 text-plum/40" />
          <p className="text-sm leading-relaxed text-plum/60">
            {page.label} doesn't have a swappable hero image or section-visibility toggle in the
            current build, so there's nothing extra to configure here yet — only its text is
            editable, in the Content Editor above.
          </p>
        </div>
      )}
    </DashboardCard>
  )
}

/* ------------------------------------------------------------------ */
/* 6. Save & Publish                                                   */
/* ------------------------------------------------------------------ */

function SaveAndPublish({ pageKey, isDirty, isEdited, onSave, onReset, onPreview }) {
  const [confirmingReset, setConfirmingReset] = useState(false)

  return (
    <DashboardCard eyebrow="Step 5" title="Save & Publish">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-sm">
          {isDirty ? (
            <>
              <FiAlertCircle size={15} className="text-terracotta-dark" />
              <span className="text-plum/70">You have unsaved changes.</span>
            </>
          ) : (
            <>
              <FiCheckCircle size={15} className="text-sage" />
              <span className="text-plum/60">
                {isEdited ? 'Saved — this page has custom content.' : 'Showing default content.'}
              </span>
            </>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Button type="button" variant="secondary" onClick={onPreview} className="gap-2 px-5 py-2.5 text-xs">
            <FiExternalLink size={14} aria-hidden="true" />
            Preview Page
          </Button>
          <Button
            type="button"
            variant="secondary"
            disabled={!isEdited}
            onClick={() => setConfirmingReset(true)}
            className="gap-2 px-5 py-2.5 text-xs disabled:cursor-not-allowed disabled:opacity-40"
          >
            <FiRotateCcw size={14} aria-hidden="true" />
            Reset
          </Button>
          <Button
            type="button"
            variant="primary"
            disabled={!isDirty}
            onClick={onSave}
            className="gap-2 px-5 py-2.5 text-xs disabled:cursor-not-allowed disabled:opacity-40"
          >
            <FiSave size={14} aria-hidden="true" />
            Save Changes
          </Button>
        </div>
      </div>

      <ConfirmDialog
        open={confirmingReset}
        title="Reset this page's content?"
        description="This restores the original source wording and clears any saved changes for this page. It can't be undone from here."
        confirmLabel="Reset to Default"
        onConfirm={() => {
          setConfirmingReset(false)
          onReset()
        }}
        onCancel={() => setConfirmingReset(false)}
      />
    </DashboardCard>
  )
}

/* ------------------------------------------------------------------ */

function AdminDeveloper() {
  const [selectedKey, setSelectedKey] = useState(pageContentSchema[0].key)
  const [draft, setDraft] = useState(() => getSiteContent(selectedKey))
  const [editedPages, setEditedPages] = useState(
    () => new Set(pageContentSchema.map((p) => p.key).filter((key) => isSiteContentEdited(key))),
  )

  const page = pageContentSchema.find((p) => p.key === selectedKey)
  const saved = getSiteContent(selectedKey)
  const isDirty = useMemo(() => {
    const keys = page.fields.map((f) => f.key)
    return keys.some((key) => (draft[key] ?? '') !== (saved[key] ?? ''))
  }, [draft, saved, page])
  const isEdited = editedPages.has(selectedKey)

  // Warn on tab-close/navigation-away with unsaved changes — simple
  // beforeunload guard, no version history or complex state involved.
  useEffect(() => {
    if (!isDirty) return undefined
    const handler = (e) => {
      e.preventDefault()
      e.returnValue = ''
    }
    window.addEventListener('beforeunload', handler)
    return () => window.removeEventListener('beforeunload', handler)
  }, [isDirty])

  const handleSelectPage = (key) => {
    setSelectedKey(key)
    setDraft(getSiteContent(key))
  }

  const handleFieldChange = (fieldKey, value) => {
    setDraft((prev) => ({ ...prev, [fieldKey]: value }))
  }

  const handleSave = () => {
    updateSiteContent(selectedKey, draft)
    setEditedPages((prev) => new Set(prev).add(selectedKey))
  }

  const handleReset = () => {
    resetSiteContent(selectedKey)
    setDraft(defaultSiteContent[selectedKey])
    setEditedPages((prev) => {
      const next = new Set(prev)
      next.delete(selectedKey)
      return next
    })
  }

  const handlePreview = () => {
    window.open(pageRoutes[selectedKey] ?? '/', '_blank', 'noopener')
  }

  return (
    <RequireAdmin>
      <AdminShell pageTitle="Developer Mode">
        {/* 1. Developer Mode Header */}
        <DeveloperModeHeader />

        {/* 2. Page / Content Selector */}
        <PageSelector selectedKey={selectedKey} onSelect={handleSelectPage} editedPages={editedPages} />

        {/* 3. Content Editor */}
        <ContentEditor page={page} values={draft} onChange={handleFieldChange} />

        {/* 4. Live Preview */}
        <LivePreview pageKey={selectedKey} values={draft} />

        {/* 5. Media / Content Settings */}
        <MediaSettings pageKey={selectedKey} page={page} values={draft} onChange={handleFieldChange} />

        {/* 6. Save & Publish */}
        <SaveAndPublish
          pageKey={selectedKey}
          isDirty={isDirty}
          isEdited={isEdited}
          onSave={handleSave}
          onReset={handleReset}
          onPreview={handlePreview}
        />
      </AdminShell>
    </RequireAdmin>
  )
}

export default AdminDeveloper
