export type FilterState = {
  searchTerm: string;
  selectedTags: string[];
  sortOrder: "asc" | "desc";
};

export const initialFilterState: FilterState = {
  searchTerm: "",
  selectedTags: [],
  sortOrder: "desc",
};

export type FilterAction =
  | { type: "SET_SEARCH"; payload: string }
  | { type: "SET_TAGS"; payload: string[] }
  | { type: "SET_SORT"; payload: "asc" | "desc" }
  | { type: "RESET" };

export function filterReducer(
  state: FilterState,
  action: FilterAction,
): FilterState {
  switch (action.type) {
    case "SET_SEARCH":
      return { ...state, searchTerm: action.payload };
    case "SET_TAGS":
      return { ...state, selectedTags: action.payload };
    case "SET_SORT":
      return { ...state, sortOrder: action.payload };
    case "RESET":
      return initialFilterState;
    default:
      return state;
  }
}
