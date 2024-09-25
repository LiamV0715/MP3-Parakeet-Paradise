import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext"; // Adjust the path as needed

const Scoreboard = () => {
  const { fishScores, surfScores } = useContext(AuthContext); // Use useContext to access AuthContext

  console.log("Rendering Scoreboard", { fishScores, surfScores });

  return (
    <div>
      <h2>Fish Scores</h2>
      <ul>
        {fishScores.length > 0 ? (
          fishScores.map((data) => (
            <li key={data._id}>
              {data.user.username}: {data.fishWeight} lbs {/* Display username and fish weight */}
            </li>
          ))
        ) : (
          <li>No fish scores available</li>
        )}
      </ul>

      <h2>Surf Scores</h2>
      <ul>
        {surfScores.length > 0 ? (
          surfScores.map((data) => (
            <li key={data._id}>
              {data.user.username}: {data.stylePoints} style points {/* Display username and style points */}
            </li>
          ))
        ) : (
          <li>No surf scores available</li>
        )}
      </ul>
    </div>
  );
};

export default Scoreboard;
