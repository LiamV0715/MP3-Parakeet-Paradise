import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext"; // Adjust the path as needed

const Scoreboard = () => {
  const { fishScores, surfScores } = useContext(AuthContext); // Use useContext to access AuthContext
  console.log("Rendering Scoreboard", { fishScores, surfScores });
  return (
    <div>
      <h2>Fish Scores</h2>
      <ul>
        {fishScores.map((user) => (
          <li key={user._id}>
            {user.username}: {user.fishWeight}
          </li>
        ))}
      </ul>

      <h2>Surf Scores</h2>
      <ul>
        {surfScores.map((user) => (
          <li key={user._id}>
            {user.username}: {user.stylePoints}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Scoreboard;
