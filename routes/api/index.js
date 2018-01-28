const router = require("express").Router();
const awsRoutes = require("./aws");
const dbRoutes = require("./dbRoutes");

// AWS routes
router.use("/aws", awsRoutes);
router.use("/db", dbRoutes);

module.exports = router;
