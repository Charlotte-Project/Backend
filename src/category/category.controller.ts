import { Controller, Get } from '@nestjs/common';
import { CategoryService } from './category.service';
import { Public } from '~/common/decorators';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Public()
  @Get()
  async getAllCategories() {
    return this.categoryService.getAllCategories();
  }
}
