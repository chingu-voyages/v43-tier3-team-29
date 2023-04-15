// Animation variants
export const overlayContainer = {
  hidden: {
    x: -48,
    opacity: 0,
  },
  show: { x: 0, opacity: 1, transition: { duration: 0.5 } },
  exit: {
    x: -48,
    opacity: 0,
    transition: { duration: 0.5, delay: 0.5 },
  },
};

export const textContainer = {
  hidden: {
    y: -24,
    opacity: 0,
  },
  show: { y: 0, opacity: 1, transition: { duration: 0.5, delay: 0.5 } },
  exit: {
    y: -24,
    opacity: 0,
    transition: { duration: 0.5 },
  },
};

export const btnsContainer = {
  hidden: {
    y: 24,
    opacity: 0,
  },
  show: { y: 0, opacity: 1, transition: { duration: 0.5, delay: 0.5 } },
  exit: {
    y: 24,
    opacity: 0,
    transition: { duration: 0.5 },
  },
};
