const formSearch = document.querySelector('.form-search'),
    inputCitiesFrom = formSearch.querySelector('.input__cities-from'),
    dropdownCitiesFrom = formSearch.querySelector('.dropdown__cities-from'),
    inputCitiesTo = formSearch.querySelector('.input__cities-to'),
    dropdownCitiesTo = formSearch.querySelector('.dropdown__cities-to'),
    inputDateDepart = formSearch.querySelector('.input__date-depart');

    //Данные
    const citiesApi = 'http://api.travelpayouts.com/data/ru/cities.json',
    //const citiesApi = 'dataBase/cities.json',
        proxy = 'https://cors-anywhere.herokuapp.com/',
        API_KEY = '5d097f5a665744f279a6f08d9eb4549a',
        calendar = 'http://min-prices.aviasales.ru/calendar_preload';

        // const FROM = 'SVX' // код Екатеринбугра
        // const TO = 'KGD' // код Калининграда
        // const WHEN = '2020-05-25'; // на 25 мая 2020
        // const CALENDAR_PRELOAD = CALENDAR + `?origin=${FROM}&destination=${TO}&depart_date=${WHEN}&one_way=true` // строка запроса

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

    const renderCheapDay = (cheapTicket) => {
        console.log(cheapTicket)
    };

    const renderCheapYear = (cheapTickets) => {
        console.log(cheapTickets)
    };


    const renderCheap = (data, date) => {
        const cheapTicketYear = JSON.parse(data).best_prices;
        //console.log(cheapTicketYear);
        const cheapTicketDay = cheapTicketYear.filter((item) => {
            return item.depart_date === date;
        })
        //console.log(cheapTicketDay);
        renderCheapDay(cheapTicketDay)
        renderCheapYear(cheapTicketYear)
    };



    //Обработчики событий

    inputCitiesFrom.addEventListener('input', () => {
        showCity(inputCitiesFrom, dropdownCitiesFrom)
    });

    inputCitiesTo.addEventListener('input', () => {
        showCity(inputCitiesTo, dropdownCitiesTo)
    });

    selectCity(dropdownCitiesFrom, inputCitiesFrom);
    selectCity(dropdownCitiesTo, inputCitiesTo);

    formSearch.addEventListener('submit', (event) => {
        event.preventDefault();
        const cityFrom = city.find(item => inputCitiesFrom.value === item.name);
        const cityTo = city.find(item => inputCitiesTo.value === item.name);

        const formData = {
            from: cityFrom.code,
            to: cityTo.code,
            when: inputDateDepart.value
        }

        const requestData = `?depart_date=${formData.when}&origin=${formData.from}&destination=${formData.to}&one_way=true`;

        // const requestData2 = '?depart_date=' + formData.when +
        //     '&origin=' + formData.from +
        //     '&destination=' + formData.to +
        //     '&one_way=true';//API_KEY не нужен

            //console.log(requestData)
            getData(calendar + requestData, (response) => {//можно без proxy
               // console.log(response)
               renderCheap(response, formData.when);
            });
    });

    //Вызовы функций

    getData(proxy + citiesApi, data => {
        city = JSON.parse(data).filter(item => item.name);
    });

    // домашнее задание - выводит в консоль информацию о рейсе Екатеринбург - Калининград на 25 мая
    // getData(CALENDAR_PRELOAD, (data) => {
    //     console.log(JSON.parse(data));
        
    // });

    // getData(proxy + calendar + '?depart_date=2020-05-25&origin=SVX&destination=KGD&one_way=true&token=' + API_KEY, (data) => {
    //     const cheapTicket = JSON.parse(data).best_prices.filter(item => item.depart_date === '2020-05-29')
    //     console.log(cheapTicket)
    // });

