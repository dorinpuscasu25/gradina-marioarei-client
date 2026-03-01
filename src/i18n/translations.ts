export type Language = 'ro' | 'ru' | 'en';

export const translations = {
  ro: {
    nav: {
      home: 'Acasă',
      accommodation: 'Cazare',
      experiences: 'Experiențe',
      discover: 'Descoperă Zona',
      about: 'Despre Noi',
      contact: 'Contact',
      book: 'Rezervă'
    },
    hero: {
      welcome: 'Bine ați venit la Pensiunea Grădina Mărioarei',
      subtitle:
      'Rezervă un sejur în inima naturii și bucură-te de o experiență de neuitat.',
      cta_primary: 'Rezervă acum',
      cta_secondary: 'Sună acum'
    },
    highlights: {
      wifi: 'Wi-Fi Gratuit',
      kitchen: 'Bucătărie',
      bbq: 'Zonă Grătar',
      nature: 'Natură',
      wellness: 'Ciubăr'
    },
    accommodation: {
      title: 'Cazare',
      subtitle: 'Tradiție și confort modern',
      vila_mare: {
        title: 'Vila Mare',
        desc: 'Vila mare este alegerea perfectă pentru o escapadă relaxantă alături de familie sau prieteni. Spațiul generos îmbină confortul cu atmosfera caldă de acasă, bucătăria complet echipată pentru mese pregătite în tihnă, iar livingul spațios, cu șemineu, devine locul ideal pentru seri lungi, povești și momente de neuitat împreună. Aici, liniștea și confortul creează cadrul perfect pentru a vă bucura unii de alții, departe de agitația zilnică.',
        price: '7500 lei',
        features: [
        '3 dormitoare',
        '2 băi',
        'WiFi',
        'Mansardă cu 4 paturi',
        'Living spațios',
        'Bucătărie complet dotată',
        'Zonă pentru grătar']

      },
      beci1: {
        title: 'Căsuța tip Beci',
        desc: 'O experiență autentică și intimă, perfectă pentru cupluri sau familii mici.',
        price: '2000 lei',
        features: [
        'Dormitor',
        'Pat pliant',
        'Baie',
        'Living',
        'Bucătărie',
        'WiFi']

      },
      beci2: {
        title: 'Căsuța tip Beci 2',
        desc: 'Confort compact într-un cadru rustic deosebit.',
        price: '1500 lei',
        features: ['Dormitor', 'Baie', 'Mini bucătărie']
      },
      price_label: 'Preț',
      book_btn: 'Rezervă acum',
      call_btn: 'Sună pentru rezervare',
      amenities: 'Facilități',
      more_photos: 'Mai multe fotografii',
      view_all: 'Vezi toate opțiunile de cazare',
      details: 'Detalii'
    },
    wellness: {
      title: 'Relaxare & Wellness',
      subtitle: 'Ciubăr tradițional pentru relaxare totală',
      capacity: 'Capacitate până la 8 persoane',
      capacity_label: 'Capacitate',
      temp: 'Apă caldă 38–40°C',
      temp_label: 'Temperatură',
      duration: 'Temperatura se menține 3–4 ore',
      duration_label: 'Durată',
      price: '800 lei',
      price_label: 'Preț ciubăr',
      filter: 'Sistem de filtrare performant',
      filter_label: 'Igienă'
    },
    bbq: {
      title: 'Zonă de Grătar',
      subtitle: 'Spațiu dedicat pentru seri la foc și mese în aer liber',
      description:
      'Am amenajat separat zona de grătar, astfel încât să vă bucurați de timp petrecut împreună, cu multă liniște și priveliști frumoase.',
      gallery_hint: 'Pozele de mai jos pot fi actualizate ușor oricând.'
    },
    experiences: {
      title: 'Experiențe',
      subtitle: 'Descoperă farmecul vieții la țară',
      items: [
      {
        title: 'Plimbări în natură',
        desc: 'Explorează dealurile și pădurile din jur.'
      },
      {
        title: 'Seri la grătar',
        desc: 'Bucură-te de mese în aer liber cu cei dragi.'
      },
      {
        title: 'Relaxare',
        desc: 'Liniște deplină departe de agitația orașului.'
      },
      {
        title: 'Timp cu familia',
        desc: 'Spațiu perfect pentru jocuri și activități comune.'
      },
      {
        title: 'Gastronomie locală',
        desc: 'Gustul autentic al produselor locale.'
      },
      {
        title: 'Privitul stelelor',
        desc: 'Cer senin și nopți magice la foc de tabără.'
      }],

      itinerary: 'Sugestie de itinerariu',
      morning_label: 'Dimineața',
      afternoon_label: 'După-amiaza',
      evening_label: 'Seara',
      morning:
      'Dimineața: Mic dejun cu produse locale și o plimbare revigorantă.',
      afternoon:
      'După-amiaza: Vizită la obiectivele din zonă sau relaxare în hamac.',
      evening:
      'Seara: Cină la grătar și relaxare în ciubăr sub cerul înstelat.',
      explore: 'Explorează experiențele'
    },
    discover: {
      title: 'Descoperă Zona',
      subtitle: 'Vălcineț și împrejurimile',
      legends: 'Legende și Povești',
      articles: [
      {
        title: 'Codrii Călărașilor',
        desc: 'Păduri seculare pline de mister și frumusețe.'
      },
      {
        title: 'Tradiții Locale',
        desc: 'Meșteșuguri și obiceiuri păstrate cu sfințenie.'
      },
      {
        title: 'Peisaje de Poveste',
        desc: 'Dealuri domoale și priveliști panoramice.'
      }],

      read_stories: 'Citește poveștile locale',
      legend_text:
      'Se spune că dealurile Vălcineților ascund secrete din timpuri străvechi, unde pădurea șoptește povești celor care ascultă cu atenție...',
      folklore: 'Folclor și Povești'
    },
    about: {
      title: 'Despre Pensiune',
      subtitle: 'Povestea noastră',
      story:
      'Pensiunea Agroturistica Grădina Marioarei, a început din dorința de a valorifica locul în care au prins viață primele amintiri. În acest spațiu plin de frumos, cu o priveliște de poveste, s-a născut ideea de a crea un loc unde oaspeții nu vin doar în vacanță, ci acasă, ca în vizită la bunei. Fiecare colț păstrează căldura amintirilor și liniștea naturii, îmbinând confortul modern cu farmecul autentic al locurilor de odinioară. Aici, timpul încetinește, serile se umplu de povești, iar atmosfera te îmbrățișează cu simplitate și suflet.\n\nPensiunea Grădina Marioarei nu este doar o cazare, ci o stare de bine, trăită cu inima deschisă. Situată într-un cadru pitoresc, în satul Vălcineț, raionul Călărași, este locul unde tradiția se întâlnește cu confortul modern, iar fiecare colțișor invită la relaxare și explorare.',
      mission_label: 'Misiunea noastră',
      mission:
      'Misiunea noastră este să oferim o oază de liniște și autenticitate.',
      nature_first: 'Natură pe primul loc',
      nature_first_desc: 'Respectăm și ne integrăm în mediul natural.',
      authenticity: 'Autenticitate',
      authenticity_desc: 'Păstrăm tradițiile locale și ospitalitatea.'
    },
    contact: {
      title: 'Contact',
      address_label: 'Adresă',
      address_val: 'str. Ștefan cel Mare nr. 123, Vălcineț, raionul Călărași',
      email_label: 'Email',
      phone_label: 'Telefon',
      map_placeholder: 'Harta va fi disponibilă în curând'
    },
    gallery: {
      title: 'Galerie',
      subtitle: 'Momente'
    },
    booking: {
      title: 'Solicită o Rezervare',
      subtitle: 'Completează formularul și te vom contacta pentru confirmare.',
      checkin: 'Data sosirii',
      checkout: 'Data plecării',
      guests: 'Număr oaspeți',
      unit: 'Unitate de cazare',
      select_unit: 'Alege cazarea...',
      name: 'Nume complet',
      phone: 'Telefon',
      email: 'Email',
      notes: 'Mesaj sau cerințe speciale',
      submit: 'Trimite cererea',
      success: 'Cererea a fost trimisă cu succes! Vă vom contacta în curând.',
      required: 'Acest câmp este obligatoriu',
      thank_you: 'Mulțumim!',
      send_another: 'Trimite altă cerere',
      prefer_phone: 'Preferați să rezervați telefonic?',
      sending: 'Se trimite...'
    },
    footer: {
      copyright:
      '© 2026 Pensiunea Grădina Mărioarei. Toate drepturile rezervate.',
      language: 'Limbă'
    }
  },
  en: {
    nav: {
      home: 'Home',
      accommodation: 'Accommodation',
      experiences: 'Experiences',
      discover: 'Discover Area',
      about: 'About Us',
      contact: 'Contact',
      book: 'Book Now'
    },
    hero: {
      welcome: 'Welcome to Pensiunea Grădina Mărioarei',
      subtitle:
      'Book a stay in the heart of nature and enjoy an unforgettable experience.',
      cta_primary: 'Book Now',
      cta_secondary: 'Call Now'
    },
    highlights: {
      wifi: 'Free Wi-Fi',
      kitchen: 'Kitchen',
      bbq: 'BBQ Area',
      nature: 'Nature',
      wellness: 'Hot Tub'
    },
    accommodation: {
      title: 'Accommodation',
      subtitle: 'Tradition meets modern comfort',
      vila_mare: {
        title: 'Grand Villa',
        desc: 'Ideal for large groups and families, offering generous space and privacy.',
        price: '7500 lei',
        features: [
        '3 bedrooms',
        '2 bathrooms',
        'WiFi',
        'Attic with 4 beds',
        'Spacious living room',
        'Fully equipped kitchen',
        'BBQ area']

      },
      beci1: {
        title: 'Cellar Cottage',
        desc: 'An authentic and intimate experience, perfect for couples or small families.',
        price: '2000 lei',
        features: [
        'Bedroom',
        'Foldable bed',
        'Bathroom',
        'Living room',
        'Kitchen',
        'WiFi']

      },
      beci2: {
        title: 'Cellar Cottage 2',
        desc: 'Compact comfort in a unique rustic setting.',
        price: '1500 lei',
        features: ['Bedroom', 'Bathroom', 'Mini kitchen']
      },
      price_label: 'Price',
      book_btn: 'Book Now',
      call_btn: 'Call to Reserve',
      amenities: 'Amenities',
      more_photos: 'More photos',
      view_all: 'View All Accommodation',
      details: 'Details'
    },
    wellness: {
      title: 'Relaxation & Wellness',
      subtitle: 'Traditional hot tub for total relaxation',
      capacity: 'Capacity up to 8 people',
      capacity_label: 'Capacity',
      temp: 'Hot water 38–40°C',
      temp_label: 'Temperature',
      duration: 'Temperature maintained for 3–4 hours',
      duration_label: 'Duration',
      price: '800 lei',
      price_label: 'Hot tub price',
      filter: 'High-performance filtration system',
      filter_label: 'Hygiene'
    },
    bbq: {
      title: 'BBQ Area',
      subtitle: 'Dedicated space for outdoor meals and evening gatherings',
      description:
      'We arranged a separate BBQ area so you can enjoy time together outdoors, in a quiet and cozy atmosphere.',
      gallery_hint: 'The photos below can be updated anytime.'
    },
    experiences: {
      title: 'Experiences',
      subtitle: 'Discover the charm of countryside life',
      items: [
      {
        title: 'Nature Walks',
        desc: 'Explore the surrounding hills and forests.'
      },
      {
        title: 'BBQ Evenings',
        desc: 'Enjoy outdoor dining with loved ones.'
      },
      {
        title: 'Relaxation',
        desc: 'Complete silence away from city bustle.'
      },
      {
        title: 'Family Time',
        desc: 'Perfect space for games and shared activities.'
      },
      {
        title: 'Local Gastronomy',
        desc: 'Authentic taste of local products.'
      },
      {
        title: 'Stargazing',
        desc: 'Clear skies and magical nights by the campfire.'
      }],

      itinerary: 'Suggested Itinerary',
      morning_label: 'Morning',
      afternoon_label: 'Afternoon',
      evening_label: 'Evening',
      morning: 'Morning: Breakfast with local products and a refreshing walk.',
      afternoon: 'Afternoon: Visit local sights or relax in the hammock.',
      evening:
      'Evening: BBQ dinner and relaxation in the hot tub under the stars.',
      explore: 'Explore Experiences'
    },
    discover: {
      title: 'Discover the Area',
      subtitle: 'Vălcineț and surroundings',
      legends: 'Legends & Stories',
      articles: [
      {
        title: 'Călărași Forests',
        desc: 'Ancient forests full of mystery and beauty.'
      },
      {
        title: 'Local Traditions',
        desc: 'Crafts and customs preserved with care.'
      },
      {
        title: 'Fairytale Landscapes',
        desc: 'Rolling hills and panoramic views.'
      }],

      read_stories: 'Read Local Stories',
      legend_text:
      'They say the hills of Vălcineț hold secrets from ancient times, where the forest whispers stories to those who listen carefully...',
      folklore: 'Folklore & Stories'
    },
    about: {
      title: 'About Us',
      subtitle: 'Our Story',
      story:
      'Grădina Mărioarei Guesthouse offers a different accommodation concept, featuring a minimalist design with a subtle modern presence. Located in a picturesque setting in Vălcineț village, Călărași district, it is where tradition meets modern comfort, and every corner invites relaxation and exploration.',
      mission_label: 'Our Mission',
      mission: 'Our mission is to offer an oasis of peace and authenticity.',
      nature_first: 'Nature First',
      nature_first_desc: 'Respecting and integrating with our environment.',
      authenticity: 'Authenticity',
      authenticity_desc: 'Preserving local traditions and hospitality.'
    },
    contact: {
      title: 'Contact',
      address_label: 'Address',
      address_val: 'str. Ștefan cel Mare nr. 123, Vălcineț, Călărași district',
      email_label: 'Email',
      phone_label: 'Phone',
      map_placeholder: 'Map coming soon'
    },
    gallery: {
      title: 'Gallery',
      subtitle: 'Moments'
    },
    booking: {
      title: 'Request a Reservation',
      subtitle: 'Fill out the form and we will contact you for confirmation.',
      checkin: 'Check-in Date',
      checkout: 'Check-out Date',
      guests: 'Number of Guests',
      unit: 'Accommodation Unit',
      select_unit: 'Choose accommodation...',
      name: 'Full Name',
      phone: 'Phone',
      email: 'Email',
      notes: 'Message or special requests',
      submit: 'Send Request',
      success: 'Request sent successfully! We will contact you soon.',
      required: 'This field is required',
      thank_you: 'Thank you!',
      send_another: 'Send another request',
      prefer_phone: 'Prefer to book by phone?',
      sending: 'Sending...'
    },
    footer: {
      copyright: '© 2026 Pensiunea Grădina Mărioarei. All rights reserved.',
      language: 'Language'
    }
  },
  ru: {
    nav: {
      home: 'Главная',
      accommodation: 'Проживание',
      experiences: 'Впечатления',
      discover: 'О регионе',
      about: 'О нас',
      contact: 'Контакты',
      book: 'Бронь'
    },
    hero: {
      welcome: 'Добро пожаловать в Pensiunea Grădina Mărioarei',
      subtitle:
      'Забронируйте отдых на лоне природы и насладитесь незабываемыми впечатлениями.',
      cta_primary: 'Забронировать',
      cta_secondary: 'Позвонить'
    },
    highlights: {
      wifi: 'Бесплатный Wi-Fi',
      kitchen: 'Кухня',
      bbq: 'Зона барбекю',
      nature: 'Природа',
      wellness: 'Чан'
    },
    accommodation: {
      title: 'Проживание',
      subtitle: 'Традиции и современный комфорт',
      vila_mare: {
        title: 'Большая Вилла',
        desc: 'Идеально подходит для больших групп и семей, предлагая простор и уединение.',
        price: '7500 lei',
        features: [
        '3 спальни',
        '2 ванные комнаты',
        'WiFi',
        'Мансарда с 4 кроватями',
        'Просторная гостиная',
        'Полностью оборудованная кухня',
        'Зона для барбекю']

      },
      beci1: {
        title: 'Домик типа Погреб',
        desc: 'Аутентичный и уютный опыт, идеально подходит для пар или небольших семей.',
        price: '2000 lei',
        features: [
        'Спальня',
        'Раскладная кровать',
        'Ванная комната',
        'Гостиная',
        'Кухня',
        'WiFi']

      },
      beci2: {
        title: 'Домик типа Погреб 2',
        desc: 'Компактный комфорт в уникальной деревенской обстановке.',
        price: '1500 lei',
        features: ['Спальня', 'Ванная комната', 'Мини-кухня']
      },
      price_label: 'Цена',
      book_btn: 'Забронировать',
      call_btn: 'Позвонить для брони',
      amenities: 'Удобства',
      more_photos: 'Больше фото',
      view_all: 'Все варианты размещения',
      details: 'Подробнее'
    },
    wellness: {
      title: 'Релаксация и Wellness',
      subtitle: 'Традиционный чан для полного расслабления',
      capacity: 'Вместимость до 8 человек',
      capacity_label: 'Вместимость',
      temp: 'Горячая вода 38–40°C',
      temp_label: 'Температура',
      duration: 'Температура поддерживается 3–4 часа',
      duration_label: 'Длительность',
      price: '800 lei',
      price_label: 'Цена чана',
      filter: 'Высокоэффективная система фильтрации',
      filter_label: 'Гигиена'
    },
    bbq: {
      title: 'Зона барбекю',
      subtitle: 'Отдельное пространство для ужинов на свежем воздухе',
      description:
      'Мы выделили отдельную зону барбекю, чтобы вы могли проводить больше времени вместе в уютной атмосфере.',
      gallery_hint: 'Фото ниже можно легко обновлять в любое время.'
    },
    experiences: {
      title: 'Впечатления',
      subtitle: 'Откройте для себя очарование деревенской жизни',
      items: [
      {
        title: 'Прогулки на природе',
        desc: 'Исследуйте окрестные холмы и леса.'
      },
      {
        title: 'Вечера барбекю',
        desc: 'Наслаждайтесь едой на свежем воздухе с близкими.'
      },
      {
        title: 'Релаксация',
        desc: 'Полная тишина вдали от городской суеты.'
      },
      {
        title: 'Семейное время',
        desc: 'Идеальное пространство для игр и совместных занятий.'
      },
      {
        title: 'Местная гастрономия',
        desc: 'Аутентичный вкус местных продуктов.'
      },
      {
        title: 'Звездное небо',
        desc: 'Ясное небо и волшебные ночи у костра.'
      }],

      itinerary: 'Предлагаемый маршрут',
      morning_label: 'Утро',
      afternoon_label: 'День',
      evening_label: 'Вечер',
      morning: 'Утро: Завтрак из местных продуктов и освежающая прогулка.',
      afternoon:
      'День: Посещение местных достопримечательностей или отдых в гамаке.',
      evening: 'Вечер: Ужин барбекю и отдых в чане под звездным небом.',
      explore: 'Исследовать впечатления'
    },
    discover: {
      title: 'О регионе',
      subtitle: 'Вэлчинец и окрестности',
      legends: 'Легенды и Истории',
      articles: [
      {
        title: 'Леса Кэлэрашь',
        desc: 'Вековые леса, полные тайн и красоты.'
      },
      {
        title: 'Местные традиции',
        desc: 'Ремесла и обычаи, бережно хранимые.'
      },
      {
        title: 'Сказочные пейзажи',
        desc: 'Пологие холмы и панорамные виды.'
      }],

      read_stories: 'Читать местные истории',
      legend_text:
      'Говорят, что холмы Вэлчинец хранят тайны древних времён, где лес шепчет истории тем, кто внимательно слушает...',
      folklore: 'Фольклор и Истории'
    },
    about: {
      title: 'О нас',
      subtitle: 'Наша история',
      story:
      'Пансионат Grădina Mărioarei предлагает иную концепцию проживания, сочетая минималистичный дизайн с тонким присутствием современности. Расположенный в живописном месте в селе Вэлчинец, район Кэлэрашь, это место, где традиции встречаются с современным комфортом, а каждый уголок приглашает к отдыху и исследованиям.',
      mission_label: 'Наша миссия',
      mission: 'Наша миссия — предложить оазис спокойствия и аутентичности.',
      nature_first: 'Природа прежде всего',
      nature_first_desc: 'Уважаем и интегрируемся в природную среду.',
      authenticity: 'Аутентичность',
      authenticity_desc: 'Сохраняем местные традиции и гостеприимство.'
    },
    contact: {
      title: 'Контакты',
      address_label: 'Адрес',
      address_val: 'ул. Штефан чел Маре 123, Вэлчинец, район Кэлэрашь',
      email_label: 'Email',
      phone_label: 'Телефон',
      map_placeholder: 'Карта скоро будет доступна'
    },
    gallery: {
      title: 'Галерея',
      subtitle: 'Моменты'
    },
    booking: {
      title: 'Запрос на бронирование',
      subtitle: 'Заполните форму, и мы свяжемся с вами для подтверждения.',
      checkin: 'Дата заезда',
      checkout: 'Дата выезда',
      guests: 'Количество гостей',
      unit: 'Вариант размещения',
      select_unit: 'Выберите жилье...',
      name: 'Полное имя',
      phone: 'Телефон',
      email: 'Email',
      notes: 'Сообщение или особые пожелания',
      submit: 'Отправить запрос',
      success:
      'Запрос успешно отправлен! Мы свяжемся с вами в ближайшее время.',
      required: 'Это поле обязательно',
      thank_you: 'Спасибо!',
      send_another: 'Отправить ещё один запрос',
      prefer_phone: 'Предпочитаете бронировать по телефону?',
      sending: 'Отправка...'
    },
    footer: {
      copyright: '© 2026 Пансионат Grădina Mărioarei. Все права защищены.',
      language: 'Язык'
    }
  }
};
