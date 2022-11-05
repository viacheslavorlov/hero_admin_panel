import {useHttp} from '../../hooks/http.hook';
import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {createSelector} from 'reselect'

import {heroesFetched, heroesFetchingError, filterHeroes} from '../../actions/';
import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from '../spinner/Spinner';

// * Задача для этого компонента:
// *DONE При клике на "крестик" идет удаление персонажа из общего состояния
// *DONE Усложненная задача:
// *DONE Удаление идет и с json файла при помощи метода DELETE

const HeroesList = () => {

	const filteredHeroesSelector = createSelector(
		(state) => state.filters.activeFilter,
		(state) => state.heroes.heroes,
		(activeFilter, heroes) => {
			console.log("heroList_renders");
			if (activeFilter === 'all') {

				return heroes;
			} else {
				return heroes.filter(item => item.element === activeFilter)
			}
		}
	);
	const filtHeroes = useSelector(filteredHeroesSelector);

	const {heroesLoadingStatus, heroes} = useSelector(state => state.heroes);
	const dispatch = useDispatch();
	const {request} = useHttp();

	useEffect(() => {
		dispatch('HEROES_FETCHING');
		request("http://localhost:3001/heroes")
			.then(data => {
				dispatch(heroesFetched(data));
				dispatch(filterHeroes(data));
			})
			.catch(() => dispatch(heroesFetchingError()));

	}, []);

	useEffect(() => {
		dispatch(filterHeroes(heroes, 'all'));
	}, [heroes]);

	const heroDelete = (arr, heroId) => {
		request(`http://localhost:3001/heroes/${heroId}`, 'DELETE')
			.then((r) => console.log(`hero ${heroId} deleted`, r))
		return arr.filter(item => item.id !== heroId);
	}

	if (heroesLoadingStatus === "loading") {
		return <Spinner/>;
	} else if (heroesLoadingStatus === "error") {
		return <h5 className="text-center mt-5">Ошибка загрузки</h5>;
	}

	const renderHeroesList = (arr) => {
		if (arr.length === 0) {
			return <h5 className="text-center mt-5">Героев пока нет</h5>;
		}
		return arr.map((props) => {
			return <HeroesListItem heroes={filtHeroes} heroDelete={heroDelete} key={props.id} {...props}/>
		})
	}

	const elements = renderHeroesList(filtHeroes);


	return (
		<ul>
			{elements}
		</ul>
	)
}

export default HeroesList;