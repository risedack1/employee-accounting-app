import "./app-filter.css";

const AppFilter = (props) => {
    const buttonsArr = [
        { text: 'All employees', name: 'all' },
        { text: 'Career promotion', name: 'rise' },
        { text: 'Salary over 1000$', name: 'salary' },
    ];

    const buttons = buttonsArr.map(({ text, name }) => {
        const active = name === props.filterType ? 'btn-light' : 'btn-outline-light';
        return (
            <button className={`btn ${active}`}
                type="button"
                key={name}
                onClick={() => props.changeFilterType(name)}
            >
                {text}
            </button>
        )
    })

    return (
        <div className="btn-group">
            {buttons}
        </div>
    )
}

export default AppFilter;