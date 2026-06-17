const db = require('../config/db'); // Pool de conexiones a MariaDB

// ==============================================================================
// HU 08: CREAR UNA NUEVA META
// ==============================================================================
const crearMeta = async (req, res) => {
    // 1. Extraemos los campos del req.body con Mayúsculas (estándar de Cacho)
    const { Creador_ID, Responsable_ID, Categoria_ID, Titulo, Descripcion, Prioridad, Fecha_Inicio, Fecha_Limite } = req.body;

    // 2. Validación obligatoria de negocio (Reglas de la BD)
    if (!Creador_ID || !Responsable_ID || !Categoria_ID || !Titulo) {
        return res.status(400).json({
            ok: false,
            msg: 'Campos obligatorios vacíos (Creador, Responsable, Categoría y Título son requeridos).'
        });
    }

    try {
        const sql = `INSERT INTO Meta (Creador_ID, Responsable_ID, Categoria_ID, Titulo, Descripcion, Prioridad, Fecha_Inicio, Fecha_Limite) 
                     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
        
        // El operador || 'Media' asegura un valor por defecto si no mandan prioridad
        const [result] = await db.query(sql, [Creador_ID, Responsable_ID, Categoria_ID, Titulo, Descripcion, Prioridad || 'Media', Fecha_Inicio, Fecha_Limite]);

        res.status(201).json({
            ok: true,
            msg: 'Meta creada exitosamente.',
            metaId: result.insertId
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Error interno en el servidor al crear la meta. Verifica llaves foráneas.'
        });
    }
};

// ==============================================================================
// HU 08: EDITAR META (Campos generales)
// ==============================================================================
const actualizarMeta = async (req, res) => {
    const { id } = req.params; // ID de la meta que viene en la URL
    const { Categoria_ID, Titulo, Descripcion, Prioridad, Fecha_Limite } = req.body;

    // Validación mínima para no romper la consistencia
    if (!Categoria_ID || !Titulo) {
        return res.status(400).json({
            ok: false,
            msg: 'La categoría y el título son estrictamente obligatorios para actualizar.'
        });
    }

    try {
        const sql = `UPDATE Meta 
                     SET Categoria_ID = ?, Titulo = ?, Descripcion = ?, Prioridad = ?, Fecha_Limite = ? 
                     WHERE ID_Meta = ?`;
        
        const [result] = await db.query(sql, [Categoria_ID, Titulo, Descripcion, Prioridad, Fecha_Limite, id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ ok: false, msg: 'No se encontró la meta con ese ID.' });
        }

        res.json({ ok: true, msg: 'Meta actualizada con éxito.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ ok: false, msg: 'Error interno al actualizar la meta.' });
    }
};

// ==============================================================================
// HU 08: MARCAR META COMO COMPLETADA O CAMBIAR ESTATUS
// ==============================================================================
const cambiarEstatusMeta = async (req, res) => {
    const { id } = req.params;
    const { Estatus, Porcentaje_Actual } = req.body; // Ej: Estatus = 'Terminado', Porcentaje = 100

    // Validación preventiva del CHECK de la BD (rango de 0 a 100)
    if (Porcentaje_Actual !== undefined && (Porcentaje_Actual < 0 || Porcentaje_Actual > 100)) {
        return res.status(400).json({ ok: false, msg: 'El porcentaje de avance debe estar entre 0 y 100.' });
    }

    try {
        const sql = `UPDATE Meta SET Estatus = ?, Porcentaje_Actual = ? WHERE ID_Meta = ?`;
        const [result] = await db.query(sql, [Estatus, Porcentaje_Actual || 0, id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ ok: false, msg: 'No se encontró la meta seleccionada.' });
        }

        res.json({ 
            ok: true, 
            msg: `Estatus actualizado con éxito a [${Estatus}] con el ${Porcentaje_Actual}%` 
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ ok: false, msg: 'Error en el servidor al cambiar el estatus.' });
    }
};

// ==============================================================================
// HU 08: ELIMINAR META
// ==============================================================================
const eliminarMeta = async (req, res) => {
    const { id } = req.params;

    try {
        // Nota de arquitectura: Al borrar, el ON DELETE CASCADE de la BD
        // limpiará automáticamente las subtareas o pivotes vinculados a este ID.
        const [result] = await db.query('DELETE FROM Meta WHERE ID_Meta = ?', [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ ok: false, msg: 'No existe ninguna meta con el ID proporcionado.' });
        }

        res.json({ ok: true, msg: 'Meta eliminada de la base de datos correctamente.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ ok: false, msg: 'Error interno al eliminar la meta.' });
    }
};

// ==============================================================================
// HU 10: CALCULAR PORCENTAJE DE AVANCE GENERAL (DASHBOARD)
// ==============================================================================
const obtenerProgresoGeneral = async (req, res) => {
    const { usuarioId } = req.params; // Filtramos por el ID del usuario logueado

    try {
        // 1. Obtener la cantidad total de metas que tiene asignadas el usuario
        const [totalRows] = await db.query(
            'SELECT COUNT(*) as total FROM Meta WHERE Responsable_ID = ?', 
            [usuarioId]
        );
        
        // 2. Obtener la cantidad de metas cuyo ENUM sea estrictamente 'Terminado'
        const [completadasRows] = await db.query(
            "SELECT COUNT(*) as completadas FROM Meta WHERE Responsable_ID = ? AND Estatus = 'Terminado'", 
            [usuarioId]
        );

        const totalMetas = totalRows[0].total;
        const metasCompletadas = completadasRows[0].completadas;

        // 3. Aplicamos la fórmula matemática descrita en las subtareas de ClickUp
        let porcentajeProgreso = 0;
        if (totalMetas > 0) {
            porcentajeProgreso = Math.round((metasCompletadas / totalMetas) * 100);
        }

        // 4. Enviamos la respuesta estructurada para pintar la barra en el Front
        res.json({
            ok: true,
            usuarioId,
            totalMetas,
            metasCompletadas,
            porcentajeProgreso: `${porcentajeProgreso}%`
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Error interno del servidor al calcular el progreso.'
        });
    }
};

// Exportamos de forma masiva todos los controladores bajo CommonJS
module.exports = {
    crearMeta,
    actualizarMeta,
    cambiarEstatusMeta,
    eliminarMeta,
    obtenerProgresoGeneral
};