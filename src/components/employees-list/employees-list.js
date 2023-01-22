import EmployeesListItem from "../employees-list-item/employees-list-item";

import './employees-list.css';

const EmployeesList = ({ data, onDelete, onToggleProp }) => {

    const elements = data.map(item => { // так же если с бэкенда не приходит id элемента, то допускаектся использование индекса в переборе (допущение работает, только если порядок элементов изменяться не будет)
        const { id, ...itemProps } = item; // диструктуризация по остаточному признаку
        return (
            <EmployeesListItem
                key={id} {...itemProps}
                onDelete={() => onDelete(id)}
                onToggleProp={(e) => onToggleProp(id, e.currentTarget.getAttribute('data-prop'))}
            /> // здесь используем object spred оператор, равносильно name={item.name}, salary={item.salary}, так же здесь добавляем атрибут key что бы реакт понимал какие компоненты ему изменять
        );
    });

    return (
        // если изменить корневой элемент, то реакт перерисует и все дочерние элементы
        // если изменяется не сам элемент, а только его атрибуты, то реакт изменит только сам элемент
        // key это идентификатор элемента
        <ul className="app-list list-group">
            {elements}
        </ul>
    )
}

export default EmployeesList;