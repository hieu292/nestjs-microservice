import {Test} from '@nestjs/testing';
import {PaymentService} from './payment.service';
import {PaymentStatus} from "./payment_status.enum";
import {CreatePurchaseDto} from "./dto/create_purchase.dto";

jest.mock('lodash', () => ({
  sample: () => PaymentStatus.Confirmed,
  keys: jest.fn(),
  values: jest.fn(),
  filter: jest.fn(),
  map: jest.fn(),
  difference: jest.fn(),
  pick: jest.fn(),
}));

describe('PaymentService', () => {
  let service: PaymentService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [PaymentService],
    }).compile();
    service = module.get(PaymentService);
  });

  afterEach(() => {
    jest.resetAllMocks();
    jest.clearAllMocks();
  });

  describe('purchase', () => {
    it('should return expected result', async () => {
      const mockDto: CreatePurchaseDto = {
        amount: 1,
        orderId: 1,
        productId: 1,
      };
      const mockUserId: number = 1;

      const res = await service.purchase(mockDto, mockUserId);
      expect(res).toEqual({status: PaymentStatus.Confirmed});
    });
  });
});
