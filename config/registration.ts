import type { Locale } from "@/i18n/routing";

export type RegistrationCopy = {
  metaTitle: string;
  metaDescription: string;
  title: string;
  lede: string;
  back: string;
  required: string;
  fields: Record<"fullName" | "participant1FullName" | "participant2FullName" | "captainTelegram" | "captainEmail" | "teamName" | "participationFormat", string>;
  placeholders: Record<"fullName" | "participant1FullName" | "participant2FullName" | "captainTelegram" | "captainEmail" | "teamName" | "select", string>;
  options: { offline: string; online: string };
  submit: string;
  submitting: string;
  successTitle: string;
  successBody: string;
  submitAnother: string;
  error: string;
  duplicate: string;
};

export const registrationCopy: Record<Locale, RegistrationCopy> = {
  ru: {
    metaTitle: "Регистрация на хакатон — Hilbert Space Quantum Fest 2026",
    metaDescription: "Зарегистрируйте команду на хакатон Hilbert Space Quantum Fest 2026. Участие онлайн или оффлайн.",
    title: "Регистрация на хакатон",
    lede: "Укажите ФИО капитана и двух участников, контакты капитана, название команды и формат участия.",
    back: "Вернуться к фестивалю",
    required: "Все поля обязательны",
    fields: { fullName: "ФИО капитана", participant1FullName: "ФИО участника 1", participant2FullName: "ФИО участника 2", captainTelegram: "Телеграм капитана", captainEmail: "Почта капитана", teamName: "Название команды", participationFormat: "Оффлайн / онлайн" },
    placeholders: { fullName: "Фамилия, имя, отчество капитана", participant1FullName: "Фамилия, имя, отчество первого участника", participant2FullName: "Фамилия, имя, отчество второго участника", captainTelegram: "@username", captainEmail: "captain@example.com", teamName: "Название вашей команды", select: "Выберите формат участия" },
    options: { offline: "Оффлайн", online: "Онлайн" },
    submit: "Зарегистрировать команду",
    submitting: "Отправляем…",
    successTitle: "Команда зарегистрирована",
    successBody: "Заявка на хакатон сохранена. Организаторы свяжутся с капитаном по указанным контактам.",
    submitAnother: "Зарегистрировать другую команду",
    error: "Не удалось отправить заявку. Проверьте данные и попробуйте ещё раз.",
    duplicate: "Команда с такой почтой капитана уже зарегистрирована на хакатон.",
  },
  en: {
    metaTitle: "Hackathon registration — Hilbert Space Quantum Fest 2026",
    metaDescription: "Register your team for the Hilbert Space Quantum Fest 2026 hackathon. Join online or offline.",
    title: "Hackathon registration",
    lede: "Enter the full names of the captain and two participants, the captain’s contact details, team name and participation format.",
    back: "Back to the festival",
    required: "All fields are required",
    fields: { fullName: "Captain’s full name", participant1FullName: "Participant 1 full name", participant2FullName: "Participant 2 full name", captainTelegram: "Captain’s Telegram", captainEmail: "Captain’s email", teamName: "Team name", participationFormat: "Offline / online" },
    placeholders: { fullName: "Captain’s full name", participant1FullName: "First participant’s full name", participant2FullName: "Second participant’s full name", captainTelegram: "@username", captainEmail: "captain@example.com", teamName: "Your team name", select: "Choose your participation format" },
    options: { offline: "Offline", online: "Online" },
    submit: "Register team",
    submitting: "Submitting…",
    successTitle: "Team registered",
    successBody: "Your hackathon application has been saved. The organizers will contact the captain using the details provided.",
    submitAnother: "Register another team",
    error: "Could not submit your application. Check your details and try again.",
    duplicate: "A team with this captain’s email is already registered for the hackathon.",
  },
  kk: {
    metaTitle: "Хакатонға тіркелу — Hilbert Space Quantum Fest 2026",
    metaDescription: "Hilbert Space Quantum Fest 2026 хакатонына командаңызды тіркеңіз. Онлайн немесе офлайн қатысу.",
    title: "Хакатонға тіркелу",
    lede: "Капитан мен екі қатысушының аты-жөнін, капитанның байланыс деректерін, команда атауын және қатысу форматын көрсетіңіз.",
    back: "Фестивальге оралу",
    required: "Барлық өрістерді толтыру қажет",
    fields: { fullName: "Капитанның аты-жөні", participant1FullName: "1-қатысушының аты-жөні", participant2FullName: "2-қатысушының аты-жөні", captainTelegram: "Капитанның Telegram-ы", captainEmail: "Капитанның электрондық поштасы", teamName: "Команда атауы", participationFormat: "Офлайн / онлайн" },
    placeholders: { fullName: "Капитанның толық аты-жөні", participant1FullName: "Бірінші қатысушының толық аты-жөні", participant2FullName: "Екінші қатысушының толық аты-жөні", captainTelegram: "@username", captainEmail: "captain@example.com", teamName: "Командаңыздың атауы", select: "Қатысу форматын таңдаңыз" },
    options: { offline: "Офлайн", online: "Онлайн" },
    submit: "Команданы тіркеу",
    submitting: "Жіберілуде…",
    successTitle: "Команда тіркелді",
    successBody: "Хакатонға өтінім сақталды. Ұйымдастырушылар көрсетілген деректер арқылы капитанмен байланысады.",
    submitAnother: "Басқа команданы тіркеу",
    error: "Өтінімді жіберу мүмкін болмады. Деректерді тексеріп, қайта көріңіз.",
    duplicate: "Осы капитанның поштасымен команда хакатонға тіркелген.",
  },
};
