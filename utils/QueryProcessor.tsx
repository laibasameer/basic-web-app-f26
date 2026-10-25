
function add(a: string, b: string): string {
  let i = a.length - 1;
  let j = b.length - 1;
  let carry = 0;
  let result = "";

  while (i >= 0 || j >= 0 || carry > 0) {
    const sum =
      (i >= 0 ? Number(a[i--]) : 0) +
      (j >= 0 ? Number(b[j--]) : 0) + carry;

    result = String(sum % 10) + result;
    carry = Math.floor(sum / 10);
  }

  return result;
}

function multiply(a: string, b: string): string {
  const result = Array(a.length + b.length).fill(0);

  for (let i = a.length - 1; i >= 0; i--) {
    for (let j = b.length - 1; j >= 0; j--) {
      const product = Number(a[i]) * Number(b[j]) + result[i + j + 1];
      result[i + j + 1] = product % 10;
      result[i + j] += Math.floor(product / 10);
    }
  }

  return result.join("").replace(/^0+(?=\d)/, "");
}

function power(base: string, exponent: number): string {
  let result = "1";

  for (let i = 0; i < exponent; i++) {
    result = multiply(result, base);
  }

  return result;
}

function evaluate(query: string): string {
  let expression = query.toLowerCase()
    .replace(/^.*?what is\s*/, "")
    .replace(/\?+$/, "")
    .replace(/multiplied by/g, "*")
    .replace(/times/g, "*")
    .replace(/plus/g, "+")
    .replace(/minus/g, "-")
    .replace(/to the power of/g, "^")
    .replace(/\s+/g, "");

  const tokens = expression.match(/\d+|[+*^()-]/g);
  if (!tokens || tokens.join("") !== expression) return "";

  let pos = 0;

  function atom(): string {
    if (tokens![pos] === "(") {
      pos++;
      const value = sum();
      if (tokens![pos] !== ")") throw new Error("Missing )");
      pos++;
      return value;
    }

    const token = tokens![pos++];
    if (!token || !/^\d+$/.test(token)) throw new Error("Expected number");
    return token.replace(/^0+(?=\d)/, "");
  }

  function exponentiation(): string {
    const base = atom();

    if (tokens![pos] === "^") {
      pos++;
      const exp = exponentiation();
      const n = Number(exp);

      if (!Number.isSafeInteger(n) || n > 1000) {
        throw new Error("Exponent out of range");
      }

      return power(base, n);
    }

    return base;
  }

  function product(): string {
    let value = exponentiation();

    while (tokens![pos] === "*") {
      pos++;
      value = multiply(value, exponentiation());
    }

    return value;
  }

  function sum(): string {
    let value = product();

    while (tokens![pos] === "+" || tokens![pos] === "-") {
      const operator = tokens![pos++];

      if (operator === "-") {
        throw new Error("Subtraction not supported yet");
      }

      value = add(value, product());
    }

    return value;
  }

  const answer = sum();
  if (pos !== tokens.length) return "";
  return answer;
}

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

  if (q.includes("largest")) {
    const numbers = q.match(/-?\d+/g);
    if (numbers && numbers.length >= 3) {
      return String(Math.max(...numbers.map(Number)));
    }
  }

  if (q.includes("what is")) {
    try {
      return evaluate(query);
    } catch {
      return "";
    }
  }

  if (q.includes("anagram of")) {
  const match = q.match(/anagram of ([a-z]+):?\s*(.*)/i);

  if (match) {
    const target = match[1].split("").sort().join("");
    const options = match[2].match(/[a-z]+/g) ?? [];

    const answer = options.find(
      (word) => word.split("").sort().join("") === target
    );

    if (answer) return answer;
  }
  }

  if (q.includes("scrabble score of")) {
  const match = q.match(/scrabble score of ([a-z]+)/i);

  if (match) {
    const scores: Record<string, number> = {
      a: 1, b: 3, c: 3, d: 2, e: 1, f: 4,
      g: 2, h: 4, i: 1, j: 8, k: 5, l: 1,
      m: 3, n: 1, o: 1, p: 3, q: 10, r: 1,
      s: 1, t: 1, u: 1, v: 4, w: 4, x: 8,
      y: 4, z: 10
    };

    return String(
      match[1].split("").reduce(
        (total, letter) => total + scores[letter],
        0
      )
    );
  }
}


if (q.includes("scrabble score of")) {
  const match = q.match(/scrabble score of\s+([a-z]+)/i);

  if (match) {
    const word = match[1].toLowerCase();

    const scores: Record<string, number> = {
      a: 1, b: 3, c: 3, d: 2, e: 1, f: 4,
      g: 2, h: 4, i: 1, j: 8, k: 5, l: 1,
      m: 3, n: 1, o: 1, p: 3, q: 10, r: 1,
      s: 1, t: 1, u: 1, v: 4, w: 4, x: 8,
      y: 4, z: 10
    };

    return String(
      [...word].reduce(
        (total, letter) => total + (scores[letter] ?? 0),
        0
      )
    );
  }
}


  return "";
}
