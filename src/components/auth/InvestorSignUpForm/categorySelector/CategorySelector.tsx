import React, { useState } from 'react';
import './CategorySelector.css'; // קובץ ה-CSS כדי להגדיר את הסטייל

const categories: string[] = [
  'Ai',
  'Technology',
  'health',
  'renewable energy',
  'real estate',
  'Food',
  'finance',
  'Electric cars',
];

const CategorySelector: React.FC = () => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const handleCategoryClick = (category: string) => {
    setSelectedCategories((prevSelected) =>
      prevSelected.includes(category)
        ? prevSelected.filter((cat) => cat !== category)
        : [...prevSelected, category]
    );
  };

  return (
    <div>
      <div className="category-container">
        {categories.map((category) => (
          <button
            key={category}
            className={`category-button ${
              selectedCategories.includes(category) ? 'selected' : ''
            }`}
            onClick={(e) =>{
                e.preventDefault();
                handleCategoryClick(category)}
            } 
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategorySelector;
