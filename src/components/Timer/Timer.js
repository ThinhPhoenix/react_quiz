import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ctx } from '../../CtxData';

export default function Timer({ user }) {
    const nav = useNavigate();
    const ctxDt = useContext(ctx);
    const localStorageKey = `${user}_timeRemaining_${ctxDt.examCode}`; // Unique key for each user
    const [timeRemaining, setTimeRemaining] = useState(60 * 60); // 12 minutes in seconds
    const [timerExpired, setTimerExpired] = useState(false);

    // Load time remaining from local storage
    useEffect(() => {
        const storedTimeRemaining = localStorage.getItem(localStorageKey);
        if (storedTimeRemaining) {
            setTimeRemaining(parseInt(storedTimeRemaining, 10));
        }
    }, [localStorageKey]);

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

    // Watch for changes in the timerRemaining state and update local storage
    useEffect(() => {
        localStorage.setItem(localStorageKey, timeRemaining.toString());
    }, [timeRemaining, localStorageKey]);

    const minutes = Math.floor(timeRemaining / 60);
    const seconds = timeRemaining % 60;

    return (
        <h4 className="timer wrapper">
            {timerExpired ? (
                nav(`/submit/${ctxDt.examCode}`)
            ) : (
                `Time Remaining: ${minutes}m ${seconds}s`
            )}
        </h4>
    );
}
