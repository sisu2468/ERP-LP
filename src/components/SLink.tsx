import { Link } from "@chakra-ui/react";

export default function SLink({ 
    href, 
    children, 
    onClick 
}: { 
    href: string; 
    children: React.ReactNode;
    onClick?: (e: React.MouseEvent) => void;
}) {
    return (
        <Link 
            href={href} 
            _hover={{ textDecoration: 'none' }}
            onClick={onClick}
        >
            {children}
        </Link>
    );
}
