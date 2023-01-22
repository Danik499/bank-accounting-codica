import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CategoriesTransactions } from 'src/transactions/categories-transactions.model';
import { Category } from './categories.model';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoriesService {
    constructor (@InjectModel(Category) private categoriesRepository: typeof Category,
                 @InjectModel(CategoriesTransactions) private categoriesTransactionsRepository: typeof CategoriesTransactions) {}

    async createCategory(dto: CreateCategoryDto) {
        if (await this.categoriesRepository.findOne({ where: { name: dto.name } })) {
            throw new HttpException(`Name '${dto.name}' is already taken`, HttpStatus.BAD_REQUEST);
        }

        const category = await this.categoriesRepository.create(dto);
        return {
            status: 'success',
            data: category
        };
    }

    async getAllCategories() {
        const categories = await this.categoriesRepository.findAll();
        return {
            status: 'success',
            data: categories
        };
    }

    async getCategoryById(id) {
        const category = await this.categoriesRepository.findOne({ where: { id } });
        if (!category) {
            throw new HttpException('The category could not be found', HttpStatus.NOT_FOUND);
        }

        return {
            status: 'success',
            data: category
        };
    }

    async updateCategory(dto: UpdateCategoryDto) {
        if (!(await this.categoriesRepository.findByPk(dto.id))) {
            throw new HttpException('The category could not be found', HttpStatus.NOT_FOUND);
        }

        if (await this.categoriesRepository.findOne({ where: { name: dto.name } })) {
            throw new HttpException(`Name '${dto.name}' is already taken`, HttpStatus.BAD_REQUEST);
        }

        const category = await this.categoriesRepository.update({ name: dto.name }, {
            where: { id: dto.id },
            returning: true
        });

        return {
            status: 'success',
            data: category[1][0]
        };
    }

    async deleteCategory(id) {
        const bank = await this.categoriesRepository.findByPk(id);
        if (!bank) {
            throw new HttpException('The category could not be found', HttpStatus.NOT_FOUND);
        }

        const bankTransactions = await this.categoriesTransactionsRepository.findAll({ where: { category: id } });
        if (bankTransactions[0]) {
            throw new HttpException('Could not delete the category because it has transactions', HttpStatus.BAD_REQUEST);
        }

        await this.categoriesRepository.destroy({ where: { id } });
        return {
            status: 'success'
        }
    }
}