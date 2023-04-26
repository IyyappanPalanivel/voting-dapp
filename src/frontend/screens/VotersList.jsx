import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Row } from 'react-bootstrap'

function VotersList({votingSystem}) {

  const [loading, setLoading] = useState(true);
  const [voters, setVoters] = useState([]);

  useEffect(() =>{
    getVotersList();
  },[])

  const getVotersList = async () => {
   
    // Load all Voters
    const voterCount = await votingSystem.voterCount();
    
    console.log('voters count',voterCount.toString());
    let voters = []
    for (let i = 0; i < voterCount; i++) {
      const item = await votingSystem.voterList(i);
      voters.push({
        name: item.name,
        aadhar_number: item.aadhar_number,
        voter_id:item.voter_id,
        voted:item.voted,
      })
      console.log('voters',item.voted);
    }

    setLoading(false);
    setVoters(voters);
  }

  if (loading) return (
    <main style={{ padding: "1rem 0" }}>
      <h2>Loading...</h2>
    </main>
  )

  return (
    <div className="flex justify-center">
      {voters.length > 0 ?
        <div className="px-5 container">
          <Row xs={1} md={2} lg={3} className="g-3 py-5">
            {voters.map((item, idx) => (
              <Col key={idx} className="overflow-hidden">
                <Card>
                  {/* <Card.Img variant="top" src={item.image} /> */}
                  <Card.Body color="secondary">
                    <Card.Title>{item.name}</Card.Title>
                    <Card.Text>
                      {item.name}
                    </Card.Text>
                    <Card.Text>
                      Aadhaar number : {item.aadhar_number.toString()}
                    </Card.Text>
                    <Card.Text>
                      Vote ID : {item.voter_id.toString()}
                    </Card.Text>
                    <Card.Text>
                      Vote Status : {item.voted.toString()=='true' ? "Voted":"Not Voted" }
                    </Card.Text>
                  </Card.Body>
                  <Card.Footer>
                    <div className='d-grid'>
                      {/* <Button variant="primary" size="lg">
                        Vote To This Candidate
                      </Button> */}
                    </div>
                  </Card.Footer>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
        : (
          <main style={{ padding: "1rem 0" }}>
            <h2>No listed Voters</h2>
          </main>
        )}
    </div>
  )
}

export default VotersList