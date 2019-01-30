import { uuid } from "./util"
import { Entity, Column, PrimaryGeneratedColumn, ColumnOptions, PrimaryColumn } from "typeorm"
import { PrimaryGeneratedColumnNumericOptions } from "typeorm/decorator/options/PrimaryGeneratedColumnNumericOptions"

@Entity("neo_users")
export class NeoUser {
  @PrimaryGeneratedColumn({ name: "id", type: "bigint" } as PrimaryGeneratedColumnNumericOptions)
  id!: number

  @Column({ name: "family_name", type: "varchar", length: 255 } as ColumnOptions)
  familyName: string

  @Column({ name: "given_name", type: "varchar", length: 255 } as ColumnOptions)
  givenName: string

  @Column({ name: "nickname", type: "varchar", length: 255 } as ColumnOptions)
  nickname?: string

  @Column({ name: "full_name", type: "varchar", length: 255 } as ColumnOptions)
  fullName: string

  @Column({ name: "gender", type: "int" } as ColumnOptions)
  gender: number

  @Column({ name: "birth_date", type: "int" } as ColumnOptions)
  birthDate: Date

  @Column({ name: "address", type: "varchar", length: 255 } as ColumnOptions)
  address: string

  @Column({ name: "phone_number", type: "varchar", length: 255 } as ColumnOptions)
  phoneNumber: string

  @Column({ name: "email", type: "varchar", length: 255 } as ColumnOptions)
  email: string

  @Column({ name: "created_at", type: "datetime" } as ColumnOptions)
  createdAt: Date

  @Column({ name: "updated_at", type: "datetime" } as ColumnOptions)
  updatedAt: Date

  constructor(i: number) {
    super()
    this.familyName = uuid(i, "familyName")
    this.givenName = uuid(i, "givenName")
    this.nickname = uuid(i, "nickname")
    this.fullName = uuid(i, "fullName")
    this.gender = i
    this.birthDate = new Date()
    this.address = uuid(i, "address")
    this.phoneNumber = uuid(i, "phoneNumber")
    this.email = uuid(i, "email")
    this.createdAt = new Date()
    this.updatedAt = new Date()
  }
}
