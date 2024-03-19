import React, { useState, useEffect } from "react";

const ExampleComponent: React.FC = () => {
  // Define state variables using useState hook
  const [count, setCount] = useState<number>(0); // Initialize count state with value 0

  // useEffect hook to execute side effects
  useEffect(() => {
    // Update the document title with the current count value
    document.title = `Count: ${count}`;
  }, [count]); // Run this effect whenever the count state changes

  // Function to handle incrementing count
  const incrementCount = () => {
    setCount((prevCount) => prevCount + 1); // Update count by adding 1 to the previous value
  };

  return (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={incrementCount}>Increment Count</button>
    </div>
  );
};

export default ExampleComponent;
