import express from 'express';

const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json('Backend working');
});

router.post('/mongo/test', function(req, res, next) {

});

export default router;
