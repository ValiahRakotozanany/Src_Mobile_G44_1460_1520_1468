import { IonButton,IonInput, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonTab, IonTabBar, IonList, IonCol } from '@ionic/react';
import './Tab1.css';
import React,{useState,useEffect} from 'react';
import { useParams } from 'react-router';

const HistoriqueDetails: React.FC = () => {
   
  const [historique,setHistorique] =useState([]);  
  const [tok, setTok] = useState<any>();
  const {idenchere} = useParams<{ idenchere: any}>();
  const utilisateur = sessionStorage.getItem('iduser');
  console.log(tok+" tookkkk");
  const submit = () =>{
      //   console.log(thijgds.state.email+" "+this.state.password);        
       //  console.log(this.state.email);
      /*   log.append("email",this.state.email);
         log.append("motdepasse",this.state.password);
         console.log(log.get("email"));*/
         console.log("hhh");          
         fetch("http://localhost:8082/Enchere/"+idenchere+"/detailsenchere",
         {
          
             method:"GET",
             headers : { 'Accept':'application/json',
             'Access-Control-Allow-Origin': '*',
             'Content-Type':'application/json',
             'token':''+sessionStorage.getItem('token')
            },
              
           } ) 
           .then((res)=>{ return res.json()})
           .then((resultat)=>{              
              console.log(resultat.data+" mety");
              setHistorique(resultat.data);
          //  navigate ("/insertMise/"+idenchere);              
           });
           }
           useEffect(()=>{
            setTok(sessionStorage.getItem('token')) ;
              console.log(tok);
              console.log("tokeeen = "+sessionStorage.getItem('token')+" <= token");                
              console.log(historique+" iooo");
              submit();
              
          },[])
      
     
    const logout = () => {
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('iduser');
      window.location.replace("/Tab1")
  }
    
    const redirection = () => {
        window.location.replace("/detailsEnchere/"+idenchere)
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
          {historique.map((critere:any) => (
              <IonList>
                <IonCol> Desription : {critere.description}</IonCol>
                <IonCol> {critere.enchere.produit.nom}</IonCol>
                <IonCol> Montant :  {critere.montant}</IonCol>
                <IonCol> Personne : {critere.utilisateur.nom}</IonCol>
                <IonCol> Staut : {critere.etat==0 ?(" Depassé "
                ):(critere.etat==1 &&( " En tête "))}</IonCol>
              </IonList>              
          ))}
          <a href="/insertionenchere">Ajout enchère</a><br></br>
          <a href="/insertionenchere">Mes encheres et leur status </a><br></br>
          <a href="/rechargement">Recharger mon compte </a>
          <IonButton onClick={()=>logout()} >Log out </IonButton>
        </IonContent>
      </IonPage>
    );
};

export default HistoriqueDetails;