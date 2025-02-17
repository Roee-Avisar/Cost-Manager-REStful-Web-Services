import Cost from "../models/costs.js";

/**
 * Adds a new cost entry to the database.
 * 
 * @param {Object} req - Express request object.
 * @param {Object} req.body - The request body containing cost details.
 * @param {string} req.body.description - Description of the cost.
 * @param {string} req.body.category - Category of the cost (e.g., food, health, etc.).
 * @param {string} req.body.userid - User ID associated with the cost.
 * @param {number} req.body.sum - The total amount spent.
 * @param {Object} res - Express response object.
 * @returns {Object} JSON response with the newly created cost or an error message.
 */
export const addCost = async (req, res) => {
    try {
        const { description, category, userid, sum } = req.body;

        // Validate required fields
        if (!description || !category || !userid || !sum) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        // Create new cost document
        const newCost = new Cost({ description, category, userid, sum });
        await newCost.save();

        res.status(201).json(newCost);
    } catch (error) {
        console.error("Error in addCost:", error);
        res.status(500).json({ error: "Server error" });
    }
};

/**
 * Retrieves a user's monthly expense report.
 * 
 * @param {Object} req - Express request object.
 * @param {Object} req.query - Query parameters for filtering costs.
 * @param {string} req.query.id - User ID whose report is being retrieved.
 * @param {number} req.query.year - The year for the report.
 * @param {number} req.query.month - The month for the report.
 * @param {Object} res - Express response object.
 * @returns {Object} JSON response containing the user's categorized expenses for the month.
 */
export const getMonthlyReport = async (req, res) => {
    try {
        const { id, year, month } = req.query;

        // Validate required query parameters
        if (!id || !year || !month) {
            return res.status(400).json({ error: "Missing required parameters" });
        }

        // Define the start and end dates for the given month
        const startDate = new Date(year, month - 1, 1);
        const endDate = new Date(year, month, 0);

        // Fetch cost data for the user within the specified month
        const costs = await Cost.find({ userid: id, createdAt: { $gte: startDate, $lte: endDate } });

        // Initialize grouped costs
        const groupedCosts = {
            food: [], health: [], housing: [], sport: [], education: []
        };

        // Organize costs by category
        costs.forEach(cost => {
            const costData = {
                sum: cost.sum,
                description: cost.description,
                day: new Date(cost.createdAt).getDate()
            };

            if (groupedCosts.hasOwnProperty(cost.category)) {
                groupedCosts[cost.category].push(costData);
            }
        });

        // Send the grouped costs as a response
        res.json({
            userid: id,
            year: parseInt(year),
            month: parseInt(month),
            costs: groupedCosts
        });

    } catch (error) {
        console.error("Error in getMonthlyReport:", error);
        res.status(500).json({ error: "Server error" });
    }
};
