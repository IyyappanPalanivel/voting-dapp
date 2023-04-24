import React, { useState } from 'react';
import { Row, Form, Button } from 'react-bootstrap'

function AddVoter({votingSystem}) {

  const [name, setName] = useState('')
  const [aadhaarNumber, setAadhaarNumber] = useState('')
  const [voterId, setVoterId] = useState('')

  const addVoter = async () => {
    try{
      await (await votingSystem.addVoter(name, aadhaarNumber,voterId)).wait()
      alert('Voter Added Successfully');
    }catch(err){
      console.log('Error ',err)
    }
    
  }


  return (
    <div className="container-fluid mt-5">
      <div className="row">
        <main role="main" className="col-lg-12 mx-auto" style={{ maxWidth: '1000px' }}>
          <div className="content mx-auto">
            <Row className="g-4">
              <Form.Control onChange={(e) => setName(e.target.value)} size="lg" required type="text" placeholder="Voter Name" />
              <Form.Control onChange={(e) => setAadhaarNumber(e.target.value)} size="lg" required type="text" placeholder="Voter Aadhaar Number" />
              <Form.Control onChange={(e) => setVoterId(e.target.value)} size="lg" required type="text" placeholder="Voter ID" />

              <div className="d-grid px-0 w-max">
                <Button onClick={addVoter} variant="primary" size="lg">
                  Add Voter
                </Button>
              </div>
            </Row>
          </div>
        </main>
      </div>
    </div>
  )
}

export default AddVoter