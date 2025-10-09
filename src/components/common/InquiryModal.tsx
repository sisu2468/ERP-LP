import {
  Box,
  Button,
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
  SimpleGrid,
  Icon,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { FiMonitor, FiUsers, FiZap, FiArrowRight, FiArrowLeft, FiCheckCircle } from 'react-icons/fi';
import { useLanguage } from '@/contexts/LanguageContext';

interface InquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function InquiryModal({ isOpen, onClose }: InquiryModalProps) {
  const { t } = useLanguage();
  
  // 理志：メインカテゴリーの定義
  const categories = [
    {
      id: 'request',
      titleKey: 'inquiry.category.request.title',
      descKey: 'inquiry.category.request.desc',
      icon: FiMonitor,
      color: '#e08e46',
      bgColor: 'rgba(224, 142, 70, 0.08)',
      borderColor: 'rgba(224, 142, 70, 0.2)',
    },
    {
      id: 'partnership',
      titleKey: 'inquiry.category.partnership.title',
      descKey: 'inquiry.category.partnership.desc',
      icon: FiUsers,
      color: '#0891b2',
      bgColor: 'rgba(8, 145, 178, 0.08)',
      borderColor: 'rgba(8, 145, 178, 0.2)',
    },
    {
      id: 'beta',
      titleKey: 'inquiry.category.beta.title',
      descKey: 'inquiry.category.beta.desc',
      icon: FiZap,
      color: '#059669',
      bgColor: 'rgba(5, 150, 105, 0.08)',
      borderColor: 'rgba(5, 150, 105, 0.2)',
    },
  ];

  // 理志：各カテゴリーのサブ選択肢を定義
  const subOptions = {
    request: [
      { id: 'web-design', titleKey: 'inquiry.suboption.web-design' },
      { id: 'web-application', titleKey: 'inquiry.suboption.web-application' },
      { id: 'other', titleKey: 'inquiry.suboption.other' },
    ],
    partnership: [
      { id: 'offering-services', titleKey: 'inquiry.suboption.offering-services' },
      { id: 'collaboration', titleKey: 'inquiry.suboption.collaboration' },
      { id: 'other', titleKey: 'inquiry.suboption.other' },
    ],
    beta: [
      { id: 'erp-beta', titleKey: 'inquiry.suboption.erp-beta' },
      { id: 'sainta-connect-beta', titleKey: 'inquiry.suboption.sainta-connect-beta' },
    ],
  };

  const jpNameRegex = /^[\u3000\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FFF\uFF66-\uFF9F\s]+$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // 理志：モーダルの状態管理
  // step: 1=メインカテゴリー選択, 2=サブカテゴリー選択, 3=フォーム入力, 4=送信完了
  const [step, setStep] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSubOption, setSelectedSubOption] = useState<string | null>(null);
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  
  // 理志：フォームの状態管理
  const [form, setForm] = useState({ 
    lastName: '', 
    firstName: '', 
    email: '', 
    company: '', 
    phone: '', 
    content: '' 
  });
  const [touched, setTouched] = useState({ 
    lastName: false, 
    firstName: false, 
    email: false, 
    content: false 
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isLastNameError = touched.lastName && (!form.lastName || !jpNameRegex.test(form.lastName));
  const isFirstNameError = touched.firstName && (!form.firstName || !jpNameRegex.test(form.firstName));
  const isEmailError = touched.email && (!form.email || !emailRegex.test(form.email));
  const isContentError = touched.content && !form.content;

  // 理志：モーダルを閉じる際に全ての状態をリセット
  const handleClose = () => {
    setStep(1);
    setSelectedCategory(null);
    setSelectedSubOption(null);
    setHoveredCategory(null);
    setForm({ lastName: '', firstName: '', email: '', company: '', phone: '', content: '' });
    setTouched({ lastName: false, firstName: false, email: false, content: false });
    setError(null);
    onClose();
  };

  // 理志：メインカテゴリー選択時の処理
  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setStep(2);
  };

  // 理志：サブカテゴリー選択時の処理
  const handleSubOptionSelect = (optionId: string) => {
    setSelectedSubOption(optionId);
    setStep(3);
  };

  // 理志：前のステップに戻る処理
  const handleBack = () => {
    if (step === 2) {
      setStep(1);
      setSelectedCategory(null);
    } else if (step === 3) {
      setStep(2);
      setSelectedSubOption(null);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setTouched({ ...touched, [e.target.name]: true });
  };

  // 理志：フォーム送信処理
  // 選択されたカテゴリーとサブオプション情報を含めてメール送信
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setTouched({ lastName: true, firstName: true, email: true, content: true });
    
    if (!form.lastName || !jpNameRegex.test(form.lastName) || 
        !form.firstName || !jpNameRegex.test(form.firstName) || 
        !form.email || !emailRegex.test(form.email) || 
        !form.content) {
      return;
    }

    setSubmitting(true);
    setError(null);

    // 理志：選択内容をわかりやすいラベルに変換
    const categoryLabel = t(categories.find(c => c.id === selectedCategory)?.titleKey || '');
    const subOptionLabel = t(subOptions[selectedCategory as keyof typeof subOptions]?.find(
      o => o.id === selectedSubOption
    )?.titleKey || '');
    
    const fullName = `${form.lastName} ${form.firstName}`;

    const emailData = {
      to: 'support@sainta.co.jp',
      cc: ['santanamu@sainta.co.jp', 'ryu@sainta.co.jp', 'ibato@sainta.co.jp'],
      subject: `【${categoryLabel}】${fullName} 様`,
      category: categoryLabel,
      subCategory: subOptionLabel,
      name: fullName,
      email: form.email,
      company: form.company || '（未記入）',
      phone: form.phone || '（未記入）',
      content: form.content,
    };

    try {
      const response = await fetch('https://erp-lp-backend.vercel.app/api/inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(emailData),
      });

      const result = await response.json();

      if (result.ok) {
        setStep(4);
      } else {
        setError(result.message || '送信に失敗しました。');
      }
    } catch (err) {
      console.error('Inquiry submission error:', err);
      setError('送信に失敗しました。しばらく時間をおいて再度お試しください。');
    } finally {
      setSubmitting(false);
    }
  };

  // 理志：選択されたカテゴリーの情報を取得
  const currentCategory = categories.find(c => c.id === selectedCategory);

  return (
    <Modal isOpen={isOpen} onClose={handleClose} isCentered size="4xl">
      <ModalOverlay bg="rgba(0, 0, 0, 0.5)" backdropFilter="blur(8px)" />
      <ModalContent 
        borderRadius="3xl" 
        border="1px solid" 
        borderColor="#e5e7eb" 
        p={4} 
        bg="white"
        boxShadow="0 25px 80px rgba(0, 0, 0, 0.2)"
        mx={4}
      >
        <ModalHeader 
          fontWeight="800" 
          fontSize={{ base: "2xl", md: "3xl" }}
          pb={3} 
          color="#111111"
          pt={8}
          px={8}
          textAlign="center"
        >
          {step === 1 && t('inquiry.title')}
          {step === 2 && currentCategory && t(currentCategory.titleKey)}
          {step === 3 && t('inquiry.step3.title')}
          {step === 4 && t('inquiry.step4.title')}
        </ModalHeader>
        <ModalCloseButton 
          color="#6e6e73" 
          top={8}
          right={8}
          borderRadius="full"
          _hover={{ bg: '#fafafa' }}
          fontSize="lg"
        />
        
        <ModalBody px={8} pb={10}>
          {/* 理志：ステップ1 - メインカテゴリー選択 */}
          {step === 1 && (
            <VStack spacing={8} align="stretch">
              <Text
                fontSize={{ base: "md", md: "lg" }}
                color="#6e6e73"
                textAlign="center"
                lineHeight="1.7"
              >
                {t('inquiry.step1.subtitle')}
              </Text>

              <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6} w="full" pt={4}>
                {categories.map((category) => {
                  const isHovered = hoveredCategory === category.id;
                  
                  return (
                    <Box
                      key={category.id}
                      as="button"
                      onClick={() => handleCategorySelect(category.id)}
                      onMouseEnter={() => setHoveredCategory(category.id)}
                      onMouseLeave={() => setHoveredCategory(null)}
                      p={8}
                      bg={category.bgColor}
                      borderRadius="2xl"
                      border="2px solid"
                      borderColor={isHovered ? category.color : category.borderColor}
                      cursor="pointer"
                      transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                      _hover={{
                        transform: "translateY(-4px)",
                        boxShadow: `0 12px 32px ${category.color}30`,
                      }}
                      _active={{ transform: "translateY(-2px)" }}
                      position="relative"
                      overflow="hidden"
                      textAlign="left"
                    >
                      <VStack align="flex-start" spacing={4} position="relative" zIndex={1}>
                        <HStack spacing={3} align="center">
                          <Box bg={`${category.color}15`} p={3} borderRadius="xl">
                            <Icon as={category.icon} boxSize={6} color={category.color} />
                          </Box>
                          <Icon 
                            as={FiArrowRight} 
                            boxSize={5} 
                            color={category.color}
                            opacity={isHovered ? 1 : 0}
                            transition="opacity 0.3s"
                          />
                        </HStack>
                        
                        <Text fontSize="lg" fontWeight="700" color="#111111" lineHeight="1.4">
                          {t(category.titleKey)}
                        </Text>
                      </VStack>

                      <Box
                        position="absolute"
                        top="-50%"
                        right="-50%"
                        w="200%"
                        h="200%"
                        bg={`radial-gradient(circle, ${category.color}10, transparent 70%)`}
                        opacity={isHovered ? 1 : 0}
                        transition="opacity 0.3s"
                        pointerEvents="none"
                      />
                    </Box>
                  );
                })}
              </SimpleGrid>

              <Box
                minH="60px"
                p={6}
                bg="#fafafa"
                borderRadius="xl"
                border="1px solid"
                borderColor="#e5e7eb"
                transition="all 0.3s"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <Text fontSize="sm" color="#6e6e73" textAlign="center" lineHeight="1.8">
                  {hoveredCategory 
                    ? t(categories.find(c => c.id === hoveredCategory)?.descKey || '')
                    : t('inquiry.step1.hover')
                  }
                </Text>
              </Box>
            </VStack>
          )}

          {/* 理志：ステップ2 - サブカテゴリー選択 */}
          {step === 2 && selectedCategory && (
            <VStack spacing={8} align="stretch">
              <Button
                leftIcon={<FiArrowLeft />}
                onClick={handleBack}
                variant="ghost"
                size="sm"
                alignSelf="flex-start"
                color="#6e6e73"
                _hover={{ bg: '#fafafa' }}
              >
                {t('inquiry.form.back')}
              </Button>

              <Text fontSize={{ base: "md", md: "lg" }} color="#6e6e73" textAlign="center">
                {t('inquiry.step2.subtitle')}
              </Text>

              <VStack spacing={4} w="full" pt={4}>
                {subOptions[selectedCategory as keyof typeof subOptions]?.map((option) => (
                  <Box
                    key={option.id}
                    as="button"
                    onClick={() => handleSubOptionSelect(option.id)}
                    w="full"
                    p={6}
                    bg={currentCategory?.bgColor}
                    borderRadius="xl"
                    border="2px solid"
                    borderColor={currentCategory?.borderColor}
                    cursor="pointer"
                    transition="all 0.3s"
                    _hover={{
                      borderColor: currentCategory?.color,
                      transform: "translateX(8px)",
                      boxShadow: `0 8px 24px ${currentCategory?.color}30`,
                    }}
                  >
                    <HStack justify="space-between" w="full">
                      <Text fontSize="lg" fontWeight="600" color="#111111">
                        {t(option.titleKey)}
                      </Text>
                      <Icon as={FiArrowRight} boxSize={5} color={currentCategory?.color} />
                    </HStack>
                  </Box>
                ))}
              </VStack>
            </VStack>
          )}

          {/* 理志：ステップ3 - フォーム入力 */}
          {step === 3 && (
            <VStack spacing={6} align="stretch">
              <Button
                leftIcon={<FiArrowLeft />}
                onClick={handleBack}
                variant="ghost"
                size="sm"
                alignSelf="flex-start"
                color="#6e6e73"
                _hover={{ bg: '#fafafa' }}
              >
                戻る
              </Button>

              <form onSubmit={handleSubmit}>
                <VStack spacing={5} align="stretch">
                  {/* 理志：姓・名の入力フィールド（日本式） */}
                  <HStack spacing={4} align="flex-start">
                    <FormControl isRequired isInvalid={isLastNameError} flex={1}>
                      <HStack mb={2} spacing={2}>
                        <FormLabel htmlFor="lastName" mb={0} fontWeight="600" color="#111111" fontSize="sm">
                          {t('inquiry.form.lastName.label')}
                        </FormLabel>
                        <Tag size="sm" bg="#fef2f2" color="#dc2626" border="1px solid" borderColor="#fecaca" fontWeight="600" fontSize="xs">
                          {t('inquiry.form.required')}
                        </Tag>
                      </HStack>
                      <Input
                        id="lastName"
                        name="lastName"
                        placeholder={t('inquiry.form.lastName.placeholder')}
                        value={form.lastName}
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
                        _focus={{ borderColor: '#e08e46', boxShadow: '0 0 0 3px rgba(224, 142, 70, 0.1)' }}
                      />
                      <FormErrorMessage fontSize="sm" color="#dc2626">
                        {form.lastName === '' ? t('inquiry.error.lastName.required') : t('inquiry.error.lastName.invalid')}
                      </FormErrorMessage>
                    </FormControl>

                    <FormControl isRequired isInvalid={isFirstNameError} flex={1}>
                      <HStack mb={2} spacing={2}>
                        <FormLabel htmlFor="firstName" mb={0} fontWeight="600" color="#111111" fontSize="sm">
                          {t('inquiry.form.firstName.label')}
                        </FormLabel>
                        <Tag size="sm" bg="#fef2f2" color="#dc2626" border="1px solid" borderColor="#fecaca" fontWeight="600" fontSize="xs">
                          {t('inquiry.form.required')}
                        </Tag>
                      </HStack>
                      <Input
                        id="firstName"
                        name="firstName"
                        placeholder={t('inquiry.form.firstName.placeholder')}
                        value={form.firstName}
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
                        _focus={{ borderColor: '#e08e46', boxShadow: '0 0 0 3px rgba(224, 142, 70, 0.1)' }}
                      />
                      <FormErrorMessage fontSize="sm" color="#dc2626">
                        {form.firstName === '' ? t('inquiry.error.firstName.required') : t('inquiry.error.firstName.invalid')}
                      </FormErrorMessage>
                    </FormControl>
                  </HStack>

                  <FormControl>
                    <FormLabel htmlFor="company" mb={2} fontWeight="600" color="#111111" fontSize="sm">
                      {t('inquiry.form.company.label')}
                    </FormLabel>
                    <Input
                      id="company"
                      name="company"
                      placeholder={t('inquiry.form.company.placeholder')}
                      value={form.company}
                      onChange={handleChange}
                      borderRadius="lg"
                      bg="white"
                      border="1px solid"
                      borderColor="#e5e7eb"
                      color="#111111"
                      h="48px"
                      fontSize="md"
                      _hover={{ borderColor: '#d2d2d7' }}
                      _focus={{ borderColor: '#e08e46', boxShadow: '0 0 0 3px rgba(224, 142, 70, 0.1)' }}
                    />
                  </FormControl>

                  <FormControl isRequired isInvalid={isEmailError}>
                    <HStack mb={2} spacing={2}>
                      <FormLabel htmlFor="email" mb={0} fontWeight="600" color="#111111" fontSize="sm">
                        {t('inquiry.form.email.label')}
                      </FormLabel>
                      <Tag size="sm" bg="#fef2f2" color="#dc2626" border="1px solid" borderColor="#fecaca" fontWeight="600" fontSize="xs">
                        {t('inquiry.form.required')}
                      </Tag>
                    </HStack>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder={t('inquiry.form.email.placeholder')}
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
                      _focus={{ borderColor: '#e08e46', boxShadow: '0 0 0 3px rgba(224, 142, 70, 0.1)' }}
                    />
                    <FormErrorMessage fontSize="sm" color="#dc2626">
                      {form.email === '' ? t('inquiry.error.email.required') : t('inquiry.error.email.invalid')}
                    </FormErrorMessage>
                  </FormControl>

                  <FormControl>
                    <FormLabel htmlFor="phone" mb={2} fontWeight="600" color="#111111" fontSize="sm">
                      {t('inquiry.form.phone.label')}
                    </FormLabel>
                    <Input
                      id="phone"
                      name="phone"
                      placeholder={t('inquiry.form.phone.placeholder')}
                      value={form.phone}
                      onChange={handleChange}
                      borderRadius="lg"
                      bg="white"
                      border="1px solid"
                      borderColor="#e5e7eb"
                      color="#111111"
                      h="48px"
                      fontSize="md"
                      _hover={{ borderColor: '#d2d2d7' }}
                      _focus={{ borderColor: '#e08e46', boxShadow: '0 0 0 3px rgba(224, 142, 70, 0.1)' }}
                    />
                  </FormControl>

                  <FormControl isRequired isInvalid={isContentError}>
                    <HStack mb={2} spacing={2}>
                      <FormLabel htmlFor="content" mb={0} fontWeight="600" color="#111111" fontSize="sm">
                        {t('inquiry.form.content.label')}
                      </FormLabel>
                      <Tag size="sm" bg="#fef2f2" color="#dc2626" border="1px solid" borderColor="#fecaca" fontWeight="600" fontSize="xs">
                        {t('inquiry.form.required')}
                      </Tag>
                    </HStack>
                    <Textarea
                      id="content"
                      name="content"
                      placeholder={t('inquiry.form.content.placeholder')}
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
                      _focus={{ borderColor: '#e08e46', boxShadow: '0 0 0 3px rgba(224, 142, 70, 0.1)' }}
                    />
                    <FormErrorMessage fontSize="sm" color="#dc2626">
                      {t('inquiry.error.content.required')}
                    </FormErrorMessage>
                  </FormControl>

                  {error && (
                    <Box p={4} bg="#fef2f2" border="1px solid" borderColor="#fecaca" borderRadius="lg">
                      <Text color="#dc2626" fontSize="sm" fontWeight="500" textAlign="center">
                        {error}
                      </Text>
                    </Box>
                  )}

                  <Button
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
                    _active={{ transform: 'translateY(0)' }}
                    transition="all 0.2s"
                  >
                    {t('inquiry.form.submit')}
                  </Button>
                </VStack>
              </form>
            </VStack>
          )}

          {/* 理志：ステップ4 - 送信完了 */}
          {step === 4 && (
            <VStack spacing={6} py={12} textAlign="center">
              <Box
                w={20}
                h={20}
                borderRadius="full"
                bg="rgba(224, 142, 70, 0.1)"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <Icon as={FiCheckCircle} boxSize={10} color="#e08e46" />
              </Box>
              <VStack spacing={2}>
                <Text fontWeight="700" fontSize="2xl" color="#111111">
                  {t('inquiry.step4.success')}
                </Text>
                <Text fontSize="md" color="#6e6e73" lineHeight="1.8">
                  {t('inquiry.step4.message')}
                </Text>
              </VStack>
              <Button
                onClick={handleClose}
                bg="#e08e46"
                color="white"
                borderRadius="lg"
                fontWeight="600"
                h="48px"
                px={8}
                mt={4}
                _hover={{ bg: '#d17d35' }}
              >
                {t('inquiry.step4.close')}
              </Button>
            </VStack>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
} 