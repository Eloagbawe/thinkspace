import express from 'express';
import { blogCategoryController } from '../controllers';

const router = express.Router();

router.post('/', blogCategoryController.addCategory);
router.get('/', blogCategoryController.getCategories);
router.put('/:id', blogCategoryController.updateCategory);
router.delete('/:id', blogCategoryController.deleteCategory);

export default router;
