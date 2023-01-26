import { Component } from "react";
import "./app-filter.css";

class AppFilter extends Component {
    render() {
        const { changeFilter } = this.props;
        return (
            <div className="btn-group">
                <button type="button"
                    className="btn btn-light"
                    data-type="all"
                    onClick={(e) => changeFilter(e)}
                >
                    All employees
                </button>
                <button type="button"
                    className="btn btn-outline-light"
                    data-type="rise"
                    onClick={(e) => changeFilter(e)}
                >
                    Career promotion
                </button>
                <button type="button"
                    className="btn btn-outline-light"
                    data-type="salary"
                    onClick={(e) => changeFilter(e)}
                >
                    Salary over 1000$
                </button>
            </div>
        )
    }
}

export default AppFilter;