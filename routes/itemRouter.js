const express = require('express');

function routes(Item) {
  const itemRouter = express.Router();

  itemRouter.route('/items')
    .post((req, res) => {
      const item = new Item(req.body);

      item.save();
      return res.status(201).json(item);
    })
    .get((req, res) => res.json(items));

  itemRouter.use('/items/:itemId', (req, res, next) => {
    Item.findById(req.params.itemId, (err, item) => {
      if (err) return res.send(err);

      if (item) {
        req.item = item;
        return next();
      }

      return res.sendStatus(404);
    });
  });

  itemRouter.route('/items/:itemId')
    .get((req, res) => res.json(req.item))
    .put((req, res) => {
      const { item } = req;
      item.title = req.body.title;
      item.description = req.body.description;
      item.completed = req.body.completed;

      req.item.save(err => {
        if (err) return res.send(err);
        return res.json(item);
      })
    })
    .patch((req, res) => {
      const { item } = req;

      if (req.body._id) delete req.body._id;

      Object.entries(req.body).forEach(attr => {
        item[attr[0]] = attr[1];
      });

      req.item.save(err => {
        if (err) return res.send(err);
        return res.json(item);
      })
    })
    .delete((req, res) => {
      req.item.remove(err => {
        if (err) return res.send(err);
        return res.sendStatus(204);
      });
    });


  return itemRouter;
};

module.exports = routes;