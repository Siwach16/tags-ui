import React, { Component } from 'react';
import Rows from './Rows';


const TableHeader = () => {
    return (
        <thead>
            <tr>
                <th>Name</th>
                <th>Tags</th>
            </tr>
        </thead>
    );
}

class Table extends Component {

  render() {
    //console.log(this.props.allActivities);
    return (
      <div className="activity">
        <h2>Activities:</h2>
        <table>
        <TableHeader/>
        <Rows allActivities={this.props.allActivities} deleteActivityData={this.props.deleteActivityData} />
        </table>
      </div>
    )

  }
}

export default Table;
