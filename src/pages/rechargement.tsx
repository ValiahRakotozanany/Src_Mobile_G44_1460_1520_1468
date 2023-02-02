import { IonButton,IonInput, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useEffect, useState } from 'react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab2.css';

const Rechargement: React.FC = () => {
  const [montant,setMontant]=useState<any>([]);
  const [user,setUser]=useState<any>([]);
  var util={
    "montant":montant,
    "datetime":"2023-01-23T09:30:00.000",
    "utilisateur":user,
    "etat":0
  }
  const redirectioninscrit = () => {
    window.location.replace("/inscription");
  }
  const [tok, setTok] = useState<any>([]);
  const redirectionacceuil = () => {
    setTok(sessionStorage.getItem('token'))
    console.log(tok);
    const url = "http://localhost:8082/Enchere/Mouvement";
        fetch(url, {
          method: "POST",
          headers: { 'Accept':'application/json',
          'Access-Control-Allow-Origin': '*',
          'Content-Type':'application/json',
          'token' :tok},
          body: JSON.stringify(util)
      })
      .then(res=>res.json())
      .then((result)=>{
      alert(result)
      if (result.status == 500) {  
        alert("Ressayer s'il vous plait ");
      } else{
        console.log(result)
        alert("Demande de rechargement envoyé ✅")        
      }
    })
  }
  useEffect(()=>{
    console.log("shhhh");
    console.log(sessionStorage.getItem('token'));  
    setUser(sessionStorage.getItem('iduser'));
    
  },[])
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Rechargement</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Rechargement</IonTitle>
          </IonToolbar>
        </IonHeader>
        Montant :<IonInput type="text" onIonChange={(e : any)=>{setMontant(e.target.value)}} clearOnEdit={true} placeholder="Montant"></IonInput>        
        <IonButton type="submit" onClick={()=>redirectionacceuil()} shape="round" expand="block" color="success">Recharger</IonButton>

      </IonContent>
    </IonPage>
  );
};

export default Rechargement;
