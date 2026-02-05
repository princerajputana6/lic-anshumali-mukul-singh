import React from 'react'
import Image from 'next/image'
import logoImage from '@/assets/LICNCR.png'

interface LogoProps {
  className?: string
  size?: 'sm' | 'md' | 'lg'
}

export function Logo({ className = '', size = 'md' }: LogoProps) {
  const sizeClasses = {
    sm: 'h-10',
    md: 'h-16', 
    lg: 'h-20'
  }

  const widthClasses = {
    sm: 'w-auto',
    md: 'w-auto',
    lg: 'w-auto'
  }

  return (
    <div className={`flex items-center ${className}`}>
      <Image
        src={logoImage}
        alt="LICNCR with A.M Singh"
        className={`${sizeClasses[size]} ${widthClasses[size]} object-contain`}
        priority
        quality={100}
      />
    </div>
  )
}

export default Logo
