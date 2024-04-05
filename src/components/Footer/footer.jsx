import Link from 'next/link';

export const Footer = ({ children, companyName, companyUrl }) => {
    return (
        <footer className="bg-gray-800 text-white py-8">
            <div className="max-w-screen-lg mx-auto px-4">
                {children}
                <div className="text-center pt-4">
                    <Link
                        prefetch
                        href={companyUrl}
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