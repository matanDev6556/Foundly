import React, { useState, useEffect } from 'react';
import './CategorySelector.css';

interface CategorySelectorProps {
  list: string[];
  setCategories: (categories: string[]) => void;
  initialCategories?: string[];
}

const CategorySelector: React.FC<CategorySelectorProps> = ({
  setCategories,
  list,
  initialCategories = [],
}) => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>(initialCategories);

  const handleCategoryClick = (category: string) => {
    setSelectedCategories((prevSelected) =>
      prevSelected.includes(category)
        ? prevSelected.filter((cat) => cat !== category)
        : [...prevSelected, category]
    );
  };

  useEffect(() => {
    setCategories(selectedCategories);
  }, [selectedCategories, setCategories]);

  useEffect(() => {
    if (initialCategories.length > 0) {
      setSelectedCategories(initialCategories);
    }
  }, [initialCategories]);

  return (
    <div>
      <div className="category-container">
        {list.map((category: string) => (
          <button
            key={category}
            className={`category-button ${
              selectedCategories.includes(category) ? 'selected' : ''
            }`}
            onClick={(e) => {
              e.preventDefault();
              handleCategoryClick(category);
            }}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategorySelector;