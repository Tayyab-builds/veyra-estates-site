const variants = {
  primary:
    'bg-olive text-ivory hover:bg-olive-dark border border-olive hover:border-olive-dark shadow-[0_1px_2px_rgba(24,33,31,0.12)] hover:shadow-[0_10px_24px_-10px_rgba(24,33,31,0.4)]',
  secondary:
    'bg-transparent text-plum border border-plum/30 hover:border-plum hover:bg-plum hover:text-ivory shadow-none hover:shadow-[0_8px_18px_-10px_rgba(24,33,31,0.3)]',
  light:
    'bg-transparent text-ivory border border-ivory/50 hover:border-ivory hover:bg-ivory hover:text-plum shadow-none hover:shadow-[0_8px_18px_-10px_rgba(0,0,0,0.35)]',
}

function Button({ children, variant = 'primary', as = 'button', className = '', ...props }) {
  const Comp = as
  return (
    <Comp
      className={`inline-flex items-center justify-center gap-2 px-7 py-3.5 text-[0.9rem] font-body font-medium tracking-wide transition-all duration-300 ease-editorial hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] active:shadow-none ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </Comp>
  )
}

export default Button
