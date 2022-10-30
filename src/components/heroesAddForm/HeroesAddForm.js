// Задача для этого компонента:
// Реализовать создание нового героя с введенными данными. Он должен попадать
// в общее состояние и отображаться в списке + фильтроваться
// Уникальный идентификатор персонажа можно сгенерировать через uiid
// Усложненная задача:
// Персонаж создается и в файле json при помощи метода POST
// Дополнительно:
// Элементы <option></option> желательно сформировать на базе
// данных из фильтров
import {v4} from "uuid";
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";

import {addHero} from "../../actions";

const HeroesAddForm = () => {
	const [newHero, setNewHero] = useState({
		name: '',
		description: '',
		element: '',
		id: v4()
	});

	const state = useSelector(state => state.heroes);

	const dispatch = useDispatch();



	const onValueChange = (e) => {
		setNewHero(prevState => ({
			...prevState,
			[e.target.name]: e.target.value
		}))
	}

	const handleSubmit = (e, obj) => {
		const newArr = [...state, newHero]
		e.preventDefault();
		dispatch(addHero(newArr))
		console.log(newArr)
	}
	return (
		<form
			onSubmit={(e) => handleSubmit(e)}
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
					<option>Я владею элементом...</option>
					<option value="fire">Огонь</option>
					<option value="water">Вода</option>
					<option value="wind">Ветер</option>
					<option value="earth">Земля</option>
				</select>
			</div>

			<button onClick={(e) => handleSubmit(e, newHero)} type="submit" className="btn btn-primary">Создать</button>
		</form>
	)
}

export default HeroesAddForm;