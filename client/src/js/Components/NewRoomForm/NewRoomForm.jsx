import React from 'react';
import Style from './NewRoomForm.css';
import $ from 'jquery';

export default class NewRoomForm extends React.Component{

  constructor(){
    super();

    this.state = {
      categories : []
    }
  }

  componentWillMount(){
    var self = this;
    $.ajax({
            url: 'http://192.168.0.104:3000/getCategories',
            success: (res,status)=>{
                  self.setState({
                    categories : res
                  });
            },
            error:function(jqXHR,textStatus,Thrown){
              console.log("error",textStatus,Thrown,jqXHR);
            }
    });
  }

  close(){
    this.props.close();
  }

  renderCategories(){
    if(this.state.categories.length > 0)
    {
      var categories_array = this.state.categories;
       return categories_array.map(function(item,i){
        return (
          <div className="categorie">
            <input type="checkbox" key={i} index={i} value={item}/>{item}
          </div>
        );
      });
    }
  }

  handleChange(){
    var allCheck = document.getElementById('cbAll');
    var categoriesCheckboxes = document.getElementById("categoriesList").getElementsByTagName("input");
    for(var i=0;i < categoriesCheckboxes.length; i++){
      categoriesCheckboxes[i].checked = allCheck.checked;
    }
  }

  handleClick(e){
    let name = document.getElementById('iName').value;
    let maxPlayers = document.getElementById('iPlayers').value;
    let maxRounds = document.getElementById('iRounds').value;
    let categories = [];

    var categoriesCheckboxes = document.getElementById("categoriesList").getElementsByTagName("input");
    for(var i=0;i < categoriesCheckboxes.length; i++){
      let currentCheck = categoriesCheckboxes[i];
      if(currentCheck.checked){
        categories.push(currentCheck.value);
      }
    }

    let validated = true;
    if(name.trim() == ''){validated=false;alert("Pick a name for the room");}
    if(categories.length < 3){validated = false;alert("You must select at least 3 categories");}

    if(validated)
    {
      this.props.socket.emit('addGameRoom',{
        name: name,
        maxPlayers: maxPlayers,
        categories: categories,
        maxRounds : maxRounds,
        players : [],
        admin : sessionStorage.getItem('username'),
    });

      this.close();
    }
  }

  render(){
    return(
      <div className="newRoomForm">
        <div className="form-line">
          <div className="form-label">
              <label className="">Name</label>
          </div>
          <div className="form-input">
              <input id='iName' className="form-text-input" type="text"></input>
          </div>
        </div>
        <div className="form-line">
          <div className="form-label">
              <label className="">Max players</label>
          </div>
          <div className="form-input">
            <div className="combo-style">
              <select id='iPlayers'>
                  <option key={1} value="2">2</option>
                  <option key={2} value="3">3</option>
                  <option key={3} value="4">4</option>
                  <option key={4} value="5">5</option>
              </select>
            </div>
          </div>
        </div>
        <div className="form-line">
            <div className="form-label">
                <label className="">Max rounds</label>
            </div>
            <div className="form-input">
              <div className="combo-style">
              <select id='iRounds'>
                  <option key={1} value="10">10</option>
                  <option key={2} value="11">11</option>
                  <option key={3} value="12">12</option>
                  <option key={4} value="13">13</option>
                  <option key={5} value="14">14</option>
                  <option key={6} value="15">15</option>
              </select>
            </div>
            </div>
        </div>
        <div className="form-line">
            <div className="form-label">
                <label className="">Categories</label>
            </div>
            <div className="">
              <div id="categoriesList" class="container">
                {this.renderCategories()}
              </div>
              <input id='cbAll' type="checkbox" onChange={this.handleChange.bind(this)} />All
            </div>
        </div>
        <div className="form-line">
          <div className="form-submit">
              <button className="form-submit-btn" onClick={this.handleClick.bind(this)}>Be an Admin</button>
          </div>
        </div>
      </div>
    )
  }
}
