import { IonButton, IonIcon, IonGrid, IonLabel, IonRow, IonCol, IonRange } from "@ionic/react";
import { playOutline, pause, toggle } from "ionicons/icons";
import { useEffect, useState } from "react";
import "./Recite.css";
import ReactAudioPlayer from 'react-audio-player';
const snipe = require("../audioClip/test.mp3");

const Recite: React.FC = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [count, setCount] = useState<number>(0);

    const [speed, setSpeed] = useState(1);
    const url = "https://assets.coderrocketfuel.com/pomodoro-times-up.mp3";

    const audio = new Audio(url);
        audio.playbackRate = speed;
        audio.loop = true;

    //const audioEl: any = document.getElementsByClassName("audio-element")[0];

    // audioEl.addEventListener('ended', function () {
    //     audioEl.currentTime = 0;
    //     audioEl.play().then(() => {setCount(count+1);}).catch();
    //   }, false);
    
    const toggle: any = () => {setIsPlaying(!isPlaying)};

    const saveCount = () => {
        const date = new Date();
        const key = date.getDate().toString() +(date.getMonth()+1).toString() + date.getFullYear().toString();
        
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
                <IonCol size="auto">
                    <IonButton color="warning" onClick={saveCount}>Save Count</IonButton>
                </IonCol>
                <IonCol size="auto" >
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