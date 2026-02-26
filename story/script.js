// Ждем загрузки страницы
document.addEventListener('DOMContentLoaded', function() {
    
    // Получаем элементы главного экрана
    const startBtn = document.getElementById('startBtn');
    const novelTitle = document.getElementById('novelTitle');
    const message = document.getElementById('message');
    const titleInput = document.getElementById('titleInput');
    const resetBtn = document.getElementById('resetBtn');
    const colorBtn = document.getElementById('colorBtn');
    const novelWindow = document.getElementById('novelWindow');
    const body = document.body;
    
    // Получаем элементы игрового экрана
    const mainScreen = document.getElementById('mainScreen');
    const gameContainer = document.getElementById('gameContainer');
    const backToMainBtn = document.getElementById('backToMainBtn');
    const characterImg = document.getElementById('characterImg');
    const atmosphereOverlay = document.getElementById('atmosphereOverlay');
    const characterName = document.getElementById('characterName');
    const dialogText = document.getElementById('dialogText');
    const choicesContainer = document.getElementById('choicesContainer');
    const continueBtn = document.getElementById('continueBtn');

    // Переменные для главного экрана
    let clickCount = 0;
    const originalTitle = 'Капа Капа Таун';

    // Переменные для игры
    let currentSceneId = 1;

    // ============== СЕРИЯ 1: КРАСНЫЙ ДЬЯВОЛ ==============
    const scenes = {
        // Сцена 1: Пробуждение
        1: {
            character: "Шанель Оберлин",
            text: "Медленно открываю свои прекрасные глаза. За окном опять этот дурацкий дождь. Капа... капа... капа... Бесит.",
            nextScene: 2,
            atmosphere: "calm",
            image: "sleepy",
            episode: 1
        },
        
        // Сцена 2: Мысли о себе
        2: {
            character: "Шанель Оберлин",
            text: "Смотрю на себя в зеркало... Боже, я прекрасна даже после сна. Эти простолюдинки никогда не поймут, каково это - быть идеальной.",
            nextScene: 3,
            atmosphere: "vain",
            image: "vain",
            episode: 1
        },
        
        // Сцена 3: Входят приспешницы (выбор)
        3: {
            character: "Шанель Оберлин",
            text: "В дверь робко стучат. Мои так называемые 'приспешницы'...",
            choices: [
                { text: "Чего вам, дуры?", nextScene: 4 },
                { text: "Войдите, ничтожества", nextScene: 5 },
                { text: "Зайдите через час", nextScene: 6 }
            ],
            atmosphere: "tense",
            image: "waiting",
            episode: 1
        },
        
        // Сцена 4: Рявкнуть
        4: {
            character: "Шанель Оберлин",
            text: "ЧЕГО ВАМ, ДУРЫ?! Я еще даже не напилась утреннего кофе!",
            nextScene: 7,
            atmosphere: "angry",
            image: "angry",
            episode: 1
        },
        
        // Сцена 5: Войдите
        5: {
            character: "Шанель Оберлин",
            text: "Войдите уже, ничтожества. И не смейте смотреть на меня своими тупыми глазами.",
            nextScene: 7,
            atmosphere: "cold",
            image: "cold",
            episode: 1
        },
        
        // Сцена 6: Заставить ждать
        6: {
            character: "Шанель Оберлин",
            text: "Молча смотрю в потолок. Пусть постоят, подумают о своем жалком существовании.",
            nextScene: 7,
            atmosphere: "cruel",
            image: "cruel",
            episode: 1
        },
        
        // Сцена 7: Приспешницы входят
        7: {
            character: "Приспешницы",
            text: "Госпожа, мы принесли ваш завтрак. Сегодня круассаны...",
            nextScene: 8,
            atmosphere: "tense",
            image: "helpers_scared",
            episode: 1
        },
        
        // Сцена 8: Выбор реакции
        8: {
            character: "Шанель Оберлин",
            text: "Перебиваю их на полуслове.",
            choices: [
                { text: "Заткнитесь! Я не голодна!", nextScene: 9 },
                { text: "Круассаны? А где эклеры?", nextScene: 10 },
                { text: "Подойдите ближе...", nextScene: 11 }
            ],
            atmosphere: "angry",
            image: "angry",
            episode: 1
        },
        
        // Сцена 9: Не голодна
        9: {
            character: "Шанель Оберлин",
            text: "ЗАТКНИТЕСЬ! Я не голодна, тупицы! Посмотрите на себя - жрете и жиреете!",
            nextScene: 12,
            atmosphere: "angry",
            image: "screaming",
            episode: 1
        },
        
        // Сцена 10: Не те круассаны
        10: {
            character: "Шанель Оберлин",
            text: "Круассаны? Вы издеваетесь? Я вчера ясно сказала - ЭКЛЕРЫ!",
            nextScene: 12,
            atmosphere: "angry",
            image: "screaming",
            episode: 1
        },
        
        // Сцена 11: Пощечины
        11: {
            character: "Шанель Оберлин",
            text: "Подойдите ближе. ЕЩЕ БЛИЖЕ... А теперь пощечина каждой! Это чтобы не забывали, кто здесь главная.",
            nextScene: 12,
            atmosphere: "cruel",
            image: "slapping",
            episode: 1
        },
        
        // Сцена 12: Реакция приспешниц
        12: {
            character: "Приспешницы",
            text: "Простите, госпожа... Простите... Мы все исправим...",
            nextScene: 13,
            atmosphere: "sad",
            image: "helpers_crying",
            episode: 1
        },
        
        // Сцена 13: Смягчение
        13: {
            character: "Шанель Оберлин",
            text: "Ой, какие мы нежные! Ладно, чего хотели-то утром?",
            nextScene: 14,
            atmosphere: "cold",
            image: "cold",
            episode: 1
        },
        
        // Сцена 14: Новости о городе (выбор)
        14: {
            character: "Приспешницы",
            text: "Госпожа, в городе неспокойно... Там появился маньяк... Красный Дьявол...",
            choices: [
                { text: "И что? Мне-то какое дело?", nextScene: 15 },
                { text: "Ха! Пусть только сунется!", nextScene: 16 },
                { text: "Вы намекаете, что я следующая?", nextScene: 17 }
            ],
            atmosphere: "tense",
            image: "helpers_worried",
            episode: 1
        },
        
        // Сцена 15: Равнодушие
        15: {
            character: "Шанель Оберлин",
            text: "И что? Мне-то какое дело? Пусть хоть всех перережет, главное - мой особняк не троньте.",
            nextScene: 18,
            atmosphere: "cold",
            image: "cruel",
            episode: 1
        },
        
        // Сцена 16: Самоуверенность
        16: {
            character: "Шанель Оберлин",
            text: "Ха! Пусть только сунется сюда! Я ему устрою!",
            nextScene: 18,
            atmosphere: "confident",
            image: "laughing",
            episode: 1
        },
        
        // Сцена 17: Истерика
        17: {
            character: "Шанель Оберлин",
            text: "Вы намекаете, что я следующая? ДУРЫ!!!",
            nextScene: 18,
            atmosphere: "angry",
            image: "hysterical",
            episode: 1
        },
        
        // Сцена 18: Идем в гардероб
        18: {
            character: "Шанель Оберлин",
            text: "Так, все заткнулись. Мы идем в гардеробную. Мне нужно выбрать платье.",
            nextScene: 19,
            atmosphere: "commanding",
            image: "commanding",
            episode: 1
        },
        
        // Сцена 19: В гардеробной (выбор)
        19: {
            character: "Шанель Оберлин",
            text: "Гардеробная - мое святилище. Ряды платьев, туфель, аксессуаров.",
            choices: [
                { text: "Тащите красное платье!", nextScene: 20 },
                { text: "Хочу быть в черном", nextScene: 21 },
                { text: "Что-то яркое и убийственное", nextScene: 22 }
            ],
            atmosphere: "wardrobe",
            image: "wardrobe",
            episode: 1
        },
        
        // Сцена 20: Красное платье
        20: {
            character: "Шанель Оберлин",
            text: "Тащите красное платье! Хочу быть яркой и опасной!",
            nextScene: 23,
            atmosphere: "confident",
            image: "commanding",
            episode: 1
        },
        
        // Сцена 21: Черное платье
        21: {
            character: "Шанель Оберлин",
            text: "Сегодня хочу быть в черном. Как моя душа.",
            nextScene: 23,
            atmosphere: "cold",
            image: "smirking",
            episode: 1
        },
        
        // Сцена 22: Яркое
        22: {
            character: "Шанель Оберлин",
            text: "Что-то яркое и убийственное. Хочу всех сразить наповал!",
            nextScene: 23,
            atmosphere: "dangerous",
            image: "predator",
            episode: 1
        },
        
        // Сцена 23: Странный звук
        23: {
            character: "Шанель Оберлин",
            text: "Вдруг слышен странный скрежет. Где-то наверху.",
            nextScene: 24,
            atmosphere: "suspense",
            image: "alert",
            episode: 1
        },
        
        // Сцена 24: Реакция на звук (выбор)
        24: {
            character: "Шанель Оберлин",
            text: "Скрежет усиливается. Кто-то на крыше.",
            choices: [
                { text: "Заткнитесь и слушайте!", nextScene: 25 },
                { text: "Это ваш ухажер?", nextScene: 26 },
                { text: "Кому-то конец", nextScene: 27 }
            ],
            atmosphere: "suspense",
            image: "alert",
            episode: 1
        },
        
        // Сцена 25: Заткнитесь
        25: {
            character: "Шанель Оберлин",
            text: "ЗАТКНИТЕСЬ И СЛУШАЙТЕ, ИДИОТКИ!",
            nextScene: 28,
            atmosphere: "angry",
            image: "listening",
            episode: 1
        },
        
        // Сцена 26: Сарказм
        26: {
            character: "Шанель Оберлин",
            text: "Ахаха, это ваш ухажер пожаловал?",
            nextScene: 28,
            atmosphere: "laughing",
            image: "laughing",
            episode: 1
        },
        
        // Сцена 27: Хищно
        27: {
            character: "Шанель Оберлин",
            text: "Ну все, кто бы это ни был - ему конец.",
            nextScene: 28,
            atmosphere: "dangerous",
            image: "predator",
            episode: 1
        },
        
        // Сцена 28: Красный Дьявол падает
        28: {
            character: "Шанель Оберлин",
            text: "БАБАХ! Потолок проламывается, и перед нами падает мужик в красном плаще и маске.",
            nextScene: 29,
            atmosphere: "attack",
            image: "devil_falls",
            episode: 1
        },
        
        // Сцена 29: Красный Дьявол угрожает
        29: {
            character: "Красный Дьявол",
            text: "НИ С МЕСТА! Я - Красный Дьявол! Сегодня вы все умрете!",
            nextScene: 30,
            atmosphere: "attack",
            image: "devil_threat",
            episode: 1
        },
        
        // Сцена 30: Реакция Шанель (выбор)
        30: {
            character: "Шанель Оберлин",
            text: "Смотрю на этого клоуна.",
            choices: [
                { text: "Ты кто вообще?", nextScene: 31 },
                { text: "Сними маску, урод", nextScene: 32 },
                { text: "Вали отсюда", nextScene: 33 }
            ],
            atmosphere: "confrontation",
            image: "unimpressed",
            episode: 1
        },
        
        // Сцена 31: Кто ты
        31: {
            character: "Шанель Оберлин",
            text: "Ты кто вообще, чучело? Красный Дьявол? А почему не Сиреневый Пончик?",
            nextScene: 34,
            atmosphere: "mockery",
            image: "mocking",
            episode: 1
        },
        
        // Сцена 32: Сними маску
        32: {
            character: "Шанель Оберлин",
            text: "Сними маску, дай посмотреть на твои прыщи!",
            nextScene: 34,
            atmosphere: "mockery",
            image: "mocking",
            episode: 1
        },
        
        // Сцена 33: Вали
        33: {
            character: "Шанель Оберлин",
            text: "Вали отсюда, пока я тебе плащ в глотку не засунула.",
            nextScene: 34,
            atmosphere: "dangerous",
            image: "threatening",
            episode: 1
        },
        
        // Сцена 34: Атака
        34: {
            character: "Красный Дьявол",
            text: "ЗАТКНИСЬ, ДРЯНЬ! - орет он и бросается с ножом.",
            nextScene: 35,
            atmosphere: "attack",
            image: "devil_attack",
            episode: 1
        },
        
        // Сцена 35: Уворот
        35: {
            character: "Шанель Оберлин",
            text: "Легко уворачиваюсь. Он врезается в вешалку с платьями.",
            nextScene: 36,
            atmosphere: "battle",
            image: "dodging",
            episode: 1
        },
        
        // Сцена 36: Выбор действия
        36: {
            character: "Шанель Оберлин",
            text: "Маньяк поднимается.",
            choices: [
                { text: "Ударить каблуком", nextScene: 37 },
                { text: "Пнуть в пах", nextScene: 38 },
                { text: "Сорвать маску", nextScene: 39 }
            ],
            atmosphere: "battle",
            image: "ready",
            episode: 1
        },
        
        // Сцена 37: Каблук
        37: {
            character: "Шанель Оберлин",
            text: "Хватаю шпильку и ОПУСКАЮ ему на голову!",
            nextScene: 40,
            atmosphere: "battle",
            image: "attacking",
            episode: 1
        },
        
        // Сцена 38: Пинок
        38: {
            character: "Шанель Оберлин",
            text: "ПИНАЮ его ногой в пах!",
            nextScene: 40,
            atmosphere: "battle",
            image: "kicking",
            episode: 1
        },
        
        // Сцена 39: Маска
        39: {
            character: "Шанель Оберлин",
            text: "Срываю с него маску. Под ней - прыщавое лицо.",
            nextScene: 40,
            atmosphere: "mockery",
            image: "mocking",
            episode: 1
        },
        
        // Сцена 40: Повержен
        40: {
            character: "Красный Дьявол",
            text: "Маньяк падает на колени. 'Су... сука...'",
            nextScene: 41,
            atmosphere: "defeated",
            image: "devil_defeated",
            episode: 1
        },
        
        // Сцена 41: Добивает
        41: {
            character: "Шанель Оберлин",
            text: "Хватаю вазу и ОБРУШИВАЮ ему на голову. Красный Дьявол падает замертво.",
            nextScene: 42,
            atmosphere: "victory",
            image: "finishing",
            episode: 1
        },
        
        // Сцена 42: Триумф
        42: {
            character: "Шанель Оберлин",
            text: "Фу, какая гадость. Девочки, уберите труп.",
            nextScene: 43,
            atmosphere: "victory",
            image: "triumph",
            episode: 1
        },
        
        // Сцена 43: Восхищение
        43: {
            character: "Приспешницы",
            text: "Госпожа... вы... вы убили Красного Дьявола!",
            nextScene: 44,
            atmosphere: "amazed",
            image: "helpers_amazed",
            episode: 1
        },
        
        // Сцена 44: Скромность
        44: {
            character: "Шанель Оберлин",
            text: "Подумаешь, прибила какого-то лоха. Где мое платье?",
            nextScene: 45,
            atmosphere: "cold",
            image: "unimpressed",
            episode: 1
        },
        
        // Сцена 45: Выбор платья
        45: {
            character: "Шанель Оберлин",
            text: "Так, я выбрала красное платье!",
            nextScene: 46,
            atmosphere: "commanding",
            image: "commanding",
            episode: 1
        },
        
        // Сцена 46: Мысли о вечеринке (выбор - переход ко 2 серии)
        46: {
            character: "Шанель Оберлин",
            text: "Сегодня же вечеринка! Говорят, там будет сам Андрей Барыга...",
            choices: [
                { text: "Пойти на вечеринку", nextScene: 101 }
            ],
            atmosphere: "confident",
            image: "smirking",
            episode: 1
        },

        // ============== СЕРИЯ 2: ОХОТА НА БАРЫГУ ==============
        // Сцена 101: На вечеринку
        101: {
            character: "Шанель Оберлин",
            text: "Так, ничтожества, слушайте! Мы идем на вечеринку. Там будет Андрей Барыга. Он будет МОЙ!",
            nextScene: 102,
            atmosphere: "commanding",
            image: "commanding",
            episode: 2
        },
        
        // Сцена 102: Приспешницы
        102: {
            character: "Приспешницы",
            text: "Да, госпожа! Но говорят, Андрей Барыга очень разборчив...",
            nextScene: 103,
            atmosphere: "worried",
            image: "helpers_worried",
            episode: 2
        },
        
        // Сцена 103: Уверенность
        103: {
            character: "Шанель Оберлин",
            text: "Ха! Эти курицы по сравнению со мной - просто мокрые курицы!",
            nextScene: 104,
            atmosphere: "confident",
            image: "laughing",
            episode: 2
        },
        
        // Сцена 104: Инструктаж
        104: {
            character: "Шанель Оберлин",
            text: "Запомните: вы моя свита. Если кто-то посмеет флиртовать с Барыгой - убью!",
            nextScene: 105,
            atmosphere: "dangerous",
            image: "threatening",
            episode: 2
        },
        
        // Сцена 105: Выход
        105: {
            character: "Шанель Оберлин",
            text: "Выходим из особняка. Дождь кончился! Это знак!",
            nextScene: 106,
            atmosphere: "happy",
            image: "happy",
            episode: 2
        },
        
        // Сцена 106: Прибытие
        106: {
            character: "Шанель Оберлин",
            text: "Подходим к месту тусовки. Слышна музыка, смех.",
            nextScene: 107,
            atmosphere: "party",
            image: "entering",
            episode: 2
        },
        
        // Сцена 107: Вход
        107: {
            character: "Шанель Оберлин",
            text: "Захожу внутрь. Все взгляды на мне. Оглядываю зал...",
            nextScene: 108,
            atmosphere: "party",
            image: "entering",
            episode: 2
        },
        
        // Сцена 108: Шок
        108: {
            character: "Шанель Оберлин",
            text: "И тут я ВИЖУ ЭТО. Андрей Барыга флиртует с Ксюшей Шалимовой!",
            nextScene: 109,
            atmosphere: "shock",
            image: "shocked",
            episode: 2
        },
        
        // Сцена 109: Реакция (выбор)
        109: {
            character: "Шанель Оберлин",
            text: "Эта дешевка в розовом платье смеет подбираться к МОЕМУ Барыге?",
            choices: [
                { text: "Напасть сразу!", nextScene: 110 },
                { text: "Сначала понаблюдать", nextScene: 111 },
                { text: "Найти компромат", nextScene: 112 }
            ],
            atmosphere: "angry",
            image: "angry",
            episode: 2
        },
        
        // Сцена 110: Напасть
        110: {
            character: "Шанель Оберлин",
            text: "Несусь к ним! Ксюша, отойди от мужчины, пока я тебе руки не оторвала!",
            nextScene: 113,
            atmosphere: "angry",
            image: "screaming",
            episode: 2
        },
        
        // Сцена 111: Наблюдать
        111: {
            character: "Шанель Оберлин",
            text: "Смотрю: она слишком громко смеется, много жестикулирует. Классика дешевки.",
            nextScene: 114,
            atmosphere: "calculating",
            image: "calculating",
            episode: 2
        },
        
        // Сцена 112: Компромат
        112: {
            character: "Приспешницы",
            text: "Госпожа, она в прошлом году украла колготки в магазине!",
            nextScene: 115,
            atmosphere: "gossip",
            image: "helpers_gossip",
            episode: 2
        },
        
        // Сцена 113: Ксюша
        113: {
            character: "Ксюша Шалимова",
            text: "Ой, Шанель, все в том же красном платье? Не надоело?",
            nextScene: 116,
            atmosphere: "catfight",
            image: "ksusha_mocking",
            episode: 2
        },
        
        // Сцена 114: Подход
        114: {
            character: "Шанель Оберлин",
            text: "Подхожу медленно, как пантера. Андрей, дорогой!",
            nextScene: 116,
            atmosphere: "confident",
            image: "approaching",
            episode: 2
        },
        
        // Сцена 115: Компромат в деле
        115: {
            character: "Шанель Оберлин",
            text: "Ксюша, как там твои колготки, все еще в магазине висят?",
            nextScene: 116,
            atmosphere: "catfight",
            image: "mocking",
            episode: 2
        },
        
        // Сцена 116: Пикировка
        116: {
            character: "Шанель Оберлин",
            text: "Это платье стоит больше твоей зарплаты. Ой, прости, ты же не работаешь!",
            nextScene: 117,
            atmosphere: "catfight",
            image: "mocking",
            episode: 2
        },
        
        // Сцена 117: Андрей
        117: {
            character: "Андрей Барыга",
            text: "Ого, девушки! Шанель, ты великолепна. Ксюша, тебе пора сменить стилиста.",
            nextScene: 118,
            atmosphere: "amused",
            image: "andrey_amused",
            episode: 2
        },
        
        // Сцена 118: Ксюша в ярости
        118: {
            character: "Ксюша Шалимова",
            text: "Что?! Андрей, ты выбираешь эту стерву?",
            nextScene: 119,
            atmosphere: "angry",
            image: "ksusha_angry",
            episode: 2
        },
        
        // Сцена 119: Шанель добивает
        119: {
            character: "Шанель Оберлин",
            text: "Ксюшенька, отойди, пока я не рассердилась по-настоящему.",
            nextScene: 120,
            atmosphere: "cruel",
            image: "cruel",
            episode: 2
        },
        
        // Сцена 120: Ксюша уходит
        120: {
            character: "Ксюша Шалимова",
            text: "Да пошли вы оба! - кричит Ксюша и убегает.",
            nextScene: 121,
            atmosphere: "amused",
            image: "ksusha_leaving",
            episode: 2
        },
        
        // Сцена 121: Андрей
        121: {
            character: "Андрей Барыга",
            text: "Шанель, ты не перестаешь удивлять. Выпьешь со мной?",
            nextScene: 122,
            atmosphere: "romantic",
            image: "andrey_offer",
            episode: 2
        },
        
        // Сцена 122: Выбор
        122: {
            character: "Шанель Оберлин",
            text: "Конечно, я выпью.",
            choices: [
                { text: "Только самое дорогое шампанское", nextScene: 123 },
                { text: "Сначала танец", nextScene: 124 },
                { text: "А ты уверен, что достоин?", nextScene: 125 }
            ],
            atmosphere: "flirting",
            image: "flirting",
            episode: 2
        },
        
        // Сцена 123: Шампанское
        123: {
            character: "Андрей Барыга",
            text: "Для такой женщины - только лучшее! Бармен, шампанского!",
            nextScene: 126,
            atmosphere: "party",
            image: "champagne",
            episode: 2
        },
        
        // Сцена 124: Танец
        124: {
            character: "Андрей Барыга",
            text: "Танец? С тобой? С удовольствием!",
            nextScene: 126,
            atmosphere: "romantic",
            image: "dancing",
            episode: 2
        },
        
        // Сцена 125: Высокомерно
        125: {
            character: "Андрей Барыга",
            text: "Ха! А ты дерзкая. Мне это нравится.",
            nextScene: 126,
            atmosphere: "confident",
            image: "andrey_confident",
            episode: 2
        },
        
        // Сцена 126: Разговор
        126: {
            character: "Шанель Оберлин",
            text: "Сидим, пьем шампанское. Андрей под впечатлением.",
            nextScene: 127,
            atmosphere: "romantic",
            image: "talking",
            episode: 2
        },
        
        // Сцена 127: Признание
        127: {
            character: "Шанель Оберлин",
            text: "Кстати, я сегодня убила Красного Дьявола.",
            nextScene: 128,
            atmosphere: "proud",
            image: "proud",
            episode: 2
        },
        
        // Сцена 128: Андрей в шоке
        128: {
            character: "Андрей Барыга",
            text: "ЧТО?! Ты убила Красного Дьявола? Ты легенда!",
            nextScene: 129,
            atmosphere: "shocked",
            image: "andrey_shocked",
            episode: 2
        },
        
        // Сцена 129: Сближение
        129: {
            character: "Андрей Барыга",
            text: "Шанель, ты особенная. Ты... моя?",
            nextScene: 130,
            atmosphere: "intimate",
            image: "close",
            episode: 2
        },
        
        // Сцена 130: Поцелуй
        130: {
            character: "Шанель Оберлин",
            text: "Смотрю в его глаза. И мы целуемся! Ксюша может удавиться от зависти!",
            nextScene: 131,
            atmosphere: "kiss",
            image: "kiss",
            episode: 2
        },
        
        // Сцена 131: Триумф
        131: {
            character: "Шанель Оберлин",
            text: "Отрываюсь от поцелуя. Приспешницы аплодируют. ИДЕАЛЬНО!",
            nextScene: 132,
            atmosphere: "triumph",
            image: "triumph",
            episode: 2
        },
        
        // Сцена 132: Полиция
        132: {
            character: "Шанель Оберлин",
            text: "Вдруг двери распахиваются. ПОЛИЦИЯ! ВСЕМ НА МЕСТА!",
            nextScene: 133,
            atmosphere: "police",
            image: "police",
            episode: 2
        },
        
        // Сцена 133: Паника
        133: {
            character: "Приспешницы",
            text: "Госпожа! Госпожа, это полиция! Что делать?!",
            nextScene: 134,
            atmosphere: "panic",
            image: "helpers_panic",
            episode: 2
        },
        
        // Сцена 134: Осознание
        134: {
            character: "Шанель Оберлин",
            text: "Спокойно. Я ничего не делала... ну, кроме маньяка... Ой.",
            nextScene: 135,
            atmosphere: "realization",
            image: "realization",
            episode: 2
        },
        
        // Сцена 135: Арест
        135: {
            character: "Полицейский",
            text: "Шанель Оберлин? Вы арестованы за убийство!",
            nextScene: 136,
            atmosphere: "arrest",
            image: "arrest",
            episode: 2
        },
        
        // Сцена 136: Андрей
        136: {
            character: "Андрей Барыга",
            text: "Шанель, это правда?",
            nextScene: 137,
            atmosphere: "shock",
            image: "andrey_shock",
            episode: 2
        },
        
        // Сцена 137: Оправдания
        137: {
            character: "Шанель Оберлин",
            text: "Это был маньяк! Он напал на нас!",
            nextScene: 138,
            atmosphere: "protest",
            image: "protest",
            episode: 2
        },
        
        // Сцена 138: Наручники
        138: {
            character: "Полицейский",
            text: "В участке расскажете. Надевайте наручники.",
            nextScene: 139,
            atmosphere: "arrest",
            image: "handcuffs",
            episode: 2
        },
        
        // Сцена 139: Ксюша злорадствует
        139: {
            character: "Ксюша Шалимова",
            text: "Ахаха! Шанель, тебе идет! А ты, Андрей, все еще хочешь быть с ней?",
            nextScene: 140,
            atmosphere: "gloating",
            image: "ksusha_gloating",
            episode: 2
        },
        
        // Сцена 140: Последнее слово
        140: {
            character: "Шанель Оберлин",
            text: "Заткнись, Шалимова! Я еще вернусь!",
            nextScene: 141,
            atmosphere: "angry",
            image: "angry",
            episode: 2
        },
        
        // Сцена 141: Уводят
        141: {
            character: "Шанель Оберлин",
            text: "Полицейские уводят меня. Ну ничего, я еще вернусь!",
            nextScene: 142,
            atmosphere: "dramatic",
            image: "leaving",
            episode: 2
        },
        
        // Сцена 142: Финал 2 серии
        142: {
            character: "Шанель Оберлин",
            text: "Вместо романтики - наручники. Но это только начало!",
            choices: [
                { text: "Продолжить (Серия 3)", nextScene: 201 }
            ],
            atmosphere: "cliffhanger",
            image: "cliffhanger",
            episode: 2
        },

        // ============== СЕРИЯ 3: НОВЫЙ КАПА КАПА ТАУН ==============
        // Сцена 201: В тюрьме
        201: {
            character: "Шанель Оберлин",
            text: "Ой, боже мой! Какие ужасные стены! Какие ужасные люди! И где здесь СПА-салон? Я требую менеджера!",
            nextScene: 202,
            atmosphere: "prison",
            image: "blonde_shocked",
            episode: 3
        },
        
        // Сцена 202: Сокамерница 1
        202: {
            character: "Заключенная 1",
            text: "Ты че, малая, с каких хором сюда попала? За что тебя?",
            nextScene: 203,
            atmosphere: "prison",
            image: "inmate1",
            episode: 3
        },
        
        // Сцена 203: Шанель притворяется доброй
        203: {
            character: "Шанель Оберлин",
            text: "Ой, девочки! Я такая бедная и несчастная! Меня просто непоняли! Я вообще добрейшей души человек! Я всем помогаю! Я даже бабочек не обижаю!",
            nextScene: 204,
            atmosphere: "fake_sweet",
            image: "blonde_fake",
            episode: 3
        },
        
        // Сцена 204: Сокамерница 2
        204: {
            character: "Заключенная 2",
            text: "Правда? А выглядишь как та еще штучка. Вон как брови выгнула, как на подиуме.",
            nextScene: 205,
            atmosphere: "suspicious",
            image: "inmate2",
            episode: 3
        },
        
        // Сцена 205: Шанель строит глазки
        205: {
            character: "Шанель Оберлин",
            text: "Я? Штучка? Дорогая, я просто девочка, которая любит мир во всем мире! Давайте обниматься? Я могу сделать вам макияж! У меня где-то была помада...",
            nextScene: 206,
            atmosphere: "fake_sweet",
            image: "blonde_innocent",
            episode: 3
        },
        
        // Сцена 206: Заключенные в недоумении
        206: {
            character: "Заключенная 1",
            text: "Слышь, она чокнутая? Или реально добрая? Я не понимаю.",
            nextScene: 207,
            atmosphere: "confused",
            image: "inmates_confused",
            episode: 3
        },
        
        // Сцена 207: Шанель рассказывает
        207: {
            character: "Шанель Оберлин",
            text: "Девочки, я вам сейчас расскажу, какая я хорошая! Я утром проснулась, подумала о вас! Как вы тут бедненькие сидите? Без маникюра, без педикюра... Это же просто кошмар!",
            nextScene: 208,
            atmosphere: "fake_sweet",
            image: "blonde_talking",
            episode: 3
        },
        
        // Сцена 208: Сокамерница 3
        208: {
            character: "Заключенная 3",
            text: "Слышь, а ты правда такая милая? А то у нас тут свои порядки. Может, тебе объяснить?",
            nextScene: 209,
            atmosphere: "suspicious",
            image: "inmate3",
            episode: 3
        },
        
        // Сцена 209: Шанель вживается в роль
        209: {
            character: "Шанель Оберлин",
            text: "Ой, не надо порядков! Я сама по себе порядок! Я как цветочек, понимаете? Такой нежный, хрупкий... А вы меня не сломаете! Потому что я сильная! Но добрая!",
            nextScene: 210,
            atmosphere: "fake_sweet",
            image: "blonde_flower",
            episode: 3
        },
        
        // Сцена 210: Заключенные смеются
        210: {
            character: "Заключенные (хором)",
            text: "Хахаха! Забавная ты! Давно у нас таких не было! Ладно, живи пока.",
            nextScene: 211,
            atmosphere: "laughing",
            image: "inmates_laughing",
            episode: 3
        },
        
        // Сцена 211: Шанель про себя
        211: {
            character: "Шанель Оберлин",
            text: "(про себя) Боже, какие идиотки! Поверили, что я добрая! Я сейчас лопну от смеха! Но надо держать лицо...",
            nextScene: 212,
            atmosphere: "inner_thoughts",
            image: "blonde_thinking",
            episode: 3
        },
        
        // Сцена 212: Разговор с заключенной
        212: {
            character: "Заключенная 1",
            text: "А расскажи, красотка, за что тебя? За мошенничество? За кражу?",
            nextScene: 213,
            atmosphere: "curious",
            image: "inmate1",
            episode: 3
        },
        
        // Сцена 213: Шанель врет
        213: {
            character: "Шанель Оберлин",
            text: "Ой, девочки, это такая несправедливость! Я просто защищалась! Ко мне пристал плохой дядька в красном плаще! А я его немножечко ударила вазой... Ну, может, не немножечко... Может, сильно... Но он первый начал!",
            nextScene: 214,
            atmosphere: "fake_sad",
            image: "blonde_crying",
            episode: 3
        },
        
        // Сцена 214: Сокамерница 2
        214: {
            character: "Заключенная 2",
            text: "Красный Дьявол? Так это ты его завалила? Да ты героиня! А мы думали, его полиция поймала!",
            nextScene: 215,
            atmosphere: "amazed",
            image: "inmate2_amazed",
            episode: 3
        },
        
        // Сцена 215: Шанель смущается
        215: {
            character: "Шанель Оберлин",
            text: "Ой, да ладно вам! Подумаешь, спасла город! Я вообще скромная! Я даже не люблю, когда меня хвалят! Ну, может, немножечко люблю... Ладно, очень люблю! Хвалите меня!",
            nextScene: 216,
            atmosphere: "vain",
            image: "blonde_vain",
            episode: 3
        },
        
        // Сцена 216: Заключенные аплодируют
        216: {
            character: "Заключенные",
            text: "Ура! Наша героиня! Мы теперь с тобой!",
            nextScene: 217,
            atmosphere: "happy",
            image: "inmates_cheer",
            episode: 3
        },
        
        // Сцена 217: Шанель учит жизни
        217: {
            character: "Шанель Оберлин",
            text: "Девочки, я вам сейчас расскажу, как надо жить! Во-первых, всегда улыбаться! Даже если вам плохо! Особенно если вам плохо! Во-вторых, никогда не красить губы дешевой помадой! В-третьих, всегда думать о себе! Потому что вы - лучшее, что с вами случилось!",
            nextScene: 218,
            atmosphere: "teaching",
            image: "blonde_teaching",
            episode: 3
        },
        
        // Сцена 218: Сокамерница 3
        218: {
            character: "Заключенная 3",
            text: "Слышь, а ты реально умная! Я тоже хочу так жить! А научишь нас краситься?",
            nextScene: 219,
            atmosphere: "excited",
            image: "inmate3_excited",
            episode: 3
        },
        
        // Сцена 219: Шанель расцветает
        219: {
            character: "Шанель Оберлин",
            text: "Конечно, научу! С вас - обожание, с меня - макияж! Вот увидите, через неделю вы будете такими красивыми, что охрана упадет в обморок!",
            nextScene: 220,
            atmosphere: "happy",
            image: "blonde_happy",
            episode: 3
        },
        
        // Сцена 220: Мастер-класс
        220: {
            character: "Шанель Оберлин",
            text: "Так, смотрите! Сначала тональный крем! У кого есть? Нет? Ладно, используем зубную пасту! Тоже неплохо блестит!",
            nextScene: 221,
            atmosphere: "funny",
            image: "blonde_makeup",
            episode: 3
        },
        
        // Сцена 221: Заключенные в восторге
        221: {
            character: "Заключенная 1",
            text: "Ой, смотрите, я стала красивая! Спасибо, Шанель! Ты настоящая подруга!",
            nextScene: 222,
            atmosphere: "happy",
            image: "inmate_happy",
            episode: 3
        },
        
        // Сцена 222: Шанель про себя
        222: {
            character: "Шанель Оберлин",
            text: "(про себя) Подруга? Ха! Эти дуры даже не понимают, что я их просто использую! Но пока пусть думают, что я добрая. Пригодится!",
            nextScene: 223,
            atmosphere: "inner_cruel",
            image: "blonde_evil",
            episode: 3
        },
        
        // Сцена 223: Охранник входит
        223: {
            character: "Охранник",
            text: "Оберлин! Выходи! За тебя внесли залог!",
            nextScene: 224,
            atmosphere: "announcement",
            image: "guard",
            episode: 3
        },
        
        // Сцена 224: Шанель меняется мгновенно
        224: {
            character: "Шанель Оберлин",
            text: "ЧТО? Залог? Ну наконец-то! А то я уже начала задыхаться от этого сервиса!",
            nextScene: 225,
            atmosphere: "dramatic",
            image: "blonde_transformed",
            episode: 3
        },
        
        // Сцена 225: Поворот к заключенным
        225: {
            character: "Шанель Оберлин",
            text: "Так, клуши, спасибо за компанию! Было весело, но мне пора! У меня маникюр через час!",
            nextScene: 226,
            atmosphere: "cruel",
            image: "blonde_cruel",
            episode: 3
        },
        
        // Сцена 226: Шок заключенных
        226: {
            character: "Заключенная 1",
            text: "Как? Ты же была такая добрая? А как же наша дружба? А как же макияж?",
            nextScene: 227,
            atmosphere: "shock",
            image: "inmates_shocked",
            episode: 3
        },
        
        // Сцена 227: Шанель смеется
        227: {
            character: "Шанель Оберлин",
            text: "Дружба? С вами? Дорогая, я просто играла! Вы думаете, я бы стала тратить время на таких, как вы, если бы мне не было скучно? Ха! Я Шанель Оберлин! Мне нужны только лучшие!",
            nextScene: 228,
            atmosphere: "mockery",
            image: "blonde_laughing",
            episode: 3
        },
        
        // Сцена 228: Заключенная 2
        228: {
            character: "Заключенная 2",
            text: "Ну ты и стерва! А мы-то поверили!",
            nextScene: 229,
            atmosphere: "angry",
            image: "inmate_angry",
            episode: 3
        },
        
        // Сцена 229: Шанель поправляет прическу
        229: {
            character: "Шанель Оберлин",
            text: "Стерва? Я? Дорогая, я не стерва, я - блондинка! Это вообще разные вещи! Стервы - это те, кто делает плохо просто так. А я делаю плохо только тем, кто мне не нравится. А вы мне не нравитесь. Всем пока!",
            nextScene: 230,
            atmosphere: "dramatic",
            image: "blonde_walking",
            episode: 3
        },
        
        // Сцена 230: Выход из тюрьмы
        230: {
            character: "Шанель Оберлин",
            text: "Выхожу из тюрьмы, поправляю волосы. Боже, как же тут воняет свободой! Надо срочно в спа!",
            nextScene: 231,
            atmosphere: "outside",
            image: "blonde_outside",
            episode: 3
        },
        
        // Сцена 231: Встреча
        231: {
            character: "Шанель Оберлин",
            text: "Подхожу к выходу и тут вижу... Ксюша Шалимова? И Алиса Саакян? Вы чего тут делаете?",
            nextScene: 232,
            atmosphere: "shock",
            image: "blonde_surprised",
            episode: 3
        },
        
        // Сцена 232: Ксюша и Алиса
        232: {
            character: "Ксюша Шалимова и Алиса Саакян",
            text: "Мы за тебя залог внесли! Мы решили, что ты классная! Давай дружить!",
            nextScene: 233,
            atmosphere: "friendly",
            image: "ksusha_alisa",
            episode: 3
        },
        
        // Сцена 233: Шанель в шоке
        233: {
            character: "Шанель Оберлин",
            text: "ЧТО? Вы? За меня? Залог? Вы с ума сошли? Мы же враги! Я у тебя Андрея увела! Ты должна меня ненавидеть!",
            nextScene: 234,
            atmosphere: "shock",
            image: "blonde_shocked2",
            episode: 3
        },
        
        // Сцена 234: Ксюша объясняет
        234: {
            character: "Ксюша Шалимова",
            text: "Да плевать на Андрея! Он, кстати, даже не звонил тебе, пока ты сидела. Ни разу! Мы тут подумали... Ты крутая! Ты маньяка убила! Ты по-настоящему сильная! Мы хотим быть с тобой!",
            nextScene: 235,
            atmosphere: "sincere",
            image: "ksusha_sincere",
            episode: 3
        },
        
        // Сцена 235: Алиса говорит
        235: {
            character: "Алиса Саакян",
            text: "Да! Мы поняли, что ошибались! Ты не стерва, ты - королева! Возьми нас в свою команду! Мы будем лучшими приспешницами!",
            nextScene: 236,
            atmosphere: "sincere",
            image: "alisa_sincere",
            episode: 3
        },
        
        // Сцена 236: Шанель думает
        236: {
            character: "Шанель Оберлин",
            text: "(про себя) Так, интересный поворот. Эти двое хотя бы выглядят прилично. И деньги у них есть, раз залог внесли. А мои старые дуры... Они меня уже достали своими круассанами и слезами.",
            nextScene: 237,
            atmosphere: "thinking",
            image: "blonde_thinking2",
            episode: 3
        },
        
        // Сцена 237: Решение
        237: {
            character: "Шанель Оберлин",
            text: "Так, девочки, вы прощены! Более того, вы теперь мои новые приспешницы! Поехали в особняк, будем создавать НОВЫЙ КАПА КАПА ТАУН!",
            nextScene: 238,
            atmosphere: "happy",
            image: "blonde_happy2",
            episode: 3
        },
        
        // Сцена 238: Старые приспешницы встречают
        238: {
            character: "Старые приспешницы",
            text: "Госпожа! Вы вернулись! Мы так скучали! Мы приготовили ваши любимые круассаны!",
            nextScene: 239,
            atmosphere: "happy",
            image: "old_helpers",
            episode: 3
        },
        
        // Сцена 239: Шанель их прогоняет
        239: {
            character: "Шанель Оберлин",
            text: "Круассаны? ОПЯТЬ КРУАССАНЫ? Вы кроме круассанов вообще ничего не умеете? Знаете что, дуры, собирайте вещи и валите! У меня теперь новые девочки! Ксюша, Алиса - заходите!",
            nextScene: 240,
            atmosphere: "cruel",
            image: "blonde_firing",
            episode: 3
        },
        
        // Сцена 240: Старые плачут
        240: {
            character: "Старые приспешницы",
            text: "Но госпожа... Мы столько лет... Мы...",
            nextScene: 241,
            atmosphere: "sad",
            image: "helpers_crying2",
            episode: 3
        },
        
        // Сцена 241: Шанель не слушает
        241: {
            character: "Шанель Оберлин",
            text: "А-та-та! Я не слышу! Я вообще глухая, когда меня не устраивает! Вон отсюда! Ксюша, Алиса, проходите в гостиную!",
            nextScene: 242,
            atmosphere: "dismissive",
            image: "blonde_dismiss",
            episode: 3
        },
        
        // Сцена 242: Новый Капа Капа Таун
        242: {
            character: "Шанель Оберлин",
            text: "Так, девочки! С сегодняшнего дня мы - НОВЫЙ КАПА КАПА ТАУН! Забудьте про старые порядки! Теперь мы будем жить по-новому!",
            nextScene: 243,
            atmosphere: "commanding",
            image: "blonde_leader",
            episode: 3
        },
        
        // Сцена 243: Ксюша в восторге
        243: {
            character: "Ксюша Шалимова",
            text: "Ура! А какие правила?",
            nextScene: 244,
            atmosphere: "excited",
            image: "ksusha_excited",
            episode: 3
        },
        
        // Сцена 244: Шанель устанавливает правила
        244: {
            character: "Шанель Оберлин",
            text: "Правило первое: я всегда права! Правило второе: если я не права, смотри правило первое! Правило третье: никаких круассанов, только эклеры! Правило четвертое: никаких мужиков! Тем более этого Барыги!",
            nextScene: 245,
            atmosphere: "commanding",
            image: "blonde_rules",
            episode: 3
        },
        
        // Сцена 245: Алиса спрашивает
        245: {
            character: "Алиса Саакян",
            text: "А про Барыгу - это навсегда? А если он позвонит?",
            nextScene: 246,
            atmosphere: "curious",
            image: "alisa_curious",
            episode: 3
        },
        
        // Сцена 246: Шанель смеется
        246: {
            character: "Шанель Оберлин",
            text: "Позвонит? Ха! Он даже не позвонил, пока я в тюрьме сидела! Такие мужики нам не нужны! Мы сами себе мужики! Мы блондинки! Мы сильные и независимые!",
            nextScene: 247,
            atmosphere: "confident",
            image: "blonde_independent",
            episode: 3
        },
        
        // Сцена 247: Девочки согласны
        247: {
            character: "Ксюша и Алиса",
            text: "Да! Мы сильные и независимые!",
            nextScene: 248,
            atmosphere: "happy",
            image: "girls_happy",
            episode: 3
        },
        
        // Сцена 248: Жизнь в особняке
        248: {
            character: "Шанель Оберлин",
            text: "Итак, прошел месяц. Мы живем втроем в особняке. Делаем маникюр, пьем шампанское, обсуждаем мальчиков (которые нам не нужны). Жизнь прекрасна!",
            nextScene: 249,
            atmosphere: "peaceful",
            image: "girls_living",
            episode: 3
        },
        
        // Сцена 249: Ксюша говорит
        249: {
            character: "Ксюша Шалимова",
            text: "Шанель, ты знаешь, я так рада, что мы подружились! Ты такая крутая! А помнишь, как мы враждовали из-за этого придурка? Смешно вспомнить!",
            nextScene: 250,
            atmosphere: "friendly",
            image: "ksusha_friendly",
            episode: 3
        },
        
        // Сцена 250: Шанель ностальгирует
        250: {
            character: "Шанель Оберлин",
            text: "Ага, смешно! Хотя, знаешь, я тогда реально хотела тебя убить. Но сейчас ты мне нравишься. Ты хотя бы не плачешь, как те старые дуры.",
            nextScene: 251,
            atmosphere: "warm",
            image: "blonde_warm",
            episode: 3
        },
        
        // Сцена 251: Алиса говорит
        251: {
            character: "Алиса Саакян",
            text: "А я вообще никогда не плачу! Я сильная!",
            nextScene: 252,
            atmosphere: "proud",
            image: "alisa_proud",
            episode: 3
        },
        
        // Сцена 252: Шанель смеется
        252: {
            character: "Шанель Оберлин",
            text: "Ой, Алиска, ты смешная! Ладно, давайте выбирать платья на сегодня!",
            nextScene: 253,
            atmosphere: "happy",
            image: "blonde_laughing2",
            episode: 3
        },
        
        // Сцена 253: В гардеробной
        253: {
            character: "Шанель Оберлин",
            text: "Так, девочки, сегодня я хочу быть в розовом! Розовый - это цвет блондинок!",
            nextScene: 254,
            atmosphere: "wardrobe",
            image: "wardrobe2",
            episode: 3
        },
        
        // Сцена 254: Ксюша выбирает
        254: {
            character: "Ксюша Шалимова",
            text: "А мне какое пойдет? Голубое?",
            nextScene: 255,
            atmosphere: "wardrobe",
            image: "ksusha_wardrobe",
            episode: 3
        },
        
        // Сцена 255: Шанель командует
        255: {
            character: "Шанель Оберлин",
            text: "Ксюша, тебе идет все, кроме того ужасного розового, в котором ты была на вечеринке! Выкинь его немедленно!",
            nextScene: 256,
            atmosphere: "commanding",
            image: "blonde_wardrobe",
            episode: 3
        },
        
        // Сцена 256: Ксюша смущается
        256: {
            character: "Ксюша Шалимова",
            text: "Ой, правда? А я думала, оно красивое...",
            nextScene: 257,
            atmosphere: "embarrassed",
            image: "ksusha_embarrassed",
            episode: 3
        },
        
        // Сцена 257: Шанель объясняет
        257: {
            character: "Шанель Оберлин",
            text: "Красивое? Дорогая, это был кошмар на ножках! Представляешь, что о тебе люди думали? Но ничего, я тебя перевоспитаю!",
            nextScene: 258,
            atmosphere: "teaching",
            image: "blonde_teaching2",
            episode: 3
        },
        
        // Сцена 258: Алиса смеется
        258: {
            character: "Алиса Саакян",
            text: "Хахаха! Ксюха, я же тебе говорила!",
            nextScene: 259,
            atmosphere: "laughing",
            image: "alisa_laughing",
            episode: 3
        },
        
        // Сцена 259: Вечер в особняке
        259: {
            character: "Шанель Оберлин",
            text: "Вечер. Мы сидим в гостиной, пьем чай (с ромом, конечно). За окном опять этот дурацкий дождь. Капа... капа... капа...",
            nextScene: 260,
            atmosphere: "calm",
            image: "girls_evening",
            episode: 3
        },
        
        // Сцена 260: Запах дыма
        260: {
            character: "Ксюша Шалимова",
            text: "Девочки, а чем это пахнет? Кажется, гарью?",
            nextScene: 261,
            atmosphere: "suspense",
            image: "ksusha_sniffing",
            episode: 3
        },
        
        // Сцена 261: Шанель не понимает
        261: {
            character: "Шанель Оберлин",
            text: "Гарью? У нас же камин не топили! Алиса, ты опять жгла свои старые фотографии?",
            nextScene: 262,
            atmosphere: "confused",
            image: "blonde_confused",
            episode: 3
        },
        
        // Сцена 262: Алиса отрицает
        262: {
            character: "Алиса Саакян",
            text: "Нет! Я ничего не жгла! Смотрите, дым идет из-под двери!",
            nextScene: 263,
            atmosphere: "panic",
            image: "alisa_panic",
            episode: 3
        },
        
        // Сцена 263: Дым усиливается
        263: {
            character: "Шанель Оберлин",
            text: "ЧТО? Дым? В моем особняке? Это возмутительно! Кто посмел устроить пожар без моего разрешения?",
            nextScene: 264,
            atmosphere: "angry",
            image: "blonde_angry_fire",
            episode: 3
        },
        
        // Сцена 264: Ксюша в панике
        264: {
            character: "Ксюша Шалимова",
            text: "Шанель, надо бежать! Срочно! Вызывай пожарных!",
            nextScene: 265,
            atmosphere: "panic",
            image: "ksusha_panic",
            episode: 3
        },
        
        // Сцена 265: Шанель в истерике
        265: {
            character: "Шанель Оберлин",
            text: "Бежать? А МОИ ПЛАТЬЯ? А МОЯ КОСМЕТИКА? А МОИ ТУФЛИ? Я без них не уйду!",
            nextScene: 266,
            atmosphere: "hysterical",
            image: "blonde_hysterical_fire",
            episode: 3
        },
        
        // Сцена 266: Алиса пытается спасти
        266: {
            character: "Алиса Саакян",
            text: "Шанель, плюнь на платья! Жизнь дороже!",
            nextScene: 267,
            atmosphere: "desperate",
            image: "alisa_desperate",
            episode: 3
        },
        
        // Сцена 267: Шанель выбирает
        267: {
            character: "Шанель Оберлин",
            text: "Ладно, хватаю самое дорогое! Ксюша, Алиса, быстро к выходу!",
            nextScene: 268,
            atmosphere: "panic",
            image: "blonde_grabbing",
            episode: 3
        },
        
        // Сцена 268: Дым везде
        268: {
            character: "Шанель Оберлин",
            text: "Дым заполняет коридор. Мы бежим, кашляем. Я ничего не вижу!",
            nextScene: 269,
            atmosphere: "fire",
            image: "fire_running",
            episode: 3
        },
        
        // Сцена 269: Ксюша кричит
        269: {
            character: "Ксюша Шалимова",
            text: "Шанель! Алиса! Где вы? Я ничего не вижу!",
            nextScene: 270,
            atmosphere: "fire",
            image: "fire_dark",
            episode: 3
        },
        
        // Сцена 270: Алиса отвечает
        270: {
            character: "Алиса Саакян",
            text: "Я здесь! Держитесь за руки!",
            nextScene: 271,
            atmosphere: "fire",
            image: "fire_hands",
            episode: 3
        },
        
        // Сцена 271: Шанель спотыкается
        271: {
            character: "Шанель Оберлин",
            text: "Ай! Я обо что-то споткнулась! Кажется, это тело!",
            nextScene: 272,
            atmosphere: "horror",
            image: "blonde_fall",
            episode: 3
        },
        
        // Сцена 272: Ксюша в ужасе
        272: {
            character: "Ксюша Шалимова",
            text: "Тело? Чье тело?",
            nextScene: 273,
            atmosphere: "horror",
            image: "ksusha_horror",
            episode: 3
        },
        
        // Сцена 273: Шанель смотрит
        273: {
            character: "Шанель Оберлин",
            text: "Я не вижу... Кажется, это мужчина... И у него красный плащ...",
            nextScene: 274,
            atmosphere: "horror",
            image: "blonde_seeing",
            episode: 3
        },
        
        // Сцена 274: Осознание
        274: {
            character: "Шанель Оберлин",
            text: "НЕТ! ЭТО НЕ МОЖЕТ БЫТЬ! ЭТО ЖЕ КРАСНЫЙ ДЬЯВОЛ! НО ОН ЖЕ МЕРТВ!",
            nextScene: 275,
            atmosphere: "horror",
            image: "blonde_horror",
            episode: 3
        },
        
        // Сцена 275: Дым рассеивается
        275: {
            character: "Шанель Оберлин",
            text: "Дым на секунду рассеивается. Я вижу его лицо. Это точно он! Но как? Я же его убила!",
            nextScene: 276,
            atmosphere: "horror",
            image: "devil_face",
            episode: 3
        },
        
        // Сцена 276: Фигура встает
        276: {
            character: "Красный Дьявол",
            text: "Ты думала, меня так легко убить, сучка? Я ВЕРНУЛСЯ!",
            nextScene: 277,
            atmosphere: "horror",
            image: "devil_rises",
            episode: 3
        },
        
        // Сцена 277: Шанель кричит
        277: {
            character: "Шанель Оберлин",
            text: "АААААА!",
            nextScene: 278,
            atmosphere: "scream",
            image: "blonde_scream",
            episode: 3
        },
        
        // Сцена 278: Потолок рушится
        278: {
            character: "Шанель Оберлин",
            text: "И в этот момент потолок начинает рушиться!",
            nextScene: 279,
            atmosphere: "disaster",
            image: "ceiling_fall",
            episode: 3
        },
        
        // Сцена 279: Конец 3 серии
        279: {
            character: "Шанель Оберлин",
            text: "ВСЁ РУШИТСЯ! Я НИЧЕГО НЕ ПОНИМАЮ! КРАСНЫЙ ДЬЯВОЛ ЖИВ! ОСОБНЯК ГОРИТ! ГДЕ КСЮША? ГДЕ АЛИСА?",
            nextScene: 280,
            atmosphere: "cliffhanger",
            image: "blonde_final",
            episode: 3
        },
        
        // Сцена 280: Переход к 4 серии
        280: {
            character: "???",
            text: "Что произошло? Почему Красный Дьявол жив? Кто устроил пожар? Выживет ли Шанель? Что с Ксюшей и Алисой?",
            choices: [
                { text: "Продолжить (Серия 4)", nextScene: 301 }
            ],
            atmosphere: "cliffhanger",
            image: "to_be_continued",
            episode: 3
        },

        // ============== СЕРИЯ 4: ДОГОНЯЛКИ С ДЬЯВОЛОМ ==============
        // Сцена 301: Начало погони
        301: {
            character: "Шанель Оберлин",
            text: "Мы бежим по коридору, а сзади слышны тяжелые шаги. Красный Дьявол гонится за нами!",
            nextScene: 302,
            atmosphere: "chase",
            image: "running",
            episode: 4
        },
        
        // Сцена 302: Первый бросок
        302: {
            character: "Шанель Оберлин",
            text: "Что-то пролетает мимо моей головы! Кажется, это была ваза!",
            nextScene: 303,
            atmosphere: "chase",
            image: "dodging",
            episode: 4
        },
        
        // Сцена 303: Выбор - увернуться
        303: {
            character: "Шанель Оберлин",
            text: "Красный Дьявол хватает горящую доску и кидает в нас!",
            choices: [
                { text: "Пригнуться", nextScene: 304 },
                { text: "Отпрыгнуть в сторону", nextScene: 305 },
                { text: "Закрыться подушкой", nextScene: 306 }
            ],
            atmosphere: "chase",
            image: "fire_throw",
            episode: 4
        },
        
        // Сцена 304: Пригнуться
        304: {
            character: "Шанель Оберлин",
            text: "Пригибаюсь, и горящая доска пролетает над головой, попадая в стену!",
            nextScene: 307,
            atmosphere: "chase",
            image: "dodging2",
            episode: 4
        },
        
        // Сцена 305: Отпрыгнуть
        305: {
            character: "Шанель Оберлин",
            text: "Отпрыгиваю в сторону, доска задевает мою сумку! Нет, только не сумка!",
            nextScene: 307,
            atmosphere: "chase",
            image: "dodging2",
            episode: 4
        },
        
        // Сцена 306: Подушка
        306: {
            character: "Шанель Оберлин",
            text: "Хватаю подушку с дивана, доска попадает в нее и загорается! Бросаю ее в сторону.",
            nextScene: 307,
            atmosphere: "chase",
            image: "dodging2",
            episode: 4
        },
        
        // Сцена 307: Ксюша кричит
        307: {
            character: "Ксюша Шалимова",
            text: "Шанель! Он бросает в нас всё подряд! Что делать?",
            nextScene: 308,
            atmosphere: "chase",
            image: "ksusha_panic2",
            episode: 4
        },
        
        // Сцена 308: Выбор - что ответить
        308: {
            character: "Шанель Оберлин",
            text: "Надо что-то придумать!",
            choices: [
                { text: "Бежать быстрее!", nextScene: 309 },
                { text: "Прятаться за мебель!", nextScene: 310 },
                { text: "Кидать в него ответно!", nextScene: 311 }
            ],
            atmosphere: "chase",
            image: "thinking_chase",
            episode: 4
        },
        
        // Сцена 309: Бежать быстрее
        309: {
            character: "Шанель Оберлин",
            text: "Бежим быстрее, перепрыгивая через обломки! Дьявол не отстает!",
            nextScene: 312,
            atmosphere: "chase",
            image: "running2",
            episode: 4
        },
        
        // Сцена 310: Прятаться
        310: {
            character: "Шанель Оберлин",
            text: "Прячемся за большим диваном. Дьявол пробегает мимо, не замечая нас!",
            nextScene: 312,
            atmosphere: "suspense",
            image: "hiding",
            episode: 4
        },
        
        // Сцена 311: Кидать ответно
        311: {
            character: "Шанель Оберлин",
            text: "Хватаю статуэтку и кидаю в него! Попадаю прямо в плечо! Он взвывает от боли!",
            nextScene: 312,
            atmosphere: "battle",
            image: "throwing",
            episode: 4
        },
        
        // Сцена 312: Лестница
        312: {
            character: "Алиса Саакян",
            text: "Смотрите, лестница вниз! На первый этаж!",
            nextScene: 313,
            atmosphere: "chase",
            image: "stairs",
            episode: 4
        },
        
        // Сцена 313: Выбор - спускаться
        313: {
            character: "Шанель Оберлин",
            text: "Спускаемся или ищем другой путь?",
            choices: [
                { text: "Спуститься по лестнице", nextScene: 314 },
                { text: "Искать другой выход", nextScene: 315 },
                { text: "Спрятаться на лестнице", nextScene: 316 }
            ],
            atmosphere: "suspense",
            image: "stairs_choice",
            episode: 4
        },
        
        // Сцена 314: Спуститься
        314: {
            character: "Шанель Оберлин",
            text: "Быстро спускаемся по лестнице. Ступени горят под ногами!",
            nextScene: 317,
            atmosphere: "fire",
            image: "stairs_fire",
            episode: 4
        },
        
        // Сцена 315: Искать другой путь
        315: {
            character: "Шанель Оберлин",
            text: "Ищем другой выход, но везде огонь! Приходится вернуться к лестнице.",
            nextScene: 314,
            atmosphere: "fire",
            image: "fire_blocked",
            episode: 4
        },
        
        // Сцена 316: Спрятаться
        316: {
            character: "Шанель Оберлин",
            text: "Прячемся на лестничной площадке. Дьявол пробегает мимо, не замечая нас в дыму.",
            nextScene: 317,
            atmosphere: "suspense",
            image: "hiding_stairs",
            episode: 4
        },
        
        // Сцена 317: Первый этаж
        317: {
            character: "Шанель Оберлин",
            text: "Спускаемся на первый этаж. Здесь дыма меньше, но Дьявол уже близко!",
            nextScene: 318,
            atmosphere: "chase",
            image: "first_floor",
            episode: 4
        },
        
        // Сцена 318: Голос в окне
        318: {
            character: "Шанель Оберлин",
            text: "Вдруг слышим крик из окна: 'ДЕВОЧКИ! СКОРЕЕ СЮДА! Я СПАСУ ВАС!'",
            nextScene: 319,
            atmosphere: "surprise",
            image: "window_voice",
            episode: 4
        },
        
        // Сцена 319: Кто это?
        319: {
            character: "Ксюша Шалимова",
            text: "Кто это? Я не вижу в дыму!",
            nextScene: 320,
            atmosphere: "suspense",
            image: "looking_window",
            episode: 4
        },
        
        // Сцена 320: Выбор - подойти к окну
        320: {
            character: "Шанель Оберлин",
            text: "Подходим к окну. Там кто-то есть!",
            choices: [
                { text: "Подойти осторожно", nextScene: 321 },
                { text: "Бежать к окну", nextScene: 322 },
                { text: "Сначала посмотреть", nextScene: 323 }
            ],
            atmosphere: "suspense",
            image: "window_approach",
            episode: 4
        },
        
        // Сцена 321: Осторожно
        321: {
            character: "Шанель Оберлин",
            text: "Осторожно подходим к окну. Вглядываюсь... Это же Кристина Полещук!",
            nextScene: 324,
            atmosphere: "shock",
            image: "see_kristina",
            episode: 4
        },
        
        // Сцена 322: Бегом
        322: {
            character: "Шанель Оберлин",
            text: "Бежим к окну. Это Кристина Полещук! Наша старая одноклассница!",
            nextScene: 324,
            atmosphere: "shock",
            image: "see_kristina",
            episode: 4
        },
        
        // Сцена 323: Посмотреть
        323: {
            character: "Шанель Оберлин",
            text: "Сначала выглядываю осторожно. Это Кристина Полещук! Выглядит не очень, но сейчас не до этого!",
            nextScene: 324,
            atmosphere: "shock",
            image: "see_kristina",
            episode: 4
        },
        
        // Сцена 324: Кристина кричит
        324: {
            character: "Кристина Полещук",
            text: "БЫСТРЕЕ! ЛЕЗЬТЕ В ОКНО! ОН СЕЙЧАС БУДЕТ ЗДЕСЬ!",
            nextScene: 325,
            atmosphere: "urgent",
            image: "kristina_shouting",
            episode: 4
        },
        
        // Сцена 325: Выбор - кто лезет первым
        325: {
            character: "Шанель Оберлин",
            text: "Надо выбираться!",
            choices: [
                { text: "Я полезу первая", nextScene: 326 },
                { text: "Ксюша, лезь ты!", nextScene: 327 },
                { text: "Алиса, давай!", nextScene: 328 }
            ],
            atmosphere: "urgent",
            image: "window_escape",
            episode: 4
        },
        
        // Сцена 326: Шанель первая
        326: {
            character: "Шанель Оберлин",
            text: "Полезу первая! Кристина помогает мне выбраться. Я на улице!",
            nextScene: 329,
            atmosphere: "escape",
            image: "climbing_out",
            episode: 4
        },
        
        // Сцена 327: Ксюша первая
        327: {
            character: "Шанель Оберлин",
            text: "Ксюша, лезь! Я помогу! Ксюша вылезает, я за ней.",
            nextScene: 329,
            atmosphere: "escape",
            image: "climbing_out",
            episode: 4
        },
        
        // Сцена 328: Алиса первая
        328: {
            character: "Шанель Оберлин",
            text: "Алиса, давай! Алиса вылезает, мы с Ксюшей следом.",
            nextScene: 329,
            atmosphere: "escape",
            image: "climbing_out",
            episode: 4
        },
        
        // Сцена 329: Все снаружи
        329: {
            character: "Шанель Оберлин",
            text: "Мы все выбрались! Особняк полыхает. Сзади слышен рев Красного Дьявола!",
            nextScene: 330,
            atmosphere: "fire_outside",
            image: "house_burning",
            episode: 4
        },
        
        // Сцена 330: Кристина
        330: {
            character: "Кристина Полещук",
            text: "БЕЖИМ! СКОРЕЕ! Я знаю, где спрятаться!",
            nextScene: 331,
            atmosphere: "urgent",
            image: "kristina_urgent",
            episode: 4
        },
        
        // Сцена 331: Бегство
        331: {
            character: "Шанель Оберлин",
            text: "Мы бежим за Кристиной в неизвестном направлении. Я даже не понимаю, куда мы бежим!",
            nextScene: 332,
            atmosphere: "running",
            image: "running_away",
            episode: 4
        },
        
        // Сцена 332: Выбор - оглянуться
        332: {
            character: "Шанель Оберлин",
            text: "Бежим по темным улицам.",
            choices: [
                { text: "Оглянуться на особняк", nextScene: 333 },
                { text: "Не оглядываться, бежать", nextScene: 334 },
                { text: "Спросить Кристину куда", nextScene: 335 }
            ],
            atmosphere: "running",
            image: "running_night",
            episode: 4
        },
        
        // Сцена 333: Оглянуться
        333: {
            character: "Шанель Оберлин",
            text: "Оглядываюсь. Мой особняк полыхает, как факел. Все мои вещи... Все сгорело...",
            nextScene: 336,
            atmosphere: "sad",
            image: "house_burning_far",
            episode: 4
        },
        
        // Сцена 334: Не оглядываться
        334: {
            character: "Шанель Оберлин",
            text: "Бегу, не оглядываясь. Слышу только треск огня позади.",
            nextScene: 336,
            atmosphere: "running",
            image: "running_night",
            episode: 4
        },
        
        // Сцена 335: Спросить
        335: {
            character: "Шанель Оберлин",
            text: "Кристина, куда мы бежим? - кричу я. 'Ко мне домой! Там безопасно!'",
            nextScene: 336,
            atmosphere: "running",
            image: "running_talking",
            episode: 4
        },
        
        // Сцена 336: Дом Кристины
        336: {
            character: "Шанель Оберлин",
            text: "Мы вбегаем в дом Кристины. Захлопываем дверь. Все падают на пол, тяжело дыша.",
            nextScene: 337,
            atmosphere: "safe",
            image: "safe_house",
            episode: 4
        },
        
        // Сцена 337: Облегчение
        337: {
            character: "Ксюша Шалимова",
            text: "Мы... мы живы...",
            nextScene: 338,
            atmosphere: "relief",
            image: "girls_relieved",
            episode: 4
        },
        
        // Сцена 338: Шанель плачет
        338: {
            character: "Шанель Оберлин",
            text: "И тут я чувствую, как слезы текут по щекам. Мои платья... Мои туфли... Мои сумки... ВСЁ СГОРЕЛО!",
            nextScene: 339,
            atmosphere: "crying",
            image: "blonde_crying2",
            episode: 4
        },
        
        // Сцена 339: Ксюша утешает
        339: {
            character: "Ксюша Шалимова",
            text: "Шанель, не плачь! Главное, что мы живы! Вещи можно купить новые!",
            nextScene: 340,
            atmosphere: "comforting",
            image: "ksusha_comforting",
            episode: 4
        },
        
        // Сцена 340: Выбор - ответ Ксюше
        340: {
            character: "Шанель Оберлин",
            text: "Смотрю на Ксюшу сквозь слезы.",
            choices: [
                { text: "Ты права, спасибо", nextScene: 341 },
                { text: "Легко тебе говорить!", nextScene: 342 },
                { text: "Обнять Ксюшу", nextScene: 343 }
            ],
            atmosphere: "emotional",
            image: "blonde_crying_talking",
            episode: 4
        },
        
        // Сцена 341: Ты права
        341: {
            character: "Шанель Оберлин",
            text: "Ты права... Спасибо, что вы со мной.",
            nextScene: 344,
            atmosphere: "touching",
            image: "blonde_thanks",
            episode: 4
        },
        
        // Сцена 342: Легко тебе
        342: {
            character: "Шанель Оберлин",
            text: "Легко тебе говорить! Это были ЛИМИТИРОВАННЫЕ коллекции!",
            nextScene: 344,
            atmosphere: "hysterical",
            image: "blonde_hysterical2",
            episode: 4
        },
        
        // Сцена 343: Обнять
        343: {
            character: "Шанель Оберлин",
            text: "Обнимаю Ксюшу. Она права. Главное, что мы живы.",
            nextScene: 344,
            atmosphere: "touching",
            image: "girls_hug",
            episode: 4
        },
        
        // Сцена 344: Кристина смотрит
        344: {
            character: "Кристина Полещук",
            text: "(тихо) Я рада, что вы в безопасности...",
            nextScene: 345,
            atmosphere: "quiet",
            image: "kristina_quiet",
            episode: 4
        },
        
        // Сцена 345: Алиса говорит
        345: {
            character: "Алиса Саакян",
            text: "Кристина, спасибо тебе огромное! Ты нас спасла!",
            nextScene: 346,
            atmosphere: "grateful",
            image: "alisa_grateful",
            episode: 4
        },
        
        // Сцена 346: Благодарность
        346: {
            character: "Шанель Оберлин",
            text: "Да, Кристина... Спасибо. Я... я не знаю, что бы мы делали без тебя.",
            nextScene: 347,
            atmosphere: "grateful",
            image: "blonde_grateful",
            episode: 4
        },
        
        // Сцена 347: Кристина улыбается
        347: {
            character: "Кристина Полещук",
            text: "Не за что. Мы же одноклассницы... Я всегда рада помочь.",
            nextScene: 348,
            atmosphere: "friendly",
            image: "kristina_smile",
            episode: 4
        },
        
        // Сцена 348: Предложение Ксюши
        348: {
            character: "Ксюша Шалимова",
            text: "Слушайте! А давайте пока поживем у меня? У меня дом небольшой, но всем места хватит! Пока не решим вопрос с новым особняком для Капа Капа Таун!",
            nextScene: 349,
            atmosphere: "hopeful",
            image: "ksusha_offer",
            episode: 4
        },
        
        // Сцена 349: Выбор - согласиться
        349: {
            character: "Шанель Оберлин",
            text: "Смотрю на Ксюшу. Это хорошая идея.",
            choices: [
                { text: "Согласиться", nextScene: 350 },
                { text: "Подумать", nextScene: 351 },
                { text: "Обнять Ксюшу", nextScene: 352 }
            ],
            atmosphere: "hopeful",
            image: "blonde_thinking3",
            episode: 4
        },
        
        // Сцена 350: Согласиться
        350: {
            character: "Шанель Оберлин",
            text: "Хорошо, Ксюша. Спасибо. Поехали к тебе.",
            nextScene: 353,
            atmosphere: "happy",
            image: "blonde_agree",
            episode: 4
        },
        
        // Сцена 351: Подумать
        351: {
            character: "Шанель Оберлин",
            text: "Думаю... А почему бы и нет? Спасибо, Ксюша.",
            nextScene: 353,
            atmosphere: "thinking",
            image: "blonde_agree",
            episode: 4
        },
        
        // Сцена 352: Обнять
        352: {
            character: "Шанель Оберлин",
            text: "Обнимаю Ксюшу. Спасибо тебе. Ты настоящая подруга.",
            nextScene: 353,
            atmosphere: "touching",
            image: "girls_hug2",
            episode: 4
        },
        
        // Сцена 353: Прощание с Кристиной
        353: {
            character: "Шанель Оберлин",
            text: "Кристина, спасибо тебе еще раз. Мы поедем к Ксюше. Ты с нами?",
            nextScene: 354,
            atmosphere: "friendly",
            image: "blonde_thanks_kristina",
            episode: 4
        },
        
        // Сцена 354: Кристина отказывается
        354: {
            character: "Кристина Полещук",
            text: "Нет, я лучше останусь дома. Выздоравливайте. Если что - я рядом.",
            nextScene: 355,
            atmosphere: "quiet",
            image: "kristina_stay",
            episode: 4
        },
        
        // Сцена 355: Уезжают
        355: {
            character: "Шанель Оберлин",
            text: "Мы прощаемся с Кристиной и едем к Ксюше. Новая жизнь начинается.",
            nextScene: 356,
            atmosphere: "hopeful",
            image: "girls_leaving",
            episode: 4
        },
        
        // Сцена 356: Дом Ксюши
        356: {
            character: "Шанель Оберлин",
            text: "Приезжаем в дом Ксюши. Небольшой, но уютный. По крайней мере, здесь нет огня и маньяков.",
            nextScene: 357,
            atmosphere: "peaceful",
            image: "ksusha_house",
            episode: 4
        },
        
        // Сцена 357: Утро
        357: {
            character: "Шанель Оберлин",
            text: "Наступает утро. Я просыпаюсь в чужой кровати, в чужом доме. Странное чувство.",
            nextScene: 358,
            atmosphere: "morning",
            image: "blonde_waking",
            episode: 4
        },
        
        // Сцена 358: Завтрак
        358: {
            character: "Ксюша Шалимова",
            text: "Доброе утро! Я приготовила завтрак. Омлет и кофе.",
            nextScene: 359,
            atmosphere: "morning",
            image: "ksusha_breakfast",
            episode: 4
        },
        
        // Сцена 359: Алиса за столом
        359: {
            character: "Алиса Саакян",
            text: "Ммм, как вкусно пахнет! Ксюша, ты умеешь готовить?",
            nextScene: 360,
            atmosphere: "happy",
            image: "alisa_eating",
            episode: 4
        },
        
        // Сцена 360: Выбор - что сказать
        360: {
            character: "Шанель Оберлин",
            text: "Сажусь за стол. Омлет выглядит неплохо.",
            choices: [
                { text: "Спасибо, Ксюша", nextScene: 361 },
                { text: "Неплохо для начала", nextScene: 362 },
                { text: "Могло быть и лучше", nextScene: 363 }
            ],
            atmosphere: "morning",
            image: "blonde_breakfast",
            episode: 4
        },
        
        // Сцена 361: Спасибо
        361: {
            character: "Шанель Оберлин",
            text: "Спасибо, Ксюша. Это очень мило с твоей стороны.",
            nextScene: 364,
            atmosphere: "grateful",
            image: "blonde_thanks2",
            episode: 4
        },
        
        // Сцена 362: Неплохо
        362: {
            character: "Шанель Оберлин",
            text: "Неплохо. Учитывая обстоятельства, могло быть хуже.",
            nextScene: 364,
            atmosphere: "calm",
            image: "blonde_eating",
            episode: 4
        },
        
        // Сцена 363: Могло быть лучше
        363: {
            character: "Шанель Оберлин",
            text: "Могло быть и лучше, но спасибо. Я не привыкла к такой простой пище.",
            nextScene: 364,
            atmosphere: "snobby",
            image: "blonde_snobby",
            episode: 4
        },
        
        // Сцена 364: После завтрака
        364: {
            character: "Шанель Оберлин",
            text: "Завтрак закончен. Я чувствую себя немного лучше.",
            nextScene: 365,
            atmosphere: "peaceful",
            image: "girls_after_breakfast",
            episode: 4
        },
        
        // Сцена 365: Урок стервозности
        365: {
            character: "Шанель Оберлин",
            text: "Девочки, раз уж мы теперь живем вместе, я должна дать вам первый урок. Урок того, как быть стервозными лидершами.",
            nextScene: 366,
            atmosphere: "teaching",
            image: "blonde_teaching3",
            episode: 4
        },
        
        // Сцена 366: Ксюша слушает
        366: {
            character: "Ксюша Шалимова",
            text: "Урок? Здорово! Я готова учиться!",
            nextScene: 367,
            atmosphere: "excited",
            image: "ksusha_excited2",
            episode: 4
        },
        
        // Сцена 367: Алиса слушает
        367: {
            character: "Алиса Саакян",
            text: "Я тоже! Рассказывай!",
            nextScene: 368,
            atmosphere: "excited",
            image: "alisa_excited",
            episode: 4
        },
        
        // Сцена 368: Первое правило
        368: {
            character: "Шанель Оберлин",
            text: "Первое правило стервы: всегда выглядеть безупречно. Даже если у тебя пожар, даже если ты в чужом доме. Внешность - твое оружие!",
            nextScene: 369,
            atmosphere: "teaching",
            image: "blonde_rule1",
            episode: 4
        },
        
        // Сцена 369: Второе правило
        369: {
            character: "Шанель Оберлин",
            text: "Второе правило: никогда не показывай слабость. Даже если тебе плохо - улыбайся. Люди любят сильных.",
            nextScene: 370,
            atmosphere: "teaching",
            image: "blonde_rule2",
            episode: 4
        },
        
        // Сцена 370: Третье правило
        370: {
            character: "Шанель Оберлин",
            text: "Третье правило: всегда знай себе цену. Ты - королева. Не позволяй никому сомневаться в этом.",
            nextScene: 371,
            atmosphere: "teaching",
            image: "blonde_rule3",
            episode: 4
        },
        
        // Сцена 371: Четвертое правило
        371: {
            character: "Шанель Оберлин",
            text: "Четвертое правило: выбирай правильное окружение. Ты - это твои подруги. Поэтому я выбрала вас.",
            nextScene: 372,
            atmosphere: "touching",
            image: "blonde_rule4",
            episode: 4
        },
        
        // Сцена 372: Ксюша рада
        372: {
            character: "Ксюша Шалимова",
            text: "Шанель... Это так трогательно! Спасибо!",
            nextScene: 373,
            atmosphere: "touching",
            image: "ksusha_touched",
            episode: 4
        },
        
        // Сцена 373: Алиса рада
        373: {
            character: "Алиса Саакян",
            text: "Мы будем лучшими ученицами!",
            nextScene: 374,
            atmosphere: "happy",
            image: "alisa_happy2",
            episode: 4
        },
        
        // Сцена 374: После урока
        374: {
            character: "Шанель Оберлин",
            text: "Урок окончен. Мы выходим во двор. Сидим на скамейке, греемся на солнышке.",
            nextScene: 375,
            atmosphere: "peaceful",
            image: "girls_yard",
            episode: 4
        },
        
        // Сцена 375: Разговор о Кристине
        375: {
            character: "Ксюша Шалимова",
            text: "Девочки, а что вы думаете о Кристине? Странная она какая-то...",
            nextScene: 376,
            atmosphere: "curious",
            image: "ksusha_talking",
            episode: 4
        },
        
        // Сцена 376: Выбор - что сказать о Кристине
        376: {
            character: "Шанель Оберлин",
            text: "Да, Кристина... Она нас спасла, но выглядела действительно странно.",
            choices: [
                { text: "Она ненормальная", nextScene: 377 },
                { text: "Она добрая, но странная", nextScene: 378 },
                { text: "Надо быть с ней осторожнее", nextScene: 379 }
            ],
            atmosphere: "secret",
            image: "blonde_thinking4",
            episode: 4
        },
        
        // Сцена 377: Ненормальная
        377: {
            character: "Шанель Оберлин",
            text: "Мне кажется, она ненормальная. Зачем она вообще там оказалась? Следила за нами?",
            nextScene: 380,
            atmosphere: "suspicious",
            image: "blonde_suspicious",
            episode: 4
        },
        
        // Сцена 378: Добрая, но странная
        378: {
            character: "Шанель Оберлин",
            text: "Она добрая, но странная. Вы видели ее взгляд? Как будто она что-то замышляет.",
            nextScene: 380,
            atmosphere: "suspicious",
            image: "blonde_thinking5",
            episode: 4
        },
        
        // Сцена 379: Осторожнее
        379: {
            character: "Шанель Оберлин",
            text: "Надо быть с ней осторожнее. Слишком вовремя она появилась.",
            nextScene: 380,
            atmosphere: "suspicious",
            image: "blonde_careful",
            episode: 4
        },
        
        // Сцена 380: Ксюша соглашается
        380: {
            character: "Ксюша Шалимова",
            text: "Согласна. Что-то в ней есть... жутковатое.",
            nextScene: 381,
            atmosphere: "suspicious",
            image: "ksusha_suspicious",
            episode: 4
        },
        
        // Сцена 381: Алиса добавляет
        381: {
            character: "Алиса Саакян",
            text: "И одежда у нее странная. Как будто из другого времени.",
            nextScene: 382,
            atmosphere: "suspicious",
            image: "alisa_suspicious",
            episode: 4
        },
        
        // Сцена 382: Шанель подводит итог
        382: {
            character: "Шанель Оберлин",
            text: "Ладно, пока просто понаблюдаем за ней. Но спасибо ей мы уже сказали. Дальше - посмотрим.",
            nextScene: 383,
            atmosphere: "calm",
            image: "blonde_summary",
            episode: 4
        },
        
        // Сцена 383: Продолжают разговор
        383: {
            character: "Шанель Оберлин",
            text: "Мы еще долго сидим во дворе, обсуждаем Кристину, смеемся, вспоминаем школу.",
            nextScene: 384,
            atmosphere: "peaceful",
            image: "girls_laughing",
            episode: 4
        },
        
        // Сцена 384: За стеной
        384: {
            character: "Шанель Оберлин",
            text: "Мы не знаем, что все это время за стеной дома стоит Кристина. Она слышит каждое наше слово.",
            nextScene: 385,
            atmosphere: "eavesdropping",
            image: "kristina_listening",
            episode: 4
        },
        
        // Сцена 385: Кристина слушает
        385: {
            character: "Кристина Полещук",
            text: "(шепотом) Так вы считаете меня странной? Ненормальной?",
            nextScene: 386,
            atmosphere: "eavesdropping",
            image: "kristina_whisper",
            episode: 4
        },
        
        // Сцена 386: Кристина злится
        386: {
            character: "Кристина Полещук",
            text: "(шепотом) Я вас спасла, а вы... Ну ничего. Я вам покажу, кто здесь странный.",
            nextScene: 387,
            atmosphere: "angry_eavesdrop",
            image: "kristina_angry",
            episode: 4
        },
        
        // Сцена 387: Кристина уходит
        387: {
            character: "Кристина Полещук",
            text: "Кристина тихо разворачивается и уходит, пока ее не заметили. В ее голове уже зреет план мести.",
            nextScene: 388,
            atmosphere: "menacing",
            image: "kristina_leaving",
            episode: 4
        },
        
        // Сцена 388: Вечер
        388: {
            character: "Шанель Оберлин",
            text: "Вечереет. Мы возвращаемся в дом. Не подозревая, что нажили себе врага.",
            nextScene: 389,
            atmosphere: "dusk",
            image: "girls_return",
            episode: 4
        },
        
        // Сцена 389: В доме
        389: {
            character: "Шанель Оберлин",
            text: "Заходим в дом. За окном темнеет. Мы чувствуем себя в безопасности, но так ли это?",
            nextScene: 390,
            atmosphere: "suspense",
            image: "girls_inside",
            episode: 4
        },
        
        // Сцена 390: Разговор перед сном
        390: {
            character: "Ксюша Шалимова",
            text: "Шанель, а как ты думаешь, мы справимся? Построим новый Капа Капа Таун?",
            nextScene: 391,
            atmosphere: "quiet",
            image: "ksusha_asking",
            episode: 4
        },
        
        // Сцена 391: Выбор - ответить
        391: {
            character: "Шанель Оберлин",
            text: "Смотрю на Ксюшу. Она выглядит встревоженной.",
            choices: [
                { text: "Конечно справимся!", nextScene: 392 },
                { text: "Я не знаю...", nextScene: 393 },
                { text: "Мы обязаны справиться", nextScene: 394 }
            ],
            atmosphere: "quiet",
            image: "blonde_thinking6",
            episode: 4
        },
        
        // Сцена 392: Конечно
        392: {
            character: "Шанель Оберлин",
            text: "Конечно справимся! Мы же Капа Капа Таун! Нас ничто не остановит!",
            nextScene: 395,
            atmosphere: "confident",
            image: "blonde_confident2",
            episode: 4
        },
        
        // Сцена 393: Не знаю
        393: {
            character: "Шанель Оберлин",
            text: "Я не знаю... Но мы попробуем. Вместе.",
            nextScene: 395,
            atmosphere: "uncertain",
            image: "blonde_uncertain",
            episode: 4
        },
        
        // Сцена 394: Обязаны
        394: {
            character: "Шанель Оберлин",
            text: "Мы обязаны справиться. У нас нет другого выбора. Мы сделаем это.",
            nextScene: 395,
            atmosphere: "determined",
            image: "blonde_determined",
            episode: 4
        },
        
        // Сцена 395: Алиса говорит
        395: {
            character: "Алиса Саакян",
            text: "Девочки, я верю в нас! Мы сильные!",
            nextScene: 396,
            atmosphere: "hopeful",
            image: "alisa_hopeful",
            episode: 4
        },
        
        // Сцена 396: Ночь
        396: {
            character: "Шанель Оберлин",
            text: "Мы ложимся спать. Ночь тихая и спокойная. Слишком спокойная...",
            nextScene: 397,
            atmosphere: "night",
            image: "girls_sleeping",
            episode: 4
        },
        
        // Сцена 397: Кристина дома
        397: {
            character: "Кристина Полещук",
            text: "Кристина сидит в темноте своей комнаты. В руках у нее старая школьная фотография. Она смотрит на Шанель, Ксюшу и Алису.",
            nextScene: 398,
            atmosphere: "dark",
            image: "kristina_dark",
            episode: 4
        },
        
        // Сцена 398: Месть
        398: {
            character: "Кристина Полещук",
            text: "Вы пожалеете, что так сказали обо мне. Я отомщу. И вы даже не узнаете, откуда придет удар.",
            nextScene: 399,
            atmosphere: "menacing",
            image: "kristina_vengeful",
            episode: 4
        },
        
        // Сцена 399: Финал 4 серии
        399: {
            character: "Кристина Полещук",
            text: "Новый Капа Капа Таун построен на пепле старого. Но пепел еще не остыл, а новая угроза уже рядом. И она гораздо ближе, чем вы думаете...",
            nextScene: 400,
            atmosphere: "cliffhanger",
            image: "to_be_continued2",
            episode: 4
        },
        
        // Сцена 400: Переход к 5 серии
        400: {
            character: "???",
            text: "СЕРИЯ 4 ЗАВЕРШЕНА. Что ждет наших героинь впереди?",
            choices: [
                { text: "Продолжить (Серия 5)", nextScene: 401 }
            ],
            atmosphere: "cliffhanger",
            image: "to_be_continued",
            episode: 4
        },

        // ============== СЕРИЯ 5: СУДНАЯ НОЧЬ ==============
        // Сцена 401: Неделя после уроков
        401: {
            character: "Шанель Оберлин",
            text: "Прошла неделя после моих уроков стервозности. И знаете что? Ксюша с Алисой превзошли все мои ожидания!",
            nextScene: 402,
            atmosphere: "proud",
            image: "blonde_proud",
            episode: 5
        },
        
        // Сцена 402: Ксюша обсуждает Андрея
        402: {
            character: "Ксюша Шалимова",
            text: "Девочки, вы видели, какой Андрей Барыга вчера пришел на вечеринку? В этом ужасном пиджаке! Я чуть не рассмеялась ему в лицо!",
            nextScene: 403,
            atmosphere: "gossip",
            image: "ksusha_gossip",
            episode: 5
        },
        
        // Сцена 403: Алиса подхватывает
        403: {
            character: "Алиса Саакян",
            text: "Ага! И еще он пытался со мной заговорить! Думает, если он разок поцеловался с Шанель, то теперь他可以 со всеми клеиться?",
            nextScene: 404,
            atmosphere: "gossip",
            image: "alisa_gossip",
            episode: 5
        },
        
        // Сцена 404: Выбор - что сказать об Андрее
        404: {
            character: "Шанель Оберлин",
            text: "Слушаю ваши сплетни и довольно улыбаюсь. Мои ученицы растут!",
            choices: [
                { text: "Андрей - просто жалкий тип", nextScene: 405 },
                { text: "Он даже звонить мне не стал", nextScene: 406 },
                { text: "Пусть катится к Кристине", nextScene: 407 }
            ],
            atmosphere: "gossip",
            image: "blonde_gossip",
            episode: 5
        },
        
        // Сцена 405: Жалкий тип
        405: {
            character: "Шанель Оберлин",
            text: "Андрей - просто жалкий тип. Думает, что он король, а сам без нашего внимания никто!",
            nextScene: 408,
            atmosphere: "gossip",
            image: "blonde_mocking",
            episode: 5
        },
        
        // Сцена 406: Не звонил
        406: {
            character: "Шанель Оберлин",
            text: "Он даже не позвонил мне после всего! Представляете? Я для него поцеловалась, а он... фу!",
            nextScene: 408,
            atmosphere: "gossip",
            image: "blonde_annoyed",
            episode: 5
        },
        
        // Сцена 407: К Кристине
        407: {
            character: "Шанель Оберлин",
            text: "Пусть катится к Кристине! Интересно, они бы спелись - два сапога пара!",
            nextScene: 408,
            atmosphere: "laughing",
            image: "blonde_laughing3",
            episode: 5
        },
        
        // Сцена 408: Ксюша о Кристине
        408: {
            character: "Ксюша Шалимова",
            text: "Кстати о Кристине! Вы заметили, как она на нас смотрела, когда мы уезжали? Как будто мы ей должны что-то!",
            nextScene: 409,
            atmosphere: "gossip",
            image: "ksusha_talking2",
            episode: 5
        },
        
        // Сцена 409: Алиса добавляет
        409: {
            character: "Алиса Саакян",
            text: "Да! И эта ее одежда... Как будто из секонд-хенда, который бомбили!",
            nextScene: 410,
            atmosphere: "gossip",
            image: "alisa_mocking",
            episode: 5
        },
        
        // Сцена 410: Выбор - что о Кристине
        410: {
            character: "Шанель Оберлин",
            text: "Девочки, не будьте слишком жестокими. Хотя... почему бы и нет?",
            choices: [
                { text: "Она реально странная", nextScene: 411 },
                { text: "Может, она бедная?", nextScene: 412 },
                { text: "Пусть остается в своем мире", nextScene: 413 }
            ],
            atmosphere: "gossip",
            image: "blonde_thinking7",
            episode: 5
        },
        
        // Сцена 411: Странная
        411: {
            character: "Шанель Оберлин",
            text: "Она реально странная. Спасла нас, а потом смотрит так, будто мы ей должны по гроб жизни!",
            nextScene: 414,
            atmosphere: "gossip",
            image: "blonde_suspicious2",
            episode: 5
        },
        
        // Сцена 412: Бедная
        412: {
            character: "Шанель Оберлин",
            text: "Может, она просто бедная? Вы видели ее дом? Обшарпанный, старый... Брр!",
            nextScene: 414,
            atmosphere: "gossip",
            image: "blonde_snobby2",
            episode: 5
        },
        
        // Сцена 413: Пусть остается
        413: {
            character: "Шанель Оберлин",
            text: "Пусть остается в своем мире. Главное, чтобы не лезла в наш!",
            nextScene: 414,
            atmosphere: "gossip",
            image: "blonde_dismiss2",
            episode: 5
        },
        
        // Сцена 414: Вечер
        414: {
            character: "Шанель Оберлин",
            text: "Вечереет. Мы сидим в гостиной, пьем чай и продолжаем обсуждать всех подряд. Как же это приятно - быть стервозной!",
            nextScene: 415,
            atmosphere: "peaceful",
            image: "girls_evening2",
            episode: 5
        },
        
        // Сцена 415: Первый камень
        415: {
            character: "Шанель Оберлин",
            text: "ВДРУГ! БАХ! Что-то с грохотом влетает в окно! Стекло разлетается вдребезги!",
            nextScene: 416,
            atmosphere: "shock",
            image: "broken_window",
            episode: 5
        },
        
        // Сцена 416: Паника
        416: {
            character: "Ксюша Шалимова",
            text: "ЧТО ЭТО? ЧТО ПРОИСХОДИТ?",
            nextScene: 417,
            atmosphere: "panic",
            image: "ksusha_panic3",
            episode: 5
        },
        
        // Сцена 417: Еще камни
        417: {
            character: "Шанель Оберлин",
            text: "Еще один камень! И еще! Они забрасывают наш дом камнями!",
            nextScene: 418,
            atmosphere: "attack",
            image: "stones_falling",
            episode: 5
        },
        
        // Сцена 418: Выстрел
        418: {
            character: "Шанель Оберлин",
            text: "БАХ! БАХ! БАХ! Выстрелы в воздух! Я падаю на пол, закрывая голову руками!",
            nextScene: 419,
            atmosphere: "gunfire",
            image: "girls_cowering",
            episode: 5
        },
        
        // Сцена 419: Громкоговоритель
        419: {
            character: "Голос из громкоговорителя",
            text: "ВНИМАНИЕ, ЖИТЕЛИ ДОМА! У ВАС ЕСТЬ РОВНО ОДИН ЧАС, ЧТОБЫ ПОДГОТОВИТЬСЯ К СУДНОЙ НОЧИ! СУДНАЯ НОЧЬ НАЧНЕТСЯ ЧЕРЕЗ ЧАС!",
            nextScene: 420,
            atmosphere: "announcement",
            image: "megaphone",
            episode: 5
        },
        
        // Сцена 420: Шок
        420: {
            character: "Шанель Оберлин",
            text: "ЧТО? СУДНАЯ НОЧЬ? ЭТО ЖЕ ТОЛЬКО В ФИЛЬМАХ!",
            nextScene: 421,
            atmosphere: "horror",
            image: "blonde_horror2",
            episode: 5
        },
        
        // Сцена 421: Кто там?
        421: {
            character: "Алиса Саакян",
            text: "Я выглядываю в разбитое окно... ТАМ ЦЕЛАЯ ТОЛПА! В красных масках!",
            nextScene: 422,
            atmosphere: "horror",
            image: "alisa_horror",
            episode: 5
        },
        
        // Сцена 422: Узнавание
        422: {
            character: "Шанель Оберлин",
            text: "Я тоже смотрю. Боже мой... Я узнаю их! Это Андрей Барыга, Кристина Полещук, мои старые приспешницы и даже те сокамерницы, с которыми я дружила в тюрьме!",
            nextScene: 423,
            atmosphere: "horror",
            image: "recognizing_enemies",
            episode: 5
        },
        
        // Сцена 423: Выбор - первая реакция
        423: {
            character: "Шанель Оберлин",
            text: "Что делать? Час до нападения!",
            choices: [
                { text: "Багрикадировать двери!", nextScene: 424 },
                { text: "Прятаться в подвале!", nextScene: 425 },
                { text: "Готовить оружие!", nextScene: 426 }
            ],
            atmosphere: "urgent",
            image: "blonde_panic",
            episode: 5
        },
        
        // Сцена 424: Багрикады
        424: {
            character: "Шанель Оберлин",
            text: "Быстро! Тащим мебель к дверям! Диван, шкаф, стол - всё к входной двери!",
            nextScene: 427,
            atmosphere: "action",
            image: "barricading",
            episode: 5
        },
        
        // Сцена 425: Подвал
        425: {
            character: "Ксюша Шалимова",
            text: "В подвале? Но там же сыро и темно!",
            nextScene: 424,
            atmosphere: "action",
            image: "basement",
            episode: 5
        },
        
        // Сцена 426: Оружие
        426: {
            character: "Алиса Саакян",
            text: "Хватаем всё, что может быть оружием! Сковородки, ножи, бейсбольные биты!",
            nextScene: 427,
            atmosphere: "action",
            image: "weapons",
            episode: 5
        },
        
        // Сцена 427: Подготовка
        427: {
            character: "Шанель Оберлин",
            text: "Мы мечемся по дому, готовясь к нападению. Сердце колотится как бешеное.",
            nextScene: 428,
            atmosphere: "action",
            image: "preparing",
            episode: 5
        },
        
        // Сцена 428: Ксюша дрожит
        428: {
            character: "Ксюша Шалимова",
            text: "Шанель, я боюсь... Их так много!",
            nextScene: 429,
            atmosphere: "tense",
            image: "ksusha_scared",
            episode: 5
        },
        
        // Сцена 429: Выбор - подбодрить Ксюшу
        429: {
            character: "Шанель Оберлин",
            text: "Смотрю на испуганную Ксюшу. Надо её поддержать.",
            choices: [
                { text: "Мы справимся, слышишь?", nextScene: 430 },
                { text: "Не ной, соберись!", nextScene: 431 },
                { text: "Обнять её крепко", nextScene: 432 }
            ],
            atmosphere: "emotional",
            image: "blonde_comforting",
            episode: 5
        },
        
        // Сцена 430: Справимся
        430: {
            character: "Шанель Оберлин",
            text: "Мы справимся, слышишь? Мы же Капа Капа Таун! Нас ничто не сломает!",
            nextScene: 433,
            atmosphere: "determined",
            image: "blonde_determined2",
            episode: 5
        },
        
        // Сцена 431: Не ной
        431: {
            character: "Шанель Оберлин",
            text: "Не ной, соберись! Слезами делу не поможешь! Возьми себя в руки!",
            nextScene: 433,
            atmosphere: "angry",
            image: "blonde_commanding",
            episode: 5
        },
        
        // Сцена 432: Обнять
        432: {
            character: "Шанель Оберлин",
            text: "Крепко обнимаю Ксюшу. Вместе мы сила. Я чувствую, как её дрожь проходит.",
            nextScene: 433,
            atmosphere: "touching",
            image: "girls_hug3",
            episode: 5
        },
        
        // Сцена 433: Алиса находит оружие
        433: {
            character: "Алиса Саакян",
            text: "Смотрите, что я нашла! Старая бейсбольная бита Ксюши и моя клюшка для гольфа!",
            nextScene: 434,
            atmosphere: "hopeful",
            image: "alisa_weapons",
            episode: 5
        },
        
        // Сцена 434: Шанель вооружается
        434: {
            character: "Шанель Оберлин",
            text: "Хватаю клюшку для гольфа. В руках она кажется увесистой. Пригодится!",
            nextScene: 435,
            atmosphere: "determined",
            image: "blonde_weapon",
            episode: 5
        },
        
        // Сцена 435: Час пролетел
        435: {
            character: "Шанель Оберлин",
            text: "Час пролетел незаметно. Мы слышим, как снаружи начинается движение. Они идут.",
            nextScene: 436,
            atmosphere: "suspense",
            image: "waiting",
            episode: 5
        },
        
        // Сцена 436: Первый удар в дверь
        436: {
            character: "Шанель Оберлин",
            text: "БУМ! БУМ! БУМ! Они ломятся в дверь!",
            nextScene: 437,
            atmosphere: "attack",
            image: "door_banging",
            episode: 5
        },
        
        // Сцена 437: Дверь трещит
        437: {
            character: "Ксюша Шалимова",
            text: "Дверь не выдержит! Что делать?",
            nextScene: 438,
            atmosphere: "panic",
            image: "ksusha_panic4",
            episode: 5
        },
        
        // Сцена 438: Выбор - оборона
        438: {
            character: "Шанель Оберлин",
            text: "Надо выбрать позицию!",
            choices: [
                { text: "Встать у двери", nextScene: 439 },
                { text: "Спрятаться за мебелью", nextScene: 440 },
                { text: "Встретить их в коридоре", nextScene: 441 }
            ],
            atmosphere: "urgent",
            image: "blonde_choosing",
            episode: 5
        },
        
        // Сцена 439: У двери
        439: {
            character: "Шанель Оберлин",
            text: "Встаю прямо напротив двери. Ксюша и Алиса по бокам. Первыми встретим!",
            nextScene: 442,
            atmosphere: "battle_ready",
            image: "girls_ready",
            episode: 5
        },
        
        // Сцена 440: За мебелью
        440: {
            character: "Шанель Оберлин",
            text: "Прячемся за опрокинутым диваном. Неожиданность - наше преимущество!",
            nextScene: 442,
            atmosphere: "sneaky",
            image: "girls_hiding",
            episode: 5
        },
        
        // Сцена 441: В коридоре
        441: {
            character: "Шанель Оберлин",
            text: "Встаем в коридоре, готовые встретить их с двух сторон!",
            nextScene: 442,
            atmosphere: "battle_ready",
            image: "girls_corridor",
            episode: 5
        },
        
        // Сцена 442: Дверь выбита!
        442: {
            character: "Шанель Оберлин",
            text: "Дверь слетает с петель! В дом врываются люди в красных масках!",
            nextScene: 443,
            atmosphere: "battle",
            image: "door_broken",
            episode: 5
        },
        
        // Сцена 443: Первый враг
        443: {
            character: "Шанель Оберлин",
            text: "Первый же вбегает прямо на меня! Я узнаю эту походку - это одна из моих бывших приспешниц!",
            nextScene: 444,
            atmosphere: "battle",
            image: "enemy_charge",
            episode: 5
        },
        
        // Сцена 444: Выбор - атака
        444: {
            character: "Шанель Оберлин",
            text: "Она бежит на меня с ножом!",
            choices: [
                { text: "Ударить клюшкой", nextScene: 445 },
                { text: "Увернуться и толкнуть", nextScene: 446 },
                { text: "Крикнуть и напугать", nextScene: 447 }
            ],
            atmosphere: "battle",
            image: "blonde_fight",
            episode: 5
        },
        
        // Сцена 445: Удар клюшкой
        445: {
            character: "Шанель Оберлин",
            text: "Размахиваюсь клюшкой и со всей силы бью её по руке! Нож вылетает, она визжит от боли!",
            nextScene: 448,
            atmosphere: "battle",
            image: "blonde_hitting",
            episode: 5
        },
        
        // Сцена 446: Увернуться
        446: {
            character: "Шанель Оберлин",
            text: "Уворачиваюсь в последний момент и толкаю её со всей силы! Она врезается в стену и сползает на пол!",
            nextScene: 448,
            atmosphere: "battle",
            image: "blonde_dodging",
            episode: 5
        },
        
        // Сцена 447: Крикнуть
        447: {
            character: "Шанель Оберлин",
            text: "КРИЧУ ПРЯМО В УХО! Она замирает на секунду, и этого достаточно, чтобы Ксюша ударила её битой!",
            nextScene: 448,
            atmosphere: "battle",
            image: "blonde_screaming",
            episode: 5
        },
        
        // Сцена 448: Ксюша в бою
        448: {
            character: "Ксюша Шалимова",
            text: "АААА! - кричит Ксюша, размахивая битой. Она попадает по ещё одному нападающему!",
            nextScene: 449,
            atmosphere: "battle",
            image: "ksusha_fighting",
            episode: 5
        },
        
        // Сцена 449: Алиса дерется
        449: {
            character: "Алиса Саакян",
            text: "Алиса схватила сковородку и лупит ею по головам! БАМ! БАМ! Двое падают!",
            nextScene: 450,
            atmosphere: "battle",
            image: "alisa_fighting",
            episode: 5
        },
        
        // Сцена 450: Сокамерницы
        450: {
            character: "Шанель Оберлин",
            text: "Вижу среди нападающих своих бывших сокамерниц. Тех, с кем я дружила в тюрьме! Предательницы!",
            nextScene: 451,
            atmosphere: "angry",
            image: "inmate_enemies",
            episode: 5
        },
        
        // Сцена 451: Выбор - против сокамерниц
        451: {
            character: "Шанель Оберлин",
            text: "Они бегут на меня с криками: 'ОТДАЙ НАШИ ДЕНЬГИ!'",
            choices: [
                { text: "Вступить в бой", nextScene: 452 },
                { text: "Попытаться договориться", nextScene: 453 },
                { text: "Крикнуть Ксюше на помощь", nextScene: 454 }
            ],
            atmosphere: "battle",
            image: "blonde_vs_inmates",
            episode: 5
        },
        
        // Сцена 452: В бой
        452: {
            character: "Шанель Оберлин",
            text: "Бросаюсь в бой! Клюшка встречается с их оружием! Я сражаюсь как лев! Две падают, третья отступает!",
            nextScene: 455,
            atmosphere: "battle",
            image: "blonde_fighting2",
            episode: 5
        },
        
        // Сцена 453: Договориться
        453: {
            character: "Шанель Оберлин",
            text: "ДЕВОЧКИ, СТОЙТЕ! Какие деньги? Я ничего вам не должна!",
            nextScene: 455,
            atmosphere: "battle",
            image: "blonde_talking",
            episode: 5
        },
        
        // Сцена 454: Ксюша на помощь
        454: {
            character: "Шанель Оберлин",
            text: "КСЮША! ПОМОГИ! Ксюша подбегает и вдвоем мы отбиваемся от троих!",
            nextScene: 455,
            atmosphere: "battle",
            image: "girls_fighting_together",
            episode: 5
        },
        
        // Сцена 455: Кристина появляется
        455: {
            character: "Шанель Оберлин",
            text: "Вдруг вижу Кристину Полещук. Она стоит в углу и не нападает. Просто смотрит на меня холодным взглядом.",
            nextScene: 456,
            atmosphere: "suspense",
            image: "kristina_watching",
            episode: 5
        },
        
        // Сцена 456: Кристина говорит
        456: {
            character: "Кристина Полещук",
            text: "Я слышала, что вы обо мне говорили. Вы пожалеете, что назвали меня странной.",
            nextScene: 457,
            atmosphere: "menacing",
            image: "kristina_threatening",
            episode: 5
        },
        
        // Сцена 457: Выбор - ответ Кристине
        457: {
            character: "Шанель Оберлин",
            text: "Смотрю на неё, тяжело дыша после боя.",
            choices: [
                { text: "Ты подслушивала?", nextScene: 458 },
                { text: "Мы не хотели тебя обидеть", nextScene: 459 },
                { text: "Иди сюда, поговорим!", nextScene: 460 }
            ],
            atmosphere: "confrontation",
            image: "blonde_vs_kristina",
            episode: 5
        },
        
        // Сцена 458: Подслушивала
        458: {
            character: "Шанель Оберлин",
            text: "Ты подслушивала? Какая же ты жалкая! Вместо того чтобы подойти и поговорить, ты подслушиваешь!",
            nextScene: 461,
            atmosphere: "angry",
            image: "blonde_angry2",
            episode: 5
        },
        
        // Сцена 459: Не хотели
        459: {
            character: "Шанель Оберлин",
            text: "Мы не хотели тебя обидеть! Ты нас спасла, мы благодарны, но ты правда вела себя странно!",
            nextScene: 461,
            atmosphere: "trying",
            image: "blonde_explaining",
            episode: 5
        },
        
        // Сцена 460: Иди сюда
        460: {
            character: "Шанель Оберлин",
            text: "Иди сюда, если смелая! Поговорим лицом к лицу, а не прячась за спинами!",
            nextScene: 461,
            atmosphere: "challenging",
            image: "blonde_challenging",
            episode: 5
        },
        
        // Сцена 461: Кристина отступает
        461: {
            character: "Кристина Полещук",
            text: "Ещё увидимся, Шанель. И тогда ты пожалеешь, что родилась на свет.",
            nextScene: 462,
            atmosphere: "menacing",
            image: "kristina_retreat",
            episode: 5
        },
        
        // Сцена 462: Кристина уходит
        462: {
            character: "Шанель Оберлин",
            text: "Кристина разворачивается и уходит в темноту. Я не знаю, радоваться этому или бояться.",
            nextScene: 463,
            atmosphere: "uneasy",
            image: "kristina_disappears",
            episode: 5
        },
        
        // Сцена 463: Бой продолжается
        463: {
            character: "Шанель Оберлин",
            text: "Но некогда думать о Кристине! Бой продолжается!",
            nextScene: 464,
            atmosphere: "battle",
            image: "fighting_continues",
            episode: 5
        },
        
        // Сцена 464: Старые приспешницы
        464: {
            character: "Шанель Оберлин",
            text: "Вижу трёх своих бывших приспешниц. Они окружили Алису!",
            nextScene: 465,
            atmosphere: "urgent",
            image: "helpers_attack_alisa",
            episode: 5
        },
        
        // Сцена 465: Выбор - спасать Алису
        465: {
            character: "Шанель Оберлин",
            text: "Алиса в опасности!",
            choices: [
                { text: "Бежать спасать Алису", nextScene: 466 },
                { text: "Крикнуть Ксюше помочь", nextScene: 467 },
                { text: "Кинуть что-то в них", nextScene: 468 }
            ],
            atmosphere: "urgent",
            image: "blonde_see_alisa",
            episode: 5
        },
        
        // Сцена 466: Бежать
        466: {
            character: "Шанель Оберлин",
            text: "Бегу к Алисе, расталкивая врагов! Клюшкой отбиваю одну, другую! Добираюсь до Алисы!",
            nextScene: 469,
            atmosphere: "battle",
            image: "blonde_running_save",
            episode: 5
        },
        
        // Сцена 467: Крикнуть Ксюше
        467: {
            character: "Шанель Оберлин",
            text: "КСЮША! АЛИСЕ НУЖНА ПОМОЩЬ! Ксюша подбегает, и вместе мы отбиваем нападение!",
            nextScene: 469,
            atmosphere: "battle",
            image: "girls_save_alisa",
            episode: 5
        },
        
        // Сцена 468: Кинуть
        468: {
            character: "Шанель Оберлин",
            text: "Хватаю вазу и кидаю в ближайшую! Она попадает прямо в голову, та падает! Остальные отступают!",
            nextScene: 469,
            atmosphere: "battle",
            image: "blonde_throwing2",
            episode: 5
        },
        
        // Сцена 469: Алиса спасена
        469: {
            character: "Алиса Саакян",
            text: "Шанель! Спасибо! Я уже думала, мне конец!",
            nextScene: 470,
            atmosphere: "relief",
            image: "alisa_grateful2",
            episode: 5
        },
        
        // Сцена 470: Вместе мы сила
        470: {
            character: "Шанель Оберлин",
            text: "Держись вместе, не отходи от нас! Вместе мы сила!",
            nextScene: 471,
            atmosphere: "determined",
            image: "girls_together",
            episode: 5
        },
        
        // Сцена 471: Вижу Андрея
        471: {
            character: "Шанель Оберлин",
            text: "Вдруг замечаю Андрея Барыгу. Он не нападает, просто стоит в углу и наблюдает, трусливо прячась за спинами других.",
            nextScene: 472,
            atmosphere: "contempt",
            image: "andrey_hiding",
            episode: 5
        },
        
        // Сцена 472: Выбор - что с Андреем
        472: {
            character: "Шанель Оберлин",
            text: "Смотрю на этого труса.",
            choices: [
                { text: "Игнорировать его", nextScene: 473 },
                { text: "Пойти к нему", nextScene: 474 },
                { text: "Крикнуть ему что-то", nextScene: 475 }
            ],
            atmosphere: "contempt",
            image: "blonde_see_andrey",
            episode: 5
        },
        
        // Сцена 473: Игнорировать
        473: {
            character: "Шанель Оберлин",
            text: "Плевать на него. Пусть стоит, трус. Настоящий мужчина был бы впереди, а не прятался!",
            nextScene: 476,
            atmosphere: "contempt",
            image: "blonde_ignore",
            episode: 5
        },
        
        // Сцена 474: Пойти к нему
        474: {
            character: "Шанель Оберлин",
            text: "Подхожу к нему с клюшкой. Он пятится назад. 'Не подходи!' - кричит он. 'Ты же мужчина или кто?' - смеюсь я.",
            nextScene: 476,
            atmosphere: "confrontation",
            image: "blonde_vs_andrey",
            episode: 5
        },
        
        // Сцена 475: Крикнуть
        475: {
            character: "Шанель Оберлин",
            text: "АНДРЕЙ, ТЫ ТРУС! НАСТОЯЩИЙ МУЖЧИНА НЕ ПРЯЧЕТСЯ ЗА ЖЕНСКИМИ СПИНАМИ!",
            nextScene: 476,
            atmosphere: "angry",
            image: "blonde_shouting",
            episode: 5
        },
        
        // Сцена 476: Нападающие слабеют
        476: {
            character: "Шанель Оберлин",
            text: "Бой продолжается, но я замечаю, что нападающие действуют вразнобой. Они не координируют свои действия, каждый сам за себя.",
            nextScene: 477,
            atmosphere: "observing",
            image: "enemies_disorganized",
            episode: 5
        },
        
        // Сцена 477: А мы сплочены
        477: {
            character: "Шанель Оберлин",
            text: "А мы держимся вместе! Прикрываем друг друга, помогаем, подсказываем. Мы - команда!",
            nextScene: 478,
            atmosphere: "proud",
            image: "girls_team",
            episode: 5
        },
        
        // Сцена 478: Перелом
        478: {
            character: "Шанель Оберлин",
            text: "Один за другим нападающие падают или отступают. Их осталось всего несколько.",
            nextScene: 479,
            atmosphere: "victory_approaching",
            image: "enemies_fleeing",
            episode: 5
        },
        
        // Сцена 479: Андрей убегает
        479: {
            character: "Шанель Оберлин",
            text: "Вижу, как Андрей Барыга, воспользовавшись суматохой, выскальзывает в дверь и убегает в темноту. Трус!",
            nextScene: 480,
            atmosphere: "contempt",
            image: "andrey_running",
            episode: 5
        },
        
        // Сцена 480: Последний враг
        480: {
            character: "Шанель Оберлин",
            text: "Остался последний. Это одна из моих сокамерниц. Она стоит, тяжело дыша, и смотрит на меня с ненавистью.",
            nextScene: 481,
            atmosphere: "confrontation",
            image: "last_enemy",
            episode: 5
        },
        
        // Сцена 481: Выбор - последний бой
        481: {
            character: "Шанель Оберлин",
            text: "Что с ней делать?",
            choices: [
                { text: "Атаковать последнюю", nextScene: 482 },
                { text: "Попытаться договориться", nextScene: 483 },
                { text: "Дать ей уйти", nextScene: 484 }
            ],
            atmosphere: "confrontation",
            image: "blonde_last_choice",
            episode: 5
        },
        
        // Сцена 482: Атаковать
        482: {
            character: "Шанель Оберлин",
            text: "Бросаюсь на неё! Клюшка опускается, она падает без сознания. Всё кончено.",
            nextScene: 485,
            atmosphere: "victory",
            image: "blonde_final_blow",
            episode: 5
        },
        
        // Сцена 483: Договориться
        483: {
            character: "Шанель Оберлин",
            text: "Зачем ты здесь? Что я тебе сделала? - спрашиваю я. Она молчит, потом бросает оружие и убегает.",
            nextScene: 485,
            atmosphere: "peaceful",
            image: "enemy_runs",
            episode: 5
        },
        
        // Сцена 484: Дать уйти
        484: {
            character: "Шанель Оберлин",
            text: "Уходи. Я не хочу больше крови. Она смотрит недоверчиво, потом разворачивается и убегает.",
            nextScene: 485,
            atmosphere: "merciful",
            image: "blonde_merciful",
            episode: 5
        },
        
        // Сцена 485: Тишина
        485: {
            character: "Шанель Оберлин",
            text: "Наступает тишина. Только наше тяжелое дыхание и стоны поверженных врагов. Судная ночь закончилась.",
            nextScene: 486,
            atmosphere: "calm_after_storm",
            image: "girls_after_battle",
            episode: 5
        },
        
        // Сцена 486: Подсчет потерь
        486: {
            character: "Ксюша Шалимова",
            text: "Мы... мы выжили?",
            nextScene: 487,
            atmosphere: "relief",
            image: "ksusha_relieved",
            episode: 5
        },
        
        // Сцена 487: Осмотр
        487: {
            character: "Алиса Саакян",
            text: "Девочки, все живы? Я в порядке, кажется...",
            nextScene: 488,
            atmosphere: "checking",
            image: "alisa_checking",
            episode: 5
        },
        
        // Сцена 488: Шанель проверяет
        488: {
            character: "Шанель Оберлин",
            text: "Осматриваю себя. Синяки, ссадины, но в целом жива. Ксюша, Алиса - вы как?",
            nextScene: 489,
            atmosphere: "concerned",
            image: "blonde_checking",
            episode: 5
        },
        
        // Сцена 489: Все живы
        489: {
            character: "Ксюша Шалимова",
            text: "Я в порядке. Немного ушиблась, но ничего серьезного.",
            nextScene: 490,
            atmosphere: "relief",
            image: "ksusha_ok",
            episode: 5
        },
        
        // Сцена 490: Алиса в порядке
        490: {
            character: "Алиса Саакян",
            text: "И я! Только рука болит, но это ерунда!",
            nextScene: 491,
            atmosphere: "relief",
            image: "alisa_ok",
            episode: 5
        },
        
        // Сцена 491: Осмотр дома
        491: {
            character: "Шанель Оберлин",
            text: "Оглядываю дом. Разбитые окна, сломанная мебель, следы битвы. Но мы живы. Это главное.",
            nextScene: 492,
            atmosphere: "sad",
            image: "destroyed_house",
            episode: 5
        },
        
        // Сцена 492: Тела нападавших
        492: {
            character: "Шанель Оберлин",
            text: "Смотрим на поверженных врагов. Они лежат без сознания или стонут. Все, кроме одного - Андрея Барыги, который сбежал.",
            nextScene: 493,
            atmosphere: "contempt",
            image: "defeated_enemies",
            episode: 5
        },
        
        // Сцена 493: Ксюша о Андрее
        493: {
            character: "Ксюша Шалимова",
            text: "Ну и трус этот Андрей! Бросил своих и убежал!",
            nextScene: 494,
            atmosphere: "contempt",
            image: "ksusha_mocking2",
            episode: 5
        },
        
        // Сцена 494: Алиса добавляет
        494: {
            character: "Алиса Саакян",
            text: "А еще хотел быть королем! Король трусов - вот он кто!",
            nextScene: 495,
            atmosphere: "laughing",
            image: "alisa_laughing2",
            episode: 5
        },
        
        // Сцена 495: Выбор - итог
        495: {
            character: "Шанель Оберлин",
            text: "Смотрю на своих девочек, на разрушенный дом, на поверженных врагов.",
            choices: [
                { text: "Мы победили благодаря сплоченности", nextScene: 496 },
                { text: "Они проиграли из-за разобщенности", nextScene: 497 },
                { text: "Капа Капа Таун непобедим!", nextScene: 498 }
            ],
            atmosphere: "reflecting",
            image: "blonde_reflecting",
            episode: 5
        },
        
        // Сцена 496: Благодаря сплоченности
        496: {
            character: "Шанель Оберлин",
            text: "Мы победили, потому что были вместе. Прикрывали друг друга, помогали, верили друг в друга. Наша сплоченность - наша сила!",
            nextScene: 499,
            atmosphere: "wise",
            image: "blonde_wise",
            episode: 5
        },
        
        // Сцена 497: Из-за разобщенности
        497: {
            character: "Шанель Оберлин",
            text: "А они проиграли, потому что каждый был сам за себя. Андрей прятался, Кристина ушла, остальные действовали кто во что горазд. Разобщенность - их слабость!",
            nextScene: 499,
            atmosphere: "wise",
            image: "blonde_analyzing",
            episode: 5
        },
        
        // Сцена 498: Капа Капа Таун
        498: {
            character: "Шанель Оберлин",
            text: "Капа Капа Таун непобедим! Потому что мы не просто группа, мы - семья! Мы - команда!",
            nextScene: 499,
            atmosphere: "proud",
            image: "blonde_proud2",
            episode: 5
        },
        
        // Сцена 499: Финал 5 серии
        499: {
            character: "Шанель Оберлин",
            text: "Судная ночь закончилась. Мы выжили. Но враги не сдались. Кристина ушла, затаив обиду. Андрей сбежал, но вернется. А мы... мы стали еще сильнее.",
            nextScene: 500,
            atmosphere: "cliffhanger",
            image: "blonde_final2",
            episode: 5
        },
        
        // Сцена 500: Выбор после 5 серии
        500: {
            character: "???",
            text: "СЕРИЯ 5 ЗАВЕРШЕНА. Что дальше? Кристина замышляет месть. Андрей ищет новых союзников. А Капа Капа Таун готовится к новым испытаниям.",
            choices: [
                { text: "Начать сначала (Серия 1)", nextScene: 1 },
                { text: "Переиграть Серию 2", nextScene: 101 },
                { text: "Переиграть Серию 3", nextScene: 201 },
                { text: "Переиграть Серию 4", nextScene: 301 },
                { text: "Переиграть Серию 5", nextScene: 401 }
            ],
            atmosphere: "cliffhanger",
            image: "to_be_continued",
            episode: 5
        }
    };

      // ============== ИЗОБРАЖЕНИЯ ==============
    const images = {
        sleepy: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23F5DEB3'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23800000'/%3E%3Ccircle cx='95' cy='85' r='8' fill='%23000'/%3E%3Ccircle cx='155' cy='85' r='8' fill='%23000'/%3E%3Ctext x='70' y='180' fill='white' font-size='20'%3EZzz%3C/text%3E%3C/svg%3E",
        vain: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23F5DEB3'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23800000'/%3E%3Ccircle cx='95' cy='85' r='8' fill='%23000'/%3E%3Ccircle cx='155' cy='85' r='8' fill='%23000'/%3E%3Ctext x='170' y='70' fill='gold' font-size='20'%3E★%3C/text%3E%3C/svg%3E",
        waiting: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23F5DEB3'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23800000'/%3E%3Ccircle cx='95' cy='85' r='8' fill='%23000'/%3E%3Ccircle cx='155' cy='85' r='8' fill='%23000'/%3E%3C/svg%3E",
        angry: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23F5DEB3'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23800000'/%3E%3Ccircle cx='95' cy='85' r='8' fill='%23000'/%3E%3Ccircle cx='155' cy='85' r='8' fill='%23000'/%3E%3Ctext x='70' y='50' fill='red' font-size='30'%3E!!!%3C/text%3E%3C/svg%3E",
        cold: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23F5DEB3'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23800000'/%3E%3Ccircle cx='95' cy='85' r='6' fill='%23000'/%3E%3Ccircle cx='155' cy='85' r='6' fill='%23000'/%3E%3C/svg%3E",
        cruel: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23F5DEB3'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23800000'/%3E%3Ccircle cx='95' cy='85' r='6' fill='%23FF0000'/%3E%3Ccircle cx='155' cy='85' r='6' fill='%23FF0000'/%3E%3C/svg%3E",
        screaming: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23F5DEB3'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23800000'/%3E%3Ccircle cx='95' cy='85' r='8' fill='%23000'/%3E%3Ccircle cx='155' cy='85' r='8' fill='%23000'/%3E%3Ctext x='80' y='50' fill='red' font-size='30'%3EAHH!%3C/text%3E%3C/svg%3E",
        slapping: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23F5DEB3'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23800000'/%3E%3Ccircle cx='95' cy='85' r='8' fill='%23000'/%3E%3Ccircle cx='155' cy='85' r='8' fill='%23000'/%3E%3Ctext x='160' y='70' fill='red' font-size='20'%3E slap!%3C/text%3E%3C/svg%3E",
        laughing: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23F5DEB3'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23800000'/%3E%3Ccircle cx='95' cy='85' r='8' fill='%23000'/%3E%3Ccircle cx='155' cy='85' r='8' fill='%23000'/%3E%3Ctext x='50' y='70' fill='gold' font-size='30'%3EHAHA%3C/text%3E%3C/svg%3E",
        hysterical: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23F5DEB3'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23800000'/%3E%3Ccircle cx='95' cy='85' r='10' fill='%23FF0000'/%3E%3Ccircle cx='155' cy='85' r='10' fill='%23FF0000'/%3E%3C/svg%3E",
        commanding: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23F5DEB3'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23800000'/%3E%3Ccircle cx='95' cy='85' r='8' fill='%23000'/%3E%3Ccircle cx='155' cy='85' r='8' fill='%23000'/%3E%3Ctext x='180' y='80' fill='gold' font-size='20'%3E↓%3C/text%3E%3C/svg%3E",
        smirking: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23F5DEB3'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23800000'/%3E%3Ccircle cx='95' cy='85' r='8' fill='%23000'/%3E%3Ccircle cx='155' cy='85' r='8' fill='%23000'/%3E%3C/svg%3E",
        predator: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23F5DEB3'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23800000'/%3E%3Ccircle cx='95' cy='85' r='8' fill='%23FF0000'/%3E%3Ccircle cx='155' cy='85' r='8' fill='%23FF0000'/%3E%3C/svg%3E",
        listening: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23F5DEB3'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23800000'/%3E%3Ccircle cx='95' cy='85' r='8' fill='%23000'/%3E%3Ccircle cx='155' cy='85' r='8' fill='%23000'/%3E%3C/svg%3E",
        unimpressed: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23F5DEB3'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23800000'/%3E%3Ccircle cx='95' cy='85' r='6' fill='%23000'/%3E%3Ccircle cx='155' cy='85' r='6' fill='%23000'/%3E%3C/svg%3E",
        mocking: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23F5DEB3'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23800000'/%3E%3Ccircle cx='95' cy='85' r='8' fill='%23000'/%3E%3Ccircle cx='155' cy='85' r='8' fill='%23000'/%3E%3C/svg%3E",
        threatening: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23F5DEB3'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23800000'/%3E%3Ccircle cx='95' cy='85' r='8' fill='%23FF0000'/%3E%3Ccircle cx='155' cy='85' r='8' fill='%23FF0000'/%3E%3C/svg%3E",
        ready: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23F5DEB3'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23800000'/%3E%3Ccircle cx='95' cy='85' r='8' fill='%23000'/%3E%3Ccircle cx='155' cy='85' r='8' fill='%23000'/%3E%3C/svg%3E",
        dodging: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23F5DEB3'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23800000'/%3E%3Ccircle cx='95' cy='85' r='8' fill='%23000'/%3E%3Ccircle cx='155' cy='85' r='8' fill='%23000'/%3E%3C/svg%3E",
        attacking: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23F5DEB3'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23800000'/%3E%3Ccircle cx='95' cy='85' r='8' fill='%23FF0000'/%3E%3Ccircle cx='155' cy='85' r='8' fill='%23FF0000'/%3E%3Ctext x='170' y='50' fill='red' font-size='20'%3E BAM!%3C/text%3E%3C/svg%3E",
        kicking: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23F5DEB3'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23800000'/%3E%3Ccircle cx='95' cy='85' r='8' fill='%23000'/%3E%3Ccircle cx='155' cy='85' r='8' fill='%23000'/%3E%3Ctext x='180' y='90' fill='red' font-size='20'%3E POW!%3C/text%3E%3C/svg%3E",
        finishing: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23F5DEB3'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23800000'/%3E%3Ccircle cx='95' cy='85' r='8' fill='%23000'/%3E%3Ccircle cx='155' cy='85' r='8' fill='%23000'/%3E%3Ctext x='190' y='60' fill='gold' font-size='20'%3E DIE!%3C/text%3E%3C/svg%3E",
        triumph: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23F5DEB3'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23800000'/%3E%3Ccircle cx='95' cy='85' r='8' fill='%23000'/%3E%3Ccircle cx='155' cy='85' r='8' fill='%23000'/%3E%3C/svg%3E",
        helpers_scared: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23F5DEB3'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23800000'/%3E%3Ccircle cx='40' cy='150' r='25' fill='%23FFC0CB'/%3E%3Ccircle cx='210' cy='150' r='25' fill='%23FFC0CB'/%3E%3Ccircle cx='80' cy='200' r='25' fill='%23FFC0CB'/%3E%3Ctext x='30' y='120' fill='blue' font-size='30'%3E!!!%3C/text%3E%3C/svg%3E",
        helpers_worried: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23F5DEB3'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23800000'/%3E%3Ccircle cx='40' cy='150' r='25' fill='%23FFC0CB'/%3E%3Ccircle cx='210' cy='150' r='25' fill='%23FFC0CB'/%3E%3Ccircle cx='80' cy='200' r='25' fill='%23FFC0CB'/%3E%3C/svg%3E",
        helpers_crying: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23F5DEB3'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23800000'/%3E%3Ccircle cx='40' cy='150' r='25' fill='%23FFC0CB'/%3E%3Ccircle cx='210' cy='150' r='25' fill='%23FFC0CB'/%3E%3Ccircle cx='80' cy='200' r='25' fill='%23FFC0CB'/%3E%3Ctext x='30' y='100' fill='blue' font-size='20'%3E:'%28%3C/text%3E%3C/svg%3E",
        helpers_amazed: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23F5DEB3'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23800000'/%3E%3Ccircle cx='40' cy='150' r='25' fill='%23FFC0CB'/%3E%3Ccircle cx='210' cy='150' r='25' fill='%23FFC0CB'/%3E%3Ccircle cx='80' cy='200' r='25' fill='%23FFC0CB'/%3E%3Ccircle cx='30' cy='120' r='10' fill='yellow'/%3E%3C/svg%3E",
        helpers_gossip: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23F5DEB3'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23800000'/%3E%3Ccircle cx='40' cy='150' r='25' fill='%23FFC0CB'/%3E%3Ccircle cx='210' cy='150' r='25' fill='%23FFC0CB'/%3E%3Ccircle cx='80' cy='200' r='25' fill='%23FFC0CB'/%3E%3Ctext x='30' y='100' fill='purple' font-size='20'%3E...%3C/text%3E%3C/svg%3E",
        helpers_panic: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23F5DEB3'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23800000'/%3E%3Ccircle cx='40' cy='150' r='25' fill='%23FFC0CB'/%3E%3Ccircle cx='210' cy='150' r='25' fill='%23FFC0CB'/%3E%3Ccircle cx='80' cy='200' r='25' fill='%23FFC0CB'/%3E%3Ctext x='30' y='100' fill='orange' font-size='30'%3E😱%3C/text%3E%3C/svg%3E",
        devil_falls: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23F5DEB3'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23800000'/%3E%3Cpath d='M150 30 L200 30 L175 70 Z' fill='red'/%3E%3Ctext x='140' y='60' fill='white' font-size='20'%3E?%3C/text%3E%3C/svg%3E",
        devil_threat: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23F5DEB3'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23800000'/%3E%3Crect x='160' y='50' width='40' height='60' fill='red'/%3E%3Ccircle cx='180' cy='40' r='10' fill='black'/%3E%3C/svg%3E",
        devil_attack: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23F5DEB3'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23800000'/%3E%3Crect x='170' y='40' width='30' height='50' fill='red'/%3E%3Cline x1='200' y1='40' x2='220' y2='20' stroke='red' stroke-width='5'/%3E%3C/svg%3E",
        devil_defeated: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23F5DEB3'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23800000'/%3E%3Crect x='160' y='80' width='40' height='30' fill='red'/%3E%3Ctext x='150' y='120' fill='red' font-size='20'%3EX%3C/text%3E%3C/svg%3E",
        happy: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23F5DEB3'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23800000'/%3E%3Ccircle cx='95' cy='85' r='8' fill='%23000'/%3E%3Ccircle cx='155' cy='85' r='8' fill='%23000'/%3E%3C/svg%3E",
        confident: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23F5DEB3'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23800000'/%3E%3Ccircle cx='95' cy='85' r='8' fill='%23000'/%3E%3Ccircle cx='155' cy='85' r='8' fill='%23000'/%3E%3C/svg%3E",
        entering: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23F5DEB3'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23800000'/%3E%3Ccircle cx='95' cy='85' r='8' fill='%23000'/%3E%3Ccircle cx='155' cy='85' r='8' fill='%23000'/%3E%3Ctext x='200' y='80' fill='gold' font-size='30'%3E✨%3C/text%3E%3C/svg%3E",
        shocked: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23F5DEB3'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23800000'/%3E%3Ccircle cx='95' cy='85' r='8' fill='%23000'/%3E%3Ccircle cx='155' cy='85' r='8' fill='%23000'/%3E%3Ctext x='50' y='50' fill='red' font-size='40'%3E?!%3C/text%3E%3C/svg%3E",
        calculating: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23F5DEB3'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23800000'/%3E%3Ccircle cx='95' cy='85' r='8' fill='%23000'/%3E%3Ccircle cx='155' cy='85' r='8' fill='%23000'/%3E%3C/svg%3E",
        approaching: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23F5DEB3'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23800000'/%3E%3Ccircle cx='95' cy='85' r='8' fill='%23000'/%3E%3Ccircle cx='155' cy='85' r='8' fill='%23000'/%3E%3C/svg%3E",
        flirting: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23F5DEB3'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23800000'/%3E%3Ccircle cx='95' cy='85' r='8' fill='%23000'/%3E%3Ccircle cx='155' cy='85' r='8' fill='%23000'/%3E%3Ctext x='180' y='70' fill='pink' font-size='30'%3E♥%3C/text%3E%3C/svg%3E",
        talking: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23F5DEB3'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23800000'/%3E%3Ccircle cx='95' cy='85' r='8' fill='%23000'/%3E%3Ccircle cx='155' cy='85' r='8' fill='%23000'/%3E%3Ctext x='40' y='120' fill='white' font-size='20'%3E...%3C/text%3E%3C/svg%3E",
        proud: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23F5DEB3'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23800000'/%3E%3Ccircle cx='95' cy='85' r='8' fill='%23000'/%3E%3Ccircle cx='155' cy='85' r='8' fill='%23000'/%3E%3Ctext x='170' y='70' fill='gold' font-size='30'%3E👑%3C/text%3E%3C/svg%3E",
        close: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23F5DEB3'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23800000'/%3E%3Ccircle cx='95' cy='85' r='8' fill='%23000'/%3E%3Ccircle cx='155' cy='85' r='8' fill='%23000'/%3E%3Ctext x='90' y='70' fill='red' font-size='20'%3E❤️%3C/text%3E%3C/svg%3E",
        kiss: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23F5DEB3'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23800000'/%3E%3Ccircle cx='95' cy='85' r='8' fill='%23000'/%3E%3Ccircle cx='155' cy='85' r='8' fill='%23000'/%3E%3Ctext x='80' y='70' fill='red' font-size='40'%3E💋%3C/text%3E%3C/svg%3E",
        police: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23F5DEB3'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23800000'/%3E%3Ccircle cx='95' cy='85' r='8' fill='%23000'/%3E%3Ccircle cx='155' cy='85' r='8' fill='%23000'/%3E%3Ctext x='180' y='70' fill='blue' font-size='30'%3E🚓%3C/text%3E%3C/svg%3E",
        panic: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23F5DEB3'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23800000'/%3E%3Ccircle cx='95' cy='85' r='8' fill='%23000'/%3E%3Ccircle cx='155' cy='85' r='8' fill='%23000'/%3E%3Ctext x='50' y='50' fill='orange' font-size='40'%3E!!!%3C/text%3E%3C/svg%3E",
        realization: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23F5DEB3'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23800000'/%3E%3Ccircle cx='95' cy='85' r='8' fill='%23000'/%3E%3Ccircle cx='155' cy='85' r='8' fill='%23000'/%3E%3Ctext x='60' y='70' fill='gray' font-size='30'%3E😨%3C/text%3E%3C/svg%3E",
        arrest: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23F5DEB3'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23800000'/%3E%3Ccircle cx='95' cy='85' r='8' fill='%23000'/%3E%3Ccircle cx='155' cy='85' r='8' fill='%23000'/%3E%3Cline x1='80' y1='40' x2='170' y2='40' stroke='silver' stroke-width='5'/%3E%3C/svg%3E",
        protest: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23F5DEB3'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23800000'/%3E%3Ccircle cx='95' cy='85' r='8' fill='%23000'/%3E%3Ccircle cx='155' cy='85' r='8' fill='%23000'/%3E%3Ctext x='40' y='50' fill='red' font-size='30'%3ENO!%3C/text%3E%3C/svg%3E",
        handcuffs: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23F5DEB3'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23800000'/%3E%3Ccircle cx='95' cy='85' r='8' fill='%23000'/%3E%3Ccircle cx='155' cy='85' r='8' fill='%23000'/%3E%3Ccircle cx='125' cy='30' r='10' fill='silver'/%3E%3C/svg%3E",
        dramatic: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23F5DEB3'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23800000'/%3E%3Ccircle cx='95' cy='85' r='8' fill='%23000'/%3E%3Ccircle cx='155' cy='85' r='8' fill='%23000'/%3E%3Ctext x='60' y='60' fill='white' font-size='20'%3E🎭%3C/text%3E%3C/svg%3E",
        cliffhanger: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23F5DEB3'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23800000'/%3E%3Ccircle cx='95' cy='85' r='8' fill='%23000'/%3E%3Ccircle cx='155' cy='85' r='8' fill='%23000'/%3E%3Ctext x='80' y='70' fill='purple' font-size='30'%3E?%3C/text%3E%3C/svg%3E",
        leaving: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23F5DEB3'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23800000'/%3E%3Ccircle cx='95' cy='85' r='8' fill='%23000'/%3E%3Ccircle cx='155' cy='85' r='8' fill='%23000'/%3E%3Ctext x='40' y='120' fill='white' font-size='30'%3E🚶%3C/text%3E%3C/svg%3E",
        andrey_amused: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23000080'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23000050'/%3E%3Ccircle cx='95' cy='85' r='8' fill='%23000'/%3E%3Ccircle cx='155' cy='85' r='8' fill='%23000'/%3E%3Ctext x='50' y='120' fill='black' font-size='20'%3E😏%3C/text%3E%3C/svg%3E",
        andrey_offer: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23000080'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23000050'/%3E%3Ccircle cx='95' cy='85' r='8' fill='%23000'/%3E%3Ccircle cx='155' cy='85' r='8' fill='%23000'/%3E%3Ctext x='50' y='70' fill='gold' font-size='30'%3E🍾%3C/text%3E%3C/svg%3E",
        andrey_confident: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23000080'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23000050'/%3E%3Ccircle cx='95' cy='85' r='8' fill='%23000'/%3E%3Ccircle cx='155' cy='85' r='8' fill='%23000'/%3E%3Ctext x='50' y='120' fill='black' font-size='30'%3E😎%3C/text%3E%3C/svg%3E",
        andrey_shocked: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23000080'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23000050'/%3E%3Ccircle cx='95' cy='85' r='10' fill='white'/%3E%3Ccircle cx='155' cy='85' r='10' fill='white'/%3E%3Ctext x='60' y='60' fill='black' font-size='30'%3E😲%3C/text%3E%3C/svg%3E",
        andrey_shock: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23000080'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23000050'/%3E%3Ccircle cx='95' cy='85' r='8' fill='%23000'/%3E%3Ccircle cx='155' cy='85' r='8' fill='%23000'/%3E%3Ctext x='60' y='60' fill='black' font-size='30'%3E😨%3C/text%3E%3C/svg%3E",
        ksusha_mocking: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23FF69B4'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23FF1493'/%3E%3Ccircle cx='95' cy='85' r='8' fill='%23000'/%3E%3Ccircle cx='155' cy='85' r='8' fill='%23000'/%3E%3Ctext x='50' y='60' fill='pink' font-size='30'%3E😏%3C/text%3E%3C/svg%3E",
        ksusha_angry: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23FF69B4'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23FF1493'/%3E%3Ccircle cx='95' cy='85' r='8' fill='%23000'/%3E%3Ccircle cx='155' cy='85' r='8' fill='%23000'/%3E%3Ctext x='50' y='60' fill='red' font-size='30'%3E😠%3C/text%3E%3C/svg%3E",
        ksusha_leaving: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23FF69B4'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23FF1493'/%3E%3Ccircle cx='95' cy='85' r='8' fill='%23000'/%3E%3Ccircle cx='155' cy='85' r='8' fill='%23000'/%3E%3Ctext x='50' y='60' fill='gray' font-size='30'%3E🚶%3C/text%3E%3C/svg%3E",
        ksusha_gloating: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23FF69B4'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23FF1493'/%3E%3Ccircle cx='95' cy='85' r='8' fill='%23000'/%3E%3Ccircle cx='155' cy='85' r='8' fill='%23000'/%3E%3Ctext x='50' y='60' fill='green' font-size='30'%3E😈%3C/text%3E%3C/svg%3E",
        dancing: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23F5DEB3'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23800000'/%3E%3Ccircle cx='95' cy='85' r='8' fill='%23000'/%3E%3Ccircle cx='155' cy='85' r='8' fill='%23000'/%3E%3Ctext x='60' y='60' fill='purple' font-size='30'%3E💃%3C/text%3E%3C/svg%3E",
        wardrobe: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Crect width='250' height='250' fill='%238B4513'/%3E%3Ccircle cx='125' cy='100' r='55' fill='%23F5DEB3'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23800000'/%3E%3Crect x='30' y='30' width='60' height='150' fill='%23A0522D'/%3E%3C/svg%3E",
        alert: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23F5DEB3'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23800000'/%3E%3Ccircle cx='95' cy='85' r='8' fill='%23000'/%3E%3Ccircle cx='155' cy='85' r='8' fill='%23000'/%3E%3C/svg%3E",
        champagne: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23F5DEB3'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23800000'/%3E%3Ccircle cx='95' cy='85' r='8' fill='%23000'/%3E%3Ccircle cx='155' cy='85' r='8' fill='%23000'/%3E%3Cpath d='M180 80 L200 60 L220 80 L200 100 Z' fill='%23F0E68C'/%3E%3C/svg%3E",
        wardrobe2: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Crect width='250' height='250' fill='%238B4513'/%3E%3Ccircle cx='125' cy='100' r='55' fill='%23F5DEB3'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23800000'/%3E%3Crect x='30' y='30' width='60' height='150' fill='%23A0522D'/%3E%3C/svg%3E",
        blonde_shocked: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23F5DEB3'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23FF1493'/%3E%3Ccircle cx='95' cy='85' r='8' fill='%23000'/%3E%3Ccircle cx='155' cy='85' r='8' fill='%23000'/%3E%3Ctext x='70' y='50' fill='red' font-size='40'%3E?!%3C/text%3E%3C/svg%3E",
        inmate1: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%238B4513'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23666'/%3E%3Ccircle cx='95' cy='85' r='8' fill='%23000'/%3E%3Ccircle cx='155' cy='85' r='8' fill='%23000'/%3E%3Ctext x='40' y='50' fill='red' font-size='30'%3E🔒%3C/text%3E%3C/svg%3E",
        inmate2: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23A0522D'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23666'/%3E%3Ccircle cx='95' cy='85' r='8' fill='%23000'/%3E%3Ccircle cx='155' cy='85' r='8' fill='%23000'/%3E%3Ctext x='40' y='50' fill='red' font-size='30'%3E🔒%3C/text%3E%3C/svg%3E",
        inmate3: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%238B4513'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23666'/%3E%3Ccircle cx='95' cy='85' r='8' fill='%23000'/%3E%3Ccircle cx='155' cy='85' r='8' fill='%23000'/%3E%3Ctext x='40' y='50' fill='red' font-size='30'%3E🔒%3C/text%3E%3C/svg%3E",
        inmates_confused: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23F5DEB3'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23800000'/%3E%3Ccircle cx='40' cy='150' r='25' fill='%238B4513'/%3E%3Ccircle cx='210' cy='150' r='25' fill='%23A0522D'/%3E%3Ccircle cx='80' cy='200' r='25' fill='%238B4513'/%3E%3Ctext x='100' y='70' fill='white' font-size='30'%3E?%3C/text%3E%3C/svg%3E",
        inmates_laughing: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23F5DEB3'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23800000'/%3E%3Ccircle cx='40' cy='150' r='25' fill='%238B4513'/%3E%3Ccircle cx='210' cy='150' r='25' fill='%23A0522D'/%3E%3Ccircle cx='80' cy='200' r='25' fill='%238B4513'/%3E%3Ctext x='30' y='70' fill='yellow' font-size='30'%3EHAHA%3C/text%3E%3C/svg%3E",
        inmates_cheer: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23F5DEB3'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23800000'/%3E%3Ccircle cx='40' cy='150' r='25' fill='%238B4513'/%3E%3Ccircle cx='210' cy='150' r='25' fill='%23A0522D'/%3E%3Ccircle cx='80' cy='200' r='25' fill='%238B4513'/%3E%3Ctext x='30' y='70' fill='gold' font-size='30'%3E🎉%3C/text%3E%3C/svg%3E",
        inmate_happy: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%238B4513'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23666'/%3E%3Ccircle cx='95' cy='85' r='8' fill='%23000'/%3E%3Ccircle cx='155' cy='85' r='8' fill='%23000'/%3E%3Ctext x='50' y='50' fill='yellow' font-size='30'%3E😊%3C/text%3E%3C/svg%3E",
        inmate2_amazed: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23A0522D'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23666'/%3E%3Ccircle cx='95' cy='85' r='8' fill='%23000'/%3E%3Ccircle cx='155' cy='85' r='8' fill='%23000'/%3E%3Ctext x='50' y='50' fill='gold' font-size='30'%3E😮%3C/text%3E%3C/svg%3E",
        inmate3_excited: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%238B4513'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23666'/%3E%3Ccircle cx='95' cy='85' r='8' fill='%23000'/%3E%3Ccircle cx='155' cy='85' r='8' fill='%23000'/%3E%3Ctext x='50' y='50' fill='pink' font-size='30'%3E😍%3C/text%3E%3C/svg%3E",
        inmates_shocked: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23F5DEB3'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23800000'/%3E%3Ccircle cx='40' cy='150' r='25' fill='%238B4513'/%3E%3Ccircle cx='210' cy='150' r='25' fill='%23A0522D'/%3E%3Ccircle cx='80' cy='200' r='25' fill='%238B4513'/%3E%3Ctext x='30' y='70' fill='red' font-size='30'%3E😱%3C/text%3E%3C/svg%3E",
        inmate_angry: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%238B4513'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23666'/%3E%3Ccircle cx='95' cy='85' r='8' fill='%23000'/%3E%3Ccircle cx='155' cy='85' r='8' fill='%23000'/%3E%3Ctext x='50' y='50' fill='red' font-size='30'%3E😠%3C/text%3E%3C/svg%3E",
        guard: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23808080'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23000080'/%3E%3Ccircle cx='95' cy='85' r='8' fill='%23000'/%3E%3Ccircle cx='155' cy='85' r='8' fill='%23000'/%3E%3Ctext x='50' y='50' fill='blue' font-size='30'%3E👮%3C/text%3E%3C/svg%3E",
        blonde_transformed: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23F5DEB3'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23FF1493'/%3E%3Ccircle cx='95' cy='85' r='8' fill='%23000'/%3E%3Ccircle cx='155' cy='85' r='8' fill='%23000'/%3E%3Ctext x='50' y='50' fill='purple' font-size='30'%3E👑%3C/text%3E%3C/svg%3E",
        blonde_cruel: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23F5DEB3'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23FF1493'/%3E%3Ccircle cx='95' cy='85' r='8' fill='%23FF0000'/%3E%3Ccircle cx='155' cy='85' r='8' fill='%23FF0000'/%3E%3Ctext x='50' y='50' fill='red' font-size='30'%3E😈%3C/text%3E%3C/svg%3E",
        blonde_laughing: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23F5DEB3'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23FF1493'/%3E%3Ccircle cx='95' cy='85' r='8' fill='%23000'/%3E%3Ccircle cx='155' cy='85' r='8' fill='%23000'/%3E%3Ctext x='50' y='50' fill='gold' font-size='30'%3EHAHA%3C/text%3E%3C/svg%3E",
        blonde_walking: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23F5DEB3'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23FF1493'/%3E%3Ccircle cx='95' cy='85' r='8' fill='%23000'/%3E%3Ccircle cx='155' cy='85' r='8' fill='%23000'/%3E%3Ctext x='40' y='120' fill='white' font-size='30'%3E🚶%3C/text%3E%3C/svg%3E",
        blonde_outside: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23F5DEB3'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23FF1493'/%3E%3Ccircle cx='95' cy='85' r='8' fill='%23000'/%3E%3Ccircle cx='155' cy='85' r='8' fill='%23000'/%3E%3Ctext x='40' y='50' fill='yellow' font-size='30'%3E☀️%3C/text%3E%3C/svg%3E",
        ksusha_alisa: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23F5DEB3'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23800000'/%3E%3Ccircle cx='70' cy='150' r='30' fill='%23FF69B4'/%3E%3Ccircle cx='180' cy='150' r='30' fill='%2393CCEA'/%3E%3C/svg%3E",
        ksusha_sincere: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23FF69B4'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23FF1493'/%3E%3Ccircle cx='95' cy='85' r='8' fill='%23000'/%3E%3Ccircle cx='155' cy='85' r='8' fill='%23000'/%3E%3Ctext x='50' y='50' fill='white' font-size='30'%3E😇%3C/text%3E%3C/svg%3E",
        alisa_sincere: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%2393CCEA'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%234169E1'/%3E%3Ccircle cx='95' cy='85' r='8' fill='%23000'/%3E%3Ccircle cx='155' cy='85' r='8' fill='%23000'/%3E%3Ctext x='50' y='50' fill='white' font-size='30'%3E😇%3C/text%3E%3C/svg%3E",
        blonde_thinking2: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23F5DEB3'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23FF1493'/%3E%3Ccircle cx='95' cy='85' r='8' fill='%23000'/%3E%3Ccircle cx='155' cy='85' r='8' fill='%23000'/%3E%3Ctext x='180' y='60' fill='white' font-size='30'%3E💭%3C/text%3E%3C/svg%3E",
        blonde_happy2: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23F5DEB3'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23FF1493'/%3E%3Ccircle cx='95' cy='85' r='8' fill='%23000'/%3E%3Ccircle cx='155' cy='85' r='8' fill='%23000'/%3E%3Ctext x='50' y='50' fill='pink' font-size='30'%3E😊%3C/text%3E%3C/svg%3E",
        old_helpers: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23F5DEB3'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23800000'/%3E%3Ccircle cx='40' cy='150' r='25' fill='%23FFC0CB'/%3E%3Ccircle cx='210' cy='150' r='25' fill='%23FFC0CB'/%3E%3Ccircle cx='80' cy='200' r='25' fill='%23FFC0CB'/%3E%3C/svg%3E",
        blonde_firing: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23F5DEB3'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23FF1493'/%3E%3Ccircle cx='95' cy='85' r='8' fill='%23000'/%3E%3Ccircle cx='155' cy='85' r='8' fill='%23000'/%3E%3Ctext x='30' y='50' fill='red' font-size='30'%3E🚫%3C/text%3E%3C/svg%3E",
        helpers_crying2: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23F5DEB3'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23800000'/%3E%3Ccircle cx='40' cy='150' r='25' fill='%23FFC0CB'/%3E%3Ccircle cx='210' cy='150' r='25' fill='%23FFC0CB'/%3E%3Ccircle cx='80' cy='200' r='25' fill='%23FFC0CB'/%3E%3Ctext x='30' y='100' fill='blue' font-size='20'%3E:'%28%3C/text%3E%3C/svg%3E",
        blonde_dismiss: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23F5DEB3'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23FF1493'/%3E%3Ccircle cx='95' cy='85' r='8' fill='%23000'/%3E%3Ccircle cx='155' cy='85' r='8' fill='%23000'/%3E%3Ctext x='40' y='50' fill='white' font-size='30'%3E👋%3C/text%3E%3C/svg%3E",
        blonde_leader: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23F5DEB3'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23FF1493'/%3E%3Ccircle cx='95' cy='85' r='8' fill='%23000'/%3E%3Ccircle cx='155' cy='85' r='8' fill='%23000'/%3E%3Ctext x='170' y='70' fill='gold' font-size='30'%3E👑%3C/text%3E%3C/svg%3E",
        ksusha_excited: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23FF69B4'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23FF1493'/%3E%3Ccircle cx='95' cy='85' r='8' fill='%23000'/%3E%3Ccircle cx='155' cy='85' r='8' fill='%23000'/%3E%3Ctext x='50' y='50' fill='gold' font-size='30'%3E😍%3C/text%3E%3C/svg%3E",
        blonde_rules: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23F5DEB3'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23FF1493'/%3E%3Ccircle cx='95' cy='85' r='8' fill='%23000'/%3E%3Ccircle cx='155' cy='85' r='8' fill='%23000'/%3E%3Ctext x='50' y='50' fill='white' font-size='30'%3E📜%3C/text%3E%3C/svg%3E",
        alisa_curious: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%2393CCEA'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%234169E1'/%3E%3Ccircle cx='95' cy='85' r='8' fill='%23000'/%3E%3Ccircle cx='155' cy='85' r='8' fill='%23000'/%3E%3Ctext x='50' y='50' fill='white' font-size='30'%3E❓%3C/text%3E%3C/svg%3E",
        blonde_independent: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23F5DEB3'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23FF1493'/%3E%3Ccircle cx='95' cy='85' r='8' fill='%23000'/%3E%3Ccircle cx='155' cy='85' r='8' fill='%23000'/%3E%3Ctext x='40' y='50' fill='pink' font-size='30'%3E💪%3C/text%3E%3C/svg%3E",
        girls_happy: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23F5DEB3'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23FF1493'/%3E%3Ccircle cx='70' cy='150' r='30' fill='%23FF69B4'/%3E%3Ccircle cx='180' cy='150' r='30' fill='%2393CCEA'/%3E%3Ctext x='30' y='70' fill='gold' font-size='30'%3E😊%3C/text%3E%3C/svg%3E",
        girls_living: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23F5DEB3'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23FF1493'/%3E%3Ccircle cx='70' cy='150' r='30' fill='%23FF69B4'/%3E%3Ccircle cx='180' cy='150' r='30' fill='%2393CCEA'/%3E%3Ctext x='30' y='70' fill='pink' font-size='30'%3E🏠%3C/text%3E%3C/svg%3E",
        ksusha_friendly: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23FF69B4'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23FF1493'/%3E%3Ccircle cx='95' cy='85' r='8' fill='%23000'/%3E%3Ccircle cx='155' cy='85' r='8' fill='%23000'/%3E%3Ctext x='50' y='50' fill='white' font-size='30'%3E😊%3C/text%3E%3C/svg%3E",
        blonde_warm: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23F5DEB3'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23FF1493'/%3E%3Ccircle cx='95' cy='85' r='8' fill='%23000'/%3E%3Ccircle cx='155' cy='85' r='8' fill='%23000'/%3E%3Ctext x='50' y='50' fill='pink' font-size='30'%3E❤️%3C/text%3E%3C/svg%3E",
        alisa_proud: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%2393CCEA'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%234169E1'/%3E%3Ccircle cx='95' cy='85' r='8' fill='%23000'/%3E%3Ccircle cx='155' cy='85' r='8' fill='%23000'/%3E%3Ctext x='50' y='50' fill='gold' font-size='30'%3E👑%3C/text%3E%3C/svg%3E",
        blonde_laughing2: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23F5DEB3'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23FF1493'/%3E%3Ccircle cx='95' cy='85' r='8' fill='%23000'/%3E%3Ccircle cx='155' cy='85' r='8' fill='%23000'/%3E%3Ctext x='50' y='50' fill='gold' font-size='30'%3E😄%3C/text%3E%3C/svg%3E",
        ksusha_wardrobe: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23FF69B4'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23FF1493'/%3E%3Ccircle cx='95' cy='85' r='8' fill='%23000'/%3E%3Ccircle cx='155' cy='85' r='8' fill='%23000'/%3E%3Ctext x='50' y='50' fill='white' font-size='30'%3E👗%3C/text%3E%3C/svg%3E",
        blonde_wardrobe: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23F5DEB3'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23FF1493'/%3E%3Ccircle cx='95' cy='85' r='8' fill='%23000'/%3E%3Ccircle cx='155' cy='85' r='8' fill='%23000'/%3E%3Ctext x='50' y='50' fill='pink' font-size='30'%3E👠%3C/text%3E%3C/svg%3E",
        ksusha_embarrassed: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23FF69B4'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23FF1493'/%3E%3Ccircle cx='95' cy='85' r='8' fill='%23000'/%3E%3Ccircle cx='155' cy='85' r='8' fill='%23000'/%3E%3Ctext x='50' y='50' fill='red' font-size='30'%3E😳%3C/text%3E%3C/svg%3E",
        blonde_teaching2: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23F5DEB3'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23FF1493'/%3E%3Ccircle cx='95' cy='85' r='8' fill='%23000'/%3E%3Ccircle cx='155' cy='85' r='8' fill='%23000'/%3E%3Ctext x='50' y='50' fill='white' font-size='30'%3E📚%3C/text%3E%3C/svg%3E",
        alisa_laughing: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%2393CCEA'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%234169E1'/%3E%3Ccircle cx='95' cy='85' r='8' fill='%23000'/%3E%3Ccircle cx='155' cy='85' r='8' fill='%23000'/%3E%3Ctext x='50' y='50' fill='gold' font-size='30'%3E😆%3C/text%3E%3C/svg%3E",
        girls_evening: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23F5DEB3'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23FF1493'/%3E%3Ccircle cx='70' cy='150' r='30' fill='%23FF69B4'/%3E%3Ccircle cx='180' cy='150' r='30' fill='%2393CCEA'/%3E%3Ctext x='30' y='70' fill='blue' font-size='30'%3E🌙%3C/text%3E%3C/svg%3E",
        ksusha_sniffing: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23FF69B4'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23FF1493'/%3E%3Ccircle cx='95' cy='85' r='8' fill='%23000'/%3E%3Ccircle cx='155' cy='85' r='8' fill='%23000'/%3E%3Ctext x='50' y='50' fill='gray' font-size='30'%3E👃%3C/text%3E%3C/svg%3E",
        blonde_confused: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23F5DEB3'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23FF1493'/%3E%3Ccircle cx='95' cy='85' r='8' fill='%23000'/%3E%3Ccircle cx='155' cy='85' r='8' fill='%23000'/%3E%3Ctext x='50' y='50' fill='white' font-size='30'%3E😕%3C/text%3E%3C/svg%3E",
        alisa_panic: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%2393CCEA'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%234169E1'/%3E%3Ccircle cx='95' cy='85' r='8' fill='%23000'/%3E%3Ccircle cx='155' cy='85' r='8' fill='%23000'/%3E%3Ctext x='50' y='50' fill='orange' font-size='30'%3E😱%3C/text%3E%3C/svg%3E",
        blonde_angry_fire: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23F5DEB3'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23FF1493'/%3E%3Ccircle cx='95' cy='85' r='8' fill='%23FF0000'/%3E%3Ccircle cx='155' cy='85' r='8' fill='%23FF0000'/%3E%3Ctext x='50' y='50' fill='red' font-size='30'%3E🔥%3C/text%3E%3C/svg%3E",
        ksusha_panic: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23FF69B4'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23FF1493'/%3E%3Ccircle cx='95' cy='85' r='8' fill='%23000'/%3E%3Ccircle cx='155' cy='85' r='8' fill='%23000'/%3E%3Ctext x='50' y='50' fill='orange' font-size='30'%3E😨%3C/text%3E%3C/svg%3E",
        blonde_hysterical_fire: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23F5DEB3'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23FF1493'/%3E%3Ccircle cx='95' cy='85' r='10' fill='%23FF0000'/%3E%3Ccircle cx='155' cy='85' r='10' fill='%23FF0000'/%3E%3Ctext x='30' y='50' fill='red' font-size='30'%3E🔥%3C/text%3E%3C/svg%3E",
        alisa_desperate: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%2393CCEA'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%234169E1'/%3E%3Ccircle cx='95' cy='85' r='8' fill='%23000'/%3E%3Ccircle cx='155' cy='85' r='8' fill='%23000'/%3E%3Ctext x='50' y='50' fill='red' font-size='30'%3E😫%3C/text%3E%3C/svg%3E",
        blonde_grabbing: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23F5DEB3'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23FF1493'/%3E%3Ccircle cx='95' cy='85' r='8' fill='%23000'/%3E%3Ccircle cx='155' cy='85' r='8' fill='%23000'/%3E%3Ctext x='40' y='50' fill='pink' font-size='30'%3E👜%3C/text%3E%3C/svg%3E",
        fire_running: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23F5DEB3'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23FF1493'/%3E%3Ctext x='30' y='50' fill='orange' font-size='30'%3E🔥%3C/text%3E%3C/svg%3E",
        fire_dark: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23333'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23333'/%3E%3Ctext x='30' y='50' fill='orange' font-size='30'%3E🔥%3C/text%3E%3C/svg%3E",
        fire_hands: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23333'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23333'/%3E%3Ctext x='30' y='50' fill='white' font-size='30'%3E🤝%3C/text%3E%3C/svg%3E",
        blonde_fall: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23F5DEB3'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23FF1493'/%3E%3Ccircle cx='95' cy='85' r='8' fill='%23000'/%3E%3Ccircle cx='155' cy='85' r='8' fill='%23000'/%3E%3Ctext x='50' y='50' fill='white' font-size='30'%3E😵%3C/text%3E%3C/svg%3E",
        ksusha_horror: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23FF69B4'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23FF1493'/%3E%3Ccircle cx='95' cy='85' r='10' fill='white'/%3E%3Ccircle cx='155' cy='85' r='10' fill='white'/%3E%3Ctext x='50' y='50' fill='red' font-size='30'%3E😱%3C/text%3E%3C/svg%3E",
        blonde_seeing: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23F5DEB3'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23FF1493'/%3E%3Ccircle cx='95' cy='85' r='8' fill='%23000'/%3E%3Ccircle cx='155' cy='85' r='8' fill='%23000'/%3E%3Ctext x='50' y='50' fill='red' font-size='30'%3E👁️%3C/text%3E%3C/svg%3E",
        blonde_horror: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23F5DEB3'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23FF1493'/%3E%3Ccircle cx='95' cy='85' r='10' fill='white'/%3E%3Ccircle cx='155' cy='85' r='10' fill='white'/%3E%3Ctext x='50' y='50' fill='red' font-size='30'%3E😨%3C/text%3E%3C/svg%3E",
        devil_face: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23FF0000'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%238B0000'/%3E%3Ccircle cx='95' cy='85' r='8' fill='%23FFD700'/%3E%3Ccircle cx='155' cy='85' r='8' fill='%23FFD700'/%3E%3Ctext x='50' y='50' fill='black' font-size='30'%3E👹%3C/text%3E%3C/svg%3E",
        devil_rises: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23FF0000'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%238B0000'/%3E%3Ccircle cx='95' cy='85' r='8' fill='%23FFD700'/%3E%3Ccircle cx='155' cy='85' r='8' fill='%23FFD700'/%3E%3Ctext x='40' y='50' fill='black' font-size='30'%3E⬆️%3C/text%3E%3C/svg%3E",
        blonde_scream: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23F5DEB3'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23FF1493'/%3E%3Ccircle cx='95' cy='85' r='10' fill='white'/%3E%3Ccircle cx='155' cy='85' r='10' fill='white'/%3E%3Ctext x='30' y='50' fill='red' font-size='40'%3E🔊%3C/text%3E%3C/svg%3E",
        ceiling_fall: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23808080'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23666'/%3E%3Ctext x='30' y='50' fill='brown' font-size='30'%3E💥%3C/text%3E%3C/svg%3E",
        blonde_final: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23F5DEB3'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23FF1493'/%3E%3Ccircle cx='95' cy='85' r='10' fill='white'/%3E%3Ccircle cx='155' cy='85' r='10' fill='white'/%3E%3Ctext x='30' y='50' fill='red' font-size='30'%3E🔥❓%3C/text%3E%3C/svg%3E",
        to_be_continued: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Crect width='250' height='250' fill='black'/%3E%3Ctext x='50' y='125' fill='red' font-size='30'%3ETO BE%3C/text%3E%3Ctext x='50' y='175' fill='red' font-size='30'%3ECONTINUED%3C/text%3E%3C/svg%3E",
        blonde_fake: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23F5DEB3'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23FF1493'/%3E%3Ccircle cx='95' cy='85' r='8' fill='%23000'/%3E%3Ccircle cx='155' cy='85' r='8' fill='%23000'/%3E%3Ctext x='40' y='50' fill='pink' font-size='30'%3E😇%3C/text%3E%3C/svg%3E",
        suspicious: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%238B4513'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23666'/%3E%3Ccircle cx='95' cy='85' r='8' fill='%23000'/%3E%3Ccircle cx='155' cy='85' r='8' fill='%23000'/%3E%3Ctext x='50' y='50' fill='yellow' font-size='30'%3E🤨%3C/text%3E%3C/svg%3E",
        blonde_innocent: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23F5DEB3'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23FF1493'/%3E%3Ccircle cx='95' cy='85' r='8' fill='%23000'/%3E%3Ccircle cx='155' cy='85' r='8' fill='%23000'/%3E%3Ctext x='40' y='50' fill='white' font-size='30'%3E😇%3C/text%3E%3C/svg%3E",
        blonde_talking: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23F5DEB3'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23FF1493'/%3E%3Ccircle cx='95' cy='85' r='8' fill='%23000'/%3E%3Ccircle cx='155' cy='85' r='8' fill='%23000'/%3E%3Ctext x='30' y='50' fill='white' font-size='30'%3E💬%3C/text%3E%3C/svg%3E",
        blonde_flower: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23F5DEB3'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23FF1493'/%3E%3Ccircle cx='95' cy='85' r='8' fill='%23000'/%3E%3Ccircle cx='155' cy='85' r='8' fill='%23000'/%3E%3Ctext x='40' y='50' fill='pink' font-size='30'%3E🌸%3C/text%3E%3C/svg%3E",
        blonde_thinking: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23F5DEB3'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23FF1493'/%3E%3Ccircle cx='95' cy='85' r='8' fill='%23000'/%3E%3Ccircle cx='155' cy='85' r='8' fill='%23000'/%3E%3Ctext x='180' y='70' fill='white' font-size='30'%3E💭%3C/text%3E%3C/svg%3E",
        curious: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%238B4513'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23666'/%3E%3Ccircle cx='95' cy='85' r='8' fill='%23000'/%3E%3Ccircle cx='155' cy='85' r='8' fill='%23000'/%3E%3Ctext x='50' y='50' fill='white' font-size='30'%3E❓%3C/text%3E%3C/svg%3E",
        blonde_crying: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23F5DEB3'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23FF1493'/%3E%3Ccircle cx='95' cy='85' r='8' fill='%23000'/%3E%3Ccircle cx='155' cy='85' r='8' fill='%23000'/%3E%3Ctext x='30' y='50' fill='blue' font-size='30'%3E😢%3C/text%3E%3C/svg%3E",
        fake_sad: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%238B4513'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23666'/%3E%3Ccircle cx='95' cy='85' r='8' fill='%23000'/%3E%3Ccircle cx='155' cy='85' r='8' fill='%23000'/%3E%3Ctext x='50' y='50' fill='blue' font-size='30'%3E😢%3C/text%3E%3C/svg%3E",
        blonde_vain: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23F5DEB3'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23FF1493'/%3E%3Ccircle cx='95' cy='85' r='8' fill='%23000'/%3E%3Ccircle cx='155' cy='85' r='8' fill='%23000'/%3E%3Ctext x='170' y='70' fill='gold' font-size='30'%3E🌟%3C/text%3E%3C/svg%3E",
        blonde_teaching: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23F5DEB3'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23FF1493'/%3E%3Ccircle cx='95' cy='85' r='8' fill='%23000'/%3E%3Ccircle cx='155' cy='85' r='8' fill='%23000'/%3E%3Ctext x='30' y='50' fill='white' font-size='30'%3E📝%3C/text%3E%3C/svg%3E",
        excited: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%238B4513'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23666'/%3E%3Ccircle cx='95' cy='85' r='8' fill='%23000'/%3E%3Ccircle cx='155' cy='85' r='8' fill='%23000'/%3E%3Ctext x='50' y='50' fill='gold' font-size='30'%3E😍%3C/text%3E%3C/svg%3E",
        blonde_happy: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23F5DEB3'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23FF1493'/%3E%3Ccircle cx='95' cy='85' r='8' fill='%23000'/%3E%3Ccircle cx='155' cy='85' r='8' fill='%23000'/%3E%3Ctext x='40' y='50' fill='pink' font-size='30'%3E😊%3C/text%3E%3C/svg%3E",
        funny: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%238B4513'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23666'/%3E%3Ccircle cx='95' cy='85' r='8' fill='%23000'/%3E%3Ccircle cx='155' cy='85' r='8' fill='%23000'/%3E%3Ctext x='50' y='50' fill='yellow' font-size='30'%3E😂%3C/text%3E%3C/svg%3E",
        blonde_makeup: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23F5DEB3'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23FF1493'/%3E%3Ccircle cx='95' cy='85' r='8' fill='%23000'/%3E%3Ccircle cx='155' cy='85' r='8' fill='%23000'/%3E%3Ctext x='40' y='50' fill='pink' font-size='30'%3E💄%3C/text%3E%3C/svg%3E",
        blonde_evil: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23F5DEB3'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23FF1493'/%3E%3Ccircle cx='95' cy='85' r='8' fill='%23FF0000'/%3E%3Ccircle cx='155' cy='85' r='8' fill='%23FF0000'/%3E%3Ctext x='40' y='50' fill='black' font-size='30'%3E😈%3C/text%3E%3C/svg%3E",
        announcement: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23808080'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23000080'/%3E%3Ccircle cx='95' cy='85' r='8' fill='%23000'/%3E%3Ccircle cx='155' cy='85' r='8' fill='%23000'/%3E%3Ctext x='40' y='50' fill='white' font-size='30'%3E📢%3C/text%3E%3C/svg%3E",
        blonde_surprised: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23F5DEB3'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23FF1493'/%3E%3Ccircle cx='95' cy='85' r='8' fill='%23000'/%3E%3Ccircle cx='155' cy='85' r='8' fill='%23000'/%3E%3Ctext x='50' y='50' fill='red' font-size='30'%3E😲%3C/text%3E%3C/svg%3E",
        blonde_shocked2: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23F5DEB3'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23FF1493'/%3E%3Ccircle cx='95' cy='85' r='8' fill='%23000'/%3E%3Ccircle cx='155' cy='85' r='8' fill='%23000'/%3E%3Ctext x='70' y='50' fill='red' font-size='40'%3E?!%3C/text%3E%3C/svg%3E",
        to_be_continued2: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Crect width='250' height='250' fill='black'/%3E%3Ctext x='50' y='125' fill='red' font-size='30'%3ETO BE%3C/text%3E%3Ctext x='50' y='175' fill='red' font-size='30'%3ECONTINUED...%3C/text%3E%3C/svg%3E",
        running: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23F5DEB3'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23FF1493'/%3E%3Ccircle cx='95' cy='85' r='8' fill='%23000'/%3E%3Ccircle cx='155' cy='85' r='8' fill='%23000'/%3E%3Ctext x='30' y='50' fill='red' font-size='30'%3E🏃%3C/text%3E%3C/svg%3E",
        running2: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23F5DEB3'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23FF1493'/%3E%3Ccircle cx='95' cy='85' r='8' fill='%23000'/%3E%3Ccircle cx='155' cy='85' r='8' fill='%23000'/%3E%3Ctext x='30' y='50' fill='red' font-size='30'%3E🏃%3C/text%3E%3C/svg%3E",
        fire_throw: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23F5DEB3'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23FF1493'/%3E%3Ccircle cx='95' cy='85' r='8' fill='%23000'/%3E%3Ccircle cx='155' cy='85' r='8' fill='%23000'/%3E%3Ctext x='30' y='30' fill='red' font-size='30'%3E🔥%3C/text%3E%3C/svg%3E",
        dodging2: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23F5DEB3'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23FF1493'/%3E%3Ccircle cx='95' cy='85' r='8' fill='%23000'/%3E%3Ccircle cx='155' cy='85' r='8' fill='%23000'/%3E%3Ctext x='30' y='50' fill='red' font-size='30'%3E↪️%3C/text%3E%3C/svg%3E",
        ksusha_panic2: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23FF69B4'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23FF1493'/%3E%3Ccircle cx='95' cy='85' r='8' fill='%23000'/%3E%3Ccircle cx='155' cy='85' r='8' fill='%23000'/%3E%3Ctext x='50' y='50' fill='orange' font-size='30'%3E😱%3C/text%3E%3C/svg%3E",
        thinking_chase: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23F5DEB3'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23FF1493'/%3E%3Ccircle cx='95' cy='85' r='8' fill='%23000'/%3E%3Ccircle cx='155' cy='85' r='8' fill='%23000'/%3E%3Ctext x='180' y='70' fill='white' font-size='30'%3E💭%3C/text%3E%3C/svg%3E",
        hiding: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23F5DEB3'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23FF1493'/%3E%3Ccircle cx='95' cy='85' r='8' fill='%23000'/%3E%3Ccircle cx='155' cy='85' r='8' fill='%23000'/%3E%3Ctext x='50' y='50' fill='white' font-size='30'%3E🤫%3C/text%3E%3C/svg%3E",
        throwing: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23F5DEB3'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23FF1493'/%3E%3Ccircle cx='95' cy='85' r='8' fill='%23FF0000'/%3E%3Ccircle cx='155' cy='85' r='8' fill='%23FF0000'/%3E%3Ctext x='30' y='50' fill='red' font-size='30'%3E💢%3C/text%3E%3C/svg%3E",
        stairs: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23F5DEB3'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23FF1493'/%3E%3Ccircle cx='95' cy='85' r='8' fill='%23000'/%3E%3Ccircle cx='155' cy='85' r='8' fill='%23000'/%3E%3Ctext x='30' y='50' fill='white' font-size='30'%3E⬇️%3C/text%3E%3C/svg%3E",
        stairs_choice: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23F5DEB3'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23FF1493'/%3E%3Ccircle cx='95' cy='85' r='8' fill='%23000'/%3E%3Ccircle cx='155' cy='85' r='8' fill='%23000'/%3E%3Ctext x='30' y='50' fill='white' font-size='30'%3E❓%3C/text%3E%3C/svg%3E",
        stairs_fire: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23F5DEB3'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23FF1493'/%3E%3Ccircle cx='95' cy='85' r='8' fill='%23000'/%3E%3Ccircle cx='155' cy='85' r='8' fill='%23000'/%3E%3Ctext x='30' y='50' fill='orange' font-size='30'%3E🔥%3C/text%3E%3C/svg%3E",
        fire_blocked: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23F5DEB3'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23FF1493'/%3E%3Ccircle cx='95' cy='85' r='8' fill='%23000'/%3E%3Ccircle cx='155' cy='85' r='8' fill='%23000'/%3E%3Ctext x='30' y='50' fill='red' font-size='30'%3E🚫%3C/text%3E%3C/svg%3E",
        hiding_stairs: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23F5DEB3'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23FF1493'/%3E%3Ccircle cx='95' cy='85' r='8' fill='%23000'/%3E%3Ccircle cx='155' cy='85' r='8' fill='%23000'/%3E%3Ctext x='50' y='50' fill='white' font-size='30'%3E🤫%3C/text%3E%3C/svg%3E",
        first_floor: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23F5DEB3'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23FF1493'/%3E%3Ccircle cx='95' cy='85' r='8' fill='%23000'/%3E%3Ccircle cx='155' cy='85' r='8' fill='%23000'/%3E%3Ctext x='30' y='50' fill='white' font-size='30'%3E1️⃣%3C/text%3E%3C/svg%3E",
        window_voice: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23F5DEB3'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23FF1493'/%3E%3Ccircle cx='95' cy='85' r='8' fill='%23000'/%3E%3Ccircle cx='155' cy='85' r='8' fill='%23000'/%3E%3Ctext x='30' y='50' fill='white' font-size='30'%3E🗣️%3C/text%3E%3C/svg%3E",
        looking_window: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23F5DEB3'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23FF1493'/%3E%3Ccircle cx='95' cy='85' r='8' fill='%23000'/%3E%3Ccircle cx='155' cy='85' r='8' fill='%23000'/%3E%3Ctext x='50' y='50' fill='white' font-size='30'%3E👀%3C/text%3E%3C/svg%3E",
        window_approach: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23F5DEB3'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23FF1493'/%3E%3Ccircle cx='95' cy='85' r='8' fill='%23000'/%3E%3Ccircle cx='155' cy='85' r='8' fill='%23000'/%3E%3Ctext x='50' y='50' fill='white' font-size='30'%3E🚶%3C/text%3E%3C/svg%3E",
        see_kristina: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23F5DEB3'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23FF1493'/%3E%3Ccircle cx='95' cy='85' r='8' fill='%23000'/%3E%3Ccircle cx='155' cy='85' r='8' fill='%23000'/%3E%3Ccircle cx='200' cy='70' r='20' fill='%23800080'/%3E%3C/svg%3E",
        kristina_shouting: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23800080'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23550055'/%3E%3Ccircle cx='95' cy='85' r='8' fill='%23000'/%3E%3Ccircle cx='155' cy='85' r='8' fill='%23000'/%3E%3Ctext x='30' y='50' fill='yellow' font-size='30'%3E📢%3C/text%3E%3C/svg%3E",
        window_escape: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23F5DEB3'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23FF1493'/%3E%3Ccircle cx='95' cy='85' r='8' fill='%23000'/%3E%3Ccircle cx='155' cy='85' r='8' fill='%23000'/%3E%3Ctext x='30' y='50' fill='white' font-size='30'%3E🪟%3C/text%3E%3C/svg%3E",
        climbing_out: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23F5DEB3'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23FF1493'/%3E%3Ccircle cx='95' cy='85' r='8' fill='%23000'/%3E%3Ccircle cx='155' cy='85' r='8' fill='%23000'/%3E%3Ctext x='30' y='50' fill='white' font-size='30'%3E⬆️%3C/text%3E%3C/svg%3E",
        house_burning: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Crect width='250' height='250' fill='%238B4513'/%3E%3Ccircle cx='125' cy='100' r='55' fill='%23F5DEB3'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23FF1493'/%3E%3Ctext x='30' y='50' fill='orange' font-size='40'%3E🔥%3C/text%3E%3C/svg%3E",
        kristina_urgent: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23800080'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23550055'/%3E%3Ccircle cx='95' cy='85' r='8' fill='%23000'/%3E%3Ccircle cx='155' cy='85' r='8' fill='%23000'/%3E%3Ctext x='30' y='50' fill='red' font-size='30'%3E⚡%3C/text%3E%3C/svg%3E",
        running_away: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23F5DEB3'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23FF1493'/%3E%3Ccircle cx='95' cy='85' r='8' fill='%23000'/%3E%3Ccircle cx='155' cy='85' r='8' fill='%23000'/%3E%3Ctext x='30' y='50' fill='white' font-size='30'%3E🏃%3C/text%3E%3C/svg%3E",
        running_night: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23333'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23333'/%3E%3Ccircle cx='95' cy='85' r='8' fill='%23FFD700'/%3E%3Ccircle cx='155' cy='85' r='8' fill='%23FFD700'/%3E%3Ctext x='30' y='50' fill='white' font-size='30'%3E🌙%3C/text%3E%3C/svg%3E",
        running_talking: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23F5DEB3'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23FF1493'/%3E%3Ccircle cx='95' cy='85' r='8' fill='%23000'/%3E%3Ccircle cx='155' cy='85' r='8' fill='%23000'/%3E%3Ctext x='30' y='50' fill='white' font-size='30'%3E💬%3C/text%3E%3C/svg%3E",
        safe_house: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23F5DEB3'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23FF1493'/%3E%3Ccircle cx='95' cy='85' r='8' fill='%23000'/%3E%3Ccircle cx='155' cy='85' r='8' fill='%23000'/%3E%3Ctext x='30' y='50' fill='white' font-size='30'%3E🏠%3C/text%3E%3C/svg%3E",
        girls_relieved: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23F5DEB3'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23FF1493'/%3E%3Ccircle cx='70' cy='150' r='30' fill='%23FF69B4'/%3E%3Ccircle cx='180' cy='150' r='30' fill='%2393CCEA'/%3E%3Ctext x='30' y='70' fill='white' font-size='30'%3E😮‍💨%3C/text%3E%3C/svg%3E",
        blonde_crying2: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23F5DEB3'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23FF1493'/%3E%3Ccircle cx='95' cy='85' r='8' fill='%23000'/%3E%3Ccircle cx='155' cy='85' r='8' fill='%23000'/%3E%3Ctext x='30' y='50' fill='blue' font-size='30'%3E😭%3C/text%3E%3C/svg%3E",
        ksusha_comforting: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23FF69B4'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23FF1493'/%3E%3Ccircle cx='95' cy='85' r='8' fill='%23000'/%3E%3Ccircle cx='155' cy='85' r='8' fill='%23000'/%3E%3Ctext x='50' y='50' fill='white' font-size='30'%3E🤗%3C/text%3E%3C/svg%3E",
        emotional: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23F5DEB3'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23FF1493'/%3E%3Ccircle cx='95' cy='85' r='8' fill='%23000'/%3E%3Ccircle cx='155' cy='85' r='8' fill='%23000'/%3E%3Ctext x='50' y='50' fill='red' font-size='30'%3E🥹%3C/text%3E%3C/svg%3E",
        touching: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23F5DEB3'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23FF1493'/%3E%3Ccircle cx='95' cy='85' r='8' fill='%23000'/%3E%3Ccircle cx='155' cy='85' r='8' fill='%23000'/%3E%3Ctext x='50' y='50' fill='pink' font-size='30'%3E❤️%3C/text%3E%3C/svg%3E",
        blonde_thanks: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23F5DEB3'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23FF1493'/%3E%3Ccircle cx='95' cy='85' r='8' fill='%23000'/%3E%3Ccircle cx='155' cy='85' r='8' fill='%23000'/%3E%3Ctext x='50' y='50' fill='white' font-size='30'%3E🙏%3C/text%3E%3C/svg%3E",
        blonde_hysterical2: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23F5DEB3'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23FF1493'/%3E%3Ccircle cx='95' cy='85' r='10' fill='%23FF0000'/%3E%3Ccircle cx='155' cy='85' r='10' fill='%23FF0000'/%3E%3Ctext x='30' y='50' fill='red' font-size='30'%3E😫%3C/text%3E%3C/svg%3E",
        girls_hug: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23F5DEB3'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23FF1493'/%3E%3Ccircle cx='70' cy='150' r='30' fill='%23FF69B4'/%3E%3Ccircle cx='180' cy='150' r='30' fill='%2393CCEA'/%3E%3Ctext x='30' y='70' fill='red' font-size='30'%3E🤗%3C/text%3E%3C/svg%3E",
        quiet: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23800080'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23550055'/%3E%3Ccircle cx='95' cy='85' r='8' fill='%23000'/%3E%3Ccircle cx='155' cy='85' r='8' fill='%23000'/%3E%3Ctext x='50' y='50' fill='white' font-size='30'%3E🤫%3C/text%3E%3C/svg%3E",
        grateful: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%2393CCEA'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%234169E1'/%3E%3Ccircle cx='95' cy='85' r='8' fill='%23000'/%3E%3Ccircle cx='155' cy='85' r='8' fill='%23000'/%3E%3Ctext x='50' y='50' fill='white' font-size='30'%3E🙏%3C/text%3E%3C/svg%3E",
        blonde_grateful: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23F5DEB3'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23FF1493'/%3E%3Ccircle cx='95' cy='85' r='8' fill='%23000'/%3E%3Ccircle cx='155' cy='85' r='8' fill='%23000'/%3E%3Ctext x='50' y='50' fill='white' font-size='30'%3E🙏%3C/text%3E%3C/svg%3E",
        kristina_smile: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23800080'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23550055'/%3E%3Ccircle cx='95' cy='85' r='8' fill='%23000'/%3E%3Ccircle cx='155' cy='85' r='8' fill='%23000'/%3E%3Ctext x='50' y='50' fill='white' font-size='30'%3E😊%3C/text%3E%3C/svg%3E",
        hopeful: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23FF69B4'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23FF1493'/%3E%3Ccircle cx='95' cy='85' r='8' fill='%23000'/%3E%3Ccircle cx='155' cy='85' r='8' fill='%23000'/%3E%3Ctext x='50' y='50' fill='yellow' font-size='30'%3E🌟%3C/text%3E%3C/svg%3E",
        ksusha_offer: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23FF69B4'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23FF1493'/%3E%3Ccircle cx='95' cy='85' r='8' fill='%23000'/%3E%3Ccircle cx='155' cy='85' r='8' fill='%23000'/%3E%3Ctext x='30' y='50' fill='white' font-size='30'%3E🏠%3C/text%3E%3C/svg%3E",
        blonde_thinking3: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23F5DEB3'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23FF1493'/%3E%3Ccircle cx='95' cy='85' r='8' fill='%23000'/%3E%3Ccircle cx='155' cy='85' r='8' fill='%23000'/%3E%3Ctext x='180' y='70' fill='white' font-size='30'%3E💭%3C/text%3E%3C/svg%3E",
        blonde_agree: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23F5DEB3'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23FF1493'/%3E%3Ccircle cx='95' cy='85' r='8' fill='%23000'/%3E%3Ccircle cx='155' cy='85' r='8' fill='%23000'/%3E%3Ctext x='50' y='50' fill='green' font-size='30'%3E✅%3C/text%3E%3C/svg%3E",
        girls_hug2: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23F5DEB3'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23FF1493'/%3E%3Ccircle cx='70' cy='150' r='30' fill='%23FF69B4'/%3E%3Ccircle cx='180' cy='150' r='30' fill='%2393CCEA'/%3E%3Ctext x='30' y='70' fill='red' font-size='30'%3E🤗%3C/text%3E%3C/svg%3E",
        blonde_thanks_kristina: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23F5DEB3'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23FF1493'/%3E%3Ccircle cx='95' cy='85' r='8' fill='%23000'/%3E%3Ccircle cx='155' cy='85' r='8' fill='%23000'/%3E%3Ctext x='50' y='50' fill='white' font-size='30'%3E🙏%3C/text%3E%3C/svg%3E",
        kristina_stay: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23800080'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23550055'/%3E%3Ccircle cx='95' cy='85' r='8' fill='%23000'/%3E%3Ccircle cx='155' cy='85' r='8' fill='%23000'/%3E%3Ctext x='50' y='50' fill='white' font-size='30'%3E👋%3C/text%3E%3C/svg%3E",
        girls_leaving: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23F5DEB3'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23FF1493'/%3E%3Ccircle cx='70' cy='150' r='30' fill='%23FF69B4'/%3E%3Ccircle cx='180' cy='150' r='30' fill='%2393CCEA'/%3E%3Ctext x='30' y='70' fill='white' font-size='30'%3E🚗%3C/text%3E%3C/svg%3E",
        ksusha_house: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Crect width='250' height='250' fill='%23FFC0CB'/%3E%3Ccircle cx='125' cy='100' r='55' fill='%23F5DEB3'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23FF1493'/%3E%3Ctext x='30' y='50' fill='pink' font-size='30'%3E🏠%3C/text%3E%3C/svg%3E",
        morning: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23F5DEB3'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23FF1493'/%3E%3Ccircle cx='95' cy='85' r='8' fill='%23000'/%3E%3Ccircle cx='155' cy='85' r='8' fill='%23000'/%3E%3Ctext x='30' y='50' fill='yellow' font-size='30'%3E☀️%3C/text%3E%3C/svg%3E",
        blonde_waking: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23F5DEB3'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23FF1493'/%3E%3Ccircle cx='95' cy='85' r='8' fill='%23000'/%3E%3Ccircle cx='155' cy='85' r='8' fill='%23000'/%3E%3Ctext x='30' y='50' fill='white' font-size='30'%3E😴%3C/text%3E%3C/svg%3E",
        ksusha_breakfast: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23FF69B4'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23FF1493'/%3E%3Ccircle cx='95' cy='85' r='8' fill='%23000'/%3E%3Ccircle cx='155' cy='85' r='8' fill='%23000'/%3E%3Ctext x='50' y='50' fill='white' font-size='30'%3E🍳%3C/text%3E%3C/svg%3E",
        alisa_eating: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%2393CCEA'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%234169E1'/%3E%3Ccircle cx='95' cy='85' r='8' fill='%23000'/%3E%3Ccircle cx='155' cy='85' r='8' fill='%23000'/%3E%3Ctext x='50' y='50' fill='white' font-size='30'%3E😋%3C/text%3E%3C/svg%3E",
        blonde_breakfast: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23F5DEB3'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23FF1493'/%3E%3Ccircle cx='95' cy='85' r='8' fill='%23000'/%3E%3Ccircle cx='155' cy='85' r='8' fill='%23000'/%3E%3Ctext x='30' y='50' fill='white' font-size='30'%3E☕%3C/text%3E%3C/svg%3E",
        blonde_thanks2: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23F5DEB3'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23FF1493'/%3E%3Ccircle cx='95' cy='85' r='8' fill='%23000'/%3E%3Ccircle cx='155' cy='85' r='8' fill='%23000'/%3E%3Ctext x='50' y='50' fill='white' font-size='30'%3E🙏%3C/text%3E%3C/svg%3E",
        blonde_eating: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23F5DEB3'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23FF1493'/%3E%3Ccircle cx='95' cy='85' r='8' fill='%23000'/%3E%3Ccircle cx='155' cy='85' r='8' fill='%23000'/%3E%3Ctext x='30' y='50' fill='white' font-size='30'%3E🍽️%3C/text%3E%3C/svg%3E",
        blonde_snobby: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23F5DEB3'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23FF1493'/%3E%3Ccircle cx='95' cy='85' r='8' fill='%23000'/%3E%3Ccircle cx='155' cy='85' r='8' fill='%23000'/%3E%3Ctext x='50' y='50' fill='gold' font-size='30'%3E👑%3C/text%3E%3C/svg%3E",
        girls_after_breakfast: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23F5DEB3'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23FF1493'/%3E%3Ccircle cx='70' cy='150' r='30' fill='%23FF69B4'/%3E%3Ccircle cx='180' cy='150' r='30' fill='%2393CCEA'/%3E%3Ctext x='30' y='70' fill='white' font-size='30'%3E😌%3C/text%3E%3C/svg%3E",
        blonde_teaching3: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23F5DEB3'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23FF1493'/%3E%3Ccircle cx='95' cy='85' r='8' fill='%23000'/%3E%3Ccircle cx='155' cy='85' r='8' fill='%23000'/%3E%3Ctext x='30' y='50' fill='white' font-size='30'%3E📝%3C/text%3E%3C/svg%3E",
        ksusha_excited2: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23FF69B4'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23FF1493'/%3E%3Ccircle cx='95' cy='85' r='8' fill='%23000'/%3E%3Ccircle cx='155' cy='85' r='8' fill='%23000'/%3E%3Ctext x='50' y='50' fill='gold' font-size='30'%3E😍%3C/text%3E%3C/svg%3E",
        alisa_excited: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%2393CCEA'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%234169E1'/%3E%3Ccircle cx='95' cy='85' r='8' fill='%23000'/%3E%3Ccircle cx='155' cy='85' r='8' fill='%23000'/%3E%3Ctext x='50' y='50' fill='gold' font-size='30'%3E😍%3C/text%3E%3C/svg%3E",
        blonde_rule1: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23F5DEB3'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23FF1493'/%3E%3Ccircle cx='95' cy='85' r='8' fill='%23000'/%3E%3Ccircle cx='155' cy='85' r='8' fill='%23000'/%3E%3Ctext x='50' y='50' fill='gold' font-size='30'%3E1️⃣%3C/text%3E%3C/svg%3E",
        blonde_rule2: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23F5DEB3'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23FF1493'/%3E%3Ccircle cx='95' cy='85' r='8' fill='%23000'/%3E%3Ccircle cx='155' cy='85' r='8' fill='%23000'/%3E%3Ctext x='50' y='50' fill='gold' font-size='30'%3E2️⃣%3C/text%3E%3C/svg%3E",
        blonde_rule3: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23F5DEB3'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23FF1493'/%3E%3Ccircle cx='95' cy='85' r='8' fill='%23000'/%3E%3Ccircle cx='155' cy='85' r='8' fill='%23000'/%3E%3Ctext x='50' y='50' fill='gold' font-size='30'%3E3️⃣%3C/text%3E%3C/svg%3E",
        blonde_rule4: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23F5DEB3'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23FF1493'/%3E%3Ccircle cx='95' cy='85' r='8' fill='%23000'/%3E%3Ccircle cx='155' cy='85' r='8' fill='%23000'/%3E%3Ctext x='50' y='50' fill='gold' font-size='30'%3E4️⃣%3C/text%3E%3C/svg%3E",
        ksusha_touched: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23FF69B4'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23FF1493'/%3E%3Ccircle cx='95' cy='85' r='8' fill='%23000'/%3E%3Ccircle cx='155' cy='85' r='8' fill='%23000'/%3E%3Ctext x='50' y='50' fill='pink' font-size='30'%3E🥹%3C/text%3E%3C/svg%3E",
        alisa_happy2: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%2393CCEA'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%234169E1'/%3E%3Ccircle cx='95' cy='85' r='8' fill='%23000'/%3E%3Ccircle cx='155' cy='85' r='8' fill='%23000'/%3E%3Ctext x='50' y='50' fill='yellow' font-size='30'%3E😊%3C/text%3E%3C/svg%3E",
        girls_yard: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23F5DEB3'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23FF1493'/%3E%3Ccircle cx='70' cy='150' r='30' fill='%23FF69B4'/%3E%3Ccircle cx='180' cy='150' r='30' fill='%2393CCEA'/%3E%3Ctext x='30' y='70' fill='green' font-size='30'%3E🌳%3C/text%3E%3C/svg%3E",
        ksusha_talking: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23FF69B4'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23FF1493'/%3E%3Ccircle cx='95' cy='85' r='8' fill='%23000'/%3E%3Ccircle cx='155' cy='85' r='8' fill='%23000'/%3E%3Ctext x='50' y='50' fill='white' font-size='30'%3E💬%3C/text%3E%3C/svg%3E",
        blonde_thinking4: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23F5DEB3'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23FF1493'/%3E%3Ccircle cx='95' cy='85' r='8' fill='%23000'/%3E%3Ccircle cx='155' cy='85' r='8' fill='%23000'/%3E%3Ctext x='180' y='70' fill='white' font-size='30'%3E💭%3C/text%3E%3C/svg%3E",
        secret: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23F5DEB3'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23FF1493'/%3E%3Ccircle cx='95' cy='85' r='8' fill='%23000'/%3E%3Ccircle cx='155' cy='85' r='8' fill='%23000'/%3E%3Ctext x='50' y='50' fill='purple' font-size='30'%3E🤫%3C/text%3E%3C/svg%3E",
        blonde_suspicious: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23F5DEB3'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23FF1493'/%3E%3Ccircle cx='95' cy='85' r='8' fill='%23000'/%3E%3Ccircle cx='155' cy='85' r='8' fill='%23000'/%3E%3Ctext x='50' y='50' fill='yellow' font-size='30'%3E🤨%3C/text%3E%3C/svg%3E",
        blonde_thinking5: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23F5DEB3'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23FF1493'/%3E%3Ccircle cx='95' cy='85' r='8' fill='%23000'/%3E%3Ccircle cx='155' cy='85' r='8' fill='%23000'/%3E%3Ctext x='180' y='70' fill='white' font-size='30'%3E💭%3C/text%3E%3C/svg%3E",
        blonde_careful: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23F5DEB3'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23FF1493'/%3E%3Ccircle cx='95' cy='85' r='8' fill='%23000'/%3E%3Ccircle cx='155' cy='85' r='8' fill='%23000'/%3E%3Ctext x='50' y='50' fill='yellow' font-size='30'%3E⚠️%3C/text%3E%3C/svg%3E",
        ksusha_suspicious: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23FF69B4'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23FF1493'/%3E%3Ccircle cx='95' cy='85' r='8' fill='%23000'/%3E%3Ccircle cx='155' cy='85' r='8' fill='%23000'/%3E%3Ctext x='50' y='50' fill='yellow' font-size='30'%3E🤨%3C/text%3E%3C/svg%3E",
        alisa_suspicious: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%2393CCEA'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%234169E1'/%3E%3Ccircle cx='95' cy='85' r='8' fill='%23000'/%3E%3Ccircle cx='155' cy='85' r='8' fill='%23000'/%3E%3Ctext x='50' y='50' fill='yellow' font-size='30'%3E🤨%3C/text%3E%3C/svg%3E",
        blonde_summary: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23F5DEB3'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23FF1493'/%3E%3Ccircle cx='95' cy='85' r='8' fill='%23000'/%3E%3Ccircle cx='155' cy='85' r='8' fill='%23000'/%3E%3Ctext x='50' y='50' fill='white' font-size='30'%3E✅%3C/text%3E%3C/svg%3E",
        girls_laughing: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23F5DEB3'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23FF1493'/%3E%3Ccircle cx='70' cy='150' r='30' fill='%23FF69B4'/%3E%3Ccircle cx='180' cy='150' r='30' fill='%2393CCEA'/%3E%3Ctext x='30' y='70' fill='gold' font-size='30'%3E😂%3C/text%3E%3C/svg%3E",
        eavesdropping: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23800080'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23550055'/%3E%3Ccircle cx='95' cy='85' r='8' fill='%23000'/%3E%3Ccircle cx='155' cy='85' r='8' fill='%23000'/%3E%3Ctext x='50' y='50' fill='white' font-size='30'%3E👂%3C/text%3E%3C/svg%3E",
        kristina_listening: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23800080'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23550055'/%3E%3Ccircle cx='95' cy='85' r='8' fill='%23000'/%3E%3Ccircle cx='155' cy='85' r='8' fill='%23000'/%3E%3Ctext x='50' y='50' fill='white' font-size='30'%3E👂%3C/text%3E%3C/svg%3E",
        kristina_whisper: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23800080'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23550055'/%3E%3Ccircle cx='95' cy='85' r='8' fill='%23000'/%3E%3Ccircle cx='155' cy='85' r='8' fill='%23000'/%3E%3Ctext x='50' y='50' fill='white' font-size='30'%3E🤫%3C/text%3E%3C/svg%3E",
        angry_eavesdrop: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23800080'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23550055'/%3E%3Ccircle cx='95' cy='85' r='8' fill='%23FF0000'/%3E%3Ccircle cx='155' cy='85' r='8' fill='%23FF0000'/%3E%3Ctext x='50' y='50' fill='red' font-size='30'%3E👂%3C/text%3E%3C/svg%3E",
        kristina_angry: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23800080'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23550055'/%3E%3Ccircle cx='95' cy='85' r='8' fill='%23FF0000'/%3E%3Ccircle cx='155' cy='85' r='8' fill='%23FF0000'/%3E%3Ctext x='50' y='50' fill='red' font-size='30'%3E😠%3C/text%3E%3C/svg%3E",
        menacing: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23800080'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23550055'/%3E%3Ccircle cx='95' cy='85' r='8' fill='%23FF0000'/%3E%3Ccircle cx='155' cy='85' r='8' fill='%23FF0000'/%3E%3Ctext x='50' y='50' fill='black' font-size='30'%3E😈%3C/text%3E%3C/svg%3E",
        kristina_leaving: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23800080'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23550055'/%3E%3Ccircle cx='95' cy='85' r='8' fill='%23000'/%3E%3Ccircle cx='155' cy='85' r='8' fill='%23000'/%3E%3Ctext x='50' y='50' fill='white' font-size='30'%3E🚶%3C/text%3E%3C/svg%3E",
        dusk: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23F5DEB3'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23FF1493'/%3E%3Ccircle cx='95' cy='85' r='8' fill='%23000'/%3E%3Ccircle cx='155' cy='85' r='8' fill='%23000'/%3E%3Ctext x='30' y='50' fill='purple' font-size='30'%3E🌆%3C/text%3E%3C/svg%3E",
        girls_return: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23F5DEB3'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23FF1493'/%3E%3Ccircle cx='70' cy='150' r='30' fill='%23FF69B4'/%3E%3Ccircle cx='180' cy='150' r='30' fill='%2393CCEA'/%3E%3Ctext x='30' y='70' fill='white' font-size='30'%3E🚶%3C/text%3E%3C/svg%3E",
        girls_inside: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23F5DEB3'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23FF1493'/%3E%3Ccircle cx='70' cy='150' r='30' fill='%23FF69B4'/%3E%3Ccircle cx='180' cy='150' r='30' fill='%2393CCEA'/%3E%3Ctext x='30' y='70' fill='white' font-size='30'%3E🏠%3C/text%3E%3C/svg%3E",
        ksusha_asking: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23FF69B4'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23FF1493'/%3E%3Ccircle cx='95' cy='85' r='8' fill='%23000'/%3E%3Ccircle cx='155' cy='85' r='8' fill='%23000'/%3E%3Ctext x='50' y='50' fill='white' font-size='30'%3E❓%3C/text%3E%3C/svg%3E",
        blonde_thinking6: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23F5DEB3'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23FF1493'/%3E%3Ccircle cx='95' cy='85' r='8' fill='%23000'/%3E%3Ccircle cx='155' cy='85' r='8' fill='%23000'/%3E%3Ctext x='180' y='70' fill='white' font-size='30'%3E💭%3C/text%3E%3C/svg%3E",
        quiet_night: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23F5DEB3'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23FF1493'/%3E%3Ccircle cx='95' cy='85' r='8' fill='%23000'/%3E%3Ccircle cx='155' cy='85' r='8' fill='%23000'/%3E%3Ctext x='30' y='50' fill='white' font-size='30'%3E🌙%3C/text%3E%3C/svg%3E",
        blonde_confident2: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23F5DEB3'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23FF1493'/%3E%3Ccircle cx='95' cy='85' r='8' fill='%23000'/%3E%3Ccircle cx='155' cy='85' r='8' fill='%23000'/%3E%3Ctext x='50' y='50' fill='gold' font-size='30'%3E💪%3C/text%3E%3C/svg%3E",
        uncertain: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23F5DEB3'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23FF1493'/%3E%3Ccircle cx='95' cy='85' r='8' fill='%23000'/%3E%3Ccircle cx='155' cy='85' r='8' fill='%23000'/%3E%3Ctext x='50' y='50' fill='gray' font-size='30'%3E🤷%3C/text%3E%3C/svg%3E",
        blonde_uncertain: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23F5DEB3'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23FF1493'/%3E%3Ccircle cx='95' cy='85' r='8' fill='%23000'/%3E%3Ccircle cx='155' cy='85' r='8' fill='%23000'/%3E%3Ctext x='50' y='50' fill='gray' font-size='30'%3E🤷%3C/text%3E%3C/svg%3E",
        determined: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23F5DEB3'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23FF1493'/%3E%3Ccircle cx='95' cy='85' r='8' fill='%23000'/%3E%3Ccircle cx='155' cy='85' r='8' fill='%23000'/%3E%3Ctext x='50' y='50' fill='red' font-size='30'%3E🔥%3C/text%3E%3C/svg%3E",
        blonde_determined: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23F5DEB3'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23FF1493'/%3E%3Ccircle cx='95' cy='85' r='8' fill='%23000'/%3E%3Ccircle cx='155' cy='85' r='8' fill='%23000'/%3E%3Ctext x='50' y='50' fill='red' font-size='30'%3E🔥%3C/text%3E%3C/svg%3E",
        alisa_hopeful: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%2393CCEA'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%234169E1'/%3E%3Ccircle cx='95' cy='85' r='8' fill='%23000'/%3E%3Ccircle cx='155' cy='85' r='8' fill='%23000'/%3E%3Ctext x='50' y='50' fill='yellow' font-size='30'%3E🌟%3C/text%3E%3C/svg%3E",
        night: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23333'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23333'/%3E%3Ccircle cx='95' cy='85' r='8' fill='%23FFD700'/%3E%3Ccircle cx='155' cy='85' r='8' fill='%23FFD700'/%3E%3Ctext x='30' y='50' fill='white' font-size='30'%3E🌙%3C/text%3E%3C/svg%3E",
        girls_sleeping: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23F5DEB3'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23FF1493'/%3E%3Ccircle cx='70' cy='150' r='30' fill='%23FF69B4'/%3E%3Ccircle cx='180' cy='150' r='30' fill='%2393CCEA'/%3E%3Ctext x='30' y='70' fill='white' font-size='30'%3E💤%3C/text%3E%3C/svg%3E",
        dark: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Crect width='250' height='250' fill='black'/%3E%3Ccircle cx='125' cy='100' r='55' fill='%23333'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23333'/%3E%3C/svg%3E",
        kristina_dark: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23800080'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23550055'/%3E%3Ccircle cx='95' cy='85' r='8' fill='%23FF0000'/%3E%3Ccircle cx='155' cy='85' r='8' fill='%23FF0000'/%3E%3Ctext x='50' y='50' fill='red' font-size='30'%3E🌑%3C/text%3E%3C/svg%3E",
        kristina_vengeful: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23800080'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23550055'/%3E%3Ccircle cx='95' cy='85' r='8' fill='%23FF0000'/%3E%3Ccircle cx='155' cy='85' r='8' fill='%23FF0000'/%3E%3Ctext x='50' y='50' fill='red' font-size='30'%3E😈%3C/text%3E%3C/svg%3E",
        // НОВЫЕ ИЗОБРАЖЕНИЯ ДЛЯ 5 СЕРИИ
        blonde_proud: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23F5DEB3'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23FF1493'/%3E%3Ccircle cx='95' cy='85' r='8' fill='%23000'/%3E%3Ccircle cx='155' cy='85' r='8' fill='%23000'/%3E%3Ctext x='170' y='70' fill='gold' font-size='30'%3E👑%3C/text%3E%3C/svg%3E",
        ksusha_gossip: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23FF69B4'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23FF1493'/%3E%3Ccircle cx='95' cy='85' r='8' fill='%23000'/%3E%3Ccircle cx='155' cy='85' r='8' fill='%23000'/%3E%3Ctext x='30' y='50' fill='purple' font-size='30'%3E💬%3C/text%3E%3C/svg%3E",
        alisa_gossip: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%2393CCEA'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%234169E1'/%3E%3Ccircle cx='95' cy='85' r='8' fill='%23000'/%3E%3Ccircle cx='155' cy='85' r='8' fill='%23000'/%3E%3Ctext x='30' y='50' fill='purple' font-size='30'%3E💬%3C/text%3E%3C/svg%3E",
        blonde_gossip: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23F5DEB3'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23FF1493'/%3E%3Ccircle cx='95' cy='85' r='8' fill='%23000'/%3E%3Ccircle cx='155' cy='85' r='8' fill='%23000'/%3E%3Ctext x='30' y='50' fill='purple' font-size='30'%3E💬%3C/text%3E%3C/svg%3E",
        blonde_mocking: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23F5DEB3'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23FF1493'/%3E%3Ccircle cx='95' cy='85' r='8' fill='%23000'/%3E%3Ccircle cx='155' cy='85' r='8' fill='%23000'/%3E%3Ctext x='50' y='50' fill='yellow' font-size='30'%3E😏%3C/text%3E%3C/svg%3E",
        blonde_annoyed: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23F5DEB3'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23FF1493'/%3E%3Ccircle cx='95' cy='85' r='8' fill='%23000'/%3E%3Ccircle cx='155' cy='85' r='8' fill='%23000'/%3E%3Ctext x='50' y='50' fill='red' font-size='30'%3E😤%3C/text%3E%3C/svg%3E",
        blonde_laughing3: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23F5DEB3'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23FF1493'/%3E%3Ccircle cx='95' cy='85' r='8' fill='%23000'/%3E%3Ccircle cx='155' cy='85' r='8' fill='%23000'/%3E%3Ctext x='50' y='50' fill='gold' font-size='30'%3E😂%3C/text%3E%3C/svg%3E",
        ksusha_talking2: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23FF69B4'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23FF1493'/%3E%3Ccircle cx='95' cy='85' r='8' fill='%23000'/%3E%3Ccircle cx='155' cy='85' r='8' fill='%23000'/%3E%3Ctext x='50' y='50' fill='white' font-size='30'%3E💬%3C/text%3E%3C/svg%3E",
        alisa_mocking: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%2393CCEA'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%234169E1'/%3E%3Ccircle cx='95' cy='85' r='8' fill='%23000'/%3E%3Ccircle cx='155' cy='85' r='8' fill='%23000'/%3E%3Ctext x='50' y='50' fill='yellow' font-size='30'%3E😏%3C/text%3E%3C/svg%3E",
        blonde_thinking7: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23F5DEB3'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23FF1493'/%3E%3Ccircle cx='95' cy='85' r='8' fill='%23000'/%3E%3Ccircle cx='155' cy='85' r='8' fill='%23000'/%3E%3Ctext x='180' y='70' fill='white' font-size='30'%3E💭%3C/text%3E%3C/svg%3E",
        blonde_suspicious2: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23F5DEB3'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23FF1493'/%3E%3Ccircle cx='95' cy='85' r='8' fill='%23000'/%3E%3Ccircle cx='155' cy='85' r='8' fill='%23000'/%3E%3Ctext x='50' y='50' fill='yellow' font-size='30'%3E🤨%3C/text%3E%3C/svg%3E",
        blonde_snobby2: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23F5DEB3'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23FF1493'/%3E%3Ccircle cx='95' cy='85' r='8' fill='%23000'/%3E%3Ccircle cx='155' cy='85' r='8' fill='%23000'/%3E%3Ctext x='50' y='50' fill='gold' font-size='30'%3E👑%3C/text%3E%3C/svg%3E",
        blonde_dismiss2: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23F5DEB3'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23FF1493'/%3E%3Ccircle cx='95' cy='85' r='8' fill='%23000'/%3E%3Ccircle cx='155' cy='85' r='8' fill='%23000'/%3E%3Ctext x='50' y='50' fill='white' font-size='30'%3E👋%3C/text%3E%3C/svg%3E",
        girls_evening2: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23F5DEB3'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23FF1493'/%3E%3Ccircle cx='70' cy='150' r='30' fill='%23FF69B4'/%3E%3Ccircle cx='180' cy='150' r='30' fill='%2393CCEA'/%3E%3Ctext x='30' y='70' fill='blue' font-size='30'%3E🌙%3C/text%3E%3C/svg%3E",
        broken_window: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23F5DEB3'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23FF1493'/%3E%3Cpath d='M50 50 L200 200 M200 50 L50 200' stroke='white' stroke-width='5'/%3E%3C/svg%3E",
        ksusha_panic3: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23FF69B4'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23FF1493'/%3E%3Ccircle cx='95' cy='85' r='10' fill='white'/%3E%3Ccircle cx='155' cy='85' r='10' fill='white'/%3E%3Ctext x='50' y='50' fill='red' font-size='30'%3E😱%3C/text%3E%3C/svg%3E",
        stones_falling: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23F5DEB3'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23FF1493'/%3E%3Ctext x='30' y='50' fill='gray' font-size='30'%3E🪨%3C/text%3E%3C/svg%3E",
        gunfire: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23F5DEB3'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23FF1493'/%3E%3Ctext x='30' y='50' fill='orange' font-size='30'%3E🔫%3C/text%3E%3C/svg%3E",
        girls_cowering: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23F5DEB3'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23FF1493'/%3E%3Ccircle cx='70' cy='150' r='30' fill='%23FF69B4'/%3E%3Ccircle cx='180' cy='150' r='30' fill='%2393CCEA'/%3E%3Ctext x='30' y='70' fill='red' font-size='30'%3E😨%3C/text%3E%3C/svg%3E",
        megaphone: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23808080'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23000080'/%3E%3Ctext x='50' y='50' fill='white' font-size='30'%3E📢%3C/text%3E%3C/svg%3E",
        blonde_horror2: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23F5DEB3'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23FF1493'/%3E%3Ccircle cx='95' cy='85' r='10' fill='white'/%3E%3Ccircle cx='155' cy='85' r='10' fill='white'/%3E%3Ctext x='50' y='50' fill='red' font-size='30'%3E😱%3C/text%3E%3C/svg%3E",
        alisa_horror: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%2393CCEA'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%234169E1'/%3E%3Ccircle cx='95' cy='85' r='10' fill='white'/%3E%3Ccircle cx='155' cy='85' r='10' fill='white'/%3E%3Ctext x='50' y='50' fill='red' font-size='30'%3E😱%3C/text%3E%3C/svg%3E",
        recognizing_enemies: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23F5DEB3'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23FF1493'/%3E%3Ctext x='30' y='50' fill='red' font-size='30'%3E👥%3C/text%3E%3C/svg%3E",
        blonde_panic: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23F5DEB3'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23FF1493'/%3E%3Ccircle cx='95' cy='85' r='10' fill='white'/%3E%3Ccircle cx='155' cy='85' r='10' fill='white'/%3E%3Ctext x='50' y='50' fill='red' font-size='30'%3E😰%3C/text%3E%3C/svg%3E",
        barricading: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23F5DEB3'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23FF1493'/%3E%3Ctext x='30' y='50' fill='brown' font-size='30'%3E🪑%3C/text%3E%3C/svg%3E",
        basement: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23333'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23333'/%3E%3Ctext x='30' y='50' fill='white' font-size='30'%3E⬇️%3C/text%3E%3C/svg%3E",
        weapons: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23F5DEB3'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23FF1493'/%3E%3Ctext x='30' y='50' fill='gray' font-size='30'%3E⚔️%3C/text%3E%3C/svg%3E",
        preparing: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23F5DEB3'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23FF1493'/%3E%3Ccircle cx='70' cy='150' r='30' fill='%23FF69B4'/%3E%3Ccircle cx='180' cy='150' r='30' fill='%2393CCEA'/%3E%3Ctext x='30' y='70' fill='white' font-size='30'%3E🏃%3C/text%3E%3C/svg%3E",
        ksusha_scared: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23FF69B4'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23FF1493'/%3E%3Ccircle cx='95' cy='85' r='8' fill='%23000'/%3E%3Ccircle cx='155' cy='85' r='8' fill='%23000'/%3E%3Ctext x='50' y='50' fill='blue' font-size='30'%3E😨%3C/text%3E%3C/svg%3E",
        blonde_comforting: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23F5DEB3'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23FF1493'/%3E%3Ccircle cx='70' cy='150' r='30' fill='%23FF69B4'/%3E%3Ctext x='30' y='70' fill='white' font-size='30'%3E🤗%3C/text%3E%3C/svg%3E",
        blonde_determined2: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23F5DEB3'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23FF1493'/%3E%3Ccircle cx='95' cy='85' r='8' fill='%23000'/%3E%3Ccircle cx='155' cy='85' r='8' fill='%23000'/%3E%3Ctext x='50' y='50' fill='red' font-size='30'%3E🔥%3C/text%3E%3C/svg%3E",
        blonde_commanding: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23F5DEB3'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23FF1493'/%3E%3Ccircle cx='95' cy='85' r='8' fill='%23000'/%3E%3Ccircle cx='155' cy='85' r='8' fill='%23000'/%3E%3Ctext x='50' y='50' fill='red' font-size='30'%3E👑%3C/text%3E%3C/svg%3E",
        girls_hug3: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23F5DEB3'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23FF1493'/%3E%3Ccircle cx='70' cy='150' r='30' fill='%23FF69B4'/%3E%3Ccircle cx='180' cy='150' r='30' fill='%2393CCEA'/%3E%3Ctext x='30' y='70' fill='pink' font-size='30'%3E🤗%3C/text%3E%3C/svg%3E",
        alisa_weapons: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%2393CCEA'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%234169E1'/%3E%3Ccircle cx='95' cy='85' r='8' fill='%23000'/%3E%3Ccircle cx='155' cy='85' r='8' fill='%23000'/%3E%3Ctext x='30' y='50' fill='gray' font-size='30'%3E⚾%3C/text%3E%3C/svg%3E",
        blonde_weapon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23F5DEB3'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23FF1493'/%3E%3Ccircle cx='95' cy='85' r='8' fill='%23000'/%3E%3Ccircle cx='155' cy='85' r='8' fill='%23000'/%3E%3Ctext x='30' y='50' fill='gray' font-size='30'%3E🏒%3C/text%3E%3C/svg%3E",
        waiting2: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23F5DEB3'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23FF1493'/%3E%3Ccircle cx='95' cy='85' r='8' fill='%23000'/%3E%3Ccircle cx='155' cy='85' r='8' fill='%23000'/%3E%3Ctext x='50' y='50' fill='white' font-size='30'%3E⏳%3C/text%3E%3C/svg%3E",
        door_banging: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23F5DEB3'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23FF1493'/%3E%3Ctext x='30' y='50' fill='brown' font-size='30'%3E🚪%3C/text%3E%3C/svg%3E",
        ksusha_panic4: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23FF69B4'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23FF1493'/%3E%3Ccircle cx='95' cy='85' r='10' fill='white'/%3E%3Ccircle cx='155' cy='85' r='10' fill='white'/%3E%3Ctext x='50' y='50' fill='red' font-size='30'%3E😱%3C/text%3E%3C/svg%3E",
        blonde_choosing: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23F5DEB3'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23FF1493'/%3E%3Ccircle cx='95' cy='85' r='8' fill='%23000'/%3E%3Ccircle cx='155' cy='85' r='8' fill='%23000'/%3E%3Ctext x='180' y='70' fill='white' font-size='30'%3E❓%3C/text%3E%3C/svg%3E",
        battle_ready: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23F5DEB3'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23FF1493'/%3E%3Ccircle cx='70' cy='150' r='30' fill='%23FF69B4'/%3E%3Ccircle cx='180' cy='150' r='30' fill='%2393CCEA'/%3E%3Ctext x='30' y='70' fill='red' font-size='30'%3E⚔️%3C/text%3E%3C/svg%3E",
        girls_ready: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23F5DEB3'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23FF1493'/%3E%3Ccircle cx='70' cy='150' r='30' fill='%23FF69B4'/%3E%3Ccircle cx='180' cy='150' r='30' fill='%2393CCEA'/%3E%3Ctext x='30' y='70' fill='red' font-size='30'%3E⚔️%3C/text%3E%3C/svg%3E",
        sneaky: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23F5DEB3'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23FF1493'/%3E%3Ccircle cx='70' cy='150' r='30' fill='%23FF69B4'/%3E%3Ccircle cx='180' cy='150' r='30' fill='%2393CCEA'/%3E%3Ctext x='30' y='70' fill='white' font-size='30'%3E🤫%3C/text%3E%3C/svg%3E",
        girls_hiding: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23F5DEB3'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23FF1493'/%3E%3Ccircle cx='70' cy='150' r='30' fill='%23FF69B4'/%3E%3Ccircle cx='180' cy='150' r='30' fill='%2393CCEA'/%3E%3Ctext x='30' y='70' fill='white' font-size='30'%3E🤫%3C/text%3E%3C/svg%3E",
        girls_corridor: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23F5DEB3'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23FF1493'/%3E%3Ccircle cx='70' cy='150' r='30' fill='%23FF69B4'/%3E%3Ccircle cx='180' cy='150' r='30' fill='%2393CCEA'/%3E%3Ctext x='30' y='70' fill='white' font-size='30'%3E🚪%3C/text%3E%3C/svg%3E",
        door_broken: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23F5DEB3'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23FF1493'/%3E%3Cpath d='M50 50 L200 200 M200 50 L50 200' stroke='red' stroke-width='5'/%3E%3C/svg%3E",
        enemy_charge: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23F5DEB3'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23FF1493'/%3E%3Ctext x='30' y='50' fill='red' font-size='30'%3E🏃%3C/text%3E%3C/svg%3E",
        blonde_fight: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23F5DEB3'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23FF1493'/%3E%3Ccircle cx='95' cy='85' r='8' fill='%23FF0000'/%3E%3Ccircle cx='155' cy='85' r='8' fill='%23FF0000'/%3E%3Ctext x='30' y='50' fill='red' font-size='30'%3E⚔️%3C/text%3E%3C/svg%3E",
        blonde_hitting: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23F5DEB3'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23FF1493'/%3E%3Ccircle cx='95' cy='85' r='8' fill='%23FF0000'/%3E%3Ccircle cx='155' cy='85' r='8' fill='%23FF0000'/%3E%3Ctext x='30' y='50' fill='red' font-size='30'%3E💥%3C/text%3E%3C/svg%3E",
        blonde_dodging: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23F5DEB3'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23FF1493'/%3E%3Ccircle cx='95' cy='85' r='8' fill='%23000'/%3E%3Ccircle cx='155' cy='85' r='8' fill='%23000'/%3E%3Ctext x='30' y='50' fill='white' font-size='30'%3E↩️%3C/text%3E%3C/svg%3E",
        blonde_screaming: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23F5DEB3'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23FF1493'/%3E%3Ccircle cx='95' cy='85' r='10' fill='white'/%3E%3Ccircle cx='155' cy='85' r='10' fill='white'/%3E%3Ctext x='30' y='50' fill='red' font-size='30'%3E🔊%3C/text%3E%3C/svg%3E",
        ksusha_fighting: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23FF69B4'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23FF1493'/%3E%3Ccircle cx='95' cy='85' r='8' fill='%23FF0000'/%3E%3Ccircle cx='155' cy='85' r='8' fill='%23FF0000'/%3E%3Ctext x='30' y='50' fill='red' font-size='30'%3E⚾%3C/text%3E%3C/svg%3E",
        alisa_fighting: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%2393CCEA'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%234169E1'/%3E%3Ccircle cx='95' cy='85' r='8' fill='%23FF0000'/%3E%3Ccircle cx='155' cy='85' r='8' fill='%23FF0000'/%3E%3Ctext x='30' y='50' fill='red' font-size='30'%3E🍳%3C/text%3E%3C/svg%3E",
        inmate_enemies: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23F5DEB3'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23FF1493'/%3E%3Ccircle cx='40' cy='150' r='25' fill='%238B4513'/%3E%3Ccircle cx='80' cy='200' r='25' fill='%23A0522D'/%3E%3Ccircle cx='210' cy='150' r='25' fill='%238B4513'/%3E%3Ctext x='30' y='70' fill='red' font-size='30'%3E🔒%3C/text%3E%3C/svg%3E",
        blonde_vs_inmates: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23F5DEB3'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23FF1493'/%3E%3Ccircle cx='40' cy='150' r='25' fill='%238B4513'/%3E%3Ccircle cx='210' cy='150' r='25' fill='%23A0522D'/%3E%3C/svg%3E",
        blonde_fighting2: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23F5DEB3'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23FF1493'/%3E%3Ccircle cx='95' cy='85' r='8' fill='%23FF0000'/%3E%3Ccircle cx='155' cy='85' r='8' fill='%23FF0000'/%3E%3Ctext x='30' y='50' fill='red' font-size='30'%3E💪%3C/text%3E%3C/svg%3E",
        blonde_talking: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23F5DEB3'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23FF1493'/%3E%3Ccircle cx='95' cy='85' r='8' fill='%23000'/%3E%3Ccircle cx='155' cy='85' r='8' fill='%23000'/%3E%3Ctext x='30' y='50' fill='white' font-size='30'%3E💬%3C/text%3E%3C/svg%3E",
        girls_fighting_together: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23F5DEB3'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23FF1493'/%3E%3Ccircle cx='70' cy='150' r='30' fill='%23FF69B4'/%3E%3Ccircle cx='180' cy='150' r='30' fill='%2393CCEA'/%3E%3Ctext x='30' y='70' fill='red' font-size='30'%3E⚔️%3C/text%3E%3C/svg%3E",
        kristina_watching: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23800080'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23550055'/%3E%3Ccircle cx='95' cy='85' r='8' fill='%23FF0000'/%3E%3Ccircle cx='155' cy='85' r='8' fill='%23FF0000'/%3E%3Ctext x='50' y='50' fill='white' font-size='30'%3E👁️%3C/text%3E%3C/svg%3E",
        kristina_threatening: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23800080'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23550055'/%3E%3Ccircle cx='95' cy='85' r='8' fill='%23FF0000'/%3E%3Ccircle cx='155' cy='85' r='8' fill='%23FF0000'/%3E%3Ctext x='50' y='50' fill='red' font-size='30'%3E😈%3C/text%3E%3C/svg%3E",
        blonde_vs_kristina: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23F5DEB3'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23FF1493'/%3E%3Ccircle cx='180' cy='70' r='20' fill='%23800080'/%3E%3C/svg%3E",
        blonde_angry2: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23F5DEB3'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23FF1493'/%3E%3Ccircle cx='95' cy='85' r='8' fill='%23FF0000'/%3E%3Ccircle cx='155' cy='85' r='8' fill='%23FF0000'/%3E%3Ctext x='30' y='50' fill='red' font-size='30'%3E😠%3C/text%3E%3C/svg%3E",
        blonde_explaining: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23F5DEB3'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23FF1493'/%3E%3Ccircle cx='95' cy='85' r='8' fill='%23000'/%3E%3Ccircle cx='155' cy='85' r='8' fill='%23000'/%3E%3Ctext x='30' y='50' fill='white' font-size='30'%3E🗣️%3C/text%3E%3C/svg%3E",
        blonde_challenging: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23F5DEB3'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23FF1493'/%3E%3Ccircle cx='95' cy='85' r='8' fill='%23FF0000'/%3E%3Ccircle cx='155' cy='85' r='8' fill='%23FF0000'/%3E%3Ctext x='30' y='50' fill='red' font-size='30'%3E👊%3C/text%3E%3C/svg%3E",
        kristina_retreat: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23800080'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23550055'/%3E%3Ccircle cx='95' cy='85' r='8' fill='%23000'/%3E%3Ccircle cx='155' cy='85' r='8' fill='%23000'/%3E%3Ctext x='50' y='50' fill='white' font-size='30'%3E🚶%3C/text%3E%3C/svg%3E",
        kristina_disappears: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23333'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23333'/%3E%3Ctext x='50' y='50' fill='white' font-size='30'%3E👻%3C/text%3E%3C/svg%3E",
        fighting_continues: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23F5DEB3'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23FF1493'/%3E%3Ccircle cx='70' cy='150' r='30' fill='%23FF69B4'/%3E%3Ccircle cx='180' cy='150' r='30' fill='%2393CCEA'/%3E%3Ctext x='30' y='70' fill='red' font-size='30'%3E⚔️%3C/text%3E%3C/svg%3E",
        helpers_attack_alisa: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%2393CCEA'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%234169E1'/%3E%3Ccircle cx='40' cy='150' r='25' fill='%23FFC0CB'/%3E%3Ccircle cx='80' cy='200' r='25' fill='%23FFC0CB'/%3E%3Ccircle cx='210' cy='150' r='25' fill='%23FFC0CB'/%3E%3Ctext x='30' y='100' fill='red' font-size='30'%3E⚔️%3C/text%3E%3C/svg%3E",
        blonde_see_alisa: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23F5DEB3'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23FF1493'/%3E%3Ccircle cx='180' cy='70' r='20' fill='%2393CCEA'/%3E%3C/svg%3E",
        blonde_running_save: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23F5DEB3'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23FF1493'/%3E%3Ccircle cx='95' cy='85' r='8' fill='%23FF0000'/%3E%3Ccircle cx='155' cy='85' r='8' fill='%23FF0000'/%3E%3Ctext x='30' y='50' fill='red' font-size='30'%3E🏃%3C/text%3E%3C/svg%3E",
        girls_save_alisa: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23F5DEB3'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23FF1493'/%3E%3Ccircle cx='70' cy='150' r='30' fill='%23FF69B4'/%3E%3Ccircle cx='180' cy='150' r='30' fill='%2393CCEA'/%3E%3Ctext x='30' y='70' fill='red' font-size='30'%3E🏃%3C/text%3E%3C/svg%3E",
        blonde_throwing2: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23F5DEB3'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23FF1493'/%3E%3Ccircle cx='95' cy='85' r='8' fill='%23FF0000'/%3E%3Ccircle cx='155' cy='85' r='8' fill='%23FF0000'/%3E%3Ctext x='30' y='50' fill='red' font-size='30'%3E💢%3C/text%3E%3C/svg%3E",
        alisa_grateful2: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%2393CCEA'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%234169E1'/%3E%3Ccircle cx='95' cy='85' r='8' fill='%23000'/%3E%3Ccircle cx='155' cy='85' r='8' fill='%23000'/%3E%3Ctext x='50' y='50' fill='white' font-size='30'%3E🙏%3C/text%3E%3C/svg%3E",
        girls_together: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23F5DEB3'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23FF1493'/%3E%3Ccircle cx='70' cy='150' r='30' fill='%23FF69B4'/%3E%3Ccircle cx='180' cy='150' r='30' fill='%2393CCEA'/%3E%3Ctext x='30' y='70' fill='white' font-size='30'%3E🤝%3C/text%3E%3C/svg%3E",
        andrey_hiding: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23000080'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23000050'/%3E%3Ccircle cx='95' cy='85' r='8' fill='%23000'/%3E%3Ccircle cx='155' cy='85' r='8' fill='%23000'/%3E%3Ctext x='50' y='50' fill='white' font-size='30'%3E🙈%3C/text%3E%3C/svg%3E",
        blonde_see_andrey: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23F5DEB3'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23FF1493'/%3E%3Ccircle cx='180' cy='70' r='20' fill='%23000080'/%3E%3C/svg%3E",
        contempt2: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23F5DEB3'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23FF1493'/%3E%3Ccircle cx='95' cy='85' r='8' fill='%23000'/%3E%3Ccircle cx='155' cy='85' r='8' fill='%23000'/%3E%3Ctext x='50' y='50' fill='yellow' font-size='30'%3E😒%3C/text%3E%3C/svg%3E",
        blonde_ignore: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23F5DEB3'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23FF1493'/%3E%3Ccircle cx='95' cy='85' r='8' fill='%23000'/%3E%3Ccircle cx='155' cy='85' r='8' fill='%23000'/%3E%3Ctext x='50' y='50' fill='white' font-size='30'%3E🙄%3C/text%3E%3C/svg%3E",
        blonde_vs_andrey: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23F5DEB3'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23FF1493'/%3E%3Ccircle cx='180' cy='70' r='20' fill='%23000080'/%3E%3Ctext x='30' y='50' fill='red' font-size='30'%3E⚔️%3C/text%3E%3C/svg%3E",
        blonde_shouting: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23F5DEB3'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23FF1493'/%3E%3Ccircle cx='95' cy='85' r='10' fill='white'/%3E%3Ccircle cx='155' cy='85' r='10' fill='white'/%3E%3Ctext x='30' y='50' fill='red' font-size='30'%3E🔊%3C/text%3E%3C/svg%3E",
        observing: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23F5DEB3'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23FF1493'/%3E%3Ccircle cx='95' cy='85' r='8' fill='%23000'/%3E%3Ccircle cx='155' cy='85' r='8' fill='%23000'/%3E%3Ctext x='50' y='50' fill='white' font-size='30'%3E👀%3C/text%3E%3C/svg%3E",
        enemies_disorganized: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23F5DEB3'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23FF1493'/%3E%3Ctext x='30' y='50' fill='red' font-size='30'%3E👥%3C/text%3E%3C/svg%3E",
        girls_team: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23F5DEB3'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23FF1493'/%3E%3Ccircle cx='70' cy='150' r='30' fill='%23FF69B4'/%3E%3Ccircle cx='180' cy='150' r='30' fill='%2393CCEA'/%3E%3Ctext x='30' y='70' fill='gold' font-size='30'%3E🤝%3C/text%3E%3C/svg%3E",
        victory_approaching: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23F5DEB3'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23FF1493'/%3E%3Ccircle cx='95' cy='85' r='8' fill='%23000'/%3E%3Ccircle cx='155' cy='85' r='8' fill='%23000'/%3E%3Ctext x='50' y='50' fill='gold' font-size='30'%3E🏆%3C/text%3E%3C/svg%3E",
        enemies_fleeing: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23F5DEB3'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23FF1493'/%3E%3Ctext x='30' y='50' fill='red' font-size='30'%3E🏃%3C/text%3E%3C/svg%3E",
        andrey_running: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23000080'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23000050'/%3E%3Ccircle cx='95' cy='85' r='8' fill='%23000'/%3E%3Ccircle cx='155' cy='85' r='8' fill='%23000'/%3E%3Ctext x='50' y='50' fill='white' font-size='30'%3E🏃%3C/text%3E%3C/svg%3E",
        last_enemy: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23F5DEB3'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23FF1493'/%3E%3Ccircle cx='80' cy='150' r='25' fill='%238B4513'/%3E%3C/svg%3E",
        blonde_last_choice: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23F5DEB3'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23FF1493'/%3E%3Ccircle cx='95' cy='85' r='8' fill='%23000'/%3E%3Ccircle cx='155' cy='85' r='8' fill='%23000'/%3E%3Ctext x='180' y='70' fill='white' font-size='30'%3E❓%3C/text%3E%3C/svg%3E",
        blonde_final_blow: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23F5DEB3'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23FF1493'/%3E%3Ccircle cx='95' cy='85' r='8' fill='%23FF0000'/%3E%3Ccircle cx='155' cy='85' r='8' fill='%23FF0000'/%3E%3Ctext x='30' y='50' fill='red' font-size='30'%3E💥%3C/text%3E%3C/svg%3E",
        enemy_runs: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%238B4513'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23666'/%3E%3Ccircle cx='95' cy='85' r='8' fill='%23000'/%3E%3Ccircle cx='155' cy='85' r='8' fill='%23000'/%3E%3Ctext x='50' y='50' fill='white' font-size='30'%3E🏃%3C/text%3E%3C/svg%3E",
        merciful: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23F5DEB3'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23FF1493'/%3E%3Ccircle cx='95' cy='85' r='8' fill='%23000'/%3E%3Ccircle cx='155' cy='85' r='8' fill='%23000'/%3E%3Ctext x='50' y='50' fill='white' font-size='30'%3E🕊️%3C/text%3E%3C/svg%3E",
        blonde_merciful: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23F5DEB3'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23FF1493'/%3E%3Ccircle cx='95' cy='85' r='8' fill='%23000'/%3E%3Ccircle cx='155' cy='85' r='8' fill='%23000'/%3E%3Ctext x='50' y='50' fill='white' font-size='30'%3E🕊️%3C/text%3E%3C/svg%3E",
        calm_after_storm: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23F5DEB3'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23FF1493'/%3E%3Ccircle cx='70' cy='150' r='30' fill='%23FF69B4'/%3E%3Ccircle cx='180' cy='150' r='30' fill='%2393CCEA'/%3E%3Ctext x='30' y='70' fill='white' font-size='30'%3E😮‍💨%3C/text%3E%3C/svg%3E",
        girls_after_battle: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23F5DEB3'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23FF1493'/%3E%3Ccircle cx='70' cy='150' r='30' fill='%23FF69B4'/%3E%3Ccircle cx='180' cy='150' r='30' fill='%2393CCEA'/%3E%3Ctext x='30' y='70' fill='white' font-size='30'%3E😮‍💨%3C/text%3E%3C/svg%3E",
        ksusha_relieved: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23FF69B4'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23FF1493'/%3E%3Ccircle cx='95' cy='85' r='8' fill='%23000'/%3E%3Ccircle cx='155' cy='85' r='8' fill='%23000'/%3E%3Ctext x='50' y='50' fill='white' font-size='30'%3E😌%3C/text%3E%3C/svg%3E",
        checking: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23F5DEB3'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23FF1493'/%3E%3Ccircle cx='70' cy='150' r='30' fill='%23FF69B4'/%3E%3Ccircle cx='180' cy='150' r='30' fill='%2393CCEA'/%3E%3Ctext x='30' y='70' fill='white' font-size='30'%3E🔍%3C/text%3E%3C/svg%3E",
        alisa_checking: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%2393CCEA'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%234169E1'/%3E%3Ccircle cx='95' cy='85' r='8' fill='%23000'/%3E%3Ccircle cx='155' cy='85' r='8' fill='%23000'/%3E%3Ctext x='50' y='50' fill='white' font-size='30'%3E🔍%3C/text%3E%3C/svg%3E",
        concerned: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23F5DEB3'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23FF1493'/%3E%3Ccircle cx='95' cy='85' r='8' fill='%23000'/%3E%3Ccircle cx='155' cy='85' r='8' fill='%23000'/%3E%3Ctext x='50' y='50' fill='white' font-size='30'%3E😟%3C/text%3E%3C/svg%3E",
        blonde_checking: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23F5DEB3'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23FF1493'/%3E%3Ccircle cx='95' cy='85' r='8' fill='%23000'/%3E%3Ccircle cx='155' cy='85' r='8' fill='%23000'/%3E%3Ctext x='50' y='50' fill='white' font-size='30'%3E🔍%3C/text%3E%3C/svg%3E",
        ksusha_ok: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23FF69B4'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23FF1493'/%3E%3Ccircle cx='95' cy='85' r='8' fill='%23000'/%3E%3Ccircle cx='155' cy='85' r='8' fill='%23000'/%3E%3Ctext x='50' y='50' fill='white' font-size='30'%3E👍%3C/text%3E%3C/svg%3E",
        alisa_ok: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%2393CCEA'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%234169E1'/%3E%3Ccircle cx='95' cy='85' r='8' fill='%23000'/%3E%3Ccircle cx='155' cy='85' r='8' fill='%23000'/%3E%3Ctext x='50' y='50' fill='white' font-size='30'%3E👍%3C/text%3E%3C/svg%3E",
        destroyed_house: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23F5DEB3'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23FF1493'/%3E%3Ctext x='30' y='50' fill='brown' font-size='30'%3E🏚️%3C/text%3E%3C/svg%3E",
        defeated_enemies: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23F5DEB3'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23FF1493'/%3E%3Ctext x='30' y='50' fill='red' font-size='30'%3E👥%3C/text%3E%3C/svg%3E",
        ksusha_mocking2: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23FF69B4'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23FF1493'/%3E%3Ccircle cx='95' cy='85' r='8' fill='%23000'/%3E%3Ccircle cx='155' cy='85' r='8' fill='%23000'/%3E%3Ctext x='50' y='50' fill='yellow' font-size='30'%3E😏%3C/text%3E%3C/svg%3E",
        alisa_laughing2: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%2393CCEA'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%234169E1'/%3E%3Ccircle cx='95' cy='85' r='8' fill='%23000'/%3E%3Ccircle cx='155' cy='85' r='8' fill='%23000'/%3E%3Ctext x='50' y='50' fill='gold' font-size='30'%3E😂%3C/text%3E%3C/svg%3E",
        reflecting: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23F5DEB3'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23FF1493'/%3E%3Ccircle cx='95' cy='85' r='8' fill='%23000'/%3E%3Ccircle cx='155' cy='85' r='8' fill='%23000'/%3E%3Ctext x='180' y='70' fill='white' font-size='30'%3E💭%3C/text%3E%3C/svg%3E",
        blonde_reflecting: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23F5DEB3'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23FF1493'/%3E%3Ccircle cx='95' cy='85' r='8' fill='%23000'/%3E%3Ccircle cx='155' cy='85' r='8' fill='%23000'/%3E%3Ctext x='180' y='70' fill='white' font-size='30'%3E💭%3C/text%3E%3C/svg%3E",
        wise: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23F5DEB3'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23FF1493'/%3E%3Ccircle cx='95' cy='85' r='8' fill='%23000'/%3E%3Ccircle cx='155' cy='85' r='8' fill='%23000'/%3E%3Ctext x='50' y='50' fill='gold' font-size='30'%3E🤔%3C/text%3E%3C/svg%3E",
        blonde_wise: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23F5DEB3'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23FF1493'/%3E%3Ccircle cx='95' cy='85' r='8' fill='%23000'/%3E%3Ccircle cx='155' cy='85' r='8' fill='%23000'/%3E%3Ctext x='50' y='50' fill='gold' font-size='30'%3E🤔%3C/text%3E%3C/svg%3E",
        blonde_analyzing: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23F5DEB3'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23FF1493'/%3E%3Ccircle cx='95' cy='85' r='8' fill='%23000'/%3E%3Ccircle cx='155' cy='85' r='8' fill='%23000'/%3E%3Ctext x='50' y='50' fill='white' font-size='30'%3E🔍%3C/text%3E%3C/svg%3E",
        blonde_proud2: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23F5DEB3'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23FF1493'/%3E%3Ccircle cx='95' cy='85' r='8' fill='%23000'/%3E%3Ccircle cx='155' cy='85' r='8' fill='%23000'/%3E%3Ctext x='170' y='70' fill='gold' font-size='30'%3E👑%3C/text%3E%3C/svg%3E",
        blonde_final2: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23F5DEB3'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23FF1493'/%3E%3Ccircle cx='95' cy='85' r='8' fill='%23000'/%3E%3Ccircle cx='155' cy='85' r='8' fill='%23000'/%3E%3Ctext x='30' y='50' fill='red' font-size='30'%3E🌑%3C/text%3E%3C/svg%3E",
        house_burning_far: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23F5DEB3'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23FF1493'/%3E%3Ctext x='30' y='50' fill='orange' font-size='30'%3E🔥%3C/text%3E%3C/svg%3E",
        blonde_crying_talking: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23F5DEB3'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23FF1493'/%3E%3Ccircle cx='95' cy='85' r='8' fill='%23000'/%3E%3Ccircle cx='155' cy='85' r='8' fill='%23000'/%3E%3Ctext x='30' y='50' fill='blue' font-size='30'%3E😢%3C/text%3E%3C/svg%3E",
        kristina_quiet: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%23800080'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%23550055'/%3E%3Ccircle cx='95' cy='85' r='8' fill='%23000'/%3E%3Ccircle cx='155' cy='85' r='8' fill='%23000'/%3E%3Ctext x='50' y='50' fill='white' font-size='30'%3E🤫%3C/text%3E%3C/svg%3E",
        alisa_grateful: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Ccircle cx='125' cy='100' r='55' fill='%2393CCEA'/%3E%3Crect x='95' y='155' width='60' height='80' fill='%234169E1'/%3E%3Ccircle cx='95' cy='85' r='8' fill='%23000'/%3E%3Ccircle cx='155' cy='85' r='8' fill='%23000'/%3E%3Ctext x='50' y='50' fill='white' font-size='30'%3E🙏%3C/text%3E%3C/svg%3E"
    };

    // Функция для обновления атмосферы
    function updateAtmosphere(atmosphere) {
        if (!atmosphereOverlay) return;
        
        let color = 'rgba(0,0,0,0.3)';
        
        if (atmosphere === 'calm') color = 'rgba(0,0,0,0.3)';
        else if (atmosphere === 'vain') color = 'rgba(255,192,203,0.3)';
        else if (atmosphere === 'tense') color = 'rgba(255,0,0,0.2)';
        else if (atmosphere === 'angry') color = 'rgba(255,0,0,0.4)';
        else if (atmosphere === 'cold') color = 'rgba(0,0,255,0.2)';
        else if (atmosphere === 'cruel') color = 'rgba(139,0,0,0.4)';
        else if (atmosphere === 'sad') color = 'rgba(0,0,255,0.2)';
        else if (atmosphere === 'confident') color = 'rgba(255,215,0,0.2)';
        else if (atmosphere === 'commanding') color = 'rgba(255,0,0,0.3)';
        else if (atmosphere === 'wardrobe') color = 'rgba(139,69,19,0.3)';
        else if (atmosphere === 'suspense') color = 'rgba(255,0,0,0.3)';
        else if (atmosphere === 'laughing') color = 'rgba(255,215,0,0.3)';
        else if (atmosphere === 'dangerous') color = 'rgba(139,0,0,0.5)';
        else if (atmosphere === 'attack') color = 'rgba(255,0,0,0.6)';
        else if (atmosphere === 'mockery') color = 'rgba(255,215,0,0.2)';
        else if (atmosphere === 'confrontation') color = 'rgba(255,0,0,0.4)';
        else if (atmosphere === 'battle') color = 'rgba(255,0,0,0.7)';
        else if (atmosphere === 'defeated') color = 'rgba(128,128,128,0.3)';
        else if (atmosphere === 'victory') color = 'rgba(255,215,0,0.4)';
        else if (atmosphere === 'amazed') color = 'rgba(255,215,0,0.3)';
        else if (atmosphere === 'happy') color = 'rgba(255,255,0,0.2)';
        else if (atmosphere === 'worried') color = 'rgba(0,0,255,0.2)';
        else if (atmosphere === 'calculating') color = 'rgba(128,0,128,0.2)';
        else if (atmosphere === 'gossip') color = 'rgba(255,0,255,0.2)';
        else if (atmosphere === 'catfight') color = 'rgba(255,0,0,0.3)';
        else if (atmosphere === 'amused') color = 'rgba(255,215,0,0.2)';
        else if (atmosphere === 'romantic') color = 'rgba(255,192,203,0.4)';
        else if (atmosphere === 'flirting') color = 'rgba(255,105,180,0.3)';
        else if (atmosphere === 'intimate') color = 'rgba(255,0,0,0.2)';
        else if (atmosphere === 'kiss') color = 'rgba(255,0,0,0.3)';
        else if (atmosphere === 'triumph') color = 'rgba(255,215,0,0.5)';
        else if (atmosphere === 'police') color = 'rgba(0,0,255,0.3)';
        else if (atmosphere === 'panic') color = 'rgba(255,0,0,0.4)';
        else if (atmosphere === 'realization') color = 'rgba(128,128,128,0.3)';
        else if (atmosphere === 'arrest') color = 'rgba(0,0,255,0.3)';
        else if (atmosphere === 'protest') color = 'rgba(255,0,0,0.4)';
        else if (atmosphere === 'gloating') color = 'rgba(0,255,0,0.2)';
        else if (atmosphere === 'dramatic') color = 'rgba(128,0,128,0.3)';
        else if (atmosphere === 'cliffhanger') color = 'rgba(0,0,0,0.5)';
        else if (atmosphere === 'party') color = 'rgba(255,215,0,0.3)';
        else if (atmosphere === 'prison') color = 'rgba(128,128,128,0.5)';
        else if (atmosphere === 'fake_sweet') color = 'rgba(255,192,203,0.3)';
        else if (atmosphere === 'suspicious') color = 'rgba(255,255,0,0.2)';
        else if (atmosphere === 'confused') color = 'rgba(128,0,128,0.2)';
        else if (atmosphere === 'inner_thoughts') color = 'rgba(0,0,0,0.6)';
        else if (atmosphere === 'curious') color = 'rgba(0,255,0,0.2)';
        else if (atmosphere === 'fake_sad') color = 'rgba(0,0,255,0.2)';
        else if (atmosphere === 'teaching') color = 'rgba(255,215,0,0.2)';
        else if (atmosphere === 'excited') color = 'rgba(255,0,255,0.2)';
        else if (atmosphere === 'funny') color = 'rgba(255,255,0,0.3)';
        else if (atmosphere === 'inner_cruel') color = 'rgba(139,0,0,0.3)';
        else if (atmosphere === 'announcement') color = 'rgba(0,0,255,0.3)';
        else if (atmosphere === 'outside') color = 'rgba(255,255,0,0.2)';
        else if (atmosphere === 'friendly') color = 'rgba(255,192,203,0.3)';
        else if (atmosphere === 'sincere') color = 'rgba(255,255,255,0.2)';
        else if (atmosphere === 'thinking') color = 'rgba(128,0,128,0.2)';
        else if (atmosphere === 'dismissive') color = 'rgba(255,0,0,0.2)';
        else if (atmosphere === 'peaceful') color = 'rgba(0,255,0,0.1)';
        else if (atmosphere === 'warm') color = 'rgba(255,192,203,0.3)';
        else if (atmosphere === 'proud') color = 'rgba(255,215,0,0.3)';
        else if (atmosphere === 'embarrassed') color = 'rgba(255,0,0,0.2)';
        else if (atmosphere === 'fire') color = 'rgba(255,0,0,0.5)';
        else if (atmosphere === 'horror') color = 'rgba(0,0,0,0.7)';
        else if (atmosphere === 'scream') color = 'rgba(255,0,0,0.6)';
        else if (atmosphere === 'disaster') color = 'rgba(0,0,0,0.8)';
        else if (atmosphere === 'chase') color = 'rgba(255,0,0,0.5)';
        else if (atmosphere === 'surprise') color = 'rgba(255,255,0,0.3)';
        else if (atmosphere === 'urgent') color = 'rgba(255,0,0,0.6)';
        else if (atmosphere === 'escape') color = 'rgba(0,255,0,0.2)';
        else if (atmosphere === 'fire_outside') color = 'rgba(255,69,0,0.4)';
        else if (atmosphere === 'running') color = 'rgba(255,0,0,0.3)';
        else if (atmosphere === 'safe') color = 'rgba(0,255,0,0.2)';
        else if (atmosphere === 'relief') color = 'rgba(0,0,255,0.2)';
        else if (atmosphere === 'crying') color = 'rgba(0,0,255,0.3)';
        else if (atmosphere === 'comforting') color = 'rgba(255,192,203,0.3)';
        else if (atmosphere === 'emotional') color = 'rgba(255,0,0,0.3)';
        else if (atmosphere === 'touching') color = 'rgba(255,105,180,0.3)';
        else if (atmosphere === 'grateful') color = 'rgba(255,215,0,0.3)';
        else if (atmosphere === 'hopeful') color = 'rgba(255,255,0,0.2)';
        else if (atmosphere === 'morning') color = 'rgba(255,255,0,0.2)';
        else if (atmosphere === 'snobby') color = 'rgba(128,0,128,0.2)';
        else if (atmosphere === 'eavesdropping') color = 'rgba(128,0,128,0.4)';
        else if (atmosphere === 'angry_eavesdrop') color = 'rgba(139,0,0,0.5)';
        else if (atmosphere === 'menacing') color = 'rgba(0,0,0,0.8)';
        else if (atmosphere === 'dusk') color = 'rgba(128,0,128,0.3)';
        else if (atmosphere === 'quiet') color = 'rgba(0,0,255,0.1)';
        else if (atmosphere === 'uncertain') color = 'rgba(128,128,128,0.3)';
        else if (atmosphere === 'determined') color = 'rgba(255,0,0,0.4)';
        else if (atmosphere === 'night') color = 'rgba(0,0,0,0.6)';
        else if (atmosphere === 'dark') color = 'rgba(0,0,0,0.9)';
        else if (atmosphere === 'gunfire') color = 'rgba(255,0,0,0.7)';
        else if (atmosphere === 'action') color = 'rgba(255,69,0,0.5)';
        else if (atmosphere === 'battle_ready') color = 'rgba(139,0,0,0.6)';
        else if (atmosphere === 'sneaky') color = 'rgba(128,0,128,0.3)';
        else if (atmosphere === 'observing') color = 'rgba(0,0,255,0.2)';
        else if (atmosphere === 'victory_approaching') color = 'rgba(255,215,0,0.4)';
        else if (atmosphere === 'contempt') color = 'rgba(128,128,128,0.4)';
        else if (atmosphere === 'calm_after_storm') color = 'rgba(0,255,0,0.2)';
        else if (atmosphere === 'concerned') color = 'rgba(0,0,255,0.3)';
        else if (atmosphere === 'reflecting') color = 'rgba(128,0,128,0.2)';
        else if (atmosphere === 'wise') color = 'rgba(255,215,0,0.2)';
        else if (atmosphere === 'merciful') color = 'rgba(255,255,255,0.2)';
        
        atmosphereOverlay.style.background = 'radial-gradient(circle at 20% 20%, transparent, ' + color + ')';
    }

    // Функция показа сообщения
    function showMessage(text) {
        message.textContent = text;
        message.style.display = 'block';
        setTimeout(function() {
            message.style.display = 'none';
        }, 2000);
    }

    // Обработчики главного экрана
    startBtn.addEventListener('click', function() {
        clickCount++;
        
        this.classList.add('clicked');
        setTimeout(() => {
            this.classList.remove('clicked');
        }, 300);
        
        mainScreen.style.display = 'none';
        gameContainer.style.display = 'block';
        
        currentSceneId = 1;
        showScene(1);
    });

    titleInput.addEventListener('input', function() {
        if (this.value.trim() !== '') {
            novelTitle.textContent = this.value;
        } else {
            novelTitle.textContent = originalTitle;
        }
    });

    resetBtn.addEventListener('click', function() {
        novelTitle.textContent = originalTitle;
        titleInput.value = '';
        clickCount = 0;
        novelWindow.style.backgroundColor = 'white';
        body.style.backgroundColor = '#1a1a1a';
        showMessage('Сброшено! 🔄');
    });

    colorBtn.addEventListener('click', function() {
        const colors = ['#1a1a1a', '#2a1a1a', '#3a1a1a', '#4a1a1a'];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        body.style.backgroundColor = randomColor;
        showMessage('Цвет изменен! 🎨');
    });

    backToMainBtn.addEventListener('click', function() {
        gameContainer.style.display = 'none';
        mainScreen.style.display = 'flex';
    });

    // Функция показа сцены
    function showScene(id) {
        const scene = scenes[id];
        if (!scene) return;

        // Обновляем атмосферу
        updateAtmosphere(scene.atmosphere);
        
        // Обновляем изображение
        if (scene.image && images[scene.image]) {
            characterImg.src = images[scene.image];
        }
        
        // Трясем экран для экшн-сцен
        if (scene.atmosphere === 'attack' || scene.atmosphere === 'battle' || scene.atmosphere === 'catfight' || scene.atmosphere === 'fire' || scene.atmosphere === 'disaster' || scene.atmosphere === 'chase' || scene.atmosphere === 'gunfire' || scene.atmosphere === 'action') {
            document.querySelector('.character-image').classList.add('shake');
            setTimeout(function() {
                document.querySelector('.character-image').classList.remove('shake');
            }, 500);
        }

        characterName.textContent = scene.character;
        dialogText.textContent = scene.text;

        if (scene.choices) {
            // Сцена с выбором
            choicesContainer.style.display = 'flex';
            continueBtn.style.display = 'none';
            
            choicesContainer.innerHTML = '';
            
            for (let i = 0; i < scene.choices.length; i++) {
                const choice = scene.choices[i];
                const btn = document.createElement('button');
                btn.className = 'choice-btn';
                btn.textContent = choice.text;
                btn.onclick = function() {
                    showScene(choice.nextScene);
                };
                choicesContainer.appendChild(btn);
            }
        } else {
            // Обычная сцена
            choicesContainer.style.display = 'none';
            continueBtn.style.display = 'block';
            
            // Сохраняем nextScene
            const nextId = scene.nextScene;
            
            // Убираем старые обработчики
            continueBtn.onclick = null;
            
            // Добавляем новый обработчик
            continueBtn.onclick = function() {
                showScene(nextId);
            };
        }
    }

    // Приветствие
    setTimeout(function() {
        showMessage('Капа Капа Таун. Серия 1: Красный Дьявол. Серия 2: Охота на Барыгу. Серия 3: Новый Капа Капа Таун. Серия 4: Догонялки с Дьяволом. Серия 5: Судная ночь. 👑');
    }, 500);
});