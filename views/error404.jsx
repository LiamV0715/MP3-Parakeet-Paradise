const React = require('react')
const Def = require('./default')

function error404 () {
    return (
        <Def>
            <main>
                <h1>404: Page not found</h1>
                <p>Sorry, page not found! I am new to coding :(</p>
                <img src="https://images.unsplash.com/photo-1522632449199-ffbe5b931b03?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c2FkJTIwY2F0fGVufDB8fDB8fHww" alt="Cat that is very sorry he can't find your page"/>
            </main>
        </Def>
    )
}

module.exports = error404