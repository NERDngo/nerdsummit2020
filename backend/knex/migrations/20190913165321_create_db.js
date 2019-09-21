
exports.up = function (knex) {
    return knex.schema.createTable('session_blobs', table => {
        table.increments('id');
        table.json('json_blob').notNullable();
    })
};

exports.down = function (knex) {
    return knex.schema.dropTable('session_blobs');
};
