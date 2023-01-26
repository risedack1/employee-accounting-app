import { Component } from 'react';
import nextId from "react-id-generator";

import AppInfo from '../app-info/app-info';
import SearchPanel from '../search-panel/search-panel';
import AppFilter from '../app-filter/app-filter';
import EmployeesList from '../employees-list/employees-list';
import EmployeesAddForm from '../employees-add-form/employees-add-form';
import './app.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [
        { name: 'John C.', salary: 800, increase: false, rise: true, id: nextId() },
        { name: 'Alex M.', salary: 3000, increase: true, rise: false, id: nextId() },
        { name: 'Carl W..', salary: 5000, increase: false, rise: false, id: nextId() },
      ],
      term: '',
      filterType: 'all',
    };

  }

  deleteItem = (id) => { // данный метод который лежит на самом вернехнем уровне передается дальше до самого нижнего уровня
    this.setState(({ data }) => {
      // первый вариант нахождение обьекта с нужным нам id в массива

      // используем метод findIndex и создаем два массива [до] и [после] и идалее конкатенирует их
      // const index = data.findIndex(elem => elem.id === id);

      // Иммутабельность - это обьэкт который мы не можем изменять
      // data.splice(index, 1);
      // в данном случае мы не можем восспользоваться методом splice так как он изменит обьект data

      // const before = data.slice(0, index);
      // const after = data.slice(index + 1);

      // const newArr = [...before, ...after];

      // второй метод с испольльзованием метода фильтр
      return {
        data: data.filter(item => item.id !== id),
      }
    })
  }

  addItem = (name, salary) => {
    this.setState(({ data }) => {
      const newArr = [...data];

      newArr.push(
        {
          name,
          salary,
          increase: false,
          rise: false,
          id: nextId(),
        }
      )

      return {
        data: newArr,
      }
    })
  }

  onToggleProp = (id, prop) => {
    this.setState(({ data }) => ({
      data: data.map(item => {
        if (item.id === id) {
          return { ...item, [prop]: !item[prop] }
        }

        return item;
      }),
    }))
  }

  onToggleIncrease = (id) => {
    // this.setState(({ data }) => {
    //   const index = data.findIndex(elem => elem.id === id);

    //   const old = data[index];
    //   const newItem = { ...old, increase: !old.increase }
    //   const newArr = [...data.slice(0, index), newItem, ...data.slice(index + 1)];

    //   return {
    //     data: newArr,
    //   }
    // })

    this.setState(({ data }) => ({
      data: data.map(item => {
        if (item.id === id) {
          return { ...item, increase: !item.increase }
        }

        return item;
      })
    }));
  };

  onToggleRise = (id) => {
    this.setState(({ data }) => ({
      data: data.map(item => {
        if (item.id === id) {
          return { ...item, rise: !item.rise }
        }

        return item;
      }),
    }))
  }

  searchEmp = (data, term, filterType) => {
    let tempData;

    switch (filterType) {
      case 'rise':
        tempData = data.filter(item => item.rise);
        break;
      case 'salary':
        tempData = data.filter(item => item.salary >= 1000);
        break;
      default:
        tempData = data;
    }

    if (term.length > 0) {
      return tempData.filter(item => item.name.toLowerCase().includes(term.toLowerCase()))
    } else {
      return tempData;
    }
  }

  onSearch = (term) => {
    this.setState(state => ({
      term: term,
    }))
  }

  changeFilter = (e) => {
    const filterType = e.target.getAttribute('data-type');
    console.log(filterType);

    this.setState(({ filterType }))
  }

  render() {
    const { data, term, filterType } = this.state;
    const employees = this.state.data.length;
    const increased = this.state.data.filter(elem => elem.increase).length;
    const visibleData = this.searchEmp(data, term, filterType)

    return (
      <div className='app' >
        <AppInfo
          employeesCount={employees}
          bonusCount={increased}
        />
        <div className="search-panel">
          <SearchPanel
            onSearch={this.onSearch}
          />
          <AppFilter
            changeFilter={this.changeFilter}
          />
        </div>
        <EmployeesList
          data={visibleData}
          onDelete={this.deleteItem} // прокидываем функцию дальше в другие вложенные компоненты
          onToggleProp={this.onToggleProp}
        />
        <EmployeesAddForm
          addItem={this.addItem}
        />
      </div>
    );
  }
}

export default App;
