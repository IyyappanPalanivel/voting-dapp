import React, { useState } from 'react';
import { Row, Form, Button } from 'react-bootstrap'

function AddCandidates() {

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')

  
  const addCandidate= () => {

  }

  return (
    <div className="container-fluid mt-5">
      <div className="row">
        <main role="main" className="col-lg-12 mx-auto" style={{ maxWidth: '1000px' }}>
          <div className="content mx-auto">
            <Row className="g-4">
              <Form.Control onChange={(e) => setName(e.target.value)} size="lg" required type="text" placeholder="Candidate Name" />
              <Form.Control className=' mt-2.5' onChange={(e) => setDescription(e.target.value)} size="lg" required as="textarea" placeholder="Candidate Description" />
              <div className="d-grid px-0 w-max">
                <Button onClick={addCandidate} variant="primary" size="lg">
                  Add Candidate
                </Button>
              </div>
            </Row>
          </div>
        </main>
      </div>
    </div>
  );
}

export default AddCandidates