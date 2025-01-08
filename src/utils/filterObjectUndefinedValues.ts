export const filterObjectUndefinedValues = (obj?: Record<string, any>) => {
  const clone = { ...obj };

  if (!clone) return;

  Object.keys(clone).forEach((key) => {
    if (clone[key] === undefined) {
      delete clone[key];
    }
  });

  return clone;
};
