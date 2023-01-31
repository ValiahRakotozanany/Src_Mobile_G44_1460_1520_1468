import { IonButton,IonInput, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React,{useState,useEffect} from 'react';
import './Tab1.css';

const Tab1: React.FC = () => {
  const [email,setEmail]=useState<any>([]);
  const [motdepasse,setMotdepasse]=useState<any>([]);
  const [token,setToken] = useState<any | null>(null)
  var util={
    'email' :''+email+'',
    'motdepasse' : ''+motdepasse+'',
  }
  const redirectioninscrit = () => {
    window.location.replace("/inscription");
  }
  const redirectionacceuil = () => {
    const url = "http://localhost:8082/utilisateur/login";
        fetch(url, {
          method: "POST",
          headers: {"Content-type": "application/json"},
          body: JSON.stringify(util)
      })
      .then(res=>res.json())
      .then((result)=>{
      alert(result)
      setToken(result);
      if (result.status == 500) {  
        alert("utilisateur does not exist");
      } else{
        sessionStorage.setItem('token',result.token);  
        //window.location.replace('/listevehicule');
        window.location.replace("/acceuil");
      }
    })
  }
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Login enchère</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Login enchère</IonTitle>
          </IonToolbar>
        </IonHeader>
        email:<IonInput type="text" onIonChange={(e : any)=>{setEmail(e.target.value)}} clearOnEdit={true} placeholder="email"></IonInput>
        Mot de passe:<IonInput type="password" onIonChange={(e : any)=>{setMotdepasse(e.target.value)}} clearOnEdit={true} placeholder="Mot de passe"></IonInput>
        <IonButton onClick={()=>redirectionacceuil()} shape="round" expand="block" >Log in</IonButton>
        <p><IonButton type="submit" onClick={()=>redirectioninscrit()} shape="round" expand="block" color="success">inscription</IonButton></p>

      </IonContent>
    </IonPage>
  );
};

export default Tab1;