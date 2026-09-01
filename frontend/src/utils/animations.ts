export const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.8,
            ease: [0.6, -0.05, 0.01, 0.99],
            type: "spring",
            stiffness: 100
        }
    }
};

export const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
            delayChildren: 0.1
        }
    }
};

export const scaleUp = {
    hidden: { opacity: 0, scale: 0.8, y: 30 },
    visible: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: [0.6, -0.05, 0.01, 0.99],
            type: "spring",
            stiffness: 120,
            damping: 12
        }
    }
};

export const slideInLeft = {
    hidden: { opacity: 0, x: -100 },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 0.8,
            type: "spring",
            stiffness: 100,
            damping: 15
        }
    }
};

export const slideInRight = {
    hidden: { opacity: 0, x: 100 },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 0.8,
            type: "spring",
            stiffness: 100,
            damping: 15
        }
    }
};

export const bounceIn = {
    hidden: { opacity: 0, scale: 0.3 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            duration: 0.6,
            type: "spring",
            stiffness: 200,
            damping: 10
        }
    }
};

export const floatAnimation = {
    y: [0, -10, 0],
    transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
    }
};

// Continuous smooth rotation animation
export const rotateAnimation = {
    rotate: 360,
    transition: {
        duration: 20,
        repeat: Infinity,
        ease: "linear"
    }
};

// Slower rotation for subtle effects
export const slowRotate = {
    rotate: 360,
    transition: {
        duration: 30,
        repeat: Infinity,
        ease: "linear"
    }
};

// Float and rotate combined
export const floatAndRotate = {
    y: [0, -15, 0],
    rotate: [0, 5, -5, 0],
    transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
    }
};

// Hover rotation effect
export const hoverRotate = {
    rotate: 360,
    scale: 1.1,
    transition: {
        duration: 0.6,
        type: "spring",
        stiffness: 200,
        damping: 10
    }
};

// Pulse and rotate
export const pulseRotate = {
    scale: [1, 1.05, 1],
    rotate: [0, 180, 360],
    transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
    }
};
