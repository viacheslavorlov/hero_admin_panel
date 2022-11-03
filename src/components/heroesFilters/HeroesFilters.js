import {useDispatch, useSelector} from "react-redux";
import {useHttp} from "../../hooks/http.hook";
import {setFilter} from "../../actions";
import {useEffect, useState} from "react";
import {v4} from 'uuid';

// Задача для этого компонента:
// Фильтры должны формироваться на основании загруженных данных
// Фильтры должны отображать только нужных героев при выборе
// Активный фильтр имеет класс active
// Изменять json-файл для удобства МОЖНО!
// Представьте, что вы попросили бэкенд-разработчика об этом

const HeroesFilters = () => {
	const {activeFilter} = useSelector(state => state);
	const [btns, setBtns] = useState([]);
	const dispatch = useDispatch();
	const {request} = useHttp();

	const onBtnsRequest = () => {
		request('http://localhost:3001/filters')
			.then(res => setBtns(res))
			.catch(err => console.log(err));
	}

	const filterHeroesByElement = (filter) => {
		dispatch(setFilter(filter));
	}

	const btnsList = btns.map(item => {
		return (
			<button
				onClick={() => {
					filterHeroesByElement(item.element);
				}}
				key={v4()}
				className={`btn ${item.style} ${activeFilter === item.element ? 'active border': ''}`}>
				{item.name}
			</button>
		)
	});

	useEffect(() => {
		onBtnsRequest();
	}, []);

	useEffect(() => {
		filterHeroesByElement(activeFilter);
	}, [activeFilter])


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
