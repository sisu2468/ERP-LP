import {
  Box,
  Button as ChakraButton,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Tag,
  Text,
  Textarea,
  useColorMode,
  useColorModeValue
} from '@chakra-ui/react';
import React, { useState } from 'react';

interface InquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const jpNameRegex = /^[\u3000\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FFF\uFF66-\uFF9F\s]+$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function InquiryModal({ isOpen, onClose }: InquiryModalProps) {
  const [form, setForm] = useState<{ name: string; email: string; content: string; company?: string }>({ name: '', email: '', content: '', company: '' });
  const [touched, setTouched] = useState<{ name: boolean; email: boolean; content: boolean }>({ name: false, email: false, content: false });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { colorMode } = useColorMode();
  const isNameError = touched.name && (!form.name || !jpNameRegex.test(form.name));
  const isEmailError = touched.email && (!form.email || !emailRegex.test(form.email));
  const isContentError = touched.content && !form.content;

  // Color mode values
  const labelColor = useColorModeValue('gray.800', 'gray.100');
  const textColor = useColorModeValue('gray.700', 'gray.200');
  const bgInput = useColorModeValue('white', 'gray.700');
  const modalBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.300', 'gray.600');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setTouched({ ...touched, [e.target.name]: true });
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setTouched({ name: true, email: true, content: true });
    if (!form.name || !jpNameRegex.test(form.name) || !form.email || !emailRegex.test(form.email) || !form.content) return;
    setSubmitting(true);
    setError(null);
    
    try {
      const response = await fetch('https://erp-lp-backend.vercel.app/api/inquiry', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });
      
      const result = await response.json();
      
      if (result.ok) {
        setSubmitted(true);
        setForm({ name: '', email: '', content: '', company: '' });
        setTouched({ name: false, email: false, content: false });
      } else {
        console.error('Inquiry submission failed:', result.message);
        setError(result.message || '送信に失敗しました');
      }
    } catch (error) {
      console.error('Inquiry submission error:', error);
      setError('送信に失敗しました。しばらく時間をおいて再度お試しください。');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      {/* Modal for all screen sizes */}
      <Modal isOpen={isOpen} onClose={onClose} isCentered size="sm">
        <ModalOverlay />
        <ModalContent borderRadius="lg" border="2px" borderColor={borderColor} p={1} bg={modalBg}>
          <ModalHeader fontWeight="bold" fontSize="xl" pb={2} color={labelColor}>
            お問い合わせ          </ModalHeader>
          <ModalCloseButton color={labelColor} />
          <ModalBody>
            {submitted ? (
              <Box textAlign="center" py={8}>
                <Text fontWeight="bold" fontSize="lg" mb={2} color={labelColor}>送信が完了しました</Text>
                <Text fontSize="sm" color={textColor}>ご意見ありがとうございます。</Text>
              </Box>
            ) : (
              <form onSubmit={handleSubmit}>
                <FormControl isRequired isInvalid={isNameError} mb={4}>
                  <HStack mb={1}>
                    <FormLabel htmlFor="name" mb={0} fontWeight="bold" color={labelColor}>名前</FormLabel>
                    <Tag size="sm" colorScheme="orange">必須</Tag>
                  </HStack>
                  <Input
                    id="name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    borderRadius="2xl"
                    bg={bgInput}
                    color={textColor}
                  />
                  <FormErrorMessage>
                    {form.name === '' ? '名前は必須です' : '日本語で入力してください（漢字・ひらがな・カタカナ）'}
                  </FormErrorMessage>
                </FormControl>
                <FormControl mb={4}>
                  <FormLabel htmlFor="company" fontWeight="bold" color={labelColor}>会社名</FormLabel>
                  <Input
                    id="company"
                    name="company"
                    value={form.company || ''}
                    onChange={handleChange}
                    borderRadius="2xl"
                    bg={bgInput}
                    color={textColor}
                  />
                </FormControl>
                <FormControl isRequired isInvalid={isEmailError} mb={4}>
                  <HStack mb={1}>
                    <FormLabel htmlFor="email" mb={0} fontWeight="bold" color={labelColor}>メールアドレス</FormLabel>
                    <Tag size="sm" colorScheme="orange">必須</Tag>
                  </HStack>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    borderRadius="2xl"
                    bg={bgInput}
                    color={textColor}
                  />
                  <FormErrorMessage>
                    {form.email === '' ? 'メールアドレスは必須です' : '正しいメールアドレスを入力してください'}
                  </FormErrorMessage>
                </FormControl>
                <FormControl isRequired isInvalid={isContentError} mb={4}>
                  <HStack mb={1}>
                    <FormLabel htmlFor="content" mb={0} fontWeight="bold" color={labelColor}>お問い合わせ内容</FormLabel>
                    <Tag size="sm" colorScheme="orange">必須</Tag>
                  </HStack>
                  <Textarea
                    id="content"
                    name="content"
                    value={form.content}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    borderRadius="2xl"
                    bg={bgInput}
                    color={textColor}
                    minH="80px"
                  />
                  <FormErrorMessage>お問い合わせ内容は必須です</FormErrorMessage>
                </FormControl>
                {error && (
                  <Box mb={4} p={3} bg="red.50" border="1px" borderColor="red.200" borderRadius="md">
                    <Text color="red.600" fontSize="sm">{error}</Text>
                  </Box>
                )}
                <ChakraButton
                  type="submit"
                  colorScheme="orange"
                  borderRadius="2xl"
                  w="100%"
                  fontWeight="bold"
                  isLoading={submitting}
                  mb={2}
                  size="lg"
                  fontSize="md"
                  px={8}
                  _hover={{
                    transform: "translateY(-2px)",
                    boxShadow: "lg",
                    bg: colorMode === 'light' ? 'orange.500' : 'orange.400',
                  }}
                >
                  送信
                </ChakraButton>
              </form>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>

      {/* SAINTA Text Animation - only on large screens */}
      {/* {isOpen && (
        <Box
          className="hidden lg:block"
          as={motion.div}
          initial={{ y: "100vh", opacity: 0 }}
          animate={{ y: "0", opacity: 1 }}
          exit={{ y: "100vh", opacity: 0 }}
          position="fixed"
          right="calc(50% - 350px)"
          top="50%"
          transform="translateY(-50%)"
          zIndex={1500}
          pointerEvents="none"
          userSelect="none"
        >
          <Box
            fontSize="6xl"
            fontWeight="bold"
            color={colorMode === 'light' ? 'gray.300' : 'gray.600'}
            opacity={0.4}
            letterSpacing="widest"
            lineHeight={1}
            fontFamily="Montserrat, Arial, sans-serif"
            style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
          >
            SAINTA
          </Box>
        </Box>
      )} */}
    </>
  );
} 