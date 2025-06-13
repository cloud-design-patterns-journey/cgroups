import axios from "axios";

export class StockItemService {
    constructor(baseUrl) {
        this.baseUrl = baseUrl || '/api';
    }

    async listStockItems() {
        const userId = localStorage.getItem('sessionID');
        return axios({
            url: 'http://localhost:3001/graphql',
            method: "POST",
            data: {
                query: `
                {
                    stockItems(${userId}) {
                        id
                        manufacturer
                        name
                        picture
                        stock
                        unitPrice
                    }
                }
                `
            }
        }).then(response => response.data.data.stockItems);
    }
}
