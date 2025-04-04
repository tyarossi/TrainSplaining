import React from 'react'
import Card from 'react-bootstrap/Card';

const Landingpage = () => {
    
    return (
        <div className="bg-blue-500 text-white p-5">
            <Card style={{ width: '30rem' }} className="mx-2 my-2">
                <Card.Body>
                    <Card.Title>Tailwind work</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">Wowie zowie</Card.Subtitle>
                    <Card.Text>
                        If you see this with a blue background and white text, Tailwind is working.
                    </Card.Text>
                </Card.Body>
            </Card>
        </div>
    )
}

export default Landingpage;
