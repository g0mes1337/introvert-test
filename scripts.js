const subdomain = 'asswhole1337';
const accessToken = 'KmzYK42rEgZskD28hcn4bU2KRyDcIRtpwg30mZw2QaGhnbCiWx1TYr1pQfmrHWeg';

function createTask(contactId) {
    const headers = {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
    };

    const data = {
        task_type: 'contact',
        text: 'Контакт без сделок',
        complete_till: Math.floor(Date.now() / 1000) + 86400,
        element_type: 1,
        element_id: contactId
    };

    $.ajax(`https://${subdomain}.amocrm.ru/api/v4/tasks`, {headers, data})
        .then(response => {
            console.log(`Задача создана для контакта ${contactId}`);
            console.log(response.data);
        })
        .catch(error => {
            console.error(`Ошибка при создании задачи для контакта ${contactId}`);
            console.error(error.response?.data || error.message);
        });
}

function getContactsWithoutDeals() {
    const headers = {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
    };

    const params = {
        'filter[leads][][status_id]': 0,
        'limit_rows': 250
    };

    $.ajax(`https://${subdomain}.amocrm.ru/api/v4/contacts`, {headers, params})
        .then(response => {
            const contacts = response.data.items;

            contacts.forEach(contact => {
                createTask(contact.id);
            });

            console.log('Задачи успешно созданы для всех контактов без сделок');
        })
        .catch(error => {
            console.error('Ошибка при получении контактов без сделок');
            console.error(error.response?.data || error.message);
        });
}

getContactsWithoutDeals();