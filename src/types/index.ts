import { Permission } from './enums';

type ObjectID = string;

export interface Club {
  _id: ObjectID;
  name: string; // 동아리 이름
  owner: ObjectID;
  imgPath: string;
  school: string;
  introduction: string;
  members: Member[]; // 동아리 회원
  ranks: Rank[]; // 동아리 계급들
  page: any[];
  createAt?: Date;
}

export interface Member {
  user: ObjectID;
  rank: number;
  isPass?: boolean;
}

export interface Rank {
  id: number;
  name: string; // 랭크 이름
  isAdmin?: boolean; // 어드민 권한
  permission: Permission[]; // 권한들
}

export interface Alarm {
  id?: number;
  message: string; // 알람 메세지
  createAt?: Date; // 생성일
  timeString?: String; // 시간 비교
}

export interface User {
  _id: ObjectID;
  clubs: ObjectID[]; // 소속 동아리
  email: string; // 이메일
  password: string; // 비밀번호
  name: string;
  message: string;
  applicants: ObjectID[];
  alarms: Alarm[]; // 알람 스택
  imgPath: string; // 프로필 사진
  pushSubscription: any;
  lastLogin?: Date; // 마지막 로그인 시간
  createAt?: Date; // 생성일
  salt?: string; // 암호화 키
  isWithdraw: boolean;
}

export * from './enums';
