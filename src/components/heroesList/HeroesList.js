// import {useHttp} from '../../hooks/http.hook';
import {useCallback, useMemo} from 'react';
import {useSelector} from 'react-redux';

// import {fetchHeroes} from './heroSlice';
import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from '../spinner/Spinner';
import {CSSTransition, TransitionGroup} from "react-transition-group";
import {useGetHeroesQuery, useDeleteHeroMutation} from "../../api/apiSlice";

// * Задача для этого компонента:
// *DONE При клике на "крестик" идет удаление персонажа из общего состояния
// *DONE Усложненная задача:
// *DONE Удаление идет и с json файла при помощи метода DELETE

const HeroesList = () => {
	// console.log('hero list render')
	const [deleteHero] = useDeleteHeroMutation();

	const {
		data: heroes = [],
		isLoading,
		isError,
	} = useGetHeroesQuery();
	const activeFilter = useSelector(state => state.filters.activeFilter);
	const filteredHeroes = useMemo(() => {
		const filteredHeroes = heroes.slice();
		if (activeFilter === 'all') {
			return filteredHeroes;
		} else {
			return filteredHeroes.filter(item => item.element === activeFilter)
		}
	}, [heroes, activeFilter])

	// const filtHeroes = useSelector(filteredHeroesSelector);
	// const {heroesLoadingStatus} = useSelector(state => state.heroes);
	// const dispatch = useDispatch();
	// const {request} = useHttp();

	// useEffect(() => {
	// 	dispatch(fetchHeroes())
	// }, []);


	const heroDelete = useCallback((heroId) => {
		deleteHero(heroId);
		// request(`http://localhost:3001/heroes/${heroId}`, 'DELETE')
		// 	.then((r) => console.log(`hero ${heroId} deleted`, r))
	}, [deleteHero])

	if (isLoading) {
		return <Spinner/>;
	} else if (isError) {
		return <h5 className="text-center mt-5">Ошибка загрузки</h5>;
	}

	const renderHeroesList = (arr) => {
		if (arr.length === 0) {
			return (
				<CSSTransition
					timeout={500}
					classNames="item"
				>
					<h5 className="text-center mt-5">Героев пока нет</h5>
				</CSSTransition>
			);
		}
		return arr.map((props) => {
			return (
				<CSSTransition
					key={props.id}
					timeout={500}
					classNames="item"
				>
					<HeroesListItem
						heroDelete={heroDelete}
						{...props}/>
				</CSSTransition>
			)
		})
	}

	const elements = renderHeroesList(filteredHeroes);

	return (
		<ul>
			<TransitionGroup>
				{elements}
			</TransitionGroup>
		</ul>
	)


}

export default HeroesList;