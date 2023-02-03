import { IonList,IonItem,IonSelect,IonSelectOption,IonButton,IonInput, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonRow, IonCol, IonIcon, IonImg } from '@ionic/react';
import './Tab1.css';
import React,{useState,useEffect} from 'react';
import { supPhoto, usePhotoGallery } from '../components/hooks/usePhotoGallery';
import { camera, closeCircleOutline } from 'ionicons/icons';

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
        'dure' : ''+dure+''
      }
      
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
            "produit":{"id":  ''+idproduit+'',              
          }, "enchere":{"description":''+description+'',
          "prixminimal":''+prixminimal+'',
          "durree":''+dure+':00',
          "utilisateur":{
              "id":sessionStorage.getItem('iduser')
          },
          "produit":{
              "id" :''+idproduit+''
          },
          "etat":0          
          }
          })

      }).then(response =>{
       return response.json();
      } )
      .then((data) =>{
        console.log(data.data.id)
        setEnchere(data.data.id);
      });
   
    console.log(enchere);
    var url1="";
    console.log( __photo.length);
    console.log(" id enchere = "+enchere)
      for (let index = 0; index < __photo.length; index++) {
        let bodyphoto={
          'base64' : ''+__photo[index][0]+'',
          'idenchere' : ''+enchere+''
        }
        url1 = "http://localhost:8082/Enchere/photo";
        fetch(url1, {
          method: "POST",
          headers:{
            'Accept':'application/json',
            'Access-Control-Allow-Origin': '*',
            'Content-Type':'application/json',
            'token' :tok
          } ,
          body: JSON.stringify(bodyphoto)
        })
      } }
    
useEffect(()=>{
  console.log("shhhh");
  alert(__photo.length);
  console.log(sessionStorage.getItem('token')); 
  setTok(sessionStorage.getItem('token')) 
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