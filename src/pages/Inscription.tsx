import { IonButton,IonInput, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './Tab1.css';
import React,{useState,useEffect} from 'react';

const Inscription: React.FC = () => {
    const [nom,setNom]=useState<any>([]);
    const [prenom,setPrenom]=useState<any>([]);
    const [email,setEmail]=useState<any>([]);
    const [motdepasse,setMotdepasse]=useState<any>([]);
    var util={
      'nom' : ''+nom+'',
      'prenom' : ''+prenom+'',
      'email' :''+email+'',
      'motdepasse' : ''+motdepasse+'',
    }
    const inscrit = () =>{
      const url = "http://localhost:8082/utilisateur/insertion";
        fetch(url, {
          method: "POST",
          headers: {"Content-type": "application/json"},
          body: JSON.stringify(util)
      })
      redirection();
    }
    const redirection = () => {
        window.location.replace("/Tab1")
    }
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Inscription</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent fullscreen>
          <IonHeader collapse="condense">
            <IonToolbar>
              <IonTitle size="large">Inscription</IonTitle>
            </IonToolbar>
          </IonHeader>
          Nom<IonInput type="text" onIonChange={(e : any)=>{setNom(e.target.value)}} clearOnEdit={true} placeholder="nom"></IonInput>
          Prénom<IonInput type="text" onIonChange={(e : any)=>{setPrenom(e.target.value)}} clearOnEdit={true} placeholder="prénom"></IonInput>
          email<IonInput type="text" onIonChange={(e : any)=>{setEmail(e.target.value)}} clearOnEdit={true} placeholder="email"></IonInput>
          Mot de passe<IonInput type="password" onIonChange={(e : any)=>{setMotdepasse(e.target.value)}} clearOnEdit={true} placeholder="Mot de passe"></IonInput>
          <IonButton onClick={()=>inscrit()} shape="round" expand="block" color="success">Inserer</IonButton>
        </IonContent>
      </IonPage>
    );
};

export default Inscription;