export const generateQuoteId = (): string => {
  return `quote-${Date.now()}-${Math.random()}`;
};

export const formatDate = (): string => {
  const date = new Date();
  return date.toLocaleDateString("pt-BR", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};
