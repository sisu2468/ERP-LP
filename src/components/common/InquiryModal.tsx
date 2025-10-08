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
  VStack,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { FaCheckCircle } from 'react-icons/fa';

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
  
  const isNameError = touched.name && (!form.name || !jpNameRegex.test(form.name));
  const isEmailError = touched.email && (!form.email || !emailRegex.test(form.email));
  const isContentError = touched.content && !form.content;

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
    <Modal isOpen={isOpen} onClose={onClose} isCentered size="lg">
      <ModalOverlay bg="rgba(0, 0, 0, 0.4)" backdropFilter="blur(4px)" />
      <ModalContent 
        borderRadius="2xl" 
        border="1px solid" 
        borderColor="#e5e7eb" 
        p={2} 
        bg="white"
        boxShadow="0 20px 60px rgba(0, 0, 0, 0.15)"
      >
        <ModalHeader 
          fontWeight="700" 
          fontSize="2xl" 
          pb={2} 
          color="#111111"
          pt={6}
          px={8}
        >
          お問い合わせ
        </ModalHeader>
        <ModalCloseButton 
          color="#6e6e73" 
          top={6}
          right={6}
          _hover={{ bg: '#fafafa' }}
        />
        <ModalBody px={8} pb={8}>
          {submitted ? (
            <VStack spacing={6} py={12} textAlign="center">
              <Box
                w={16}
                h={16}
                borderRadius="full"
                bg="rgba(224, 142, 70, 0.1)"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <FaCheckCircle size={32} color="#e08e46" />
              </Box>
              <VStack spacing={2}>
                <Text fontWeight="700" fontSize="xl" color="#111111">
                  送信が完了しました
                </Text>
                <Text fontSize="md" color="#6e6e73">
                  ご意見ありがとうございます。
                  <br />
                  担当者より2営業日以内にご連絡いたします。
                </Text>
              </VStack>
            </VStack>
          ) : (
            <form onSubmit={handleSubmit}>
              <VStack spacing={5} align="stretch">
                <FormControl isRequired isInvalid={isNameError}>
                  <HStack mb={2} spacing={2}>
                    <FormLabel htmlFor="name" mb={0} fontWeight="600" color="#111111" fontSize="sm">
                      名前
                    </FormLabel>
                    <Tag 
                      size="sm" 
                      bg="#fef2f2" 
                      color="#dc2626" 
                      border="1px solid"
                      borderColor="#fecaca"
                      fontWeight="600"
                      fontSize="xs"
                    >
                      必須
                    </Tag>
                  </HStack>
                  <Input
                    id="name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    borderRadius="lg"
                    bg="white"
                    border="1px solid"
                    borderColor="#e5e7eb"
                    color="#111111"
                    h="48px"
                    fontSize="md"
                    _hover={{ borderColor: '#d2d2d7' }}
                    _focus={{
                      borderColor: '#e08e46',
                      boxShadow: '0 0 0 3px rgba(224, 142, 70, 0.1)',
                    }}
                  />
                  <FormErrorMessage fontSize="sm" color="#dc2626">
                    {form.name === '' ? '名前は必須です' : '日本語で入力してください（漢字・ひらがな・カタカナ）'}
                  </FormErrorMessage>
                </FormControl>

                <FormControl>
                  <HStack mb={2} spacing={2}>
                    <FormLabel htmlFor="company" mb={0} fontWeight="600" color="#111111" fontSize="sm">
                      会社名
                    </FormLabel>
                    <Tag 
                      size="sm" 
                      bg="#fffbeb" 
                      color="#78716c" 
                      border="1px solid"
                      borderColor="#fed7aa"
                      fontWeight="600"
                      fontSize="xs"
                    >
                      任意
                    </Tag>
                  </HStack>
                  <Input
                    id="company"
                    name="company"
                    value={form.company || ''}
                    onChange={handleChange}
                    borderRadius="lg"
                    bg="white"
                    border="1px solid"
                    borderColor="#e5e7eb"
                    color="#111111"
                    h="48px"
                    fontSize="md"
                    _hover={{ borderColor: '#d2d2d7' }}
                    _focus={{
                      borderColor: '#e08e46',
                      boxShadow: '0 0 0 3px rgba(224, 142, 70, 0.1)',
                    }}
                  />
                </FormControl>

                <FormControl isRequired isInvalid={isEmailError}>
                  <HStack mb={2} spacing={2}>
                    <FormLabel htmlFor="email" mb={0} fontWeight="600" color="#111111" fontSize="sm">
                      メールアドレス
                    </FormLabel>
                    <Tag 
                      size="sm" 
                      bg="#fef2f2" 
                      color="#dc2626" 
                      border="1px solid"
                      borderColor="#fecaca"
                      fontWeight="600"
                      fontSize="xs"
                    >
                      必須
                    </Tag>
                  </HStack>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    borderRadius="lg"
                    bg="white"
                    border="1px solid"
                    borderColor="#e5e7eb"
                    color="#111111"
                    h="48px"
                    fontSize="md"
                    _hover={{ borderColor: '#d2d2d7' }}
                    _focus={{
                      borderColor: '#e08e46',
                      boxShadow: '0 0 0 3px rgba(224, 142, 70, 0.1)',
                    }}
                  />
                  <FormErrorMessage fontSize="sm" color="#dc2626">
                    {form.email === '' ? 'メールアドレスは必須です' : '正しいメールアドレスを入力してください'}
                  </FormErrorMessage>
                </FormControl>

                <FormControl isRequired isInvalid={isContentError}>
                  <HStack mb={2} spacing={2}>
                    <FormLabel htmlFor="content" mb={0} fontWeight="600" color="#111111" fontSize="sm">
                      お問い合わせ内容
                    </FormLabel>
                    <Tag 
                      size="sm" 
                      bg="#fef2f2" 
                      color="#dc2626" 
                      border="1px solid"
                      borderColor="#fecaca"
                      fontWeight="600"
                      fontSize="xs"
                    >
                      必須
                    </Tag>
                  </HStack>
                  <Textarea
                    id="content"
                    name="content"
                    value={form.content}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    borderRadius="lg"
                    bg="white"
                    border="1px solid"
                    borderColor="#e5e7eb"
                    color="#111111"
                    minH="120px"
                    fontSize="md"
                    _hover={{ borderColor: '#d2d2d7' }}
                    _focus={{
                      borderColor: '#e08e46',
                      boxShadow: '0 0 0 3px rgba(224, 142, 70, 0.1)',
                    }}
                  />
                  <FormErrorMessage fontSize="sm" color="#dc2626">
                    お問い合わせ内容は必須です
                  </FormErrorMessage>
                </FormControl>

                {error && (
                  <Box 
                    p={4} 
                    bg="#fef2f2" 
                    border="1px solid" 
                    borderColor="#fecaca" 
                    borderRadius="lg"
                  >
                    <Text color="#dc2626" fontSize="sm" fontWeight="500">
                      {error}
                    </Text>
                  </Box>
                )}

                <ChakraButton
                  type="submit"
                  bg="#e08e46"
                  color="white"
                  borderRadius="lg"
                  w="100%"
                  fontWeight="700"
                  isLoading={submitting}
                  h="56px"
                  fontSize="md"
                  mt={2}
                  _hover={{
                    bg: '#d17d35',
                    transform: "translateY(-2px)",
                    boxShadow: "0 8px 24px rgba(224, 142, 70, 0.35)",
                  }}
                  _active={{
                    transform: 'translateY(0)',
                  }}
                  transition="all 0.2s"
                >
                  送信する
                </ChakraButton>
              </VStack>
            </form>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
} 