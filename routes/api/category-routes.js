const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  try {
    const categoryData = await Category.findAllAndCount({
      limit: 10,
      offset: 0,
      includes: [{ model: Product }]
    })
    console.log(categoryData);
    res.status(200).json(categoryData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
 
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{ model: Product, attributes: ['id', 'name', 'price', 'imageUrl'] }]
    })
    console.log(categoryData);
    res.status(200).json(categoryData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new category

  try {
    const createCategoryData = await Category.create(req.body)
    res.status(200).json(createCategoryData);
  } 
  
  catch (err) {
    res.status(400).json({ message: "Invalid data format!"})
  }
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  try {
    Category.update(req.body, {
      where: {
        id: req.params.id
      }
    })
    res.status(200).json({message: "Category has been updated!"})
  }

  catch (err) {
    res.status(400).json({message: "Category does not exist!"})
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id
      }
    })
    if (!categoryData) {
      res.status(404).json({ message: 'No category data found on that id!' });
      return;
    }
    res.status(200).json(categoryData);
  }
  catch {
    res.status(500).json(err)
  }
});

module.exports = router;
