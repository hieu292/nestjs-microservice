import {Test} from '@nestjs/testing';
import {OrdersController} from './orders.controller';
import {OrdersService} from './orders.service';
import {ApiModule} from "../api/api.module";
import {OrderStatus} from "./order_status.enum";
import {OrdersRepository} from "./orders.repository";

const mockOrderRepository = () => ({
  getOrders: jest.fn(),
  createOrder: jest.fn(),
  getConfirmedToDeliveredOrders: jest.fn(),
});

describe('OrdersController', () => {
  let controller: OrdersController;
  let service: OrdersService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [ApiModule],
      controllers: [OrdersController],
      providers: [
        OrdersService,
        {
          provide: OrdersRepository,
          useFactory: mockOrderRepository,
        },
      ],
    }).compile();
    controller = await module.get<OrdersController>(OrdersController);
    service = await module.get<OrdersService>(OrdersService);
  });

  describe('getOrders', () => {
    const mockOrders = [{}, {}, {}];
    const mockUser = {id: 1}
    const mockFilter = {status: OrderStatus.Created}

    beforeEach(() => {
      service.getOrders = jest.fn().mockReturnValue(mockOrders);
    });

    it('should call service method', async () => {
      await controller.getOrders(mockFilter, mockUser.id);
      expect(service.getOrders).toHaveBeenCalledWith(mockFilter, mockUser.id);
    });
  });
});
