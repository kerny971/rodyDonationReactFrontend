import React from  'react'
import { Link } from 'react-router-dom'

export default class Home extends React.Component {

    render () {
        return (
            <main className='container'>
                <h1 align="center">
                    Bienvenue mon poto !
                </h1>

                <div align="center">
                    <p>
                        Voilà mon poto, je me suis un peu fais chier à dev se site mais j'sais pas trop koi mettre comme contenu. du coup je me suis dis si t mon poto tu me fait un don d'au moins 1 € pour me donner <strong>LA FORCE</strong> !
                    </p>
                    <h3><Link to={"/donation/stripe"}>Faire un don</Link></h3>
                </div>
            </main>
        )
    }

}