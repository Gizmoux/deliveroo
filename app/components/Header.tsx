import Image from 'next/image';
import logodeliveroo from '../assets/logo-deliveroo.png';

const Header = () => {
	return (
		<div className="">
			<Image
				width={200}
				height={100}
				alt="logodeliveroo"
				src={logodeliveroo}
				className="m-2"
			/>
		</div>
	);
};

export default Header;
