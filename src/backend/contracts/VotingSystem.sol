// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract VotingSystem {

    uint public candidateCount;
    uint public voterCount;

    struct Candidate {
        uint id;
        string name;
        string description;
        uint voteCount;
    }

    mapping(uint => Candidate) public candidateList;

    struct Voter {
        uint id;
        string name;
        uint aadhar_number;
        address voter_id;
        bool voted;
    }

    mapping(uint => Voter) public voterList;
    mapping(address => Voter) public voters;
    // Events allow clients to react to specific
    // contract changes you declare
    event CandidateAdded(uint id, string name, string description,uint voteCount);

    event VoterAdded(
        uint id,
        string name,
        uint aadhar_number,
        address voter_id,
        bool voted
    );

    event Voted(string name,uint voteCount);

    function addCandidate(string memory _name,string memory _description) public {

        Candidate storage candidate = candidateList[candidateCount];
        candidate.id = candidateCount;
        candidate.name = _name;
        candidate.description = _description;
        candidate.voteCount = 0;

        candidateCount++;
        emit CandidateAdded(candidate.id,candidate.name,candidate.description,candidate.voteCount);
    }

    function addVoter(string memory _name,uint _aadhar_number,address _voter_id) public {
        //require(_name == '',"Name field empty");
        require(_aadhar_number > 0,"Adhaar field empty");
        //require(_voter_id == '',"Voter Id field empty");

        Voter storage voter = voterList[voterCount];
        voter.id = voterCount;
        voter.name = _name;
        voter.aadhar_number = _aadhar_number;
        voter.voter_id = _voter_id;
        voter.voted = false;

        voterCount++;
        emit VoterAdded(voter.id,voter.name,voter.aadhar_number,voter.voter_id,voter.voted);
    }

    function addVote(uint candidate_id) public {
        Voter storage voter = voters[msg.sender];
        require(!voter.voted,"Voter Already voted");

        Candidate storage candidate = candidateList[candidate_id];
        candidate.voteCount +=1;

        voter.voted = true;

        emit Voted(candidate.name,candidate.voteCount);
    }

    function getCandidatesList() public view returns(Candidate[] memory) {
        Candidate[] memory allCandidates = new Candidate[](candidateCount) ;

        for(uint i=0;i<candidateCount;i++){
            Candidate storage candidate = candidateList[i];
            allCandidates[i] = candidate;
        }

        return allCandidates;
    }

    function getVotersList() public view returns(Voter[] memory) {
        Voter[] memory allVoters = new Voter[](voterCount) ;

        for(uint i=0;i<voterCount;i++){
            Voter storage voter = voterList[i];
            allVoters[i] = voter;
        }

        return allVoters;
    }
}   