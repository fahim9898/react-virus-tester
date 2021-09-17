import logo from './logo.svg';
import plushImg from './plush.png';
import editImg from './edit.png';
import './style/App.scss';

import React, {useState} from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

function Users(props) {
  return (
    <ul className="user-list">
      {props.users.map((user, index) => (
        <li className={!isValidSubsequence(props.virus, user.blood_composition)?'green':'red'} key={index}>Name: <b>{user.name}</b> Composition: <b>{user.blood_composition}</b> <span style={{float:"right"}}>{!isValidSubsequence(props.virus, user.blood_composition)?'NEGATIVE':'POSTIVE'}</span></li> 
      ))}
    </ul>
  )
}

function isValidSubsequence(string, sequence) {
   let k = 0;
   for(let i=0; i < string.length; i++){
      if (string[i] === sequence[k]) {
         k++
      }
   }
  if (k === sequence.length) {
  return true
 } else {
  return false
 }
}

function App() {
  let [users, setUsers] = useState([{
    id: 1,
    name: 'fahim',
    blood_composition: 'test',
  },{
    id: 2,
    name: 'fahim',
    blood_composition: 'crnas',
  }])
  let [virus, setVirus] = useState('coronavirus');
  let [tab, setTab] = useState('test');

  let [modalPerson, setModalPerson] = useState('');
  let [modalPersonBloodCompostion, setModalPersonBloodCompostion] = useState('');

  const [userDetailShow, setUserDetailsShow] = useState(false);
  const [virusDetailShow, setVirusDetailsShow] = useState(false);

  const handleUserDetailClose = () => setUserDetailsShow(false);
  const handleUserDetailSave = () => {
    setUserDetailsShow(false);
    if(modalPerson == "" || modalPersonBloodCompostion == "") return;
    users.push({
      id: new Date().getTime(),
      name: modalPerson,
      blood_composition: modalPersonBloodCompostion
    })
    setUsers(users)
  }
  const handleUserDetailShow = () => setUserDetailsShow(true)

  const handleVirusDetailShow = () => setVirusDetailsShow(true);
  const handleVirusDetailClose = () => setVirusDetailsShow(false);

  return (
    <div className="App">
      <header className="header">
        Test Virus
        <div className="header__btn">Get Started</div>
      </header>
      <div className="content">
        <div className="banner">
          <div className="banner__heading">Explore New <br/>Virus</div>
          <div className="banner__sub-heading">stay safe & stay healthy</div>
          <div className="banner__virus">
            <div className="virus-name">{virus}</div> 
            <div className="edit-user" onClick={handleVirusDetailShow}>
              <img src={editImg} />
            </div></div>
        </div>
        <div className="nav-tab">
          <div className={ (tab=='test')?'nav-item active':'nav-item'} onClick={()=>setTab('test')}>Test User</div>
          <div className={ (tab=='code')?'nav-item active':'nav-item'} onClick={()=>setTab('code')}>View Code</div>
        </div>
        <div className="nav-content">
          {tab == "test" &&
            <div className="nav-content__tab-1">
              <Users users={users} virus={virus}/>
              <div className="add-user" onClick={handleUserDetailShow}>
                <img src={plushImg} /> &nbsp;Check Person 
              </div>
            </div>
          }
          {tab == "code" &&
            <div className="nav-content__tab-1">
              <textarea style={{width: "100%", height: '300px'}}>{
                `function isValidSubsequence(string, sequence) {
  let k = 0;
  for(let i=0; i < string.length; i++){
      if (string[i] === sequence[k]) {
        k++
      }
  }
  if (k === sequence.length) {
    return true
  } else {
    return false
  }
}`
          }
              </textarea>
            </div>
          }
        
        </div>
      </div>

      <Modal show={userDetailShow} onHide={handleUserDetailClose}>
        <Modal.Header closeButton>
          <Modal.Title>Person Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Person Name</Form.Label>
              <Form.Control type="text" placeholder="Person Name" onChange={event => setModalPerson(event.target.value)}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Person Blood Composition</Form.Label>
              <Form.Control type="text" placeholder="Person Blood Composition" onChange={event => setModalPersonBloodCompostion(event.target.value)} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleUserDetailClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUserDetailSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={virusDetailShow} onHide={handleVirusDetailClose}>
        <Modal.Header closeButton>
          <Modal.Title>Virus Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={(e)=>e.preventDefault()}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Virsus Name</Form.Label>
              <Form.Control type="text" value={virus} placeholder="Virsus Name" onChange={event => setVirus(event.target.value)}/>
            </Form.Group>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default App;
