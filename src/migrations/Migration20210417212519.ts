import { Migration } from '@mikro-orm/migrations';

export class Migration20210417212519 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "user" add constraint "user_username_unique" unique ("username");');

    this.addSql('drop table if exists "people" cascade;');
  }

}
