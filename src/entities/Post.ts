import {
  Entity as TOEntity,
  Column,
  Index,
  ManyToMany,
  JoinColumn,
  BeforeInsert,
  ManyToOne,
  OneToMany,
  AfterLoad,
} from "typeorm";
import { makeId, slugify } from "../util/helpers";
import Comment from "./Comment";

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

  @Column({ nullable: true })
  username: string;

  @ManyToMany(() => User, (user) => user.posts)
  @JoinColumn({ name: "username", referencedColumnName: "username" })
  user: User;

  @ManyToOne(() => Sub, (sub) => sub.posts)
  @JoinColumn({ name: "subName", referencedColumnName: "name" })
  sub: Sub;

  @OneToMany(() => Comment, (comment) => comment.post)
  comments: Comment[];

  protected url: string;
  @AfterLoad()
  createFields() {
    this.url = `/r/${this.subName}/${this.identifier}/${this.slug}`;
  }

  @BeforeInsert()
  makeIdAndSlug() {
    this.identifier = makeId(7);
    this.slug = slugify(this.title);
  }
}
