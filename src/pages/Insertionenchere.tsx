import { IonList,IonItem,IonSelect,IonSelectOption,IonButton,IonInput, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './Tab1.css';
import React,{useState,useEffect} from 'react';

const Inserionenchere: React.FC = () => {
    const [idproduit,setIdproduit]=useState<any>([]);
    const [description,setDescription]=useState<any>([]);
    const [prixminimal,setPrixminimal]=useState<any>([]);
    const [dure,setDurre]=useState<any>([]);
    const [datetime,setDatetime]=useState<any>([]);

  const [detail, setDetail] = useState<any>([]);
  const getdetail = () => {
  const url1 = "http://localhost:8082/produit";
  fetch(url1, {
    method: "get",
    headers: { "Content-type": "application/json" },
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      //window.location.replace('/Tab1/'+id);
      console.log(data);
      setDetail(data);
    });
};
const [tok, setTok] = useState<any>([]);

    const ajouter = () =>{
      alert(idproduit+" "+description+" "+prixminimal+" "+datetime+" "+dure);
      var encher={
        'idproduit' : ''+idproduit+'',
        'description' : ''+description+'',
        'prixminimal' :''+prixminimal+'',
        'datetime' : ''+datetime+'',
        'dure' : ''+dure+''
      }
      
  setTok(sessionStorage.getItem('token'))
  alert(tok);
      const url = "http://localhost:8082/Enchere/Enchere";
        fetch(url, {
          method: "POST",
          headers  : {
            'Accept':'application/json',
            'Access-Control-Allow-Origin': '*',
            'Content-Type':'application/json',
            'token' :tok
          } ,                  
          body: JSON.stringify({
            encher,
            
          })

      })
    }
    
useEffect(()=>{
  console.log("shhhh");
  console.log(sessionStorage.getItem('token'));  

  getdetail();
},[])

    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Ajout enchère</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent fullscreen>
          <IonHeader collapse="condense">
            <IonToolbar>
              <IonTitle size="large">Ajout enchère</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonList>
          <IonItem>
          <IonSelect  onIonChange={(e)=>setIdproduit(e.target.value)} >
                {detail.map((critere: any) => (
                  <IonSelectOption key={critere.id} value={critere.id}>
                    {critere.nom} 
                  </IonSelectOption>
                ))}
              </IonSelect>           
              </IonItem>
          </IonList>
          Description:<IonInput type="text" onIonChange={(e : any)=>{setDescription(e.target.value)}} clearOnEdit={true} placeholder="Description"></IonInput>
          prixminimal<IonInput type="number" onIonChange={(e : any)=>{setPrixminimal(e.target.value)}} clearOnEdit={true} placeholder="prixminimal"></IonInput>
          durre<IonInput type="time" onIonChange={(e : any)=>{setDurre(e.target.value)}} clearOnEdit={true} placeholder="durre"></IonInput>
          <IonButton onClick={()=>ajouter()}>ajouter</IonButton>
        </IonContent>
      </IonPage>
    );
};

export default Inserionenchere;