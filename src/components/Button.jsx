/**
 * Shared button for consistent styling. Use variant and className to customize.
 */
export function Button({ children, variant = 'primary', className = '', type = 'button', ...props }) {
  const classNames = ['btn', `btn--${variant}`, className].filter(Boolean).join(' ')
  return (
    <button type={type} className={classNames} {...props}>
      {children}
    </button>
  )
}
