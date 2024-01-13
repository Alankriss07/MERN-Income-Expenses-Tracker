const loadWebVitals = async () => {
  const { getCLS, getFID, getFCP, getLCP, getTTFB } = await import(
    "web-vitals"
  );
  return { getCLS, getFID, getFCP, getLCP, getTTFB };
};

const reportWebVitals = async (onPerfEntry) => {
  if (onPerfEntry instanceof Function) {
    const webVitals = await loadWebVitals();
    Object.values(webVitals).forEach((metric) => metric(onPerfEntry));
  }
};

export default reportWebVitals;
