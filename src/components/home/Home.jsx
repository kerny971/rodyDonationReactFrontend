import React from  'react'
import { Link } from 'react-router-dom'

export default class Home extends React.Component {

    render () {
        return (
            <main className='container' style={{ padding: "1em" }}>
                <p style={{ fontSize: "2em" }}>
                    Bienvenue cher utilisateur !
                </p>

                <div>
                    <p style={{ fontSize: "0.9em" }}>
                        Ami utilisateur, je me suis amusé à developper ce site ! je me suis dis : "je vais faire un site en React pour recevoir des paiements avec Stripe" ! En vrai je vend rien de spécial mais ce site à pour but de mettre en avant mes skills dans le développement informatique.<br/>
                        Avec ce site, tu as la possibilitée de faire un paiement avec ta carte bleue et utilisant potentiellement l'authentification 3DSecure. 
                        Ce site me servira surtout de test et me permettra de mieux appréhender le fonctionnement en production des systèmes de paiement en ligne.
                        <br/><br/>
                        Si tu souhaite soutenir mes recherches, tu peux faire un don au lien ci-dessous.
                        Tout montant dérisoire ou tentative de fraude seront annulée ! Aucune carte bleue n'est enregistrée sauf les transactions aux systèmes de paiement.
                    </p>
                <Link to={"/donation/stripe"}>Faire un don</Link>
                </div>
            </main>
        )
    }

}