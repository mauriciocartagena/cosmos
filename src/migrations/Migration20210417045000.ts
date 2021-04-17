import { Migration } from '@mikro-orm/migrations';

export class Migration20210417045000 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "people" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "name" varchar(255) not null, "first_last_name" varchar(255) not null, "second_last_name" varchar(255) not null, "phone" int4 not null, "direction" varchar(255) not null, "email" varchar(255) not null);');
  }

}
