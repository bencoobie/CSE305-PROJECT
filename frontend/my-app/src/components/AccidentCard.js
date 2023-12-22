import React, { Component } from 'react'

export default class AccidentCard extends Component {
  render() {
    const {counter,location,date,plaka}=this.props;
  
    return (
      <div className='col-md-8 mb-4'>
        <div className='card'>
            <div className="card-header d-flex justify-content-between">
              <h4 className='d-inline'>KAZA {counter}</h4>
              <i className="fa-solid fa-trash" style={{cursor:"pointer"}}></i>
            </div>

            <div className="card-body">
              <p className="card-text">Location : {location}</p>
            </div>
            <div className="card-body">
              <p className="card-text">Date : {date}</p>
            </div>
            <div className="card-body">
              <p className="card-text">Plaque : {plaka}</p>
            </div>
        </div>
        
      </div>
    )
  }
}
