import { Button, Container } from "@mui/material"
import { useState } from "react"

type DartMultiplier = 1 | 2 | 3

type DartScore = 0
    | 1 
    | 2
    | 3
    | 4
    | 5
    | 6
    | 7
    | 8
    | 9
    | 10
    | 11
    | 12
    | 13
    | 14
    | 15
    | 16
    | 17
    | 18
    | 19
    | 20
    | 25
    
type DartScoreSelectorProps = {
    setScoreCallback: (score: number) => void
}

export const DartScoreSelector = (props: DartScoreSelectorProps) => {
    const [multiplier, setMultiplier] = useState<DartMultiplier>(1)
    const [score, setScore] = useState<DartScore>(0)

    const scoreFields = []

    const setScoreAndMultiplier = (s: DartScore) => {
        setMultiplier(1);
        setScore(s);
        props.setScoreCallback(1 * s)
    }

    const bullsEyeScoreFunction = () => {
        setMultiplier(1);
        setScore(25);
        props.setScoreCallback(1 * 25)
    }

    for(let i:DartScore=0; i <= 20; i++) {
        scoreFields.push(
            <Button  variant={ score === i ? "contained" : "text" } onClick={() => { setScoreAndMultiplier(i) }}>
                {i}
            </Button>
        )
    }
    scoreFields.push(
        <Button variant={ score === 25 ? "contained" : "text" } onClick={() => { bullsEyeScoreFunction() }}>
            {25}
        </Button>
    )

    return (
        <Container>
            {scoreFields}
            <br/>
           <Button variant={ multiplier === 1 ? "contained" : "text" } onClick={() => { setMultiplier(1); props.setScoreCallback(1 * score) }}>
                x1
            </Button>
            <Button variant={ multiplier === 2 ? "contained" : "text" } onClick={() => { setMultiplier(2); props.setScoreCallback(2 * score) }}>
                x2
            </Button>
            <Button disabled={score === 25} variant={ multiplier === 3 ? "contained" : "text" } onClick={() => { setMultiplier(3); props.setScoreCallback(3 * score) }}>
                x3
            </Button>
        </Container>
    )
}
/*
 <p>score: { multiplier * score }</p>
            
*/