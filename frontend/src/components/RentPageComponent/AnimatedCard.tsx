"use client";
import React, { useEffect, useRef, useState } from 'react';

interface AnimatedCardProps {
  children: React.ReactNode;
  index: number;
  animationType?: 'slideUp' | 'slideIn' | 'fadeScale' | 'flipIn' | 'bounceSubtle';
  delay?: number;
  duration?: number;
  threshold?: number;
  className?: string;
}

const AnimatedCard: React.FC<AnimatedCardProps> = ({
  children,
  index,
  animationType = 'slideUp',
  delay = 0,
  duration = 600,
  threshold = 0.1,
  className = ''
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const currentRef = cardRef.current;
    if (!currentRef) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          // Add a small delay based on index for staggered animation
          const calculatedDelay = delay + (index * 100);
          
          setTimeout(() => {
            setIsVisible(true);
            setHasAnimated(true);
          }, calculatedDelay);
        }
      },
      {
        threshold,
        rootMargin: '50px 0px -50px 0px'
      }
    );

    observer.observe(currentRef);

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [index, delay, threshold, hasAnimated]);

  const getAnimationClasses = () => {
    const baseClasses = `transition-all duration-${duration} ease-out`;
    
    if (!isVisible) {
      switch (animationType) {
        case 'slideUp':
          return `${baseClasses} opacity-0 transform translate-y-8 scale-95`;
        case 'slideIn':
          return `${baseClasses} opacity-0 transform translate-x-8 scale-95`;
        case 'fadeScale':
          return `${baseClasses} opacity-0 transform scale-75`;
        case 'flipIn':
          return `${baseClasses} opacity-0 transform rotateY-90 scale-90`;
        case 'bounceSubtle':
          return `${baseClasses} opacity-0 transform scale-50`;
        default:
          return `${baseClasses} opacity-0 transform translate-y-8 scale-95`;
      }
    }

    switch (animationType) {
      case 'slideUp':
        return `${baseClasses} opacity-100 transform translate-y-0 scale-100`;
      case 'slideIn':
        return `${baseClasses} opacity-100 transform translate-x-0 scale-100`;
      case 'fadeScale':
        return `${baseClasses} opacity-100 transform scale-100`;
      case 'flipIn':
        return `${baseClasses} opacity-100 transform rotateY-0 scale-100`;
      case 'bounceSubtle':
        return `${baseClasses} opacity-100 transform scale-100 animate-bounce-subtle`;
      default:
        return `${baseClasses} opacity-100 transform translate-y-0 scale-100`;
    }
  };

  return (
    <div 
      ref={cardRef}
      className={`${getAnimationClasses()} ${className}`}
      style={{
        animationFillMode: 'both',
        transformOrigin: 'center bottom'
      }}
    >
      {children}
    </div>
  );
};

export default AnimatedCard;