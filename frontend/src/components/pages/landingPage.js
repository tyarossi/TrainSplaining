import React from 'react'
import Card from 'react-bootstrap/Card';

// THIS PAGE WILL BE USED ONLY FOR TESTING CONNECTION TO MONGO. NO LONGER HOME PAGE.
const Landingpage = () => {
    
    return (
        <div className="bg-blue-500 text-white p-5">
            <Card style={{ width: '30rem' }} className="mx-2 my-2">
                <Card.Body>
                    <Card.Title>Mongo connect goodly</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">Wowie zowie, the DB is connected!</Card.Subtitle>
                    <Card.Text>
                        If you see this with a blue background and white text, the database is conected.
                    </Card.Text>
                </Card.Body>
            </Card>
        </div>
    )
}

export default Landingpage;
