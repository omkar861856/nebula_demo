import React from 'react';

// This is a helper component to apply the Matrix-style cursors
const MatrixCursor: React.FC = () => {
  // This component doesn't render anything visible, it's just for side effects
  React.useEffect(() => {
    // The cursor styles are already in the global CSS file
    // This is just a placeholder for any additional cursor effects we might want to add
    return () => {
      // Clean up if needed
    };
  }, []);

  return null;
};

export default MatrixCursor;
