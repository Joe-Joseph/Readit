import {
  Entity as TOEntity,
  Column,
  Index,
  ManyToMany,
  JoinColumn,
  OneToMany,
} from "typeorm";

import Entity from "./Entity";
import { Post } from "./Post";
import { User } from "./User";

@TOEntity("subs")
export class Sub extends Entity {
  constructor(sub: Partial<Sub>) {
    super();
    Object.assign(this, sub);
  }

  @Index()
  @Column({ unique: true })
  name: string;

  @Column({ nullable: true })
  title: string;

  @Column({ type: "text", nullable: true })
  description: string;

  @Column({ nullable: true })
  imageUrn: string;

  @Column({ nullable: true })
  bannerUrn: string;

  @ManyToMany(() => User)
  @JoinColumn({ name: "username", referencedColumnName: "username" })
  user: User;

  @OneToMany(() => Post, (post) => post.sub)
  posts: Post[];
}
