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
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useHttp} from '../../hooks/http.hook'
import {addHero} from "../../actions";


const HeroesAddForm = () => {
	const [newHero, setNewHero] = useState({
		name: '',
		description: '',
		element: 'fire'
	});

	const state = useSelector(state => state);

	const dispatch = useDispatch();

	const {request} = useHttp();

	const onValueChange = (e) => {
		setNewHero(prevState => ({
			...prevState,
			[e.target.name]: e.target.value
		}))
	}

	const handleSubmit = (e, obj) => {
		e.preventDefault();
		obj.id = v4();
		const newArr = [...state.heroes.heroes, obj];
		dispatch(addHero(newArr));
		request('http://localhost:3001/heroes', 'POST', JSON.stringify(obj));
		console.log(newArr);
		setNewHero(prevState => ({
			name: '',
			description: '',
			element: "fire"
		}))
		e.target.reset();
	}

	const options = state.filters.filters.map((item, i) => {
		if (item.element === 'all') {
			return null;
		}
		return (
			<option key={i} value={item.element}>{item.name}</option>
		)
	});


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
				</select>
			</div>

			<button type="submit" className="btn btn-primary">Создать</button>
		</form>
	)
}

export default HeroesAddForm;