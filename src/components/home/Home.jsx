import React from  'react'
import { Link } from 'react-router-dom'

export default class Home extends React.Component {

    render () {
        return (
            <main className='container' style={{ padding: "2em 1.5em" }}>
                <p style={{ fontSize: "1.4em" }}>
                    Bienvenue !
                </p>

                <div>
                    <p style={{ fontSize: "0.9em" }}>
                        Je me suis amusé à developper ce site ! je me suis dis : "je vais faire un site en React pour recevoir des paiements avec Stripe" ! En vrai je vend rien de spécial mais ce site à pour but de mettre en avant mes skills dans le développement informatique.<br/>
                        Avec ce site, tu as la possibilitée de faire un paiement avec ta carte bleue qui utilisera une potentielle authentification 3DSecure. 
                        Ce site me servira surtout de test afin de mieux appréhender le fonctionnement en production des systèmes de paiement en ligne.
                        <br/><br/>
                        Si tu souhaite soutenir mes recherches, tu peux faire un don au lien ci-dessous.
                        Tout montant dérisoire ou tentative de fraude seront annulée ! Aucune carte bleue n'est enregistrée sauf les transactions aux systèmes de paiement.
                    </p>
                <Link to={"/donation/stripe"} role="button" className='outline'>Faire un don</Link>
                <a href="https://github.com/kerny971/rodyDonationReactFrontend" target='_blank' rel="noreferrer" style={{margin: "0 0.6em"}} role="button" className='secondary'>Dépot Github</a>
                </div>
            </main>
        )
    }

}