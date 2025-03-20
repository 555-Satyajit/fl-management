import React, { useState } from 'react';

const AgrimartEmbed = () => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="agrimart-container" style={{ width: '100%', height: '100vh', position: 'relative' }}>
      {isLoading && (
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#f9f9f9'
        }}>
          <p>Loading AgriMart...</p>
        </div>
      )}
      
      <iframe 
        src="https://agrimart-eight.vercel.app"
        title="AgriMart Marketplace"
        width="100%"
        height="100%"
        style={{ 
          border: 'none',
          display: 'block'
        }}
        onLoad={() => setIsLoading(false)}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
      />
    </div>
  );
};

export default AgrimartEmbed;