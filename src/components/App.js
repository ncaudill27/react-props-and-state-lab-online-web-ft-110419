import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      pets: [],
      filters: {
        type: 'all'
      }
    }
  }

  componentDidMount() {
    fetch('/api/pets')
    .then(res => res.json())
    .then(pets => this.setState({pets: pets}))
  }

  onChangeType = event => {
    this.setState({
      filters: {type: event.target.value}
    })
  }

  onFindPetsClick = () => {
    let currentFilter = ''

    if (this.state.filters.type !== 'all')
      currentFilter = `?type=${this.state.filters.type}`

    fetch('/api/pets' + currentFilter)
    .then(res => res.json())
    .then(pets => this.setState({pets}))
  }

  onAdoptPet = id => {
    let updatedPets = this.state.pets.map(pet => {
      if (pet.id === id) {
        pet.isAdopted = true
        return pet
      } else {
        return pet
      }
    })

    this.setState({
      pets: updatedPets
    })
  }

  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters
                onChangeType={this.onChangeType}
                onFindPetsClick={this.onFindPetsClick}
              />
            </div>
            <div className="twelve wide column">
              <PetBrowser
                pets={this.state.pets}
                onAdoptPet={this.onAdoptPet}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
