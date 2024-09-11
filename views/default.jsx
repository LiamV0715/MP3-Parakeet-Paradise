const React = require('react')

function Def (html) {
    return (
        <html>
            <head>
                <title>Pet Time!</title>
                <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css" integrity="sha384-B0vP5xmATw1+K9KRQjQERJvTumQW0nPEzvF6L/Z6nronJ3oUOFUFpCjEUQouq2+l" crossOrigin="anonymous" />
                <link rel="stylesheet" href="/css/style.css"/>
                <link rel="manifest" href="/site.webmanifest"></link>
            </head>
            <body style={{
                margin: "auto",
                padding: "5px"
            }}>
                <nav>
                    <ul>
                        <li>
                            <a href="/">Home</a>
                        </li>
                        <li>
                            <a href="/pets">Pets</a>
                        </li>
                        <li>
                            <a href="/pets/new">Add a Pet!</a>
                        </li>
                    </ul>
                </nav>
                {html.children}
            </body>
        </html>
    )
}

module.exports = Def