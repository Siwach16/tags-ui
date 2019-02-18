import React, { Component } from 'react';

const InputText = props => {
  const handleChange = event => { props.updateActivityName(event.target.value)};
  return <input className="inputBox" type="text" value={props.name} onChange = {handleChange}/>
}



class ActivityName extends Component {
  render() {
    return (
      <div className="activity">
        <h2>Activity Name:</h2>
        <InputText name={this.props.name} updateActivityName={this.props.updateActivityName} />
        <span>{this.props.appliedTags.map(o => {return o.name + ','})}</span>
      </div>
    )
  }
}

export default ActivityName;
