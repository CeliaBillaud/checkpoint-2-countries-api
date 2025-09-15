import { Field, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
@ObjectType()
export class Country extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field()
  id: number;

  @Field()
  @Column({ length: 10 })
  code: string;

  @Field()
  @Column("text")
  name: string;

  @Field()
  @Column("text")
  emoji: string;

  @Field()
  @Column({ length: 10, nullable: true })
  continent: string;
}
