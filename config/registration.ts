import type { Locale } from "@/i18n/routing";

export type RegistrationCopy = {
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  title: string;
  lede: string;
  back: string;
  required: string;
  sections: {
    contact: string;
    background: string;
    participation: string;
  };
  fields: {
    fullName: string;
    email: string;
    messenger: string;
    institution: string;
    educationLevel: string;
    courseOrGrade: string;
    englishLevel: string;
    quantumLevel: string;
    pythonLevel: string;
    attendanceCommitment: string;
    city: string;
    travelReadiness: string;
    heardFrom: string;
    comments: string;
    consent: string;
  };
  placeholders: {
    fullName: string;
    email: string;
    messenger: string;
    institution: string;
    courseOrGrade: string;
    city: string;
    comments: string;
    select: string;
  };
  options: Record<string, string>;
  submit: string;
  submitting: string;
  successTitle: string;
  successBody: string;
  submitAnother: string;
  error: string;
  duplicate: string;
};

const sharedOptions = {
  school: "School",
  bachelor: "Bachelor's",
  graduate: "Master's / PhD",
  other: "Other",
  a1a2: "A1–A2 · Beginner",
  b1b2: "B1–B2 · Intermediate",
  c1c2: "C1–C2 · Advanced",
  notSure: "Not sure",
  quantumNone: "Starting from zero",
  quantumHeard: "I have heard about qubits",
  quantumCourse: "I have taken a course",
  quantumQiskit: "I have worked with Qiskit",
  pythonNone: "Starting from zero",
  pythonBasic: "Basic syntax",
  pythonIntermediate: "I can write small programs",
  pythonAdvanced: "Confident / advanced",
  attendanceAll: "Yes, I can attend all sessions",
  attendanceMost: "I expect to attend most sessions",
  attendanceUnsure: "Not sure yet",
  inAstana: "I am already in Astana",
  canTravel: "I can travel to Astana",
  cannotTravel: "I cannot confirm travel yet",
  university: "University / school",
  social: "Social media",
  community: "Community / Telegram channel",
  friend: "Friend or colleague",
  sourceOther: "Other",
};

export const registrationCopy: Record<Locale, RegistrationCopy> = {
  en: {
    metaTitle: "Registration — QFFCA 2026",
    metaDescription: "Apply to Qiskit Fall Fest Central Asia 2026 in Astana.",
    eyebrow: "Participant application · QFFCA 2026",
    title: "Join Qiskit Fall Fest Central Asia!",
    lede:
      "Five Saturdays, 4 lectures, 1 hackathon. Free of charge. No previous experience needed.",
    back: "Back to the festival",
    required: "Required fields are marked with *",
    sections: {
      contact: "Contact details",
      background: "Your background",
      participation: "Participation",
    },
    fields: {
      fullName: "Full name",
      email: "Email",
      messenger: "Telegram / WhatsApp",
      institution: "Educational institution",
      educationLevel: "Education level",
      courseOrGrade: "Year / grade",
      englishLevel: "English level",
      quantumLevel: "Quantum computing experience",
      pythonLevel: "Python level",
      attendanceCommitment: "Availability for all 5 Saturday sessions and the hackathon",
      city: "Current city",
      travelReadiness: "Travel to Astana",
      heardFrom: "How did you hear about the event?",
      comments: "Comments for the organizers",
      consent: "I agree that the organizers may process these details for event registration and contact me about QFFCA 2026.",
    },
    placeholders: {
      fullName: "First and last name",
      email: "you@example.com",
      messenger: "@username or +7 …",
      institution: "University, school, or organization",
      courseOrGrade: "For example: 2nd year or grade 11",
      city: "City, country",
      comments: "Anything we should know?",
      select: "Choose an option",
    },
    options: sharedOptions,
    submit: "Submit application",
    submitting: "Submitting…",
    successTitle: "Application received",
    successBody: "Thank you. We have saved your application and will contact you by email.",
    submitAnother: "Submit another application",
    error: "We could not submit the application. Please try again.",
    duplicate: "An application with this email has already been submitted.",
  },
  ru: {
    metaTitle: "Регистрация — QFFCA 2026",
    metaDescription: "Регистрация на Qiskit Fall Fest Central Asia 2026 в Астане.",
    eyebrow: "Заявка участника · QFFCA 2026",
    title: "Join Qiskit Fall Fest Central Asia!",
    lede:
      "Five Saturdays, 4 lectures, 1 hackathon. Free of charge. No previous experience needed.",
    back: "Вернуться к фестивалю",
    required: "Обязательные поля отмечены *",
    sections: {
      contact: "Контактные данные",
      background: "Ваш опыт",
      participation: "Участие",
    },
    fields: {
      fullName: "Имя и фамилия",
      email: "Email",
      messenger: "Telegram / WhatsApp",
      institution: "Учебное заведение",
      educationLevel: "Уровень обучения",
      courseOrGrade: "Курс / класс",
      englishLevel: "Уровень английского",
      quantumLevel: "Знания по квантовым вычислениям",
      pythonLevel: "Уровень Python",
      attendanceCommitment: "Готовность посетить все 5 субботних сессий и хакатон",
      city: "Ваш город",
      travelReadiness: "Готовность приехать в Астану",
      heardFrom: "Как вы узнали о мероприятии?",
      comments: "Комментарии для организаторов",
      consent: "Я согласен(-на) на обработку этих данных для регистрации и получение сообщений о QFFCA 2026.",
    },
    placeholders: {
      fullName: "Имя и фамилия",
      email: "you@example.com",
      messenger: "@username или +7 …",
      institution: "Университет, школа или организация",
      courseOrGrade: "Например: 2 курс или 11 класс",
      city: "Город, страна",
      comments: "Что ещё нам стоит знать?",
      select: "Выберите вариант",
    },
    options: {
      school: "Школа",
      bachelor: "Бакалавриат",
      graduate: "Магистратура / PhD",
      other: "Другое",
      a1a2: "A1–A2 · Начальный",
      b1b2: "B1–B2 · Средний",
      c1c2: "C1–C2 · Продвинутый",
      notSure: "Не уверен(-а)",
      quantumNone: "Начинаю с нуля",
      quantumHeard: "Слышал(-а) про кубиты",
      quantumCourse: "Проходил(-а) курс",
      quantumQiskit: "Работал(-а) с Qiskit",
      pythonNone: "Начинаю с нуля",
      pythonBasic: "Знаю базовый синтаксис",
      pythonIntermediate: "Пишу небольшие программы",
      pythonAdvanced: "Уверенный / продвинутый",
      attendanceAll: "Да, смогу посетить всё",
      attendanceMost: "Планирую посетить большинство сессий",
      attendanceUnsure: "Пока не уверен(-а)",
      inAstana: "Я уже нахожусь в Астане",
      canTravel: "Смогу приехать в Астану",
      cannotTravel: "Пока не могу подтвердить поездку",
      university: "Университет / школа",
      social: "Социальные сети",
      community: "Сообщество / Telegram-канал",
      friend: "Друг или коллега",
      sourceOther: "Другое",
    },
    submit: "Отправить заявку",
    submitting: "Отправляем…",
    successTitle: "Заявка принята",
    successBody: "Спасибо. Мы сохранили вашу заявку и свяжемся с вами по email.",
    submitAnother: "Отправить ещё одну заявку",
    error: "Не удалось отправить заявку. Попробуйте ещё раз.",
    duplicate: "Заявка с таким email уже была отправлена.",
  },
  kk: {
    metaTitle: "Тіркелу — QFFCA 2026",
    metaDescription: "Астанадағы Qiskit Fall Fest Central Asia 2026 фестиваліне тіркелу.",
    eyebrow: "Қатысушы өтінімі · QFFCA 2026",
    title: "Join Qiskit Fall Fest Central Asia!",
    lede:
      "Five Saturdays, 4 lectures, 1 hackathon. Free of charge. No previous experience needed.",
    back: "Фестивальге оралу",
    required: "Міндетті өрістер * белгісімен көрсетілген",
    sections: {
      contact: "Байланыс деректері",
      background: "Сіздің тәжірибеңіз",
      participation: "Қатысу",
    },
    fields: {
      fullName: "Аты-жөні",
      email: "Email",
      messenger: "Telegram / WhatsApp",
      institution: "Оқу орны",
      educationLevel: "Оқу деңгейі",
      courseOrGrade: "Курс / сынып",
      englishLevel: "Ағылшын тілі деңгейі",
      quantumLevel: "Кванттық есептеулер бойынша білім",
      pythonLevel: "Python деңгейі",
      attendanceCommitment: "Барлық 5 сенбілік сессияға және хакатонға қатысу мүмкіндігі",
      city: "Қалаңыз",
      travelReadiness: "Астанаға келу мүмкіндігі",
      heardFrom: "Іс-шара туралы қайдан білдіңіз?",
      comments: "Ұйымдастырушыларға пікір",
      consent: "Осы деректерді тіркелу үшін өңдеуге және QFFCA 2026 туралы хабарласуға келісемін.",
    },
    placeholders: {
      fullName: "Аты-жөні",
      email: "you@example.com",
      messenger: "@username немесе +7 …",
      institution: "Университет, мектеп немесе ұйым",
      courseOrGrade: "Мысалы: 2 курс немесе 11 сынып",
      city: "Қала, ел",
      comments: "Біз тағы нені білуіміз керек?",
      select: "Нұсқаны таңдаңыз",
    },
    options: {
      school: "Мектеп",
      bachelor: "Бакалавриат",
      graduate: "Магистратура / PhD",
      other: "Басқа",
      a1a2: "A1–A2 · Бастапқы",
      b1b2: "B1–B2 · Орта",
      c1c2: "C1–C2 · Жоғары",
      notSure: "Нақты білмеймін",
      quantumNone: "Нөлден бастаймын",
      quantumHeard: "Кубиттер туралы естідім",
      quantumCourse: "Курс оқыдым",
      quantumQiskit: "Qiskit-пен жұмыс істедім",
      pythonNone: "Нөлден бастаймын",
      pythonBasic: "Негізгі синтаксисті білемін",
      pythonIntermediate: "Шағын бағдарламалар жаза аламын",
      pythonAdvanced: "Сенімді / жоғары",
      attendanceAll: "Иә, барлығына қатыса аламын",
      attendanceMost: "Сессиялардың көбіне қатысамын",
      attendanceUnsure: "Әзірге нақты білмеймін",
      inAstana: "Мен Астанадамын",
      canTravel: "Астанаға келе аламын",
      cannotTravel: "Сапарды әзірге растай алмаймын",
      university: "Университет / мектеп",
      social: "Әлеуметтік желі",
      community: "Қауымдастық / Telegram арнасы",
      friend: "Дос немесе әріптес",
      sourceOther: "Басқа",
    },
    submit: "Өтінімді жіберу",
    submitting: "Жіберілуде…",
    successTitle: "Өтінім қабылданды",
    successBody: "Рақмет. Өтініміңіз сақталды, сізбен email арқылы байланысамыз.",
    submitAnother: "Тағы бір өтінім жіберу",
    error: "Өтінімді жіберу мүмкін болмады. Қайта көріңіз.",
    duplicate: "Бұл email-мен өтінім бұрын жіберілген.",
  },
};
