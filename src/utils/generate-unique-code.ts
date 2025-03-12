const generateRandomId = (length: number): string => {
  const characters = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let result = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters[randomIndex];
  }

  return result;
};

export const generateUniqueCode = (prefix: string): string => {
  // Extract the first 3 letters (uppercase) or fallback to "XXX" if the prefix is too short
  const prefixCode = prefix.trim().toUpperCase().substring(0, 3).padEnd(3, "X");

  const uniqueId = generateRandomId(6);

  return `${prefixCode}-${uniqueId}`;
};
