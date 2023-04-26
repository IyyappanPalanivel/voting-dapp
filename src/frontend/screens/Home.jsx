import { ethers } from 'ethers'
import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Row } from 'react-bootstrap'

const Home = ({ votingSystem,account }) => {

  const [loading, setLoading] = useState(true)
  const [candidates, setCandidates] = useState([])

  useEffect(() => {
    getCandidates();
  }, [])

  const getCandidates = async () => {

    // Load all candidates
    const candidateCount = await votingSystem.candidateCount();
    
    console.log('count',candidateCount.toString());
    let candidates = []
    for (let i = 0; i < candidateCount; i++) {
      const item = await votingSystem.candidateList(i)
      candidates.push({
        id:item.id,
        name: item.name,
        description: item.description,
        voteCount:item.voteCount,
      })
    }
    setLoading(false)
    setCandidates(candidates)
  }

  const voteToCandidate = async (item) => {
    try{
      console.log('account',account);
      await (await votingSystem.addVote(item.id)).wait();
      getCandidates();
    }catch (err){
      console.log(err.error.data.message);
      alert(err.error.data.message);
    } 
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
                    <Card.Text>
                      Total Vote : {item.voteCount.toString()}
                    </Card.Text>
                  </Card.Body>
                  <Card.Footer>
                    <div className='d-grid'>
                      <Button variant="primary" size="lg" onClick={ () => voteToCandidate(item)}>
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