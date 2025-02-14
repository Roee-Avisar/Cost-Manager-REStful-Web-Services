import Cost from "../models/costs.js";

/**
 * Adds a new cost item to the database.
 * @param {Object} req - Express request object containing the cost details in the body.
 * @param {Object} res - Express response object.
 */
export const addCost = async (req, res) => {
    try {
        const { description, category, userid, sum } = req.body;
        const date = req.body.date || new Date();

        // Create and save the new cost
        const cost = new Cost({
            description,
            category,
            userid,
            sum,
            date,
        });

        await cost.save();
        res.status(201).json(cost);
    } catch (error) {
        console.error("Error in addCost:", error);
        res.status(500).json({ error: "Server error" });
    }
};

/**
 * Fetches a monthly report of costs grouped by categories.
 * @param {Object} req - Express request object containing query parameters.
 * @param {Object} res - Express response object.
 */
export const getMonthlyReport = async (req, res) => {
    try {
        const { id, year, month } = req.query;

        if (!id || !year || !month) {
            return res.status(400).json({ error: "Missing required parameters" });
        }

        const startDate = new Date(year, month - 1, 1);
        const endDate = new Date(year, month, 0);

        const costs = await Cost.find({ userid: id, date: { $gte: startDate, $lte: endDate } });

        const groupedCosts = {
            food: [],
            health: [],
            housing: [],
            sports: [],
            education: [],
            other: []
        };

        costs.forEach(cost => {
            const costData = {
                sum: cost.sum,
                description: cost.description,
                day: new Date(cost.date).getDate()
            };

            if (groupedCosts.hasOwnProperty(cost.category)) {
                groupedCosts[cost.category].push(costData);
            }
        });

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
