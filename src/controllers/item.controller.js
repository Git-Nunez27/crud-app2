// GET /api/items
exports.getItems = async (req, res, next) => {
  try {
    const { data, error } = await req.supabase
      .from("items")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;
    res.json(data || []);
  } catch (err) {
    next(err);
  }
};

// POST /api/items
exports.createItem = async (req, res, next) => {
  try {
    const { title, detail } = req.body;

    if (!title || !title.trim()) {
      return res.status(400).json({ error: "ต้องใส่หัวข้อ" });
    }

    const { data, error } = await req.supabase
      .from("items")
      .insert([
        {
          title: title.trim(),
          detail: detail ? detail.trim() : "",
        },
      ])
      .select();

    if (error) throw error;

    res.status(201).json(data[0]);
  } catch (err) {
    next(err);
  }
};

// PUT /api/items/:id
exports.updateItem = async (req, res, next) => {
  try {
    const { title, detail } = req.body;
    const updateData = {};

    if (title !== undefined) {
      if (!title || !title.trim()) {
        return res.status(400).json({ error: "หัวข้อไม่สามารถเว้นไว้ได้" });
      }
      updateData.title = title.trim();
    }

    if (detail !== undefined) {
      updateData.detail = detail ? detail.trim() : "";
    }

    const { data, error } = await req.supabase
      .from("items")
      .update(updateData)
      .eq("id", req.params.id)
      .select();

    if (error) throw error;

    if (!data || data.length === 0) {
      return res.status(404).json({ error: "ไม่พบรายการ" });
    }

    res.json(data[0]);
  } catch (err) {
    next(err);
  }
};

// DELETE /api/items/:id
exports.deleteItem = async (req, res, next) => {
  try {
    const { error } = await req.supabase
      .from("items")
      .delete()
      .eq("id", req.params.id);

    if (error) throw error;

    res.json({ message: "ลบรายการเรียบร้อยแล้ว" });
  } catch (err) {
    next(err);
  }
};
