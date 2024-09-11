const React = require("react");
const Default = require("./default");

const sections = [
  {
    title: "ABOUT US",
    text: `
      We want to create a space for everyone to share their pets! We all know that they're
      our friends, family and our responsibility, but now they can be a content creator too!
      Feel free to post your pets and leave compliments on everyone elses! :))
    `,
  },
  {
    title: "How the Website Works!",
    text: `
      This javascript website runs on React through nodemon onto localhost:3000. It utilizes 
      Mongoose to access our Mongo database of pets and comments through a URI!
    `,
  },
];

function home() {
  return (
    <Default>
      <main
        style={{
          padding: "30px",

          display: "flex",
          flexDirection: "column",
          textAlign: "center",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "25px",
        }}
      >
        <h1>WELCOME!!!</h1>
        <a href="/pets">Come take a look at our cute pets!!!</a>
        <div
          style={{
            maxWidth: "2000px",
            maxHeight: "1000px",
            border: "1px solid black",
            margin: "2px",
            position: "relative",
            display: "flex",
            flexDirection: "column",
            textAlign: "center",
            alignItems: "center",
            backgroundColor: "rgb(255, 129, 238)",
            border: "solid 2px white",
            justifyContent: "center",
            borderRadius: "25px",
          }}
        >
          <img
            src="https://plus.unsplash.com/premium_photo-1677545183884-421157b2da02?q=80&w=3272&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="A cat laying on a floor"
          />
          Cat by Nathan Anderson on <a href="https://unsplash.com">unsplash</a>
        </div>

        {sections.map((section, index) => (
          <div
            key={index}
            style={{
              maxWidth: "2000px",
              maxHeight: "1000px",
              border: "1px solid black",
              margin: "2px",
              position: "relative",
              display: "inline-block",
              textAlign: "center",
              alignItems: "center",
              backgroundColor: "rgb(255, 129, 238)",
              border: "solid 2px white",
              borderRadius: "25px",
            }}
          >
            <h2>{section.title}</h2>
            <div
              style={{
                marginBottom: "10px",
                border: "1px solid #ccc",
                padding: "10px",
              }}
            >
              <pre>{section.text}</pre>
            </div>
          </div>
        ))}

        <a href="/pets/new">
          <button className="btn-primary">Add Your Own Pet</button>
        </a>
      </main>
    </Default>
  );
}

module.exports = home;
