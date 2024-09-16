import React, { useState, useEffect } from 'react';
import '../styles/Scoreboard.scss'; // Assuming you have a related SCSS file for styling

const Scoreboard = ({ goToMainMenu }) => {
  const [activeTab, setActiveTab] = useState('cumulative');
  const [scores, setScores] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchScores();
  }, [activeTab]);

  const fetchScores = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/scoreboard/${activeTab}`);
      const data = await response.json();
      setScores(data);
    } catch (error) {
      console.error('Error fetching scores:', error);
    }
    setLoading(false);
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const renderCrown = (index) => {
    return index === 0 ? <span className="crown">👑</span> : null;
  };

  return (
    <div className="scoreboard-container">
      <h1>Scoreboard</h1>
      <div className="tabs">
        <button
          className={activeTab === 'cumulative' ? 'active' : ''}
          onClick={() => handleTabClick('cumulative')}
        >
          All Around Parakeet Crown
        </button>
        <button
          className={activeTab === 'biggestFish' ? 'active' : ''}
          onClick={() => handleTabClick('biggestFish')}
        >
          Biggest Fish
        </button>
        <button
          className={activeTab === 'bestShred' ? 'active' : ''}
          onClick={() => handleTabClick('bestShred')}
        >
          Best Shred
        </button>
      </div>

      {loading ? (
        <p>Loading scores...</p>
      ) : (
        <div className="score-list">
          {scores.length === 0 ? (
            <p>No scores available.</p>
          ) : (
            <ul>
              {scores.map((score, index) => (
                <li key={score.user_id}>
                  {renderCrown(index)}
                  <span
                    className="parakeet-icon"
                    style={{ backgroundColor: score.bird_color }}
                  />
                  <span className="username">{score.username}</span>
                  <span className="score">
                    {activeTab === 'cumulative'
                      ? score.total_score
                      : activeTab === 'biggestFish'
                      ? score.scaled_fish_score
                      : score.max_surf_score}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      <button className="main-menu-button" onClick={goToMainMenu}>
        Main Menu
      </button>
    </div>
  );
};

export default Scoreboard;
