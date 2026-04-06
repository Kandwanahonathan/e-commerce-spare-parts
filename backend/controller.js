const conn = require('./conn.js')  // ✅ Fixed: conn (not db)
const express = require('express')
const route = express.Router()

// 1. REGISTER ✅ (Fixed braces)
route.post('/register', (req, res) => {
    const { name, email, password } = req.body;
    const role = "customer";
    const sql = "INSERT INTO users(name,email,password,role) VALUES(?,?,?,?)";

    conn.query(sql, [name, email, password, role], (err, result) => {  // ✅ conn.query
        if (err) {
            return res.status(501).json({ message: "your insert failed", Error: err })  // ✅ Added {}
        }
        return res.json(result)  // ✅ Fixed indentation
    })
})

// 2. LOGIN ✅ (Fixed)
route.post('/login', (req, res) => {
    const { email, password } = req.body
    const sql = "SELECT * FROM users WHERE email=? AND password=?";  // ✅ Fixed SQL
    conn.query(sql, [email, password], (err, result) => {  // ✅ conn.query
        if (err) {
            return res.status(501).json({ message: "failed to login" })  // ✅ Fixed message
        }
        if (result.length === 0) {
            return res.status(401).json({ message: "unauthorized access" })
        }
        const user = result[0]
        res.json({
            message: `welcome ${user.name}`,
            user: {
                name: user.name,
                email: user.email,
                role: user.role,
            }
        })
    })
})

/// GET products (Fixed column names)
route.get("/select", (req, res) => {
    const sql = `SELECT pro_id as id, category, cost_price as cost, salling_price as price, quantity, created_at FROM products ORDER BY pro_id DESC`;
    conn.query(sql, (err, result) => {
        if (err) {
            console.error('SELECT Error:', err);
            return res.status(500).json({ error: err.message });
        }
        res.json(result);
    });
});

// ADD product (Fixed columns)
route.post("/add", (req, res) => {
    const { name, category, cost, price, quantity } = req.body;
    const sql = `INSERT INTO products(category, cost_price, salling_price, quantity) VALUES(?,?,?,?)`;
    conn.query(sql, [category, cost, price, quantity], (err, result) => {
        if (err) {
            console.error('ADD Error:', err);
            return res.status(500).json({ error: err.message });
        }
        res.json("Product Added");
    });
});

// UPDATE product
route.put("/update/:id", (req, res) => {
    const { id } = req.params;  // id = pro_id
    const { name, category, cost, price, quantity } = req.body;
    const sql = `UPDATE products SET category=?, cost_price=?, salling_price=?, quantity=? WHERE pro_id=?`;
    conn.query(sql, [category, cost, price, quantity, id], (err, result) => {
        if (err) {
            console.error('UPDATE Error:', err);
            return res.status(500).json({ error: err.message });
        }
        res.json("Product Updated");
    });
});

// DELETE product
route.delete("/delete/:id", (req, res) => {
    const { id } = req.params;
    const sql = `DELETE FROM products WHERE pro_id=?`;
    conn.query(sql, [id], (err, result) => {
        if (err) {
            console.error('DELETE Error:', err);
            return res.status(500).json({ error: err.message });
        }
        res.json("Product Deleted");
    });
});
// 1. Add StockIn Record
route.post('/stockin', (req, res) => {
    const { 
        pro_id, 
        batch_number, 
        quantity, 
        supplier, 
        unit_cost, 
        total_cost, 
        received_date, 
        received_by,
        expiry_date,
        location,
        notes 
    } = req.body;

    const sql = `
        INSERT INTO stock_in (
            pro_id, batch_number, quantity, supplier, unit_cost, 
            total_cost, received_date, received_by, expiry_date, 
            location, notes
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    
    conn.query(sql, [
        pro_id, batch_number, quantity, supplier, unit_cost,
        total_cost, received_date, received_by, expiry_date, location, notes
    ], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        
        // Update products table
        conn.query(`
            UPDATE products 
            SET quantity = quantity + ?, 
                total_stock_in = total_stock_in + ?,
                avg_cost = ?, 
                last_stockin = ?
            WHERE pro_id = ?
        `, [quantity, quantity, unit_cost, received_date, pro_id]);
        
        res.json({ 
            message: 'StockIn recorded', 
            id: result.insertId,
            batch: batch_number 
        });
    });
});

// 2. Get StockIn History
route.get('/stockin', (req, res) => {
    const sql = `
        SELECT 
            si.*, 
            p.category,
            p.salling_price
        FROM stock_in si
        JOIN products p ON si.pro_id = p.pro_id
        ORDER BY si.created_at DESC
        LIMIT 100
    `;
    conn.query(sql, (err, result) => {
        if (err) return res.status(500).json(err);
        res.json(result);
    });
});

// 3. Get StockIn by Product
route.get('/stockin/:pro_id', (req, res) => {
    const { pro_id } = req.params;
    const sql = `
        SELECT * FROM stock_in 
        WHERE pro_id = ? 
        ORDER BY received_date DESC
    `;
    conn.query(sql, [pro_id], (err, result) => {
        if (err) return res.status(500).json(err);
        res.json(result);
    });
});

module.exports = route;  // ✅ Export at end