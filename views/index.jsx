const React = require("react");
const Def = require("./default");

function index(data) {
  let petsFormatted = data.pets.map((pet) => {
    return (
      <div className="col-sm-6" style={{
        listStyleType: "none"
      }}>
        <li key={index}>
          <a href={`/pets/${pet._id}`}>{pet.name}</a>
        </li>
        <img src={pet.pic} alt={pet.name}></img>
        <p className="text-center">{pet.age} years old</p>
        <p className="text-center">{pet.weight} lbs</p>
      </div>
    );
  });
  return (
    <Def>
      <main>
        <h1>We got pets!</h1>
        <div className="row">{petsFormatted}</div>
      </main>
    </Def>
  );
}

module.exports = index;
