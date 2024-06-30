import React, { useState } from 'react';

const PreferencesStep: React.FC = () => {
  const categories = ['Ai', 'Technology', 'Health', 'Food', 'finance'];
  const [selectedCategories, setSelectedCategories] = useState([]);

  return (
    <form>
      <label>Choose Categories </label>
    </form>
  );
};

export default PreferencesStep;
