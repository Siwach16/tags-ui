import React, { Component } from 'react';
class Rows extends Component {

  tablebody = () => { if( this.props.allActivities===undefined || this.props.allActivities.length===0){
    return (<tr/>)
      }else
          return (this.props.allActivities.map(o=>{ return (
                <tr key={o.activityId}>
                  <td key={o.activityId+o.activityName}>{o.activityName}</td>
                  <td key={o.activityId+o.activityTags}>{o.activityTags}</td>
                  <td key={o.activityId+o.activityTags+'delete'}>
                    <input type="button" onClick={this.deleteEvent} className="deleteButton" id={o.activityId} value="X"/>
                    </td>
                </tr>
            )}));}

deleteEvent = event => {this.props.deleteActivityData(event.target.id);}
render(){
  return (<tbody key='tbody'>{this.tablebody()}</tbody>)
  }
}

export default Rows;
