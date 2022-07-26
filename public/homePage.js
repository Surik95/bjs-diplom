const logoutButton = new LogoutButton();
const ratesBoard = new RatesBoard();
const moneyManager = new MoneyManager()
const widget = new FavoritesWidget()

setInterval(() => {ApiConnector.getStocks(response => {
    if (response.success) {
        ratesBoard.clearTable()
        ratesBoard.fillTable(response.data)
    }
})}, 1000)

logoutButton.action = function() {
    ApiConnector.logout( (response) => {
        if (response.success) {
            location.reload()
        }  
    })
}

moneyManager.addMoneyCallback = function(data) { 
    ApiConnector.addMoney(data, response => {
        if (response.success){
            ProfileWidget.showProfile(response.data)
            widget.setMessage(response.success, 'Операция выполненена успешно!')
        } else {
            widget.setMessage(response.success, response.error)
        }
    })
}


moneyManager.conversionMoneyCallback = function(data) {
    ApiConnector.convertMoney(data, response => {
        if (response.success){
            ProfileWidget.showProfile(response.data)
            widget.setMessage(response.success, 'Операция выполненена успешно!')
        } else {
            widget.setMessage(response.success, response.error)
        }
    })
}

moneyManager.sendMoneyCallback = function(data) {
    ApiConnector.transferMoney(data, response => {
        if (response.success){
            ProfileWidget.showProfile(response.data)
            widget.setMessage(response.success, 'Операция выполненена успешно!')
        } else {
            widget.setMessage(response.success, response.error)
        }
    })
}

widget.addUserCallback = function(data) {
    ApiConnector.addUserToFavorites(data, response => {
        if (response.success) {
            widget.clearTable()
            widget.fillTable(response.data)
            moneyManager.updateUsersList(response.data)
            widget.setMessage(response.success, 'Операция выполненена успешно!')
        } else {
            widget.setMessage(response.success, response.error)
        }
    })
}

widget.removeUserCallback = function(data) {
    ApiConnector.removeUserFromFavorites(data, response => {
        if (response.success) {
            widget.clearTable()
            widget.fillTable(response.data)
            moneyManager.updateUsersList(response.data)
            widget.setMessage(response.success, 'Операция выполненена успешно!')
        } else {
            widget.setMessage(response.success, response.error)
        }
    })
}
 
ApiConnector.current(response => {
    if (response.success) {
        ProfileWidget.showProfile(response.data)
    }
})

ApiConnector.getFavorites( response => {
    if (response.success) {
        widget.clearTable()
        widget.fillTable(response.data)
        moneyManager.updateUsersList(response.data)
    } 
})


