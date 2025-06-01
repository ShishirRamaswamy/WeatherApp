import React from 'react';
import { ListGroup, Button, Card } from 'react-bootstrap'; // Added 'Card' to imports

const FavoritesList = ({ favorites, onRemoveFavorite, onSelectFavorite }) => {
  return (
    <Card className="favorites-card">
      <Card.Body>
        <Card.Title className="mb-3">❤️ Favorites</Card.Title>
        {favorites.length === 0 ? (
          <p className="text-muted">No favorites yet. Search and add cities!</p>
        ) : (
          <ListGroup variant="flush">
            {favorites.map((fav) => (
              <ListGroup.Item 
                key={fav.cityName} 
                className="d-flex justify-content-between align-items-center mb-2"
                style={{ 
                  background: 'rgba(255, 255, 255, 0.1)', 
                  border: 'none',
                  borderRadius: '10px',
                  cursor: 'pointer',
                  transition: 'all 0.3s'
                }}
                onMouseEnter={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.2)'}
                onMouseLeave={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.1)'}
              >
                <span onClick={() => onSelectFavorite(fav)}>
                  {fav.cityName}, {fav.country}
                </span>
                <Button 
                  variant="outline-danger"
                  size="sm"
                  onClick={() => onRemoveFavorite(fav.cityName)}
                >
                  ×
                </Button>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Card.Body>
    </Card>
  );
};

export default FavoritesList;