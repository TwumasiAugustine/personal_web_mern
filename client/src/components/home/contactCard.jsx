
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';


const ContactCard = () => {
	return (
		<ul
			role='list'
			className='p-4 divide-y divide-slate-200 w-full max-w-[500px]'>
			<li className='flex py-4 first:pt-0'>
				<FaMapMarkerAlt className='h-5 w-5 text-indigo-600 rounded-full' />
				<div className='ml-3 overflow-hidden'>
					<p className='text-sm font-medium text-slate-900'>
						Address
					</p>
					<p className='text-sm text-slate-500 truncate'>
						Atonsu-Kumasi, Ghana
					</p>
				</div>
			</li>
			<li className='flex py-4'>
				<FaPhoneAlt className='h-5 w-5 text-indigo-600 rounded-full' />
				<div className='ml-3 overflow-hidden'>
					<p className='text-sm font-medium text-slate-900'>Phone</p>
					<a
						href='tel:+233552539748'
						className='text-sm hover:underline text-slate-500 hover:text-indigo-600 truncate'>
						+233 55253 9748
					</a>
				</div>
			</li>
			<li className='flex py-4  last:pb-0'>
				<FaEnvelope className='h-5 text-indigo-600 rounded-full' />
				<div className='ml-3 overflow-hidden'>
					<p className='text-sm font-medium text-slate-900'>
						Email
					</p>
					<a href='mailto:twumasiaugustine007@gmail.com' className='text-sm hover:underline visited:text-indigo-600 hover:text-indigo-600  text-slate-500 truncate'>
						twumasiaugustine007@gmail.com
					</a>
				</div>
			</li>
		</ul>
	);
};

export default ContactCard;

