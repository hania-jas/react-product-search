import type { SortSettings } from "../enums";

export interface Filters {
  isInStock: boolean;
  type: string;
  sortSetting: SortSettings;
}