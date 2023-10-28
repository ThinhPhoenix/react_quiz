import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Timer() {
    const nav = useNavigate();
    const [timeRemaining, setTimeRemaining] = useState(60 * 60); // 60 minutes in seconds
    const [timerExpired, setTimerExpired] = useState(false);

    // Update the countdown timer every 1 second
    useEffect(() => {
        if (timeRemaining > 0) {
            const timerInterval = setInterval(() => {
                setTimeRemaining((prevTime) => prevTime - 1);
            }, 1000);

            return () => clearInterval(timerInterval);
        } else {
            setTimerExpired(true);
        }
    }, [timeRemaining]);

    const minutes = Math.floor(timeRemaining / 60);
    const seconds = timeRemaining % 60;

    return (
        <h4 className="timer wrapper">
            {timerExpired ? (
                nav('/')
            ) : (
                `Time Remaining: ${minutes}m ${seconds}s`
            )}
        </h4>
    )
}
