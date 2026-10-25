
export default function QueryProcessor(query: string): string {
  const q = query.toLowerCase();

  if (q.includes("shakespeare")) {
    return (
      "William Shakespeare (26 April 1564 - 23 April 1616) was an " +
      "English poet, playwright, and actor, widely regarded as the greatest " +
      "writer in the English language and the world's pre-eminent dramatist."
    );
  }

  if (q.includes("andrew id")) return "laibasameer";
  if (q.includes("name")) return "lsameer";
  if (q.includes("age")) return "67";

  // Addition: "What is 46 plus 60?"
  const addition = q.match(
    /what is (-?\d+)\s*(?:plus|\+)\s*(-?\d+)/i
  );

  if (addition) {
    return String(Number(addition[1]) + Number(addition[2]));
  }

  // Powers: "What is 85 to the power of 82?"
  const power = q.match(
    /what is (\d+) to the power of (\d+)/i
  );

  if (power) {
    const base = BigInt(power[1]);
    const exponent = BigInt(power[2]);

    if (exponent > 10000n) return "";
    return String(base ** exponent);
  }

  // Largest number: "largest: 84, 89, 65"
  const largest = q.match(
    /largest:\s*(-?\d+)\s*,\s*(-?\d+)\s*,\s*(-?\d+)/i
  );

  if (largest) {
    return String(
      Math.max(Number(largest[1]), Number(largest[2]), Number(largest[3]))
    );
  }

  return "";
}
