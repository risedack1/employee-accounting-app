import "./app-info.css";

const AppInfo = (props) => {
    const { employeesCount, bonusCount } = props;
    return (
        <div className="app-info">
            <h1>Accounting for employees in the company N</h1>
            <h2>Total number of employees: {employeesCount}</h2>
            <h2>Bonus get: {bonusCount}</h2>
        </div>
    );
}

export default AppInfo;