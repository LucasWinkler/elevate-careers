import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Helps format descriptions from indeed that are scraped
// incorrectly due to how they render their job descriptions.
export function formatDescriptions(descriptions: string[]): string[] {
  if (!descriptions || descriptions === null) {
    return ["Please click to find out more."];
  }

  const formattedDescriptions: string[] = [];
  let currentDescription: string = "";
  let isInParentheses: boolean = false;

  for (const description of descriptions) {
    for (const char of description) {
      // Check if we are inside parenthesis
      if (char === "(") {
        isInParentheses = true;
      } else if (char === ")") {
        isInParentheses = false;
      }

      // Add the current char to the current description
      currentDescription += char;

      // Check if we are not in parentheses and the char is a sentence ending character
      // If true then the currentDescription is completed so push to the array
      if (!isInParentheses && /[.!?]/.test(char)) {
        formattedDescriptions.push(currentDescription.trim());
        currentDescription = "";
      }
    }
  }

  // Push remaining description if there are any
  if (currentDescription.trim() !== "") {
    formattedDescriptions.push(currentDescription.trim());
  }

  return formattedDescriptions;
}
