import {useDispatch, useSelector} from "react-redux";
import {setFilter, fetchFilters} from "./filterSlice";
import {useEffect} from "react";
import {v4} from 'uuid';

// Задача для этого компонента:
// Фильтры должны формироваться на основании загруженных данных
// Фильтры должны отображать только нужных героев при выборе
// Активный фильтр имеет класс active
// Изменять json-файл для удобства МОЖНО!
// Представьте, что вы попросили бэкенд-разработчика об этом

const HeroesFilters = () => {
	const {activeFilter, filters} = useSelector(state => state.filters);
	const dispatch = useDispatch();


	const onFiltersRequest = () => {
		dispatch(fetchFilters())
	}

	const btnsList = filters.map(item => {
		return (
			<button
				onClick={() => dispatch(setFilter(item.element))}
				key={v4()}
				className={`btn ${item.style} ${activeFilter === item.element ? 'active border': ''}`}>
				{item.name}
			</button>
		)
	});

	useEffect(() => {
		onFiltersRequest();
	}, []);


	return (
		<div className="card shadow-lg mt-4">
			<div className="card-body">
				<p className="card-text">Отфильтруйте героев по элементам</p>
				<div className="btn-group">
					{btnsList}
				</div>
			</div>
		</div>
	)
}

export default HeroesFilters;
