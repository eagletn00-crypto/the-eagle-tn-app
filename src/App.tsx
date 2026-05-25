import { Variants } from 'framer-motion';

// تعريف متوافق 100% مع TypeScript
const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.5, 
      ease: "easeInOut" // استخدم سلسلة نصية قياسية تقبلها المكتبة
    } 
  }
};

// افعل نفس الشيء مع headerVariants أو أي variants أخرى
const headerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: 0.5, ease: "linear" } 
  }
};
