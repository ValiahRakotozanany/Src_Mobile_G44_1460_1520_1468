import { IonFab, IonFabButton, IonIcon, IonGrid, IonRow, IonCol, IonImg, IonActionSheet,IonList,IonItem,IonSelect,IonSelectOption,IonButton,IonInput, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './Tab1.css';
import { supAll, supPhoto, usePhotoGallery } from '../hooks/usePhotoGallery';
import { camera, closeCircleOutline } from 'ionicons/icons';
import React,{useState,useEffect} from 'react';

const Inserionenchere: React.FC = () => {
    const { photos, takePhoto, __photo } = usePhotoGallery();
    const [enchere,setEnchere]=useState<any>([]);
    const [idproduit,setIdproduit]=useState<any>([]);
    const [description,setDescription]=useState<any>([]);
    const [prixminimal,setPrixminimal]=useState<any>([]);
    const [dure,setDurre]=useState<any>([]);
    const [datetime,setDatetime]=useState<any>([]);
    const [photo1,setPhoto1]=useState<any>([]);
    var [ph, setPh] = useState(__photo);
    ph = __photo;
    function supPh(id: String) {
        var __ph = supPhoto(id);
        setPh(__ph);
    }
    const ajouter = () =>{
    var encher={
        'produit' : ''+idproduit+'',
        'description' : ''+description+'',
        'prixminimal' :''+prixminimal+'',
        'datetime' : ''+datetime+':00',
        'durree' : ''+dure+':00',
        'utilisateur' : ''+sessionStorage.getItem("idutilisateur")+'',
        'etat' : 0
      }
      var url = "http://localhost:8082/utilisateur/insertenchere/"+sessionStorage.getItem("token");
        fetch(url, {
          method: "POST",
          headers: {"Content-type": "application/json"},
          body: JSON.stringify(encher)
        }).then(response =>{
          return response.json();
        } )
        .then((data) =>{
          setEnchere(data.data.id);
        });

        
      var url1="";
      for (let index = 0; index < __photo.length; index++) {
        let bodyphoto={
          'base64' : ''+__photo[index][0]+'',
          'idenchere' : '1'
        }
        url1 = "http://localhost:8082/Enchere/photo/"+sessionStorage.getItem("token");
        fetch(url1, {
          method: "POST",
          headers: {"Content-type": "application/json"},
          body: JSON.stringify(bodyphoto)
        })
      }
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
          <IonRow>
                        {ph.map((p) => (
                            <IonCol size="6" >
                                <IonIcon icon={closeCircleOutline} onClick={() => supPh(p[1])}>{p[1]}</IonIcon>
                                <IonImg src={p[0] + ""} />
                            </IonCol>
                        ))}
                    </IonRow>
          <div className="ion-text-center">
              Ajout photo(s)
              <IonButton onClick={() => takePhoto()}>
                  <IonIcon icon={camera}></IonIcon>
              </IonButton>
          </div>
        </IonContent>
      </IonPage>
    );
};

export default Inserionenchere;