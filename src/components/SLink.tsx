import { Link } from "@chakra-ui/react";

export default function SLink({ href, children }: { href: string; children: React.ReactNode }) {
    return (
        <Link href={href} _hover={{ textDecoration: 'none' }}>
            {children}
        </Link>
    );
}
