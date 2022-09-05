import { User } from "src/user/entity/user.enetity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Post {

    @PrimaryGeneratedColumn('increment')
    post_id: number;

    @Column({
        nullable: false
    })
    post_title: string;

    @Column({
        nullable: false
    })
    post_content: string;

    @Column({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP'
    })
    post_create_date: Date;

    @Column()
    user_id: number;

    // ManyToOne
    // Many => Post
    // One => User
    @ManyToOne(() => User, user => user.posts)
    @JoinColumn({ name: 'user_id' })
    user: User;
}