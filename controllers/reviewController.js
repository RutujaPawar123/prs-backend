const db = require("../config/db");


// ============================
// GET ALL REVIEWS
// ============================
exports.getReviews = (req, res) => {

  const sql = "SELECT * FROM product_review";

  db.query(sql, (err, result) => {

    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Database error" });
    }

    res.json(result);

  });

};


// ============================
// CREATE NEW REVIEW
// ============================
exports.createReview = (req, res) => {

  const {
    product_id,
    user_id,
    username,
    rating,
    review_text,
    status
  } = req.body;

  const sql = `
  INSERT INTO product_review
  (product_id, user_id, username, rating, review_text, status, review_date)
  VALUES (?, ?, ?, ?, ?, ?, CURDATE())
  `;

  db.query(
    sql,
    [product_id, user_id, username, rating, review_text, status || "Visible"],
    (err, result) => {

      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Failed to add review" });
      }

      res.json({
        message: "Review added successfully"
      });

    }
  );

};


// ============================
// UPDATE REVIEW
// ============================
exports.updateReview = (req, res) => {

  const id = req.params.id;

  const {
    product_id,
    user_id,
    username,
    rating,
    review_text,
    status
  } = req.body;

  const sql = `
  UPDATE product_review
  SET product_id=?, user_id=?, username=?, rating=?, review_text=?, status=?
  WHERE review_id=?
  `;

  db.query(
    sql,
    [product_id, user_id, username, rating, review_text, status, id],
    (err, result) => {

      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Failed to update review" });
      }

      res.json({
        message: "Review updated successfully"
      });

    }
  );

};


// ============================
// DELETE REVIEW
// ============================
exports.deleteReview = (req, res) => {

  const id = req.params.id;

  const sql = "DELETE FROM product_review WHERE review_id=?";

  db.query(sql, [id], (err, result) => {

    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Failed to delete review" });
    }

    res.json({
      message: "Review deleted successfully"
    });

  });

};

// ============================
// REPORT REVIEW
// ============================

exports.reportReview = (req, res) => {

  const id = req.params.id;

  const sql = `
  UPDATE product_review
  SET status = 'Reported'
  WHERE review_id = ?
  `;

  db.query(sql, [id], (err, result) => {

    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Failed to report review" });
    }

    res.json({
      message: "Review reported successfully"
    });

  });

};