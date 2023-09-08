import { ExistsModel } from '../../../Global/Models/ExistsModel';

export abstract class CheckIfSellerExistsProtocol {
  abstract perform(sellerEid: string): Promise<ExistsModel>;
}
