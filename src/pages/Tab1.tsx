import { IonButton,IonInput, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonToast, useIonToast } from '@ionic/react';
import { globe } from 'ionicons/icons';
import React,{useState,useEffect} from 'react';
import './Tab1.css';

const Tab1: React.FC = () => {
  const [email,setEmail]=useState<any>([]);
  const [motdepasse,setMotdepasse]=useState<any>([]);
  const [token,setToken] = useState<any | null>(null);
  const [toast] = useIonToast();

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
      //IonToast(result)
      setToken(result);
      if (result.status == 500) {  
     //   IonToast("utilisateur does not exist");
     toast ({
      message :"Utilisareur inexistant ",
      duration :1500,
      icon: globe,
    })
      } else{
        console.log(result.token)
        sessionStorage.setItem('token',result.token);  
        sessionStorage.setItem('iduser',result.utilisateurid);  
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