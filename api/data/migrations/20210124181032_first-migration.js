exports.up = async (knex) => {
  await knex.schema
    .createTable('Users', (users) => {
      users.increments('User_Id')
      users.string('User_Username', 200).notNullable()
      users.string('User_Password', 200).notNullable()
      users.string('User_Email', 320).notNullable()
      users.string("Role").notNullable()
      users.timestamps(false, true)

    })
    .createTable("Classes", (tbl)=>{
      tbl.increments("Class_Id")
      tbl.string("Name").notNullable()
      tbl.string("Type")
      tbl.string("StartTime")
      tbl.string("Duration")
      tbl.string("IntensityLevel")
      tbl.string("Location")
      tbl.integer("Attendees").unsigned()
      tbl.integer("MaxClassSize").unsigned()
  })
  .createTable("UsersClasses", (tbl)=>{
    tbl.increments("UC_Id")
    tbl.integer("User_Id")
        .notNullable()
        .references("User_Id")
        .inTable("Users")
        .onDelete("CASCADE")
    tbl.integer("Class_Id")
        .notNullable()
        .references("Class_Id")
        .inTable("Classes")
        .onDelete("CASCADE")
})
}

exports.down = async (knex) => {
  await knex.schema
  .dropTableIfExists("UsersClasses")
  .dropTableIfExists("Classes")
  .dropTableIfExists('users')
}
