const logoutButton = new LogoutButton();
const ratesBoard = new RatesBoard();
const moneyManager = new MoneyManager()
const widget = new FavoritesWidget()

let interval = setInterval(() => {ApiConnector.getStocks(response => {
    if (response.success) {
        ratesBoard.clearTable()
        ratesBoard.fillTable(response.data)
    }
})}, 6000)

logoutButton.action = function() {
    ApiConnector.logout( (response) => {
        if (response.success) {
            clearInterval(interval)
            location.reload()
        }  else {
            alert('Ошибка подключения')
        }
    })
}

moneyManager.addMoneyCallback = function(data) { 
    ApiConnector.addMoney(data, response => {
        if (response.success){
            ProfileWidget.showProfile(response.data)
            widget.setMessage(response.success, 'Операция выполненена успешно!')
        } else if (response.success === false) {
            widget.setMessage(response.success, response.error)
        } else {
            alert('Ошибка подключения')
        }
    })
}


moneyManager.conversionMoneyCallback = function(data) {
    ApiConnector.convertMoney(data, response => {
        if (response.success){
            ProfileWidget.showProfile(response.data)
            widget.setMessage(response.success, 'Операция выполненена успешно!')
        } else if (response.success === false)   {
            widget.setMessage(response.success, response.error)
        } else {
            alert('Ошибка подключения')
        }
    })
}

moneyManager.sendMoneyCallback = function(data) {
    ApiConnector.transferMoney(data, response => {
        if (response.success){
            ProfileWidget.showProfile(response.data)
            widget.setMessage(response.success, 'Операция выполненена успешно!')
        } else if (response.success === false)  {
            widget.setMessage(response.success, response.error)
        } else {
            alert('Ошибка подключения')
        }
    })
}

widget.addUserCallback = function(data) {
    ApiConnector.addUserToFavorites(data, response => {
        if (response.success) {
            fillFavorite(response.data)
            widget.setMessage(response.success, 'Операция выполненена успешно!')
        } else if (response.success === false) {
            widget.setMessage(response.success, response.error)
        } else {
            alert('Ошибка подключения')
        }
    })
}

widget.removeUserCallback = function(data) {
    ApiConnector.removeUserFromFavorites(data, response => {
        if (response.success) {
            fillFavorite(response.data)
            widget.setMessage(response.success, 'Операция выполненена успешно!')
        } else if (response.success === false) {
            widget.setMessage(response.success, response.error)
        } else {
            alert('Ошибка подключения')
        }
    })
}
 
ApiConnector.current(response => {
    if (response.success) {
        ProfileWidget.showProfile(response.data)
    } else {
        alert('Ошибка подключения')
    }
})

ApiConnector.getFavorites( response => {
    if (response.success) {
        fillFavorite(response.data)
    } else {
        alert('Ошибка подключения')
    }
})

const fillFavorite = (data) => {
    widget.clearTable();
    widget.fillTable(data);
    moneyManager.updateUsersList(data)
   }

