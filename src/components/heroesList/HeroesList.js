import {useHttp} from '../../hooks/http.hook';
import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {heroesFetching, heroesFetched, heroesFetchingError, heroDeleted} from '../../actions';
import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from '../spinner/Spinner';

// * Задача для этого компонента:
// *DONE При клике на "крестик" идет удаление персонажа из общего состояния
// *DONE Усложненная задача:
// *DONE Удаление идет и с json файла при помощи метода DELETE

const HeroesList = () => {
	const {heroes, heroesLoadingStatus} = useSelector(state => state);
	const dispatch = useDispatch();
	const {request} = useHttp();

	useEffect(() => {
		dispatch(heroesFetching());
		request("http://localhost:3001/heroes")
			.then(data => dispatch(heroesFetched(data)))
			.catch(() => dispatch(heroesFetchingError()))

		// eslint-disable-next-line
	}, []);

	if (heroesLoadingStatus === "loading") {
		return <Spinner/>;
	} else if (heroesLoadingStatus === "error") {
		return <h5 className="text-center mt-5">Ошибка загрузки</h5>;
	}
	const heroDelete = (arr, heroId) => {
		request(`http://localhost:3001/heroes/${heroId}`, 'DELETE')
			.then(r => console.log(`hero ${heroId} deleted`))
		return arr.filter(item => item.id !== heroId);
	}

	const renderHeroesList = (arr) => {
		if (arr.length === 0) {
			return <h5 className="text-center mt-5">Героев пока нет</h5>;
		}

		return arr.map((props) => {
			return <HeroesListItem heroes={heroes} heroDelete={heroDelete} key={props.id} {...props}/>
		})
	}

	const elements = renderHeroesList(heroes);
	return (
		<ul>
			{elements}
		</ul>
	)
}

export default HeroesList;