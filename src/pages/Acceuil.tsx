import { IonButton,IonInput, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './Tab1.css';
import React,{useState,useEffect} from 'react';

const Acceuil: React.FC = () => {
    const [nom,setNom]=useState<any>([]);
    const [prenom,setPrenom]=useState<any>([]);
    const [email,setEmail]=useState<any>([]);
    const [motdepasse,setMotdepasse]=useState<any>([]);
    const inscrit = () =>{
        alert(nom+" "+prenom+" "+email+" "+motdepasse);
        redirection();
    }
    
    const redirection = () => {
        window.location.replace("/Tab1")
    }
    
    const logout = () => {
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('iduser');
      window.location.replace("/Tab1")
  }
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Acceuil</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent fullscreen>
          <IonHeader collapse="condense">
            <IonToolbar>
              <IonTitle size="large">Acceuil</IonTitle>
            </IonToolbar>
          </IonHeader>
          <a href="/insertionenchere">Ajout enchère</a><br></br>
          <a href="/historique">Mes encheres et leur status </a><br></br>
          <a href="/rechargement">Recharger mon compte </a><br></br>
          <IonButton onClick={()=>logout()} >Log out </IonButton>
        </IonContent>
      </IonPage>
    );
};

export default Acceuil;