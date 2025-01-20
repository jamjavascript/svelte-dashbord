export function resize(node, callback) {
  const updateDimensions = () => {
      callback({
          width: window.innerWidth,
          height: window.innerHeight,
      });
  };

  updateDimensions();
  window.addEventListener('resize', updateDimensions);

  return {
      destroy() {
          window.removeEventListener('resize', updateDimensions);
      },
  };
}
