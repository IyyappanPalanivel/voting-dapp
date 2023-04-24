import { ethers } from 'ethers'
import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Row } from 'react-bootstrap'

const Home = ({ votingSystem }) => {

  const [loading, setLoading] = useState(true)
  const [candidates, setCandidates] = useState([])

  useEffect(() => {
    getCandidates()
  }, [])

  const getCandidates = async () => {

    // Load all candidates
    const candidateCount = await votingSystem.getCandidateCount();
    
    console.log('count',candidateCount);
    let candidates = []
    // for (let i = 1; i <= candidateCount; i++) {
    //   const item = await votingSystem.candidateList(i)
    //   candidates.push({
    //     name: item.name,
    //     description: item.description,
    //   })
    // }
    setLoading(false)
    setCandidates(candidates)
  }

  if (loading) return (
    <main style={{ padding: "1rem 0" }}>
      <h2>Loading...</h2>
    </main>
  )

  return (
    <div className="flex justify-center">
      {candidates.length > 0 ?
        <div className="px-5 container">
          <Row xs={1} md={2} lg={4} className="g-4 py-5">
            {candidates.map((item, idx) => (
              <Col key={idx} className="overflow-hidden">
                <Card>
                  {/* <Card.Img variant="top" src={item.image} /> */}
                  <Card.Body color="secondary">
                    <Card.Title>{item.name}</Card.Title>
                    <Card.Text>
                      {item.description}
                    </Card.Text>
                  </Card.Body>
                  <Card.Footer>
                    <div className='d-grid'>
                      <Button variant="primary" size="lg">
                        Vote To This Candidate
                      </Button>
                    </div>
                  </Card.Footer>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
        : (
          <main style={{ padding: "1rem 0" }}>
            <h2>No listed Candidates</h2>
          </main>
        )}
    </div>
  )
}

export default Home