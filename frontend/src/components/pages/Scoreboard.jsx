import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext"; // Adjust the path as needed
import scoreBack from "../../assets/videos/ScoreboardBack.gif";

const Scoreboard = () => {
  const { fishScores, surfScores } = useContext(AuthContext); // Use useContext to access AuthContext

  // Helper function to combine and sum fish and surf scores
  const combineScores = () => {
    const combined = {};

    // Process fishScores and add them to the combined object
    fishScores.forEach((fish) => {
      const username = fish.user.username;
      if (!combined[username]) {
        combined[username] = { fishWeight: 0, stylePoints: 0 };
      }
      combined[username].fishWeight = fish.fishWeight;
    });

    // Process surfScores and add them to the combined object
    surfScores.forEach((surf) => {
      const username = surf.user.username;
      if (!combined[username]) {
        combined[username] = { fishWeight: 0, stylePoints: 0 };
      }
      combined[username].stylePoints = surf.stylePoints;
    });

    return Object.entries(combined).map(([username, scores]) => ({
      username,
      totalScore: scores.fishWeight + scores.stylePoints,
    }));
  };

  const combinedScores = combineScores(); // Get combined score data

  console.log("Rendering Scoreboard", { fishScores, surfScores, combinedScores });

  return (
    <div className="scoreboard">
      <img src={scoreBack} alt="Fish Animation" className="scoreBack" />
      <div className="zpop4">
        {/* Fish Scores */}
        <h2>Fish Scores</h2>
        <ul>
          {fishScores.length > 0 ? (
            fishScores.map((data) => (
              <li key={data._id}>
                {data.user.username}: {data.fishWeight} lbs
              </li>
            ))
          ) : (
            <li>No fish scores available</li>
          )}
        </ul>

        {/* Surf Scores */}
        <h2>Surf Scores</h2>
        <ul>
          {surfScores.length > 0 ? (
            surfScores.map((data) => (
              <li key={data._id}>
                {data.user.username}: {data.stylePoints} style points
              </li>
            ))
          ) : (
            <li>No surf scores available</li>
          )}
        </ul>

        {/* Combined Scores */}
        <h2>All Around Parakeet Crown</h2>
        <ul>
          {combinedScores.length > 0 ? (
            combinedScores.map((data, index) => (
              <li key={index}>
                {data.username}: {data.totalScore} total points
              </li>
            ))
          ) : (
            <li>No combined scores available</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Scoreboard;
