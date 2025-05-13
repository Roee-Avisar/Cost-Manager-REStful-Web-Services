import Cost from "../models/costs.js";

export const addCost = async (req, res) => {
    try {
        const { description, category, userid, sum } = req.body;

        if (!description || !category || !userid || !sum) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        const newCost = new Cost({ description, category, userid, sum });
        await newCost.save();

        res.status(201).json(newCost);
    } catch (error) {
        console.error("Error in addCost:", error);
        res.status(500).json({ error: "Server error" });
    }
};

export const getMonthlyReport = async (req, res) => {
    try {
        const { id, year, month } = req.query;

        if (!id || !year || !month) {
            return res.status(400).json({ error: "Missing required parameters" });
        }

        const numericId = Number(id); // ודא שזה מספר
        const startDate = new Date(year, month - 1, 1);
        const endDate = new Date(year, month, 0);

        const costs = await Cost.find({
            userid: numericId,
            createdAt: { $gte: startDate, $lte: endDate }
        });

        const categories = ["food", "health", "housing", "sport", "education"];
        const groupedCosts = {};

        categories.forEach(cat => groupedCosts[cat] = []);

        costs.forEach(cost => {
            const costData = {
                sum: cost.sum,
                description: cost.description,
                day: new Date(cost.createdAt).getDate()
            };
            if (groupedCosts[cost.category]) {
                groupedCosts[cost.category].push(costData);
            }
        });

        const costsArray = categories.map(cat => ({ [cat]: groupedCosts[cat] }));

        res.json({
            userid: numericId,
            year: parseInt(year),
            month: parseInt(month),
            costs: costsArray
        });

    } catch (error) {
        console.error("Error in getMonthlyReport:", error);
        res.status(500).json({ error: "Server error" });
    }
};

