import {useHttp} from '../../hooks/http.hook';
import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {heroesFetching, heroesFetched, heroesFetchingError,  filterHeroes} from '../../actions';
import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from '../spinner/Spinner';

// * Задача для этого компонента:
// *DONE При клике на "крестик" идет удаление персонажа из общего состояния
// *DONE Усложненная задача:
// *DONE Удаление идет и с json файла при помощи метода DELETE

const HeroesList = () => {
	const {filteredListOfHeroes, heroesLoadingStatus, heroes} = useSelector(state => state);
	const dispatch = useDispatch();
	const {request} = useHttp();

	useEffect(() => {
		dispatch(heroesFetching());
		request("http://localhost:3001/heroes")
			.then(data => {
				dispatch(heroesFetched(data));
				dispatch(filterHeroes(data));
			})
			.catch(() => dispatch(heroesFetchingError()));


		// eslint-disable-next-line
	}, []);

	useEffect(() => {
		dispatch(filterHeroes(heroes, 'all'));
	}, [heroes]);


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
			return <HeroesListItem heroes={filteredListOfHeroes} heroDelete={heroDelete} key={props.id} {...props}/>
		})
	}

	const filter = (arr, filter) => {
		if (filter === 'all') {
			dispatch(filterHeroes(arr));
			return;
		}
		const newArr = arr.filter(item => item.element === filter);
		dispatch(filterHeroes(newArr));
	}

	const elements = renderHeroesList(filteredListOfHeroes);


	return (
		<ul>
			{elements}
		</ul>
	)
}

export default HeroesList;