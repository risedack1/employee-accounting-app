import { Component } from 'react';
import './employees-add-form.css';

class EmployeesAddForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            salary: ''
        }
    }

    onValueChange = (e) => {
        e.target.placeholder = e.target.name === 'name' ? 'Name' : 'Salary in $';
        this.setState({
            [e.target.name]: e.target.value // передаем значение input в state
        });
    };

    formSubmit = (e, name, salary) => {
        e.preventDefault();

        if (name.length > 3 && salary) {
            this.props.addItem(name, salary);

            this.setState(state => ({
                name: '',
                salary: '',

            }))
        } else {
            if (name.length < 3) {
                const input = e.target.querySelector('[name=name]');

                input.placeholder = 'Incorrect';
            }

            if (!salary) {
                const input = e.target.querySelector('[name=salary]');

                input.placeholder = 'Incorrect';
            }
        }
    }

    render() {
        const { name, salary } = this.state;

        return (
            <div className="app-add-form">
                <h3>Add new employee</h3>
                <form
                    className="add-form d-flex" onSubmit={(e) => this.formSubmit(e, name, salary)}>
                    <input type="text"
                        className="form-control new-post-label"
                        // управляемый элемент, для того что бы реакт контролировал форму в ответ на пользовательский ввод, то мы должны для input добавить value и передать туда значение из state
                        placeholder='Name' name='name' value={name} onChange={this.onValueChange} />
                    <input type="number"
                        className="form-control new-post-label"
                        placeholder='Salary in $' name='salary' value={salary} onChange={this.onValueChange} />

                    <button type="submit"
                        className="btn btn-outline-light">Add employee</button>
                </form>
            </div>
        )
    }
}

export default EmployeesAddForm;