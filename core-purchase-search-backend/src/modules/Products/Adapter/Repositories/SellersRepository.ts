import { CheckIfSellerExistsProtocol } from '../../Core/Protocols/CheckIfSellerExistsProtocol';
import { Injectable } from '@nestjs/common';
import { ExistsModel } from '../../../Global/Models/ExistsModel';
import { DatabaseORM } from '../../../Global/Intefaces/IPrisma';

@Injectable()
export class SellersRepository implements CheckIfSellerExistsProtocol {
  constructor(private readonly orm: DatabaseORM) {}

  async check(sellerEid: string): Promise<ExistsModel> {
    const connection = await this.orm.connection();

    const result = await connection.sellers.findFirstOrThrow({
      where: {
        eid: sellerEid,
      },
    });
    return {
      exists: !!result,
      id: result.id,
      eid: result.eid,
    };
  }
}
