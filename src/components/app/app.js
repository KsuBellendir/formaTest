import {Component} from 'react';

import AppInfo from '../app-info/app-info';
import SearchPanel from '../search-panel/search-panel';
import AppFilter from '../app-filter/app-filter';
import EmployersList from '../employers-list/employers-list';
import EmployersAddForm from '../employers-add-form/employers-add-form';

import './app.css';

 class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data : [
        {name:"German Milin", salary: 800, increase: true, rise: true, id: 1},
        {name:"Oleg Tanpor", salary: 2500, increase: false, rise: false, id: 2},
        {name:"Kseniya Dushegub", salary:5500, increase: true, rise: false, id: 3},
        {name:"Lev XXX", salary:45500, increase: false, rise: false, id: 4},
    ],
    term: "",
    filter: ''
    }
    this.maxId = 5
  }

  deleteItem = (id) =>{
    this.setState(({data}) => {
     return {
      data: data.filter(item => item.id !== id)
     }
    })
  }
 
addEmploee = (name, salary) => {
  if(name && salary){
    const newEmploee = {
      name,
      salary,
      increase: false,
      rise:false, 
      id:this.maxId ++
    }
    this.setState(({data}) => {
      const newArr = [...data, newEmploee];
      return {
       data: newArr
      }
     })
  }
  }

onToggleProp = (id, prop) => {

  this.setState(({data}) => ({
    data: data.map(item => {
      if(item.id === id){
        return{
          ...item, [prop]: !item[prop]
        }
      }
      return item;
    }) 
   }))
}

searchEmp = (items, term) => {
  if(term.length === 0){
    return  items;
  }
  return items.filter(item => {
    return item.name.indexOf(term) > - 1
  })
}

onUpdateSearch = (term) => {
  this.setState({term});

}

filterPoct = (items, filter) =>{
  switch (filter){
    case 'rise':
      return items.filter(item => item.rise);
    case 'moreThen1000':
      return items.filter(item => item.salary > 1000);
    default:
      return items; 
  }
  }

  onFilterSelect = (filter) => {
    this.setState({filter});
  }

  render(){
    const {data, term, filter} = this.state;
    const emploees = this.state.data.length;
    const increasd = this.state.data.filter(item => item.increase).length;
    const visibalData = this.filterPoct(this.searchEmp(data, term), filter);
 
    return (
      <div className ="app">
          <AppInfo emploees={emploees} increasd={increasd}/>
          <div className="search-panel">
          <SearchPanel onUpdateSearch={this.onUpdateSearch}/>
          <AppFilter filter={filter} onFilterSelect={this.onFilterSelect}/>
          </div>

          <EmployersList data={visibalData}
          onDelete={this.deleteItem}
          onToggleProp={this.onToggleProp}/>
          <EmployersAddForm
          onAdd={this.addEmploee}/> 
          
      </div>
   );
  }
 }

 export default App;


  /* второй способ для поиска и выделения элементов по id
  this.setState(({data}) => {
    const index = data.findIndex(elem => elem.id === id);
    const old = data[index];
    const newItem = {...old, increase: !old.increase};
    const newArr = [...data.slice(0, index), newItem, ...data.slice(index + 1)];
    return{data: newArr}
  })*/









 