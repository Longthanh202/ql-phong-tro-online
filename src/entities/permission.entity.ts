import { Entity, Column, PrimaryGeneratedColumn} from 'typeorm';

@Entity('permissions')
export class permission{
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    permission_name: string;
}