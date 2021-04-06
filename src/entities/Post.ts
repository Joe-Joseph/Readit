import {
  Entity as TOEntity,
  Column,
  Index,
  ManyToMany,
  JoinColumn,
  BeforeInsert,
  ManyToOne,
} from "typeorm";
import { makeId, slugify } from "../util/helpers";

import Entity from "./Entity";
import { Sub } from "./Sub";
import { User } from "./User";

@TOEntity("posts")
export class Post extends Entity {
  constructor(post: Partial<Post>) {
    super();
    Object.assign(this, post);
  }
  @Index()
  @Column()
  identifier: string; // 7 characters id

  @Index()
  @Column()
  slug: string;

  @Column()
  title: string;

  @Column({ nullable: true, type: "text" })
  body: string;

  @Column()
  subName: string;

  @ManyToMany(() => User, (user) => user.posts)
  @JoinColumn({ name: "username", referencedColumnName: "username" })
  user: User;

  @ManyToOne(() => Sub, (sub) => sub.posts)
  @JoinColumn({ name: "subName", referencedColumnName: "name" })
  sub: Sub;

  @BeforeInsert()
  makeIdAndSlug() {
    this.identifier = makeId(7);
    this.slug = slugify(this.title);
  }
}
