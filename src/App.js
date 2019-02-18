import React, { Component } from 'react';
import './App.css';
import ActivityName from './ActivityName';
import TagsList from './TagsList';
import Table from './Table';

const SubmitButton = props => { return <input type="button" onClick={props.createActivity} className="button" value="Create Activity"/> };
class App extends Component {

  constructor(props) {
        super(props);
        this.initialState = {
          name: '',
          appliedTags: []
      };
      this.state = this.initialState;
    }

    componentDidMount(){
      this.getData();
    }
    getData() {
      let self = this;
      var elasticsearch = require('elasticsearch');
      var client = new elasticsearch.Client({
        host: 'localhost:9200',
        log: 'debug'
      });
    const resp = client.search({
        index: 'activity',
        type: '_doc',
        size:50,
        body: {
          query: {
            match_all: {
            }
          }
        }
      });
      resp.then(function(response){
          self.setState({allActivities:response['hits']['hits'].map(function(activity){ return {activityName:activity['_source']['activityName'],activityId:activity['_id'],activityTags:activity['_source']['implicitTags']} })});
          console.log(response);
      });
    }

  updateActivityName = name => {this.setState({name:name})};
  updateAppliedTags = tags => {this.setState({appliedTags:tags})};
  createActivity = () => {
    //console.log(this.state);
    let self = this;
    fetch('http://localhost:8083/addActivity', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' ,'Access-Control-Allow-Origin': '*'},
      body: JSON.stringify({
        activityName: this.state.name,
        tags: this.state.appliedTags.map(tag=>tag.id)
      })
    }).then(function(response){
      console.log(response.text());
      self.setState(self.initialState);
      self.getData();

    });

  };

  deleteActivityData = (item) => {
    let self = this;
     return fetch('http://localhost:8083/deleteActivity/' + item, {
       headers: { 'Content-Type': 'application/json' ,'Access-Control-Allow-Origin': '*'},
       method: 'delete'
     }).then(response =>
       response.text().then(json => {
         console.log(json);
       self.getData();
       return json;
       })
     );
   }


  render() {
    const {name} = this.state;
    return (

      <div>
      <div className="AppLeft">
      <h1>Create Activity</h1>
      <ActivityName name={name} updateActivityName={this.updateActivityName} appliedTags={this.state.appliedTags}/>
      <TagsList updateAppliedTags={this.updateAppliedTags}/>
      <SubmitButton createActivity={this.createActivity} />
      </div>
      <div className="AppRight">
      <h1>All Activities</h1>
      <Table allActivities={this.state.allActivities} deleteActivityData={this.deleteActivityData}/>
      </div>
      </div>
    )
  }
}

export default App;
