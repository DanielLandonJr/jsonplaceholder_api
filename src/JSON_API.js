import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

// ***** MAIN COMPONENT *****
export class JSON_API extends Component {
  state = {
    jsonData: [],
    forConversion:
      '01000011 01101111 01100100 01100101 01100100 00100000 01000010 01111001 00100000 01000100 01100001 01101110 01101001 01100101 01101100 00100000 01000011 00101110 00100000 01001100 01100001 01101110 01100100 01101111 01101110 00100000 01001010 01110010 00101110',
    highestID: 10
  };

  componentWillMount = () => {
    this.ReadUsers();
  };

  ReadUsers = async () => {
    // get user data from jsonplaceholder
    try {
      const response = await axios.get(
        'https://jsonplaceholder.typicode.com/users'
      );

      this.setState({ jsonData: response.data });
    } catch (error) {
      console.log(error);
    }
  };

  AddUser = async () => {
    const newUser = {
      id: 0,
      name: 'NAME',
      username: 'USER NAME',
      email: 'EMAIL',
      address: {
        street: 'STREET',
        suite: 'SUITE',
        city: 'CITY',
        zipcode: 'ZIP CODE',
        geo: {
          lat: 'LATTITUDE',
          lng: 'LONGITUDE'
        }
      },
      phone: 'PHONE',
      website: 'WEBSITE',
      company: {
        name: 'COMPANY NAME',
        catchPhrase: 'COMPANY CATCH PHRASE',
        bs: 'COMPANY BS'
      }
    };

    try {
      const response = await axios.post(
        'https://jsonplaceholder.typicode.com/users',
        newUser
      );

      // increase id number of returned data ... otherwise it will always be 11
      this.state.highestID++;
      response.data.id = this.state.highestID;

      this.setState(state => ({
        jsonData: [...state.jsonData, response.data]
      }));
    } catch (error) {
      console.log(error);
    }
  };

  UpdateUser = async (id, data) => {
    console.log(data);
    try {
      const response = await axios.put(
        `https://jsonplaceholder.typicode.com/users/${id}`,
        data
      );
      
      this.setState(state => ...state, jsonData: state.jsonData.map(item => item.id === id ? item = data : jsonData))
      
      // ...state,
      //   contacts: state.contacts.map(
      //     contact =>
      //       contact.id === action.payload.id
      //         ? (contact = action.payload)
      //         : contact
      

      console.log(this.state.jsonData);
    } catch (error) {
      console.log(error);
    }
  };

  DeleteUser = async id => {
    if (this.state.jsonData.length === 1) {
      // remove last record...this is kinda weird but works
      this.setState({
        jsonData: this.state.jsonData.filter(item => item.id !== id)
      });
      // read the data again
      setTimeout(() => {
        this.ReadUsers();
      }, 1500);
    } else {
      this.setState({
        jsonData: this.state.jsonData.filter(item => item.id !== id)
      });
    }
  };

  render() {
    if (this.state.jsonData && this.state.jsonData.length) {
      return (
        <React.Fragment>
          <button
            onClick={() => {
              this.AddUser();
            }}
          >
            Add New User
          </button>
          <h6>New Record Will Be Added At The End</h6>
          {this.state.jsonData.map(item => (
            <UserItem
              key={item.id}
              userData={item}
              updateUser={this.UpdateUser}
              deleteUser={this.DeleteUser}
            />
          ))}
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <h3>Data Loading ... </h3>
        </React.Fragment>
      );
    }
  }
}

// ***** USER ITEM COMPONENT *****
class UserItem extends Component {
  constructor(props) {
    super(props);

    this.nameInput = React.createRef();
    this.usernameInput = React.createRef();
    this.emailInput = React.createRef();
    this.streetInput = React.createRef();
    this.suiteInput = React.createRef();
    this.cityInput = React.createRef();
    this.zipcodeInput = React.createRef();
    this.latInput = React.createRef();
    this.lngInput = React.createRef();
    this.phoneInput = React.createRef();
    this.websiteInput = React.createRef();
    this.companyNameInput = React.createRef();
    this.catchPhraseInput = React.createRef();
    this.bsInput = React.createRef();
  }

  static propTypes = {
    userData: PropTypes.object.isRequired,
    updateUser: PropTypes.func.isRequired,
    deleteUser: PropTypes.func.isRequired
  };

  static defaultProps = {
    id: 0,
    name: 'NAME',
    username: 'USER NAME',
    email: 'EMAIL',
    address: {
      street: 'STREET',
      suite: 'SUITE',
      city: 'CITY',
      zipcode: 'ZIPC CODE',
      geo: {
        lat: 'LATTITUDE',
        lng: 'LONGITUDE'
      }
    },
    phone: 'PHONE',
    website: 'WEBSITE',
    company: {
      name: 'COMPANY NAME',
      catchPhrase: 'COMPANY CATCH PHRASE',
      bs: 'COMPANY BS'
    }
  };

  UpdateUser_Callback = id => {
    const updatedUser = {
      name: this.nameInput.current.value,
      username: this.usernameInput.current.value,
      email: this.emailInput.current.value,
      address: {
        street: this.streetInput.current.value,
        suite: this.suiteInput.current.value,
        city: this.cityInput.current.value,
        zipcode: this.zipcodeInput.current.value,
        geo: {
          lat: this.latInput.current.value,
          lng: this.lngInput.current.value
        }
      },
      phone: this.phoneInput.current.value,
      website: this.websiteInput.current.value,
      company: {
        name: this.companyNameInput.current.value,
        catchPhrase: this.catchPhraseInput.current.value,
        bs: this.bsInput.current.value
      }
    };

    this.props.updateUser(id, updatedUser);
  };

  DeleteUser_Callback = id => {
    this.props.deleteUser(id);
  };

  render() {
    const {
      id,
      name,
      username,
      email,
      address,
      phone,
      website,
      company
    } = this.props.userData;

    return (
      <React.Fragment>
        <div>
          <h3>User Record # {id}</h3>
        </div>
        <div>
          <label htmlFor="name">Name: </label>
          <input
            type="text"
            name="name"
            id="name"
            defaultValue={name}
            ref={this.nameInput}
          />{' '}
          <label htmlFor="username">User Name: </label>
          <input
            type="text"
            name="username"
            id="username"
            defaultValue={username}
            ref={this.usernameInput}
          />
        </div>
        <div>
          <label htmlFor="name">email: </label>
          <input
            type="text"
            name="email"
            id="email"
            defaultValue={email}
            ref={this.emailInput}
          />
        </div>
        <div>
          <label htmlFor="street">Street: </label>
          <input
            type="text"
            name="street"
            id="street"
            defaultValue={address.street}
            ref={this.streetInput}
          />{' '}
          <label htmlFor="suite">Suite: </label>
          <input
            type="text"
            name="suite"
            id="suite"
            defaultValue={address.suite}
            ref={this.suiteInput}
          />{' '}
          <label htmlFor="street">City: </label>
          <input
            type="text"
            name="city"
            id="city"
            defaultValue={address.city}
            ref={this.cityInput}
          />{' '}
          <label htmlFor="street">Zipcode: </label>
          <input
            type="text"
            name="zipcode"
            id="zipcode"
            defaultValue={address.zipcode}
            ref={this.zipcodeInput}
          />
        </div>
        <div>
          <label htmlFor="lat">Lat: </label>
          <input
            type="text"
            name="lat"
            id="lat"
            defaultValue={address.geo.lat}
            ref={this.latInput}
          />{' '}
          <label htmlFor="lng">Lng: </label>
          <input
            type="text"
            name="lng"
            id="lng"
            defaultValue={address.geo.lng}
            ref={this.lngInput}
          />
        </div>
        <div>
          <label htmlFor="phone">Phone: </label>
          <input
            type="text"
            name="phone"
            id="phone"
            defaultValue={phone}
            ref={this.phoneInput}
          />{' '}
          <label htmlFor="website">Website: </label>
          <input
            type="text"
            name="website"
            id="website"
            defaultValue={website}
            ref={this.websiteInput}
          />
        </div>
        <div>
          <label htmlFor="companyName">Company Name: </label>
          <input
            type="text"
            name="companyName"
            id="companyName"
            defaultValue={company.name}
            ref={this.companyNameInput}
          />{' '}
          <label htmlFor="catchPhrase">Catch Phrase: </label>
          <input
            type="text"
            name="catchPhrase"
            id="catchPhrase"
            defaultValue={company.catchPhrase}
            ref={this.catchPhraseInput}
          />{' '}
          <label htmlFor="bs">BS: </label>
          <input
            type="text"
            name="bs"
            id="bs"
            defaultValue={company.bs}
            ref={this.bsInput}
          />
        </div>
        <div>
          <button
            onClick={() => {
              this.UpdateUser_Callback(id);
            }}
          >
            Update
          </button>{' '}
          <button
            onClick={() => {
              this.DeleteUser_Callback(id);
            }}
          >
            Delete
          </button>
        </div>
        <br />
        <hr />
      </React.Fragment>
    );
  }
}

export default JSON_API;
