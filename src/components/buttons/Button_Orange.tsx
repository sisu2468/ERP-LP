import { Button, Link } from "@chakra-ui/react";

export default function Button_Orange({ children, href }: { children: React.ReactNode, href: string }) {
    return (
        <Button
            as={Link}
            href={href}
            size="lg"
            colorScheme="orange"
            px={8}
            fontSize="md"
            fontWeight="bold"
            _hover={{
                transform: "translateY(-2px)",
                boxShadow: "lg",
            }}
        >
            {children}
        </Button>
    );
}
