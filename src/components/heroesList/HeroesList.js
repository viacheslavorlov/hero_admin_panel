import {useHttp} from '../../hooks/http.hook';
import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {fetchHeroes, filteredHeroesSelector} from './heroSlice';
import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from '../spinner/Spinner';
import {CSSTransition, TransitionGroup} from "react-transition-group";
import { useGetHeroesQuery } from "../../api/apiSlice";

// * Задача для этого компонента:
// *DONE При клике на "крестик" идет удаление персонажа из общего состояния
// *DONE Усложненная задача:
// *DONE Удаление идет и с json файла при помощи метода DELETE

const HeroesList = () => {
	// console.log('hero list render')

	const {
		data: heroes,
		isFetching,
		isLoading,
		iSSuccess,
		isError,
		error
	} = useGetHeroesQuery();

	const filtHeroes = useSelector(filteredHeroesSelector);
	const {heroesLoadingStatus} = useSelector(state => state.heroes);
	const dispatch = useDispatch();
	const {request} = useHttp();

	useEffect(() => {
		dispatch(fetchHeroes())
	}, []);


	const heroDelete = (heroId) => {
		request(`http://localhost:3001/heroes/${heroId}`, 'DELETE')
			.then((r) => console.log(`hero ${heroId} deleted`, r))
	}

	if (heroesLoadingStatus === "loading") {
		return <Spinner/>;
	} else if (heroesLoadingStatus === "error") {
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


	const elements = renderHeroesList(filtHeroes);


	return (
		<ul>
			<TransitionGroup>
				{elements}
			</TransitionGroup>
		</ul>
	)
}

export default HeroesList;