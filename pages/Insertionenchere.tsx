import { IonList,IonItem,IonSelect,IonSelectOption,IonButton,IonInput, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './Tab1.css';
import React,{useState,useEffect} from 'react';

const Inserionenchere: React.FC = () => {
    const [idproduit,setIdproduit]=useState<any>([]);
    const [description,setDescription]=useState<any>([]);
    const [prixminimal,setPrixminimal]=useState<any>([]);
    const [dure,setDurre]=useState<any>([]);
    const [datetime,setDatetime]=useState<any>([]);
    const ajouter = () =>{
      alert(idproduit+" "+description+" "+prixminimal+" "+datetime+" "+dure);
      var encher={
        'idproduit' : ''+idproduit+'',
        'description' : ''+description+'',
        'prixminimal' :''+prixminimal+'',
        'datetime' : ''+datetime+'',
        'dure' : ''+dure+''
      }
      sessionStorage.getItem("token")
      const url = "http://localhost:8082/Enchere/Enchere"+sessionStorage.getItem("token");
        fetch(url, {
          method: "POST",
          headers: {"Content-type": "application/json"},
          body: JSON.stringify(encher)
      })
    }
    
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
              <IonSelect interface="action-sheet" placeholder="select produit" onIonChange={(e : any)=>{setIdproduit(e.target.value)}} >
                <IonSelectOption value="1">rano</IonSelectOption>
                <IonSelectOption value="2">tany</IonSelectOption>
              </IonSelect>
            </IonItem>
          </IonList>
          Description:<IonInput type="text" onIonChange={(e : any)=>{setDescription(e.target.value)}} clearOnEdit={true} placeholder="Description"></IonInput>
          prixminimal<IonInput type="number" onIonChange={(e : any)=>{setPrixminimal(e.target.value)}} clearOnEdit={true} placeholder="prixminimal"></IonInput>
          durre<IonInput type="time" onIonChange={(e : any)=>{setDurre(e.target.value)}} clearOnEdit={true} placeholder="durre"></IonInput>
          datetime:<IonInput type="datetime-local" onIonChange={(e : any)=>{setDatetime(e.target.value)}} clearOnEdit={true} placeholder="datetime"></IonInput>
          <IonButton onClick={()=>ajouter()}>ajouter</IonButton>
        </IonContent>
      </IonPage>
    );
};

export default Inserionenchere;