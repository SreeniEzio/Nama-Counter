import { IonButton, IonIcon, IonGrid, IonLabel, IonRow, IonCol, IonRange } from "@ionic/react";
import { playOutline, pause } from "ionicons/icons";
import { useEffect, useState } from "react";
import "./Recite.css";
//@ts-ignore
import snipe from "../assets/test.webm";


const Recite: React.FC = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [count, setCount] = useState<number>(0);

    const [speed, setSpeed] = useState(1);
    
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

    
    const toggle: any = () => {setIsPlaying(!isPlaying)};

    const saveCount = async () => {
        const date = new Date();
        const key = date.getDate().toString() + '-' + (date.getMonth()+1).toString() + '-' + date.getFullYear().toString();
        const url = "http://localhost:3000/items";
        const data = {date: key, count: count};
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



// <audio className="audio-element"  >
//                         <source src={url} type="audio/mpeg"></source>
//                         Didn't Work
//                     </audio>