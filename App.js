import React, { Component } from 'react';
import './App.css';
import Person from './Person/Person';

class App extends Component {
  state = {
    persons:[
      {id:'1', name:'Max', age:28},
      {id:'2', name:'Manu', age:29},
      {id:'3', name:'Stephanie', age:26}
    ],
    otherState: 'Some other value',
    showPersons: false   
  } 
  // switchNameHandler= (newName) => {
  //   //console.log('Was clicked');
  //   //DON'T DO THIS: this.state.persons[0].name='Maximilian'
  //   this.setState({ // updates the state object
  //       persons:[
  //     {name:newName, age:28},
  //     {name:'Manu', age:29},
  //     {name:'Stephanie', age:27}
  //   ]})
  // }
  
  
  // change the name dynamically 
  // writing a method for it
  nameChangedHandler = (event, id) => {
    //find the element which we want to target the change
    //const personIndex will find the index of the object in the persons array
    const personIndex = this.state.persons.findIndex(p => { 
      return p.id === id; //returns a boolean 
    });

    //store a copy of the array in a new const with acheived personIndex so that we can target particular element
    const person = {
      ...this.state.persons[personIndex] //(...) is the spread operator to create a copy  
    }
    person.name = event.target.value;// targeting the element for change based on the input value

    const persons = [...this.state.persons];
    persons[personIndex] = person;


    this.setState({ // updates the state object
      persons:persons})
  }
  deletePersonHandler = (personsIndex) => {
    // const persons = this.state.persons.slice();
    const persons = [...this.state.persons]
    persons.splice(personsIndex,1);
    this.setState({persons:persons});
  }
  togglePersonsHandler = () =>{
    const doesShow = this.state.showPersons;
    this.setState({showPersons: !doesShow})
  }
  render() {
    const style={
      backgroundColor:'grey',
      font:'inherit',
      border:'1px solid blue',
      padding:'8px',
      cursor:'pointer'
    }
    let persons = null;
    if (this.state.showPersons) {
      persons=(
        <div>  
          {this.state.persons.map((persons,index) => {
            return <Person 
            click={() => this.deletePersonHandler(index)} 
            name={persons.name} 
            age={persons.age}
            key={persons.id}
            changed={(event) => this.nameChangedHandler(event, persons.id)}/>
          })}
          {/* <Person 
          name={this.state.persons[0].name} 
          age={this.state.persons[0].age} />
          <Person 
          name={this.state.persons[1].name} 
          age= {this.state.persons[1].age}
          click={this.switchNameHandler.bind(this,'Max!!')}
          changed={this.nameChangedHandler}>My Hobbies : Racing </Person>
          <Person name={this.state.persons[2].name} age={this.state.persons[2].age}/> */}
        </div>
      );
    }
    return (
      <div className="App">
        <h1>Hi , I'm a React Component</h1>
        <p>This is from root component</p>
        <button style={style} onClick={() => this.togglePersonsHandler('Maxmilian!!')}>Toggle Name</button>
        {/* { this.state.showPersons ?//rendering content dynamically using ternary operator 
        <div>                         //Using this approach is difficult when the application is big
          <Person 
          name={this.state.persons[0].name} 
          age={this.state.persons[0].age} />
          <Person 
          name={this.state.persons[1].name} 
          age= {this.state.persons[1].age}
          click={this.switchNameHandler.bind(this,'Max!!')}
          changed={this.nameChangedHandler}>My Hobbies : Racing </Person>
          <Person name={this.state.persons[2].name} age={this.state.persons[2].age}/>
        </div>: null 
        } */}
        {persons}
      </div>

    );
    // return React.createElement('div',{className: 'App'}, React.createElement('h1',null,'Hi, this is JS code'));
  }
}

export default App;
