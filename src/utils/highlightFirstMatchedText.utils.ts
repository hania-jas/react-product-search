import type { HighlightedResult } from "../interfaces";

  export const highlightFirstMatchedText: (product: string, debouncedValue: string) => HighlightedResult[] = (product: string, debouncedValue: string): HighlightedResult[] => {
    const query: string = debouncedValue.trim()
    const foundIndexStart: number = product.toLowerCase().indexOf(query.toLowerCase());

    if (!query || foundIndexStart === -1) {
      return [{ value: product, isMatch: false }]
    }
    const foundIndexEnd: number = foundIndexStart + query.length
    const result: HighlightedResult[] = [
      { value: product.slice(0, foundIndexStart), isMatch: false },
      { value: product.slice(foundIndexStart, foundIndexEnd), isMatch: true },
      { value: product.slice(foundIndexEnd), isMatch: false }
    ];

    return result
  }