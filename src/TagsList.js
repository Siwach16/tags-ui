import React, { Component } from 'react';


class Tags extends Component {
  state = {
        appliedTag: []
    };

render(){
  const handleChange = event => {const selectedVal=[...event.target.selectedOptions].map(o => {return {id:o.value,name:o.text}}); this.setState({appliedTag:selectedVal}) ;this.props.updateAppliedTags(selectedVal)};
  //const selectedVal=this.state.appliedTag;
  //console.log("selected"+selectedVal);
  const allTags=this.props.tags;
  //console.log("all"+allTags);

//  const remaining=allTags.filter(t=> {return !selectedVal.some(tags=>{return tags.id===t.id})});
  //console.log("remaining"+remaining);
  const opt = allTags.map((tag) => { return (<option value={tag.id} key={tag.id} >{tag.name}</option>);});

  return  <select multiple className="selectBox" onChange={handleChange}>{opt}</select>;
          }
        }


class TagsList extends Component {
  state = {
        data: []
    };

  componentDidMount() {
        const url = "http://localhost:8082/getAllTags";

        fetch(url)
            .then(result => result.json())
            .then(result => result.map((tag)=>{return {name:tag['tagName'],id:tag['tagId']}}))
            .then(result => {
                this.setState({
                    data: result
                })
            });
    }

  render() {
    const tags = this.state.data;
    return (
      <div className="tags">
      <h4>Tags:</h4>
      <Tags tags={tags} updateAppliedTags={this.props.updateAppliedTags}/>
      </div>
    )
  }
}

export default TagsList;
