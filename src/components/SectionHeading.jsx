import Reveal from './motion/Reveal.jsx'

function SectionHeading({
  title,
  description,
  align = 'left',
  size = 'md',
  eyebrow,
  eyebrowTone = 'default',
}) {
  const alignClass = align === 'center' ? 'items-center text-center mx-auto' : 'items-start text-left'
  const titleSize = size === 'lg' ? 'text-4xl sm:text-5xl lg:text-6xl' : 'text-3xl sm:text-4xl'

  return (
    <Reveal className={`flex flex-col gap-4 max-w-xl ${alignClass}`}>
      {eyebrow && (
        <span className={eyebrowTone === 'soft' ? 'eyebrow-soft' : 'eyebrow'}>{eyebrow}</span>
      )}
      <h2 className={`${titleSize} font-display font-normal leading-[1.1] text-plum text-balance`}>
        {title}
      </h2>
      {description && (
        <p className="text-plum/70 text-[1.05rem] leading-relaxed">{description}</p>
      )}
    </Reveal>
  )
}

export default SectionHeading
