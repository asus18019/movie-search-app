import styles from '@/styles/MovieCard.module.css';
import { Button, Typography } from '@mui/material';
import Link from 'next/link';
import { FC } from 'react';

interface INavButtonProps {
	to: string,
	title: string
}

const NavButton: FC<INavButtonProps> = ({ to, title }) => {
	return (
		<Link href={ to } className={ styles.link }>
			<Button
				color="warning"
				variant="outlined"
				sx={ {
					alignSelf: 'center',
					height: '100%',
					px: { xs: '5px', sm: '20px' }
				} }
			>
				<Typography fontWeight={ { xs: 400, sm: 600 } } fontSize={ { xs: '15px', sm: '16px' } }>
					{ title }
				</Typography>
			</Button>
		</Link>
	);
};

export default NavButton;