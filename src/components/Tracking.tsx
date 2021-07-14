import { IonButton, IonCol, IonContent, IonDatetime, IonGrid, IonIcon, IonInput, IonLabel, IonModal, IonRow, IonText } from "@ionic/react";
import { addOutline } from "ionicons/icons";
import { useEffect, useState } from "react";
import "./Tracking.css"

interface Entry {
  id: number;
  date: string;
  count: number;
}

const Tracking: React.FC = () => {
  const [countLog, setCountLog] = useState<Entry[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string>();
  const [selectedCount, setSelectedCount] = useState<number>();
  const [sumCount, setSumCount] = useState<number>(0);

  const url = "http://localhost:3000/items";

  const getCountLog = async () => {
    const response = await fetch(url);
    const data = await response.json();
    setCountLog(data);
    //console.log(data);
  };

  const addCountLog = async () => {
    const data = {date: selectedDate, count: selectedCount}
    try{
      const response = await fetch(url, {
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
        });
        if (!response.ok) {
          throw Error(response.statusText);
        }
        const json = await response.json()
    }catch (error) {
      console.error(error.message);
    }
  };

  const handleAddBtn = () => {
    setShowModal(true);
    
  };

  useEffect(() => {
    getCountLog();
    let sum = 0;
    countLog.map((entry) => {sum += entry.count});
    setSumCount(sum);
  }, []);
  return (
    <IonContent fullscreen>
      <IonRow className="ion-padding ion-justify-content-center large-font">
        <IonLabel >Total : {sumCount}</IonLabel>
      </IonRow>
      <IonModal isOpen={showModal} cssClass="modal-class">
        <div className="ion-margin">
        <IonRow className="ion-padding ion-justify-content-center title-text-font">
          <IonLabel>Add New Entry</IonLabel>
        </IonRow>
        <IonLabel className="text-font">Date:</IonLabel>
        <IonDatetime 
          displayFormat="DD-MM-YYYY" 
          onIonChange={e => setSelectedDate(e.detail.value!)}
          cancelText="Cancel"
          placeholder="Select Date"
          className="date-time ion-padding"/>
        <IonLabel className="text-font">Count:</IonLabel>
        <IonInput
          type="number" 
          value={selectedCount} 
          inputmode="numeric"
          placeholder="Enter Count" 
          onIonChange={e => setSelectedCount(parseInt(e.detail.value!, 10))}
          className="ion-padding count-input" />
        <IonRow className="ion-justify-content-center">
        <IonButton 
          onClick={() => {setShowModal(false);
            setSelectedDate("");
            setSelectedCount(undefined)}}
          color="danger"
          className="ion-padding">Cancel</IonButton>
          <IonButton onClick={() => {addCountLog();
            setShowModal(false);
            setSelectedDate("");
            setSelectedCount(undefined)}} color="success" className="ion-padding">Save</IonButton>
        </IonRow>
        </div>
      </IonModal>


      <IonGrid className="ion-padding">
        <IonRow className="ion-justify-content-end">
          <IonCol size="auto" className="ion-padding">
            <IonButton size="default" fill="solid" color="orange" onClick={handleAddBtn}>
              <IonIcon slot="start" icon={addOutline}></IonIcon>
              Add/Edit
            </IonButton>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol  className="col-border bgcolor ion-text-center text-font">
            <IonText color="secondary">S.No</IonText>
          </IonCol>
          <IonCol  className="col-border bgcolor ion-text-center text-font">
            <IonText color="secondary">Date</IonText>
          </IonCol>
          <IonCol  className="col-border bgcolor ion-text-center text-font">
            <IonText color="secondary">Count</IonText>
          </IonCol>
        </IonRow>
        {
          countLog.map((entry) => {
            return(
              <IonRow key={entry.id}>
                <IonCol className="col-border ion-text-center">
                  {entry.id+1}
                </IonCol>
                <IonCol  className="col-border ion-text-center">
                  {entry.date}
                </IonCol>
                <IonCol className="col-border ion-text-center">
                  {entry.count}
                </IonCol>
              </IonRow>
            );
          })
        }
      </IonGrid>
    </IonContent>
  );
};

export default Tracking;
