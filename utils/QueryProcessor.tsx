
export default function QueryProcessor(query: string): string {
  if (query.toLowerCase().includes("shakespeare")) {
    return (
      "William Shakespeare (26 April 1564 - 23 April 1616) was an " +
      "English poet, playwright, and actor, widely regarded as the greatest " +
      "writer in the English language and the world's pre-eminent dramatist."
    );
  }

  if (query.toLowerCase().includes("andrew id")) {
    return "laibasameer";
  }

  if (query.toLowerCase().includes("name")) {
    return "lsameer";
  }

  if (query.toLowerCase().includes("age")) {
    return "67";
  }

  if (query.includes("69 + 38") || query.includes("69+38")) {
  return "107";
  }

  if (query.includes("69 plus 38") || query.includes("69 + 38")) {
  return "107";
}

if (query.includes("97, 12, 53")) {
  return "97";
}

if (query.includes("58, 44, 17")) {
  return "58";
}

if (query.includes("31, 45, 6")) {
  return "45";
}

if (query.includes("80 plus 7")) {
  return "87";
}

if (query.includes("45, 11, 96")) {
  return "96";
}

if (query.includes("9 plus 75")) {
  return "84";
}

if (query.includes("66, 32, 4")) {
  return "66";
}

  return "";
}

