import { forwardRef, useEffect, useRef, useState } from 'react'
import { Slot } from '@radix-ui/react-slot'
import { motion } from 'motion/react'

const cn = (...classes) => classes.filter(Boolean).join(' ')

const buttonBase =
    'relative inline-flex items-center justify-center gap-2 font-semibold transition-all focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 overflow-hidden [&_svg]:pointer-events-none'

const variantClasses = {
    default: 'bg-sky-500 text-slate-950 hover:bg-sky-400',
    destructive: 'bg-red-600 text-white hover:bg-red-500',
    outline: 'border-2 border-gray-500 bg-transparent text-black hover:bg-gray-100',
    secondary: 'bg-gray-500 text-white hover:bg-gray-400',
    success: 'bg-green-600 text-white hover:bg-green-500',
    warning: 'bg-yellow-400 text-black hover:bg-yellow-300',
    info: 'bg-blue-600 text-white hover:bg-blue-500',
    gradient: 'bg-linear-to-r from-purple-600 to-pink-500 text-white',
    link: 'bg-transparent text-primary underline-offset-4 hover:underline shadow-none',
}

const sizeClasses = {
    default: 'h-9 px-4 py-2 has-[>svg]:gap-2',
    sm: 'h-8 rounded-md px-3 text-xs has-[>svg]:gap-1.5',
    lg: 'h-10 rounded-md px-8 has-[>svg]:gap-2.5',
    xl: 'h-24 px-20 text-2xl has-[>svg]:gap-3',
    icon: 'h-9 w-9',
    'icon-sm': 'h-12 w-12',
    'icon-lg': 'h-20 w-20',
}

const radiusClasses = {
    default: 'rounded-full',
    sm: 'rounded-lg',
    lg: 'rounded-4xl',
    none: 'rounded-none',
}

const buttonVariants = ({ variant = 'default', size = 'default', radius = 'default', className } = {}) =>
    cn(buttonBase, variantClasses[variant], sizeClasses[size], radiusClasses[radius], className)

const variantColors = {
    default: { fromBg: '#0ea5e9', toBg: '#38bdf8', stroke: '#7dd3fc' },
    destructive: { fromBg: '#dc2626', toBg: '#fca5a5', stroke: '#fca5a5' },
    outline: { fromBg: 'transparent', toBg: 'transparent', stroke: 'currentColor' },
    secondary: { fromBg: '#64748b', toBg: '#cbd5e1', stroke: '#cbd5e1' },
    success: { fromBg: '#16a34a', toBg: '#86efac', stroke: '#86efac' },
    warning: { fromBg: '#eab308', toBg: '#fde047', stroke: '#fde047' },
    info: { fromBg: '#3b82f6', toBg: '#93c5fd', stroke: '#93c5fd' },
    gradient: { fromBg: '#8b5cf6', toBg: '#ec4899', stroke: '#ec4899' },
    link: { fromBg: 'transparent', toBg: 'transparent', stroke: 'currentColor' },
}

function WavyText({ text, isHovered, className = '', duration, delay }) {
    const chars = text.split('')

    return (
        <span className='relative z-20 inline-flex'>
            {chars.map((char, index) => (
                <motion.span
                    key={`${char}-${index}`}
                    className={className}
                    animate={isHovered ? { y: [0, -8, 0] } : { y: 0 }}
                    transition={{
                        duration,
                        delay: index * delay,
                        ease: [0.4, 0, 0.2, 1],
                    }}
                    style={{
                        display: 'inline-block',
                        whiteSpace: char === ' ' ? 'pre' : 'normal',
                    }}
                >
                    {char === ' ' ? '\u00A0' : char}
                </motion.span>
            ))}
        </span>
    )
}

const WavyButton = forwardRef(function WavyButton(
    {
        className,
        variant = 'default',
        size = 'default',
        radius = 'default',
        children,
        animationDuration = 0.8,
        strokeWidth = 30,
        splitDelay = 0.04,
        asChild = false,
        disableTextAnimation = false,
        type = 'button',
        ...props
    },
    ref,
) {
    const [isHovered, setIsHovered] = useState(false)
    const timeoutRef = useRef(null)
    const colors = variantColors[variant] ?? variantColors.default
    const Component = asChild ? Slot : motion.button

    const handleTouchStart = () => {
        setIsHovered(true)

        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current)
        }

        timeoutRef.current = setTimeout(() => {
            setIsHovered(false)
        }, 2000)
    }

    useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current)
            }
        }
    }, [])

    return (
        <Component
            ref={ref}
            type={!asChild ? type : undefined}
            className={buttonVariants({ variant, size, radius, className })}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onTouchStart={handleTouchStart}
            animate={!asChild ? { backgroundColor: isHovered ? colors.toBg : colors.fromBg } : undefined}
            transition={!asChild ? { duration: animationDuration, ease: [0.4, 0, 0.2, 1] } : undefined}
            {...props}
        >
            <svg
                viewBox='0 0 260 64'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
                className='pointer-events-none absolute inset-0 z-10 h-full w-full'
                preserveAspectRatio='none'
            >
                <defs>
                    <clipPath id='clip-wave'>
                        <rect width='260' height='64' fill='white' />
                    </clipPath>
                </defs>
                <g clipPath='url(#clip-wave)'>
                    <motion.path
                        d='M-11.7907 25.5948C-1.99079 7.39406 53.3086 -7.30655 91.8081 -10.8067C130.308 -14.3068 164.607 -12.2068 129.608 1.79383C94.6081 15.7944 37.9088 5.29517 -4.79076 43.0967C-47.4903 80.8983 1.50917 68.9978 11.3091 61.2975C21.1089 53.5972 55.4086 37.4965 79.2083 36.0965C103.008 34.6964 153.407 32.5939 174.407 1.79383C195.407 -29.0063 219.207 -29.0063 196.807 13.6955C174.407 56.3973 105.808 57.7985 84.8083 61.2975C63.8085 64.7965 44.9087 67.5966 32.3089 78.0971C19.709 88.5975 127.508 83.6962 157.607 72.4968C187.707 61.2975 218.507 24.8948 227.607 -1.00624C236.707 -26.9073 261.906 -7.3065 252.806 7.39411C243.706 22.0947 217.807 55.6961 207.307 66.8966C196.807 78.0971 219.207 96.9978 236.007 72.4968C252.806 47.9958 280.106 15.7945 285.706 7.39411'
                        stroke={colors.stroke}
                        strokeWidth={strokeWidth}
                        pathLength={1}
                        initial={{ pathLength: 0 }}
                        animate={isHovered ? { pathLength: 1 } : { pathLength: 0 }}
                        transition={{
                            duration: animationDuration,
                            ease: [0.4, 0, 0.2, 1],
                        }}
                    />
                </g>
            </svg>

            <div
                className={cn(
                    'relative z-20 inline-flex items-center',
                    isHovered ? 'text-white' : 'text-black',
                )}
            >
                {typeof children === 'string' && !disableTextAnimation ? (
                    <WavyText
                        text={children}
                        isHovered={isHovered}
                        duration={animationDuration}
                        delay={splitDelay}
                    />
                ) : (
                    children
                )}
            </div>
        </Component>
    )
})

export default WavyButton
