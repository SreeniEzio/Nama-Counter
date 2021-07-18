import { IonButton, IonIcon, IonGrid, IonLabel, IonRow, IonCol, IonRange } from "@ionic/react";
import { playOutline, pause } from "ionicons/icons";
import { useEffect, useState } from "react";
import "./Recite.css";
//@ts-ignore
import snipe from "../assets/test.webm";

interface Entry {
    id: number;
    date: string;
    count: number;
  }

const Recite: React.FC = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [count, setCount] = useState<number>(0);
    const [speed, setSpeed] = useState(1);

    const url = "http://localhost:3000/items";
    
    //const url = "https://assets.coderrocketfuel.com/pomodoro-times-up.mp3";
    //const url = snipe;

        
    useEffect(() => {
        const audio = new Audio(snipe);
        audio.playbackRate = speed;
        audio.onended = () => {setCount(count+1);}
        if(isPlaying){
            const play = audio.play();
        }
    }, [isPlaying, count]);

    const isExisting = async (data: { date: string, count: number }) => {
        const response = await fetch(url);
        const log = await response.json();
        const existingData: Entry = log.filter((item: Entry) => {return item.date === data.date})[0];
        
        if(!existingData){
            return false;
        }
        data.count += existingData.count;
        try {
            const response = await fetch(url + '/' + existingData.id.toString(), {
              body: JSON.stringify(data),
              headers: {
                "Content-Type": "application/json",
              },
              method: "PUT",
            })
            if (!response.ok) {
              throw Error(response.statusText)
            }
            const json = await response.json();
          } catch (error) {
            console.error(error.message);
          }
        return true;
    }
    
    const toggle: any = () => {setIsPlaying(!isPlaying)};

    const saveCount = async () => {
        const date = new Date();
        const keyDate = date.getDate().toString() + '-' + (date.getMonth()+1).toString() + '-' + date.getFullYear().toString();
        
        const data = {date: keyDate, count: count};
        
        if(isExisting(data)){
            return;
        }
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
    }
    

    return (
        <IonGrid>
            <IonRow className="ion-margin-top">
                <IonCol>
                    <IonRange name="Speed" step={0.1} min={1} max={3} color="secondary" onIonChange={(e) => {
                        setSpeed(e.detail.value as number);
                    }}>
                        <IonLabel slot="start" className="small-font">Slow</IonLabel>
                        <IonLabel slot="end" className="small-font">Fast</IonLabel>
                    </IonRange>
                </IonCol>
            </IonRow>
            <IonRow className="ion-justify-content-center ion-padding-bottom big-font">
                <IonCol size="auto">
                    <IonLabel position="fixed">{count}</IonLabel>
                </IonCol>

            </IonRow>

            <IonRow className="ion-justify-content-center">
                <IonCol size="auto" className="ion-padding">
                    <IonButton color="warning" onClick={saveCount}>Save Count</IonButton>
                </IonCol>
                <IonCol size="auto" className="ion-padding">
                    <IonButton size="default"
                        fill="solid"
                        color={isPlaying ? "warning" : "success" } 
                        onClick={toggle}>
                        <IonIcon slot="start" icon={isPlaying ? pause : playOutline} />
                        {isPlaying ? "Pause" : "Play"}
                    </IonButton>
                    
                    
                </IonCol>
            </IonRow>
        </IonGrid>


    );
};

export default Recite;
