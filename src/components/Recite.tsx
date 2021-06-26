import { IonButton, IonIcon, IonGrid, IonLabel, IonRow, IonCol, IonRange } from "@ionic/react";
import { playOutline, pause, toggle } from "ionicons/icons";
import { useEffect, useState } from "react";
import "./Recite.css";
import { Howl, Howler } from 'howler';
const snipe = require("../audioClip/test.mp3");

const useAudio = (url: string | undefined) => {
    //const [audio] = useState(new Audio(url));
    const [playing, setPlaying] = useState(false);
  
    
  
    // useEffect(() => {
    //     playing ? audio.play().then(()=>{console.log("Playing");}).catch(e => {console.log(e);}) : audio.pause();
    //   },
    //   [playing]
    // );
  
    // useEffect(() => {
    //   audio.addEventListener('ended', () => setPlaying(false));
    //   return () => {
    //     audio.removeEventListener('ended', () => setPlaying(false));
    //   };
    // }, []);
  
    return [playing, toggle];
  };

const Recite: React.FC = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [count, setCount] = useState<number>(0);
    const [speed, setSpeed] = useState(1);


    const toggle: any = () => {setIsPlaying(!isPlaying)};

    const saveCount = () => {
        const date = new Date();
        const key = date.getDate().toString() +(date.getMonth()+1).toString() + date.getFullYear().toString();
        
    }
    const playAudio = () => {
        //console.log(document.getElementsByClassName("audio-element"));
        const audioEl: any = document.getElementsByClassName("audio-element")[0];
        audioEl.playbackRate = speed;
        if(isPlaying)
            setCount(count+1);
        
        isPlaying ? audioEl.pause() : audioEl.play();
        
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
                        onClick={() => {
                            toggle();
                            playAudio();
                            }}>
                        <IonIcon slot="start" icon={isPlaying ? pause : playOutline} />
                        {isPlaying ? "Pause" : "Play"}
                    </IonButton>
                    <audio className="audio-element" onEnded={() => {
                        if(isPlaying)
                            setCount(count+1);
                        }} loop >
                        <source src="https://assets.coderrocketfuel.com/pomodoro-times-up.mp3" type="audio/mpeg"></source>
                    </audio>
                </IonCol>
            </IonRow>
        </IonGrid>


    );
};

export default Recite;