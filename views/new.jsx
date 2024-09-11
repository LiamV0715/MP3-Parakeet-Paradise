const React = require("react");
const Default = require("./default");

function New() {
  return (
    <Default>
      <h2>Add a new pet!</h2>
      <form action="/pets/" method="POST" style={{
        marginLeft: "20%",
        marginRight: "20%"
      }}>
        <label htmlFor="name">Name</label>
        <input type="text" name="name" id="name" required/>
        <label htmlFor="pic">Image</label>
        <input type="text" name="pic" id="pic" />
        <label htmlFor="weight">Weight</label>
        <input type="text" name="weight" id="weight" />
        <label htmlFor="age">Age</label>
        <input type="text" name="age" id="age" />
        <input type="submit" />
      </form>
      <div className="backButton">
        <a href="/pets">
          <button>Go back to pet index</button>
        </a>
      </div>
    </Default>
  );
}

module.exports = New;
