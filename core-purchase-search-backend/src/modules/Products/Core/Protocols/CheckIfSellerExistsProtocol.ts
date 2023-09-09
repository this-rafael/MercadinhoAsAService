import { ExistsModel } from '../../../Global/Models/ExistsModel';

export abstract class CheckIfSellerExistsProtocol {
  abstract check(sellerEid: string): Promise<ExistsModel>;
}
