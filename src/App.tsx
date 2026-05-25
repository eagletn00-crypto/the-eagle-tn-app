import { Variants } from 'framer-motion';

/**
 * AppAnimations
 * مركز تحكم الحركات في تطبيق Eagle TN
 */

export const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.5, 
      ease: "easeInOut" 
    } 
  }
};

export const headerVariants: Variants = {
  hidden: { opacity: 0, y: -10 },
  visible: { 
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" } 
  }
};

// إضافة حزمة للحركات المتتالية (مفيدة لقوائم المطاعم)
export const listContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};
