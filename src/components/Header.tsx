import { Divider, InputBase, Stack, styled, Typography } from '@mui/material';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import { FC } from 'react';
import { useRouter } from 'next/router';
import NavButton from '@/components/NavButton';
import { useSelector } from 'react-redux';
import { selectSavedMovies } from '@/redux/savedMovies/slice';
import { selectMovies } from '@/redux/movie/slice';
import { selectCurrentPage } from '@/redux/page/slice';

const InputContainer = styled(Stack)({
	border: '1px solid #e0e0e0',
	padding: '6px 12px',
	width: '100%'
});

const SearchInput = styled(InputBase)({
	fontWeight: 400,
	width: '100%',
	fontFamily: 'Merriweather',
	color: 'black'
});

interface IHeaderProps {
	searchValue: string,
	onChangeSearchValue: any,
	handleClearSearch: any,
	headerTitle: string
}

const Header: FC<IHeaderProps> = ({ searchValue, onChangeSearchValue, handleClearSearch, headerTitle }) => {
	const router = useRouter();
	const { searchValue: savedSearchValue } = useSelector(selectSavedMovies);
	const { searchValue: homepageSearchValue } = useSelector(selectMovies);
	const page = useSelector(selectCurrentPage);

	return (
		<>
			<Typography
				variant="h4"
				fontFamily="Merriweather"
				sx={ {
					fontSize: { xs: '20px', lg: '28px' },
					my: { xs: 1, lg: 3 }
				} }
			>
				{ headerTitle }
			</Typography>
			<Stack direction="row">
				<InputContainer direction="row" sx={ { mr: { xs: '10px', sm: '30px' } } }>
					<SearchRoundedIcon sx={ { alignSelf: 'center' } }/>
					<SearchInput
						placeholder="Search..."
						value={ searchValue }
						onChange={ e => onChangeSearchValue(e.target.value) }
						sx={ {
							mx: 1,
							fontSize: { xs: '14px', lg: '16px' },
							p: '2px'
						} }
					/>
					<ClearRoundedIcon
						sx={ { alignSelf: 'center', cursor: 'pointer' } }
						onClick={ () => handleClearSearch() }
					/>
				</InputContainer>
				{
					router.pathname === '/' && (
						<NavButton to={ `/movie/saved${ savedSearchValue && `?search=${ savedSearchValue }` }` } title='Saved'/>
					)
				}
				{
					router.pathname === '/movie/saved' && (
						<NavButton to={ `/${
							homepageSearchValue && page > 1 ? `?search=${ homepageSearchValue }&page=${ page }` :
								homepageSearchValue ? `?search=${ homepageSearchValue }` :
									page > 1 ? `?page=${ page }` : ''
						}` } title='Homepage'/>
					)
				}
			</Stack>
			<Divider sx={ { my: { xs: 3, lg: 5 } } }/>
		</>
	);
};

export default Header;