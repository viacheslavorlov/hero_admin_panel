import {useDispatch, useSelector} from "react-redux";
import {useHttp} from "../../hooks/http.hook";
import {filterHeroes, setFilter} from "../../actions";
import {useEffect, useRef, useState} from "react";
import {v4} from 'uuid';

// Задача для этого компонента:
// Фильтры должны формироваться на основании загруженных данных
// Фильтры должны отображать только нужных героев при выборе
// Активный фильтр имеет класс active
// Изменять json-файл для удобства МОЖНО!
// Представьте, что вы попросили бэкенд-разработчика об этом

const HeroesFilters = () => {
	const heroes = useSelector(state => state.heroes);
	const [btns, setBtns] = useState([]);
	const ref = useRef();
	const dispatch = useDispatch();
	const {request} = useHttp();

	const onBtnsRequest = () => {
		request('http://localhost:3001/filters')
			.then(res => setBtns(res))
			.catch(err => console.log(err));
	}

	const filter = (arr, filter) => {
		if (filter === 'all') {
			dispatch(filterHeroes(arr));
			dispatch(setFilter(filter))
			return;
		}
		const newArr = arr.filter(item => item.element === filter);
		dispatch(filterHeroes(newArr));
		dispatch(setFilter(filter));
	}

	const btnsList = btns.map(item => {
		return (
			<button
				onClick={() => filter(heroes, item.element)}
				key={v4()}
				className={"btn " + item.style}>
				{item.name}
			</button>
		)
	});

	useEffect(() => {
		onBtnsRequest();
	}, []);


	return (
		<div className="card shadow-lg mt-4">
			<div className="card-body">
				<p className="card-text">Отфильтруйте героев по элементам</p>
				<div className="btn-group">
					{btnsList}
					{/*<button className="btn btn-outline-dark ">Все</button>*/}
					{/*<button className="btn btn-danger">Огонь</button>*/}
					{/*<button className="btn btn-primary">Вода</button>*/}
					{/*<button className="btn btn-success">Ветер</button>*/}
					{/*<button className="btn btn-secondary">Земля</button>*/}
				</div>
			</div>
		</div>
	)
}

export default HeroesFilters;
