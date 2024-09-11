const React = require("react");
const Def = require("./default");

function edit_form(data) {
  return (
    <Def>
      <main>
        <h1>Edit Pet</h1>
        <form method="POST" action={`/pets/${data.pet.id}?_method=PUT`}>
          <div className="row">
            <div className="form-group col-sm-6">
              <label htmlFor="name">Pet Name</label>
              <input
                className="form-control"
                id="name"
                name="name"
                value={data.pet.name}
                required
              />
            </div>
            <div className="form-group col-sm-6">
              <label htmlFor="pic">Pet Picture</label>
              <input
                className="form-control"
                id="pic"
                name="pic"
                value={data.pet.pic}
              />
            </div>
          </div>
          <div className="row">
            <div className="form-group col-sm-4">
              <label htmlFor="age">Age</label>
              <input
                className="form-control"
                id="age"
                name="age"
                value={data.pet.age}
              />
            </div>
            <div className="form-group col-sm-4">
              <label htmlFor="weight">Weight</label>
              <input
                className="form-control"
                id="weight"
                name="weight"
                value={data.pet.weight}
              />
            </div>
          </div>
          <input className="btn btn-primary" type="submit" value="Update Pet" />
        </form>
      </main>
    </Def>
  );
}

module.exports = edit_form;
