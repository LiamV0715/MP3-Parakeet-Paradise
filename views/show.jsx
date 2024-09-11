const React = require("react");
const Def = require("./default");

function show({ pet }) {
  let comments = <h3 className="inactive">No comments yet!</h3>;

  if (pet.comments && pet.comments.length) {
    comments = pet.comments.map((c) => {
      return (
        <div className="border col-sm-4" key={c._id}>
          <h4>{c.content}</h4>
          <h3>
            <strong>- {c.author}</strong>
          </h3>
          <form
            method="POST"
            action={`/pets/${pet._id}/comment/${c._id}?_method=DELETE`}
          >
            <input
              type="submit"
              className="btn btn-danger"
              value="Delete Comment"
            />
          </form>
        </div>
      );
    });
  }

  return (
    <Def>
      <main>
        <div className="row">
          <div className="col-sm-6">
            <img src={pet.pic} alt={pet.name} />
            <h1>{pet.name}</h1>
          </div>
          <div className="col-sm-6">
            <h3>{pet.showEstablished()}</h3>
            <br />
            <a href={`/pets/${pet._id}/edit`} className="btn btn-success">
              Edit
            </a>
            {` `}
            <form method="POST" action={`/pets/${pet._id}?_method=DELETE`}>
              <button type="submit" className="btn btn-danger">
                Delete
              </button>
            </form>
          </div>
        </div>
        <hr />
        <h2>Comments</h2>
        <div className="row">{comments}</div>
        <hr />
        <h2>Want to leave a comment? (They love compliments!)</h2>
        <form action={`/pets/${pet._id}/comment`} method="POST">
          <div className="row">
            <div className="form-group col-sm-12">
              <label htmlFor="content">Content</label>
              <textarea
                id="content"
                name="content"
                className="form-control"
              ></textarea>
            </div>
          </div>
          <div className="row">
            <div className="form-group col-sm-4">
              <label htmlFor="author">Author</label>
              <input id="author" name="author" className="form-control" />
            </div>
            <div className="form-group col-sm-2"></div>
          </div>
          <input
            type="submit"
            className="btn btn-primary"
            value="Add Comment"
          />
        </form>
      </main>
    </Def>
  );
}

module.exports = show;
