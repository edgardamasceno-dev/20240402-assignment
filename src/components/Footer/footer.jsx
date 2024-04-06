import Link from 'next/link';

export const Footer = ({ children, companyName, companyUrl }) => {
    return (
        <footer className="bg-gray-800 text-white py-4">
            <div className="max-w-screen-lg mx-auto">
                {children}
                <div className="text-center">
                    <Link
                        prefetch
                        href={{ pathname: companyUrl }}
                        rel="noopener noreferrer"
                        className="text-white hover:text-gray-400 transition-colors duration-300"
                    >
                        {companyName}
                    </Link>
                </div>
            </div>
        </footer>
    );
};