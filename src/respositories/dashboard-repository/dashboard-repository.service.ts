import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from 'src/database/entities/product.entity';
import { SalesItemEntity } from 'src/database/entities/sales-item.entity';
import { GetTopSalesDto } from 'src/modules/dashboard/dto/get-list-sale';
import { GetTopSalesLineDto } from 'src/modules/dashboard/dto/get-top-sale.dto';
import { Repository } from 'typeorm';
import { addDays, format } from 'date-fns';
import * as moment from 'moment-timezone';

@Injectable()
export class DashboardRepositoryService {
  constructor(
    @InjectRepository(SalesItemEntity)
    private readonly salesItemEntityRepo: Repository<SalesItemEntity>,
  ) {}
  async queryTopSales(query: GetTopSalesDto) {
    try {
      const timeZone = 'Asia/Bangkok';
      let startDate = moment.tz(query.start_date, timeZone); // Replace with your start date
      let endDate = moment.tz(query.end_date, timeZone);
      if (!query.start_date && !query.end_date) {
        startDate = moment.tz(query.start_date, timeZone).startOf('months'); // Replace with your start date
        endDate = moment.tz(query.end_date, timeZone).endOf('months');
      }

      const result = await this.salesItemEntityRepo
        .createQueryBuilder('sales_item')
        .select('product.id', 'productId')
        .addSelect('product.name', 'productName')
        .addSelect('SUM(sales_item.quantity)', 'totalQuantity')
        .leftJoin('sales_item.product', 'product')
        .where('sales_item.created_at BETWEEN :startDate AND :endDate', {
          startDate,
          endDate,
        })
        .groupBy('product.id')
        .addGroupBy('product.name')
        .orderBy('SUM(sales_item.quantity)', 'DESC')
        .limit(10)
        .getRawMany();
      //   console.log(result);
      //   return result
      return result.map((data) => {
        return {
          productName: data.productName,
          totalQuantity: data.totalQuantity,
        };
      });
      //   return result;
    } catch (error) {
      // Log the error for debugging purposes
      console.error('Error querying top sales:', error);

      // Throw an appropriate error messageG
      throw new InternalServerErrorException('Failed to query top sales.');
    }
  }
  async queryTopSaleLine(query: GetTopSalesLineDto) {
    try {
      const timeZone = 'Asia/Bangkok';
      let startDate = moment
        .tz(query.start_date, timeZone)
        .format('YYYY-MM-DD'); // Replace with your start date
      let endDate = moment.tz(query.end_date, timeZone).format('YYYY-MM-DD');
      if (!query.start_date && !query.end_date) {
        startDate = moment.tz(timeZone).startOf('months').format('YYYY-MM-DD');
        endDate = moment.tz(timeZone).endOf('months').format('YYYY-MM-DD');
      }
      const result = await this.salesItemEntityRepo
        .createQueryBuilder('sales_item')
        .select([
          'DATE(sales_item.created_at) AS day',
          'product.id AS productId',
          'product.name AS name',
          'SUM(sales_item.quantity) AS totalQuantity',
        ])
        .leftJoin('sales_item.product', 'product')
        .where('sales_item.created_at BETWEEN :startDate AND :endDate', {
          startDate,
          endDate,
        })
        .groupBy('DATE(sales_item.created_at)')
        .addGroupBy('product.id')
        .addGroupBy('product.name')
        .getRawMany();
      const transformData = (data) => {
        const resultMap = new Map();

        data.forEach((item) => {
          const { name } = item;
          item.day = moment.tz(item.day, timeZone).format('MM/DD');
          if (!resultMap.has(name)) {
            resultMap.set(name, { name, data: [], dataset: [] });
          }
          resultMap.get(name).data.push(item);
        });

        return Array.from(resultMap.values());
      };

      const transformedData = transformData(result);
      //   return transformedData
      const generateDateRange = (start: string, end: string): string[] => {
        const startDate = new Date(start);
        const endDate = new Date(end);
        const dates = [];

        for (let d = startDate; d <= endDate; d.setDate(d.getDate() + 1)) {
          dates.push(
            new Date(d).toLocaleDateString('en-US', {
              month: '2-digit',
              day: '2-digit',
            }),
          );
        }

        return dates;
      };

      const labels = generateDateRange(startDate, endDate);

      const inputData = (data_set: any[], labels: string[]) => {
        const dataset = data_set.map((product) => {
          const dataMap = new Map(
            product.data.map((item) => [
              item.day,
              parseInt(item.totalquantity, 10),
            ]),
          );
          const data = labels.map((labelDay) => dataMap.get(labelDay) || 0);

          return {
            productid: product.data[0].productid,
            name: product.name,
            data,
          };
        });

        return { labels, dataset };
      };

      const finalResult = inputData(transformedData, labels);

      return finalResult;
    } catch (error) {
      console.error('Error querying top sales line:', error);
      throw new Error('Failed to query top sales line data');
    }
  }
}
