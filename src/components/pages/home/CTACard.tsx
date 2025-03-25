import { useColorModeValue } from "@chakra-ui/react";

import { Card, CardBody, VStack, Heading, Text, Icon, HStack, Button, Link } from "@chakra-ui/react";
import { CTACard as CTACardType } from "../../../constant/interface";
import { FaCheck, FaArrowRight } from "react-icons/fa";

export const CTACard = ({ card }: { card: CTACardType }) => {
    const bgColor = useColorModeValue(
        card.primary ? 'orange.500' : 'white',
        card.primary ? 'orange.500' : 'gray.700'
    );
    const textColor = card.primary ? 'white' : undefined;
    const borderColor = useColorModeValue('gray.200', 'gray.600');

    return (
        <Card
            height="full"
            bg={bgColor}
            color={textColor}
            border="1px"
            borderColor={card.primary ? 'transparent' : borderColor}
            shadow="xl"
            _hover={{
                transform: 'translateY(-8px)',
                shadow: '2xl',
            }}
            transition="all 0.3s ease"
        >
            <CardBody>
                <VStack spacing={6} align="flex-start">
                    <Icon as={card.icon} w={10} h={10} color={card.primary ? 'white' : 'orange'} />

                    <VStack align="flex-start" spacing={2}>
                        <Heading size="lg">{card.title}</Heading>
                        <Text opacity={0.9}>{card.description}</Text>
                    </VStack>

                    {card.features && (
                        <VStack align="flex-start" spacing={3} w="full">
                            {card.features.map((feature) => (
                                <HStack key={feature} spacing={3}>
                                    <Icon as={FaCheck} w={5} h={5} />
                                    <Text>{feature}</Text>
                                </HStack>
                            ))}
                        </VStack>
                    )}

                    <Button
                        as={Link}
                        href={card.buttonLink}
                        size="lg"
                        width="full"
                        rightIcon={<FaArrowRight />}
                        colorScheme={card.primary ? 'white' : 'orange'}
                        variant={card.primary ? 'outline' : 'solid'}
                        _hover={{
                            transform: 'translateX(4px)',
                        }}
                    >
                        {card.buttonText}
                    </Button>
                </VStack>
            </CardBody>
        </Card>
    );
};