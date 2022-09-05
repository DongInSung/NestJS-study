import { Post } from "src/post/entity/post.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class User {

    @PrimaryGeneratedColumn('increment')
    user_id: number;

    @Column({
        unique: true
    })
    user_email: string;

    @Column({
        length: 15
    })
    user_pw: string;

    @Column({
        length: 10
    })
    user_name: string;

    @Column({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP'
    })
    user_join_date: Date;

    // OneToMany
    // One => User
    // Many => Post
    @OneToMany(() => Post, post => post.user)
    @JoinColumn({ name: 'user_id' })
    posts: Post[];
}