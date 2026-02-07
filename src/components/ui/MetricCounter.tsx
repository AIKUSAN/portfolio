"use client";

import { useEffect, useMemo } from 'react';
import { useSpring, useTransform, motion } from 'framer-motion';

interface MetricCounterProps {
  value: number;
  suffix: string;
  inView: boolean;
}

export default function MetricCounter({ value, suffix, inView }: MetricCounterProps) {
  // Determine decimal precision from the target value
  const precision = useMemo(() => {
    if (Number.isInteger(value)) return 0;
    const str = value.toString();
    if (str.includes('.')) return str.split('.')[1].length;
    return 0;
  }, [value]);

  const spring = useSpring(0, { mass: 0.8, stiffness: 75, damping: 15 });
  
  const display = useTransform(spring, (current) => {
    if (precision === 0) {
      // Format integers with commas (e.g. 10,000)
      return Math.round(current).toLocaleString('en-US') + suffix;
    }
    // Format floats with correct precision (e.g. 99.999)
    return current.toFixed(precision) + suffix;
  });

  useEffect(() => {
    if (inView) {
      spring.set(value);
    } else {
      spring.set(0);
    }
  }, [inView, value, spring]);

  return <motion.span>{display}</motion.span>;
}
