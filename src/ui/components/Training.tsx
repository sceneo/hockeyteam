import {Person} from "../../person/person";
import {Pair} from "../../matchmaking/pair";


interface TrainingProps {
    players: Person[];
    pairs: Pair[];
}


export default function Training(props: TrainingProps) {
    return (
        <div>
            Dropdown für den jeweiligen Spieler

            Tabelle mit allen Kollegen und "Matching-Factor
        </div>

    );
}