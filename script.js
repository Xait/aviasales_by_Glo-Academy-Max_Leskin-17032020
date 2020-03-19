const formSearch = document.querySelector('.form-search'),
    inputCitiesFrom = formSearch.querySelector('.input__cities-from'),
    dropdownCitiesFrom = formSearch.querySelector('.dropdown__cities-from'),
    inputCitiesTo = formSearch.querySelector('.input__cities-to'),
    dropdownCitiesTo = formSearch.querySelector('.dropdown__cities-to'),
    inputDateDepart = formSearch.querySelector('.input__date-depart');

    //Данные
    //const citiesApi = 'http://api.travelpayouts.com/data/ru/cities.json',
    const citiesApi = 'dataBase/cities.json',
        proxy = 'https://cors-anywhere.herokuapp.com/',
        API_KEY = '5d097f5a665744f279a6f08d9eb4549a',
        calendar = 'http://min-prices.aviasales.ru/calendar_preload';

        const FROM = 'SVX' // код Екатеринбугра
        const TO = 'KGD' // код Калининграда
        const WHEN = '2020-05-25'; // на 25 мая 2020
        const CALENDAR_PRELOAD = CALENDAR + `?origin=${FROM}&destination=${TO}&depart_date=${WHEN}&one_way=true` // строка запроса

        let city = [];

    // const city = ['Москва', 'Санкт-Петербург', 'Минск', 'Караганда', 'Челябинск', 'Керчь',
    //  'Волгоград', 'Самара', 'Днепр', 'Екатеринбург', 'Одесса', 'Ухань', 'Шымкен',
    // 'Нижний Новгород', 'Калининград', 'Вроцлав', 'Ростов-на-Дону', 'Краснодар', 'Сочи', 'Омск'];
    // Функции

    const getData = (url, callback) => {
        const request = new XMLHttpRequest();

        request.open('GET', url);
        request.addEventListener('readystatechange', () => {
            if(request.readyState !== 4) return;
            if(request.status === 200) {
                callback(request.response)
            } else {
                console.error(request.status)
            }
        })
        request.send();
    }

    
    const showCity = (input, list) => {
        list.textContent = '';

        if(input.value.trim() !== '') {
            const filterCity = city.filter(item => {
                const fixItem = item.name.toLowerCase();
                return fixItem.includes(input.value.trim().toLowerCase());
            });

            filterCity.forEach(item => {
                const li = document.createElement('li');
                li.classList.add('dropdown__city');
                li.textContent = item.name;
                list.append(li);
            })
        }
        
    };

    function selectCity(dropdown, input) {
        dropdown.addEventListener('click', (event) => {
            const target = event.target;
            if(target.tagName.toLowerCase() === 'li') {
                input.value = target.textContent;
                dropdown.textContent = '';
            }
        });
    }

    inputCitiesFrom.addEventListener('input', () => {
        showCity(inputCitiesFrom, dropdownCitiesFrom)
    });

    inputCitiesTo.addEventListener('input', () => {
        showCity(inputCitiesTo, dropdownCitiesTo)
    });

    selectCity(dropdownCitiesFrom, inputCitiesFrom);
    selectCity(dropdownCitiesTo, inputCitiesTo);

    //Вызовы функций

    getData(citiesApi, data => {
        city = JSON.parse(data).filter(item => item.name);
    });

    // домашнее задание - выводит в консоль информацию о рейсе Екатеринбург - Калининград на 25 мая
    getData(CALENDAR_PRELOAD, (data) => {
        console.log(JSON.parse(data));
        
    });

