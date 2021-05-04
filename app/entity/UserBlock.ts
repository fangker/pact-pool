import {
  EntitySchema, getRepository,
} from 'typeorm';

export interface UserBlock {
  id: number;
  userId: number;
  questionId: number;
  hashed: string;
  activeId: string;
  avgSpeed: string;
  createdAt: Date;
  updatedAt: Date;
}

export const UserBlockEntities: Array<EntitySchema<UserBlock>> = [];

for (let i = 0; i < 100; i++) {
  const e = new EntitySchema<UserBlock>({
    name: 'user_block_' + ('0' + i).slice(-2),
    columns: {
      id: {
        type: Number,
        primary: true,
        generated: true,
        unsigned: true,
        width: 10,
      },
      userId: {
        type: Number,
        unsigned: true,
        width: 10,
      },
      activeId: {
        type: String,
        length: 16,
        default: '',
      },
      hashed: {
        type: String,
        default: '0',
      },
      avgSpeed: {
        type: String,
        default: '0',
      },
      createdAt: {
        type: 'datetime',
        nullable: false,
        createDate: true,
      },
      updatedAt: {
        type: 'datetime',
        nullable: false,
        updateDate: true,
      },
    },
    indices: [
      {
        name: 'IDX_USERID_CREATEDAT_ACTIVEId',
        columns: ['userId', 'createdAt', 'activeId'],
        unique: true,
      },
      {
        name: 'IDX_USERBLOCK_CREATEDAT',
        columns: ['createdAt'],
      },
    ],
  });
  UserBlockEntities.push(e);
}

export function getUserBlockRepositoryByUid(uid: number) {
  const schema = UserBlockEntities[uid % UserBlockEntities.length];
  return getRepository<UserBlock>(schema);
}
