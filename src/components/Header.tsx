import { Button, Divider, InputBase, Stack, styled, Typography } from '@mui/material';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import { FC } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import styles from '@/styles/MovieCard.module.css';

const InputContainer = styled(Stack)({
	border: '1px solid #e0e0e0',
	padding: '6px 12px',
	width: '100%',
	marginRight: '30px'
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
				<InputContainer direction="row">
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
						<Link href={ `/movie/saved` } className={ styles.link }>
							<Button color='warning' variant="outlined" sx={ { alignSelf: 'center', height: '100%', px: '20px' } }>
								<Typography fontWeight={ 600 }>
									Saved
								</Typography>
							</Button>
						</Link>
					)
				}
				{
					router.pathname === '/movie/saved' && (
						<Link href={ `/` } className={ styles.link }>
							<Button color='warning' variant="outlined" sx={ { alignSelf: 'center', height: '100%', px: '20px' } }>
								<Typography fontWeight={ 600 }>
									Homepage
								</Typography>
							</Button>
						</Link>
					)
				}
			</Stack>
			<Divider sx={ { my: { xs: 3, lg: 5 } } }/>
		</>
	);
};

export default Header;