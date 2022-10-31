// Задача для этого компонента:
// *Реализовать создание нового героя с введенными данными. Он должен попадать
// *в общее состояние и отображаться в списке + фильтроваться
// *Уникальный идентификатор персонажа можно сгенерировать через uiid
// Усложненная задача:
// * Персонаж создается и в файле json при помощи метода POST
// * Дополнительно:
// * Элементы <option></option> желательно сформировать на базе
// * данных из фильтров
import {v4} from "uuid";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useHttp} from '../../hooks/http.hook'
import {addHero, filterHeroes} from "../../actions";


const HeroesAddForm = () => {
	const [filters, setFilters] = useState([]);
	const [newHero, setNewHero] = useState({
		name: '',
		description: '',
		element: ''
	});

	const state = useSelector(state => state);

	const dispatch = useDispatch();

	const {request} = useHttp();

	const onLoadOptions = () => {
		request('http://localhost:3001/filters')
			.then(res => setFilters(res))
			.catch(error =>  console.log(error));
	}

	const onValueChange = (e) => {
		setNewHero(prevState => ({
			...prevState,
			[e.target.name]: e.target.value
		}))
	}

	const handleSubmit = (e, obj) => {
		e.preventDefault();
		obj.id = v4();
		const newArr = [...state.heroes, obj];
		dispatch(addHero(newArr));
		request('http://localhost:3001/heroes', 'POST', JSON.stringify(obj));
		console.log(newArr);
		setNewHero(prevState => ({
			name: '',
			description: '',
			element: ''
		}))
		e.target.reset();
	}

	const options = filters.map((item, i) => {
		return (
			<option key={i} value={item.element}>{item.name}</option>
		)
	});

	const filter = (arr, filter) => {
		if (filter === 'all') {
			dispatch(filterHeroes(arr));
			return;
		}
		const newArr = arr.filter(item => item.element === filter);
		dispatch(filterHeroes(newArr));
	}

	useEffect(() => {
		onLoadOptions();
		filter(state.filteredListOfHeroes, state.activeFilter);
	}, []);

	useEffect(() => {
		filter(state.filteredListOfHeroes, state.activeFilter);
	}, [state.heroes, state.activeFilter]);


	return (
		<form
			onSubmit={(e) => handleSubmit(e, newHero)}
			className="border p-4 shadow-lg rounded">
			<div className="mb-3">
				<label htmlFor="name" className="form-label fs-4">Имя нового героя</label>
				<input
					required
					value={newHero.name}
					onInput={(e) => onValueChange(e)}
					type="text"
					name="name"
					className="form-control"
					id="name"
					placeholder="Как меня зовут?"/>
			</div>

			<div className="mb-3">
				<label htmlFor="text" className="form-label fs-4">Описание</label>
				<textarea
					onInput={(e) => onValueChange(e)}
					required
					name="description"
					className="form-control"
					id="text"
					placeholder="Что я умею?"
					style={{"height": '130px'}}/>
			</div>

			<div className="mb-3">
				<label htmlFor="element" className="form-label">Выбрать элемент героя</label>
				<select
					onInput={(e) => onValueChange(e)}
					required
					className="form-select"
					id="element"
					name="element">
					{options}
					{/*<option>Я владею элементом...</option>*/}
					{/*<option value="fire">Огонь</option>*/}
					{/*<option value="water">Вода</option>*/}
					{/*<option value="wind">Ветер</option>*/}
					{/*<option value="earth">Земля</option>*/}
				</select>
			</div>

			<button type="submit" className="btn btn-primary">Создать</button>
		</form>
	)
}

export default HeroesAddForm;