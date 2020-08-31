import {Test} from '@nestjs/testing';
import {OrdersService} from './orders.service';
import {ApiPaymentService} from "../api/apiPayment.service";
import {ApiModule} from '../api/api.module';
import {CreateOrderDto} from "./dto/create_order.dto";
import {OrderStatus} from './order_status.enum';
import {AppError} from "../shared/errors/errors.interface";
import {AppErrors} from "../shared/errors/errors";
import {OrdersRepository} from "./orders.repository";

const mockUser = {id: 1};

const mockOrderRepository = () => ({
  getOrders: jest.fn(),
  createOrder: jest.fn(),
  getConfirmedToDeliveredOrders: jest.fn(),
});

describe('OrdersService', () => {
  let service: OrdersService;
  let apiPaymentService: ApiPaymentService;
  let orderRepository: OrdersRepository;

  beforeEach(async () => {

    const module = await Test.createTestingModule({
      imports: [ApiModule],
      providers: [
        OrdersService,
        {
          provide: OrdersRepository,
          useFactory: mockOrderRepository,
        },
      ],
    }).compile();
    service = await module.get<OrdersService>(OrdersService);
    apiPaymentService = await module.get<ApiPaymentService>(ApiPaymentService);
    orderRepository = await module.get<OrdersRepository>(OrdersRepository);
  });

  describe('create', () => {
    const mockOrder: CreateOrderDto = {productId: 1, amount: 1};
    const mockReturnedOrder = {
      ...mockOrder, userId: mockUser.id, save: function () {
        return this;
      },
    }
    it('should create order has status is canceled if payment service returns failed', async () => {
      orderRepository.createOrder = jest.fn().mockReturnValue(mockReturnedOrder)
      apiPaymentService.processOrder = jest.fn().mockReturnValue(false);
      const res = await service.createOrder(mockOrder, mockUser.id);
      expect(res.status).toEqual(OrderStatus.Canceled);
    });
    it('should create order has status is confirmed if payment service returns succeeded', async () => {
      orderRepository.createOrder = jest.fn().mockReturnValue(mockReturnedOrder)
      apiPaymentService.processOrder = jest.fn().mockReturnValue(true);
      const res = await service.createOrder(mockOrder, mockUser.id);
      expect(res.status).toEqual(OrderStatus.Confirmed);
    });
  });

  describe('cancel', () => {
    it('should succeed in happy case', async () => {
      const mockId = 1;
      const mockOrder = {
        id: mockId,
        status: OrderStatus.Created,
        save: function () {
          return this;
        },
      };
      service.getOrderById = jest.fn().mockReturnValue(mockOrder);
      const res = await service.cancelOrder(mockId, mockUser.id);
      expect(res).toEqual({...mockOrder, status: OrderStatus.Canceled});
    });

    it('should throw error if status is delivered', async (done) => {
      const mockId = 1;
      const mockOrder = {
        id: mockId,
        status: OrderStatus.Delivered,
        save: function () {
          return this;
        },
      };
      service.getOrderById = jest.fn().mockReturnValue(mockOrder);
      try {
        await service.cancelOrder(mockId, mockUser.id);
      } catch (err) {
        expect(err).toBeInstanceOf(AppError);
        expect(err.data.statusCode).toBe(AppErrors.NOT_ACCEPTABLE.statusCode);
        expect(err.data.errorCode).toBe(AppErrors.NOT_ACCEPTABLE.errorCode);
        done();
      }
    });
  });
});
