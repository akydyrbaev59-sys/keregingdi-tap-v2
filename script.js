// ======================================
// KEREGINGDI TAP — SCRIPT.JS
// ======================================


// ======================================
// SUPABASE
// ======================================

const SUPABASE_URL =
  "https://tujxayqnphwdnoxbmrcx.supabase.co";

const SUPABASE_KEY =
  "sb_publishable_g21EpKx_cNhUW6rhoeKH7A_CtF93UzY";


const supabaseClient =
  window.supabase
    ? window.supabase.createClient(
        SUPABASE_URL,
        SUPABASE_KEY,
        {
          auth: {
            persistSession: true,
            autoRefreshToken: true,
            detectSessionInUrl: true,
            storage: window.localStorage
          }
        }
      )
    : null;


// ======================================
// TRANSLATIONS
// ======================================

const translations = {

  kk: {

    home: "Басты бет",
    services: "Қызметтер",
    requests: "Сұраныстар",
    favorites: "Таңдаулылар",
    support: "Қолдау",
    profile: "Профиль",
    login: "Кіру",
    register: "Тіркелу",
    logout: "Шығу",

    addService: "Қызмет қосу",
    addRequest: "Сұраныс қосу",
    back: "← Артқа",

    slogan: "Қызмет ізде. Қызмет ұсын.",

    search: "Іздеу",

    heroLabel:
      "Ақтауда керек қызметті тап",

    heroTitle:
      "Керегіңді тап. Қызметіңді ұсын.",

    heroText:
      "Қаладағы мамандарды, шеберлерді және түрлі қызметтерді бір жерден оңай тап.",

    searchPlaceholder:
      "Мысалы: сантехник, электрик, курьер...",

    findService:
      "Қызмет іздеу",

    offerService:
      "Қызмет ұсын",

    whoNeeded:
      "Саған кім керек?",

    whoNeededText:
      "Керек маманды іздеу арқылы бірнеше секундта таба аласың.",

    servicesWord:
      "Қызметтер",

    comfortable:
      "Ыңғайлы",

    categories:
      "Категориялар",

    whatService:
      "Қандай қызмет керек?",

    viewAll:
      "Барлығын көру →",

    plumber:
      "Сантехник",

    electrician:
      "Электрик",

    auto:
      "Авто қызмет",

    beauty:
      "Beauty",

    cleaning:
      "Тазалық",

    delivery:
      "Жеткізу",

    repair:
      "Жөндеу",

    education:
      "Оқу",

    moving:
      "Жүк тасу",

    other:
      "Басқа",

    plumberDesc:
      "Құбыр, кран, су жүйесі",

    electricianDesc:
      "Электр жөндеу",

    autoDesc:
      "Көлік жөндеу",

    beautyDesc:
      "Сұлулық қызметтері",

    cleaningDesc:
      "Үй және офис тазалау",

    deliveryDesc:
      "Курьер және доставка",

    repairDesc:
      "Үй және техника жөндеу",

    educationDesc:
      "Репетитор және курстар",

    movingDesc:
      "Көшіру және тасымал",

    areYouSpecialist:
      "Мамансың ба?",

    publishService:
      "Қызметіңді жарияла",

    publishServiceText:
      "Клиенттер сені өздері тапсын.",

    needSpecialist:
      "Маман керек пе?",

    publishRequest:
      "Сұраныс жариялау",

    publishRequestText:
      "Не керек екенін жаз, мамандар өздері байланыссын.",

    urgentHelp:
      "Шұғыл көмек",

    services247:
      "24/7 қызметтер",

    autoHelp:
      "Авто көмек",

    otherService:
      "Басқа қызмет",

    needHelp:
      "Көмек керек пе?",

    adminQuestion:
      "Сайт бойынша сұрағың болса, админге жаз",

    adminQuestionText:
      "Тіркелу, жариялау немесе басқа мәселе болса тікелей WhatsApp арқылы хабарласа аласың.",

    writeAdmin:
      "Админге жазу",

    servicesPageText:
      "Қаладағы керек маманды оңай тауып, тікелей байланыс.",

    servicesSearchPlaceholder:
      "Қызмет немесе маман іздеу...",

    all:
      "Барлығы",

    foundServices:
      "Табылған қызметтер:",

    sort:
      "Сұрыптау",

    sortRating:
      "Рейтинг бойынша",

    sortCheap:
      "Бағасы арзан",

    sortExpensive:
      "Бағасы қымбат",

    realServicesOnlyText:
      "Бұл жерде тек қолданушылар өздері жариялаған нақты қызметтер көрсетіледі.",

    noRealServices:
      "Әзірге қызмет жарияланбаған",

    noRealServicesText:
      "Бірінші нақты қызмет жарияланғаннан кейін ол осы жерде көрінеді.",

    publishFirstService:
      "Қызмет жариялау",

    publishYourService:
      "Қызметіңді жарияла",

    publishYourServiceText:
      "Мәліметтерді толтыр. Жариялау админ тексергеннен кейін сайтқа шығады.",

    basicInfo:
      "Негізгі ақпарат",

    basicInfoText:
      "Қызмет туралы негізгі мәліметтерді толтыр.",

    yourName:
      "Аты-жөнің",

    yourNamePlaceholder:
      "Мысалы: Ерлан",

    serviceName:
      "Қызмет атауы",

    serviceNamePlaceholder:
      "Мысалы: Сантехник",

    category:
      "Категория",

    chooseCategory:
      "Категория таңдаңыз",

    choose:
      "Таңдаңыз",

    price:
      "Бағасы",

    pricePlaceholder:
      "Мысалы: 5000",

    contacts:
      "Байланыс",

    contactsText:
      "Клиент сенімен қалай байланысатынын көрсет.",

    phoneNumber:
      "Телефон нөмірі",

    whatsappNumber:
      "WhatsApp нөмірі",

    location:
      "Орналасуы",

    locationPlaceholder:
      "Мысалы: Ақтау, 12 мкр",

    workingHours:
      "Жұмыс уақыты",

    workTimePlaceholder:
      "Мысалы: 09:00 – 22:00",

    serviceDescription:
      "Қызмет сипаттамасы",

    serviceDescriptionText:
      "Не істейтініңді нақты жаз.",

    fullDescription:
      "Толық сипаттама",

    descriptionPlaceholder:
      "Қандай қызмет көрсететініңді, тәжірибеңді және басқа маңызды ақпаратты жаз...",

    max700:
      "700 таңбаға дейін",

    photos:
      "Фотолар",

    photosText:
      "Жұмысыңның фотоларын кейін базаға жүктейтін боламыз.",

    choosePhoto:
      "Фото таңда",

    photoFormats:
      "PNG немесе JPG",

    termsText:
      "Жариялаған ақпараттың дұрыстығына жауап беремін және сайт ережелерімен келісемін.",

    sendForReview:
      "Тексеруге жіберу",

    reviewNote:
      "Жариялау админ тексергеннен кейін ғана сайтқа шығады.",

    adminChecks:
      "Админ тексереді",

    adminChecksText:
      "Әр жаңа қызмет автоматты түрде «Тексерілуде» статусына түседі.",

    clientsContact:
      "Клиенттер байланысады",

    clientsContactText:
      "Жарияланғаннан кейін адамдар WhatsApp немесе телефон арқылы тікелей жаза алады.",

    editLater:
      "Кейін өзгерте аласың",

    editLaterText:
      "Профиль арқылы өз жариялауыңды өзгерту немесе өшіру функциясын қосамыз.",

    requestsPageText:
      "Қолданушылар жариялаған нақты сұраныстар осы жерде көрінеді.",

    latestRequests:
      "Соңғы сұраныстар",

    specialistsCanReply:
      "Нақты сұраныстар жарияланғаннан кейін осы жерде шығады.",

    allCategories:
      "Барлық категория",

    whatDoYouNeed:
      "Саған қандай қызмет керек?",

    requestFormText:
      "Мәліметтерді толтыр. База қосылғаннан кейін нақты сұранысың сайтқа жарияланады.",

    whatNeeded:
      "Не керек?",

    requestTitlePlaceholder:
      "Мысалы: сантехник керек",

    requestLocationPlaceholder:
      "Мысалы: 12 мкр",

    budget:
      "Бюджет",

    requestBudgetPlaceholder:
      "Мысалы: 5000 ₸ дейін",

    fullInfo:
      "Толық ақпарат",

    requestDescriptionPlaceholder:
      "Не болғанын қысқаша түсіндір...",

    sendRequest:
      "Сұранысты жіберу",

    noRequestsYet:
      "Әзірге сұраныс жарияланбаған",

    noRequestsYetText:
      "Бірінші нақты сұраныс жарияланғаннан кейін ол осы жерде көрінеді.",

    favoritesPageText:
      "Сақтаған нақты қызметтерің осы жерде көрінеді.",

    favoritesEmptyTitle:
      "Таңдаулылар әзірге бос",

    favoritesEmptyText:
      "Нақты қызметті таңдаулыға қосқанда, ол осы жерде көрінеді.",

    viewServices:
      "Қызметтерді көру",

    myProfile:
      "Менің профилім",

    editProfile:
      "Профильді өзгерту",

    myServices:
      "Менің қызметтерім",

    myRequests:
      "Менің сұраныстарым",

    settings:
      "Баптаулар",

    profileNotLoaded:
      "Профиль мәліметтері",

    profileDataText:
      "Нақты аккаунт қосылғанда аты-жөнің мен телефон нөмірің осы жерде көрінеді.",

    myServicesText:
      "Жариялаған нақты қызметтерің осы жерде көрінеді.",

    noMyServices:
      "Әзірге қызмет жарияламадың",

    noMyServicesText:
      "Қызмет жариялағаннан кейін ол осы жерде көрінеді.",

    myRequestsText:
      "Өзің жариялаған нақты сұраныстар осы жерде тұрады.",

    noMyRequests:
      "Әзірге сұраныс жарияламадың",

    noMyRequestsText:
      "Сұраныс жариялағаннан кейін ол осы жерде көрінеді.",

    profileFavoritesText:
      "Сақтаған нақты қызметтерің осы жерде көрінеді.",

    openFavorites:
      "Ашып көру",

    settingsText:
      "Нақты аккаунт қосылғанда жеке мәліметтеріңді осы жерден өзгерте аласың.",

    settingsComing:
      "Баптаулар база қосылғанда жұмыс істейді",

    settingsComingText:
      "Қазір сайттың интерфейсі дайын, аккаунт мәліметтері кейін база арқылы сақталады.",

    city:
      "Қала",

    siteLanguage:
      "Сайт тілі",

    saveChanges:
      "Өзгерістерді сақтау",

    welcomeBack:
      "Қайта келгеніңе қуаныштымыз",

    loginIntroText:
      "Аккаунтыңа кіріп, қызметтеріңді, сұраныстарыңды және таңдаулы мамандарыңды басқара аласың.",

    loginBenefit1:
      "✓ Қызметтеріңді басқар",

    loginBenefit2:
      "✓ Сұраныстарыңды бақыла",

    loginBenefit3:
      "✓ Таңдаулыларды сақта",

    loginCardText:
      "Аккаунтыңа кіру үшін мәліметтеріңді енгіз.",

    password:
      "Құпиясөз",

    passwordPlaceholder:
      "Құпиясөзді енгіз",

    noAccount:
      "Аккаунтың жоқ па?",

    createAccountTitle:
      "Жаңа аккаунт аш",

    createAccountText:
      "Тіркеліп, өз қызметіңді жарияла, сұраныс қалдыр және ұнаған мамандарды таңдаулыға сақта.",

    registerBenefit1:
      "✓ Қызмет жариялау",

    registerBenefit2:
      "✓ Сұраныс қалдыру",

    registerBenefit3:
      "✓ Профиль арқылы басқару",

    registerCardText:
      "Аккаунт ашу үшін мәліметтеріңді толтыр.",

    cityPlaceholder:
      "Мысалы: Ақтау",

    createPasswordPlaceholder:
      "Құпиясөз ойлап тап",

    repeatPassword:
      "Құпиясөзді қайтала",

    repeatPasswordPlaceholder:
      "Құпиясөзді қайта енгіз",

    registerTermsText:
      "Сайт ережелерімен және жеке мәліметтерді өңдеу шарттарымен келісемін.",

    createAccount:
      "Аккаунт ашу",

    alreadyAccount:
      "Аккаунтың бар ма?",

    supportPageText:
      "Сайт бойынша сұрағың немесе мәселең болса, админге тікелей жаза аласың.",

    howCanWeHelp:
      "Қалай көмектесе аламыз?",

    chooseProblemText:
      "Төменнен мәселенің түрін таңда. WhatsApp хабарламасы автоматты түрде дайындалады.",

    registrationProblem:
      "Тіркелу мәселесі",

    registrationProblemText:
      "Аккаунт ашылмайды немесе кіре алмай жатырмын.",

    servicePublishing:
      "Қызмет жариялау",

    servicePublishingText:
      "Қызмет қосу немесе жариялау бойынша көмек керек.",

    requestProblem:
      "Сұраныс",

    requestProblemText:
      "Сұраныс жариялау немесе өшіру мәселесі.",

    complaint:
      "Шағым",

    complaintText:
      "Маманға, клиентке немесе жарияланымға шағымдану.",

    accountProblem:
      "Аккаунт",

    accountProblemText:
      "Профиль немесе жеке мәліметтер бойынша сұрақ.",

    otherQuestion:
      "Басқа сұрақ",

    otherQuestionText:
      "Тізімде жоқ басқа мәселе немесе ұсыныс.",

    contactAdmin:
      "Админмен байланысу",

    writeUs:
      "Бізге жаз",

    supportContactText:
      "Мәселені қысқаша түсіндір. WhatsApp ашылғанда дайын хабарлама жіберіледі.",

    selectedTopic:
      "Таңдалған тақырып",

    yourMessage:
      "Хабарлама",

    supportMessagePlaceholder:
      "Мәселеңді немесе сұрағыңды жаз...",

    writeAdminWhatsApp:
      "WhatsApp арқылы админге жазу",

    supportReplyText:
      "Хабарлама тікелей сайт админінің WhatsApp нөміріне жіберіледі.",

    adminPanel:
      "АДМИН ПАНЕЛЬ",

    dashboard:
      "Басты бет",

    users:
      "Қолданушылар",

    reports:
      "Шағымдар",

    vipTop:
      "TOP / VIP",

    openSite:
      "← Сайтқа өту",

    adminControl:
      "Keregingdi Tap басқару панелі",

    administrator:
      "Администратор",

    registeredUsers:
      "Тіркелген қолданушылар",

    publishedServices:
      "Жарияланған қызметтер",

    waitingReview:
      "Тексеруді күтіп тұр",

    activeReports:
      "Белсенді шағымдар",

    waitingModeration:
      "Модерация күтіп тұрғандар",

    checkBeforePublish:
      "Жаңа қызметтер жіберілгенде осы жерде шығады.",

    latestActivity:
      "Соңғы әрекеттер",

    siteActivity:
      "Нақты әрекеттер база қосылғаннан кейін көрінеді.",

    noModeration:
      "Әзірге тексеретін қызмет жоқ",

    noModerationText:
      "Қолданушы жаңа қызмет жібергенде осы жерде көрінеді.",

    noActivity:
      "Әзірге әрекет жоқ",

    noActivityText:
      "Тіркелу, қызмет жариялау және шағымдар кейін осы жерде шығады.",

    serviceModeration:
      "Қызметтерді модерациялау",

    serviceModerationText:
      "Қолданушылар жіберген нақты қызметтерді осы жерден басқарасың.",

    allStatuses:
      "Барлық статус",

    underReview:
      "Тексерілуде",

    published:
      "Жарияланды",

    rejected:
      "Қабылданбады",

    noAdminServices:
      "Әзірге қызмет жоқ",

    noAdminServicesText:
      "Жаңа қызмет жіберілгенде осы бөлімде пайда болады.",

    userRequests:
      "Қолданушылар сұраныстары",

    userRequestsText:
      "Нақты жарияланған сұраныстарды осы жерден бақылайсың.",

    noAdminRequests:
      "Әзірге сұраныс жоқ",

    noAdminRequestsText:
      "Қолданушы сұраныс жариялағанда осы жерде көрінеді.",

    usersText:
      "Нақты тіркелген аккаунттарды осы жерден басқарасың.",

    searchUser:
      "Қолданушы іздеу...",

    noUsers:
      "Әзірге қолданушы тіркелмеген",

    noUsersText:
      "Бірінші адам тіркелгеннен кейін осы жерде көрінеді.",

    reportsText:
      "Нақты шағымдар келгенде осы жерден тексересің.",

    noReports:
      "Әзірге шағым жоқ",

    noReportsText:
      "Қолданушы шағым жібергенде осы жерде көрінеді.",

    vipText:
      "Ақылы көтеру жүйесін кейін база мен төлем қосылғанда іске қосамыз.",

    topPlacement:
      "TOP орналастыру",

    topPlacementText:
      "Кейін қызметті тізімнің жоғарғы жағына көтеруге арналған мүмкіндік болады.",

    vipPlacement:
      "VIP орналастыру",

    vipPlacementText:
      "Кейін қызметті ерекше белгімен көрсетуге арналған мүмкіндік болады.",

    noServiceSelected:
      "Қызмет таңдалмаған",

    noServiceSelectedText:
      "Нақты қызметті таңдағанда, сол қызметтің толық ақпараты осы жерде көрінеді."
  },


  ru: {

    home: "Главная",
    services: "Услуги",
    requests: "Заявки",
    favorites: "Избранное",
    support: "Поддержка",
    profile: "Профиль",
    login: "Войти",
    register: "Регистрация",
    logout: "Выйти",

    addService: "Добавить услугу",
    addRequest: "Добавить заявку",

    back: "← Назад",

    slogan:
      "Найди услугу. Предложи свою.",

    search:
      "Найти",

    heroLabel:
      "Найди нужную услугу в Актау",

    heroTitle:
      "Найди нужное. Предложи свою услугу.",

    heroText:
      "Находи специалистов, мастеров и различные услуги города в одном месте.",

    searchPlaceholder:
      "Например: сантехник, электрик, курьер...",

    findService:
      "Найти услугу",

    offerService:
      "Предложить услугу",

    whoNeeded:
      "Кто вам нужен?",

    whoNeededText:
      "Найдите нужного специалиста за несколько секунд.",

    servicesWord:
      "Услуги",

    comfortable:
      "Удобно",

    categories:
      "Категории",

    whatService:
      "Какая услуга вам нужна?",

    viewAll:
      "Смотреть все →",

    plumber:
      "Сантехник",

    electrician:
      "Электрик",

    auto:
      "Автоуслуги",

    beauty:
      "Beauty",

    cleaning:
      "Уборка",

    delivery:
      "Доставка",

    repair:
      "Ремонт",

    education:
      "Обучение",

    moving:
      "Грузоперевозки",

    other:
      "Другое",

    plumberDesc:
      "Трубы, краны, водоснабжение",

    electricianDesc:
      "Ремонт электрики",

    autoDesc:
      "Ремонт автомобиля",

    beautyDesc:
      "Бьюти-услуги",

    cleaningDesc:
      "Уборка дома и офиса",

    deliveryDesc:
      "Курьер и доставка",

    repairDesc:
      "Ремонт дома и техники",

    educationDesc:
      "Репетиторы и курсы",

    movingDesc:
      "Переезды и перевозки",

    areYouSpecialist:
      "Вы специалист?",

    publishService:
      "Опубликуйте свою услугу",

    publishServiceText:
      "Пусть клиенты сами находят вас.",

    needSpecialist:
      "Нужен специалист?",

    publishRequest:
      "Опубликовать заявку",

    publishRequestText:
      "Напишите, что вам нужно, и специалисты смогут связаться с вами.",

    urgentHelp:
      "Срочная помощь",

    services247:
      "Услуги 24/7",

    autoHelp:
      "Помощь с авто",

    otherService:
      "Другая услуга",

    needHelp:
      "Нужна помощь?",

    adminQuestion:
      "Если есть вопросы по сайту, напишите администратору",

    adminQuestionText:
      "По вопросам регистрации, публикации или другим проблемам можно написать напрямую в WhatsApp.",

    writeAdmin:
      "Написать админу",

    servicesPageText:
      "Легко находите нужного специалиста в городе и связывайтесь напрямую.",

    servicesSearchPlaceholder:
      "Поиск услуги или специалиста...",

    all:
      "Все",

    foundServices:
      "Найдено услуг:",

    sort:
      "Сортировка",

    sortRating:
      "По рейтингу",

    sortCheap:
      "Сначала дешевле",

    sortExpensive:
      "Сначала дороже",

    realServicesOnlyText:
      "Здесь отображаются только реальные услуги, опубликованные пользователями.",

    noRealServices:
      "Услуг пока нет",

    noRealServicesText:
      "После публикации первой реальной услуги она появится здесь.",

    publishFirstService:
      "Опубликовать услугу",

    publishYourService:
      "Опубликуйте свою услугу",

    publishYourServiceText:
      "Заполните информацию. Объявление появится на сайте после проверки администратором.",

    basicInfo:
      "Основная информация",

    basicInfoText:
      "Заполните основные данные об услуге.",

    yourName:
      "Ваше имя",

    yourNamePlaceholder:
      "Например: Ерлан",

    serviceName:
      "Название услуги",

    serviceNamePlaceholder:
      "Например: Сантехник",

    category:
      "Категория",

    chooseCategory:
      "Выберите категорию",

    choose:
      "Выберите",

    price:
      "Цена",

    pricePlaceholder:
      "Например: 5000",

    contacts:
      "Контакты",

    contactsText:
      "Укажите, как клиент сможет связаться с вами.",

    phoneNumber:
      "Номер телефона",

    whatsappNumber:
      "Номер WhatsApp",

    location:
      "Местоположение",

    locationPlaceholder:
      "Например: Актау, 12 мкр",

    workingHours:
      "Время работы",

    workTimePlaceholder:
      "Например: 09:00 – 22:00",

    serviceDescription:
      "Описание услуги",

    serviceDescriptionText:
      "Подробно опишите, что вы делаете.",

    fullDescription:
      "Полное описание",

    descriptionPlaceholder:
      "Опишите услуги, опыт и другую важную информацию...",

    max700:
      "До 700 символов",

    photos:
      "Фотографии",

    photosText:
      "Позже фотографии работ будут загружаться в базу.",

    choosePhoto:
      "Выбрать фото",

    photoFormats:
      "PNG или JPG",

    termsText:
      "Я отвечаю за достоверность опубликованной информации и соглашаюсь с правилами сайта.",

    sendForReview:
      "Отправить на проверку",

    reviewNote:
      "Объявление появится только после проверки администратором.",

    adminChecks:
      "Проверяет администратор",

    adminChecksText:
      "Каждая новая услуга автоматически получает статус «На проверке».",

    clientsContact:
      "Клиенты смогут связаться",

    clientsContactText:
      "После публикации пользователи смогут написать в WhatsApp или позвонить.",

    editLater:
      "Можно изменить позже",

    editLaterText:
      "Через профиль можно будет изменить или удалить объявление.",

    requestsPageText:
      "Здесь отображаются реальные заявки, опубликованные пользователями.",

    latestRequests:
      "Последние заявки",

    specialistsCanReply:
      "Реальные заявки появятся здесь после публикации.",

    allCategories:
      "Все категории",

    whatDoYouNeed:
      "Какая услуга вам нужна?",

    requestFormText:
      "Заполните данные. После подключения базы реальная заявка будет опубликована на сайте.",

    whatNeeded:
      "Что нужно?",

    requestTitlePlaceholder:
      "Например: нужен сантехник",

    requestLocationPlaceholder:
      "Например: 12 мкр",

    budget:
      "Бюджет",

    requestBudgetPlaceholder:
      "Например: до 5000 ₸",

    fullInfo:
      "Подробности",

    requestDescriptionPlaceholder:
      "Кратко опишите проблему...",

    sendRequest:
      "Отправить заявку",

    noRequestsYet:
      "Заявок пока нет",

    noRequestsYetText:
      "После публикации первой реальной заявки она появится здесь.",

    favoritesPageText:
      "Сохранённые реальные услуги будут отображаться здесь.",

    favoritesEmptyTitle:
      "Избранное пока пусто",

    favoritesEmptyText:
      "Когда вы добавите реальную услугу в избранное, она появится здесь.",

    viewServices:
      "Посмотреть услуги",

    myProfile:
      "Мой профиль",

    editProfile:
      "Изменить профиль",

    myServices:
      "Мои услуги",

    myRequests:
      "Мои заявки",

    settings:
      "Настройки",

    profileNotLoaded:
      "Данные профиля",

    profileDataText:
      "После подключения реального аккаунта здесь будут отображаться имя и номер телефона.",

    myServicesText:
      "Здесь будут отображаться ваши реальные опубликованные услуги.",

    noMyServices:
      "Вы пока не публиковали услуги",

    noMyServicesText:
      "После публикации услуга появится здесь.",

    myRequestsText:
      "Здесь будут отображаться ваши реальные заявки.",

    noMyRequests:
      "Вы пока не публиковали заявки",

    noMyRequestsText:
      "После публикации заявка появится здесь.",

    profileFavoritesText:
      "Сохранённые реальные услуги будут отображаться здесь.",

    openFavorites:
      "Открыть",

    settingsText:
      "После подключения реального аккаунта здесь можно будет изменять личные данные.",

    settingsComing:
      "Настройки заработают после подключения базы",

    settingsComingText:
      "Интерфейс сайта уже готов, данные аккаунта позже будут сохраняться через базу.",

    city:
      "Город",

    siteLanguage:
      "Язык сайта",

    saveChanges:
      "Сохранить изменения",

    welcomeBack:
      "Рады видеть вас снова",

    loginIntroText:
      "Войдите в аккаунт, чтобы управлять услугами, заявками и избранным.",

    loginBenefit1:
      "✓ Управляйте своими услугами",

    loginBenefit2:
      "✓ Следите за своими заявками",

    loginBenefit3:
      "✓ Сохраняйте избранное",

    loginCardText:
      "Введите данные для входа в аккаунт.",

    password:
      "Пароль",

    passwordPlaceholder:
      "Введите пароль",

    noAccount:
      "Нет аккаунта?",

    createAccountTitle:
      "Создайте новый аккаунт",

    createAccountText:
      "Зарегистрируйтесь, публикуйте услуги, оставляйте заявки и сохраняйте специалистов.",

    registerBenefit1:
      "✓ Публикация услуг",

    registerBenefit2:
      "✓ Создание заявок",

    registerBenefit3:
      "✓ Управление через профиль",

    registerCardText:
      "Заполните данные для создания аккаунта.",

    cityPlaceholder:
      "Например: Актау",

    createPasswordPlaceholder:
      "Придумайте пароль",

    repeatPassword:
      "Повторите пароль",

    repeatPasswordPlaceholder:
      "Введите пароль ещё раз",

    registerTermsText:
      "Я согласен с правилами сайта и условиями обработки персональных данных.",

    createAccount:
      "Создать аккаунт",

    alreadyAccount:
      "Уже есть аккаунт?",

    supportPageText:
      "Если у вас есть вопрос или проблема с сайтом, можно напрямую написать администратору.",

    howCanWeHelp:
      "Чем мы можем помочь?",

    chooseProblemText:
      "Выберите тип проблемы. Сообщение для WhatsApp будет подготовлено автоматически.",

    registrationProblem:
      "Проблема с регистрацией",

    registrationProblemText:
      "Не получается зарегистрироваться или войти в аккаунт.",

    servicePublishing:
      "Публикация услуги",

    servicePublishingText:
      "Нужна помощь с добавлением или публикацией услуги.",

    requestProblem:
      "Заявка",

    requestProblemText:
      "Проблема с публикацией или удалением заявки.",

    complaint:
      "Жалоба",

    complaintText:
      "Жалоба на специалиста, клиента или объявление.",

    accountProblem:
      "Аккаунт",

    accountProblemText:
      "Вопрос по профилю или личным данным.",

    otherQuestion:
      "Другой вопрос",

    otherQuestionText:
      "Другой вопрос, проблема или предложение.",

    contactAdmin:
      "Связаться с администратором",

    writeUs:
      "Напишите нам",

    supportContactText:
      "Кратко опишите проблему. При открытии WhatsApp будет подготовлено сообщение.",

    selectedTopic:
      "Выбранная тема",

    yourMessage:
      "Сообщение",

    supportMessagePlaceholder:
      "Напишите свой вопрос или опишите проблему...",

    writeAdminWhatsApp:
      "Написать админу в WhatsApp",

    supportReplyText:
      "Сообщение будет отправлено напрямую администратору сайта.",

    adminPanel:
      "АДМИН-ПАНЕЛЬ",

    dashboard:
      "Главная",

    users:
      "Пользователи",

    reports:
      "Жалобы",

    vipTop:
      "TOP / VIP",

    openSite:
      "← Перейти на сайт",

    adminControl:
      "Панель управления Keregingdi Tap",

    administrator:
      "Администратор",

    registeredUsers:
      "Зарегистрированные пользователи",

    publishedServices:
      "Опубликованные услуги",

    waitingReview:
      "Ожидают проверки",

    activeReports:
      "Активные жалобы",

    waitingModeration:
      "Ожидают модерации",

    checkBeforePublish:
      "Новые услуги появятся здесь после отправки.",

    latestActivity:
      "Последние действия",

    siteActivity:
      "Реальные действия появятся после подключения базы.",

    noModeration:
      "Пока нет услуг для проверки",

    noModerationText:
      "Когда пользователь отправит новую услугу, она появится здесь.",

    noActivity:
      "Пока нет действий",

    noActivityText:
      "Регистрации, публикации услуг и жалобы позже будут отображаться здесь.",

    serviceModeration:
      "Модерация услуг",

    serviceModerationText:
      "Здесь можно будет управлять реальными услугами пользователей.",

    allStatuses:
      "Все статусы",

    underReview:
      "На проверке",

    published:
      "Опубликовано",

    rejected:
      "Отклонено",

    noAdminServices:
      "Услуг пока нет",

    noAdminServicesText:
      "После отправки новой услуги она появится в этом разделе.",

    userRequests:
      "Заявки пользователей",

    userRequestsText:
      "Здесь можно будет контролировать реальные опубликованные заявки.",

    noAdminRequests:
      "Заявок пока нет",

    noAdminRequestsText:
      "Когда пользователь опубликует заявку, она появится здесь.",

    usersText:
      "Здесь можно будет управлять реальными зарегистрированными аккаунтами.",

    searchUser:
      "Поиск пользователя...",

    noUsers:
      "Пользователей пока нет",

    noUsersText:
      "После регистрации первого пользователя он появится здесь.",

    reportsText:
      "Здесь можно будет проверять реальные жалобы.",

    noReports:
      "Жалоб пока нет",

    noReportsText:
      "Когда пользователь отправит жалобу, она появится здесь.",

    vipText:
      "Платное продвижение будет подключено позже вместе с базой и оплатой.",

    topPlacement:
      "TOP-размещение",

    topPlacementText:
      "Позже можно будет поднимать услугу выше в списке.",

    vipPlacement:
      "VIP-размещение",

    vipPlacementText:
      "Позже можно будет выделять услугу специальным значком.",

    noServiceSelected:
      "Услуга не выбрана",

    noServiceSelectedText:
      "После выбора реальной услуги здесь будет отображаться полная информация."
  }
};


// ======================================
// LANGUAGE
// ======================================

function setLanguage(language) {

  if (!translations[language]) {
    language = "kk";
  }

  localStorage.setItem(
    "siteLanguage",
    language
  );

  document.documentElement.lang =
    language === "ru"
      ? "ru"
      : "kk";


  document
    .querySelectorAll("[data-i18n]")
    .forEach(element => {

      const key =
        element.dataset.i18n;

      if (
        translations[language][key] !==
        undefined
      ) {

        element.textContent =
          translations[language][key];

      }

    });


  document
    .querySelectorAll(
      "[data-i18n-placeholder]"
    )
    .forEach(element => {

      const key =
        element.dataset.i18nPlaceholder;

      if (
        translations[language][key] !==
        undefined
      ) {

        element.placeholder =
          translations[language][key];

      }

    });


  document
    .querySelectorAll(".lang-btn")
    .forEach(button => {

      button.classList.remove("active");

      if (
        button.dataset.lang === language
      ) {

        button.classList.add("active");

      }

    });


  updatePageTitle(language);

  updateSupportTopic(language);
}


// LANGUAGE BUTTONS

document
  .querySelectorAll(".lang-btn")
  .forEach(button => {

    button.addEventListener(
      "click",
      () => {

        setLanguage(
          button.dataset.lang
        );

      }
    );

  });


// ======================================
// PAGE TITLE
// ======================================

function updatePageTitle(language) {

  const file =
    window.location.pathname
      .split("/")
      .pop() || "index.html";


  const titles = {

    "index.html": {
      kk: "Keregingdi Tap",
      ru: "Keregingdi Tap"
    },

    "services.html": {
      kk: "Қызметтер — Keregingdi Tap",
      ru: "Услуги — Keregingdi Tap"
    },

    "service-detail.html": {
      kk: "Қызмет туралы — Keregingdi Tap",
      ru: "Об услуге — Keregingdi Tap"
    },

    "add-service.html": {
      kk: "Қызмет қосу — Keregingdi Tap",
      ru: "Добавить услугу — Keregingdi Tap"
    },

    "requests.html": {
      kk: "Сұраныстар — Keregingdi Tap",
      ru: "Заявки — Keregingdi Tap"
    },

    "favorites.html": {
      kk: "Таңдаулылар — Keregingdi Tap",
      ru: "Избранное — Keregingdi Tap"
    },

    "profile.html": {
      kk: "Профиль — Keregingdi Tap",
      ru: "Профиль — Keregingdi Tap"
    },

    "login.html": {
      kk: "Кіру — Keregingdi Tap",
      ru: "Вход — Keregingdi Tap"
    },

    "register.html": {
      kk: "Тіркелу — Keregingdi Tap",
      ru: "Регистрация — Keregingdi Tap"
    },

    "support.html": {
      kk: "Қолдау — Keregingdi Tap",
      ru: "Поддержка — Keregingdi Tap"
    },

    "admin.html": {
      kk: "Admin — Keregingdi Tap",
      ru: "Admin — Keregingdi Tap"
    }

  };


  if (titles[file]) {

    document.title =
      titles[file][language];

  }

}


// ======================================
// MOBILE MENU
// ======================================

const menuBtn =
  document.getElementById("menuBtn");

const mobileMenu =
  document.getElementById("mobileMenu");


if (menuBtn && mobileMenu) {

  menuBtn.addEventListener(
    "click",
    () => {

      mobileMenu.classList.toggle(
        "open"
      );

      menuBtn.textContent =
        mobileMenu.classList.contains(
          "open"
        )
          ? "✕"
          : "☰";

    }
  );

}


// ======================================
// BACK
// ======================================

function goBack() {

  if (window.history.length > 1) {

    window.history.back();

  } else {

    window.location.href =
      "index.html";

  }

}


// ======================================
// MAIN SEARCH
// ======================================

function searchService() {

  const input =
    document.getElementById(
      "mainSearch"
    );

  if (!input) return;


  const value =
    input.value.trim();


  if (!value) {

    const lang =
      localStorage.getItem(
        "siteLanguage"
      ) || "kk";


    alert(
      lang === "ru"
        ? "Введите название услуги."
        : "Қызмет атауын жазыңыз."
    );

    return;
  }


  window.location.href =
    "services.html?search=" +
    encodeURIComponent(value);

}


const mainSearch =
  document.getElementById(
    "mainSearch"
  );


if (mainSearch) {

  mainSearch.addEventListener(
    "keydown",
    event => {

      if (event.key === "Enter") {

        searchService();

      }

    }
  );

}


// ======================================
// SERVICES PAGE
// ======================================

const servicesSearch =
  document.getElementById(
    "servicesSearch"
  );

const servicesSearchBtn =
  document.getElementById(
    "servicesSearchBtn"
  );

const filterChips =
  document.querySelectorAll(
    ".filter-chip"
  );

const serviceGrid =
  document.getElementById(
    "serviceGrid"
  );

const serviceCount =
  document.getElementById(
    "serviceCount"
  );

const emptyServices =
  document.getElementById(
    "emptyServices"
  );

const sortServices =
  document.getElementById(
    "sortServices"
  );

let currentCategory = "all";


function getServiceCards() {

  if (!serviceGrid) return [];

  return Array.from(
    serviceGrid.querySelectorAll(
      ".service-card"
    )
  );

}


function updateServices() {

  const cards =
    getServiceCards();


  if (serviceCount) {

    serviceCount.textContent =
      cards.length;

  }


  if (cards.length === 0) {

    if (emptyServices) {

      emptyServices.style.display =
        "block";

    }

    return;
  }


  const searchValue =
    servicesSearch
      ? servicesSearch.value
          .trim()
          .toLowerCase()
      : "";


  let visible = 0;


  cards.forEach(card => {

    const category =
      card.dataset.category || "";

    const text =
      card.textContent.toLowerCase();


    const categoryMatch =
      currentCategory === "all" ||
      category === currentCategory;


    const searchMatch =
      !searchValue ||
      text.includes(searchValue);


    if (
      categoryMatch &&
      searchMatch
    ) {

      card.style.display = "";

      visible++;

    } else {

      card.style.display =
        "none";

    }

  });


  if (serviceCount) {

    serviceCount.textContent =
      visible;

  }


  if (emptyServices) {

    emptyServices.style.display =
      visible === 0
        ? "block"
        : "none";

  }

}


filterChips.forEach(chip => {

  chip.addEventListener(
    "click",
    () => {

      filterChips.forEach(
        item =>
          item.classList.remove(
            "active"
          )
      );

      chip.classList.add(
        "active"
      );

      currentCategory =
        chip.dataset.category ||
        "all";

      updateServices();

    }
  );

});


if (servicesSearch) {

  servicesSearch.addEventListener(
    "input",
    updateServices
  );

}


if (servicesSearchBtn) {

  servicesSearchBtn.addEventListener(
    "click",
    updateServices
  );

}


if (serviceGrid) {

  const params =
    new URLSearchParams(
      window.location.search
    );

  const searchParam =
    params.get("search");

  const categoryParam =
    params.get("category");


  if (
    searchParam &&
    servicesSearch
  ) {

    servicesSearch.value =
      searchParam;

  }


  if (categoryParam) {

    currentCategory =
      categoryParam;


    filterChips.forEach(
      chip => {

        chip.classList.remove(
          "active"
        );


        if (
          chip.dataset.category ===
          categoryParam
        ) {

          chip.classList.add(
            "active"
          );

        }

      }
    );

  }


  updateServices();

}


// SORT

if (
  sortServices &&
  serviceGrid
) {

  sortServices.addEventListener(
    "change",
    () => {

      const cards =
        getServiceCards();

      if (!cards.length) return;


      const type =
        sortServices.value;


      if (type === "rating") {

        cards.sort(
          (a, b) =>
            Number(
              b.dataset.rating
            ) -
            Number(
              a.dataset.rating
            )
        );

      }


      if (type === "price-low") {

        cards.sort(
          (a, b) =>
            Number(
              a.dataset.price
            ) -
            Number(
              b.dataset.price
            )
        );

      }


      if (
        type === "price-high"
      ) {

        cards.sort(
          (a, b) =>
            Number(
              b.dataset.price
            ) -
            Number(
              a.dataset.price
            )
        );

      }


      cards.forEach(
        card =>
          serviceGrid.appendChild(
            card
          )
      );

    }
  );

}


// ======================================
// PHOTO PREVIEW
// ======================================

const servicePhotos =
  document.getElementById(
    "servicePhotos"
  );

const uploadPreview =
  document.getElementById(
    "uploadPreview"
  );


if (
  servicePhotos &&
  uploadPreview
) {

  servicePhotos.addEventListener(
    "change",
    () => {

      uploadPreview.innerHTML =
        "";


      const files =
        Array.from(
          servicePhotos.files
        ).slice(0, 4);


      files.forEach(file => {

        const reader =
          new FileReader();


        reader.onload =
          event => {

            const div =
              document.createElement(
                "div"
              );

            div.className =
              "preview-image";

            div.innerHTML =
              `<img src="${event.target.result}" alt="">`;

            uploadPreview.appendChild(
              div
            );

          };


        reader.readAsDataURL(
          file
        );

      });

    }
  );

}


// ======================================
// REAL ADD SERVICE — SUPABASE
// ======================================

const addServiceForm =
  document.getElementById("addServiceForm");


if (addServiceForm) {

  addServiceForm.addEventListener(
    "submit",
    async event => {

      event.preventDefault();


      const lang =
        localStorage.getItem("siteLanguage") || "kk";


      if (!supabaseClient) {

        alert(
          lang === "ru"
            ? "Supabase не подключён."
            : "Supabase қосылмаған."
        );

        return;
      }


      // Қолданушы кірген бе?
      const {
        data: { session }
      } = await supabaseClient.auth.getSession();


      if (!session) {

        alert(
          lang === "ru"
            ? "Сначала войдите в аккаунт."
            : "Алдымен аккаунтқа кір."
        );

        window.location.href =
          "login.html";

        return;
      }


      const user =
        session.user;


      // FORM DATA
      const providerName =
        document
          .getElementById("providerName")
          ?.value.trim();

      const title =
        document
          .getElementById("serviceTitle")
          ?.value.trim();

      const category =
        document
          .getElementById("category")
          ?.value;

      const price =
        document
          .getElementById("price")
          ?.value;

      const phone =
        document
          .getElementById("phone")
          ?.value.trim();

      const whatsapp =
        document
          .getElementById("whatsapp")
          ?.value.trim();

      const location =
        document
          .getElementById("location")
          ?.value.trim();

      const workingHours =
        document
          .getElementById("workTime")
          ?.value.trim();

      const description =
        document
          .getElementById("description")
          ?.value.trim();


      if (
        !providerName ||
        !title ||
        !category ||
        !price ||
        !phone ||
        !whatsapp ||
        !location ||
        !description
      ) {

        alert(
          lang === "ru"
            ? "Заполните все обязательные поля."
            : "Міндетті жолдардың бәрін толтыр."
        );

        return;
      }


      const submitButton =
        addServiceForm.querySelector(
          'button[type="submit"]'
        );


      if (submitButton) {

        submitButton.disabled = true;

        submitButton.textContent =
          lang === "ru"
            ? "Отправка..."
            : "Жіберілуде...";

      }


      try {

        const {
          data,
          error
        } =
          await supabaseClient
            .from("services")
            .insert({

              user_id: user.id,

              title: title,

              category: category,

              description: description,

              price: Number(price),

              phone: phone,

              whatsapp: whatsapp,

              location: location,

              working_hours:
                workingHours || null,

              status: "pending"

            })
            .select();


        if (error) {
          throw error;
        }


        alert(
          lang === "ru"
            ? "Услуга отправлена на проверку администратору."
            : "Қызмет админнің тексеруіне жіберілді."
        );


        addServiceForm.reset();


        const uploadPreview =
          document.getElementById(
            "uploadPreview"
          );

        if (uploadPreview) {
          uploadPreview.innerHTML = "";
        }


        window.location.href =
          "profile.html";


      } catch (error) {

        console.error(
          "Add service error:",
          error
        );


        alert(
          lang === "ru"
            ? "Ошибка: " + error.message
            : "Қате: " + error.message
        );


      } finally {

        if (submitButton) {

          submitButton.disabled = false;

          submitButton.textContent =
            translations[lang]?.sendForReview ||
            "Тексеруге жіберу";

        }

      }

    }
  );

}

// ======================================
// REQUEST FILTER
// ======================================

const requestFilter =
  document.getElementById(
    "requestFilter"
  );


if (requestFilter) {

  requestFilter.addEventListener(
    "change",
    () => {

      const selected =
        requestFilter.value;


      document
        .querySelectorAll(
          ".request-card[data-category]"
        )
        .forEach(card => {

          card.style.display =
            selected === "all" ||
            card.dataset.category ===
              selected
              ? ""
              : "none";

        });

    }
  );

}


// ======================================
// REQUEST FORM
// ======================================

const addRequestForm =
  document.getElementById(
    "addRequestForm"
  );


if (addRequestForm) {

  addRequestForm.addEventListener(
    "submit",
    event => {

      event.preventDefault();


      const lang =
        localStorage.getItem(
          "siteLanguage"
        ) || "kk";


      alert(
        lang === "ru"
          ? "Следующим шагом подключим заявки к базе."
          : "Келесі қадамда сұраныстарды базаға қосамыз."
      );

    }
  );

}


// ======================================
// FAVORITES
// ======================================

function updateFavorites() {

  const grid =
    document.getElementById(
      "favoriteGrid"
    );

  const empty =
    document.getElementById(
      "favoritesEmpty"
    );


  if (!grid || !empty) {
    return;
  }


  const cards =
    grid.querySelectorAll(
      ".favorite-card"
    );


  if (cards.length === 0) {

    grid.style.display =
      "none";

    empty.style.display =
      "block";

  } else {

    grid.style.display =
      "";

    empty.style.display =
      "none";

  }

}


document
  .querySelectorAll(
    ".favorite-remove"
  )
  .forEach(button => {

    button.addEventListener(
      "click",
      () => {

        const card =
          button.closest(
            ".favorite-card"
          );


        if (card) {

          card.remove();

        }


        updateFavorites();

      }
    );

  });


updateFavorites();




// ======================================
// REAL LOGIN — SUPABASE
// ======================================

const loginForm =
  document.getElementById("loginForm");


if (loginForm) {

  loginForm.addEventListener(
    "submit",
    async event => {

      event.preventDefault();


      const lang =
        localStorage.getItem(
          "siteLanguage"
        ) || "kk";


      if (!supabaseClient) {

        alert(
          lang === "ru"
            ? "Supabase не подключён."
            : "Supabase қосылмаған."
        );

        return;
      }


      const email =
        document
          .getElementById("loginEmail")
          ?.value.trim();


      const password =
        document
          .getElementById("loginPassword")
          ?.value;


      if (!email || !password) {

        alert(
          lang === "ru"
            ? "Введите email и пароль."
            : "Email және құпиясөзді енгіз."
        );

        return;
      }


      const submitButton =
        loginForm.querySelector(
          'button[type="submit"]'
        );


      if (submitButton) {

        submitButton.disabled = true;

        submitButton.textContent =
          lang === "ru"
            ? "Вход..."
            : "Кіру...";

      }


      try {

        const { data, error } =
          await supabaseClient.auth
            .signInWithPassword({

              email: email,

              password: password

            });


        if (error) {
          throw error;
        }


        if (data.user) {

          alert(
            lang === "ru"
              ? "Вы успешно вошли в аккаунт."
              : "Аккаунтқа сәтті кірдің."
          );


          window.location.href =
            "profile.html";

        }


      } catch (error) {

        console.error(
          "Login error:",
          error
        );


        let message =
          error.message;


        if (
          error.message?.includes(
            "Invalid login credentials"
          )
        ) {

          message =
            lang === "ru"
              ? "Неверный email или пароль."
              : "Email немесе құпиясөз қате.";

        }


        if (
          error.message?.includes(
            "Email not confirmed"
          )
        ) {

          message =
            lang === "ru"
              ? "Сначала подтвердите email."
              : "Алдымен email-ды раста.";

        }


        alert(
          lang === "ru"
            ? "Ошибка входа: " + message
            : "Кіру қатесі: " + message
        );


      } finally {

        if (submitButton) {

          submitButton.disabled = false;

          submitButton.textContent =
            translations[lang]?.login ||
            "Кіру";

        }

      }

    }
  );

}
// ======================================
// REAL REGISTER — SUPABASE
// ======================================

const registerForm =
  document.getElementById(
    "registerForm"
  );


if (registerForm) {

  registerForm.addEventListener(
    "submit",
    async event => {

      event.preventDefault();


      const lang =
        localStorage.getItem(
          "siteLanguage"
        ) || "kk";


      if (!supabaseClient) {

        alert(
          lang === "ru"
            ? "Supabase не подключён. Проверьте подключение библиотеки в register.html."
            : "Supabase қосылмаған. register.html ішіндегі кітапхана қосылғанын тексер."
        );

        return;
      }


      const fullName =
        document
          .getElementById(
            "registerName"
          )
          ?.value.trim();


      const email =
        document
          .getElementById(
            "registerEmail"
          )
          ?.value.trim();


      const phone =
        document
          .getElementById(
            "registerPhone"
          )
          ?.value.trim();


      const city =
        document
          .getElementById(
            "registerCity"
          )
          ?.value.trim();


      const password =
        document
          .getElementById(
            "registerPassword"
          )
          ?.value;


      const repeat =
        document
          .getElementById(
            "registerPasswordRepeat"
          )
          ?.value;


      if (
        !fullName ||
        !email ||
        !phone ||
        !city ||
        !password ||
        !repeat
      ) {

        alert(
          lang === "ru"
            ? "Заполните все поля."
            : "Барлық жолды толтыр."
        );

        return;
      }


      if (
        password !== repeat
      ) {

        alert(
          lang === "ru"
            ? "Пароли не совпадают."
            : "Құпиясөздер сәйкес емес."
        );

        return;
      }


      if (
        password.length < 6
      ) {

        alert(
          lang === "ru"
            ? "Пароль должен содержать минимум 6 символов."
            : "Құпиясөз кемінде 6 таңбадан тұруы керек."
        );

        return;
      }


      const submitButton =
        registerForm.querySelector(
          'button[type="submit"]'
        );


      if (submitButton) {

        submitButton.disabled =
          true;

        submitButton.textContent =
          lang === "ru"
            ? "Регистрация..."
            : "Тіркелуде...";

      }


      try {

        const {
          data,
          error
        } =
          await supabaseClient
            .auth
            .signUp({

              email: email,

              password: password,

              options: {

                data: {

                  full_name:
                    fullName,

                  phone:
                    phone,

                  city:
                    city

                }

              }

            });


        if (error) {

          throw error;

        }


        alert(
          lang === "ru"
            ? "Регистрация прошла успешно. Проверьте свою почту и подтвердите email."
            : "Тіркелу сәтті өтті. Email-ға келген хатты ашып, аккаунтты раста."
        );


        registerForm.reset();


        if (
          data &&
          data.session
        ) {

          window.location.href =
            "profile.html";

        } else {

          window.location.href =
            "login.html";

        }


      } catch (error) {

        console.error(
          "Register error:",
          error
        );


        let message =
          error.message;


        if (
          error.message &&
          error.message.includes(
            "already registered"
          )
        ) {

          message =
            lang === "ru"
              ? "Этот email уже зарегистрирован."
              : "Бұл email бұрын тіркелген.";

        }


        alert(
          lang === "ru"
            ? "Ошибка регистрации: " +
              message
            : "Тіркелу қатесі: " +
              message
        );


      } finally {

        if (submitButton) {

          submitButton.disabled =
            false;

          submitButton.textContent =
            translations[lang]
              ?.createAccount ||
            "Аккаунт ашу";

        }

      }

    }
  );

}

// ======================================
// REAL PROFILE — SUPABASE
// ======================================

 // ======================================
// REAL PROFILE — SUPABASE
// ======================================

async function loadProfile() {

  const profileFullName =
    document.getElementById("profileFullName");

  if (!profileFullName) return;

  if (!supabaseClient) return;


  const {
    data: { user },
    error
  } =
    await supabaseClient.auth.getUser();


  if (error || !user) {

    window.location.href =
      "login.html";

    return;
  }


  const fullName =
    user.user_metadata?.full_name ||
    "Қолданушы";

  const phone =
    user.user_metadata?.phone ||
    "—";

  const city =
    user.user_metadata?.city ||
    "—";

  const email =
    user.email || "—";


  profileFullName.textContent =
    fullName;


  const profileEmail =
    document.getElementById("profileEmail");

  const profileEmailCard =
    document.getElementById("profileEmailCard");

  const profilePhone =
    document.getElementById("profilePhone");

  const profileCity =
    document.getElementById("profileCity");


  if (profileEmail) {
    profileEmail.textContent = email;
  }

  if (profileEmailCard) {
    profileEmailCard.textContent = email;
  }

  if (profilePhone) {
    profilePhone.textContent = phone;
  }

  if (profileCity) {
    profileCity.textContent = city;
  }
}


const logoutBtn =
  document.getElementById("logoutBtn");


if (logoutBtn) {

  logoutBtn.addEventListener(
    "click",
    async () => {

      await supabaseClient.auth.signOut();

      window.location.href =
        "login.html";

    }
  );

}


loadProfile();


// ======================================
// PROFILE TABS
// ======================================


const profileTabs =
  document.querySelectorAll(
    ".profile-tab[data-tab]"
  );

const profilePanels =
  document.querySelectorAll(
    ".profile-panel"
  );


profileTabs.forEach(tab => {

  tab.addEventListener(
    "click",
    () => {

      profileTabs.forEach(
        item =>
          item.classList.remove(
            "active"
          )
      );


      profilePanels.forEach(
        panel =>
          panel.classList.remove(
            "active"
          )
      );


      tab.classList.add(
        "active"
      );


      const panel =
        document.getElementById(
          tab.dataset.tab
        );


      if (panel) {

        panel.classList.add(
          "active"
        );

      }

    }
  );

});


// ======================================
// SUPPORT
// ======================================

const adminPhone =
  "77785940804";


function updateSupportTopic(
  language
) {

  const activeOption =
    document.querySelector(
      ".support-option.active"
    );

  const selectedText =
    document.getElementById(
      "selectedSupportTopic"
    );


  if (
    !activeOption ||
    !selectedText
  ) {

    return;

  }


  selectedText.textContent =
    language === "ru"
      ? activeOption.dataset
          .topicRu
      : activeOption.dataset
          .topicKk;

}


document
  .querySelectorAll(
    ".support-option"
  )
  .forEach(option => {

    option.addEventListener(
      "click",
      () => {

        document
          .querySelectorAll(
            ".support-option"
          )
          .forEach(item =>
            item.classList.remove(
              "active"
            )
          );


        option.classList.add(
          "active"
        );


        const lang =
          localStorage.getItem(
            "siteLanguage"
          ) || "kk";


        updateSupportTopic(
          lang
        );

      }
    );

  });


const supportWhatsAppBtn =
  document.getElementById(
    "supportWhatsAppBtn"
  );


if (supportWhatsAppBtn) {

  supportWhatsAppBtn.addEventListener(
    "click",
    () => {

      const lang =
        localStorage.getItem(
          "siteLanguage"
        ) || "kk";


      const activeOption =
        document.querySelector(
          ".support-option.active"
        );


      const messageBox =
        document.getElementById(
          "supportMessage"
        );


      let topic = "";


      if (activeOption) {

        topic =
          lang === "ru"
            ? activeOption.dataset
                .topicRu
            : activeOption.dataset
                .topicKk;

      }


      const message =
        messageBox
          ? messageBox.value.trim()
          : "";


      let text = "";


      if (lang === "ru") {

        text =
          `Здравствуйте! Пишу с сайта Keregingdi Tap.\n\nТема: ${topic}`;


        if (message) {

          text +=
            `\nСообщение: ${message}`;

        }


      } else {

        text =
          `Сәлеметсіз бе! Keregingdi Tap сайтынан жазып отырмын.\n\nТақырып: ${topic}`;


        if (message) {

          text +=
            `\nХабарлама: ${message}`;

        }

      }


      const url =
        `https://wa.me/${adminPhone}?text=${encodeURIComponent(text)}`;


      window.open(
        url,
        "_blank"
      );

    }
  );

}


// ======================================
// ADMIN TABS
// ======================================

const adminNavButtons =
  document.querySelectorAll(
    ".admin-nav-btn[data-admin-tab]"
  );

const adminPanels =
  document.querySelectorAll(
    ".admin-panel"
  );


adminNavButtons.forEach(
  button => {

    button.addEventListener(
      "click",
      () => {

        adminNavButtons.forEach(
          item =>
            item.classList.remove(
              "active"
            )
        );


        adminPanels.forEach(
          panel =>
            panel.classList.remove(
              "active"
            )
        );


        button.classList.add(
          "active"
        );


        const panel =
          document.getElementById(
            button.dataset
              .adminTab
          );


        if (panel) {

          panel.classList.add(
            "active"
          );

        }


        const sidebar =
          document.getElementById(
            "adminSidebar"
          );


        if (
          sidebar &&
          window.innerWidth <= 700
        ) {

          sidebar.classList.remove(
            "open"
          );

        }

      }
    );

  }
);


// ======================================
// ADMIN MOBILE
// ======================================

const adminMobileMenu =
  document.getElementById(
    "adminMobileMenu"
  );

const adminSidebar =
  document.getElementById(
    "adminSidebar"
  );


if (
  adminMobileMenu &&
  adminSidebar
) {

  adminMobileMenu.addEventListener(
    "click",
    () => {

      adminSidebar.classList.toggle(
        "open"
      );

    }
  );

}


// ======================================
// START
// ======================================

const savedLanguage =
  localStorage.getItem(
    "siteLanguage"
  ) || "kk";


setLanguage(
  savedLanguage
);
