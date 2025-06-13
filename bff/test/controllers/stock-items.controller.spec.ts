import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../../src/app.module';
import { StockItemsApi } from '../../src/services';


const mockResult = [
    {
        id: "1",
        name: "Self-sealing stem bolt",
        stock: 10,
        unitPrice: 10.5,
        picture: "https://via.placeholder.com/32.png",
        manufacturer: "Bajor Galactic"
    },
    {
        id: "2",
        name: "Heisenberg compensator",
        stock: 20,
        unitPrice: 20.0,
        picture: "https://via.placeholder.com/32.png",
        manufacturer: "Federation Imports"
    },
    {
        id: "3",
        name: "Tooth sharpener",
        stock: 30,
        unitPrice: 5.25,
        picture: "https://via.placeholder.com/32.png",
        manufacturer: "Farenginar Exploits"
    }
];

describe('stock-item.controller', () => {

    let app: INestApplication;
    let stockItemsService = { listStockItems: () => mockResult };

    beforeEach(async () => {

        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        })
            .overrideProvider(StockItemsApi)
            .useValue(stockItemsService)
            .compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    test('canary verifies test infrastructure', () => {
        expect(true).toEqual(true);
    });

    describe('given GET /stock-items', () => {
        describe('when service is successful', () => {
            test('then return 200 status', async () => {
                return request(app.getHttpServer()).get('/stock-items').expect(200);
            });

            test('then should return an empty array', async () => {
                return request(app.getHttpServer()).get('/stock-items').expect(mockResult);
            });
        });
    });
});
