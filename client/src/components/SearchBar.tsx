import React from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";

interface searchBarProps {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  handleSearch: () => void;
  isLoading?: boolean;
  onSelect?: (value: string) => void; // Optional callback for selection
}

export const SearchBar: React.FC<searchBarProps> = ({
  searchQuery,
  setSearchQuery,
  handleSearch,
  isLoading = false,
  onSelect,
}) => {
  return (
    <div className="flex gap-2 max-w-xl mx-auto">
      <Input
        placeholder="Search crops"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full h-12 text-lg"
        onKeyDown={(e) => {
          if (e.key === "Enter" && !isLoading) {
            if (onSelect) {
              onSelect(searchQuery);
            } else {
              handleSearch();
            }
          }
        }}
        disabled={isLoading}
      />
      <Button
        size="lg"
        className="h-12 px-6 transition-all duration-200 hover:scale-105 active:scale-95"
        onClick={handleSearch}
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 animate-spin" size={20} />
            Searching...
          </>
        ) : (
          "Search"
        )}
      </Button>
    </div>
  );
};
