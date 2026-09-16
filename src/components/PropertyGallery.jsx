import { useCallback, useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { FiChevronLeft, FiChevronRight, FiX, FiMaximize2 } from 'react-icons/fi'

const easeEditorial = [0.22, 1, 0.36, 1]

function Lightbox({ images, index, onClose, onPrev, onNext, alt }) {
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') onPrev()
      if (e.key === 'ArrowRight') onNext()
    }
    window.addEventListener('keydown', onKeyDown)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = ''
    }
  }, [onClose, onPrev, onNext])

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label="Property image gallery"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: easeEditorial }}
      className="fixed inset-0 z-[60] flex flex-col bg-ink/95 backdrop-blur-sm"
    >
      <div className="flex items-center justify-between px-5 py-4 sm:px-8 sm:py-6">
        <p className="font-body text-sm tracking-wide text-ivory/70">
          {String(index + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}
        </p>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close gallery"
          className="flex h-10 w-10 items-center justify-center text-ivory/80 transition-colors duration-300 hover:text-ivory"
        >
          <FiX size={22} />
        </button>
      </div>

      <div className="relative flex flex-1 items-center justify-center px-4 pb-6 sm:px-10 sm:pb-10">
        <button
          type="button"
          onClick={onPrev}
          aria-label="Previous image"
          className="absolute left-2 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center text-ivory/70 transition-colors duration-300 hover:text-ivory sm:left-4"
        >
          <FiChevronLeft size={26} />
        </button>

        <AnimatePresence mode="wait">
          <motion.img
            key={index}
            src={images[index]}
            alt={`${alt} — image ${index + 1} of ${images.length}`}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.4, ease: easeEditorial }}
            className="max-h-[78vh] w-full max-w-4xl object-contain sm:max-h-[82vh]"
          />
        </AnimatePresence>

        <button
          type="button"
          onClick={onNext}
          aria-label="Next image"
          className="absolute right-2 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center text-ivory/70 transition-colors duration-300 hover:text-ivory sm:right-4"
        >
          <FiChevronRight size={26} />
        </button>
      </div>
    </motion.div>
  )
}

function PropertyGallery({ images, name }) {
  const [lightboxIndex, setLightboxIndex] = useState(null)
  const isOpen = lightboxIndex !== null

  const open = useCallback((i) => setLightboxIndex(i), [])
  const close = useCallback(() => setLightboxIndex(null), [])
  const prev = useCallback(
    () => setLightboxIndex((i) => (i - 1 + images.length) % images.length),
    [images.length],
  )
  const next = useCallback(() => setLightboxIndex((i) => (i + 1) % images.length), [images.length])

  const main = images[0]
  const sideThumbs = images.slice(1, 3)

  return (
    <>
      <div className="grid grid-cols-1 gap-2 sm:gap-2.5 lg:grid-cols-3 lg:gap-3">
        <motion.button
          type="button"
          onClick={() => open(0)}
          initial={{ opacity: 0, scale: 1.02 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: easeEditorial }}
          className="group relative aspect-[4/3] overflow-hidden text-left sm:aspect-[16/10] lg:col-span-2 lg:aspect-[16/11]"
        >
          <img
            src={main}
            alt={`${name} — main view`}
            className="h-full w-full object-cover transition-transform duration-[1200ms] ease-editorial group-hover:scale-[1.045]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/35 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          <span className="absolute bottom-4 right-4 hidden items-center gap-1.5 bg-ivory/90 px-3 py-1.5 text-[0.7rem] tracking-wide text-plum opacity-0 transition-opacity duration-300 group-hover:opacity-100 sm:flex">
            <FiMaximize2 size={12} /> View gallery
          </span>
        </motion.button>

        <div className="grid grid-cols-2 gap-2 sm:gap-2.5 lg:grid-cols-1 lg:gap-3">
          {sideThumbs.map((src, i) => (
            <motion.button
              type="button"
              key={src + i}
              onClick={() => open(i + 1)}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 + i * 0.08, ease: easeEditorial }}
              className="group relative aspect-[4/3] overflow-hidden text-left lg:aspect-auto lg:h-full"
            >
              <img
                src={src}
                alt={`${name} — supporting view ${i + 1}`}
                className="h-full w-full object-cover transition-transform duration-[1200ms] ease-editorial group-hover:scale-[1.06]"
                loading="lazy"
              />
            </motion.button>
          ))}
        </div>
      </div>

      {/* Touch-friendly thumbnail strip — gives quick access to every image on any device */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4, ease: easeEditorial }}
        className="mt-3 flex gap-2.5 overflow-x-auto pb-1 sm:mt-4 sm:gap-3"
      >
        {images.map((src, i) => (
          <button
            key={src + i}
            type="button"
            onClick={() => open(i)}
            aria-label={`Open image ${i + 1} of ${images.length}`}
            className="relative h-16 w-20 shrink-0 overflow-hidden opacity-80 transition-opacity duration-300 hover:opacity-100 sm:h-[4.5rem] sm:w-24"
          >
            <img src={src} alt="" aria-hidden="true" className="h-full w-full object-cover" loading="lazy" />
          </button>
        ))}
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <Lightbox images={images} index={lightboxIndex} onClose={close} onPrev={prev} onNext={next} alt={name} />
        )}
      </AnimatePresence>
    </>
  )
}

export default PropertyGallery
