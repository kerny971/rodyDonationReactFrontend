import React from "react"

export function NotFound () {
    return (
        <main className="container" align="center">
            <h1>Cette page n'existe pas</h1>
            <a href="/" role="button" className="secondary outline">Retourner à l'accueil</a>
        </main>
    )
}