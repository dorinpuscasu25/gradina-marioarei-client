'use client';

import React, { useEffect, useRef } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
interface ScrollRevealProps {
  children: React.ReactNode;
  width?: 'fit-content' | '100%';
  delay?: number;
  className?: string;
}
export const ScrollReveal = ({
  children,
  width = 'fit-content',
  delay = 0,
  className = ''
}: ScrollRevealProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    margin: '-50px'
  });
  const mainControls = useAnimation();
  useEffect(() => {
    if (isInView) {
      mainControls.start('visible');
    }
  }, [isInView, mainControls]);
  return (
    <div
      ref={ref}
      style={{
        position: 'relative',
        width
      }}
      className={className}>

      <motion.div
        variants={{
          hidden: {
            opacity: 0,
            y: 30
          },
          visible: {
            opacity: 1,
            y: 0
          }
        }}
        initial="hidden"
        animate={mainControls}
        transition={{
          duration: 0.6,
          delay: delay,
          ease: 'easeOut'
        }}>

        {children}
      </motion.div>
    </div>);

};
