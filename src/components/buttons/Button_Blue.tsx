import { Button, Link } from "@chakra-ui/react";

export default function Button_Blue({ children, href }: { children: React.ReactNode, href: string }) {
    return (
        <Button
            as={Link}
            href={href}
            size="lg"
            colorScheme="blue"
            variant="outline"
            px={{ base: 6, md: 8 }}
            fontSize={{ base: "sm", md: "md" }}
            fontWeight="bold"
            _hover={{
                transform: "translateY(-2px)",
                boxShadow: "lg",
            }}
            whiteSpace="normal"
            textAlign="center"
        >
            {children}
        </Button>
    );
}
