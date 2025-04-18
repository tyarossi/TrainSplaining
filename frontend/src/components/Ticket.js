import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';

const MbtaTicket = () => {
  const [isActivated, setIsActivated] = useState(false);
  const [timeLeft, setTimeLeft] = useState(5 * 1); // 20 minutes in seconds
  const [isExploding, setIsExploding] = useState(false);
  const [explosionStyle, setExplosionStyle] = useState({ transform: 'scale(1)', opacity: 1 });

  useEffect(() => {
    let timer;
    if (isActivated && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      // Trigger explosion animation when time runs out
      setIsExploding(true);
      let scale = 1;
      let opacity = 1;
      const explosionInterval = setInterval(() => {
        scale += 0.1; // Gradually increase the scale
        opacity -= 0.1; // Gradually decrease the opacity
        setExplosionStyle({ transform: `scale(${scale})`, opacity: Math.max(opacity, 0) });
        if (opacity <= 0) {
          clearInterval(explosionInterval);
          setTimeLeft(-1); // Remove the component after the animation
        }
      }, 100); // Adjust the interval for smoother animation
    }
    return () => clearInterval(timer); // Cleanup the timer on component unmount
  }, [isActivated, timeLeft]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  if (timeLeft < 0) {
    return null; // Remove the component
  }

  const ticketStyle = {
    border: '1px solid #555',
    borderRadius: '8px',
    padding: '16px',
    width: '320px',
    margin: '20px auto',
    backgroundColor: isActivated ? '#800080' : '#fff', // Change background color when activated
    fontFamily: 'Arial, sans-serif',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    color: isActivated ? '#fff' : 'black', // Adjust text color for contrast
    transition: 'transform 0.1s ease-out, opacity 0.1s ease-out', // Smooth transition for explosion
    ...explosionStyle, // Apply dynamic explosion styles
  };

  const handleActivate = () => {
    setIsActivated(true);
  };

  return (
    <div style={ticketStyle}>
      <div style={{ fontSize: '1.25rem', fontWeight: 'bold', textAlign: 'center', marginBottom: '12px' }}>
        MBTA Commuter Rail
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', margin: '6px 0', fontSize: '0.95rem' }}>
        <span>From:</span>
        <span>Salem</span>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', margin: '6px 0', fontSize: '0.95rem' }}>
        <span>To:</span>
        <span>North Station</span>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', margin: '6px 0', fontSize: '0.95rem' }}>
        <span>Date:</span>
        <span>Apr 20, 2025</span>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', margin: '6px 0', fontSize: '0.95rem' }}>
        <span>Time:</span>
        <span>7:35 AM</span>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', margin: '6px 0', fontSize: '0.95rem' }}>
        <span>Zone:</span>
        <span>Zone 3</span>
      </div>
      {isActivated && (
        <div style={{ textAlign: 'center', margin: '10px 0', fontSize: '1rem' }}>
          Time Left: {formatTime(timeLeft)}
        </div>
      )}
      <div style={{ borderTop: '1px dashed #ccc', marginTop: '14px', paddingTop: '10px', fontSize: '0.8rem', textAlign: 'center' }}>
        Valid for one-way trip only • Must present on request <br />
        <Button
          onClick={handleActivate}
          disabled={isActivated}
          style={{
            backgroundColor: isActivated ? '#ccc' : '',
            borderColor: isActivated ? '#ccc' : '',
            color: isActivated ? '#666' : '',
          }}
        >
          {isActivated ? 'Activated' : 'Activate'}
        </Button>
      </div>
    </div>
  );
};

export default MbtaTicket;